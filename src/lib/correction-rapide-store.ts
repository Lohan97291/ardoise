/**
 * Petite couche de persistance dédiée à l'écran /correction-rapide :
 * dernière page corrigée par cahier, commentaires libres par élève/exercice,
 * et mode de correction préféré (par exercice / par élève).
 */

const LAST_PAGE_KEY = "ardoise.correctionRapide.lastPage.v2";
const COMMENT_KEY = "ardoise.correctionRapide.comments.v2";
const MODE_KEY = "ardoise.correctionRapide.mode.v1";

export type CorrectionMode = "exercice" | "eleve";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export type LastPageEntry = { page: number; summary: string; updatedAt: string };

export function getLastPage(notebookId: string): LastPageEntry | null {
  const store = readJson<Record<string, LastPageEntry>>(LAST_PAGE_KEY, {});
  return store[notebookId] ?? null;
}

export function setLastPage(notebookId: string, page: number, summary: string): void {
  const store = readJson<Record<string, LastPageEntry>>(LAST_PAGE_KEY, {});
  store[notebookId] = { page, summary, updatedAt: new Date().toISOString() };
  writeJson(LAST_PAGE_KEY, store);
}

/** Commentaires libres, clé = `${planId}::${studentId}` */
export function getComment(planId: string, studentId: string): string {
  const store = readJson<Record<string, string>>(COMMENT_KEY, {});
  return store[`${planId}::${studentId}`] ?? "";
}

export function setComment(planId: string, studentId: string, value: string): void {
  const store = readJson<Record<string, string>>(COMMENT_KEY, {});
  const key = `${planId}::${studentId}`;
  if (value.trim()) store[key] = value.trim();
  else delete store[key];
  writeJson(COMMENT_KEY, store);
}

export function getCorrectionMode(): CorrectionMode {
  return readJson<CorrectionMode>(MODE_KEY, "exercice");
}

export function setCorrectionMode(mode: CorrectionMode): void {
  writeJson(MODE_KEY, mode);
}
