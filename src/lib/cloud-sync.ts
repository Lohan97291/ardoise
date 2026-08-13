import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

const SNAPSHOT_ROW_ID = "ardoise-main";
const SNAPSHOT_SCOPE = "app-state";
const CLOUD_SYNC_META_KEY = "ardoise.cloudSync.v1";
const SYNCABLE_KEY_PATTERN = /^ardoise([.-]|$)/i;

export type CloudSyncMeta = {
  lastUploadedAt?: string;
  lastDownloadedAt?: string;
};

type LocalSnapshot = {
  version: 1;
  updatedAt: string;
  source: string;
  keys: Record<string, string>;
};

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
    keys.push(key);
  }
  return keys.sort();
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
  const { error } = await client.from("app_snapshots").upsert(
    {
      id: SNAPSHOT_ROW_ID,
      scope: SNAPSHOT_SCOPE,
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

  const { data, error } = await client
    .from("app_snapshots")
    .select("payload")
    .eq("id", SNAPSHOT_ROW_ID)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data?.payload || typeof data.payload !== "object") {
    throw new Error("Aucune sauvegarde cloud n'a encore été trouvée.");
  }

  const snapshot = data.payload as LocalSnapshot;
  const count = applyLocalSnapshot(snapshot);
  const downloadedAt = new Date().toISOString();
  writeCloudSyncMeta({ lastDownloadedAt: downloadedAt });

  return {
    count,
    updatedAt: snapshot.updatedAt ?? downloadedAt,
    source: snapshot.source ?? "Ardoise",
  };
}
