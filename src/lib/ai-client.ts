export type AssistantQuestionAnswer = {
  freeText?: string;
  selectedSuggestion?: string;
};

export function buildQuestionAnswersPayload<Question extends { id: string }>(
  questions: Question[] | null | undefined,
  answers: Record<string, AssistantQuestionAnswer>,
): Array<{ questionId: string; answer: string }> {
  return (questions ?? [])
    .map((question) => {
      const answer = answers[question.id];
      const freeText = answer?.freeText?.trim();
      const selected = answer?.selectedSuggestion?.trim();
      const value = freeText || selected || "";
      if (!value) return null;
      return {
        questionId: question.id,
        answer: value,
      };
    })
    .filter((item): item is { questionId: string; answer: string } => item !== null);
}

export async function postJsonOrThrow<TResponse>(
  url: string,
  body: unknown,
  fallbackMessage: string,
): Promise<TResponse> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new Error(fallbackMessage);
  }

  if (!response.ok) {
    const message =
      payload &&
      typeof payload === "object" &&
      "error" in payload &&
      typeof payload.error === "string"
        ? payload.error
        : fallbackMessage;
    throw new Error(message);
  }

  return payload as TResponse;
}
