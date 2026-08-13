/**
 * Fiches de préparation Ardoise — Le Monde de Cléo CE1 (Retz, Antoine Fetet).
 * Période 3, français : les 15 séances du guide pédagogique (p. 210 à 252).
 * Contenu construit à partir du texte réel du guide (rubriques « Dans les
 * programmes 2025 », « Les choix du Monde de Cléo », « Pour commencer »,
 * « Pour s'entrainer », « Prolongements »).
 */

import type { PrepSheet } from "@/lib/ardoise-data";

export const CLEO_PREP_SHEETS_P3: PrepSheet[] = [
  {
    id: "cleo-p3-1",
    title: "Je trouve le sujet et le verbe de la phrase (1)",
    subject: "francais",
    objective:
      "Identifier le sujet et le verbe d'une phrase simple en partant du sens : la phrase a-t-elle un sens, et si oui, de qui ou de quoi parle-t-elle ?",
    competence:
      "Identifier la relation sujet-verbe à partir de l'observation des effets des transformations liées au changement de temps et de personne dans des situations simples (groupe sujet + verbe).",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : phrase qui a du sens ou non",
        duration: "10 min",
        detail:
          "Projeter les deux phrases (« Mon petit chien a mordu mes pantoufles » / « Mes pantoufles ont mordu mon petit chien »). Faire barrer celle qui ne veut rien dire, puis faire dire de qui parle l'autre phrase pour en déduire le sujet. Faire repérer le verbe en le comparant à une liste de verbes connus (aboyer, dormir, manger, mordre). Souligner le sujet en bleu et le verbe en rouge au tableau.",
        differentiation:
          "S'assurer que tous les élèves ont bien déchiffré les mots sur les étiquettes avant de continuer l'activité.",
      },
      {
        title: "Pour s'entrainer : même format en autonomie",
        duration: "10 min",
        detail:
          "Activité 1 p. 68, de même format que « Pour commencer » : lire deux phrases, barrer celle qui ne veut rien dire, souligner le sujet et le verbe de la phrase qui a du sens. Correction collective : faire souligner ou colorier le sujet en bleu et le verbe en rouge.",
      },
    ],
    material: [
      "Fichier de l'élève p. 68",
      "Étiquettes-mots à manipuler",
      "Aide-mémoire (leçon n° 19)",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p3-2",
    title: "Je forme des mots nouveaux",
    subject: "francais",
    objective:
      "Former des mots nouveaux en ajoutant les préfixes dé-, re- ou in- à un mot connu, et comprendre l'effet de sens produit (répétition, contraire, impossibilité).",
    competence:
      "Trier et apparier les mots et leurs dérivés en fonction des préfixes et suffixes identifiés (morphologie lexicale).",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : manipuler les préfixes",
        duration: "10 min",
        detail:
          "Lister au tableau les mots formés avec dé-, re-, in- en trois colonnes, expliciter l'effet de sens dans des phrases (« se recoiffer », « inhabité »). Manipuler les préfixes devant la classe pour tester si le mot obtenu existe ou peut recevoir un sens inventé, puis faire produire d'autres mots compatibles avec le sens des préfixes.",
      },
      {
        title: "Pour s'entrainer : compléter des phrases",
        duration: "10 min",
        detail:
          "Poursuivre avec l'activité 1 p. 70, de même format. Laisser les élèves travailler seuls en aidant ceux en difficulté de déchiffrage. Correction collective en faisant expliciter le sens de chaque préfixe utilisé, et en signalant les modifications orthographiques de la finale du mot (colle → décollé).",
      },
    ],
    material: ["Fichier de l'élève p. 70", "Tableau pour lister les mots formés"],
    photocopies: [],
  },
  {
    id: "cleo-p3-3",
    title: "Je découpe les mots en syllabes",
    subject: "francais",
    objective:
      "Segmenter des mots en syllabes écrites (en prononçant le e muet final) pour mémoriser leur forme orthographique, en appliquant les règles de coupure (consonnes doublées, groupes consonne + l/r).",
    competence:
      "Copier et acquérir des stratégies de copie efficaces, en s'appuyant sur la segmentation en syllabes écrites.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : segmenter au tableau",
        duration: "10 min",
        detail:
          "Écrire bateau, éléphant, ordinateur au tableau et faire frapper les syllabes en traçant des accolades. Faire de même avec marteau/ficelle/princesse pour établir la règle de coupure entre deux consonnes identiques, puis avec lune/pelouse/téléphone pour faire percevoir la syllabe supplémentaire du e muet en fin de mot.",
      },
      {
        title: "Pour s'entrainer : découpage en autonomie",
        duration: "10 min",
        detail:
          "Poursuivre avec l'activité 1 p. 74 : les élèves écrivent les syllabes dans des cadres (un cadre = une syllabe). Aider les lecteurs fragiles à déchiffrer et faire reformuler la règle de coupure par les élèves. Correction collective avec explicitation des réponses.",
      },
    ],
    material: [
      "Fichier de l'élève p. 74",
      "Affiche référent n° 14 (Je découpe les mots en syllabes écrites)",
      "Aide-mémoire (leçon n° 9)",
      "Ardoise ou cahier d'essais",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p3-4",
    title: "Je conjugue les verbes au présent avec nous et vous",
    subject: "francais",
    objective:
      "Conjuguer au présent des verbes du premier groupe (et être) avec les pronoms nous et vous, en identifiant les terminaisons -ons et -ez.",
    competence:
      "Apprendre à conjuguer au présent de l'indicatif être et avoir et les verbes du premier groupe (étude limitée au 1er groupe et à être/avoir dans les programmes 2025).",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : relier sujets et verbes",
        duration: "10 min",
        detail:
          "Projeter l'activité p. 76 : relier des groupes sujets (substituables par nous/vous) à la forme verbale qui convient, en s'appuyant sur des indices de genre, de nombre et de sens. Faire remarquer les terminaisons -ons (nous) et -ez (vous), et signaler la forme particulière « nous sommes ».",
      },
      {
        title: "Pour s'entrainer : compléter avec verbe et terminaison",
        duration: "10 min",
        detail:
          "Poursuivre avec l'activité 1 p. 76, format déjà connu des élèves : compléter les phrases avec le verbe et la terminaison qui conviennent.",
      },
    ],
    material: [
      "Fichier de l'élève p. 76",
      "Étiquettes de conjugaison",
      "Affiches référentes n° 24 et n° 25",
      "Aide-mémoire (leçon n° 27)",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p3-5",
    title: "Je lis différents types de documents",
    subject: "francais",
    objective:
      "Prélever une information précise dans un document de nature diversifiée (tableau à double entrée) pour répondre à une consigne de lecture fonctionnelle.",
    competence: "Se familiariser aux différents genres et types de textes.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : lecture guidée d'un tableau",
        duration: "10 min",
        detail:
          "Projeter l'activité p. 78 et détailler chaque étape pas à pas (« est-ce que c'est ce tableau qu'il faut entourer ? »). Accueillir avec la même attention les réponses exactes et erronées, en faisant systématiquement expliciter le raisonnement des élèves.",
      },
      {
        title: "Pour s'entrainer : même type d'activité",
        duration: "10 min",
        detail:
          "Poursuivre avec l'activité 1 p. 78 : les informations sont organisées différemment mais l'activité est du même type que celle menée collectivement.",
      },
    ],
    material: ["Fichier de l'élève p. 78", "Documents agrandis à projeter"],
    photocopies: [],
  },
  {
    id: "cleo-p3-6",
    title: "J'écris les mots avec c ou qu",
    subject: "francais",
    objective:
      "Choisir entre c et qu pour écrire le son [k] selon la voyelle qui suit (ca/co/cu se prononcent [k] ; que/qui pour écrire [kə]/[ki]).",
    competence: "Automatiser le décodage des correspondances graphophonémiques apprises au CP.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : écrire les mots des dessins",
        duration: "10 min",
        detail:
          "Faire dire à voix haute les mots à écrire, puis laisser les élèves travailler seuls sur le fichier p. 82 en aidant au besoin. Correction : lister au tableau les mots en c et en qu, entourer les voyelles qui suivent, faire reformuler la règle et la tester sur des mots comme musique, compliqué, croquis, coquin.",
      },
      {
        title: "Pour s'entrainer : même format",
        duration: "10 min",
        detail:
          "Poursuivre avec l'activité 1 p. 82, en s'assurant que tous les élèves identifient bien les mots à écrire.",
      },
    ],
    material: [
      "Fichier de l'élève p. 82",
      "Affiche référente n° 7 (c/qu)",
      "Étiquettes à manipuler",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p3-7",
    title: "Je maitrise l'accent aigu (é)",
    subject: "francais",
    objective:
      "Placer un accent aigu sur le e quand il se prononce [e] et se trouve en fin de syllabe (une vé-ri-té, mais une ves-te).",
    competence: "Mémoriser l'orthographe des mots en tenant compte des accents.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : segmenter et repérer le é",
        duration: "10 min",
        detail:
          "En atelier dirigé, segmenter au tableau lézard, marché, école puis lessive, essence en syllabes (accolades). Faire remarquer que le é est toujours en fin de syllabe et qu'un e non final ne peut pas porter d'accent (lessive, essence).",
      },
      {
        title: "Pour s'entrainer : découper, accentuer, recopier en cachant",
        duration: "10 min",
        detail:
          "Poursuivre avec l'activité 1 p. 84 : découper les mots en syllabes, ajouter l'accent aigu si nécessaire, puis recopier le mot à droite en cachant le modèle pour entrainer la mémorisation de la suite des syllabes.",
      },
    ],
    material: [
      "Fichier de l'élève p. 84",
      "Affiche référente n° 16 (accent aigu é)",
      "Aide-mémoire (leçon n° 10)",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p3-8",
    title: "J'accorde l'adjectif avec le nom",
    subject: "francais",
    objective:
      "Accorder un adjectif de couleur en genre et en nombre avec le nom qu'il complète, en justifiant l'accord par le sens (chaine d'accords dans le groupe nominal).",
    competence:
      "Reconnaitre le groupe nominal (déterminant/nom/adjectif) et comprendre le lien entre déterminant, nom et adjectif dans la chaine d'accords.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : lister les formes de l'adjectif",
        duration: "10 min",
        detail:
          "Décrire oralement l'illustration de la chouette en complétant un texte à trous projeté. Lister au tableau toutes les formes possibles de chaque adjectif de couleur (jaune/jaunes ; bleu-bleue/bleus-bleues ; vert-verte/verts-vertes) et faire justifier chaque accord par le genre et le nombre du nom.",
      },
      {
        title: "Pour commencer et pour s'entrainer : compléter et colorier",
        duration: "10 min",
        detail:
          "Les élèves complètent individuellement le texte à trous p. 86 avec des couleurs de leur choix (pas de correction collective possible car les choix diffèrent), puis poursuivent avec l'activité 1 du même format.",
      },
    ],
    material: [
      "Fichier de l'élève p. 86",
      "Affiche référente n° 20 (les adjectifs)",
      "Étiquettes et illustrations grand format",
      "Aide-mémoire (leçon n° 13)",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p3-9",
    title: "Je trouve le sens d'adjectifs inconnus",
    subject: "francais",
    objective:
      "S'appuyer sur le contexte d'une phrase pour déduire le sens d'un adjectif inconnu (par exemple exquis, hardi, antique).",
    competence:
      "Développer des stratégies pour élucider le sens des mots et des expressions inconnus, en prenant appui sur le contexte.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : déduire le sens par le contexte",
        duration: "10 min",
        detail:
          "Lire la phrase du loup qui trouve le petit cochon « exquis » en se léchant les babines, puis faire entourer parmi plusieurs adjectifs proposés ceux qui ont le même sens, en écartant les autres par le raisonnement contextuel (« le loup ne dirait pas “Hmmmm” si c'était dégoutant »).",
        differentiation:
          "Aider les élèves faibles lecteurs à déchiffrer la phrase et les étiquettes.",
      },
      {
        title: "Pour s'entrainer : même démarche en autonomie",
        duration: "10 min",
        detail:
          "Poursuivre avec l'activité 1 p. 88, de même format que « Pour commencer » (adjectifs hardi et antique à retrouver dans un nouveau texte).",
      },
    ],
    material: ["Fichier de l'élève p. 88"],
    photocopies: [],
  },
  {
    id: "cleo-p3-10",
    title: "J'écris les mots avec c ou ç",
    subject: "francais",
    objective: "Utiliser la cédille devant a, o, u pour obtenir le son [s] (garçon, leçon, déçu).",
    competence: "Automatiser le décodage des correspondances graphophonémiques apprises au CP.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : compléter et dégager la règle",
        duration: "10 min",
        detail:
          "Faire compléter les mots de l'activité p. 90, puis entourer au tableau les syllabes contenant c ou ç dans des mots comme garçon, balcon, déçu, curieux, ça va, café. Faire reformuler la règle : devant a, o, u, il faut une cédille pour obtenir le son [s].",
      },
      {
        title: "Pour s'entrainer : appliquer la règle",
        duration: "10 min",
        detail:
          "Poursuivre avec l'activité 1 p. 90 en autonomie. Une correction collective est prévue car elle permet de reformuler la procédure de choix entre c et ç.",
      },
    ],
    material: [
      "Fichier de l'élève p. 90",
      "Affiche référente n° 9 (c/ç)",
      "Étiquettes à manipuler",
      "Aide-mémoire (leçon n° 7)",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p3-11",
    title: "Je conjugue les verbes être et avoir au présent",
    subject: "francais",
    objective:
      "Conjuguer être et avoir au présent en distinguant les formes homophones (tu es/tu as), en s'appuyant sur les tableaux de conjugaison.",
    competence:
      "Apprendre à conjuguer au présent de l'indicatif être et avoir et les verbes du premier groupe.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : manipuler les étiquettes de conjugaison",
        duration: "10 min",
        detail:
          "Faire rechercher les formes verbales dans les tableaux de conjugaison à partir de deux phrases, puis les transformer au pluriel. Présenter les étiquettes de conjugaison « en vrac » et faire tester de nombreux assemblages (nous sommes / vous avez / ils ont…) en inventant un contexte pour chacun.",
      },
      {
        title: "Pour s'entrainer : compléter en s'aidant des tableaux",
        duration: "10 min",
        detail:
          "Poursuivre avec l'activité 1 p. 92 : lire les phrases, tester en cas de doute les deux verbes possibles (« Vous êtes sept ans » / « Vous avez sept ans »), puis s'assurer de l'orthographe de la forme retenue à l'aide des tableaux de conjugaison du fichier.",
      },
    ],
    material: [
      "Fichier de l'élève p. 92",
      "Étiquettes de conjugaison",
      "Aide-mémoire (leçon n° 31)",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p3-12",
    title: "Je conjugue les verbes au présent avec je et tu",
    subject: "francais",
    objective:
      "Conjuguer au présent des verbes du premier groupe avec je/j' (terminaison -e) et tu (terminaison -es).",
    competence: "Apprendre à conjuguer au présent de l'indicatif les verbes du premier groupe.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : reconstituer un dialogue",
        duration: "10 min",
        detail:
          "Relier les étiquettes deux par deux pour reconstituer un petit dialogue (« Je m'appelle Léonie » / « Et toi, tu t'appelles comment ? »). Faire souligner les terminaisons verbales et expliciter la règle : -e avec je/j', -es avec tu.",
      },
      {
        title: "Pour s'entrainer : compléter avec verbe et terminaison",
        duration: "10 min",
        detail:
          "Poursuivre avec l'activité 1 p. 94, format désormais bien connu des élèves : compléter les phrases avec le verbe et la terminaison qui conviennent.",
      },
    ],
    material: [
      "Fichier de l'élève p. 94",
      "Étiquettes et étiquettes de conjugaison",
      "Affiches référentes n° 26 et n° 27",
      "Aide-mémoire (leçons n° 28 et n° 29)",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p3-13",
    title: "Je comprends de qui ou de quoi on parle",
    subject: "francais",
    objective:
      "Repérer, dans un court texte, les différentes désignations (noms, pronoms) d'un même personnage et s'appuyer sur le sens pour résoudre les ambigüités de la chaine anaphorique.",
    competence:
      "Se repérer dans la chaine anaphorique (nom relié à ses reprises pronominales ou à d'autres noms de sens équivalent) et s'appuyer sur le sens du texte pour résoudre des ambigüités.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : colorier les deux chaines de désignation",
        duration: "10 min",
        detail:
          "Lire le texte sur Marie et son chien, faire désigner les deux personnages puis les colorier en jaune (Marie) et en vert (le chien). Expliciter le pronom l' (« Son chien l'attendait » = attendait Marie) avant de laisser les élèves poursuivre seuls, avec correction immédiate.",
      },
      {
        title: "Pour s'entrainer : même démarche, correction par substitution",
        duration: "10 min",
        detail:
          "Poursuivre avec l'activité 1 p. 98. Lors de la correction, faire transformer chaque phrase en remplaçant le substitut par le référent d'origine (« Comme elles sentent bon » → « Comme les fleurs sentent bon »).",
        differentiation:
          "Aider les faibles lecteurs à déchiffrer et reprendre la procédure de substitution avec eux. Pour les élèves les plus rapides, faire remplacer un personnage masculin par un personnage féminin (ou l'inverse) et réécrire le texte modifié dans le cahier d'essais.",
      },
    ],
    material: ["Fichier de l'élève p. 98"],
    photocopies: [],
  },
  {
    id: "cleo-p3-14",
    title: "J'écris des verbes au pluriel",
    subject: "francais",
    objective:
      "Écrire des verbes conjugués au pluriel à la 3e personne, en retenant que la terminaison est le plus souvent -ent, sauf pour ont et sont.",
    competence:
      "Réaliser des accords en genre et en nombre dans le groupe verbal (marque de pluriel des verbes en -nt).",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : comparer singulier et pluriel",
        duration: "10 min",
        detail:
          "Faire relier deux histoires mélangées avec des flèches de couleurs différentes, puis entourer les verbes conjugués pour comparer les formes du singulier et du pluriel (rêve/rêvent ; a/ont ; est/sont) et faire expliciter le lien sujet-verbe.",
      },
      {
        title: "Pour s'entrainer : transformer un texte au pluriel",
        duration: "10 min",
        detail:
          "Poursuivre avec l'activité 1 p. 100 : transformer oralement le texte en passant le sujet au pluriel, puis écrire les verbes manquants en rappelant la terminaison habituelle -ent et la particularité des verbes en -ont.",
        differentiation:
          "Aider les élèves les plus fragiles en leur faisant oraliser (subvocaliser) les phrases avant de les écrire.",
      },
    ],
    material: ["Fichier de l'élève p. 100"],
    photocopies: [],
  },
  {
    id: "cleo-p3-15",
    title: "Je comprends le sens propre et le sens figuré",
    subject: "francais",
    objective:
      "Distinguer le sens propre (sens concret originel) et le sens figuré (sens second, souvent abstrait) d'un mot ou d'une expression.",
    competence:
      "Comprendre la différence entre sens propre et sens figuré d'un mot ou d'une expression.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : relier expressions, dessins et définitions",
        duration: "10 min",
        detail:
          "Relier des expressions (« tourner autour du pot », « casser les pieds »…) aux illustrations humoristiques au sens propre, puis à leur définition au sens figuré, en faisant paraphraser chaque situation et en se demandant si elle est possible dans le monde réel.",
      },
      {
        title: "Pour s'entrainer : sens propre ou sens figuré du verbe « casser »",
        duration: "10 min",
        detail:
          "Poursuivre avec l'activité 1 p. 102 : entourer le verbe « casser » qui se répète dans plusieurs phrases, puis indiquer pour chacune s'il est employé au sens propre ou au sens figuré.",
      },
    ],
    material: ["Fichier de l'élève p. 102"],
    photocopies: [],
  },
];
