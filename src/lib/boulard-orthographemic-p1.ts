import type { PrepPhase, PrepSheet, ResourceSequence } from "@/lib/ardoise-data";

type Lesson = {
  id: string;
  title: string;
  objective: string;
  duration: string;
  phases: PrepPhase[];
  material: string[];
  photocopies: string[];
  notes: string[];
};

const commonMaterial = [
  "Module Ardoise « L’atelier des étiquettes » (vidéoprojecteur ou écran)",
  "Ardoises, feutres et chiffons",
  "Étiquettes-mots préparées dans deux enveloppes : parcours vert et parcours or",
  "Cahier de dictées / cahier du jour",
];

const commonNotes = [
  "Classe de M. Boulard : 9 élèves, parcours vert et parcours or.",
  "Parcours vert : quantité réduite, lecture accompagnée et droit de manipuler avant d’écrire.",
  "Parcours or : liste complète, justification orthographique et phrase supplémentaire lors de la dictée finale.",
  "Ne pas faire apprendre une nouvelle liste le vendredi 16 octobre : garder cette journée pour corriger le bilan et préparer la remédiation.",
];

const LISTS = {
  3: {
    focus: "an, am, ain et aim",
    green: "grand, grande, orange, une chambre, un copain, demain",
    gold: "un champion",
    finalGreen: "Le copain de papi arrive demain. Il se repose dans la grande chambre orange.",
    finalGold: "Papi est ravi. Son copain était un grand champion de moto.",
    supports:
      "RE7 p. 5-6 ; RE1 p. 14 puis p. 16-17 ; RP2 p. 5 et p. 10 ; RP4 p. 2 ; RE3 p. 5 ; RP8 p. 15",
  },
  4: {
    focus: "ai, ay, ail, aill et aille",
    green: "maison, jamais, balai, bataille",
    gold: "caillou, cailloux",
    finalGreen:
      "Papi ne passe jamais le balai dans la maison. Il préfère jouer à la bataille avec son copain.",
    finalGold: "Papi lance des cailloux dans la mare.",
    supports:
      "RE7 p. 7-8 ; RE1 p. 18-22 (sélectionner les exercices utiles) ; RP2 p. 7-9 ; RP4 p. 3 ; RE3 p. 6",
  },
  5: {
    focus: "réinvestissement des graphèmes de la lettre a",
    green: "chapeau, beau, jaune, aujourd’hui, maillot, train, quai, gare",
    gold: "prochain",
    finalGreen:
      "Aujourd’hui, papi porte un beau chapeau jaune et un maillot orange. Il attend son train sur le quai de la gare.",
    finalGold: "Le prochain train arrive dans une minute. Papi est ravi.",
    supports: "RE7 p. 9-10 ; RE3 p. 7 ou p. 8 ; jeux RP5, RP6 et RP7",
  },
} as const;

function listLesson(listNumber: 3 | 4 | 5, step: "j1" | "j2" | "atelier" | "j3" | "final"): Lesson {
  const list = LISTS[listNumber];
  const label = `Liste ${listNumber}`;
  const baseNotes = [
    ...commonNotes,
    `Mots parcours vert : ${list.green}.`,
    `Ajout parcours or : ${list.gold}.`,
    `Supports de la méthode : ${list.supports}.`,
  ];

  if (step === "j1")
    return {
      id: `boulard-ortho-l${listNumber}-j1`,
      title: `${label} — découverte et manipulation`,
      objective: `Découvrir la liste et observer ${list.focus}.`,
      duration: "30 min",
      phases: [
        {
          title: "Lecture de la liste",
          duration: "5 min",
          detail:
            "Lire les mots à voix haute. Faire expliquer leur sens et repérer les difficultés sans demander de copie.",
        },
        {
          title: "Atelier des étiquettes",
          duration: "12 min",
          detail:
            "Ouvrir le module Ardoise. Faire classer les mots selon le graphème entendu ou observé. Chaque élève verbalise un choix.",
        },
        {
          title: "Encodage sur ardoise",
          duration: "8 min",
          detail:
            "Dicter 2 mots du parcours vert, puis le mot supplémentaire au parcours or. Segmenter oralement avant l’écriture.",
        },
        {
          title: "Bilan",
          duration: "5 min",
          detail: `Faire formuler ce qui est retenu sur ${list.focus} et noter deux exemples au tableau.`,
        },
      ],
      material: commonMaterial,
      photocopies: [
        "Aucune photocopie obligatoire : préparer un jeu d’étiquettes par élève ou binôme à partir de l’atelier.",
      ],
      notes: baseNotes,
    };

  if (step === "j2")
    return {
      id: `boulard-ortho-l${listNumber}-j2`,
      title: `${label} — mémorisation et dictée flash`,
      objective: "Mémoriser les mots et les employer dans une phrase courte.",
      duration: "15 min",
      phases: [
        {
          title: "Rappel flash",
          duration: "3 min",
          detail: "Montrer trois étiquettes. Lire, cacher, épeler puis vérifier.",
        },
        {
          title: "Mémoire orthographique",
          duration: "7 min",
          detail:
            "Observer un mot, le cacher, l’écrire sur l’ardoise puis comparer lettre par lettre. Parcours vert : 3 mots ; parcours or : liste complète.",
        },
        {
          title: "Dictée flash",
          duration: "5 min",
          detail:
            listNumber === 3
              ? "Dicter : « Son ami se repose dans la grande chambre orange. » Réduire à « Son ami se repose dans la chambre. » pour le parcours vert si nécessaire."
              : "Dicter une phrase courte contenant deux mots de la liste, puis corriger immédiatement en faisant justifier le graphème.",
        },
      ],
      material: commonMaterial,
      photocopies: [
        "Liste de mots : 1 exemplaire par élève (9 exemplaires), avec version vert ou or selon le parcours.",
      ],
      notes: baseNotes,
    };

  if (step === "atelier")
    return {
      id: `boulard-ortho-l${listNumber}-atelier`,
      title: `${label} — atelier des mots`,
      objective: "Automatiser la lecture et l’encodage grâce à la manipulation.",
      duration: "20 min",
      phases: [
        {
          title: "Groupe guidé parcours vert",
          duration: "10 min",
          detail:
            "Avec l’enseignant : 4 à 6 étiquettes, lecture, tri, reconstruction puis copie d’un seul mot.",
        },
        {
          title: "Groupe autonome parcours or",
          duration: "10 min",
          detail:
            "Classer toute la liste, retrouver l’intrus, puis produire oralement une phrase. Inverser les groupes après 10 minutes.",
        },
      ],
      material: [
        ...commonMaterial,
        "Sablier ou minuteur de 10 minutes",
        "Deux barquettes pour trier les étiquettes",
      ],
      photocopies: [
        "Étiquettes de la liste : 3 planches (une planche pour 3 élèves), à découper avant la séance.",
      ],
      notes: baseNotes,
    };

  if (step === "j3")
    return {
      id: `boulard-ortho-l${listNumber}-j3`,
      title: `${label} — entraînement et préparation`,
      objective: "Réinvestir les mots de la liste dans une dictée préparée.",
      duration: "20 min",
      phases: [
        {
          title: "Réactivation",
          duration: "4 min",
          detail: "Relire la liste en chœur puis individuellement par deux.",
        },
        {
          title: "Phrase négociée",
          duration: "10 min",
          detail:
            listNumber === 3
              ? "Dicter : « Son ami se repose dans la grande chambre. Son copain arrive demain. » Le parcours or ajoute : « Papi est ravi, son copain est un champion. »"
              : "Dicter une phrase contenant les mots les moins bien mémorisés. Comparer les propositions et justifier les corrections.",
        },
        {
          title: "Correction active",
          duration: "6 min",
          detail:
            "Entourer les mots de la liste, corriger avec le modèle et faire recopier seulement le mot erroné.",
        },
      ],
      material: commonMaterial,
      photocopies: [
        "Aucune si la phrase est faite sur l’ardoise ; sinon 9 demi-feuilles de dictée préparée.",
      ],
      notes: baseNotes,
    };

  return {
    id: `boulard-ortho-l${listNumber}-final`,
    title: `${label} — dictée finale différenciée`,
    objective: "Écrire la dictée finale et repérer les mots à reprendre.",
    duration: "25 min",
    phases: [
      {
        title: "Préparation",
        duration: "3 min",
        detail:
          "Rappeler les deux parcours, lire la consigne et laisser les élèves préparer leur matériel.",
      },
      { title: "Dictée parcours vert", duration: "10 min", detail: list.finalGreen },
      { title: "Complément parcours or", duration: "5 min", detail: list.finalGold },
      {
        title: "Relecture guidée",
        duration: "4 min",
        detail:
          "Faire vérifier majuscules, points, mots de la liste et accords signalés par l’enseignant.",
      },
      {
        title: "Collecte",
        duration: "3 min",
        detail:
          "Ramasser les cahiers. Noter les mots à reprendre lors du bilan du vendredi 16 octobre.",
      },
    ],
    material: [
      "Cahier de dictées",
      "Crayon à papier ou stylo",
      "Grille de suivi vert / or de l’enseignant",
    ],
    photocopies: [
      "Texte à trous parcours vert uniquement pour les élèves qui disposent habituellement de cet aménagement.",
    ],
    notes: baseNotes,
  };
}

const lessons: Lesson[] = ([3, 4, 5] as const).flatMap((n) =>
  (["j1", "j2", "atelier", "j3", "final"] as const).map((step) => listLesson(n, step)),
);

lessons.push({
  id: "boulard-ortho-p1-bilan",
  title: "Orthographémic P1 — bilan différencié",
  objective: "Évaluer les graphèmes de la lettre a et identifier les besoins de remédiation.",
  duration: "30 min",
  phases: [
    {
      title: "Rappel de la consigne",
      duration: "3 min",
      detail: "Présenter chaque exercice sans donner d’exemple contenant la réponse.",
    },
    {
      title: "Bilan parcours vert",
      duration: "20 min",
      detail:
        "Distribuer RE6 Bilan-a p. 1 à 3. Lire les consignes et autoriser le pointage ou la reformulation habituelle.",
    },
    {
      title: "Bilan parcours or",
      duration: "20 min",
      detail:
        "Distribuer RE6 Bilan-a p. 4 à 6. Les élèves travaillent en autonomie après la lecture des consignes.",
    },
    {
      title: "Fin de séance",
      duration: "7 min",
      detail:
        "Ramasser sans correction collective. Classer les erreurs par graphème pour préparer RE8.",
    },
  ],
  material: ["Crayons", "Surligneurs", "RE6 Bilan-a"],
  photocopies: [
    "RE6 Bilan-a p. 1-3 : un exemplaire par élève parcours vert",
    "RE6 Bilan-a p. 4-6 : un exemplaire par élève parcours or",
  ],
  notes: commonNotes,
});

lessons.push({
  id: "boulard-ortho-p1-remediation",
  title: "Orthographémic P1 — correction et remédiation",
  objective: "Comprendre ses erreurs et reprendre un graphème ciblé avant les vacances.",
  duration: "20 min",
  phases: [
    {
      title: "Retour individuel",
      duration: "5 min",
      detail: "Rendre le bilan et faire entourer une réussite et un graphème à retravailler.",
    },
    {
      title: "Ateliers ciblés",
      duration: "10 min",
      detail:
        "Constituer des groupes selon les erreurs. Utiliser RE8 ou l’atelier des étiquettes avec 4 à 6 mots seulement.",
    },
    {
      title: "Validation",
      duration: "5 min",
      detail:
        "Dicter un mot par graphème repris et noter le besoin à poursuivre après les vacances.",
    },
  ],
  material: [
    "Bilans corrigés",
    "Module « L’atelier des étiquettes »",
    "RE8 adapté aux erreurs constatées",
    "Ardoises",
  ],
  photocopies: [
    "RE8 : imprimer seulement les pages correspondant aux erreurs constatées après le bilan.",
  ],
  notes: commonNotes,
});

export const BOULARD_ORTHOGRAPHEMIC_P1_PREP_SHEETS: PrepSheet[] = lessons.map((lesson) => ({
  ...lesson,
  subject: "francais",
  socleDomains: [
    "D1 · Les langages pour penser et communiquer",
    "D2 · Les méthodes et outils pour apprendre",
  ],
  disciplinaryDomains: ["Étude de la langue · Orthographe", "Lecture et encodage"],
  competence: "Mémoriser l’orthographe de mots fréquents, encoder et écrire sous la dictée.",
}));

export const BOULARD_ORTHOGRAPHEMIC_P1_SEQUENCE: ResourceSequence = {
  id: "boulard-orthographemic-p1-listes-3-5",
  label: "M. Boulard · Période 1 · Listes 3 à 5",
  sessions: lessons.map((lesson) => ({
    id: lesson.id,
    label: lesson.title,
    prepSheetId: lesson.id,
  })),
};
