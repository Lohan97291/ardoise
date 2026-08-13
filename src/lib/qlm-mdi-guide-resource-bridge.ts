import type { PrepSheet, ResourceMethod } from "@/lib/ardoise-data";
import { qlmMdiGuideDossiers } from "@/lib/qlm-mdi-guide-dossiers";
import type {
  ImportedQlmGuideDossier,
  ImportedQlmGuideSession,
} from "@/lib/qlm-mdi-guide-dossiers";

function compactText(text: string, maxLength = 140) {
  const singleLine = text.replace(/\s+/g, " ").trim();
  if (singleLine.length <= maxLength) return singleLine;
  return `${singleLine.slice(0, maxLength - 1).trimEnd()}…`;
}

function formatPages(prefix: string, pages: readonly number[]) {
  if (pages.length === 0) return `${prefix} : [À VÉRIFIER]`;
  return `${prefix} : p. ${pages.join(", ")}`;
}

function sessionPrepSheetId(dossier: ImportedQlmGuideDossier, session: ImportedQlmGuideSession) {
  return `${dossier.id}-session-${session.number}`;
}

function sessionDisplayTitle(dossier: ImportedQlmGuideDossier, session: ImportedQlmGuideSession) {
  const cleaned = compactText(session.title || `Séance ${session.number}`);
  return cleaned || `Séance ${session.number}`;
}

function sessionObjective(dossier: ImportedQlmGuideDossier, session: ImportedQlmGuideSession) {
  return compactText(
    session.title || dossier.objectives[0] || dossier.title || "[À VÉRIFIER]",
    220,
  );
}

function sessionCompetence(dossier: ImportedQlmGuideDossier) {
  if (dossier.objectives.length > 0) {
    return compactText(dossier.objectives.join(" "), 260);
  }
  return `[À VÉRIFIER] ${dossier.title}`;
}

function sessionNotes(dossier: ImportedQlmGuideDossier, session: ImportedQlmGuideSession) {
  const items = [
    `Partie ${dossier.partNumber} — ${dossier.partTitle}`,
    `Dossier ${dossier.dossierNumber} — ${dossier.title}`,
    `Séance ${session.number}/${dossier.sessions.length}`,
    formatPages("Guide enseignant", dossier.guidePages),
    "Fiches élève / évaluations : non intégrées",
  ];

  if (dossier.progressionNote) {
    items.push(`Progression cycle 2 : ${compactText(dossier.progressionNote, 300)}`);
  }

  if (dossier.skippedProbePages.length > 0) {
    items.push(`Pages écartées : p. ${dossier.skippedProbePages.join(", ")}`);
  }

  return items;
}

function buildPrepSheet(
  dossier: ImportedQlmGuideDossier,
  session: ImportedQlmGuideSession,
): PrepSheet {
  return {
    id: sessionPrepSheetId(dossier, session),
    title: `Dossier ${dossier.dossierNumber} — ${dossier.title} — Séance ${session.number}`,
    subject: "qlm",
    objective: sessionObjective(dossier, session),
    competence: sessionCompetence(dossier),
    duration: "",
    phases:
      session.phases.length > 0
        ? session.phases.map((phase) => ({
            title: compactText(phase.title, 80),
            detail: phase.detail,
          }))
        : [
            {
              title: `Séance ${session.number}`,
              detail: session.rawText || "[À VÉRIFIER]",
            },
          ],
    material: [...dossier.material],
    photocopies: [
      formatPages("Guide enseignant", dossier.guidePages),
      "Fiches élève / évaluations : non intégrées",
    ],
    studentPages: [],
    teacherPages: [...dossier.guidePages],
    notes: sessionNotes(dossier, session),
    coverageNote: dossier.coverageNote,
    sourceExcerpt: session.rawText,
  };
}

export const QLM_MDI_GUIDE_SESSION_PREP_SHEETS: PrepSheet[] = qlmMdiGuideDossiers.flatMap(
  (dossier) => dossier.sessions.map((session) => buildPrepSheet(dossier, session)),
);

const qlmMdiGuidePrepSheetById = new Map(
  QLM_MDI_GUIDE_SESSION_PREP_SHEETS.map((sheet) => [sheet.id, sheet]),
);

export function getQlmMdiGuidePrepSheet(id?: string): PrepSheet | undefined {
  if (!id) return undefined;
  return qlmMdiGuidePrepSheetById.get(id);
}

export const QLM_MDI_GUIDE_RESOURCE_METHOD: ResourceMethod = {
  id: "m-qlm-mdi-guide",
  label: "QLM MDI — Guide enseignant",
  subject: "qlm",
  sequences: qlmMdiGuideDossiers.map((dossier) => ({
    id: dossier.id,
    label: `Partie ${dossier.partNumber} · Dossier ${dossier.dossierNumber} — ${dossier.title}`,
    sessions: dossier.sessions.map((session) => ({
      id: `${dossier.id}-resource-session-${session.number}`,
      label: `Séance ${session.number} — ${sessionDisplayTitle(dossier, session)} · guide p. ${dossier.guidePages.join(", ")}`,
      prepSheetId: sessionPrepSheetId(dossier, session),
    })),
  })),
};
