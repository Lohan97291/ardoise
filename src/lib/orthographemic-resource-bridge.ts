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

function buildBoulardS2Day1PrepSheet(week: OrthographemicWeek, day: OrthographemicDay): PrepSheet {
  const chapter = chapterForWeek(week);
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
    objective: "Découvrir les valeurs sonores de la lettre a en manipulant et en justifiant des classements de mots.",
    competence:
      "Observer les graphèmes, écouter les sons, classer des mots et expliquer oralement ses choix.",
    duration: "45 min",
    phases: [
      {
        title: "Mise en route : regarder / écouter",
        duration: "8 min",
        detail:
          "Afficher quelques mots de la liste A au tableau ou dans le module Orthographémic. Faire observer la lettre a : Où la voit-on ? Que peut-on entendre ? Les élèves répondent oralement, sans écrire longuement.",
      },
      {
        title: "Manipulation d'étiquettes : trier les mots de la lettre a",
        duration: "17 min",
        detail:
          "Utiliser le module Orthographémic avec le zoom à 130 ou 150 %. Les élèves déplacent les étiquettes pour trier les mots : je vois la lettre a / j'entends le son étudié ; je vois la lettre a / je n'entends pas le même son ; je repère les écritures avec a, à, â, au, eau selon les mots proposés. Chaque déplacement doit être justifié oralement.",
      },
      {
        title: "Atelier dirigé de besoin",
        duration: "12 min",
        detail:
          "Pendant que les élèves autonomes trient ou justifient par binômes, prendre un petit groupe guidé.",
        differentiation:
          "Fodie et Ysmaël : 6 étiquettes maximum, sons simples et proches p/b/d/t. Sayden : micro-tâche de 4 étiquettes, une seule consigne, relance adulte. Elena : lettres mobiles ou réponse orale pour éviter que l'écriture masque la compétence. Fatoumata et Nadia zainab : justification experte et aide à la reformulation.",
      },
      {
        title: "Trace orale et mini-bilan",
        duration: "8 min",
        detail:
          "Construire une phrase bilan : La lettre a peut faire plusieurs sons ou entrer dans plusieurs écritures. Garder 3 exemples de mots manipulés. Pour la trace écrite, demander seulement de copier 2 ou 3 mots ; l'essentiel est la verbalisation.",
      },
    ],
    material: [
      "Ordinateur ou TNI avec Ardoise ouvert",
      "Module Orthographémic, zoom 130 ou 150 %",
      "Ardoises et feutres",
      "Lettres mobiles ou 4 à 6 étiquettes pour le petit groupe fragile",
      "Cahier du jour ou cahier de dictée pour copier 2 ou 3 mots",
    ],
    photocopies: [],
    notes: [
      chapter ? `Chapitre ${chapter.number} : ${chapter.title}` : "Chapitre 1 : lettre a",
      "Séance personnalisée pour la classe de M. Boulard.",
      "Kamil : hors évaluation collective ; présence adaptée, observation ou manipulation libre selon disponibilité adulte.",
      ...wordListNotes(week),
    ],
  };
}

function buildPrepSheet(week: OrthographemicWeek, day: OrthographemicDay): PrepSheet {
  if (
    resolveCurrentClassroomKey() === "boulard" &&
    week.id === "orthographemic-s2" &&
    day.id === "orthographemic-s2-j1"
  ) {
    return buildBoulardS2Day1PrepSheet(week, day);
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
