export type EmcCe1ProgrammingFiche = {
  order: number;
  id: string;
  ficheNumber: number;
  theme: 1 | 2 | 3;
  themeTitle: string;
  title: string;
  guidePages: number[];
  sessionCount: number;
};

export type EmcCe1AnnualProgramming = {
  method: string;
  subject: string;
  level: string;
  sourceTeacherPages: number[];
  note: string;
  fiches: EmcCe1ProgrammingFiche[];
};

export const emcCe1Programming = {
  method: "EMC CE1 — Enseignement moral et civique",
  subject: "EMC",
  level: "CE1",
  sourceTeacherPages: [71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118],
  note: "Programmation organisée en 3 thèmes (non découpée en périodes 1 à 5 dans le guide source). Chaque fiche correspond à 1 séance d'environ 45-50 min.",
  fiches: [
    // ── Thème 1 ─────────────────────────────────────────────────────────────
    {
      order: 1,
      id: "emc-s01-01",
      ficheNumber: 12,
      theme: 1,
      themeTitle: "Altérité et sociabilité",
      title: "Ça veut dire quoi «être différent»?",
      guidePages: [71, 72, 73, 74],
      sessionCount: 1,
    },
    {
      order: 2,
      id: "emc-s01-02",
      ficheNumber: 13,
      theme: 1,
      themeTitle: "Altérité et sociabilité",
      title: "Qu'est-ce que le harcèlement?",
      guidePages: [75, 76, 77, 78],
      sessionCount: 1,
    },
    {
      order: 3,
      id: "emc-s01-03",
      ficheNumber: 14,
      theme: 1,
      themeTitle: "Altérité et sociabilité",
      title: "Qu'est-ce qu'un stéréotype?",
      guidePages: [79, 80, 81, 82],
      sessionCount: 1,
    },
    {
      order: 4,
      id: "emc-s01-04",
      ficheNumber: 15,
      theme: 1,
      themeTitle: "Altérité et sociabilité",
      title: "Comment peut-on s'entraider?",
      guidePages: [83, 84, 85, 86],
      sessionCount: 1,
    },
    // ── Thème 2 ─────────────────────────────────────────────────────────────
    {
      order: 5,
      id: "emc-s02-01",
      ficheNumber: 16,
      theme: 2,
      themeTitle: "Règles collectives et prises d'initiative",
      title: "Comment se comporter pour bien apprendre à l'école?",
      guidePages: [89, 90, 91, 92],
      sessionCount: 1,
    },
    {
      order: 6,
      id: "emc-s02-02",
      ficheNumber: 17,
      theme: 2,
      themeTitle: "Règles collectives et prises d'initiative",
      title: "Pourquoi faut-il respecter les biens communs?",
      guidePages: [93, 94, 95, 96],
      sessionCount: 1,
    },
    {
      order: 7,
      id: "emc-s02-03",
      ficheNumber: 18,
      theme: 2,
      themeTitle: "Règles collectives et prises d'initiative",
      title: "Que faire face à une situation dangereuse?",
      guidePages: [97, 98, 99, 100],
      sessionCount: 1,
    },
    // ── Thème 3 ─────────────────────────────────────────────────────────────
    {
      order: 8,
      id: "emc-s03-01",
      ficheNumber: 19,
      theme: 3,
      themeTitle: "Principes et symboles de la République",
      title: "C'est quoi la laïcité?",
      guidePages: [103, 104, 105, 106],
      sessionCount: 1,
    },
    {
      order: 9,
      id: "emc-s03-02",
      ficheNumber: 20,
      theme: 3,
      themeTitle: "Principes et symboles de la République",
      title: "Quels sont les symboles de la République?",
      guidePages: [107, 108, 109, 110],
      sessionCount: 1,
    },
    {
      order: 10,
      id: "emc-s03-03",
      ficheNumber: 21,
      theme: 3,
      themeTitle: "Principes et symboles de la République",
      title: "Le français, langue de la République",
      guidePages: [111, 112, 113, 114],
      sessionCount: 1,
    },
    {
      order: 11,
      id: "emc-s03-04",
      ficheNumber: 22,
      theme: 3,
      themeTitle: "Principes et symboles de la République",
      title: "Qu'est-ce qu'un lieu de mémoire?",
      guidePages: [115, 116, 117, 118],
      sessionCount: 1,
    },
  ],
} as const satisfies EmcCe1AnnualProgramming;
