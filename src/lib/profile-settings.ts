import { createLocalStore } from "@/lib/local-store";

export type ProfileSettings = {
  displayName: string;
  initials: string;
  classLabel: string;
  schoolLabel: string;
};

export const PROFILE_SETTINGS_EVENT = "ardoise:profile-settings-updated";

export const DEFAULT_PROFILE_SETTINGS: ProfileSettings = {
  displayName: "M. Boulard",
  initials: "MB",
  classLabel: "CE1 · 2026-2027",
  schoolLabel: "11 élèves · École Romain Rolland",
};

const profileStore = createLocalStore<ProfileSettings>(
  "ardoise-profile-settings",
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
  return normalizeProfileSettings(profileStore.get());
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
