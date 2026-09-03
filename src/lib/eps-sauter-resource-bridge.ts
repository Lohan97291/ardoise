/**
 * Resource bridge — EPS · Sauter (ACCÈS « Vivre l'EPS 6 à 8 ans »)
 *
 * 3 séances : sauter loin, sauter haut, sauter vers les multibonds.
 */
import type { PrepSheet, ResourceMethod } from "@/lib/ardoise-data";
import { EPS_SAUTER_PREP_SHEETS } from "@/lib/eps-sauter-prep-sheets";

const sheetById = new Map<string, PrepSheet>(
  EPS_SAUTER_PREP_SHEETS.map((s) => [s.id, s]),
);

export function getEpsSauterPrepSheet(id?: string): PrepSheet | undefined {
  if (!id) return undefined;
  return sheetById.get(id);
}

const SEQ_SAUT = {
  id: "eps-saut-seq",
  label: "Saut",
  sessions: [
    { id: "eps-saut-loin-res", label: "Sauter loin · 45 min", prepSheetId: "eps-saut-loin" },
    { id: "eps-saut-haut-res", label: "Sauter haut · 45 min", prepSheetId: "eps-saut-haut" },
    {
      id: "eps-saut-multibonds-res",
      label: "Sauter vers les multibonds · 45 min",
      prepSheetId: "eps-saut-multibonds",
    },
  ],
};

export const EPS_SAUTER_RESOURCE_METHOD: ResourceMethod = {
  id: "m-eps-sauter",
  label: "EPS — Sauter (Accès)",
  subject: "eps",
  sequences: [SEQ_SAUT],
};

export const EPS_SAUTER_SESSION_PREP_SHEETS: PrepSheet[] = EPS_SAUTER_PREP_SHEETS;
