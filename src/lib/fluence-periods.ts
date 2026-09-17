/**
 * Périodes de mesure de fluence, partagées entre la page /fluence (saisie
 * classique) et le mode examen (src/components/ardoise/fluence-exam-mode.tsx).
 * Extrait de src/routes/fluence.tsx pour éviter un import circulaire entre
 * la route et le composant de mode examen.
 */

/** Chapitres lettre de la méthode Orthographémic CE1, avec leur cible de fluence. */
export const ORTHO_CHAPTERS = [
  { key: "Bilan A", letter: "A", fullLabel: "Chapitre A", target: 55, period: 1 },
  { key: "Bilan O", letter: "O", fullLabel: "Chapitre O", target: 58, period: 2 },
  { key: "Bilan E", letter: "E", fullLabel: "Chapitre E", target: 60, period: 2 },
  { key: "Bilan C", letter: "C", fullLabel: "Chapitre C", target: 64, period: 3 },
  { key: "Bilan G", letter: "G", fullLabel: "Chapitre G", target: 67, period: 3 },
  { key: "Bilan S", letter: "S", fullLabel: "Chapitre S", target: 68, period: 4 },
  { key: "Bilan I", letter: "I", fullLabel: "Chapitre I", target: 70, period: 5 },
] as const;

export type OrthoChapterKey = (typeof ORTHO_CHAPTERS)[number]["key"];

/** Point de départ diagnostique Orthographémic — semaine 1 de CE1. */
export const DIAGNOSTIC_PERIOD = {
  key: "Diagnostic S1",
  label: "Diagnostic — début de CE1",
  target: 50,
} as const;

/** Repères généraux (hors bilans de chapitre). */
export const GENERIC_PERIODS = ["Octobre", "Janvier", "Juin"] as const;

/** Cible Orthographémic pour une période donnée (null si période générale). */
export function orthoTargetForPeriod(period: string): number | null {
  if (period === DIAGNOSTIC_PERIOD.key) return DIAGNOSTIC_PERIOD.target;
  return ORTHO_CHAPTERS.find((c) => c.key === period)?.target ?? null;
}

/** Toutes les périodes disponibles dans le modal de saisie / mode examen. */
export const ALL_PERIODS: string[] = [
  DIAGNOSTIC_PERIOD.key,
  ...ORTHO_CHAPTERS.map((c) => c.key),
  ...GENERIC_PERIODS,
];
