import type { PrepPhase, PrepSheet, ResourceMethod } from "@/lib/ardoise-data";
import { resolveCurrentClassroomKey } from "@/lib/ardoise-eval";
import orthographemicGuideData from "@/lib/data/orthographemic-ce1.json";

type OrthographemicPhase = {
  n: string;
  m?: number | string | null;
  d: string;
};

type OrthographemicActivity = {
  id: string;
  title: string;
  type: string;
  duration?: number | null;
  optional?: boolean;
  phases?: OrthographemicPhase[];
};

type OrthographemicDay = {
  id: string;
  day: number;
  title: string;
  duration?: number | null;
  activities: OrthographemicActivity[];
};

type OrthographemicWeek = {
  id: string;
  week: number;
  chapterId: string | null;
  chapterNumber: number;
  title: string;
  type: string;
  estimated?: boolean;
  days: OrthographemicDay[];
};

type OrthographemicChapter = {
  id: string;
  number: number;
  letter: string;
  title: string;
  weeks: number[];
};

type OrthographemicWordList = {
  letter: string;
  lists: Array<{ n: number; mots: string[] }>;
};

type OrthographemicReusableFlow = {
  id: string;
  sourceKey?: string;
  title: string;
  steps: OrthographemicPhase[];
  note?: string;
};

type OrthographemicGuide = {
  method: string;
  chapters: OrthographemicChapter[];
  weeks: OrthographemicWeek[];
  reusableFlows?: OrthographemicReusableFlow[];
  wordLists?: Record<string, OrthographemicWordList>;
};

const orthographemicGuide = orthographemicGuideData as OrthographemicGuide;

const reusableFlowById = new Map(
  (orthographemicGuide.reusableFlows ?? []).flatMap((flow) => [
    [flow.id, flow],
    flow.sourceKey ? [flow.sourceKey, flow] : [flow.id, flow],
  ]),
);

const TYPE_LABELS: Record<string, string> = {
  ateliers: "Ateliers",
  evaluation: "Évaluation",
  orthographe: "Orthographe",
  "dictee-flash": "Dictée flash",
  "dictee-bilan": "Dictée bilan",
  "course-aux-mots": "Course aux mots",
  "lecture-comprehension": "Lecture compréhension",
  "renforcement-code": "Renforcement du code",
  revision: "Révision",
  rituels: "Rituels",
  systematisation: "Systématisation",
  "trace-ecrite": "Trace écrite",
};

function chapterForWeek(week: OrthographemicWeek): OrthographemicChapter | undefined {
  return orthographemicGuide.chapters.find((chapter) => chapter.id === week.chapterId);
}

function durationLabel(value?: number | string | null): string | undefined {
  if (typeof value === "number") return `${value} min`;
  if (typeof value === "string" && value.trim()) return value;
  return undefined;
}

function activityLabel(activity: OrthographemicActivity): string {
  const type = TYPE_LABELS[activity.type] ?? activity.type;
  return activity.optional ? `${type} facultatif` : type;
}

function reusableFlowForActivity(activity: OrthographemicActivity): OrthographemicReusableFlow | undefined {
  const title = activity.title.toLowerCase();

  if (title.includes("découverte des valeurs")) return reusableFlowById.get("decouverte-valeurs");
  if (title.includes("jeux")) return reusableFlowById.get("jeux");
  if (title.includes("consolidation") || title.includes("régulation")) {
    return reusableFlowById.get("consolidation-regulation");
  }

  return reusableFlowById.get(activity.type) ?? reusableFlowById.get(activity.type.replaceAll("-", "_"));
}

function phaseFromActivity(activity: OrthographemicActivity): PrepPhase[] {
  const fallbackFlow = reusableFlowForActivity(activity);
  const phases =
    activity.phases?.length && !activity.phases.every((phase) => phase.d.includes("Déroulé issu de la programmation Orthographémic"))
      ? activity.phases
      : fallbackFlow?.steps?.length
        ? fallbackFlow.steps
        : [{ n: activity.title, m: activity.duration, d: "Consulter le support Orthographémic pour le détail de la séance." }];

  return phases.map((phase) => ({
    title: phase.n || activity.title,
    duration: durationLabel(phase.m ?? activity.duration),
    detail: phase.d,
  }));
}

function wordListNotes(week: OrthographemicWeek): string[] {
  const list = orthographemicGuide.wordLists?.[String(week.chapterNumber)];
  if (!list) return [];

  return list.lists.map((entry) => `Liste ${entry.n} (${list.letter}) : ${entry.mots.join(", ")}`);
}

function buildBoulardChapter1PrepSheet(week: OrthographemicWeek, day: OrthographemicDay): PrepSheet {
  const chapter = chapterForWeek(week);
  const focusByWeek: Record<number, string> = {
    2: "la lettre a et ses valeurs sonores",
    3: "a, à, â, au et eau",
    4: "an, am, ain et aim",
    5: "ai, ay, ail, aill et aille",
    6: "la révision de tous les graphèmes de la lettre a",
  };
  const focus = focusByWeek[week.week] ?? "la lettre a";
  const commonDifferentiation =
    "Groupe guidé : Elena, Fodie, Lucas et Saïden avec peu d'items, manipulation de lettres et consigne unique. " +
    "Encodage accompagné : Elena et Fanta. Fluence : Ylan et Emmanuella. " +
    "Autonomie et enrichissement : Fatoumata et Nadia Zainab.";

  const phasesByDay: Record<number, PrepPhase[]> = {
    1: [
      {
        title: `Rituel et découverte : ${focus}`,
        duration: "8 min",
        detail:
          "Faire lire quelques syllabes ou mots connus, puis présenter 4 à 6 mots ciblés. Les élèves observent les lettres, écoutent les sons et justifient oralement leurs remarques.",
      },
      {
        title: "Manipulation et classement",
        duration: "10 min",
        detail:
          "Trier les étiquettes selon le graphème étudié. Pour les élèves fragiles, limiter à 4 ou 6 étiquettes et faire verbaliser chaque choix avant de passer à l'écriture.",
      },
      {
        title: "Dictée sur ardoise",
        duration: "7 min",
        detail:
          "Dicter 2 ou 3 mots courts. Faire segmenter oralement, puis corriger avec le modèle. L'écriture longue n'est pas demandée à Elena ni à Saïden pendant cette phase.",
      },
      {
        title: "Bilan oral",
        duration: "5 min",
        detail: `Faire formuler ce que l'on retient sur ${focus}. Garder deux exemples au tableau pour la séance suivante.`,
      },
    ],
    2: [
      {
        title: "Lecture ciblée",
        duration: "8 min",
        detail:
          "Lire seulement quelques phrases ou une courte liste de mots du support. La compréhension détaillée du texte n'est pas travaillée ici : le texte sert à repérer le graphème et à lire.",
      },
      {
        title: "Repérage dans les mots",
        duration: "10 min",
        detail:
          "Surligner ou entourer le graphème étudié, puis classer quelques mots. Faire répondre à l'oral ou par pointage avant de demander une production écrite.",
      },
      {
        title: "Trace écrite courte ou fluence",
        duration: "7 min",
        detail:
          "Copier deux mots ou lire une courte série en binôme. Pendant ce temps, reprendre individuellement Elena, Fodie, Lucas ou Saïden.",
      },
      {
        title: "Dictée flash",
        duration: "5 min",
        detail: "Dicter deux mots déjà rencontrés et corriger immédiatement.",
      },
    ],
    3: [
      {
        title: "Rappel et rituel",
        duration: "5 min",
        detail: `Relire les mots de la veille et rappeler la règle ou la graphie de ${focus}.`,
      },
      {
        title: "Atelier de code ou de classement",
        duration: "12 min",
        detail:
          "Faire lire, classer et transformer des mots. Le groupe guidé travaille avec des étiquettes ; les élèves autonomes utilisent la fiche ou le jeu prévu dans le support.",
      },
      {
        title: "Encodage guidé",
        duration: "8 min",
        detail:
          "Faire écrire 2 ou 3 mots en segmentant les sons. Demander aux élèves d'indiquer la partie du mot qu'ils vérifient.",
      },
      {
        title: "Dictée flash",
        duration: "5 min",
        detail: "Dicter un mot connu et une courte syllabe ou un groupe de lettres.",
      },
    ],
    4: [
      {
        title: "Rituel de réactivation",
        duration: "5 min",
        detail: "Relire les mots et les graphèmes étudiés pendant la semaine.",
      },
      {
        title: "Systématisation différenciée",
        duration: "15 min",
        detail:
          "Parcours guidé avec peu d'items pour Elena, Fodie, Lucas et Saïden ; fiche d'entraînement pour Fanta, Ylan et Emmanuella ; activité d'enrichissement pour Fatoumata et Nadia Zainab.",
      },
      {
        title: "Correction active",
        duration: "5 min",
        detail: "Faire expliquer une réussite et une correction. Pour Elena, accepter la réponse orale ou la manipulation de lettres.",
      },
      {
        title: "Dictée bilan courte",
        duration: "5 min",
        detail: "Dicter 3 mots maximum, puis corriger immédiatement sans attendre une longue production écrite.",
      },
    ],
  };

  if (week.week === 6) {
    const finalPhases: Record<number, PrepPhase[]> = {
      1: [
        { title: "Rituels de révision", duration: "8 min", detail: "Relire les graphèmes et les mots de la lettre a." },
        { title: "Révision ciblée", duration: "12 min", detail: "Reprendre les graphèmes qui posent encore problème dans chaque groupe." },
        { title: "Jeu de lecture", duration: "5 min", detail: "Utiliser Tap tap, Tic tac ou la Tapette à mots." },
        { title: "Dictée flash", duration: "5 min", detail: "Dicter deux mots et une syllabe." },
      ],
      2: [
        { title: "Rituel", duration: "5 min", detail: "Relire une série de mots ciblés." },
        { title: "Jeu de révision", duration: "15 min", detail: "Faire tourner un jeu court : Tap tap, Tic tac ou mots mêlés." },
        { title: "Consolidation par groupes", duration: "5 min", detail: "Reprendre une difficulté précise avec le groupe guidé." },
        { title: "Dictée flash", duration: "5 min", detail: "Dicter deux mots déjà travaillés." },
      ],
      3: [
        { title: "Rituel", duration: "5 min", detail: "Relire les graphèmes de la lettre a." },
        { title: "Consolidation différenciée", duration: "15 min", detail: "Fiche courte ou manipulation selon le besoin de chaque élève." },
        { title: "Correction et verbalisation", duration: "5 min", detail: "Faire expliquer la procédure utilisée." },
        { title: "Dictée flash", duration: "5 min", detail: "Dicter deux mots de révision." },
      ],
      4: [
        { title: "Rituel de rappel", duration: "5 min", detail: "Relire les mots et graphèmes étudiés." },
        { title: "Évaluation courte", duration: "15 min", detail: "Évaluer uniquement les compétences travaillées, avec adaptation orale ou en quantité réduite pour les élèves concernés." },
        { title: "Correction différée", duration: "5 min", detail: "Repérer une réussite et une priorité de consolidation par élève." },
        { title: "Dictée bilan", duration: "5 min", detail: "Dicter trois mots ciblés et noter les réussites." },
      ],
    };
    return {
      id: day.id,
      title: `Semaine ${week.week} · Jour ${day.day} — ${week.title}`,
      subject: "francais",
      socleDomains: ["D1 · Les langages pour penser et communiquer", "D2 · Les méthodes et outils pour apprendre"],
      disciplinaryDomains: ["Étude de la langue : orthographe et code", "Lecture et compréhension de l'écrit", "Écriture"],
      objective: "Réviser et évaluer les graphèmes de la lettre a.",
      competence: "Lire, encoder et mémoriser des mots contenant les graphèmes étudiés.",
      duration: "30 min",
      phases: finalPhases[day.day] ?? finalPhases[1],
      material: ["Ardoise", "Étiquettes-mots", "Jeux Tap tap / Tic tac / Tapette à mots", "Fiches de consolidation"],
      photocopies: ["Fiche de bilan ou de consolidation selon le groupe"],
      notes: ["Chapitre 1 : la lettre a", "Séance courte adaptée à l'emploi du temps de la classe.", commonDifferentiation, ...wordListNotes(week)],
    };
  }

  return {
    id: day.id,
    title: `Semaine ${week.week} · Jour ${day.day} — ${week.title}`,
    subject: "francais",
    socleDomains: [
      "D1 · Les langages pour penser et communiquer",
      "D2 · Les méthodes et outils pour apprendre",
    ],
    disciplinaryDomains: [
      "Étude de la langue : orthographe et code",
      "Lecture et compréhension de l'écrit",
      "Langage oral",
    ],
    objective: `Travailler ${focus} en lecture, encodage et mémorisation.`,
    competence: "Lire, classer, encoder et mémoriser des mots contenant les graphèmes étudiés.",
    duration: "30 min",
    phases: phasesByDay[day.day] ?? phasesByDay[1],
    material: ["Ardoise", "Étiquettes-mots", "Affiche du graphème", "Fiches élèves selon le groupe", "Lettres mobiles"],
    photocopies: ["Support élève du jour, uniquement pour les groupes qui en ont besoin"],
    notes: [
      chapter ? `Chapitre ${chapter.number} : ${chapter.title}` : "Chapitre 1 : lettre a",
      "Séance personnalisée pour la classe de M. Boulard, sans modifier l'emploi du temps.",
      "La compréhension longue est réservée au projet de lecture ; le texte Orthographemic sert ici à lire et repérer les graphèmes.",
      commonDifferentiation,
      ...wordListNotes(week),
    ],
  };
}

function buildPrepSheet(week: OrthographemicWeek, day: OrthographemicDay): PrepSheet {
  if (
    resolveCurrentClassroomKey() === "boulard" &&
    week.chapterId === "orthographemic-ch1"
  ) {
    return buildBoulardChapter1PrepSheet(week, day);
  }

  const chapter = chapterForWeek(week);
  const phases = day.activities.flatMap(phaseFromActivity);
  const activityTypes = [...new Set(day.activities.map(activityLabel))];

  return {
    id: day.id,
    title: `Semaine ${week.week} · Jour ${day.day} — ${week.title}`,
    subject: "francais",
    socleDomains: [
      "D1 · Les langages pour penser et communiquer",
      "D2 · Les méthodes et outils pour apprendre",
    ],
    disciplinaryDomains: ["Étude de la langue : grammaire, orthographe, lexique", "Lecture et compréhension de l'écrit", "Écriture"],
    objective: week.title,
    competence: "Étudier les correspondances graphèmes-phonèmes et mémoriser l'orthographe des mots.",
    duration: durationLabel(day.duration) ?? "",
    phases,
    material: ["Guide du maître Orthographémic CE1", "Cahier de dictée", "Ardoise", "Affichages graphémiques"],
    photocopies:
      week.type === "diagnostic"
        ? ["Évaluations diagnostiques Orthographémic CE1"]
        : ["Supports élèves Orthographémic selon la semaine"],
    notes: [
      chapter ? `Chapitre ${chapter.number} : ${chapter.title}` : "Évaluations diagnostiques",
      `Semaine ${week.week} · ${day.title}`,
      `Types d'activités : ${activityTypes.join(", ")}`,
      ...(week.estimated ? ["Séance estimée : vérifier avec le guide papier si besoin."] : []),
      ...wordListNotes(week),
    ],
  };
}

export const ORTHOGRAPHEMIC_SESSION_PREP_SHEETS: PrepSheet[] =
  orthographemicGuide.weeks.flatMap((week) =>
    week.days.map((day) => buildPrepSheet(week, day)),
  );

const prepSheetById = new Map(ORTHOGRAPHEMIC_SESSION_PREP_SHEETS.map((sheet) => [sheet.id, sheet]));

export function getOrthographemicPrepSheet(id?: string): PrepSheet | undefined {
  if (!id) return undefined;
  return prepSheetById.get(id);
}

export const ORTHOGRAPHEMIC_RESOURCE_METHOD: ResourceMethod = {
  id: "m-orthographemic-guide",
  label: "Orthographémic CE1",
  subject: "francais",
  sequences: orthographemicGuide.weeks.map((week) => {
    const chapter = chapterForWeek(week);
    return {
      id: week.id,
      label: chapter
        ? `Chapitre ${chapter.number} · Semaine ${week.week} — ${week.title}`
        : `Semaine ${week.week} — ${week.title}`,
      sessions: week.days.map((day) => ({
        id: day.id,
        label: `Jour ${day.day} — ${day.activities.map((activity) => activity.title).join(" · ")}`,
        prepSheetId: day.id,
      })),
    };
  }),
};
