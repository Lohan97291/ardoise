import type { SubjectKey } from "@/lib/ardoise-data";

/** Classes statiques (pas de concaténation) pour que Tailwind les conserve. */
export const SUBJECT_BAND: Record<SubjectKey, string> = {
  francais: "bg-subject-francais text-subject-francais-foreground",
  maths: "bg-subject-maths text-subject-maths-foreground",
  qlm: "bg-subject-qlm text-subject-qlm-foreground",
  emc: "bg-subject-emc text-subject-emc-foreground",
  eps: "bg-subject-eps text-subject-eps-foreground",
  arts: "bg-subject-arts text-subject-arts-foreground",
  lve: "bg-subject-lve text-subject-lve-foreground",
  rituels: "bg-subject-rituels text-subject-rituels-foreground",
  pause: "bg-subject-pause text-subject-pause-foreground",
};

export const SUBJECT_DOT: Record<SubjectKey, string> = {
  francais: "bg-subject-francais-foreground",
  maths: "bg-subject-maths-foreground",
  qlm: "bg-subject-qlm-foreground",
  emc: "bg-subject-emc-foreground",
  eps: "bg-subject-eps-foreground",
  arts: "bg-subject-arts-foreground",
  lve: "bg-subject-lve-foreground",
  rituels: "bg-subject-rituels-foreground",
  pause: "bg-subject-pause-foreground",
};

/** Bande colorée gauche (4 px) sur les cartes de séance. */
export const SUBJECT_STRIP: Record<SubjectKey, string> = {
  francais: "bg-subject-francais",
  maths: "bg-subject-maths",
  qlm: "bg-subject-qlm",
  emc: "bg-subject-emc",
  eps: "bg-subject-eps",
  arts: "bg-subject-arts",
  lve: "bg-subject-lve",
  rituels: "bg-subject-rituels",
  pause: "bg-subject-pause",
};

/** Libellés courts utilisés dans les listes denses (sélecteur de ressources). */
export const SUBJECT_SHORT_LABEL: Record<SubjectKey, string> = {
  francais: "Français",
  maths: "Mathématiques",
  qlm: "Questionner le monde",
  emc: "EMC",
  eps: "EPS",
  arts: "Arts",
  lve: "Anglais",
  rituels: "Rituels",
  pause: "Pause",
};

/** Petite icône emoji pour repérer la matière d'un coup d'œil. */
export const SUBJECT_EMOJI: Record<SubjectKey, string> = {
  francais: "📚",
  maths: "🔢",
  qlm: "🌍",
  emc: "🤝",
  eps: "🤸",
  arts: "🎨",
  lve: "🇬🇧",
  rituels: "⏰",
  pause: "☕",
};
