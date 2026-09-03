import type { Session } from "@/lib/ardoise-data";
import { resolveCurrentClassroomKey } from "@/lib/ardoise-eval";
import { readStoredJson, writeStoredJson } from "@/lib/local-store";

const LEGACY_JOURNAL_STORAGE_KEY = "ardoise.journal.v1";

export type JournalDaysMap = Record<string, Session[]>;

function journalStorageKey(): string {
  return `ardoise.journal.v2.${resolveCurrentClassroomKey()}`;
}

export function readJournalDays(): JournalDaysMap {
  const key = journalStorageKey();
  const scopedDays = readStoredJson<JournalDaysMap | null>(key, null);
  if (scopedDays) return scopedDays;

  // Preserve the existing journal for M. Boulard while giving each class its own space.
  if (resolveCurrentClassroomKey() === "boulard") {
    const legacyDays = readStoredJson<JournalDaysMap>(LEGACY_JOURNAL_STORAGE_KEY, {});
    if (Object.keys(legacyDays).length > 0) {
      return writeStoredJson(key, legacyDays);
    }
  }

  return {};
}

export function writeJournalDays(days: JournalDaysMap): JournalDaysMap {
  return writeStoredJson(journalStorageKey(), days);
}

/* ─────────────── Récupération d'un ancien cahier journal ───────────────
 * Avant le stockage par classe (clé `…v2.<classe>`), le cahier journal était
 * enregistré sous une clé unique `ardoise.journal.v1`. Pour M. Boulard, cette
 * migration est automatique (voir readJournalDays). Pour les classes collègues,
 * on propose une récupération EXPLICITE et NON destructive : on ne remplit le
 * journal de la classe que s'il est actuellement vide.
 */

function countFilledDays(map: JournalDaysMap): number {
  return Object.values(map).filter((sessions) => Array.isArray(sessions) && sessions.length > 0)
    .length;
}

export function readLegacyJournalDays(): JournalDaysMap {
  return readStoredJson<JournalDaysMap>(LEGACY_JOURNAL_STORAGE_KEY, {});
}

/**
 * Indique si un ancien cahier journal récupérable existe sur cet appareil pour
 * la classe courante (uniquement pour les classes collègues, et seulement si le
 * cahier journal actuel est vide — pour ne jamais rien écraser).
 */
export function getLegacyJournalRecovery(): { available: boolean; days: number } {
  if (typeof window === "undefined") return { available: false, days: 0 };
  if (resolveCurrentClassroomKey() === "boulard") return { available: false, days: 0 };
  if (countFilledDays(readJournalDays()) > 0) return { available: false, days: 0 };
  const days = countFilledDays(readLegacyJournalDays());
  return { available: days > 0, days };
}

/**
 * Restaure l'ancien cahier journal (`v1`) dans la classe courante. Ne fait rien
 * si le cahier journal actuel n'est pas vide (protection anti-écrasement).
 * Renvoie le nombre de journées restaurées.
 */
export function restoreLegacyJournal(): number {
  if (countFilledDays(readJournalDays()) > 0) return 0;
  const legacy = readLegacyJournalDays();
  const days = countFilledDays(legacy);
  if (days === 0) return 0;
  writeJournalDays(legacy);
  return days;
}

export function updateJournalDays(
  updater: (days: JournalDaysMap) => JournalDaysMap,
): JournalDaysMap {
  return writeJournalDays(updater(readJournalDays()));
}

export function findJournalSessionById(sessionId: string): Session | undefined {
  if (typeof window === "undefined") return undefined;

  try {
    const days = readJournalDays();
    for (const sessions of Object.values(days)) {
      const found = sessions.find((session) => session.id === sessionId);
      if (found) return found;
    }
  } catch {
    return undefined;
  }

  return undefined;
}
