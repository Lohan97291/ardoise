/**
 * Resource bridge — EPS · Courir (ACCÈS « Vivre l'EPS 6 à 8 ans »)
 *
 * Unité d'apprentissage « course » en 7 séances, regroupées en 3 séquences.
 */
import type { PrepSheet, ResourceMethod } from "@/lib/ardoise-data";
import { EPS_COURIR_PREP_SHEETS } from "@/lib/eps-courir-prep-sheets";

const sheetById = new Map<string, PrepSheet>(
  EPS_COURIR_PREP_SHEETS.map((s) => [s.id, s]),
);

export function getEpsCourirPrepSheet(id?: string): PrepSheet | undefined {
  if (!id) return undefined;
  return sheetById.get(id);
}

const SEQ_DECOUVERTE = {
  id: "eps-courir-seq-decouverte",
  label: "Découverte & diagnostic",
  sessions: [
    { id: "eps-courir-entree-res", label: "Entrée dans l'activité · 45 min", prepSheetId: "eps-courir-entree" },
    {
      id: "eps-courir-diagnostic-res",
      label: "Situations diagnostiques · 45 min",
      prepSheetId: "eps-courir-diagnostic",
    },
  ],
};

const SEQ_VITE = {
  id: "eps-courir-seq-vite",
  label: "Courir vite",
  sessions: [
    { id: "eps-courir-vite-signal-res", label: "Réagir à un signal · 45 min", prepSheetId: "eps-courir-vite-signal" },
    { id: "eps-courir-vite-ligne-res", label: "En ligne droite · 45 min", prepSheetId: "eps-courir-vite-ligne" },
    {
      id: "eps-courir-obstacles-res",
      label: "Franchir des obstacles · 45 min",
      prepSheetId: "eps-courir-obstacles",
    },
  ],
};

const SEQ_LONGTEMPS = {
  id: "eps-courir-seq-longtemps",
  label: "Courir longtemps",
  sessions: [
    {
      id: "eps-courir-regulier-res",
      label: "Courir régulièrement (seul ou en équipe) · 45 min",
      prepSheetId: "eps-courir-regulier",
    },
    { id: "eps-courir-longtemps-res", label: "Courir longtemps (et ensemble) · 45 min", prepSheetId: "eps-courir-longtemps" },
  ],
};

export const EPS_COURIR_RESOURCE_METHOD: ResourceMethod = {
  id: "m-eps-courir",
  label: "EPS — Courir (Accès)",
  subject: "eps",
  sequences: [SEQ_DECOUVERTE, SEQ_VITE, SEQ_LONGTEMPS],
};

export const EPS_COURIR_SESSION_PREP_SHEETS: PrepSheet[] = EPS_COURIR_PREP_SHEETS;
