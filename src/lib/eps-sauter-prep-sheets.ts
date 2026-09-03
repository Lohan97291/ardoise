/**
 * Fiches de préparation — EPS · Sauter (cycle 2)
 *
 * Source : ACCÈS « Vivre l'EPS 6 à 8 ans » — Domaine de la performance mesurée, saut.
 * 3 sous-parties : sauter loin, sauter haut, sauter vers les multibonds.
 */
import type { PrepSheet } from "@/lib/ardoise-data";

const SOCLE_EPS = [
  "D1 · Les langages pour penser et communiquer",
  "D2 · Les méthodes et outils pour apprendre",
  "D4 · Les systèmes naturels et les systèmes techniques",
];
const COMPETENCE = "Réaliser une performance mesurée (sauter loin, sauter haut, multibonds).";
const DISCIPLINARY = ["Athlétisme — saut (domaine de la performance mesurée)"];
const IMG = (name: string) => `/cahier/eps/${name}`;

export const EPS_SAUTER_PREP_SHEETS: PrepSheet[] = [
  {
    id: "eps-saut-loin",
    title: "Sauter loin",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Sauter le plus loin possible après une course d'élan : maîtriser l'élan, l'impulsion, la suspension et la réception.",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "8 min",
        detail: "Course et bondissements variés, échauffement des chevilles et des appuis.",
      },
      {
        title: "Améliorer sa course d'élan",
        duration: "12 min",
        detail:
          "Saute sans courir, puis cours avant de sauter : ne pars pas de trop loin, cours pour aller de plus en plus vite, pose le bon pied au bon endroit. Ne t'arrête pas et ne piétine pas avant de sauter. Regarde plus loin que le tapis (un objet accroché, une ligne au mur).",
        differentiation: "Matérialiser une zone d'appel ; chercher sa marque de départ.",
      },
      {
        title: "Améliorer son impulsion",
        duration: "10 min",
        detail:
          "Sans courir, franchis la rivière la plus large ; fais de même en courant avant de sauter. Choisis le dispositif pour sauter le plus loin possible (sol amortissant, normal, avec amplificateur d'impulsion). Pousser fortement sur la jambe d'appel orientée à ~45°.",
      },
      {
        title: "Suspension et réception",
        duration: "10 min",
        detail:
          "Pendant la suspension : touche les objets placés le plus haut possible, monte les bras et regroupe les genoux (se grandir). Réception : arrive sur les deux pieds, aide-toi des bras pour retomber vers l'avant (équilibrer sa réception).",
      },
      {
        title: "Évaluation",
        duration: "5 min",
        detail: "Note les résultats dans un tableau, prévois ta performance, essaie de stabiliser tes performances.",
      },
    ],
    material: [
      "Tapis, fosse de sable",
      "Lattes, cônes",
      "Tremplin, demi-cylindre de mousse, objets suspendus",
      "Outils de mesure",
    ],
    photocopies: ["Tableau de résultats individuel"],
    notes: [
      "Comportements recherchés : course d'élan courte et accélérée finissant par la pose du pied d'appel dans la zone optimale ; connaître son pied d'appel ; regarder horizontalement (au-delà du tapis) ; pousser fortement à 45° ; se grandir ; réception équilibrée sur deux pieds, bras en avant.",
    ],
    illustrations: [{ src: IMG("saut-loin.jpg"), caption: "Sauter loin — dispositifs (élan, impulsion, réception)" }],
  },

  {
    id: "eps-saut-haut",
    title: "Sauter haut",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Sauter le plus haut possible : élan adapté, impulsion verticale, franchissement et réception maîtrisée.",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "8 min",
        detail: "Bondissements, sauts sur place et petits franchissements d'échauffement.",
      },
      {
        title: "Améliorer sa course d'élan",
        duration: "12 min",
        detail:
          "Saute sans courir, puis cours avant de sauter : ne pars pas de trop loin, cours de plus en plus vite, pose le bon pied au bon endroit. Ne t'arrête pas et ne piétine pas avant de sauter. Regarde au-dessus de la barre (un objet suspendu par exemple).",
        differentiation: "Chercher sa marque de départ ; connaître son pied d'appel.",
      },
      {
        title: "Améliorer son impulsion",
        duration: "10 min",
        detail:
          "Sans courir, saute sur la plus haute mousse ; fais de même en courant avant de sauter. Choisis le dispositif pour sauter le plus haut possible (sol amortissant, normal, avec amplificateur d'impulsion). Pousser fortement et verticalement sur la jambe d'appel.",
      },
      {
        title: "Suspension et réception",
        duration: "10 min",
        detail:
          "Pendant la suspension : touche les objets placés le plus haut possible, monte le genou libre et le bras correspondant (se grandir). Réception : à deux pieds, sur le pied opposé à celui d'appel, ou autrement (fesses, dos) — uniquement si le dispositif de réception est de bonne qualité (mousses/tapis indispensables).",
      },
      {
        title: "Évaluation",
        duration: "5 min",
        detail:
          "Note les résultats, prévois et essaie de stabiliser tes performances. Performances attendues comprises entre 30 et 70 cm.",
      },
    ],
    material: [
      "Mousses, tapis (indispensables pour cette activité)",
      "Lattes, cônes, objets suspendus",
      "Poteaux, barre ou élastique de saut",
      "Outils de mesure",
    ],
    photocopies: ["Tableau de résultats individuel"],
    notes: [
      "Comportements recherchés : élan court et accéléré, pose du pied d'appel dans la zone optimale ; connaître son pied d'appel ; regarder au-dessus de la barre ; pousser fortement et verticalement ; se grandir ; « oublier » la réception pour se concentrer sur le reste (si dispositif de réception de bonne qualité).",
    ],
    illustrations: [{ src: IMG("saut-haut.jpg"), caption: "Sauter haut — dispositifs (impulsion verticale, franchissement)" }],
  },

  {
    id: "eps-saut-multibonds",
    title: "Sauter vers les multibonds",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Enchaîner des bonds efficaces : alterner les impulsions, utiliser les bras, projeter le corps en avant à la réception.",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "8 min",
        detail: "Foulées bondissantes, cloche-pied, sauts pieds joints pour réveiller les appuis.",
      },
      {
        title: "Situations en ateliers",
        duration: "27 min",
        detail:
          "Fais le moins de bonds possible sur une distance de dix mètres. Trouve l'espacement de cordelettes où tu arrives à faire le moins de sauts. En prenant des appuis successifs (plinths, reuter), arrive ensuite sur le tapis. Enchaîne une course d'élan rapide, 3 sauts d'affilée en utilisant le même pied d'appel, puis réception sur deux pieds. Pense à projeter ton corps en avant à la réception. En enjambant les tapis rivières, touche des objets suspendus.",
        differentiation: "Adapter l'espacement des cordelettes et la hauteur des appuis.",
      },
      {
        title: "Évaluation",
        duration: "10 min",
        detail:
          "Note tes différents résultats, essaie d'améliorer tes performances. Performance moyenne comprise entre 3 et 5 mètres.",
      },
    ],
    material: [
      "Tapis, mousses",
      "Plinths, caisses, reuter, cordelettes, objets suspendus",
      "Outils de mesure",
    ],
    photocopies: ["Tableau de résultats individuel"],
    notes: [
      "Comportements recherchés : alterner les impulsions (un pied, cloche-pied, pieds joints) ; utiliser les bras pour sauter ; alterner les surfaces du pied ; enchaîner des foulées bondissantes ; reconnaître son pied d'appel ; anticiper la réception ; se grandir ; toucher l'objet avec le bras opposé à la jambe qui se soulève.",
    ],
    illustrations: [{ src: IMG("saut-multibonds.jpg"), caption: "Sauter vers les multibonds — foulées bondissantes" }],
  },
];
