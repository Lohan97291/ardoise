import { createLocalStore } from "@/lib/local-store";

const SEEN_MAIL_IDS_KEY = "ardoise.navAlerts.seenMailIds.v1";
const SEEN_AGENDA_KEYS_KEY = "ardoise.navAlerts.seenAgendaKeys.v1";
const seenMailIdsStore = createLocalStore<string[]>(SEEN_MAIL_IDS_KEY, []);
const seenAgendaKeysStore = createLocalStore<string[]>(SEEN_AGENDA_KEYS_KEY, []);

export function getSeenMailIds(): string[] {
  return seenMailIdsStore.get();
}

export function markMailIdsSeen(ids: string[]): void {
  const current = new Set(seenMailIdsStore.get());
  for (const id of ids) current.add(id);
  seenMailIdsStore.set([...current]);
}

export function countUnseenMailIds(ids: string[]): number {
  const seen = new Set(seenMailIdsStore.get());
  return ids.filter((id) => !seen.has(id)).length;
}

export function getSeenAgendaKeys(): string[] {
  return seenAgendaKeysStore.get();
}

export function markAgendaKeysSeen(keys: string[]): void {
  const current = new Set(seenAgendaKeysStore.get());
  for (const key of keys) current.add(key);
  seenAgendaKeysStore.set([...current]);
}

export function countUnseenAgendaKeys(keys: string[]): number {
  const seen = new Set(seenAgendaKeysStore.get());
  return keys.filter((key) => !seen.has(key)).length;
}
