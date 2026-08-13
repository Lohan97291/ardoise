/**
 * Fiches de préparation Période 1 — Le Monde de Cléo CE1 (Retz, Antoine Fetet).
 * Contenu synthétisé à partir du guide pédagogique (p. 120 à 163), en respectant
 * la structure propre à chaque notion (phase collective « Pour commencer »,
 * phase individuelle « Pour s'entrainer », correction / prolongements).
 */

import type { PrepSheet } from "@/lib/ardoise-data";

export const CLEO_PREP_SHEETS_P1: PrepSheet[] = [
  {
    id: "cleo-p1-1",
    title: "Je comprends ce qui est « caché » dans un texte",
    subject: "francais",
    objective:
      "Comprendre de courts textes (microtextes) en distinguant l'explicite textuel, l'implicite textuel et l'implicite non textuel, et en s'appuyant sur des indices pour répondre à des questions de compréhension.",
    competence:
      "Lecture Cycle 2 — comprendre un texte en s'appuyant sur le lexique, la chaine anaphorique et des inférences simples (programmes 2025). Séquence de 29 séances réparties sur l'année.",
    duration: "20 min",
    phases: [
      {
        title: "Découverte collective du texte (Pour commencer, p. 8)",
        duration: "15 min",
        detail:
          "Projeter ou reproduire au tableau le texte de l'activité « Pour commencer ». Laisser les élèves le lire, puis le lire soi-même à haute voix pour garantir l'accès de tous au sens. Demander de rendre compte du texte de mémoire (« De quoi parle-t-on ? »), puis poser la question de compréhension. Faire pointer systématiquement les indices du texte qui justifient la réponse (ex. : vélo / deux lettres / une carte postale pour deviner le métier de facteur).",
        differentiation:
          "Aider les élèves les plus en difficulté à identifier les mots les plus difficiles à déchiffrer ; pour les faibles lecteurs, la lecture à voix haute de l'enseignant permet un accès au sens indépendant du déchiffrage.",
      },
      {
        title: "Traitement des réponses erronées et justification orale",
        duration: "10 min",
        detail:
          "Lire les réponses proposées par « d'autres élèves » dans le fichier et faire expliciter oralement pourquoi elles ne conviennent pas, en montrant du doigt les endroits du texte concernés (ex. : « Frédéric ne peut pas être coureur cycliste, parce qu'un coureur cycliste ne distribue pas le courrier »).",
      },
      {
        title: "Entrainement individuel : rédiger la réponse et souligner les indices",
        duration: "15 min",
        detail:
          "Les élèves répondent par écrit, de façon courte, en s'entrainant à la stratégie « répondre d'abord dans sa tête » avant de rédiger, puis soulignent dans le texte les indices qui justifient leur réponse. Pour les premiers entrainements de l'année, cette étape peut être menée collectivement afin que les élèves se familiarisent avec le format de l'activité.",
        differentiation:
          "Les réponses courtes (plutôt que des phrases complètes) sont privilégiées en début de CE1 pour ne pas distraire l'attention de la tâche de compréhension ; pictogrammes de consignes et tableau de structuration des tâches disponibles sur le site compagnon pour les élèves qui en ont besoin.",
      },
    ],
    material: [
      "Fichier de l'élève p. 8",
      "Pictogrammes consignes (site compagnon)",
      "Tableau de structuration des tâches (site compagnon)",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p1-2",
    title: "Je classe les mots dans l'ordre alphabétique",
    subject: "francais",
    objective:
      "Connaitre l'ordre alphabétique et l'utiliser pour ranger des listes de mots en ne tenant compte, au CE1, que de leur lettre initiale.",
    competence:
      "Commencer à mobiliser l'ordre alphabétique pour utiliser un dictionnaire adapté (CP) ; prendre l'habitude de consulter des articles de dictionnaire adapté (CE1). Séquence de 5 séances réparties sur un mois.",
    duration: "20 min",
    phases: [
      {
        title: "Récitation de l'alphabet et activité collective (Pour commencer, p. 9)",
        duration: "15 min",
        detail:
          "Faire réciter l'alphabet à plusieurs élèves, puis poser des questions d'appui sur la frise alphabétique affichée en classe (« Quelle lettre vient juste après f ? juste avant m ? »). Projeter l'activité « Pour commencer » : faire trouver l'animal commençant par la lettre juste après a (le boa), puis faire écrire le mot en cursive.",
      },
      {
        title: "Entrainement individuel : ranger et colorier l'initiale",
        duration: "15 min",
        detail:
          "Les élèves poursuivent seuls l'activité 1 p. 9, de même format, portant sur la seconde moitié de l'alphabet (généralement moins connue). Ils colorient l'initiale de chaque mot avant de le ranger dans l'ordre alphabétique.",
        differentiation:
          "Aider les élèves en difficulté ; les étiquettes à manipuler et le tableau de structuration des tâches sont disponibles sur le site compagnon.",
      },
      {
        title: "Correction et automatisation de l'alphabet",
        duration: "10 min",
        detail:
          "Repérer l'initiale coloriée ou mise en relief au tableau, réciter fréquemment l'alphabet lors de la correction. Pour les initiales situées dans la seconde moitié de l'alphabet, montrer qu'on peut repartir d'une lettre intermédiaire (ex. : l) plutôt que de a, pour gagner du temps.",
      },
    ],
    material: [
      "Fichier de l'élève p. 9",
      "Frise alphabétique affichée en classe",
      "Étiquettes à manipuler (site compagnon)",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p1-3",
    title: "Je découvre le singulier et le pluriel des noms",
    subject: "francais",
    objective:
      "Distinguer le singulier et le pluriel des noms et commencer à maitriser le pluriel des noms (finales en -s, -x, -z), en reconnaissant le groupe nominal (déterminant/nom).",
    competence:
      "Découvrir, comprendre et mettre en œuvre l'orthographe grammaticale — comprendre le lien entre déterminant, nom et adjectif dans la chaine d'accords ; introduire la notion de nombre (programmes 2025). Séquence de 7 séances réparties sur 5 semaines.",
    duration: "20 min",
    phases: [
      {
        title: "Observation collective (Pour commencer, p. 10)",
        duration: "15 min",
        detail:
          "Après une rapide lecture collective de la consigne, projeter l'activité « Pour commencer ». Observer le travail commencé par un élève dans le fichier en mettant en relation les illustrations, le choix des mots et la présence du -s au pluriel (ex. : « tables »).",
      },
      {
        title: "Entrainement individuel : classer les noms selon le déterminant",
        duration: "15 min",
        detail:
          "Les élèves terminent l'activité en autonomie (aide de l'enseignant si nécessaire), puis poursuivent avec l'activité 1 p. 10, de même format : écrire chaque nom avec un déterminant dans la colonne « un seul » ou « plusieurs ».",
        differentiation:
          "Étiquettes à manipuler et tableau de structuration des tâches disponibles sur le site compagnon pour les élèves qui en ont besoin.",
      },
      {
        title: "Correction et affichage évolutif du pluriel des noms",
        duration: "10 min",
        detail:
          "Écrire les groupes nominaux au tableau et mettre en place un affichage évolutif recensant les différents types de pluriel (-s, -eau/-eaux, -al/-aux, -eu/-eux, -s/-x/-z inchangés), complété au fil des séances. Il sera ensuite remplacé par les affiches n° 18 et n° 19, plus synthétiques.",
      },
    ],
    material: [
      "Fichier de l'élève p. 10",
      "Affichage évolutif « Le pluriel des noms »",
      "Étiquettes à manipuler",
      "Affiches n° 18 et n° 19",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p1-4",
    title: "J'écris les mots avec oi, ou, on",
    subject: "francais",
    objective:
      "Automatiser l'encodage des mots contenant les phonèmes oi [wa], ou [u] et on [ɔ̃], en s'appuyant sur une banque de syllabes et en repérant les lettres muettes.",
    competence:
      "Automatiser le décodage des correspondances graphophonémiques (CGP) apprises au CP, en vue de leur maitrise complète en fin d'année, y compris les sons proches (programmes 2025). Séquence de 3 séances réparties sur deux semaines.",
    duration: "20 min",
    phases: [
      {
        title: "Chasse aux mots et découverte collective (Pour commencer, p. 12)",
        duration: "15 min",
        detail:
          "Faire une rapide « chasse aux mots » oralement (mots avec oi, ou, on), les lister au tableau en écartant les graphies rares. Projeter l'activité « Pour commencer » : faire nommer les dessins, associer oralement le graphème étudié (« un roi, on entend [wa], qui s'écrit oi »), signaler les lettres grises muettes à repasser.",
      },
      {
        title: "Entrainement individuel avec banque de syllabes",
        duration: "15 min",
        detail:
          "Poursuivre avec l'activité 1 p. 12 : nommer le mot représenté, le segmenter mentalement en syllabes, chercher ces syllabes dans la banque proposée, les agencer puis écrire le mot entier sans s'arrêter. Faire une démonstration de la procédure avant de laisser les élèves travailler (barrer les syllabes utilisées au fur et à mesure).",
        differentiation:
          "Le professeur s'appuie sur les évaluations nationales de début d'année pour identifier les élèves aux acquis fragiles et met en place une consolidation de la conscience phonologique pour ces élèves.",
      },
      {
        title: "Correction individuelle et affiche référente",
        duration: "10 min",
        detail:
          "Une correction individuelle avec l'enseignant est plus efficace qu'une correction collective pour ce type d'activité. Présenter ensuite l'affiche n° 2 (oi/ou/on) une fois la compétence bien engagée, puis prévoir des dictées de mots réguliers (la bouche, un bouton, un poisson).",
      },
    ],
    material: ["Fichier de l'élève p. 12", "Affiche n° 2 (oi/ou/on)", "Étiquettes à manipuler"],
    photocopies: [],
  },
  {
    id: "cleo-p1-5",
    title: "Je comprends des phrases complexes",
    subject: "francais",
    objective:
      "Assurer la compréhension de phrases complexes comportant des reprises anaphoriques et des subordonnées relatives, à travers une tâche de coloriage d'un dessin.",
    competence:
      "Se repérer dans la chaine anaphorique et s'appuyer sur le sens du texte pour résoudre des ambigüités ; lire et comprendre en autonomie un texte narratif, informatif ou prescriptif (programmes 2025). Séquence de 4 séances réparties sur un mois.",
    duration: "20 min",
    phases: [
      {
        title: "Lecture collective et coloriage guidé (Pour commencer, p. 14)",
        duration: "15 min",
        detail:
          "Projeter l'activité « Pour commencer » et distribuer à chaque élève le dessin à colorier (téléchargeable sur le site compagnon). Lire et commenter la première phrase, demander une explicitation précise des reprises pronominales (« comme elle » → la maman). Préciser que les éléments non cités ne sont pas à colorier.",
      },
      {
        title: "Entrainement individuel de coloriage",
        duration: "15 min",
        detail:
          "Les élèves poursuivent seuls avec l'activité 1 p. 14, de même format. Les plus rapides sont invités à écrire une ou deux phrases supplémentaires à partir du matériau linguistique déjà présent, en lien avec des éléments non encore coloriés.",
      },
      {
        title: "Correction différée (a posteriori) et autocorrection",
        duration: "10 min",
        detail:
          "La correction collective n'est pas recommandée car elle focaliserait l'attention sur les couleurs plutôt que sur la compréhension. Prévoir une correction a posteriori par l'enseignant, ou un fac-similé colorié servant de corrigé pour l'autocorrection.",
      },
    ],
    material: [
      "Fichier de l'élève p. 14",
      "Dessin à colorier (site compagnon)",
      "Crayons de couleur",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p1-6",
    title: "Je découvre les familles de mots (1)",
    subject: "francais",
    objective:
      "Être capable de déterminer si deux mots sont de la même famille, en s'appuyant simultanément sur des indices de forme (ressemblance) et de sens (rapport avec le mot « chef de famille »).",
    competence:
      "Vocabulaire Cycle 2 — structurer le lexique pour percevoir les liens sémantiques et morphologiques que les mots entretiennent entre eux (programmes 2025). Séquence de 6 séances réparties sur un peu plus d'un mois.",
    duration: "20 min",
    phases: [
      {
        title: "Découverte collective de la famille de mots (Pour commencer, p. 16)",
        duration: "15 min",
        detail:
          "Projeter l'activité « Pour commencer ». Faire lire tous les mots et susciter les remarques des élèves (mots qui se ressemblent, qui « veulent dire pareil »). Chercher ensemble les mots de la famille de « poisson » : chaque mot est défini, mis en contexte, et testé selon les deux critères — ressemblance ET rapport de sens (ex. : « petit pois » ressemble mais n'est pas dans la famille ; « poissonnier » est dans la famille).",
      },
      {
        title: "Entrainement individuel (familles de chat / jardin)",
        duration: "15 min",
        detail:
          "Une lecture collective des mots peut préparer l'activité d'entrainement p. 16 (entourer les mots des familles de chat et de jardin). Aider les élèves à utiliser les mots en contexte pour les définir et juger de leur appartenance à la famille.",
        differentiation:
          "Aide de l'enseignant pour la lecture et la mise en contexte des mots les moins connus des élèves.",
      },
      {
        title: "Correction et mise en réseau du vocabulaire",
        duration: "10 min",
        detail:
          "Chaque mot est étudié et son appartenance à la famille testée en détail (« Un chameau, c'est un animal du désert, ça n'a rien à voir avec un chat »). Ce travail de mise en relation entre mots sera repris dès que l'occasion se présente dans d'autres contextes (ex. : géant/gigantesque).",
      },
    ],
    material: ["Fichier de l'élève p. 16"],
    photocopies: [],
  },
  {
    id: "cleo-p1-7",
    title: "J'écris les mots avec i/in, ai/ain",
    subject: "francais",
    objective:
      "Automatiser l'encodage de mots contenant i/in et ai/ain, en distinguant si le i (ou le a) appartient à une syllabe fermée par n ou non.",
    competence:
      "Automatiser le décodage des correspondances graphophonémiques (CGP) apprises au CP (programmes 2025). Séquence de 3 séances réparties sur 3 semaines.",
    duration: "20 min",
    phases: [
      {
        title: "Observation collective des finales (Pour commencer, p. 18)",
        duration: "15 min",
        detail:
          "Projeter l'activité « Pour commencer » et commencer collectivement la première ligne. Écrire au tableau la paire fin/fine et faire observer pourquoi on entend [ɛ̃] dans fin et pas dans fine, en découpant fine en syllabes (fi-ne : le i n'est pas lié au n de la syllabe suivante).",
      },
      {
        title: "Entrainement individuel guidé par l'oral",
        duration: "15 min",
        detail:
          "Faire d'abord dire à haute voix les mots à écrire, puis laisser les élèves travailler seuls sur leur fichier (activité 1 p. 18), en aidant au besoin les élèves en difficulté.",
        differentiation:
          "Étiquettes à manipuler et tableau de structuration des tâches disponibles sur le site compagnon pour les élèves qui en ont besoin.",
      },
      {
        title: "Correction individuelle",
        duration: "10 min",
        detail:
          "La correction, individuelle, prend place après la correction de l'enseignant, en revenant sur la remarque : le i fait parfois partie de la syllabe in/ain, sauf quand la syllabe se termine par le i lui-même.",
      },
    ],
    material: ["Fichier de l'élève p. 18", "Étiquettes à manipuler"],
    photocopies: [],
  },
  {
    id: "cleo-p1-8",
    title: "J'accorde le verbe avec le sujet (1)",
    subject: "francais",
    objective:
      "Être capable, dans des situations régulières, de marquer l'accord sujet/verbe à la 3e personne du singulier et à la 3e personne du pluriel, en construisant une phrase illustrée par une image.",
    competence:
      "Identifier la relation sujet-verbe à partir de l'observation des effets des transformations liées au changement de personne (programmes 2025). Approche orthographique de l'accord (et non de conjugaison). Séquence de 10 séances réparties sur 3 semaines (1re série : construction de phrase à partir de la p. 20).",
    duration: "20 min",
    phases: [
      {
        title: "Construction collective de phrase (Pour commencer, p. 20)",
        duration: "15 min",
        detail:
          "Projeter l'activité « Pour commencer ». Demander aux élèves de décrire les personnes des illustrations, puis construire la première phrase collectivement au tableau en choisissant les bonnes étiquettes (pronom + verbe accordé).",
      },
      {
        title: "Entrainement individuel avec étiquettes",
        duration: "15 min",
        detail:
          "Les élèves poursuivent avec l'activité 1 p. 20, de même format : pour chaque dessin, écrire une phrase en choisissant les étiquettes correspondantes (Il/Elle/Ils/Elles + forme verbale accordée).",
      },
      {
        title: "Correction et affichage référent",
        duration: "10 min",
        detail:
          "Insister, pendant la correction, sur le choix du pronom et de la forme verbale au singulier ou au pluriel. Mettre en place dès la première séance une affiche transitoire « À la recherche de verbes au pluriel », complétée au fil des séances, avant de la remplacer par l'affiche n° 23 une fois la notion bien engagée.",
      },
    ],
    material: ["Fichier de l'élève p. 20", "Étiquettes à manipuler", "Affiche n° 23"],
    photocopies: [],
  },
  {
    id: "cleo-p1-9",
    title: "J'écris les mots avec ar/ra, ir/ri, or/ro…",
    subject: "francais",
    objective:
      "Automatiser l'encodage de mots réguliers contenant ar/ra, ir/ri, or/ro (sans lettre muette), en s'appuyant sur la prononciation allongée des syllabes.",
    competence:
      "Automatiser le décodage des correspondances graphophonémiques (CGP) apprises au CP (programmes 2025). Séquence de 3 séances réparties sur 3 semaines.",
    duration: "20 min",
    phases: [
      {
        title: "Mots à trous et dictée sur ardoise",
        duration: "15 min",
        detail:
          "Écrire au tableau quelques mots à compléter avec ar/ra, our/rou, or/ro (dragon, crocodile, lame, porte, journal, tasse). Faire prononcer les syllabes en allongeant leur durée (« pooorrrrrte »), puis dicter quelques mots sur l'ardoise ou le cahier d'essais (le bras, la barbe, un trou, une tour).",
      },
      {
        title: "Activité collective puis entrainement individuel (p. 22)",
        duration: "15 min",
        detail:
          "Projeter l'activité « Pour commencer » p. 22, faire d'abord dire à haute voix les mots à écrire, puis laisser les élèves travailler seuls sur l'activité 1, sans banque de syllabes cette fois (mots réguliers, sans lettre muette).",
        differentiation:
          "Aider au besoin les élèves en difficulté ; pédagogie différenciée pour les élèves aux acquis phonologiques fragiles, identifiés via les évaluations nationales de début d'année.",
      },
      {
        title: "Correction individuelle",
        duration: "10 min",
        detail:
          "La correction, individuelle, prend place après la correction de l'enseignant. Prévoir une dictée de mots sur cette distinction quelque temps après la fin de la série.",
      },
    ],
    material: ["Fichier de l'élève p. 22", "Ardoise ou cahier d'essais"],
    photocopies: [],
  },
  {
    id: "cleo-p1-10",
    title: "J'associe des phrases et des images",
    subject: "francais",
    objective:
      "Entrainer diverses stratégies de compréhension en lecture (tournures passives, pronoms de reprise, relations de cause à effet, prise en compte d'hypothèses plausibles) en barrant les phrases incompatibles avec une image.",
    competence:
      "Entrainer diverses procédures et stratégies de compréhension en lecture (programmes 2025). Séquence de 9 séances réparties sur 10 semaines.",
    duration: "20 min",
    phases: [
      {
        title: "Analyse collective de l'image et des phrases (Pour commencer, p. 24)",
        duration: "15 min",
        detail:
          "Projeter l'activité « Pour commencer ». Faire décrire l'image, puis lire chaque phrase proposée en discutant sa validité (ex. : rejeter « Elles vont à l'école » si le groupe comprend un garçon). Faire reformuler la consigne : on ne barre que ce qui est impossible, contredit par l'image ou incompatible avec les connaissances du monde ; ce qui est seulement plausible n'est pas barré.",
      },
      {
        title: "Entrainement individuel",
        duration: "15 min",
        detail:
          "Poursuivre avec l'activité 1 p. 24, de même format. L'enseignant aide les plus faibles lecteurs à lire les phrases. Les élèves les plus rapides peuvent inventer des phrases supplémentaires ou rectifier les phrases barrées pour les rendre compatibles avec l'image.",
      },
      {
        title: "Correction et mise en commun",
        duration: "10 min",
        detail:
          "Faire suivre systématiquement l'activité individuelle d'une phase collective de mise en commun permettant l'explicitation et la justification des réponses.",
      },
    ],
    material: ["Fichier de l'élève p. 24"],
    photocopies: [],
  },
  {
    id: "cleo-p1-11",
    title: "Je classe les noms en catégories",
    subject: "francais",
    objective:
      "Percevoir de grandes catégories et hiérarchiser les termes génériques, de base et spécifiques : reconnaitre les caractéristiques communes à des objets et nommer la catégorie repérée au moyen d'une « étiquette ».",
    competence:
      "Établir des relations entre les mots — organiser intellectuellement le lexique à l'aide de mots-étiquettes / termes génériques (choix pédagogique du Monde de Cléo). Séquence de 6 séances réparties sur deux mois.",
    duration: "20 min",
    phases: [
      {
        title: "Découverte collective, fichiers fermés (Pour commencer, p. 26)",
        duration: "15 min",
        detail:
          "Projeter l'activité « Pour commencer », fichiers fermés. Faire repérer l'intrus dans la liste de mots (ex. : « feu rouge » parmi des moyens de transport) et faire expliciter pourquoi il ne va pas avec les autres. Dégager les caractéristiques communes des autres mots, puis discuter du mot-étiquette central qui les rassemble (« moyens de transport »), écrit au pluriel.",
      },
      {
        title: "Entrainement individuel",
        duration: "15 min",
        detail:
          "Les élèves ouvrent leur fichier et réalisent l'activité 1 p. 26, de même format : barrer l'intrus parmi les mots proposés, puis recopier les mots restants dans les cadres de la catégorie.",
        differentiation:
          "Aider les élèves les plus fragiles à déchiffrer les mots si nécessaire ; étiquettes à manipuler disponibles sur le site compagnon.",
      },
      {
        title: "Correction commune",
        duration: "10 min",
        detail:
          "Corriger en commun à chaque activité pour faire formuler les caractéristiques de la catégorie constituée, tout en explicitant pourquoi l'intrus n'en fait pas partie.",
      },
    ],
    material: ["Fichier de l'élève p. 26", "Étiquettes à manipuler"],
    photocopies: [],
  },
  {
    id: "cleo-p1-12",
    title: "Je découvre le passé, le présent et le futur",
    subject: "francais",
    objective:
      "Apprendre à identifier le verbe en repérant ses variations, et à distinguer le passé, le présent et le futur, à travers l'appariement de phrases en fort contraste temporel (« Avant... maintenant... »).",
    competence:
      "Découvrir, comprendre et mettre en œuvre l'orthographe grammaticale — identifier le verbe en repérant ses variations dans des situations simples (programmes 2025). Séquence de 7 séances réparties sur 6 semaines (1re série : appariement de phrases, à partir de la p. 28).",
    duration: "20 min",
    phases: [
      {
        title: "Manipulation orale et découverte collective (Pour commencer, p. 28)",
        duration: "15 min",
        detail:
          "Proposer oralement de compléter des phrases du type « Avant, j'allais au judo le samedi, mais maintenant... ». Écrire une phrase complète au tableau, entourer le verbe, faire trouver le verbe correspondant à l'autre temps (seule la terminaison change) et faire percevoir la différence de sens (passé/présent). Projeter ensuite l'activité « Pour commencer » et traiter oralement le premier couple de phrases en entourant les verbes.",
      },
      {
        title: "Entrainement individuel avec étiquettes",
        duration: "15 min",
        detail:
          "Poursuivre avec l'activité 1 p. 28, de même format : compléter les phrases à l'aide des étiquettes proposées, puis entourer les verbes dans les phrases.",
        differentiation:
          "Aider les élèves les plus faibles lecteurs à accéder au sens ; une correction collective est possible si de nombreux élèves ont échoué à repérer les verbes.",
      },
      {
        title: "Correction collective et institutionnalisation",
        duration: "10 min",
        detail:
          "Corriger collectivement pour renforcer le repérage des verbes et de leur temps. Prévoir, en prolongement, l'apprentissage de la leçon n° 19 de l'aide-mémoire et la présentation des affiches n° 28 à 31 (présent, futur, imparfait, passé composé).",
      },
    ],
    material: ["Fichier de l'élève p. 28", "Étiquettes à manipuler", "Affiches n° 28 à 31"],
    photocopies: [],
  },
  {
    id: "cleo-p1-13",
    title: "J'écris les mots avec ai, an, au, eau",
    subject: "francais",
    objective:
      "Automatiser l'encodage de mots contenant ai, an, au, eau, en repérant les lettres muettes finales et en retenant qu'en fin de mot, le son [o] s'écrit presque toujours eau.",
    competence:
      "Automatiser le décodage des correspondances graphophonémiques (CGP) apprises au CP (programmes 2025). Séquence de 3 séances réparties sur 3 semaines.",
    duration: "20 min",
    phases: [
      {
        title: "Découverte collective (Pour commencer, p. 30)",
        duration: "15 min",
        detail:
          "Projeter l'activité « Pour commencer ». Faire nommer les mots représentés par les dessins et associer oralement le graphème étudié (« une fraise, on entend [ɛ], qui s'écrit ai »). Rappeler que les lettres grises en fin de mot sont muettes mais doivent être écrites, et lister quelques noms réguliers en eau (bateau, château, oiseau).",
      },
      {
        title: "Entrainement individuel",
        duration: "15 min",
        detail:
          "Poursuivre avec l'activité 1 p. 30 : faire d'abord dire à haute voix les mots à écrire, puis laisser les élèves travailler seuls sur leur fichier en aidant au besoin les élèves en difficulté.",
        differentiation:
          "Étiquettes à manipuler et tableau de structuration des tâches disponibles sur le site compagnon pour les élèves qui en ont besoin.",
      },
      {
        title: "Correction individuelle",
        duration: "10 min",
        detail: "La correction, individuelle, prend place après la correction de l'enseignant.",
      },
    ],
    material: ["Fichier de l'élève p. 30", "Étiquettes à manipuler"],
    photocopies: [],
  },
];
