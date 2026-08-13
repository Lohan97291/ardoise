export const ARDOISE_AI_NAME = "Plume d'Ardoise";

export function ardoiseAiTitle(context?: string): string {
  return context ? `${ARDOISE_AI_NAME} · ${context}` : ARDOISE_AI_NAME;
}

export function ardoiseAiShortIntro(): string {
  return `${ARDOISE_AI_NAME}, le compagnon pédagogique d'Ardoise.`;
}
