export type EnglishPrepSheet = {
  id: string;
  period: 1 | 2 | 3 | 4 | 5;
  title: string;
  objective: string;
  competence: string;
  vocabulary: string[];
  languageStructures: string[];
  duration?: string;
  material: string[];
  studentPages: number[];
  teacherPages: number[];
  audioVideo?: string[];
  phases: {
    title: string;
    duration?: string;
    detail: string;
    instructions?: string[];
    differentiation?: string;
  }[];
  exercises: {
    id: string;
    page?: number;
    number?: string;
    title?: string;
    instruction: string;
  }[];
};

export type ImportedEnglishPrepSheet = Omit<EnglishPrepSheet, "period"> & {
  period: 1 | 2 | 3 | 4 | 5 | null;
  sequenceNumber: number;
  sequenceTitle: string;
  sessionCount: number;
  pdfPages: number[];
  materialPages: number[];
  coverageNote: string;
  sourceExcerpt: string;
};

export const wellDoneCe1PrepSheets = [
  {
    id: "well-done-ce1-01",
    period: null,
    title: "The What's your name puppet game",
    objective: "Savoir présenter ses amis. Employer les mots yes/no.",
    competence: "Comprendre à l'oral ; parler en interaction ; parler en continu.",
    vocabulary: ["Lily", "Leo", "Candy", "Kobi", "yes", "no"],
    languageStructures: ["This is ...", "Is this ... ?", "Yes, this is ...", "No, this is ..."],
    material: ["Activité lexicale animée", "Fiche élève p. 6", "Fiche matériel p. 58 et p. 59"],
    studentPages: [6],
    teacherPages: [18, 19],
    audioVideo: ["Animation lexicale", "Activité Remember"],
    phases: [
      {
        title: "Séance 1",
        detail:
          "Séance 1 : Découvrir ; Comprendre. Voir la transcription OCR des pages guide 18-19 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 2",
        detail:
          "Séance 2 : S'entraîner. Voir la transcription OCR des pages guide 18-19 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 3",
        detail:
          "Séance 3 : Se lancer ; Voir ce que l'on sait. Voir la transcription OCR des pages guide 18-19 pour le texte complet.",
        instructions: [],
      },
    ],
    exercises: [
      {
        id: "well-done-ce1-01-ex-1",
        number: "Séance 1",
        title: "The What's your name puppet game · Séance 1",
        instruction:
          "Look, listen and repeat: vidéoprojeter au tableau l'activité lexicale animée sur la présentation des personnages.",
      },
      {
        id: "well-done-ce1-01-ex-2",
        number: "Séance 2",
        title: "The What's your name puppet game · Séance 2",
        instruction:
          "Listen, point and say: distribuer la fiche élève et la faire coller dans le cahier.",
        page: 6,
      },
      {
        id: "well-done-ce1-01-ex-3",
        number: "Séance 3",
        title: "The What's your name puppet game · Séance 3",
        instruction: "Let's play! Hold the puppets and say.",
      },
    ],
    sequenceNumber: 1,
    sequenceTitle: "Come together!",
    sessionCount: 3,
    pdfPages: [10],
    materialPages: [58, 59],
    coverageNote:
      "Le PDF scanné ne donne pas de rattachement explicite à une période Ardoise. period reste donc à null.",
    sourceExcerpt:
      "[PDF p.10]\nSEANCE 3 em\n\neu Se lancer ze ..........c.cccoooooccrenereeeenrsgl\nt=> Let's play! Hold the puppets and say  (PARLERENINTERACTION)\n\neg) => Savoir présenter ses amis.                                                                                                                  Préparer les marionnettes de Lily, Leo, Candy et Kobi\n\nJ               t=> Employer les mots yes/no.                                                                                                                    (fiche matériel, p. 58 et 59).\nDésigner quatre élèves pour tenir les marionnettes devant la classe.\nLes autres élèves les présentent : This is Lily, this is Leo, this is Kobi\nand this is Candy.\n\nSÉANCE  1   A 20min}                                                                                                                                           On peut questionner la classe sur le modèle :\nrer\n\n» Is this Kobi? — No, this is Leo! etc.\n\n‘= Your turn! Inviter un élève à présenter un autre élève à l'aide de son vrai prénom.\nÀ son tour, il en présente un autre, etc. This is\nOn peut les questionner : Is this … ? —+ Yes, this is .../No, this is …\n\nLes élèves concernés peuvent aussi répondre : Yes,",
  },
  {
    id: "well-done-ce1-02",
    period: null,
    title: "The One to twelve song",
    objective: "Savoir employer les nombres de 0 à 12.",
    competence: "Comprendre à l'oral ; parler en continu.",
    vocabulary: [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
    ],
    languageStructures: ["What number is it?", "It's ..."],
    material: ["Animation de la chanson", "Fiche élève p. 9", "Crayons"],
    studentPages: [9],
    teacherPages: [24, 25],
    audioVideo: ["The One to twelve song", "Activité Remember"],
    phases: [
      {
        title: "Séance 1",
        detail:
          "Séance 1 : Découvrir ; Comprendre. Voir la transcription OCR des pages guide 24-25 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 2",
        detail:
          "Séance 2 : S'entraîner ; Se lancer. Voir la transcription OCR des pages guide 24-25 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 3",
        detail:
          "Séance 3 : Voir ce que l'on sait. Voir la transcription OCR des pages guide 24-25 pour le texte complet.",
        instructions: [],
      },
    ],
    exercises: [
      {
        id: "well-done-ce1-02-ex-1",
        number: "Séance 1",
        title: "The One to twelve song · Séance 1",
        instruction:
          "Look, listen and repeat: vidéoprojeter l'animation de la chanson The One to twelve song.",
      },
      {
        id: "well-done-ce1-02-ex-2",
        number: "Séance 2",
        title: "The One to twelve song · Séance 2",
        instruction:
          "Listen and colour: distribuer la fiche élève et la faire coller dans le cahier.",
        page: 9,
      },
      {
        id: "well-done-ce1-02-ex-3",
        number: "Séance 3",
        title: "The One to twelve song · Séance 3",
        instruction: "Drag and drop: vidéoprojeter l'activité Remember.",
      },
    ],
    sequenceNumber: 2,
    sequenceTitle: "Playing with numbers",
    sessionCount: 3,
    pdfPages: [11],
    materialPages: [],
    coverageNote:
      "Le PDF scanné ne donne pas de rattachement explicite à une période Ardoise. period reste donc à null.",
    sourceExcerpt:
      "[PDF p.11]\nläsilÿ | => Savoir employer les nombres de 0 à 12.\n\nSEANCE ] ex\n\num Découvrir GEE ....oovooevveveereenerssneess ene\n\n=> Look, listen and repeat: vidéoprojeter l'animation de la chanson\nThe One two twelve song plusieurs fois. Inviter les éléves a répéter\n\nles nombres.\n\n« Repeat the numbers.\n\nus Comprendre grr\n\n=> Listen, mime and sing: vidéoprojeter à nouveau la chanson puis inviter les élèves\nà reproduire les gestes des personnages :\n\n«de 1210: on compte avec ses doigts ;\n\n= look at: main en visière + me: on se désigne ;\n\n= mix: on tourne une spatule imaginaire ;\n\n« yes: on acquiesce » that's fine: les deux pouces vers le haut ;\n\nPuis, demander aux élèves de chanter en mimant le texte.\n\nSÉANCE 2 rm\n\nmm S'entraîner gr ...............serre\n\n‘=> Listen and colour: distribuer la fiche élève et la faire coller\ndans le cahier. À l'aide de l'activité 1, prononcer les phrases suivantes\net inviter les élèves à colorier chaque série de nombres.\n\n« Colour numbers 1, 2, 3 red.\n\n= Colour numbers 4, 5, 6 blue.\n\n= Colour numbers 7, 8, 9 green.\n\n= Colour numbers 10, 11, 12 yellow.\n\nUtiliser le poster What colour is it? pour ne pas traduire les couleurs\nen français (leur apprentissage arrive au thè",
  },
  {
    id: "well-done-ce1-03",
    period: null,
    title: "Colour the pencils!",
    objective: "Savoir employer le nom des onze couleurs.",
    competence: "Comprendre à l'oral ; parler en interaction ; parler en continu.",
    vocabulary: [
      "blue",
      "red",
      "yellow",
      "green",
      "orange",
      "purple",
      "brown",
      "grey",
      "pink",
      "black",
      "white",
    ],
    languageStructures: ["What colour is ...?", "It's ..."],
    material: ["Activité lexicale animée", "Fiche élève p. 12"],
    studentPages: [12],
    teacherPages: [30, 31],
    audioVideo: ["Activité Remember", "Color names video"],
    phases: [
      {
        title: "Séance 1",
        detail:
          "Séance 1 : Découvrir ; Comprendre. Voir la transcription OCR des pages guide 30-31 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 2",
        detail:
          "Séance 2 : S'entraîner ; Se lancer. Voir la transcription OCR des pages guide 30-31 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 3",
        detail:
          "Séance 3 : Voir ce que l'on sait. Voir la transcription OCR des pages guide 30-31 pour le texte complet.",
        instructions: [],
      },
    ],
    exercises: [
      {
        id: "well-done-ce1-03-ex-1",
        number: "Séance 1",
        title: "Colour the pencils! · Séance 1",
        instruction:
          "Look and listen: vidéoprojeter l'activité lexicale animée sur les onze couleurs.",
      },
      {
        id: "well-done-ce1-03-ex-2",
        number: "Séance 2",
        title: "Colour the pencils! · Séance 2",
        instruction:
          "Listen and colour the pencils: distribuer la fiche élève et la faire coller dans le cahier.",
        page: 12,
      },
      {
        id: "well-done-ce1-03-ex-3",
        number: "Séance 3",
        title: "Colour the pencils! · Séance 3",
        instruction:
          "Drag and drop: dans l'activité Remember, inviter les élèves à venir placer la couleur sur le numéro qui convient selon ce qu'ils entendent.",
      },
    ],
    sequenceNumber: 3,
    sequenceTitle: "Playing with colours",
    sessionCount: 3,
    pdfPages: [12],
    materialPages: [],
    coverageNote:
      "Le PDF scanné ne donne pas de rattachement explicite à une période Ardoise. period reste donc à null.",
    sourceExcerpt:
      "[PDF p.12]\nSÉANCE 1 em\n\nSEANCE 2 wm\n\n3 PLAYING WITH COLOURS\n\na Coloriage\n\nWISN => Savoir employer le nom des onze couleurs.\n\n0 Découvrir gx ......ovooo eevee\n\n=> Look and listen: vidéoprojeter l'activité lexicale animée\nsur les onze couleurs. Activer l'audio en cliquant sur chaque couleur.\n\n=> Let's repeat: inviter les élèves à répéter plusieurs fois chaque couleur.\n\nmu Comprendre gt …………………………………ceeccsecscees\n\n=> Come, listen and point: vidéoprojeter à nouveau l'activité lexicale animée sur les couleurs.\nNommer les couleurs dans le désordre et inviter quelques élèves à venir les désigner au tableau\nou sur des objets dans la classe.\n\nLe poster What colour is it? peut être affiché et utilisé en classe à tout moment de l'année.\n\nmm S'entraîner rm\n\n=> Listen and colour the pencils: distribuer la fiche élève et la faire coller\n\ndans le cahier. Proposer des couleurs de crayon : This is a pencil. This is a blue pencil.\nDemander aux élèves de répéter la couleur entendue avant de leur faire\n\ncolorier les crayons sur l'activité 1.\n\n© Pencil one is blue.              ePencil fiveisorange. » Pencil nine is pink.\n\ne Pencil two is red. Pencil six is purple.            © Pencil ten is black and white.\no Pe",
  },
  {
    id: "well-done-ce1-04",
    period: null,
    title: "The Hungry Yeti",
    objective: "Savoir reconnaître et employer les sons voyelles.",
    competence: "Comprendre à l'oral ; parler en continu.",
    vocabulary: [
      "A",
      "E",
      "I",
      "O",
      "U",
      "Y",
      "apple",
      "eggs",
      "ice cream",
      "oranges",
      "umbrella",
      "yeti",
    ],
    languageStructures: ["A is for apples.", "E is for eggs.", "The Hungry Yeti has ..."],
    material: ["Activité lexicale animée", "Fiche élève p. 15"],
    studentPages: [15],
    teacherPages: [36, 37],
    audioVideo: ["The Hungry Yeti animation"],
    phases: [
      {
        title: "Séance 1",
        detail:
          "Séance 1 : Découvrir ; Comprendre. Voir la transcription OCR des pages guide 36-37 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 2",
        detail:
          "Séance 2 : S'entraîner ; Se lancer. Voir la transcription OCR des pages guide 36-37 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 3",
        detail:
          "Séance 3 : Voir ce que l'on sait. Voir la transcription OCR des pages guide 36-37 pour le texte complet.",
        instructions: [],
      },
    ],
    exercises: [
      {
        id: "well-done-ce1-04-ex-1",
        number: "Séance 1",
        title: "The Hungry Yeti · Séance 1",
        instruction:
          "Look, listen and repeat: vidéoprojeter l'activité lexicale animée sur les voyelles.",
      },
      {
        id: "well-done-ce1-04-ex-2",
        number: "Séance 2",
        title: "The Hungry Yeti · Séance 2",
        instruction:
          "Listen and colour the letters: distribuer la fiche élève et la faire coller dans le cahier.",
        page: 15,
      },
      {
        id: "well-done-ce1-04-ex-3",
        number: "Séance 3",
        title: "The Hungry Yeti · Séance 3",
        instruction:
          "Look and say: vidéoprojeter l'animation The Hungry Yeti en coupant le son et demander aux élèves de redire le texte.",
      },
    ],
    sequenceNumber: 4,
    sequenceTitle: "Playing with letters",
    sessionCount: 3,
    pdfPages: [13],
    materialPages: [],
    coverageNote:
      "Le PDF scanné ne donne pas de rattachement explicite à une période Ardoise. period reste donc à null.",
    sourceExcerpt:
      "[PDF p.13]\n~\n>\n«\n\nVE\n\n=» Write the letters and say  (EOMPRENDREALORAD)\n\nVidéoprojeter à nouveau l'animation The Hungry Yeti si nécessaire et cacher l’image\n«Jeu                                     pour ne passer que l'audio.\n\nInviter les élèves à écrire les lettres dans les bons emplacements sur leur fiche.\nMontrer l'exemple avec la lettre A. Faire répéter A is for apples, E is for eggs...\n\nSEANCE 3 =rm\n\n| SEANCE1                                                                  =m Voir ce que l'on saif gm ............\nre                                                             ‘=> Look and say (Parier en continu)\n\nVidéoprojeter l'animation The Hungry Yeti en coupant le son\net demander aux élèves de redire le texte.\nDonner l'exemple si nécessaire (The Hungry Yeti has...) puis les élèves complètent la phrase.\n\ny PLAYING WITH LETTERS      m= Se lancer ym\n\nN\n\nCLUIEET] => Savoir reconnaître et employer les sons voyelles.\n\nmm Découvrir gr\n\nt= Look, listen and repeat: vidéoprojeter l'activité lexicale animée\nsur les voyelles. Faire découvrir les voyelles et leur mot référent\n\nen activant chaque audio.                           ;         i                           i",
  },
  {
    id: "well-done-ce1-05",
    period: null,
    title: "The Simon says game",
    objective:
      "Comprendre les principales consignes de classe. Savoir présenter quelques affaires scolaires.",
    competence: "Comprendre à l'oral ; parler en continu.",
    vocabulary: [
      "Come!",
      "Listen!",
      "Look!",
      "Take a pencil!",
      "Draw!",
      "Colour!",
      "Sing!",
      "Be quiet!",
    ],
    languageStructures: ["Simon says ...", "Picture A / Picture B"],
    material: ["Activité lexicale animée", "Fiche élève p. 18"],
    studentPages: [18],
    teacherPages: [42, 43],
    audioVideo: ["The Let's go song", "Activité lexicale animée"],
    phases: [
      {
        title: "Séance 1",
        detail:
          "Séance 1 : Découvrir ; Comprendre. Voir la transcription OCR des pages guide 42-43 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 2",
        detail:
          "Séance 2 : S'entraîner ; Se lancer. Voir la transcription OCR des pages guide 42-43 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 3",
        detail:
          "Séance 3 : Voir ce que l'on sait. Voir la transcription OCR des pages guide 42-43 pour le texte complet.",
        instructions: [],
      },
    ],
    exercises: [
      {
        id: "well-done-ce1-05-ex-1",
        number: "Séance 1",
        title: "The Simon says game · Séance 1",
        instruction:
          "Look, listen and repeat: vidéoprojeter l'activité lexicale animée sur les consignes de classe.",
      },
      {
        id: "well-done-ce1-05-ex-2",
        number: "Séance 2",
        title: "The Simon says game · Séance 2",
        instruction:
          "Let's play Simon says! Listen, tick and say: distribuer la fiche élève et la faire coller dans le cahier.",
        page: 18,
      },
      {
        id: "well-done-ce1-05-ex-3",
        number: "Séance 3",
        title: "The Simon says game · Séance 3",
        instruction: "Let's play Simon says!",
      },
    ],
    sequenceNumber: 5,
    sequenceTitle: "At school!",
    sessionCount: 3,
    pdfPages: [14],
    materialPages: [],
    coverageNote:
      "Le PDF scanné ne donne pas de rattachement explicite à une période Ardoise. period reste donc à null.",
    sourceExcerpt:
      "[PDF p.14]\num Se lancer 577 rer\n|                        => Look and sing (FARLEAEN CONTINU)\n\ng AT SCHOOL!\n\n:                                                                                                                                                                   «chanson                                           Vidéoprojeter à nouveau la chanson et inviter les élèves à chanter sur la partie instrumentale.\n|                                                                                                                                                                               Jeu\n\nObjectifs     => Comprendre les principales consignes de classe.\n\n.\n|                               => Savoir présenter quelques affaires scolaires.                                                                SEANCE 3 2m\n\n|                                                                                mm Voir ce que l'on sait gm\n|    SEANCE 1 | 20min |                                                      ‘=> Let's play Simon says! (Comprendre A CORAL)\n\nL'activité lexicale animée peut être vidéoprojetée pour aider les élèves (Come, Let's go,\n’                    A",
  },
  {
    id: "well-done-ce1-06",
    period: null,
    title: "The Family bingo game",
    objective: "Savoir employer les noms des principaux membres de la famille.",
    competence: "Comprendre à l'oral ; parler en interaction.",
    vocabulary: ["Mum", "Dad", "Grandma", "Grandpa", "brother", "sister", "baby"],
    languageStructures: ["Who is it?", "It's ..."],
    material: ["Activité lexicale animée", "Fiche élève p. 21", "Fiche matériel p. 62"],
    studentPages: [21],
    teacherPages: [48, 49],
    audioVideo: ["The Family bingo game", "Activité Remember"],
    phases: [
      {
        title: "Séance 1",
        detail:
          "Séance 1 : Découvrir ; Comprendre. Voir la transcription OCR des pages guide 48-49 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 2",
        detail:
          "Séance 2 : S'entraîner. Voir la transcription OCR des pages guide 48-49 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 3",
        detail:
          "Séance 3 : Se lancer. Voir la transcription OCR des pages guide 48-49 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 4",
        detail:
          "Séance 4 : Voir ce que l'on sait. Voir la transcription OCR des pages guide 48-49 pour le texte complet.",
        instructions: [],
      },
    ],
    exercises: [
      {
        id: "well-done-ce1-06-ex-1",
        number: "Séance 1",
        title: "The Family bingo game · Séance 1",
        instruction:
          "Look, listen and repeat: vidéoprojeter l'activité lexicale animée sur les membres de la famille.",
      },
      {
        id: "well-done-ce1-06-ex-2",
        number: "Séance 2",
        title: "The Family bingo game · Séance 2",
        instruction: "Look and say: distribuer la fiche élève et la faire coller dans le cahier.",
        page: 21,
      },
      {
        id: "well-done-ce1-06-ex-3",
        number: "Séance 3",
        title: "The Family bingo game · Séance 3",
        instruction: "Now your turn, let's play!",
      },
      {
        id: "well-done-ce1-06-ex-4",
        number: "Séance 4",
        title: "The Family bingo game · Séance 4",
        instruction: "Listen and tick: vidéoprojeter l'activité Remember.",
      },
    ],
    sequenceNumber: 6,
    sequenceTitle: "Families",
    sessionCount: 4,
    pdfPages: [15],
    materialPages: [62],
    coverageNote:
      "Le PDF scanné ne donne pas de rattachement explicite à une période Ardoise. period reste donc à null.",
    sourceExcerpt:
      "[PDF p.15]\nSEANCE 1 em\n\nSEANCE 2 em\n\n6 FAMILIES\n\nObjectif     ‘= Savoir employer les noms des principaux membres\nde la famille.\n\nmm Découvrir gm ………RE\n\nt=> Look, listen and repeat: vidéoprojeter l'activité lexicale animée\nsur les membres de la famille. Activer l'audio en cliquant\n\nsur chaque illustration.\n\nFaire répéter les mots par les élèves.\n\nmm Comprendre rm\n\nt= Look, listen and repeat: vidéoprojeter l'animation The Family\nbingo game qui explique les règles du jeu. La montrer plusieurs fois\nsi nécessaire. Les élèves répètent chaque énoncé présentant\n\nun membre de la famille.\n\nBE S'entraîner gt...\n\n=> Look and say: distribuer la fiche élève et la faire coller dans le cahier.\nDemander aux élèves d'énoncer le nom de chaque membre de la famille\nsur l'activité 1.\n\n=> Listen and play: dans l'activité 2, faire entourer les personnages\nde la grille par les élèves selon ce que vous énoncez, sur le modèle\nde l'animation The Family bingo game.\n\nLes filles peuvent jouer le rôle de Lily et les garçons celui de Leo.\nVeiller à ce que les élèves disent bingo lorsqu'une grille est remplie !\n«Girls, you are Lily, and boys, you are Leo.\n\nÉnoncé : Hello Mum! Hello Grandpa! Hello Dad! Hello baby! Hello sister",
  },
  {
    id: "well-done-ce1-07",
    period: null,
    title: "The Goldilocks sketch",
    objective:
      "Connaître et décrire quelques éléments d'une maison à travers le conte de Goldilocks. Comprendre et raconter le conte de Goldilocks.",
    competence: "Comprendre à l'oral ; parler en continu.",
    vocabulary: [
      "house",
      "kitchen",
      "bedroom",
      "tiny bowl",
      "Daddy Bear",
      "Mummy Bear",
      "Baby Bear",
      "Goldilocks",
    ],
    languageStructures: ["This is ...", "Goldilocks, go to the kitchen!", "Goldilocks, run!"],
    material: ["Activité lexicale animée", "Fiche élève p. 24", "Fiche matériel p. 63"],
    studentPages: [24],
    teacherPages: [54, 55],
    audioVideo: ["Goldilocks and the three bears", "Activité Remember"],
    phases: [
      {
        title: "Séance 1",
        detail:
          "Séance 1 : Découvrir ; Comprendre. Voir la transcription OCR des pages guide 54-55 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 2",
        detail:
          "Séance 2 : S'entraîner ; Se lancer. Voir la transcription OCR des pages guide 54-55 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 3",
        detail:
          "Séance 3 : Voir ce que l'on sait. Voir la transcription OCR des pages guide 54-55 pour le texte complet.",
        instructions: [],
      },
    ],
    exercises: [
      {
        id: "well-done-ce1-07-ex-1",
        number: "Séance 1",
        title: "The Goldilocks sketch · Séance 1",
        instruction:
          "Look, listen and repeat: vidéoprojeter l'activité lexicale animée sur le conte de Boucle d'Or (Goldilocks).",
      },
      {
        id: "well-done-ce1-07-ex-2",
        number: "Séance 2",
        title: "The Goldilocks sketch · Séance 2",
        instruction:
          "Listen, colour and say: distribuer la fiche élève et la faire coller dans le cahier.",
        page: 24,
      },
      {
        id: "well-done-ce1-07-ex-3",
        number: "Séance 3",
        title: "The Goldilocks sketch · Séance 3",
        instruction:
          "Listen and tick: vidéoprojeter l'activité Remember et inviter la classe à cocher les bonnes réponses selon l'audio entendu.",
      },
    ],
    sequenceNumber: 7,
    sequenceTitle: "At home!",
    sessionCount: 3,
    pdfPages: [16],
    materialPages: [63],
    coverageNote:
      "Le PDF scanné ne donne pas de rattachement explicite à une période Ardoise. period reste donc à null.",
    sourceExcerpt:
      "[PDF p.16]\nObjectifs JQ Comprendre et raconter le conte de Goldilocks.\n\no sketch\n\n=> Connaître et décrire quelques éléments d'une maison à travers le conte de Goldilocks.\n\nSÉANCE 1 mm\n\nmm Découvrir mm\n\n=> Look, listen and repeat: vidéoprojeter l'activité lexicale animée\nsur le conte de Boucle d'Or (Goldilocks). Activer l'audio en cliquant\nsur chaque illustration.\n\nFaire répéter les mots par les élèves.\n\nus Comprendre 5557 ……………………\n\nt Look and listen: vidéoprojeter l'animation Goldilocks\nandthethree bears.\n\n= Look, repeat and mime: demander aux élèves de répéter les mots\nde l'animation après chaque audio. Faire mimer big, medium et tiny\n(minuscule) avec les mains pour faire comprendre le sens de ces adjectifs.\n\n= Listen and point: distribuer la fiche matériel sur le conte,\n\nla faire coller dans le cahier et inviter les élèves à désigner les illustrations\n\nen leur donnant les éléments de a fiche dans le désordre.\n\n«Mummy Bear othe medium bow! » the three bears « Goldilocks » the tiny bowl «\nBaby Bear « the kitchen othe tiny bed o Daddy Bear o the house » the big bow! »\nRun Goldilocks! o the bedroom © the medium bed o the big bed.\n\nSEANCE 2 worm\nus S'entraîner Gem ooo\n\n=> Listen, colour and say:",
  },
  {
    id: "well-done-ce1-08",
    period: null,
    title: "Let's make apple crumble!",
    objective:
      "Décrire la recette d'un dessert typiquement anglais à l'aide de quelques aliments de base.",
    competence: "Comprendre à l'oral ; parler en continu.",
    vocabulary: ["flour", "sugar", "apples", "butter", "mix", "cut", "peel", "bake"],
    languageStructures: [
      "Peel the apples.",
      "Cut the apples and the butter.",
      "Bake for 45 minutes.",
    ],
    material: [
      "Activité lexicale animée",
      "Fiche élève p. 27",
      "Fiche matériel p. 65",
      "Grand bol",
      "Poêle",
      "Moule à gâteau",
    ],
    studentPages: [27],
    teacherPages: [60, 61],
    audioVideo: ["The apple crumble recipe", "Activité Remember"],
    phases: [
      {
        title: "Séance 1",
        detail:
          "Séance 1 : Découvrir ; Comprendre. Voir la transcription OCR des pages guide 60-61 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 2",
        detail:
          "Séance 2 : S'entraîner ; Se lancer. Voir la transcription OCR des pages guide 60-61 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 3",
        detail:
          "Séance 3 : Voir ce que l'on sait. Voir la transcription OCR des pages guide 60-61 pour le texte complet.",
        instructions: [],
      },
    ],
    exercises: [
      {
        id: "well-done-ce1-08-ex-1",
        number: "Séance 1",
        title: "Let's make apple crumble! · Séance 1",
        instruction:
          "Look and listen: vidéoprojeter l'activité lexicale animée de l'apple crumble.",
      },
      {
        id: "well-done-ce1-08-ex-2",
        number: "Séance 2",
        title: "Let's make apple crumble! · Séance 2",
        instruction: "Look and say: distribuer la fiche élève et la faire coller dans le cahier.",
        page: 27,
      },
      {
        id: "well-done-ce1-08-ex-3",
        number: "Séance 3",
        title: "Let's make apple crumble! · Séance 3",
        instruction:
          "Look and say: demander aux élèves les ingrédients d'un apple crumble puis les étapes de la recette.",
      },
    ],
    sequenceNumber: 8,
    sequenceTitle: "Eating and cooking",
    sessionCount: 3,
    pdfPages: [17],
    materialPages: [65],
    coverageNote:
      "Le PDF scanné ne donne pas de rattachement explicite à une période Ardoise. period reste donc à null.",
    sourceExcerpt:
      "[PDF p.17]\nObjectif,        => Décrire la recette d'un dessert typiquement anglais\n|                                  ;                      à l'aide de quelques aliments de base.\n\nSÉANCE ] wm\n\n| =m Découvrir gx -.\n\n|                       => Look and listen: vidéoprojeter l'activité lexicale animée\nde l'apple crumble. Activer l'audio en cliquant sur chaque illustration\n4                       pour faire découvrir le lexique de la recette.\n\nt= Listen and repeat: inviter la classe à répéter les mots en désignant les illustrations\ni                         dans l’ordre puis dans le désordre.\n\ni                              t=> Come and point the correct ingredient: demander à quatre élèves de venir au tableau\nI                               désigner l'ingrédient que vous citez.\nProposer ensuite la même activité à quatre autres élèves.\n\nmm Comprendre mn\n\n=> Look, listen and mime: vidéoprojeter l'animation The apple\ncrumble recipe, Faire répéter et mimer les étapes de la recette\npour en faciliter la compréhension.\n\nSEANCE 2 wma\n\nED S'entraîner Gm...\n\n=> Look and say: distribuer la fiche élève et la faire coller dans le cahier.\nEn faisant le tour de la classe, demander aux élèves de prononcer le n",
  },
  {
    id: "well-done-ce1-09",
    period: null,
    title: "Draw and colour the body",
    objective: "Comprendre des instructions permettant de nommer les parties du corps.",
    competence: "Comprendre à l'oral ; parler en interaction.",
    vocabulary: [
      "head",
      "arms",
      "hands",
      "tummy",
      "legs",
      "feet",
      "pink",
      "yellow",
      "brown",
      "blue",
      "green",
      "orange",
    ],
    languageStructures: [
      "What colour is the head?",
      "What's this part of the body?",
      "It's the head!",
    ],
    material: ["Activité lexicale animée", "Fiche élève p. 30"],
    studentPages: [30],
    teacherPages: [66, 67],
    audioVideo: ["This is my body"],
    phases: [
      {
        title: "Séance 1",
        detail:
          "Séance 1 : Découvrir ; Comprendre. Voir la transcription OCR des pages guide 66-67 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 2",
        detail:
          "Séance 2 : S'entraîner. Voir la transcription OCR des pages guide 66-67 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 3",
        detail:
          "Séance 3 : Se lancer ; Voir ce que l'on sait. Voir la transcription OCR des pages guide 66-67 pour le texte complet.",
        instructions: [],
      },
    ],
    exercises: [
      {
        id: "well-done-ce1-09-ex-1",
        number: "Séance 1",
        title: "Draw and colour the body · Séance 1",
        instruction:
          "Look, listen and repeat: vidéoprojeter l'activité lexicale animée et activer l'audio en cliquant sur chaque partie du corps.",
      },
      {
        id: "well-done-ce1-09-ex-2",
        number: "Séance 2",
        title: "Draw and colour the body · Séance 2",
        instruction:
          "Listen and colour: distribuer la fiche élève et la faire coller dans le cahier.",
        page: 30,
      },
      {
        id: "well-done-ce1-09-ex-3",
        number: "Séance 3",
        title: "Draw and colour the body · Séance 3",
        instruction:
          "Listen, look and say: énoncer une couleur et demander aux élèves de dire et de montrer, sur leur fiche élève, à quelle partie du corps elle correspond.",
      },
    ],
    sequenceNumber: 9,
    sequenceTitle: "Looks and feelings",
    sessionCount: 3,
    pdfPages: [18],
    materialPages: [],
    coverageNote:
      "Le PDF scanné ne donne pas de rattachement explicite à une période Ardoise. period reste donc à null.",
    sourceExcerpt:
      "[PDF p.18]\nLOOKS AND FEELINGS\n\n« Coloriage\n\nt=» Comprendre des instructions permettant\n\nObi\nDEC          de nommer les parties du corps.\n\nSEANCE 1 xm\n\nus Découvrir Gaim …………………………….………….\n\n‘=> Look, listen and repeat: vidéoprojeter l'activité lexicale animée\net activer l’audio en cliquant sur chaque partie du corps.\nFaire écouter et répéter plusieurs fois les énoncés.\n\nus Comprendre 52777 ..........ccooooeeeereeneres ess sesssses esses ese\n\n‘=> Listen and touch your...: inviter les élèves à se lever et à désigner sur eux-mêmes\nles parties du corps que vous énoncez.\n\n= My head, my arms, my hands, my tummy, my legs, my feet.\n\nMontrer l'exemple pour éviter l'emploi du français.\n\nSEANCE 2 em\n\nmu S'entraîner g277 oor senses\n\n=> Listen and colour: distribuer la fiche élève et la faire coller dans le cahier.\nFaire colorier les différentes parties du corps selon les couleurs\nque vous énoncez.\n\n© Colour the head pink.       «Colour the hands yellow.\n= Colour the feet brown.       «Colour the legs blue.\n«Colour the tummy orange. ~~ =Colour the arms green.\n\n‘=> What colour is the head? Redemander la couleur de chaque partie\ndu corps. Aider les élèves à répondre avec un premier exemple :\n\n«What colour is",
  },
  {
    id: "well-done-ce1-10",
    period: null,
    title: "The Snow White sketch",
    objective: "Comprendre et raconter le conte de Snow White.",
    competence: "Comprendre à l'oral ; parler en interaction ; parler en continu.",
    vocabulary: ["Snow White", "The Prince", "The Dwarfs", "The Queen", "apple", "jealous"],
    languageStructures: ["I am jealous.", "I am lost in the forest.", "Oh, the Prince!"],
    material: ["Activité lexicale animée", "Fiche élève p. 33"],
    studentPages: [33],
    teacherPages: [72, 73],
    audioVideo: ["Animation Snow White", "Activité Remember"],
    phases: [
      {
        title: "Séance 1",
        detail:
          "Séance 1 : Découvrir ; Comprendre. Voir la transcription OCR des pages guide 72-73 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 2",
        detail:
          "Séance 2 : S'entraîner. Voir la transcription OCR des pages guide 72-73 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 3",
        detail:
          "Séance 3 : Se lancer ; Voir ce que l'on sait. Voir la transcription OCR des pages guide 72-73 pour le texte complet.",
        instructions: [],
      },
    ],
    exercises: [
      {
        id: "well-done-ce1-10-ex-1",
        number: "Séance 1",
        title: "The Snow White sketch · Séance 1",
        instruction:
          "Look, listen and repeat: vidéoprojeter l'activité lexicale animée du conte de Snow White.",
      },
      {
        id: "well-done-ce1-10-ex-2",
        number: "Séance 2",
        title: "The Snow White sketch · Séance 2",
        instruction:
          "Listen and circle: distribuer la fiche élève et la faire coller dans le cahier.",
        page: 33,
      },
      {
        id: "well-done-ce1-10-ex-3",
        number: "Séance 3",
        title: "The Snow White sketch · Séance 3",
        instruction: "Let's do the sketch! Mime and say.",
      },
    ],
    sequenceNumber: 10,
    sequenceTitle: "Arts and tales",
    sessionCount: 3,
    pdfPages: [19],
    materialPages: [],
    coverageNote:
      "Le PDF scanné ne donne pas de rattachement explicite à une période Ardoise. period reste donc à null.",
    sourceExcerpt:
      "[PDF p.19]\n‘= Your turn, say: demander aux élèves de dire à nouveau à voix haute les phrases\ndes personnages à l'aide des illustrations.\n\nSÉANCE 3 em\n\nWLJE{R] => Comprendre et raconter le conte de Snow White.                                                              =  Se  lancer Po min |\ni                                                                                                                                                                               = Let's do the sketch! Mime and say (PARLEREN CONTIG)\n\nInviter les élèves à constituer des groupes et à distribuer les rôles pour jouer le sketch\n>\n8 SEANCE | er\nee —\n\nselon le modèle de l'animation Snow White.\n’                     .\nmu Découvrir y …\n\nAfficher l'activité lexicale animée en guise de support visuel.\n\nmm Voir ce que l'on sait gm\n\nf\nlf                                   i                        2         TIE         Ë\n\n| |                   ‘= Look, listen and repeat: vidéoprojeter l ‘activité lexicale animée                                                                      ‘=> Listen, drag and drop\n\nile                            du conte de Snow White. Activer l'audio en cliquant sur chaque",
  },
  {
    id: "well-done-ce1-11",
    period: null,
    title: "The folk dance",
    objective: "Savoir comprendre et décrire les étapes d'une danse traditionnelle folklorique.",
    competence: "Comprendre à l'oral ; parler en continu.",
    vocabulary: ["clap", "heel", "toe", "hand", "hip", "link arms", "spin", "under the bridge"],
    languageStructures: ["One, two, three, four!", "Let's dance!"],
    material: ["Activité lexicale animée", "Fiche élève p. 36"],
    studentPages: [36],
    teacherPages: [78, 79],
    audioVideo: ["The folk dance", "Animation de la chanson"],
    phases: [
      {
        title: "Séance 1",
        detail:
          "Séance 1 : Découvrir ; Comprendre. Voir la transcription OCR des pages guide 78-79 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 2",
        detail:
          "Séance 2 : S'entraîner. Voir la transcription OCR des pages guide 78-79 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 3",
        detail:
          "Séance 3 : Se lancer ; Voir ce que l'on sait. Voir la transcription OCR des pages guide 78-79 pour le texte complet.",
        instructions: [],
      },
    ],
    exercises: [
      {
        id: "well-done-ce1-11-ex-1",
        number: "Séance 1",
        title: "The folk dance · Séance 1",
        instruction:
          "Look, listen and repeat: vidéoprojeter l'activité lexicale animée sur la danse folklorique.",
      },
      {
        id: "well-done-ce1-11-ex-2",
        number: "Séance 2",
        title: "The folk dance · Séance 2",
        instruction:
          "Cut out the cards: distribuer la fiche élève et la faire coller dans le cahier.",
        page: 36,
      },
      {
        id: "well-done-ce1-11-ex-3",
        number: "Séance 3",
        title: "The folk dance · Séance 3",
        instruction: "Let's dance!",
      },
    ],
    sequenceNumber: 11,
    sequenceTitle: "Let's move!",
    sessionCount: 3,
    pdfPages: [20],
    materialPages: [],
    coverageNote:
      "Le PDF scanné ne donne pas de rattachement explicite à une période Ardoise. period reste donc à null.",
    sourceExcerpt:
      "[PDF p.20]\nSEANCE ] em\n\nSÉANCE 2 es\n\n] LET'S MOVE!\n\n‘=> Savoir comprendre et décrire les étapes d'une danse\n\nObjectif                traditionnelle folklorique.\n\num Découvrir gm .............ooooeireeenn\n\nt= Look, listen and repeat: vidéoprojeter l'activité lexicale animée\nsur la danse folklorique. Activer l'audio en cliquant sur chaque illustration.\nFaire répéter plusieurs fois les différentes étapes de la danse par les élèves.\n\nus Comprendre gr ............ooerreecernen]\n\n=> Look and listen: vidéoprojeter l'animation de la chanson\nThe folk dance pour faire découvrir cette danse traditionnelle.\n‘=> Listen and mime: faire réécouter la chanson et demander\naux élèves de mimer les gestes de la danse en restant assis à leur place.\n\n1. One, two, three, four: on compte avec les doigts                    5. Linkarms, link arms: on fait semblant\nde la main droite (idem à gauche).                                        de prendre le bras droit de son voisin\n\n2. Clap, clap, clap, clap: on applaudit quatre fois.                              (idem à gauche).\n3. Heel, toe, heel,toe: sur sa table, et de sa main                      6. Spin, spin, spin, spin: on tourne son index\ndroite, on mime le mouvement",
  },
  {
    id: "well-done-ce1-12",
    period: null,
    title: "The O'clock clock",
    objective: "Savoir lire et dire des heures piles.",
    competence: "Comprendre à l'oral ; parler en interaction ; parler en continu.",
    vocabulary: [
      "one o'clock",
      "two o'clock",
      "three o'clock",
      "four o'clock",
      "five o'clock",
      "six o'clock",
      "seven o'clock",
      "eight o'clock",
      "nine o'clock",
      "ten o'clock",
      "eleven o'clock",
      "twelve o'clock",
    ],
    languageStructures: ["What time is it?", "It's ... o'clock."],
    material: ["Activité lexicale animée", "Fiche élève p. 39", "Fiche matériel p. 68"],
    studentPages: [39],
    teacherPages: [84, 85],
    audioVideo: ["Activité Remember"],
    phases: [
      {
        title: "Séance 1",
        detail:
          "Séance 1 : Découvrir. Voir la transcription OCR des pages guide 84-85 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 2",
        detail:
          "Séance 2 : Comprendre. Voir la transcription OCR des pages guide 84-85 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 3",
        detail:
          "Séance 3 : S'entraîner. Voir la transcription OCR des pages guide 84-85 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 4",
        detail:
          "Séance 4 : Se lancer ; Voir ce que l'on sait. Voir la transcription OCR des pages guide 84-85 pour le texte complet.",
        instructions: [],
      },
    ],
    exercises: [
      {
        id: "well-done-ce1-12-ex-1",
        number: "Séance 1",
        title: "The O'clock clock · Séance 1",
        instruction:
          "Look, listen and repeat: vidéoprojeter l'activité lexicale animée sur les heures.",
      },
      {
        id: "well-done-ce1-12-ex-2",
        number: "Séance 2",
        title: "The O'clock clock · Séance 2",
        instruction: "Cut out the clock: distribuer la fiche matériel.",
        page: 39,
      },
      {
        id: "well-done-ce1-12-ex-3",
        number: "Séance 3",
        title: "The O'clock clock · Séance 3",
        instruction:
          "Listen, point and say: distribuer la fiche élève et la faire coller dans le cahier.",
      },
      {
        id: "well-done-ce1-12-ex-4",
        number: "Séance 4",
        title: "The O'clock clock · Séance 4",
        instruction: "Let's play! Say a time.",
      },
    ],
    sequenceNumber: 12,
    sequenceTitle: "Time",
    sessionCount: 4,
    pdfPages: [21],
    materialPages: [68],
    coverageNote:
      "Le PDF scanné ne donne pas de rattachement explicite à une période Ardoise. period reste donc à null.",
    sourceExcerpt:
      "[PDF p.21]\nSÉANCE 1 re\n\nSÉANCE 2 exm\n\nCHEB | = Savoir lire et dire des heures piles.\n\nus Découvrir mm\n\n=> Look, listen and repeat: vidéoprojeter l'activité lexicale animée\nsur les heures et activer l'audio en cliquant sur chaque horloge.\nFaire répéter les heures plusieurs fois par les élèves.\n\nus Comprendre gr . ooo\n\n‘= Cut out the clock: distribuer la fiche matériel. Faire découper et rassembler\nles deux parties de l'horloge (prédécouper le trou central et aider les élèves\n\nà assembler l'horloge et l'aiguille des heures à l'aide d'une attache parisienne).\n‘= Listen and show the times: inviter les élèves à positionner à chaque fois\nl'aiguille des heures au bon endroit selon ce que vous énoncez, puis à lever\n\nleur horloge pour la montrer.\n\n« What time is it? — It's one o'clock! (two, three, four, five, six, seven, eight, nine, ten, eleven, twelve)\nRecommencer plusieurs fois en allant de plus en plus vite.\n\nSEANCE 3 rm\n\num S'entraîner gzzr\n\n‘= Listen, point and say: distribuer la fiche élève et la faire coller\ndans le cahier. Sur l'activité 1, demander aux élèves de désigner du doigt\npuis de répéter les heures que vous énoncez.\n\ne It's one o'clock! It's two o'clock! Etc.\n\nCirculer dans la class",
  },
  {
    id: "well-done-ce1-13",
    period: null,
    title: "Trick or treat?",
    objective: "Jouer un sketch d'Halloween.",
    competence: "Comprendre à l'oral ; parler en interaction ; parler en continu.",
    vocabulary: [
      "pumpkin",
      "jack o'lantern",
      "witch",
      "black cat",
      "spider",
      "ghost",
      "trick or treat",
    ],
    languageStructures: [
      "I'm Jack o'lantern!",
      "Here are your masks.",
      "And now, let's do the sketch!",
    ],
    material: ["Activité lexicale animée", "Fiche élève p. 42", "Fiche matériel p. 69"],
    studentPages: [42],
    teacherPages: [90, 91],
    audioVideo: ["Animation Halloween"],
    phases: [
      {
        title: "Séance 1",
        detail:
          "Séance 1 : Découvrir ; Comprendre. Voir la transcription OCR des pages guide 90-91 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 2",
        detail:
          "Séance 2 : S'entraîner. Voir la transcription OCR des pages guide 90-91 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 3",
        detail:
          "Séance 3 : Se lancer. Voir la transcription OCR des pages guide 90-91 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 4",
        detail:
          "Séance 4 : Voir ce que l'on sait. Voir la transcription OCR des pages guide 90-91 pour le texte complet.",
        instructions: [],
      },
    ],
    exercises: [
      {
        id: "well-done-ce1-13-ex-1",
        number: "Séance 1",
        title: "Trick or treat? · Séance 1",
        instruction:
          "Look, listen and repeat: vidéoprojeter l'activité lexicale animée sur Halloween.",
      },
      {
        id: "well-done-ce1-13-ex-2",
        number: "Séance 2",
        title: "Trick or treat? · Séance 2",
        instruction:
          "Look, point and say: distribuer la fiche élève et la faire coller dans le cahier.",
        page: 42,
      },
      {
        id: "well-done-ce1-13-ex-3",
        number: "Séance 3",
        title: "Trick or treat? · Séance 3",
        instruction: "Let's prepare the Halloween sketch!",
      },
      {
        id: "well-done-ce1-13-ex-4",
        number: "Séance 4",
        title: "Trick or treat? · Séance 4",
        instruction: "Look and say: vidéoprojeter l'animation Halloween.",
      },
    ],
    sequenceNumber: 13,
    sequenceTitle: "Celebrations",
    sessionCount: 4,
    pdfPages: [22],
    materialPages: [69],
    coverageNote:
      "Le PDF scanné ne donne pas de rattachement explicite à une période Ardoise. period reste donc à null.",
    sourceExcerpt:
      "[PDF p.22]\n3 CELEBRATIONS\n\nUa | => Jouer un sketch d'Halloween.\n\nSÉANCE 1 w=\n\nmm Découvrir rm.\n\n=> Look, listen and repeat: vidéoprojeter l'activité lexicale animée\nsur Halloween. Activer l'audio en cliquant sur chaque illustration.\nInviter les élèves à répéter les phrases entendues.\n\nmm Comprendre ym\n\n=> Listen and look: vidéoprojeter l'animation Halloween\npour montrer le déroulement du sketch.\n\n=> Listen, repeat and mime: faire réécouter, répéter puis mimer\n\nles énoncés à l'aide des gestes des personnages. Vous pouvez aussi\nvidéoprojeter l'activité lexicale animée de Halloween, puis demander\naux élèves de venir un à un désigner les éléments que vous citez.\n\n« The pumpkin              o The black cat             o Trick...\n= Jacko'lantern      « The spider        o...ortreat!\n« The witch      « The ghost\n\nTerminer en faisant répéter Happy Halloween!\n\nSEANCE 2 em\n\nmm S'entraîner gm\n\n=> Look, point and say: distribuer la fiche élève et la faire coller\ndans le cahier. Dans l'activité 1, demander aux élèves de se présenter\navec le nom des quatre personnages.\n\nLeur donner le premier exemple en guise de consigne :\n\n« Number one, I'm Jacko‘lantern!\n\n« Number two? I'm the...\n\nLes aider a employer th",
  },
  {
    id: "well-done-ce1-14",
    period: null,
    title: "The Are you sleeping song",
    objective: "Savoir se questionner autour des activités de la journée.",
    competence: "Comprendre à l'oral ; parler en interaction ; parler en continu.",
    vocabulary: ["sleep", "eat", "drink", "wash"],
    languageStructures: ["Are you sleeping?", "I'm sleeping.", "I'm not sleeping."],
    material: [
      "Activité lexicale animée",
      "Fiche élève p. 45",
      "Fiche matériel p. 73",
      "Flashcards sleep/eat/drink/wash",
    ],
    studentPages: [45],
    teacherPages: [96, 97],
    audioVideo: ["Are you sleeping song", "Activité Remember"],
    phases: [
      {
        title: "Séance 1",
        detail:
          "Séance 1 : Découvrir ; Comprendre. Voir la transcription OCR des pages guide 96-97 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 2",
        detail:
          "Séance 2 : S'entraîner ; Se lancer. Voir la transcription OCR des pages guide 96-97 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 3",
        detail:
          "Séance 3 : Voir ce que l'on sait. Voir la transcription OCR des pages guide 96-97 pour le texte complet.",
        instructions: [],
      },
    ],
    exercises: [
      {
        id: "well-done-ce1-14-ex-1",
        number: "Séance 1",
        title: "The Are you sleeping song · Séance 1",
        instruction:
          "Look and listen: vidéoprojeter l'activité lexicale animée sur les quatre verbes d'action.",
      },
      {
        id: "well-done-ce1-14-ex-2",
        number: "Séance 2",
        title: "The Are you sleeping song · Séance 2",
        instruction: "Look and say: distribuer la fiche élève et la faire coller dans le cahier.",
        page: 45,
      },
      {
        id: "well-done-ce1-14-ex-3",
        number: "Séance 3",
        title: "The Are you sleeping song · Séance 3",
        instruction: "Look and sing ; Listen and tick.",
      },
    ],
    sequenceNumber: 14,
    sequenceTitle: "My day",
    sessionCount: 3,
    pdfPages: [23],
    materialPages: [73],
    coverageNote:
      "Le PDF scanné ne donne pas de rattachement explicite à une période Ardoise. period reste donc à null.",
    sourceExcerpt:
      "[PDF p.23]\nSEANCE 1 wm\n\nSEANCE 2 wm\n\nü MY DAY\n\nObjectif       = Savoir se questionner autour des activités\nde la journée.\n\n= Découvrir yom\n\n=> Look and listen: vidéoprojeter l'activité lexicale animée\nsur les quatre verbes d'action (sleep, eat, drink, wash).\nActiver l'audio en cliquant sur chaque illustration.\n\n> Let's repeat and mime: rejouer l'activité, puis demander aux élèves\nde répéter et de mimer les actions plusieurs fois.\n\nmm Comprendre ym\n\nt=> Look, listen and repeat: vidéoprojeter l'animation de la chanson\nAre yousleeping? Inviter les élèves à répéter les énoncés\ntout en mimant les gestes selon le modèle.\n\n=> Let's make two groups and sing: organiser deux groupes.\n\nLe premier groupe chante les questions, le deuxième groupe chante\ntoujours la même réponse.\n\n« Group 1: Are you sleeping? (x 2) Brother John? (x 2)\n\n= Group 2: Morning bellsare ringing. (x 2) Ding, dang, dong. (x 2)\n Group 1: Are you eating/drinking/washing? (x 2) Brother John? (x 2)\n» Group 2: Morning bellsare ringing. (x 2) Ding, dang, dong. (x 2)\nDistribuer la fiche matériel pour que les élèves en gardent une trace.\n\nEE S'entraîner mm\n\n=> Look and say: distribuer la fiche élève et la faire coller dans le cahier.\nDemand",
  },
  {
    id: "well-done-ce1-15",
    period: null,
    title: "The Australian animals memory game",
    objective: "Savoir utiliser des noms d'animaux australiens.",
    competence: "Comprendre à l'oral ; parler en interaction.",
    vocabulary: ["koala", "kangaroo", "crocodile", "dingo", "emu", "platypus"],
    languageStructures: ["It's a pair.", "It's not a pair!", "What's number three?"],
    material: ["Activité lexicale animée", "Fiche élève p. 48", "Fiche matériel p. 75"],
    studentPages: [48],
    teacherPages: [102, 103],
    audioVideo: ["Diaporama culturel sur les animaux australiens", "Activité Remember"],
    phases: [
      {
        title: "Séance 1",
        detail:
          "Séance 1 : Découvrir ; Comprendre. Voir la transcription OCR des pages guide 102-103 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 2",
        detail:
          "Séance 2 : S'entraîner. Voir la transcription OCR des pages guide 102-103 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 3",
        detail:
          "Séance 3 : Se lancer ; Voir ce que l'on sait. Voir la transcription OCR des pages guide 102-103 pour le texte complet.",
        instructions: [],
      },
    ],
    exercises: [
      {
        id: "well-done-ce1-15-ex-1",
        number: "Séance 1",
        title: "The Australian animals memory game · Séance 1",
        instruction:
          "Look, listen and repeat: vidéoprojeter l'activité lexicale animée sur les animaux australiens.",
      },
      {
        id: "well-done-ce1-15-ex-2",
        number: "Séance 2",
        title: "The Australian animals memory game · Séance 2",
        instruction: "Look and say: distribuer la fiche élève et la faire coller dans le cahier.",
        page: 48,
      },
      {
        id: "well-done-ce1-15-ex-3",
        number: "Séance 3",
        title: "The Australian animals memory game · Séance 3",
        instruction: "Let's play! Inviter les élèves à jouer par deux au jeu de memory.",
      },
    ],
    sequenceNumber: 15,
    sequenceTitle: "Animals and pets",
    sessionCount: 3,
    pdfPages: [24],
    materialPages: [75],
    coverageNote:
      "Le PDF scanné ne donne pas de rattachement explicite à une période Ardoise. period reste donc à null.",
    sourceExcerpt:
      "[PDF p.24]\nSEANCE 1 =m\n\nSEANCE 2 wm\n\nGala AND PETS\n\nWEA] => Savoir utiliser des noms d'animaux australiens.\n\nwu Découvrir Gammon\n\n=> Look, listen and repeat: vidéoprojeter l'activité lexicale animée\nsur les animaux australiens. Activer l'audio en cliquant sur chaque\nillustration.\n\nDemander aux élèves de répéter les énoncés plusieurs fois.\n\n=> Look, listen and say: montrer le diaporama culturel sur les animaux australiens\n\net faire découvrir ces animaux qui seront repris dans le jeu de memory.\n\nOn peut questionner les élèves en français, puis leur demander de répondre en anglais :\n\n— quels sont les trois animaux qui commencent par le son /k/ ? — the koala, kangaroo, crocodile ;\n— quels sont les deux animaux qui portent leur petit dans leur poche pendant les premiers mois\nde leur vie ? — the koala, kangaroo.\n\nus Comprendre 7: oor\n\nt» Look, listen and repeat: repasser l'animation The food memory game (thème 8, niveau 1 p. 58),\npour remettre en mémoire le jeu de memory en anglais.\nFaire répéter /t‘sa pair/It’s nota pair.\n\nus S'entraîner gr\n\nt Look and say: distribuer la fiche élève et la faire coller dans le cahier.\nLes élèves doivent décrire les cartes deux par deux et dire s'il s'agit\n\nou non d",
  },
  {
    id: "well-done-ce1-16",
    period: null,
    title: "Let's grow tomatoes!",
    objective: "Savoir expliquer une activité de jardinage.",
    competence: "Comprendre à l'oral ; parler en continu.",
    vocabulary: ["put", "plant", "water", "wait", "pot", "seeds", "cherry tomatoes"],
    languageStructures: [
      "Let's plant the cherry tomatoes!",
      "Let's put the pot(s) in a sunny spot.",
      "Let's water the tomatoes.",
    ],
    material: [
      "Activité lexicale animée",
      "Fiche élève p. 51",
      "Pot",
      "Terre",
      "Graines de tomates cerises",
    ],
    studentPages: [51],
    teacherPages: [108, 109],
    audioVideo: ["Let's plant cherry tomatoes animation"],
    phases: [
      {
        title: "Séance 1",
        detail:
          "Séance 1 : Découvrir ; Comprendre. Voir la transcription OCR des pages guide 108-109 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 2",
        detail:
          "Séance 2 : S'entraîner. Voir la transcription OCR des pages guide 108-109 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 3",
        detail:
          "Séance 3 : Se lancer. Voir la transcription OCR des pages guide 108-109 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 4",
        detail:
          "Séance 4 : Voir ce que l'on sait. Voir la transcription OCR des pages guide 108-109 pour le texte complet.",
        instructions: [],
      },
    ],
    exercises: [
      {
        id: "well-done-ce1-16-ex-1",
        number: "Séance 1",
        title: "Let's grow tomatoes! · Séance 1",
        instruction:
          "Look, listen and repeat: vidéoprojeter l'activité lexicale animée sur la culture de tomates cerises.",
      },
      {
        id: "well-done-ce1-16-ex-2",
        number: "Séance 2",
        title: "Let's grow tomatoes! · Séance 2",
        instruction:
          "Listen, point and say: distribuer la fiche élève et la faire coller dans le cahier.",
        page: 51,
      },
      {
        id: "well-done-ce1-16-ex-3",
        number: "Séance 3",
        title: "Let's grow tomatoes! · Séance 3",
        instruction: "Let's plant the cherry tomatoes!",
      },
      {
        id: "well-done-ce1-16-ex-4",
        number: "Séance 4",
        title: "Let's grow tomatoes! · Séance 4",
        instruction: "Look and say all you can!",
      },
    ],
    sequenceNumber: 16,
    sequenceTitle: "Outside",
    sessionCount: 4,
    pdfPages: [25],
    materialPages: [],
    coverageNote:
      "Le PDF scanné ne donne pas de rattachement explicite à une période Ardoise. period reste donc à null.",
    sourceExcerpt:
      "[PDF p.25]\nSEANCE 3 worm\n\në                                                                                      == Se lancer em.\n=                                                                                           ae\n‘=> Let's plant the cherry tomatoes!   (COMPRENDRE AICORAD) (@ARLER EW Contin)\n\nPrévoir le nécessaire pour planter des graines de tomates cerises en classe.\n\nDicter les étapes et demander à un élève différent de venir réaliser chacune d'entre elles.\nL'animation sans le son peut être vidéoprojetée pour rappel Si l'activité est menée par petits\ngroupes, prévoir un pot par groupe.\n\n|                                                                                                                                                                                                         Chaque élève suit en même temps les étapes énoncées et les prononce à nouveau.\n\n»                                                                                                                                                                                                               » Now your turn, say!\n| SEANCE | gr\n\nMettre le(s) pot(s) dans un endroit ensoleillé et arroser régulièrement.\n»",
  },
  {
    id: "well-done-ce1-17",
    period: null,
    title: "Sydney by bus and ferry",
    objective: "Décrire ses déplacements.",
    competence: "Comprendre à l'oral ; parler en interaction ; parler en continu.",
    vocabulary: [
      "bus",
      "ferry",
      "Bondi Beach",
      "Sydney Tower Eye",
      "Sydney Opera House",
      "Taronga Zoo",
    ],
    languageStructures: [
      "Let's take the bus to ...",
      "Let's take the ferry to ...",
      "Where's Sydney?",
    ],
    material: [
      "Animation Where's Sydney?",
      "Fiche élève p. 54",
      "Flashcards bus/ferry/lieux de Sydney",
    ],
    studentPages: [54],
    teacherPages: [114, 115],
    audioVideo: ["Diaporama culturel sur l'Australie"],
    phases: [
      {
        title: "Séance 1",
        detail:
          "Séance 1 : Découvrir. Voir la transcription OCR des pages guide 114-115 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 2",
        detail:
          "Séance 2 : Comprendre. Voir la transcription OCR des pages guide 114-115 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 3",
        detail:
          "Séance 3 : S'entraîner. Voir la transcription OCR des pages guide 114-115 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 4",
        detail:
          "Séance 4 : Se lancer ; Voir ce que l'on sait. Voir la transcription OCR des pages guide 114-115 pour le texte complet.",
        instructions: [],
      },
    ],
    exercises: [
      {
        id: "well-done-ce1-17-ex-1",
        number: "Séance 1",
        title: "Sydney by bus and ferry · Séance 1",
        instruction:
          "Look, listen and repeat: vidéoprojeter la première partie Where's Sydney ? de l'animation.",
      },
      {
        id: "well-done-ce1-17-ex-2",
        number: "Séance 2",
        title: "Sydney by bus and ferry · Séance 2",
        instruction: "Listen and mime ; Listen and point.",
        page: 54,
      },
      {
        id: "well-done-ce1-17-ex-3",
        number: "Séance 3",
        title: "Sydney by bus and ferry · Séance 3",
        instruction:
          "Listen and tick: distribuer la fiche élève et la faire coller dans le cahier.",
      },
      {
        id: "well-done-ce1-17-ex-4",
        number: "Séance 4",
        title: "Sydney by bus and ferry · Séance 4",
        instruction: "Let's do the sketch! Let's visit Sydney!",
      },
    ],
    sequenceNumber: 17,
    sequenceTitle: "Let's go visit...",
    sessionCount: 4,
    pdfPages: [26],
    materialPages: [],
    coverageNote:
      "Le PDF scanné ne donne pas de rattachement explicite à une période Ardoise. period reste donc à null.",
    sourceExcerpt:
      "[PDF p.26]\no\n=\n\n@ Sketch\n\nOISSTE | = Décrire ses déplacements.\n\nSEANCE 1 rm\n\nmm Découvrir BTN .......c.ocooerererrseens\n\n=> Look, listen and repeat: vidéoprojeter la première partie\nWhere's Sydney? de l'animation pour faire découvrir où se situe\nla ville de Sydney. Inviter les élèves à répéter les énoncés plusieurs fois.\n\nPuis, vidéoprojeter la deuxième partie Let's visit Sydney de l'animation pour faire découvrir\nquatre lieux emblématiques de la ville. Inviter la classe à répéter les phrases.\n\nSÉANCE 2 eam\n=m Comprendre gm .\n\n‘=> Listen and mime: repasser la deuxième partie Let's visit Sydney de l'animation\n\net inviter les élèves à mimer les lieux que vous leur dictez en leur montrant les gestes.\n= Let's take the bus to Bondi Beach! (faire semblant de nager)\n\no Let's take the bus to the Sydney Tower Eye! (mains en visière, regarder vers le bas)\n\n= Let'stake the bus to the Sydney Opera House! (mimer un chef d'orchestre)\n\n Let's take the ferry to Taronga Zoo! (mimer un kangourou)\n\n=» Listen and point: vidéoprojeter les flashcards du bus, du ferry et des quatre lieux emblématiques\nde Sydney. Puis, citer les lieux dans le désordre et les faire désigner par les élèves.\n\nSÉANCE 3 em\n\nmu S'entraîne",
  },
  {
    id: "well-done-ce1-18",
    period: null,
    title: "The drawing and mime game",
    objective: "Réviser ce que l'on a vu dans l'année.",
    competence: "Comprendre à l'oral ; parler en interaction ; parler en continu.",
    vocabulary: [
      "Hello!",
      "letter E",
      "look",
      "Mum",
      "Baby Bear",
      "apple crumble",
      "clap!",
      "six o'clock",
      "crocodile",
      "eat",
    ],
    languageStructures: ["What do you remember?", "What is it?", "Draw: ...", "Write: ..."],
    material: ["Activités lexicales animées des 17 thèmes", "Fiche élève p. 56", "Ardoise"],
    studentPages: [56],
    teacherPages: [120, 121],
    audioVideo: ["Activités lexicales animées au choix"],
    phases: [
      {
        title: "Séance 1",
        detail:
          "Séance 1 : Révision avec les activités lexicales animées. Voir la transcription OCR des pages guide 120-121 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 2",
        detail:
          "Séance 2 : Entraînement avec la fiche élève. Voir la transcription OCR des pages guide 120-121 pour le texte complet.",
        instructions: [],
      },
      {
        title: "Séance 3",
        detail:
          "Séance 3 : Jeu du mime. Voir la transcription OCR des pages guide 120-121 pour le texte complet.",
        instructions: [],
      },
    ],
    exercises: [
      {
        id: "well-done-ce1-18-ex-1",
        number: "Séance 1",
        title: "The drawing and mime game · Séance 1",
        instruction:
          "Look and say: vidéoprojeter les activités lexicales animées de votre choix parmi les 17 thèmes sans activer le son.",
      },
      {
        id: "well-done-ce1-18-ex-2",
        number: "Séance 2",
        title: "The drawing and mime game · Séance 2",
        instruction:
          "Look and say ; Listen and draw: distribuer la fiche élève et la faire coller dans le cahier.",
        page: 56,
      },
      {
        id: "well-done-ce1-18-ex-3",
        number: "Séance 3",
        title: "The drawing and mime game · Séance 3",
        instruction: "Listen and mime.",
      },
    ],
    sequenceNumber: 18,
    sequenceTitle: "What do you remember?",
    sessionCount: 3,
    pdfPages: [27],
    materialPages: [],
    coverageNote:
      "Le PDF scanné ne donne pas de rattachement explicite à une période Ardoise. period reste donc à null.",
    sourceExcerpt:
      "[PDF p.27]\nSEANCE 2                                    a\n\n=m Entraînement avec la fiche élève ……) 28034\n\nWHAT DO YOU REMEMBER?\n\n« Dessin\n© Mime\n\nSJE] => Réviser ce que l'on a vu dans l'année.\n\nSEANCE 1\n\nmm Révision avec les activités lexicales animées ……\n\n=> Look and say: vidéoprojeter les activités lexicales animées\n\nde votre choix parmi les 17 thèmes sans activer le son\n\net demander aux élèves de dire tout ce dont ils se souviennent\n\nen levant la main chacun leur tour.\n\n© What do you remember? Raise your hand!\n\nRéagir systématiquement à chaque réponse, avec Yes! Well done!\nlorsque la réponse est bonne ou No, (it's) not correct! Try again!\n\nlorsque les élèves se sont trompés.\n\n=> What is it? On peut aussi utiliser les flashcards et/ou posters\n\nou dessiner des éléments au tableau et demander aux élèves de deviner\n\nde quoi il s'agit. Leur donner des choix s'ils ne trouvent pas :\nols it \"Hello\" ? Is it a kangaroo? Etc.\n\n‘=> Look and say:\n\nDistribuer la fiche élève et a faire coller dans le cahier.\nDemander aux élèves de nommer les illustrations présentées dans l'activité 1.\nNumberone: “Hello!”            Number six: an apple crumble\n\nNumber two: letter E                 Number seven: clap!\n\nNum",
  },
] as const satisfies readonly ImportedEnglishPrepSheet[];
