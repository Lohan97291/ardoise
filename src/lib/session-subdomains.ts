import type { PrepSheet, Session, SubjectKey } from "@/lib/ardoise-data";

export type SessionPedagogicalLabels = {
  domain: string;
  subDomain: string;
};

const SUBJECT_DEFAULT_DOMAIN: Record<SubjectKey, string> = {
  francais: "Français",
  maths: "Mathématiques",
  qlm: "Questionner le monde",
  emc: "EMC",
  eps: "EPS",
  arts: "Arts",
  lve: "Langues vivantes",
  rituels: "Rituels",
  pause: "Vie de classe",
};

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function firstNonEmpty(...values: Array<string | undefined>): string {
  return values.map((value) => value?.trim()).find(Boolean) ?? "";
}

function inferMathsSubDomain(source: string): string {
  if (/calcul mental|furet|compter de tete|de tete|automat/.test(source)) {
    return "Calcul mental";
  }
  if (/probleme|schema|modeliser|resolution/.test(source)) return "Résolution de problèmes";
  if (/addition|soustraction|multiplication|division|calcul pose|operation/.test(source)) {
    return "Calcul";
  }
  if (/nombre|numeration|dizaine|unite|centaine|comparer|ranger|encadrer|99/.test(source)) {
    return "Nombres et numération";
  }
  if (/grandeur|mesure|heure|duree|longueur|masse|monnaie|calendrier/.test(source)) {
    return "Grandeurs et mesures";
  }
  if (/geometrie|espace|figure|solide|quadrillage|droite|angle/.test(source)) {
    return "Espace et géométrie";
  }
  if (/donnees|tableau|graphique/.test(source)) return "Organisation et gestion de données";
  return "Notion mathématique";
}

function inferFrenchSubDomain(source: string): string {
  if (/orthographemic|orthographe|dictee|dictée|graph[eè]me|phon[eè]me|son /.test(source)) {
    return "Orthographe / dictée";
  }
  if (/lecture|lire|comprehension|texte|album|fluence/.test(source)) {
    return "Lecture-compréhension";
  }
  if (/production d'ecrit|production d’ecrit|rediger|ecriture longue/.test(source)) {
    return "Production d'écrit";
  }
  if (/ecriture|copie|copier|cahier de dictee|cahier/.test(source)) return "Écriture / copie";
  if (/oral|parler|ecouter|dire|debattre|presenter/.test(source)) return "Langage oral";
  if (/grammaire|conjugaison|lexique|phrase|nom|verbe|adjectif/.test(source)) {
    return "Étude de la langue";
  }
  if (/poesie|poeme|poème/.test(source)) return "Poésie";
  return "Activité de français";
}

function inferOtherSubDomain(subject: SubjectKey, source: string): string {
  if (subject === "emc") {
    if (/harcelement|harcèlement/.test(source)) return "Respecter autrui";
    if (/regle|règle|citoyen|conseil|responsabilite/.test(source)) return "Culture civique";
    return "Vivre ensemble";
  }
  if (subject === "qlm") {
    if (/temps|calendrier|jour|semaine|mois|annee/.test(source)) return "Temps";
    if (/espace|plan|paysage|quartier|monde/.test(source)) return "Espace";
    if (/vivant|matiere|objet|animal|vegetal/.test(source)) return "Vivant, matière, objets";
    return "Questionner le monde";
  }
  if (subject === "lve") return "Oral et culture";
  if (subject === "arts") return "Pratique artistique";
  if (subject === "eps") return "Activité motrice";
  if (subject === "rituels") return "Rituel de classe";
  if (subject === "pause") return "Pause";
  return SUBJECT_DEFAULT_DOMAIN[subject];
}

export function getSessionPedagogicalLabels(
  session: Session,
  sheet?: PrepSheet,
): SessionPedagogicalLabels {
  const domain = firstNonEmpty(
    session.pedagogicalDomain,
    sheet?.disciplinaryDomains?.[0],
    SUBJECT_DEFAULT_DOMAIN[session.subject],
  );

  const explicitSubDomain = firstNonEmpty(session.pedagogicalSubDomain);
  if (explicitSubDomain) return { domain, subDomain: explicitSubDomain };

  const source = normalize(
    [
      session.title,
      session.note,
      sheet?.title,
      sheet?.objective,
      sheet?.competence,
      ...(sheet?.disciplinaryDomains ?? []),
    ].join(" "),
  );

  const subDomain =
    session.subject === "maths"
      ? inferMathsSubDomain(source)
      : session.subject === "francais"
        ? inferFrenchSubDomain(source)
        : inferOtherSubDomain(session.subject, source);

  return { domain, subDomain };
}
