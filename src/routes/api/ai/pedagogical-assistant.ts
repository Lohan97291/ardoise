import { createFileRoute } from "@tanstack/react-router";

type AssistantMode = "remediation" | "sequence" | "timetable" | "homework";
type AssistantAction = "clarify" | "generate";

type AssistantAnswer = {
  questionId: string;
  answer: string;
};

type ClarifyingQuestion = {
  id: string;
  question: string;
  rationale: string;
  suggestions: string[];
  freeTextPlaceholder: string;
};

type AssistantRequest = {
  action?: AssistantAction;
  mode: AssistantMode;
  title?: string;
  subject?: string;
  prompt?: string;
  answers?: AssistantAnswer[];
  contextSections?: Array<{
    label: string;
    items: string[];
  }>;
};

type AssistantResponse = {
  headline: string;
  summary: string;
  recommendations: string[];
  vigilancePoints: string[];
  nextSteps: string[];
  artifacts: Array<{
    title: string;
    items: string[];
  }>;
};

type ClarifyResponse = {
  intro: string;
  readyToGenerate: boolean;
  questions: ClarifyingQuestion[];
};

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validBody(value: unknown): value is AssistantRequest {
  if (!value || typeof value !== "object") return false;
  const body = value as Record<string, unknown>;
  return ["remediation", "sequence", "timetable", "homework"].includes(normalizeString(body.mode));
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

function modeInstruction(mode: AssistantMode): string {
  if (mode === "remediation") {
    return "Tu proposes des remédiations CE1 concrètes à partir de difficultés observées. Tu aides l'enseignant à organiser la reprise, à cibler des groupes, à prévoir des manipulations, des reformulations, de l'entraînement et une vérification rapide des progrès.";
  }
  if (mode === "sequence") {
    return "Tu proposes une mini-séquence CE1 claire, réaliste et directement réutilisable pour être ajoutée ensuite dans les ressources. Tu structures le fil directeur, les séances, les objectifs, la progression, l'évaluation et les besoins matériels.";
  }
  if (mode === "timetable") {
    return "Tu aides à construire un emploi du temps CE1 équilibré selon les contraintes données. Tu dois respecter autant que possible les volumes et durées, répartir les charges cognitives, conserver les méthodes imposées et proposer des arbitrages réalistes.";
  }
  return "Tu proposes des devoirs CE1 courts, utiles et réalistes, reliés à ce qui a été fait ou va être fait en classe. Tu ne crées pas une fiche d'exercices complète : tu suggères des devoirs pertinents, faisables à la maison, avec variantes simples si besoin.";
}

function buildMessages(input: AssistantRequest) {
  const prompt = normalizeString(input.prompt);
  const title = normalizeString(input.title);
  const subject = normalizeString(input.subject);
  const sections = (input.contextSections ?? [])
    .map((section) => {
      const label = normalizeString(section.label);
      const items = (section.items ?? []).map((item) => normalizeString(item)).filter(Boolean);
      if (!label || items.length === 0) return "";
      return `${label} :\n- ${items.join("\n- ")}`;
    })
    .filter(Boolean)
    .join("\n\n");

  return [
    {
      role: "system",
      content: `Tu aides un enseignant de CE1 en France. ${modeInstruction(
        input.mode,
      )} Tu réponds en langage enseignant clair, concret et immédiatement utile. Tu produis uniquement le JSON demandé.`,
    },
    {
      role: "user",
      content: [
        title ? `Titre / point de départ : ${title}` : "",
        subject ? `Domaine : ${subject}` : "",
        sections ? `Contexte réel :\n${sections}` : "",
        prompt
          ? `Demande de l'enseignant : ${prompt}`
          : "Demande de l'enseignant : propose la réponse la plus utile possible pour cette situation.",
      ]
        .filter(Boolean)
        .join("\n\n"),
    },
  ];
}

function buildClarifyMessages(input: AssistantRequest) {
  const prompt = normalizeString(input.prompt);
  const title = normalizeString(input.title);
  const subject = normalizeString(input.subject);
  const sections = (input.contextSections ?? [])
    .map((section) => {
      const label = normalizeString(section.label);
      const items = (section.items ?? []).map((item) => normalizeString(item)).filter(Boolean);
      if (!label || items.length === 0) return "";
      return `${label} :\n- ${items.join("\n- ")}`;
    })
    .filter(Boolean)
    .join("\n\n");
  const answers = (input.answers ?? [])
    .map((item) => {
      const answer = normalizeString(item.answer);
      if (!answer) return "";
      return `- ${item.questionId} : ${answer}`;
    })
    .filter(Boolean)
    .join("\n");

  return [
    {
      role: "system",
      content: `Tu aides un enseignant de CE1 en France. ${modeInstruction(
        input.mode,
      )} Ton rôle ici n'est PAS encore de générer la réponse finale. Tu dois décider s'il manque des informations importantes. Si tout est déjà assez clair, retourne readyToGenerate=true et une liste vide de questions. Sinon, pose au maximum 3 questions courtes, très utiles, concrètes, chacune avec 2 à 4 suggestions de réponses courtes et un champ libre possible. Les questions doivent aider un enseignant à aller vite, sans être vagues ni scolaires. Tu produis uniquement le JSON demandé.`,
    },
    {
      role: "user",
      content: [
        title ? `Titre / point de départ : ${title}` : "",
        subject ? `Domaine : ${subject}` : "",
        sections ? `Contexte réel :\n${sections}` : "",
        prompt
          ? `Demande de l'enseignant : ${prompt}`
          : "Demande de l'enseignant : aide-moi à préciser ce qu'il te manque avant de générer.",
        answers ? `Réponses déjà données :\n${answers}` : "",
      ]
        .filter(Boolean)
        .join("\n\n"),
    },
  ];
}

const ASSISTANT_SCHEMA = {
  name: "pedagogical_assistant",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      headline: { type: "string" },
      summary: { type: "string" },
      recommendations: {
        type: "array",
        items: { type: "string" },
      },
      vigilancePoints: {
        type: "array",
        items: { type: "string" },
      },
      nextSteps: {
        type: "array",
        items: { type: "string" },
      },
      artifacts: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            title: { type: "string" },
            items: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: ["title", "items"],
        },
      },
    },
    required: [
      "headline",
      "summary",
      "recommendations",
      "vigilancePoints",
      "nextSteps",
      "artifacts",
    ],
  },
};

const CLARIFY_SCHEMA = {
  name: "pedagogical_clarify",
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

async function generateAdvice(input: AssistantRequest): Promise<AssistantResponse> {
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
      messages: buildMessages(input),
      response_format: {
        type: "json_schema",
        json_schema: ASSISTANT_SCHEMA,
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

  return JSON.parse(text) as AssistantResponse;
}

async function generateClarification(input: AssistantRequest): Promise<ClarifyResponse> {
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
      messages: buildClarifyMessages(input),
      response_format: {
        type: "json_schema",
        json_schema: CLARIFY_SCHEMA,
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

  return JSON.parse(text) as ClarifyResponse;
}

export const Route = createFileRoute("/api/ai/pedagogical-assistant")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          if (!validBody(body)) {
            return Response.json(
              { error: "Requête invalide." },
              {
                status: 400,
              },
            );
          }

          if ((body.action ?? "generate") === "clarify") {
            const clarification = await generateClarification(body);
            return Response.json({ clarification });
          }

          const advice = await generateAdvice(body);
          return Response.json({ advice });
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
