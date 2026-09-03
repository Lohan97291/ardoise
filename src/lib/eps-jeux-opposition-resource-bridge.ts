/**
 * Resource bridge — EPS · Jeux d'opposition (ACCÈS « Vivre l'EPS 6 à 8 ans »)
 *
 * Unité d'apprentissage en 5 séances : entrée dans l'activité, situations
 * diagnostiques, puis trois séances de situations d'apprentissage.
 */
import type { PrepSheet, ResourceMethod } from "@/lib/ardoise-data";
import { EPS_JEUX_OPPOSITION_PREP_SHEETS } from "@/lib/eps-jeux-opposition-prep-sheets";

const sheetById = new Map<string, PrepSheet>(
  EPS_JEUX_OPPOSITION_PREP_SHEETS.map((s) => [s.id, s]),
);

export function getEpsJeuxOppositionPrepSheet(id?: string): PrepSheet | undefined {
  if (!id) return undefined;
  return sheetById.get(id);
}

const SEQ_ENTREE = {
  id: "eps-opp-seq-entree",
  label: "Entrée dans l'activité & diagnostic",
  sessions: [
    { id: "eps-opp-entree-res", label: "Entrée dans l'activité · 45 min", prepSheetId: "eps-opp-entree" },
    {
      id: "eps-opp-diagnostic-res",
      label: "Situations diagnostiques · 45 min",
      prepSheetId: "eps-opp-diagnostic",
    },
  ],
};

const SEQ_APPRENTISSAGE = {
  id: "eps-opp-seq-apprentissage",
  label: "Situations d'apprentissage",
  sessions: [
    {
      id: "eps-opp-appr-1-res",
      label: "1 — Conquérir et résister · 45 min",
      prepSheetId: "eps-opp-apprentissage-1",
    },
    {
      id: "eps-opp-appr-2-res",
      label: "2 — Contrôler l'adversaire · 45 min",
      prepSheetId: "eps-opp-apprentissage-2",
    },
    {
      id: "eps-opp-appr-3-res",
      label: "3 — Retourner, saisir, défendre une zone · 45 min",
      prepSheetId: "eps-opp-apprentissage-3",
    },
  ],
};

export const EPS_JEUX_OPPOSITION_RESOURCE_METHOD: ResourceMethod = {
  id: "m-eps-jeux-opposition",
  label: "EPS — Jeux d'opposition (Accès)",
  subject: "eps",
  sequences: [SEQ_ENTREE, SEQ_APPRENTISSAGE],
};

export const EPS_JEUX_OPPOSITION_SESSION_PREP_SHEETS: PrepSheet[] = EPS_JEUX_OPPOSITION_PREP_SHEETS;
