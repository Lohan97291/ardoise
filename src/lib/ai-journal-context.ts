import type { Session, SubjectKey } from "@/lib/ardoise-data";

const JOURNAL_KEY = "ardoise.journal.v1";

type JournalStore = Record<string, Session[]>;

type JournalPointer = {
  dateKey: string;
  session: Session;
  index: number;
};

export type AiJournalContext = {
  matched: boolean;
  matchReason: string;
  currentDayLabel?: string;
  previousDaySessions: string[];
  nextDaySessions: string[];
  previousSameSubjectSessions: string[];
  nextSameSubjectSessions: string[];
  previousSameResourceSessions: string[];
};

function loadJournal(): JournalStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(JOURNAL_KEY);
    return raw ? (JSON.parse(raw) as JournalStore) : {};
  } catch {
    return {};
  }
}

function compareDateKeys(left: string, right: string): number {
  return left.localeCompare(right);
}

function formatRef(dateKey: string, session: Session): string {
  return `${dateKey} · ${session.start} · ${session.title}`;
}

function allPointers(store: JournalStore): JournalPointer[] {
  return Object.entries(store)
    .sort(([left], [right]) => compareDateKeys(left, right))
    .flatMap(([dateKey, sessions]) =>
      [...sessions]
        .sort((left, right) => left.start.localeCompare(right.start))
        .map((session, index) => ({ dateKey, session, index })),
    );
}

function sameSubject(pointer: JournalPointer, subject: SubjectKey): boolean {
  return pointer.session.subject === subject && pointer.session.subject !== "pause";
}

function sameResource(pointer: JournalPointer, session: Session): boolean {
  if (session.resourceId && pointer.session.resourceId === session.resourceId) return true;
  if (
    session.programmingItemId &&
    pointer.session.programmingItemId === session.programmingItemId
  ) {
    return true;
  }
  return false;
}

function locatePointer(store: JournalStore, session: Session): JournalPointer | null {
  const pointers = allPointers(store);
  const exact = pointers.find((pointer) => pointer.session.id === session.id);
  if (exact) return exact;

  const byTitle = pointers.find(
    (pointer) =>
      pointer.session.subject === session.subject &&
      pointer.session.title.trim().toLowerCase() === session.title.trim().toLowerCase(),
  );
  return byTitle ?? null;
}

function surroundingSameDay(
  store: JournalStore,
  current: JournalPointer,
): Pick<AiJournalContext, "previousDaySessions" | "nextDaySessions"> {
  const sameDay = [...(store[current.dateKey] ?? [])]
    .filter((session) => session.subject !== "pause")
    .sort((left, right) => left.start.localeCompare(right.start));
  const index = sameDay.findIndex((session) => session.id === current.session.id);
  if (index < 0) {
    return { previousDaySessions: [], nextDaySessions: [] };
  }

  return {
    previousDaySessions: sameDay
      .slice(Math.max(0, index - 3), index)
      .map((session) => `${session.start} · ${session.title}`),
    nextDaySessions: sameDay
      .slice(index + 1, index + 4)
      .map((session) => `${session.start} · ${session.title}`),
  };
}

export function getAiJournalContext(session: Session): AiJournalContext {
  const store = loadJournal();
  const current = locatePointer(store, session);
  if (!current) {
    return {
      matched: false,
      matchReason:
        "Cette séance n'a pas encore été retrouvée dans le cahier journal réel. L'assistant s'appuiera surtout sur la ressource et le créneau visé.",
      previousDaySessions: [],
      nextDaySessions: [],
      previousSameSubjectSessions: [],
      nextSameSubjectSessions: [],
      previousSameResourceSessions: [],
    };
  }

  const pointers = allPointers(store);
  const currentIndex = pointers.findIndex((pointer) => pointer.session.id === current.session.id);
  const previousSameSubjectSessions = pointers
    .slice(0, currentIndex)
    .filter((pointer) => sameSubject(pointer, current.session.subject))
    .slice(-3)
    .map((pointer) => formatRef(pointer.dateKey, pointer.session));
  const nextSameSubjectSessions = pointers
    .slice(currentIndex + 1)
    .filter((pointer) => sameSubject(pointer, current.session.subject))
    .slice(0, 3)
    .map((pointer) => formatRef(pointer.dateKey, pointer.session));
  const previousSameResourceSessions = pointers
    .slice(0, currentIndex)
    .filter((pointer) => sameResource(pointer, current.session))
    .slice(-3)
    .map((pointer) => formatRef(pointer.dateKey, pointer.session));
  const aroundDay = surroundingSameDay(store, current);

  return {
    matched: true,
    matchReason:
      "Cette séance a été retrouvée dans le cahier journal réel. L'assistant peut croiser la progression prévue avec ce qui a déjà été placé avant et après.",
    currentDayLabel: current.dateKey,
    previousDaySessions: aroundDay.previousDaySessions,
    nextDaySessions: aroundDay.nextDaySessions,
    previousSameSubjectSessions,
    nextSameSubjectSessions,
    previousSameResourceSessions,
  };
}
