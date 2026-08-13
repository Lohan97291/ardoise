export type ImportedEnglishProgrammingSequence = {
  order: number;
  id: string;
  sequenceTitle: string;
  activityTitle: string;
  teacherPages: number[];
  sessionCount: number;
  period: 1 | 2 | 3 | 4 | 5 | null;
};

export type ImportedEnglishAnnualProgramming = {
  method: string;
  subject: string;
  level: string;
  sourceTeacherPages: number[];
  sourcePdfPages: number[];
  periodsDetected: number[];
  note: string;
  sequences: ImportedEnglishProgrammingSequence[];
};

export const wellDoneCe1Programming = {
  method: "Well done!",
  subject: "Anglais",
  level: "Cycle 2 - CE1",
  sourceTeacherPages: [124, 125, 126, 127],
  sourcePdfPages: [28, 29],
  periodsDetected: [],
  note: "La programmation scannée correspond à une sélection CE1 centrée sur le niveau de classe de l'utilisatrice. Elle ordonne les thèmes et liste des repères de grammaire, prononciation et culture, mais ne découpe pas explicitement l'année en périodes 1 à 5.",
  sequences: [
    {
      order: 1,
      id: "well-done-ce1-01",
      sequenceTitle: "Come together!",
      activityTitle: "The What's your name puppet game",
      teacherPages: [18, 19],
      sessionCount: 3,
      period: null,
    },
    {
      order: 2,
      id: "well-done-ce1-02",
      sequenceTitle: "Playing with numbers",
      activityTitle: "The One to twelve song",
      teacherPages: [24, 25],
      sessionCount: 3,
      period: null,
    },
    {
      order: 3,
      id: "well-done-ce1-03",
      sequenceTitle: "Playing with colours",
      activityTitle: "Colour the pencils!",
      teacherPages: [30, 31],
      sessionCount: 3,
      period: null,
    },
    {
      order: 4,
      id: "well-done-ce1-04",
      sequenceTitle: "Playing with letters",
      activityTitle: "The Hungry Yeti",
      teacherPages: [36, 37],
      sessionCount: 3,
      period: null,
    },
    {
      order: 5,
      id: "well-done-ce1-05",
      sequenceTitle: "At school!",
      activityTitle: "The Simon says game",
      teacherPages: [42, 43],
      sessionCount: 3,
      period: null,
    },
    {
      order: 6,
      id: "well-done-ce1-06",
      sequenceTitle: "Families",
      activityTitle: "The Family bingo game",
      teacherPages: [48, 49],
      sessionCount: 4,
      period: null,
    },
    {
      order: 7,
      id: "well-done-ce1-07",
      sequenceTitle: "At home!",
      activityTitle: "The Goldilocks sketch",
      teacherPages: [54, 55],
      sessionCount: 3,
      period: null,
    },
    {
      order: 8,
      id: "well-done-ce1-08",
      sequenceTitle: "Eating and cooking",
      activityTitle: "Let's make apple crumble!",
      teacherPages: [60, 61],
      sessionCount: 3,
      period: null,
    },
    {
      order: 9,
      id: "well-done-ce1-09",
      sequenceTitle: "Looks and feelings",
      activityTitle: "Draw and colour the body",
      teacherPages: [66, 67],
      sessionCount: 3,
      period: null,
    },
    {
      order: 10,
      id: "well-done-ce1-10",
      sequenceTitle: "Arts and tales",
      activityTitle: "The Snow White sketch",
      teacherPages: [72, 73],
      sessionCount: 3,
      period: null,
    },
    {
      order: 11,
      id: "well-done-ce1-11",
      sequenceTitle: "Let's move!",
      activityTitle: "The folk dance",
      teacherPages: [78, 79],
      sessionCount: 3,
      period: null,
    },
    {
      order: 12,
      id: "well-done-ce1-12",
      sequenceTitle: "Time",
      activityTitle: "The O'clock clock",
      teacherPages: [84, 85],
      sessionCount: 4,
      period: null,
    },
    {
      order: 13,
      id: "well-done-ce1-13",
      sequenceTitle: "Celebrations",
      activityTitle: "Trick or treat?",
      teacherPages: [90, 91],
      sessionCount: 4,
      period: null,
    },
    {
      order: 14,
      id: "well-done-ce1-14",
      sequenceTitle: "My day",
      activityTitle: "The Are you sleeping song",
      teacherPages: [96, 97],
      sessionCount: 3,
      period: null,
    },
    {
      order: 15,
      id: "well-done-ce1-15",
      sequenceTitle: "Animals and pets",
      activityTitle: "The Australian animals memory game",
      teacherPages: [102, 103],
      sessionCount: 3,
      period: null,
    },
    {
      order: 16,
      id: "well-done-ce1-16",
      sequenceTitle: "Outside",
      activityTitle: "Let's grow tomatoes!",
      teacherPages: [108, 109],
      sessionCount: 4,
      period: null,
    },
    {
      order: 17,
      id: "well-done-ce1-17",
      sequenceTitle: "Let's go visit...",
      activityTitle: "Sydney by bus and ferry",
      teacherPages: [114, 115],
      sessionCount: 4,
      period: null,
    },
    {
      order: 18,
      id: "well-done-ce1-18",
      sequenceTitle: "What do you remember?",
      activityTitle: "The drawing and mime game",
      teacherPages: [120, 121],
      sessionCount: 3,
      period: null,
    },
  ],
} as const satisfies ImportedEnglishAnnualProgramming;
