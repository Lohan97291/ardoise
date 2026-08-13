import { createLocalStore } from "@/lib/local-store";

/**
 * Suivi côté client des mails marqués comme traités (survole les analyses
 * reçues de n8n, stockées côté serveur — ce statut est purement local à
 * l'enseignant et n'a pas besoin de repasser par le serveur).
 * Fichier séparé, mêmes conventions que storage.ts.
 */
const HANDLED_KEY = "ardoise.mailHandled.v1";
const handledMailStore = createLocalStore<string[]>(HANDLED_KEY, []);

export function getHandledMailIds(): string[] {
  return handledMailStore.get();
}

export function isMailHandled(externalId: string): boolean {
  return handledMailStore.get().includes(externalId);
}

export function toggleMailHandled(externalId: string): string[] {
  const current = handledMailStore.get();
  const next = current.includes(externalId)
    ? current.filter((id) => id !== externalId)
    : [...current, externalId];
  return handledMailStore.set(next);
}
