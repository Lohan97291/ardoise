import type { MailAnalysis, MailDeadline } from "@/lib/server/mail-types";

const AUTO_SIGNATURE_PATTERN = /\n?---[\s\S]*?This email was sent automatically with n8n\s*$/i;

const HTML_ENTITIES: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&rsquo;": "\u2019",
  "&lsquo;": "\u2018",
  "&rdquo;": "\u201d",
  "&ldquo;": "\u201c",
  "&mdash;": "\u2014",
  "&ndash;": "\u2013",
  "&hellip;": "\u2026",
};

/**
 * Nettoie récursivement les artefacts markdown/HTML résiduels d'un texte.
 * Idempotent : appliquer cette fonction plusieurs fois de suite ne change plus le résultat.
 */
function cleanText(value?: string | null): string {
  let text = (value ?? "").replace(AUTO_SIGNATURE_PATTERN, "");

  // Séquences d'échappement littérales (ex: "\n" tapé en dur dans le texte)
  text = text.replace(/\\r\\n/g, "\n").replace(/\\n/g, "\n").replace(/\\t/g, " ");

  // Entités HTML nommées et numériques
  text = text.replace(
    /&nbsp;|&amp;|&lt;|&gt;|&quot;|&#39;|&apos;|&rsquo;|&lsquo;|&rdquo;|&ldquo;|&mdash;|&ndash;|&hellip;/g,
    (entity) => HTML_ENTITIES[entity] ?? entity,
  );
  text = text.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
  text = text.replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));

  // Balises HTML résiduelles (on garde le contenu)
  text = text.replace(/<\/?[a-z][a-z0-9]*(\s+[^<>]*)?>/gi, "");

  // Espaces insécables et variantes unicode d'espace
  text = text.replace(/[\u00a0\u202f\u2007]/g, " ");

  // Liens markdown [texte](url) -> texte
  text = text.replace(/\[([^\]]+)\]\((?:[^()]|\([^()]*\))*\)/g, "$1");

  // Titres markdown en début de ligne (#, ##, ...)
  text = text.replace(/^\s{0,3}#{1,6}\s+/gm, "");

  // Citations markdown en début de ligne (>)
  text = text.replace(/^\s{0,3}>\s?/gm, "");

  // Puces markdown mal rendues en début de ligne (-, *, +)
  text = text.replace(/^\s*[-*+]\s+/gm, "");

  // Blocs de code et code inline (backticks) -> on garde le contenu
  text = text.replace(/```([\s\S]*?)```/g, "$1");
  text = text.replace(/`([^`]+)`/g, "$1");

  // Emphase markdown : **gras**, __gras__, *italique*, _italique_
  text = text.replace(/\*\*\*([^*]+)\*\*\*/g, "$1");
  text = text.replace(/___([^_]+)___/g, "$1");
  text = text.replace(/\*\*([^*]+)\*\*/g, "$1");
  text = text.replace(/__([^_]+)__/g, "$1");
  text = text.replace(/\*([^*\n]+)\*/g, "$1");
  text = text.replace(/(?<![\w])_([^_\n]+)_(?![\w])/g, "$1");

  // Astérisques/underscores/backticks résiduels en début ou fin de mot
  text = text.replace(/(^|\s)[*_`]+/g, "$1");
  text = text.replace(/[*_`]+(\s|$)/g, "$1");
  text = text.replace(/[*_`]+/g, "");

  text = text
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/[ \t]*\n[ \t]*/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return text;
}

function extractDigestField(text: string, label: string): string | null {
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `-\\s*${escapedLabel}\\s*:?\\s*([\\s\\S]*?)(?=\\n-\\s*\\*\\*|\\n---|$)`,
    "i",
  );
  const match = text.match(pattern);
  return match?.[1] ? cleanText(match[1]) : null;
}

function looksLikeStructuredDigest(text: string): boolean {
  return (
    /Niveau de priorité/i.test(text) &&
    /Résumé\s*\(2 phrases max\)/i.test(text) &&
    /Action attendue/i.test(text)
  );
}

function isEmptyAction(value: string): boolean {
  return (
    /aucune action/i.test(value) || /pas d'action/i.test(value) || /non déterminable/i.test(value)
  );
}

function isReceiptOnlyDeadline(value: string): boolean {
  return /date de r[ée]ception/i.test(value) || /date d[’']envoi/i.test(value);
}

function sameMomentAsReceived(deadline: MailDeadline, receivedAt: string): boolean {
  const received = new Date(receivedAt);
  if (Number.isNaN(received.getTime())) return false;

  const localDate = `${received.getFullYear()}-${String(received.getMonth() + 1).padStart(2, "0")}-${String(
    received.getDate(),
  ).padStart(2, "0")}`;
  const localTime = `${String(received.getHours()).padStart(2, "0")}:${String(
    received.getMinutes(),
  ).padStart(2, "0")}`;

  return deadline.date === localDate && (deadline.time === null || deadline.time === localTime);
}

function normalizeDeadlines(
  deadlines: MailDeadline[],
  receivedAt: string,
  digestDeadlineText: string | null,
): MailDeadline[] {
  const digestLooksLikeReceiptOnly = digestDeadlineText
    ? isReceiptOnlyDeadline(digestDeadlineText)
    : false;

  return deadlines
    .filter((deadline) => {
      if (!digestLooksLikeReceiptOnly) return true;
      return !sameMomentAsReceived(deadline, receivedAt);
    })
    .map((deadline) => ({ ...deadline, label: cleanText(deadline.label) }));
}

export function normalizeMailAnalysis(value: MailAnalysis): MailAnalysis {
  const cleanedSummary = cleanText(value.summary);
  const cleanedExcerpt = cleanText(value.excerpt);
  const cleanedSubject = cleanText(value.subject);
  const cleanedFromName = cleanText(value.fromName);

  if (!looksLikeStructuredDigest(cleanedSummary)) {
    return {
      ...value,
      subject: cleanedSubject,
      fromName: cleanedFromName,
      summary: cleanedSummary,
      excerpt: cleanedExcerpt || null,
      actions: value.actions.map((action) => cleanText(action)).filter(Boolean),
      deadlines: value.deadlines.map((deadline) => ({ ...deadline, label: cleanText(deadline.label) })),
    };
  }

  const summaryText = extractDigestField(cleanedSummary, "Résumé (2 phrases max)");
  const actionText = extractDigestField(cleanedSummary, "Action attendue de Lohan");
  const deadlineText = extractDigestField(cleanedSummary, "Dates / échéances mentionnées");
  const replyText = extractDigestField(cleanedSummary, "Réponse nécessaire");

  const normalizedActions =
    actionText && !isEmptyAction(actionText)
      ? [actionText]
      : value.actions
          .map((action) => cleanText(action))
          .filter((action) => action && !isEmptyAction(action));

  const normalizedDeadlines = normalizeDeadlines(value.deadlines, value.receivedAt, deadlineText);
  const normalizedReplyRequired =
    replyText && /probablement non|non déterminable|non\b/i.test(replyText)
      ? false
      : value.replyRequired;

  return {
    ...value,
    subject: cleanedSubject,
    fromName: cleanedFromName,
    summary: summaryText || cleanedSummary,
    excerpt: cleanedExcerpt && !looksLikeStructuredDigest(cleanedExcerpt) ? cleanedExcerpt : null,
    actions: normalizedActions,
    deadlines: normalizedDeadlines,
    replyRequired: normalizedReplyRequired,
  };
}
