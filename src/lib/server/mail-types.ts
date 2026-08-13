export type MailPriority = "low" | "normal" | "important" | "urgent";

export type MailDeadline = { label: string; date: string; time: string | null };

export type MailAnalysis = {
  externalId: string;
  messageId: string;
  mailboxLabel: "hotmail" | "ac-versailles" | "inconnue";
  fromName: string;
  fromEmail: string;
  subject: string;
  receivedAt: string;
  attachmentName: string | null;
  attachmentType: string | null;
  priority: MailPriority;
  summary: string;
  excerpt?: string | null;
  actions: string[];
  deadlines: MailDeadline[];
  replyRequired: boolean;
};

export type GraphMessage = {
  id: string;
  internetMessageId?: string | null;
  subject?: string | null;
  receivedDateTime?: string | null;
  body?: { content?: string } | null;
  bodyPreview?: string | null;
  from?: { emailAddress?: { name?: string; address?: string } } | null;
};
