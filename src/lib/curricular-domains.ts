import type { PrepSheet, SubjectKey } from "@/lib/ardoise-data";

export type SocleDomain = {
  id: "D1" | "D2" | "D3" | "D4" | "D5";
  label: string;
  detail?: string;
};

export const OFFICIAL_SOCLE_DOMAINS: SocleDomain[] = [
  {
    id: "D1",
    label: "Les langages pour penser et communiquer",
    detail: "Langue française, langues vivantes, langages mathématiques, scientifiques, artistiques et corporels.",
  },
  {
    id: "D2",
    label: "Les méthodes et outils pour apprendre",
    detail: "Organisation du travail, coopération, outils, recherche et traitement de l'information.",
  },
  {
    id: "D3",
    label: "La formation de la personne et du citoyen",
    detail: "Expression de la sensibilité, règle, responsabilité, coopération et jugement.",
  },
  {
    id: "D4",
    label: "Les systèmes naturels et les systèmes techniques",
    detail: "Démarche scientifique, observation, résolution de problèmes et monde technique.",
  },
  {
    id: "D5",
    label: "Les représentations du monde et l'activité humaine",
    detail: "Repères dans l'espace et le temps, culture, productions humaines et compréhension du monde.",
  },
];

const SOCLE_BY_ID = new Map(OFFICIAL_SOCLE_DOMAINS.map((domain) => [domain.id, domain]));

type SubjectCurricularDefaults = {
  socle: SocleDomain["id"][];
  disciplinary: string[];
};

export const SUBJECT_CURRICULAR_DEFAULTS: Record<SubjectKey, SubjectCurricularDefaults> = {
  francais: {
    socle: ["D1", "D2"],
    disciplinary: [
      "Langage oral",
      "Lecture et compréhension de l'écrit",
      "Écriture",
      "Étude de la langue : grammaire, orthographe, lexique",
    ],
  },
  maths: {
    socle: ["D1", "D2", "D4"],
    disciplinary: [
      "Nombres, calcul et résolution de problèmes",
      "Grandeurs et mesures",
      "Espace et géométrie",
    ],
  },
  qlm: {
    socle: ["D4", "D5", "D2"],
    disciplinary: [
      "Questionner le monde du vivant, de la matière et des objets",
      "Questionner l'espace et le temps",
      "Explorer les organisations du monde",
    ],
  },
  emc: {
    socle: ["D3", "D2", "D1"],
    disciplinary: [
      "Respecter autrui",
      "Acquérir et partager les valeurs de la République",
      "Construire une culture civique",
    ],
  },
  eps: {
    socle: ["D1", "D2", "D3", "D4", "D5"],
    disciplinary: [
      "Produire une performance optimale, mesurable à une échéance donnée",
      "Adapter ses déplacements à des environnements variés",
      "S'exprimer devant les autres par une prestation artistique ou acrobatique",
      "Conduire et maîtriser un affrontement collectif ou interindividuel",
    ],
  },
  arts: {
    socle: ["D1", "D2", "D3", "D5"],
    disciplinary: ["Arts plastiques", "Éducation musicale", "Histoire des arts"],
  },
  lve: {
    socle: ["D1", "D2", "D3", "D5"],
    disciplinary: [
      "Comprendre l'oral",
      "S'exprimer oralement en continu",
      "Prendre part à une conversation",
      "Découvrir quelques aspects culturels d'une langue vivante",
    ],
  },
  rituels: {
    socle: ["D1", "D2", "D3"],
    disciplinary: ["Rituels de classe", "Organisation des apprentissages", "Langage oral"],
  },
  pause: {
    socle: ["D3"],
    disciplinary: ["Vie collective", "Autonomie", "Respect des règles communes"],
  },
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function compactList(items: string[], max = 4) {
  return [...new Set(items.filter(Boolean))].slice(0, max);
}

function inferFrenchDomains(sheet: PrepSheet): string[] {
  const source = normalize(`${sheet.title} ${sheet.objective} ${sheet.competence}`);
  const domains: string[] = [];

  if (/oral|dire|parler|ecouter|langage/.test(source)) domains.push("Langage oral");
  if (/lecture|lire|comprehension|texte|fluence/.test(source)) {
    domains.push("Lecture et compréhension de l'écrit");
  }
  if (/ecriture|copie|copier|rediger|production d'ecrit|poesie|dictée|dictee/.test(source)) {
    domains.push("Écriture");
  }
  if (/orthographe|grammaire|lexique|conjugaison|mot|phrase|graph[eè]me|dictee/.test(source)) {
    domains.push("Étude de la langue : grammaire, orthographe, lexique");
  }

  return compactList(domains.length ? domains : SUBJECT_CURRICULAR_DEFAULTS.francais.disciplinary);
}

function inferMathsDomains(sheet: PrepSheet): string[] {
  const source = normalize(`${sheet.title} ${sheet.objective} ${sheet.competence}`);
  const domains: string[] = [];

  if (/nombre|calcul|addition|soustraction|probleme|num[eé]ration/.test(source)) {
    domains.push("Nombres, calcul et résolution de problèmes");
  }
  if (/grandeur|mesure|heure|longueur|masse|monnaie|duree|calendrier/.test(source)) {
    domains.push("Grandeurs et mesures");
  }
  if (/espace|geometrie|figure|solide|angle|droite|quadrillage/.test(source)) {
    domains.push("Espace et géométrie");
  }

  return compactList(domains.length ? domains : SUBJECT_CURRICULAR_DEFAULTS.maths.disciplinary);
}

function inferDisciplinaryDomains(sheet: PrepSheet): string[] {
  if (sheet.disciplinaryDomains?.length) return sheet.disciplinaryDomains;
  if (sheet.subject === "francais") return inferFrenchDomains(sheet);
  if (sheet.subject === "maths") return inferMathsDomains(sheet);
  return SUBJECT_CURRICULAR_DEFAULTS[sheet.subject].disciplinary;
}

function inferSocleDomains(sheet: PrepSheet): string[] {
  if (sheet.socleDomains?.length) return sheet.socleDomains;

  return SUBJECT_CURRICULAR_DEFAULTS[sheet.subject].socle
    .map((id) => {
      const domain = SOCLE_BY_ID.get(id);
      return domain ? `${domain.id} · ${domain.label}` : "";
    })
    .filter(Boolean);
}

export function getPrepSheetCurricularLinks(sheet: PrepSheet) {
  return {
    socleDomains: compactList(inferSocleDomains(sheet), 5),
    disciplinaryDomains: compactList(inferDisciplinaryDomains(sheet), 5),
  };
}
