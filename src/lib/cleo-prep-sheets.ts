/**
 * Fiches de préparation réelles pour les 71 séances du guide "Le Monde de
 * Cléo CE1" (Retz, Antoine Fetet), synthétisées à partir du texte réel du
 * guide pédagogique (voir cleo-prep-sheets-p1.ts … p5.ts pour le détail par
 * période). Fichier séparé, mêmes conventions que storage.ts.
 */
import { CLEO_PREP_SHEETS_P1 } from "@/lib/cleo-prep-sheets-p1";
import { CLEO_PREP_SHEETS_P2 } from "@/lib/cleo-prep-sheets-p2";
import { CLEO_PREP_SHEETS_P3 } from "@/lib/cleo-prep-sheets-p3";
import { CLEO_PREP_SHEETS_P4 } from "@/lib/cleo-prep-sheets-p4";
import { CLEO_PREP_SHEETS_P5 } from "@/lib/cleo-prep-sheets-p5";

export const CLEO_PREP_SHEETS = [
  ...CLEO_PREP_SHEETS_P1,
  ...CLEO_PREP_SHEETS_P2,
  ...CLEO_PREP_SHEETS_P3,
  ...CLEO_PREP_SHEETS_P4,
  ...CLEO_PREP_SHEETS_P5,
];
