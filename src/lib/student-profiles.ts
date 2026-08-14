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

const DEFAULT_STUDENT_PROFILES: Record<string, StudentProfile> = {
  "el-1": { birthDate: "2019-03-06" },
  "el-2": { birthDate: "2019-03-22" },
  "el-3": { birthDate: "2019-06-30" },
  "el-4": { birthDate: "2019-07-11" },
  "el-5": { birthDate: "2018-09-26" },
  "el-6": { birthDate: "2019-07-22" },
  "el-7": { birthDate: "2019-08-05" },
  "el-8": { birthDate: "2019-01-23" },
  "el-9": { birthDate: "2019-01-04" },
  "el-10": { birthDate: "2019-11-09" },
  "el-11": { birthDate: "2019-12-08" },
};

const studentProfilesStore = createLocalStore<Record<string, StudentProfile>>(
  "ardoise.studentProfiles.v1",
  {},
);

export function getStudentProfiles(): Record<string, StudentProfile> {
  return studentProfilesStore.get();
}

export function getStudentProfile(studentId: string): StudentProfile {
  return {
    ...(DEFAULT_STUDENT_PROFILES[studentId] ?? {}),
    ...(getStudentProfiles()[studentId] ?? {}),
  };
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
