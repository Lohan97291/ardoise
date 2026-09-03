/**
 * Fiches de préparation — EPS · Jeux d'opposition (cycle 2)
 *
 * Source : ACCÈS « Vivre l'EPS 6 à 8 ans » — Domaine de l'opposition, jeux d'opposition.
 * Unité d'apprentissage : entrée dans l'activité, situations diagnostiques,
 * situations d'apprentissage. Texte transcrit du guide + illustrations.
 */
import type { PrepSheet } from "@/lib/ardoise-data";

const SOCLE_EPS = [
  "D1 · Les langages pour penser et communiquer",
  "D2 · Les méthodes et outils pour apprendre",
  "D3 · La formation de la personne et du citoyen",
];
const COMPETENCE = "Coopérer et s'opposer individuellement et collectivement (jeux d'opposition).";
const DISCIPLINARY = ["Jeux d'opposition — domaine de l'opposition"];
const IMG = (name: string) => `/cahier/eps/${name}`;

export const EPS_JEUX_OPPOSITION_PREP_SHEETS: PrepSheet[] = [
  {
    id: "eps-opp-entree",
    title: "Entrée dans l'activité",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Entrer dans l'opposition : accepter le contact, pousser, tirer, s'opposer à travers des jeux globaux.",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "8 min",
        detail:
          "Déplacements variés sur les tapis, jeux de contact progressifs (dos à dos, se relever à deux) pour accepter le contact en sécurité. Rappel des règles d'or : ne pas faire mal, ne pas se laisser faire mal.",
      },
      {
        title: "Situation 1 — « Statues et déménageurs »",
        duration: "15 min",
        detail:
          "Deux zones délimitées espacées de 5 à 6 mètres, tapis entre les deux zones. Deux équipes : les déménageurs et les statues. Aux statues : « imagine que tu es une statue, prends une pose et garde-la ». Aux déménageurs : « transportez chaque statue sans la déformer ni la laisser tomber ». Changement de rôles lorsque toutes les statues ont été déménagées. Variantes : modifier le trajet ; augmenter/diminuer le nombre de déménageurs par statue.",
        differentiation: "Réduire la distance ; autoriser plusieurs déménageurs par statue.",
      },
      {
        title: "Situation 2 — « Arrêter les fourmis »",
        duration: "15 min",
        detail:
          "Espace de tapis de 10 m sur 10. Deux équipes : les fourmis et les termites. Aux fourmis : « traversez la forêt (zone de tapis) en vous déplaçant à 4 pattes ». Aux termites : « empêchez les fourmis de passer ». Variantes : diminuer/augmenter l'espace ou le nombre de fourmis ; obliger les termites à se déplacer sur les genoux.",
        differentiation: "Agrandir la zone pour faciliter le passage des fourmis.",
      },
      {
        title: "Retour au calme et bilan",
        duration: "7 min",
        detail:
          "Verbaliser : a-t-on accepté le contact ? comment déménager sans déformer ? comment s'organiser pour arrêter les fourmis ?",
      },
    ],
    material: ["Tatami de judo ou tapis de gym", "Cerceaux", "Cônes"],
    photocopies: [],
    notes: [
      "Comportements observés — les statues : gardent-elles leur forme ? acceptent-elles les contacts ?",
      "Les déménageurs : s'organisent-ils efficacement (disposition, places, prises) ?",
      "Les fourmis : utilisent-elles les espaces libres ? opposent-elles une résistance ?",
      "Les termites : saisissent-ils leurs adversaires ? se regroupent-ils pour affronter ?",
    ],
    illustrations: [{ src: IMG("opp-entree.jpg"), caption: "Entrée dans l'activité — situations de jeu" }],
  },

  {
    id: "eps-opp-diagnostic",
    title: "Situations diagnostiques",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Évaluer les comportements des élèves en opposition duelle (se déplacer, esquiver, protéger, alterner pousser/tirer) pour orienter la suite.",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "8 min",
        detail: "Jeux de contact et d'équilibre à deux, rappel des règles de sécurité.",
      },
      {
        title: "Situation 1 — « Les foulards »",
        duration: "10 min",
        detail:
          "Espace de tapis de 3 m sur 3, 1 contre 1. « Essaie de prendre le foulard passé dans la ceinture de ton adversaire ». Changement de rôle après 3 prises ou au bout de 3 minutes.",
      },
      {
        title: "Situation 2 — « Les ballons »",
        duration: "10 min",
        detail:
          "Espace de tapis de 3 m sur 3, 1 attaquant et 1 défenseur. « Essaie de prendre le ballon de basket de ton adversaire ». Changement de rôle après 3 prises ou au bout de 3 minutes.",
      },
      {
        title: "Situation 3 — « Les petits sumos »",
        duration: "12 min",
        detail:
          "Espace de tapis de 3 m sur 3, zone circulaire d'1 mètre de rayon délimitée (cordelettes, scotch ou craie), 1 contre 1. « Fais sortir ton adversaire de la zone délimitée ». Changement de rôle après 3 réussites ou au bout de 3 minutes. Comptabiliser les réussites ; changement d'adversaires.",
      },
      {
        title: "Bilan",
        duration: "5 min",
        detail: "Repérer les élèves à l'aise / en retrait pour constituer des groupes de besoin.",
      },
    ],
    material: ["Tatami de judo ou tapis de gym", "Ballons de basket", "Foulards", "Cordelettes"],
    photocopies: [],
    notes: [
      "Comportements observés : l'enfant se déplace-t-il ? se met-il au sol pour esquiver ? protège-t-il le ballon avec son corps ?",
      "Alterne-t-il pousser/tirer ? cherche-t-il des prises variées ? se déplace-t-il pour surprendre son adversaire ?",
    ],
    illustrations: [{ src: IMG("opp-diagnostic.jpg"), caption: "Situations diagnostiques — foulards, ballons, sumos" }],
  },

  {
    id: "eps-opp-apprentissage-1",
    title: "Situations d'apprentissage (1) — Conquérir et résister",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Coopérer et s'organiser pour conquérir un espace ou résister collectivement ; saisir efficacement l'adversaire.",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "8 min",
        detail: "Contacts et saisies progressives à deux, rappel « ne pas faire mal ».",
      },
      {
        title: "Situation 1 — « Rentrer les moutons dans la bergerie »",
        duration: "16 min",
        detail:
          "Espace de tapis de 8 m sur 8, une zone délimitée de 2 m sur 2 (la bergerie). Deux équipes : 5 à 6 bergers, 5 à 6 moutons. Aux moutons : « évitez les bergers, ne vous faites pas enfermer dans la bergerie ». Aux bergers : « attrapez les moutons et faites-les rentrer dans la bergerie ». Changement de rôle quand tous les moutons sont dans la bergerie ou après 4 minutes. Variantes : moutons à 4 pattes ; diminuer/augmenter le nombre de bergers ou l'espace.",
        differentiation: "Adapter l'espace et l'effectif des bergers.",
      },
      {
        title: "Situation 2 — « Sortir les ânes têtus »",
        duration: "16 min",
        detail:
          "Une zone de tapis de 6 m sur 6. Deux équipes : 5 à 6 attaquants à genoux, 3 à 4 défenseurs (les ânes) à quatre pattes. Aux attaquants : « sortez les ânes de l'écurie ». Aux ânes : « résistez pour rester dans l'écurie ». Changement de rôle quand tous les ânes sont sortis ou après 4 minutes. Variantes : attaquants à genoux ; diminuer/augmenter le nombre d'attaquants ou l'espace.",
        differentiation: "Imposer des positions (genoux, 4 pattes) pour équilibrer le rapport de force.",
      },
      {
        title: "Bilan",
        duration: "5 min",
        detail: "Verbaliser les stratégies de saisie, de coopération et de résistance.",
      },
    ],
    material: ["Tatami de judo ou tapis de gym", "Cônes, cordes, dossards"],
    photocopies: [],
    notes: [
      "Comportements recherchés : ne pas faire mal, s'engager dans l'action, saisir l'adversaire efficacement, varier les saisies, résister, coopérer et s'organiser, pousser/tirer, ceinturer, porter.",
    ],
    illustrations: [{ src: IMG("opp-appr-1.jpg"), caption: "Situations d'apprentissage — conquérir / résister" }],
  },

  {
    id: "eps-opp-apprentissage-2",
    title: "Situations d'apprentissage (2) — Contrôler l'adversaire",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Contrôler solidairement un adversaire, utiliser des saisies variées et trouver des appuis adaptés.",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "7 min",
        detail: "Jeux d'équilibre / déséquilibre à deux, saisies variées, sécurité.",
      },
      {
        title: "Situation 1 — « Séparer les jumeaux »",
        duration: "12 min",
        detail:
          "Une zone de tapis de 3 m sur 3. Groupe de 4 enfants : deux jumeaux, deux attaquants. Aux jumeaux : « mettez-vous à quatre pattes et accrochez-vous solidement l'un à l'autre ». Aux attaquants : « séparez les jumeaux ». Changement de rôle après 2 réussites. Variante : augmenter le nombre d'attaquants.",
      },
      {
        title: "Situation 2 — « Combat de coqs »",
        duration: "12 min",
        detail:
          "Espace de tapis de 2 m sur 2. Deux adversaires accroupis face à face. « Fais tomber ton adversaire sur les fesses ». Le premier qui réussit 3 fois a gagné. Variantes : exiger prises de mains à plat ; faire tomber l'adversaire en avant ou sur les côtés.",
      },
      {
        title: "Situation 3 — « Épervier immobilisé »",
        duration: "10 min",
        detail:
          "Cinq passeurs, 2 éperviers dans une zone de 4 m sur 4, une caisse avec ballons et anneaux, une caisse vide. Aux passeurs : « prends un objet dans ta caisse et rapporte-le dans la caisse d'arrivée ; ne te fais pas immobiliser par un épervier ». Aux éperviers : « attrape et immobilise durant 5 secondes les passeurs dans ta zone ». Tout passeur immobilisé 5 s perd son objet. Changement de rôle lorsque 20 objets ont été transportés.",
      },
      {
        title: "Bilan",
        duration: "4 min",
        detail: "Verbaliser : comment contrôler à deux, quelles saisies efficaces, quels appuis.",
      },
    ],
    material: ["Tatami de judo ou tapis de gym", "Cerceaux, cônes, foulards, cordes, ballons, anneaux, 2 caisses"],
    photocopies: [],
    notes: [
      "Comportements recherchés : contrôler solidairement l'adversaire, utiliser des saisies variées, trouver des appuis adaptés, rester en position accroupie, écarter les appuis.",
      "Épervier immobilisé — passeurs : utiliser les espaces libres, esquiver. Éperviers : maintenir la prise, s'organiser pour prendre et immobiliser.",
    ],
    illustrations: [{ src: IMG("opp-appr-2.jpg"), caption: "Situations d'apprentissage — contrôler l'adversaire" }],
  },

  {
    id: "eps-opp-apprentissage-3",
    title: "Situations d'apprentissage (3) — Retourner, saisir, défendre une zone",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Retourner un adversaire, saisir un objet malgré la résistance, défendre / conquérir une zone.",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "7 min",
        detail: "Contacts au sol, recherche d'appuis efficaces, sécurité (ne pas faire mal).",
      },
      {
        title: "Situation 1 — « Retourner les tortues »",
        duration: "12 min",
        detail:
          "Une zone de tapis de 2 m sur 2. Un contre un, un défenseur à quatre pattes (tortue), un attaquant. À l'attaquant : « retourne la tortue sur le dos ». À la tortue : « résiste pour empêcher l'attaquant de te retourner ». Changement de rôle lorsque l'attaquant a retourné 3 fois la tortue. Variantes : attaquant accroupi ; tortue à plat ventre.",
      },
      {
        title: "Situation 2 — « Attraper les pinces à linge »",
        duration: "12 min",
        detail:
          "Espace de tapis de 4 m sur 4. Un défenseur qui porte un foulard glissé dans la ceinture, un attaquant. À l'attaquant : « attrape les foulards de ton adversaire ». Au porteur de foulards : « empêche ton adversaire de te prendre tes foulards ». Changement de rôle après 6 prises. Variantes : nombre de foulards ; foulards sur différentes parties ; se déplacer debout / à quatre pattes / accroupi ; jouer en équipe.",
      },
      {
        title: "Situation 3 — « Empêcher le voleur d'entrer »",
        duration: "10 min",
        detail:
          "Espace de tapis de 2 m sur 2. Un défenseur dans la zone, un attaquant. Au défenseur : « empêche le voleur d'entrer (de poser 2 pieds) dans la zone ». Au voleur : « rentre dans la zone ». Changement de rôle après 3 réussites. Variantes : diminuer/augmenter la zone ; varier les positions (debout, accroupi, à quatre pattes).",
      },
      {
        title: "Bilan",
        duration: "4 min",
        detail: "Verbaliser : comment enlever/écarter les appuis, comment esquiver en restant face à l'attaquant.",
      },
    ],
    material: ["Tatami de judo ou tapis de gym", "Cerceaux, cônes, foulards, cordes"],
    photocopies: [],
    notes: [
      "Comportements recherchés : ne pas faire mal, rechercher des appuis efficaces, enlever/écarter les appuis, faire face à l'attaquant, esquiver en restant face à l'adversaire, abaisser le corps, anticiper et varier les déplacements.",
    ],
    illustrations: [{ src: IMG("opp-appr-3.jpg"), caption: "Situations d'apprentissage — retourner, saisir, défendre" }],
  },
];
