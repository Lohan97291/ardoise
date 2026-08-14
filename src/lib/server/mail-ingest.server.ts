import type { MailAnalysis, MailPriority } from "@/lib/server/mail-types";
import { deleteMailAnalysis, listMailAnalyses, saveMailAnalysis } from "@/lib/server/mail-store.server";

const VALID_PRIORITIES: MailPriority[] = ["low", "normal", "important", "urgent"];
const VALID_MAILBOX_LABELS = ["hotmail", "ac-versailles", "inconnue"];

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

export function isAuthorizedMailIngress(request: Request): boolean {
  const secret = process.env.N8N_INGEST_SECRET;
  return Boolean(secret) && request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function handleMailIngressGet() {
  return Response.json({ analyses: await listMailAnalyses() });
}

export async function handleMailIngressPost(request: Request) {
  if (!isAuthorizedMailIngress(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let value: unknown;
  try {
    value = await request.json();
  } catch {
    return Response.json({ error: "JSON invalide" }, { status: 400 });
  }

  if (!isValidMailAnalysisPayload(value)) {
    return Response.json({ error: "Payload incomplet ou invalide" }, { status: 400 });
  }

  return Response.json({ success: true, analysis: await saveMailAnalysis(value) });
}

export async function handleMailIngressDelete(request: Request) {
  const url = new URL(request.url);
  const externalId = url.searchParams.get("externalId")?.trim();

  if (!externalId) {
    return Response.json({ error: "externalId manquant" }, { status: 400 });
  }

  await deleteMailAnalysis(externalId);
  return Response.json({ success: true, externalId });
}
