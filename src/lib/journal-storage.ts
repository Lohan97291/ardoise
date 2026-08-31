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
