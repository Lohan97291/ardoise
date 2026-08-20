import type { MailAnalysis, MailPriority } from "@/lib/server/mail-types";
import { deleteMailAnalysis, listMailAnalyses, saveMailAnalysis } from "@/lib/server/mail-store.server";

const VALID_PRIORITIES: MailPriority[] = ["low", "normal", "important", "urgent"];
const VALID_MAILBOX_LABELS = ["hotmail", "ac-versailles", "inconnue"];

type IncomingMailAnalysis = Partial<MailAnalysis> & Record<string, unknown>;

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

export function isValidMailAnalysisPayload(value: unknown): value is MailAnalysis {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.externalId === "string" &&
    v.externalId.length > 0 &&
    typeof v.messageId === "string" &&
    v.messageId.length > 0 &&
    typeof v.mailboxLabel === "string" &&
    VALID_MAILBOX_LABELS.includes(v.mailboxLabel) &&
    typeof v.fromName === "string" &&
    typeof v.fromEmail === "string" &&
    v.fromEmail.length > 0 &&
    typeof v.subject === "string" &&
    typeof v.receivedAt === "string" &&
    (v.attachmentName === null || typeof v.attachmentName === "string") &&
    (v.attachmentType === null || typeof v.attachmentType === "string") &&
    typeof v.priority === "string" &&
    VALID_PRIORITIES.includes(v.priority as MailPriority) &&
    typeof v.summary === "string" &&
    v.summary.length > 0 &&
    (v.excerpt === undefined || v.excerpt === null || typeof v.excerpt === "string") &&
    Array.isArray(v.actions) &&
    Array.isArray(v.deadlines) &&
    typeof v.replyRequired === "boolean"
  );
}

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asNullableText(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeMailboxLabel(value: unknown): MailAnalysis["mailboxLabel"] {
  const normalized = asText(value).toLowerCase();
  if (normalized === "hotmail" || normalized === "ac-versailles") return normalized;
  return "inconnue";
}

function normalizePriority(value: unknown): MailPriority {
  const normalized = asText(value).toLowerCase() as MailPriority;
  return VALID_PRIORITIES.includes(normalized) ? normalized : "normal";
}

function normalizeStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
      .filter((entry) => entry.length > 0);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? [trimmed] : [];
  }

  return [];
}

function normalizeDeadlines(value: unknown): MailAnalysis["deadlines"] {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const candidate = entry as Record<string, unknown>;
      const label = asText(candidate.label);
      const date = asText(candidate.date);
      const timeValue = candidate.time;
      const time =
        timeValue === null || timeValue === undefined ? null : asNullableText(timeValue);

      if (!label || !date) return null;
      return { label, date, time };
    })
    .filter((entry): entry is MailAnalysis["deadlines"][number] => entry !== null);
}

function coerceMailAnalysisPayload(value: unknown): MailAnalysis | null {
  if (!value || typeof value !== "object") return null;

  const candidate = value as IncomingMailAnalysis;
  const externalId = asText(candidate.externalId);
  const messageId = asText(candidate.messageId ?? candidate.messageid);
  const fromEmail = asText(candidate.fromEmail ?? candidate.from);
  const subject = asText(candidate.subject);
  const receivedAt = asText(candidate.receivedAt);
  const summary = asText(candidate.summary);

  if (!externalId || !messageId || !fromEmail || !subject || !receivedAt || !summary) {
    return null;
  }

  return {
    externalId,
    messageId,
    mailboxLabel: normalizeMailboxLabel(candidate.mailboxLabel),
    fromName: asText(candidate.fromName),
    fromEmail,
    subject,
    receivedAt,
    attachmentName: asNullableText(candidate.attachmentName),
    attachmentType: asNullableText(candidate.attachmentType),
    priority: normalizePriority(candidate.priority),
    summary,
    excerpt: asNullableText(candidate.excerpt),
    actions: normalizeStringArray(candidate.actions),
    deadlines: normalizeDeadlines(candidate.deadlines),
    replyRequired: Boolean(candidate.replyRequired),
  };
}

export function isAuthorizedMailIngress(request: Request): boolean {
  const secret = process.env.N8N_INGEST_SECRET?.trim();
  if (!secret) return false;

  const authHeader = request.headers.get("authorization")?.trim();
  const directHeader = request.headers.get("x-ardoise-ingest-secret")?.trim();
  const url = new URL(request.url);
  const querySecret = url.searchParams.get("secret")?.trim();

  if (authHeader === `Bearer ${secret}` || authHeader === secret) {
    return true;
  }

  if (directHeader === secret || querySecret === secret) {
    return true;
  }

  return false;
}

export async function handleMailIngressGet() {
  return Response.json({ analyses: await listMailAnalyses() }, { headers: NO_STORE_HEADERS });
}

export async function handleMailIngressPost(request: Request) {
  if (!isAuthorizedMailIngress(request)) {
    return Response.json(
      {
        error: "Unauthorized",
        details:
          "Le secret n8n est absent ou ne correspond pas au header Authorization / x-ardoise-ingest-secret.",
      },
      { status: 401, headers: NO_STORE_HEADERS },
    );
  }

  let value: unknown;
  try {
    value = await request.json();
  } catch {
    return Response.json({ error: "JSON invalide" }, { status: 400, headers: NO_STORE_HEADERS });
  }

  const payload = isValidMailAnalysisPayload(value) ? value : coerceMailAnalysisPayload(value);

  if (!payload) {
    return Response.json(
      { error: "Payload incomplet ou invalide" },
      { status: 400, headers: NO_STORE_HEADERS },
    );
  }

  return Response.json(
    { success: true, analysis: await saveMailAnalysis(payload) },
    { headers: NO_STORE_HEADERS },
  );
}

export async function handleMailIngressDelete(request: Request) {
  const url = new URL(request.url);
  const externalId = url.searchParams.get("externalId")?.trim();

  if (!externalId) {
    return Response.json(
      { error: "externalId manquant" },
      { status: 400, headers: NO_STORE_HEADERS },
    );
  }

  await deleteMailAnalysis(externalId);
  return Response.json({ success: true, externalId }, { headers: NO_STORE_HEADERS });
}
