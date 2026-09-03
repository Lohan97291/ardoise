/**
 * Resource bridge — EPS · Jeux collectifs (ACCÈS « Vivre l'EPS 6 à 8 ans »)
 *
 * Une méthode EPS regroupant les jeux collectifs du domaine de l'opposition,
 * en deux séquences : jeux sans ballon (3) et jeux avec ballon (5).
 */
import type { PrepSheet, ResourceMethod } from "@/lib/ardoise-data";
import { EPS_JEUX_COLLECTIFS_PREP_SHEETS } from "@/lib/eps-jeux-collectifs-prep-sheets";

const sheetById = new Map<string, PrepSheet>(
  EPS_JEUX_COLLECTIFS_PREP_SHEETS.map((s) => [s.id, s]),
);

export function getEpsJeuxCollectifsPrepSheet(id?: string): PrepSheet | undefined {
  if (!id) return undefined;
  return sheetById.get(id);
}

const SEQ_SANS_BALLON = {
  id: "eps-jc-seq-sans-ballon",
  label: "Jeux sans ballon",
  sessions: [
    { id: "eps-jc-sorciers-res", label: "Les sorciers · 45 min", prepSheetId: "eps-jc-sorciers" },
    {
      id: "eps-jc-poules-res",
      label: "Les poules, les renards et les vipères · 45 min",
      prepSheetId: "eps-jc-poules-renards-viperes",
    },
    { id: "eps-jc-drapeau-res", label: "Le drapeau · 45 min", prepSheetId: "eps-jc-drapeau" },
  ],
};

const SEQ_AVEC_BALLON = {
  id: "eps-jc-seq-avec-ballon",
  label: "Jeux avec ballon",
  sessions: [
    { id: "eps-jc-balle-assise-res", label: "La balle assise · 45 min", prepSheetId: "eps-jc-balle-assise" },
    {
      id: "eps-jc-eperviers-res",
      label: "Les éperviers déménageurs · 45 min",
      prepSheetId: "eps-jc-eperviers-demenageurs",
    },
    { id: "eps-jc-esquive-res", label: "L'esquive ballon · 45 min", prepSheetId: "eps-jc-esquive-ballon" },
    {
      id: "eps-jc-brulantes-res",
      label: "Les balles brûlantes · 45 min",
      prepSheetId: "eps-jc-balles-brulantes",
    },
    { id: "eps-jc-chateau-res", label: "Les tours du château · 45 min", prepSheetId: "eps-jc-tours-chateau" },
  ],
};

export const EPS_JEUX_COLLECTIFS_RESOURCE_METHOD: ResourceMethod = {
  id: "m-eps-jeux-collectifs",
  label: "EPS — Jeux collectifs (Accès)",
  subject: "eps",
  sequences: [SEQ_SANS_BALLON, SEQ_AVEC_BALLON],
};

export const EPS_JEUX_COLLECTIFS_SESSION_PREP_SHEETS: PrepSheet[] = EPS_JEUX_COLLECTIFS_PREP_SHEETS;
