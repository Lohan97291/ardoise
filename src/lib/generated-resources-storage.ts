import {
  SUBJECTS,
  type PrepPhase,
  type PrepSheet,
  type ResourceMethod,
  type SubjectKey,
} from "@/lib/ardoise-data";
import { createLocalStore } from "@/lib/local-store";

type GeneratedResourceStore = {
  methods: ResourceMethod[];
  prepSheets: PrepSheet[];
};

type GeneratedSessionInput = {
  title: string;
  duration: string;
  objective: string;
  competence: string;
  evaluation: string;
  materialSuggestions: string[];
  photocopySuggestions: string[];
  phases: PrepPhase[];
};

const GENERATED_RESOURCES_KEY = "ardoise.generatedResources.v1";

const EMPTY_STORE: GeneratedResourceStore = {
  methods: [],
  prepSheets: [],
};
const generatedResourcesStore = createLocalStore<GeneratedResourceStore>(
  GENERATED_RESOURCES_KEY,
  EMPTY_STORE,
);

function loadStore(): GeneratedResourceStore {
  const parsed = generatedResourcesStore.get();
  return {
    methods: parsed.methods ?? [],
    prepSheets: parsed.prepSheets ?? [],
  };
}

function saveStore(store: GeneratedResourceStore): void {
  generatedResourcesStore.set(store);
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}

function makeId(prefix: string, label: string): string {
  return `${prefix}-${slugify(label) || "element"}-${Date.now().toString(36)}`;
}

function methodLabelForSubject(subject: SubjectKey): string {
  return `Plume d'Ardoise — ${SUBJECTS[subject].label}`;
}

function buildPrepSheet(
  id: string,
  subject: SubjectKey,
  session: GeneratedSessionInput,
  notes: string[],
): PrepSheet {
  return {
    id,
    title: session.title,
    subject,
    objective: session.objective,
    competence: session.competence,
    duration: session.duration,
    phases: session.phases,
    material: session.materialSuggestions,
    photocopies: session.photocopySuggestions,
    notes,
  };
}

function ensureMethod(store: GeneratedResourceStore, subject: SubjectKey): ResourceMethod {
  const existing = store.methods.find((method) => method.id === `plume-method-${subject}`);
  if (existing) return existing;

  const created: ResourceMethod = {
    id: `plume-method-${subject}`,
    label: methodLabelForSubject(subject),
    subject,
    sequences: [],
  };
  store.methods.push(created);
  return created;
}

export function getGeneratedResourceTree(): ResourceMethod[] {
  return loadStore().methods;
}

export function getGeneratedPrepSheet(id?: string): PrepSheet | undefined {
  if (!id) return undefined;
  return loadStore().prepSheets.find((sheet) => sheet.id === id);
}

export function saveGeneratedSequence(
  subject: SubjectKey,
  sequenceTitle: string,
  sessions: GeneratedSessionInput[],
  summary?: string,
): { methodId: string; sequenceId: string; sessionIds: string[] } {
  const store = loadStore();
  const method = ensureMethod(store, subject);
  const sequenceId = makeId(`plume-sequence-${subject}`, sequenceTitle);

  const sessionIds: string[] = [];
  const resourceSessions = sessions.map((session, index) => {
    const prepSheetId = makeId(
      `plume-prep-${subject}`,
      `${sequenceTitle}-${session.title}-${index + 1}`,
    );
    sessionIds.push(prepSheetId);
    store.prepSheets.push(
      buildPrepSheet(prepSheetId, subject, session, [
        "Création par Plume d'Ardoise",
        `Séquence : ${sequenceTitle}`,
        ...(summary ? [summary] : []),
      ]),
    );
    return {
      id: makeId(`plume-resource-${subject}`, `${sequenceTitle}-${session.title}-${index + 1}`),
      label: `${session.title}${session.duration ? ` · ${session.duration}` : ""}`,
      prepSheetId,
    };
  });

  method.sequences = [
    {
      id: sequenceId,
      label: sequenceTitle,
      sessions: resourceSessions,
    },
    ...method.sequences,
  ];

  saveStore(store);
  return {
    methodId: method.id,
    sequenceId,
    sessionIds,
  };
}

export function saveGeneratedStandaloneSession(
  subject: SubjectKey,
  session: GeneratedSessionInput,
  summary?: string,
): { methodId: string; sequenceId: string; prepSheetId: string } {
  const store = loadStore();
  const method = ensureMethod(store, subject);
  const sequenceId = `plume-standalone-${subject}`;
  const prepSheetId = makeId(`plume-prep-${subject}`, session.title);
  const sequenceLabel = "Séances générées";

  store.prepSheets.push(
    buildPrepSheet(prepSheetId, subject, session, [
      "Création par Plume d'Ardoise",
      "Séance isolée",
      ...(summary ? [summary] : []),
    ]),
  );

  const existingSequence = method.sequences.find((sequence) => sequence.id === sequenceId);
  const resourceSession = {
    id: makeId(`plume-resource-${subject}`, session.title),
    label: `${session.title}${session.duration ? ` · ${session.duration}` : ""}`,
    prepSheetId,
  };

  if (existingSequence) {
    existingSequence.sessions = [resourceSession, ...existingSequence.sessions];
  } else {
    method.sequences = [
      {
        id: sequenceId,
        label: sequenceLabel,
        sessions: [resourceSession],
      },
      ...method.sequences,
    ];
  }

  saveStore(store);
  return {
    methodId: method.id,
    sequenceId,
    prepSheetId,
  };
}
