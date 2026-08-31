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
  "durand-1": { birthDate: "2019-09-22" },
  "durand-2": { birthDate: "2019-06-06" },
  "durand-3": { birthDate: "2019-04-22" },
  "durand-4": { birthDate: "2019-06-03" },
  "durand-5": { birthDate: "2019-09-24" },
  "durand-6": { birthDate: "2019-10-03" },
  "durand-7": { birthDate: "2019-12-10" },
  "durand-8": { birthDate: "2019-10-15" },
  "durand-9": { birthDate: "2019-07-16" },
  "durand-10": { birthDate: "2019-10-01" },
  "grimal-1": { birthDate: "2019-07-15" },
  "grimal-2": { birthDate: "2019-09-11" },
  "grimal-3": { birthDate: "2019-11-12" },
  "grimal-4": { birthDate: "2019-12-24" },
  "grimal-5": { birthDate: "2019-07-30" },
  "grimal-6": { birthDate: "2019-04-06" },
  "grimal-7": { birthDate: "2019-11-23" },
  "grimal-8": { birthDate: "2018-09-09" },
  "grimal-9": { birthDate: "2018-08-16" },
  "grimal-10": { birthDate: "2019-02-16" },
  "grimal-11": { birthDate: "2019-04-09" },
  "menager-1": { birthDate: "2019-12-15" },
  "menager-2": { birthDate: "2019-06-04" },
  "menager-3": { birthDate: "2019-01-17" },
  "menager-4": { birthDate: "2019-12-16" },
  "menager-5": { birthDate: "2018-07-23" },
  "menager-6": { birthDate: "2019-11-01" },
  "menager-7": { birthDate: "2019-07-13" },
  "menager-8": { birthDate: "2019-10-26" },
  "menager-9": { birthDate: "2019-09-16" },
  "menager-10": { birthDate: "2019-08-29" },
  "menager-11": { birthDate: "2018-03-31" },
  "thomas-1": { birthDate: "2019-09-22" },
  "thomas-2": { birthDate: "2019-10-20" },
  "thomas-3": { birthDate: "2019-12-02" },
  "thomas-4": { birthDate: "2019-09-01" },
  "thomas-5": { birthDate: "2019-05-23" },
  "thomas-6": { birthDate: "2018-06-19" },
  "thomas-7": { birthDate: "2019-03-10" },
  "thomas-8": { birthDate: "2019-09-10" },
  "thomas-9": { birthDate: "2019-02-05" },
  "thomas-10": { birthDate: "2019-01-01" },
  "henry-1": { birthDate: "2019-11-05" },
  "henry-2": { birthDate: "2019-07-31" },
  "henry-3": { birthDate: "2019-12-18" },
  "henry-4": { birthDate: "2019-08-13" },
  "henry-5": { birthDate: "2019-11-12" },
  "henry-6": { birthDate: "2019-11-22" },
  "henry-7": { birthDate: "2019-04-22" },
  "henry-8": { birthDate: "2019-11-01" },
  "henry-9": { birthDate: "2019-11-18" },
  "henry-10": { birthDate: "2019-08-20" },
  "henry-11": { birthDate: "2019-07-05" },
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
