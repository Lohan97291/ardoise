/**
 * Fiches de préparation Ardoise — Période 2, d'après le guide pédagogique
 * "Le Monde de Cléo CE1" (Antoine Fetet, Joëlle Gardette, éditions Retz).
 * Contenu synthétisé à partir du texte réel du guide (p. 164 à 209) :
 * rubriques « Dans les programmes 2025 », « Les choix du Monde de Cléo »,
 * déroulés « Pour commencer » / « Pour s'entrainer », différenciation et
 * prolongements.
 */
import type { PrepSheet } from "@/lib/ardoise-data";

export const CLEO_PREP_SHEETS_P2: PrepSheet[] = [
  {
    id: "cleo-p2-1",
    title: "Je choisis les bons déterminants",
    subject: "francais",
    objective:
      "Choisir à bon escient un article défini ou indéfini (le, la, l', les, un, une, des) en fonction du genre et du nombre du nom, et observer les effets de cette variation sur l'accord du verbe.",
    competence:
      "Différencier et nommer les principales classes de mots (déterminant, nom, adjectif) ; reconnaitre le groupe nominal et comprendre le lien entre déterminant, nom et verbe dans la chaine d'accords.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : observation des deux images et mise en phrases à l'oral",
        duration: "15 min",
        detail:
          "Projeter l'activité « Pour commencer » p. 32. Faire observer précisément les deux images (deux enfants et un oiseau / une enfant et deux oiseaux), puis faire préparer oralement les deux phrases en n'utilisant que les mots des étiquettes et les déterminants imposés (le, la, l', les, un, une, des). Écrire au tableau le début de la première phrase pour lancer l'écriture.",
        differentiation:
          "Aider les élèves les plus fragiles à choisir et à rédiger les deux phrases ; travail possible individuellement ou par binômes.",
      },
      {
        title: "Correction collective : expliciter les procédures d'accord",
        duration: "15 min",
        detail:
          "Corriger en commun en faisant expliciter le choix du singulier/pluriel pour les noms, le choix des déterminants correspondants, puis le choix de la forme verbale — ce chapitre étant mené en parallèle du chapitre « J'accorde le verbe avec le sujet » (fichier p. 40).",
      },
      {
        title: "Pour s'entrainer : activité individuelle sur le fichier",
        duration: "20 min",
        detail:
          "Débuter l'activité « Pour s'entrainer » p. 32 collectivement à l'oral pour s'assurer que tous les élèves en ont compris le format, puis laisser les élèves la terminer sur leur fichier.",
        differentiation:
          "Pictogrammes-consignes, plan simplifié des étapes (tableau de structuration des tâches) et étiquettes à manipuler disponibles sur le site compagnon pour les élèves qui en ont besoin.",
      },
    ],
    material: [
      "Fichier de l'élève p. 32",
      "Étiquettes à manipuler",
      "Affiches n° 18 et 19",
      "Aide-mémoire (leçon n° 24)",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p2-2",
    title: "J'écris les mots avec g ou gu",
    subject: "francais",
    objective:
      "Automatiser l'écriture des correspondances graphophonémiques du son [g] (g devant a/o/u, gu devant e/i) et du g doux [ʒ], en identifiant la présence du u muet dans gue et gui.",
    competence:
      "Automatiser le décodage et l'encodage des correspondances graphophonémiques apprises au CP, y compris pour les sons proches.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : chasse aux mots et classement au tableau",
        duration: "15 min",
        detail:
          "Faire une chasse aux mots oraux contenant le phonème [g], puis écrire les mots proposés au tableau en trois listes (G prononcé /g/, GU prononcé /g/, G prononcé /ʒ/), sans expliquer d'emblée la logique du classement. Exclure les mots en gea/geo. Faire relire les listes, entourer le u muet de gue/gui et insister sur la prononciation.",
      },
      {
        title: "Observation de l'activité du fichier et dictée de syllabes",
        duration: "15 min",
        detail:
          "Faire observer l'activité « Pour commencer » p. 34, laisser les élèves écrire les mots, rappeler que [gi]/[ge] s'écrivent toujours gui/gue, puis explorer les erreurs possibles (« guitare » sans u, « genou » avec un u ajouté). Terminer par une courte dictée de syllabes sur ardoise (gue, ga, go, gre…).",
      },
      {
        title: "Pour s'entrainer : activité 1 du fichier et correction",
        duration: "20 min",
        detail:
          "Les élèves travaillent seuls sur l'activité 1 p. 34. Une correction collective permet de faire reformuler la procédure de choix entre g et gu.",
        differentiation:
          "Aide au besoin pour les élèves en difficulté ; pictogrammes-consignes et étiquettes disponibles sur le site compagnon.",
      },
    ],
    material: [
      "Fichier de l'élève p. 34",
      "Affiche n° 5",
      "Ardoise ou cahier d'essais",
      "Aide-mémoire (leçon n° 3)",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p2-3",
    title: "Je fais attention à tous les détails de la phrase",
    subject: "francais",
    objective:
      "Comprendre des devinettes construites autour d'opérateurs logiques (et/ou/mais/ni, forme négative) en prenant en compte simultanément plusieurs informations successives d'une phrase.",
    competence:
      "Comprendre ce qui est implicite en s'appuyant sur des indices explicites, revenir au texte pour identifier les éléments complexes et repérer les opérateurs logiques (connecteurs).",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : devinettes en QCM d'images",
        duration: "15 min",
        detail:
          "Reproduire ou vidéoprojeter l'activité. Faire lire la première phrase, nommer les objets dessinés, exiger au moins 15 secondes de réflexion avant toute réponse. Interroger un élève volontaire et compléter son explication pour rendre visible à toute la classe le raisonnement logique complet (garder/éliminer chaque image en justifiant).",
      },
      {
        title: "Pour s'entrainer : entourer puis écrire la réponse",
        duration: "20 min",
        detail:
          "Les élèves entourent les bonnes réponses sur le fichier. À partir de l'activité 4, le format évolue : il faut choisir la réponse exacte dans une banque d'une dizaine d'images et l'écrire ; les mots à écrire ont été choisis pour leur fréquence ou la régularité de leur orthographe.",
        differentiation:
          "Aider les faibles lecteurs à lire les phrases et à soutenir le raisonnement ; les élèves les plus rapides écrivent une devinette modifiée à partir d'une situation existante. Une liste de mots dans l'ordre alphabétique peut être fournie pour faciliter l'écriture des réponses (activités 4 à 7).",
      },
      {
        title: "Correction et mise en commun",
        duration: "15 min",
        detail:
          "Correction rapide en veillant à ce que les explicitations et justifications soient les plus détaillées possible, portées par les élèves eux-mêmes autant que possible.",
      },
    ],
    material: [
      "Fichier de l'élève p. 36",
      "Liste de mots (site compagnon)",
      "Pictogrammes-consignes",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p2-4",
    title: "Je comprends des mots qui ont plusieurs sens",
    subject: "francais",
    objective:
      "Distinguer les différents sens d'un même mot (ex. cuisine, buche) à partir d'une illustration, puis d'une définition, puis du contexte d'une phrase.",
    competence:
      "Comprendre la différence entre sens propre et sens figuré, distinguer les divers sens d'un mot et le comprendre dans son contexte grâce à son environnement linguistique.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : images, définitions puis phrases",
        duration: "15 min",
        detail:
          "Projeter l'activité p. 38. Faire décrire les deux images, lire les définitions et entourer les images de la couleur de la bonne définition. Faire lire et commenter la première phrase en identifiant les indices du contexte qui permettent de choisir le bon sens (ex. « réveillon » → buche de Noël).",
      },
      {
        title: "Pour s'entrainer : travail individuel et correction",
        duration: "20 min",
        detail:
          "Les élèves continuent seuls pour les phrases suivantes puis correction collective : reprendre chaque phrase et la reformuler pour renforcer l'accès au sens.",
        differentiation:
          "Aider les faibles lecteurs à déchiffrer ; l'accès au sens peut être facilité en faisant lire la phrase à voix haute par l'enseignant ou un autre élève, le déchiffrage pouvant faire obstacle à la compréhension.",
      },
    ],
    material: ["Fichier de l'élève p. 38", "Pictogrammes-consignes"],
    photocopies: [],
  },
  {
    id: "cleo-p2-5",
    title: "J'accorde le verbe avec le sujet (2)",
    subject: "francais",
    objective:
      "Construire deux phrases différentes à partir d'un même dessin en intervertissant sujet et complément, et accorder correctement le verbe selon que le sujet est au singulier ou au pluriel.",
    competence:
      "Comprendre le lien entre le déterminant, le nom et le verbe dans la chaine d'accords ; accorder le verbe avec son sujet en nombre.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : construire les deux phrases avec les étiquettes",
        duration: "15 min",
        detail:
          "Projeter le dessin et les étiquettes p. 40. Former une première phrase avec les élèves, l'écrire au tableau en insistant sur majuscule et point, puis former la phrase inversée (sujet et complément échangés) en faisant justifier le changement de terminaison verbale. Désigner sujet et verbe dans chaque phrase et dessiner la chaine d'accords au tableau.",
      },
      {
        title: "Pour s'entrainer : phrases individuelles avec les étiquettes",
        duration: "20 min",
        detail:
          "Les élèves réalisent une activité de même format sur le fichier, en écrivant deux phrases différentes à partir d'un matériau langagier fourni sous forme d'étiquettes de moins en moins complètes.",
        differentiation:
          "Aider les faibles lecteurs à lire les étiquettes et composer les phrases, en questionnant systématiquement sur les choix faits ; demander aux élèves les plus rapides de dessiner eux-mêmes les chaines d'accords.",
      },
      {
        title: "Correction et mise en commun",
        duration: "15 min",
        detail:
          "Écrire les phrases au tableau, vérifier et faire justifier les accords en reprenant les explicitations de procédure dans le détail (ex. choix entre -e, -es, -ent selon le sujet).",
      },
    ],
    material: ["Fichier de l'élève p. 40", "Étiquettes à manipuler"],
    photocopies: [],
  },
  {
    id: "cleo-p2-6",
    title: "J'écris les mots avec elle, ette, esse, enne, erre",
    subject: "francais",
    objective:
      "Repérer et écrire les mots se terminant par une consonne double encadrée de deux e (elle, ette, esse, enne, erre) sans avoir besoin d'accent pour obtenir le son [ɛ].",
    competence:
      "Automatiser le décodage et l'encodage des correspondances graphophonémiques, en particulier pour les finales à consonne double.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : chasse aux mots et classement des finales",
        duration: "15 min",
        detail:
          "Organiser oralement une chasse aux mots en -ette puis en -elle, -esse et -erre (en excluant les mots sans consonne double, comme sorcière ou bête). Écrire les mots trouvés en listes alignées au tableau et faire remarquer le point commun : la consonne double entourée de deux e. Réaliser ensuite l'activité « Pour commencer » p. 42.",
      },
      {
        title: "Pour s'entrainer : activité 1 du fichier",
        duration: "20 min",
        detail:
          "Les élèves réalisent seuls l'activité 1 p. 42, en s'aidant des débuts et fins de mots proposés (à barrer au fur et à mesure). Il ne s'agit pas ici d'une segmentation syllabique classique.",
      },
    ],
    material: ["Fichier de l'élève p. 42", "Étiquettes à manipuler"],
    photocopies: [],
  },
  {
    id: "cleo-p2-7",
    title: "Je comprends où commence et où finit une phrase",
    subject: "francais",
    objective:
      "Segmenter un texte écrit sans ponctuation en phrases correctes, en s'appuyant sur une lecture oralisée et sur des critères de sens plutôt que sur des critères formels.",
    competence:
      "Identifier la phrase simple, maitriser les marques de limite de phrase (majuscule, point/point d'interrogation/point d'exclamation) et reconnaitre les trois types de phrases (déclarative, interrogative, impérative).",
    duration: "20 min",
    phases: [
      {
        title: "1re série — Pour commencer : lecture oralisée avec pause",
        duration: "15 min",
        detail:
          "Projeter la première situation p. 44. Faire lire les deux phrases par plusieurs élèves en marquant une pause « là où c'est nécessaire », explorer collectivement des segmentations erronées en exagérant les pauses, puis conclure : on termine une phrase par un point, la suivante commence par une majuscule. Travailler ensuite deux phrases en exagérant la prosodie de l'interrogation et de l'exclamation.",
      },
      {
        title: "1re série — Pour s'entrainer sur le fichier",
        duration: "15 min",
        detail: "Les élèves reprennent la même opération individuellement sur le fichier p. 44.",
        differentiation:
          "Aider les élèves les plus fragiles à lire et prosodier correctement les phrases à voix haute.",
      },
      {
        title: "2e série (à partir de la p. 83) : segmenter un texte continu",
        duration: "20 min",
        detail:
          "Écrire au tableau deux phrases juxtaposées sans ponctuation (ex. « maman n'arrivait pas à démarrer la voiture était en panne »). Faire lire, corriger les tentatives incorrectes (répétition ou ajout de mots interdits), puis dégager la procédure : lire dans sa tête pour couper les deux phrases, s'assurer qu'elles sont toutes deux correctes, sans ajout ni répétition de mots, puis placer majuscules et points.",
        differentiation:
          "Les élèves refont la même activité p. 83 seuls ; leur demander de répéter ce qu'ils viennent de lire en levant les yeux du texte pour favoriser la mémorisation du sens.",
      },
    ],
    material: ["Fichier de l'élève p. 44 et p. 83", "Aide-mémoire (leçons n° 17 et 18)"],
    photocopies: [],
  },
  {
    id: "cleo-p2-8",
    title: "Je découvre les diminutifs",
    subject: "francais",
    objective:
      "Repérer les suffixes diminutifs les plus courants (-et, -ette, -on, -eau) en s'appuyant à la fois sur le sens et sur la forme des mots, et identifier les « faux » diminutifs comme bague/baguette.",
    competence:
      "S'appuyer sur la morphologie des mots pour en trouver le sens et former des diminutifs à l'aide des suffixes -ette, -eau, -on.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : apparier les mots qui se ressemblent",
        duration: "15 min",
        detail:
          "Projeter l'activité p. 46. Faire apparier les mots « qui se ressemblent » (fille/fillette, bague/baguette) et faire remarquer qu'une fillette est bien une petite fille, alors qu'une baguette n'est pas une petite bague. Faire refaire le même travail sur ardoise avec chat/chaton et blouse/blouson, puis lister au tableau les suffixes diminutifs rencontrés (-et, -ette, -on, -eau).",
      },
      {
        title: "Pour s'entrainer : compléter avec c'est / ce n'est pas",
        duration: "20 min",
        detail:
          "Travailler à l'oral, collectivement, les deux premières phrases, puis laisser les élèves compléter seuls les phrases suivantes avec « c'est » ou « ce n'est pas » et les mots manquants.",
        differentiation:
          "Étayer le raisonnement des élèves centrés uniquement sur la forme des suffixes en les recentrant sur le sens (ex. « une violette ressemble-t-elle à un petit violon ? »).",
      },
      {
        title: "Correction collective",
        duration: "15 min",
        detail:
          "Expliciter avec la classe les rapports de sens entre les paires de mots travaillées.",
      },
    ],
    material: ["Fichier de l'élève p. 46", "Ardoise ou cahier d'essais"],
    photocopies: [],
  },
  {
    id: "cleo-p2-9",
    title: "Je reconnais le verbe et le nom (1)",
    subject: "francais",
    objective:
      "Trier des mots en deux catégories, verbes et noms, d'abord de façon analogique (listes thématiques) puis à l'aide d'une procédure réflexive (« je peux… » pour un verbe, « le/la/les/un/une/des… » pour un nom).",
    competence:
      "S'approprier des procédures de reconnaissance des classes grammaticales « verbe » et « nom », en vue de l'accord en nombre (terminaisons -s ou -(e)nt au pluriel).",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : tri collectif d'étiquettes au tableau",
        duration: "15 min",
        detail:
          "Coller au tableau des étiquettes grand format en désordre (éplucher, nettoyer, tarte, couper, carotte, four…), tracer une ligne verticale, placer deux exemples de chaque côté, puis demander aux élèves de continuer le tri en relisant systématiquement la liste à chaque essai. Faire formuler puis reformuler les critères : à gauche les verbes (« je peux couper… »), à droite les noms de la cuisine.",
      },
      {
        title: "Application individuelle sur le fichier",
        duration: "15 min",
        detail:
          "Les élèves ouvrent le fichier p. 48 et réalisent la même activité individuellement.",
        differentiation:
          "Aider les faibles lecteurs à déchiffrer et accompagner la réflexion ; demander aux élèves rapides de continuer la liste avec des noms et verbes supplémentaires.",
      },
      {
        title: "Pour s'entrainer et correction collective",
        duration: "20 min",
        detail:
          "Réaliser l'activité « Pour s'entrainer » de même format (thème des vacances à la mer), puis corriger en faisant justifier chaque placement, de manière analogique et par la procédure réflexive.",
      },
    ],
    material: [
      "Fichier de l'élève p. 48",
      "Étiquettes grand format à manipuler",
      "Aide-mémoire (leçons n° 12 et 17)",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p2-10",
    title: "J'écris les mots avec s ou ss",
    subject: "francais",
    objective:
      "Choisir entre s et ss selon la règle : entre deux voyelles, un seul s donne le son [z], deux s donnent le son [s].",
    competence:
      "Automatiser le décodage et l'encodage des correspondances graphophonémiques apprises au CP, en particulier pour les sons proches.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : compléter les mots à l'oral puis à l'écrit",
        duration: "15 min",
        detail:
          "Projeter l'activité p. 50. Compléter oralement les mots avec [z] ou [s] en faisant justifier chaque réponse, puis formuler la règle en commun. Faire réaliser l'activité individuellement sur le fichier avec correction collective après chaque mot. Faire lire et commenter des paires comme cousin/coussin, poison/poisson, Lise/lisse, puis dicter quelques mots sur l'ardoise.",
      },
      {
        title: "Pour s'entrainer : écriture sans banque de syllabes",
        duration: "20 min",
        detail:
          "Les élèves écrivent seuls les mots correspondant aux dessins ; les graphèmes plus difficiles sont fournis en grisé et doivent être écrits en entier, y compris les lettres grisées à repasser.",
      },
    ],
    material: [
      "Fichier de l'élève p. 50",
      "Affiche n° 1",
      "Ardoise ou cahier d'essais",
      "Aide-mémoire (leçon n° 2)",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p2-11",
    title: "J'adapte ma lecture au fil du texte",
    subject: "francais",
    objective:
      "Lire un court texte phrase après phrase en éliminant au fur et à mesure les images qui ne correspondent plus à ce qui vient d'être lu, en révisant sa première interprétation si nécessaire.",
    competence:
      "Lire et comprendre en autonomie un texte narratif, informatif ou prescriptif, en associant les éléments de sens du texte à des images au fil de la lecture.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : élimination progressive des images, fichiers fermés",
        duration: "15 min",
        detail:
          "Projeter les cinq illustrations précédées d'un texte court. Faire lire une phrase à la fois par un élève à voix haute et demander quelles images peuvent déjà être éliminées, en justifiant chaque élimination, jusqu'à l'inférence finale qui désigne la seule image restante.",
      },
      {
        title: "Application sur le fichier et correction détaillée",
        duration: "20 min",
        detail:
          "Les élèves ouvrent le fichier p. 52 (mêmes images, texte différent) et réalisent l'activité individuellement, puis la correction reprend chaque étape du raisonnement en détail.",
        differentiation:
          "S'assurer que tous les élèves peuvent déchiffrer le texte lors de l'activité « Pour s'entrainer », de même format.",
      },
    ],
    material: ["Fichier de l'élève p. 52", "Pictogrammes-consignes"],
    photocopies: [],
  },
  {
    id: "cleo-p2-12",
    title: "J'écris les mots avec rt, rp, rs, st, str…",
    subject: "francais",
    objective:
      "Écrire des mots comportant des groupes consonantiques avec r (rt, rp, rs, st, str…) en s'appuyant sur les correspondances graphophonémiques déjà connues.",
    competence:
      "Automatiser le décodage et l'encodage des correspondances graphophonémiques apprises au CP, y compris pour les groupes consonantiques complexes.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : dire les mots à voix haute puis les écrire",
        duration: "15 min",
        detail:
          "Projeter ou reproduire l'activité p. 56, faire d'abord dire les mots à voix haute, puis laisser les élèves les écrire seuls sur le fichier, avec aide au besoin pour les élèves en difficulté. Correction immédiate.",
      },
      {
        title: "Pour s'entrainer : activité de même format",
        duration: "20 min",
        detail:
          "Les élèves réalisent l'activité 1 p. 56, de format identique à l'activité « Pour commencer ».",
      },
    ],
    material: ["Fichier de l'élève p. 56", "Pictogrammes-consignes"],
    photocopies: [],
  },
  {
    id: "cleo-p2-13",
    title: "Je conjugue les verbes au présent avec il, elle ou ils, elles",
    subject: "francais",
    objective:
      "Compléter des phrases en choisissant le verbe et la terminaison du présent qui conviennent avec les sujets il, elle, ils, elles, en s'appuyant sur la procédure : au pluriel la terminaison est presque toujours -ent, au singulier souvent -e.",
    competence:
      "Apprendre à conjuguer au présent de l'indicatif être, avoir et les verbes du premier groupe, en orthographiant les formes verbales en situation de dictée.",
    duration: "20 min",
    phases: [
      {
        title: "Collecte : affiche « à la recherche des verbes… »",
        duration: "15 min",
        detail:
          "Mettre en place une affiche « À la recherche des verbes au singulier avec il, elle, on et au pluriel avec ils, elles » ; les élèves y ajoutent, sur environ deux semaines, les formes verbales relevées dans leurs lectures (pronoms en bleu, verbes en rouge).",
      },
      {
        title: "Séance de tri : dégager les régularités",
        duration: "20 min",
        detail:
          "Trier collectivement au tableau les formes collectées selon leur terminaison, puis les élèves poursuivent individuellement ou à deux sur le cahier d'essais. Mise en commun pour dégager la procédure : au pluriel (ils/elles), terminaison presque toujours -ent (sauf ils/elles sont/ont) ; au singulier (il/elle/on), terminaison souvent -e (sauf il est/a).",
      },
      {
        title: "Pour commencer et Pour s'entrainer : compléter les phrases",
        duration: "20 min",
        detail:
          "Trier au tableau les formes verbales collectées en deux colonnes singulier/pluriel avec les étiquettes de conjugaison, puis les élèves complètent l'activité p. 58 en choisissant verbe et terminaison qui conviennent.",
        differentiation:
          "Éviter de faire conjuguer des verbes irréguliers comme finir à la 3e personne du singulier ; aider au déchiffrage des verbes et des phrases si nécessaire lors de l'activité « Pour s'entrainer ».",
      },
    ],
    material: [
      "Fichier de l'élève p. 58",
      "Affiches n° 25 à 29",
      "Étiquettes de conjugaison",
      "Aide-mémoire (leçons n° 25 à 29)",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p2-14",
    title: "Je maitrise l'apostrophe et les liaisons",
    subject: "francais",
    objective:
      "Distinguer, devant un nom commençant par une voyelle, un n initial appartenant au mot (un noyau, des noyaux) d'une simple liaison (un avion, des avions), et placer l'apostrophe correctement.",
    competence:
      "Orthographier correctement les mots fréquents et assurer la segmentation correcte des formes élidées et la bonne utilisation de l'apostrophe.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : tester le pluriel pour lever l'ambigüité",
        duration: "15 min",
        detail:
          "Écrire au tableau des mots comme « un avion », « un noyau », « un ombril », « un escabeau » avec un post-it cachant le début du nom. Faire lire, demander pourquoi on entend [n], puis vérifier au pluriel (« des avions » vs « des *navions ») si le n appartient au mot ou relève d'une liaison. Commenter ensuite les trois exemples de l'activité p. 60 (l'abeille, un arc avec liaison, lavabo en un seul mot).",
      },
      {
        title: "Pour s'entrainer : appliquer la procédure du pluriel",
        duration: "20 min",
        detail:
          "Les élèves réalisent l'activité 1 p. 60 en appliquant la procédure : « un avion, deux avions, trois avions… est-ce que j'entends toujours [n] ? » pour décider s'il s'agit d'une liaison ou d'un n initial réel.",
        differentiation:
          "Pictogrammes-consignes et plan simplifié des étapes disponibles sur le site compagnon pour les élèves qui en ont besoin.",
      },
    ],
    material: ["Fichier de l'élève p. 60", "Pictogrammes-consignes"],
    photocopies: [],
  },
];
