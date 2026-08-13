/**
 * Fiches de préparation — Vivre la Musique CE1
 * Guide pédagogique ACCÈS Éditions.
 *
 * Séquences CE1 documentées :
 *   04 — Au Rythme de la Nature (p.98-113)
 *   05 — Chut!                  (p.116-131)
 *   06 — Panorama               (p.134-149)
 */
import type { PrepSheet } from "@/lib/ardoise-data";

export const VIVRE_LA_MUSIQUE_CE1_PREP_SHEETS: PrepSheet[] = [
  // ══════════════════════════════════════════════════════════════════
  //  SÉQUENCE 04 — AU RYTHME DE LA NATURE
  // ══════════════════════════════════════════════════════════════════

  {
    id: "vlm-s04-01",
    title: "Musique verte",
    subject: "arts",
    objective: "Découvrir que l'on peut produire des sons musicaux avec des éléments de la nature.",
    competence: "Situation déclenchante — Explorer et identifier des sources sonores naturelles.",
    duration: "55 min",
    phases: [
      {
        title: "Découverte — Projection vidéo Musique verte",
        duration: "10 min",
        detail:
          "L'enseignant diffuse la vidéo Musique verte. Q : « Que nous montre cette vidéo ? » R : On peut faire de la musique avec des éléments de la nature.\n\nConstruction collective du tableau Végétal / Geste :\n— Rondins → Frapper\n— Souche → Frapper\n— Pierres → Frapper ou frotter\n— Branche → Frotter sol\n— Écorce → Frotter tronc\n— Brin d'herbe → Souffler entre les pouces\n— Coquille → Souffler sous la lèvre\n\nQ : « Combien de gestes différents ? » R : SOUFFLER, FROTTER, FRAPPER.",
      },
      {
        title: "Loto sonore du papier",
        duration: "30 min",
        detail:
          "Les élèves manipulent différents papiers : aluminium, kraft, dessin, buvard, journal, soie. Ils explorent les sons produits par chacun et les associent à des images.",
      },
      {
        title: "Trace écrite",
        duration: "15 min",
        detail:
          "Mise en commun et trace écrite collective sur les gestes SOUFFLER / FROTTER / FRAPPER.",
      },
    ],
    material: [
      "Vidéo Musique verte",
      "Affiche tableau Végétal / Geste",
      "Papier aluminium, kraft, dessin, buvard, journal, soie",
    ],
    photocopies: ["Guide enseignant : p.98-99"],
    vocabulary: ["souche", "rondin"],
  },

  {
    id: "vlm-s04-02",
    title: "Symphonie forestière",
    subject: "arts",
    objective:
      "Créer une composition sonore collective à partir de sons naturels récoltés en forêt.",
    competence: "Création sonore — Organiser et diriger une production collective (Soundpainting).",
    duration: "60 + 40 min",
    phases: [
      {
        title: "Sortie en milieu naturel — collecte de sons",
        duration: "45 min (séance 1)",
        detail:
          "Sortie en forêt ou milieu naturel. Groupes de 4 à 6 élèves + dictaphone. Les élèves collectent les sons de la nature.",
      },
      {
        title: "Écoute des sons collectés",
        duration: "15 min (séance 1)",
        detail:
          "Réécoute des sons collectés au dictaphone. Repérage et classification collective (gestes : frapper, frotter, souffler).",
      },
      {
        title: "Reconstitution de l'orchestre symphonique",
        duration: "20 min (séance 2)",
        detail:
          "Reconstitution de l'orchestre symphonique avec des instruments naturels :\n— VENTS : brin d'herbe entre les pouces, coquille, goulot de bouteille vide…\n— PERCUSSIONS : pierres, rondins, souche, branche, bois, graines…\n— CORDES : branches tendues, lianes, fibres naturelles…",
      },
      {
        title: "Création sonore avec Soundpainting",
        duration: "20 min (séance 2)",
        detail: "L'enseignant dirige la création collective avec les gestes du Soundpainting.",
      },
    ],
    material: [
      "Dictaphone",
      "Affiche tableau VENTS / PERCUSSIONS / CORDES",
      "Éléments naturels collectés",
      "Ressources Soundpainting",
    ],
    photocopies: ["Guide enseignant : p.100-101"],
    vocabulary: ["concerto", "soliste", "tutti"],
  },

  {
    id: "vlm-s04-03",
    title: "Pastorale",
    subject: "arts",
    objective:
      "Découvrir la Symphonie n°6 de Beethoven et comprendre comment la musique peut décrire la nature.",
    competence:
      "Découverte des œuvres — Analyser un extrait orchestral, relier écoute et représentation visuelle.",
    duration: "40 min",
    phases: [
      {
        title: "Création d'une histoire sonore corporelle",
        duration: "10 min",
        detail:
          "Les élèves créent une histoire sonore avec les correspondances :\n— Pluie fine → tapoter un doigt\n— Pluie drue → tapoter plusieurs doigts\n— Tonnerre → frapper les poings sur la table\n— Vent → frotter la poitrine\n— Foudre → frapper deux mains\n— Grondement → frapper les pieds",
      },
      {
        title: "Découverte de la Pastorale de Beethoven",
        duration: "20 min",
        detail:
          "Écoute de la Pastorale. Tableau d'analyse :\n— LA PLUIE (légère) → violonistes frottent l'archet légèrement\n— LES GRONDEMENTS (menaçante) → violoncelles et contrebasses : TRÉMOLOS\n— L'ORAGE (puissante, instable, dissonante) → orchestre au complet\n— LA FOUDRE (brusque, violente) → timbales graves et cordes aiguës\n— L'ACCALMIE (apaisée) → violonistes reprennent le motif de la pluie, apaisé\n\nQ : « Les compositeurs sont-ils capables de décrire la nature ? » R : Beethoven réussit à décrire l'arrivée de l'orage, avec une montée progressive du vent, de la pluie et du tonnerre avant le retour au calme.",
      },
      {
        title: "Pictogrammes et trace écrite (musicogramme)",
        duration: "10 min",
        detail:
          "Utilisation de pictogrammes pour représenter les moments de la Pastorale. Trace écrite individuelle.",
      },
    ],
    material: [
      "Enregistrement Pastorale de Beethoven (Symphonie n°6)",
      "Tableau d'analyse",
      "Pictogrammes",
    ],
    photocopies: ["Guide enseignant : p.102-103"],
    vocabulary: ["musicogramme", "trémolo", "coup d'archet"],
  },

  {
    id: "vlm-s04-04",
    title: "L'arbre qui chante",
    subject: "arts",
    objective: "Découvrir le violon et la famille des instruments à cordes frottées.",
    competence:
      "Découverte des instruments — Identifier, comparer et classer des instruments à cordes frottées.",
    duration: "70 min",
    phases: [
      {
        title: "Famille des cordes — le violon",
        duration: "15 min",
        detail:
          "Famille des cordes → cordes frottées → violon.\nQ : « Qu'est-ce qui permet au violon de produire un son ? » R : Les cordes sont frottées par l'archet, et le son est amplifié par la caisse de résonance en bois.\n\nRépertoire proposé :\n— Danse macabre (Saint-Saëns)\n— Quatuor à cordes n°15 (Schubert)\n— Concerto pour violon (Paganini)\n— Over the Rainbow (Django Reinhardt et Grappelli — jazz manouche)",
      },
      {
        title: "Trois instruments à cordes frottées",
        duration: "20 min",
        detail:
          "Code hauteur :\n— 1 / Aigu / Violon / 67 cm\n— 2 / Medium / Violoncelle / 120 cm\n— 3 / Grave / Contrebasse / 180 cm\n\nRecherche documentaire sur les points communs et les différences entre les trois instruments.",
      },
      {
        title: "Carte d'identité du violon — trace écrite",
        duration: "20 min",
        detail:
          "Les élèves complètent la carte d'identité du violon. Parties : archet, ouïe, volute, cheville, chevalet, cordier, tablier, mentonnière, caisse de résonance.",
      },
      {
        title: "Recherche documentaire individuelle",
        duration: "15 min",
        detail: "Recherche individuelle ou en binômes sur les instruments à cordes.",
      },
    ],
    material: [
      "Images famille des cordes",
      "Carte d'identité du violon",
      "Ressources documentaires",
      "Enregistrements : Danse macabre / Quatuor à cordes n°15 / Concerto pour violon / Over the Rainbow",
    ],
    photocopies: ["Guide enseignant : p.104-105"],
    vocabulary: [
      "archet",
      "ouïe",
      "volute",
      "cheville",
      "chevalet",
      "cordier",
      "tablier",
      "mentonnière",
      "caisse de résonance",
      "soliste",
      "quatuor à cordes",
      "concerto",
      "jazz manouche",
    ],
  },

  {
    id: "vlm-s04-05",
    title: "Jeu de la forêt",
    subject: "arts",
    objective: "Explorer et encoder des sons produits avec des éléments naturels.",
    competence:
      "Exploration du son — Identifier, reproduire et coder des sons à l'aide de symboles.",
    duration: "55 min",
    phases: [
      {
        title: "Situation déclenchante",
        duration: "10 min",
        detail:
          "« Aujourd'hui, il y a eu une grosse tempête dans la forêt... Quatre animaux se retrouvent sans abri : le renard, le blaireau, le campagnol, le lièvre. » Chaque animal a un terrier associé à un parcours sonore.",
      },
      {
        title: "4 parcours sonores",
        duration: "20 min",
        detail:
          "Mise en place de 4 stations avec des éléments naturels (pierres, bois, coquilles, graines). Chaque station représente un animal et produit des sons caractéristiques.",
      },
      {
        title: "Jeu du terrier — encodage",
        duration: "15 min",
        detail:
          "Les élèves encodent les sons entendus avec des symboles définis collectivement. Chaque son correspond à un symbole.",
      },
      {
        title: "Dictée de sons (paravent)",
        duration: "10 min",
        detail:
          "Dictée de sons avec un paravent. Un élève produit un son derrière le paravent, les autres identifient de quel animal / terrier il s'agit grâce aux symboles.",
      },
    ],
    material: [
      "Éléments naturels : pierres, bois, coquilles, graines",
      "Paravent",
      "Cartes symboles",
    ],
    photocopies: ["Guide enseignant : p.106-107"],
    vocabulary: [],
  },

  {
    id: "vlm-s04-06",
    title: "Swing dans les bois",
    subject: "arts",
    objective:
      "Apprendre et interpréter une chanson de jazz en style swing, puis improviser sur gamme pentatonique mineure.",
    competence: "Chant — Mémoriser et interpréter une chanson. Improviser sur gamme pentatonique.",
    duration: "30 + 35 + 5 + 5 min",
    phases: [
      {
        title: "Découverte de la chanson — Chasse aux mots",
        duration: "10 min",
        detail:
          "Première écoute. Les élèves retiennent des mots entendus.\nQ : « Que se passe-t-il dans cette chanson ? » R : La chanson donne envie de danser. Elle parle d'un arbre, de forêt, de musique. On entend des métiers : bucheron, luthier.\nQ : « Quel style musical ? » R : Il s'agit d'une chanson de jazz.",
      },
      {
        title: "Découverte de la structure",
        duration: "10 min",
        detail:
          "En binômes, les élèves reconstituent l'ordre des paroles.\nQ : « Quels verbes dans chaque couplet ? » R : Couplet 1 : coupe, scie, élague. Couplet 2 : rabote, ponce, taille. Couplet 3 : chante, valse.\nStructure : INSTRUMENTAL / REFRAIN ×2 / COUPLET 1 / REFRAIN / COUPLET 2 / REFRAIN / INTERLUDE / COUPLET 3 / REFRAIN FINAL",
      },
      {
        title: "Apprentissage du refrain — méthode ping-pong",
        duration: "10 min",
        detail:
          "Ping-pong :\n— ENSEIGNANT : « Swing swing dans les bois » / ÉLÈVES : « Au son de l'épicéa »\n— ENSEIGNANT : « Tempo agile de chœur » / ÉLÈVES : « Rythme de l'arbre chanteur »\nNote : la blue note sol bémol — caractéristique du style jazz.",
      },
      {
        title: "Mise en condition corporelle et vocale",
        duration: "5 min",
        detail: "Historiette n°4 : Balade en forêt.",
      },
      {
        title: "Apprentissage des couplets",
        duration: "5 + 2×5 min",
        detail: "Apprentissage progressif couplet par couplet par ping-pong.",
      },
      {
        title: "Jeu d'improvisation — gamme pentatonique mineure",
        duration: "15 min",
        detail:
          "Improvisation sur la gamme pentatonique mineure.\nTrucs & Astuces : préparer l'instrument avec les notes de la gamme pentatonique mineure avant la séance.",
      },
      {
        title: "Interprétation",
        duration: "10 min",
        detail: "Interprétation collective de la chanson complète.",
      },
    ],
    material: [
      "Enregistrement Swing dans les bois",
      "Instrument avec gamme pentatonique mineure préparée",
      "Historiette n°4 Balade en forêt",
    ],
    photocopies: ["Guide enseignant : p.108-111"],
    notes: [
      "Partition : ♩ = 104 — Fa mineur",
      "Refrain : « Swing swing dans les bois / Au son de l'épicéa / Tempo agile de chœur / Rythme de l'arbre chanteur »",
      "Couplet 1 : « Coupe coupe bucheron / Scie et élague le tronc »",
      "Couplet 2 : « Rabot' et ponce luthier / Taille taille ton archet »",
      "Couplet 3 : « Chante chante violon / Valse valse tes chansons »",
    ],
    vocabulary: [],
  },

  {
    id: "vlm-s04-07",
    title: "Si six scies scient",
    subject: "arts",
    objective:
      "Créer une machine rythmique collective avec des ostinatos, en jouant sur les nuances de tempo.",
    competence:
      "Rythme — Réaliser et enchaîner des ostinatos, maîtriser l'accélérando et le ritardando.",
    duration: "55 min",
    phases: [
      {
        title: "Situation déclenchante — Rythme de la scie",
        duration: "10 min",
        detail:
          "Découverte du Rythme de la scie. Distribution d'une scie en carton à chaque élève pour mimer le geste.",
      },
      {
        title: "Découverte — outils de bucheron, gestes et onomatopées",
        duration: "15 min",
        detail:
          "Types d'actions avec onomatopées :\n— Pour couper → TAC TAC BANG\n— Pour débroussailler → BRRRR SCRITCH\n— Pour ratisser → RRRRRRRRR\nNotion d'OSTINATO : motif rythmique répété indéfiniment.",
      },
      {
        title: "Entraînement en binômes",
        duration: "10 min",
        detail: "En binômes, entraînement à enchaîner les ostinatos.",
      },
      {
        title: "Création de la machine à bucheronner",
        duration: "20 min",
        detail:
          "Groupes de 4 à 6 élèves. Chaque élève choisit un geste / ostinato. Mise en scène : la machine qui s'éveille progressivement — entrées successives, puis accélération (accélérando), puis ralentissement (ritenuto / ritardando / rallentando).",
      },
    ],
    material: ["Scie en carton", "Images outils de bucheron"],
    photocopies: ["Guide enseignant : p.112-113"],
    vocabulary: ["pulsation", "ostinato", "accélérando", "ritenuto", "ritardando", "rallentando"],
  },

  // ══════════════════════════════════════════════════════════════════
  //  SÉQUENCE 05 — CHUT!
  // ══════════════════════════════════════════════════════════════════

  {
    id: "vlm-s05-01",
    title: "Le silence de M. Martin",
    subject: "arts",
    objective: "Prendre conscience du silence comme dimension musicale et l'expérimenter.",
    competence: "Situation déclenchante — Définir le silence, en faire l'expérience sensorielle.",
    duration: "30 min",
    phases: [
      {
        title: "Jeu d'écoute — Ne pas déranger Monsieur Martin",
        duration: "10 min",
        detail:
          "Mise en place : une chaise au centre, un foulard posé dessus, un trousseau de clés. Un élève (M. Martin) est assis, les yeux fermés. Un autre élève essaie de prendre les clés sans se faire entendre.\nNote : ce jeu peut être utilisé pour ramener le calme en fin de journée.",
      },
      {
        title: "Définition du silence",
        duration: "10 min",
        detail:
          "Construction collective d'une affiche sur le silence.\nQ : « Qu'est-ce que le silence ? » R : C'est quand il n'y a aucun bruit. C'est comme une sorte de bulle. C'est quand on n'entend plus rien...\nQ : « Est-ce qu'on peut utiliser le silence en musique ? » R : Hypothèses recueillies et affichées.",
      },
    ],
    material: ["Chaise", "Foulard", "Trousseau de clés", "Affiche"],
    photocopies: ["Guide enseignant : p.116-117"],
    vocabulary: ["silence", "quiétude / calme", "silencieux"],
  },

  {
    id: "vlm-s05-02",
    title: "Sans son",
    subject: "arts",
    objective:
      "Découvrir deux œuvres musicales contemporaines qui explorent le silence (Monoton-Silence, 4'33).",
    competence:
      "Découverte des œuvres — Analyser le rôle du silence dans une composition musicale.",
    duration: "50 min",
    phases: [
      {
        title: "Découverte de Monoton-Silence — Yves Klein",
        duration: "10 min",
        detail:
          "Diffusion des 2 premières minutes + silence de 8'-9'.\nNote : LA SYMPHONIE MONOTON-SILENCE : d'abord un accord en Ré majeur pendant 20 minutes, puis un silence de même durée.\nQ : « Qu'est-ce qui vous surprend ? » R : L'orchestre joue toujours la même note, il n'y a pas de mélodie. Tout à coup, il y a un silence brutal qui dure très très longtemps!\nQ : « Pourquoi ce titre Monoton-Silence ? » R : Parce que c'est monotone... Monoton peut se lire mono-ton : un seul ton.",
        differentiation:
          "Associer la durée du silence à l'éclairage de la classe (allumer / éteindre la lumière).",
      },
      {
        title: "Défi lancé à la classe",
        duration: "10 min",
        detail:
          "Jeu avec les petites percussions : 30 secondes de son + 30 secondes de silence.\nQ : « Quelle sensation ? » R : Le temps paraît plus long quand il y a du silence, alors que la durée est strictement identique.",
      },
      {
        title: "Découverte de 4'33 — John Cage",
        duration: "10 min",
        detail:
          "Q : « Y a-t-il besoin d'une partition ? » R : Pas besoin de jouer puisque le pianiste ne joue pas ! Mais il y a quand même une partition posée sur le piano.\nTableau :\n— Un compositeur : John Cage\n— Un public : oui\n— Une situation d'écoute : salle de concert\n— Un interprète : pianiste sur piano à queue\n— Une partition : oui, posée sur le piano\n— Le son : recherche sonore — pousser le public à l'écoute de son propre son",
      },
      {
        title: "Vers la création",
        duration: "10 min",
        detail:
          "En groupes de 6 à 8 élèves, à la manière de 4'33, inventer une pièce silencieuse et la présenter à une autre classe.",
      },
    ],
    material: [
      "Enregistrement Monoton-Silence (Yves Klein)",
      "Enregistrement 4'33 (John Cage)",
      "Jeu de petites percussions",
    ],
    photocopies: ["Guide enseignant : p.118-119"],
    vocabulary: [
      "silence",
      "son",
      "alternance",
      "geste",
      "interprète",
      "compositeur",
      "public",
      "concert",
      "partition",
    ],
  },

  {
    id: "vlm-s05-03",
    title: "Une p'tite pause?",
    subject: "arts",
    objective: "Comprendre et représenter la notion de silence dans une grille rythmique.",
    competence:
      "Rythme — Passer du son au silence, représenter les silences avec des post-it sur une grille.",
    duration: "35 min",
    phases: [
      {
        title: "Échauffement — furet rythmique",
        duration: "5 min",
        detail: "Jeu du furet rythmique sur la Formule rythmique furet CHUT! n°1 ou n°2.",
      },
      {
        title: "Frappé de la pulsation",
        duration: "5 min",
        detail:
          "Grille plastifiée A3 «Vers le silence» + 10 post-it jaunes. 8 cases avec post-it jaunes. Frapper la pulsation de différentes façons : mains, claquer la langue, frapper la poitrine, claquer des doigts. Varier pianissimo / fortissimo.",
      },
      {
        title: "Introduction de la notion de silence",
        duration: "5 min",
        detail:
          "10 post-it jaunes (enseignant) + 10 post-it roses (élèves). Ligne jaune + ligne rose, cases vides = silences. Remplacer le frappé par un geste silencieux :\n— Cligner des yeux\n— Faire un rond avec la bouche\n— Incliner la tête\n— Faire un soleil avec la main\nL'enseignant propose d'autres compositions en déplaçant ou supprimant des post-it roses.",
      },
    ],
    material: [
      "Grille plastifiée A3 «Vers le silence»",
      "10 post-it jaunes + 10 post-it roses",
      "Instrument à percussion",
      "Formule rythmique furet CHUT! n°1 ou n°2",
    ],
    photocopies: ["Guide enseignant : p.120-121"],
    vocabulary: [],
  },

  {
    id: "vlm-s05-04",
    title: "Reines du silence",
    subject: "arts",
    objective:
      "Découvrir le fonctionnement des sourdines et comprendre comment elles modifient le son d'un instrument.",
    competence:
      "Découverte des instruments — Comprendre la notion de sourdine, identifier son effet sur le timbre.",
    duration: "60 min",
    phases: [
      {
        title: "Situation déclenchante",
        duration: "5 min",
        detail:
          "Q : « Pour quelles raisons cherche-t-on parfois à atténuer le son d'un instrument ? » R : Pour faire moins de bruit, pour ne pas réveiller un enfant qui dort, pour ne pas déranger les voisins.\nQ : « Connaissez-vous des moyens de réduire le volume sonore d'un instrument ? » R : En le bouchant avec la main, en soufflant moins fort, en l'emballant...",
      },
      {
        title: "Recherche — inventer une sourdine",
        duration: "20 min",
        detail:
          "Groupes de 4 à 6 élèves. Chaque groupe : 1 instrument à vent + 1 à cordes + 1 à percussion + matériaux variés (mouchoirs, carton, bouchons, gobelets, aluminium, tissus, feutrine, laine).\n« Vous allez essayer de trouver un système pour que les instruments jouent moins fort. »",
      },
      {
        title: "Fonctionnement des sourdines — vidéos",
        duration: "15 min",
        detail:
          "Violon → sourdine sur le chevalet (diminue la transmission des vibrations) / similitude : carton sur les cordes.\nTrompette → bouchon épousant la forme du pavillon / similitude : tissu ou gobelet à l'extrémité.\nPiano → bande de feutrine entre marteaux et cordes actionnée par la pédale centrale / similitude : feutrine entre la mailloche et l'instrument.",
      },
      {
        title: "Écoute active",
        duration: "15 min",
        detail:
          "« Quand un instrument est joué avec une sourdine, mettez un doigt sur la bouche. »\nQ : « Que remarquez-vous ? » R : On reconnaît l'instrument mais le son n'est pas le même. On dirait que l'instrument est enfermé dans une autre pièce.\nQ : « Comment est le son ? » R : Il est moins fort, il semble étouffé, il est plus doux, moins brillant.\nNote : ON REMARQUE QUE LE TIMBRE DE L'INSTRUMENT EST ÉGALEMENT MODIFIÉ PAR LA SOURDINE.",
      },
      {
        title: "Verbalisation et trace écrite",
        duration: "5 min",
        detail: "Mise en commun et trace écrite collective.",
      },
    ],
    material: [
      "Instruments à vent, à cordes, à percussion",
      "Mouchoirs, carton, bouchons, gobelets, aluminium, tissus, feutrine, laine",
      "Vidéos : Instruments et leurs sourdines",
    ],
    photocopies: ["Guide enseignant : p.122-123"],
    vocabulary: ["sourdine", "étouffoir", "vibration", "résonance"],
  },

  {
    id: "vlm-s05-05",
    title: "De plus en plus fort",
    subject: "arts",
    objective: "Explorer la notion d'intensité sonore et comprendre l'échelle de décibels.",
    competence:
      "Exploration du son — Caractériser les sons par leur intensité, connaître les seuils de danger.",
    duration: "40 min",
    phases: [
      {
        title: "Écoute du silence",
        duration: "5 min",
        detail: "Yeux fermés, les élèves écoutent les sons de leur environnement pendant 1 minute.",
      },
      {
        title: "Déplacements silencieux",
        duration: "10 min",
        detail:
          "En salle d'évolution, avec un foulard opaque sur les yeux, les élèves se déplacent silencieusement en suivant les sons.",
      },
      {
        title: "Jeu d'écoute dos à dos",
        duration: "15 min",
        detail:
          "Groupes de 6, dos à dos. Instruments : triangles, maracas, tambourins, claves, woodblocks. Les élèves identifient les paramètres du son avec les cartes.",
      },
      {
        title: "Questionnement sur le volume",
        duration: "5 min",
        detail:
          "Q : « Qu'est-ce que le volume d'un son ? » R : Quand on écoute de la musique, on met plus ou moins fort.\nQ : « Existe-t-il d'autres mots ? » R : L'intensité.\nQ : « Quelle est la différence entre sons et bruits ? » R : Un bruit c'est fort, ça énerve, ça casse les oreilles ! Un son c'est joli, c'est doux. Un « bruit » est généralement assimilé à un « son » désagréable.",
      },
      {
        title: "Tri des sons — Échelle de décibels",
        duration: "5 min",
        detail:
          "En binômes, avec l'Échelle de décibels :\n— LÉGER : 0 à 40 dB\n— MODÉRÉ : 50 à 60 dB\n— GÊNANT : 70 à 90 dB (seuil de danger à 90 dB)\n— DANGEREUX : 100 à 140 dB (seuil de douleur à 120 dB)\nNote : LES BRUITS DANGEREUX PEUVENT ENTRAÎNER DES DÉGÂTS IRRÉVERSIBLES DE L'OREILLE.",
      },
    ],
    material: [
      "Foulard opaque",
      "Triangles, maracas, tambourins, claves, woodblocks",
      "Cartes Paramètres du son",
      "Échelle de décibels",
    ],
    photocopies: ["Guide enseignant : p.124-125"],
    vocabulary: ["décibel", "échelle de niveaux sonores", "intensité"],
  },

  {
    id: "vlm-s05-06",
    title: "Chut!",
    subject: "arts",
    objective:
      "Apprendre et interpréter la chanson Chut! en jouant sur les intensités et les contrastes.",
    competence:
      "Chant — Mémoriser, interpréter avec nuance, comprendre la construction mélodique (phrases suspensives/conclusives).",
    duration: "30 + 20 + 5 + 5 min",
    phases: [
      {
        title: "Découverte de la chanson — Chasse aux mots",
        duration: "10 min",
        detail:
          "« Vous allez écouter une première fois la chanson et retenir 5 mots que vous entendez dans les paroles. »\nQ : « Que se passe-t-il dans cette chanson ? » R : La chanson est très calme. Elle ressemble à une berceuse, jouée avant de s'endormir le soir. On entend quelqu'un chuchoter «Chut!» pendant la chanson et à la fin.\nQ : « Reconnaissez-vous des instruments ? » R : Un piano, un quatuor à cordes (violons, alto, violoncelle).\nQ : « Qui chante ? » R : Une femme.\nQ : « Qu'avez-vous remarqué d'autre ? » R : La mélodie est toujours la même. Il n'y a pas de refrain.",
      },
      {
        title: "Jeu d'écoute active — construction mélodique",
        duration: "10 min",
        detail:
          "Alternance phrase suspensive / phrase conclusive.\nQ : « Quelle sera la vitesse de nos mouvements ? » R : Ils seront lents car le tempo est lent.\n— SUSPENSIVE : mains sur le thorax → s'étirer, se déployer\n— CONCLUSIVE : mains ouvertes en l'air → se refermer, revenir à la position initiale\nNote : ce jeu des contrastes est adapté à un réveil corporel en douceur en début de journée.",
      },
      {
        title: "Apprentissage de la première strophe",
        duration: "10 + 2×5 min",
        detail:
          "L'enseignant présente la strophe en entier, puis fragment par fragment en parlé-rythmé (ping-pong). Vérifier la compréhension de : «le silence vaut de l'or», «écouter les anges passer». Dès qu'une partie est sue, interpréter avec Chut! Version instrumentale.",
      },
      {
        title: "Mise en condition — Historiette n°5 Rêve éveillé",
        duration: "5 min",
        detail:
          "Historiette n°5 Rêve éveillé : « Je me réveille ce matin dans un lieu étrange, parfaitement silencieux... » + actions (s'étirer, marcher à pas feutrés, mimer armures, souffler fffffcHcHcH, friture vocale, CLAC, dessiner son prénom du nez...).\nVocalises : Ou-Oui à oui · Vole vole vole · Nous allons bientôt chanter.",
      },
      {
        title: "Jeu du furet silencieux",
        duration: "5 min",
        detail: "4 groupes en cercle. Passer un objet silencieusement de main en main.",
      },
      {
        title: "Jeu du furet mélodique",
        duration: "10 min",
        detail:
          "4 groupes de 5 à 8 élèves. L'enseignant diffuse les 8 premières secondes de Chut!\nQ : « Que se passe-t-il ? » R : La même note est répétée au piano 8 fois de manière régulière.\nUn élève chante la note (mi bémol) sur «ou» en l'étirant au maximum, puis passe à son voisin.",
        differentiation:
          "Varier les sons à faire passer. Vers la polyphonie : mi bémol – sol bémol – si bémol.",
      },
      {
        title: "Interprétation",
        duration: "10 min",
        detail:
          "Jouer sur les intensités, varier les modalités : alternance groupes, soliste / tutti, ou avec mouvement.",
      },
    ],
    material: [
      "Enregistrement Chut!",
      "Chut! Version instrumentale",
      "Historiette n°5 Rêve éveillé",
      "Un objet par groupe",
    ],
    photocopies: ["Guide enseignant : p.126-129"],
    notes: [
      "Partition : ♩ = 60 — Eb- / Bb (mode)",
      "VOIX 1 : Il paraît qu'il vaut de l'or / Quand bruits et cris te dévorent / Il peut signifier beaucoup / Quand les mots ne disent pas tout",
      "VOIX 2 : Il protège tes amis / Quand les secrets se confient / Il te berce jusqu'à l'aurore / Quand paisiblement tu dors",
      "Strophes 3&4 : Écoute-moi... / Écoute les anges passer...",
    ],
    vocabulary: [],
  },

  {
    id: "vlm-s05-07",
    title: "Gare aux bruits!",
    subject: "arts",
    objective: "Mesurer les niveaux sonores de l'école et rédiger une charte antibruit.",
    competence:
      "Prévention — Identifier les sources de bruit, comprendre leurs effets, proposer des règles de vie.",
    duration: "50 + 35 min",
    phases: [
      {
        title: "Bilan sonore — Situation déclenchante",
        duration: "5 min",
        detail:
          "« Nous allons essayer de mesurer l'intensité des bruits présents dans l'école. »\nNote : un sonomètre basique coûte environ 20 euros. On peut aussi télécharger l'application «Sound Meter» sur un smartphone.",
      },
      {
        title: "Recherche — tour de l'école",
        duration: "30 min",
        detail:
          "Groupes de 4 élèves : sonomètre + plan A4 de l'école + gommettes couleur. Tour des points stratégiques : couloirs, cour de récréation, cantine, bibliothèque, salle de motricité...\nCode couleur :\n— 🟢 VERTE : bruits légers\n— 🟡 JAUNE : bruits modérés\n— 🟠 ORANGE : bruits gênants\n— 🔴 ROUGE : bruits dangereux",
      },
      {
        title: "Verbalisation",
        duration: "15 min",
        detail:
          "Sur le plan A3 + affiche collective, les élèves comptent les gommettes et établissent la liste des endroits les plus bruyants. Classement des bruits par origines : produits par des personnes / par un objet manipulé / sans intervention humaine / par un enfant ou un adulte / à l'intérieur ou extérieur de l'école.\nNote : ce bilan sonore sera utilisé pour rédiger la charte antibruit.",
      },
      {
        title: "Charte antibruit — Situation déclenchante",
        duration: "5 min + tout au long de la journée",
        detail:
          "Q : « Savez-vous ce qu'est une charte ? » R : C'est un texte qui ressemble à un règlement. C'est comme une loi ! C'est un ensemble de règles à suivre.\nQ : « À quoi sert-elle ? » R : Elle indique ce que l'on doit et ne doit pas faire pour mieux vivre ensemble.\n« Tout au long de la journée, vous allez noter sur votre cahier les bruits de la classe qui vous dérangent ou que vous trouvez désagréables. »",
      },
      {
        title: "Recherche de solutions",
        duration: "15 min",
        detail:
          "Écrit individuel (cahier brouillon). Deux axes :\n— Changer son comportement\n— Apporter des aménagements matériels ou structurels",
      },
      {
        title: "Rédaction de la charte",
        duration: "15 min",
        detail:
          "Groupes de 4 à 6 élèves. Affiche A2 + marqueurs. Règles organisées, illustrées avec dessins / photos / pictogrammes.\nCommence par : «Pour protéger nos oreilles du bruit à l'école, il faudrait...»\nNote : la charte sera présentée aux autres classes, au conseil d'école ou au conseil municipal.",
      },
    ],
    material: [
      "Sonomètre (ou appli Sound Meter sur smartphone, ~20€)",
      "Plan A4 de l'école",
      "Gommettes couleur (vert / jaune / orange / rouge)",
      "Plan A3",
      "Affiche A2",
      "Marqueurs",
      "Cahiers brouillon",
    ],
    photocopies: ["Guide enseignant : p.130-131"],
    vocabulary: ["charte", "sonomètre", "décibel"],
  },

  // ══════════════════════════════════════════════════════════════════
  //  SÉQUENCE 06 — PANORAMA
  // ══════════════════════════════════════════════════════════════════

  {
    id: "vlm-s06-01",
    title: "Jacques se promène!",
    subject: "arts",
    objective:
      "Reconnaître Frère Jacques dans différentes versions et dans une citation orchestrale (Mahler).",
    competence:
      "Situation déclenchante — Comparer des versions d'une comptine, distinguer mode majeur et mode mineur.",
    duration: "50 + 20 min",
    phases: [
      {
        title: "Découverte des versions étrangères",
        duration: "15 min",
        detail:
          "Diffusion de 5 versions de Frère Jacques (allemand, anglais, portugais, arabe, mandarin) sans dévoiler le titre.\nQ : « Reconnaissez-vous cette chanson ? » R : C'est la chanson Frère Jacques mais chantée dans d'autres langues. On reconnaît la mélodie et, selon les langues, on comprend quelques mots.",
      },
      {
        title: "Recherche — associer paroles et extraits",
        duration: "15 min",
        detail:
          "Document : Paroles de Frère Jacques en six langues. Numéroter de 1 à 6.\nQ : « Dans quels pays sont chantées ces versions ? » R : Portugais : Portugal, Brésil. Anglais : Royaume-Uni, États-Unis, Australie, Nouvelle-Zélande, Canada. Français : France, Canada, Suisse, Belgique. Allemand : Allemagne, Suisse, Autriche...\nQ : « Quels autres prénoms reconnaissez-vous ? » R : Jakob, John.",
      },
      {
        title: "Verbalisation avec planisphère",
        duration: "10 min",
        detail: "Les élèves localisent les pays sur le planisphère.",
      },
      {
        title: "Chant — apprentissage dans une langue",
        duration: "10 min",
        detail:
          "L'enseignant apprend Frère Jacques dans la langue de son choix par audition / répétition, en parlé-rythmé, en veillant à la prononciation et à l'accentuation.",
        differentiation: "Créer un canon multilingue en choisissant deux versions différentes.",
      },
      {
        title: "Écoute — Symphonie n°1 de Mahler",
        duration: "5 min",
        detail:
          "« Reconnaissez-vous la mélodie ? Le compositeur Gustav Mahler fait une CITATION : il a 'déguisé' la mélodie très connue du canon Frère Jacques en faisant quelques transformations du thème dans la mélodie et dans le rythme. »",
      },
      {
        title: "Comparaison majeur / mineur",
        duration: "10 min",
        detail:
          "Avec les cartes Humeur :\n— MAJEUR : joyeux, concentré, surpris\n— MINEUR : triste, inconsolable, fatigué\nLes élèves chantent Frère Jacques dans le mode de leur choix.",
      },
      {
        title: "Trace écrite",
        duration: "5 min",
        detail:
          "« Le canon Frère Jacques a fait le tour du monde et existe dans de très nombreuses versions. Il a même été cité dans une symphonie par le compositeur Gustav Mahler, qui l'a transformé en une marche funèbre, dans un mode mineur. »",
      },
    ],
    material: [
      "Enregistrements de Frère Jacques en 5 langues (allemand, anglais, portugais, arabe, mandarin)",
      "Document Paroles en 6 langues",
      "Planisphère",
      "Cartes Humeur",
      "Enregistrement Symphonie n°1 de Mahler",
      "Frère Jacques en majeur et en mineur",
    ],
    photocopies: ["Guide enseignant : p.134-135"],
    vocabulary: ["comptine traditionnelle", "citation", "mode majeur", "mode mineur"],
  },

  {
    id: "vlm-s06-02",
    title: "Cartes postales",
    subject: "arts",
    objective:
      "Identifier des extraits musicaux du monde entier et les associer à leurs origines géographiques.",
    competence:
      "Découverte des œuvres — Percevoir et caractériser des musiques du monde, les situer géographiquement.",
    duration: "35 min",
    phases: [
      {
        title: "Découverte des cartes postales",
        duration: "5 min",
        detail:
          "« Aujourd'hui le facteur a distribué plusieurs cartes postales ! »\nQ : « Où ces cartes ont-elles été postées ? » R : Au Japon, en Autriche, au Yémen, au Brésil, à Madagascar et à Tahiti.\nQ : « Pouvez-vous situer ces pays sur le planisphère ? »",
      },
      {
        title: "Recherche — associer musique et carte postale",
        duration: "10 min",
        detail:
          "6 extraits musicaux à associer à 6 cartes postales :\n— Hiro e → Tahiti\n— Ya Man Ataya → Yémen\n— Batucada → Brésil\n— Amoron'i mania → Madagascar\n— Koto et shakuhachi → Japon\n— Yodel → Autriche",
      },
      {
        title: "Verbalisation",
        duration: "10 min",
        detail:
          "Q : « Quelle est l'atmosphère de l'extrait ? » R : Calme, animé, léger, dansant...\nQ : « Qui joue ? » R : Un instrument seul, un chanteur, un chœur...\nQ : « Comment est le tempo du morceau ? » R : Lent, modéré, rapide.",
      },
    ],
    material: [
      "6 Cartes postales (Japon, Autriche, Yémen, Brésil, Madagascar, Tahiti)",
      "Planisphère",
      "Extraits : Hiro e / Ya Man Ataya / Batucada / Amoron'i mania / Koto et shakuhachi / Yodel",
    ],
    photocopies: ["Guide enseignant : p.136"],
    vocabulary: [],
  },

  {
    id: "vlm-s06-03",
    title: "Instruments du monde",
    subject: "arts",
    objective:
      "Découvrir des instruments traditionnels de différentes régions du monde et les classer par familles.",
    competence:
      "Découverte des instruments — Identifier le timbre d'instruments du monde, les classer par familles (cordes / vents / percussions).",
    duration: "60 min",
    phases: [
      {
        title: "Visite du «musée de classe»",
        duration: "5 min",
        detail:
          "« Nous allons découvrir des instruments et des ensembles traditionnels originaires de différentes régions du monde. » Les élèves identifient et nomment les instruments collectés.",
      },
      {
        title: "Découverte du timbre de la cornemuse",
        duration: "10 min",
        detail:
          "Diffusion : Défilé d'un corps de cornemuse écossais + Portrait d'instrument : la cornemuse + Mélodie à la cornemuse.\nQ : « Dans quoi l'instrumentiste souffle-t-il ? » R : Le sonneur souffle dans la poche qu'il remplit d'air. Il maintient la poche sous son bras et appuie dessus pour faire sonner les tuyaux qui reposent sur son épaule.\nQ : « Comment les notes sont-elles produites ? » R : L'instrumentiste bouche certains trous du tuyau mélodique, qui ressemble à une flûte à bec.\nNote : la cornemuse est présente dans de très nombreux pays (France, Irlande, Grèce, Hongrie, Inde, Slovaquie). Elle est inscrite sur la Liste représentative du patrimoine culturel immatériel de l'humanité.",
      },
      {
        title: "Défis sonores — jeu interactif",
        duration: "15 min",
        detail:
          "Défi 1 — Niveau 1 (5 instruments : sitar, flute de Pan, castagnettes, cornemuse, balafon) : « Quand vous reconnaissez le timbre de la cornemuse, vous levez le bras. »\nDéfi 2 (balalaïka, banjo, castagnettes, balafon, djembé) : « Quand vous reconnaissez le timbre des castagnettes, vous levez le bras. »\nNote : EN MUSIQUE, LE TIMBRE DÉSIGNE L'ENSEMBLE DES CARACTÉRISTIQUES SONORES QUI PERMETTENT D'IDENTIFIER UN INSTRUMENT.",
        differentiation: "Niveaux 2 (16 instruments) ou 3 (25 instruments).",
      },
      {
        title: "Entraînement — tablettes",
        duration: "10 min",
        detail: "En binômes sur tablettes : jeu interactif À l'écoute des instruments du monde.",
      },
      {
        title: "Classement par familles d'instruments",
        duration: "10 min",
        detail:
          "En binômes :\nNiveau 1 → Cordes : balalaïka, banjo, sitar | Vents : flute de Pan, cornemuse | Percussions : balafon, castagnettes, djembé\nNiveau 2 → Cordes : ukulélé, kora | Vents : duduk, didgéridoo | Percussions : gamelan, maracas, darbouka, tambour d'océan\nNiveau 3 → Cordes : mandoline, cymbalum, oud, koto | Vents : bandonéon | Percussions : bongos, guiro, gong, tablas",
      },
      {
        title: "Trace écrite",
        duration: "10 min",
        detail: "Trace écrite individuelle — Instruments du monde (fiche par élève).",
      },
    ],
    material: [
      "Poster Les instruments du monde",
      "Portraits d'instruments : balalaïka, banjo, cymbalum, flute de Pan, cornemuse, didgéridoo, maracas, djembé, gamelan",
      "Jeu de 7 familles",
      "Jeu interactif À l'écoute des instruments du monde",
      "Tablettes",
    ],
    photocopies: ["Guide enseignant : p.138-139"],
    vocabulary: [
      "timbre",
      "cornemuse",
      "balalaïka",
      "banjo",
      "sitar",
      "flute de Pan",
      "balafon",
      "castagnettes",
      "djembé",
      "ukulélé",
      "kora",
      "duduk",
      "didgéridoo",
      "gamelan",
      "maracas",
      "darbouka",
      "tambour d'océan",
      "mandoline",
      "cymbalum",
      "oud",
      "koto",
      "bandonéon",
      "bongos",
      "guiro",
      "gong",
      "tablas",
    ],
  },

  {
    id: "vlm-s06-04",
    title: "Sons du Brésil",
    subject: "arts",
    objective:
      "Caractériser les sons de la batucada et les reproduire avec des instruments de récupération.",
    competence:
      "Exploration du son — Identifier et reproduire les timbres et hauteurs d'instruments de percussion brésiliens.",
    duration: "60 min",
    phases: [
      {
        title: "Découverte de la batucada",
        duration: "5 min",
        detail:
          "L'enseignant diffuse l'extrait Batucada.\nQ : « Que ressentez-vous en écoutant cette musique ? » R : On a envie de danser, de bouger, de faire la fête.\nQ : « Reconnaissez-vous des instruments ? » R : Des instruments de la famille des percussions. On croirait entendre des tambours, des maracas, des caisses claires, des sifflets, des cymbales...\nDéfinition : La BATUCADA est jouée par un ensemble de percussionnistes qui accompagne les danseuses de samba durant le défilé du carnaval de Rio.",
      },
      {
        title: "Caractérisation des sons de la batucada",
        duration: "20 min",
        detail:
          "Vidéos + cartes Paramètre du son : la hauteur. Tableau :\n— APITO : Aigu / strident criard → un sifflet\n— SURDO : Grave / sourd puissant → une grosse caisse, un tambour\n— AGOGO : Aigu / mélodieux rond → des cloches\n— CAIXA : Médium / explosif grésillant → une caisse claire\n— REPINIQUE : Médium / clair sec puissant → un tambour\n— CHOCALHO : Aigu / répétitif sec fort → des maracas, des petites cymbales",
      },
      {
        title: "Reproduction des sons de la batucada",
        duration: "20 min",
        detail:
          "Groupes de 4 à 6 élèves. Instruments recyclés disponibles.\n« Par groupe, vous allez décider des instruments ou du matériel dont vous avez besoin pour imiter les 6 instruments de la batucada. »",
      },
      {
        title: "Verbalisation et trace écrite",
        duration: "15 min",
        detail:
          "Affiche A3 collective :\n— APITO → souffler dans un sifflet\n— SURDO → mailloches sur grand bidon / caisse / seau\n— AGOGO → mailoche sur deux boites de conserve de tailles différentes\n— CAIXA → mailloches sur boite de conserve ou bouteille plastique avec grains de riz\n— REPINIQUE → mailloches sur petit bidon / petite caisse / petit seau\n— CHOCALHO → maracas ou güiro / frotter bouteille plastique avec baguette / secouer bouteille plastique avec grains de riz",
      },
    ],
    material: [
      "Extrait Batucada",
      "Vidéos : Apito / Surdo / Agogo / Caixa / Repinique / Chocalho",
      "Cartes Paramètre du son : la hauteur",
      "Instruments recyclés : sifflets, woodblocks, güiros, cloches, tambourins, bouteilles plastique, grains de riz, seaux, bidons, boites de conserve",
      "Affiche A3",
    ],
    photocopies: ["Guide enseignant : p.140-141"],
    vocabulary: [
      "batucada",
      "hauteur du son",
      "apito",
      "surdo",
      "agogo",
      "caixa",
      "repinique",
      "chocalho",
    ],
  },

  {
    id: "vlm-s06-05",
    title: "Viva Samba!",
    subject: "arts",
    objective:
      "Apprendre les voix rythmiques de la batucada et défiler ensemble sous la direction d'un meneur.",
    competence:
      "Rythme — Réaliser et synchroniser des voix rythmiques, comprendre le rôle du meneur.",
    duration: "45 min",
    phases: [
      {
        title: "Situation déclenchante",
        duration: "5 min",
        detail:
          "Diffusion : vidéo Répétition d'une bateria.\nQ : « Qu'est-ce qui vous surprend dans cette vidéo ? » R : Le grand nombre de personnes qui défilent, la foule, la vitesse, l'énergie, la joie, la précision.",
      },
      {
        title: "Découverte du rôle du meneur",
        duration: "5 min",
        detail:
          "Diffusion : Batucada finale.\nQ : « Comment est organisée cette batucada ? » R : Deux parties : une lente et une rapide. Entre les deux (à 0'33''), dialogue entre l'apito et les percussions + voix. Ce sont des phrases de break.\nQ : « À votre avis, quel est le rôle de l'apito ? » R : Il indique un rythme à reproduire, un signal de départ ou d'arrêt, un changement de tempo. C'est le MENEUR.\nNote : dans une batucada, le rôle de meneur est généralement tenu par l'apito ou par le repinique.",
      },
      {
        title: "Jeu du sifflet",
        duration: "5 min",
        detail:
          "« Dans une batucada, les musiciens doivent toujours regarder le meneur et suivre ses indications. »\n— 4 coups de sifflet secs → définir / suivre la pulsation\n— Joue les cloches agogo → les élèves marchent\n— 4 coups de sifflet secs → tous s'immobilisent",
        differentiation: "Séparer la salle d'évolution en 2 zones.",
      },
      {
        title: "Apprentissage des phrases du break",
        duration: "10 min",
        detail:
          "Questions-réponses entre l'apito et les autres instruments :\n— PHRASE 1 : BA BA – TU – CA-DA\n— PHRASE 2 : SAM-BA CO-PA-CA-BA-NA\nLes élèves s'entraînent à frapper les deux phrases sur leurs tables, en réponse au meneur.",
      },
      {
        title: "Apprentissage des différentes voix",
        duration: "10 min",
        detail:
          "5 groupes : 2 groupes de surdos, 1 groupe d'agogos, 1 groupe de caïxas, 1 groupe de chocalhos.\n— SURDO 1 : BA – CA\n— SURDO 2 : TU – DA DA\n— CAÏXA : BA-TU – DA\n— CHOCALHO : CHÉ vé VÉ CHÉ vé VÉ\n— AGOGO : VI-VA SAM-BA DO BRA-SIL HÉ!\nNote : pour le chocalho, les élèves s'entraînent sur l'enregistrement surdo 1.",
      },
      {
        title: "Entraînement et enregistrement",
        duration: "10 min",
        detail:
          "Entraînement successif : surdo 1, surdo 2, chocalho, agogo et caïxa. Batucada-Entraînement 1, Entraînement 2, Batucada finale. Enregistrement de la classe.",
      },
    ],
    material: [
      "Vidéo Répétition d'une bateria",
      "Batucada finale",
      "Sifflet",
      "Agogos fabriqués",
      "Instruments recyclés des groupes",
      "Enregistrements Batucada-Entraînement 1 & 2",
    ],
    photocopies: ["Guide enseignant : p.142-143"],
    vocabulary: ["meneur", "break"],
  },

  {
    id: "vlm-s06-06",
    title: "Sawubona",
    subject: "arts",
    objective:
      "Apprendre et interpréter le chant Sawubona en découvrant les salutations africaines.",
    competence:
      "Chant — Mémoriser et interpréter un chant polyphonique, créer un effet d'écho à deux groupes.",
    duration: "40 + 35 min",
    phases: [
      {
        title: "Découverte de la chanson — Chasse aux mots",
        duration: "10 min",
        detail:
          "Q : « Que se passe-t-il dans cette chanson ? » R : On ne comprend pas les paroles, elles sont dans une langue étrangère. Ce sont des langues parlées sur le continent africain.\nQ : « Quels instruments avez-vous reconnus ? » R : Un piano et des percussions (tambours, djembé).\nQ : « Qui chante ? » R : Une femme, un homme et une jeune fille. Interprète principale : Mentissa.",
      },
      {
        title: "Découverte de la structure",
        duration: "10 min",
        detail:
          "Avec la Chanson puzzle :\n— VOIX 1 : Sawubona – Jambo (×4) → 6 façons de dire «Bonjour»\n— VOIX 2 : Moyo – Kiambote – Djaraman – Ayo (×4)\n— PONT (×2) : Tokomonana – Kwa heri – Jàmm ak jàmm – Wato-keyi → façons de dire «Au revoir»\nQ : « Combien de fois ces enchaînements sont-ils répétés ? » R : 4 fois dans chaque voix. Le pont est répété 2 fois.",
      },
      {
        title: "Apprentissage des voix 1 et 2",
        duration: "10 min",
        detail:
          "Ping-pong :\n— ENSEIGNANT : Sa-wu-bo-na / ÉLÈVES : Jam-bo\nVoix 2 : Mo-yo / Kiam-bo-te / Dja-ra-man / A-yo.\nNote : LA 4ÈME FOIS, LE DERNIER MOT «AYO» N'EST PAS CHANTÉ. Intervalle d'une octave entre «Moyo» et «Kiambote» (do aigu – do grave).",
      },
      {
        title: "Apprentissage du pont",
        duration: "10 min",
        detail:
          "Parlé-rythmé d'abord : To-ko-mo-na-na / Kwa he-ri / Jà-mm ak jà-mm / Wa-to-ke-yi. Les élèves interprètent la totalité du chant avec Sawubona.",
      },
      {
        title: "Mise en condition corporelle et vocale",
        duration: "5 min",
        detail:
          "Historiette n°6 : Dans ma valise. Vocalises : Bonjour comment ça va · Baobab · Les gâteaux sont chauds (Version instrumentale) · Ou-Oui à oui.",
      },
      {
        title: "Mémorisation des paroles — Carte des 8 langues",
        duration: "5 min",
        detail:
          "« Tous les mots de la chanson sont des salutations. Les 6 mots des voix 1 et 2 signifient «Bonjour» et les 4 mots du pont signifient «Au revoir» dans 8 langues et dialectes africains. »\nQ : « Qu'avez-vous remarqué en complétant la carte ? » R : Certaines des 8 langues sont parlées dans plus de 10 pays; d'autres dans un seul pays voire une seule région.\nDéfi : relier les zones sur la carte dans l'ordre d'apparition de la chanson.",
      },
      {
        title: "Interprétation avec écho",
        duration: "10 min",
        detail:
          "L'enseignant diffuse Sawubona entre 2'22'' et 2'39''.\nQ : « Quelle différence avec la partie apprise ? » R : Effet d'écho — 2ème groupe qui répète Sawubona / Jambo.\nGroupe 1 : voix principale. Groupe 2 : écho.",
        differentiation:
          "Plusieurs parties de la chanson peuvent être découpées et interprétées à 2 groupes.",
      },
      {
        title: "Interprétation",
        duration: "15 min",
        detail:
          "Note : CE CHANT MONTE EN PUISSANCE PROGRESSIVEMENT ET CULMINE AVEC LE PONT QUI EST SUIVI D'UN MOMENT DE CALME PUIS À NOUVEAU UNE RELANCE JUSQU'À LA POLYPHONIE QUI S'ÉTEINT EN DOUCEUR SUR LA VOIX D'ENFANT.\nSoliste, duo, deux groupes, classe entière. Soundpainting (voir p.24). Enregistrement de la classe.",
      },
    ],
    material: [
      "Enregistrement Sawubona",
      "Chanson puzzle",
      "Carte des 8 langues",
      "Historiette n°6 Dans ma valise",
      "Vocalises : Bonjour comment ça va / Baobab / Les gâteaux sont chauds (Version instrumentale) / Ou-Oui à oui",
    ],
    photocopies: ["Guide enseignant : p.144-147"],
    notes: [
      "Partition : ♩ = 116",
      "Structure : 0'00 INSTRUMENTAL / 0'20 VOIX 1 / 0'37 VOIX 2 / 0'53 VOIX 1 / 1'10 VOIX 2 / 1'24 PONT / 2'05 VOIX 1 / 2'39 VOIX 1&2 / 2'55 VOIX 1",
    ],
    vocabulary: [],
  },

  {
    id: "vlm-s06-07",
    title: "Chanson polyglotte",
    subject: "arts",
    objective:
      "Créer une version personnalisée de Sawubona avec des salutations de toutes les régions du monde.",
    competence:
      "Création sonore — Réécrire un chant en respectant la prosodie, découvrir le concept de polyglottisme.",
    duration: "45 min",
    phases: [
      {
        title: "Situation déclenchante — le défi Sawubona",
        duration: "5 min",
        detail:
          "« Nous allons participer au 'défi Sawubona' en créant une chanson 'polyglotte'. Vous allez chercher dans le dictionnaire ce que signifie ce mot amusant. »\nQ : « Polyglotte ? » R : On dit qu'une personne est polyglotte lorsqu'elle parle plusieurs langues.\n« Nous allons partir de la mélodie du chant Sawubona et créer nos propres paroles en cherchant d'autres façons de dire 'Bonjour' et 'Au revoir'. »",
      },
      {
        title: "Inventaire de salutations par continent",
        duration: "15 min",
        detail:
          "6 groupes : Europe, Asie, Océanie, Afrique, Amérique du Nord et centrale, Amérique du Sud. Avec : Chanson puzzle + 6 Cartes postales + Le monde est ma maison + tablettes / ordinateurs.\n« Dans chaque groupe, vous allez chercher au moins 5 façons de se dire 'Bonjour' et 'Au revoir' dans votre région du globe. »\nExemples de salutations par syllabes : 1 syll. → Tchau (portugais) ; 2 syll. → Grüss Gott (autrichien) / Nana (tahitien) ; 3 syll. → Bom dia (portugais) / Kwa he-ri ; 4 syll. → Kon'nitchiwa (japonais) / La ora na (tahitien) ; 5 syll. → Salam aleykoum (arabe) / Auf Wiedersehen (allemand)",
        differentiation:
          "D'autres thèmes peuvent être abordés en EMC : merci, respect, amour, amitié...",
      },
      {
        title: "Choix des paroles — comptage des syllabes",
        duration: "15 min",
        detail:
          "Comptage des syllabes dans la chanson originale :\n— VOIX 1 (bonjour) : SA-WU-BO-NA (4) / JAM-BO (2)\n— VOIX 2 (bonjour) : MO-YO (2) / KIAM-BO-TE (3) / DJA-RA-MAN (3) / A-YO (2)\n— PONT (au revoir) : TO-KO-MO-NA-NA (5) / KWA HE-RI (3) / JÀ-MM AK JÀ-MM (5) / WA-TO-KE-YI (4)\nExemples voix 1 : KA-LI-ME-RA (grec, 4) / HEL-LO (anglais, 2) / IA O-RA NA (tahitien, 4) / DE-MAT (breton, 2).\nNote : LE TEXTE DOIT «SONNER» SUR LA MUSIQUE, C'EST CE QUI S'APPELLE LA PROSODIE.",
      },
      {
        title: "Interprétation, enregistrement et défi",
        duration: "10 min",
        detail:
          "Interprétation : soliste / duo / groupes sur Sawubona - Version instrumentale.\nDéfi Sawubona : envoyer à defi.sawubona@acces-editions.com ou se connecter sur www.acces-editions.com/defi/sawubona",
      },
    ],
    material: [
      "Dictionnaires",
      "Album Le monde est ma maison",
      "Chanson puzzle",
      "6 Cartes postales",
      "Tablettes / ordinateurs",
      "Partition de Sawubona",
      "Sawubona Version instrumentale",
    ],
    photocopies: ["Guide enseignant : p.148-149"],
    vocabulary: ["polyglotte", "salutations", "réécriture"],
  },
];
