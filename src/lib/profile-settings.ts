import { createLocalStore } from "@/lib/local-store";
import { CURRENT_CLASSROOM } from "@/lib/ardoise-eval";

export type ProfileSettings = {
  displayName: string;
  initials: string;
  classLabel: string;
  schoolLabel: string;
};

export const PROFILE_SETTINGS_EVENT = "ardoise:profile-settings-updated";

export const DEFAULT_PROFILE_SETTINGS: ProfileSettings = {
  displayName: CURRENT_CLASSROOM.displayName,
  initials: CURRENT_CLASSROOM.initials,
  classLabel: CURRENT_CLASSROOM.classLabel,
  schoolLabel: CURRENT_CLASSROOM.schoolLabel,
};

function getProfileStoreKey() {
  if (CURRENT_CLASSROOM.key === "boulard") {
    return "ardoise-profile-settings";
  }

  return "ardoise-profile-settings-romain-rolland";
}

const profileStore = createLocalStore<ProfileSettings>(
  getProfileStoreKey(),
  DEFAULT_PROFILE_SETTINGS,
);

function normalizeInitials(value: string): string {
  const cleaned = value.replace(/\s+/g, "").slice(0, 3);
  return cleaned ? cleaned.toUpperCase() : DEFAULT_PROFILE_SETTINGS.initials;
}

export function normalizeProfileSettings(
  value: Partial<ProfileSettings> | ProfileSettings,
): ProfileSettings {
  return {
    displayName: value.displayName?.trim() || DEFAULT_PROFILE_SETTINGS.displayName,
    initials: normalizeInitials(value.initials ?? DEFAULT_PROFILE_SETTINGS.initials),
    classLabel: value.classLabel?.trim() || DEFAULT_PROFILE_SETTINGS.classLabel,
    schoolLabel: value.schoolLabel?.trim() || DEFAULT_PROFILE_SETTINGS.schoolLabel,
  };
}

export function readProfileSettings(): ProfileSettings {
  const stored = normalizeProfileSettings(profileStore.get());

  if (CURRENT_CLASSROOM.key !== "boulard" && stored.displayName === "M. Boulard") {
    return DEFAULT_PROFILE_SETTINGS;
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
  profileStore.set(next);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(PROFILE_SETTINGS_EVENT, { detail: next }));
  }
  return next;
}

export function resetProfileSettings(): ProfileSettings {
  profileStore.set(DEFAULT_PROFILE_SETTINGS);
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(PROFILE_SETTINGS_EVENT, { detail: DEFAULT_PROFILE_SETTINGS }),
    );
  }
  return DEFAULT_PROFILE_SETTINGS;
}
