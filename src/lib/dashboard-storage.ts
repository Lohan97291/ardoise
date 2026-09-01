/**
 * Persistance localStorage des widgets du Centre de pilotage.
 * Fichier séparé, mêmes conventions que storage.ts / timetable-storage.ts.
 */
import { createLocalStore } from "@/lib/local-store";
import { nextPhaseStatus, type PhaseStatus } from "@/lib/session-phases-storage";

export type SessionStatus = PhaseStatus;
export const nextSessionStatus = nextPhaseStatus;

// ─────────────────────────────────────────────
// Statut global d'une séance (pour les séances sans fiche de prep,
// où il n'y a pas de phases individuelles à valider).
// ─────────────────────────────────────────────
const SESSION_STATUS_KEY = "ardoise.sessionStatus.v1";
const sessionStatusStore = createLocalStore<Record<string, SessionStatus>>(SESSION_STATUS_KEY, {});

export function getSessionStatus(sessionId: string): SessionStatus {
  return sessionStatusStore.get()[sessionId] ?? "not_started";
}

export function setSessionStatus(sessionId: string, status: SessionStatus): void {
  const store = sessionStatusStore.get();
  store[sessionId] = status;
  sessionStatusStore.set(store);
}

export function resetSessionStatusesForSessions(sessionIds: string[]): void {
  if (sessionIds.length === 0) return;

  const ids = new Set(sessionIds);
  const store = sessionStatusStore.get();
  let changed = false;

  for (const sessionId of ids) {
    if (sessionId in store) {
      delete store[sessionId];
      changed = true;
    }
  }

  if (changed) {
    sessionStatusStore.set(store);
  }
}

// ─────────────────────────────────────────────
// À préparer : items cochés (dérivés des fiches) + items ajoutés à la main
// ─────────────────────────────────────────────
const PREPARED_CHECKED_KEY = "ardoise.preparedChecked.v1";
const PREPARED_EXTRA_KEY = "ardoise.preparedExtra.v1";
const preparedCheckedStore = createLocalStore<string[]>(PREPARED_CHECKED_KEY, []);
const preparedExtraStore = createLocalStore<PreparedExtraItem[]>(PREPARED_EXTRA_KEY, []);

export type PreparedExtraItem = {
  id: string;
  label: string;
  sessionId?: string | null;
  category?: "manual" | "photocopy" | "material";
};

function normalizePreparedExtra(item: PreparedExtraItem): PreparedExtraItem {
  return {
    id: item.id,
    label: item.label,
    sessionId: item.sessionId ?? null,
    category: item.category ?? "manual",
  };
}

export function getCheckedPrepared(): string[] {
  return preparedCheckedStore.get();
}

export function togglePreparedChecked(label: string): string[] {
  const current = getCheckedPrepared();
  const next = current.includes(label) ? current.filter((l) => l !== label) : [...current, label];
  return preparedCheckedStore.set(next);
}

export function getExtraPrepared(): PreparedExtraItem[] {
  return preparedExtraStore.get().map(normalizePreparedExtra);
}

export function addExtraPrepared(
  label: string,
  options?: { sessionId?: string | null; category?: "manual" | "photocopy" | "material" },
): PreparedExtraItem[] {
  const current = getExtraPrepared();
  const next = [
    ...current,
    normalizePreparedExtra({
      id: `extra-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      label,
      sessionId: options?.sessionId ?? null,
      category: options?.category ?? "manual",
    }),
  ];
  return preparedExtraStore.set(next);
}

export function removeExtraPrepared(id: string): PreparedExtraItem[] {
  const next = getExtraPrepared().filter((i) => i.id !== id);
  return preparedExtraStore.set(next);
}

export function removeExtraPreparedForSessions(sessionIds: string[]): PreparedExtraItem[] {
  if (sessionIds.length === 0) return getExtraPrepared();

  const ids = new Set(sessionIds);
  const next = getExtraPrepared().filter((item) => !item.sessionId || !ids.has(item.sessionId));
  return preparedExtraStore.set(next);
}

// ─────────────────────────────────────────────
// Mémos libres
// ─────────────────────────────────────────────
const MEMOS_KEY = "ardoise.memos.v1";
const memosStore = createLocalStore<Memo[]>(MEMOS_KEY, []);

export type Memo = { id: string; text: string };

export function getMemos(): Memo[] {
  return memosStore.get();
}

export function addMemo(text: string): Memo[] {
  const next = [...getMemos(), { id: `memo-${Date.now()}`, text }];
  return memosStore.set(next);
}

export function removeMemo(id: string): Memo[] {
  const next = getMemos().filter((m) => m.id !== id);
  return memosStore.set(next);
}

// ─────────────────────────────────────────────
// Signaux ajoutés manuellement (en plus des signaux calculés automatiquement)
// ─────────────────────────────────────────────
const MANUAL_SIGNALS_KEY = "ardoise.manualSignals.v1";
const manualSignalsStore = createLocalStore<ManualSignal[]>(MANUAL_SIGNALS_KEY, []);

export type ManualSignal = { id: string; studentId: string; reason: string };

export function getManualSignals(): ManualSignal[] {
  return manualSignalsStore.get();
}

export function addManualSignal(studentId: string, reason: string): ManualSignal[] {
  const next = [...getManualSignals(), { id: `signal-${Date.now()}`, studentId, reason }];
  return manualSignalsStore.set(next);
}

export function removeManualSignal(id: string): ManualSignal[] {
  const next = getManualSignals().filter((s) => s.id !== id);
  return manualSignalsStore.set(next);
}
