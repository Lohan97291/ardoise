import { createFileRoute } from "@tanstack/react-router";
import type { SubjectKey } from "@/lib/ardoise-data";
import type {
  PlumeClarification,
  PlumeEditableJournalSlot,
  PlumePlanResponse,
  PlumePedagogicalFrame,
  PlumeTarget,
} from "@/lib/plume-journal-types";

type JournalContextEntry = {
  start?: string;
  end?: string;
  title?: string;
  subject?: string;
  note?: string;
};

type PlumeJournalRequest = {
  action?: "clarify" | "generate";
  target: PlumeTarget;
  dateLabel?: string;
  subjectKey?: SubjectKey;
  prompt?: string;
  frame?: PlumePedagogicalFrame;
  answers?: Array<{
    questionId: string;
    answer: string;
  }>;
  existingSessions?: JournalContextEntry[];
  editableSessions?: PlumeEditableJournalSlot[];
};

const SUBJECT_KEYS = [
  "francais",
  "maths",
  "qlm",
  "emc",
  "eps",
  "arts",
  "lve",
  "rituels",
  "pause",
] as const satisfies readonly SubjectKey[];

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validBody(value: unknown): value is PlumeJournalRequest {
  if (!value || typeof value !== "object") return false;
  const body = value as Record<string, unknown>;
  const target = normalizeString(body.target);
  return target === "sequence" || target === "session" || target === "journal_day";
}

function contentToString(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (!item || typeof item !== "object") return "";
        const record = item as Record<string, unknown>;
        return typeof record.text === "string" ? record.text : "";
      })
      .join("\n")
      .trim();
  }
  return "";
}

function targetInstruction(target: PlumeTarget): string {
  if (target === "sequence") {
    return "Tu construis une séquence CE1 complète, concrète, réaliste et directement exploitable. Chaque séance doit être suffisamment détaillée pour être rangée ensuite dans les ressources d'un enseignant.";
  }
  if (target === "session") {
    return "Tu construis une séance CE1 complète, claire, réaliste et directement exploitable, prête à être rangée ensuite comme ressource autonome.";
  }
  return "Tu construis une journée de cahier journal détaillée pour une classe de CE1. Si des créneaux existent déjà, tu respectes autant que possible leur ordre, leurs horaires et leur logique. Chaque séance proposée doit rester réaliste pour une journée de classe.";
}

function buildContext(input: PlumeJournalRequest) {
  const prompt = normalizeString(input.prompt);
  const dateLabel = normalizeString(input.dateLabel);
  const subjectKey = normalizeString(input.subjectKey);
  const frame = input.frame;
  const answers = (input.answers ?? [])
    .map((item) => {
      const answer = normalizeString(item.answer);
      if (!answer) return "";
      return `- ${item.questionId} : ${answer}`;
    })
    .filter(Boolean)
    .join("\n");
  const existingSessionsSource =
    input.target === "journal_day" && (input.editableSessions?.length ?? 0) > 0
      ? (input.editableSessions?.map((session) => ({
          start: session.start,
          end: session.end,
          title: session.title,
          subject: session.subjectKey,
          note: session.note,
        })) ?? [])
      : (input.existingSessions ?? []);

  const existingSessions = existingSessionsSource
    .map((session) => {
      const bits = [
        normalizeString(session.start) && normalizeString(session.end)
          ? `${normalizeString(session.start)}-${normalizeString(session.end)}`
          : "",
        normalizeString(session.title),
        normalizeString(session.subject),
        normalizeString(session.note),
      ].filter(Boolean);
      return bits.join(" · ");
    })
    .filter(Boolean)
    .join("\n- ");

  const pedagogicalFrame = [
    frame?.title ? `Intitulé souhaité : ${normalizeString(frame.title)}` : "",
    frame?.level ? `Niveau : ${normalizeString(frame.level)}` : "",
    frame?.discipline ? `Discipline : ${normalizeString(frame.discipline)}` : "",
    frame?.domain ? `Domaine : ${normalizeString(frame.domain)}` : "",
    frame?.subDomain ? `Sous-domaine : ${normalizeString(frame.subDomain)}` : "",
    frame?.learningObjective
      ? `Objectif d'apprentissage : ${normalizeString(frame.learningObjective)}`
      : "",
    frame?.sessionCount
      ? `Nombre de séances souhaité : ${normalizeString(frame.sessionCount)}`
      : "",
    frame?.duration ? `Durée repère : ${normalizeString(frame.duration)}` : "",
    typeof frame?.preserveSchedule === "boolean"
      ? `Conserver les horaires déjà prévus : ${frame.preserveSchedule ? "oui" : "non"}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");

  return [
    dateLabel ? `Journée concernée : ${dateLabel}` : "",
    subjectKey ? `Domaine principal : ${subjectKey}` : "",
    pedagogicalFrame ? `Cadrage pédagogique :\n${pedagogicalFrame}` : "",
    existingSessions ? `Créneaux / séances déjà visibles :\n- ${existingSessions}` : "",
    answers ? `Précisions déjà données :\n${answers}` : "",
    prompt
      ? `Demande de l'enseignant : ${prompt}`
      : "Demande de l'enseignant : propose la sortie la plus utile possible pour ce cahier journal.",
  ]
    .filter(Boolean)
    .join("\n\n");
}

function buildClarifyMessages(input: PlumeJournalRequest) {
  return [
    {
      role: "system",
      content: `Tu aides un enseignant de CE1 en France. ${targetInstruction(
        input.target,
      )} Ton rôle ici n'est PAS encore de générer la ressource finale. Tu dois seulement identifier ce qu'il manque pour aller vite et juste. Si le contexte est déjà suffisant, retourne readyToGenerate=true et une liste vide de questions. Sinon, pose au maximum 3 questions courtes, très utiles, concrètes, avec 2 à 4 suggestions de réponses brèves et une possibilité de réponse libre. Tu produis uniquement le JSON demandé.`,
    },
    {
      role: "user",
      content: buildContext(input),
    },
  ];
}

function buildGenerateMessages(input: PlumeJournalRequest) {
  return [
    {
      role: "system",
      content: `Tu aides un enseignant de CE1 en France. ${targetInstruction(
        input.target,
      )} Tu réponds en langage enseignant clair, concret, réaliste et immédiatement utile. Tu produis uniquement le JSON demandé. Les durées doivent être crédibles pour un CE1. Les intitulés doivent être lisibles dans Ardoise. Si tu construis une journée détaillée à partir de créneaux existants, garde autant que possible les mêmes horaires. Les phases doivent être courtes, concrètes et directement exploitables en classe.`,
    },
    {
      role: "user",
      content: buildContext(input),
    },
  ];
}

const CLARIFY_SCHEMA = {
  name: "plume_journal_clarify",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      intro: { type: "string" },
      readyToGenerate: { type: "boolean" },
      questions: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            id: { type: "string" },
            question: { type: "string" },
            rationale: { type: "string" },
            suggestions: {
              type: "array",
              items: { type: "string" },
            },
            freeTextPlaceholder: { type: "string" },
          },
          required: ["id", "question", "rationale", "suggestions", "freeTextPlaceholder"],
        },
      },
    },
    required: ["intro", "readyToGenerate", "questions"],
  },
};

const PREP_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string" },
    duration: { type: "string" },
    objective: { type: "string" },
    competence: { type: "string" },
    evaluation: { type: "string" },
    materialSuggestions: {
      type: "array",
      items: { type: "string" },
    },
    photocopySuggestions: {
      type: "array",
      items: { type: "string" },
    },
    phases: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          duration: { type: "string" },
          detail: { type: "string" },
          differentiation: { type: "string" },
        },
        required: ["title", "duration", "detail", "differentiation"],
      },
    },
  },
  required: [
    "title",
    "duration",
    "objective",
    "competence",
    "evaluation",
    "materialSuggestions",
    "photocopySuggestions",
    "phases",
  ],
};

const SEQUENCE_SCHEMA = {
  name: "plume_sequence",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      target: { type: "string", enum: ["sequence"] },
      headline: { type: "string" },
      summary: { type: "string" },
      subjectKey: { type: "string", enum: SUBJECT_KEYS },
      sequenceTitle: { type: "string" },
      pedagogicalFocus: { type: "string" },
      sessions: {
        type: "array",
        minItems: 3,
        items: PREP_SCHEMA,
      },
    },
    required: [
      "target",
      "headline",
      "summary",
      "subjectKey",
      "sequenceTitle",
      "pedagogicalFocus",
      "sessions",
    ],
  },
};

const SESSION_SCHEMA = {
  name: "plume_session",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      target: { type: "string", enum: ["session"] },
      headline: { type: "string" },
      summary: { type: "string" },
      subjectKey: { type: "string", enum: SUBJECT_KEYS },
      session: PREP_SCHEMA,
    },
    required: ["target", "headline", "summary", "subjectKey", "session"],
  },
};

const JOURNAL_DAY_SCHEMA = {
  name: "plume_journal_day",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      target: { type: "string", enum: ["journal_day"] },
      headline: { type: "string" },
      summary: { type: "string" },
      dayTitle: { type: "string" },
      sessions: {
        type: "array",
        minItems: 1,
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            start: { type: "string" },
            end: { type: "string" },
            title: { type: "string" },
            subjectKey: { type: "string", enum: SUBJECT_KEYS },
            note: { type: "string" },
            prep: PREP_SCHEMA,
          },
          required: ["start", "end", "title", "subjectKey", "note", "prep"],
        },
      },
    },
    required: ["target", "headline", "summary", "dayTitle", "sessions"],
  },
};

async function requestOpenAI(
  messages: Array<{ role: string; content: string }>,
  jsonSchema: unknown,
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "L'API OpenAI n'est pas encore configurée. Ajoute OPENAI_API_KEY dans le fichier .env.local puis relance Ardoise.",
    );
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages,
      response_format: {
        type: "json_schema",
        json_schema: jsonSchema,
      },
    }),
  });

  if (!response.ok) {
    const raw = await response.text();
    throw new Error(raw || "Réponse API indisponible.");
  }

  const payload = (await response.json()) as {
    choices?: Array<{
      message?: {
        refusal?: string;
        content?: unknown;
      };
    }>;
  };

  const choice = payload.choices?.[0]?.message;
  if (!choice) {
    throw new Error("Réponse IA vide.");
  }
  if (choice.refusal) {
    throw new Error(choice.refusal);
  }

  const text = contentToString(choice.content);
  if (!text) {
    throw new Error("Réponse IA inutilisable.");
  }
  return text;
}

async function generateClarification(input: PlumeJournalRequest): Promise<PlumeClarification> {
  const text = await requestOpenAI(buildClarifyMessages(input), CLARIFY_SCHEMA);
  return JSON.parse(text) as PlumeClarification;
}

async function generatePlan(input: PlumeJournalRequest): Promise<PlumePlanResponse> {
  const schema =
    input.target === "sequence"
      ? SEQUENCE_SCHEMA
      : input.target === "session"
        ? SESSION_SCHEMA
        : JOURNAL_DAY_SCHEMA;

  const text = await requestOpenAI(buildGenerateMessages(input), schema);
  return JSON.parse(text) as PlumePlanResponse;
}

export const Route = createFileRoute("/api/ai/plume-journal")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let value: unknown;
        try {
          value = await request.json();
        } catch {
          return Response.json({ error: "JSON invalide." }, { status: 400 });
        }

        if (!validBody(value)) {
          return Response.json({ error: "Requête invalide." }, { status: 400 });
        }

        try {
          if ((value.action ?? "generate") === "clarify") {
            const clarification = await generateClarification(value);
            return Response.json({ clarification });
          }

          const plan = await generatePlan(value);
          return Response.json({ plan });
        } catch (error) {
          return Response.json(
            {
              error:
                error instanceof Error
                  ? error.message
                  : "Impossible de générer une proposition pour le moment.",
            },
            { status: 500 },
          );
        }
      },
    },
  },
});
