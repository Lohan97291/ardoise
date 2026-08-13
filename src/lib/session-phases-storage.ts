import { createLocalStore } from "@/lib/local-store";

/**
 * Persistance localStorage du suivi des phases d'une séance (déroulé).
 * Fichier séparé, mêmes conventions que storage.ts / timetable-storage.ts.
 */

export type PhaseStatus = "not_started" | "in_progress" | "completed";

export type SessionPhasesStore = Record<string, Record<number, PhaseStatus>>;

export const SESSION_PHASES_KEY = "ardoise.sessionPhases.v1";
const sessionPhasesStore = createLocalStore<SessionPhasesStore>(SESSION_PHASES_KEY, {});

const PHASE_STATUS_CYCLE: PhaseStatus[] = ["not_started", "in_progress", "completed"];

export function nextPhaseStatus(current: PhaseStatus): PhaseStatus {
  const i = PHASE_STATUS_CYCLE.indexOf(current);
  return PHASE_STATUS_CYCLE[(i + 1) % PHASE_STATUS_CYCLE.length]!;
}

/** Statuts des phases pour une séance donnée (index de phase → statut). */
export function getPhaseStatuses(sessionId: string): Record<number, PhaseStatus> {
  return sessionPhasesStore.get()[sessionId] ?? {};
}

export function setPhaseStatus(
  sessionId: string,
  phaseIndex: number,
  status: PhaseStatus,
): Record<number, PhaseStatus> {
  const store = sessionPhasesStore.get();
  const forSession = { ...(store[sessionId] ?? {}), [phaseIndex]: status };
  store[sessionId] = forSession;
  sessionPhasesStore.set(store);
  return forSession;
}

export function resetPhaseStatuses(sessionId: string): void {
  const store = sessionPhasesStore.get();
  delete store[sessionId];
  sessionPhasesStore.set(store);
}
