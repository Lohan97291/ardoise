import type { Session } from "@/lib/ardoise-data";
import { readStoredJson, writeStoredJson } from "@/lib/local-store";

export const JOURNAL_STORAGE_KEY = "ardoise.journal.v1";

export type JournalDaysMap = Record<string, Session[]>;

export function readJournalDays(): JournalDaysMap {
  return readStoredJson<JournalDaysMap>(JOURNAL_STORAGE_KEY, {});
}

export function writeJournalDays(days: JournalDaysMap): JournalDaysMap {
  return writeStoredJson(JOURNAL_STORAGE_KEY, days);
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
