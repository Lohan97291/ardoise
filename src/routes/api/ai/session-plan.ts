import { createFileRoute } from "@tanstack/react-router";
import type { SubjectKey } from "@/lib/ardoise-data";
import { loadAiResourceContext } from "@/lib/resource-library";

type SessionPlanAction = "clarify" | "generate";

type SessionPlanAnswer = {
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

type ClarifyResponse = {
  intro: string;
  readyToGenerate: boolean;
  questions: ClarifyingQuestion[];
};

type SessionPlanRequest = {
  action?: SessionPlanAction;
  title: string;
  subjectKey?: SubjectKey;
  subject: string;
  duration: string;
  resourceId?: string;
  programmingItemId?: string;
  prompt?: string;
  answers?: SessionPlanAnswer[];
  note?: string;
  objective?: string;
  competence?: string;
  currentFormat?: "seance" | "sequence";
  pedagogicalRationale?: string;
  sequenceSessions?: string[];
  evaluation?: string;
  materialSuggestions?: string[];
  photocopySuggestions?: string[];
  phases?: Array<{
    title?: string;
    duration?: string;
    detail?: string;
    differentiation?: string;
  }>;
  journalContext?: {
    matchReason?: string;
    currentDayLabel?: string;
    previousDaySessions?: string[];
    nextDaySessions?: string[];
    previousSameSubjectSessions?: string[];
    nextSameSubjectSessions?: string[];
    previousSameResourceSessions?: string[];
  };
};

type SessionPlanResponse = {
  recommendedFormat: "seance" | "sequence";
  pedagogicalRationale: string;
  competence: string;
  objective: string;
  sequenceSessions: string[];
  evaluation: string;
  materialSuggestions: string[];
  photocopySuggestions: string[];
  phases: Array<{
    title: string;
    duration: string;
    detail: string;
    differentiation: string;
  }>;
};

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validBody(value: unknown): value is SessionPlanRequest {
  if (!value || typeof value !== "object") return false;
  const body = value as Record<string, unknown>;
  return normalizeString(body.title).length > 0 && normalizeString(body.subject).length > 0;
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

function canUseSubjectContext(subjectKey?: SubjectKey): subjectKey is SubjectKey {
  return Boolean(
    subjectKey &&
    ["francais", "maths", "qlm", "emc", "eps", "arts", "lve", "rituels", "pause"].includes(
      subjectKey,
    ),
  );
}

async function buildMessages(input: SessionPlanRequest) {
  const currentPhases = (input.phases ?? [])
    .map((phase, index) => {
      const title = normalizeString(phase.title);
      const duration = normalizeString(phase.duration);
      const detail = normalizeString(phase.detail);
      if (!title && !detail) return "";
      return `Phase ${index + 1} : ${title || "[sans titre]"}${duration ? ` (${duration})` : ""} — ${detail || "[sans détail]"}`;
    })
    .filter(Boolean)
    .join("\n");

  const userPrompt = normalizeString(input.prompt);
  const answers = (input.answers ?? [])
    .map((item) => {
      const answer = normalizeString(item.answer);
      if (!answer) return "";
      return `- ${item.questionId} : ${answer}`;
    })
    .filter(Boolean)
    .join("\n");
  const note = normalizeString(input.note);
  const objective = normalizeString(input.objective);
  const competence = normalizeString(input.competence);
  const pedagogicalRationale = normalizeString(input.pedagogicalRationale);
  const evaluation = normalizeString(input.evaluation);
  const currentFormat =
    input.currentFormat === "sequence"
      ? "sequence"
      : input.currentFormat === "seance"
        ? "seance"
        : "";
  const sequenceSessions = (input.sequenceSessions ?? [])
    .map((item) => normalizeString(item))
    .filter(Boolean)
    .join("\n");
  const materialSuggestions = (input.materialSuggestions ?? [])
    .map((item) => normalizeString(item))
    .filter(Boolean)
    .join(", ");
  const photocopySuggestions = (input.photocopySuggestions ?? [])
    .map((item) => normalizeString(item))
    .filter(Boolean)
    .join(", ");
  const resourceContext = canUseSubjectContext(input.subjectKey)
    ? await loadAiResourceContext({
        subject: input.subjectKey,
        title: normalizeString(input.title),
        resourceId: normalizeString(input.resourceId),
        programmingItemId: normalizeString(input.programmingItemId),
      })
    : null;
  const previousSessions = resourceContext?.previousSessions.join(" | ");
  const nextSessions = resourceContext?.nextSessions.join(" | ");
  const alternativeSessions = resourceContext?.alternativeSessions.join(" | ");
  const journalContext = input.journalContext;
  const journalPreviousDay = journalContext?.previousDaySessions?.join(" | ");
  const journalNextDay = journalContext?.nextDaySessions?.join(" | ");
  const journalPreviousSubject = journalContext?.previousSameSubjectSessions?.join(" | ");
  const journalNextSubject = journalContext?.nextSameSubjectSessions?.join(" | ");
  const journalPreviousResource = journalContext?.previousSameResourceSessions?.join(" | ");

  return [
    {
      role: "system",
      content:
        "Tu aides un enseignant de CE1 en France. Ton rôle est de proposer la meilleure forme de préparation possible pour un créneau de classe : soit une séance directement exploitable, soit une mini-séquence si c'est plus pertinent pédagogiquement. Tu raisonnes pour des élèves de CE1, dans un langage enseignant clair, concret et réaliste. Tu fournis une vraie fiche de prep courte mais complète : format recommandé, justification pédagogique, compétence, objectif, déroulé progressif, matériel, photocopies et modalité d'évaluation. Si le format séquence est plus pertinent, tu proposes aussi 3 à 5 séances repères dans la séquence, tout en détaillant précisément la séance du créneau courant. Réponds uniquement dans le JSON demandé.",
    },
    {
      role: "user",
      content: [
        `Titre de séance : ${normalizeString(input.title)}`,
        `Matière : ${normalizeString(input.subject)}`,
        `Durée disponible : ${normalizeString(input.duration) || "à estimer"}`,
        note ? `Notes du jour : ${note}` : "",
        currentFormat ? `Format actuellement envisagé : ${currentFormat}` : "",
        pedagogicalRationale ? `Raisonnement pédagogique actuel : ${pedagogicalRationale}` : "",
        competence ? `Compétence actuelle : ${competence}` : "",
        objective ? `Objectif actuel : ${objective}` : "",
        evaluation ? `Évaluation actuelle : ${evaluation}` : "",
        materialSuggestions ? `Matériel actuel : ${materialSuggestions}` : "",
        photocopySuggestions ? `Photocopies actuelles : ${photocopySuggestions}` : "",
        sequenceSessions ? `Étapes de séquence actuelles :\n${sequenceSessions}` : "",
        currentPhases ? `Déroulé actuel :\n${currentPhases}` : "",
        resourceContext ? `Contexte ressources : ${resourceContext.matchReason}` : "",
        resourceContext?.methodLabel ? `Méthode repérée : ${resourceContext.methodLabel}` : "",
        resourceContext?.sequenceLabel
          ? `Séquence / période repérée : ${resourceContext.sequenceLabel}`
          : "",
        resourceContext?.currentSessionLabel
          ? `Ressource la plus proche : ${resourceContext.currentSessionLabel}`
          : "",
        previousSessions ? `Ce qui semble avoir été fait avant : ${previousSessions}` : "",
        nextSessions ? `Ce qui peut raisonnablement venir après : ${nextSessions}` : "",
        alternativeSessions ? `Autres ressources proches utiles : ${alternativeSessions}` : "",
        journalContext?.matchReason
          ? `Contexte du cahier journal réel : ${journalContext.matchReason}`
          : "",
        journalContext?.currentDayLabel
          ? `Journée réelle repérée : ${journalContext.currentDayLabel}`
          : "",
        journalPreviousDay ? `Déjà placé avant sur cette journée : ${journalPreviousDay}` : "",
        journalNextDay ? `Déjà placé après sur cette journée : ${journalNextDay}` : "",
        journalPreviousSubject
          ? `Séances déjà placées avant dans la même matière : ${journalPreviousSubject}`
          : "",
        journalNextSubject
          ? `Séances déjà placées après dans la même matière : ${journalNextSubject}`
          : "",
        journalPreviousResource
          ? `Séances déjà rencontrées dans la même ressource / progression : ${journalPreviousResource}`
          : "",
        answers ? `Précisions déjà données :\n${answers}` : "",
        userPrompt
          ? `Demande de l'enseignant : ${userPrompt}`
          : "Demande de l'enseignant : trouve la meilleure manière de préparer ce créneau pour un CE1 et génère la fiche de prep correspondante.",
      ]
        .filter(Boolean)
        .join("\n\n"),
    },
  ];
}

async function buildClarifyMessages(input: SessionPlanRequest) {
  const currentPhases = (input.phases ?? [])
    .map((phase, index) => {
      const title = normalizeString(phase.title);
      const duration = normalizeString(phase.duration);
      const detail = normalizeString(phase.detail);
      if (!title && !detail) return "";
      return `Phase ${index + 1} : ${title || "[sans titre]"}${duration ? ` (${duration})` : ""} — ${detail || "[sans détail]"}`;
    })
    .filter(Boolean)
    .join("\n");

  const prompt = normalizeString(input.prompt);
  const answers = (input.answers ?? [])
    .map((item) => {
      const answer = normalizeString(item.answer);
      if (!answer) return "";
      return `- ${item.questionId} : ${answer}`;
    })
    .filter(Boolean)
    .join("\n");
  const note = normalizeString(input.note);
  const objective = normalizeString(input.objective);
  const competence = normalizeString(input.competence);
  const pedagogicalRationale = normalizeString(input.pedagogicalRationale);
  const evaluation = normalizeString(input.evaluation);
  const currentFormat =
    input.currentFormat === "sequence"
      ? "sequence"
      : input.currentFormat === "seance"
        ? "seance"
        : "";
  const sequenceSessions = (input.sequenceSessions ?? [])
    .map((item) => normalizeString(item))
    .filter(Boolean)
    .join("\n");
  const materialSuggestions = (input.materialSuggestions ?? [])
    .map((item) => normalizeString(item))
    .filter(Boolean)
    .join(", ");
  const photocopySuggestions = (input.photocopySuggestions ?? [])
    .map((item) => normalizeString(item))
    .filter(Boolean)
    .join(", ");
  const resourceContext = canUseSubjectContext(input.subjectKey)
    ? await loadAiResourceContext({
        subject: input.subjectKey,
        title: normalizeString(input.title),
        resourceId: normalizeString(input.resourceId),
        programmingItemId: normalizeString(input.programmingItemId),
      })
    : null;
  const previousSessions = resourceContext?.previousSessions.join(" | ");
  const nextSessions = resourceContext?.nextSessions.join(" | ");
  const alternativeSessions = resourceContext?.alternativeSessions.join(" | ");
  const journalContext = input.journalContext;
  const journalPreviousDay = journalContext?.previousDaySessions?.join(" | ");
  const journalNextDay = journalContext?.nextDaySessions?.join(" | ");
  const journalPreviousSubject = journalContext?.previousSameSubjectSessions?.join(" | ");
  const journalNextSubject = journalContext?.nextSameSubjectSessions?.join(" | ");
  const journalPreviousResource = journalContext?.previousSameResourceSessions?.join(" | ");

  return [
    {
      role: "system",
      content:
        "Tu aides un enseignant de CE1 en France. Ton rôle ici n'est PAS encore de générer la fiche de prep finale. Tu dois décider s'il manque des informations importantes pour produire une séance ou mini-séquence vraiment pertinente. Si le contexte est déjà suffisant, retourne readyToGenerate=true et une liste vide de questions. Sinon, pose au maximum 3 questions courtes, très utiles, concrètes, avec 2 à 4 suggestions de réponses rapides et une possibilité de réponse libre. Les questions doivent faire gagner du temps à l'enseignant. Tu produis uniquement le JSON demandé.",
    },
    {
      role: "user",
      content: [
        `Titre de séance : ${normalizeString(input.title)}`,
        `Matière : ${normalizeString(input.subject)}`,
        `Durée disponible : ${normalizeString(input.duration) || "à estimer"}`,
        note ? `Notes du jour : ${note}` : "",
        currentFormat ? `Format actuellement envisagé : ${currentFormat}` : "",
        pedagogicalRationale ? `Raisonnement pédagogique actuel : ${pedagogicalRationale}` : "",
        competence ? `Compétence actuelle : ${competence}` : "",
        objective ? `Objectif actuel : ${objective}` : "",
        evaluation ? `Évaluation actuelle : ${evaluation}` : "",
        materialSuggestions ? `Matériel actuel : ${materialSuggestions}` : "",
        photocopySuggestions ? `Photocopies actuelles : ${photocopySuggestions}` : "",
        sequenceSessions ? `Étapes de séquence actuelles :\n${sequenceSessions}` : "",
        currentPhases ? `Déroulé actuel :\n${currentPhases}` : "",
        resourceContext ? `Contexte ressources : ${resourceContext.matchReason}` : "",
        resourceContext?.methodLabel ? `Méthode repérée : ${resourceContext.methodLabel}` : "",
        resourceContext?.sequenceLabel
          ? `Séquence / période repérée : ${resourceContext.sequenceLabel}`
          : "",
        resourceContext?.currentSessionLabel
          ? `Ressource la plus proche : ${resourceContext.currentSessionLabel}`
          : "",
        previousSessions ? `Ce qui semble avoir été fait avant : ${previousSessions}` : "",
        nextSessions ? `Ce qui peut raisonnablement venir après : ${nextSessions}` : "",
        alternativeSessions ? `Autres ressources proches utiles : ${alternativeSessions}` : "",
        journalContext?.matchReason
          ? `Contexte du cahier journal réel : ${journalContext.matchReason}`
          : "",
        journalContext?.currentDayLabel
          ? `Journée réelle repérée : ${journalContext.currentDayLabel}`
          : "",
        journalPreviousDay ? `Déjà placé avant sur cette journée : ${journalPreviousDay}` : "",
        journalNextDay ? `Déjà placé après sur cette journée : ${journalNextDay}` : "",
        journalPreviousSubject
          ? `Séances déjà placées avant dans la même matière : ${journalPreviousSubject}`
          : "",
        journalNextSubject
          ? `Séances déjà placées après dans la même matière : ${journalNextSubject}`
          : "",
        journalPreviousResource
          ? `Séances déjà rencontrées dans la même ressource / progression : ${journalPreviousResource}`
          : "",
        answers ? `Précisions déjà données :\n${answers}` : "",
        prompt
          ? `Demande de l'enseignant : ${prompt}`
          : "Demande de l'enseignant : aide-moi à préciser juste ce qu'il te manque avant de générer.",
      ]
        .filter(Boolean)
        .join("\n\n"),
    },
  ];
}

const SESSION_PLAN_SCHEMA = {
  name: "session_plan",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      recommendedFormat: {
        type: "string",
        enum: ["seance", "sequence"],
      },
      pedagogicalRationale: { type: "string" },
      competence: { type: "string" },
      objective: { type: "string" },
      sequenceSessions: {
        type: "array",
        items: { type: "string" },
      },
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
      "recommendedFormat",
      "pedagogicalRationale",
      "competence",
      "objective",
      "sequenceSessions",
      "evaluation",
      "materialSuggestions",
      "photocopySuggestions",
      "phases",
    ],
  },
};

const CLARIFY_SCHEMA = {
  name: "session_plan_clarify",
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

async function generateSessionPlan(input: SessionPlanRequest): Promise<SessionPlanResponse> {
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
      messages: await buildMessages(input),
      response_format: {
        type: "json_schema",
        json_schema: SESSION_PLAN_SCHEMA,
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
    throw new Error("Réponse IA inexploitable.");
  }

  const parsed = JSON.parse(text) as SessionPlanResponse;
  if (
    !parsed.competence ||
    !parsed.objective ||
    !parsed.pedagogicalRationale ||
    !Array.isArray(parsed.phases)
  ) {
    throw new Error("Réponse IA incomplète.");
  }

  return {
    recommendedFormat: parsed.recommendedFormat === "sequence" ? "sequence" : "seance",
    pedagogicalRationale: parsed.pedagogicalRationale.trim(),
    competence: parsed.competence.trim(),
    objective: parsed.objective.trim(),
    sequenceSessions: (parsed.sequenceSessions ?? [])
      .map((item) => normalizeString(item))
      .filter(Boolean),
    evaluation: normalizeString(parsed.evaluation),
    materialSuggestions: (parsed.materialSuggestions ?? [])
      .map((item) => normalizeString(item))
      .filter(Boolean),
    photocopySuggestions: (parsed.photocopySuggestions ?? [])
      .map((item) => normalizeString(item))
      .filter(Boolean),
    phases: parsed.phases
      .map((phase) => ({
        title: normalizeString(phase.title),
        duration: normalizeString(phase.duration),
        detail: normalizeString(phase.detail),
        differentiation: normalizeString(phase.differentiation),
      }))
      .filter((phase) => phase.title || phase.detail),
  };
}

async function generateClarification(input: SessionPlanRequest): Promise<ClarifyResponse> {
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
      messages: await buildClarifyMessages(input),
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
    throw new Error("Réponse IA inexploitable.");
  }

  return JSON.parse(text) as ClarifyResponse;
}

export const Route = createFileRoute("/api/ai/session-plan")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let value: unknown;
        try {
          value = await request.json();
        } catch {
          return Response.json({ error: "JSON invalide" }, { status: 400 });
        }

        if (!validBody(value)) {
          return Response.json({ error: "Titre et matière requis." }, { status: 400 });
        }

        try {
          if ((value.action ?? "generate") === "clarify") {
            const clarification = await generateClarification(value);
            return Response.json({ clarification });
          }

          const plan = await generateSessionPlan(value);
          return Response.json({ plan });
        } catch (error) {
          return Response.json(
            {
              error:
                error instanceof Error
                  ? error.message
                  : "Impossible de générer la séance pour le moment.",
            },
            { status: 502 },
          );
        }
      },
    },
  },
});
