import { createLocalStore, getStoredText, readStoredJson } from "@/lib/local-store";

export type CustomPhase = {
  title: string;
  duration?: string;
  detail: string;
  differentiation?: string;
};

export type CustomSessionPrep = {
  competence: string;
  objective: string;
  socleDomains: string[];
  recommendedFormat: "seance" | "sequence";
  pedagogicalRationale: string;
  sequenceSessions: string[];
  evaluation: string;
  materialSuggestions: string[];
  photocopySuggestions: string[];
};

export type SessionExtras = {
  material: string[];
  photocopies: string[];
};

type CustomSessionRecord = {
  prep: CustomSessionPrep;
  phases: CustomPhase[];
  extras: SessionExtras;
};

const CUSTOM_SESSION_KEY = "ardoise.customSession.v1";
const LEGACY_CUSTOM_PHASES_KEY = "ardoise.customPhases.v1";
const LEGACY_CUSTOM_PREP_KEY = "ardoise.customSessionPrep.v1";
const LEGACY_SESSION_EXTRAS_KEY = "ardoise.sessionExtras.v1";

export const EMPTY_CUSTOM_PREP: CustomSessionPrep = {
  competence: "",
  objective: "",
  socleDomains: [],
  recommendedFormat: "seance",
  pedagogicalRationale: "",
  sequenceSessions: [],
  evaluation: "",
  materialSuggestions: [],
  photocopySuggestions: [],
};

export const EMPTY_SESSION_EXTRAS: SessionExtras = {
  material: [],
  photocopies: [],
};

const customSessionStore = createLocalStore<Record<string, CustomSessionRecord>>(
  CUSTOM_SESSION_KEY,
  {},
);

function normalizePrep(value?: Partial<CustomSessionPrep> | null): CustomSessionPrep {
  return {
    ...EMPTY_CUSTOM_PREP,
    ...(value ?? {}),
    socleDomains: value?.socleDomains ?? EMPTY_CUSTOM_PREP.socleDomains,
    sequenceSessions: value?.sequenceSessions ?? EMPTY_CUSTOM_PREP.sequenceSessions,
    materialSuggestions: value?.materialSuggestions ?? EMPTY_CUSTOM_PREP.materialSuggestions,
    photocopySuggestions: value?.photocopySuggestions ?? EMPTY_CUSTOM_PREP.photocopySuggestions,
  };
}

function normalizeExtras(value?: Partial<SessionExtras> | null): SessionExtras {
  return {
    material: value?.material ?? EMPTY_SESSION_EXTRAS.material,
    photocopies: value?.photocopies ?? EMPTY_SESSION_EXTRAS.photocopies,
  };
}

function normalizeRecord(value?: Partial<CustomSessionRecord> | null): CustomSessionRecord {
  return {
    prep: normalizePrep(value?.prep),
    phases: value?.phases ?? [],
    extras: normalizeExtras(value?.extras),
  };
}

function loadLegacyStore(): Record<string, CustomSessionRecord> {
  const phasesStore = readStoredJson<Record<string, CustomPhase[]>>(LEGACY_CUSTOM_PHASES_KEY, {});
  const prepStore = readStoredJson<Record<string, CustomSessionPrep>>(LEGACY_CUSTOM_PREP_KEY, {});
  const extrasStore = readStoredJson<Record<string, SessionExtras>>(LEGACY_SESSION_EXTRAS_KEY, {});
  const ids = new Set([
    ...Object.keys(phasesStore),
    ...Object.keys(prepStore),
    ...Object.keys(extrasStore),
  ]);

  const merged: Record<string, CustomSessionRecord> = {};
  for (const sessionId of ids) {
    merged[sessionId] = normalizeRecord({
      prep: prepStore[sessionId],
      phases: phasesStore[sessionId],
      extras: extrasStore[sessionId],
    });
  }

  return merged;
}

function ensureStore(): Record<string, CustomSessionRecord> {
  if (getStoredText(CUSTOM_SESSION_KEY) !== null) {
    const current = customSessionStore.get();
    const normalized: Record<string, CustomSessionRecord> = {};
    for (const [sessionId, value] of Object.entries(current)) {
      normalized[sessionId] = normalizeRecord(value);
    }
    return normalized;
  }

  const migrated = loadLegacyStore();
  if (Object.keys(migrated).length > 0) {
    customSessionStore.set(migrated);
  }
  return migrated;
}

export function getCustomSessionRecord(sessionId: string): CustomSessionRecord {
  return normalizeRecord(ensureStore()[sessionId]);
}

export function updateCustomSessionRecord(
  sessionId: string,
  updater: (current: CustomSessionRecord) => CustomSessionRecord,
): CustomSessionRecord {
  let nextRecord = getCustomSessionRecord(sessionId);

  customSessionStore.update((current) => {
    const base = normalizeRecord(current[sessionId]);
    nextRecord = normalizeRecord(updater(base));
    return {
      ...ensureStore(),
      ...current,
      [sessionId]: nextRecord,
    };
  });

  return nextRecord;
}

export function getCustomPhases(sessionId: string): CustomPhase[] {
  return getCustomSessionRecord(sessionId).phases;
}

export function saveCustomPhases(sessionId: string, phases: CustomPhase[]): CustomPhase[] {
  return updateCustomSessionRecord(sessionId, (current) => ({
    ...current,
    phases,
  })).phases;
}

export function addCustomPhase(sessionId: string, phase: CustomPhase): CustomPhase[] {
  return saveCustomPhases(sessionId, [...getCustomPhases(sessionId), phase]);
}

export function updateCustomPhase(
  sessionId: string,
  index: number,
  phase: CustomPhase,
): CustomPhase[] {
  return saveCustomPhases(
    sessionId,
    getCustomPhases(sessionId).map((currentPhase, currentIndex) =>
      currentIndex === index ? phase : currentPhase,
    ),
  );
}

export function removeCustomPhase(sessionId: string, index: number): CustomPhase[] {
  return saveCustomPhases(
    sessionId,
    getCustomPhases(sessionId).filter((_, currentIndex) => currentIndex !== index),
  );
}

export function getCustomSessionPrep(sessionId: string): CustomSessionPrep {
  return getCustomSessionRecord(sessionId).prep;
}

export function saveCustomSessionPrep(
  sessionId: string,
  value: CustomSessionPrep,
): CustomSessionPrep {
  return updateCustomSessionRecord(sessionId, (current) => ({
    ...current,
    prep: normalizePrep(value),
  })).prep;
}

export function updateCustomSessionPrep(
  sessionId: string,
  patch: Partial<CustomSessionPrep>,
): CustomSessionPrep {
  return updateCustomSessionRecord(sessionId, (current) => ({
    ...current,
    prep: normalizePrep({
      ...current.prep,
      ...patch,
    }),
  })).prep;
}

export function getSessionExtras(sessionId: string): SessionExtras {
  return getCustomSessionRecord(sessionId).extras;
}

export function updateSessionExtras(
  sessionId: string,
  updater: (current: SessionExtras) => SessionExtras,
): SessionExtras {
  return updateCustomSessionRecord(sessionId, (current) => ({
    ...current,
    extras: normalizeExtras(updater(current.extras)),
  })).extras;
}

export function addMaterial(sessionId: string, value: string): SessionExtras {
  return updateSessionExtras(sessionId, (current) => ({
    ...current,
    material: [...current.material, value],
  }));
}

export function removeMaterial(sessionId: string, index: number): SessionExtras {
  return updateSessionExtras(sessionId, (current) => ({
    ...current,
    material: current.material.filter((_, currentIndex) => currentIndex !== index),
  }));
}

export function addPhotocopy(sessionId: string, value: string): SessionExtras {
  return updateSessionExtras(sessionId, (current) => ({
    ...current,
    photocopies: [...current.photocopies, value],
  }));
}

export function removePhotocopy(sessionId: string, index: number): SessionExtras {
  return updateSessionExtras(sessionId, (current) => ({
    ...current,
    photocopies: current.photocopies.filter((_, currentIndex) => currentIndex !== index),
  }));
}
