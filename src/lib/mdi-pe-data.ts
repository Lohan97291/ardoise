/**
 * Données MDI — Production d'écrit CE1 (Cycle 2)
 * Fiches de préparation basées sur le guide de l'enseignant MDI 1-2-3 parcours,
 * Éditions MDI, 2024. 23 chapitres répartis sur 5 périodes.
 *
 * Domaine : "pe" (Production d'écrit)
 */

import type { PrepSheet } from "@/lib/ardoise-data";
import type { CatalogEntry } from "@/lib/ardoise-eval";

// ─────────────────────────────────────────────────────────────────────────────
// Catalogue MDI Production d'écrit — 23 chapitres × 5 périodes
// ─────────────────────────────────────────────────────────────────────────────

export const MDI_PE_CATALOG: CatalogEntry[] = [
  // ── Période 1 ─────────────────────────────────────────────────────────────
  { id: "pe-ch1",  title: "Introduction à la production d'écrits",          domain: "pe", period: 1 },
  { id: "pe-ch2",  title: "Le nom du personnage : qui ?",                   domain: "pe", period: 1 },
  { id: "pe-ch3",  title: "Le personnage et son action : quoi ? (1)",       domain: "pe", period: 1 },
  { id: "pe-ch4",  title: "Le personnage et son action : quoi ? (2)",       domain: "pe", period: 1 },
  { id: "pe-ch5",  title: "Le personnage et son action : quoi ? (3)",       domain: "pe", period: 1 },
  // ── Période 2 ─────────────────────────────────────────────────────────────
  { id: "pe-ch6",  title: "La description du personnage",                   domain: "pe", period: 2 },
  { id: "pe-ch7",  title: "Le nombre de personnages",                       domain: "pe", period: 2 },
  { id: "pe-ch8",  title: "Le lieu de l'action : où ? (1)",                domain: "pe", period: 2 },
  { id: "pe-ch9",  title: "Le lieu de l'action : où ? (2)",                domain: "pe", period: 2 },
  { id: "pe-ch10", title: "Le moment de l'action : quand ?",               domain: "pe", period: 2 },
  // ── Période 3 ─────────────────────────────────────────────────────────────
  { id: "pe-ch11", title: "L'énumération",                                  domain: "pe", period: 3 },
  { id: "pe-ch12", title: "Le but de l'action : pourquoi ?",               domain: "pe", period: 3 },
  { id: "pe-ch13", title: "La manière dont se fait l'action : comment ?",  domain: "pe", period: 3 },
  { id: "pe-ch14", title: "La question",                                    domain: "pe", period: 3 },
  // ── Période 4 ─────────────────────────────────────────────────────────────
  { id: "pe-ch15", title: "La négation",                                    domain: "pe", period: 4 },
  { id: "pe-ch16", title: "Les mots pour éviter les répétitions",          domain: "pe", period: 4 },
  { id: "pe-ch17", title: "Le texte : début, milieu et fin",               domain: "pe", period: 4 },
  { id: "pe-ch18", title: "Les connecteurs",                                domain: "pe", period: 4 },
  // ── Période 5 ─────────────────────────────────────────────────────────────
  { id: "pe-ch19", title: "La suite d'un texte",                           domain: "pe", period: 5 },
  { id: "pe-ch20", title: "Les paroles rapportées",                         domain: "pe", period: 5 },
  { id: "pe-ch21", title: "Le dialogue",                                    domain: "pe", period: 5 },
  { id: "pe-ch22", title: "Écrire une histoire à partir d'une image",      domain: "pe", period: 5 },
  { id: "pe-ch23", title: "Écrire un récit merveilleux",                   domain: "pe", period: 5 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Fiches de préparation détaillées
// ─────────────────────────────────────────────────────────────────────────────

export const MDI_PE_PREP_SHEETS: PrepSheet[] = [
  // ── Ch1 ───────────────────────────────────────────────────────────────────
  {
    id: "pe-ch1",
    title: "Introduction à la production d'écrits",
    subject: "francais",
    objective:
      "Découvrir le dispositif MDI Production d'écrit : la carte mentale de référence, le carnet de vocabulaire et les trois parcours différenciés. Comprendre que bien écrire, c'est répondre à des questions (qui ? quoi ? où ? quand ? comment ? pourquoi ?).",
    competence:
      "Écrire des textes en commençant à s'approprier une démarche : recueil d'idées, mise en mots à l'écrit (CP-CE1).",
    duration: "1 × 40 min",
    phases: [
      {
        title: "Présentation du dispositif",
        detail:
          "Projeter la carte mentale de référence au tableau. Présenter chaque question (Qui ? Quoi ? Où ? Quand ? Comment ? Pourquoi ?) comme un outil pour enrichir une phrase ou un texte. Expliquer aux élèves qu'à chaque séance ils auront un carnet de vocabulaire pour les aider. Montrer comment noter une première phrase simple au tableau (ex. : « Le chat mange. ») et comment la rendre plus précise grâce aux questions : « Le petit chat noir mange avidement dans la cuisine. »",
      },
      {
        title: "Mise en route : écrire une première phrase",
        detail:
          "Observer collectivement l'image de la leçon 1. Demander aux élèves : « Que voyez-vous sur cette image ? » Recueillir les propositions à l'oral, puis demander à un élève de les noter sur l'ardoise en formant une phrase complète. Valider : majuscule, verbe, ponctuation. Distribuer la fiche élève du chapitre 1 et laisser les élèves écrire une à deux phrases à partir de l'image, selon leur parcours.",
        differentiation:
          "Parcours 1 : compléter une phrase à trou. Parcours 2 : recopier un modèle puis compléter. Parcours 3 : écrire librement deux phrases.",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence (affiche)", "Ardoises"],
    photocopies: ["Carte mentale individuelle élève", "Fiche élève chapitre 1"],
  },

  // ── Ch2 ───────────────────────────────────────────────────────────────────
  {
    id: "pe-ch2",
    title: "Le nom du personnage : qui ?",
    subject: "francais",
    objective:
      "Nommer précisément un personnage en utilisant son prénom, son métier ou sa relation familiale. Comprendre que désigner le personnage avec exactitude est la première étape pour écrire une phrase.",
    competence:
      "Écrire des phrases simples en nommant le personnage ; enrichir le groupe nominal sujet.",
    duration: "2 × 40 min",
    phases: [
      {
        title: "Séance 1 — Phase orale : nommer les personnages",
        detail:
          "Projeter l'image de la leçon 2 au tableau. Demander aux élèves : « Qui sont les personnages sur cette image ? Comment pouvez-vous les nommer avec précision ? » Recueillir les propositions : prénom, métier (le pompier, la boulangère), relation (la maman, le petit garçon). Expliquer qu'en production d'écrit, on évite de dire simplement « il » ou « elle » et qu'il faut nommer clairement le personnage. Coller et lire collectivement la fiche de vocabulaire 2 (les métiers). Projeter la carte mentale de référence, sélectionner « Qui ? ».",
      },
      {
        title: "Séance 1 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent les exercices 1 et 2 en s'aidant de leur carnet de vocabulaire et de la carte mentale. Ex. 1 : relier des personnages à leur métier (images). Ex. 2 : compléter des phrases en choisissant le bon nom de personnage.",
        differentiation:
          "Parcours 1 : relier 4 personnages à leur métier (images). Parcours 2 : recopier et compléter 3 phrases avec le bon personnage. Parcours 3 : écrire 4 phrases en nommant différents personnages.",
      },
      {
        title: "Séance 2 — Rappel et approfondissement",
        detail:
          "Rappeler ce qui a été vu en séance 1 : nommer le personnage avec son métier ou son prénom. Proposer une phrase modèle au tableau (ex. : « La vétérinaire soigne les animaux. »). Demander aux élèves de réécrire la phrase en changeant le personnage. Faire sortir le carnet de vocabulaire et relire les métiers.",
      },
      {
        title: "Séance 2 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 3 en s'aidant du carnet et de la carte mentale. Correction possible du premier jet si besoin (essai 1 / essai 2).",
        differentiation:
          "Parcours 1 : compléter 5 phrases avec le bon personnage. Parcours 2 : écrire 3 phrases en nommant le personnage par son métier. Parcours 3 : écrire 4 phrases variées en précisant le personnage.",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence", "Ardoises", "Carnet de vocabulaire"],
    photocopies: ["Fiche vocabulaire 2 — Les métiers", "Fiche élève chapitre 2 (3 parcours)"],
  },

  // ── Ch3 ───────────────────────────────────────────────────────────────────
  {
    id: "pe-ch3",
    title: "Le personnage et son action : quoi ? (1)",
    subject: "francais",
    objective:
      "Écrire une phrase en décrivant précisément l'action du personnage à l'aide d'un verbe exact. Distinguer des verbes génériques (faire) des verbes précis (découper, souligner, colorier).",
    competence:
      "Écrire des phrases simples en nommant le personnage et en décrivant son action ; choisir un vocabulaire précis.",
    duration: "2 × 40 min",
    phases: [
      {
        title: "Séance 1 — Phase orale : identifier les actions",
        detail:
          "Projeter l'image de la leçon 3 au tableau (élèves en classe). Demander : « Que font les personnages sur cette image ? » Veiller à ce que les élèves formulent des phrases précises : « L'élève dessine. » plutôt que « Il fait un dessin. » Chercher collectivement d'autres actions de la classe : écrire, découper, coller, souligner, barrer, cocher, relier, surligner. Insister sur la distinction entre verbes proches : « colorier » (remplir une surface) vs « dessiner » (réaliser un tracé). Coller et lire la fiche de vocabulaire 3 : les consignes à l'école.",
      },
      {
        title: "Séance 1 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent les exercices 1 et 2 en s'aidant du carnet et de la carte mentale. Expliquer comment compléter une grille de mots fléchés (sens de l'écriture, lettres capitales, une lettre par case).",
        differentiation:
          "Parcours 1 : reconnaître 4 consignes scolaires illustrées ; compléter 4 phrases avec le bon verbe. Parcours 2 : reconnaître 6 consignes ; recopier et compléter 2 phrases modèle en cursive. Parcours 3 : reconnaître 6 consignes d'après leur définition ; recopier 2 phrases modèle en script.",
      },
      {
        title: "Séance 2 — Rappel et phrase modèle",
        detail:
          "Rappeler les verbes d'action vus en séance 1. Écrire au tableau une phrase modèle (ex. : « En classe, j'aime travailler. ») et demander aux élèves de la réécrire en modifiant le verbe souligné, en s'aidant du carnet de vocabulaire.",
      },
      {
        title: "Séance 2 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 3. Correction possible du premier jet si nécessaire.",
        differentiation:
          "Parcours 1 : compléter 5 phrases avec le bon verbe. Parcours 2 : compléter 8 phrases avec un verbe. Parcours 3 : écrire 4 phrases en utilisant un verbe d'action.",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence", "Ardoises", "Carnet de vocabulaire"],
    photocopies: ["Fiche vocabulaire 3 — Les consignes à l'école", "Fiche élève chapitre 3 (3 parcours)"],
  },

  // ── Ch4 ───────────────────────────────────────────────────────────────────
  {
    id: "pe-ch4",
    title: "Le personnage et son action : quoi ? (2)",
    subject: "francais",
    objective:
      "Enrichir le répertoire de verbes d'action en travaillant les verbes de déplacement et de mouvement (synonymes de « aller » et « courir »). Apprendre à varier les verbes pour rendre ses phrases plus précises.",
    competence:
      "Écrire des phrases en choisissant un verbe d'action précis ; enrichir son vocabulaire verbal.",
    duration: "2 × 40 min",
    phases: [
      {
        title: "Séance 1 — Phase orale : les verbes de déplacement",
        detail:
          "Projeter l'image de la leçon 4 au tableau. Demander : « Comment se déplacent les personnages ? » Si un élève dit « courir », expliciter : « Pour décrire un mouvement, on peut dire courir, mais aussi trottiner, galoper, sprinter, foncer… » Recueillir les propositions des élèves. Écrire au tableau des synonymes du verbe « aller » et expliquer leurs nuances. Coller et lire la fiche de vocabulaire 4 : les verbes de déplacement.",
      },
      {
        title: "Séance 1 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent les exercices 1 et 2.",
        differentiation:
          "Parcours 1 : relier 5 synonymes du verbe « aller » à leur définition ; compléter 4 phrases avec le bon verbe. Parcours 2 : relier 6 synonymes à leur définition ; compléter 4 phrases avec le bon verbe. Parcours 3 : écrire 6 verbes d'après leur définition ; réécrire 3 phrases avec le bon verbe.",
      },
      {
        title: "Séance 2 — Rappel et écriture autonome",
        detail:
          "Rappeler les verbes de déplacement vus en séance 1. Faire sortir le carnet de vocabulaire et relire les verbes. Proposer une image aux élèves et leur demander d'écrire des phrases en variant les verbes de déplacement.",
      },
      {
        title: "Séance 2 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 3. Correction possible du premier jet si nécessaire.",
        differentiation:
          "Parcours 1 : compléter 5 phrases avec le bon verbe. Parcours 2 : recopier et compléter 3 phrases dans le bon ordre. Parcours 3 : écrire 4 phrases en nommant le personnage et son action.",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence", "Ardoises", "Carnet de vocabulaire"],
    photocopies: ["Fiche vocabulaire 4 — Les verbes de déplacement", "Fiche élève chapitre 4 (3 parcours)"],
  },

  // ── Ch5 ───────────────────────────────────────────────────────────────────
  {
    id: "pe-ch5",
    title: "Le personnage et son action : quoi ? (3)",
    subject: "francais",
    objective:
      "Enrichir la description du personnage avec des adjectifs qualificatifs (physiques et d'émotions). Découvrir les six émotions de base : joie, tristesse, colère, surprise, peur, dégoût.",
    competence:
      "Écrire des phrases en enrichissant le groupe nominal avec des adjectifs qualificatifs ; exprimer des émotions à l'écrit.",
    duration: "2 × 40 min",
    phases: [
      {
        title: "Séance 1 — Phase orale : les adjectifs et les émotions",
        detail:
          "Projeter l'image de la leçon 6 au tableau (entraîneur et équipe). Demander : « Comment pourrait-on décrire précisément ces personnages ? » Recueillir d'abord des descriptions physiques (grand, musclé, les cheveux gris…), puis faire remarquer que les adjectifs permettent d'apporter des précisions sur les noms. Les souligner au tableau. Demander ensuite : « Quelle émotion peuvent ressentir ces personnages ? » et faire écrire sur ardoise : heureux, triste, en colère… Présenter les six émotions de base. Note : la notion d'adjectif n'est peut-être pas encore formellement connue — préciser aux élèves qu'elle fera l'objet d'une leçon ultérieure. Coller et lire la fiche de vocabulaire 6 : la description physique (colorier les couleurs de cheveux). Projeter la carte mentale, sélectionner « Qui ? ».",
      },
      {
        title: "Séance 1 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent les exercices 1 et 2.",
        differentiation:
          "Parcours 1 : relier 6 adjectifs à leur image ; compléter 4 phrases avec la bonne émotion. Parcours 2 : écrire des adjectifs pour décrire une personne ; recopier et compléter 4 phrases. Parcours 3 : écrire des noms et des adjectifs pour décrire une personne ; écrire 4 phrases sur les émotions.",
      },
      {
        title: "Séance 2 — Rappel et écriture avec adjectifs",
        detail:
          "Projeter la carte mentale et rappeler les adjectifs qui décrivent l'apparence du personnage. Faire relire le carnet de vocabulaire. Proposer une phrase modèle et inviter les élèves à l'enrichir avec des adjectifs.",
      },
      {
        title: "Séance 2 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 3. Correction possible du premier jet si nécessaire.",
        differentiation:
          "Parcours 1 : écrire 2 phrases avec des adjectifs. Parcours 2 : écrire 3 phrases avec des adjectifs. Parcours 3 : écrire 4 phrases avec des adjectifs.",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence", "Ardoises", "Carnet de vocabulaire"],
    photocopies: ["Fiche vocabulaire 6 — La description physique et les émotions", "Fiche élève chapitre 5 (3 parcours)"],
  },

  // ── Ch6 ───────────────────────────────────────────────────────────────────
  {
    id: "pe-ch6",
    title: "La description du personnage",
    subject: "francais",
    objective:
      "Consolider la description physique du personnage avec un vocabulaire riche et précis. Écrire des phrases qui intègrent plusieurs informations sur le personnage (apparence et émotion).",
    competence:
      "Enrichir le groupe nominal avec des adjectifs de description physique et d'émotion ; écrire des phrases complètes et détaillées.",
    duration: "2 × 40 min",
    phases: [
      {
        title: "Séance 1 — Phase orale : décrire un personnage en détail",
        detail:
          "Observer collectivement une image représentant plusieurs personnages. Demander aux élèves de décrire un personnage à l'oral de façon très précise (taille, corpulence, couleur des cheveux, vêtements, émotion). Recenser au tableau les adjectifs utilisés. Rappeler les 6 émotions. Proposer un modèle de description structurée : « [Prénom/métier] est [adjectif physique]. Il/Elle semble [émotion]. »",
      },
      {
        title: "Séance 1 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent les exercices 1 et 2.",
        differentiation:
          "Parcours 1 : recopier 4 mots d'après leur définition ; compléter 4 phrases avec le bon verbe. Parcours 2 : recopier 4 mots d'après leur définition ; recopier et compléter 3 phrases. Parcours 3 : écrire 6 mots d'après leur définition ; écrire 2 phrases en variant la description.",
      },
      {
        title: "Séance 2 — Rappel et écriture libre",
        detail:
          "Rappeler le vocabulaire de la description physique vu en séance 1. Faire relire le carnet. Inviter les élèves à inventer un personnage et à le décrire à l'écrit en plusieurs phrases.",
      },
      {
        title: "Séance 2 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 3. Correction possible du premier jet si nécessaire.",
        differentiation:
          "Parcours 1 : écrire 2 phrases de description. Parcours 2 : écrire 3 phrases variées. Parcours 3 : écrire 4 phrases en combinant description physique et émotion.",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence", "Ardoises", "Carnet de vocabulaire"],
    photocopies: ["Fiche vocabulaire — Description physique complète", "Fiche élève chapitre 6 (3 parcours)"],
  },

  // ── Ch7 ───────────────────────────────────────────────────────────────────
  {
    id: "pe-ch7",
    title: "Le nombre de personnages",
    subject: "francais",
    objective:
      "Apprendre à faire varier le nombre de personnages dans une phrase et à accorder le verbe en conséquence (singulier / pluriel). Comprendre l'accord sujet-verbe comme outil au service de l'écriture.",
    competence:
      "Écrire des phrases en faisant l'accord sujet-verbe au singulier et au pluriel.",
    duration: "2 × 40 min",
    phases: [
      {
        title: "Séance 1 — Phase orale : un ou plusieurs personnages",
        detail:
          "Observer une image avec plusieurs personnages. Écrire au tableau une phrase au singulier (ex. : « Le chat dort sur le coussin. ») puis demander aux élèves comment transformer cette phrase pour parler de deux chats. Faire observer les modifications : le nom prend un s, le verbe change. Insister : pour accorder le verbe, on cherche d'abord le sujet. Coller et lire la fiche de vocabulaire correspondante.",
      },
      {
        title: "Séance 1 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent les exercices 1 et 2.",
        differentiation:
          "Parcours 1 : recopier 4 mots d'après leur définition ; compléter 4 phrases selon le nombre de personnages. Parcours 2 : recopier 4 mots ; recopier et compléter 3 phrases. Parcours 3 : écrire 6 mots ; écrire 2 phrases en variant le nombre et en accordant le verbe.",
      },
      {
        title: "Séance 2 — Rappel et variation singulier/pluriel",
        detail:
          "Rappeler les règles d'accord sujet-verbe. Proposer des phrases orales et demander aux élèves de les transformer (singulier → pluriel et inversement) sur l'ardoise.",
      },
      {
        title: "Séance 2 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 3. Correction possible du premier jet si nécessaire.",
        differentiation:
          "Parcours 1 : écrire 2 phrases en faisant varier le nombre. Parcours 2 : écrire 3 phrases. Parcours 3 : écrire 4 phrases en faisant varier nombre et accord.",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence", "Ardoises", "Carnet de vocabulaire"],
    photocopies: ["Fiche vocabulaire — Nombre de personnages", "Fiche élève chapitre 7 (3 parcours)"],
  },

  // ── Ch8 ───────────────────────────────────────────────────────────────────
  {
    id: "pe-ch8",
    title: "Le lieu de l'action : où ? (1)",
    subject: "francais",
    objective:
      "Préciser le lieu de l'action dans une phrase avec des compléments de lieu (à la maison, dans le parc, sur la plage…). Comprendre que le lieu enrichit la phrase sans en changer le sens essentiel.",
    competence:
      "Écrire des phrases en précisant le lieu de l'action ; utiliser des compléments circonstanciels de lieu.",
    duration: "2 × 40 min",
    phases: [
      {
        title: "Séance 1 — Phase orale : identifier le lieu",
        detail:
          "Projeter l'image de la leçon 8 au tableau. Demander : « Où se passe l'action ? » Faire observer qu'un même événement peut se passer dans des endroits différents. Écrire au tableau une phrase simple (ex. : « Le chien dort. ») puis l'enrichir avec des indications de lieu variées. Préciser que le lieu n'est pas obligatoire mais qu'il apporte une information importante au lecteur. Coller et lire la fiche de vocabulaire 8 : les lieux.",
      },
      {
        title: "Séance 1 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent les exercices 1 et 2.",
        differentiation:
          "Parcours 1 : reconnaître 5 indications de lieu (images) ; compléter 2 phrases avec une indication de lieu. Parcours 2 : compléter 4 phrases avec la bonne indication de lieu. Parcours 3 : écrire 4 phrases avec des indications de lieu variées.",
      },
      {
        title: "Séance 2 — Rappel et transfert",
        detail:
          "Rappeler les indications de lieu vues en séance 1. Faire relire le carnet. Proposer une image et demander aux élèves d'écrire une phrase en précisant le lieu. Faire remarquer qu'on peut placer le lieu en début ou en fin de phrase.",
      },
      {
        title: "Séance 2 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 3. Correction possible du premier jet si nécessaire.",
        differentiation:
          "Parcours 1 : écrire 2 phrases en utilisant des indications de lieu. Parcours 2 : écrire 3 phrases. Parcours 3 : écrire 4 phrases en précisant le lieu.",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence", "Ardoises", "Carnet de vocabulaire"],
    photocopies: ["Fiche vocabulaire 8 — Les lieux (intérieur/extérieur)", "Fiche élève chapitre 8 (3 parcours)"],
  },

  // ── Ch9 ───────────────────────────────────────────────────────────────────
  {
    id: "pe-ch9",
    title: "Le lieu de l'action : où ? (2)",
    subject: "francais",
    objective:
      "Enrichir le vocabulaire des lieux en travaillant sur des environnements urbains et naturels (en ville, à la campagne, en forêt, au bord de la mer…). Préciser le lieu avec des prépositions variées.",
    competence:
      "Écrire des phrases en précisant le lieu avec un vocabulaire varié ; utiliser des prépositions de lieu correctement.",
    duration: "2 × 40 min",
    phases: [
      {
        title: "Séance 1 — Phase orale : les lieux de la ville et de la nature",
        detail:
          "Projeter l'image de la leçon 9. Demander : « Où se trouve ce personnage ? » Si un élève dit « en ville », valider et préciser que c'est le lieu de manière générale. Distinguer les lieux précis dans la ville (devant la boulangerie, près du parc, dans la rue…) des lieux généraux. Travailler les prépositions (à, dans, sur, sous, près de, devant, derrière). Coller et lire la fiche de vocabulaire 9 : les lieux de la ville.",
      },
      {
        title: "Séance 1 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent les exercices 1 et 2.",
        differentiation:
          "Parcours 1 : relier 5 lieux à leur activité ; compléter 5 phrases avec le bon lieu. Parcours 2 : écrire 4 lieux d'après leur définition ; recopier et compléter 3 phrases. Parcours 3 : écrire 6 lieux d'après leur définition ; réécrire 3 phrases en modifiant le lieu.",
      },
      {
        title: "Séance 2 — Rappel et écriture",
        detail:
          "Rappeler les lieux et prépositions vus en séance 1. Faire relire le carnet de vocabulaire. Proposer une phrase à enrichir collectivement avec un lieu précis.",
      },
      {
        title: "Séance 2 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 3. Correction possible du premier jet si nécessaire.",
        differentiation:
          "Parcours 1 : écrire 3 phrases en précisant le lieu. Parcours 2 : écrire 4 phrases. Parcours 3 : écrire 5 phrases en précisant le lieu avec des prépositions variées.",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence", "Ardoises", "Carnet de vocabulaire"],
    photocopies: ["Fiche vocabulaire 9 — Les lieux de la ville", "Fiche élève chapitre 9 (3 parcours)"],
  },

  // ── Ch10 ──────────────────────────────────────────────────────────────────
  {
    id: "pe-ch10",
    title: "Le moment de l'action : quand ?",
    subject: "francais",
    objective:
      "Préciser le moment de l'action dans une phrase avec des indicateurs de temps (moments de la journée, jours de la semaine, saisons, dates). Apprendre à situer l'action dans le temps pour le lecteur.",
    competence:
      "Écrire des phrases en précisant le moment de l'action ; utiliser des compléments circonstanciels de temps.",
    duration: "2 × 40 min",
    phases: [
      {
        title: "Séance 1 — Phase orale : situer l'action dans le temps",
        detail:
          "Projeter une image avec une indication temporelle visible (le lever du soleil, une scène nocturne, une fête). Demander : « Quand se passe cette scène ? Comment le sait-on ? » Recueillir les propositions et les noter au tableau : le matin, à midi, le soir, la nuit, au printemps, en été, le lundi, le 25 décembre... Expliquer qu'on peut placer l'indicateur de temps en début ou en fin de phrase. Coller et lire la fiche de vocabulaire 10 : le temps (moments, jours, mois, saisons).",
      },
      {
        title: "Séance 1 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent les exercices 1 et 2.",
        differentiation:
          "Parcours 1 : relier des images à leur moment de la journée ; compléter 3 phrases avec le bon indicateur de temps. Parcours 2 : écrire 3 indicateurs de temps d'après des images ; recopier et compléter 4 phrases. Parcours 3 : écrire 4 phrases en précisant le moment avec un indicateur de temps varié.",
      },
      {
        title: "Séance 2 — Rappel et écriture en contexte",
        detail:
          "Rappeler les indicateurs de temps vus en séance 1. Faire relire le carnet. Proposer une image et demander d'écrire une phrase en situant l'action dans le temps. Faire varier la position du complément de temps dans la phrase.",
      },
      {
        title: "Séance 2 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 3. Correction possible du premier jet si nécessaire.",
        differentiation:
          "Parcours 1 : écrire 3 phrases en précisant le moment. Parcours 2 : écrire 4 phrases. Parcours 3 : écrire 5 phrases avec des indicateurs de temps variés.",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence", "Ardoises", "Carnet de vocabulaire"],
    photocopies: ["Fiche vocabulaire 10 — Le temps (moments, jours, saisons)", "Fiche élève chapitre 10 (3 parcours)"],
  },

  // ── Ch11 ──────────────────────────────────────────────────────────────────
  {
    id: "pe-ch11",
    title: "L'énumération",
    subject: "francais",
    objective:
      "Utiliser l'énumération pour lister des éléments dans une phrase : séparer les éléments par des virgules et placer la conjonction « et » avant le dernier. Comprendre que l'énumération peut figurer en début ou en fin de phrase.",
    competence:
      "Écrire des phrases avec une énumération en utilisant correctement la virgule et la conjonction de coordination « et ».",
    duration: "2 × 40 min",
    phases: [
      {
        title: "Séance 1 — Phase orale : découvrir l'énumération",
        detail:
          "Écrire une phrase d'exemple au tableau : « Mes couleurs préférées sont le rouge, le bleu et le vert. » Demander : « Qu'est-ce qu'une énumération ? À quoi peut-on la reconnaître ? » Les élèves de CE1 ne sauront peut-être pas répondre — montrer les mots séparés par une virgule. Expliquer que l'énumération permet de lister un à un les éléments d'un tout (noms ou groupes nominaux). Chaque élément est séparé par une virgule et le dernier est précédé de « et ». Rappeler comment écrire la virgule. Faire observer qu'on peut aussi placer l'énumération en début de phrase (Le rouge, le bleu et le vert sont mes couleurs préférées). Projeter l'image de la leçon 11 (supermarché / caddie). Demander : « Choisissez un personnage et énumérez ce qu'il a mis dans son caddie. » Travailler sur ardoise ; corriger les erreurs d'ordre et de virgule. Coller et lire la fiche de vocabulaire 11 : la nourriture.",
      },
      {
        title: "Séance 1 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent les exercices 1 et 2.",
        differentiation:
          "Parcours 1 : écrire une liste en énumérant chaque aliment ; réécrire 3 phrases en énumérant 3 aliments. Parcours 2 : écrire une phrase en énumérant chaque aliment ; écrire 4 phrases en énumérant 4 aliments. Parcours 3 : écrire une phrase d'énumération ; répondre à 4 questions en faisant une énumération.",
      },
      {
        title: "Séance 2 — Rappel et écriture avec énumération",
        detail:
          "Projeter la carte mentale au tableau et rappeler ce qui a été travaillé en séance 1 : écrire une énumération avec la virgule et « et » en fin d'énumération. Travailler quelques exemples oraux : « Qu'est-ce que tu portes comme vêtements aujourd'hui ? » Faire sortir le carnet et relire les mots de la nourriture.",
      },
      {
        title: "Séance 2 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 3. Correction possible du premier jet si nécessaire.",
        differentiation:
          "Parcours 1 : écrire 3 phrases en faisant une énumération. Parcours 2 : écrire 4 phrases avec des énumérations. Parcours 3 : écrire 5 phrases en faisant des énumérations variées.",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence", "Ardoises", "Carnet de vocabulaire"],
    photocopies: ["Fiche vocabulaire 11 — La nourriture", "Fiche élève chapitre 11 (3 parcours)"],
  },

  // ── Ch12 ──────────────────────────────────────────────────────────────────
  {
    id: "pe-ch12",
    title: "Le but de l'action : pourquoi ?",
    subject: "francais",
    objective:
      "Exprimer le but d'une action à l'aide de « pour + infinitif » ou de « parce que + raison ». Apprendre à distinguer la cause (pourquoi ?) du but (pour quoi ?).",
    competence:
      "Écrire des phrases en exprimant le but ou la cause d'une action ; utiliser des connecteurs logiques simples.",
    duration: "2 × 40 min",
    phases: [
      {
        title: "Séance 1 — Phase orale : exprimer le but",
        detail:
          "Écrire au tableau : « Le chat sort de la maison. » Demander : « Pourquoi sort-il ? » Recueillir les propositions et les structurer : « pour attraper une souris » (but) / « parce qu'il a faim » (cause). Faire observer la différence entre ces deux façons de répondre. Travailler d'autres exemples tirés de la vie de classe. Coller et lire la fiche de vocabulaire 12 : le but et la cause.",
      },
      {
        title: "Séance 1 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent les exercices 1 et 2.",
        differentiation:
          "Parcours 1 : réécrire 4 mots d'après leur définition ; associer 4 phrases avec l'action et son but. Parcours 2 : écrire 4 mots d'après leur définition ; compléter 4 phrases avec le but correspondant. Parcours 3 : compléter 4 phrases avec la bonne définition ; compléter 4 phrases avec le but.",
      },
      {
        title: "Séance 2 — Rappel et écriture autonome",
        detail:
          "Rappeler la distinction but/cause. Faire relire le carnet de vocabulaire. Proposer une image et demander aux élèves d'écrire une phrase qui précise le but ou la cause de l'action.",
      },
      {
        title: "Séance 2 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 3. Correction possible du premier jet si nécessaire.",
        differentiation:
          "Parcours 1 : écrire 4 phrases en précisant le but de l'action. Parcours 2 : écrire 5 phrases. Parcours 3 : écrire 6 phrases en précisant le but de l'action.",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence", "Ardoises", "Carnet de vocabulaire"],
    photocopies: ["Fiche vocabulaire 12 — Le but et la cause", "Fiche élève chapitre 12 (3 parcours)"],
  },

  // ── Ch13 ──────────────────────────────────────────────────────────────────
  {
    id: "pe-ch13",
    title: "La manière dont se fait l'action : comment ?",
    subject: "francais",
    objective:
      "Enrichir une phrase avec des adverbes de manière pour préciser comment se fait l'action (lentement, rapidement, doucement, avec soin…). Apprendre à former des adverbes à partir d'adjectifs (gentil → gentiment).",
    competence:
      "Écrire des phrases enrichies d'adverbes de manière ; former des adverbes en -ment à partir d'adjectifs qualificatifs.",
    duration: "2 × 40 min",
    phases: [
      {
        title: "Séance 1 — Phase orale : les adverbes de manière",
        detail:
          "Écrire au tableau : « Le chat marche. » Demander : « Comment marche-t-il ? » Recueillir les propositions (silencieusement, lentement, rapidement, avec précaution…). Faire observer qu'on forme souvent un adverbe en ajoutant -ment à un adjectif féminin : douce → doucement, lente → lentement, rapide → rapidement. Travailler quelques exemples collectivement. Coller et lire la fiche de vocabulaire 13 : les adverbes de manière.",
      },
      {
        title: "Séance 1 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent les exercices 1 et 2.",
        differentiation:
          "Parcours 1 : retrouver 7 adverbes (mots mêlés) ; écrire 4 phrases en précisant la manière. Parcours 2 : retrouver 7 adverbes d'après leur adjectif ; réécrire un texte en ajoutant 4 adverbes. Parcours 3 : retrouver des adverbes ; réécrire un texte en ajoutant 4 adverbes.",
      },
      {
        title: "Séance 2 — Rappel et intégration dans des textes",
        detail:
          "Rappeler la formation des adverbes en -ment. Faire relire le carnet. Proposer un court texte au tableau et inviter les élèves à l'enrichir en ajoutant des adverbes de manière.",
      },
      {
        title: "Séance 2 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 3. Correction possible du premier jet si nécessaire.",
        differentiation:
          "Parcours 1 : écrire 4 phrases en précisant la manière. Parcours 2 : écrire 6 phrases. Parcours 3 : écrire 6 phrases en précisant la manière dont se fait l'action.",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence", "Ardoises", "Carnet de vocabulaire"],
    photocopies: ["Fiche vocabulaire 13 — Les adverbes de manière", "Fiche élève chapitre 13 (3 parcours)"],
  },

  // ── Ch14 ──────────────────────────────────────────────────────────────────
  {
    id: "pe-ch14",
    title: "La question",
    subject: "francais",
    objective:
      "Écrire des phrases interrogatives correctes en utilisant les bons mots interrogatifs (qui, quoi, quand, où, comment, pourquoi, combien). Distinguer la phrase affirmative de la phrase interrogative et utiliser le bon signe de ponctuation.",
    competence:
      "Écrire des phrases interrogatives ; utiliser les mots interrogatifs et le point d'interrogation.",
    duration: "2 × 40 min",
    phases: [
      {
        title: "Séance 1 — Phase orale : la phrase interrogative",
        detail:
          "Écrire au tableau une phrase affirmative (ex. : « La fille mange une pomme. ») et sa version interrogative (« Que mange la fille ? »). Faire observer les différences : ordre des mots, mot interrogatif, point d'interrogation. Rappeler les mots interrogatifs de la carte mentale (Qui ? Quoi ? Quand ? Où ? Comment ? Pourquoi ?). Travailler collectivement sur ardoise : transformer des phrases affirmatives en questions. Coller et lire la fiche de vocabulaire 14 : les mots interrogatifs.",
      },
      {
        title: "Séance 1 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent les exercices 1 et 2.",
        differentiation:
          "Parcours 1 : écrire 4 mots interrogatifs d'après leur définition ; compléter une phrase avec le bon mot interrogatif. Parcours 2 : répondre à 3 questions avec la bonne définition ; réécrire 4 questions d'après la réponse donnée. Parcours 3 : écrire 4 questions d'après la réponse donnée.",
      },
      {
        title: "Séance 2 — Rappel et écriture de questions/réponses",
        detail:
          "Rappeler les mots interrogatifs et la ponctuation de la question. Faire relire le carnet. Proposer une image et inviter les élèves à écrire des questions sur ce qu'ils voient, puis à répondre à une de leurs questions.",
      },
      {
        title: "Séance 2 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 3. Correction possible du premier jet si nécessaire.",
        differentiation:
          "Parcours 1 : écrire 3 questions et dessiner la réponse à l'une d'elles. Parcours 2 : écrire 4 questions et dessiner/écrire la réponse. Parcours 3 : écrire 3 questions et 3 réponses possibles.",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence", "Ardoises", "Carnet de vocabulaire"],
    photocopies: ["Fiche vocabulaire 14 — Les mots interrogatifs", "Fiche élève chapitre 14 (3 parcours)"],
  },

  // ── Ch15 ──────────────────────────────────────────────────────────────────
  {
    id: "pe-ch15",
    title: "La négation",
    subject: "francais",
    objective:
      "Transformer une phrase affirmative en phrase négative en utilisant correctement les marqueurs de négation (ne…pas, ne…jamais, ne…plus, ne…rien). Comprendre que la négation change le sens de la phrase.",
    competence:
      "Écrire des phrases négatives en utilisant les marqueurs de négation ; transformer des phrases affirmatives en phrases négatives.",
    duration: "2 × 40 min",
    phases: [
      {
        title: "Séance 1 — Phase orale : la phrase négative",
        detail:
          "Projeter un texte au tableau (article de journal sur les tigresses — ex. du guide : tigresses arrivant dans un zoo refuge). Demander aux élèves de repérer les phrases négatives. Repérer et souligner les marqueurs ne…pas, ne…plus, ne…jamais. Écrire au tableau une phrase affirmative et sa version négative. Faire observer la position de ne et pas encadrant le verbe. Proposer d'autres exemples avec ne…jamais, ne…plus, ne…rien. Travailler sur ardoise : transformer 3 phrases.",
      },
      {
        title: "Séance 1 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent les exercices 1 et 2.",
        differentiation:
          "Parcours 1 : repérer la négation dans une phrase et la compléter ; transformer 3 phrases affirmatives en négatives. Parcours 2 : compléter 3 phrases en utilisant la négation ; transformer 4 phrases. Parcours 3 : répondre à 3 questions en utilisant la négation ; transformer 3 phrases.",
      },
      {
        title: "Séance 2 — Rappel et écriture avec négation",
        detail:
          "Rappeler les marqueurs de négation. Faire relire le carnet. Proposer une image et inviter les élèves à écrire des phrases qui décrivent ce qu'on ne voit PAS sur l'image (ce que le personnage ne fait pas, n'a pas…).",
      },
      {
        title: "Séance 2 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 3. Correction possible du premier jet si nécessaire.",
        differentiation:
          "Parcours 1 : écrire 4 phrases en utilisant la négation. Parcours 2 : écrire 5 phrases. Parcours 3 : écrire 6 phrases avec des marqueurs de négation variés.",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence", "Ardoises", "Carnet de vocabulaire"],
    photocopies: ["Fiche vocabulaire 15 — La négation", "Fiche élève chapitre 15 (3 parcours)", "Texte support (article journal — tigresses)"],
  },

  // ── Ch16 ──────────────────────────────────────────────────────────────────
  {
    id: "pe-ch16",
    title: "Les mots pour éviter les répétitions",
    subject: "francais",
    objective:
      "Apprendre à varier les reprises nominales et pronominales pour éviter les répétitions dans un texte (pronoms personnels : il, elle, ils, elles, on ; synonymes ; reprises nominales variées).",
    competence:
      "Écrire des textes en évitant les répétitions ; utiliser des pronoms de substitution et des synonymes.",
    duration: "2 × 40 min",
    phases: [
      {
        title: "Séance 1 — Phase orale : repérer les répétitions",
        detail:
          "Projeter un court texte volontairement répétitif au tableau (ex. : « Le chien court. Le chien aboie. Le chien saute. Le chien mange. »). Demander : « Qu'est-ce qui rend ce texte difficile à lire ? » Faire identifier les répétitions. Proposer des solutions : utiliser « il », « l'animal », « la bête »... Travailler collectivement à réécrire le texte. Coller et lire la fiche de vocabulaire 16 : les moyens de transport (pour les exercices de la fiche élève).",
      },
      {
        title: "Séance 1 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent les exercices 1 et 2.",
        differentiation:
          "Parcours 1 : compléter 4 phrases avec le bon moyen de transport ; réécrire un texte en évitant les répétitions. Parcours 2 : compléter 4 phrases avec un moyen de transport ; réécrire un texte. Parcours 3 : écrire 3 phrases avec le lexique des transports ; réécrire un texte en évitant les répétitions.",
      },
      {
        title: "Séance 2 — Rappel et réécriture",
        detail:
          "Rappeler les différentes façons d'éviter les répétitions. Faire relire le carnet. Proposer un texte répétitif plus long et travailler collectivement à le réécrire avant la phase individuelle.",
      },
      {
        title: "Séance 2 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 3. Correction possible du premier jet si nécessaire.",
        differentiation:
          "Parcours 1 : écrire 5 phrases en évitant les répétitions. Parcours 2 : écrire 6 phrases. Parcours 3 : écrire 7 phrases en évitant les répétitions.",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence", "Ardoises", "Carnet de vocabulaire"],
    photocopies: ["Fiche vocabulaire 16 — Les moyens de transport", "Fiche élève chapitre 16 (3 parcours)"],
  },

  // ── Ch17 ──────────────────────────────────────────────────────────────────
  {
    id: "pe-ch17",
    title: "Le texte : début, milieu et fin",
    subject: "francais",
    objective:
      "Comprendre la structure d'un texte narratif en trois parties (introduction, développement, conclusion) et écrire un texte cohérent à partir d'images séquentielles.",
    competence:
      "Écrire un texte organisé en distinguant le début, le milieu et la fin ; utiliser les images séquentielles comme support.",
    duration: "2 × 40 min",
    phases: [
      {
        title: "Séance 1 — Phase orale : les 3 parties d'un texte",
        detail:
          "Projeter deux courts textes au tableau. Demander aux élèves d'identifier le début (où ça commence, qui est là, le contexte), le milieu (ce qui se passe, l'événement principal) et la fin (comment ça se termine). Montrer des images séquentielles (ex. 3 images racontant une histoire) et faire ordonner les événements. Expliquer que chaque image correspond à une partie du texte. Coller et lire la fiche de vocabulaire 17 : la circulation en ville.",
      },
      {
        title: "Séance 1 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent les exercices 1 et 2.",
        differentiation:
          "Parcours 1 : compléter un texte avec 4 mots de la circulation ; retrouver l'ordre de 2 histoires en repérant les 3 parties. Parcours 2 : compléter 4 phrases avec le lexique de la ville ; retrouver l'ordre de 2 histoires. Parcours 3 : écrire 3 phrases avec le lexique ; retrouver l'ordre de 3 histoires.",
      },
      {
        title: "Séance 2 — Rappel et écriture d'un texte structuré",
        detail:
          "Rappeler la structure en 3 parties. Faire relire le carnet. Projeter 3 images séquentielles inédites. Travailler collectivement à décrire oralement chaque image. Puis inviter les élèves à écrire un texte complet.",
      },
      {
        title: "Séance 2 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 3. Correction possible du premier jet si nécessaire.",
        differentiation:
          "Parcours 1 : écrire un texte de 5 phrases à partir de 3 images. Parcours 2 : écrire un texte de 6 phrases. Parcours 3 : écrire un texte de 8 lignes à partir de 3 images séquentielles.",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence", "Ardoises", "Carnet de vocabulaire", "Images séquentielles (3 images)"],
    photocopies: ["Fiche vocabulaire 17 — La circulation en ville", "Fiche élève chapitre 17 (3 parcours)"],
  },

  // ── Ch18 ──────────────────────────────────────────────────────────────────
  {
    id: "pe-ch18",
    title: "Les connecteurs",
    subject: "francais",
    objective:
      "Utiliser des connecteurs temporels et logiques pour articuler les phrases d'un texte et le rendre cohérent (d'abord, ensuite, puis, enfin, alors, mais, parce que…).",
    competence:
      "Écrire des textes en utilisant des connecteurs pour organiser les idées et relier les phrases entre elles.",
    duration: "2 × 40 min",
    phases: [
      {
        title: "Séance 1 — Phase orale : repérer les connecteurs",
        detail:
          "Projeter un texte court au tableau (ex. : une recette ou une suite d'actions). Faire repérer les mots qui organisent le texte : d'abord, ensuite, puis, enfin, alors, mais, parce que… Faire observer que ces mots aident le lecteur à suivre l'ordre des événements. Coller et lire la fiche de vocabulaire 18 : les connecteurs. Catégoriser : connecteurs temporels (d'abord, ensuite…) / connecteurs logiques (mais, parce que…).",
      },
      {
        title: "Séance 1 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent les exercices 1 et 2.",
        differentiation:
          "Parcours 1 : choisir 5 connecteurs dans un texte ; écrire un texte de 3 phrases dans l'ordre en repérant les connecteurs. Parcours 2 : compléter un texte avec 4 connecteurs ; écrire un texte de 4 phrases dans l'ordre. Parcours 3 : compléter un texte avec un connecteur ; écrire un texte de 4 phrases dans l'ordre en ajoutant les connecteurs.",
      },
      {
        title: "Séance 2 — Rappel et écriture avec connecteurs",
        detail:
          "Rappeler les connecteurs vus en séance 1. Faire relire le carnet. Proposer des phrases mélangées à ordonner collectivement en utilisant les connecteurs comme indices.",
      },
      {
        title: "Séance 2 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 3. Correction possible du premier jet si nécessaire.",
        differentiation:
          "Parcours 1 : écrire un texte de 5 phrases avec des connecteurs. Parcours 2 : écrire un texte de 6 phrases. Parcours 3 : écrire un texte de 8 lignes avec des connecteurs variés.",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence", "Ardoises", "Carnet de vocabulaire"],
    photocopies: ["Fiche vocabulaire 18 — Les connecteurs", "Fiche élève chapitre 18 (3 parcours)"],
  },

  // ── Ch19 ──────────────────────────────────────────────────────────────────
  {
    id: "pe-ch19",
    title: "La suite d'un texte",
    subject: "francais",
    objective:
      "Lire un texte, en analyser les éléments (personnages, lieu, moment, situation de départ) et écrire une suite cohérente qui respecte le contexte établi.",
    competence:
      "Lire et comprendre un texte narratif pour en écrire une suite ; maintenir la cohérence (personnages, lieu, temps) dans la production.",
    duration: "2 × 40 min",
    phases: [
      {
        title: "Séance 1 — Phase orale : analyser un texte pour écrire sa suite",
        detail:
          "Projeter un texte court au tableau (amorce narrative). Lire collectivement. Demander : « Qui sont les personnages ? Où sommes-nous ? Quand se passe l'histoire ? Qu'est-il arrivé jusqu'ici ? » Recenser les informations au tableau sous forme d'un schéma (personnages / lieu / moment / situation). Demander oralement : « Et maintenant, que pourrait-il se passer ? » Recueillir plusieurs propositions. Coller et lire la fiche de vocabulaire 19 : le jardin.",
      },
      {
        title: "Séance 1 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent les exercices 1 et 2.",
        differentiation:
          "Parcours 1 : compléter un texte avec 4 mots du jardin ; repérer les éléments du texte et inventer 1 fin possible. Parcours 2 : compléter avec 5 mots du jardin ; repérer les éléments et inventer 2 fins possibles. Parcours 3 : repérer les éléments du texte et inventer 2 fins possibles.",
      },
      {
        title: "Séance 2 — Rappel et écriture de la suite",
        detail:
          "Rappeler les éléments du texte analysé en séance 1. Faire relire le carnet de vocabulaire. Choisir collectivement une piste de suite. Puis inviter les élèves à écrire leur propre suite de façon autonome.",
      },
      {
        title: "Séance 2 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 3. Correction possible du premier jet si nécessaire.",
        differentiation:
          "Parcours 1 : écrire la suite d'un texte (au moins 5 phrases). Parcours 2 : écrire la suite (au moins 6 phrases). Parcours 3 : écrire la suite (au moins 8 lignes).",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence", "Ardoises", "Carnet de vocabulaire", "Texte amorce"],
    photocopies: ["Fiche vocabulaire 19 — Le jardin", "Fiche élève chapitre 19 (3 parcours)"],
  },

  // ── Ch20 ──────────────────────────────────────────────────────────────────
  {
    id: "pe-ch20",
    title: "Les paroles rapportées",
    subject: "francais",
    objective:
      "Apprendre à rapporter les paroles des personnages dans un texte à l'aide de verbes introducteurs variés (dire, demander, murmurer, crier, répondre…) et de la ponctuation adaptée (guillemets, deux-points).",
    competence:
      "Écrire des textes intégrant les paroles des personnages avec les bons verbes introducteurs et la ponctuation qui convient.",
    duration: "2 × 40 min",
    phases: [
      {
        title: "Séance 1 — Phase orale : rapporter des paroles",
        detail:
          "Projeter un court texte narratif au tableau incluant des paroles de personnages. Faire repérer les paroles (entre guillemets ou après un tiret). Identifier les verbes qui introduisent les paroles : dire, demander. Expliquer qu'il en existe bien d'autres : répondre, murmurer, crier, chuchoter, s'exclamer… Travailler collectivement à remplacer « dit » par des verbes plus expressifs. Coller et lire la fiche de vocabulaire 20 : les verbes de parole.",
      },
      {
        title: "Séance 1 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent les exercices 1 et 2.",
        differentiation:
          "Parcours 1 : compléter un texte avec le bon verbe pour rapporter les paroles ; réécrire un texte en rapportant les paroles. Parcours 2 : compléter un texte avec des verbes de parole ; réécrire un texte. Parcours 3 : compléter avec des verbes expressifs ; réécrire un texte.",
      },
      {
        title: "Séance 2 — Rappel et écriture avec paroles",
        detail:
          "Rappeler les verbes introducteurs et la ponctuation des paroles. Faire relire le carnet. Proposer une image avec deux personnages et inviter les élèves à imaginer leur conversation.",
      },
      {
        title: "Séance 2 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 3. Correction possible du premier jet si nécessaire.",
        differentiation:
          "Parcours 1 : écrire un texte de 6 lignes avec des paroles rapportées. Parcours 2 : écrire un texte de 8 lignes. Parcours 3 : écrire un texte de 10 lignes environ en rapportant les paroles.",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence", "Ardoises", "Carnet de vocabulaire"],
    photocopies: ["Fiche vocabulaire 20 — Les verbes de parole", "Fiche élève chapitre 20 (3 parcours)"],
  },

  // ── Ch21 ──────────────────────────────────────────────────────────────────
  {
    id: "pe-ch21",
    title: "Le dialogue",
    subject: "francais",
    objective:
      "Écrire un dialogue en respectant sa mise en forme spécifique : guillemets, tirets, retour à la ligne, verbes introducteurs. Comprendre la différence entre le dialogue et les paroles rapportées indirectement.",
    competence:
      "Écrire un dialogue entre plusieurs personnages en respectant les conventions typographiques du dialogue.",
    duration: "2 × 40 min",
    phases: [
      {
        title: "Séance 1 — Phase orale : découvrir la mise en forme du dialogue",
        detail:
          "Projeter un dialogue au tableau. Faire observer : les tirets au début de chaque prise de parole, les guillemets pour ouvrir et fermer le dialogue, les retours à la ligne, les verbes introducteurs. Comparer avec les paroles rapportées du chapitre 20. Expliquer : un dialogue = les personnages s'expriment directement, en alternance. Travailler sur ardoise : écrire une réplique entre deux personnages avec la bonne mise en forme. Coller et lire la fiche de vocabulaire 21 (devinettes sur des animaux ou des lieux).",
      },
      {
        title: "Séance 1 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent les exercices 1 et 2.",
        differentiation:
          "Parcours 1 : trouver 4 noms à partir de devinettes ; recopier un texte en respectant la mise en forme du dialogue. Parcours 2 : trouver 4 noms ; recopier un texte en respectant la mise en forme. Parcours 3 : trouver plusieurs noms ; recopier un texte.",
      },
      {
        title: "Séance 2 — Rappel et écriture d'un dialogue",
        detail:
          "Rappeler les conventions du dialogue (tirets, guillemets, retour à la ligne). Faire relire le carnet. Proposer une situation de départ (deux personnages dans une situation donnée) et inviter les élèves à écrire leur dialogue.",
      },
      {
        title: "Séance 2 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 3. Correction possible du premier jet si nécessaire.",
        differentiation:
          "Parcours 1 : écrire un texte de 6 lignes incluant un dialogue. Parcours 2 : écrire un texte de 8 lignes. Parcours 3 : écrire un texte de 10 lignes incluant un dialogue.",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence", "Ardoises", "Carnet de vocabulaire"],
    photocopies: ["Fiche vocabulaire 21 — Devinettes (animaux/lieux)", "Fiche élève chapitre 21 (3 parcours)"],
  },

  // ── Ch22 ──────────────────────────────────────────────────────────────────
  {
    id: "pe-ch22",
    title: "Écrire une histoire à partir d'une image",
    subject: "francais",
    objective:
      "Mobiliser l'ensemble des acquis de l'année pour écrire un texte complet et cohérent à partir d'une image : nommer les personnages, décrire le lieu et le moment, raconter les actions, structurer en début/milieu/fin.",
    competence:
      "Écrire un texte narratif complet à partir d'une image en mobilisant tous les outils acquis durant l'année.",
    duration: "2 × 40 min",
    phases: [
      {
        title: "Séance 1 — Phase orale : observer et planifier",
        detail:
          "Projeter l'image de la leçon 22 au tableau. Observer collectivement en répondant aux questions de la carte mentale : Qui ? (personnages) Quoi ? (action) Où ? (lieu) Quand ? (moment) Comment ? (manière) Pourquoi ? (but/cause). Recenser les idées au tableau. Choisir collectivement un début d'histoire. Coller et lire la fiche de vocabulaire 22 : les vêtements.",
      },
      {
        title: "Séance 1 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent les exercices 1 et 2.",
        differentiation:
          "Parcours 1 : trouver 4 noms de vêtements à partir de devinettes ; compléter un texte avec des noms de vêtements. Parcours 2 : trouver 6 noms de vêtements ; écrire 4 phrases avec noms et adjectifs de vêtements. Parcours 3 : trouver plusieurs noms de vêtements ; écrire 5 phrases.",
      },
      {
        title: "Séance 2 — Rappel et écriture complète",
        detail:
          "Rappeler les éléments observés en séance 1 et le vocabulaire des vêtements. Faire relire les différentes fiches de vocabulaire du carnet pour s'en inspirer. Inviter les élèves à écrire leur histoire complète à partir de l'image.",
      },
      {
        title: "Séance 2 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 3. Correction possible du premier jet si nécessaire.",
        differentiation:
          "Parcours 1 : écrire un texte de 6 lignes environ à partir de l'image. Parcours 2 : écrire un texte de 8 lignes. Parcours 3 : écrire un texte de 10 lignes environ.",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence", "Ardoises", "Carnet de vocabulaire"],
    photocopies: ["Fiche vocabulaire 22 — Les vêtements", "Fiche élève chapitre 22 (3 parcours)"],
  },

  // ── Ch23 ──────────────────────────────────────────────────────────────────
  {
    id: "pe-ch23",
    title: "Écrire un récit merveilleux",
    subject: "francais",
    objective:
      "Comprendre les caractéristiques du récit merveilleux (personnages imaginaires, objets magiques, monde fantastique) et écrire un court récit en mobilisant ces éléments avec une structure début/milieu/fin.",
    competence:
      "Écrire un texte narratif de type merveilleux en utilisant un vocabulaire spécifique et une structure cohérente.",
    duration: "2 × 40 min",
    phases: [
      {
        title: "Séance 1 — Phase orale : le récit merveilleux",
        detail:
          "Expliquer aux élèves que le mot « merveilleux » désigne des personnages, objets et événements imaginaires (fées, dragons, sorciers, formules magiques, objets enchantés…). Comparer avec des contes connus (Cendrillon, le Petit Chaperon Rouge). Faire lister collectivement des éléments merveilleux au tableau. Rappeler la structure en 3 parties : situation initiale (calme) → élément déclencheur (magie/problème) → résolution. Inviter les élèves à préparer leur récit en répondant aux questions : Qui ? (personnage merveilleux) Où ? (monde imaginaire) Quoi ? (événement magique). Coller et lire la fiche de vocabulaire 23 : le monde merveilleux.",
      },
      {
        title: "Séance 1 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 1 (préparation du récit avec questions inductrices).",
        differentiation:
          "Parcours 1 : se préparer à écrire avec des questions inductrices (qui ? où ? quel objet magique ? que se passe-t-il ?). Parcours 2 : se préparer avec des questions inductrices. Parcours 3 : se préparer avec des questions inductrices.",
      },
      {
        title: "Séance 2 — Écriture du récit merveilleux",
        detail:
          "Rappeler les éléments préparés en séance 1. Faire relire le carnet de vocabulaire. Inviter les élèves à écrire leur récit merveilleux complet en s'appuyant sur leurs notes de préparation.",
      },
      {
        title: "Séance 2 — Phase individuelle différenciée",
        detail:
          "Les élèves réalisent l'exercice 2. Correction possible du premier jet si nécessaire.",
        differentiation:
          "Parcours 1 : écrire un récit merveilleux d'environ 6 lignes. Parcours 2 : écrire un récit d'environ 8 lignes. Parcours 3 : écrire un récit d'environ 10 lignes.",
      },
    ],
    material: ["Tableau / vidéoprojecteur", "Carte mentale de référence", "Ardoises", "Carnet de vocabulaire", "Albums de contes (référence)"],
    photocopies: ["Fiche vocabulaire 23 — Le monde merveilleux", "Fiche élève chapitre 23 (3 parcours)"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Lookup helper
// ─────────────────────────────────────────────────────────────────────────────

export function mdiPePrepFor(entryId: string): PrepSheet | undefined {
  return MDI_PE_PREP_SHEETS.find((sheet) => sheet.id === entryId);
}
