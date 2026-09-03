import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { resolveCurrentClassroomKey } from "@/lib/ardoise-eval";

const CLOUD_SYNC_META_KEY = "ardoise.cloudSync.v1";
const SYNCABLE_KEY_PATTERN = /^ardoise([.-]|$)/i;
export const CLOUD_SYNC_EVENT = "ardoise-cloud-sync-updated";
/** Émis par local-store.ts à chaque écriture d'une donnée synchronisable. */
const LOCAL_WRITE_EVENT = "ardoise-local-write";
/** Délai avant la sauvegarde auto après la dernière modification. */
const AUTO_PUSH_DEBOUNCE_MS = 2500;

export type CloudSyncMeta = {
  lastUploadedAt?: string;
  lastDownloadedAt?: string;
  /** Dernière modification locale d'une donnée synchronisable (ISO). */
  lastLocalChangeAt?: string;
  /** updatedAt du snapshot avec lequel on s'est réconcilié pour la dernière fois. */
  lastSyncedAt?: string;
};

type LocalSnapshot = {
  version: 1;
  updatedAt: string;
  source: string;
  keys: Record<string, string>;
};

function getSnapshotIdentity(): { id: string; scope: string } {
  const classroom = resolveCurrentClassroomKey();
  return {
    id: `ardoise-${classroom}`,
    scope: `app-state:${classroom}`,
  };
}

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readCloudSyncMeta(): CloudSyncMeta {
  if (!canUseStorage()) return {};
  try {
    const raw = window.localStorage.getItem(CLOUD_SYNC_META_KEY);
    return raw ? ((JSON.parse(raw) as CloudSyncMeta) ?? {}) : {};
  } catch {
    return {};
  }
}

function writeCloudSyncMeta(patch: Partial<CloudSyncMeta>): CloudSyncMeta {
  if (!canUseStorage()) return patch;
  const next = {
    ...readCloudSyncMeta(),
    ...patch,
  };
  try {
    window.localStorage.setItem(CLOUD_SYNC_META_KEY, JSON.stringify(next));
    window.dispatchEvent(
      new CustomEvent(CLOUD_SYNC_EVENT, {
        detail: next,
      }),
    );
  } catch {
    /* noop */
  }
  return next;
}

function buildSourceLabel(): string {
  if (typeof navigator === "undefined") return "Ardoise";
  return `${navigator.platform || "Appareil"} · ${navigator.language || "fr-FR"}`;
}

function listSyncableKeys(): string[] {
  if (!canUseStorage()) return [];
  const keys: string[] = [];
  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);
    if (!key) continue;
    if (!SYNCABLE_KEY_PATTERN.test(key)) continue;
    // La méta de synchro reste locale à l'appareil (jamais uploadée ni écrasée).
    if (key === CLOUD_SYNC_META_KEY) continue;
    keys.push(key);
  }
  return keys.sort();
}

/** Nombre de journées présentes dans le cahier journal d'une classe (0 = vide). */
function journalDayCount(keys: Record<string, string>, classroom: string): number {
  const raw = keys?.[`ardoise.journal.v2.${classroom}`];
  if (!raw) return 0;
  try {
    const parsed = JSON.parse(raw) as unknown;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? Object.keys(parsed as Record<string, unknown>).length
      : 0;
  } catch {
    return 0;
  }
}

function collectLocalSnapshot(): LocalSnapshot {
  const keys: Record<string, string> = {};
  for (const key of listSyncableKeys()) {
    const value = window.localStorage.getItem(key);
    if (value !== null) keys[key] = value;
  }
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    source: buildSourceLabel(),
    keys,
  };
}

function applyLocalSnapshot(snapshot: LocalSnapshot): number {
  if (!canUseStorage()) return 0;

  for (const key of listSyncableKeys()) {
    window.localStorage.removeItem(key);
  }

  for (const [key, value] of Object.entries(snapshot.keys ?? {})) {
    window.localStorage.setItem(key, value);
  }

  return Object.keys(snapshot.keys ?? {}).length;
}

export function getCloudSyncState(): {
  configured: boolean;
  lastUploadedAt?: string;
  lastDownloadedAt?: string;
} {
  const meta = readCloudSyncMeta();
  return {
    configured: isSupabaseConfigured(),
    lastUploadedAt: meta.lastUploadedAt,
    lastDownloadedAt: meta.lastDownloadedAt,
  };
}

export async function pushLocalStateToCloud(): Promise<{
  count: number;
  uploadedAt: string;
}> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error("Supabase n'est pas encore configuré dans l'application.");
  }

  const snapshot = collectLocalSnapshot();
  const snapshotIdentity = getSnapshotIdentity();
  const { error } = await client.from("app_snapshots").upsert(
    {
      id: snapshotIdentity.id,
      scope: snapshotIdentity.scope,
      payload: snapshot,
      updated_at: snapshot.updatedAt,
    },
    { onConflict: "id" },
  );

  if (error) throw new Error(error.message);

  writeCloudSyncMeta({ lastUploadedAt: snapshot.updatedAt });
  return {
    count: Object.keys(snapshot.keys).length,
    uploadedAt: snapshot.updatedAt,
  };
}

export async function pullCloudStateToLocal(): Promise<{
  count: number;
  updatedAt: string;
  source: string;
}> {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error("Supabase n'est pas encore configuré dans l'application.");
  }

  const snapshotIdentity = getSnapshotIdentity();
  const { data, error } = await client
    .from("app_snapshots")
    .select("payload")
    .eq("id", snapshotIdentity.id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data?.payload || typeof data.payload !== "object") {
    throw new Error("Aucune sauvegarde cloud n'a encore été trouvée.");
  }

  const snapshot = data.payload as LocalSnapshot;
  const count = applyLocalSnapshot(snapshot);
  const downloadedAt = new Date().toISOString();
  writeCloudSyncMeta({
    lastDownloadedAt: downloadedAt,
    lastSyncedAt: snapshot.updatedAt ?? downloadedAt,
  });

  return {
    count,
    updatedAt: snapshot.updatedAt ?? downloadedAt,
    source: snapshot.source ?? "Ardoise",
  };
}

/* ─────────────── Sauvegarde automatique (avec garde-fous) ─────────────── */

async function fetchCloudSnapshot(): Promise<LocalSnapshot | null> {
  const client = getSupabaseClient();
  if (!client) return null;
  const { id } = getSnapshotIdentity();
  const { data, error } = await client
    .from("app_snapshots")
    .select("payload")
    .eq("id", id)
    .maybeSingle();
  if (error || !data?.payload || typeof data.payload !== "object") return null;
  return data.payload as LocalSnapshot;
}

/**
 * Envoie l'état local vers le cloud, SAUF si cela écraserait un cahier journal
 * cloud non-vide par un cahier journal local vide (protection anti-perte).
 */
async function safePush(snapshotArg?: LocalSnapshot): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  const snapshot = snapshotArg ?? collectLocalSnapshot();
  const classroom = resolveCurrentClassroomKey();
  const localDays = journalDayCount(snapshot.keys, classroom);

  if (localDays === 0) {
    // Ne jamais écraser un journal cloud non-vide avec un local vide.
    const cloud = await fetchCloudSnapshot();
    if (cloud && journalDayCount(cloud.keys ?? {}, classroom) > 0) {
      return false;
    }
  }

  const identity = getSnapshotIdentity();
  const { error } = await client.from("app_snapshots").upsert(
    {
      id: identity.id,
      scope: identity.scope,
      payload: snapshot,
      updated_at: snapshot.updatedAt,
    },
    { onConflict: "id" },
  );
  if (error) return false;

  writeCloudSyncMeta({ lastUploadedAt: snapshot.updatedAt, lastSyncedAt: snapshot.updatedAt });
  return true;
}

/**
 * Fusionne le snapshot cloud dans le local : on ÉCRIT les clés du cloud, on ne
 * supprime JAMAIS de clé locale. Utilisé par la synchro automatique pour ne
 * jamais détruire de données locales (contrairement à applyLocalSnapshot, réservé
 * à la restauration manuelle explicite).
 */
function mergeCloudIntoLocal(snapshot: LocalSnapshot): number {
  if (!canUseStorage()) return 0;
  let count = 0;
  for (const [key, value] of Object.entries(snapshot.keys ?? {})) {
    if (key === CLOUD_SYNC_META_KEY) continue;
    window.localStorage.setItem(key, value);
    count += 1;
  }
  return count;
}

function applyCloud(cloud: LocalSnapshot): void {
  mergeCloudIntoLocal(cloud);
  writeCloudSyncMeta({
    lastDownloadedAt: new Date().toISOString(),
    lastSyncedAt: cloud.updatedAt ?? new Date().toISOString(),
  });
}

/**
 * Réconciliation au démarrage. RÈGLE D'OR : ne jamais supprimer un cahier journal
 * local existant.
 * - journal local VIDE + cloud non-vide → on charge le cloud par FUSION (aucune
 *   suppression) ;
 * - journal local non-vide + cloud vide → on sauvegarde le local ;
 * - journal local non-vide + cloud non-vide (conflit) → on NE touche PAS au local.
 *   On envoie le local seulement s'il est plus récent (upload, jamais de
 *   suppression). Sinon on ne fait rien : le local est préservé, l'utilisateur
 *   peut restaurer manuellement s'il le souhaite.
 */
async function reconcileOnLoad(): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const classroom = resolveCurrentClassroomKey();
  const local = collectLocalSnapshot();
  const localDays = journalDayCount(local.keys, classroom);
  const cloud = await fetchCloudSnapshot();

  if (!cloud || !cloud.keys) {
    if (localDays > 0) await safePush(local);
    return;
  }

  const cloudDays = journalDayCount(cloud.keys, classroom);
  const cloudUpdatedAt = cloud.updatedAt ?? "";

  // Le journal local est vide : rien à perdre → on récupère le cloud par fusion.
  if (localDays === 0) {
    if (cloudDays > 0) applyCloud(cloud);
    return;
  }

  // Le journal local existe : on ne le remplace/supprime JAMAIS automatiquement.
  if (cloudDays === 0) {
    await safePush(local);
    return;
  }

  // Les deux ont des données : on n'écrase pas le local. On sauvegarde le local
  // uniquement s'il est strictement plus récent que le cloud (upload seul).
  const meta = readCloudSyncMeta();
  const lastLocalChangeAt = meta.lastLocalChangeAt ?? "";
  if (lastLocalChangeAt && lastLocalChangeAt > cloudUpdatedAt) {
    await safePush(local);
  }
  // Sinon : on ne fait rien. Le cahier journal local reste intact.
}

let autoPushTimer: number | undefined;

/** Appelé à chaque modification locale : planifie une sauvegarde auto (debounce). */
export function markLocalChange(): void {
  writeCloudSyncMeta({ lastLocalChangeAt: new Date().toISOString() });
  if (!isSupabaseConfigured() || typeof window === "undefined") return;
  if (autoPushTimer) window.clearTimeout(autoPushTimer);
  autoPushTimer = window.setTimeout(() => {
    void safePush();
  }, AUTO_PUSH_DEBOUNCE_MS);
}

let autoSyncStarted = false;

/** À appeler une fois côté client (montage de l'app) pour activer la synchro auto. */
export function initCloudAutoSync(): void {
  if (autoSyncStarted || typeof window === "undefined") return;
  autoSyncStarted = true;

  window.addEventListener(LOCAL_WRITE_EVENT, () => markLocalChange());
  // Filet : au retour sur l'onglet, on tente une sauvegarde si des changements sont en attente.
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden" && isSupabaseConfigured()) {
      void safePush();
    }
  });

  if (isSupabaseConfigured()) {
    void reconcileOnLoad();
  }
}
