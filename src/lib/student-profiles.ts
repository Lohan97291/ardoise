import { createLocalStore } from "@/lib/local-store";

export type SubjectOverviewKey =
  | "francais"
  | "maths"
  | "qlm"
  | "emc"
  | "arts"
  | "eps"
  | "lve";

export type SubjectSnapshot = {
  score?: number;
  note?: string;
};

export type StudentProfile = {
  birthDate?: string;
  notes?: string;
  subjectSnapshots?: Partial<Record<SubjectOverviewKey, SubjectSnapshot>>;
};

const studentProfilesStore = createLocalStore<Record<string, StudentProfile>>(
  "ardoise.studentProfiles.v1",
  {},
);

export function getStudentProfiles(): Record<string, StudentProfile> {
  return studentProfilesStore.get();
}

export function getStudentProfile(studentId: string): StudentProfile {
  return getStudentProfiles()[studentId] ?? {};
}

export function saveStudentProfile(studentId: string, patch: StudentProfile): StudentProfile {
  const next = studentProfilesStore.update((current) => ({
    ...current,
    [studentId]: {
      ...(current[studentId] ?? {}),
      ...patch,
    },
  }));

  return next[studentId] ?? {};
}
