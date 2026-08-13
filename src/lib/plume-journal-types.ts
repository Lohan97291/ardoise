import type { PrepPhase, SubjectKey } from "@/lib/ardoise-data";

export type PlumeTarget = "sequence" | "session" | "journal_day";

export type PlumeAnswer = {
  questionId: string;
  answer: string;
};

export type PlumePedagogicalFrame = {
  title?: string;
  level?: string;
  discipline?: string;
  domain?: string;
  subDomain?: string;
  learningObjective?: string;
  sessionCount?: string;
  duration?: string;
  preserveSchedule?: boolean;
};

export type PlumeEditableJournalSlot = {
  start: string;
  end: string;
  title: string;
  subjectKey: SubjectKey;
  note: string;
};

export type PlumeClarifyingQuestion = {
  id: string;
  question: string;
  rationale: string;
  suggestions: string[];
  freeTextPlaceholder: string;
};

export type PlumeClarification = {
  intro: string;
  readyToGenerate: boolean;
  questions: PlumeClarifyingQuestion[];
};

export type PlumePrep = {
  title: string;
  duration: string;
  objective: string;
  competence: string;
  evaluation: string;
  materialSuggestions: string[];
  photocopySuggestions: string[];
  phases: PrepPhase[];
};

export type PlumeSequencePlan = {
  target: "sequence";
  headline: string;
  summary: string;
  subjectKey: SubjectKey;
  sequenceTitle: string;
  pedagogicalFocus: string;
  sessions: PlumePrep[];
};

export type PlumeSessionPlan = {
  target: "session";
  headline: string;
  summary: string;
  subjectKey: SubjectKey;
  session: PlumePrep;
};

export type PlumeJournalDaySession = {
  start: string;
  end: string;
  title: string;
  subjectKey: SubjectKey;
  note: string;
  prep: PlumePrep;
};

export type PlumeJournalDayPlan = {
  target: "journal_day";
  headline: string;
  summary: string;
  dayTitle: string;
  sessions: PlumeJournalDaySession[];
};

export type PlumePlanResponse = PlumeSequencePlan | PlumeSessionPlan | PlumeJournalDayPlan;
