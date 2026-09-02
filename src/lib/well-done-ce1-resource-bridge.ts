import type { PrepExercise, PrepPhase, PrepSheet, ResourceMethod } from "@/lib/ardoise-data";
import { wellDoneCe1Corrections } from "@/lib/well-done-ce1-corrections";
import { wellDoneCe1PrepSheets } from "@/lib/well-done-ce1-prep-sheets";
import { wellDoneCe1Programming } from "@/lib/well-done-ce1-programming";
import type { ImportedEnglishPrepSheet } from "@/lib/well-done-ce1-prep-sheets";

type ImportedSequenceSheet = ImportedEnglishPrepSheet;

const correctionByExerciseId = new Map<string, string>(
  wellDoneCe1Corrections.map((item) => [item.exerciseId, item.correction]),
);

const sequenceSheetById = new Map(wellDoneCe1PrepSheets.map((sheet) => [sheet.id, sheet]));

function formatPages(prefix: string, pages: readonly number[]) {
  if (pages.length === 0) return `${prefix} : [À VÉRIFIER]`;
  return `${prefix} : p. ${pages.join(", ")}`;
}

function sessionLabel(sequence: ImportedSequenceSheet, phase: PrepPhase, sessionNumber: number) {
  const guidePages = sequence.teacherPages.length
    ? ` · guide p. ${sequence.teacherPages.join("-")}`
    : "";
  return `${phase.title} — ${sequence.title}${guidePages}`;
}

function sessionExercises(sequence: ImportedSequenceSheet, sessionNumber: number): PrepExercise[] {
  const numberLabel = `Séance ${sessionNumber}`;
  return sequence.exercises
    .filter(
      (exercise) =>
        exercise.number === numberLabel ||
        exercise.title?.includes(numberLabel) ||
        exercise.id.endsWith(`ex-${sessionNumber}`),
    )
    .map((exercise) => ({
      ...exercise,
      correction: correctionByExerciseId.get(exercise.id),
    }));
}

function buildPhotocopies(sequence: ImportedSequenceSheet) {
  const items = [
    formatPages("Fichier élève", sequence.studentPages),
    formatPages("Guide enseignant", sequence.teacherPages),
  ];

  if (sequence.materialPages.length > 0) {
    items.push(formatPages("Fiches matériel", sequence.materialPages));
  }

  return items;
}

function buildNotes(sequence: ImportedSequenceSheet, sessionNumber: number) {
  const items = [
    `Programmation annuelle : séquence ${sequence.sequenceNumber} — ${sequence.sequenceTitle}`,
    `Activité support : ${sequence.title}`,
    `Séance : ${sessionNumber}/${sequence.sessionCount}`,
  ];

  if (sequence.period === null) {
    items.push("Période Ardoise : [À VÉRIFIER]");
  } else {
    items.push(`Période Ardoise : ${sequence.period}`);
  }

  if (sequence.pdfPages.length > 0) {
    items.push(formatPages("Pages du PDF scanné", sequence.pdfPages));
  }

  return items;
}

function buildSessionPrepSheet(
  sequence: ImportedSequenceSheet,
  phase: PrepPhase,
  sessionNumber: number,
): PrepSheet {
  return {
    id: `${sequence.id}-session-${sessionNumber}`,
    title: `${sequence.sequenceTitle} — ${phase.title}`,
    subject: "lve",
    objective: sequence.objective,
    competence: sequence.competence,
    duration: phase.duration ?? sequence.duration ?? "",
    phases: [phase],
    material: sequence.material,
    photocopies: buildPhotocopies(sequence),
    vocabulary: [...sequence.vocabulary],
    languageStructures: [...sequence.languageStructures],
    studentPages: [...sequence.studentPages],
    teacherPages: [...sequence.teacherPages],
    audioVideo: sequence.audioVideo ? [...sequence.audioVideo] : [],
    exercises: sessionExercises(sequence, sessionNumber),
    notes: buildNotes(sequence, sessionNumber),
    coverageNote: sequence.coverageNote,
    sourceExcerpt: sequence.sourceExcerpt,
  };
}

export const WELL_DONE_CE1_SESSION_PREP_SHEETS: PrepSheet[] =
  wellDoneCe1Programming.sequences.flatMap((programmingSequence) => {
    const sequence = sequenceSheetById.get(programmingSequence.id);
    if (!sequence) return [];

    return sequence.phases.map((phase, index) => buildSessionPrepSheet(sequence, phase, index + 1));
  });

const sessionPrepSheetById = new Map(
  WELL_DONE_CE1_SESSION_PREP_SHEETS.map((sheet) => [sheet.id, sheet]),
);

export function getWellDoneCe1PrepSheet(id?: string): PrepSheet | undefined {
  if (!id) return undefined;
  return sessionPrepSheetById.get(id);
}

export const WELL_DONE_CE1_RESOURCE_METHOD: ResourceMethod = {
  id: "m-well-done-ce1",
  label: "Anglais (Well done!)",
  subject: "lve",
  sequences: wellDoneCe1Programming.sequences
    .map((programmingSequence) => {
      const sequence = sequenceSheetById.get(programmingSequence.id);
      if (!sequence) return null;

      return {
        id: `well-done-sequence-${programmingSequence.order}`,
        label: `Séquence ${programmingSequence.order} — ${programmingSequence.sequenceTitle}`,
        sessions: sequence.phases.map((phase, index) => {
          const sessionNumber = index + 1;
          return {
            id: `${sequence.id}-resource-session-${sessionNumber}`,
            label: sessionLabel(sequence, phase, sessionNumber),
            prepSheetId: `${sequence.id}-session-${sessionNumber}`,
          };
        }),
      };
    })
    .filter((sequence): sequence is NonNullable<typeof sequence> => sequence !== null),
};
