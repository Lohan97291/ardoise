import { getPrepSheet, type PrepSheet } from "@/lib/ardoise-data";
import { CLEO_PREP_SHEETS } from "@/lib/cleo-prep-sheets";
import { getGeneratedPrepSheet } from "@/lib/generated-resources-storage";
import { LANGAGE_ORAL_PREP_SHEETS } from "@/lib/langage-oral-guide-details";
import {
  getMathsCe1AuxiliaryPrepSheet,
  getMathsCe1PrepSheet,
  MATHS_CE1_AUXILIARY_SESSION_PREP_SHEETS,
  MATHS_CE1_SESSION_PREP_SHEETS,
} from "@/lib/maths-ce1-resource-bridge";
import {
  getMdiEcritureTransitionPrepSheet,
  MDI_ECRITURE_TRANSITION_SESSION_PREP_SHEETS,
} from "@/lib/mdi-ecriture-transition-resource-bridge";
import {
  getMdiPePrepSheet,
  MDI_PE_SESSION_PREP_SHEETS,
} from "@/lib/mdi-pe-resource-bridge";
import {
  getOrthographemicPrepSheet,
  ORTHOGRAPHEMIC_SESSION_PREP_SHEETS,
} from "@/lib/orthographemic-resource-bridge";
import {
  getQlmMdiGuidePrepSheet,
  QLM_MDI_GUIDE_SESSION_PREP_SHEETS,
} from "@/lib/qlm-mdi-guide-resource-bridge";
import {
  getWellDoneCe1PrepSheet,
  WELL_DONE_CE1_SESSION_PREP_SHEETS,
} from "@/lib/well-done-ce1-resource-bridge";
import {
  getVlmCe1PrepSheet,
  VLM_CE1_SESSION_PREP_SHEETS,
} from "@/lib/vivre-la-musique-ce1-resource-bridge";
import {
  getEmcCe1PrepSheet,
  EMC_CE1_SESSION_PREP_SHEETS,
} from "@/lib/emc-ce1-resource-bridge";

export function getPatchedPrepSheet(id?: string): PrepSheet | undefined {
  if (!id) return undefined;

  return (
    getGeneratedPrepSheet(id) ??
    CLEO_PREP_SHEETS.find((prep) => prep.id === id) ??
    MATHS_CE1_SESSION_PREP_SHEETS.find((prep) => prep.id === id) ??
    MATHS_CE1_AUXILIARY_SESSION_PREP_SHEETS.find((prep) => prep.id === id) ??
    LANGAGE_ORAL_PREP_SHEETS.find((prep) => prep.id === id) ??
    ORTHOGRAPHEMIC_SESSION_PREP_SHEETS.find((prep) => prep.id === id) ??
    MDI_PE_SESSION_PREP_SHEETS.find((prep) => prep.id === id) ??
    MDI_ECRITURE_TRANSITION_SESSION_PREP_SHEETS.find((prep) => prep.id === id) ??
    QLM_MDI_GUIDE_SESSION_PREP_SHEETS.find((prep) => prep.id === id) ??
    WELL_DONE_CE1_SESSION_PREP_SHEETS.find((prep) => prep.id === id) ??
    VLM_CE1_SESSION_PREP_SHEETS.find((prep) => prep.id === id) ??
    EMC_CE1_SESSION_PREP_SHEETS.find((prep) => prep.id === id) ??
    getMathsCe1AuxiliaryPrepSheet(id) ??
    getMathsCe1PrepSheet(id) ??
    getOrthographemicPrepSheet(id) ??
    getMdiPePrepSheet(id) ??
    getMdiEcritureTransitionPrepSheet(id) ??
    getQlmMdiGuidePrepSheet(id) ??
    getWellDoneCe1PrepSheet(id) ??
    getVlmCe1PrepSheet(id) ??
    getEmcCe1PrepSheet(id) ??
    getPrepSheet(id)
  );
}
