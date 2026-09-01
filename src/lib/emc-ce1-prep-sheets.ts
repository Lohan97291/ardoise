/**
 * Fiches de préparation — EMC CE1
 * Enseignement Moral et Civique — Guide pédagogique.
 *
 * Thèmes documentés :
 *   T1 — Altérité et sociabilité               (Fiches 12–15, p.71-86)
 *   T2 — Règles collectives et prises d'initiative (Fiches 16–18, p.89-100)
 *   T3 — Principes et symboles de la République (Fiches 19–22, p.103-118)
 */
import type { PrepSheet } from "@/lib/ardoise-data";

export const EMC_CE1_PREP_SHEETS: PrepSheet[] = [
  // ══════════════════════════════════════════════════════════════════
  //  THÈME 1 — ALTÉRITÉ ET SOCIABILITÉ
  // ══════════════════════════════════════════════════════════════════

  {
    id: "emc-s01-01",
    title: "Ça veut dire quoi «être différent»?",
    subject: "emc",
    objective:
      "Comprendre que les différences entre les êtres humains (dont le handicap) constituent une richesse et non un obstacle.",
    competence:
      "Respecter autrui et accepter les différences — Reconnaître les valeurs civiques.",
    duration: "45 min",
    phases: [
      {
        title: "Mise en situation — L'affiche «Peu importe»",
        duration: "10 min",
        detail:
          "Afficher l'affiche d'Élise Gravel «Peu importe» (document d'accroche). Q : « Que voyez-vous ? Qu'est-ce qui est écrit ? » Recenser les différences nommées dans l'affiche. Introduire la question de la séance : « Ça veut dire quoi être différent ? »",
      },
      {
        title: "Je découvre le handicap — Marie Patouillet et le handisport",
        duration: "15 min",
        detail:
          "Présenter le document sur le handisport et le portrait de Marie Patouillet (championne de ski alpin handisport). Q : « Qu'est-ce qu'un handicap ? Est-ce que le handicap empêche de tout faire ? » Visionner si possible la vidéo Canopé sur le handicap. Recenser collectivement les types de handicap (moteur, visuel, auditif, mental). Insister : le handicap est une différence, pas une infériorité.",
      },
      {
        title: "Je comprends qu'être différent est une richesse",
        duration: "12 min",
        detail:
          "Débat philosophique guidé : « Pourquoi est-ce bien d'être tous différents ? » Reformuler les arguments des élèves. Conclure : la diversité enrichit le groupe (compétences, points de vue, cultures différentes). Faire le lien avec la vie de classe.",
      },
      {
        title: "Bilan de la séance",
        duration: "8 min",
        detail:
          "Trace écrite collective : « Les différences entre les personnes (physiques, culturelles, de capacités) font la richesse de notre société. Le handicap est une différence. » Coller ou recopier dans le cahier de vie.",
      },
    ],
    material: [
      "Affiche «Peu importe» d'Élise Gravel (document projeté ou imprimé)",
      "Document sur le handisport / portrait de Marie Patouillet",
      "Vidéo Canopé sur le handicap (optionnel)",
    ],
    vocabulary: ["différence", "handicap", "handisport", "richesse", "diversité"],
  },

  {
    id: "emc-s01-02",
    title: "Qu'est-ce que le harcèlement?",
    subject: "emc",
    objective:
      "Identifier ce qu'est le harcèlement, distinguer les rôles de chacun et savoir comment réagir.",
    competence:
      "Comprendre le rôle de la victime, du harceleur et des témoins — Développer des attitudes de solidarité.",
    duration: "45 min",
    phases: [
      {
        title: "Mise en situation — Photo d'une situation ambiguë",
        duration: "8 min",
        detail:
          "Présenter une photo montrant une situation d'exclusion ou de moquerie à l'école. Q : « Que se passe-t-il sur cette photo ? Comment se sentent les personnes ? » Laisser les élèves réagir librement. Introduire le mot « harcèlement » sans le définir encore.",
      },
      {
        title: "Je découvre une situation de harcèlement — BD documentaire",
        duration: "12 min",
        detail:
          "Lire collectivement la bande dessinée sur le harcèlement (document du guide). Identifier : Qui est la victime ? Qui est le harceleur ? Qui sont les témoins (spectateurs) ? Q : « Qu'est-ce qui fait que c'est du harcèlement et pas une simple dispute ? » Dégager les critères : répétition, déséquilibre de pouvoir, intentionnalité.",
      },
      {
        title: "Je comprends le rôle de chacun — Programme pHARe",
        duration: "15 min",
        detail:
          "Présenter le programme pHARe et son logo. Expliquer les trois rôles : victime, harceleur, spectateur/témoin. Insister sur le rôle clé des témoins : se taire = participer au harcèlement ; agir = briser la chaîne. Q : « Que peut faire un témoin ? » (en parler à un adulte, soutenir la victime, ne pas rire). Mise en situation par petits groupes : jouer la scène de l'élève qui va voir le maître.",
      },
      {
        title: "Bilan de la séance",
        duration: "10 min",
        detail:
          "Trace écrite : « Le harcèlement, c'est quand on se moque souvent de quelqu'un pour lui faire du mal. La victime, le harceleur et les témoins ont chacun un rôle. Les témoins peuvent aider en alertant un adulte. » Rappeler le numéro 3020 (numéro national contre le harcèlement).",
      },
    ],
    material: [
      "Photo d'une situation d'exclusion (document projeté)",
      "BD sur le harcèlement (document guide p.76-77)",
      "Affiche ou document programme pHARe",
    ],
    vocabulary: ["harcèlement", "victime", "harceleur", "témoin", "spectateur", "répétition"],
    notes: ["Numéro 3020 à afficher en classe. Vérifier que les élèves connaissent les adultes référents de l'école."],
  },

  {
    id: "emc-s01-03",
    title: "Qu'est-ce qu'un stéréotype?",
    subject: "emc",
    objective:
      "Comprendre ce qu'est un stéréotype, identifier des stéréotypes de genre et comprendre pourquoi il faut les combattre.",
    competence:
      "Reconnaître et rejeter les préjugés — Égalité filles-garçons.",
    duration: "45 min",
    phases: [
      {
        title: "Mise en situation — Dessin animé Robocar Poli",
        duration: "10 min",
        detail:
          "Diffuser un extrait de Robocar Poli (ou visionner la vidéo «C'est quoi un stéréotype ?» adaptée aux CE1). Q : « Qu'est-ce que vous avez remarqué ? Y a-t-il des choses réservées aux filles ? Aux garçons ? » Recueillir les représentations initiales des élèves sur les stéréotypes de genre.",
      },
      {
        title: "Je découvre ce qu'est un stéréotype — Affiches jouets",
        duration: "12 min",
        detail:
          "Présenter les affiches «L'égalité commence par les jouets» (campagnes publicitaires). Q : « Qu'est-ce qu'on nous dit ? Pourquoi ces affiches ont-elles été créées ? » Définir le stéréotype : une idée toute faite sur un groupe de personnes qui n'est pas toujours vraie. Exemples : « Les filles aiment le rose. Les garçons n'aiment pas les poupées. »",
      },
      {
        title: "Je comprends pourquoi il faut combattre les stéréotypes — Peterson Ceus",
        duration: "13 min",
        detail:
          "Présenter le portrait de Peterson Ceus (gymnaste rythmique masculin). Q : « Pourquoi c'est surprenant pour certaines personnes ? Est-ce que c'est normal qu'une activité soit réservée à un seul genre ? » Discussion sur les sports, métiers, couleurs, jouets... Insister : les stéréotypes limitent la liberté de chacun.",
      },
      {
        title: "Bilan de la séance",
        duration: "10 min",
        detail:
          "Trace écrite : « Un stéréotype est une idée toute faite sur un groupe de personnes. Les stéréotypes de genre nous disent ce que les filles ou les garçons peuvent ou ne peuvent pas faire. Ce n'est pas juste : chacun doit pouvoir choisir librement. »",
      },
    ],
    material: [
      "Extrait dessin animé Robocar Poli ou vidéo «C'est quoi un stéréotype?»",
      "Affiches «L'égalité commence par les jouets»",
      "Portrait de Peterson Ceus (gymnaste rythmique)",
    ],
    vocabulary: ["stéréotype", "préjugé", "genre", "égalité", "liberté", "idée toute faite"],
  },

  {
    id: "emc-s01-04",
    title: "Comment peut-on s'entraider?",
    subject: "emc",
    objective:
      "Distinguer l'entraide et la solidarité, comprendre leur importance dans la vie collective.",
    competence:
      "Coopérer et mutualiser — Développer le sentiment d'appartenance à une communauté solidaire.",
    duration: "45 min",
    phases: [
      {
        title: "Mise en situation — L'affiche des deux ânes",
        duration: "8 min",
        detail:
          "Afficher l'image des deux ânes attachés ensemble essayant d'atteindre chacun un tas de foin situé de leur côté. Q : « Que se passe-t-il ? Comment les ânes pourraient-ils tous les deux manger ? » Laisser les élèves trouver la solution (se mettre d'accord, aller d'abord d'un côté puis de l'autre). Introduire : « C'est ce qu'on appelle l'entraide. »",
      },
      {
        title: "Je découvre ce qu'est l'entraide",
        duration: "12 min",
        detail:
          "Visionner une vidéo sur le travail d'équipe chez les animaux (pingouins se réchauffant en groupe, fourmis portant une charge, crabes s'aidant à sortir d'un seau). Q : « Pourquoi ces animaux s'entraident-ils ? Qu'est-ce qu'ils gagnent à le faire ? » Transposer à la vie de classe : exemples d'entraide vécus par les élèves.",
      },
      {
        title: "Je découvre ce qu'est la solidarité",
        duration: "15 min",
        detail:
          "Visionner la vidéo «C'est quoi la solidarité ?». Faire la distinction entre entraide (j'aide quelqu'un qui m'aide en retour) et solidarité (j'aide quelqu'un sans attendre de retour, parce que c'est juste). Présenter la sculpture «Maman» de Louise Bourgeois : l'araignée protège ses petits, image de protection et de soin. Q : « À quoi ressemble la solidarité dans notre école, dans notre quartier, dans le monde ? »",
      },
      {
        title: "Bilan de la séance",
        duration: "10 min",
        detail:
          "Trace écrite : « L'entraide, c'est s'aider mutuellement. La solidarité, c'est aider les autres sans attendre de retour, parce que c'est juste et humain. » Lister collectivement des exemples d'actions solidaires (Téléthon, Resto du cœur, partager son goûter…).",
      },
    ],
    material: [
      "Affiche ou image des deux ânes",
      "Vidéo sur le travail d'équipe dans le monde animal",
      "Vidéo «C'est quoi la solidarité?»",
      "Image de la sculpture «Maman» de Louise Bourgeois",
    ],
    vocabulary: ["entraide", "solidarité", "coopération", "partage", "aide mutuelle"],
  },

  // ══════════════════════════════════════════════════════════════════
  //  THÈME 2 — RÈGLES COLLECTIVES ET PRISES D'INITIATIVE
  // ══════════════════════════════════════════════════════════════════

  {
    id: "emc-s02-01",
    title: "Comment se comporter pour bien apprendre à l'école?",
    subject: "emc",
    objective:
      "Connaître les droits et devoirs des élèves à l'école et comprendre pourquoi les règles sont nécessaires.",
    competence:
      "Respecter les règles communes — Comprendre les notions de droits et de devoirs.",
    duration: "45 min",
    phases: [
      {
        title: "Document d'accroche — La Convention internationale des droits de l'enfant (CIDE)",
        duration: "10 min",
        detail:
          "Présenter l'affiche ou le document sur la CIDE. Q : « Qu'est-ce qu'un droit ? Avez-vous des droits ? Lesquels ? » Lister les droits des enfants évoqués (droit à l'éducation, à la santé, à jouer, à être protégé...). Faire le lien avec l'école : l'école est un lieu où ces droits s'exercent.",
      },
      {
        title: "Je découvre que les élèves ont des droits et des devoirs",
        duration: "15 min",
        detail:
          "Présenter le règlement intérieur de l'école (ou un extrait simplifié). Identifier ensemble les droits des élèves (apprendre, être respecté, être entendu) et leurs devoirs (écouter, respecter les autres, participer). Q : « Pourquoi a-t-on des devoirs si on a des droits ? » Insister sur la réciprocité : les droits des uns s'arrêtent là où commencent ceux des autres.",
      },
      {
        title: "Je comprends que mon comportement peut gêner les autres",
        duration: "12 min",
        detail:
          "Observer des vignettes illustrant des comportements perturbateurs (bavarder, se lever sans permission, ne pas écouter). Q : « Qui est gêné ? Pourquoi ? Que ressent l'enseignant, les camarades ? » Reformuler en positif : « Quels comportements aident tout le monde à apprendre ? » Co-construire une charte de la classe.",
      },
      {
        title: "Bilan de la séance",
        duration: "8 min",
        detail:
          "Trace écrite : « À l'école, les élèves ont des droits (apprendre, être respectés) et des devoirs (écouter, travailler, respecter les autres). Les règles existent pour que tout le monde puisse apprendre dans de bonnes conditions. »",
      },
    ],
    material: [
      "Affiche ou document CIDE (Convention internationale des droits de l'enfant)",
      "Règlement intérieur de l'école (version simplifiée)",
      "Vignettes illustrant des comportements en classe",
    ],
    vocabulary: ["droit", "devoir", "règlement", "règle", "élève", "responsabilité"],
  },

  {
    id: "emc-s02-02",
    title: "Pourquoi faut-il respecter les biens communs?",
    subject: "emc",
    objective:
      "Distinguer bien privé et bien commun, comprendre l'importance de respecter et d'entretenir les espaces collectifs.",
    competence:
      "Respecter et protéger l'environnement — Comprendre la notion de bien commun.",
    duration: "45 min",
    phases: [
      {
        title: "Mise en situation — Deux photos : jardin privé / parc public",
        duration: "8 min",
        detail:
          "Projeter deux photos côte à côte : un jardin privé bien entretenu et un parc public avec des dégradations (tags, poubelles renversées, jeux cassés). Q : « Qu'est-ce que vous voyez ? Quelle est la différence entre les deux ? Qui s'en occupe ? » Introduire la notion de bien privé vs bien commun.",
      },
      {
        title: "Je découvre ce que sont les biens communs",
        duration: "15 min",
        detail:
          "Lister avec les élèves des exemples de biens communs : école, bibliothèque, parc, terrain de sport, transports en commun... Q : « À qui appartiennent-ils ? Qui en profite ? Qui doit en prendre soin ? » Expliquer : un bien commun appartient à tout le monde et doit être respecté par tout le monde.",
      },
      {
        title: "Je comprends pourquoi et comment respecter les biens communs",
        duration: "12 min",
        detail:
          "Observer des photos de dégradations (tags sur murs d'école, matériel de jeu cassé, pelouse piétinée). Q : « Qui paye pour réparer ? Qu'est-ce que ça prive les autres enfants de faire ? » Transposer à l'école : le matériel collectif (livres, ciseaux, balles), les espaces (couloirs, cour, toilettes). Lister ensemble des gestes concrets : ramasser ses déchets, ne pas abîmer, signaler une dégradation.",
      },
      {
        title: "Bilan de la séance",
        duration: "10 min",
        detail:
          "Trace écrite : « Un bien commun appartient à tout le monde. Chacun en profite et chacun doit y prendre soin. Respecter les biens communs, c'est respecter tous les membres de la communauté. »",
      },
    ],
    material: [
      "Photos : jardin privé et parc public (projetées)",
      "Photos de dégradations d'espaces communs",
      "Document guide p.94-95",
    ],
    vocabulary: ["bien commun", "bien privé", "espace public", "dégradation", "respect", "communauté"],
  },

  {
    id: "emc-s02-03",
    title: "Que faire face à une situation dangereuse?",
    subject: "emc",
    objective:
      "Identifier des situations dangereuses à l'école et à la maison, savoir appeler les secours.",
    competence:
      "Assurer sa sécurité et celle des autres — Connaître les numéros d'urgence.",
    duration: "45 min",
    phases: [
      {
        title: "Mise en situation — Des situations à l'école et à la maison",
        duration: "10 min",
        detail:
          "Présenter plusieurs vignettes illustrant des situations (enfant seul qui se blesse, feu dans la cuisine, personne qui s'évanouit dans la rue, accident de vélo...). Q : « Est-ce que ces situations sont dangereuses ? Pour qui ? Que feriez-vous ? » Recueillir les réactions spontanées des élèves.",
      },
      {
        title: "Je repère des situations dangereuses et les bons réflexes",
        duration: "25 min",
        detail:
          "Classer les situations en catégories : danger immédiat / situation urgente. Pour chaque situation, réfléchir : 1. Protéger (moi, les autres — ne pas s'approcher d'un danger). 2. Alerter (appeler un adulte, appeler les secours). 3. Secourir (sans se mettre en danger). Apprendre le numéro d'urgence européen : 112. Distinguer les autres numéros : 15 (SAMU), 17 (Police), 18 (Pompiers). Mise en situation : simuler un appel au 112 (que dit-on ? — son nom, où on est, ce qui se passe).",
        differentiation:
          "Pour les élèves en difficulté : fiche mémo avec les numéros et les pictogrammes. Pour les élèves avancés : rédiger un message d'alerte complet.",
      },
      {
        title: "Bilan — Mémo SOS",
        duration: "10 min",
        detail:
          "Distribuer ou construire collectivement le mémo SOS : 112 (numéro d'urgence européen), 15 (SAMU), 17 (Police), 18 (Pompiers), 3114 (numéro national prévention suicide). Trace écrite : « Face à une situation dangereuse : je protège, j'alerte, je secours. Le 112 est le numéro d'urgence européen, disponible partout et gratuit. »",
      },
    ],
    material: [
      "Vignettes illustrant des situations dangereuses",
      "Mémo SOS (fiche à distribuer ou affiche)",
      "Téléphone factice pour la simulation d'appel",
    ],
    vocabulary: ["danger", "urgence", "secours", "alerte", "112", "SAMU", "pompiers", "protéger"],
    photocopies: ["Fiche mémo SOS avec numéros d'urgence"],
    notes: ["Vérifier que les élèves connaissent leur adresse. La simulation d'appel est essentielle."],
  },

  // ══════════════════════════════════════════════════════════════════
  //  THÈME 3 — PRINCIPES ET SYMBOLES DE LA RÉPUBLIQUE
  // ══════════════════════════════════════════════════════════════════

  {
    id: "emc-s03-01",
    title: "C'est quoi la laïcité?",
    subject: "emc",
    objective:
      "Comprendre le principe de laïcité : séparation du religieux et du politique, respect de toutes les croyances.",
    competence:
      "Comprendre et s'approprier les valeurs de la République — Respecter la laïcité.",
    duration: "45 min",
    phases: [
      {
        title: "Mise en situation — La Charte de la laïcité",
        duration: "8 min",
        detail:
          "Afficher la Charte de la laïcité (affichage obligatoire dans les écoles). Q : « Avez-vous déjà vu ce document dans l'école ? Que pensez-vous qu'il dit ? » Lire ensemble l'article 1 : «La France est une République indivisible, laïque, démocratique et sociale.» Formuler en mots simples : la laïcité, c'est quoi pour vous ?",
      },
      {
        title: "Je découvre ce qu'est la laïcité — BD «Des avis différents»",
        duration: "15 min",
        detail:
          "Lire la bande dessinée «Des avis différents» (document guide). Des personnages ayant des croyances différentes (chrétien, musulman, athée, juif...) vivent ensemble et se respectent. Q : « Est-ce que tout le monde croit la même chose ? Est-ce que c'est un problème ? Comment font-ils pour vivre ensemble ? » Dégager : la laïcité permet à chacun de croire ce qu'il veut, sans imposer sa religion aux autres.",
      },
      {
        title: "Je respecte le principe de laïcité — Articles de la Charte",
        duration: "12 min",
        detail:
          "Lire et expliquer plusieurs articles de la Charte de la laïcité (articles adaptés CE1). Insister sur : l'école est un lieu laïque → pas de signes religieux ostensibles, pas d'instruction religieuse. La laïcité protège tout le monde en garantissant la neutralité de l'État. Q : « Pourquoi est-ce important que l'école ne favorise aucune religion ? »",
      },
      {
        title: "Bilan de la séance",
        duration: "10 min",
        detail:
          "Trace écrite : « La laïcité est une valeur de la République française. Elle garantit la liberté de croire ou de ne pas croire. À l'école, on respecte toutes les croyances et on n'en impose aucune. »",
      },
    ],
    material: [
      "Charte de la laïcité (affichage de l'école ou document)",
      "BD «Des avis différents» (document guide p.104-105)",
      "Extraits de la Charte de la laïcité simplifiés CE1",
    ],
    vocabulary: ["laïcité", "croyance", "religion", "République", "neutralité", "liberté de conscience"],
  },

  {
    id: "emc-s03-02",
    title: "Quels sont les symboles de la République?",
    subject: "emc",
    objective:
      "Connaître et comprendre les principaux symboles de la République française (hymne, drapeau, devise, Marianne, fête nationale).",
    competence:
      "S'approprier les symboles de la République — Se sentir appartenir à une communauté nationale.",
    duration: "50 min",
    phases: [
      {
        title: "Mise en situation — La Marseillaise au stade",
        duration: "10 min",
        detail:
          "Diffuser un extrait vidéo de La Marseillaise chantée lors d'un match de rugby (ou tout événement sportif international). Q : « Reconnaissez-vous cette musique ? Pourquoi la joue-t-on ? Comment les joueurs et le public réagissent-ils ? » Introduire la notion de symbole national : un symbole représente un pays et ses valeurs.",
      },
      {
        title: "Je connais deux symboles de la République — La Marseillaise et le drapeau",
        duration: "15 min",
        detail:
          "La Marseillaise : présenter Rouget de Lisle (compositeur, 1792). Écouter et apprendre le premier couplet et le refrain. Expliquer le contexte historique en simplifiant. Le drapeau tricolore : bleu-blanc-rouge, ses origines (Révolution française). Q : « Où voit-on le drapeau français ? » (mairies, écoles, stades, ambassades...)",
      },
      {
        title: "Je découvre d'autres symboles — Mairie, Marianne, devise, 14 juillet",
        duration: "15 min",
        detail:
          "Projeter des photos : façade de mairie avec les symboles (drapeau, devise «Liberté, Égalité, Fraternité», buste de Marianne). Expliquer chaque symbole : Marianne (visage de la République, liberté), la devise (les trois valeurs fondamentales), le 14 juillet (commémoration de la prise de la Bastille, 1789). Q : « Avez-vous déjà vu ces symboles ? Où ? »",
      },
      {
        title: "Bilan de la séance",
        duration: "10 min",
        detail:
          "Trace écrite avec dessin ou étiquettes à coller : « Les symboles de la République française : La Marseillaise (hymne national), le drapeau tricolore (bleu-blanc-rouge), la devise Liberté, Égalité, Fraternité, Marianne, le 14 juillet (fête nationale). »",
      },
    ],
    material: [
      "Extrait vidéo La Marseillaise (match de rugby ou événement officiel)",
      "Paroles de La Marseillaise (1er couplet + refrain)",
      "Photos de la mairie, du drapeau, de Marianne",
      "Portrait de Rouget de Lisle",
    ],
    vocabulary: ["symbole", "hymne", "drapeau", "devise", "Marianne", "République", "fête nationale"],
    photocopies: ["Paroles de La Marseillaise (1er couplet et refrain)"],
  },

  {
    id: "emc-s03-03",
    title: "Le français, langue de la République",
    subject: "emc",
    objective:
      "Comprendre que le français est la langue officielle de la République et qu'il unit tous les territoires français.",
    competence:
      "Comprendre l'unité nationale — Découvrir la diversité des territoires de la République.",
    duration: "45 min",
    phases: [
      {
        title: "Mise en situation — Vidéo «Si c'était moi qui ne parlais pas français?»",
        duration: "10 min",
        detail:
          "Visionner la vidéo UNICEF «Si c'était moi qui ne parlais pas français?» (ou similaire). Q : « Qu'est-ce qui se passe pour cet enfant ? Comment se sent-il ? Pourquoi le français est-il important dans sa vie quotidienne ? » Recueillir les témoignages des élèves dont le français n'est pas la langue maternelle : quelle expérience ?",
      },
      {
        title: "Je découvre des documents officiels — Carte d'identité et passeport",
        duration: "15 min",
        detail:
          "Présenter (en reproduit ou anonymisé) une carte d'identité nationale et un passeport français. Q : « En quelle langue sont-ils rédigés ? Pourquoi ? » Observer : le français est la langue de l'état civil, des documents officiels, de la justice, de l'enseignement. Faire remarquer : «République française» sur tous les documents. Expliquer l'article 2 de la Constitution : «La langue de la République est le français.»",
      },
      {
        title: "Je comprends que le français unit tous les territoires",
        duration: "12 min",
        detail:
          "Montrer une carte de France avec les territoires d'outre-mer (Martinique, Guadeloupe, Guyane, La Réunion, Mayotte, Nouvelle-Calédonie, Polynésie française...). Q : « Ces territoires sont-ils en France ? Quelle langue y parle-t-on officiellement ? » Insister : malgré la distance et les langues locales (créole, langues kanak...), le français est la langue commune qui unit tous ces territoires au sein de la République.",
      },
      {
        title: "Bilan de la séance",
        duration: "8 min",
        detail:
          "Trace écrite : «Le français est la langue officielle de la République française. Il est parlé en France métropolitaine et dans les territoires d'outre-mer. Il permet à tous les citoyens de se comprendre et de participer à la vie de la République.»",
      },
    ],
    material: [
      "Vidéo UNICEF ou similaire sur la langue française",
      "Reproduction d'une carte d'identité et d'un passeport (anonymisés)",
      "Carte de France avec territoires d'outre-mer",
    ],
    vocabulary: ["langue officielle", "République", "Constitution", "outre-mer", "territoire", "document officiel"],
  },

  {
    id: "emc-s03-04",
    title: "Qu'est-ce qu'un lieu de mémoire?",
    subject: "emc",
    objective:
      "Comprendre ce qu'est un lieu de mémoire, pourquoi on commémore et comment entretenir la mémoire collective.",
    competence:
      "Comprendre le sens des commémorations — Développer un sentiment d'appartenance à une histoire commune.",
    duration: "50 min",
    phases: [
      {
        title: "Mise en situation — Omaha Beach et la sculpture «Les Braves»",
        duration: "12 min",
        detail:
          "Projeter une photo d'Omaha Beach (Normandie) aujourd'hui : plage, croix blanches du cimetière américain, sculpture «Les Braves» d'Anilore Banon. Q : « Qu'est-ce que vous voyez ? Savez-vous ce qui s'est passé ici ? » Expliquer sobrement : la Seconde Guerre mondiale, le Débarquement du 6 juin 1944. Q : « Pourquoi a-t-on construit ces monuments ? Pourquoi des gens viennent-ils encore là aujourd'hui ? » Introduire : un lieu de mémoire est un endroit qui aide à ne pas oublier.",
      },
      {
        title: "Je découvre des lieux de mémoire — Documents 1 à 4",
        duration: "18 min",
        detail:
          "Observer plusieurs documents : plaques commémoratives (sur les murs des écoles, des mairies), monuments aux morts, musées de la Résistance, le Mémorial de la Shoah. Q : « Qu'est-ce qu'ils ont en commun ? À quoi servent-ils ? » Définir le lieu de mémoire : un endroit, un objet ou une pratique qui garde vivant le souvenir d'un événement important pour une communauté. Expliquer les commémorations : le 11 novembre, le 8 mai, le 27 janvier (Journée de la mémoire de la Shoah).",
      },
      {
        title: "Je découvre un projet autour d'un lieu de mémoire",
        duration: "12 min",
        detail:
          "Présenter un exemple de projet scolaire autour du 11 novembre (document guide) : visite du monument aux morts de la commune, recueil de témoignages, correspondance avec des anciens combattants ou leurs familles, réalisation d'un livre de mémoire. Q : « Comment votre école ou votre commune commémore-t-elle ? Y a-t-il un monument aux morts près d'ici ? » Proposer un mini-projet de classe si possible (écrire une lettre à un soldat inconnu, dessiner un monument).",
      },
      {
        title: "Bilan de la séance",
        duration: "8 min",
        detail:
          "Trace écrite : «Un lieu de mémoire est un endroit où on se souvient d'un événement important de l'histoire. Les monuments aux morts, les musées, les plaques commémoratives sont des lieux de mémoire. Les commémorations (11 novembre, 8 mai...) permettent de ne pas oublier et de transmettre la mémoire aux générations suivantes.»",
      },
    ],
    material: [
      "Photo d'Omaha Beach et de la sculpture «Les Braves»",
      "Photos de plaques commémoratives, monuments aux morts",
      "Document sur un projet scolaire lié au 11 novembre (document guide p.117)",
    ],
    vocabulary: ["lieu de mémoire", "commémoration", "monument aux morts", "mémoire collective", "débarquement", "armistice"],
    notes: ["Adapter le niveau de détail sur la Seconde Guerre mondiale à la sensibilité des élèves. Rester factuel et sobre."],
  },
];
