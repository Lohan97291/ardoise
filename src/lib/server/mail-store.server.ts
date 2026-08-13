import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import { normalizeMailAnalysis } from "./mail-analysis-normalizer";
import type { MailAnalysis } from "./mail-types";

/**
 * Persistance des analyses de mail dans un fichier local (.data/mail-analyses.json),
 * pour survivre aux redémarrages du serveur sans avoir besoin d'une vraie base de
 * données. À remplacer par une table SQL si le volume devient important.
 */
const STORE_PATH = join(process.cwd(), ".data", "mail-analyses.json");

function loadEntries(): MailAnalysis[] {
  try {
    if (!existsSync(STORE_PATH)) return [];
    return JSON.parse(readFileSync(STORE_PATH, "utf-8")) as MailAnalysis[];
  } catch {
    return [];
  }
}

function saveEntries(entries: MailAnalysis[]): void {
  mkdirSync(dirname(STORE_PATH), { recursive: true });
  writeFileSync(STORE_PATH, JSON.stringify(entries, null, 2), "utf-8");
}

export function saveMailAnalysis(value: MailAnalysis): MailAnalysis {
  const normalized = normalizeMailAnalysis(value);
  const entries = loadEntries().map(normalizeMailAnalysis);
  const index = entries.findIndex((item) => item.externalId === normalized.externalId);
  if (index >= 0) entries[index] = normalized;
  else entries.unshift(normalized);
  saveEntries(entries);
  return normalized;
}

export function listMailAnalyses(): MailAnalysis[] {
  return loadEntries().map(normalizeMailAnalysis);
}
