import { createLocalStore } from "@/lib/local-store";
import { getCurrentClassroom } from "@/lib/ardoise-eval";

export type ProfileSettings = {
  displayName: string;
  initials: string;
  classLabel: string;
  schoolLabel: string;
};

export const PROFILE_SETTINGS_EVENT = "ardoise:profile-settings-updated";

function getDefaultProfileSettings(): ProfileSettings {
  const classroom = getCurrentClassroom();
  return {
    displayName: classroom.displayName,
    initials: classroom.initials,
    classLabel: classroom.classLabel,
    schoolLabel: classroom.schoolLabel,
  };
}

export const DEFAULT_PROFILE_SETTINGS: ProfileSettings = new Proxy({} as ProfileSettings, {
  get(_target, prop) {
    return Reflect.get(getDefaultProfileSettings(), prop);
  },
  ownKeys() {
    return Reflect.ownKeys(getDefaultProfileSettings());
  },
  getOwnPropertyDescriptor(_target, prop) {
    return {
      configurable: true,
      enumerable: true,
      writable: false,
      value: Reflect.get(getDefaultProfileSettings(), prop),
    };
  },
});

function getProfileStoreKey() {
  if (getCurrentClassroom().key === "boulard") {
    return "ardoise-profile-settings";
  }

  return "ardoise-profile-settings-romain-rolland";
}

function getProfileStore() {
  return createLocalStore<ProfileSettings>(getProfileStoreKey(), getDefaultProfileSettings);
}

function normalizeInitials(value: string): string {
  const cleaned = value.replace(/\s+/g, "").slice(0, 3);
  return cleaned ? cleaned.toUpperCase() : getDefaultProfileSettings().initials;
}

export function normalizeProfileSettings(
  value: Partial<ProfileSettings> | ProfileSettings,
): ProfileSettings {
  const defaults = getDefaultProfileSettings();
  return {
    displayName: value.displayName?.trim() || defaults.displayName,
    initials: normalizeInitials(value.initials ?? defaults.initials),
    classLabel: value.classLabel?.trim() || defaults.classLabel,
    schoolLabel: value.schoolLabel?.trim() || defaults.schoolLabel,
  };
}

export function readProfileSettings(): ProfileSettings {
  const stored = normalizeProfileSettings(getProfileStore().get());
  const defaults = getDefaultProfileSettings();

  if (
    getCurrentClassroom().key !== "boulard" &&
    stored.displayName === "M. Boulard" &&
    stored.classLabel === "CE1 · 2026-2027"
  ) {
    return defaults;
  }

  return stored;
}

export function saveProfileSettings(
  value: Partial<ProfileSettings> | ProfileSettings,
): ProfileSettings {
  const next = normalizeProfileSettings({
    ...readProfileSettings(),
    ...value,
  });
  getProfileStore().set(next);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(PROFILE_SETTINGS_EVENT, { detail: next }));
  }
  return next;
}

export function resetProfileSettings(): ProfileSettings {
  const defaults = getDefaultProfileSettings();
  getProfileStore().set(defaults);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(PROFILE_SETTINGS_EVENT, { detail: defaults }));
  }
  return defaults;
}
