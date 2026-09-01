import type { ResourceMethod } from "@/lib/ardoise-data";
import { ORAL_CATALOG, ORAL_DOMAIN_LABELS, ORAL_SUBDOMAIN_LABELS } from "@/lib/ardoise-eval";
import { CLEO_SEANCES } from "@/lib/cleo-seances";
import {
  MATHS_CE1_ATELIER_PROBLEMES_P1_RESOURCE_METHOD,
  MATHS_CE1_CALCUL_MENTAL_P1_RESOURCE_METHOD,
  MATHS_CE1_FLASH_MATHS_P1_RESOURCE_METHOD,
  MATHS_CE1_RESOURCE_METHOD,
} from "@/lib/maths-ce1-resource-bridge";
import { MDI_ECRITURE_TRANSITION_RESOURCE_METHOD } from "@/lib/mdi-ecriture-transition-resource-bridge";
import { MDI_PE_RESOURCE_METHOD } from "@/lib/mdi-pe-resource-bridge";
import { ORTHOGRAPHEMIC_RESOURCE_METHOD } from "@/lib/orthographemic-resource-bridge";
import { QLM_MDI_GUIDE_RESOURCE_METHOD } from "@/lib/qlm-mdi-guide-resource-bridge";
import { WELL_DONE_CE1_RESOURCE_METHOD } from "@/lib/well-done-ce1-resource-bridge";
import { VIVRE_LA_MUSIQUE_CE1_RESOURCE_METHOD } from "@/lib/vivre-la-musique-ce1-resource-bridge";
import { EMC_CE1_RESOURCE_METHOD } from "@/lib/emc-ce1-resource-bridge";

const PERIODS = [1, 2, 3, 4, 5] as const;
const ORAL_PERIOD_LABELS: Record<(typeof PERIODS)[number], string> = {
  1: "Période 1 — Étude de la langue + articulation",
  2: "Période 2 — Articulation + expression + mise en voix",
  3: "Période 3 — Compréhension + arts + EPS",
  4: "Période 4 — EPS + EMC + Questionner le monde",
  5: "Période 5 — QLM + mathématiques",
};

const ORAL_DOMAIN_ORDER = [
  "francais:etude_langue",
  "francais:articulation",
  "francais:expression",
  "francais:mise_en_voix",
  "francais:comprehension",
  "arts",
  "eps",
  "emc",
  "questionner_monde",
  "maths",
];

function oralEntryLabel(entry: (typeof ORAL_CATALOG)[number], withPeriod = false) {
  const domain = ORAL_DOMAIN_LABELS[entry.domain];
  const subDomain = entry.subDomain ? ORAL_SUBDOMAIN_LABELS[entry.subDomain] : null;
  const prefix = subDomain ? `${domain} / ${subDomain}` : domain;
  return withPeriod
    ? `S${entry.seanceNum} — ${entry.title} · Période ${entry.period}`
    : `S${entry.seanceNum} · ${prefix} — ${entry.title}`;
}

function oralDomainKey(entry: (typeof ORAL_CATALOG)[number]) {
  return entry.subDomain ? `${entry.domain}:${entry.subDomain}` : entry.domain;
}

function oralDomainLabel(entry: (typeof ORAL_CATALOG)[number]) {
  const domain = ORAL_DOMAIN_LABELS[entry.domain];
  const subDomain = entry.subDomain ? ORAL_SUBDOMAIN_LABELS[entry.subDomain] : null;
  return subDomain ? `${domain} — ${subDomain}` : domain;
}

export const REAL_CLEO_METHOD: ResourceMethod = {
  id: "m-cleo",
  label: "Cléo CE1 — Français",
  subject: "francais",
  sequences: PERIODS.map((p) => ({
    id: `s-cleo-p${p}`,
    label: `Période ${p}`,
    sessions: CLEO_SEANCES.filter((s) => s.period === p)
      .sort((a, b) => a.fichierPage - b.fichierPage)
      .map((s) => ({
        id: s.id,
        label: `p. ${s.fichierPage} — ${s.title} · guide p. ${s.guidePage}`,
        prepSheetId: s.id,
      })),
  })).filter((sequence) => sequence.sessions.length > 0),
};

export const REAL_ORAL_METHOD: ResourceMethod = {
  id: "m-langage-oral-ce",
  label: "Langage oral CE — Progression par périodes",
  subject: "francais",
  sequences: PERIODS.map((p) => ({
    id: `s-langage-oral-ce-p${p}`,
    label: ORAL_PERIOD_LABELS[p],
    sessions: ORAL_CATALOG.filter((s) => s.period === p).map((s) => ({
      id: `langage-oral-ce-${s.id}`,
      label: oralEntryLabel(s),
      prepSheetId: `langage-oral-ce-${s.id}`,
    })),
  })).filter((sequence) => sequence.sessions.length > 0),
};

export const REAL_ORAL_BY_DOMAIN_METHOD: ResourceMethod = {
  id: "m-langage-oral-ce-domaines",
  label: "Langage oral CE — Entrées par domaines",
  subject: "francais",
  sequences: ORAL_DOMAIN_ORDER.map((groupKey) => {
    const entries = ORAL_CATALOG.filter((entry) => oralDomainKey(entry) === groupKey).sort(
      (left, right) => left.seanceNum - right.seanceNum,
    );
    const first = entries[0];
    if (!first) return null;
    return {
      id: `s-langage-oral-ce-${groupKey.replace(":", "-")}`,
      label: oralDomainLabel(first),
      sessions: entries.map((entry) => ({
        id: `langage-oral-ce-domaines-${entry.id}`,
        label: oralEntryLabel(entry, true),
        prepSheetId: `langage-oral-ce-${entry.id}`,
      })),
    };
  }).filter((sequence): sequence is ResourceMethod["sequences"][number] => Boolean(sequence)),
};

/**
 * Sources affichées dans Ressources et dans le sélecteur des séances.
 * Ne pas réintroduire RESOURCE_TREE ici : il contient les anciennes données
 * de démonstration conservées pour compatibilité avec le reste de l'application.
 */
export const PATCHED_RESOURCE_TREE: ResourceMethod[] = [
  REAL_CLEO_METHOD,
  MATHS_CE1_RESOURCE_METHOD,
  MATHS_CE1_ATELIER_PROBLEMES_P1_RESOURCE_METHOD,
  MATHS_CE1_CALCUL_MENTAL_P1_RESOURCE_METHOD,
  MATHS_CE1_FLASH_MATHS_P1_RESOURCE_METHOD,
  REAL_ORAL_METHOD,
  REAL_ORAL_BY_DOMAIN_METHOD,
  ORTHOGRAPHEMIC_RESOURCE_METHOD,
  MDI_PE_RESOURCE_METHOD,
  MDI_ECRITURE_TRANSITION_RESOURCE_METHOD,
  QLM_MDI_GUIDE_RESOURCE_METHOD,
  WELL_DONE_CE1_RESOURCE_METHOD,
  VIVRE_LA_MUSIQUE_CE1_RESOURCE_METHOD,
  EMC_CE1_RESOURCE_METHOD,
];
