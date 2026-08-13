/**
 * Vrais modules du guide de l'enseignant "Maths en CE1" (collection ACCÈS),
 * sommaire officiel (35 modules, pp. 48 à 280). guidePage = page du guide de
 * l'enseignant. Pas encore de page du fichier élève : le PDF fourni pour le
 * fichier élève correspond à une autre méthode (titres ne correspondent pas),
 * et le guide complet fourni est un livret de présentation sans détail
 * séance par séance — à ajouter dès que le vrai sommaire du fichier élève
 * ACCÈS sera disponible.
 * Distinct de MATHS_CATALOG (ardoise-eval.ts), qui garde des titres
 * paraphrasés et pas de page.
 * Fichier séparé, mêmes conventions que storage.ts / timetable-storage.ts.
 */

export type AccesModule = {
  id: string;
  moduleNum: number;
  period: 1 | 2 | 3 | 4 | 5;
  guidePage: number;
  title: string;
};

export const ACCES_MODULES: AccesModule[] = [
  // ── Période 1 ──────────────────────────────────────────────────────────
  {
    id: "acces-m1",
    moduleNum: 1,
    period: 1,
    guidePage: 48,
    title: "Écritures chiffrées des nombres jusqu'à 100",
  },
  { id: "acces-m2", moduleNum: 2, period: 1, guidePage: 56, title: "Nombres entiers jusqu'à 100" },
  {
    id: "acces-m3",
    moduleNum: 3,
    period: 1,
    guidePage: 62,
    title: "Lecture et écriture des nombres jusqu'à 100",
  },
  {
    id: "acces-m4",
    moduleNum: 4,
    period: 1,
    guidePage: 68,
    title: "Comparaison des nombres jusqu'à 100",
  },
  {
    id: "acces-m5",
    moduleNum: 5,
    period: 1,
    guidePage: 74,
    title: "Groupements par 10 et par 100",
  },
  { id: "acces-m6", moduleNum: 6, period: 1, guidePage: 82, title: "Calcul posé : addition" },
  { id: "acces-m7", moduleNum: 7, period: 1, guidePage: 88, title: "Alignement et milieu" },

  // ── Période 2 ──────────────────────────────────────────────────────────
  {
    id: "acces-m8",
    moduleNum: 8,
    period: 2,
    guidePage: 98,
    title: "Nombres entiers jusqu'à 1 000",
  },
  {
    id: "acces-m9",
    moduleNum: 9,
    period: 2,
    guidePage: 104,
    title: "Lecture et écriture des nombres jusqu'à 1 000",
  },
  {
    id: "acces-m10",
    moduleNum: 10,
    period: 2,
    guidePage: 110,
    title: "Longueurs : le mètre et le centimètre",
  },
  {
    id: "acces-m11",
    moduleNum: 11,
    period: 2,
    guidePage: 116,
    title: "Comparaison des nombres jusqu'à 1 000",
  },
  {
    id: "acces-m12",
    moduleNum: 12,
    period: 2,
    guidePage: 124,
    title: "Fractions 1 : moitié, quart et tiers",
  },
  { id: "acces-m13", moduleNum: 13, period: 2, guidePage: 132, title: "Fractions 2" },
  { id: "acces-m14", moduleNum: 14, period: 2, guidePage: 140, title: "Monnaie 1" },

  // ── Période 3 ──────────────────────────────────────────────────────────
  { id: "acces-m15", moduleNum: 15, period: 3, guidePage: 150, title: "Multiplication 1" },
  { id: "acces-m16", moduleNum: 16, period: 3, guidePage: 156, title: "Multiplication 2" },
  {
    id: "acces-m17",
    moduleNum: 17,
    period: 3,
    guidePage: 162,
    title: "Calcul posé : soustraction 1",
  },
  { id: "acces-m18", moduleNum: 18, period: 3, guidePage: 168, title: "Fractions 3" },
  { id: "acces-m19", moduleNum: 19, period: 3, guidePage: 174, title: "Monnaie 2" },
  { id: "acces-m20", moduleNum: 20, period: 3, guidePage: 180, title: "Carrés" },

  // ── Période 4 ──────────────────────────────────────────────────────────
  {
    id: "acces-m21",
    moduleNum: 21,
    period: 4,
    guidePage: 188,
    title: "Calcul posé : soustraction 2",
  },
  { id: "acces-m22", moduleNum: 22, period: 4, guidePage: 194, title: "Fractions 4" },
  { id: "acces-m23", moduleNum: 23, period: 4, guidePage: 200, title: "Rectangles" },
  { id: "acces-m24", moduleNum: 24, period: 4, guidePage: 206, title: "Demi-droite graduée" },
  { id: "acces-m25", moduleNum: 25, period: 4, guidePage: 212, title: "Lecture de l'heure" },
  { id: "acces-m26", moduleNum: 26, period: 4, guidePage: 220, title: "Durées" },
  { id: "acces-m27", moduleNum: 27, period: 4, guidePage: 226, title: "Longueurs : le kilomètre" },

  // ── Période 5 ──────────────────────────────────────────────────────────
  {
    id: "acces-m28",
    moduleNum: 28,
    period: 5,
    guidePage: 234,
    title: "Tableaux et diagrammes en barres",
  },
  {
    id: "acces-m29",
    moduleNum: 29,
    period: 5,
    guidePage: 240,
    title: "Construction de carrés et de rectangles",
  },
  { id: "acces-m30", moduleNum: 30, period: 5, guidePage: 246, title: "Triangles rectangles" },
  { id: "acces-m31", moduleNum: 31, period: 5, guidePage: 252, title: "Masses" },
  { id: "acces-m32", moduleNum: 32, period: 5, guidePage: 260, title: "Cercles et disques" },
  { id: "acces-m33", moduleNum: 33, period: 5, guidePage: 266, title: "Nombres ordinaux" },
  { id: "acces-m34", moduleNum: 34, period: 5, guidePage: 272, title: "Solides" },
  {
    id: "acces-m35",
    moduleNum: 35,
    period: 5,
    guidePage: 280,
    title: "Codage du déplacement d'un robot",
  },
];
