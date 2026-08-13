/**
 * Agrégation des résultats d'un élève par domaine d'apprentissage
 * (Compréhension, Vocabulaire, Grammaire, Orthographe, Nombres, Calcul…).
 * Sert au diagramme de Kiviat de la fiche élève : uniquement de la lecture des
 * données existantes (catalogues Cléo/ACCÈS + résultats de correction).
 */

import {
  CLEO_CATALOG,
  DOMAIN_LABELS,
  FRENCH_DOMAINS,
  MATHS_CATALOG,
  type CatalogEntry,
  type StatusKey,
} from "@/lib/ardoise-eval";

export type DomainKey = CatalogEntry["domain"];

export type DomainDetailItem = {
  id: string;
  title: string;
  period: number;
  status: StatusKey;
};

export type DomainScore = {
  key: DomainKey;
  label: string;
  short: string;
  subject: "francais" | "maths";
  /** score de maîtrise 0→100 (A = 1, PA = 0,5, NA/NF = 0, AB ignoré) */
  score: number;
  evaluated: number;
  acquired: number;
  partial: number;
  failed: number;
  items: DomainDetailItem[];
};

const DOMAIN_ORDER: DomainKey[] = ["C", "V", "G", "O", "nb", "calc", "gm", "geo", "don"];

const DOMAIN_SHORT: Record<DomainKey, string> = {
  C: "Compr.",
  V: "Vocab.",
  G: "Gram.",
  O: "Orth.",
  nb: "Nombres",
  calc: "Calcul",
  gm: "Mesures",
  geo: "Géom.",
  don: "Données",
};

const CATALOG_BY_ID = new Map<string, CatalogEntry>(
  [...CLEO_CATALOG, ...MATHS_CATALOG].map((entry) => [entry.id, entry]),
);

function statusWeight(status: StatusKey): number | null {
  if (status === "A") return 1;
  if (status === "PA") return 0.5;
  if (status === "NA" || status === "NF") return 0;
  return null; // AB : non comptabilisé
}

/**
 * @param results résultats de l'élève : exerciseId → statut
 */
export function domainScores(results: Record<string, StatusKey>): DomainScore[] {
  const base = new Map<DomainKey, DomainScore>(
    DOMAIN_ORDER.map((key) => [
      key,
      {
        key,
        label: DOMAIN_LABELS[key] ?? key,
        short: DOMAIN_SHORT[key],
        subject: FRENCH_DOMAINS.has(key) ? "francais" : "maths",
        score: 0,
        evaluated: 0,
        acquired: 0,
        partial: 0,
        failed: 0,
        items: [],
      },
    ]),
  );

  const weightSum = new Map<DomainKey, number>();

  for (const [exerciseId, status] of Object.entries(results)) {
    const entry = CATALOG_BY_ID.get(exerciseId);
    if (!entry) continue;
    const domain = base.get(entry.domain);
    if (!domain) continue;

    domain.items.push({ id: entry.id, title: entry.title, period: entry.period, status });

    const weight = statusWeight(status);
    if (weight === null) continue;
    domain.evaluated += 1;
    weightSum.set(entry.domain, (weightSum.get(entry.domain) ?? 0) + weight);
    if (status === "A") domain.acquired += 1;
    else if (status === "PA") domain.partial += 1;
    else domain.failed += 1;
  }

  for (const domain of base.values()) {
    const sum = weightSum.get(domain.key) ?? 0;
    domain.score = domain.evaluated > 0 ? Math.round((sum / domain.evaluated) * 100) : 0;
    domain.items.sort((a, b) => a.period - b.period || a.title.localeCompare(b.title, "fr"));
  }

  return DOMAIN_ORDER.map((key) => base.get(key)!);
}
