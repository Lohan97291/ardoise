/**
 * Resource bridge — Littérature CE1
 *
 * Méthode « Littérature CE1 » regroupant les séquences de lecture suivie.
 * Séquence disponible :
 *   • Soupçon (Bernard Friot) — 7 séances (français, cycle 2, programme 2025)
 *
 * (Le mystère Ferdinand et Le voyage d'Oregon : tapuscrits disponibles,
 *  séquences à ajouter ultérieurement.)
 */
import type { PrepSheet, ResourceMethod } from "@/lib/ardoise-data";
import { LITTERATURE_CE1_PREP_SHEETS } from "@/lib/litterature-ce1-prep-sheets";

// ─── Lookup map ─────────────────────────────────────────────────────────────
const sheetById = new Map<string, PrepSheet>(
  LITTERATURE_CE1_PREP_SHEETS.map((s) => [s.id, s]),
);

export function getLitteratureCe1PrepSheet(id?: string): PrepSheet | undefined {
  if (!id) return undefined;
  return sheetById.get(id);
}

// ─── Séquences ──────────────────────────────────────────────────────────────

const SEQ_SOUPCON = {
  id: "litt-seq-soupcon",
  label: "Soupçon — Bernard Friot (7 séances)",
  sessions: [
    {
      id: "litt-soupcon-s1-res",
      label: "S1 — Entrer dans le récit et formuler des soupçons · 45 min",
      prepSheetId: "litt-soupcon-s1",
    },
    {
      id: "litt-soupcon-s2-res",
      label: "S2 — Se représenter les lieux et suivre le trajet · 45 min",
      prepSheetId: "litt-soupcon-s2",
    },
    {
      id: "litt-soupcon-s3-res",
      label: "S3 — Confronter les soupçons à la réalité · 45 min",
      prepSheetId: "litt-soupcon-s3",
    },
    {
      id: "litt-soupcon-s4-res",
      label: "S4 — Comprendre les émotions du narrateur · 45 min",
      prepSheetId: "litt-soupcon-s4",
    },
    {
      id: "litt-soupcon-s5-res",
      label: "S5 — Organiser et graduer le vocabulaire de la peur · 45 min",
      prepSheetId: "litt-soupcon-s5",
    },
    {
      id: "litt-soupcon-s6-res",
      label: "S6 — Catégoriser, mémoriser et réemployer les mots · 45 min",
      prepSheetId: "litt-soupcon-s6",
    },
    {
      id: "litt-soupcon-s7-res",
      label: "S7 — Anticiper la chute et réagir en lecteur · 45 min",
      prepSheetId: "litt-soupcon-s7",
    },
  ],
};

// ─── ResourceMethod exportée ─────────────────────────────────────────────────
export const LITTERATURE_CE1_RESOURCE_METHOD: ResourceMethod = {
  id: "m-litterature-ce1",
  label: "Littérature CE1 — Lecture suivie",
  subject: "francais",
  sequences: [SEQ_SOUPCON],
};

// Session prep-sheet IDs (pour getPatchedPrepSheet)
export const LITTERATURE_CE1_SESSION_PREP_SHEETS: PrepSheet[] = LITTERATURE_CE1_PREP_SHEETS;
