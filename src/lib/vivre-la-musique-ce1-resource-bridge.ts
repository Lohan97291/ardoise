/**
 * Resource bridge — Vivre la Musique CE1
 * Guide pédagogique ACCÈS Éditions (Cycles 2 et 3).
 *
 * Séquences CE1 incluses :
 *   04 — Au Rythme de la Nature  (7 séances, p.98-113)
 *   05 — Chut!                   (7 séances, p.116-131)
 *   06 — Panorama                (7 séances, p.134-149)
 */
import type { PrepSheet, ResourceMethod } from "@/lib/ardoise-data";
import { VIVRE_LA_MUSIQUE_CE1_PREP_SHEETS } from "@/lib/vivre-la-musique-ce1-prep-sheets";

// ─── Lookup map ─────────────────────────────────────────────────────────────
const sheetById = new Map<string, PrepSheet>(
  VIVRE_LA_MUSIQUE_CE1_PREP_SHEETS.map((s) => [s.id, s]),
);

export function getVlmCe1PrepSheet(id?: string): PrepSheet | undefined {
  if (!id) return undefined;
  return sheetById.get(id);
}

// ─── Séquences ──────────────────────────────────────────────────────────────

const SEQ_04 = {
  id: "vlm-seq-04",
  label: "Séquence 04 — Au Rythme de la Nature",
  sessions: [
    {
      id: "vlm-s04-01-res",
      label: "S1 — Musique verte · p.98-99 · 55 min",
      prepSheetId: "vlm-s04-01",
    },
    {
      id: "vlm-s04-02-res",
      label: "S2 — Symphonie forestière · p.100-101 · 60+40 min",
      prepSheetId: "vlm-s04-02",
    },
    {
      id: "vlm-s04-03-res",
      label: "S3 — Pastorale · p.102-103 · 40 min",
      prepSheetId: "vlm-s04-03",
    },
    {
      id: "vlm-s04-04-res",
      label: "S4 — L'arbre qui chante · p.104-105 · 70 min",
      prepSheetId: "vlm-s04-04",
    },
    {
      id: "vlm-s04-05-res",
      label: "S5 — Jeu de la forêt · p.106-107 · 55 min",
      prepSheetId: "vlm-s04-05",
    },
    {
      id: "vlm-s04-06-res",
      label: "S6 — Swing dans les bois · p.108-111 · 30+35 min",
      prepSheetId: "vlm-s04-06",
    },
    {
      id: "vlm-s04-07-res",
      label: "S7 — Si six scies scient · p.112-113 · 55 min",
      prepSheetId: "vlm-s04-07",
    },
  ],
};

const SEQ_05 = {
  id: "vlm-seq-05",
  label: "Séquence 05 — Chut!",
  sessions: [
    {
      id: "vlm-s05-01-res",
      label: "S1 — Le silence de M. Martin · p.116-117 · 30 min",
      prepSheetId: "vlm-s05-01",
    },
    {
      id: "vlm-s05-02-res",
      label: "S2 — Sans son · p.118-119 · 50 min",
      prepSheetId: "vlm-s05-02",
    },
    {
      id: "vlm-s05-03-res",
      label: "S3 — Une p'tite pause? · p.120-121 · 35 min",
      prepSheetId: "vlm-s05-03",
    },
    {
      id: "vlm-s05-04-res",
      label: "S4 — Reines du silence · p.122-123 · 60 min",
      prepSheetId: "vlm-s05-04",
    },
    {
      id: "vlm-s05-05-res",
      label: "S5 — De plus en plus fort · p.124-125 · 40 min",
      prepSheetId: "vlm-s05-05",
    },
    {
      id: "vlm-s05-06-res",
      label: "S6 — Chut! · p.126-129 · 30+20 min",
      prepSheetId: "vlm-s05-06",
    },
    {
      id: "vlm-s05-07-res",
      label: "S7 — Gare aux bruits! · p.130-131 · 50+35 min",
      prepSheetId: "vlm-s05-07",
    },
  ],
};

const SEQ_06 = {
  id: "vlm-seq-06",
  label: "Séquence 06 — Panorama",
  sessions: [
    {
      id: "vlm-s06-01-res",
      label: "S1 — Jacques se promène! · p.134-135 · 50+20 min",
      prepSheetId: "vlm-s06-01",
    },
    {
      id: "vlm-s06-02-res",
      label: "S2 — Cartes postales · p.136 · 35 min",
      prepSheetId: "vlm-s06-02",
    },
    {
      id: "vlm-s06-03-res",
      label: "S3 — Instruments du monde · p.138-139 · 60 min",
      prepSheetId: "vlm-s06-03",
    },
    {
      id: "vlm-s06-04-res",
      label: "S4 — Sons du Brésil · p.140-141 · 60 min",
      prepSheetId: "vlm-s06-04",
    },
    {
      id: "vlm-s06-05-res",
      label: "S5 — Viva Samba! · p.142-143 · 45 min",
      prepSheetId: "vlm-s06-05",
    },
    {
      id: "vlm-s06-06-res",
      label: "S6 — Sawubona · p.144-147 · 40+35 min",
      prepSheetId: "vlm-s06-06",
    },
    {
      id: "vlm-s06-07-res",
      label: "S7 — Chanson polyglotte · p.148-149 · 45 min",
      prepSheetId: "vlm-s06-07",
    },
  ],
};

// ─── ResourceMethod exportée ─────────────────────────────────────────────────
export const VIVRE_LA_MUSIQUE_CE1_RESOURCE_METHOD: ResourceMethod = {
  id: "m-vivre-la-musique-ce1",
  label: "Musique (Vivre la Musique)",
  subject: "arts",
  sequences: [SEQ_04, SEQ_05, SEQ_06],
};

// Session prep-sheet IDs (pour getPatchedPrepSheet)
export const VLM_CE1_SESSION_PREP_SHEETS: PrepSheet[] = VIVRE_LA_MUSIQUE_CE1_PREP_SHEETS;
