/**
 * Resource bridge — EMC CE1
 * Enseignement Moral et Civique — Guide pédagogique.
 *
 * Thèmes CE1 inclus :
 *   T1 — Altérité et sociabilité               (4 séances, p.71-86)
 *   T2 — Règles collectives et prises d'initiative (3 séances, p.89-100)
 *   T3 — Principes et symboles de la République (4 séances, p.103-118)
 */
import type { PrepSheet, ResourceMethod } from "@/lib/ardoise-data";
import { EMC_CE1_PREP_SHEETS } from "@/lib/emc-ce1-prep-sheets";

// ─── Lookup map ─────────────────────────────────────────────────────────────
const sheetById = new Map<string, PrepSheet>(
  EMC_CE1_PREP_SHEETS.map((s) => [s.id, s]),
);

export function getEmcCe1PrepSheet(id?: string): PrepSheet | undefined {
  if (!id) return undefined;
  return sheetById.get(id);
}

// ─── Séquences ──────────────────────────────────────────────────────────────

const SEQ_T1 = {
  id: "emc-seq-t1",
  label: "Thème 1 — Altérité et sociabilité",
  sessions: [
    {
      id: "emc-s01-01-res",
      label: "F12 — Ça veut dire quoi «être différent»? · p.71-74 · 45 min",
      prepSheetId: "emc-s01-01",
    },
    {
      id: "emc-s01-02-res",
      label: "F13 — Qu'est-ce que le harcèlement? · p.75-78 · 45 min",
      prepSheetId: "emc-s01-02",
    },
    {
      id: "emc-s01-03-res",
      label: "F14 — Qu'est-ce qu'un stéréotype? · p.79-82 · 45 min",
      prepSheetId: "emc-s01-03",
    },
    {
      id: "emc-s01-04-res",
      label: "F15 — Comment peut-on s'entraider? · p.83-86 · 45 min",
      prepSheetId: "emc-s01-04",
    },
  ],
};

const SEQ_T2 = {
  id: "emc-seq-t2",
  label: "Thème 2 — Règles collectives et prises d'initiative",
  sessions: [
    {
      id: "emc-s02-01-res",
      label: "F16 — Comment se comporter pour bien apprendre à l'école? · p.89-92 · 45 min",
      prepSheetId: "emc-s02-01",
    },
    {
      id: "emc-s02-02-res",
      label: "F17 — Pourquoi faut-il respecter les biens communs? · p.93-96 · 45 min",
      prepSheetId: "emc-s02-02",
    },
    {
      id: "emc-s02-03-res",
      label: "F18 — Que faire face à une situation dangereuse? · p.97-100 · 45 min",
      prepSheetId: "emc-s02-03",
    },
  ],
};

const SEQ_T3 = {
  id: "emc-seq-t3",
  label: "Thème 3 — Principes et symboles de la République",
  sessions: [
    {
      id: "emc-s03-01-res",
      label: "F19 — C'est quoi la laïcité? · p.103-106 · 45 min",
      prepSheetId: "emc-s03-01",
    },
    {
      id: "emc-s03-02-res",
      label: "F20 — Quels sont les symboles de la République? · p.107-110 · 50 min",
      prepSheetId: "emc-s03-02",
    },
    {
      id: "emc-s03-03-res",
      label: "F21 — Le français, langue de la République · p.111-114 · 45 min",
      prepSheetId: "emc-s03-03",
    },
    {
      id: "emc-s03-04-res",
      label: "F22 — Qu'est-ce qu'un lieu de mémoire? · p.115-118 · 50 min",
      prepSheetId: "emc-s03-04",
    },
  ],
};

// ─── ResourceMethod exportée ─────────────────────────────────────────────────
export const EMC_CE1_RESOURCE_METHOD: ResourceMethod = {
  id: "m-emc-ce1",
  label: "EMC (séances animées)",
  subject: "emc",
  sequences: [SEQ_T1, SEQ_T2, SEQ_T3],
};

// Session prep-sheet IDs (pour getPatchedPrepSheet)
export const EMC_CE1_SESSION_PREP_SHEETS: PrepSheet[] = EMC_CE1_PREP_SHEETS;
