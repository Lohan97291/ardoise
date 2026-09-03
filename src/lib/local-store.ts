type StoreFallback<T> = T | (() => T);

function resolveFallback<T>(fallback: StoreFallback<T>): T {
  return typeof fallback === "function" ? (fallback as () => T)() : fallback;
}

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getStoredText(key: string): string | null {
  if (!canUseStorage()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function readStoredJson<T>(key: string, fallback: StoreFallback<T>): T {
  const fallbackValue = resolveFallback(fallback);
  const raw = getStoredText(key);
  if (!raw) return fallbackValue;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallbackValue;
  }
}

/** Clé de méta de la synchro cloud : ne doit jamais déclencher de synchro (boucle). */
const CLOUD_SYNC_META_KEY = "ardoise.cloudSync.v1";
const SYNCABLE_KEY_PATTERN = /^ardoise([.-]|$)/i;

/** Signale qu'une donnée synchronisable a changé localement (pour la sauvegarde auto). */
function notifyLocalWrite(key: string): void {
  if (typeof window === "undefined") return;
  if (key === CLOUD_SYNC_META_KEY) return;
  if (!SYNCABLE_KEY_PATTERN.test(key)) return;
  try {
    window.dispatchEvent(new CustomEvent("ardoise-local-write", { detail: { key } }));
  } catch {
    /* noop */
  }
}

export function writeStoredJson<T>(key: string, value: T): T {
  if (!canUseStorage()) return value;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    notifyLocalWrite(key);
  } catch {
    /* noop */
  }
  return value;
}

export function removeStoredValue(key: string): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.removeItem(key);
    notifyLocalWrite(key);
  } catch {
    /* noop */
  }
}

export function createLocalStore<T>(key: string, fallback: StoreFallback<T>) {
  return {
    key,
    get(): T {
      return readStoredJson(key, fallback);
    },
    set(value: T): T {
      return writeStoredJson(key, value);
    },
    update(updater: (current: T) => T): T {
      const next = updater(readStoredJson(key, fallback));
      return writeStoredJson(key, next);
    },
    clear(): void {
      removeStoredValue(key);
    },
  };
}
