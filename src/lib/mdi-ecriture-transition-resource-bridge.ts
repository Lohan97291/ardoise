import type { PrepSheet, ResourceMethod } from "@/lib/ardoise-data";
import { mdiEcritureTransitionPrepSheets } from "@/lib/mdi-ecriture-transition-prep-sheets";

type ImportedWritingGuidePrepSheet = (typeof mdiEcritureTransitionPrepSheets)[number];

function compactText(text: string, maxLength = 160) {
  const singleLine = text.replace(/\s+/g, " ").trim();
  if (singleLine.length <= maxLength) return singleLine;
  return `${singleLine.slice(0, maxLength - 1).trimEnd()}…`;
}

function formatPages(prefix: string, pages: readonly number[]) {
  if (pages.length === 0) return `${prefix} : [À VÉRIFIER]`;
  return `${prefix} : p. ${pages.join(", ")}`;
}

function workbookPagesLabel(sheet: ImportedWritingGuidePrepSheet) {
  return formatPages("Cahier d'écriture", sheet.currentWorkbookPages);
}

function teacherPagesLabel(sheet: ImportedWritingGuidePrepSheet) {
  return formatPages("Guide pédagogique", sheet.teacherPages);
}

function buildPhotocopies(sheet: ImportedWritingGuidePrepSheet) {
  const items = [workbookPagesLabel(sheet)];
  if (sheet.teacherPages.length > 0) {
    items.push(teacherPagesLabel(sheet));
  } else {
    items.push("Guide pédagogique détaillé : [À VÉRIFIER]");
  }
  return items;
}

function buildNotes(sheet: ImportedWritingGuidePrepSheet) {
  const items = [
    `Bloc : ${sheet.group}`,
    `Statut source : ${sheet.sourceStatus}`,
    workbookPagesLabel(sheet),
  ];

  if (sheet.teacherPages.length > 0) {
    items.push(teacherPagesLabel(sheet));
  }

  if (sheet.legacyWorkbookPages.length > 0) {
    items.push(formatPages("Ancien cahier 2018", sheet.legacyWorkbookPages));
  }

  return [...items, ...sheet.notes];
}

function buildPrepSheet(sheet: ImportedWritingGuidePrepSheet): PrepSheet {
  return {
    id: sheet.id,
    title: sheet.title,
    subject: "francais",
    objective: sheet.title,
    competence: sheet.competence,
    duration: "",
    phases: sheet.phases.map((phase) => ({
      title: compactText(phase.title, 80),
      detail: phase.detail,
    })),
    material: [],
    photocopies: buildPhotocopies(sheet),
    studentPages: [...sheet.currentWorkbookPages],
    teacherPages: [...sheet.teacherPages],
    notes: buildNotes(sheet),
    coverageNote: sheet.coverageNote,
    sourceExcerpt: sheet.sourceExcerpt,
  };
}

export const MDI_ECRITURE_TRANSITION_SESSION_PREP_SHEETS: PrepSheet[] =
  mdiEcritureTransitionPrepSheets.map((sheet) => buildPrepSheet(sheet));

const prepSheetById = new Map(
  MDI_ECRITURE_TRANSITION_SESSION_PREP_SHEETS.map((sheet) => [sheet.id, sheet]),
);

export function getMdiEcritureTransitionPrepSheet(id?: string): PrepSheet | undefined {
  if (!id) return undefined;
  return prepSheetById.get(id);
}

const GROUP_ORDER = [
  "Avant d'écrire",
  "L'écriture des lettres",
  "Consolidation",
  "Stratégies de copie",
] as const;

export const MDI_ECRITURE_TRANSITION_RESOURCE_METHOD: ResourceMethod = {
  id: "m-mdi-ecriture-transition",
  label: "Écriture MDI — Transition 2025",
  subject: "francais",
  sequences: GROUP_ORDER.map((group) => {
    const sessions = mdiEcritureTransitionPrepSheets
      .filter((sheet) => sheet.group === group)
      .map((sheet) => {
        const pageStart = sheet.currentWorkbookPages[0];
        const pageEnd = sheet.currentWorkbookPages[sheet.currentWorkbookPages.length - 1];
        const pageLabel = pageStart === pageEnd ? `p. ${pageStart}` : `p. ${pageStart}-${pageEnd}`;
        const updateLabel = sheet.updateNeeded ? " · à mettre à jour" : "";

        return {
          id: `${sheet.id}-resource`,
          label: `${pageLabel} — ${sheet.title}${updateLabel}`,
          prepSheetId: sheet.id,
        };
      });

    return {
      id: `mdi-ecriture-transition-${group.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      label: group,
      sessions,
    };
  }).filter((sequence) => sequence.sessions.length > 0),
};
