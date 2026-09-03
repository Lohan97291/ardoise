/**
 * Fiches de préparation — EPS · Jeux collectifs (cycle 2)
 *
 * Source : ACCÈS « Vivre l'EPS 6 à 8 ans » — Domaine de l'opposition, jeux collectifs.
 * 8 jeux : 3 sans ballon + 5 avec ballon. Texte transcrit du guide + illustrations.
 */
import type { PrepSheet } from "@/lib/ardoise-data";

const SOCLE_EPS = [
  "D1 · Les langages pour penser et communiquer",
  "D2 · Les méthodes et outils pour apprendre",
  "D3 · La formation de la personne et du citoyen",
];

const COMPETENCE = "Coopérer et s'opposer individuellement et collectivement (jeux collectifs).";
const DISCIPLINARY = ["Jeux collectifs — domaine de l'opposition"];
const IMG = (name: string) => `/cahier/eps/${name}`;

export const EPS_JEUX_COLLECTIFS_PREP_SHEETS: PrepSheet[] = [
  // ══════════════════════════ JEUX SANS BALLON ══════════════════════════
  {
    id: "eps-jc-sorciers",
    title: "Les sorciers",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Passer de « courir vite » à « esquiver et attraper » : courir, esquiver, s'organiser pour toucher ou éviter d'être touché.",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "8 min",
        detail:
          "Course et déplacements variés dans l'espace délimité (trottiner, accélérer, s'arrêter au signal, changer de direction). Réveil articulaire.",
      },
      {
        title: "Présentation du jeu — but et rôles",
        duration: "7 min",
        detail:
          "Jeu d'attrape sans ballon à 2 rôles (attaquants / attaqués). Le sorcier doit toucher les autres joueurs le plus rapidement possible. 1 sorcier pour 5 à 6 joueurs.",
      },
      {
        title: "Le jeu",
        duration: "20 min",
        detail:
          "Terrain carré ou rectangulaire (15 m) délimité. Les joueurs sont répartis sur le terrain. Au signal, les sorciers essaient de toucher les joueurs. Tout joueur touché s'immobilise sur place : il est transformé en statue. Tout joueur qui sort des limites est aussi transformé en statue. Manches de 5 à 6 minutes.",
        differentiation:
          "Adapter la taille du terrain et le nombre de sorciers selon l'aisance des élèves.",
      },
      {
        title: "Faire évoluer — variantes",
        duration: "6 min",
        detail:
          "• Un joueur libre peut délivrer une statue en la touchant (favorise l'activité). • Augmenter le nombre de sorciers, 1 pour 4 joueurs (stratégie de groupe, plus de touches). • Mettre en place une prison (organisation : prendre ou garder). • Mettre en place des refuges (choix tactiques).",
      },
      {
        title: "Retour au calme et bilan",
        duration: "4 min",
        detail:
          "Verbaliser : comment les sorciers se sont organisés ? comment éviter d'être touché ? Retour au calme.",
      },
    ],
    material: ["Dossards ou maillots pour les sorciers", "Gros chronomètre", "Plots de délimitation"],
    photocopies: [],
    notes: [
      "Comportements recherchés — pour les sorciers : s'organiser pour prendre ou garder.",
      "Pour les joueurs : regarder les sorciers, se tenir le plus loin possible, aider ses partenaires.",
    ],
    illustrations: [{ src: IMG("jc-sans-ballon-1.jpg"), caption: "Jeux sans ballon — situations" }],
  },

  {
    id: "eps-jc-poules-renards-viperes",
    title: "Les poules, les renards et les vipères",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Attraper une espèce sans se faire prendre : tenir deux rôles simultanés (poursuivre / esquiver) et utiliser les refuges.",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "8 min",
        detail: "Course dans l'espace, jeux de poursuite simples pour entrer dans l'activité.",
      },
      {
        title: "Présentation — 3 espèces, 3 rôles",
        duration: "7 min",
        detail:
          "Jeu d'attrape sans ballon à deux rôles simultanés (attaqués-attaquants), à trois équipes. Les poules attrapent les vipères, les vipères attrapent les renards, les renards attrapent les poules.",
      },
      {
        title: "Le jeu",
        duration: "20 min",
        detail:
          "Terrain rectangulaire (20 à 30 m sur 10 à 15 m) délimité avec 3 zones refuge. Chaque enfant porte un foulard à sa ceinture. Au signal, les joueurs sortent de leur refuge pour tenter d'attraper une « proie ». On peut revenir dans son refuge. Quand un joueur est pris (foulard enlevé), il rejoint le repère de l'espèce qui l'a attrapé (ou ne peut plus attraper). Au signal de fin, on compte les prises. Manches de 4 à 5 minutes.",
        differentiation: "Agrandir les refuges / rapprocher les zones pour les élèves les plus fragiles.",
      },
      {
        title: "Faire évoluer — variantes",
        duration: "6 min",
        detail:
          "• Donner deux foulards par joueur (favorise l'attaque). • Pinces à linge au lieu des foulards (actions plus proches). • Diminuer la zone de jeu. • Autoriser la délivrance. • Imposer un temps maximum dans le refuge.",
      },
      {
        title: "Retour au calme et bilan",
        duration: "4 min",
        detail: "Comptage des prises, verbalisation des stratégies, retour au calme.",
      },
    ],
    material: [
      "Trois séries de dossards/maillots (1 couleur par rôle) ou foulards (autant que de joueurs)",
      "Plots pour délimiter les refuges",
    ],
    photocopies: [],
    notes: [
      "Comportements recherchés : sortir du refuge, faire des feintes, faire face à son attaquant, utiliser son refuge pour éviter de se faire prendre, accepter de jouer les deux rôles (poursuivre / esquiver).",
    ],
    illustrations: [{ src: IMG("jc-sans-ballon-2.jpg"), caption: "Jeux sans ballon — situations" }],
  },

  {
    id: "eps-jc-drapeau",
    title: "Le drapeau",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Jeu d'attaque et de défense : s'organiser collectivement pour prendre le drapeau (attaquants) ou l'en empêcher (défenseurs).",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "7 min",
        detail: "Course et déplacements, jeux d'esquive pour entrer dans l'activité.",
      },
      {
        title: "Présentation — attaquants / défenseurs",
        duration: "8 min",
        detail:
          "Jeu d'attaque et de défense sans ballon, deux équipes. Pour les attaquants : prendre et ramener directement le drapeau dans leur camp. Pour les défenseurs : les en empêcher.",
      },
      {
        title: "Le jeu",
        duration: "20 min",
        detail:
          "Terrain rectangulaire (15 m sur 10 m) délimité. Deux équipes de 5 à 8 joueurs. On joue en 5 points : un point est marqué chaque fois qu'un attaquant ramène le drapeau dans son camp sans se faire toucher. On inverse les rôles après 5 points. Les joueurs éliminés reprennent leur place à chaque remise en jeu. Les attaquants désignent un gardien (cavalier) : intouchable, il n'a pas le droit de prendre le drapeau, mais il est le seul à avoir droit de prise sur les défenseurs (tout défenseur touché est éliminé).",
        differentiation: "Ajuster la taille du terrain et le nombre de défenseurs.",
      },
      {
        title: "Faire évoluer — variantes",
        duration: "6 min",
        detail:
          "• Prisonniers répartis dans des zones, délivrables un par un (favorise l'activité). • Remplacer le foulard par un ballon (rugby) et faire des passes pour le ramener (coopération). • Mettre en place une prison / des refuges (organisation, choix tactiques).",
      },
      {
        title: "Retour au calme et bilan",
        duration: "4 min",
        detail: "Bilan des stratégies d'attaque et de défense, retour au calme.",
      },
    ],
    material: [
      "Dossards ou maillots",
      "Signe distinctif pour le gardien (cavalier)",
      "Un cerceau avec un drapeau (foulard)",
    ],
    photocopies: [],
    notes: [
      "Comportements recherchés — attaquants : atteindre le drapeau grâce à la protection du gardien, explorer les zones libres d'adversaires.",
      "Gardien : créer des espaces libres pour ses partenaires.",
      "Défenseurs : occuper la zone proche du drapeau ou se positionner entre le drapeau et le camp adverse.",
    ],
    illustrations: [{ src: IMG("jc-drapeau.jpg"), caption: "Le drapeau — dispositif (camp défenseurs / attaquants)" }],
  },

  // ══════════════════════════ JEUX AVEC BALLON ══════════════════════════
  {
    id: "eps-jc-balle-assise",
    title: "La balle assise",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Toucher les autres joueurs avec le ballon : tirer, esquiver, réagir vite et ajuster ses déplacements au trajet du ballon.",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "8 min",
        detail: "Manipulations du ballon (lancers, réceptions), déplacements variés dans l'espace.",
      },
      {
        title: "Présentation — rôles alternatifs",
        duration: "6 min",
        detail:
          "Jeu avec ballon, rôles alternatifs (attaqué / attaquant). But : toucher les autres joueurs à l'aide du ballon.",
      },
      {
        title: "Le jeu",
        duration: "20 min",
        detail:
          "Terrain carré ou rectangulaire (15 m). Les joueurs sont répartis sur le terrain. Celui qui s'empare du ballon peut tirer sur n'importe quel autre joueur. Tout joueur touché directement doit s'asseoir. Tout joueur qui récupère la balle de volée ou après un rebond devient chasseur. Durée : 5 à 7 minutes.",
        differentiation: "Ballon en mousse ; réduire l'espace pour multiplier les touches.",
      },
      {
        title: "Faire évoluer — variantes",
        duration: "6 min",
        detail:
          "• Le joueur assis peut se délivrer en récupérant le ballon. • Le chasseur peut délivrer un joueur assis (alliances / désalliances). • Le porteur du ballon ne peut plus se déplacer (favorise les lancers précis, autorise le dribble). • Utiliser 2 ballons (augmente la vitesse de jeu).",
      },
      {
        title: "Retour au calme et bilan",
        duration: "5 min",
        detail: "Verbaliser quand tirer, comment esquiver ; retour au calme.",
      },
    ],
    material: ["Un ou deux ballons (mousse conseillé)", "Plots de délimitation"],
    photocopies: [],
    notes: [
      "Comportements recherchés — pour l'attaquant : ne tirer que si l'adversaire est situé près de lui.",
      "Pour le défenseur : faire face au ballon, s'éloigner du porteur du ballon.",
    ],
    illustrations: [{ src: IMG("jc-ballon-1.jpg"), caption: "Jeux avec ballon — situations (tirer, esquiver, réagir vite)" }],
  },

  {
    id: "eps-jc-eperviers-demenageurs",
    title: "Les éperviers déménageurs",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Transporter le plus de ballons possible sans se faire toucher : courir, feinter, utiliser les refuges.",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "8 min",
        detail: "Course et déplacements variés, jeux d'esquive pour entrer dans l'activité.",
      },
      {
        title: "Présentation — déménageurs / éperviers",
        duration: "6 min",
        detail:
          "Jeu avec ballon à 2 rôles (déménageurs / éperviers). But : vider sa caisse avant les autres, ou avoir moins de ballons que l'équipe adverse à la fin du jeu.",
      },
      {
        title: "Le jeu",
        duration: "20 min",
        detail:
          "Terrain rectangulaire (20 à 30 m sur 10 à 15 m) délimité. Deux équipes de 6 à 8 joueurs, 2 éperviers. Chaque déménageur ne peut transporter qu'un ballon à la fois. Les déménageurs sont invulnérables dans les refuges ou la zone neutre. Si un déménageur est touché ballon en main par l'épervier adverse, il doit reporter le ballon dans sa propre caisse. Manches de 3 à 4 minutes.",
        differentiation: "Ajuster distances et nombre d'éperviers selon le niveau.",
      },
      {
        title: "Faire évoluer — variantes",
        duration: "6 min",
        detail:
          "• Augmenter le nombre d'éperviers (2 par équipe : plus de touches, utilisation des refuges). • Imposer le déplacement du ballon au pied ou en dribblant. • À la place des refuges, délimiter des zones neutres (favorise la stratégie).",
      },
      {
        title: "Retour au calme et bilan",
        duration: "5 min",
        detail: "Comptage des ballons, bilan des trajets et des refuges utilisés.",
      },
    ],
    material: ["Une caisse de ballons", "Deux séries de dossards", "Plots / cerceaux pour refuges"],
    photocopies: [],
    notes: ["Comportements recherchés : courir, faire des feintes, transporter beaucoup de balles, utiliser les refuges."],
    illustrations: [{ src: IMG("jc-ballon-1.jpg"), caption: "Jeux avec ballon — situations" }],
  },

  {
    id: "eps-jc-esquive-ballon",
    title: "L'esquive ballon",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Toucher le plus de « lapins » possible avec le ballon (chasseurs) ; esquiver et faire face au ballon (lapins).",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "8 min",
        detail: "Lancers et réceptions à deux, déplacements et esquives.",
      },
      {
        title: "Présentation — chasseurs / lapins",
        duration: "6 min",
        detail:
          "Jeu avec ballon(s), 2 rôles alternatifs (chasseurs / lapins). But : toucher le plus grand nombre de lapins dans un temps donné (5 à 6 minutes).",
      },
      {
        title: "Le jeu",
        duration: "20 min",
        detail:
          "Terrain rectangulaire ou circulaire (6 à 7 m de diamètre) délimité. Deux équipes de 6 à 8 joueurs. Les lapins se trouvent à l'intérieur du terrain. Les chasseurs se déplacent autour du terrain, sans ballon, se font des passes et lancent comme ils l'entendent. On ne compte que les touches directes. Les touches à la tête sont interdites. Manches de 5 à 6 minutes.",
        differentiation: "Ballon mousse ; agrandir/réduire le cercle selon le niveau.",
      },
      {
        title: "Faire évoluer — variantes",
        duration: "6 min",
        detail:
          "• Augmenter le nombre de balles (rapidité, quantité de touches). • Interdire au porteur du ballon de marcher (favorise les passes).",
      },
      {
        title: "Retour au calme et bilan",
        duration: "5 min",
        detail: "Verbaliser comment les chasseurs se placent, comment les lapins esquivent.",
      },
    ],
    material: ["Un ballon (mousse conseillé)", "Deux séries de dossards", "Plots / cordelette pour le cercle"],
    photocopies: [],
    notes: [
      "Comportements recherchés — attaquant : ne tirer que si l'adversaire est situé près de lui.",
      "Défenseur : faire face au ballon, s'écarter du porteur du ballon.",
    ],
    illustrations: [{ src: IMG("jc-ballon-2.jpg"), caption: "Jeux avec ballon — situations (lancer, intercepter, renvoyer)" }],
  },

  {
    id: "eps-jc-balles-brulantes",
    title: "Les balles brûlantes",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Avoir le moins de ballons dans son camp : lancer dans les espaces libres, intercepter, renvoyer vite, s'organiser collectivement.",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "8 min",
        detail: "Lancers variés (à une/deux mains, loin, précis), réceptions.",
      },
      {
        title: "Présentation — deux camps",
        duration: "6 min",
        detail:
          "Jeu avec ballons, 2 équipes, rôle identique. But : avoir dans son camp moins de balles que l'équipe adverse au signal de fin de jeu.",
      },
      {
        title: "Le jeu",
        duration: "20 min",
        detail:
          "Terrain rectangulaire (20 à 30 m sur 10 à 15 m) délimité. Deux équipes de 6 à 8 joueurs. Chaque équipe est dans son camp avec autant de ballons de chaque côté. Au signal de début, les joueurs commencent à lancer. On reste dans son camp. Les joueurs lancent dans le camp adverse ; on relance les ballons qui arrivent. Au signal de fin, on arrête de lancer et on compte. Plusieurs manches de 3 minutes.",
        differentiation: "Adapter le nombre de ballons et la taille des camps.",
      },
      {
        title: "Faire évoluer — variantes",
        duration: "6 min",
        detail:
          "• Diminuer la surface (rapidité). • Augmenter la longueur du terrain (lancers puissants). • Diminuer le nombre de ballons (interception, organisation). • Gros ballons (rattraper) / petites balles (lancer). • Matérialiser une zone centrale (filet, élastique, tapis). • Interdire les déplacements (organisation, passes).",
      },
      {
        title: "Retour au calme et bilan",
        duration: "5 min",
        detail: "Comptage, bilan de l'organisation collective, retour au calme.",
      },
    ],
    material: ["Ballons (autant que de joueurs, mousse conseillé)", "Plots ; éventuellement filet/élastique/tapis"],
    photocopies: [],
    notes: [
      "Comportements recherchés : occuper des espaces libres, relancer vite, viser les « trous », chercher à récupérer à la volée, dialoguer avec ses partenaires.",
    ],
    illustrations: [{ src: IMG("jc-ballon-2.jpg"), caption: "Jeux avec ballon — situations (lancer, intercepter, renvoyer vite)" }],
  },

  {
    id: "eps-jc-tours-chateau",
    title: "Les tours du château",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Abattre les tours adverses : lancer, viser, tirer, passer et recevoir, intercepter et s'organiser collectivement.",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "8 min",
        detail: "Lancers de précision sur cibles, passes et réceptions à deux.",
      },
      {
        title: "Présentation — attaquants / défenseurs",
        duration: "6 min",
        detail:
          "Jeu avec ballons et cibles, 2 rôles alternatifs (attaquants / défenseurs). But : abattre toutes les tours (ou le maximum) dans le temps imparti.",
      },
      {
        title: "Le jeu",
        duration: "20 min",
        detail:
          "Terrain rectangulaire ou circulaire (6 à 8 m de diamètre) délimité. Deux équipes de 6 à 8 joueurs. À l'engagement, la première équipe qui s'empare du ballon peut attaquer une tour. On ne peut pas pénétrer dans le château. On ne peut pas prendre la balle des mains du porteur. Si mon équipe a la balle : on est attaquant, on se démarque, on se rapproche d'une tour et on tire. Si mon équipe n'a pas le ballon : on défend les tours en s'interposant entre elles et le porteur. Durée : 5 à 6 minutes.",
        differentiation: "Ajuster le nombre de tours et la distance de tir.",
      },
      {
        title: "Faire évoluer — variantes",
        duration: "6 min",
        detail:
          "• Augmenter le nombre de balles, une par équipe (rapidité, touches). • Interdire au porteur du ballon de marcher (passes). • Mettre en place 2 châteaux (facilite l'attaque, favorise l'organisation).",
      },
      {
        title: "Retour au calme et bilan",
        duration: "5 min",
        detail: "Bilan : comment se démarquer, comment défendre les tours ; retour au calme.",
      },
    ],
    material: [
      "Un ballon",
      "Deux séries de dossards",
      "6 tours (quilles ou bouteilles)",
      "Cerceaux, plots",
    ],
    photocopies: [],
    notes: [
      "Comportements recherchés — attaquant : ne tirer que s'il est près d'une tour, se démarquer.",
      "Défenseur : faire face au porteur du ballon.",
    ],
    illustrations: [{ src: IMG("jc-chateau.jpg"), caption: "Les tours du château — situations (lancer, viser, passer)" }],
  },
];
