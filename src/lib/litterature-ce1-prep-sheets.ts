/**
 * Fiches de préparation — Littérature CE1
 *
 * Séquence « Soupçon » (Bernard Friot) — Français, cycle 2 (programme 2025).
 * 7 séances : lecture-compréhension, vocabulaire de la peur, production d'écrit.
 * Source : séquence + dossier d'étude fournis par l'enseignant.
 */
import type { PrepSheet } from "@/lib/ardoise-data";

const SOCLE_FR = [
  "D1 · Les langages pour penser et communiquer",
  "D2 · Les méthodes et outils pour apprendre",
];

export const LITTERATURE_CE1_PREP_SHEETS: PrepSheet[] = [
  // ══════════════════════════════════════════════════════════════════
  //  SÉQUENCE « SOUPÇON » — Bernard Friot (7 séances)
  // ══════════════════════════════════════════════════════════════════

  {
    id: "litt-soupcon-s1",
    title: "Soupçon — S1 : Entrer dans le récit et formuler des soupçons",
    subject: "francais",
    socleDomains: SOCLE_FR,
    disciplinaryDomains: ["Lecture et compréhension de l'écrit", "Langage oral"],
    objective:
      "Entrer dans le récit à suspense, identifier le narrateur et le personnage observé, et distinguer les indices du texte des hypothèses du lecteur.",
    competence:
      "Lire et comprendre le début d'un texte narratif ; expliciter les états mentaux des personnages ; justifier ses réponses par un retour au texte.",
    duration: "45 min",
    phases: [
      {
        title: "Lecture d'entrée",
        duration: "12 min",
        detail:
          "Lecture magistrale puis lecture silencieuse du début du texte, jusqu'à « pour dormir ». Repérage du narrateur et du personnage observé : que voit-on ? que sait-on ? que croit-on ?",
      },
      {
        title: "Questionnement oral",
        duration: "12 min",
        detail:
          "Quel comportement paraît bizarre ? Pourquoi le narrateur soupçonne-t-il le chat ? Le chat avoue-t-il quelque chose ? Faire distinguer ce que le texte dit de ce que le lecteur imagine.",
      },
      {
        title: "Fiche Partie 1 — Le coupable",
        duration: "13 min",
        detail:
          "Dessiner le coupable selon sa description dans le texte, compléter la phrase « Le coupable est… » puis imaginer son crime.",
        differentiation:
          "Relire à voix haute la description ; proposer une banque de mots pour la phrase.",
      },
      {
        title: "Mise en commun et vocabulaire",
        duration: "8 min",
        detail:
          "Distinguer les indices du texte et les hypothèses des lecteurs. Vocabulaire en contexte : babines, attentivement, incapable, soupçonner. À relire : le passage étudié.",
      },
    ],
    material: ["Tapuscrit « Soupçon » (Bernard Friot)", "Affichage des mots de vocabulaire"],
    photocopies: ["Fiche Partie 1 — Le coupable : 1 par élève"],
    vocabulary: ["babines", "attentivement", "incapable", "soupçonner"],
  },

  {
    id: "litt-soupcon-s2",
    title: "Soupçon — S2 : Se représenter les lieux et suivre le trajet",
    subject: "francais",
    socleDomains: SOCLE_FR,
    disciplinaryDomains: ["Lecture et compréhension de l'écrit", "Langage oral"],
    objective:
      "Construire une représentation cohérente des lieux, nommer les pièces et les animaux, et suivre le trajet de l'enquêteur.",
    competence:
      "Restituer les enchaînements logiques et chronologiques d'un récit ; justifier ses réponses par un retour au texte.",
    duration: "45 min",
    phases: [
      {
        title: "Lecture de la suite",
        duration: "10 min",
        detail:
          "Lecture de la suite jusqu'au canari retrouvé sain et sauf ; reformulation collective de ce qui vient d'être lu.",
      },
      {
        title: "Nommer lieux, animaux et objets",
        duration: "12 min",
        detail:
          "Nommer les pièces, les animaux et les objets utiles à la compréhension : salon, cagibi, chambre, balcon, bocal, panier, cage.",
      },
      {
        title: "Fiche Partie 2 — L'appartement",
        duration: "15 min",
        detail:
          "Replacer chaque animal dans la bonne pièce sur le plan. Tracer en orange le trajet du narrateur-enquêteur et le verbaliser avec des connecteurs spatiaux et temporels. Faire justifier chaque placement par un retour précis au texte.",
        differentiation:
          "Plan avec images-étiquettes ; surlignage préalable des noms de lieux dans le texte.",
      },
      {
        title: "Clôture",
        duration: "8 min",
        detail: "Verbalisation du trajet complet. À relire : du poisson rouge au canari.",
      },
    ],
    material: ["Tapuscrit « Soupçon »", "Plan de l'appartement", "Feutres orange"],
    photocopies: ["Fiche Partie 2 — L'appartement (plan) : 1 par élève"],
    vocabulary: ["cagibi", "bocal", "panier", "cage", "balcon"],
  },

  {
    id: "litt-soupcon-s3",
    title: "Soupçon — S3 : Confronter les soupçons à la réalité",
    subject: "francais",
    socleDomains: SOCLE_FR,
    disciplinaryDomains: ["Lecture et compréhension de l'écrit", "Écriture", "Langage oral"],
    objective:
      "Distinguer ce que le narrateur imagine de ce qu'il découvre réellement ; comprendre qu'une hypothèse se vérifie et se justifie par des indices.",
    competence:
      "Comprendre l'implicite dans des cas simples et justifier ses réponses ; écrire une hypothèse structurée.",
    duration: "45 min",
    phases: [
      {
        title: "Rappel et relecture ciblée",
        duration: "12 min",
        detail:
          "Rappel oral du trajet et des animaux vérifiés. Relecture ciblée : rechercher les formulations qui traduisent ce que le narrateur imagine et ce qu'il découvre réellement.",
      },
      {
        title: "Fiche Partie 3 — Soupçons ou réalité ?",
        duration: "15 min",
        detail:
          "Compléter le tableau poisson rouge / souris / canari (ce que le narrateur imagine / ce qu'il découvre). Surligner les indices dans le texte.",
      },
      {
        title: "Institutionnalisation",
        duration: "8 min",
        detail:
          "Questions : le narrateur a-t-il des preuves ? Pourquoi son inquiétude augmente-t-elle alors que chaque animal va bien ? Institutionnalisation : une hypothèse est une idée possible ; elle doit être vérifiée et justifiée par des indices.",
      },
      {
        title: "Production écrite",
        duration: "10 min",
        detail:
          "Nouvelle hypothèse écrite : « Qu'a fait le coupable ? » en employant « Je pense que… parce que… ». À relire : tout le texte connu.",
        differentiation: "Amorce de phrase et banque de mots pour les élèves fragiles.",
      },
    ],
    material: ["Tapuscrit « Soupçon »", "Surligneurs"],
    photocopies: ["Fiche Partie 3 — Tableau soupçons / réalité : 1 par élève"],
    vocabulary: ["hypothèse", "indice", "preuve", "vérifier"],
  },

  {
    id: "litt-soupcon-s4",
    title: "Soupçon — S4 : Comprendre les émotions du narrateur",
    subject: "francais",
    socleDomains: SOCLE_FR,
    disciplinaryDomains: ["Vocabulaire", "Lecture et compréhension de l'écrit"],
    objective:
      "Repérer et comprendre les émotions du narrateur ; construire le champ lexical de la peur.",
    competence:
      "Développer des stratégies pour élucider le sens des mots ; enrichir un répertoire lexical et l'organiser dans un champ lexical.",
    duration: "45 min",
    phases: [
      {
        title: "Lecture expressive",
        duration: "8 min",
        detail:
          "Lecture expressive du texte connu ; repérage des changements d'état du narrateur au fil du récit.",
      },
      {
        title: "Fiche Partie 4.1 — Les mots de la peur",
        duration: "15 min",
        detail:
          "Surligner les mots et expressions qui montrent la peur ou l'angoisse. Associer chaque mot à une situation : inquiet, s'affoler, trembler, hurler, épouvanté, soulagé. Faire mimer ou dire une phrase pour vérifier le sens ; opposer inquiet / soulagé.",
      },
      {
        title: "Réemploi et trace écrite",
        duration: "14 min",
        detail:
          "Compléter les phrases de réemploi et définir « soupçonner » avec ses propres mots. Trace écrite : « Les mots de la peur ».",
      },
      {
        title: "Rituel — Dictée 1",
        duration: "8 min",
        detail: "Dictée 1 des mots du corpus.",
      },
    ],
    material: ["Tapuscrit « Soupçon »", "Surligneurs", "Affichage « Les mots de la peur »"],
    photocopies: ["Fiche Partie 4.1 — Les mots de la peur : 1 par élève", "Trace écrite : 1 par élève"],
    vocabulary: ["inquiet", "s'affoler", "trembler", "hurler", "épouvanté", "soulagé"],
  },

  {
    id: "litt-soupcon-s5",
    title: "Soupçon — S5 : Organiser et graduer le vocabulaire de la peur",
    subject: "francais",
    socleDomains: SOCLE_FR,
    disciplinaryDomains: ["Vocabulaire", "Langage oral"],
    objective:
      "Classer et graduer le vocabulaire de la peur selon l'intensité ; distinguer un état d'une réaction.",
    competence:
      "Établir des relations entre les mots et les organiser dans un champ lexical ; argumenter un classement à l'oral.",
    duration: "45 min",
    phases: [
      {
        title: "Réactivation du corpus",
        duration: "8 min",
        detail:
          "Réactivation orale du corpus sans support, puis validation avec la trace écrite.",
      },
      {
        title: "Fiche Partie 4.2 — Graduer l'intensité",
        duration: "18 min",
        detail:
          "Classer les étiquettes selon l'intensité : inquiétude, angoisse, panique. Justifier un classement ; accepter plusieurs propositions lorsqu'elles sont argumentées. Construire collectivement une gradation de référence, par exemple : inquiet → affolé → épouvanté.",
      },
      {
        title: "Observer état / réaction",
        duration: "9 min",
        detail:
          "Observer que certains mots désignent un état et d'autres une réaction du corps ou de la voix.",
      },
      {
        title: "Rituel — Dictée 2",
        duration: "10 min",
        detail: "Dictée 2 de groupes de mots ; courte production orale avec un mot imposé.",
      },
    ],
    material: ["Étiquettes-mots du corpus", "Affichage « Les mots de la peur »"],
    photocopies: ["Fiche Partie 4.2 — Classement par intensité : 1 par élève"],
    vocabulary: ["inquiétude", "angoisse", "panique", "affolé", "épouvanté"],
  },

  {
    id: "litt-soupcon-s6",
    title: "Soupçon — S6 : Catégoriser, mémoriser et réemployer les mots",
    subject: "francais",
    socleDomains: SOCLE_FR,
    disciplinaryDomains: ["Vocabulaire", "Écriture", "Étude de la langue : grammaire, orthographe, lexique"],
    objective:
      "Catégoriser les mots du corpus, mémoriser leur orthographe et les réemployer en production d'écrit.",
    competence:
      "Mobiliser les mots rencontrés pour mieux parler, comprendre et écrire ; mémoriser l'orthographe de mots fréquents.",
    duration: "45 min",
    phases: [
      {
        title: "Fiche Partie 4.3 — Familles de mots",
        duration: "15 min",
        detail:
          "Classer les mots dans les familles « je me sens », « je réagis », « je pense », « le chat peut ». Verbaliser le critère de classement et repérer simplement noms, adjectifs et verbes lorsque cela aide.",
      },
      {
        title: "Fiche Partie 4.4 — Le mot précis",
        duration: "14 min",
        detail:
          "Choisir le mot précis pour compléter chaque phrase, puis écrire une phrase personnelle.",
        differentiation: "Étiquettes-mots à disposition ; nombre de phrases réduit si besoin.",
      },
      {
        title: "Mémorisation et rituel — Dictée 3",
        duration: "10 min",
        detail:
          "Révision de la trace écrite et mémorisation de l'orthographe des mots ciblés. Dictée 3 de deux phrases ; correction raisonnée avec appui sur les affichages.",
      },
      {
        title: "Évaluation formative",
        duration: "6 min",
        detail: "Employer correctement au moins trois mots du corpus.",
      },
    ],
    material: ["Étiquettes-mots", "Affichages du corpus"],
    photocopies: [
      "Fiche Partie 4.3 — Familles de mots : 1 par élève",
      "Fiche Partie 4.4 — Le mot précis : 1 par élève",
    ],
    vocabulary: ["inquiet", "soulagé", "s'affoler", "hurler", "trembler", "dévorer"],
  },

  {
    id: "litt-soupcon-s7",
    title: "Soupçon — S7 : Anticiper la chute et réagir en lecteur",
    subject: "francais",
    socleDomains: SOCLE_FR,
    disciplinaryDomains: ["Écriture", "Lecture et compréhension de l'écrit", "Langage oral"],
    objective:
      "Anticiper la chute du récit en s'appuyant sur les indices, puis exprimer une réaction de lecteur.",
    competence:
      "Émettre des hypothèses et les justifier par le texte ; produire un court récit cohérent à partir d'une amorce.",
    duration: "45 min",
    phases: [
      {
        title: "Lecture interrompue",
        duration: "8 min",
        detail:
          "Lecture du récit interrompue après « Le monstre, il a osé ! Il a dévoré… ».",
      },
      {
        title: "Fiche Partie 5.1 — Imaginer la fin",
        duration: "15 min",
        detail:
          "Imaginer et écrire la fin en s'appuyant sur les indices accumulés. Lecture de quelques propositions ; comparaison et justification par le texte.",
        differentiation:
          "Amorce, banque de mots et connecteurs pour soutenir la production.",
      },
      {
        title: "Découverte de la chute",
        duration: "12 min",
        detail:
          "Découverte de la chute authentique, puis reformulation de l'histoire complète.",
      },
      {
        title: "Fiche Partie 5.2 — Réagir en lecteur",
        duration: "10 min",
        detail:
          "Comparer sa proposition à la chute, nommer l'émotion ressentie et expliquer pourquoi. Exprimer son avis sur le texte et dessiner son passage préféré.",
      },
    ],
    material: ["Tapuscrit « Soupçon » (chute non dévoilée au préalable)", "Banque de mots et connecteurs"],
    photocopies: [
      "Fiche Partie 5.1 — Imaginer la fin : 1 par élève",
      "Fiche Partie 5.2 — Réagir en lecteur : 1 par élève",
    ],
    vocabulary: ["dévorer", "atroce", "épouvanté", "soulagé", "anéanti"],
  },
];
