/**
 * Feuilles libres « Autre » de la correction rapide : évaluations ou feuilles
 * à corriger dont l'enseignant saisit lui-même le nom (façon Teetsh).
 * Persistance locale uniquement, aucune logique métier de notation ici :
 * les statuts restent stockés via `saveOnePlanResult` avec le planId de la feuille.
 */

const SHEETS_KEY = "ardoise.correctionRapide.sheets.v1";

export type CorrectionSheet = {
  id: string;
  name: string;
  /** Date au format ISO (yyyy-mm-dd) */
  date: string;
  createdAt: string;
};

function readAll(): CorrectionSheet[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SHEETS_KEY);
    const parsed = raw ? (JSON.parse(raw) as CorrectionSheet[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(sheets: CorrectionSheet[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SHEETS_KEY, JSON.stringify(sheets));
}

export function getSheets(): CorrectionSheet[] {
  return readAll().sort((a, b) => b.date.localeCompare(a.date));
}

export function addSheet(name: string, date: string): CorrectionSheet {
  const sheet: CorrectionSheet = {
    id: `sheet-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: name.trim(),
    date,
    createdAt: new Date().toISOString(),
  };
  writeAll([...readAll(), sheet]);
  return sheet;
}

export function renameSheet(id: string, name: string): void {
  writeAll(readAll().map((sheet) => (sheet.id === id ? { ...sheet, name: name.trim() } : sheet)));
}

export function removeSheet(id: string): void {
  writeAll(readAll().filter((sheet) => sheet.id !== id));
}

/** Identifiant de plan utilisé pour stocker les statuts d'une feuille. */
export function sheetPlanId(id: string): string {
  return `feuille::${id}`;
}
