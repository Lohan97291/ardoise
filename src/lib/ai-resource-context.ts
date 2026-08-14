import { PATCHED_RESOURCE_TREE } from "@/lib/patched-resource-methods";
import type {
  ResourceMethod,
  ResourceSequence,
  ResourceSession,
  SubjectKey,
} from "@/lib/ardoise-data";

type ResourcePointer = {
  method: ResourceMethod;
  sequence: ResourceSequence;
  session: ResourceSession;
  index: number;
};

export type AiResourceContext = {
  subject: SubjectKey;
  matched: boolean;
  matchReason: string;
  methodLabel?: string;
  sequenceLabel?: string;
  currentSessionLabel?: string;
  previousSessions: string[];
  nextSessions: string[];
  alternativeSessions: string[];
};

const STOP_WORDS = new Set([
  "de",
  "des",
  "du",
  "la",
  "le",
  "les",
  "un",
  "une",
  "et",
  "ou",
  "en",
  "au",
  "aux",
  "dans",
  "pour",
  "sur",
  "avec",
  "ce",
  "cet",
  "cette",
  "ces",
  "seance",
  "séance",
]);

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, " ")
    .replace(/[^a-zA-Z0-9 ]+/g, " ")
    .toLowerCase()
    .trim();
}

function titleTokens(value: string): string[] {
  return normalize(value)
    .split(/\s+/)
    .filter((token) => token.length >= 3 && !STOP_WORDS.has(token));
}

function programmingItemToResourceId(programmingItemId?: string): string | undefined {
  if (!programmingItemId) return undefined;
  const cleo = programmingItemId.match(/^e_p(\d+)_(\d+)$/i);
  if (cleo) return `cleo-p${cleo[1]}-${cleo[2]}`;
  const acces = programmingItemId.match(/^m(\d+)$/i);
  if (acces) return `acces-m${acces[1]}`;
  return undefined;
}

function allPointers(subject: SubjectKey): ResourcePointer[] {
  return PATCHED_RESOURCE_TREE.filter((method) => method.subject === subject).flatMap((method) =>
    method.sequences.flatMap((sequence) =>
      sequence.sessions.map((session, index) => ({ method, sequence, session, index })),
    ),
  );
}

function exactPointer(
  subject: SubjectKey,
  resourceId?: string,
  programmingItemId?: string,
): ResourcePointer | null {
  const targetIds = [resourceId, programmingItemToResourceId(programmingItemId)].filter(Boolean);
  if (targetIds.length === 0) return null;

  for (const pointer of allPointers(subject)) {
    if (targetIds.includes(pointer.session.id)) return pointer;
  }
  return null;
}

function sessionScore(pointer: ResourcePointer, tokens: string[]): number {
  if (tokens.length === 0) return 0;
  const haystack = normalize(
    `${pointer.session.label} ${pointer.sequence.label} ${pointer.method.label}`,
  );
  return tokens.reduce((score, token) => (haystack.includes(token) ? score + 1 : score), 0);
}

function neighborLabels(sequence: ResourceSequence, index: number, direction: -1 | 1): string[] {
  const labels: string[] = [];
  let cursor = index + direction;
  while (cursor >= 0 && cursor < sequence.sessions.length && labels.length < 3) {
    labels.push(sequence.sessions[cursor]!.label);
    cursor += direction;
  }
  return direction === -1 ? labels.reverse() : labels;
}

export function getAiResourceContext(input: {
  subject: SubjectKey;
  title: string;
  resourceId?: string;
  programmingItemId?: string;
}): AiResourceContext {
  const subjectPointers = allPointers(input.subject);
  const exact = exactPointer(input.subject, input.resourceId, input.programmingItemId);

  if (exact) {
    return {
      subject: input.subject,
      matched: true,
      matchReason: "Correspondance directe avec une ressource déjà identifiée.",
      methodLabel: exact.method.label,
      sequenceLabel: exact.sequence.label,
      currentSessionLabel: exact.session.label,
      previousSessions: neighborLabels(exact.sequence, exact.index, -1),
      nextSessions: neighborLabels(exact.sequence, exact.index, 1),
      alternativeSessions: [],
    };
  }

  const tokens = titleTokens(input.title);
  const ranked = subjectPointers
    .map((pointer) => ({ pointer, score: sessionScore(pointer, tokens) }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);

  const best = ranked[0]?.pointer ?? null;
  if (best) {
    return {
      subject: input.subject,
      matched: true,
      matchReason: "Ressource proche retrouvée à partir du titre de la séance.",
      methodLabel: best.method.label,
      sequenceLabel: best.sequence.label,
      currentSessionLabel: best.session.label,
      previousSessions: neighborLabels(best.sequence, best.index, -1),
      nextSessions: neighborLabels(best.sequence, best.index, 1),
      alternativeSessions: ranked.slice(1).map((entry) => entry.pointer.session.label),
    };
  }

  const fallback = subjectPointers.slice(0, 3).map((pointer) => pointer.session.label);
  return {
    subject: input.subject,
    matched: false,
    matchReason:
      "Aucune ressource précise n'a été retrouvée. L'assistant s'appuiera surtout sur la matière et le titre donnés.",
    previousSessions: [],
    nextSessions: [],
    alternativeSessions: fallback,
  };
}
