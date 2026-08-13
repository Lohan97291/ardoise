import type { Session, SessionCorrectionMode } from "@/lib/ardoise-data";

export type SessionResultTarget = {
  kind: "correction" | "fluence";
  label: string;
  href: string;
  period?: string;
};

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "'")
    .toLowerCase();
}

function validSessionId(session: Session): boolean {
  return Boolean(session.id && session.subject !== "pause");
}

function correctionMode(session: Session): SessionCorrectionMode {
  return session.correctionMode ?? "auto";
}

function correctionParams(
  session: Session,
  notebook?: "Cléo" | "ACCÈS" | "Orthographémic",
): URLSearchParams {
  const params = new URLSearchParams({ sessionId: session.id });
  if (notebook) params.set("notebook", notebook);
  if (session.correctionExerciseId) params.set("exerciseId", session.correctionExerciseId);
  const page = firstCorrectionPage(session);
  if (page) params.set("page", String(page));
  return params;
}

function firstCorrectionPage(session: Session): number | undefined {
  for (const item of session.exercisePlan ?? []) {
    const fromStudentPage = item.studentPages?.[0];
    if (typeof fromStudentPage === "number" && fromStudentPage > 0) return fromStudentPage;
    if (typeof item.page === "number" && item.page > 0) return item.page;
  }
  return undefined;
}

export function inferFluencePeriodFromSession(session: Session): string | undefined {
  const text = normalize(`${session.title} ${session.note ?? ""}`);

  if (text.includes("diagnostic")) return "Diagnostic S1";
  if (text.includes("bilan a") || text.includes("chapitre a") || text.includes("chap a"))
    return "Bilan A";
  if (text.includes("bilan o") || text.includes("chapitre o") || text.includes("chap o"))
    return "Bilan O";
  if (text.includes("bilan e") || text.includes("chapitre e") || text.includes("chap e"))
    return "Bilan E";
  if (text.includes("bilan c") || text.includes("chapitre c") || text.includes("chap c"))
    return "Bilan C";
  if (text.includes("bilan g") || text.includes("chapitre g") || text.includes("chap g"))
    return "Bilan G";
  if (text.includes("bilan s") || text.includes("chapitre s") || text.includes("chap s"))
    return "Bilan S";
  if (text.includes("bilan i") || text.includes("chapitre i") || text.includes("chap i"))
    return "Bilan I";
  if (text.includes("octobre")) return "Octobre";
  if (text.includes("janvier")) return "Janvier";
  if (text.includes("juin")) return "Juin";
  return undefined;
}

export function isFluenceEvaluationSession(session: Session): boolean {
  const text = normalize(`${session.title} ${session.note ?? ""}`);
  const mentionsFluence = text.includes("fluence");
  const mentionsEvaluation =
    text.includes("bilan") ||
    text.includes("evaluation") ||
    text.includes("eval") ||
    text.includes("mesure") ||
    text.includes("chronomet") ||
    text.includes("mots/min");

  return mentionsFluence && (mentionsEvaluation || Boolean(inferFluencePeriodFromSession(session)));
}

export function getSessionCorrectionLabel(session: Session): string {
  const mode = correctionMode(session);

  if (mode === "none") return "Pas de correction liée";
  if (mode === "fluence") return "Saisir la fluence";
  if (mode === "cleo") return "Corriger le cahier Cléo";
  if (mode === "maths") return "Corriger le cahier de maths";
  if (mode === "dictation") return "Corriger la dictée bilan";
  if (isFluenceEvaluationSession(session)) return "Saisir la fluence";

  const hasStructuredCorrection = Boolean(
    session.programmingItemId || session.exercisePlan?.length,
  );
  return hasStructuredCorrection ? "Corriger cette séance" : "Rattacher une correction";
}

export function getSessionResultTarget(session: Session): SessionResultTarget | null {
  if (!validSessionId(session)) return null;

  const mode = correctionMode(session);
  if (mode === "none") return null;

  if (mode === "fluence" || isFluenceEvaluationSession(session)) {
    const period = session.correctionPeriod ?? inferFluencePeriodFromSession(session);
    const params = new URLSearchParams({ sessionId: session.id });
    if (period) params.set("period", period);
    return {
      kind: "fluence",
      label: getSessionCorrectionLabel(session),
      href: `/fluence?${params.toString()}`,
      period,
    };
  }

  if (mode === "cleo") {
    return {
      kind: "correction",
      label: getSessionCorrectionLabel(session),
      href: `/correction-rapide?${correctionParams(session, "Cléo").toString()}`,
    };
  }

  if (mode === "maths") {
    return {
      kind: "correction",
      label: getSessionCorrectionLabel(session),
      href: `/correction-rapide?${correctionParams(session, "ACCÈS").toString()}`,
    };
  }

  if (mode === "dictation") {
    return {
      kind: "correction",
      label: getSessionCorrectionLabel(session),
      href: `/correction-rapide?${correctionParams(session, "Orthographémic").toString()}`,
    };
  }

  return {
    kind: "correction",
    label: getSessionCorrectionLabel(session),
    href: `/correction-rapide?${correctionParams(session).toString()}`,
  };
}
