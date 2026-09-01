import type { ResourceMethod, ResourceSession, Session } from "@/lib/ardoise-data";
import { ORTHO_CATALOG } from "@/lib/ardoise-eval";
import { getExercisePlan } from "@/lib/exercise-plans";
import {
  loadMergedResourceTree,
  loadPatchedPrepSheet,
  loadPatchedResourceMatch,
} from "@/lib/resource-library";

type JournalStore = Record<string, Session[]>;

type AutofillMode = "next" | "current";
const MATHS_CE1_METHOD_ID = "m-maths-ce1-guide";

type MethodResolution = {
  methodId: string;
  mode: AutofillMode;
  missingMessage?: string;
  keepOriginalTitle?: boolean;
  skipPrepSheet?: boolean;
  skipCorrectionLink?: boolean;
};

export type JournalAutofillResult = {
  sessions: Session[];
  linkedCount: number;
  missingCount: number;
  missingTitles: string[];
};

const ORTHO_METHOD: ResourceMethod = {
  id: "m-ortho-auto",
  label: "Orthographémic CE1",
  subject: "francais",
  sequences: [
    {
      id: "m-ortho-auto-sequence",
      label: "Progression hebdomadaire",
      sessions: ORTHO_CATALOG.map((entry) => ({
        id: entry.id,
        label: `S${entry.weekNum} — ${entry.title}`,
        prepSheetId: "",
      })),
    },
  ],
};

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function resourceIdFromProgramming(programmingItemId?: string): string | undefined {
  if (!programmingItemId) return undefined;
  const cleo = programmingItemId.match(/^e_p(\d+)_(\d+)$/i);
  if (cleo) return `cleo-p${cleo[1]}-${cleo[2]}`;

  const acces = programmingItemId.match(/^m(\d+)$/i);
  if (acces) return `acces-m${acces[1]}`;

  if (/^ortho-s\d+$/i.test(programmingItemId)) return programmingItemId;
  return undefined;
}

function programmingItemIdFromResource(resourceId?: string): string | undefined {
  if (!resourceId) return undefined;
  const cleo = resourceId.match(/^cleo-p(\d+)-(\d+)$/i);
  if (cleo) return `e_p${cleo[1]}_${cleo[2]}`;

  const acces = resourceId.match(/^acces-m(\d+)$/i);
  if (acces) return `m${acces[1]}`;

  if (/^ortho-s\d+$/i.test(resourceId)) return resourceId;
  return undefined;
}

function flatSessions(method: ResourceMethod): ResourceSession[] {
  return method.sequences.flatMap((sequence) => sequence.sessions);
}

async function methodIdFromAttachedSession(session: Session): Promise<string | undefined> {
  if (session.resourceId) {
    const resourceMatch = await loadPatchedResourceMatch(session.resourceId);
    if (resourceMatch) return resourceMatch.method.id;
    if (/^ortho-s\d+$/i.test(session.resourceId)) return ORTHO_METHOD.id;
  }

  if (session.programmingItemId) {
    if (/^e_p\d+_\d+$/i.test(session.programmingItemId)) return "m-cleo";
    if (/^m\d+$/i.test(session.programmingItemId)) return MATHS_CE1_METHOD_ID;
    if (/^ortho-s\d+$/i.test(session.programmingItemId)) return ORTHO_METHOD.id;
  }

  return undefined;
}

function frenchMissingMessage(session: Session): string | undefined {
  const normalizedTitle = normalize(session.title);
  const templateId = session.builderTemplateId ?? "";

  if (
    templateId === "litterature-album" ||
    normalizedTitle.includes("litterature") ||
    normalizedTitle.includes("album")
  ) {
    return "Projet littérature / album : ressource spécifique à rattacher manuellement, ou à générer avec Plume d'Ardoise.";
  }

  if (templateId === "production-ecrit" || normalizedTitle.includes("production d ecrit")) {
    return undefined;
  }

  if (
    templateId === "lecture" ||
    normalizedTitle.includes("lecture comprehension") ||
    normalizedTitle === "lecture"
  ) {
    return "Lecture : préciser la ressource ou le support utilisé pour rattacher la bonne fiche de préparation.";
  }

  if (normalizedTitle.includes("lecture offerte") || normalizedTitle.includes("poesie")) {
    return "Lecture offerte / poésie : garder ce créneau libre ou rattacher manuellement une ressource dédiée.";
  }

  return undefined;
}

function resolveMethod(session: Session): MethodResolution | null {
  const normalizedTitle = normalize(session.title);
  const templateId = session.builderTemplateId ?? "";
  if (normalizedTitle.includes("cleo")) {
    return { methodId: "m-cleo", mode: "next" };
  }

  if (
    templateId === "flash-maths" ||
    templateId === "calcul-mental" ||
    templateId === "atelier-problemes" ||
    templateId === "probleme-jour"
  ) {
    return null;
  }

  if (
    session.subject === "maths" &&
    (templateId === "sequence-maths-45" || templateId === "sequence-maths-35") &&
    normalizedTitle === "mathematiques"
  ) {
    return { methodId: MATHS_CE1_METHOD_ID, mode: "next" };
  }

  if (
    session.subject === "maths" &&
    normalizedTitle.includes("maths en ce1") &&
    (normalizedTitle.includes("seance 2") ||
      normalizedTitle.includes("seance 3") ||
      normalizedTitle.includes("seance 4") ||
      normalizedTitle.includes("flash maths") ||
      normalizedTitle.includes("calcul mental") ||
      normalizedTitle.includes("atelier problemes"))
  ) {
    return { methodId: MATHS_CE1_METHOD_ID, mode: "current" };
  }

  if (normalizedTitle.includes("langage oral")) {
    return { methodId: "m-langage-oral-ce", mode: "next" };
  }

  if (normalizedTitle.includes("orthographemic")) {
    return { methodId: ORTHO_METHOD.id, mode: "next" };
  }

  if (normalizedTitle.includes("dictee bilan")) {
    return { methodId: ORTHO_METHOD.id, mode: "current" };
  }

  if (session.subject === "qlm" || normalizedTitle.includes("questionner le monde")) {
    return { methodId: "m-qlm-mdi-guide", mode: "next" };
  }

  if (session.subject === "lve" || normalizedTitle.includes("anglais")) {
    return { methodId: "m-well-done-ce1", mode: "next" };
  }

  if (
    session.subject === "arts" &&
    (normalizedTitle.includes("education musicale") || normalizedTitle.includes("musique"))
  ) {
    return { methodId: "m-vivre-la-musique-ce1", mode: "next" };
  }

  if (
    session.subject === "francais" &&
    (templateId === "production-ecrit" || normalizedTitle.includes("production d ecrit"))
  ) {
    return { methodId: "m-mdi-production-ecrit", mode: "next" };
  }

  if (
    session.subject === "francais" &&
    (normalizedTitle.includes("ecriture (copie)") ||
      normalizedTitle.includes("ecriture (calligraphie)") ||
      normalizedTitle.includes("ecriture"))
  ) {
    return { methodId: "m-mdi-ecriture-transition", mode: "next" };
  }

  const customFrenchMissingMessage = frenchMissingMessage(session);
  if (customFrenchMissingMessage) {
    return {
      methodId: "",
      mode: "next",
      missingMessage: customFrenchMissingMessage,
    };
  }

  if (
    ["francais", "qlm", "emc", "arts", "lve"].includes(session.subject) &&
    !session.resourceId &&
    !session.prepSheetId
  ) {
    return {
      methodId: "",
      mode: "next",
      missingMessage:
        "Suite non retrouvée dans les ressources existantes. Utiliser Plume d'Ardoise pour prolonger le projet à partir de ce qui a déjà été travaillé.",
    };
  }

  return null;
}

function sortedHistory(store: JournalStore, currentDateKey: string): Session[] {
  return Object.entries(store)
    .filter(([dateKey]) => dateKey <= currentDateKey)
    .sort(([left], [right]) => left.localeCompare(right))
    .flatMap(([, sessions]) =>
      [...sessions].sort((left, right) => left.start.localeCompare(right.start)),
    );
}

function lastResourceIndex(
  method: ResourceMethod,
  sessions: Session[],
  currentSessionId?: string,
): number {
  const orderedIds = flatSessions(method).map((resource) => resource.id);
  let highestIndex = -1;

  for (const session of sessions) {
    if (currentSessionId && session.id === currentSessionId) continue;
    const resourceId = session.resourceId ?? resourceIdFromProgramming(session.programmingItemId);
    if (!resourceId) continue;
    const index = orderedIds.indexOf(resourceId);
    if (index > highestIndex) highestIndex = index;
  }

  return highestIndex;
}

function describeMissing(session: Session, missingMessage?: string): Session {
  if (!missingMessage) return session;
  if (session.note?.includes(missingMessage)) return session;
  return {
    ...session,
    note: session.note ? `${session.note}\n\n${missingMessage}` : missingMessage,
  };
}

async function resourceTitle(resource: ResourceSession): Promise<string> {
  const prep = await loadPatchedPrepSheet(resource.prepSheetId || undefined);
  if (prep?.title) return prep.title;

  return resource.label
    .replace(/^p\.\s*\d+\s+—\s*/i, "")
    .replace(/^s\d+\s+—\s*/i, "")
    .replace(/\s+·\s+guide p\..*$/i, "")
    .replace(/\s+·\s+p\..*$/i, "")
    .trim();
}

async function applyResolvedResource(
  session: Session,
  resource: ResourceSession,
): Promise<Session> {
  const programmingItemId = programmingItemIdFromResource(resource.id);
  const prep = await loadPatchedPrepSheet(resource.prepSheetId || undefined);
  const note =
    !prep && resource.label
      ? session.note
        ? session.note
        : `Ressource rattachée automatiquement : ${resource.label}`
      : session.note;

  const next: Session = {
    ...session,
    free: false,
    title: prep?.title || (await resourceTitle(resource)) || session.title,
    resourceId: resource.id,
    prepSheetId: resource.prepSheetId || undefined,
    programmingItemId,
    exercisePlan: getExercisePlan(programmingItemId),
    note,
  };

  if (/^e_p\d+_\d+$/i.test(programmingItemId ?? "")) {
    next.correctionMode = "cleo";
    next.correctionExerciseId = programmingItemId;
  } else if (/^m\d+$/i.test(programmingItemId ?? "")) {
    next.correctionMode = "maths";
    next.correctionExerciseId = programmingItemId;
  } else if (/^ortho-s\d+$/i.test(programmingItemId ?? "")) {
    if (normalize(session.title).includes("dictee bilan")) {
      next.correctionMode = "dictation";
      next.correctionExerciseId = programmingItemId;
    } else {
      next.correctionMode = "none";
      next.correctionExerciseId = undefined;
    }
  }

  return next;
}

async function applyResolvedResourceWithStrategy(
  session: Session,
  resource: ResourceSession,
  resolution: MethodResolution,
): Promise<Session> {
  const resolved = await applyResolvedResource(session, resource);

  if (
    !resolution.keepOriginalTitle &&
    !resolution.skipPrepSheet &&
    !resolution.skipCorrectionLink
  ) {
    return resolved;
  }

  return {
    ...resolved,
    title: resolution.keepOriginalTitle ? session.title : resolved.title,
    prepSheetId: resolution.skipPrepSheet ? undefined : resolved.prepSheetId,
    correctionMode: resolution.skipCorrectionLink ? "none" : resolved.correctionMode,
    correctionExerciseId: resolution.skipCorrectionLink ? undefined : resolved.correctionExerciseId,
  };
}

export async function autofillJournalDay(
  dateKey: string,
  sessions: Session[],
  store: JournalStore,
): Promise<JournalAutofillResult> {
  const resourceMethods: ResourceMethod[] = [...(await loadMergedResourceTree()), ORTHO_METHOD];
  const resourceMethodById = new Map(resourceMethods.map((method) => [method.id, method]));
  const workingHistory = sortedHistory(store, dateKey).filter(
    (session) => !sessions.some((current) => current.id === session.id),
  );
  const nextSessions: Session[] = [];
  let linkedCount = 0;
  let missingCount = 0;
  const missingTitles: string[] = [];

  for (const session of sessions) {
    if (session.subject === "pause" || session.subject === "rituels") {
      nextSessions.push(session);
      continue;
    }

    if (session.resourceId || session.prepSheetId || session.programmingItemId) {
      nextSessions.push(session);
      workingHistory.push(session);
      if (session.resourceId || session.prepSheetId) linkedCount += 1;
      continue;
    }

    const attachedMethodId = await methodIdFromAttachedSession(session);
    const resolution: MethodResolution | null = attachedMethodId
      ? {
          methodId: attachedMethodId,
          mode: attachedMethodId === MATHS_CE1_METHOD_ID ? "current" : "next",
        }
      : resolveMethod(session);
    if (!resolution) {
      nextSessions.push(session);
      workingHistory.push(session);
      continue;
    }

    if (!resolution.methodId) {
      missingCount += 1;
      missingTitles.push(session.title);
      const unresolved = describeMissing(session, resolution.missingMessage);
      nextSessions.push(unresolved);
      workingHistory.push(unresolved);
      continue;
    }

    const method = resourceMethodById.get(resolution.methodId);
    if (!method) {
      missingCount += 1;
      missingTitles.push(session.title);
      const unresolved = describeMissing(
        session,
        "Méthode attendue non retrouvée dans les ressources disponibles.",
      );
      nextSessions.push(unresolved);
      workingHistory.push(unresolved);
      continue;
    }

    const orderedResources = flatSessions(method);
    const lastIndex = lastResourceIndex(method, [...workingHistory, ...nextSessions], session.id);
    const isGenericAccesMathsSession =
      resolution.methodId === MATHS_CE1_METHOD_ID &&
      (session.builderTemplateId === "sequence-maths-45" ||
        session.builderTemplateId === "sequence-maths-35") &&
      normalize(session.title) === "mathematiques";
    const targetIndex = isGenericAccesMathsSession
      ? Math.max(0, lastIndex)
      : resolution.mode === "current"
        ? lastIndex
        : lastIndex + 1;
    const resource = targetIndex >= 0 ? orderedResources[targetIndex] : orderedResources[0];

    if (!resource) {
      missingCount += 1;
      missingTitles.push(session.title);
      const unresolved = describeMissing(
        session,
        resolution.missingMessage ||
          "Aucune suite disponible dans cette méthode. Utiliser Plume d'Ardoise pour générer la prochaine séance.",
      );
      nextSessions.push(unresolved);
      workingHistory.push(unresolved);
      continue;
    }

    const resolved = await applyResolvedResourceWithStrategy(session, resource, resolution);
    linkedCount += 1;
    nextSessions.push(resolved);
    workingHistory.push(resolved);
  }

  return {
    sessions: nextSessions,
    linkedCount,
    missingCount,
    missingTitles,
  };
}
