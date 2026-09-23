export type BoulardMathsPlannedSession = {
  date: string;
  start: string;
  end: string;
  resourceId: string;
  title: string;
  note: string;
};

const dates = [
  "2026-09-24",
  "2026-09-25",
  "2026-09-28",
  "2026-09-29",
  "2026-10-01",
  "2026-10-02",
  "2026-10-05",
  "2026-10-06",
  "2026-10-08",
  "2026-10-09",
  "2026-10-12",
  "2026-10-13",
  "2026-10-15",
  "2026-10-16",
] as const;

const mainSequence = [
  [4, 1, "Comparer deux nombres avec les dizaines et les unités · p. 68"],
  [4, 1, "Comparer deux nombres · suite de la séance 1 · p. 68"],
  [4, 2, "Placer et lire des nombres sur une demi-droite graduée · p. 70"],
  [4, 3, "Comparaison des nombres · entraînement · p. 70"],
  [4, 4, "Comparaison des nombres · bilan · p. 70"],
  [5, 1, "Groupements par 10 et par 100 · valeur des chiffres · p. 74"],
  [5, 2, "Construire des collections d’un cardinal donné · p. 76"],
  [5, 3, "Groupements par 10 et par 100 · entraînement · p. 77"],
  [5, 4, "Groupements par 10 et par 100 · bilan · p. 78"],
  [6, 1, "Addition posée · réactivation de la technique · p. 82"],
  [6, 2, "Additionner en colonnes deux puis trois nombres · p. 83"],
  [6, 3, "Addition posée · réinvestissement · p. 84"],
  [6, 4, "Addition posée · bilan · p. 84"],
  [7, 1, "Vérifier un alignement · perception puis règle · p. 88"],
] as const;

const mentalDates = dates.filter((date) => date !== "2026-09-25");

const mentalSequence = [
  [2, 4, "Bilan des presque doubles · Calcul chrono P12"],
  [3, 1, "Compléments à 10 · découverte"],
  [3, 2, "Compléments à 10 · entraînement 1"],
  [3, 3, "Compléments à 10 · problèmes oraux"],
  [3, 4, "Compléments à 10 · bilan P16"],
  [4, 1, "Ajouter ou soustraire des dizaines · découverte"],
  [4, 2, "Ajouter ou soustraire des dizaines · entraînement 1"],
  [4, 3, "Ajouter ou soustraire des dizaines · problèmes oraux"],
  [4, 4, "Ajouter ou soustraire des dizaines · bilan P20"],
  [5, 1, "Tables d’addition · sommes inférieures à 10 · découverte"],
  [5, 2, "Tables d’addition · sommes inférieures à 10 · entraînement 1"],
  [5, 3, "Tables d’addition · sommes inférieures à 10 · problèmes oraux"],
  [5, 4, "Tables d’addition · sommes inférieures à 10 · bilan"],
] as const;

const flashDates = dates.filter((date) => date >= "2026-09-28");

const flashSequence = [
  [4, "a", "Monnaie · Flash A"],
  [4, "b", "Monnaie · Flash B"],
  [4, "c", "Monnaie · Flash C"],
  [4, "d", "Monnaie · Flash D"],
  [5, "a", "Rendre la monnaie · Flash A"],
  [5, "b", "Rendre la monnaie · Flash B"],
  [5, "c", "Rendre la monnaie · Flash C"],
  [5, "d", "Rendre la monnaie · Flash D"],
  [6, "a", "Monnaie · Flash A"],
  [6, "b", "Monnaie · Flash B"],
  [6, "c", "Monnaie · Flash C"],
  [6, "d", "Monnaie · Flash D"],
] as const;

const problemDates = [
  "2026-09-25",
  "2026-10-01",
  "2026-10-02",
  "2026-10-08",
  "2026-10-09",
  "2026-10-15",
  "2026-10-16",
] as const;

const problemSequence = [
  [4, 1, "Transformation : rechercher l’état final · gain · P21"],
  [4, 2, "Transformation : rechercher l’état final · perte · P21"],
  [5, 1, "Problèmes parties-tout en une ou deux étapes · p. 79"],
  [5, 2, "Problèmes parties-tout · entraînement autonome · p. 79"],
  [6, 1, "Problèmes additifs en deux étapes · p. 85"],
  [6, 2, "Problèmes additifs en deux étapes · entraînement · p. 85"],
  [7, 1, "Problèmes ouverts · recherche · p. 93"],
] as const;

function mainTimes(date: string) {
  if (date === "2026-09-24") return { start: "10:15", end: "10:35" };
  if (date === "2026-09-25") return { start: "10:05", end: "10:35" };
  const weekday = new Date(`${date}T12:00:00`).getDay();
  if (weekday === 1) return { start: "08:50", end: "09:35" };
  if (weekday === 2) return { start: "10:10", end: "10:55" };
  return { start: "08:50", end: "09:25" };
}

function mentalTimes(date: string) {
  if (date === "2026-09-24") return { start: "10:05", end: "10:15" };
  const weekday = new Date(`${date}T12:00:00`).getDay();
  if (weekday === 1) return { start: "10:25", end: "10:55" };
  if (weekday === 2) return { start: "10:55", end: "11:05" };
  return { start: "09:25", end: "09:35" };
}

function flashTimes(date: string) {
  return new Date(`${date}T12:00:00`).getDay() === 2
    ? { start: "10:05", end: "10:10" }
    : { start: "08:45", end: "08:50" };
}

export const BOULARD_MATHS_P1_PLANNED_SESSIONS: BoulardMathsPlannedSession[] = [
  ...dates.map((date, index) => {
    const [module, session, label] = mainSequence[index];
    return {
      date,
      ...mainTimes(date),
      resourceId: `maths-ce1-p1-m${module}-s${session}`,
      title: `Mathématiques · ${label}`,
      note:
        index === 0
          ? "Point de reprise indiqué par M. Boulard. Après le bilan des presque doubles, commencer la séance 1 page 68. La piscine impose une première partie courte ; poursuivre vendredi."
          : index === 1
            ? "Suite de la séance 1 commencée jeudi après la piscine. Reprendre la manipulation et terminer l’institutionnalisation de la fiche rattachée."
            : "Suivre la fiche de préparation Accès rattachée : déroulé, matériel et pages du guide.",
    };
  }),
  ...mentalDates.map((date, index) => {
    const [module, session, label] = mentalSequence[index];
    return {
      date,
      ...mentalTimes(date),
      resourceId: `maths-ce1-p1-calcul-mental-m${module}-s${session}`,
      title: `Calcul mental · ${label}`,
      note:
        index === 0
          ? "Faire ce bilan avant de commencer les compléments à 10. Imprimer le Calcul chrono P12 pour les 9 élèves. Corriger les calculs les moins réussis et rappeler la procédure double + 1."
          : "Déroulé détaillé et support à préparer dans la fiche de préparation rattachée.",
    };
  }),
  ...flashDates.map((date, index) => {
    const [module, session, label] = flashSequence[index];
    return {
      date,
      ...flashTimes(date),
      resourceId: `maths-ce1-p1-flash-maths-m${module}-s${session}`,
      title: `Flash Maths · ${label}`,
      note: "Rituel de 5 minutes. Ouvrir la fiche rattachée pour la consigne exacte du flash.",
    };
  }),
  ...problemDates.map((date, index) => {
    const [module, session, label] = problemSequence[index];
    return {
      date,
      start: date === "2026-09-25" ? "10:55" : "10:05",
      end: date === "2026-09-25" ? "11:25" : "10:35",
      resourceId: `maths-ce1-p1-atelier-problemes-m${module}-s${session}`,
      title: `Résolution de problèmes · ${label}`,
      note:
        index === 0
          ? "Le problème des trois stylos à 5 € et de la trousse clôt le chapitre précédent. Commencer ici le module 4 : transformation, recherche de l’état final."
          : "Suivre la fiche rattachée. Faire verbaliser ce qui est connu, ce qui est cherché et le choix du schéma avant le calcul.",
    };
  }),
];
