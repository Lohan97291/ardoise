/**
 * Persistance localStorage pour la programmation annuelle (vue matricielle).
 * Fichier séparé, mêmes conventions que storage.ts et timetable-storage.ts.
 */
export type ItemStatus = "not_started" | "in_progress" | "completed";

export type ItemState = {
  status: ItemStatus;
  boCompetencies: string[];
  titleOverride?: string;
};

export type ProgressionState = Record<string, ItemState>;

export const PROGRESSION_KEY = "ardoise.programmationAnnuelle.v1";

/** Ancienne clé (programmation.tsx, non modifiée) : Set d'ids "faits", forme JSON string[]. */
const LEGACY_DONE_KEY = "ardoise.programmation.v1";

function emptyItem(): ItemState {
  return { status: "not_started", boCompetencies: [] };
}

export function getProgression(): ProgressionState {
  try {
    const raw = localStorage.getItem(PROGRESSION_KEY);
    if (raw) return JSON.parse(raw) as ProgressionState;
  } catch {
    /* ignore */
  }

  // Migration one-shot : reprendre les items déjà cochés sur l'ancienne page.
  try {
    const legacyRaw = localStorage.getItem(LEGACY_DONE_KEY);
    if (legacyRaw) {
      const legacyIds = JSON.parse(legacyRaw) as string[];
      if (legacyIds.length > 0) {
        const migrated: ProgressionState = {};
        for (const id of legacyIds) migrated[id] = { status: "completed", boCompetencies: [] };
        localStorage.setItem(PROGRESSION_KEY, JSON.stringify(migrated));
        return migrated;
      }
    }
  } catch {
    /* ignore */
  }

  return {};
}

function saveProgression(state: ProgressionState): void {
  localStorage.setItem(PROGRESSION_KEY, JSON.stringify(state));
}

export function getItemState(state: ProgressionState, id: string): ItemState {
  return state[id] ?? emptyItem();
}

export const STATUS_CYCLE: ItemStatus[] = ["not_started", "in_progress", "completed"];

export function nextStatus(current: ItemStatus): ItemStatus {
  const i = STATUS_CYCLE.indexOf(current);
  return STATUS_CYCLE[(i + 1) % STATUS_CYCLE.length]!;
}

export function setItemStatus(id: string, status: ItemStatus): ProgressionState {
  const state = getProgression();
  const item = getItemState(state, id);
  const next = { ...state, [id]: { ...item, status } };
  saveProgression(next);
  return next;
}

export function setItemTitleOverride(id: string, title: string): ProgressionState {
  const state = getProgression();
  const item = getItemState(state, id);
  const next = { ...state, [id]: { ...item, titleOverride: title } };
  saveProgression(next);
  return next;
}

export function addBoCompetency(id: string, text: string): ProgressionState {
  const state = getProgression();
  const item = getItemState(state, id);
  if (item.boCompetencies.includes(text)) return state;
  const next = { ...state, [id]: { ...item, boCompetencies: [...item.boCompetencies, text] } };
  saveProgression(next);
  return next;
}

export function removeBoCompetency(id: string, text: string): ProgressionState {
  const state = getProgression();
  const item = getItemState(state, id);
  const next = {
    ...state,
    [id]: { ...item, boCompetencies: item.boCompetencies.filter((c) => c !== text) },
  };
  saveProgression(next);
  return next;
}

// ─────────────────────────────────────────────
// Domaines : ordre d'affichage par matière
// ─────────────────────────────────────────────
export const FRENCH_DOMAIN_ORDER = ["C", "V", "G", "O"] as const;
export const MATHS_DOMAIN_ORDER = ["nb", "calc", "gm", "geo", "don"] as const;

// ─────────────────────────────────────────────
// Référentiel BO — jeu illustratif (pas une source officielle vérifiée).
// À remplacer par le vrai texte du Bulletin Officiel si tu me le fournis.
// ─────────────────────────────────────────────
export const BO_REFERENTIEL: Record<string, string[]> = {
  C: [
    "Repérer les informations explicites d'un texte.",
    "Mettre en relation le texte avec ses propres connaissances.",
    "Contrôler sa compréhension et rechercher les causes d'un manque de compréhension.",
  ],
  V: [
    "Identifier des mots de sens voisin, des mots de sens opposé.",
    "Regrouper des mots par famille.",
    "Utiliser des mots de liaison exprimant des relations logiques ou chronologiques.",
  ],
  G: [
    "Identifier la phrase et distinguer phrase simple / phrase complexe.",
    "Reconnaître les principaux constituants de la phrase.",
    "Accorder le verbe avec son sujet, l'adjectif avec le nom.",
  ],
  O: [
    "Mémoriser l'orthographe des mots invariables les plus fréquents.",
    "Écrire sans erreur des mots mémorisés.",
    "Utiliser les correspondances graphophonologiques régulières.",
  ],
  nb: [
    "Dénombrer, constituer et comparer des collections.",
    "Nommer, lire, écrire, représenter des nombres entiers.",
    "Résoudre des problèmes en utilisant des nombres entiers.",
  ],
  calc: [
    "Mémoriser des faits numériques et des procédures de calcul mental.",
    "Calculer avec les nombres entiers (addition, soustraction).",
    "Élaborer ou choisir des stratégies de calcul à l'oral et à l'écrit.",
  ],
  gm: [
    "Comparer, estimer, mesurer des longueurs, des masses, des contenances.",
    "Utiliser des instruments de mesure usuels.",
    "Résoudre des problèmes de la vie quotidienne impliquant des grandeurs.",
  ],
  geo: [
    "Reconnaître, nommer, décrire quelques figures planes usuelles.",
    "Reconnaître, décrire quelques solides usuels.",
    "Se repérer et se déplacer dans l'espace.",
  ],
  don: [
    "Lire ou compléter un tableau, un graphique.",
    "Organiser des données en vue d'un traitement.",
  ],
};
