import type { ResourceMethod } from "@/lib/ardoise-data";
import { ORAL_CATALOG } from "@/lib/ardoise-eval";
import { CLEO_SEANCES } from "@/lib/cleo-seances";
import {
  MATHS_CE1_ATELIER_PROBLEMES_P1_RESOURCE_METHOD,
  MATHS_CE1_CALCUL_MENTAL_P1_RESOURCE_METHOD,
  MATHS_CE1_FLASH_MATHS_P1_RESOURCE_METHOD,
  MATHS_CE1_RESOURCE_METHOD,
} from "@/lib/maths-ce1-resource-bridge";
import { MDI_ECRITURE_TRANSITION_RESOURCE_METHOD } from "@/lib/mdi-ecriture-transition-resource-bridge";
import { QLM_MDI_GUIDE_RESOURCE_METHOD } from "@/lib/qlm-mdi-guide-resource-bridge";
import { WELL_DONE_CE1_RESOURCE_METHOD } from "@/lib/well-done-ce1-resource-bridge";
import { VIVRE_LA_MUSIQUE_CE1_RESOURCE_METHOD } from "@/lib/vivre-la-musique-ce1-resource-bridge";

const PERIODS = [1, 2, 3, 4, 5] as const;

export const REAL_CLEO_METHOD: ResourceMethod = {
  id: "m-cleo",
  label: "Cléo CE1 — Français",
  subject: "francais",
  sequences: PERIODS.map((p) => ({
    id: `s-cleo-p${p}`,
    label: `Période ${p}`,
    sessions: CLEO_SEANCES.filter((s) => s.period === p)
      .sort((a, b) => a.fichierPage - b.fichierPage)
      .map((s) => ({
        id: s.id,
        label: `p. ${s.fichierPage} — ${s.title} · guide p. ${s.guidePage}`,
        prepSheetId: s.id,
      })),
  })).filter((sequence) => sequence.sessions.length > 0),
};

export const REAL_ORAL_METHOD: ResourceMethod = {
  id: "m-langage-oral-ce",
  label: "Langage oral CE — Guide pédagogique",
  subject: "francais",
  sequences: PERIODS.map((p) => ({
    id: `s-langage-oral-ce-p${p}`,
    label: `Période ${p}`,
    sessions: ORAL_CATALOG.filter((s) => s.period === p).map((s) => ({
      id: `langage-oral-ce-${s.id}`,
      label: `S${s.seanceNum} — ${s.title}`,
      prepSheetId: `langage-oral-ce-${s.id}`,
    })),
  })).filter((sequence) => sequence.sessions.length > 0),
};

/**
 * Sources affichées dans Ressources et dans le sélecteur des séances.
 * Ne pas réintroduire RESOURCE_TREE ici : il contient les anciennes données
 * de démonstration conservées pour compatibilité avec le reste de l'application.
 */
export const PATCHED_RESOURCE_TREE: ResourceMethod[] = [
  REAL_CLEO_METHOD,
  MATHS_CE1_RESOURCE_METHOD,
  MATHS_CE1_ATELIER_PROBLEMES_P1_RESOURCE_METHOD,
  MATHS_CE1_CALCUL_MENTAL_P1_RESOURCE_METHOD,
  MATHS_CE1_FLASH_MATHS_P1_RESOURCE_METHOD,
  REAL_ORAL_METHOD,
  MDI_ECRITURE_TRANSITION_RESOURCE_METHOD,
  QLM_MDI_GUIDE_RESOURCE_METHOD,
  WELL_DONE_CE1_RESOURCE_METHOD,
  VIVRE_LA_MUSIQUE_CE1_RESOURCE_METHOD,
];
