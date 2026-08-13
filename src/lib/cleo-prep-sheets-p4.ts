import type { PrepSheet } from "@/lib/ardoise-data";

/**
 * Fiches de préparation — Le Monde de Cléo CE1 (Retz, Antoine Fetet), Période 4.
 * Contenu construit à partir du guide pédagogique (p. 253 à 290) : objectifs
 * des programmes 2025, choix pédagogiques de la méthode, déroulé des phases
 * « Pour commencer » / « Pour s'entrainer » / « Pour aller plus loin »,
 * matériel et affichages mentionnés.
 */
export const CLEO_PREP_SHEETS_P4: PrepSheet[] = [
  {
    id: "cleo-p4-1",
    title: "Je connais les pronoms sujets",
    subject: "francais",
    objective:
      "Différencier et nommer les pronoms personnels sujets (je, tu, il, elle, nous, vous, ils, elles, on) et savoir à quelles personnes ils renvoient, y compris en cas de reprise pronominale d'un groupe sujet.",
    competence:
      "Différencier et nommer les principales classes de mots : le déterminant, le nom commun, le nom propre, l'adjectif, le verbe, le pronom personnel sujet.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : relier et colorier",
        duration: "15 min",
        detail:
          "Projeter l'activité p. 104. Après lecture de la consigne, les élèves relient les étiquettes (groupes sujets et pronoms de reprise), puis colorient de deux couleurs différentes le groupe sujet et le pronom qui le reprend. Question orale sur un exemple type « Yann et toi, vous êtes amis », puis approfondissement en faisant varier les paramètres (« Et si c'était Yann et moi ? »).",
      },
      {
        title: "Pour s'entrainer : le texte-dialogue",
        duration: "20 min",
        detail:
          "Activité 1 p. 104 : compléter un texte (sous forme de dialogue) avec les pronoms sujets qui conviennent, puis colorier de la même couleur les personnes dont on parle et les pronoms sujets qui les désignent. Reprendre oralement la consigne si besoin et s'assurer que tous les élèves déchiffrent les mots du texte.",
        differentiation:
          "Pictogrammes-consignes et tableau de structuration des tâches disponibles sur le site compagnon pour les élèves qui ont besoin d'un support visuel des étapes.",
      },
    ],
    material: ["Fichier de l'élève p. 104", "Affiche n° 21 (les pronoms sujets)"],
    photocopies: [],
  },
  {
    id: "cleo-p4-2",
    title: "Je conjugue les verbes au futur",
    subject: "francais",
    objective:
      "Conjuguer au futur les verbes du premier groupe et les principaux verbes irréguliers, en justifiant la terminaison choisie à partir du sujet.",
    competence:
      "Apprendre à conjuguer au présent, à l'imparfait, au futur puis au passé composé de l'indicatif être et avoir et les verbes du premier groupe.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : étiquettes de conjugaison",
        duration: "15 min",
        detail:
          "Manipulation des étiquettes de conjugaison (radical / -er / terminaisons -ai, -as, -a, -ons, -ez, -ont) présentées « en vrac » pour assembler oralement des formes au futur (je chanterai, vous chanterez, nous jouerons...). Les élèves écrivent ensuite au moins trois phrases au futur sur leur cahier d'essais. Correction immédiate en faisant systématiquement justifier la terminaison retenue selon le sujet.",
      },
      {
        title: "Pour s'entrainer : repérer puis produire",
        duration: "20 min",
        detail:
          "Activité 1 p. 108 en deux temps : d'abord souligner les verbes au futur d'un texte et relier chacun à son sujet par une flèche ; puis compléter les verbes au futur d'un second texte. Lecture collective du texte pour l'accès au sens avant le travail individuel.",
        differentiation:
          "Élèves fragiles accompagnés pour s'assurer qu'ils réalisent correctement les deux tâches successives ; recours possible à la leçon 32 de l'aide-mémoire ou aux étiquettes de conjugaison en cas d'hésitation.",
      },
    ],
    material: [
      "Fichier de l'élève p. 108",
      "Étiquettes de conjugaison",
      "Affiche n° 28 (des verbes au futur)",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p4-3",
    title: "J'écris les mots avec g ou ge",
    subject: "francais",
    objective:
      "Choisir entre g et ge selon la voyelle qui suit, pour écrire correctement le son [ʒ] devant a, o, u.",
    competence:
      "Automatiser le décodage des correspondances graphophonémiques (CGP) apprises au CP.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : trier les mots au tableau",
        duration: "15 min",
        detail:
          "Recherche collective des mots illustrés (dragon, bourgeon, garage, dirigeable, gorille, rougeole), classement au tableau en deux colonnes selon que g se prononce [g] ou [ʒ]. Exploration des erreurs possibles pour gea/geo (« qu'entendrait-on si on oubliait le e ? ») et dictée rapide de syllabes sur l'ardoise (ge, geon, gi...).",
      },
      {
        title: "Pour s'entrainer : écrire les mots des dessins",
        duration: "20 min",
        detail:
          "Activité 1 p. 110, format déjà connu des élèves : écrire les mots correspondant aux dessins à l'aide des syllabes proposées, en les barrant au fur et à mesure.",
        differentiation:
          "Pictogrammes-consignes et tableau de structuration des tâches disponibles sur le site compagnon.",
      },
    ],
    material: ["Fichier de l'élève p. 110", "Ardoise", "Affiche n° 6 (j/g/ge)"],
    photocopies: [],
  },
  {
    id: "cleo-p4-4",
    title: "J'écris les mots avec in/ine, ain/aine, ein/eine, un/une",
    subject: "francais",
    objective:
      "Passer du féminin au masculin des mots en in/ine, ain/aine, ein/eine en identifiant que le e final marque le féminin et modifie la prononciation.",
    competence:
      "Automatiser le décodage des correspondances graphophonémiques (CGP) apprises au CP.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : écrire les six mots",
        duration: "15 min",
        detail:
          "Rappel rapide des trois principales graphies du son [ɛ̃] (in, ain, ein), puis écriture des six mots de l'activité p. 114 à partir des dessins.",
      },
      {
        title: "Pour s'entrainer : cacher le e final",
        duration: "20 min",
        detail:
          "Activité 1 p. 114 : pour chaque phrase, cacher la dernière lettre des mots féminins en gras (voisine, cousine, pleine...) pour trouver et écrire le masculin correspondant (voisin, cousin, plein...). Correction collective pour expliciter la procédure de choix entre in, ain et ein.",
        differentiation:
          "Aide au déchiffrage des mots facilitateurs pour les élèves en difficulté ; pictogrammes-consignes et tableau de structuration des tâches disponibles sur le site compagnon.",
      },
    ],
    material: ["Fichier de l'élève p. 114", "Affiche n° 8 (in/ain/ein)"],
    photocopies: [],
  },
  {
    id: "cleo-p4-5",
    title: "Je reconnais le verbe et le nom (2)",
    subject: "francais",
    objective:
      "Consolider les procédures de reconnaissance du verbe (conjugable, mettable à l'infinitif) et du nom (précédé d'un déterminant) en repérant des intrus dans des listes de mots.",
    competence:
      "Différencier et nommer les principales classes de mots : le déterminant, le nom commun, le nom propre, l'adjectif, le verbe, le pronom personnel sujet.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : repérer les intrus",
        duration: "15 min",
        detail:
          "Lecture de listes de mots (p. 116) : les élèves repèrent les intrus (par ex. souvent et argent, qu'on ne peut pas conjuguer). Observation de la finale -ent, tantôt prononcée [ɑ̃] (souvent), tantôt muette comme terminaison verbale au pluriel (ils chantent). Conclusion collective sur les procédures : un verbe se conjugue et se met à l'infinitif ; un nom accepte un déterminant.",
      },
      {
        title: "Pour s'entrainer : même tâche, présentation différente",
        duration: "20 min",
        detail:
          "Activité 1 p. 116, de même type que l'activité collective mais sous une présentation différente : barrer les intrus de chaque série de mots et entourer la bonne réponse (verbe/nom).",
        differentiation:
          "Pictogrammes-consignes et tableau de structuration des tâches disponibles sur le site compagnon.",
      },
    ],
    material: ["Fichier de l'élève p. 116"],
    photocopies: [],
  },
  {
    id: "cleo-p4-6",
    title: "Je comprends dans quel ordre se passent les choses",
    subject: "francais",
    objective:
      "Dégager le sens global d'un texte lu, en restituant l'enchainement chronologique des évènements, y compris quand l'ordre syntaxique du texte ne correspond pas à l'ordre chronologique des faits.",
    competence:
      "Dégager le sens global d'un texte lu, de façon autonome, à la suite d'une séance dédiée à la compréhension.",
    duration: "20 min",
    phases: [
      {
        title: "Situations simples : remettre l'histoire en ordre",
        duration: "15 min",
        detail:
          "Description de l'image et lecture des quatre phrases de l'activité p. 118 : les élèves comprennent qu'il s'agit d'une histoire dans le désordre, l'image comptant elle aussi comme un évènement à situer. Recherche collective de l'ordre (numérotation des bulles), en justifiant chaque choix, puis vérification systématique en relisant du numéro 1 au numéro 5.",
      },
      {
        title: "Pour s'entrainer : entrainement individuel",
        duration: "20 min",
        detail:
          "Activité 1 p. 118 : les élèves travaillent seuls sur leur fichier ; aide au déchiffrage pour les lecteurs faibles et à la vérification de leur réponse. Correction collective menée juste après.",
        differentiation:
          "Pictogrammes-consignes et tableau de structuration des tâches disponibles sur le site compagnon.",
      },
      {
        title: "Situations complexes : reformuler sans le texte",
        duration: "20 min",
        detail:
          "À partir de l'activité 3 p. 141, les élèves racontent d'abord sans regarder le fichier ce qui se passe dans un texte où l'ordre syntaxique ne suit pas l'ordre chronologique (connecteur « mais » introduisant un évènement inattendu). Travail explicite sur les mots de chronologie (hier) et les connecteurs logiques, puis reformulation orale avant vérification en s'appuyant sur le texte.",
        differentiation:
          "Laisser au moins 30 secondes de réflexion avant de recueillir les réponses, pour ne pas priver les lecteurs plus faibles du temps de traiter l'information.",
      },
    ],
    material: ["Fichier de l'élève p. 118 et p. 141"],
    photocopies: [],
  },
  {
    id: "cleo-p4-7",
    title: "J'écris les mots avec h, ch, ph",
    subject: "francais",
    objective:
      "Écrire des mots contenant les graphies h (muette), ch [ʃ] et ph [f] à partir de leur prononciation.",
    competence:
      "Automatiser le décodage des correspondances graphophonémiques (CGP) apprises au CP.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : dire puis écrire",
        duration: "15 min",
        detail:
          "Les mots à écrire (p. 120) sont d'abord prononcés à voix haute collectivement, puis les élèves travaillent seuls sur leur fichier avec l'aide de l'enseignant si besoin. Correction suivie de la question orale sur le caractère muet du h.",
      },
      {
        title: "Pour s'entrainer : écrire avec les syllabes",
        duration: "20 min",
        detail:
          "Activité 1 p. 120 : écrire les mots correspondant aux dessins à partir des syllabes proposées (son, hi, ris, lat, hé, cho, pho...), en suivant la procédure habituelle déjà connue des élèves.",
        differentiation:
          "Étiquettes à manipuler, pictogrammes-consignes et tableau de structuration des tâches disponibles sur le site compagnon.",
      },
    ],
    material: ["Fichier de l'élève p. 120", "Étiquettes", "Affiche n° 10 (f/ff/ph)"],
    photocopies: [],
  },
  {
    id: "cleo-p4-8",
    title: "Je maitrise l'accent grave (è)",
    subject: "francais",
    objective:
      "Savoir quand ajouter un accent grave sur le e : lorsque le son [ɛ] est en fin de syllabe.",
    competence: "Tenir compte des accents (mémoriser l'orthographe des mots).",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : compléter et découper en syllabes",
        duration: "15 min",
        detail:
          "Rappel de ce que les élèves savent sur l'accent aigu, puis découverte de la règle de l'accent grave. Les élèves complètent des mots (p. 124) puis les segmentent en syllabes ; correction au tableau en deux colonnes (mots avec/sans accent) pour faire remarquer que le è se trouve toujours en fin de syllabe.",
      },
      {
        title: "Pour s'entrainer : ajouter l'accent et recopier",
        duration: "20 min",
        detail:
          "Activité 1 p. 124 : ajouter l'accent grave quand il le faut sur une liste de mots, puis recopier chaque mot à droite en cachant le modèle. Passage dans les rangs pour aider au déchiffrage et faire expliciter la procédure utilisée.",
        differentiation:
          "Pictogrammes-consignes et tableau de structuration des tâches disponibles sur le site compagnon ; dans l'activité 4, la segmentation en syllabes est laissée à la charge de l'élève.",
      },
    ],
    material: [
      "Fichier de l'élève p. 124",
      "Aide-mémoire (leçon n° 11)",
      "Affiche n° 17 (accent è)",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p4-9",
    title: "J'écris les mots avec am, em, im, om",
    subject: "francais",
    objective:
      "Écrire m au lieu de n devant b, m ou p dans les graphies du son nasal (an/am, en/em, in/im, on/om).",
    competence:
      "Automatiser le décodage des correspondances graphophonémiques (CGP) apprises au CP.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : compléter les mots",
        duration: "15 min",
        detail:
          "Les élèves complètent les mots de l'activité p. 126 sur leur fichier (ambulance, tambour, antilope...). Correction collective en écrivant les mots au tableau et en entourant les syllabes contenant an, en, in, on, am, em, im, om, pour faire observer que la lettre qui suit le m est toujours m, b ou p.",
      },
      {
        title: "Pour s'entrainer : écrire les mots des dessins",
        duration: "20 min",
        detail:
          "Activité 1 p. 126 : écrire les mots correspondant aux dessins à l'aide des syllabes proposées, en travaillant seul avec l'aide de l'enseignant si besoin.",
        differentiation:
          "Étiquettes à manipuler, pictogrammes-consignes et tableau de structuration des tâches disponibles sur le site compagnon.",
      },
    ],
    material: [
      "Fichier de l'élève p. 126",
      "Étiquettes",
      "Aide-mémoire (leçon n° 8)",
      "Affiche n° 11 (an/am...)",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p4-10",
    title: "Je manipule les groupes nominaux et les pronoms",
    subject: "francais",
    objective:
      "Reconnaitre le groupe nominal (déterminant + nom + adjectif) et le substituer par un pronom, en fonction sujet ou complément.",
    competence:
      "Reconnaitre le GN (déterminant/nom/adjectif) ; différencier et nommer les principales classes de mots : déterminant, nom commun, nom propre, adjectif, verbe, pronom personnel.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : relier phrases et reprises pronominales",
        duration: "15 min",
        detail:
          "Lecture de la consigne p. 128 puis mise en relation de phrases deux à deux (groupe nominal sujet ↔ phrase avec pronom de reprise), et coloriage des groupes nominaux et des pronoms qui les remplacent. Question orale de synthèse sur la reconnaissance du nom, de l'adjectif et du déterminant.",
      },
      {
        title: "Pour s'entrainer : construire un GN",
        duration: "20 min",
        detail:
          "Activité 1 p. 128 : compléter des phrases avec un groupe nominal composé d'un déterminant, d'un nom et d'un adjectif accordés (attention au pluriel dans « Elles sont appétissantes »), puis colorier le groupe nominal produit et le pronom qui le remplace dans la phrase suivante.",
        differentiation:
          "Insister à l'oral sur la chaine d'accords dans le groupe nominal avant le travail écrit individuel.",
      },
    ],
    material: ["Fichier de l'élève p. 128"],
    photocopies: [],
  },
  {
    id: "cleo-p4-11",
    title: "Je découvre les adverbes en -ment",
    subject: "francais",
    objective:
      "Former des adverbes en -ment à partir d'adjectifs au féminin et les insérer dans des phrases, sans recours au vocabulaire métalinguistique (suffixe, dérivé).",
    competence:
      "S'appuyer sur la morphologie des mots pour en trouver le sens ; trier et apparier les mots et leurs dérivés en fonction des préfixes et suffixes identifiés.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : relier les contraires et former des adverbes",
        duration: "15 min",
        detail:
          "Relier deux par deux des adverbes de sens contraire (lentement/rapidement, joyeusement/tristement...) puis observer, en cachant le suffixe -ment, qu'ils sont formés à partir d'un adjectif au féminin. Les élèves forment oralement de nouveaux adverbes (prochainement, furieusement, librement, vivement) et inventent des phrases.",
      },
      {
        title: "Pour s'entrainer : compléter des phrases",
        duration: "20 min",
        detail:
          "Activité 1 p. 130 : compléter des phrases avec un adverbe en -ment en s'aidant des dessins et des bulles, après un traitement collectif de la première phrase à l'oral.",
        differentiation:
          "Pictogrammes-consignes et tableau de structuration des tâches disponibles sur le site compagnon.",
      },
    ],
    material: ["Fichier de l'élève p. 130"],
    photocopies: [],
  },
  {
    id: "cleo-p4-12",
    title: "Je conjugue les verbes à l'imparfait",
    subject: "francais",
    objective:
      "Conjuguer à l'imparfait les verbes du premier groupe et les verbes être/avoir, en justifiant la terminaison choisie à partir du sujet.",
    competence:
      "Apprendre à conjuguer au présent, à l'imparfait, au futur puis au passé composé de l'indicatif être et avoir et les verbes du premier groupe.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : étiquettes de conjugaison",
        duration: "15 min",
        detail:
          "Manipulation des étiquettes de conjugaison « en vrac » (radical + terminaisons -ais, -ait, -ions, -iez, -aient) pour assembler des phrases contextualisées à l'oral (« je dormais : autrefois, quand j'étais bébé, je dormais dans un berceau »). Justification systématique de chaque terminaison selon le sujet, puis activité p. 134 : assemblage de phrases à l'imparfait et rédaction de 3 à 5 phrases sur le cahier d'essais.",
      },
      {
        title: "Pour s'entrainer : repérer puis produire",
        duration: "20 min",
        detail:
          "Activité 1 p. 134, même format que pour le futur : souligner les verbes à l'imparfait d'un texte et les relier à leur sujet par une flèche, puis compléter les verbes à l'imparfait d'un second texte, en cherchant la terminaison dans le tableau du haut de la page si besoin.",
        differentiation:
          "S'assurer que les élèves les plus fragiles effectuent correctement les deux tâches successives ; recours possible à la leçon 34 de l'aide-mémoire ou à l'affiche de l'imparfait.",
      },
    ],
    material: [
      "Fichier de l'élève p. 134",
      "Étiquettes de conjugaison",
      "Aide-mémoire (leçon n° 34)",
      "Affiche n° 30 (des verbes à l'imparfait)",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p4-13",
    title: "Je coupe des phrases en groupes de sens",
    subject: "francais",
    objective:
      "Segmenter une phrase en groupes de sens (groupes de souffle) pour en faciliter la lecture à voix haute et la compréhension, sans recourir à la terminologie grammaticale.",
    competence:
      "Lire des textes narratifs, documentaires et prescriptifs en respectant tous les signes de ponctuation et les groupes de souffle.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : découper une phrase au tableau",
        duration: "15 min",
        detail:
          "Fichiers fermés, une phrase est écrite sur une seule ligne au tableau. Les élèves proposent des coupures pour la répartir sur plusieurs lignes sans rien changer au texte, en gardant ensemble les mots « qui vont bien ensemble ». Une coupure non pertinente est volontairement conservée puis corrigée à l'oral en exagérant les pauses. Puis, sur le fichier p. 138, les élèves entourent les mots qui ne respectent pas les groupes de sens dans deux essais d'élèves fictifs.",
      },
      {
        title: "Pour s'entrainer : tracer les groupes de sens et recopier",
        duration: "20 min",
        detail:
          "Activité 1 p. 138 : lire attentivement une phrase, tracer des traits entre les groupes de sens, puis la recopier en passant à la ligne après chaque groupe de sens. Travail oral de segmentation possible avant le passage à l'écrit individuel si nécessaire.",
        differentiation:
          "Pictogrammes-consignes et tableau de structuration des tâches disponibles sur le site compagnon.",
      },
    ],
    material: ["Fichier de l'élève p. 138", "Tableau (phrase à découper)"],
    photocopies: [],
  },
];
