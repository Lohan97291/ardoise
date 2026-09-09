import { createLocalStore } from "@/lib/local-store";

export type ChangelogEntry = {
  id: string;
  date: string;
  title: string;
  description: string;
};

/**
 * Journal des nouveautés d'Ardoise, affiché aux collègues dans un bandeau
 * discret. Ajoutez une entrée en tête de liste à chaque évolution notable ;
 * chaque entrée a un id stable (ne pas le changer une fois publié).
 */
export const CHANGELOG_ENTRIES: ChangelogEntry[] = [
  {
    id: "2026-09-08-rappel-appel-nouveautes",
    date: "2026-09-08",
    title: "Rappel de l'appel + bandeau des nouveautés",
    description:
      "Une alerte prévient désormais si l'appel n'a pas été fait à 10h et 15h les jours d'école (horaires réglables dans les options, en haut à droite). Ce bandeau des nouveautés a aussi été ajouté pour tenir tout le monde au courant des évolutions d'Ardoise.",
  },
  {
    id: "2026-09-07-evaluations-reperes-ce1",
    date: "2026-09-07",
    title: "Évaluations repères CE1 dans le cahier journal",
    description:
      "Les séances de passation des évaluations nationales repères CE1 2026 ont été intégrées aux bonnes journées du cahier journal.",
  },
  {
    id: "2026-09-06-emploi-du-temps-corrige",
    date: "2026-09-06",
    title: "Emploi du temps corrigé",
    description:
      "L'emploi du temps du lundi et du mardi a été corrigé (créneaux arts plastiques/EPS) et le cahier journal des prochaines semaines régénéré à partir de la bonne trame.",
  },
];

export const CHANGELOG_EVENT = "ardoise:changelog-updated";

const dismissedStore = createLocalStore<string[]>("ardoise.changelog.dismissed.v1", []);

function getDismissedIds(): Set<string> {
  try {
    return new Set(dismissedStore.get());
  } catch {
    return new Set();
  }
}

/** Nouveautés pas encore vues par cet enseignant sur ce navigateur, les plus récentes d'abord. */
export function getVisibleChangelogEntries(limit = 3): ChangelogEntry[] {
  const dismissed = getDismissedIds();
  return CHANGELOG_ENTRIES.filter((entry) => !dismissed.has(entry.id))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);
}

export function dismissChangelogEntries(ids: string[]): void {
  const dismissed = getDismissedIds();
  for (const id of ids) dismissed.add(id);
  dismissedStore.set(Array.from(dismissed));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CHANGELOG_EVENT));
  }
}
