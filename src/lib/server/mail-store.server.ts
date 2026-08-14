import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import { getServerSupabaseClient } from "@/lib/server/supabase.server";
import { normalizeMailAnalysis } from "./mail-analysis-normalizer";
import type { MailAnalysis } from "./mail-types";

/**
 * En local, on garde un fichier .data/mail-analyses.json.
 * En production avec Supabase configuré, on sauvegarde aussi les mails dans app_snapshots
 * pour qu'ils survivent aux redéploiements Vercel et restent visibles sur plusieurs appareils.
 */
const STORE_PATH = join(process.cwd(), ".data", "mail-analyses.json");
const MAIL_ROW_ID = "ardoise-mail-analyses";
const MAIL_SCOPE = "mail-analyses";

type MailSnapshot = {
  version: 1;
  updatedAt: string;
  entries: MailAnalysis[];
};

function loadEntries(): MailAnalysis[] {
  try {
    if (!existsSync(STORE_PATH)) return [];
    return JSON.parse(readFileSync(STORE_PATH, "utf-8")) as MailAnalysis[];
  } catch {
    return [];
  }
}

function saveEntries(entries: MailAnalysis[]): void {
  try {
    mkdirSync(dirname(STORE_PATH), { recursive: true });
    writeFileSync(STORE_PATH, JSON.stringify(entries, null, 2), "utf-8");
  } catch (error) {
    console.warn("Sauvegarde locale des mails indisponible sur cet environnement.", error);
  }
}

async function loadEntriesFromCloud(): Promise<MailAnalysis[] | null> {
  const client = getServerSupabaseClient();
  if (!client) return null;

  const { data, error } = await client
    .from("app_snapshots")
    .select("payload")
    .eq("id", MAIL_ROW_ID)
    .maybeSingle();

  if (error) {
    console.error("Impossible de lire les mails depuis Supabase.", error);
    return null;
  }

  const payload = data?.payload;
  if (!payload || typeof payload !== "object") return null;
  const snapshot = payload as Partial<MailSnapshot>;
  if (!Array.isArray(snapshot.entries)) return [];

  return snapshot.entries.map(normalizeMailAnalysis);
}

async function saveEntriesToCloud(entries: MailAnalysis[]): Promise<void> {
  const client = getServerSupabaseClient();
  if (!client) return;

  const snapshot: MailSnapshot = {
    version: 1,
    updatedAt: new Date().toISOString(),
    entries,
  };

  const { error } = await client.from("app_snapshots").upsert(
    {
      id: MAIL_ROW_ID,
      scope: MAIL_SCOPE,
      payload: snapshot,
      updated_at: snapshot.updatedAt,
    },
    { onConflict: "id" },
  );

  if (error) {
    console.error("Impossible de sauvegarder les mails dans Supabase.", error);
  }
}

export async function saveMailAnalysis(value: MailAnalysis): Promise<MailAnalysis> {
  const normalized = normalizeMailAnalysis(value);
  const entries = ((await loadEntriesFromCloud()) ?? loadEntries().map(normalizeMailAnalysis)).slice();
  const index = entries.findIndex((item) => item.externalId === normalized.externalId);
  if (index >= 0) entries[index] = normalized;
  else entries.unshift(normalized);
  saveEntries(entries);
  await saveEntriesToCloud(entries);
  return normalized;
}

export async function listMailAnalyses(): Promise<MailAnalysis[]> {
  const cloudEntries = await loadEntriesFromCloud();
  if (cloudEntries) return cloudEntries;
  return loadEntries().map(normalizeMailAnalysis);
}

export async function deleteMailAnalysis(externalId: string): Promise<void> {
  const entries = ((await loadEntriesFromCloud()) ?? loadEntries().map(normalizeMailAnalysis)).filter(
    (item) => item.externalId !== externalId,
  );
  saveEntries(entries);
  await saveEntriesToCloud(entries);
}
