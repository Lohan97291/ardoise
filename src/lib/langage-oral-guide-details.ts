/**
 * Données transcrites du sommaire du guide pédagogique « Langage oral CE ».
 * Les déroulés détaillés des doubles pages seront ajoutés séparément après
 * transcription ; aucune étape n'est déduite ici.
 */
import { ORAL_CATALOG } from "@/lib/ardoise-eval";
import type { PrepPhase, PrepSheet } from "@/lib/ardoise-data";

type OralSummary = {
  competence: string;
  objective: string;
  resources?: string[];
  duration?: string;
  phases?: PrepPhase[];
};

const SUMMARY: Record<number, OralSummary> = {
  1: {
    competence: "Jouer avec les mots ; dire pour être compris.",
    objective: "Construire le lexique ; trouver des synonymes.",
    duration: "30 minutes",
    phases: [
      {
        title: "Lancement de l'activité en grand groupe",
        detail:
          "Présenter une expression imagée, par exemple « avoir la main verte », puis faire rechercher sa forme et sa signification. Montrer que deux directions sont possibles : le mot à mot et l'explication.",
      },
      {
        title: "Recherche en petits groupes",
        detail:
          "Répartir la classe en groupes hétérogènes de quatre élèves. Chaque groupe reçoit une boîte contenant quatre expressions. À tour de rôle, un élève tire un papier, lit l'expression sans la montrer et essaie de la faire deviner sans utiliser les mots écrits.",
      },
      {
        title: "Mise en commun et bilan",
        detail:
          "Échanger sur la pertinence et l'originalité des formulations, lister les mots et expressions trouvés, puis revenir sur l'intérêt et les difficultés rencontrées.",
      },
    ],
    resources: [
      "Expressions et outils d'aide (CE1)",
      "Expressions (CE1)",
      "Expressions et outils d'aide (CE2)",
      "Expressions (CE2)",
    ],
  },
  2: {
    competence: "Utiliser le vocabulaire mémorisé ; participer à des échanges.",
    objective: "Construire le lexique ; savoir catégoriser des mots.",
    duration: "30 minutes",
    phases: [
      {
        title: "Écoute d'une courte histoire en grand groupe",
        detail:
          "Lire lentement à voix haute le texte « Le petit voleur de mots » et s'assurer de la compréhension du sens des trois premières phrases.",
      },
      {
        title: "Explicitation et première recherche en grand groupe",
        detail:
          "À partir de l'histoire, rechercher ce qu'est un mot doux, un mot piquant et des « mots chauds ». Lister les propositions validées par la classe et faire émerger d'autres types de mots : mots difficiles, mots blancs, jolis mots, mots drôles, mots de mauvaise humeur, mots qui font peur. Cibler une dizaine de « bocaux », avec cinq mots environ dans chacun.",
      },
      {
        title: "Recherche en petits groupes",
        detail:
          "Transposer le terme « recette » : construire une phrase avec une recette de mots, par exemple « 1 mot blanc + 1 mot long + 1 mot animal : le chat lape délicatement du lait ». Préciser le cadre : respecter la recette, pouvoir choisir l'ordre des mots et ajouter d'autres mots qui ne comptent pas pour la recette. Répartir les élèves en groupes hétérogènes de quatre à cinq. Chaque groupe cherche une phrase correspondant à une recette écrite au tableau ; le travail se mène à l'oral, puis les propositions sont énoncées et validées ou précisées par la classe.",
      },
      {
        title: "Synthèse et bilan",
        detail:
          "Reprendre quelques exemples, relire à voix haute les mots des différentes listes et verbaliser ce qui a été appris, les difficultés rencontrées, les découvertes et le plaisir éprouvé à jongler avec les mots.",
      },
    ],
    resources: ["Le Petit Voleur de mots, Nathalie Minne"],
  },
  3: {
    competence: "Utiliser le vocabulaire mémorisé ; prendre en compte un interlocuteur.",
    objective:
      "Construire le lexique ; mobiliser des mots pour mieux parler, mieux comprendre (les adjectifs qualificatifs).",
    duration: "30 minutes",
    phases: [
      {
        title: "Mise en situation en grand groupe",
        detail:
          "Projeter la fiche 3A au tableau et annoncer une enquête : retrouver le voleur parmi cinq suspects à partir de deux témoignages. Faire observer les images, lire la première description, puis la seconde, afin de faire émerger les mots qui permettent l'identification. Relever les mots au tableau et faire apparaître une rapide classification : couleur, forme, taille…",
      },
      {
        title: "Activité en petits groupes",
        detail:
          "Faire préciser le rôle des adjectifs et demander de décrire un personnage en utilisant un grand nombre d'adjectifs. En groupes de six, un élève décrit en une fois le personnage figurant sur sa carte 3C, puis la pose face retournée ; les autres doivent le retrouver parmi les illustrations proches de la fiche 3B. Veiller à construire des phrases et à varier les adjectifs. L'enseignant circule, aide et peut diriger un atelier d'élèves fragiles.",
      },
      {
        title: "Synthèse et bilan",
        detail:
          "Mener le bilan en grand groupe pour revenir sur les acquis, les difficultés et les réussites. Compléter une synthèse des adjectifs utilisés, par catégories, par exemple sous la forme d'une fleur de mots qui s'étoffera au fil de l'année.",
      },
    ],
    resources: ["5 suspects", "Portraits de personnages", "Cartes à jouer"],
  },
  4: {
    competence: "Adopter une distance critique par rapport au langage produit.",
    objective:
      "Se repérer dans la phrase simple ; reconnaître les principaux constituants de la phrase.",
    duration: "20 à 25 minutes",
    phases: [
      {
        title: "Rappel des connaissances",
        detail:
          "Rappeler en classe entière les principaux constituants de la phrase : le sujet, le verbe et les compléments, sans distinction. Organiser ce rappel sous la forme d'un jeu de rapidité : trouver très vite le sujet, le verbe ou le mot manquant dans des phrases proposées.",
      },
      {
        title: "Jeux sur la phrase",
        detail:
          "Faire pratiquer les jeux d'abord en classe entière, puis en groupes de six avec un meneur, ou en binômes. Faire trouver un verbe qui va avec le sujet, un sujet qui va avec le verbe, remplacer le sujet ou le verbe, continuer la phrase, ajouter un groupe de mots ou un complément de temps, puis remettre une phrase dans l'ordre. Commencer par des phrases courtes et complexifier progressivement.",
      },
      {
        title: "Bilan et analyse",
        detail:
          "Organiser un bilan sur les réussites et les difficultés rencontrées. Cibler individuellement les notions à reprendre ou à approfondir et affiner la progression en grammaire.",
      },
    ],
  },
  5: {
    competence:
      "Écouter attentivement et prendre en compte la parole de l'autre ; participer à une parole collective.",
    objective:
      "Se repérer dans la phrase simple ; utiliser les principaux constituants de la phrase.",
    duration: "30 minutes",
    phases: [
      {
        title: "Rappel des connaissances",
        detail:
          "Rappeler les connaissances autour de la phrase simple et de ses constituants. Proposer des exemples pour identifier le sujet, le verbe et les compléments, en élargissant selon le niveau de la classe et la progression : classes de mots, pronom personnel, groupe nominal, types et formes de phrases.",
      },
      {
        title: "Lancement de l'activité en classe entière",
        detail:
          "Construire une phrase en ajoutant un mot chacun son tour. Il peut parfois s'agir de deux mots, par exemple si le verbe en compte deux ou si un nom est donné avec son déterminant. Lorsque la phrase est terminée, en commencer une nouvelle. Faire un bref retour pour cibler les difficultés et trouver des solutions avant de poursuivre.",
      },
      {
        title: "Recherche en groupes",
        detail:
          "Répartir la classe en groupes hétérogènes de six élèves installés en cercles. Donner le même premier mot à chaque équipe, observer et accompagner le déroulement, puis demander à un rapporteur de dire la phrase du groupe. Poursuivre sans donner le mot initial : le premier participant commence avec un mot et ses camarades poursuivent la phrase. Inviter les élèves à mémoriser quelques phrases ; une structure de référence peut aider les élèves fragiles.",
      },
      {
        title: "Présentation à la classe et synthèse",
        detail:
          "Faire dire à chaque groupe une ou plusieurs phrases et permettre aux autres de les commenter sur la construction, la diversité des compléments et l'originalité. Choisir éventuellement deux phrases pour l'affiche mémoire sur la phrase simple en grammaire.",
      },
      {
        title: "Bilan",
        detail:
          "Permettre à chacun d'exprimer son ressenti et de cibler les obstacles qui persistent. Enrichir les observations et adapter la progression en grammaire et en langage oral.",
      },
    ],
  },
  6: {
    competence: "Dire pour être entendu et compris ; jeux sur l'articulation.",
    objective: "Identifier des mots de manière de plus en plus aisée.",
    duration: "2 fois 20 min + passages individuels sur des temps informels + 15 min",
    phases: [
      {
        title: "Écoute et essais en classe entière",
        detail:
          "Installer de bonnes conditions d'écoute et proposer le poème « L'Avion » de Pierre-Albert Birot. Après une deuxième écoute, recueillir les remarques générales et les sons particuliers, puis proposer un volume sonore contrôlé pour s'entraîner à articuler ces sons. Poursuivre avec « L'Onomatopée » d'Andrée Chedid, différencier les deux poèmes, identifier les jeux de mots autour du mot « onomatopée », puis articuler les petits mots et en proposer d'autres.",
      },
      {
        title: "Entraînement individuel",
        detail:
          "Après un bref rappel, inviter les élèves à s'entraîner à articuler les deux poèmes en chuchotant pour ne pas déranger les autres, puis choisir un passage à mémoriser. Distribuer les textes et identifier les passages ; l'enseignant circule, apporte son aide et observe les procédures de chacun.",
      },
      {
        title: "Passages individuels",
        detail:
          "Sur des temps informels, avant et après les récréations, entre deux séances ou en fin de journée, faire réciter à chacun son passage devant les autres, en respectant autant que possible l'écriture de chaque poème.",
      },
      {
        title: "Bilan",
        detail:
          "À l'issue des prestations, mener un bilan collectif sur l'ensemble de la séance : difficultés, réussites et apprentissages.",
      },
    ],
    resources: ["L'Avion, Pierre-Albert Birot", "L'Onomatopée, Andrée Chedid"],
  },
  7: {
    competence: "Dire pour être entendu et compris ; jeux sur l'articulation.",
    objective: "Identifier des mots de manière de plus en plus aisée.",
    duration: "15 min + temps courts mais fréquents",
    phases: [
      {
        title: "Écoute et lancement en grand groupe",
        detail:
          "Faire écouter un extrait de « Pierrot ou les secrets de la nuit », de Michel Tournier, recueillir les premières remarques et proposer une deuxième écoute, voire une lecture à voix haute accentuée pour les CE1. Faire repérer une quantité de mots en F et l'accent sur le son produit. Relever les mots de mémoire, avec le support visuel si besoin : froid, fer, faim, folie, fantôme, faiblesse, fraternel, fumée, force, fleur, feu, farine, flambée, festin, féerie.",
      },
      {
        title: "Entraînements réguliers",
        detail:
          "Rechercher d'autres mots avec les graphèmes fl, fr en début, milieu et fin de mots, puis prononcer à l'unisson, avec quelques interrogations individuelles. Poursuivre les entraînements en classe entière : mots inventés, mots qui se ressemblent, suites de mots ou phrases avec un même graphème complexe, graphèmes complexes proches, mots longs ou compliqués et mots qui s'enchaînent par la dernière puis la première syllabe sonore.",
      },
      {
        title: "Bilan",
        detail:
          "Observer les progrès et les points sensibles tout au long des séances. Organiser des temps de mesure de la fluence pour évaluer individuellement chaque élève, affiner la progression de classe et cibler les élèves à accompagner plus spécifiquement.",
      },
    ],
    resources: ["Pierrot ou les secrets de la nuit, Michel Tournier"],
  },
  8: {
    competence: "Produire un énoncé clair ; pratiquer différentes formes de discours.",
    objective: "Dire pour être entendu et compris.",
    duration: "10 min par séance",
    phases: [
      {
        title: "Présentation du jogging oral",
        detail:
          "Expliquer que, pour être à l'aise pour parler, il faut parler souvent. Présenter le jogging oral : tous les jours ou presque, consacrer dix minutes à des rituels de parole à partir d'une situation proposée à toute la classe. Un ou deux élèves prennent la parole sur la base du volontariat, restent à leur place et parlent pendant quelques minutes, puis laissent la place à un autre.",
      },
      {
        title: "Séances-rituels",
        detail:
          "Faire varier les situations déclenchantes individuelles et en binômes : raconter une matinée à la piscine, demander trois vœux à un génie, arriver en retard à l'école, décrire un rêve, expliquer une recette, convaincre ou raconter un événement. Les prestations peuvent être enregistrées si les enfants le souhaitent pour écouter les progrès en fluidité, en syntaxe, en lexique et dans l'organisation du propos.",
      },
      {
        title: "Bilan",
        detail:
          "Échanger régulièrement sur les réussites, les difficultés, les progrès et l'intérêt du jogging oral. Préciser les progrès individuels, notamment à partir des enregistrements écoutés dans le cadre d'une autoévaluation.",
      },
    ],
  },
  9: {
    competence: "Prendre en compte la parole de l'autre.",
    objective: "Participer à des échanges ; préparer à plusieurs ce que l'on veut et va dire.",
    duration: "40 min",
    phases: [
      {
        title: "Mise en place de la situation d'énonciation",
        detail:
          "Afficher la reproduction de « Ta Matete » de Gauguin et solliciter les échanges autour de la situation représentée. Mettre en relation les propositions, puis afficher la reproduction de Seurat et laisser la classe réagir en s'appuyant sur les éléments observés.",
      },
      {
        title: "Échanges en petits groupes",
        detail:
          "Par groupes de cinq, choisir l'un des deux tableaux et chercher ce que les personnages peuvent se dire. Partager les personnages, en choisir certains ou tous, et préparer au moins cinq phrases et cinq paroles prononcées. Répéter les phrases pour les dire devant la classe, sans écrit ; rappeler que les interlocuteurs tiennent compte de ce que l'autre vient de dire et que des phrases courtes peuvent intéresser les autres.",
      },
      {
        title: "Présentation au groupe classe",
        detail:
          "Présenter le fruit des recherches devant la classe. Faire remarquer la construction du dialogue et l'originalité des propos.",
      },
      {
        title: "Synthèse et bilan",
        detail: "Revenir sur la séance pour relever les points à améliorer.",
      },
    ],
    resources: ["Ta Matete, Gauguin", "Un dimanche après-midi à la Grande Jatte, Seurat"],
  },
  10: {
    competence: "Mobiliser des techniques qui font que l'on est écouté.",
    objective: "Dire pour être entendu et compris.",
    duration: "15 min par séance",
    phases: [
      {
        title: "Lancement en grand groupe",
        detail:
          "Faire écouter quelques phrases et inviter les élèves à commenter la façon dont elles ont été dites. Relever les critères d'une expression orale juste et intéressante à écouter : ton, pauses, voix, rythme, liaisons et volume. Proposer quelques essais à l'unisson, puis individuellement sur la base du volontariat.",
      },
      {
        title: "Séances d'entraînement",
        detail:
          "À partir de phrases issues du manuel de lecture ou de productions d'écrit, travailler la modulation de la voix, le volume, le rythme, la respiration, les groupes de souffle, les liaisons, l'accentuation et l'intonation. Faire varier la voix, le débit, les pauses, les groupes de mots, les liaisons et les tons.",
      },
      {
        title: "Séance de travail de la posture",
        detail:
          "Faire dire une courte phrase d'abord à l'unisson, puis seul face aux autres, en restant à sa place ou en cercle. Préciser les points à respecter : se tenir debout, respirer tranquillement, s'adresser à son auditoire en orientant la voix, croiser le regard des camarades et observer leurs réactions pour adapter la posture.",
      },
      {
        title: "Bilan",
        detail:
          "Revenir sur les critères travaillés et sur les progrès observés dans la manière de parler devant les autres.",
      },
    ],
    resources: ["Phrases"],
  },
  11: {
    competence: "Lire à voix haute un texte littéraire.",
    objective:
      "Lire, comprendre et interpréter un texte ; montrer sa compréhension par une lecture expressive.",
    duration: "40 min",
    phases: [
      {
        title: "Lecture-compréhension en classe entière",
        detail:
          "Distribuer le texte et inviter à une première lecture silencieuse. Selon la classe et la période de l'année, proposer une ou plusieurs parties du poème « Girafe » pour les CE1 ou du texte pour les CE2. Construire avec la classe la compréhension fine du texte et expliciter le vocabulaire nécessaire.",
      },
      {
        title: "Partage du texte, entraînement individuel et mise au point en groupe",
        detail:
          "Diviser la classe en groupes hétérogènes de huit, avec un groupe plus restreint si nécessaire. Chaque groupe lit le texte à voix haute devant les autres ; chacun prépare son paragraphe en pensant aux pauses, à la voix et au ton. Les élèves peuvent lire plusieurs fois en chuchotant, puis s'entraîner à lire le texte en entier ensemble ou mémoriser leur passage.",
      },
      {
        title: "Présentation devant le groupe classe et commentaires",
        detail:
          "Enchaîner les prestations. Cibler les réussites et les points à améliorer, verbaliser les ressentis et reprendre les enregistrements réalisés pour affiner l'analyse.",
      },
      {
        title: "Bilan",
        detail:
          "Revenir sur les difficultés, les réussites, le plaisir et la timidité ressentis pendant les lectures à voix haute.",
      },
    ],
    resources: ["Girafe, Marc Alyn (CE1)", "Méchant !, Anne Sylvestre (CE2)"],
  },
  12: {
    competence: "Lire à haute voix un texte documentaire.",
    objective:
      "Pratiquer différentes formes de lecture (genres de textes et modalités de lecture).",
    duration: "40 minutes",
    phases: [
      {
        title: "Appropriation du document en classe entière",
        detail:
          "Distribuer le texte aux binômes et préciser les parties : le titre et la bulle, les cinq paragraphes et leurs titres, ainsi que les légendes des deux photos. Apporter une aide individuelle ou collective pour le lexique difficile et les obstacles en lecture.",
      },
      {
        title: "Préparation en groupes de trois ou quatre",
        detail:
          "Répartir les élèves en fonction des textes choisis, équilibrer les groupes et attribuer toutes les parties du texte. Les élèves préparent leur lecture à voix haute ensemble, se conseillent et s'entraînent.",
      },
      {
        title: "Mise en place de la présentation en groupes de sept ou huit",
        detail:
          "Constituer des groupes de sept ou huit afin de reconstituer l'ensemble du document au sein d'un même groupe.",
      },
      {
        title: "Prestation devant une autre classe et commentaires",
        detail:
          "Réaliser la lecture à voix haute devant une autre classe, chaque groupe lisant le texte documentaire à un groupe de l'autre classe. Organiser les retours dans chaque atelier, sous la guidance de l'adulte qui note les remarques et les justifications.",
      },
      {
        title: "Bilan",
        detail:
          "En classe entière, revenir sur les ressentis et les partager. Cibler les réussites, les points à améliorer et la différence entre la lecture à voix haute d'un texte littéraire et celle d'un texte documentaire.",
      },
    ],
    resources: ["Un chantier gigantesque"],
  },
  13: {
    competence: "Écouter pour comprendre un texte lu par l'adulte ; participer à des échanges.",
    objective: "Comprendre un texte.",
    duration: "40 minutes",
    phases: [
      {
        title: "Première écoute et premières réactions",
        detail:
          "Faire écouter une philo-fable de Michel Piquemal. Pour les CE1, « Le coq ou la poule » porte un message sur la difficulté de faire entendre à quelqu'un qu'il a tort ; pour les CE2, « L'écho de mes paroles » demande de comprendre l'écho, l'intention du grand-père et le message délivré. Les premiers échanges situent les personnages, le lieu et la situation initiale.",
      },
      {
        title: "Deuxième écoute et échanges en petits groupes",
        detail:
          "Installer les élèves par groupes de quatre et faire écouter à nouveau l'histoire. Les élèves échangent sur l'histoire et sur ce qu'elle signifie. Après une dizaine de minutes, les mélanger et les regrouper par six afin de confronter les interprétations et de se mettre d'accord pour résumer l'histoire et expliquer ce qu'elle signifie.",
      },
      {
        title: "Mise en commun et discussion sur le sens du texte",
        detail:
          "Faire présenter le résumé par un duo de rapporteurs. Confronter les résumés, puis faire énoncer l'interprétation du message porté par l'histoire. Diriger un débat interprétatif et revenir au texte entendu ou lu pour valider la compréhension construite.",
      },
      {
        title: "Synthèse et bilan",
        detail:
          "Mener un retour réflexif sur l'intérêt des échanges pour mieux comprendre un texte et permettre aux élèves de prendre conscience de la pertinence de cette modalité.",
      },
    ],
    resources: [
      "Le coq ou la poule, Michel Piquemal (CE1)",
      "L'Écho de mes paroles, Michel Piquemal (CE2)",
    ],
  },
  14: {
    competence: "Écouter pour comprendre un texte lu par l'adulte ; organiser son discours.",
    objective: "Travailler la compréhension de texte.",
    duration: "40 min",
    phases: [
      {
        title: "Écoute du texte et lancement de l'activité",
        detail:
          "Regrouper les élèves par quatre en CE1 ou par six en CE2 et proposer l'extrait de « L'École de ma vie » à l'écoute active. Échanger sur les personnages, les animaux, les lieux et les ressentis de l'héroïne.",
      },
      {
        title: "Deuxième écoute et échanges pour affiner la compréhension",
        detail:
          "Faire écouter l'extrait une deuxième fois, puis échanger sur ce qui a été compris et retenu. Afficher si besoin une grille de vocabulaire ; fournir des outils de différenciation et proposer une nouvelle écoute ciblée.",
      },
      {
        title: "Élaboration de la reformulation",
        detail:
          "Demander aux élèves de raconter l'histoire avec leurs propres mots et ceux dont ils se souviennent. Dans chaque groupe, échanger, se mettre d'accord sur quelques phrases, puis désigner une phrase par élève pour la prestation orale.",
      },
      {
        title: "Entraînement à la prestation orale",
        detail:
          "Choisir une phrase, la mémoriser et s'entraîner à la dire ; s'appuyer si besoin sur le travail de la séance 10. Chaque groupe réalise ensuite sa prestation devant les autres, en observant les différences, les oublis, les ajouts, l'articulation et le ton.",
      },
      {
        title: "Présentation, commentaires et bilan",
        detail:
          "Construire tous ensemble une reformulation en retenant des phrases proposées et en en ajoutant d'autres. Enregistrer la nouvelle histoire si possible, puis clôturer par un bilan ciblant réussites, difficultés et apprentissages.",
      },
    ],
    resources: [
      "L'École de ma vie, Marie Desplechin (extrait 1, CE1)",
      "L'École de ma vie, Marie Desplechin (extrait 2, CE2)",
    ],
  },
  15: {
    competence: "Dire pour être entendu et compris (organiser son discours).",
    objective: "Travailler la compréhension de textes.",
    duration: "40 min",
    phases: [
      {
        title: "Écoute, échanges en binômes et vérification de la compréhension",
        detail:
          "Faire écouter attentivement les deux débuts d'histoires en classe entière, puis laisser quelques minutes aux binômes pour échanger. Vérifier la compréhension avec les élèves. Le loup tombé du livre permet d'échanger sur les contes traditionnels et les références de littérature de jeunesse ; Le Pinceau magique demande de poursuivre le dialogue entre le héros et son maître.",
      },
      {
        title: "Invention de la suite de l'histoire en binômes",
        detail:
          "Choisir l'un des deux débuts d'histoires et inventer la suite en binômes. Après 10 minutes, regrouper les binômes travaillant sur le même extrait par groupes de quatre, afin de confronter les idées, de se mettre d'accord sur une même histoire, puis de préparer sa présentation orale.",
      },
      {
        title: "Présentation à un autre binôme, confrontation, mise au point",
        detail:
          "Présenter l'histoire à un autre binôme travaillant sur le même extrait, confronter les propositions et mettre au point les phrases retenues. Prendre en compte les personnages, les lieux et l'époque du début ; construire une histoire avec un début, un ou plusieurs événements et une fin.",
      },
      {
        title: "Entraînement à la prestation orale",
        detail:
          "S'entraîner à la prestation par la mémorisation et la répétition. Les notes peuvent aider les élèves, notamment en CE2. Vérifier que les phrases sont bien construites et que le récit pourra être compris par les auditeurs.",
      },
      {
        title: "Présentation devant le groupe classe et commentaires",
        detail:
          "Enchaîner les prestations devant le groupe classe et les enregistrer. Commenter les prestations en observant la prise en compte du début, l'intérêt de l'histoire inventée, sa construction, les phrases, la compréhension par l'auditoire et la capacité du narrateur à le captiver.",
      },
      {
        title: "Bilan",
        detail:
          "Faire la synthèse des difficultés, des réussites et des apprentissages. Les enregistrements peuvent servir à l'auto-évaluation et à l'amélioration des prestations.",
      },
    ],
    resources: [
      "Le loup tombé du livre, Thierry Robberecht",
      "Le Pinceau magique, Didier Dufresne",
      "La fiche 15, à photocopier (p. 127 du bloc ressources)",
      "De quoi enregistrer les prestations",
    ],
  },
  16: {
    competence: "Raconter.",
    objective: "Exprimer ses émotions face à une œuvre d'art.",
    duration: "45 min",
    phases: [
      {
        title: "Affichage des 4 reproductions",
        detail:
          "Afficher les quatre reproductions, sur support papier ou numérique, et demander aux élèves de les observer silencieusement. Chacun choisit le tableau qui pourrait lui inspirer une histoire.",
      },
      {
        title: "Choix d'un tableau et regroupement",
        detail:
          "En CE1, se regrouper par trois autour d'un même support. En CE2, choisir un tableau et travailler par deux ; l'enseignant veille à ce que les deux œuvres soient différentes dans chaque binôme.",
      },
      {
        title: "Recherche",
        detail:
          "Observer attentivement le tableau et imaginer une petite histoire qui s'y passe. Rechercher les personnages, les lieux et les événements, échanger et se mettre d'accord. L'histoire doit raconter quelque chose qui arrive.",
      },
      {
        title: "Prestation orale",
        detail:
          "Après le temps de recherche, raconter l'histoire à un autre trio en CE1 ou au voisin en CE2. Les prestations peuvent être réalisées en même temps ; l'enseignant n'intervient pas, circule, observe et encourage.",
      },
      {
        title: "Commentaires et bilan",
        detail:
          "Chaque trio de CE1 ou binôme de CE2 commente les prestations entendues. Terminer par une synthèse des remarques et un retour réflexif sur les sentiments et les découvertes des élèves.",
      },
    ],
    resources: [
      "Les fiches 16A à 16D, en 7 exemplaires chacune (p. 43 à 97 du bloc ressources)",
      "Le Déjeuner, Claude Monet",
      "Les jeux d'enfants, Pieter Brueghel l'Ancien",
      "Wood with beech trees, Piet Mondrian",
      "Children playing on the beach, Mary Cassatt",
    ],
  },
  17: {
    competence: "Exprimer et justifier un choix.",
    objective: "Exprimer ses émotions, ses préférences.",
    duration: "20 min + temps informels (4 × 3 min) + 20 min",
    phases: [
      {
        title: "Écoute de quatre extraits musicaux, premiers échanges",
        detail:
          "Installer les élèves confortablement, sans rien sur les tables, et préparer l'écoute en leur demandant de repérer les petits bruits de la classe et de l'extérieur. Faire écouter La Marche royale du Lion, L'Éléphant, L'Aquarium et Le Coucou au fond des bois, avec des échanges après chaque extrait.",
      },
      {
        title: "Choix individuel",
        detail:
          "Entre les deux séances, faire écouter chaque morceau une ou deux fois, en écoute plaisir, en rappelant qu'il faudra faire un choix. Lors de la deuxième séance, chaque élève choisit l'extrait qu'il préfère et peut le réécouter si besoin.",
      },
      {
        title: "Expression des goûts et justification du choix",
        detail:
          "Procéder morceau par morceau : les élèves qui ont choisi l'extrait expliquent pourquoi. Poser des questions pour préciser les raisons de leur préférence et mener un questionnement ouvert autour des instruments, du rythme et du lien avec l'animal représenté. Relever les éléments disciplinaires et langagiers proposés.",
      },
      {
        title: "Bilan",
        detail:
          "Revenir sur l'intérêt, le plaisir, les difficultés et les apprentissages de la séance.",
      },
    ],
    resources: [
      "La marche royale du lion",
      "L'éléphant",
      "L'aquarium",
      "Le coucou au fond des bois",
    ],
  },
  18: {
    competence: "Dire pour être compris.",
    objective: "Partager des règles ; assumer des rôles.",
    duration: "30 à 40 min",
    phases: [
      {
        title: "Rappel des règles de trois jeux déjà connus",
        detail:
          "En salle d'EPS, annoncer l'objet de la séance et insister sur l'importance de paroles claires, compréhensibles, brèves, sonores et dites au bon moment. Rappeler les règles du béret, des lapins et du crocodile, et de la passe à 5.",
      },
      {
        title: "Mise en place",
        detail:
          "Mettre en place une équipe par jeu de 9 à 11 élèves. Les jeux se déroulent en même temps, sauf si l'espace ne le permet pas ; une équipe est alors observatrice.",
      },
      {
        title: "Pratique des jeux et changements de rôle",
        detail:
          "Faire jouer chaque groupe deux fois avec changement d'arbitre, puis changer les groupes de jeu. Chaque élève tient ainsi le rôle d'arbitre. Observer les prises de parole des arbitres et utiliser une grille d'évaluation portant sur le rôle de l'arbitre et les paroles prononcées.",
      },
      {
        title: "Bilan",
        detail:
          "Revenir sur les paroles prononcées : le ton, l'efficacité, l'utilité et la forme. Établir une grille de critères, par exemple : parler fort ; faire sonner le sifflet avant de parler ; faire des phrases courtes ; ne pas s'embrouiller dans les consignes ; ne pas donner d'ordre ; être impartial. Cibler les apprentissages et envisager la poursuite de la prise en main de l'arbitrage sur des jeux plus complexes.",
      },
    ],
  },
  19: {
    competence: "Dire pour être compris.",
    objective: "Adapter sa motricité à des environnements variés.",
    duration: "40 min (+ 20 min pour l'autre classe) + 15 min",
    phases: [
      {
        title: "Lancement de la situation",
        detail:
          "Organiser la séance d'EPS en extérieur, dans un espace sécurisé, et demander aux élèves ce que signifie le mot « orientation ». Recueillir les propositions autour de la direction, du déplacement, de l'espace, de l'environnement, de l'observation et des repères. Annoncer que la classe va installer et animer un jeu d'orientation pour une autre classe.",
      },
      {
        title: "Explication de la course en étoile et présentation du matériel",
        detail:
          "Expliquer la procédure du parcours en étoile avec des rubans qui signalent le chemin à suivre. Les rubans doivent être espacés et le suivant doit être visible depuis chacun. Faire préciser les endroits et le lexique adapté au lieu ; les mots sont listés par l'enseignant-e pour mémoire.",
      },
      {
        title: "Installation par équipes",
        detail:
          "Scinder la classe en six équipes de 4 à 5 élèves accompagnés d'un adulte. Distribuer à chaque équipe entre 8 et 10 rubans d'une couleur et un trésor. Chaque équipe installe deux parcours, en décidant des emplacements en concertation.",
      },
      {
        title: "Essai",
        detail:
          "Une fois les parcours terminés, inviter les équipes à essayer un autre chemin que celui qu'elles ont balisé.",
      },
      {
        title: "Échanges en classe entière",
        detail:
          "Organiser un temps d'échanges sur le parcours expérimenté et l'installation de chaque parcours. Veiller à ce qu'un grand nombre d'élèves participe et utilise le lexique souhaité.",
      },
      {
        title: "Retours de l'autre classe après réalisation du parcours",
        detail:
          "Après la réalisation du jeu d'orientation par l'autre classe, organiser un retour d'expérience entre les deux classes. Les élèves organisateurs peuvent justifier leurs choix.",
      },
      {
        title: "Bilan",
        detail:
          "À partir des commentaires des camarades de l'autre classe, améliorer l'installation pour une prochaine séance. Ajouter les nouveaux mots aux listes de la classe et demander à chacun d'en employer un ou plusieurs dans une phrase de son choix.",
      },
    ],
    resources: [
      "Espace extérieur (parc, forêt, école)",
      "Rubans de 6 couleurs différentes",
      "Un support papier rigide (bloc, cahier)",
      "6 « trésors » (figurines, petites voitures, cartes ou dessins réalisés en amont)",
    ],
  },
  20: {
    competence: "Utiliser un vocabulaire adapté (pour décrire des actions vues et à réaliser).",
    objective:
      "Mémoriser un enchaînement de pas et synchroniser ses actions à celles de partenaires.",
    duration: "15 min + 30 min",
    phases: [
      {
        title: "Visionnage de la vidéo et premiers échanges",
        detail:
          "Visionner la vidéo de la danse traditionnelle, puis échanger en classe entière sur le niveau de difficulté perçu, l'intérêt, la forme générale et le style musical.",
      },
      {
        title: "Visionnage fractionné et décryptage de la danse",
        detail:
          "Lors d'un deuxième visionnage fractionné, échanger en binômes et prendre quelques notes sur les déplacements, les mouvements et les formes de la danse. Mettre les remarques en commun pour mobiliser un lexique spatial, temporel et lié aux actions effectuées. Construire une affiche mémoire collective.",
      },
      {
        title: "Mise en pratique dans la salle d'EPS",
        detail:
          "Partager la classe en deux ou trois groupes. Dans chaque équipe de 8 à 12 membres, échanger sur les souvenirs et commencer à réaliser les mouvements à l'aide de l'affiche. L'enseignant-e observe et n'intervient qu'en cas de besoin ou de désaccord.",
      },
      {
        title: "Premier essai devant les autres, commentaires",
        detail:
          "Après 20 à 25 minutes, proposer à chaque groupe d'effectuer simultanément la danse, quelle que soit la longueur travaillée. Selon les observations, faire exécuter la danse étape par étape afin de mettre en commun et de préciser ce qui n'est pas juste.",
      },
      {
        title: "Entraînement et deuxième essai",
        detail:
          "Poursuivre l'entraînement en s'appuyant sur l'affiche et sur la mémoire des élèves. Les élèves se parlent et se comprennent pour coordonner leurs gestes et réussir ensemble.",
      },
      {
        title: "Danse avec toute la classe et bilan",
        detail:
          "Réunir tous les élèves et effectuer la danse ; corriger rapidement les erreurs par imitation des élèves les plus à l'aise et de l'enseignant-e. Revenir sur les réussites et les points à travailler ; une séance de reprise sera nécessaire avant une éventuelle présentation.",
      },
    ],
    resources: [
      "La vidéo de danse traditionnelle : Cercle circassien",
      "Salle d'EPS pour la pratique",
    ],
  },
  21: {
    competence: "Comprendre et s'exprimer à l'oral.",
    objective: "Construire l'esprit critique.",
    duration: "45 min",
    phases: [
      {
        title: "Visionnage progressif de la vidéo, échanges",
        detail:
          "Recueillir les représentations autour du mot « débat ». Visionner progressivement la vidéo « À quoi ça sert de débattre ? », avec des pauses permettant des échanges entre pairs et des clarifications sous la guidance de l'enseignant-e. Définir notamment point de vue, témoignage et esprit critique.",
      },
      {
        title: "Synthèse",
        detail:
          "Récapituler les points essentiels du temps d'échanges autour de la vidéo et établir une grille de critères. En CE1 : un sujet ou une question, parler librement, écouter les autres, ne pas se moquer, pouvoir ne pas être d'accord en expliquant pourquoi. En CE2 : une question commune, le droit de s'exprimer sans parler tous en même temps ni trop longtemps, justifier et parler clairement avec des phrases construites.",
      },
      {
        title: "Débat",
        detail:
          "Proposer de réfléchir en silence à un point important : il n'y a ni gagnant ni perdant dans un débat. Organiser une discussion réglée en tenant compte des prises de parole, du respect du cadre, de la proposition d'arguments et de l'acceptation de la contradiction.",
      },
      {
        title: "Synthèse du débat et bilan",
        detail:
          "Clôturer le débat par une synthèse des arguments. Revenir sur l'ensemble de la séance et du débat ; la grille peut être amendée.",
      },
    ],
    resources: ["La vidéo 21 : « À quoi ça sert de débattre ? »"],
  },
  22: {
    competence: "Prendre en compte la parole de l'autre ; justifier un point de vue.",
    objective:
      "Construire un point de vue et être capable d'accepter celui des autres dans une discussion réglée.",
    duration: "45 à 50 min",
    phases: [
      {
        title: "Rappel de la séance 21 et annonce de l'objet",
        detail:
          "Rappeler les points essentiels de la séance « Qu'est-ce que débattre ? » et annoncer une autre façon de débattre : la modalité des quatre coins.",
      },
      {
        title: "Visionnage de la vidéo et premiers échanges",
        detail:
          "Visionner en silence la vidéo « The Olive Branch : the sleep ». L'enseignant-e énonce ensuite un avis ; les élèves se regroupent selon leur point de vue et échangent pendant 5 à 8 minutes sur les raisons de leur choix.",
      },
      {
        title: "Débat « quatre coins », synthèse",
        detail:
          "Chaque groupe construit un argumentaire et le présente oralement aux autres par l'intermédiaire d'un ou deux rapporteurs. Les élèves peuvent changer de coin si un argument les convainc. Faire une synthèse des points essentiels des différents argumentaires.",
      },
      {
        title: "Deuxième débat et bilan",
        detail:
          "Proposer un autre débat sous une forme plus classique, en rappelant les règles du bon fonctionnement. Après un temps de réflexion individuel en CE2 ou en binômes en CE1, tenir le débat pendant 10 minutes, puis lister les différents points de vue argumentés. Revenir sur la tenue des débats et les points à améliorer.",
      },
    ],
    resources: ["La vidéo 22 : « The Olive Branch : the sleep »", "4 feuilles format A3"],
  },
  23: {
    competence: "Décrire.",
    objective: "Se repérer dans l'espace et le représenter en utilisant un langage approprié.",
    duration: "30 min",
    phases: [
      {
        title: "Lancement de l'activité avec réactivation du vocabulaire",
        detail:
          "Afficher ou projeter le plan de classe en CE1 ou le plan d'école en CE2. Laisser les élèves l'observer en silence, puis lire une courte description et les solliciter sur la correspondance entre le texte et l'image. Relever les mots importants : devant, à côté, face à, derrière, à gauche, à droite, sur le côté, du côté de, entre, ainsi que le lexique lié à la classe ou à l'école.",
      },
      {
        title: "Recherche en binômes",
        detail:
          "Distribuer un plan à chaque duo et annoncer la consigne : préparer une description très précise du plan, avec possibilité d'écrire quelques mots pour aider la présentation orale. L'enseignant-e circule en observateur, sans apporter d'aide sauf en cas de difficulté.",
      },
      {
        title: "Confrontation en groupes de 5",
        detail:
          "Regrouper les élèves ayant travaillé sur le même plan pour confronter leurs descriptions et se mettre d'accord sur une présentation précise avec un vocabulaire adapté. Deux rapporteurs de chaque groupe présentent ensuite leur plan au reste de la classe, qui doit retrouver celui dont il est question.",
      },
      {
        title: "Mise en commun et bilan",
        detail:
          "Après les présentations, demander à chacun d'écrire la lettre correspondant au plan reconnu. Justifier les identifications, synthétiser les échanges et enrichir l'affiche de vocabulaire. Revenir sur les difficultés, les réussites, les acquis et l'importance des mots utilisés.",
      },
    ],
    resources: [
      "2 descriptions d'un plan de classe (CE1)",
      "5 plans de classe (CE1)",
      "2 descriptions d'un plan d'école (CE2)",
      "5 plans d'écoles (CE2)",
    ],
  },
  24: {
    competence: "Repérer et mémoriser des informations importantes, les restituer.",
    objective: "Se repérer dans le temps et le mesurer.",
    duration: "45 à 50 min",
    phases: [
      {
        title: "Lancement de la séance",
        detail:
          "Annoncer que les élèves vont s'exercer à retenir des informations sur un sujet scientifique à partir d'une vidéo. Projeter « L'emploi du temps » et faire réagir les élèves sur la lecture erronée de l'emploi du temps de monsieur « Dring », puis préciser si besoin le mot « hebdomadaire ».",
      },
      {
        title: "Visionnage de la première vidéo et relevé des informations importantes",
        detail:
          "Poursuivre le visionnage avec des pauses pour faire reformuler ce qui vient d'être dit et faire participer les élèves les plus fragiles. Interroger la classe sur les éléments essentiels et sur le ressenti concernant les personnages, l'histoire, le graphisme et la clarté du propos.",
      },
      {
        title: "Visionnage de la deuxième vidéo et échanges en petits groupes",
        detail:
          "Scinder la classe en groupes hétérogènes de 5 ou 6. Chaque élève regarde la deuxième vidéo en silence et relève ce qui lui paraît intéressant, puis les élèves échangent pour mettre en commun les informations retenues. Choisir un ou une camarade qui les présentera au reste de la classe.",
      },
      {
        title: "Présentation devant la classe",
        detail:
          "Faire s'enchaîner les présentations des rapporteurs, sans intervention pendant qu'un camarade parle. Les élèves peuvent reprendre des éléments entendus précédemment.",
      },
      {
        title: "Mise au point d'une présentation commune et bilan",
        detail:
          "Revenir sur le contenu, notamment le mot « clepsydre », et sur la forme. Revoir la vidéo pour préciser les informations, vérifier les oublis et trouver des idées pour rendre la présentation plus vivante. Élaborer si possible une présentation finale collective, puis faire le bilan des réussites, difficultés et apprentissages.",
      },
    ],
    resources: [
      "Réseau Canopé : « L'emploi du temps » (CE1)",
      "Réseau Canopé : « Les instruments de mesure du temps » (CE2)",
    ],
  },
  25: {
    competence: "Rendre compte ; expliquer.",
    objective: "Mettre en œuvre une expérience simple impliquant l'eau.",
    duration: "30 min + 20 min + 10 min",
    phases: [
      {
        title: "Lecture commentée du premier document",
        detail:
          "Projeter la fiche 25A « Peut-on séparer les couleurs ? » et la faire lire, ou la lire, en s'assurant de la juste compréhension du texte et en explicitant les mots importants.",
      },
      {
        title: "Réalisation de l'expérience et préparation du compte rendu oral",
        detail:
          "Installer les élèves en ateliers de 4 à 5, avec un adulte. Distribuer la fiche 25B à chaque groupe. Les élèves lisent le support, disposent du matériel et s'organisent pour réaliser l'expérience, qui peut demander plusieurs essais. Chaque équipe prépare, sous la guidance de l'adulte, un bref compte rendu oral destiné à une autre classe.",
      },
      {
        title: "Compte rendu à une autre classe",
        detail:
          "Après un rappel de la séance et la désignation de deux rapporteurs par groupe, installer les élèves en duos de groupes, un de chaque classe. Les expérimentateurs rendent compte de leur expérience ; les auditeurs peuvent poser des questions et prendre des notes. Les enseignants régulent les interventions, puis les auditeurs donnent leurs remarques sur la clarté des explications, le lexique, l'ordre des étapes et l'intérêt.",
      },
      {
        title: "Écoute des remarques des auditeurs et bilan",
        detail:
          "Organiser un bilan à partir des retours de l'autre classe et du ressenti de chacun. Relever les points à améliorer et les noter sur une affiche afin d'en garder trace pour la prochaine fois, puis conclure par un bilan global de la séance.",
      },
    ],
    resources: ["Comment séparer les couleurs ?", "Une expérience pour séparer les couleurs"],
  },
  26: {
    competence: "Exposer.",
    objective:
      "Mettre en pratique les premières notions de gestion responsable de l'environnement.",
    duration: "45 min",
    phases: [
      {
        title: "Visionnage de la vidéo",
        detail:
          "Mettre en place les conditions d'un visionnage attentif d'une courte vidéo sur l'importance de la réduction des déchets, adaptée à chaque niveau. Préciser que les informations données feront l'objet de l'exposé et qu'il n'y aura pas d'échanges collectifs à la fin.",
      },
      {
        title: "Relevé des informations importantes en trios",
        detail:
          "Par groupes de 3, échanger sur les informations importantes retenues. Les élèves peuvent écrire quelques mots en CE1 et préciser leurs notes en CE2. Laisser le temps de discuter, puis circuler en intervenant le moins possible.",
      },
      {
        title: "Deuxième visionnage et précision des informations relevées",
        detail:
          "Après le second visionnage, rassembler les trios par deux pour confronter les éléments retenus. Choisir deux rapporteurs par groupe, puis laisser un temps de préparation pour l'ordre des informations et un essai de mise en voix.",
      },
      {
        title: "Mise en commun en petits groupes et préparation de l'exposé",
        detail:
          "Préparer un court exposé en organisant les informations retenues et en essayant la présentation orale.",
      },
      {
        title: "Présentation devant le groupe classe et commentaires",
        detail:
          "Faire s'exprimer les 4 ou 5 duos devant la classe. Mettre en relation les contenus et les prestations orales : oublis, erreurs, ajouts, phrases compréhensibles et claires, ton adapté et regard vers le public.",
      },
      {
        title: "Bilan",
        detail:
          "Revenir sur les réussites, les difficultés, le plaisir de travailler à partir d'une vidéo et les apprentissages.",
      },
    ],
    resources: [
      "1 jour, 1 question : « Comment réduire les déchets ? » (CE1)",
      "1 jour, 1 question : « Pourquoi faut-il réduire les déchets ? » (CE2)",
    ],
  },
  27: {
    competence: "Utiliser un lexique spécifique ; justifier.",
    objective: "Associer les désignations orales et écrites en chiffres des nombres.",
    duration: "45 min, en période 1 (CE1 et CE2)",
    phases: [
      {
        title: "Appropriation du tableau des nombres en collectif",
        detail:
          "Afficher un tableau numérique de 60 cases en CE1 ou de 100 cases en CE2, dont certaines sont cachées. Demander de donner chaque nombre caché en justifiant la réponse, en faisant référence à la suite des nombres et à la place de la case dans le tableau.",
      },
      {
        title: "Jeu en collectif",
        detail:
          "Solliciter différents élèves, demander la validation du groupe classe et faire reformuler les justifications. Mettre en relation les désignations des nombres, par exemple 23, vingt et trois, un 2 et un 3, 2 dizaines et 3 unités.",
      },
      {
        title: "Jeux en binômes",
        detail:
          "Distribuer des fiches où des cases sont restées vides. Les binômes trouvent le nombre, le disent et expliquent comment ils l'ont trouvé, puis échangent avec un autre binôme. L'enseignant-e observe les procédures et aide si besoin.",
      },
      {
        title: "Synthèse en classe entière",
        detail:
          "Présenter les résultats, chaque membre d'un groupe de 4 venant à tour de rôle. La validation se fait par la classe. Une nouvelle configuration du tableau peut être proposée aux élèves moins à l'aise.",
      },
      {
        title: "Bilan",
        detail:
          "Revenir sur les difficultés restantes et les progrès réalisés ; le bilan porte plutôt sur les ressentis individuels.",
      },
    ],
    resources: [
      "Tableau des nombres de 1 à 60 (CE1)",
      "6 tableaux à compléter (CE1)",
      "Tableau des nombres de 1 à 100 (CE2)",
      "6 tableaux à compléter (CE2)",
    ],
  },
  28: {
    competence: "Énoncer.",
    objective: "Comprendre et résoudre des problèmes (chercher, raisonner, communiquer).",
    duration: "45 min",
    phases: [
      {
        title: "Identification d'énoncés de problèmes parmi d'autres textes",
        detail:
          "Interroger les élèves sur ce qu'est, selon eux, un problème de mathématiques. Distribuer une fiche et inviter chacun à la compléter en échangeant avec son voisin. Mettre les réponses en commun et relever les caractéristiques d'un énoncé de problème.",
      },
      {
        title: "Caractérisation d'un énoncé de problème mathématique",
        detail:
          "Établir une première grille : un petit texte qui raconte une histoire, des informations avec des nombres et une question, souvent introduite par « combien ». En CE2, préciser que les informations doivent permettre de répondre à la question et que le texte ne contient pas la réponse.",
      },
      {
        title: "Production en binômes d'un énoncé",
        detail:
          "À partir d'une photographie, inventer un énoncé de problème. Mettre rapidement les idées en commun, préciser les informations utiles et retenir un énoncé sans image, clairement oralisé ou écrit si besoin.",
      },
      {
        title: "Expérimentation en groupes de 4",
        detail:
          "Par deux, créer un énoncé de problème sans photographie. Puis se regrouper par 4 : le premier duo propose son énoncé au second, qui essaie de le résoudre, et inversement. Échanger et améliorer les énoncés si besoin.",
      },
      {
        title: "Synthèse en classe entière et bilan",
        detail:
          "Synthétiser les remarques, préciser éventuellement les critères de réussite et exprimer les ressentis après la séance.",
      },
    ],
    resources: ["Énoncés de problèmes (CE1)", "Énoncés de problèmes (CE2)", "Boîte de feutres"],
  },
  29: {
    competence: "Utiliser un lexique spécifique ; expliquer une stratégie.",
    objective: "Comparer, estimer, mesurer des grandeurs (des longueurs).",
    duration: "45 min + 30 min",
    phases: [
      {
        title: "Rappel de la notion",
        detail:
          "Solliciter les élèves autour de la notion de grandeur puis de longueur. Synthétiser les propositions et noter les principaux mots cités : grand, petit, moyen, haut, long, large, taille, distance, profondeur, épaisseur, mesure, règle, centimètre, mètre.",
      },
      {
        title: "Comparaison de longueurs en collectif",
        detail:
          "Comparer des objets de la classe en variant la position spatiale de la grandeur considérée. Valoriser la comparaison directe et l'estimation visuelle justifiée ; l'activité se déroule à l'oral.",
      },
      {
        title: "Comparaison de longueurs en ateliers",
        detail:
          "Diviser la classe en groupes et proposer des objets de tailles différentes. Demander de les ranger du plus grand au plus petit, de montrer la preuve du classement et d'expliquer la stratégie aux autres. Les stratégies sont exposées, commentées et validées ou non.",
      },
      {
        title: "Mise en commun",
        detail:
          "Faire expliciter les procédures, les réussites et les échecs, puis synthétiser les remarques avant le retour en classe.",
      },
      {
        title: "Synthèse en classe entière : choix d'une stratégie",
        detail:
          "Par deux, ranger des bandes de papier de la plus longue à la plus courte et les coller sur une feuille support. Observer les procédures et verbaliser les erreurs, les stratégies possibles et les difficultés rencontrées.",
      },
      { title: "Bilan", detail: "Conclure ces deux séances en ciblant les apprentissages." },
    ],
  },
  30: {
    competence: "Décrire et expliquer en utilisant un lexique précis ; écouter attentivement.",
    objective:
      "Reconnaître, décrire, nommer, construire des figures ou assemblages de figures planes.",
    duration: "45 min",
    phases: [
      {
        title: "Lancement en collectif",
        detail:
          "Présenter les figures géométriques, solliciter leur identification et leur dénomination, puis verbaliser la stratégie nécessaire pour les tracer sur quadrillage. Recueillir les propositions, les mettre en relation et synthétiser la procédure validée par la classe.",
      },
      {
        title: "Expérimentation en binômes",
        detail:
          "Chaque élève reçoit deux figures de difficulté croissante et un support. Un élève fait tracer une figure géométrique à son camarade, qui vérifie et échange ; les rôles sont ensuite inversés. L'explication se fait sans questions du dessinateur ni interventions du locuteur en fonction du tracé observé.",
      },
      {
        title: "Mise en commun et synthèse en classe entière",
        detail:
          "Verbaliser les réussites et les éventuels échecs. Cibler les obstacles : manque de précision dans les explications, lexique approximatif, connaissances fragiles ou maladresses dans la motricité fine. Une grille de critères de réussite peut être établie.",
      },
      {
        title: "Bilan",
        detail: "Permettre à chacun de faire part de ses ressentis face à ce type d'expérience.",
      },
    ],
    resources: [
      "Figures géométriques (CE1)",
      "Papier pointé (CE1)",
      "Figures géométriques à réaliser (CE1)",
      "Figures géométriques (CE2)",
      "Figures géométriques à réaliser (CE2)",
    ],
  },
};

export const LANGAGE_ORAL_PREP_SHEETS: PrepSheet[] = ORAL_CATALOG.map((entry) => {
  const detail = SUMMARY[entry.seanceNum];
  return {
    id: `langage-oral-ce-${entry.id}`,
    title: `Séance ${entry.seanceNum} — ${entry.title}`,
    subject:
      entry.domain === "maths"
        ? "maths"
        : entry.domain === "arts"
          ? "arts"
          : entry.domain === "eps"
            ? "eps"
            : entry.domain === "emc"
              ? "emc"
              : entry.domain === "questionner_monde"
                ? "qlm"
                : "francais",
    objective: detail.objective,
    competence: detail.competence,
    duration: detail.duration ?? "",
    phases: detail.phases ?? [],
    material: detail.resources ?? [],
    photocopies: [],
  };
});
