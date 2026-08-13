export type ImportedQlmGuideSession = {
  number: number;
  title: string;
  rawText: string;
  phases: {
    title: string;
    detail: string;
  }[];
};

export type ImportedQlmGuideDossier = {
  id: string;
  dossierNumber: number;
  partNumber: number;
  partTitle: string;
  title: string;
  guidePages: number[];
  guidePageCount: number;
  objectives: string[];
  progressionNote: string;
  material: string[];
  sessions: ImportedQlmGuideSession[];
  guideText: string;
  guidePageDecisions: {
    page: number;
    confidence: number;
    score: number;
    included: boolean;
    strongMarkers: string[];
    phaseMarkers: string[];
    teacherLanguageMarkers: string[];
    studentLike: boolean;
  }[];
  skippedProbePages: number[];
  uncertainPages: number[];
  coverageNote: string;
};

export const qlmMdiGuideDossiers = [
  {
    id: "qlm-mdi-dossier-01",
    dossierNumber: 1,
    partNumber: 1,
    partTitle: "Qu'est-ce que la matière ?",
    title: "Solide ou liquide ?",
    guidePages: [11, 12],
    guidePageCount: 2,
    objectives: [
      "«Identifier deux états de la matière : solide et liquide.",
      "Connaitre quelques propriétés des solides et des liquides.",
    ],
    progressionNote:
      "Ce dossier est destiné aux élèves de CP et CE1. Toutefois, il peut permettre de réactiver des\nconnaissances chez les CE2.\nDans ce dossier, les notions de solide et liquide sont traitées. Nous aborderons le troisième\nétat de la matière, l'état gazeux, dans le dossier 3 sur les changements d'états de l'eau et\ndans le dossier 4 consacré à l'air. Il est à noter que l'état gazeux doit être abordé unique-\nment au CE2.",
    material: [
      "pâte à modeler...",
      "Une bouteille d'eau, du sucre en poudre, des gravillons ou cailloux, du sable, du vinaigre,",
      "un produit vaisselle, un crayon, un verre de lait, de la peinture en bidon, des lentilles, de la",
    ],
    sessions: [
      {
        number: 1,
        title:
          "Identifier deux états de la matière : solide et liquide. Je n° interroge Il s’agit dans cette première séance de pouvoir caractéri-",
        rawText:
          "séance 1 JOST)\n\nIdentifier deux états de la matière : solide et liquide.\n\n@ Je n° interroge\n\nIl s’agit dans cette première séance de pouvoir caractéri-\nser la matière selon son état, liquide ou solide. Pour cela,\nl’enseignant-e présente aux élèves des objets qu'il a appor-\ntés : une bouteille d'eau, du sucre en poudre, des gravillons\nou cailloux, du sable, du vinaigre, un produit vaisselle, un\ncrayon, un verre de lait, de la pâte à modeler, de la peinture\nen bidon, des lentilles.\n\nOn demande aux élèves de nommer ces objets/matiéres et\nde les décrire à l'oral.\n\nConnaissez-vous ces différents objets, ces différentes\nmatières ? Comment pourrions-nous les classer ?\n\nLes élèves peuvent dire que certains objets sont en plas-\ntique, d'autres mous, durs, d’autres sont naturels, d'autres\non peut les boire.\n\n(© J'observe\n\nL'enseignant-e distribue alors la fiche à découper avec les\nimages de ces objets (— sur CD-Rom). On demande aux\nélèves, par groupe de 2, de les classer, cette fois-ci, en deux\nfamilles.\n\nAprès un temps de réflexion, chaque élève va proposer\nson classement en disposant les étiquettes dans deux bar-\nquettes différentes.\n\nPlusieurs critères de tri peuvent apparaître : fonction de\nl’objet, taille, couleur... On s'appuiera sur les élèves ayant\neffectué le classement « solide/liquide » pour mettre en\nexergue ce vocabulaire.\n\nChaque élève collera alors sur une feuille dans son cahier/\nclasseur les étiquettes sur deux colonnes : solide/liquide.\nRemarque : les objets mous ou en poudre peuvent ne pas\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nêtre considérés comme solides par les élèves. Il s'agit alors\nde mettre ce questionnement en attente et d'y revenir lors\nde la séance 2 sur les propriétés des solides et des liquides.\nL'enseignant-e demande aux élèves s'ils ont d'autres\nexemples de liquides ou solides.\n\nOn distribue ensuite la fiche élève 1.\n\n2 Je retiens\n\n« Les objets qui existent autour de nous sont faits de dif-\nférentes matières.\n\n« Certains sont liquides (eau, lait, huile.) et d'autres\nsolides (pierre, bois, papier...).\n\n« Ces deux états sont différents.",
        phases: [
          {
            title: "J'observe",
            detail:
              "L'enseignant-e distribue alors la fiche à découper avec les\nimages de ces objets (— sur CD-Rom). On demande aux\nélèves, par groupe de 2, de les classer, cette fois-ci, en deux\nfamilles.\n\nAprès un temps de réflexion, chaque élève va proposer\nson classement en disposant les étiquettes dans deux bar-\nquettes différentes.\n\nPlusieurs critères de tri peuvent apparaître : fonction de\nl’objet, taille, couleur... On s'appuiera sur les élèves ayant\neffectué le classement « solide/liquide » pour mettre en\nexergue ce vocabulaire.\n\nChaque élève collera alors sur une feuille dans son cahier/\nclasseur les étiquettes sur deux colonnes : solide/liquide.\nRemarque : les objets mous ou en poudre peuvent ne pas\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nêtre considérés comme solides par les élèves. Il s'agit alors\nde mettre ce questionnement en attente et d'y revenir lors\nde la séance 2 sur les propriétés des solides et des liquides.\nL'enseignant-e demande aux élèves s'ils ont d'autres\nexemples de liquides ou solides.\n\nOn distribue ensuite la fiche élève 1.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "« Les objets qui existent autour de nous sont faits de dif-\nférentes matières.\n\n« Certains sont liquides (eau, lait, huile.) et d'autres\nsolides (pierre, bois, papier...).\n\n« Ces deux états sont différents.",
          },
        ],
      },
      {
        number: 2,
        title: "Connaitre quelques propriétés des solides et des liquides.",
        rawText:
          "| Séance 2 IFIP\n\nConnaitre quelques propriétés des solides et des liquides.\n\na Je m'interroge\n\nL'enseignant-e demande aux élèves de se souvenir de la\nséance précédente et de redonner le classement effectué :\nles solides / les liquides. On interroge alors les élèves :\n\nMais qu'est-ce qui nous a permis de faire ce classement ?\nQu'est-ce que les solides ont en commun ?\nQu'est-ce que les liquides ont en commun ?\n\nLes réponses possibles des élèves seront pour les solides :\n« ça ne coule pas », « ça fait du bruit quand ça tombe »,\n« ça peut se casser », « c'est dur », « on ne peut pas enfon-\ncer sa main dedans ».\n\nEt pour les liquides : « un liquide, ça se boit », « ça coule »,\n« ça ne se casse pas », « ce n'est pas dur, on peut enfoncer\nsa main dedans », « ça bouge ».\n\nQu'est-ce que la matière ? 11\n\nFiche enseignant\n\nMA\n\n#8 J'expérimente\n\nL'enseignant-e propose alors aux élèves de réaliser des\nexpériences afin d'observer quelques différences entre les\nsolides et les liquides.\n\nL'expérimentation se fera collectivement afin de ne pas\nmultiplier le matériel nécessaire : de la pâte à modeler, des\ncailloux, des lentilles, de l’eau, du lait et des contenants de\nformes différentes (saladier, verre, boite).\n\nPour guider les élèves, on posera à chaque fois une question\npour guider l'observation. Nous pouvons tester les ques-\ntions suivantes :\n\n1. Pouvons-nous prendre un solide avec nos doigts ?\net un liquide ?\n\n2. Lorsqu'on met un solide ou un liquide dans\n\ndes récipients différents, qu'observe-t-on ?\n\nCette expérience est réalisée avec des cailloux, des lentilles,\ndu lait.\n\n3. Lorsque l'on verse un liquide (eau et lait) dans\nun verre et que l’on penche celui-ci, que se passe t-il ?\n\nAprès chaque question posée, deux élèves viennent réaliser\nl’expérimentation puis le dessin d'observation est réalisé\nsur la fiche élève 2.\n\n2 Je retiens\n\n« On peut prendre un solide avec les doigts et le tenir\ndans les mains. Il a une forme propre. Il peut être dur\net résistant (comme une pierre) ou mou et déformable\n(comme de la pâte à modeler). Certains solides sont faits\nde milliers de grains comme la semoule, la farine, les\nlentilles, le sable.\n\n«On ne peut pas prendre un liquide avec les doigts\net il ne tient pas dans les mains, il coule. Les liquides\nprennent la forme de leur contenant (un verre d'eau\npar exemple). Leur surface au repos est horizontale et\nplane.\n\nSOLIDE OU LIQUIDE ?\n\nLes objets qui existent autour de nous sont faits de différentes matières.\n\nCertains sont solides et d'autres liquides.\nCes deux états sont différents.\n\nLES SOLIDES\n\n© On peut prendre un solide\navec les doigts et le tenir\ndans les mains.\n\n© Un solide a une forme propre.\nIl ne prend pas la forme\ndu récipient qui le contient.\n\ne || y a des solides\ndurs et résistants.\n\ne Il y a des solides mous\n| et déformables.\n|\n\n| e Ily a des solides composés\n\nde nombreux grains.\ndil 4 (Emo)\n\nLES LIQUIDES\n\n© On ne peut pas prendre\nun liquide avec les doigts\nni le tenir dans les mains.\n\n© Un liquide coule. Sa surface est plane\net horizontale au repos.\n\n© Tous les liquides prennent la forme\ndu récipient qui les contient.\n\nMatière\n\nMots à retenir\n\nSolide\n\nLiquide\n\n12 « Qu'est-ce que la matière ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e demande aux élèves de se souvenir de la\nséance précédente et de redonner le classement effectué :\nles solides / les liquides. On interroge alors les élèves :\n\nMais qu'est-ce qui nous a permis de faire ce classement ?\nQu'est-ce que les solides ont en commun ?\nQu'est-ce que les liquides ont en commun ?\n\nLes réponses possibles des élèves seront pour les solides :\n« ça ne coule pas », « ça fait du bruit quand ça tombe »,\n« ça peut se casser », « c'est dur », « on ne peut pas enfon-\ncer sa main dedans ».\n\nEt pour les liquides : « un liquide, ça se boit », « ça coule »,\n« ça ne se casse pas », « ce n'est pas dur, on peut enfoncer\nsa main dedans », « ça bouge ».\n\nQu'est-ce que la matière ? 11\n\nFiche enseignant\n\nMA\n\n#8",
          },
          {
            title: "J'expérimente",
            detail:
              "L'enseignant-e propose alors aux élèves de réaliser des\nexpériences afin d'observer quelques différences entre les\nsolides et les liquides.\n\nL'expérimentation se fera collectivement afin de ne pas\nmultiplier le matériel nécessaire : de la pâte à modeler, des\ncailloux, des lentilles, de l’eau, du lait et des contenants de\nformes différentes (saladier, verre, boite).\n\nPour guider les élèves, on posera à chaque fois une question\npour guider l'observation. Nous pouvons tester les ques-\ntions suivantes :\n\n1. Pouvons-nous prendre un solide avec nos doigts ?\net un liquide ?\n\n2. Lorsqu'on met un solide ou un liquide dans\n\ndes récipients différents, qu'observe-t-on ?\n\nCette expérience est réalisée avec des cailloux, des lentilles,\ndu lait.\n\n3. Lorsque l'on verse un liquide (eau et lait) dans\nun verre et que l’on penche celui-ci, que se passe t-il ?\n\nAprès chaque question posée, deux élèves viennent réaliser\nl’expérimentation puis le dessin d'observation est réalisé\nsur la fiche élève 2.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "« On peut prendre un solide avec les doigts et le tenir\ndans les mains. Il a une forme propre. Il peut être dur\net résistant (comme une pierre) ou mou et déformable\n(comme de la pâte à modeler). Certains solides sont faits\nde milliers de grains comme la semoule, la farine, les\nlentilles, le sable.\n\n«On ne peut pas prendre un liquide avec les doigts\net il ne tient pas dans les mains, il coule. Les liquides\nprennent la forme de leur contenant (un verre d'eau\npar exemple). Leur surface au repos est horizontale et\nplane.\n\nSOLIDE OU LIQUIDE ?\n\nLes objets qui existent autour de nous sont faits de différentes matières.\n\nCertains sont solides et d'autres liquides.\nCes deux états sont différents.\n\nLES SOLIDES\n\n© On peut prendre un solide\navec les doigts et le tenir\ndans les mains.\n\n© Un solide a une forme propre.\nIl ne prend pas la forme\ndu récipient qui le contient.\n\ne || y a des solides\ndurs et résistants.\n\ne Il y a des solides mous\n| et déformables.\n|\n\n| e Ily a des solides composés\n\nde nombreux grains.\ndil 4 (Emo)\n\nLES LIQUIDES\n\n© On ne peut pas prendre\nun liquide avec les doigts\nni le tenir dans les mains.\n\n© Un liquide coule. Sa surface est plane\net horizontale au repos.\n\n© Tous les liquides prennent la forme\ndu récipient qui les contient.\n\nMatière\n\nMots à retenir\n\nSolide\n\nLiquide\n\n12 « Qu'est-ce que la matière ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
          },
        ],
      },
    ],
    guideText:
      ") Solide ou liquide ?\n\n| > Objectifs\n| «Identifier deux états de la matière : solide et liquide.\n* Connaitre quelques propriétés des solides et des liquides. |\n\n|\n|\n|\n\n> Indications de progression dans le cycle 2 |\nCe dossier est destiné aux élèves de CP et CE1. Toutefois, il peut permettre de réactiver des\nconnaissances chez les CE2.\n\n| Dans ce dossier, les notions de solide et liquide sont traitées. Nous aborderons le troisième\n\n| état de la matière, l'état gazeux, dans le dossier 3 sur les changements d'états de l'eau et\n\n| dans le dossier 4 consacré à l'air. Il est à noter que l'état gazeux doit être abordé unique-\nment au CE2.\n\n| » Matériel\n\n| pâte à modeler...\n\nUne bouteille d'eau, du sucre en poudre, des gravillons ou cailloux, du sable, du vinaigre,\nun produit vaisselle, un crayon, un verre de lait, de la peinture en bidon, des lentilles, de la |\n\nséance 1 JOST)\n\nIdentifier deux états de la matière : solide et liquide.\n\n@ Je n° interroge\n\nIl s’agit dans cette première séance de pouvoir caractéri-\nser la matière selon son état, liquide ou solide. Pour cela,\nl’enseignant-e présente aux élèves des objets qu'il a appor-\ntés : une bouteille d'eau, du sucre en poudre, des gravillons\nou cailloux, du sable, du vinaigre, un produit vaisselle, un\ncrayon, un verre de lait, de la pâte à modeler, de la peinture\nen bidon, des lentilles.\n\nOn demande aux élèves de nommer ces objets/matiéres et\nde les décrire à l'oral.\n\nConnaissez-vous ces différents objets, ces différentes\nmatières ? Comment pourrions-nous les classer ?\n\nLes élèves peuvent dire que certains objets sont en plas-\ntique, d'autres mous, durs, d’autres sont naturels, d'autres\non peut les boire.\n\n(© J'observe\n\nL'enseignant-e distribue alors la fiche à découper avec les\nimages de ces objets (— sur CD-Rom). On demande aux\nélèves, par groupe de 2, de les classer, cette fois-ci, en deux\nfamilles.\n\nAprès un temps de réflexion, chaque élève va proposer\nson classement en disposant les étiquettes dans deux bar-\nquettes différentes.\n\nPlusieurs critères de tri peuvent apparaître : fonction de\nl’objet, taille, couleur... On s'appuiera sur les élèves ayant\neffectué le classement « solide/liquide » pour mettre en\nexergue ce vocabulaire.\n\nChaque élève collera alors sur une feuille dans son cahier/\nclasseur les étiquettes sur deux colonnes : solide/liquide.\nRemarque : les objets mous ou en poudre peuvent ne pas\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nêtre considérés comme solides par les élèves. Il s'agit alors\nde mettre ce questionnement en attente et d'y revenir lors\nde la séance 2 sur les propriétés des solides et des liquides.\nL'enseignant-e demande aux élèves s'ils ont d'autres\nexemples de liquides ou solides.\n\nOn distribue ensuite la fiche élève 1.\n\n2 Je retiens\n\n« Les objets qui existent autour de nous sont faits de dif-\nférentes matières.\n\n« Certains sont liquides (eau, lait, huile.) et d'autres\nsolides (pierre, bois, papier...).\n\n« Ces deux états sont différents.\n\n| Séance 2 IFIP\n\nConnaitre quelques propriétés des solides et des liquides.\n\na Je m'interroge\n\nL'enseignant-e demande aux élèves de se souvenir de la\nséance précédente et de redonner le classement effectué :\nles solides / les liquides. On interroge alors les élèves :\n\nMais qu'est-ce qui nous a permis de faire ce classement ?\nQu'est-ce que les solides ont en commun ?\nQu'est-ce que les liquides ont en commun ?\n\nLes réponses possibles des élèves seront pour les solides :\n« ça ne coule pas », « ça fait du bruit quand ça tombe »,\n« ça peut se casser », « c'est dur », « on ne peut pas enfon-\ncer sa main dedans ».\n\nEt pour les liquides : « un liquide, ça se boit », « ça coule »,\n« ça ne se casse pas », « ce n'est pas dur, on peut enfoncer\nsa main dedans », « ça bouge ».\n\nQu'est-ce que la matière ? 11\n\nFiche enseignant\n\nMA\n\n#8 J'expérimente\n\nL'enseignant-e propose alors aux élèves de réaliser des\nexpériences afin d'observer quelques différences entre les\nsolides et les liquides.\n\nL'expérimentation se fera collectivement afin de ne pas\nmultiplier le matériel nécessaire : de la pâte à modeler, des\ncailloux, des lentilles, de l’eau, du lait et des contenants de\nformes différentes (saladier, verre, boite).\n\nPour guider les élèves, on posera à chaque fois une question\npour guider l'observation. Nous pouvons tester les ques-\ntions suivantes :\n\n1. Pouvons-nous prendre un solide avec nos doigts ?\net un liquide ?\n\n2. Lorsqu'on met un solide ou un liquide dans\n\ndes récipients différents, qu'observe-t-on ?\n\nCette expérience est réalisée avec des cailloux, des lentilles,\ndu lait.\n\n3. Lorsque l'on verse un liquide (eau et lait) dans\nun verre et que l’on penche celui-ci, que se passe t-il ?\n\nAprès chaque question posée, deux élèves viennent réaliser\nl’expérimentation puis le dessin d'observation est réalisé\nsur la fiche élève 2.\n\n2 Je retiens\n\n« On peut prendre un solide avec les doigts et le tenir\ndans les mains. Il a une forme propre. Il peut être dur\net résistant (comme une pierre) ou mou et déformable\n(comme de la pâte à modeler). Certains solides sont faits\nde milliers de grains comme la semoule, la farine, les\nlentilles, le sable.\n\n«On ne peut pas prendre un liquide avec les doigts\net il ne tient pas dans les mains, il coule. Les liquides\nprennent la forme de leur contenant (un verre d'eau\npar exemple). Leur surface au repos est horizontale et\nplane.\n\nSOLIDE OU LIQUIDE ?\n\nLes objets qui existent autour de nous sont faits de différentes matières.\n\nCertains sont solides et d'autres liquides.\nCes deux états sont différents.\n\nLES SOLIDES\n\n© On peut prendre un solide\navec les doigts et le tenir\ndans les mains.\n\n© Un solide a une forme propre.\nIl ne prend pas la forme\ndu récipient qui le contient.\n\ne || y a des solides\ndurs et résistants.\n\ne Il y a des solides mous\n| et déformables.\n|\n\n| e Ily a des solides composés\n\nde nombreux grains.\ndil 4 (Emo)\n\nLES LIQUIDES\n\n© On ne peut pas prendre\nun liquide avec les doigts\nni le tenir dans les mains.\n\n© Un liquide coule. Sa surface est plane\net horizontale au repos.\n\n© Tous les liquides prennent la forme\ndu récipient qui les contient.\n\nMatière\n\nMots à retenir\n\nSolide\n\nLiquide\n\n12 « Qu'est-ce que la matière ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
    guidePageDecisions: [
      {
        page: 11,
        confidence: 92,
        score: 22,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
        ],
        phaseMarkers: ["je m'interroge", "j'observe", "je retiens"],
        teacherLanguageMarkers: [
          "enseignant",
          "eleves",
          "on demande",
          "on interroge",
          "on distribue",
          "groupe",
        ],
        studentLike: true,
      },
      {
        page: 12,
        confidence: 92,
        score: 14,
        included: true,
        strongMarkers: ["l'enseignant", "enseignant-e", "les eleves", "aux eleves"],
        phaseMarkers: ["j'experimente", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves"],
        studentLike: true,
      },
      {
        page: 13,
        confidence: 82,
        score: -4,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: true,
      },
    ],
    skippedProbePages: [13],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-02",
    dossierNumber: 2,
    partNumber: 1,
    partTitle: "Qu'est-ce que la matière ?",
    title: "De l'eau dans la nature : sous quelles formes ?",
    guidePages: [19],
    guidePageCount: 1,
    objectives: [
      ",",
      "Reconnaitre les états de l'eau (liquide, solide) et leur manifestation dans divers phéno-",
      "mènes météorologiques naturels (nuages, pluie, neige, grêle, glace).",
    ],
    progressionNote:
      "Ce dossier est destiné aux élèves de CP et CE1. Toutefois, il peut permettre de réactiver des\nconnaissances au CE2. L'état gazeux de l'eau (à aborder uniquement au CE2) sera traité\ndans le dossier 3 sur les changements d'états de l'eau.",
    material: [],
    sessions: [
      {
        number: 1,
        title:
          "Reconnaitre les états de l’eau (liquide, solide) et leur manifestation dans divers phénomènes météorolo- giques naturels (nuages, pluie, neige, grêle, glace...).",
        rawText:
          "| séance 1 FI\n\nReconnaitre les états de l’eau (liquide, solide) et leur\nmanifestation dans divers phénomènes météorolo-\ngiques naturels (nuages, pluie, neige, grêle, glace...).\n\nBem interroge\n\nL'enseignant-e présente aux élèves 12 images de paysages :\nnuages, pluie, lac, rivière, mer, neige, glacier, iceberg, verglas,\ngrêle, brouillard et chutes d'eau (— sur CD-Rom).\n\nOn demande aux élèves de les décrire rapidement puis on\nles interroge :\n\nQu'est-ce qui, à votre avis, est commun à toutes ces\nimages ?\n\nPour la description des images, on peut attendre les\nréponses suivantes : « il pleut », « il y a de la pluie », « il y\na des nuages », « il y a des flaques », « il y a de la neige »,\n« c'est gelé »...\n\nLe point commun de ces images pourra être exprimé par les\nélèves de la façon suivante : « il y a de l'eau sur toutes les\nimages », « c'est de l'eau », « la neige et la glace, c'est de\nl'eau quand il fait froid »...\n\n#2) J'observe\n\nL'enseignant-e récapitule les différentes réponses et pro-\npose de classer les images en deux colonnes : eau liquide/\neau solide. Pour rappel, dans le dossier 1, les élèves ont pu\ncomprendre les différences entre un liquide et un solide\nainsi que quelques propriétés qui les distinguent. On intro-\nduit ainsi ce vocabulaire spécifique lié à l'état de l'eau.\n\nCertains élèves peuvent avoir du mal à appréhender la\n\nnotion d’eau liquide dans un nuage ou dans le brouillard. |\n\nOn pourra alors évoquer le ressenti d'humidité quand il\ny a du brouillard ou en voiture la nécessité de mettre les\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nessuie-glaces. On précisera que les nuages sont comme des\nbrouillards, mais en plus haute altitude.\n\nE Je m'interroge\nL'enseignant-e pose alors une seconde question :\n\nMais, à votre avis, à quel moment ou à quel endroit\ntrouve-t-on dans la nature cette eau à l’état solide ou à\nl'état liquide ?\nOn peut attendre des élèves les réponses suivantes : « c'est\nquand il fait froid, l'eau devient de la glace dure, solide »,\n« à la montagne, il neige, il y a de la glace... », « quand il fait\nchaud, l'eau est liquide ».\nL'enseignant-e propose alors aux élèves de mettre en évi-\ndence ces deux états de l’eau dans la nature en utilisant\ncomme support les fiches élève.\n\n Je recherche\n\nL'enseignant-e propose alors aux élèves de mettre en évi-\ndence ces deux états de l’eau dans la nature en utilisant\ncomme support la fiche élève 1 (niveau initial) ou/et la\nfiche élève 2 (niveau intermédiaire). Elles permettent de\nvalider les connaissances du vocabulaire de cette séance\nsur les états de l’eau dans la nature. Dans la fiche élève 2,\non fera plus spécifiquement le lien avec la température.\nN.B. : Une fiche à découper est disponible dans le CD-Rom\npour réaliser l'exercice 1 de la fiche élève 1 et de la fiche\nd'évaluation 1.\n\n2 Je retiens\n\n« On peut trouver dans la nature de l’eau liquide (pluie,\nrivière, lac, mer, nuage) ou solide (glace, grêle, neige).\n«L'eau est à l'état solide (glace, grêle, neige) quand\nil fait froid.\n\nQu'est-ce que la matière ? o 19\n\nFiche enseignant",
        phases: [
          {
            title: "J'observe",
            detail:
              "L'enseignant-e récapitule les différentes réponses et pro-\npose de classer les images en deux colonnes : eau liquide/\neau solide. Pour rappel, dans le dossier 1, les élèves ont pu\ncomprendre les différences entre un liquide et un solide\nainsi que quelques propriétés qui les distinguent. On intro-\nduit ainsi ce vocabulaire spécifique lié à l'état de l'eau.\n\nCertains élèves peuvent avoir du mal à appréhender la\n\nnotion d’eau liquide dans un nuage ou dans le brouillard. |\n\nOn pourra alors évoquer le ressenti d'humidité quand il\ny a du brouillard ou en voiture la nécessité de mettre les\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nessuie-glaces. On précisera que les nuages sont comme des\nbrouillards, mais en plus haute altitude.\n\nE",
          },
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e pose alors une seconde question :\n\nMais, à votre avis, à quel moment ou à quel endroit\ntrouve-t-on dans la nature cette eau à l’état solide ou à\nl'état liquide ?\nOn peut attendre des élèves les réponses suivantes : « c'est\nquand il fait froid, l'eau devient de la glace dure, solide »,\n« à la montagne, il neige, il y a de la glace... », « quand il fait\nchaud, l'eau est liquide ».\nL'enseignant-e propose alors aux élèves de mettre en évi-\ndence ces deux états de l’eau dans la nature en utilisant\ncomme support les fiches élève.",
          },
          {
            title: "Je recherche",
            detail:
              "L'enseignant-e propose alors aux élèves de mettre en évi-\ndence ces deux états de l’eau dans la nature en utilisant\ncomme support la fiche élève 1 (niveau initial) ou/et la\nfiche élève 2 (niveau intermédiaire). Elles permettent de\nvalider les connaissances du vocabulaire de cette séance\nsur les états de l’eau dans la nature. Dans la fiche élève 2,\non fera plus spécifiquement le lien avec la température.\nN.B. : Une fiche à découper est disponible dans le CD-Rom\npour réaliser l'exercice 1 de la fiche élève 1 et de la fiche\nd'évaluation 1.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "« On peut trouver dans la nature de l’eau liquide (pluie,\nrivière, lac, mer, nuage) ou solide (glace, grêle, neige).\n«L'eau est à l'état solide (glace, grêle, neige) quand\nil fait froid.\n\nQu'est-ce que la matière ? o 19\n\nFiche enseignant",
          },
        ],
      },
    ],
    guideText:
      "L'eau dans la nature : sous quelles formes ?\n\n» Objectifs\n\n=,\n\n* Reconnaitre les états de l'eau (liquide, solide) et leur manifestation dans divers phéno- |\nmènes météorologiques naturels (nuages, pluie, neige, grêle, glace). |\n\n» Indications de progression dans le cycle 2\n\nCe dossier est destiné aux élèves de CP et CE1. Toutefois, il peut permettre de réactiver des\nconnaissances au CE2. L'état gazeux de l'eau (à aborder uniquement au CE2) sera traité\ndans le dossier 3 sur les changements d'états de l'eau.\n\n| séance 1 FI\n\nReconnaitre les états de l’eau (liquide, solide) et leur\nmanifestation dans divers phénomènes météorolo-\ngiques naturels (nuages, pluie, neige, grêle, glace...).\n\nBem interroge\n\nL'enseignant-e présente aux élèves 12 images de paysages :\nnuages, pluie, lac, rivière, mer, neige, glacier, iceberg, verglas,\ngrêle, brouillard et chutes d'eau (— sur CD-Rom).\n\nOn demande aux élèves de les décrire rapidement puis on\nles interroge :\n\nQu'est-ce qui, à votre avis, est commun à toutes ces\nimages ?\n\nPour la description des images, on peut attendre les\nréponses suivantes : « il pleut », « il y a de la pluie », « il y\na des nuages », « il y a des flaques », « il y a de la neige »,\n« c'est gelé »...\n\nLe point commun de ces images pourra être exprimé par les\nélèves de la façon suivante : « il y a de l'eau sur toutes les\nimages », « c'est de l'eau », « la neige et la glace, c'est de\nl'eau quand il fait froid »...\n\n#2) J'observe\n\nL'enseignant-e récapitule les différentes réponses et pro-\npose de classer les images en deux colonnes : eau liquide/\neau solide. Pour rappel, dans le dossier 1, les élèves ont pu\ncomprendre les différences entre un liquide et un solide\nainsi que quelques propriétés qui les distinguent. On intro-\nduit ainsi ce vocabulaire spécifique lié à l'état de l'eau.\n\nCertains élèves peuvent avoir du mal à appréhender la\n\nnotion d’eau liquide dans un nuage ou dans le brouillard. |\n\nOn pourra alors évoquer le ressenti d'humidité quand il\ny a du brouillard ou en voiture la nécessité de mettre les\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nessuie-glaces. On précisera que les nuages sont comme des\nbrouillards, mais en plus haute altitude.\n\nE Je m'interroge\nL'enseignant-e pose alors une seconde question :\n\nMais, à votre avis, à quel moment ou à quel endroit\ntrouve-t-on dans la nature cette eau à l’état solide ou à\nl'état liquide ?\nOn peut attendre des élèves les réponses suivantes : « c'est\nquand il fait froid, l'eau devient de la glace dure, solide »,\n« à la montagne, il neige, il y a de la glace... », « quand il fait\nchaud, l'eau est liquide ».\nL'enseignant-e propose alors aux élèves de mettre en évi-\ndence ces deux états de l’eau dans la nature en utilisant\ncomme support les fiches élève.\n\n Je recherche\n\nL'enseignant-e propose alors aux élèves de mettre en évi-\ndence ces deux états de l’eau dans la nature en utilisant\ncomme support la fiche élève 1 (niveau initial) ou/et la\nfiche élève 2 (niveau intermédiaire). Elles permettent de\nvalider les connaissances du vocabulaire de cette séance\nsur les états de l’eau dans la nature. Dans la fiche élève 2,\non fera plus spécifiquement le lien avec la température.\nN.B. : Une fiche à découper est disponible dans le CD-Rom\npour réaliser l'exercice 1 de la fiche élève 1 et de la fiche\nd'évaluation 1.\n\n2 Je retiens\n\n« On peut trouver dans la nature de l’eau liquide (pluie,\nrivière, lac, mer, nuage) ou solide (glace, grêle, neige).\n«L'eau est à l'état solide (glace, grêle, neige) quand\nil fait froid.\n\nQu'est-ce que la matière ? o 19\n\nFiche enseignant",
    guidePageDecisions: [
      {
        page: 19,
        confidence: 93,
        score: 26,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
        ],
        phaseMarkers: ["je m'interroge", "j'observe", "je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on demande"],
        studentLike: true,
      },
      {
        page: 20,
        confidence: 89,
        score: 0,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: false,
      },
    ],
    skippedProbePages: [20],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-03",
    dossierNumber: 3,
    partNumber: 1,
    partTitle: "Qu'est-ce que la matière ?",
    title: "L'eau peut-elle changer d'état ?",
    guidePages: [27, 28, 29],
    guidePageCount: 3,
    objectives: [
      "Mettre en œuvre des expériences simples pour illustrer les changements d'états de l'eau :",
      "la solidification et la fusion.",
      "Savoir comparer et mesurer la température, le volume, la masse de l'eau à l'état liquide",
      "et à l'état solide.",
      "« Connaitre l'état gazeux de l'eau et les processus de condensation et d'évaporation.",
    ],
    progressionNote:
      "Ce dossier est destiné aux éléves des trois niveaux du cycle 2. Les séances 1 et 2 sont du\nniveau CP, mais peuvent être également réalisées en CE1 si elles n'ont pas été faites au\nniveau précédent. La séance 3 est destinée au CE1 car elle nécessite la maitrise des notions\nde température, de volume et de masse. Cette séance peut aussi être envisagée au CE2 et\npermettre de réactiver les connaissances acquises. La séance 4 est réservée aux CE2 car elle\nFiche enseignant",
    material: [
      "petites bouteilles d'eau en plastique.",
      "aborde le troisième état de la matière, l'état gazeux.",
      "Deux thermomètres, des glaçons, de l'eau, des verres, une balance électronique, deux",
    ],
    sessions: [
      {
        number: 1,
        title:
          "Mettre en œuvre des expériences simples pour illustrer les changements d'états de l'eau : la solidification.",
        rawText:
          "séance 1 PACE)\n\nMettre en œuvre des expériences simples pour illustrer\nles changements d'états de l'eau : la solidification.\n\n@ Je m'interroge\n\nL'enseignant-e rappelle que l'eau existe sous différents\nétats. On invite les élèves à réactiver leurs connaissances\n(cf. dossier 2) : nous avons mis en évidence deux états dif-\nférents de l'eau dans la nature, l'état solide et l’état liquide.\nPuis l'enseignant-e interroge les élèves :\n\nEst-ce que de l’eau liquide peut devenir solide ?\nComment ? Pourquoi, d'après vous ?\n\nOn peut attendre les réponses suivantes, spontanées car\nliées à la vie quotidienne : « on peut mettre l'eau au froid,\nau réfrigérateur », « on peut faire des glaçons au congéla-\nteur ». À cette occasion, l'enseignant-e peut expliquer la\nfonction de chaque appareil : congélateur d’une part, réfri-\ngérateur ou frigo d'autre part (deux appareils différents\npour certains enfants).\n\n[1] J'expérimente\n\nL'enseignant-e propose alors aux élèves de réaliser l'expé-\nrience qui a pour objectif de transformer de l'eau liquide en\neau solide. On arrête alors ensemble le protocole de notre\nexpérience (« Comment de l'eau liquide peut-elle devenir\nsolide (glace) ? ») :\n\n— remplir deux gobelets ou bacs à glaçons avec de l'eau ;\n\n— les placer au congélateur et au réfrigérateur (un à chaque\nendroit) ;\n\n— placer à côté de chaque gobelet ou bac à glaçons un ther-\nmomèètre (l'enseignant-e peut profiter de cette expérience\npour expliquer comment on utilise un thermomètre pour\nrelever une température et comment on lit le résultat) ;\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n— attendre le lendemain et aller récupérer les gobelets ou\nbacs à glaçons ;\n\n— noter la température indiquée sur chaque thermomètre ;\n— observer le résultat obtenu : l'eau est-elle toujours liquide\nou est-elle devenue solide ?\n\nL'enseignant-e distribue ensuite la fiche élève 1 qui permet\nde faire le point sur l'expérience réalisée.\n\nL2 Je retiens\n\n* L'eau liquide devient solide si on la laisse au congéla-\nteur (température en dessous de 0 degré). On obtient\nde la glace : c'est la solidification.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e rappelle que l'eau existe sous différents\nétats. On invite les élèves à réactiver leurs connaissances\n(cf. dossier 2) : nous avons mis en évidence deux états dif-\nférents de l'eau dans la nature, l'état solide et l’état liquide.\nPuis l'enseignant-e interroge les élèves :\n\nEst-ce que de l’eau liquide peut devenir solide ?\nComment ? Pourquoi, d'après vous ?\n\nOn peut attendre les réponses suivantes, spontanées car\nliées à la vie quotidienne : « on peut mettre l'eau au froid,\nau réfrigérateur », « on peut faire des glaçons au congéla-\nteur ». À cette occasion, l'enseignant-e peut expliquer la\nfonction de chaque appareil : congélateur d’une part, réfri-\ngérateur ou frigo d'autre part (deux appareils différents\npour certains enfants).\n\n[1]",
          },
          {
            title: "J'expérimente",
            detail:
              "L'enseignant-e propose alors aux élèves de réaliser l'expé-\nrience qui a pour objectif de transformer de l'eau liquide en\neau solide. On arrête alors ensemble le protocole de notre\nexpérience (« Comment de l'eau liquide peut-elle devenir\nsolide (glace) ? ») :\n\n— remplir deux gobelets ou bacs à glaçons avec de l'eau ;\n\n— les placer au congélateur et au réfrigérateur (un à chaque\nendroit) ;\n\n— placer à côté de chaque gobelet ou bac à glaçons un ther-\nmomèètre (l'enseignant-e peut profiter de cette expérience\npour expliquer comment on utilise un thermomètre pour\nrelever une température et comment on lit le résultat) ;\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n— attendre le lendemain et aller récupérer les gobelets ou\nbacs à glaçons ;\n\n— noter la température indiquée sur chaque thermomètre ;\n— observer le résultat obtenu : l'eau est-elle toujours liquide\nou est-elle devenue solide ?\n\nL'enseignant-e distribue ensuite la fiche élève 1 qui permet\nde faire le point sur l'expérience réalisée.\n\nL2",
          },
          {
            title: "Je retiens",
            detail:
              "* L'eau liquide devient solide si on la laisse au congéla-\nteur (température en dessous de 0 degré). On obtient\nde la glace : c'est la solidification.",
          },
        ],
      },
      {
        number: 2,
        title:
          "Mettre en œuvre des expériences simples pour illustrer les changements d'états de l'eau : la fusion.",
        rawText:
          "Séance 2 MNT\n\nMettre en œuvre des expériences simples pour illustrer\nles changements d'états de l'eau : la fusion.\n\na Je m’interroge\n\nB : Idéalement, cette séance se déroule à la suite de la",
        phases: [
          {
            title: "Je m'interroge",
            detail: "B : Idéalement, cette séance se déroule à la suite de la",
          },
        ],
      },
      {
        number: 1,
        title:
          "deux bacs à glaçons identiques. L'enseignant-e rappelle que l'eau passe de l'état liquide à l'état solide (solidification) si la température est inférieure",
        rawText:
          "séance 1. On aura préalablement mis au congélateur un ou\ndeux bacs à glaçons identiques.\nL'enseignant-e rappelle que l'eau passe de l'état liquide à\nl'état solide (solidification) si la température est inférieure\nà O °C. Ainsi dans la nature, lorsqu'il fait très froid en hiver,\nl’eau se transforme en glace. Au lieu de la pluie, c'est de la\nneige ou de la grêle qui tombe du ciel. L'eau des lacs et des\nrivières gèle…\nOn propose alors aux élèves un défi :\n\nMais comment fait-on pour que de la glace redevienne\nde l'eau liquide ? Par exemple, comment peut-on faire\nfondre le plus rapidement possible un glaçon ?\n\nQu'est-ce que la matière ? » 27\n\nLes élèves vont sans doute proposer de le mettre au soleil,\ndans les mains, sur la table, sur le radiateur, ou encore d'uti-\nliser un sèche-cheveux !\n\n[1] J'expérimente\n\nLes élèves sont placés par groupes de 4. Chaque groupe\ndoit préparer une expérience en fonction de la méthode\nretenue.\n\nLorsque le protocole est clairement établi, I'enseignant-e\ndistribue un glaçon à chaque groupe et explique que\nchaque glaçon est identique afin de pouvoir comparer nos\nexpériences. On enregistre alors sur l'horloge de la classe\nou sur un chronomètre l'instant T 0 : début de l'expérience.\nOn mettra un glaçon « témoin » sur une assiette dans la\nclasse. Il servira de repère pour savoir qui a réussi à faire\nfondre son glaçon plus vite, grâce au dispositif mis en place\npar chaque groupe.\n\nL'enseignant-e et les élèves prennent des photos de leur\nglaçon. Les élèves regardent l'heure à l'horloge lorsque leur\nglaçon est complètement fondu : T final.\n\nOn compare les résultats des différents groupes afin de\nmettre en évidence ce qui fait fondre le plus rapidement\nle glaçon (chaleur). Il est souhaitable de placer un thermo-\nmètre près de chaque dispositif. On précisera que le passage\nde l'eau de l'état solide vers l'état liquide s'appelle la fusion.\nLes élèves qui réalisent cette expérimentation dans leur\nclasse noteront les résultats dans leur classeur ou cahier de\nQLM. Pour ceux qui n'ont pas pu la réaliser, l'enseignant-e\npeut alors distribuer la fiche élève 2.\n\nN.B. : La fiche à découper (— sur CD-Rom) propose les\ndessins à découper et à coller pour l'expérience témoin et\nl'hypothèse testée.\n\n2 Je retiens\n\n* L'eau solide devient liquide si on la laisse à la chaleur :\nc'est la fusion.\n\n* Plus la température est importante plus la fusion est\nrapide.\n\n éd dés\n\nSavoir comparer et mesurer la température, le volume,\nla masse de l'eau à l'état liquide et à l'état solide.\n\n[2] Je m'interroge\n\nL'enseignant-e rappelle aux élèves le travail réalisé lors du\ndossier 2 sur les états de l'eau dans la nature et leur demande :\n\n| Vous souvenez-vous des différents états de l'eau dans la\n[| nature?\n\nOn peut attendre les réponses suivantes : « l’eau peut être\nliquide dans la mer, dans les rivières », « la pluie, c'est de\nl’eau liquide », « l’eau peut aussi être solide quand il fait\nfroid, c'est de la glace ou de la neige ».\n\nL'enseignant-e propose alors aux élèves de comparer l’eau\nliquide et l'eau solide. On interroge à nouveau les élèves :\n\n| Que pourrait-on comparer ou mesurer entre l'eau\n| liquide et l'eau solide ?\n\n28 » Qu'est-ce que la matière ?\n\nLes élèves pointeront assez spontanément la question de la\ntempérature déjà abordée dans le dossier 2 et dans les deux\npremières séances du dossier 3. On pourra par ailleurs les\nguider pour aborder la notion de masse :\n\n[| La glace pèse-t-elle plus lourd que l’eau ?\n\nEnfin, la notion de différence de volume entre l'eau liquide\net la glace sera certainement plus difficile à mettre en évi-\ndence spontanément.\n\n(A) J'expérimente\nL'enseignant-e propose donc trois expériences pour abor-\nder ces trois aspects : température, masse et volume.\n\n= Expérience 1 : L'eau à l'état liquide a-t-elle\n\nla même température que la glace ?\n\nVoici le protocole à suivre :\n\n— mettre de l'eau dans un verre ;\n\n— briser des glaçons et mettre cette glace pilée dans un\nautre verre ;\n\n— plonger un thermomètre dans chaque verre et comparer\nles résultats.\n\nRésultats : La glace est à O degré. L'eau est à température\nambiante (20 degrés environ).\n\n=» Expérience 2 : L'eau liquide a-t-elle la même\nmasse que l’eau à l’état solide ?\n\nN. B. : On précise aux élèves que lorsque l'on pèse une\npersonne ou un objet dans la vie courante, on utilise le\nmot « poids ». Le mot scientifique exact correspondant\nest le mot « masse ». Par ailleurs, cette expérience est\nl'occasion d'expliquer le fonctionnement de la balance\net de (re)voir les unités utilisées (transversalité avec les\nmathématiques).\n\nVoici le protocole à suivre :\n\n— peser une bouteille remplie d'eau liquide et noter sa\nmasse ;\n\n— mettre cette bouteille d'eau au congélateur et attendre\nquelques heures ;\n\n— peser à nouveau la bouteille et noter sa masse.\n\nRésultats : On constate que les deux bouteilles ont la même\nmasse.\n\n=> Expérience 3: L'eau à l'état liquide a-t-elle\n\nle même volume que l’eau à l’état solide ?\n\nN. B. : On explique lors de cette expérience le sens du mot\n« volume » : espace occupé par une matière ou un objet.\nVoici le protocole à suivre :\n\n— Mettre de l'eau dans un verre ou une petite bouteille et\nmarquer d'un trait au feutre le niveau de l’eau.\n\n— Placer ce verre/cette bouteille au congélateur quelques\nheures.\n\n— Observer le résultat obtenu.\n\nRésultats : On constate que l'eau solide occupe plus de\nplace (volume) que l’eau liquide.\n\nL'enseignant-e peut alors distribuer la fiche élève 3. Cette\nfiche peut venir en complément des expérimentations réa-\nlisées en classe ou à la place de celles-ci si elles n'ont pas\npu être réalisées en classe.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n2 Je retiens\n\nL'eau liquide et l'eau solide n'ont pas la même\ntempérature.\n\n« L'eau liquide et l'eau solide ont la même masse.\n\n* L'eau solide (glace) occupe plus de volume que l'eau\nliquide.\n\n ase\n\nConnaitre l'état gazeux de l'eau et les processus d'éva-\nporation et de condensation.\n\nN. B.: Concernant le passage de l'état liquide à l'état gazeux,\nles scientifiques parlent de vaporisation. Ce terme recouvre\nles deux phénomènes d’ébullition et d'évaporation. Dans\nun souci de simplification, nous utilisons ici uniquement le\nterme d'évaporation.\n\nPar ailleurs, le terme scientifique qui traduit le passage de\nl'état gazeux à l'état liquide est la liquéfaction. On peut\nnéanmoins parler en classe de condensation.\n\na Je m’interroge\n\nL'enseignant-e rappelle aux élèves qu'ils ont étudié en\nCP-CE1 deux états de l'eau : l'état solide et l'état liquide et\nque le passage de l'un à l'autre se nomme la solidification\n(liquide — solide) ou la fusion (solide — liquide).\n\nPuis on interroge les éléves :\n\nMais existe-il un troisième état de l'eau ? Par exemple,\nque se passe-t-il quand on fait chauffer de l'eau dans\nune casserole ? Ou encore, que se passe-t-il quand on\nfait sécher du linge mouillé au soleil ?\n\nOn peut attendre les réponses suivantes : « il y a comme de\nla fumée qui sort de la casserole », « c'est de la vapeur »,\n« le linge sèche », « il n’est plus mouillé »...\n\n[11] J'expérimente\n\nL'enseignant-e propose alors aux élèves de leur soumettre\ntrois expériences. On décrit brièvement le protocole de\nchaque expérience puis distribue la fiche élève 4.\nCollectivement, on procède alors à la description des expé-\nriences à partir de la fiche élève :\n\n=> Expérience 1:\n\nOn met une casserole remplie d'eau sur une plaque élec- |\n\ntrique. Lorsque l’eau bout entre 5 et 10 minutes. Puis on\ninterroge les élèves :\n\nI Que constatez-vous ?\n\n-æ\n\nRéponses possibles des élèves :\nl'air », « elle s’est évaporée ».\n\n« l'eau est partie dans\n\n==> Expérience 2 :\n\nCette expérience consiste à placer sur le radiateur une\npetite assiette contenant de l'eau liquide. Quelques jours\nplus tard, on remarque que l'assiette est vide.\n\nOn interroge les élèves :\n\n[| Pourquoi l'assiette est-elle vide ? Que s'est-il passé ?\n\nRéponses possibles des élèves : « l’eau a disparu », « l'eau\nest partie dans l'air », « elle s'est évaporée », « c'est de la\nvapeur d’eau ».\n\nL'enseignant-e précise que le passage de l'eau liquide à\nl'état gazeux se nomme l'évaporation.\n\n==> Expérience 3 :\n\nCette dernière expérience peut être faite cette fois-ci direc-\ntement devant les élèves. Elle consiste à sortir du réfrigé-\nrateur une bouteille de jus de fruits, en verre, à attendre\nquelques minutes puis à observer et à toucher l'extérieur\nde la bouteille.\n\nOn interroge les élèves :\n\n| Que remarque-t-on ? Avez-vous déja vu ce\n{| phénomène dans votre vie quotidienne ? Comment\nl'expliquez-vous ?\n\nRéponses possibles des élèves : « il y a de l’eau sur la bou-\nteille », « de l'eau s'est collée à la bouteille », « la bouteille\nest humide ».\n\nL'enseignant-e fait remarquer qu'on peut voir le même\nphénomène sur les vitres de la voiture, sur le miroir de la\nsalle de bain après une douche, sur le dessous du couvercle\nde la casserole où l'on fait chauffer de l'eau. C'est l'eau pré-\nsente dans l'air qui se dépose : c'est de la vapeur. On peut\npréciser que l'eau est présente dans l'air à l'état gazeux.\nLorsqu'elle rencontre une paroi froide, elle se dépose et\nredevient liquide. C'est la condensation.\n\n2 Je retiens\n\n«l'eau existe à l’état solide (glace) et liquide. Mais il\nexiste un troisième état de l'eau, l'état gazeux. C'est la\nvapeur d'eau présente dans l'air.\n\n* Le passage de l'état liquide à l’état gazeux se nomme\nl'évaporation.\n\n« Le passage de l'état gazeux à l'état liquide se nomme\nla condensation.\n\nLes états liquide et solide de l’eau\n\n| EAU\n| à l'état solide\n|\n\n=\n\n(glace)\n\ny\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nFUSION EAU\nI EE. à l'état liquide\nSOLIDIFICATION (eau liquide)\n\nQu'est-ce que la matière ? o 29",
        phases: [
          {
            title: "J'expérimente",
            detail:
              "Les élèves sont placés par groupes de 4. Chaque groupe\ndoit préparer une expérience en fonction de la méthode\nretenue.\n\nLorsque le protocole est clairement établi, I'enseignant-e\ndistribue un glaçon à chaque groupe et explique que\nchaque glaçon est identique afin de pouvoir comparer nos\nexpériences. On enregistre alors sur l'horloge de la classe\nou sur un chronomètre l'instant T 0 : début de l'expérience.\nOn mettra un glaçon « témoin » sur une assiette dans la\nclasse. Il servira de repère pour savoir qui a réussi à faire\nfondre son glaçon plus vite, grâce au dispositif mis en place\npar chaque groupe.\n\nL'enseignant-e et les élèves prennent des photos de leur\nglaçon. Les élèves regardent l'heure à l'horloge lorsque leur\nglaçon est complètement fondu : T final.\n\nOn compare les résultats des différents groupes afin de\nmettre en évidence ce qui fait fondre le plus rapidement\nle glaçon (chaleur). Il est souhaitable de placer un thermo-\nmètre près de chaque dispositif. On précisera que le passage\nde l'eau de l'état solide vers l'état liquide s'appelle la fusion.\nLes élèves qui réalisent cette expérimentation dans leur\nclasse noteront les résultats dans leur classeur ou cahier de\nQLM. Pour ceux qui n'ont pas pu la réaliser, l'enseignant-e\npeut alors distribuer la fiche élève 2.\n\nN.B. : La fiche à découper (— sur CD-Rom) propose les\ndessins à découper et à coller pour l'expérience témoin et\nl'hypothèse testée.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "* L'eau solide devient liquide si on la laisse à la chaleur :\nc'est la fusion.\n\n* Plus la température est importante plus la fusion est\nrapide.\n\n éd dés\n\nSavoir comparer et mesurer la température, le volume,\nla masse de l'eau à l'état liquide et à l'état solide.\n\n[2]",
          },
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e rappelle aux élèves le travail réalisé lors du\ndossier 2 sur les états de l'eau dans la nature et leur demande :\n\n| Vous souvenez-vous des différents états de l'eau dans la\n[| nature?\n\nOn peut attendre les réponses suivantes : « l’eau peut être\nliquide dans la mer, dans les rivières », « la pluie, c'est de\nl’eau liquide », « l’eau peut aussi être solide quand il fait\nfroid, c'est de la glace ou de la neige ».\n\nL'enseignant-e propose alors aux élèves de comparer l’eau\nliquide et l'eau solide. On interroge à nouveau les élèves :\n\n| Que pourrait-on comparer ou mesurer entre l'eau\n| liquide et l'eau solide ?\n\n28 » Qu'est-ce que la matière ?\n\nLes élèves pointeront assez spontanément la question de la\ntempérature déjà abordée dans le dossier 2 et dans les deux\npremières séances du dossier 3. On pourra par ailleurs les\nguider pour aborder la notion de masse :\n\n[| La glace pèse-t-elle plus lourd que l’eau ?\n\nEnfin, la notion de différence de volume entre l'eau liquide\net la glace sera certainement plus difficile à mettre en évi-\ndence spontanément.\n\n(A)",
          },
          {
            title: "J'expérimente",
            detail:
              "L'enseignant-e propose donc trois expériences pour abor-\nder ces trois aspects : température, masse et volume.\n\n= Expérience 1 : L'eau à l'état liquide a-t-elle\n\nla même température que la glace ?\n\nVoici le protocole à suivre :\n\n— mettre de l'eau dans un verre ;\n\n— briser des glaçons et mettre cette glace pilée dans un\nautre verre ;\n\n— plonger un thermomètre dans chaque verre et comparer\nles résultats.\n\nRésultats : La glace est à O degré. L'eau est à température\nambiante (20 degrés environ).\n\n=» Expérience 2 : L'eau liquide a-t-elle la même\nmasse que l’eau à l’état solide ?\n\nN. B. : On précise aux élèves que lorsque l'on pèse une\npersonne ou un objet dans la vie courante, on utilise le\nmot « poids ». Le mot scientifique exact correspondant\nest le mot « masse ». Par ailleurs, cette expérience est\nl'occasion d'expliquer le fonctionnement de la balance\net de (re)voir les unités utilisées (transversalité avec les\nmathématiques).\n\nVoici le protocole à suivre :\n\n— peser une bouteille remplie d'eau liquide et noter sa\nmasse ;\n\n— mettre cette bouteille d'eau au congélateur et attendre\nquelques heures ;\n\n— peser à nouveau la bouteille et noter sa masse.\n\nRésultats : On constate que les deux bouteilles ont la même\nmasse.\n\n=> Expérience 3: L'eau à l'état liquide a-t-elle\n\nle même volume que l’eau à l’état solide ?\n\nN. B. : On explique lors de cette expérience le sens du mot\n« volume » : espace occupé par une matière ou un objet.\nVoici le protocole à suivre :\n\n— Mettre de l'eau dans un verre ou une petite bouteille et\nmarquer d'un trait au feutre le niveau de l’eau.\n\n— Placer ce verre/cette bouteille au congélateur quelques\nheures.\n\n— Observer le résultat obtenu.\n\nRésultats : On constate que l'eau solide occupe plus de\nplace (volume) que l’eau liquide.\n\nL'enseignant-e peut alors distribuer la fiche élève 3. Cette\nfiche peut venir en complément des expérimentations réa-\nlisées en classe ou à la place de celles-ci si elles n'ont pas\npu être réalisées en classe.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "L'eau liquide et l'eau solide n'ont pas la même\ntempérature.\n\n« L'eau liquide et l'eau solide ont la même masse.\n\n* L'eau solide (glace) occupe plus de volume que l'eau\nliquide.\n\n ase\n\nConnaitre l'état gazeux de l'eau et les processus d'éva-\nporation et de condensation.\n\nN. B.: Concernant le passage de l'état liquide à l'état gazeux,\nles scientifiques parlent de vaporisation. Ce terme recouvre\nles deux phénomènes d’ébullition et d'évaporation. Dans\nun souci de simplification, nous utilisons ici uniquement le\nterme d'évaporation.\n\nPar ailleurs, le terme scientifique qui traduit le passage de\nl'état gazeux à l'état liquide est la liquéfaction. On peut\nnéanmoins parler en classe de condensation.\n\na",
          },
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e rappelle aux élèves qu'ils ont étudié en\nCP-CE1 deux états de l'eau : l'état solide et l'état liquide et\nque le passage de l'un à l'autre se nomme la solidification\n(liquide — solide) ou la fusion (solide — liquide).\n\nPuis on interroge les éléves :\n\nMais existe-il un troisième état de l'eau ? Par exemple,\nque se passe-t-il quand on fait chauffer de l'eau dans\nune casserole ? Ou encore, que se passe-t-il quand on\nfait sécher du linge mouillé au soleil ?\n\nOn peut attendre les réponses suivantes : « il y a comme de\nla fumée qui sort de la casserole », « c'est de la vapeur »,\n« le linge sèche », « il n’est plus mouillé »...\n\n[11]",
          },
          {
            title: "J'expérimente",
            detail:
              "L'enseignant-e propose alors aux élèves de leur soumettre\ntrois expériences. On décrit brièvement le protocole de\nchaque expérience puis distribue la fiche élève 4.\nCollectivement, on procède alors à la description des expé-\nriences à partir de la fiche élève :\n\n=> Expérience 1:\n\nOn met une casserole remplie d'eau sur une plaque élec- |\n\ntrique. Lorsque l’eau bout entre 5 et 10 minutes. Puis on\ninterroge les élèves :\n\nI Que constatez-vous ?\n\n-æ\n\nRéponses possibles des élèves :\nl'air », « elle s’est évaporée ».\n\n« l'eau est partie dans\n\n==> Expérience 2 :\n\nCette expérience consiste à placer sur le radiateur une\npetite assiette contenant de l'eau liquide. Quelques jours\nplus tard, on remarque que l'assiette est vide.\n\nOn interroge les élèves :\n\n[| Pourquoi l'assiette est-elle vide ? Que s'est-il passé ?\n\nRéponses possibles des élèves : « l’eau a disparu », « l'eau\nest partie dans l'air », « elle s'est évaporée », « c'est de la\nvapeur d’eau ».\n\nL'enseignant-e précise que le passage de l'eau liquide à\nl'état gazeux se nomme l'évaporation.\n\n==> Expérience 3 :\n\nCette dernière expérience peut être faite cette fois-ci direc-\ntement devant les élèves. Elle consiste à sortir du réfrigé-\nrateur une bouteille de jus de fruits, en verre, à attendre\nquelques minutes puis à observer et à toucher l'extérieur\nde la bouteille.\n\nOn interroge les élèves :\n\n| Que remarque-t-on ? Avez-vous déja vu ce\n{| phénomène dans votre vie quotidienne ? Comment\nl'expliquez-vous ?\n\nRéponses possibles des élèves : « il y a de l’eau sur la bou-\nteille », « de l'eau s'est collée à la bouteille », « la bouteille\nest humide ».\n\nL'enseignant-e fait remarquer qu'on peut voir le même\nphénomène sur les vitres de la voiture, sur le miroir de la\nsalle de bain après une douche, sur le dessous du couvercle\nde la casserole où l'on fait chauffer de l'eau. C'est l'eau pré-\nsente dans l'air qui se dépose : c'est de la vapeur. On peut\npréciser que l'eau est présente dans l'air à l'état gazeux.\nLorsqu'elle rencontre une paroi froide, elle se dépose et\nredevient liquide. C'est la condensation.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "«l'eau existe à l’état solide (glace) et liquide. Mais il\nexiste un troisième état de l'eau, l'état gazeux. C'est la\nvapeur d'eau présente dans l'air.\n\n* Le passage de l'état liquide à l’état gazeux se nomme\nl'évaporation.\n\n« Le passage de l'état gazeux à l'état liquide se nomme\nla condensation.\n\nLes états liquide et solide de l’eau\n\n| EAU\n| à l'état solide\n|\n\n=\n\n(glace)\n\ny\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nFUSION EAU\nI EE. à l'état liquide\nSOLIDIFICATION (eau liquide)\n\nQu'est-ce que la matière ? o 29",
          },
        ],
      },
    ],
    guideText:
      "L’eau peut-elle changer d'état ?\n\n| > Objectifs\n\n| Mettre en œuvre des expériences simples pour illustrer les changements d'états de l'eau :\nla solidification et la fusion.\n\n* Savoir comparer et mesurer la température, le volume, la masse de l'eau à l'état liquide\net à l'état solide.\n\n« Connaitre l'état gazeux de l'eau et les processus de condensation et d'évaporation.\n\n|\n» Indications de progression dans le cycle 2 |\nCe dossier est destiné aux éléves des trois niveaux du cycle 2. Les séances 1 et 2 sont du\n\nniveau CP, mais peuvent être également réalisées en CE1 si elles n'ont pas été faites au\nniveau précédent. La séance 3 est destinée au CE1 car elle nécessite la maitrise des notions\nde température, de volume et de masse. Cette séance peut aussi être envisagée au CE2 et\npermettre de réactiver les connaissances acquises. La séance 4 est réservée aux CE2 car elle\n\nFiche enseignant\n\n» Matériel\n\npetites bouteilles d'eau en plastique.\n\naborde le troisième état de la matière, l'état gazeux.\n\nDeux thermomètres, des glaçons, de l'eau, des verres, une balance électronique, deux\n\nséance 1 PACE)\n\nMettre en œuvre des expériences simples pour illustrer\nles changements d'états de l'eau : la solidification.\n\n@ Je m'interroge\n\nL'enseignant-e rappelle que l'eau existe sous différents\nétats. On invite les élèves à réactiver leurs connaissances\n(cf. dossier 2) : nous avons mis en évidence deux états dif-\nférents de l'eau dans la nature, l'état solide et l’état liquide.\nPuis l'enseignant-e interroge les élèves :\n\nEst-ce que de l’eau liquide peut devenir solide ?\nComment ? Pourquoi, d'après vous ?\n\nOn peut attendre les réponses suivantes, spontanées car\nliées à la vie quotidienne : « on peut mettre l'eau au froid,\nau réfrigérateur », « on peut faire des glaçons au congéla-\nteur ». À cette occasion, l'enseignant-e peut expliquer la\nfonction de chaque appareil : congélateur d’une part, réfri-\ngérateur ou frigo d'autre part (deux appareils différents\npour certains enfants).\n\n[1] J'expérimente\n\nL'enseignant-e propose alors aux élèves de réaliser l'expé-\nrience qui a pour objectif de transformer de l'eau liquide en\neau solide. On arrête alors ensemble le protocole de notre\nexpérience (« Comment de l'eau liquide peut-elle devenir\nsolide (glace) ? ») :\n\n— remplir deux gobelets ou bacs à glaçons avec de l'eau ;\n\n— les placer au congélateur et au réfrigérateur (un à chaque\nendroit) ;\n\n— placer à côté de chaque gobelet ou bac à glaçons un ther-\nmomèètre (l'enseignant-e peut profiter de cette expérience\npour expliquer comment on utilise un thermomètre pour\nrelever une température et comment on lit le résultat) ;\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n— attendre le lendemain et aller récupérer les gobelets ou\nbacs à glaçons ;\n\n— noter la température indiquée sur chaque thermomètre ;\n— observer le résultat obtenu : l'eau est-elle toujours liquide\nou est-elle devenue solide ?\n\nL'enseignant-e distribue ensuite la fiche élève 1 qui permet\nde faire le point sur l'expérience réalisée.\n\nL2 Je retiens\n\n* L'eau liquide devient solide si on la laisse au congéla-\nteur (température en dessous de 0 degré). On obtient\nde la glace : c'est la solidification.\n\nSéance 2 MNT\n\nMettre en œuvre des expériences simples pour illustrer\nles changements d'états de l'eau : la fusion.\n\na Je m’interroge\n\nB : Idéalement, cette séance se déroule à la suite de la\nséance 1. On aura préalablement mis au congélateur un ou\ndeux bacs à glaçons identiques.\nL'enseignant-e rappelle que l'eau passe de l'état liquide à\nl'état solide (solidification) si la température est inférieure\nà O °C. Ainsi dans la nature, lorsqu'il fait très froid en hiver,\nl’eau se transforme en glace. Au lieu de la pluie, c'est de la\nneige ou de la grêle qui tombe du ciel. L'eau des lacs et des\nrivières gèle…\nOn propose alors aux élèves un défi :\n\nMais comment fait-on pour que de la glace redevienne\nde l'eau liquide ? Par exemple, comment peut-on faire\nfondre le plus rapidement possible un glaçon ?\n\nQu'est-ce que la matière ? » 27\n\nLes élèves vont sans doute proposer de le mettre au soleil,\ndans les mains, sur la table, sur le radiateur, ou encore d'uti-\nliser un sèche-cheveux !\n\n[1] J'expérimente\n\nLes élèves sont placés par groupes de 4. Chaque groupe\ndoit préparer une expérience en fonction de la méthode\nretenue.\n\nLorsque le protocole est clairement établi, I'enseignant-e\ndistribue un glaçon à chaque groupe et explique que\nchaque glaçon est identique afin de pouvoir comparer nos\nexpériences. On enregistre alors sur l'horloge de la classe\nou sur un chronomètre l'instant T 0 : début de l'expérience.\nOn mettra un glaçon « témoin » sur une assiette dans la\nclasse. Il servira de repère pour savoir qui a réussi à faire\nfondre son glaçon plus vite, grâce au dispositif mis en place\npar chaque groupe.\n\nL'enseignant-e et les élèves prennent des photos de leur\nglaçon. Les élèves regardent l'heure à l'horloge lorsque leur\nglaçon est complètement fondu : T final.\n\nOn compare les résultats des différents groupes afin de\nmettre en évidence ce qui fait fondre le plus rapidement\nle glaçon (chaleur). Il est souhaitable de placer un thermo-\nmètre près de chaque dispositif. On précisera que le passage\nde l'eau de l'état solide vers l'état liquide s'appelle la fusion.\nLes élèves qui réalisent cette expérimentation dans leur\nclasse noteront les résultats dans leur classeur ou cahier de\nQLM. Pour ceux qui n'ont pas pu la réaliser, l'enseignant-e\npeut alors distribuer la fiche élève 2.\n\nN.B. : La fiche à découper (— sur CD-Rom) propose les\ndessins à découper et à coller pour l'expérience témoin et\nl'hypothèse testée.\n\n2 Je retiens\n\n* L'eau solide devient liquide si on la laisse à la chaleur :\nc'est la fusion.\n\n* Plus la température est importante plus la fusion est\nrapide.\n\n éd dés\n\nSavoir comparer et mesurer la température, le volume,\nla masse de l'eau à l'état liquide et à l'état solide.\n\n[2] Je m'interroge\n\nL'enseignant-e rappelle aux élèves le travail réalisé lors du\ndossier 2 sur les états de l'eau dans la nature et leur demande :\n\n| Vous souvenez-vous des différents états de l'eau dans la\n[| nature?\n\nOn peut attendre les réponses suivantes : « l’eau peut être\nliquide dans la mer, dans les rivières », « la pluie, c'est de\nl’eau liquide », « l’eau peut aussi être solide quand il fait\nfroid, c'est de la glace ou de la neige ».\n\nL'enseignant-e propose alors aux élèves de comparer l’eau\nliquide et l'eau solide. On interroge à nouveau les élèves :\n\n| Que pourrait-on comparer ou mesurer entre l'eau\n| liquide et l'eau solide ?\n\n28 » Qu'est-ce que la matière ?\n\nLes élèves pointeront assez spontanément la question de la\ntempérature déjà abordée dans le dossier 2 et dans les deux\npremières séances du dossier 3. On pourra par ailleurs les\nguider pour aborder la notion de masse :\n\n[| La glace pèse-t-elle plus lourd que l’eau ?\n\nEnfin, la notion de différence de volume entre l'eau liquide\net la glace sera certainement plus difficile à mettre en évi-\ndence spontanément.\n\n(A) J'expérimente\nL'enseignant-e propose donc trois expériences pour abor-\nder ces trois aspects : température, masse et volume.\n\n= Expérience 1 : L'eau à l'état liquide a-t-elle\n\nla même température que la glace ?\n\nVoici le protocole à suivre :\n\n— mettre de l'eau dans un verre ;\n\n— briser des glaçons et mettre cette glace pilée dans un\nautre verre ;\n\n— plonger un thermomètre dans chaque verre et comparer\nles résultats.\n\nRésultats : La glace est à O degré. L'eau est à température\nambiante (20 degrés environ).\n\n=» Expérience 2 : L'eau liquide a-t-elle la même\nmasse que l’eau à l’état solide ?\n\nN. B. : On précise aux élèves que lorsque l'on pèse une\npersonne ou un objet dans la vie courante, on utilise le\nmot « poids ». Le mot scientifique exact correspondant\nest le mot « masse ». Par ailleurs, cette expérience est\nl'occasion d'expliquer le fonctionnement de la balance\net de (re)voir les unités utilisées (transversalité avec les\nmathématiques).\n\nVoici le protocole à suivre :\n\n— peser une bouteille remplie d'eau liquide et noter sa\nmasse ;\n\n— mettre cette bouteille d'eau au congélateur et attendre\nquelques heures ;\n\n— peser à nouveau la bouteille et noter sa masse.\n\nRésultats : On constate que les deux bouteilles ont la même\nmasse.\n\n=> Expérience 3: L'eau à l'état liquide a-t-elle\n\nle même volume que l’eau à l’état solide ?\n\nN. B. : On explique lors de cette expérience le sens du mot\n« volume » : espace occupé par une matière ou un objet.\nVoici le protocole à suivre :\n\n— Mettre de l'eau dans un verre ou une petite bouteille et\nmarquer d'un trait au feutre le niveau de l’eau.\n\n— Placer ce verre/cette bouteille au congélateur quelques\nheures.\n\n— Observer le résultat obtenu.\n\nRésultats : On constate que l'eau solide occupe plus de\nplace (volume) que l’eau liquide.\n\nL'enseignant-e peut alors distribuer la fiche élève 3. Cette\nfiche peut venir en complément des expérimentations réa-\nlisées en classe ou à la place de celles-ci si elles n'ont pas\npu être réalisées en classe.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n2 Je retiens\n\nL'eau liquide et l'eau solide n'ont pas la même\ntempérature.\n\n« L'eau liquide et l'eau solide ont la même masse.\n\n* L'eau solide (glace) occupe plus de volume que l'eau\nliquide.\n\n ase\n\nConnaitre l'état gazeux de l'eau et les processus d'éva-\nporation et de condensation.\n\nN. B.: Concernant le passage de l'état liquide à l'état gazeux,\nles scientifiques parlent de vaporisation. Ce terme recouvre\nles deux phénomènes d’ébullition et d'évaporation. Dans\nun souci de simplification, nous utilisons ici uniquement le\nterme d'évaporation.\n\nPar ailleurs, le terme scientifique qui traduit le passage de\nl'état gazeux à l'état liquide est la liquéfaction. On peut\nnéanmoins parler en classe de condensation.\n\na Je m’interroge\n\nL'enseignant-e rappelle aux élèves qu'ils ont étudié en\nCP-CE1 deux états de l'eau : l'état solide et l'état liquide et\nque le passage de l'un à l'autre se nomme la solidification\n(liquide — solide) ou la fusion (solide — liquide).\n\nPuis on interroge les éléves :\n\nMais existe-il un troisième état de l'eau ? Par exemple,\nque se passe-t-il quand on fait chauffer de l'eau dans\nune casserole ? Ou encore, que se passe-t-il quand on\nfait sécher du linge mouillé au soleil ?\n\nOn peut attendre les réponses suivantes : « il y a comme de\nla fumée qui sort de la casserole », « c'est de la vapeur »,\n« le linge sèche », « il n’est plus mouillé »...\n\n[11] J'expérimente\n\nL'enseignant-e propose alors aux élèves de leur soumettre\ntrois expériences. On décrit brièvement le protocole de\nchaque expérience puis distribue la fiche élève 4.\nCollectivement, on procède alors à la description des expé-\nriences à partir de la fiche élève :\n\n=> Expérience 1:\n\nOn met une casserole remplie d'eau sur une plaque élec- |\n\ntrique. Lorsque l’eau bout entre 5 et 10 minutes. Puis on\ninterroge les élèves :\n\nI Que constatez-vous ?\n\n-æ\n\nRéponses possibles des élèves :\nl'air », « elle s’est évaporée ».\n\n« l'eau est partie dans\n\n==> Expérience 2 :\n\nCette expérience consiste à placer sur le radiateur une\npetite assiette contenant de l'eau liquide. Quelques jours\nplus tard, on remarque que l'assiette est vide.\n\nOn interroge les élèves :\n\n[| Pourquoi l'assiette est-elle vide ? Que s'est-il passé ?\n\nRéponses possibles des élèves : « l’eau a disparu », « l'eau\nest partie dans l'air », « elle s'est évaporée », « c'est de la\nvapeur d’eau ».\n\nL'enseignant-e précise que le passage de l'eau liquide à\nl'état gazeux se nomme l'évaporation.\n\n==> Expérience 3 :\n\nCette dernière expérience peut être faite cette fois-ci direc-\ntement devant les élèves. Elle consiste à sortir du réfrigé-\nrateur une bouteille de jus de fruits, en verre, à attendre\nquelques minutes puis à observer et à toucher l'extérieur\nde la bouteille.\n\nOn interroge les élèves :\n\n| Que remarque-t-on ? Avez-vous déja vu ce\n{| phénomène dans votre vie quotidienne ? Comment\nl'expliquez-vous ?\n\nRéponses possibles des élèves : « il y a de l’eau sur la bou-\nteille », « de l'eau s'est collée à la bouteille », « la bouteille\nest humide ».\n\nL'enseignant-e fait remarquer qu'on peut voir le même\nphénomène sur les vitres de la voiture, sur le miroir de la\nsalle de bain après une douche, sur le dessous du couvercle\nde la casserole où l'on fait chauffer de l'eau. C'est l'eau pré-\nsente dans l'air qui se dépose : c'est de la vapeur. On peut\npréciser que l'eau est présente dans l'air à l'état gazeux.\nLorsqu'elle rencontre une paroi froide, elle se dépose et\nredevient liquide. C'est la condensation.\n\n2 Je retiens\n\n«l'eau existe à l’état solide (glace) et liquide. Mais il\nexiste un troisième état de l'eau, l'état gazeux. C'est la\nvapeur d'eau présente dans l'air.\n\n* Le passage de l'état liquide à l’état gazeux se nomme\nl'évaporation.\n\n« Le passage de l'état gazeux à l'état liquide se nomme\nla condensation.\n\nLes états liquide et solide de l’eau\n\n| EAU\n| à l'état solide\n|\n\n=\n\n(glace)\n\ny\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nFUSION EAU\nI EE. à l'état liquide\nSOLIDIFICATION (eau liquide)\n\nQu'est-ce que la matière ? o 29",
    guidePageDecisions: [
      {
        page: 27,
        confidence: 92,
        score: 22,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
        ],
        phaseMarkers: ["je m'interroge", "j'experimente", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on propose"],
        studentLike: false,
      },
      {
        page: 28,
        confidence: 93,
        score: 24,
        included: true,
        strongMarkers: [
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "par groupes",
          "en classe",
        ],
        phaseMarkers: ["je m'interroge", "j'experimente", "je retiens"],
        teacherLanguageMarkers: [
          "enseignant",
          "eleves",
          "on interroge",
          "par groupes",
          "groupe",
          "en classe",
        ],
        studentLike: true,
      },
      {
        page: 29,
        confidence: 92,
        score: 20,
        included: true,
        strongMarkers: ["l'enseignant", "enseignant-e", "les eleves", "aux eleves", "en classe"],
        phaseMarkers: ["je m'interroge", "j'experimente", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on interroge", "en classe"],
        studentLike: true,
      },
      {
        page: 30,
        confidence: 88,
        score: -1,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: false,
      },
    ],
    skippedProbePages: [30],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-04",
    dossierNumber: 4,
    partNumber: 1,
    partTitle: "Qu'est-ce que la matière ?",
    title: "L'air, une matière ?",
    guidePages: [41, 42, 43],
    guidePageCount: 3,
    objectives: [
      "« Prendre conscience de l'existence et des effets de l'air par l'observation de phénomènes",
      "naturels et la mise en mouvement de différents objets.",
      "+ Mettre en œuvre des expériences simples impliquant l'air.",
      "« Connaître quelques propriétés de l'air (matérialité et compressibilité).",
    ],
    progressionNote:
      "Nous proposons pour ce dossier de traiter un objectif à chaque année du cycle : au CP,\nl'existence de l'air et de ses effets (séance 1) ; au CE1, la mise en œuvre d'expériences\nimpliquant l'air comme la mise en mouvement d'un objet (séance 2) ; au CE2, les propriétés\nde l'air (séances 3 et 4). Cette organisation peut être bien sûr modulée en fonction de la\nconfiguration de chaque classe et de l'école.",
    material: [
      "Le matériel nécessaire est indiqué dans chaque séance.",
      "Prendre conscience de l'existence et des effets de l'air",
      "par l'observation de phénomènes naturels et la mise en",
      "mouvement de différents objets.",
      "EJ Je m'interroge",
      "Pour aborder cette première séance sur l'air, l'enseignant-e",
      "peut se servir du point météo quotidien et faire observer",
      "aux élèves le vent qui souffle dehors. On interroge alors les",
      "élèves :",
      "Qu'est-ce que c'est le vent pour vous ? Connaissez-vous",
      "des objets qui utilisent le vent pour fonctionner ? Des",
      "objets qui font du vent ?",
      "On peut attendre des réponses du type : « le vent, c'est de",
      "l'air », « c'est de l'air qui bouge ». Pour les objets qui fonc-",
      "tionnent avec du vent, les élèves peuvent citer par exemple",
      "le cerf-volant, le bateau à voile, la flute ou autre instrument",
      "à vent, mais aussi les éoliennes. Pour les objets qui font",
      "du vent, il peut y avoir des objets du quotidien comme le",
      "sèche-cheveux, le ventilateur",
      "Après ce premier échange avec les élèves, l'enseignant-e",
      "interroge à nouveau les élèves :",
      "Nous avons vu que le vent, c'est de l'air qui bouge et",
      "que beaucoup d'objets utilisent ou font de l'air en mou-",
      "vement. Mais y a-t-il de l'air partout autour de nous ?",
      "Comment pouvons-nous le montrer ?",
      "Si les réponses des élèves sont majoritairement « oui » et",
      "qu'il est invisible, certains pensent qu'il n'y a de l'air que",
      "dehors. Il est alors possible de répondre que nous respirons",
      "© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
      "de l'air et que cela signifie qu'il est partout autour de nous.",
      "L'enseignant-e propose alors aux élèves de faire des expéri-",
      "mentations simples pour vérifier son existence et ses effets.",
      "I J'expérimente",
      "L'enseignant-e place les élèves par groupes de 4. On a pré-",
      "paré au préalable pour chaque groupe le matériel suivant :",
      "une bouteille de plastique vide, un ballon de baudruche,",
      "une paille, une bassine à moitié remplie d'eau et un gobelet",
      "en plastique.",
      "L'enseignant-e propose aux élèves d'utiliser ce matériel pour",
      "répondre à la question que nous nous posons : l'air existe-t-il",
      "tout autour de nous ? Comment peut-on le montrer ?",
      "On laisse alors les élèves expérimenter librement avec le",
      "matériel proposé. Quand un groupe propose une expéri-",
      "mentation pertinente, on la schématise collectivement et",
      "l'enseignant-e note au tableau les résultats et la conclusion",
      "sous forme de dictée à l'adulte).",
      "On distribue alors la fiche élève 1. Elle propose de trier",
      "différents objets qui fonctionnent ou produisent du vent en",
      "utilisant les images de la fiche à découper (— sur CD-Rom)",
      "à imprimer au format A5. On y trouve également quelques-",
      "unes des expériences possibles avec le matériel distribué.",
      "Elle peut venir en complément des expérimentations libres",
      "des élèves ou être utilisée en remplacement de celles-ci.",
      "Je retiens",
      "« L'air existe tout autour de nous. Il est invisible et n'a",
      "pas d’odeur.",
      "Le vent est de l'air en mouvement.",
      "« L'air peut se déplacer ou faire fonctionner des objets.",
      "Qu'est-ce que la matière ? » 41",
      "Fiche enseignant",
    ],
    sessions: [
      {
        number: 2,
        title:
          "Mettre en œuvre des expériences simples impliquant l'air : mettre en mouvement un objet avec de l'air, avec du vent.",
        rawText:
          "| Séance 2 FF\n\nMettre en œuvre des expériences simples impliquant\nl'air : mettre en mouvement un objet avec de l'air, avec\ndu vent.\n\n[2] Je m'interroge\n\nL'enseignant-e demande aux élèves de noter rapidement\nsur leur classeur ou cahier de sciences ce dont ils se sou-\nviennent sur l'air. Après les avoir écoutés, on résumera ces\nconnaissances. On propose alors aux élèves un défi :\n\n| Comment mettre en mouvement un objet avec de l'air\n| ou avec du vent (qui est de l'air en mouvement) ?\n\n[11] J'expérimente\n\nLes élèves peuvent travailler seuls ou par groupe de 2.\nL'enseignant-e met à disposition des élèves le matériel\nsuivant : bouchons en liège, baguettes de bois, feuilles de\npapier cartonnées type Canson, punaises ou épingles, pis-\ntolet à colle, paires de ciseaux, feutres de couleur.\n\nLes élèves peuvent expérimenter librement dans un pre-\nmier temps. Lorsqu'ils ont réussi à créer leur objet et que\ncelui-ci se met effectivement en mouvement grâce à l'air\nou au vent, ils peuvent réaliser leur fiche technique sur la\nfiche élève 2.\n\nOn pourra utiliser la fiche documentaire 1 pour guider les\nélèves en panne d'inspiration.\n\nJe retiens\n\n+ En fabriquant un moulin à vent, j'ai pu vérifier que le\ndéplacement de l'air peut mettre en mouvement un\nobjet.\n\n«Lair peut aussi permettre de faire fonctionner des\nobjets, comme par exemple le bateau à voile.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e demande aux élèves de noter rapidement\nsur leur classeur ou cahier de sciences ce dont ils se sou-\nviennent sur l'air. Après les avoir écoutés, on résumera ces\nconnaissances. On propose alors aux élèves un défi :\n\n| Comment mettre en mouvement un objet avec de l'air\n| ou avec du vent (qui est de l'air en mouvement) ?\n\n[11]",
          },
          {
            title: "J'expérimente",
            detail:
              "Les élèves peuvent travailler seuls ou par groupe de 2.\nL'enseignant-e met à disposition des élèves le matériel\nsuivant : bouchons en liège, baguettes de bois, feuilles de\npapier cartonnées type Canson, punaises ou épingles, pis-\ntolet à colle, paires de ciseaux, feutres de couleur.\n\nLes élèves peuvent expérimenter librement dans un pre-\nmier temps. Lorsqu'ils ont réussi à créer leur objet et que\ncelui-ci se met effectivement en mouvement grâce à l'air\nou au vent, ils peuvent réaliser leur fiche technique sur la\nfiche élève 2.\n\nOn pourra utiliser la fiche documentaire 1 pour guider les\nélèves en panne d'inspiration.",
          },
          {
            title: "Je retiens",
            detail:
              "+ En fabriquant un moulin à vent, j'ai pu vérifier que le\ndéplacement de l'air peut mettre en mouvement un\nobjet.\n\n«Lair peut aussi permettre de faire fonctionner des\nobjets, comme par exemple le bateau à voile.",
          },
        ],
      },
      {
        number: 3,
        title: "Connaitre quelques propriétés de l'air (matérialité).",
        rawText:
          "| Séance 3 FFT\n\nConnaitre quelques propriétés de l'air (matérialité).\n\na Je m’interroge\n\nL'enseignant-e demande aux élèves de dire ce dont ils se\nsouviennent concernant l'air. On réactive ainsi des élé-\nments propres aux séances précédentes : l'air est partout\nautour de nous. Le vent est de l'air en mouvement. Il est\ninvisible. Il peut déplacer des objets ou en faire fonctionner\nd'autres.\n\nL'enseignant-e pose alors à la classe une autre question :\n\n| Mais alors, l'air est-il une matière ? Peut-on par exemple\nle peser ? Est-ce que l'air occupe de l'espace ? Peut-on le\n{ passer d'un récipient à un autre ?\n\nL'enseignant-e propose aux élèves de réfléchir à ces ques-\ntions par l'expérimentation.\n\nI J'expérimente\n\nL'enseignant-e propose de faire trois expériences : masse,\noccupation de l'espace et transvasement. Ces trois expé-\nriences permettront de vérifier la matérialité de l'air.\n\nLes élèves sont placés par groupes de 3 ou 4.\n\n42 « Qu'est-ce que la matière ?\n\n= Expérience 1 : l'air a-t-il une masse ?\n\nUn tiers des groupes réfléchit à la première question posée :\ncomment peser l'air ?\n\nL'enseignant-e a mis en évidence le matériel à disposi-\ntion : balance électronique, pompe, ballon (de basket par\nexemple).\n\nDes élèves proposent assez rapidement de dégonfler un bal-\nlon, de le peser puis de le gonfler et de le peser de nouveau.\n= Expérience 2 : l'air occupe-t-il de l'espace ?\n\nLe deuxième tiers des groupes cherche à répondre à la\nseconde question : « comment vérifier que l'air occupe de\nl'espace ? »\n\nLe matériel à disposition est le suivant : bassines remplies\nd'eau à la moitié, gobelets en plastique.\n\nLes élèves peuvent ainsi plonger le gobelet retourné dans\nla bassine d'eau et, en le penchant légèrement, voir l'air\nqui s'échappe. L'eau rend l'air visible et permet de voir qu'il\noccupe de l'espace.\n\n= Expérience 3 : l'air peut-il être transvasé ?\n\nLe dernier tiers des groupes se penche lui sur la question :\n« Peut-on faire passer de l'air d'un récipient à un autre ? »\nChaque groupe a à sa disposition le matériel suivant :\nbassine d'eau à moitié remplie, gobelet en plastique et\nbouteille en plastique de 50 cL vide.\n\nL'enseignant-e laisse les élèves formuler leurs différentes\npropositions, les dessiner, schématiser, légender et rédiger\nles explications correspondantes. Puis le matériel est distri-\nbué. Les élèves peuvent ainsi tenter de transvaser l'air de la\nbouteille vide, pleine d'air, ou d'un gobelet à un autre, l'air\nchassant l'eau du deuxième gobelet retourné mais rempli\nd'eau.\n\nOn distribue ensuite la fiche élève 3 qui permet de valider\nles expérimentations menées précédemment.\n\n2 Je retiens\n\n+ L'air a une masse et occupe de l'espace. Il peut être\ntransvasé (passer d’un récipient à un autre) et prend la\nforme du récipient qui le contient. IL est invisible mais\non peut le voir dans l'eau.\n\n* L'air est un gaz. Toutes ces propriétés font de l'air une\nmatière, comme les solides et les liquides.\n\n PTT)\n\nConnaitre quelques propriétés de l'air (la compressibilité).\n\na Je m'interroge\n\nL'enseignant-e utilise, pour introduire cette séance, un\nballon de basket légèrement dégonflé. En le regonflant, il\ndemande aux élèves :\n\n| Est-ce que l'on peut diminuer le volume occupé par\n{l'air ? Est-ce que l'on peut comprimer l'air ?\n\nOn peut attendre des élèves des réponses du type : « oui,\non peut faire rentrer de l'air en le forçant comme dans un\nballon ou dans les pneus d’un vélo», « quand on enlève la\npompe à vélo après avoir gonflé un pneu, on entend l'air\nqu'on a forcé à entrer sortir tout seul ».\n\nL'enseignant-e propose alors d'utiliser une seringue pour\nexpérimenter cette question.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n J'expérimente\n\nL'idéal est d'avoir a sa disposition une seringue par groupe\nde 2 ou 4 élèves. On distribue également aux élèves la |\nfiche élève 4.\n\nL'enseignant-e propose d’enfermer de l'air dans la seringue\nen la bouchant avec le pouce puis d'appuyer sur le piston.\nAvant de faire cette expérience, on propose aux élèves\ndans un premier temps d'imaginer ce qui va se passer et\nde noter sur sa fiche d'expérimentation ce que l'on pense,\nson hypothèse.\n\nPuis l'enseignant-e demande de réaliser l'expérience et |\nd'en faire sur la fiche un schéma légendé. Chaque groupe\nnote le résultat observé et, après avoir entendu les résul-\ntats des différents groupes, on rédige collectivement une\nconclusion.\n\nES\n\nRemarque : Certains groupes remarqueront sans doute\nque le piston reprend sa position de départ lorsqu'on le\n\n| relâche. L'air reprend son volume initial : c'est pourquoi, par\n\nexemple, il s'échappe d'un ballon de basket percé ou d'un\npneu de vélo crevé.\n\n2 Je retiens\n\n+ On peut diminuer le volume occupé par l'air dans la\nseringue : il y a autant d'air mais il prend moins de place.\nIl est comprimé.\n\n= On dit que l'air est compressible.\n\nL'air existe tout autour de nous. Il est invisible et n'a pas d'odeur.\n\nLe vent est de l'air en mouvement.\n\nIN\n\nAOL\n\nGz\n\nFen, 2\nF7 F4 pt, rid\n\n2\n\nBateau à voile\n\nLo is Pen\nÉolienne\n\nFlute\n\nDes objets peuvent mettre de\n\nl'air en mouvement.\n\nAspirateur\n\nSèche-cheveux\n\nÉventail\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nQu'est-ce que la matière ? » 43",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e demande aux élèves de dire ce dont ils se\nsouviennent concernant l'air. On réactive ainsi des élé-\nments propres aux séances précédentes : l'air est partout\nautour de nous. Le vent est de l'air en mouvement. Il est\ninvisible. Il peut déplacer des objets ou en faire fonctionner\nd'autres.\n\nL'enseignant-e pose alors à la classe une autre question :\n\n| Mais alors, l'air est-il une matière ? Peut-on par exemple\nle peser ? Est-ce que l'air occupe de l'espace ? Peut-on le\n{ passer d'un récipient à un autre ?\n\nL'enseignant-e propose aux élèves de réfléchir à ces ques-\ntions par l'expérimentation.\n\nI",
          },
          {
            title: "J'expérimente",
            detail:
              "L'enseignant-e propose de faire trois expériences : masse,\noccupation de l'espace et transvasement. Ces trois expé-\nriences permettront de vérifier la matérialité de l'air.\n\nLes élèves sont placés par groupes de 3 ou 4.\n\n42 « Qu'est-ce que la matière ?\n\n= Expérience 1 : l'air a-t-il une masse ?\n\nUn tiers des groupes réfléchit à la première question posée :\ncomment peser l'air ?\n\nL'enseignant-e a mis en évidence le matériel à disposi-\ntion : balance électronique, pompe, ballon (de basket par\nexemple).\n\nDes élèves proposent assez rapidement de dégonfler un bal-\nlon, de le peser puis de le gonfler et de le peser de nouveau.\n= Expérience 2 : l'air occupe-t-il de l'espace ?\n\nLe deuxième tiers des groupes cherche à répondre à la\nseconde question : « comment vérifier que l'air occupe de\nl'espace ? »\n\nLe matériel à disposition est le suivant : bassines remplies\nd'eau à la moitié, gobelets en plastique.\n\nLes élèves peuvent ainsi plonger le gobelet retourné dans\nla bassine d'eau et, en le penchant légèrement, voir l'air\nqui s'échappe. L'eau rend l'air visible et permet de voir qu'il\noccupe de l'espace.\n\n= Expérience 3 : l'air peut-il être transvasé ?\n\nLe dernier tiers des groupes se penche lui sur la question :\n« Peut-on faire passer de l'air d'un récipient à un autre ? »\nChaque groupe a à sa disposition le matériel suivant :\nbassine d'eau à moitié remplie, gobelet en plastique et\nbouteille en plastique de 50 cL vide.\n\nL'enseignant-e laisse les élèves formuler leurs différentes\npropositions, les dessiner, schématiser, légender et rédiger\nles explications correspondantes. Puis le matériel est distri-\nbué. Les élèves peuvent ainsi tenter de transvaser l'air de la\nbouteille vide, pleine d'air, ou d'un gobelet à un autre, l'air\nchassant l'eau du deuxième gobelet retourné mais rempli\nd'eau.\n\nOn distribue ensuite la fiche élève 3 qui permet de valider\nles expérimentations menées précédemment.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "+ L'air a une masse et occupe de l'espace. Il peut être\ntransvasé (passer d’un récipient à un autre) et prend la\nforme du récipient qui le contient. IL est invisible mais\non peut le voir dans l'eau.\n\n* L'air est un gaz. Toutes ces propriétés font de l'air une\nmatière, comme les solides et les liquides.\n\n PTT)\n\nConnaitre quelques propriétés de l'air (la compressibilité).\n\na",
          },
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e utilise, pour introduire cette séance, un\nballon de basket légèrement dégonflé. En le regonflant, il\ndemande aux élèves :\n\n| Est-ce que l'on peut diminuer le volume occupé par\n{l'air ? Est-ce que l'on peut comprimer l'air ?\n\nOn peut attendre des élèves des réponses du type : « oui,\non peut faire rentrer de l'air en le forçant comme dans un\nballon ou dans les pneus d’un vélo», « quand on enlève la\npompe à vélo après avoir gonflé un pneu, on entend l'air\nqu'on a forcé à entrer sortir tout seul ».\n\nL'enseignant-e propose alors d'utiliser une seringue pour\nexpérimenter cette question.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
          },
          {
            title: "J'expérimente",
            detail:
              "L'idéal est d'avoir a sa disposition une seringue par groupe\nde 2 ou 4 élèves. On distribue également aux élèves la |\nfiche élève 4.\n\nL'enseignant-e propose d’enfermer de l'air dans la seringue\nen la bouchant avec le pouce puis d'appuyer sur le piston.\nAvant de faire cette expérience, on propose aux élèves\ndans un premier temps d'imaginer ce qui va se passer et\nde noter sur sa fiche d'expérimentation ce que l'on pense,\nson hypothèse.\n\nPuis l'enseignant-e demande de réaliser l'expérience et |\nd'en faire sur la fiche un schéma légendé. Chaque groupe\nnote le résultat observé et, après avoir entendu les résul-\ntats des différents groupes, on rédige collectivement une\nconclusion.\n\nES\n\nRemarque : Certains groupes remarqueront sans doute\nque le piston reprend sa position de départ lorsqu'on le\n\n| relâche. L'air reprend son volume initial : c'est pourquoi, par\n\nexemple, il s'échappe d'un ballon de basket percé ou d'un\npneu de vélo crevé.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "+ On peut diminuer le volume occupé par l'air dans la\nseringue : il y a autant d'air mais il prend moins de place.\nIl est comprimé.\n\n= On dit que l'air est compressible.\n\nL'air existe tout autour de nous. Il est invisible et n'a pas d'odeur.\n\nLe vent est de l'air en mouvement.\n\nIN\n\nAOL\n\nGz\n\nFen, 2\nF7 F4 pt, rid\n\n2\n\nBateau à voile\n\nLo is Pen\nÉolienne\n\nFlute\n\nDes objets peuvent mettre de\n\nl'air en mouvement.\n\nAspirateur\n\nSèche-cheveux\n\nÉventail\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nQu'est-ce que la matière ? » 43",
          },
        ],
      },
    ],
    guideText:
      "| L’air, une matière ?\n\n| » Objectifs\n\n« Prendre conscience de l'existence et des effets de l'air par l'observation de phénomènes\nnaturels et la mise en mouvement de différents objets.\n\n| + Mettre en œuvre des expériences simples impliquant l'air.\n\n« Connaître quelques propriétés de l'air (matérialité et compressibilité).\n\n» Indications de progression dans le cycle 2\n\nNous proposons pour ce dossier de traiter un objectif à chaque année du cycle : au CP,\nl'existence de l'air et de ses effets (séance 1) ; au CE1, la mise en œuvre d'expériences\n| impliquant l'air comme la mise en mouvement d'un objet (séance 2) ; au CE2, les propriétés\nde l'air (séances 3 et 4). Cette organisation peut être bien sûr modulée en fonction de la\nconfiguration de chaque classe et de l'école.\n\n» Matériel\n\nLe matériel nécessaire est indiqué dans chaque séance.\n\nPrendre conscience de l'existence et des effets de l'air\npar l'observation de phénomènes naturels et la mise en\nmouvement de différents objets.\n\nEJ Je m'interroge\n\nPour aborder cette première séance sur l'air, l'enseignant-e\npeut se servir du point météo quotidien et faire observer\naux élèves le vent qui souffle dehors. On interroge alors les\nélèves :\n\nQu'est-ce que c'est le vent pour vous ? Connaissez-vous\ndes objets qui utilisent le vent pour fonctionner ? Des\nobjets qui font du vent ?\n\nOn peut attendre des réponses du type : « le vent, c'est de\nl'air », « c'est de l'air qui bouge ». Pour les objets qui fonc-\ntionnent avec du vent, les élèves peuvent citer par exemple\nle cerf-volant, le bateau à voile, la flute ou autre instrument\nà vent, mais aussi les éoliennes. Pour les objets qui font\ndu vent, il peut y avoir des objets du quotidien comme le\nsèche-cheveux, le ventilateur\n\nAprès ce premier échange avec les élèves, l'enseignant-e\ninterroge à nouveau les élèves :\n\nNous avons vu que le vent, c'est de l'air qui bouge et\nque beaucoup d'objets utilisent ou font de l'air en mou-\nvement. Mais y a-t-il de l'air partout autour de nous ?\nComment pouvons-nous le montrer ?\n\nSi les réponses des élèves sont majoritairement « oui » et\nqu'il est invisible, certains pensent qu'il n'y a de l'air que\ndehors. Il est alors possible de répondre que nous respirons\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nde l'air et que cela signifie qu'il est partout autour de nous.\nL'enseignant-e propose alors aux élèves de faire des expéri-\nmentations simples pour vérifier son existence et ses effets.\n\nI J'expérimente\n\nL'enseignant-e place les élèves par groupes de 4. On a pré-\nparé au préalable pour chaque groupe le matériel suivant :\nune bouteille de plastique vide, un ballon de baudruche,\nune paille, une bassine à moitié remplie d'eau et un gobelet\nen plastique.\n\nL'enseignant-e propose aux élèves d'utiliser ce matériel pour\nrépondre à la question que nous nous posons : l'air existe-t-il\ntout autour de nous ? Comment peut-on le montrer ?\n\nOn laisse alors les élèves expérimenter librement avec le\nmatériel proposé. Quand un groupe propose une expéri-\nmentation pertinente, on la schématise collectivement et\nl'enseignant-e note au tableau les résultats et la conclusion\n(sous forme de dictée à l'adulte).\n\nOn distribue alors la fiche élève 1. Elle propose de trier\ndifférents objets qui fonctionnent ou produisent du vent en\nutilisant les images de la fiche à découper (— sur CD-Rom)\nà imprimer au format A5. On y trouve également quelques-\nunes des expériences possibles avec le matériel distribué.\nElle peut venir en complément des expérimentations libres\ndes élèves ou être utilisée en remplacement de celles-ci.\n\n2 Je retiens\n\n« L'air existe tout autour de nous. Il est invisible et n'a\npas d’odeur.\n\n* Le vent est de l'air en mouvement.\n\n« L'air peut se déplacer ou faire fonctionner des objets.\n\nQu'est-ce que la matière ? » 41\n\nFiche enseignant\n\n| Séance 2 FF\n\nMettre en œuvre des expériences simples impliquant\nl'air : mettre en mouvement un objet avec de l'air, avec\ndu vent.\n\n[2] Je m'interroge\n\nL'enseignant-e demande aux élèves de noter rapidement\nsur leur classeur ou cahier de sciences ce dont ils se sou-\nviennent sur l'air. Après les avoir écoutés, on résumera ces\nconnaissances. On propose alors aux élèves un défi :\n\n| Comment mettre en mouvement un objet avec de l'air\n| ou avec du vent (qui est de l'air en mouvement) ?\n\n[11] J'expérimente\n\nLes élèves peuvent travailler seuls ou par groupe de 2.\nL'enseignant-e met à disposition des élèves le matériel\nsuivant : bouchons en liège, baguettes de bois, feuilles de\npapier cartonnées type Canson, punaises ou épingles, pis-\ntolet à colle, paires de ciseaux, feutres de couleur.\n\nLes élèves peuvent expérimenter librement dans un pre-\nmier temps. Lorsqu'ils ont réussi à créer leur objet et que\ncelui-ci se met effectivement en mouvement grâce à l'air\nou au vent, ils peuvent réaliser leur fiche technique sur la\nfiche élève 2.\n\nOn pourra utiliser la fiche documentaire 1 pour guider les\nélèves en panne d'inspiration.\n\nJe retiens\n\n+ En fabriquant un moulin à vent, j'ai pu vérifier que le\ndéplacement de l'air peut mettre en mouvement un\nobjet.\n\n«Lair peut aussi permettre de faire fonctionner des\nobjets, comme par exemple le bateau à voile.\n\n| Séance 3 FFT\n\nConnaitre quelques propriétés de l'air (matérialité).\n\na Je m’interroge\n\nL'enseignant-e demande aux élèves de dire ce dont ils se\nsouviennent concernant l'air. On réactive ainsi des élé-\nments propres aux séances précédentes : l'air est partout\nautour de nous. Le vent est de l'air en mouvement. Il est\ninvisible. Il peut déplacer des objets ou en faire fonctionner\nd'autres.\n\nL'enseignant-e pose alors à la classe une autre question :\n\n| Mais alors, l'air est-il une matière ? Peut-on par exemple\nle peser ? Est-ce que l'air occupe de l'espace ? Peut-on le\n{ passer d'un récipient à un autre ?\n\nL'enseignant-e propose aux élèves de réfléchir à ces ques-\ntions par l'expérimentation.\n\nI J'expérimente\n\nL'enseignant-e propose de faire trois expériences : masse,\noccupation de l'espace et transvasement. Ces trois expé-\nriences permettront de vérifier la matérialité de l'air.\n\nLes élèves sont placés par groupes de 3 ou 4.\n\n42 « Qu'est-ce que la matière ?\n\n= Expérience 1 : l'air a-t-il une masse ?\n\nUn tiers des groupes réfléchit à la première question posée :\ncomment peser l'air ?\n\nL'enseignant-e a mis en évidence le matériel à disposi-\ntion : balance électronique, pompe, ballon (de basket par\nexemple).\n\nDes élèves proposent assez rapidement de dégonfler un bal-\nlon, de le peser puis de le gonfler et de le peser de nouveau.\n= Expérience 2 : l'air occupe-t-il de l'espace ?\n\nLe deuxième tiers des groupes cherche à répondre à la\nseconde question : « comment vérifier que l'air occupe de\nl'espace ? »\n\nLe matériel à disposition est le suivant : bassines remplies\nd'eau à la moitié, gobelets en plastique.\n\nLes élèves peuvent ainsi plonger le gobelet retourné dans\nla bassine d'eau et, en le penchant légèrement, voir l'air\nqui s'échappe. L'eau rend l'air visible et permet de voir qu'il\noccupe de l'espace.\n\n= Expérience 3 : l'air peut-il être transvasé ?\n\nLe dernier tiers des groupes se penche lui sur la question :\n« Peut-on faire passer de l'air d'un récipient à un autre ? »\nChaque groupe a à sa disposition le matériel suivant :\nbassine d'eau à moitié remplie, gobelet en plastique et\nbouteille en plastique de 50 cL vide.\n\nL'enseignant-e laisse les élèves formuler leurs différentes\npropositions, les dessiner, schématiser, légender et rédiger\nles explications correspondantes. Puis le matériel est distri-\nbué. Les élèves peuvent ainsi tenter de transvaser l'air de la\nbouteille vide, pleine d'air, ou d'un gobelet à un autre, l'air\nchassant l'eau du deuxième gobelet retourné mais rempli\nd'eau.\n\nOn distribue ensuite la fiche élève 3 qui permet de valider\nles expérimentations menées précédemment.\n\n2 Je retiens\n\n+ L'air a une masse et occupe de l'espace. Il peut être\ntransvasé (passer d’un récipient à un autre) et prend la\nforme du récipient qui le contient. IL est invisible mais\non peut le voir dans l'eau.\n\n* L'air est un gaz. Toutes ces propriétés font de l'air une\nmatière, comme les solides et les liquides.\n\n PTT)\n\nConnaitre quelques propriétés de l'air (la compressibilité).\n\na Je m'interroge\n\nL'enseignant-e utilise, pour introduire cette séance, un\nballon de basket légèrement dégonflé. En le regonflant, il\ndemande aux élèves :\n\n| Est-ce que l'on peut diminuer le volume occupé par\n{l'air ? Est-ce que l'on peut comprimer l'air ?\n\nOn peut attendre des élèves des réponses du type : « oui,\non peut faire rentrer de l'air en le forçant comme dans un\nballon ou dans les pneus d’un vélo», « quand on enlève la\npompe à vélo après avoir gonflé un pneu, on entend l'air\nqu'on a forcé à entrer sortir tout seul ».\n\nL'enseignant-e propose alors d'utiliser une seringue pour\nexpérimenter cette question.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n J'expérimente\n\nL'idéal est d'avoir a sa disposition une seringue par groupe\nde 2 ou 4 élèves. On distribue également aux élèves la |\nfiche élève 4.\n\nL'enseignant-e propose d’enfermer de l'air dans la seringue\nen la bouchant avec le pouce puis d'appuyer sur le piston.\nAvant de faire cette expérience, on propose aux élèves\ndans un premier temps d'imaginer ce qui va se passer et\nde noter sur sa fiche d'expérimentation ce que l'on pense,\nson hypothèse.\n\nPuis l'enseignant-e demande de réaliser l'expérience et |\nd'en faire sur la fiche un schéma légendé. Chaque groupe\nnote le résultat observé et, après avoir entendu les résul-\ntats des différents groupes, on rédige collectivement une\nconclusion.\n\nES\n\nRemarque : Certains groupes remarqueront sans doute\nque le piston reprend sa position de départ lorsqu'on le\n\n| relâche. L'air reprend son volume initial : c'est pourquoi, par\n\nexemple, il s'échappe d'un ballon de basket percé ou d'un\npneu de vélo crevé.\n\n2 Je retiens\n\n+ On peut diminuer le volume occupé par l'air dans la\nseringue : il y a autant d'air mais il prend moins de place.\nIl est comprimé.\n\n= On dit que l'air est compressible.\n\nL'air existe tout autour de nous. Il est invisible et n'a pas d'odeur.\n\nLe vent est de l'air en mouvement.\n\nIN\n\nAOL\n\nGz\n\nFen, 2\nF7 F4 pt, rid\n\n2\n\nBateau à voile\n\nLo is Pen\nÉolienne\n\nFlute\n\nDes objets peuvent mettre de\n\nl'air en mouvement.\n\nAspirateur\n\nSèche-cheveux\n\nÉventail\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nQu'est-ce que la matière ? » 43",
    guidePageDecisions: [
      {
        page: 41,
        confidence: 93,
        score: 24,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "par groupes",
        ],
        phaseMarkers: ["je m'interroge", "j'experimente", "je retiens"],
        teacherLanguageMarkers: [
          "enseignant",
          "eleves",
          "on interroge",
          "on distribue",
          "par groupes",
          "groupe",
        ],
        studentLike: true,
      },
      {
        page: 42,
        confidence: 92,
        score: 20,
        included: true,
        strongMarkers: [
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "par groupes",
        ],
        phaseMarkers: ["je m'interroge", "j'experimente", "je retiens"],
        teacherLanguageMarkers: [
          "enseignant",
          "eleves",
          "on propose",
          "on distribue",
          "par groupes",
          "groupe",
        ],
        studentLike: true,
      },
      {
        page: 43,
        confidence: 89,
        score: 12,
        included: true,
        strongMarkers: ["l'enseignant", "enseignant-e", "aux eleves"],
        phaseMarkers: ["j'experimente", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on propose", "on distribue", "groupe"],
        studentLike: true,
      },
      {
        page: 44,
        confidence: 70,
        score: -1,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: false,
      },
    ],
    skippedProbePages: [44],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-05",
    dossierNumber: 5,
    partNumber: 2,
    partTitle: "Comment reconnaître le monde vivant ?",
    title: "Animal, végétal ou minéral ?",
    guidePages: [59],
    guidePageCount: 1,
    objectives: [
      "+ Identifier ce qui est animal, végétal, minéral ou élaboré par des êtres vivants.",
      "il concerne les trois niveaux du cycle",
    ],
    progressionNote:
      "Ce dossier est introductif à la partie 2 du fichier (« Comment reconnaître le vivant 2»);\nen initiation, réactivation ou approfondissement\n+ Identifier les différentes caractéristiques du vivant (s'alimenter, se reproduire).\n» Connaître les différences entre un animal et un végétal.\ndes connaissances) avec des fiches élève et fiches d'évaluation adaptées à chaque niveau\ndu cycle 2.\nIdentifier ce qui est animal, végétal, minéral ou élaboré par\ndes êtres vivants.\nIdentifier les différentes caractéristiques du vivant (s'ali-\nmenter, se reproduire...).\nConnaitre les différences entre un animal et un végétal.\nE Je m'interroge\nPour débuter cette séance, l'enseignant-e peut, en fonction\ndes espaces à sa disposition, aller dans le jardin de l’école\npour observer ce qu'on y voit : végétaux (arbres), animaux\nsi élevage ou oiseaux) et minéraux (pierres). Si cette mise\nen activité n'est pas possible, l'enseignant-e présente aux\nélèves différentes images : des animaux, des végétaux et\ndes objets : un arbre, un chien, des fleurs, une pelle, des\ncailloux, des fruits et légumes, du sable, des escargots.\nsur CD-Rom).\nOn demande aux élèves de décrire ce qu'ils voient puis on\nles interroge :\nCes images (ou, dans le jardin, ces plantes, pierres,\noiseaux) représentent-elles toutes des êtres vivants ?\nComment pouvez-vous le justifier ?\nOn peut attendre les réponses suivantes : « les animaux\nsont des êtres vivants, ils peuvent grandir », « les objets\nne sont pas des êtres vivants, ils n'ont pas de vie, ils ne\nrespirent pas » , « les plantes grandissent », « les animaux\net végétaux sont tous des êtres vivants, ils grandissent et\nont des petits... ».\nEn fonction des connaissances déjà acquises (les animaux\net les végétaux sont des êtres vivants), cette phase d'inter-\nrogation peut se prolonger par ce qui différencie un animal\nd'un végétal. Pour cela, l'enseignant-e rappelle donc que les\nanimaux et les végétaux font partie des êtres vivants. On\ninterroge alors les élèves :\nMais alors, qu'est-ce qui différencie un animal d'un\nvégétal ?\nLes réponses des élèves peuvent être : « un animal, ça\nbouge... alors qu’une plante, ça ne bouge pas ! ». Certains\npeuvent ajouter : « oui, mais les plantes aussi bougent avec le\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\nvent ! » Des élèves peuvent alors préciser : « un animal\nse déplace, pas un végétal ».\nEŒ Je recherche\nSelon le niveau de la classe ou du groupe d'élèves, trois\nfiches élève sont proposées :\n— niveau initial : fiche élève 1 et fiche à découper (— sur\nCD-Rom) à imprimer en AS ;\n— niveau intermédiaire : fiche élève 2 ;\n— niveau fin de cycle : fiche élève 3 ;\nL'enseignant-e distribue alors aux élèves la fiche correspon-\ndante qui permet de valider le vocabulaire (être vivant ou\nnon vivant, animal, végétal, minéral ou construit par un être\nvivant) et de savoir ce qui caractérise un être vivant avec\nune progression adaptée. Ce qui différencie un animal d'un\nvégétal est traité dans la fiche élève 3.\nJeretiens &\n« On peut distinguer autour de nous ce qui est vivant et\nce qui est non vivant. Les animaux et les végétaux sont\ndes êtres vivants. a\nUn être vivant grandit et peut avoir des petits. Il a\nbesoin de respirer, de se nourrir et de boire (eau) pour\nvivre.\nC2 Jeretiens SS\n«Dans la nature, on peut trouver une grande variété\nd'êtres vivants (animaux et végétaux) ou des choses\nfabriquées par des êtres vivants (ruche, terrier).\nOn appelle minéral un élément naturel (roches, galets,\neau...) qui n'est pas vivant.\nJeretiens FF &\n« Ce qui fait la différence entre les animaux et les végé-\ntaux, c'est leur manière de se nourrir.\n«Les animaux ont besoin de manger d'autres êtres\nvivants : des végétaux et/ou des animaux.\n» Les végétaux ont seulement besoin d’eau, de lumière\net de sels minéraux pour se développer.\nComment reconnaître le monde vivant ? « 59\nFiche enseignant",
    material: [],
    sessions: [
      {
        number: 1,
        title: "Séance 1 [À VÉRIFIER]",
        rawText:
          "Animal, végétal ou minéral ?\n\n| »Objectifs\n\n| + Identifier ce qui est animal, végétal, minéral ou élaboré par des êtres vivants. |\n\n|\n|\n\n| il concerne les trois niveaux du cycle\n\n> Repères de progression dans le cycle 2\nCe dossier est introductif à la partie 2 du fichier (« Comment reconnaître le vivant 2»);\n(en initiation, réactivation ou approfondissement |\n\n+ Identifier les différentes caractéristiques du vivant (s'alimenter, se reproduire). |\n» Connaître les différences entre un animal et un végétal.\n\n| des connaissances) avec des fiches élève et fiches d'évaluation adaptées à chaque niveau |\n\n| du cycle 2.\n\n|\n)\n\nIdentifier ce qui est animal, végétal, minéral ou élaboré par\ndes êtres vivants.\nIdentifier les différentes caractéristiques du vivant (s'ali-\n\nmenter, se reproduire...).\nConnaitre les différences entre un animal et un végétal.\n\nE Je m'interroge\n\nPour débuter cette séance, l'enseignant-e peut, en fonction\ndes espaces à sa disposition, aller dans le jardin de l’école\npour observer ce qu'on y voit : végétaux (arbres), animaux\n(si élevage ou oiseaux) et minéraux (pierres). Si cette mise\nen activité n'est pas possible, l'enseignant-e présente aux\nélèves différentes images : des animaux, des végétaux et\ndes objets : un arbre, un chien, des fleurs, une pelle, des\ncailloux, des fruits et légumes, du sable, des escargots.\n(= sur CD-Rom).\n\nOn demande aux élèves de décrire ce qu'ils voient puis on\nles interroge :\n\nCes images (ou, dans le jardin, ces plantes, pierres,\noiseaux) représentent-elles toutes des êtres vivants ?\nComment pouvez-vous le justifier ?\n\nOn peut attendre les réponses suivantes : « les animaux\nsont des êtres vivants, ils peuvent grandir », « les objets\nne sont pas des êtres vivants, ils n'ont pas de vie, ils ne\nrespirent pas » , « les plantes grandissent », « les animaux\net végétaux sont tous des êtres vivants, ils grandissent et\nont des petits... ».\n\nEn fonction des connaissances déjà acquises (les animaux\n\net les végétaux sont des êtres vivants), cette phase d'inter- |\n\nrogation peut se prolonger par ce qui différencie un animal\nd'un végétal. Pour cela, l'enseignant-e rappelle donc que les\nanimaux et les végétaux font partie des êtres vivants. On\ninterroge alors les élèves :\n\nMais alors, qu'est-ce qui différencie un animal d'un\nvégétal ?\n\nLes réponses des élèves peuvent être : « un animal, ça\nbouge... alors qu’une plante, ça ne bouge pas ! ». Certains\npeuvent ajouter : « oui, mais les plantes aussi bougent avec le\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nvent ! » Des élèves peuvent alors préciser : « un animal\nse déplace, pas un végétal ».\n\nEŒ Je recherche\n\nSelon le niveau de la classe ou du groupe d'élèves, trois\nfiches élève sont proposées :\n\n— niveau initial : fiche élève 1 et fiche à découper (— sur\nCD-Rom) à imprimer en AS ;\n\n— niveau intermédiaire : fiche élève 2 ;\n\n— niveau fin de cycle : fiche élève 3 ;\n\nL'enseignant-e distribue alors aux élèves la fiche correspon-\ndante qui permet de valider le vocabulaire (être vivant ou\nnon vivant, animal, végétal, minéral ou construit par un être\nvivant) et de savoir ce qui caractérise un être vivant avec\nune progression adaptée. Ce qui différencie un animal d'un\nvégétal est traité dans la fiche élève 3.\n\n2 Jeretiens &\n\n« On peut distinguer autour de nous ce qui est vivant et\nce qui est non vivant. Les animaux et les végétaux sont\ndes êtres vivants. a\n\n= Un être vivant grandit et peut avoir des petits. Il a\nbesoin de respirer, de se nourrir et de boire (eau) pour\nvivre.\n\nC2 Jeretiens SS\n\n«Dans la nature, on peut trouver une grande variété\nd'êtres vivants (animaux et végétaux) ou des choses\nfabriquées par des êtres vivants (ruche, terrier).\n\n= On appelle minéral un élément naturel (roches, galets,\neau...) qui n'est pas vivant.\n\n22 Jeretiens FF &\n\n« Ce qui fait la différence entre les animaux et les végé-\ntaux, c'est leur manière de se nourrir.\n\n«Les animaux ont besoin de manger d'autres êtres\nvivants : des végétaux et/ou des animaux.\n\n» Les végétaux ont seulement besoin d’eau, de lumière\net de sels minéraux pour se développer.\n\nComment reconnaître le monde vivant ? « 59\n\nFiche enseignant",
        phases: [
          {
            title: "Séance 1",
            detail:
              "Animal, végétal ou minéral ?\n\n| »Objectifs\n\n| + Identifier ce qui est animal, végétal, minéral ou élaboré par des êtres vivants. |\n\n|\n|\n\n| il concerne les trois niveaux du cycle\n\n> Repères de progression dans le cycle 2\nCe dossier est introductif à la partie 2 du fichier (« Comment reconnaître le vivant 2»);\n(en initiation, réactivation ou approfondissement |\n\n+ Identifier les différentes caractéristiques du vivant (s'alimenter, se reproduire). |\n» Connaître les différences entre un animal et un végétal.\n\n| des connaissances) avec des fiches élève et fiches d'évaluation adaptées à chaque niveau |\n\n| du cycle 2.\n\n|\n)\n\nIdentifier ce qui est animal, végétal, minéral ou élaboré par\ndes êtres vivants.\nIdentifier les différentes caractéristiques du vivant (s'ali-\n\nmenter, se reproduire...).\nConnaitre les différences entre un animal et un végétal.\n\nE Je m'interroge\n\nPour débuter cette séance, l'enseignant-e peut, en fonction\ndes espaces à sa disposition, aller dans le jardin de l’école\npour observer ce qu'on y voit : végétaux (arbres), animaux\n(si élevage ou oiseaux) et minéraux (pierres). Si cette mise\nen activité n'est pas possible, l'enseignant-e présente aux\nélèves différentes images : des animaux, des végétaux et\ndes objets : un arbre, un chien, des fleurs, une pelle, des\ncailloux, des fruits et légumes, du sable, des escargots.\n(= sur CD-Rom).\n\nOn demande aux élèves de décrire ce qu'ils voient puis on\nles interroge :\n\nCes images (ou, dans le jardin, ces plantes, pierres,\noiseaux) représentent-elles toutes des êtres vivants ?\nComment pouvez-vous le justifier ?\n\nOn peut attendre les réponses suivantes : « les animaux\nsont des êtres vivants, ils peuvent grandir », « les objets\nne sont pas des êtres vivants, ils n'ont pas de vie, ils ne\nrespirent pas » , « les plantes grandissent », « les animaux\net végétaux sont tous des êtres vivants, ils grandissent et\nont des petits... ».\n\nEn fonction des connaissances déjà acquises (les animaux\n\net les végétaux sont des êtres vivants), cette phase d'inter- |\n\nrogation peut se prolonger par ce qui différencie un animal\nd'un végétal. Pour cela, l'enseignant-e rappelle donc que les\nanimaux et les végétaux font partie des êtres vivants. On\ninterroge alors les élèves :\n\nMais alors, qu'est-ce qui différencie un animal d'un\nvégétal ?\n\nLes réponses des élèves peuvent être : « un animal, ça\nbouge... alors qu’une plante, ça ne bouge pas ! ». Certains\npeuvent ajouter : « oui, mais les plantes aussi bougent avec le\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nvent ! » Des élèves peuvent alors préciser : « un animal\nse déplace, pas un végétal ».\n\nEŒ Je recherche\n\nSelon le niveau de la classe ou du groupe d'élèves, trois\nfiches élève sont proposées :\n\n— niveau initial : fiche élève 1 et fiche à découper (— sur\nCD-Rom) à imprimer en AS ;\n\n— niveau intermédiaire : fiche élève 2 ;\n\n— niveau fin de cycle : fiche élève 3 ;\n\nL'enseignant-e distribue alors aux élèves la fiche correspon-\ndante qui permet de valider le vocabulaire (être vivant ou\nnon vivant, animal, végétal, minéral ou construit par un être\nvivant) et de savoir ce qui caractérise un être vivant avec\nune progression adaptée. Ce qui différencie un animal d'un\nvégétal est traité dans la fiche élève 3.\n\n2 Jeretiens &\n\n« On peut distinguer autour de nous ce qui est vivant et\nce qui est non vivant. Les animaux et les végétaux sont\ndes êtres vivants. a\n\n= Un être vivant grandit et peut avoir des petits. Il a\nbesoin de respirer, de se nourrir et de boire (eau) pour\nvivre.\n\nC2 Jeretiens SS\n\n«Dans la nature, on peut trouver une grande variété\nd'êtres vivants (animaux et végétaux) ou des choses\nfabriquées par des êtres vivants (ruche, terrier).\n\n= On appelle minéral un élément naturel (roches, galets,\neau...) qui n'est pas vivant.\n\n22 Jeretiens FF &\n\n« Ce qui fait la différence entre les animaux et les végé-\ntaux, c'est leur manière de se nourrir.\n\n«Les animaux ont besoin de manger d'autres êtres\nvivants : des végétaux et/ou des animaux.\n\n» Les végétaux ont seulement besoin d’eau, de lumière\net de sels minéraux pour se développer.\n\nComment reconnaître le monde vivant ? « 59\n\nFiche enseignant",
          },
        ],
      },
    ],
    guideText:
      "Animal, végétal ou minéral ?\n\n| »Objectifs\n\n| + Identifier ce qui est animal, végétal, minéral ou élaboré par des êtres vivants. |\n\n|\n|\n\n| il concerne les trois niveaux du cycle\n\n> Repères de progression dans le cycle 2\nCe dossier est introductif à la partie 2 du fichier (« Comment reconnaître le vivant 2»);\n(en initiation, réactivation ou approfondissement |\n\n+ Identifier les différentes caractéristiques du vivant (s'alimenter, se reproduire). |\n» Connaître les différences entre un animal et un végétal.\n\n| des connaissances) avec des fiches élève et fiches d'évaluation adaptées à chaque niveau |\n\n| du cycle 2.\n\n|\n)\n\nIdentifier ce qui est animal, végétal, minéral ou élaboré par\ndes êtres vivants.\nIdentifier les différentes caractéristiques du vivant (s'ali-\n\nmenter, se reproduire...).\nConnaitre les différences entre un animal et un végétal.\n\nE Je m'interroge\n\nPour débuter cette séance, l'enseignant-e peut, en fonction\ndes espaces à sa disposition, aller dans le jardin de l’école\npour observer ce qu'on y voit : végétaux (arbres), animaux\n(si élevage ou oiseaux) et minéraux (pierres). Si cette mise\nen activité n'est pas possible, l'enseignant-e présente aux\nélèves différentes images : des animaux, des végétaux et\ndes objets : un arbre, un chien, des fleurs, une pelle, des\ncailloux, des fruits et légumes, du sable, des escargots.\n(= sur CD-Rom).\n\nOn demande aux élèves de décrire ce qu'ils voient puis on\nles interroge :\n\nCes images (ou, dans le jardin, ces plantes, pierres,\noiseaux) représentent-elles toutes des êtres vivants ?\nComment pouvez-vous le justifier ?\n\nOn peut attendre les réponses suivantes : « les animaux\nsont des êtres vivants, ils peuvent grandir », « les objets\nne sont pas des êtres vivants, ils n'ont pas de vie, ils ne\nrespirent pas » , « les plantes grandissent », « les animaux\net végétaux sont tous des êtres vivants, ils grandissent et\nont des petits... ».\n\nEn fonction des connaissances déjà acquises (les animaux\n\net les végétaux sont des êtres vivants), cette phase d'inter- |\n\nrogation peut se prolonger par ce qui différencie un animal\nd'un végétal. Pour cela, l'enseignant-e rappelle donc que les\nanimaux et les végétaux font partie des êtres vivants. On\ninterroge alors les élèves :\n\nMais alors, qu'est-ce qui différencie un animal d'un\nvégétal ?\n\nLes réponses des élèves peuvent être : « un animal, ça\nbouge... alors qu’une plante, ça ne bouge pas ! ». Certains\npeuvent ajouter : « oui, mais les plantes aussi bougent avec le\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nvent ! » Des élèves peuvent alors préciser : « un animal\nse déplace, pas un végétal ».\n\nEŒ Je recherche\n\nSelon le niveau de la classe ou du groupe d'élèves, trois\nfiches élève sont proposées :\n\n— niveau initial : fiche élève 1 et fiche à découper (— sur\nCD-Rom) à imprimer en AS ;\n\n— niveau intermédiaire : fiche élève 2 ;\n\n— niveau fin de cycle : fiche élève 3 ;\n\nL'enseignant-e distribue alors aux élèves la fiche correspon-\ndante qui permet de valider le vocabulaire (être vivant ou\nnon vivant, animal, végétal, minéral ou construit par un être\nvivant) et de savoir ce qui caractérise un être vivant avec\nune progression adaptée. Ce qui différencie un animal d'un\nvégétal est traité dans la fiche élève 3.\n\n2 Jeretiens &\n\n« On peut distinguer autour de nous ce qui est vivant et\nce qui est non vivant. Les animaux et les végétaux sont\ndes êtres vivants. a\n\n= Un être vivant grandit et peut avoir des petits. Il a\nbesoin de respirer, de se nourrir et de boire (eau) pour\nvivre.\n\nC2 Jeretiens SS\n\n«Dans la nature, on peut trouver une grande variété\nd'êtres vivants (animaux et végétaux) ou des choses\nfabriquées par des êtres vivants (ruche, terrier).\n\n= On appelle minéral un élément naturel (roches, galets,\neau...) qui n'est pas vivant.\n\n22 Jeretiens FF &\n\n« Ce qui fait la différence entre les animaux et les végé-\ntaux, c'est leur manière de se nourrir.\n\n«Les animaux ont besoin de manger d'autres êtres\nvivants : des végétaux et/ou des animaux.\n\n» Les végétaux ont seulement besoin d’eau, de lumière\net de sels minéraux pour se développer.\n\nComment reconnaître le monde vivant ? « 59\n\nFiche enseignant",
    guidePageDecisions: [
      {
        page: 59,
        confidence: 92,
        score: 20,
        included: true,
        strongMarkers: [
          "objectifs",
          "reperes de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
        ],
        phaseMarkers: ["je m'interroge", "je recherche"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on demande", "groupe"],
        studentLike: true,
      },
      {
        page: 60,
        confidence: 85,
        score: 0,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: false,
      },
    ],
    skippedProbePages: [60],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-06",
    dossierNumber: 6,
    partNumber: 2,
    partTitle: "Comment reconnaître le monde vivant ?",
    title: "Les végétaux, ça vit et grandit comment ?",
    guidePages: [69, 70],
    guidePageCount: 2,
    objectives: [
      "« Connaitre le processus de germination d'une graine en mettant en évidence son besoin",
      "en eau.",
      "« Être capable de conduire une culture en identifiant quelques besoins vitaux des végétaux.",
      "« Construire le cycle de vie d'un végétal (de la graine à la plante, de la fleur au fruit, du fruit",
      "à la graine).",
    ],
    progressionNote:
      "Ce dossier aborde le développement des végétaux (conditions de germination, besoins\nvitaux et cycle de vie). On mettra en évidence les besoins en eau de la graine lors du pro-\ncessus de germination en CP. Les principaux besoins vitaux des végétaux seront abordés en\nCE1 à travers la réalisation d’une culture. Enfin, nous réserverons la construction du cycle\nde vie d'un végétal au CE2. Nous proposons pour cela des fiches élève et d'évaluation de\nFiche enseignant\nniveaux différents.",
    material: ["Graines de lentilles, radis, petits pois, haricots. Godets, terreau, coton."],
    sessions: [
      {
        number: 1,
        title:
          "Connaître le processus de germination d'une graine en mettant en évidence son besoin en eau.",
        rawText:
          "| Séance 1 JF\n\nConnaître le processus de germination d'une graine en\nmettant en évidence son besoin en eau.\n\na Je m’interroge\n\nÀ la suite d'une sortie nature ou d'une visite au jardin, 'en-\nseignant-e a apporté plusieurs types de graines en classe :\nlentilles, radis, petits pois. On les présente aux élèves et on\nleur demande ce que c'est. « Ce sont des graines. Elles sont\ndifférentes. » On précisera alors qu'il s'agit de graines de\nlentilles, de petits pois et de radis. Après les avoir obser-\nvées (oeil nu, loupe, loupe binoculaire, caméra usb), l'ensei-\ngnant-e interroge à nouveau les élèves :\n\n[| De quoi ont besoin ces graines pour germer ?\n\nOn peut attendre les propositions suivantes : « elles ont\nbesoin d’eau », « elles ont besoin de lumière », « elles ont\nbesoin de chaleur », « elles ont besoin de terre ».\n\nÀ la suite de ces réponses qui sont notées au tableau, l'en-\nseignant-e propose aux élèves de mettre en place un pro-\ntocole expérimental traitant l’un de ces besoins : la graine\na-t-elle besoin d’eau pour germer ?\n\n J'expérimente\n\nLes élèves sont placés par groupes de 2. Chaque groupe doit\nmettre en place un protocole expérimental pour vérifier si\nl'eau est nécessaire à la graine pour germer. Il est souhai-\ntable de ne pas mélanger les graines et de bien identifier\nchaque semis. En effet, les vitesses de germination peuvent\nêtre différentes d'un végétal à un autre. Afin de bien obser-\nver le début de la germination, il est conseillé de ne pas\nenterrer trop profondément la graine ou de privilégier le\ncoton comme support (choix à mener en parallèle si aucun\nélève ne choisit cette solution).\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nB. : Il est important dans la construction de ce protocole\nde bien mettre en place une expérience et une contre expé-\nrience (une culture sans eau, une culture avec eau). Le choix\nde plusieurs graines permet de généraliser les conclusions\ntirées de notre expérimentation.\n\nLes élèves peuvent utiliser le matériel à disposition : godets,\nterreau, coton.\n\nLes observations de l'expérimentation sont réalisées sur la\nfiche élève 1. Pour l'exercice 1 du verso, les étiquettes sont\ndisponibles dans la fiche à découper (— sur CD-Rom). Il\nen est de même pour la fiche d'évaluation correspondante.\n\n2 Je retiens\n\n* Pour germer, la graine a besoin d'eau. Une graine ne\npeut pas germer sans eau.\n\n«La graine porte en elle un bébé plante : la plantule.\nLa germination, c'est quand la graine « se réveille ».",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "À la suite d'une sortie nature ou d'une visite au jardin, 'en-\nseignant-e a apporté plusieurs types de graines en classe :\nlentilles, radis, petits pois. On les présente aux élèves et on\nleur demande ce que c'est. « Ce sont des graines. Elles sont\ndifférentes. » On précisera alors qu'il s'agit de graines de\nlentilles, de petits pois et de radis. Après les avoir obser-\nvées (oeil nu, loupe, loupe binoculaire, caméra usb), l'ensei-\ngnant-e interroge à nouveau les élèves :\n\n[| De quoi ont besoin ces graines pour germer ?\n\nOn peut attendre les propositions suivantes : « elles ont\nbesoin d’eau », « elles ont besoin de lumière », « elles ont\nbesoin de chaleur », « elles ont besoin de terre ».\n\nÀ la suite de ces réponses qui sont notées au tableau, l'en-\nseignant-e propose aux élèves de mettre en place un pro-\ntocole expérimental traitant l’un de ces besoins : la graine\na-t-elle besoin d’eau pour germer ?",
          },
          {
            title: "J'expérimente",
            detail:
              "Les élèves sont placés par groupes de 2. Chaque groupe doit\nmettre en place un protocole expérimental pour vérifier si\nl'eau est nécessaire à la graine pour germer. Il est souhai-\ntable de ne pas mélanger les graines et de bien identifier\nchaque semis. En effet, les vitesses de germination peuvent\nêtre différentes d'un végétal à un autre. Afin de bien obser-\nver le début de la germination, il est conseillé de ne pas\nenterrer trop profondément la graine ou de privilégier le\ncoton comme support (choix à mener en parallèle si aucun\nélève ne choisit cette solution).\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nB. : Il est important dans la construction de ce protocole\nde bien mettre en place une expérience et une contre expé-\nrience (une culture sans eau, une culture avec eau). Le choix\nde plusieurs graines permet de généraliser les conclusions\ntirées de notre expérimentation.\n\nLes élèves peuvent utiliser le matériel à disposition : godets,\nterreau, coton.\n\nLes observations de l'expérimentation sont réalisées sur la\nfiche élève 1. Pour l'exercice 1 du verso, les étiquettes sont\ndisponibles dans la fiche à découper (— sur CD-Rom). Il\nen est de même pour la fiche d'évaluation correspondante.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "* Pour germer, la graine a besoin d'eau. Une graine ne\npeut pas germer sans eau.\n\n«La graine porte en elle un bébé plante : la plantule.\nLa germination, c'est quand la graine « se réveille ».",
          },
        ],
      },
      {
        number: 2,
        title:
          "Être capable de conduire une culture en identifiant quelques besoins vitaux des végétaux. Je m' interroge",
        rawText:
          "| Séance 2 AFF\n\nÊtre capable de conduire une culture en identifiant quelques\nbesoins vitaux des végétaux.\n\n8 Je m' interroge\n\nL'enseignant-e explique à ses élèves : « Nous avons vu que\nles graines, pour germer, ont besoin d'eau. Maintenant,\nnous allons mettre en place une culture de graines de hari-\ncots. » Puis on interroge les élèves :\n\nD'après vous, de quoi ont besoin les haricots pour vivre\net pour bien grandir ?\n\nLes enfants vont sans doute formuler les réponses déjà\névoquées dans la séance 1 : eau, lumière, chaleur, terre.\n\nComment reconnaitre le monde vivant ? » 69\n\nLa qualité de l'eau utilisée (robinet, pluie, eau déminéra-\nlisée) ne sera probablement pas citée.\n\nL'enseignant-e propose alors aux élèves de se mettre par\ngroupes de 2 et de mettre en place un protocole pour véri-\nfier chacune de ces conditions de croissance. Il faudra lais-\nser germer les graines « normalement » dans un premier\ntemps puis commencer les expériences.\n\nCela peut être aussi l’occasion d'observer une graine et d'en\nidentifier les différentes parties (la plantule composée de la\ntigelle, de la radicule, de petites feuilles, puis l'enveloppe et\nles deux cotylédons). On demande aux élèves d'émettre des\nhypothèses sur le rôle et le devenir de chacun de ces élé-\nments que l'on vérifiera en observant leur développement.\n\nœ J'expérimente\n\nChaque groupe choisit de travailler sur une condition :\n\n— groupe « eau » ;\n\n— groupe « lumière » ;\n\n— groupe « terre » ;\n\n— groupe « sels minéraux ».\n\nOn rappelle qu'il faut pour chaque groupe un « plant\ntémoin » et qu’on ne doit modifier qu’une condition dans\nsa culture pour mesurer son importance.\n\nL'enseignant-e distribue alors la fiche élève 2. Elle servira\nau suivi de l'expérimentation et permettra de conclure sur\nles conditions nécessaires au bon développement des végé-\ntaux. Au verso, elle permettra de travailler le vocabulaire de\nla graine et du plant, ainsi que les premières étapes de son\ndéveloppement.\n\nJe retiens\n\n+ Chaque graine de haricot est formée d’une enveloppe\nprotectrice (le tégument), de deux cotylédons et d'une\nplantule qui comprend la tigelle (une petite tige), la\nradicule (petite racine) et deux petites feuilles.\n\n* Pour vivre, une plante a besoin d'eau, de lumière et de\nsels minéraux contenus dans la terre.",
        phases: [
          {
            title: "J'expérimente",
            detail:
              "Chaque groupe choisit de travailler sur une condition :\n\n— groupe « eau » ;\n\n— groupe « lumière » ;\n\n— groupe « terre » ;\n\n— groupe « sels minéraux ».\n\nOn rappelle qu'il faut pour chaque groupe un « plant\ntémoin » et qu’on ne doit modifier qu’une condition dans\nsa culture pour mesurer son importance.\n\nL'enseignant-e distribue alors la fiche élève 2. Elle servira\nau suivi de l'expérimentation et permettra de conclure sur\nles conditions nécessaires au bon développement des végé-\ntaux. Au verso, elle permettra de travailler le vocabulaire de\nla graine et du plant, ainsi que les premières étapes de son\ndéveloppement.",
          },
          {
            title: "Je retiens",
            detail:
              "+ Chaque graine de haricot est formée d’une enveloppe\nprotectrice (le tégument), de deux cotylédons et d'une\nplantule qui comprend la tigelle (une petite tige), la\nradicule (petite racine) et deux petites feuilles.\n\n* Pour vivre, une plante a besoin d'eau, de lumière et de\nsels minéraux contenus dans la terre.",
          },
        ],
      },
      {
        number: 3,
        title:
          "Construire le cycle de vie d'un végétal (de la graine à la plante, de la fleur au fruit, du fruit à la graine). N.B. : Cette séance, après un premier temps de mise en",
        rawText:
          "| séance 3 MFTT)\n\nConstruire le cycle de vie d'un végétal (de la graine à la\nplante, de la fleur au fruit, du fruit à la graine).\n\nN.B. : Cette séance, après un premier temps de mise en\nplace ou dans la continuité de la séance 2, se déroulera sur\nplusieurs semaines, par des moments courts d'observations\net de mesures.\n\na Je m'interroge\n\nL'enseignant-e propose ou a proposé dans la séance précé-\n\ndente de planter quelques graines de haricot afin d'obser-\n\nver leur développement. On interroge alors les élèves :\nComment, à votre avis, se déroule le cycle de vie d’un\nharicot, c'est-à-dire le déroulement de sa vie, depuis la\n\ngraine semée jusqu'à la fabrication de nouvelles graines,\npuis sa mort ?\n\nOn peut attendre des élèves les réponses suivantes :\n« la graine germe et un plant sort », « le plant devient\n\n70 « Comment reconnaître le monde vivant ?\n\nune plante », « la plante grandit, elle pousse », « elle a des\nfeuilles et parfois des fleurs », « elle donnera des graines\naussi ou des fruits », « les fleurs fanent au bout d'un\nmoment », « la plante, elle peut mourir ».\n\nL'enseignant-e propose alors à chaque élève de semer une\n\ngraine et de suivre son développement afin d'en distinguer <_—\n\nles différentes étapes.\n\n J'expérimente\n\nChaque élève a à sa disposition deux petits godets, du ter-\nreau, deux graines de haricot. Il notera son nom sur les deux\ngodets et les numérotera (1 et 2).\n\nOn commence par une première observation de la graine\n(l'enseignant-e les aura fait tremper dans l’eau la nuit pré-\ncédente). En ouvrant une graine, on identifie ainsi les dif-\nférentes parties (la plantule composée de la tigelle, de la\nradicule, de la feuille, puis l'enveloppe et les deux cotylé-\ndons). On demande aux élèves d'émettre des hypothèses\nsur le rôle et le devenir de chacun de ces éléments que l'on\nvérifiera en observant leur développement.\n\nOn procède ensuite au semis. Les élèves vont se question-\nner sur la profondeur du semis, la fréquence, et la quantité\nd'arrosage. Les deux godets leur permettent de les différen-\ncier. Chaque paramètre est noté et le suivi de la plantation\nest assuré sur la fiche élève 3 (recto). Les élèves peuvent en\nparallèle prendre des photos régulièrement de la croissance\nde leur plant. Le verso de la fiche élève 3 permet de faire\nla synthèse des connaissances acquises au fil de la culture.\n\n2 Je retiens\n\n« Lorsque les conditions sont réunies, la graine du haricot\ngerme : c'est la germination.\n\n* Puis la plantule grandit. Pendant sa croissance, la petite\nplante développe ses racines, sa tige et ses feuilles.\n\n« Ensuite, elle fleurit (floraison) puis donne des fruits\n(fructification).\n\n- Enfin, la plante se dessèche et meurt.\n\n«Les graines contenues dans le fruit donneront de\nnouveaux plants : c'est le cycle de vie du haricot.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e propose ou a proposé dans la séance précé-\n\ndente de planter quelques graines de haricot afin d'obser-\n\nver leur développement. On interroge alors les élèves :\nComment, à votre avis, se déroule le cycle de vie d’un\nharicot, c'est-à-dire le déroulement de sa vie, depuis la\n\ngraine semée jusqu'à la fabrication de nouvelles graines,\npuis sa mort ?\n\nOn peut attendre des élèves les réponses suivantes :\n« la graine germe et un plant sort », « le plant devient\n\n70 « Comment reconnaître le monde vivant ?\n\nune plante », « la plante grandit, elle pousse », « elle a des\nfeuilles et parfois des fleurs », « elle donnera des graines\naussi ou des fruits », « les fleurs fanent au bout d'un\nmoment », « la plante, elle peut mourir ».\n\nL'enseignant-e propose alors à chaque élève de semer une\n\ngraine et de suivre son développement afin d'en distinguer <_—\n\nles différentes étapes.",
          },
          {
            title: "J'expérimente",
            detail:
              "Chaque élève a à sa disposition deux petits godets, du ter-\nreau, deux graines de haricot. Il notera son nom sur les deux\ngodets et les numérotera (1 et 2).\n\nOn commence par une première observation de la graine\n(l'enseignant-e les aura fait tremper dans l’eau la nuit pré-\ncédente). En ouvrant une graine, on identifie ainsi les dif-\nférentes parties (la plantule composée de la tigelle, de la\nradicule, de la feuille, puis l'enveloppe et les deux cotylé-\ndons). On demande aux élèves d'émettre des hypothèses\nsur le rôle et le devenir de chacun de ces éléments que l'on\nvérifiera en observant leur développement.\n\nOn procède ensuite au semis. Les élèves vont se question-\nner sur la profondeur du semis, la fréquence, et la quantité\nd'arrosage. Les deux godets leur permettent de les différen-\ncier. Chaque paramètre est noté et le suivi de la plantation\nest assuré sur la fiche élève 3 (recto). Les élèves peuvent en\nparallèle prendre des photos régulièrement de la croissance\nde leur plant. Le verso de la fiche élève 3 permet de faire\nla synthèse des connaissances acquises au fil de la culture.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "« Lorsque les conditions sont réunies, la graine du haricot\ngerme : c'est la germination.\n\n* Puis la plantule grandit. Pendant sa croissance, la petite\nplante développe ses racines, sa tige et ses feuilles.\n\n« Ensuite, elle fleurit (floraison) puis donne des fruits\n(fructification).\n\n- Enfin, la plante se dessèche et meurt.\n\n«Les graines contenues dans le fruit donneront de\nnouveaux plants : c'est le cycle de vie du haricot.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
          },
        ],
      },
    ],
    guideText:
      ") Les végétaux, ça vit et grandit comment ?\n\n» Objectifs\n\n« Connaitre le processus de germination d'une graine en mettant en évidence son besoin\nen eau.\n\n« Être capable de conduire une culture en identifiant quelques besoins vitaux des végétaux.\n\n« Construire le cycle de vie d'un végétal (de la graine à la plante, de la fleur au fruit, du fruit\nà la graine).\n\n» Indications de progression dans le cycle 2\n\nCe dossier aborde le développement des végétaux (conditions de germination, besoins\nvitaux et cycle de vie). On mettra en évidence les besoins en eau de la graine lors du pro-\ncessus de germination en CP. Les principaux besoins vitaux des végétaux seront abordés en\nCE1 à travers la réalisation d’une culture. Enfin, nous réserverons la construction du cycle\nde vie d'un végétal au CE2. Nous proposons pour cela des fiches élève et d'évaluation de\n\nFiche enseignant\n\nniveaux différents.\n\n» Matériel\n\nGraines de lentilles, radis, petits pois, haricots. Godets, terreau, coton.\n\n| Séance 1 JF\n\nConnaître le processus de germination d'une graine en\nmettant en évidence son besoin en eau.\n\na Je m’interroge\n\nÀ la suite d'une sortie nature ou d'une visite au jardin, 'en-\nseignant-e a apporté plusieurs types de graines en classe :\nlentilles, radis, petits pois. On les présente aux élèves et on\nleur demande ce que c'est. « Ce sont des graines. Elles sont\ndifférentes. » On précisera alors qu'il s'agit de graines de\nlentilles, de petits pois et de radis. Après les avoir obser-\nvées (oeil nu, loupe, loupe binoculaire, caméra usb), l'ensei-\ngnant-e interroge à nouveau les élèves :\n\n[| De quoi ont besoin ces graines pour germer ?\n\nOn peut attendre les propositions suivantes : « elles ont\nbesoin d’eau », « elles ont besoin de lumière », « elles ont\nbesoin de chaleur », « elles ont besoin de terre ».\n\nÀ la suite de ces réponses qui sont notées au tableau, l'en-\nseignant-e propose aux élèves de mettre en place un pro-\ntocole expérimental traitant l’un de ces besoins : la graine\na-t-elle besoin d’eau pour germer ?\n\n J'expérimente\n\nLes élèves sont placés par groupes de 2. Chaque groupe doit\nmettre en place un protocole expérimental pour vérifier si\nl'eau est nécessaire à la graine pour germer. Il est souhai-\ntable de ne pas mélanger les graines et de bien identifier\nchaque semis. En effet, les vitesses de germination peuvent\nêtre différentes d'un végétal à un autre. Afin de bien obser-\nver le début de la germination, il est conseillé de ne pas\nenterrer trop profondément la graine ou de privilégier le\ncoton comme support (choix à mener en parallèle si aucun\nélève ne choisit cette solution).\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nB. : Il est important dans la construction de ce protocole\nde bien mettre en place une expérience et une contre expé-\nrience (une culture sans eau, une culture avec eau). Le choix\nde plusieurs graines permet de généraliser les conclusions\ntirées de notre expérimentation.\n\nLes élèves peuvent utiliser le matériel à disposition : godets,\nterreau, coton.\n\nLes observations de l'expérimentation sont réalisées sur la\nfiche élève 1. Pour l'exercice 1 du verso, les étiquettes sont\ndisponibles dans la fiche à découper (— sur CD-Rom). Il\nen est de même pour la fiche d'évaluation correspondante.\n\n2 Je retiens\n\n* Pour germer, la graine a besoin d'eau. Une graine ne\npeut pas germer sans eau.\n\n«La graine porte en elle un bébé plante : la plantule.\nLa germination, c'est quand la graine « se réveille ».\n\n| Séance 2 AFF\n\nÊtre capable de conduire une culture en identifiant quelques\nbesoins vitaux des végétaux.\n\n8 Je m' interroge\n\nL'enseignant-e explique à ses élèves : « Nous avons vu que\nles graines, pour germer, ont besoin d'eau. Maintenant,\nnous allons mettre en place une culture de graines de hari-\ncots. » Puis on interroge les élèves :\n\nD'après vous, de quoi ont besoin les haricots pour vivre\net pour bien grandir ?\n\nLes enfants vont sans doute formuler les réponses déjà\névoquées dans la séance 1 : eau, lumière, chaleur, terre.\n\nComment reconnaitre le monde vivant ? » 69\n\nLa qualité de l'eau utilisée (robinet, pluie, eau déminéra-\nlisée) ne sera probablement pas citée.\n\nL'enseignant-e propose alors aux élèves de se mettre par\ngroupes de 2 et de mettre en place un protocole pour véri-\nfier chacune de ces conditions de croissance. Il faudra lais-\nser germer les graines « normalement » dans un premier\ntemps puis commencer les expériences.\n\nCela peut être aussi l’occasion d'observer une graine et d'en\nidentifier les différentes parties (la plantule composée de la\ntigelle, de la radicule, de petites feuilles, puis l'enveloppe et\nles deux cotylédons). On demande aux élèves d'émettre des\nhypothèses sur le rôle et le devenir de chacun de ces élé-\nments que l'on vérifiera en observant leur développement.\n\nœ J'expérimente\n\nChaque groupe choisit de travailler sur une condition :\n\n— groupe « eau » ;\n\n— groupe « lumière » ;\n\n— groupe « terre » ;\n\n— groupe « sels minéraux ».\n\nOn rappelle qu'il faut pour chaque groupe un « plant\ntémoin » et qu’on ne doit modifier qu’une condition dans\nsa culture pour mesurer son importance.\n\nL'enseignant-e distribue alors la fiche élève 2. Elle servira\nau suivi de l'expérimentation et permettra de conclure sur\nles conditions nécessaires au bon développement des végé-\ntaux. Au verso, elle permettra de travailler le vocabulaire de\nla graine et du plant, ainsi que les premières étapes de son\ndéveloppement.\n\nJe retiens\n\n+ Chaque graine de haricot est formée d’une enveloppe\nprotectrice (le tégument), de deux cotylédons et d'une\nplantule qui comprend la tigelle (une petite tige), la\nradicule (petite racine) et deux petites feuilles.\n\n* Pour vivre, une plante a besoin d'eau, de lumière et de\nsels minéraux contenus dans la terre.\n\n| séance 3 MFTT)\n\nConstruire le cycle de vie d'un végétal (de la graine à la\nplante, de la fleur au fruit, du fruit à la graine).\n\nN.B. : Cette séance, après un premier temps de mise en\nplace ou dans la continuité de la séance 2, se déroulera sur\nplusieurs semaines, par des moments courts d'observations\net de mesures.\n\na Je m'interroge\n\nL'enseignant-e propose ou a proposé dans la séance précé-\n\ndente de planter quelques graines de haricot afin d'obser-\n\nver leur développement. On interroge alors les élèves :\nComment, à votre avis, se déroule le cycle de vie d’un\nharicot, c'est-à-dire le déroulement de sa vie, depuis la\n\ngraine semée jusqu'à la fabrication de nouvelles graines,\npuis sa mort ?\n\nOn peut attendre des élèves les réponses suivantes :\n« la graine germe et un plant sort », « le plant devient\n\n70 « Comment reconnaître le monde vivant ?\n\nune plante », « la plante grandit, elle pousse », « elle a des\nfeuilles et parfois des fleurs », « elle donnera des graines\naussi ou des fruits », « les fleurs fanent au bout d'un\nmoment », « la plante, elle peut mourir ».\n\nL'enseignant-e propose alors à chaque élève de semer une\n\ngraine et de suivre son développement afin d'en distinguer <_—\n\nles différentes étapes.\n\n J'expérimente\n\nChaque élève a à sa disposition deux petits godets, du ter-\nreau, deux graines de haricot. Il notera son nom sur les deux\ngodets et les numérotera (1 et 2).\n\nOn commence par une première observation de la graine\n(l'enseignant-e les aura fait tremper dans l’eau la nuit pré-\ncédente). En ouvrant une graine, on identifie ainsi les dif-\nférentes parties (la plantule composée de la tigelle, de la\nradicule, de la feuille, puis l'enveloppe et les deux cotylé-\ndons). On demande aux élèves d'émettre des hypothèses\nsur le rôle et le devenir de chacun de ces éléments que l'on\nvérifiera en observant leur développement.\n\nOn procède ensuite au semis. Les élèves vont se question-\nner sur la profondeur du semis, la fréquence, et la quantité\nd'arrosage. Les deux godets leur permettent de les différen-\ncier. Chaque paramètre est noté et le suivi de la plantation\nest assuré sur la fiche élève 3 (recto). Les élèves peuvent en\nparallèle prendre des photos régulièrement de la croissance\nde leur plant. Le verso de la fiche élève 3 permet de faire\nla synthèse des connaissances acquises au fil de la culture.\n\n2 Je retiens\n\n« Lorsque les conditions sont réunies, la graine du haricot\ngerme : c'est la germination.\n\n* Puis la plantule grandit. Pendant sa croissance, la petite\nplante développe ses racines, sa tige et ses feuilles.\n\n« Ensuite, elle fleurit (floraison) puis donne des fruits\n(fructification).\n\n- Enfin, la plante se dessèche et meurt.\n\n«Les graines contenues dans le fruit donneront de\nnouveaux plants : c'est le cycle de vie du haricot.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
    guidePageDecisions: [
      {
        page: 69,
        confidence: 93,
        score: 26,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "par groupes",
          "en classe",
        ],
        phaseMarkers: ["je m'interroge", "j'experimente", "je retiens"],
        teacherLanguageMarkers: [
          "enseignant",
          "eleves",
          "on interroge",
          "par groupes",
          "groupe",
          "en classe",
        ],
        studentLike: true,
      },
      {
        page: 70,
        confidence: 93,
        score: 20,
        included: true,
        strongMarkers: ["seance", "l'enseignant", "enseignant-e", "les eleves", "aux eleves"],
        phaseMarkers: ["je m'interroge", "j'experimente", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on demande", "on interroge", "groupe"],
        studentLike: false,
      },
      {
        page: 71,
        confidence: 91,
        score: 0,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: false,
      },
    ],
    skippedProbePages: [71],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-07",
    dossierNumber: 7,
    partNumber: 2,
    partTitle: "Comment reconnaître le monde vivant ?",
    title: "Les animaux, ça vit et grandit comment ?",
    guidePages: [83, 84, 85],
    guidePageCount: 3,
    objectives: [
      "« Réaliser un élevage en classe : l'exemple des phasmes.",
      "« Identifier et construire le cycle de vie d'un animal à travers deux cas : croissance continue",
      "et croissance discontinue (métamorphose).",
    ],
    progressionNote:
      "Au niveau CP (mais également au CE1 si cela est possible pour l'enseignant-e), il s'agit de\nréaliser un élevage afin d'identifier une ou plusieurs étapes du cycle de vie d'un animal.\nAu CE1, l'élève va apprendre à distinguer chez les animaux un cycle de vie avec croissance\ncontinue et un cycle de vie avec une croissance discontinue (métamorphose). Enfin, au\nCE2, l'élève pourra lui-même construire le cycle de vie des animaux à travers deux cas\ncroissance continue et croissance discontinue). Nous proposons trois séances : les deux\npremières séances sont dédiées à la mise en place et au suivi de l'élevage de phasmes, la\ntroisième au cycle de vie des animaux à travers deux cas (croissance continue et croissance\nFiche enseignant\ndiscontinue).",
    material: [],
    sessions: [
      {
        number: 1,
        title:
          "Réaliser un élevage en classe : l'exemple des phasmes mise en place du vivarium). N.B. : Cette séance peut être conduite indifféremment avec",
        rawText:
          "| séance 1 à\n\nRéaliser un élevage en classe : l'exemple des phasmes\n(mise en place du vivarium).\n\nN.B. : Cette séance peut être conduite indifféremment avec\ndes élèves de CP ou CE1, en fonction de ce qui a été réalisé\nles années précédentes.\n\na Je m'interroge\n\nL'enseignant-e demande aux élèves d'observer la photo\nd'un phasme (— sur CD-Rom) ou d'observer « en vrai »\nl’insecte vivant sans donner le nom de l'animal ni dire que\nc'est un animal. On propose aux élèves de décrire ce qu'ils\nvoient. Certains élèves vont pouvoir identifier que c'est un\nanimal et donner le nom de phasme, ou dire que c'est un\ninsecte. D'autres peuvent répondre que c'est un morceau\n\nde bois. Les échanges entre elèves devraient permettre de |\n\nfaire surgir le fait qu'il s'agit d'un animal, d'un insecte.\nL'enseignant-e interroge alors ses élèves :\n\n| Comment pourrions-nous mieux connaitre cet animal ?\n\nOn peut attendre les réponses suivantes : « en l'observant »,\n« en faisant un élevage ! », « en faisant des recherches »,\netc.\n\nL'enseignant-e propose donc aux élèves d'effectuer des\nrecherches puis de regarder vivre ces insectes en faisant un\nélevage en classe ! La séance de recherche sur les phasmes\npréalable à la mise en place de l'élevage pourra être\neffectuée en collectif sur Internet ou en utilisant la fiche\ndocumentaire 1.\n\nJe recherche\n\nLa fiche élève 1 est distribuée aux élèves. Ils la complètent\nafin de retrouver les éléments nécessaires à la réalisation\nd'un élevage de phasmes en classe. L'enseignant-e se sera\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement\n\nprocuré-e au préalable des phasmes (auprès de l'OPIE —\nOffice pour les insectes et leur environnement — ou dans\nun insectarium ou encore dans une classe/école voisine\nvoulant se séparer de son élevage ou qui a eu des bébés).\nÀ l'issue de ce travail préparatoire, la mise en place de\nl'élevage peut se faire. Les élèves peuvent ainsi installer les\nphasmes dans le vivarium !\n\nRemarques sur la mise en place de l'élevage :\n\nLes phasmes sont des insectes (trois paires de pattes et une\npaire d'antennes) de la famille des arthropodes (groupe\ncaractérisé par un squelette externe chitineux et des appen-\ndices articulés). Il existe près de 3 000 espèces de phasmes\ndans le monde ; nous conseillons, pour l'élevage en classe,\ndeux espèces de phasmes-bâtons (le phasme morose ou\nle phasme-bâton du Vietnam). Tous les conseils nécessaires\nà la mise en place de l'élevage, à l'alimentation et à l'en-\ntretien des phasmes sont donnés par l'OPIE (site Internet :\nhttp://www.insectes.org/elevage/phasmes-insectes.html).\nUn élevage de phasmes est tout à fait compatible avec la\nvie de la classe et le vivarium peut tenir dans un espace\nréduit.\n\nQuelques conseils :\n\n— afin de maintenir une humidité suffisante, on placera une\nbarquette dans le vivarium avec du coton humide dedans\n(remettre de l'eau régulièrement) et on pulvérise tous les\njours le feuillage et les animaux d’eau. On peut aussi plon-\nger le pied des ronces ou du lierre dans un pot rempli d'eau.\n— la température ambiante dans la salle de classe, entre\n18 et 20 °C, est suffisante pour l'élevage mais une tempé-\nrature plus élevée (entre 22 et 26 °C) permet un dévelop-\npement plus rapide.\n\n— il est conseillé de nettoyer le vivarium une fois par\nsemaine. Vous pouvez placer de l'essuie-tout au fond du\nvivarium pour faciliter le nettoyage.\n\n— il faut changer les tiges de lierre ou de ronces quand les\nfeuilles ont été mangées.\n\nComment reconnaître le monde vivant ? « 83\n\nL'élevage de phasmes permet d'aborder un éventail très\nlarge de thématiques : anatomie, mimétisme, croissance,\ncycle de vie et régime alimentaire ; il suscite en outre une\nvive curiosité chez les élèves de cet âge.\n\n2 Je retiens\n\nPour réaliser un élevage de phasmes en classe, nous\navons besoin :\n\n— d'un vivarium ;\n\n— de phasmes « bâtons » ;\n\n— d'un pot avec des feuilles de lierre, de framboisiers ou\nde ronces ;\n\n— d'un vaporisateur d'eau ;\n\n— de papier absorbant pour tapisser le fond du vivarium\n(plus facile pour récupérer les crottes !).",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e demande aux élèves d'observer la photo\nd'un phasme (— sur CD-Rom) ou d'observer « en vrai »\nl’insecte vivant sans donner le nom de l'animal ni dire que\nc'est un animal. On propose aux élèves de décrire ce qu'ils\nvoient. Certains élèves vont pouvoir identifier que c'est un\nanimal et donner le nom de phasme, ou dire que c'est un\ninsecte. D'autres peuvent répondre que c'est un morceau\n\nde bois. Les échanges entre elèves devraient permettre de |\n\nfaire surgir le fait qu'il s'agit d'un animal, d'un insecte.\nL'enseignant-e interroge alors ses élèves :\n\n| Comment pourrions-nous mieux connaitre cet animal ?\n\nOn peut attendre les réponses suivantes : « en l'observant »,\n« en faisant un élevage ! », « en faisant des recherches »,\netc.\n\nL'enseignant-e propose donc aux élèves d'effectuer des\nrecherches puis de regarder vivre ces insectes en faisant un\nélevage en classe ! La séance de recherche sur les phasmes\npréalable à la mise en place de l'élevage pourra être\neffectuée en collectif sur Internet ou en utilisant la fiche\ndocumentaire 1.",
          },
          {
            title: "Je recherche",
            detail:
              "La fiche élève 1 est distribuée aux élèves. Ils la complètent\nafin de retrouver les éléments nécessaires à la réalisation\nd'un élevage de phasmes en classe. L'enseignant-e se sera\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement\n\nprocuré-e au préalable des phasmes (auprès de l'OPIE —\nOffice pour les insectes et leur environnement — ou dans\nun insectarium ou encore dans une classe/école voisine\nvoulant se séparer de son élevage ou qui a eu des bébés).\nÀ l'issue de ce travail préparatoire, la mise en place de\nl'élevage peut se faire. Les élèves peuvent ainsi installer les\nphasmes dans le vivarium !\n\nRemarques sur la mise en place de l'élevage :\n\nLes phasmes sont des insectes (trois paires de pattes et une\npaire d'antennes) de la famille des arthropodes (groupe\ncaractérisé par un squelette externe chitineux et des appen-\ndices articulés). Il existe près de 3 000 espèces de phasmes\ndans le monde ; nous conseillons, pour l'élevage en classe,\ndeux espèces de phasmes-bâtons (le phasme morose ou\nle phasme-bâton du Vietnam). Tous les conseils nécessaires\nà la mise en place de l'élevage, à l'alimentation et à l'en-\ntretien des phasmes sont donnés par l'OPIE (site Internet :\nhttp://www.insectes.org/elevage/phasmes-insectes.html).\nUn élevage de phasmes est tout à fait compatible avec la\nvie de la classe et le vivarium peut tenir dans un espace\nréduit.\n\nQuelques conseils :\n\n— afin de maintenir une humidité suffisante, on placera une\nbarquette dans le vivarium avec du coton humide dedans\n(remettre de l'eau régulièrement) et on pulvérise tous les\njours le feuillage et les animaux d’eau. On peut aussi plon-\nger le pied des ronces ou du lierre dans un pot rempli d'eau.\n— la température ambiante dans la salle de classe, entre\n18 et 20 °C, est suffisante pour l'élevage mais une tempé-\nrature plus élevée (entre 22 et 26 °C) permet un dévelop-\npement plus rapide.\n\n— il est conseillé de nettoyer le vivarium une fois par\nsemaine. Vous pouvez placer de l'essuie-tout au fond du\nvivarium pour faciliter le nettoyage.\n\n— il faut changer les tiges de lierre ou de ronces quand les\nfeuilles ont été mangées.\n\nComment reconnaître le monde vivant ? « 83\n\nL'élevage de phasmes permet d'aborder un éventail très\nlarge de thématiques : anatomie, mimétisme, croissance,\ncycle de vie et régime alimentaire ; il suscite en outre une\nvive curiosité chez les élèves de cet âge.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "Pour réaliser un élevage de phasmes en classe, nous\navons besoin :\n\n— d'un vivarium ;\n\n— de phasmes « bâtons » ;\n\n— d'un pot avec des feuilles de lierre, de framboisiers ou\nde ronces ;\n\n— d'un vaporisateur d'eau ;\n\n— de papier absorbant pour tapisser le fond du vivarium\n(plus facile pour récupérer les crottes !).",
          },
        ],
      },
      {
        number: 2,
        title:
          "Réaliser un élevage en classe : l'exemple des phasmes observations de l'élevage en fil rouge sur une année scolaire).",
        rawText:
          "| séance 2 à\n\nRéaliser un élevage en classe : l'exemple des phasmes\n(observations de l'élevage en fil rouge sur une année\nscolaire).\n\n[2 Je m'interroge\n\nLe vivarium étant installé dans la classe, les élèves vont\nainsi pouvoir observer les phasmes tout au long de l'année\nscolaire.\n\nL'enseignant-e invite les élèves à observer les phasmes dès\nla mise en place de l'élevage. Les questions que se posent\nles élèves sont notées sur une affiche, par exemple : « Que\nmange un phasme ? », « Comment se déplace-t-il ? »,\n« Pourquoi ressemble-il à un bâton ? », « Comment les\nphasmes font-ils des bébés ? », « Combien de temps vit un\nphasme ? », etc. L'enseignant-e guide également l’observa-\ntion en demandant :\n\nQu'observez-vous ? Quelles sont les parties du corps\n| d'un phasme ?\n\nD'autres observations et questionnements intervien-\ndront au fur et à mesure, par exemple sur la croissance\n(Comment grandit-il ?). Durant tout le temps de l'élevage,\nl'observation est libre dans la classe, même en dehors des\ntemps prévus par l'enseignant-e. Il est possible de toucher\nles phasmes, délicatement pour ne pas les blesser.\n\n@ J'observe\n\nLes élèves vont observer les phasmes régulièrement :\n\n— ils étudient les parties du corps et peuvent ainsi déter-\nminer que le phasme est un insecte (« combien a-t-il de\npattes ? où se trouve sa tête ? », etc.).\n\n— ils leur donnent différents aliments (salade/carotte,\nfeuilles diverses...) afin de connaître leur régime alimentaire ;\n— ils peuvent observer un phasme de très près (par exemple,\nà la loupe) et le mesurer à des temps donnés afin de mieux\nconnaître son développement. Les mues peuvent intervenir\nn'importe quand. Assister à ce moment est un privilège ! Il\nest difficile de voir quel phasme vient de muer. Ils mangent\nparfois leur exuvie. On expliquera aux élèves que pour gran-\ndir le phasme a besoin de changer de « peau ». Les exuvies\n\n84 « Comment reconnaître le monde vivant ?\n\npeuvent être mises à disposition des élèves et observées à\nl'aide de loupes ; elles seront de tailles différentes et cela\npourra être mis en relation avec les tailles différentes des\nphasmes et donc la croissance ;\n\n— suivant l'âge des phasmes, les élèves pourront observer la\nponte des œufs (attention ce sont de petites boules noires\nà ne pas confondre avec les crottes !) et la naissance des\npetits.\n\nN.B. : pour l'incubation (2 à 3 mois), il faudra placer les\nœufs dans une boite fermée aérée avec des petits trous.\nLes œufs seront posés sur du sable. On veillera à humidifier\nrégulièrement le sable.\n\nParallèlement à cette phase d'observation, les élèves rem-\nplissent la fiche élève 2 qui permet de recueillir leurs\npremières perceptions. La fiche élève 3 permet dans un\nsecond temps d'approfondir les connaissances sur l'anato-\nmie, le régime alimentaire, la croissance et le cycle de vie\ndes phasmes.\n\nF2 Je retiens\n\n* Le phasme est un insecte : il possède 6 pattes, deux\nantennes et deux yeux. Son corps est formé de trois\nparties : tête, thorax, abdomen.\n\n* Le phasme mange des feuilles de ronces, de lierre et\nde framboisiers.\n\n+ Le phasme grandit et quitte son ancienne enveloppe\n(exuvie). Il mue 7 fois au cours de sa vie jusqu'à sa taille\ndéfinitive. On parle de croissance discontinue.\n\n* Le phasme se reproduit et pond des œufs qui donne-\nront ensuite de jeunes phasmes. Il pond en moyenne\n4 œufs par jour !\n\n* Un phasme bâton vit entre 6 mois et 1 an.\n\n ès sé\n\nIdentifier et construire le cycle de vie d'un animal à\ntravers deux cas : croissance continue et croissance\ndiscontinue (métamorphose).\n\n8 Jen’ interroge\n\nL'enseignant-e montre plusieurs photos d'animaux (— sur\nCD-Rom) : un chat, un chaton, un homme, un bébé, une\npoule, un poussin, un criquet (un jeune et un adulte), un\nphasme (jeune et adulte), une grenouille, un tétard, un\npapillon, une chenille... On interroge ensuite les élèves :\n\nVous connaissez tous ces animaux. Mais êtes-vous\ncapables de retrouver les bébés de chaque adulte ?\n\nL'enseignant-e propose de tenter de les classer : d'un côté\nceux dont les bébés ressemblent aux adultes et de l'autre\nceux qui ont des petits qui ne ressemblent pas aux adultes.\nPour cela, on distribue la fiche à découper (— sur CD-Rom).\nOn obtiendra ainsi le classement suivant :\n\n— petits qui ressemblent à l'adulte : chaton/chat ; poussin/\npoule ; bébé/homme ; bébé phasme/phasme adulte ; bébé\ncriquet/criquet adulte.\n\n— petits qui ne ressemblent pas à l'adulte :\npapillon ; tétard/grenouille ; larve/coccinelle.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n_\n\nchenille/ —\n\nUne fois le classement réalisé, l'enseignant-e demandera\naux élèves :\n\n| Mais alors, est-ce que les animaux dont les petits\nressemblent à l'adulte grandissent de la même façon?\n\nLes élèves pourront dire que le phasme mue (élevage réa-\nlisé en classe les années précédentes) ou que le chaton va\ndevenir un chat et qu'ils ne se ressemblent pas, car le chat\nn'a pas de mue...\n\nRappel pour l'enseignant-e :\ndéveloppement :\n\n— le développement direct (le jeune ressemble à l'adulte)\navec soit une croissance continue (comme le chat) ou une\ncroissance discontinue (comme le phasme) ;\n\n— le développement indirect (le jeune ne ressemble pas à\nl'adulte) avec soit une croissance continue (comme la gre-\nnouille) ou une croissance discontinue (comme le papillon).\nPour simplifier et faire en sorte que les élèves ne confondent\npas développement et croissance, nous simplifierons et\nparlerons seulement de bébé/petit ressemblant à l'adulte\net de bébé/petit ne ressemblant pas à l'adulte.\n\nIl existe deux types de\n\nÉ Je recherche\n\nLes élèves ont déjà distingué deux groupes d'animaux : ceux\ndont le petit ressemble à l'adulte et ceux dont le petit ne\nressemble pas à l'adulte. L'enseignant-e fait le point sur ce\npremier travail et rappelle qu'il s'agit du développement de\nl'animal mais pas de sa croissance. Maintenant, par groupe,\nles élèves vont tenter de classer les animaux représentés en\ndeux nouvelles catégories liées à la croissance. Pour aider\n\nec— RE\n\nbY\nles élèves, on peut les orienter avec de nouvelles propoëi-\ntions : « Vous allez mettre d'un côté les animaux qui selon\nvous muent et de l'autre les animaux qui ne muent pas ».\nLors de la correction à l'oral, 'enseignant-e fera ainsi émer-\nger deux types de croissances :\n— les animaux à croissance continue : comme les chats, les\nchiens, les oiseaux, les vaches, mais aussi les hommes et les\ngrenouilles (à ne pas confondre avec son développement) ;\n— les animaux à croissance discontinue comme les phasmes,\nles criquets, les papillons, les coccinelles.\nN.B. : La mue est le fait de changer de « peau ». La méta-\nmorphose est le passage d'une forme larvaire à une forme\nadulte. Elle est dite incomplète (chez le phasme) ou com-\nplète (papillon, libellule).\nLes élèves remplissent ensuite la fiche élève 4 (niveau CE1 :\nidentification d'un cycle de vie continue et discontinue) et\nla fiche élève 5 (niveau CE2 : construction d'un cycle de vie\ncontinue et discontinue).\n\n[7] Je retiens\n\n+ Comme tous les êtres vivants, les animaux subissent\ndes modifications au cours de leur vie.\n\n« Certains animaux ont une croissance continue : ils\ngrandissent régulièrement. C'est le cas des mammifères\n(cochon d'inde, chat, chien, vache...) ou de la grenouille.\n« D'autres ont une croissance discontinue : ils gran-\ndissent par palier, ils ont des mues successives. C'est\nle cas de certains insectes : phasme, criquet, papillon. On\nparle alors de métamorphose.\n\nLE PHASME\n\nLes antennes\n\nLa tête\n\nLe thorax L'abdomen\n\nLes pattes\n\n© Le phasme est un insecte.\n\ne || possède 6 pattes, deux antennes et deux yeux.\n\ne Son corps est formé de trois parties : tête, thorax, abdomen.\n\n© Le phasme mange des feuilles de ronces, de lierre et de framboisiers.\n© Le phasme grandit et quitte son ancienne enveloppe.\n\n© On parle de croissance discontinue.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nComment reconnaître le monde vivant ? « 85",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "Le vivarium étant installé dans la classe, les élèves vont\nainsi pouvoir observer les phasmes tout au long de l'année\nscolaire.\n\nL'enseignant-e invite les élèves à observer les phasmes dès\nla mise en place de l'élevage. Les questions que se posent\nles élèves sont notées sur une affiche, par exemple : « Que\nmange un phasme ? », « Comment se déplace-t-il ? »,\n« Pourquoi ressemble-il à un bâton ? », « Comment les\nphasmes font-ils des bébés ? », « Combien de temps vit un\nphasme ? », etc. L'enseignant-e guide également l’observa-\ntion en demandant :\n\nQu'observez-vous ? Quelles sont les parties du corps\n| d'un phasme ?\n\nD'autres observations et questionnements intervien-\ndront au fur et à mesure, par exemple sur la croissance\n(Comment grandit-il ?). Durant tout le temps de l'élevage,\nl'observation est libre dans la classe, même en dehors des\ntemps prévus par l'enseignant-e. Il est possible de toucher\nles phasmes, délicatement pour ne pas les blesser.\n\n@",
          },
          {
            title: "J'observe",
            detail:
              "Les élèves vont observer les phasmes régulièrement :\n\n— ils étudient les parties du corps et peuvent ainsi déter-\nminer que le phasme est un insecte (« combien a-t-il de\npattes ? où se trouve sa tête ? », etc.).\n\n— ils leur donnent différents aliments (salade/carotte,\nfeuilles diverses...) afin de connaître leur régime alimentaire ;\n— ils peuvent observer un phasme de très près (par exemple,\nà la loupe) et le mesurer à des temps donnés afin de mieux\nconnaître son développement. Les mues peuvent intervenir\nn'importe quand. Assister à ce moment est un privilège ! Il\nest difficile de voir quel phasme vient de muer. Ils mangent\nparfois leur exuvie. On expliquera aux élèves que pour gran-\ndir le phasme a besoin de changer de « peau ». Les exuvies\n\n84 « Comment reconnaître le monde vivant ?\n\npeuvent être mises à disposition des élèves et observées à\nl'aide de loupes ; elles seront de tailles différentes et cela\npourra être mis en relation avec les tailles différentes des\nphasmes et donc la croissance ;\n\n— suivant l'âge des phasmes, les élèves pourront observer la\nponte des œufs (attention ce sont de petites boules noires\nà ne pas confondre avec les crottes !) et la naissance des\npetits.\n\nN.B. : pour l'incubation (2 à 3 mois), il faudra placer les\nœufs dans une boite fermée aérée avec des petits trous.\nLes œufs seront posés sur du sable. On veillera à humidifier\nrégulièrement le sable.\n\nParallèlement à cette phase d'observation, les élèves rem-\nplissent la fiche élève 2 qui permet de recueillir leurs\npremières perceptions. La fiche élève 3 permet dans un\nsecond temps d'approfondir les connaissances sur l'anato-\nmie, le régime alimentaire, la croissance et le cycle de vie\ndes phasmes.\n\nF2",
          },
          {
            title: "Je retiens",
            detail:
              "* Le phasme est un insecte : il possède 6 pattes, deux\nantennes et deux yeux. Son corps est formé de trois\nparties : tête, thorax, abdomen.\n\n* Le phasme mange des feuilles de ronces, de lierre et\nde framboisiers.\n\n+ Le phasme grandit et quitte son ancienne enveloppe\n(exuvie). Il mue 7 fois au cours de sa vie jusqu'à sa taille\ndéfinitive. On parle de croissance discontinue.\n\n* Le phasme se reproduit et pond des œufs qui donne-\nront ensuite de jeunes phasmes. Il pond en moyenne\n4 œufs par jour !\n\n* Un phasme bâton vit entre 6 mois et 1 an.\n\n ès sé\n\nIdentifier et construire le cycle de vie d'un animal à\ntravers deux cas : croissance continue et croissance\ndiscontinue (métamorphose).\n\n8 Jen’ interroge\n\nL'enseignant-e montre plusieurs photos d'animaux (— sur\nCD-Rom) : un chat, un chaton, un homme, un bébé, une\npoule, un poussin, un criquet (un jeune et un adulte), un\nphasme (jeune et adulte), une grenouille, un tétard, un\npapillon, une chenille... On interroge ensuite les élèves :\n\nVous connaissez tous ces animaux. Mais êtes-vous\ncapables de retrouver les bébés de chaque adulte ?\n\nL'enseignant-e propose de tenter de les classer : d'un côté\nceux dont les bébés ressemblent aux adultes et de l'autre\nceux qui ont des petits qui ne ressemblent pas aux adultes.\nPour cela, on distribue la fiche à découper (— sur CD-Rom).\nOn obtiendra ainsi le classement suivant :\n\n— petits qui ressemblent à l'adulte : chaton/chat ; poussin/\npoule ; bébé/homme ; bébé phasme/phasme adulte ; bébé\ncriquet/criquet adulte.\n\n— petits qui ne ressemblent pas à l'adulte :\npapillon ; tétard/grenouille ; larve/coccinelle.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n_\n\nchenille/ —\n\nUne fois le classement réalisé, l'enseignant-e demandera\naux élèves :\n\n| Mais alors, est-ce que les animaux dont les petits\nressemblent à l'adulte grandissent de la même façon?\n\nLes élèves pourront dire que le phasme mue (élevage réa-\nlisé en classe les années précédentes) ou que le chaton va\ndevenir un chat et qu'ils ne se ressemblent pas, car le chat\nn'a pas de mue...\n\nRappel pour l'enseignant-e :\ndéveloppement :\n\n— le développement direct (le jeune ressemble à l'adulte)\navec soit une croissance continue (comme le chat) ou une\ncroissance discontinue (comme le phasme) ;\n\n— le développement indirect (le jeune ne ressemble pas à\nl'adulte) avec soit une croissance continue (comme la gre-\nnouille) ou une croissance discontinue (comme le papillon).\nPour simplifier et faire en sorte que les élèves ne confondent\npas développement et croissance, nous simplifierons et\nparlerons seulement de bébé/petit ressemblant à l'adulte\net de bébé/petit ne ressemblant pas à l'adulte.\n\nIl existe deux types de\n\nÉ",
          },
          {
            title: "Je recherche",
            detail:
              "Les élèves ont déjà distingué deux groupes d'animaux : ceux\ndont le petit ressemble à l'adulte et ceux dont le petit ne\nressemble pas à l'adulte. L'enseignant-e fait le point sur ce\npremier travail et rappelle qu'il s'agit du développement de\nl'animal mais pas de sa croissance. Maintenant, par groupe,\nles élèves vont tenter de classer les animaux représentés en\ndeux nouvelles catégories liées à la croissance. Pour aider\n\nec— RE\n\nbY\nles élèves, on peut les orienter avec de nouvelles propoëi-\ntions : « Vous allez mettre d'un côté les animaux qui selon\nvous muent et de l'autre les animaux qui ne muent pas ».\nLors de la correction à l'oral, 'enseignant-e fera ainsi émer-\nger deux types de croissances :\n— les animaux à croissance continue : comme les chats, les\nchiens, les oiseaux, les vaches, mais aussi les hommes et les\ngrenouilles (à ne pas confondre avec son développement) ;\n— les animaux à croissance discontinue comme les phasmes,\nles criquets, les papillons, les coccinelles.\nN.B. : La mue est le fait de changer de « peau ». La méta-\nmorphose est le passage d'une forme larvaire à une forme\nadulte. Elle est dite incomplète (chez le phasme) ou com-\nplète (papillon, libellule).\nLes élèves remplissent ensuite la fiche élève 4 (niveau CE1 :\nidentification d'un cycle de vie continue et discontinue) et\nla fiche élève 5 (niveau CE2 : construction d'un cycle de vie\ncontinue et discontinue).\n\n[7]",
          },
          {
            title: "Je retiens",
            detail:
              "+ Comme tous les êtres vivants, les animaux subissent\ndes modifications au cours de leur vie.\n\n« Certains animaux ont une croissance continue : ils\ngrandissent régulièrement. C'est le cas des mammifères\n(cochon d'inde, chat, chien, vache...) ou de la grenouille.\n« D'autres ont une croissance discontinue : ils gran-\ndissent par palier, ils ont des mues successives. C'est\nle cas de certains insectes : phasme, criquet, papillon. On\nparle alors de métamorphose.\n\nLE PHASME\n\nLes antennes\n\nLa tête\n\nLe thorax L'abdomen\n\nLes pattes\n\n© Le phasme est un insecte.\n\ne || possède 6 pattes, deux antennes et deux yeux.\n\ne Son corps est formé de trois parties : tête, thorax, abdomen.\n\n© Le phasme mange des feuilles de ronces, de lierre et de framboisiers.\n© Le phasme grandit et quitte son ancienne enveloppe.\n\n© On parle de croissance discontinue.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nComment reconnaître le monde vivant ? « 85",
          },
        ],
      },
    ],
    guideText:
      "Les animaux, ça vit et grandit comment ?\n\n» Objectifs\n\n« Réaliser un élevage en classe : l'exemple des phasmes.\n\n« Identifier et construire le cycle de vie d'un animal à travers deux cas : croissance continue\net croissance discontinue (métamorphose).\n\n» Indications de progression dans le cycle 2\n\nAu niveau CP (mais également au CE1 si cela est possible pour l'enseignant-e), il s'agit de\nréaliser un élevage afin d'identifier une ou plusieurs étapes du cycle de vie d'un animal.\n| Au CE1, l'élève va apprendre à distinguer chez les animaux un cycle de vie avec croissance\ncontinue et un cycle de vie avec une croissance discontinue (métamorphose). Enfin, au\nCE2, l'élève pourra lui-même construire le cycle de vie des animaux à travers deux cas\n(croissance continue et croissance discontinue). Nous proposons trois séances : les deux\npremières séances sont dédiées à la mise en place et au suivi de l'élevage de phasmes, la\ntroisième au cycle de vie des animaux à travers deux cas (croissance continue et croissance\n\nFiche enseignant\n\ndiscontinue).\n\n| séance 1 à\n\nRéaliser un élevage en classe : l'exemple des phasmes\n(mise en place du vivarium).\n\nN.B. : Cette séance peut être conduite indifféremment avec\ndes élèves de CP ou CE1, en fonction de ce qui a été réalisé\nles années précédentes.\n\na Je m'interroge\n\nL'enseignant-e demande aux élèves d'observer la photo\nd'un phasme (— sur CD-Rom) ou d'observer « en vrai »\nl’insecte vivant sans donner le nom de l'animal ni dire que\nc'est un animal. On propose aux élèves de décrire ce qu'ils\nvoient. Certains élèves vont pouvoir identifier que c'est un\nanimal et donner le nom de phasme, ou dire que c'est un\ninsecte. D'autres peuvent répondre que c'est un morceau\n\nde bois. Les échanges entre elèves devraient permettre de |\n\nfaire surgir le fait qu'il s'agit d'un animal, d'un insecte.\nL'enseignant-e interroge alors ses élèves :\n\n| Comment pourrions-nous mieux connaitre cet animal ?\n\nOn peut attendre les réponses suivantes : « en l'observant »,\n« en faisant un élevage ! », « en faisant des recherches »,\netc.\n\nL'enseignant-e propose donc aux élèves d'effectuer des\nrecherches puis de regarder vivre ces insectes en faisant un\nélevage en classe ! La séance de recherche sur les phasmes\npréalable à la mise en place de l'élevage pourra être\neffectuée en collectif sur Internet ou en utilisant la fiche\ndocumentaire 1.\n\nJe recherche\n\nLa fiche élève 1 est distribuée aux élèves. Ils la complètent\nafin de retrouver les éléments nécessaires à la réalisation\nd'un élevage de phasmes en classe. L'enseignant-e se sera\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement\n\nprocuré-e au préalable des phasmes (auprès de l'OPIE —\nOffice pour les insectes et leur environnement — ou dans\nun insectarium ou encore dans une classe/école voisine\nvoulant se séparer de son élevage ou qui a eu des bébés).\nÀ l'issue de ce travail préparatoire, la mise en place de\nl'élevage peut se faire. Les élèves peuvent ainsi installer les\nphasmes dans le vivarium !\n\nRemarques sur la mise en place de l'élevage :\n\nLes phasmes sont des insectes (trois paires de pattes et une\npaire d'antennes) de la famille des arthropodes (groupe\ncaractérisé par un squelette externe chitineux et des appen-\ndices articulés). Il existe près de 3 000 espèces de phasmes\ndans le monde ; nous conseillons, pour l'élevage en classe,\ndeux espèces de phasmes-bâtons (le phasme morose ou\nle phasme-bâton du Vietnam). Tous les conseils nécessaires\nà la mise en place de l'élevage, à l'alimentation et à l'en-\ntretien des phasmes sont donnés par l'OPIE (site Internet :\nhttp://www.insectes.org/elevage/phasmes-insectes.html).\nUn élevage de phasmes est tout à fait compatible avec la\nvie de la classe et le vivarium peut tenir dans un espace\nréduit.\n\nQuelques conseils :\n\n— afin de maintenir une humidité suffisante, on placera une\nbarquette dans le vivarium avec du coton humide dedans\n(remettre de l'eau régulièrement) et on pulvérise tous les\njours le feuillage et les animaux d’eau. On peut aussi plon-\nger le pied des ronces ou du lierre dans un pot rempli d'eau.\n— la température ambiante dans la salle de classe, entre\n18 et 20 °C, est suffisante pour l'élevage mais une tempé-\nrature plus élevée (entre 22 et 26 °C) permet un dévelop-\npement plus rapide.\n\n— il est conseillé de nettoyer le vivarium une fois par\nsemaine. Vous pouvez placer de l'essuie-tout au fond du\nvivarium pour faciliter le nettoyage.\n\n— il faut changer les tiges de lierre ou de ronces quand les\nfeuilles ont été mangées.\n\nComment reconnaître le monde vivant ? « 83\n\nL'élevage de phasmes permet d'aborder un éventail très\nlarge de thématiques : anatomie, mimétisme, croissance,\ncycle de vie et régime alimentaire ; il suscite en outre une\nvive curiosité chez les élèves de cet âge.\n\n2 Je retiens\n\nPour réaliser un élevage de phasmes en classe, nous\navons besoin :\n\n— d'un vivarium ;\n\n— de phasmes « bâtons » ;\n\n— d'un pot avec des feuilles de lierre, de framboisiers ou\nde ronces ;\n\n— d'un vaporisateur d'eau ;\n\n— de papier absorbant pour tapisser le fond du vivarium\n(plus facile pour récupérer les crottes !).\n\n| séance 2 à\n\nRéaliser un élevage en classe : l'exemple des phasmes\n(observations de l'élevage en fil rouge sur une année\nscolaire).\n\n[2 Je m'interroge\n\nLe vivarium étant installé dans la classe, les élèves vont\nainsi pouvoir observer les phasmes tout au long de l'année\nscolaire.\n\nL'enseignant-e invite les élèves à observer les phasmes dès\nla mise en place de l'élevage. Les questions que se posent\nles élèves sont notées sur une affiche, par exemple : « Que\nmange un phasme ? », « Comment se déplace-t-il ? »,\n« Pourquoi ressemble-il à un bâton ? », « Comment les\nphasmes font-ils des bébés ? », « Combien de temps vit un\nphasme ? », etc. L'enseignant-e guide également l’observa-\ntion en demandant :\n\nQu'observez-vous ? Quelles sont les parties du corps\n| d'un phasme ?\n\nD'autres observations et questionnements intervien-\ndront au fur et à mesure, par exemple sur la croissance\n(Comment grandit-il ?). Durant tout le temps de l'élevage,\nl'observation est libre dans la classe, même en dehors des\ntemps prévus par l'enseignant-e. Il est possible de toucher\nles phasmes, délicatement pour ne pas les blesser.\n\n@ J'observe\n\nLes élèves vont observer les phasmes régulièrement :\n\n— ils étudient les parties du corps et peuvent ainsi déter-\nminer que le phasme est un insecte (« combien a-t-il de\npattes ? où se trouve sa tête ? », etc.).\n\n— ils leur donnent différents aliments (salade/carotte,\nfeuilles diverses...) afin de connaître leur régime alimentaire ;\n— ils peuvent observer un phasme de très près (par exemple,\nà la loupe) et le mesurer à des temps donnés afin de mieux\nconnaître son développement. Les mues peuvent intervenir\nn'importe quand. Assister à ce moment est un privilège ! Il\nest difficile de voir quel phasme vient de muer. Ils mangent\nparfois leur exuvie. On expliquera aux élèves que pour gran-\ndir le phasme a besoin de changer de « peau ». Les exuvies\n\n84 « Comment reconnaître le monde vivant ?\n\npeuvent être mises à disposition des élèves et observées à\nl'aide de loupes ; elles seront de tailles différentes et cela\npourra être mis en relation avec les tailles différentes des\nphasmes et donc la croissance ;\n\n— suivant l'âge des phasmes, les élèves pourront observer la\nponte des œufs (attention ce sont de petites boules noires\nà ne pas confondre avec les crottes !) et la naissance des\npetits.\n\nN.B. : pour l'incubation (2 à 3 mois), il faudra placer les\nœufs dans une boite fermée aérée avec des petits trous.\nLes œufs seront posés sur du sable. On veillera à humidifier\nrégulièrement le sable.\n\nParallèlement à cette phase d'observation, les élèves rem-\nplissent la fiche élève 2 qui permet de recueillir leurs\npremières perceptions. La fiche élève 3 permet dans un\nsecond temps d'approfondir les connaissances sur l'anato-\nmie, le régime alimentaire, la croissance et le cycle de vie\ndes phasmes.\n\nF2 Je retiens\n\n* Le phasme est un insecte : il possède 6 pattes, deux\nantennes et deux yeux. Son corps est formé de trois\nparties : tête, thorax, abdomen.\n\n* Le phasme mange des feuilles de ronces, de lierre et\nde framboisiers.\n\n+ Le phasme grandit et quitte son ancienne enveloppe\n(exuvie). Il mue 7 fois au cours de sa vie jusqu'à sa taille\ndéfinitive. On parle de croissance discontinue.\n\n* Le phasme se reproduit et pond des œufs qui donne-\nront ensuite de jeunes phasmes. Il pond en moyenne\n4 œufs par jour !\n\n* Un phasme bâton vit entre 6 mois et 1 an.\n\n ès sé\n\nIdentifier et construire le cycle de vie d'un animal à\ntravers deux cas : croissance continue et croissance\ndiscontinue (métamorphose).\n\n8 Jen’ interroge\n\nL'enseignant-e montre plusieurs photos d'animaux (— sur\nCD-Rom) : un chat, un chaton, un homme, un bébé, une\npoule, un poussin, un criquet (un jeune et un adulte), un\nphasme (jeune et adulte), une grenouille, un tétard, un\npapillon, une chenille... On interroge ensuite les élèves :\n\nVous connaissez tous ces animaux. Mais êtes-vous\ncapables de retrouver les bébés de chaque adulte ?\n\nL'enseignant-e propose de tenter de les classer : d'un côté\nceux dont les bébés ressemblent aux adultes et de l'autre\nceux qui ont des petits qui ne ressemblent pas aux adultes.\nPour cela, on distribue la fiche à découper (— sur CD-Rom).\nOn obtiendra ainsi le classement suivant :\n\n— petits qui ressemblent à l'adulte : chaton/chat ; poussin/\npoule ; bébé/homme ; bébé phasme/phasme adulte ; bébé\ncriquet/criquet adulte.\n\n— petits qui ne ressemblent pas à l'adulte :\npapillon ; tétard/grenouille ; larve/coccinelle.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n_\n\nchenille/ —\n\nUne fois le classement réalisé, l'enseignant-e demandera\naux élèves :\n\n| Mais alors, est-ce que les animaux dont les petits\nressemblent à l'adulte grandissent de la même façon?\n\nLes élèves pourront dire que le phasme mue (élevage réa-\nlisé en classe les années précédentes) ou que le chaton va\ndevenir un chat et qu'ils ne se ressemblent pas, car le chat\nn'a pas de mue...\n\nRappel pour l'enseignant-e :\ndéveloppement :\n\n— le développement direct (le jeune ressemble à l'adulte)\navec soit une croissance continue (comme le chat) ou une\ncroissance discontinue (comme le phasme) ;\n\n— le développement indirect (le jeune ne ressemble pas à\nl'adulte) avec soit une croissance continue (comme la gre-\nnouille) ou une croissance discontinue (comme le papillon).\nPour simplifier et faire en sorte que les élèves ne confondent\npas développement et croissance, nous simplifierons et\nparlerons seulement de bébé/petit ressemblant à l'adulte\net de bébé/petit ne ressemblant pas à l'adulte.\n\nIl existe deux types de\n\nÉ Je recherche\n\nLes élèves ont déjà distingué deux groupes d'animaux : ceux\ndont le petit ressemble à l'adulte et ceux dont le petit ne\nressemble pas à l'adulte. L'enseignant-e fait le point sur ce\npremier travail et rappelle qu'il s'agit du développement de\nl'animal mais pas de sa croissance. Maintenant, par groupe,\nles élèves vont tenter de classer les animaux représentés en\ndeux nouvelles catégories liées à la croissance. Pour aider\n\nec— RE\n\nbY\nles élèves, on peut les orienter avec de nouvelles propoëi-\ntions : « Vous allez mettre d'un côté les animaux qui selon\nvous muent et de l'autre les animaux qui ne muent pas ».\nLors de la correction à l'oral, 'enseignant-e fera ainsi émer-\nger deux types de croissances :\n— les animaux à croissance continue : comme les chats, les\nchiens, les oiseaux, les vaches, mais aussi les hommes et les\ngrenouilles (à ne pas confondre avec son développement) ;\n— les animaux à croissance discontinue comme les phasmes,\nles criquets, les papillons, les coccinelles.\nN.B. : La mue est le fait de changer de « peau ». La méta-\nmorphose est le passage d'une forme larvaire à une forme\nadulte. Elle est dite incomplète (chez le phasme) ou com-\nplète (papillon, libellule).\nLes élèves remplissent ensuite la fiche élève 4 (niveau CE1 :\nidentification d'un cycle de vie continue et discontinue) et\nla fiche élève 5 (niveau CE2 : construction d'un cycle de vie\ncontinue et discontinue).\n\n[7] Je retiens\n\n+ Comme tous les êtres vivants, les animaux subissent\ndes modifications au cours de leur vie.\n\n« Certains animaux ont une croissance continue : ils\ngrandissent régulièrement. C'est le cas des mammifères\n(cochon d'inde, chat, chien, vache...) ou de la grenouille.\n« D'autres ont une croissance discontinue : ils gran-\ndissent par palier, ils ont des mues successives. C'est\nle cas de certains insectes : phasme, criquet, papillon. On\nparle alors de métamorphose.\n\nLE PHASME\n\nLes antennes\n\nLa tête\n\nLe thorax L'abdomen\n\nLes pattes\n\n© Le phasme est un insecte.\n\ne || possède 6 pattes, deux antennes et deux yeux.\n\ne Son corps est formé de trois parties : tête, thorax, abdomen.\n\n© Le phasme mange des feuilles de ronces, de lierre et de framboisiers.\n© Le phasme grandit et quitte son ancienne enveloppe.\n\n© On parle de croissance discontinue.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nComment reconnaître le monde vivant ? « 85",
    guidePageDecisions: [
      {
        page: 83,
        confidence: 93,
        score: 24,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "en classe",
        ],
        phaseMarkers: ["je m'interroge", "je recherche"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on propose", "groupe", "en classe"],
        studentLike: true,
      },
      {
        page: 84,
        confidence: 92,
        score: 22,
        included: true,
        strongMarkers: [
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "en classe",
        ],
        phaseMarkers: ["je m'interroge", "j'observe", "je retiens"],
        teacherLanguageMarkers: [
          "enseignant",
          "eleves",
          "on interroge",
          "on distribue",
          "en classe",
        ],
        studentLike: true,
      },
      {
        page: 85,
        confidence: 92,
        score: 18,
        included: true,
        strongMarkers: ["l'enseignant", "enseignant-e", "les eleves", "aux eleves", "en classe"],
        phaseMarkers: ["je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "groupe", "en classe"],
        studentLike: true,
      },
      {
        page: 86,
        confidence: 90,
        score: 1,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: false,
      },
    ],
    skippedProbePages: [86],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-08",
    dossierNumber: 8,
    partNumber: 2,
    partTitle: "Comment reconnaître le monde vivant ?",
    title: "Comment vivent les êtres vivants ensemble ?",
    guidePages: [99, 100],
    guidePageCount: 2,
    objectives: [
      "» Observer les végétaux et les animaux dans un milieu proche au fil des saisons.",
      "Constater la diversité des êtres vivants présents dans un milieu et leur interdépendance.",
      "Connaitre les régimes alimentaires de quelques animaux et prendre conscience que les",
      "animaux dépendent des plantes pour se nourrir (notion de chaine alimentaire)",
    ],
    progressionNote:
      "Ce dossier aborde la diversité du vivant et les interactions des êtres vivants, entre eux et\navec leur milieu, dans un environnement proche de l’école. Il est traité durant les trois\nannées du cycle 2. Au CP, il s'agit de constater la diversité des êtres vivants présents dans\nun milieu et de repérer des relations alimentaires (un végétal mangé par un animal, un\nanimal mangé par un autre animal). Au CET, l'élève prend conscience que les animaux\ndépendent des plantes pour se nourrir. En fin de cycle, on aborde les chaines et réseaux\nalimentaires, ainsi que la place des prédateurs. Pour traiter l'ensemble de ces thématiques,\nnous vous proposons deux séances et des fiches adaptées à chaque niveau du cycle.",
    material: [],
    sessions: [
      {
        number: 1,
        title:
          "Observer les végétaux et les animaux dans un milieu proche au fil des saisons. Constater la diversité des êtres vivants présents dans",
        rawText:
          "séance 1 OCT\n\nObserver les végétaux et les animaux dans un milieu\nproche au fil des saisons.\n\nConstater la diversité des êtres vivants présents dans\nun milieu.\n\nConnaitre les régimes alimentaires de quelques animaux.\n\nN.B. : Cette séance peut également être faite au niveau\nCE1, notamment pour réactiver les connaissances acquises.\n\na Je m'interroge\n\nN.B. : Si possible, on privilégiera le printemps pour mettre\nen place cette séance.\n\nL'enseignant-e propose aux élèves de se rendre dans la cour\nde l'école, ou dans un parc voisin, avec un appareil photo\nou/et un crayon gris, un carnet, des loupes. On les interroge\nalors :\n\nPouvez-vous observer attentivement la cour\net les abords de l'école pour retrouver tous les êtres\nvivants qui y vivent ?\n\nOn demande aux élèves de rappeler ce qu'est un être vivant |\n\net de donner quelques exemples d'êtres vivants et d'élé-\nments non vivants. L'enseignant-e précise que les élèves\npeuvent se déplacer, dans un périmètre établi au préalable.\nPuis on ajoute que nous noterons ou/et photographierons\ntout ce que les élèves trouveront et où cela a été trouvé.\nLes animaux ne sont bien sûr pas ramassés !\n\n J'observe\n\nLes élèves se lancent dans une observation qui va recenser\nles végétaux et animaux visibles ce jour-là. N.B. : Il n'est\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\npas nécessaire pour l'enseignant-e de connaître les noms\nde tous les végétaux ou animaux rencontrés. L'idée est ici\nde constater la diversité du vivant dans un environnement\ndonné. Les végétaux inconnus peuvent être repérés par une\nphoto.\n\nDe retour dans la classe, on pourra projeter les photos\nréalisées et procéder à un premier classement végétaux/\nanimaux à l'aide de la fiche élève 1 (recto).\n\nN.B. Cette séance d'observation peut être reproduite à\nchaque nouvelle saison. La fiche élève 1 peut ainsi être uti-\nlisée autant de fois que nécessaire. L'intérêt d'une observa-\ntion dans le temps, c'est qu’elle permet de constater :\n\n— le cycle de vie des végétaux ;\n\n— l'émergence de certaines espèces animales au printemps\nou la disparition d’autres en hiver\n\nL'enseignant-e prolonge ce travail d'observation par l'étude\nd'un autre milieu proche, la forêt, en observant le régime\nalimentaire de quelques animaux qui y vivent. Ce travail\npeut se faire avec la fiche élève 1 (verso).\n\nL2 Je retiens\n\n« Tout autour de nous, il y a de nombreux êtres vivants :\ndes végétaux et des animaux. Ce que nous observons\nchez ces êtres vivants change selon les saisons.\n\n«Tous les animaux n'ont pas le même régime\nalimentaire :\n\n— les carnivores mangent d'autres animaux ;\n\n— les végétariens mangent des végétaux ;\n\n— les omnivores mangent des végétaux et des animaux.\n\nComment reconnaître le monde vivant ? » 99\n\nFiche enseignant",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "N.B. : Si possible, on privilégiera le printemps pour mettre\nen place cette séance.\n\nL'enseignant-e propose aux élèves de se rendre dans la cour\nde l'école, ou dans un parc voisin, avec un appareil photo\nou/et un crayon gris, un carnet, des loupes. On les interroge\nalors :\n\nPouvez-vous observer attentivement la cour\net les abords de l'école pour retrouver tous les êtres\nvivants qui y vivent ?\n\nOn demande aux élèves de rappeler ce qu'est un être vivant |\n\net de donner quelques exemples d'êtres vivants et d'élé-\nments non vivants. L'enseignant-e précise que les élèves\npeuvent se déplacer, dans un périmètre établi au préalable.\nPuis on ajoute que nous noterons ou/et photographierons\ntout ce que les élèves trouveront et où cela a été trouvé.\nLes animaux ne sont bien sûr pas ramassés !",
          },
          {
            title: "J'observe",
            detail:
              "Les élèves se lancent dans une observation qui va recenser\nles végétaux et animaux visibles ce jour-là. N.B. : Il n'est\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\npas nécessaire pour l'enseignant-e de connaître les noms\nde tous les végétaux ou animaux rencontrés. L'idée est ici\nde constater la diversité du vivant dans un environnement\ndonné. Les végétaux inconnus peuvent être repérés par une\nphoto.\n\nDe retour dans la classe, on pourra projeter les photos\nréalisées et procéder à un premier classement végétaux/\nanimaux à l'aide de la fiche élève 1 (recto).\n\nN.B. Cette séance d'observation peut être reproduite à\nchaque nouvelle saison. La fiche élève 1 peut ainsi être uti-\nlisée autant de fois que nécessaire. L'intérêt d'une observa-\ntion dans le temps, c'est qu’elle permet de constater :\n\n— le cycle de vie des végétaux ;\n\n— l'émergence de certaines espèces animales au printemps\nou la disparition d’autres en hiver\n\nL'enseignant-e prolonge ce travail d'observation par l'étude\nd'un autre milieu proche, la forêt, en observant le régime\nalimentaire de quelques animaux qui y vivent. Ce travail\npeut se faire avec la fiche élève 1 (verso).\n\nL2",
          },
          {
            title: "Je retiens",
            detail:
              "« Tout autour de nous, il y a de nombreux êtres vivants :\ndes végétaux et des animaux. Ce que nous observons\nchez ces êtres vivants change selon les saisons.\n\n«Tous les animaux n'ont pas le même régime\nalimentaire :\n\n— les carnivores mangent d'autres animaux ;\n\n— les végétariens mangent des végétaux ;\n\n— les omnivores mangent des végétaux et des animaux.\n\nComment reconnaître le monde vivant ? » 99\n\nFiche enseignant",
          },
        ],
      },
      {
        number: 2,
        title:
          "Connaitre les régimes alimentaires de quelques animaux. Prendre conscience que les animaux dépendent des plantes pour se nourrir (notion de chaine alimentaire).",
        rawText:
          "| séance 2 FT ICT 1.\n\nConnaitre les régimes alimentaires de quelques animaux.\nPrendre conscience que les animaux dépendent des\nplantes pour se nourrir (notion de chaine alimentaire).\nIdentifier et classer les interactions en chaines, (réseau\nalimentaire et place des prédateurs).\n\na Je m'interroge\n\nL'enseignant-e a à sa disposition des images (— sur le\nCD-Rom) : un renard, un chevreuil, un lapin, un campagnol,\nune taupe, une buse, un merle, un escargot, un scarabé, un\nver de terre, une noisette, de l'herbe, des feuilles d'arbres, |\ndes baies. On ne les montre pas tout de suite ; on explique |\nd'abord aux élèves : « Nous allons nous intéresser à des\nêtres vivants qui vivent dans les champs et les haies. » On\ninterroge alors les élèves :\n\nEn connaissez-vous ? Quels animaux vivent dans\nles champs ? dans les haies ? Que mangent-ils ?\n\nPour les animaux, on peut attendre les réponses suivantes :\n« des renards, des lapins, des lièvres, des escargots, des\noiseaux, des serpents... » Et sur les régimes alimentaires :\n« le renard mange des poules, des lapins », « les oiseaux\nmangent des graines ou des fruits », « les lièvres et les\nlapins mangent de l'herbe... ».\n\nOn montre alors les images de la fiche à découper (— sur\nCD-Rom) à la classe.\n\nJe recherche\n\nLorsque toutes les images ont été observées, on procède\ncollectivement à des associations « …est mangé par... » en\nrappelant au préalable les trois régimes alimentaires vus\ndans la séance 1 : végétarien, carnivore, omnivore.\nL'enseignant-e va aller plus loin en déroulant plusieurs\nchaines alimentaires (on introduit ce vocabulaire à cette\noccasion) à partir des images et de la fiche élève 2. Il s'agit\nde faire remarquer aux élèves qu’à la base de chaque chaine\nalimentaire se trouve un végétal.\n\nAvec les CE2, on pourra faire ressortir que ces chaines ali-\nmentaires sont liées. Elles composent un réseau alimen-\n\n| taire. On introduira également le vocabulaire de proie et de\n\nprédateur avant de distribuer la fiche élève 3.\n\n2 Jeretiens D rx\n\n« Les êtres vivants mangés les uns par les autres forment\nune chaine alimentaire.\n\n+ À la base d'une chaine alimentaire, on trouve toujours\nun végétal.\n\n* Plusieurs chaines alimentaires peuvent se relier et for-\nmer un réseau alimentaire.\n\n+ Un animal mangé par un autre animal est sa proie. Un\nanimal qui mange un autre animal est son prédateur.\n\nÉcureuil \\-\n= -\n\nINN\n\nRégime alimentaire\nPrédateur\n\nChaine alimentaire\n\nNg\nLapin\npe\nwb edhe\nChenille Herbe Campagnol Noisette\n—> est mangé par\nMots à retenir\nCarnivore Omnivore Végétarien\n\nRéseau alimentaire\nProie\n\n100 « Comment reconnaitre le monde vivant ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e a à sa disposition des images (— sur le\nCD-Rom) : un renard, un chevreuil, un lapin, un campagnol,\nune taupe, une buse, un merle, un escargot, un scarabé, un\nver de terre, une noisette, de l'herbe, des feuilles d'arbres, |\ndes baies. On ne les montre pas tout de suite ; on explique |\nd'abord aux élèves : « Nous allons nous intéresser à des\nêtres vivants qui vivent dans les champs et les haies. » On\ninterroge alors les élèves :\n\nEn connaissez-vous ? Quels animaux vivent dans\nles champs ? dans les haies ? Que mangent-ils ?\n\nPour les animaux, on peut attendre les réponses suivantes :\n« des renards, des lapins, des lièvres, des escargots, des\noiseaux, des serpents... » Et sur les régimes alimentaires :\n« le renard mange des poules, des lapins », « les oiseaux\nmangent des graines ou des fruits », « les lièvres et les\nlapins mangent de l'herbe... ».\n\nOn montre alors les images de la fiche à découper (— sur\nCD-Rom) à la classe.",
          },
          {
            title: "Je recherche",
            detail:
              "Lorsque toutes les images ont été observées, on procède\ncollectivement à des associations « …est mangé par... » en\nrappelant au préalable les trois régimes alimentaires vus\ndans la séance 1 : végétarien, carnivore, omnivore.\nL'enseignant-e va aller plus loin en déroulant plusieurs\nchaines alimentaires (on introduit ce vocabulaire à cette\noccasion) à partir des images et de la fiche élève 2. Il s'agit\nde faire remarquer aux élèves qu’à la base de chaque chaine\nalimentaire se trouve un végétal.\n\nAvec les CE2, on pourra faire ressortir que ces chaines ali-\nmentaires sont liées. Elles composent un réseau alimen-\n\n| taire. On introduira également le vocabulaire de proie et de\n\nprédateur avant de distribuer la fiche élève 3.\n\n2 Jeretiens D rx\n\n« Les êtres vivants mangés les uns par les autres forment\nune chaine alimentaire.\n\n+ À la base d'une chaine alimentaire, on trouve toujours\nun végétal.\n\n* Plusieurs chaines alimentaires peuvent se relier et for-\nmer un réseau alimentaire.\n\n+ Un animal mangé par un autre animal est sa proie. Un\nanimal qui mange un autre animal est son prédateur.\n\nÉcureuil \\-\n= -\n\nINN\n\nRégime alimentaire\nPrédateur\n\nChaine alimentaire\n\nNg\nLapin\npe\nwb edhe\nChenille Herbe Campagnol Noisette\n—> est mangé par\nMots à retenir\nCarnivore Omnivore Végétarien\n\nRéseau alimentaire\nProie\n\n100 « Comment reconnaitre le monde vivant ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
          },
        ],
      },
    ],
    guideText:
      "| Comment vivent les êtres vivants ensemble ?\n\n| * Identifier et classer les interactions en chaines (réseau alimentaire et place des prédateurs).\n\n> Objectifs )\n\n» Observer les végétaux et les animaux dans un milieu proche au fil des saisons.\n* Constater la diversité des êtres vivants présents dans un milieu et leur interdépendance.\n* Connaitre les régimes alimentaires de quelques animaux et prendre conscience que les\n\nanimaux dépendent des plantes pour se nourrir (notion de chaine alimentaire)\n\n> Indications de progression dans le cycle 2\n\nCe dossier aborde la diversité du vivant et les interactions des êtres vivants, entre eux et\navec leur milieu, dans un environnement proche de l’école. Il est traité durant les trois\nannées du cycle 2. Au CP, il s'agit de constater la diversité des êtres vivants présents dans\nun milieu et de repérer des relations alimentaires (un végétal mangé par un animal, un\nanimal mangé par un autre animal). Au CET, l'élève prend conscience que les animaux\ndépendent des plantes pour se nourrir. En fin de cycle, on aborde les chaines et réseaux\nalimentaires, ainsi que la place des prédateurs. Pour traiter l'ensemble de ces thématiques,\n\nnous vous proposons deux séances et des fiches adaptées à chaque niveau du cycle.\n\nséance 1 OCT\n\nObserver les végétaux et les animaux dans un milieu\nproche au fil des saisons.\n\nConstater la diversité des êtres vivants présents dans\nun milieu.\n\nConnaitre les régimes alimentaires de quelques animaux.\n\nN.B. : Cette séance peut également être faite au niveau\nCE1, notamment pour réactiver les connaissances acquises.\n\na Je m'interroge\n\nN.B. : Si possible, on privilégiera le printemps pour mettre\nen place cette séance.\n\nL'enseignant-e propose aux élèves de se rendre dans la cour\nde l'école, ou dans un parc voisin, avec un appareil photo\nou/et un crayon gris, un carnet, des loupes. On les interroge\nalors :\n\nPouvez-vous observer attentivement la cour\net les abords de l'école pour retrouver tous les êtres\nvivants qui y vivent ?\n\nOn demande aux élèves de rappeler ce qu'est un être vivant |\n\net de donner quelques exemples d'êtres vivants et d'élé-\nments non vivants. L'enseignant-e précise que les élèves\npeuvent se déplacer, dans un périmètre établi au préalable.\nPuis on ajoute que nous noterons ou/et photographierons\ntout ce que les élèves trouveront et où cela a été trouvé.\nLes animaux ne sont bien sûr pas ramassés !\n\n J'observe\n\nLes élèves se lancent dans une observation qui va recenser\nles végétaux et animaux visibles ce jour-là. N.B. : Il n'est\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\npas nécessaire pour l'enseignant-e de connaître les noms\nde tous les végétaux ou animaux rencontrés. L'idée est ici\nde constater la diversité du vivant dans un environnement\ndonné. Les végétaux inconnus peuvent être repérés par une\nphoto.\n\nDe retour dans la classe, on pourra projeter les photos\nréalisées et procéder à un premier classement végétaux/\nanimaux à l'aide de la fiche élève 1 (recto).\n\nN.B. Cette séance d'observation peut être reproduite à\nchaque nouvelle saison. La fiche élève 1 peut ainsi être uti-\nlisée autant de fois que nécessaire. L'intérêt d'une observa-\ntion dans le temps, c'est qu’elle permet de constater :\n\n— le cycle de vie des végétaux ;\n\n— l'émergence de certaines espèces animales au printemps\nou la disparition d’autres en hiver\n\nL'enseignant-e prolonge ce travail d'observation par l'étude\nd'un autre milieu proche, la forêt, en observant le régime\nalimentaire de quelques animaux qui y vivent. Ce travail\npeut se faire avec la fiche élève 1 (verso).\n\nL2 Je retiens\n\n« Tout autour de nous, il y a de nombreux êtres vivants :\ndes végétaux et des animaux. Ce que nous observons\nchez ces êtres vivants change selon les saisons.\n\n«Tous les animaux n'ont pas le même régime\nalimentaire :\n\n— les carnivores mangent d'autres animaux ;\n\n— les végétariens mangent des végétaux ;\n\n— les omnivores mangent des végétaux et des animaux.\n\nComment reconnaître le monde vivant ? » 99\n\nFiche enseignant\n\n| séance 2 FT ICT 1.\n\nConnaitre les régimes alimentaires de quelques animaux.\nPrendre conscience que les animaux dépendent des\nplantes pour se nourrir (notion de chaine alimentaire).\nIdentifier et classer les interactions en chaines, (réseau\nalimentaire et place des prédateurs).\n\na Je m'interroge\n\nL'enseignant-e a à sa disposition des images (— sur le\nCD-Rom) : un renard, un chevreuil, un lapin, un campagnol,\nune taupe, une buse, un merle, un escargot, un scarabé, un\nver de terre, une noisette, de l'herbe, des feuilles d'arbres, |\ndes baies. On ne les montre pas tout de suite ; on explique |\nd'abord aux élèves : « Nous allons nous intéresser à des\nêtres vivants qui vivent dans les champs et les haies. » On\ninterroge alors les élèves :\n\nEn connaissez-vous ? Quels animaux vivent dans\nles champs ? dans les haies ? Que mangent-ils ?\n\nPour les animaux, on peut attendre les réponses suivantes :\n« des renards, des lapins, des lièvres, des escargots, des\noiseaux, des serpents... » Et sur les régimes alimentaires :\n« le renard mange des poules, des lapins », « les oiseaux\nmangent des graines ou des fruits », « les lièvres et les\nlapins mangent de l'herbe... ».\n\nOn montre alors les images de la fiche à découper (— sur\nCD-Rom) à la classe.\n\nJe recherche\n\nLorsque toutes les images ont été observées, on procède\ncollectivement à des associations « …est mangé par... » en\nrappelant au préalable les trois régimes alimentaires vus\ndans la séance 1 : végétarien, carnivore, omnivore.\nL'enseignant-e va aller plus loin en déroulant plusieurs\nchaines alimentaires (on introduit ce vocabulaire à cette\noccasion) à partir des images et de la fiche élève 2. Il s'agit\nde faire remarquer aux élèves qu’à la base de chaque chaine\nalimentaire se trouve un végétal.\n\nAvec les CE2, on pourra faire ressortir que ces chaines ali-\nmentaires sont liées. Elles composent un réseau alimen-\n\n| taire. On introduira également le vocabulaire de proie et de\n\nprédateur avant de distribuer la fiche élève 3.\n\n2 Jeretiens D rx\n\n« Les êtres vivants mangés les uns par les autres forment\nune chaine alimentaire.\n\n+ À la base d'une chaine alimentaire, on trouve toujours\nun végétal.\n\n* Plusieurs chaines alimentaires peuvent se relier et for-\nmer un réseau alimentaire.\n\n+ Un animal mangé par un autre animal est sa proie. Un\nanimal qui mange un autre animal est son prédateur.\n\nÉcureuil \\-\n= -\n\nINN\n\nRégime alimentaire\nPrédateur\n\nChaine alimentaire\n\nNg\nLapin\npe\nwb edhe\nChenille Herbe Campagnol Noisette\n—> est mangé par\nMots à retenir\nCarnivore Omnivore Végétarien\n\nRéseau alimentaire\nProie\n\n100 « Comment reconnaitre le monde vivant ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
    guidePageDecisions: [
      {
        page: 99,
        confidence: 93,
        score: 24,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
        ],
        phaseMarkers: ["je m'interroge", "j'observe", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on demande"],
        studentLike: false,
      },
      {
        page: 100,
        confidence: 92,
        score: 16,
        included: true,
        strongMarkers: ["seance", "l'enseignant", "enseignant-e", "les eleves", "aux eleves"],
        phaseMarkers: ["je m'interroge", "je recherche"],
        teacherLanguageMarkers: ["enseignant", "eleves"],
        studentLike: true,
      },
      {
        page: 101,
        confidence: 89,
        score: -4,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: true,
      },
    ],
    skippedProbePages: [101],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-09",
    dossierNumber: 9,
    partNumber: 2,
    partTitle: "Comment reconnaître le monde vivant ?",
    title: "Quel avenir pour nos déchets ?",
    guidePages: [111, 112, 113],
    guidePageCount: 3,
    objectives: [
      "+ Identifier quelques interactions dans l'école.",
      "Adopter une attitude citoyenne dans la vie courante.",
    ],
    progressionNote:
      "Ce dossier vise à développer chez les élèves une attitude citoyenne dans diverses situations\nde la vie de l'école : respect de l'environnement (école, jardin...), lutte contre le gaspillage,\ntri des déchets... Nous vous proposons d'aborder ces thématiques durant les trois années\ndu cycle 2 avec la progression suivante : au CP, identifier les déchets de papier et de plas-\ntique de la classe et les possibilités de recyclage ; au CE1, identifier le gaspillage alimen-\ntaire à la cantine et le devenir des déchets ; au CE2, repérer les déchets de la vie courante\net connaître leur devenir. À chaque niveau correspond des fiches élève et d'évaluation\nadaptées. Enfin, un objectif transversal, en lien direct avec 'EMC, concernera les attitudes\nStoycnne à adopter dans la vie courante. Il sera traité dans une fiche élève tous niveaux.",
    material: [],
    sessions: [
      {
        number: 1,
        title:
          "Identifier quelques interactions dans l’école : l'exemple des déchets de papier et de plastique.",
        rawText:
          "Séance 1 JF 1\n\nIdentifier quelques interactions dans l’école : l'exemple\ndes déchets de papier et de plastique.\n\na8 Je m'interroge\nL'enseignant-e aura conservé la poubelle de classe de la\nveille. On la présente aux élèves et on les interroge :\n\n[Que pensez-vous que contienne cette poubelle ?\n\nOn peut attendre les réponses suivantes : « du papier »,\n« des mouchoirs sales », « des emballages de gouter »,\n« des cartouches d'encre vides », « le contenu de taille-\ncrayons », « des feutres usagés », « des bâtons de colle\nvides ».\n\nL'enseignant-e, muni-e de gants de latex, vide la poubelle\nsur un plastique et demande aux élèves :\n\nEst-il possible de trier ces déchets ? Comment ?\nPourquoi est-ce intéressant de les trier ?\nQue peut-on faire avec ces déchets ?\n\nLes élèves sont habitués depuis maintenant plusieurs\nannées au tri des déchets, notamment à la maison. On\npeut donc attendre les réponses suivantes : « les papiers\npeuvent être mis ensemble, on peut en faire du nouveau\npapier » (certains emploieront peut être le mot recycler),\n«il y a des poubelles spéciales pour mettre le papier », « on\npeut mettre les objets en plastique ensemble aussi, dans\nles poubelles jaunes », « on peut refaire des choses en plas-\ntique avec », « quand on recycle, on ne gaspille pas comme\nça et on ne pollue pas la Terre ».\n\nN.B. : Le tri des déchets fonctionne souvent différemment\nselon les communautés d'agglomérations ou de com-\nmunes. Les réponses des élèves peuvent donc différer en\nfonction de leurs lieux d'habitation.\n\nÀ la fin de ces échanges, l'enseignant-e propose de recher-\ncher collectivement les matériaux d'origine de ces déchets.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n© Je recherche\n\nL'enseignant-e recherche avec ses élèves les origines du\npapier (bois) et du plastique (pétrole). Pour cela, on peut\nutiliser Internet pour mener une recherche collective (par\nexemple : https://fr.vikidia.org/wiki/Tri_sélectif).\n\nOn sépare alors ces deux types de déchets.\n\nLa recherche menée est l'occasion d'évoquer :\n\n— l'épuisement des ressources naturelles qui sont limitées,\nmais aussi la déforestation ;\n\n— la pollution qu'entraine la multiplication de ces déchets\ns'ils ne sont pas recyclés.\n\nCette séance est également l'occasion, si ce n'est pas\ndéjà le cas dans l'école, de mettre en place un tri sélectif.\nL'enseignant-e distribue ensuite aux élèves la fiche élève 1.\n\n2 Je retiens\n\n* Comme à la maison, nous produisons des déchets à\nl'école.\n\n« Le papier et le plastique peuvent être recyclés : on\npeut les réutiliser pour fabriquer à nouveau du papier ou\ndes objets en plastique.\n\n«On évite ainsi des pollutions et du gaspillage de\nmatériaux (bois, pétrole).\n\nIdentifier quelques interactions dans l'école : l'exemple\ndu gaspillage alimentaire à la cantine et le devenir des\ndéchets.\n\ne Je m'interroge\n\nIl peut être judicieux de commencer cette séance par un\nrepas partagé à la cantine avec ses élèves. L'enseignant-e\npeut prendre quelques photos d'assiettes à la fin du repas :\n\nComment reconnaitre le monde vivant ? o 111\n\nFiche enseignant\n\ncertaines sans déchets, d'autres au contraire où l'on peut\nconstater un fort gaspillage et des photos de la (des) pou-\nbelle(s). On peut à cette occasion demander au person-\nnel de la cantine, devant les élèves, ce que deviennent ces\ndéchets.\n\nDe retour en classe, l'enseignant-e projette les photos aux\nélèves. On leur demande :\n\n| Que constatez-vous en regardant les photos de ces\n| assiettes et de ces poubelles à la fin du repas ?\n\n| D'après vous, que devient toute cette nourriture\n\n| qui n’a pas été mangée ?\n\nOn peut attendre les réponses suivantes : « il reste de la\nnourriture », « les restes vont à la poubelle ».\nL'enseignant-e interroge à nouveau les élèves :\n\n| Que pouvons-nous faire pour limiter ces déchets et\n{recycler ce qui est mis à la poubelle ?\n\nOn peut attendre les réponses suivantes : « certains gas-\npillent la nourriture, ils prennent des choses qu'ils ne\nmangent pas », « quand on se sert, il faut manger ce qu'on\nprend et se resservir si on a encore faim », « on pourrait\nles donner à des animaux (poules ) ou les mettre dans le\ncomposteur de l'école ».\n\nŒ Je recherche\n\nL'enseignant-e note au tableau les réflexions de ses élèves\ndans trois colonnes : 1) les exemples de gaspillage alimen-\ntaire ; 2) les bons comportements ; 3) le recyclage possible\ndes aliments jetés. On leur demande d'essayer de retrouver\nle titre que l'on pourrait donner à chacune des colonnes.\nL'enseignant-e fait ainsi émerger la notion de déchets bio-\ndégradables pour les restes de la cantine, c'est-à-dire issus\nde matières vivantes et qui peuvent se dégrader, se décom-\nposer, sans polluer. Au contraire, on peut même ensuite s’en\nresservir (compost, nourriture pour les poules ).\n\nOn mettra en exergue les comportements à suivre à la can-\ntine. L'enseignant-e distribue alors la fiche élève 2.\n\n#3 Je retiens\n\nPour éviter le gaspillage de nourriture à la cantine,\nje ne mets dans mon assiette que ce que je vais\nmanger. Je me ressers si j'ai encore faim.\n\n*Les déchets de la cantine qui sont biodégradables\npeuvent être mis dans le composteur de l’école.\nIls deviendront du compost.\n\nr quelques interactions dans l'école : l'exemple\ndes déchets de la vie courante et de leur devenir.\n\na Je m'interroge\n\nL'enseignant-e rappelle aux élèves le travail qu'ils ont mené\nsur les déchets à l'école, au CP et au CE1 (séances 1 et 2).\nOn leur propose ensuite d'élargir ce travail à l'ensemble des\ndéchets de la vie courante et on leur pose les questions\nsuivantes :\n\n112 « Comment reconnaître le monde vivant ?\n\nQue met-on à la poubelle chez soi, à la maison ?\nQue deviennent ces déchets ?\n\nEn dehors des déchets alimentaires, on peut attendre des\nréponses comme : des emballages, des boites de conserve,\ndu sopalin sale, du coton, des cotons tiges, des vieux papiers,\ndes bouteilles en verre...\n\nL'enseignant-e indique alors aux élèves qu'ils vont réfléchir\nà ces déchets et à ce qu'ils pourraient devenir.\n\nŒ Je recherche\n\nLes élèves sont alors placés par groupes de 2. Ils ont à leur\ndisposition une feuille A4 séparée en deux colonnes. Ils\nreçoivent la consigne suivante : « Écrivez dans la colonne de\ngauche les déchets qui sont mis chaque jour à la poubelle\net, dans la colonne de droite, en face de chaque déchet, ce\nqu'ils peuvent devenir, comment ils peuvent être recyclés »\n(on expliquera de nouveau ce mot si nécessaire).\n\nAprès un temps de recherche (15 min), chaque groupe\nprésente ses résultats. L'enseignant-e note au tableau les\ngrandes filières de recyclage (papier et carton, plastique,\nverre, métal, compost) au fur et à mesure des présentations\nréalisées. On distribue ensuite la fiche élève 3.\n\n#3 Je retiens\n\n* Les déchets que nous produisons peuvent être souvent\nrecyclés, c'est-à-dire utilisés pour fabriquer de nou-\nveaux objets.\n\n* C'est le cas pour le verre, le papier, le plastique, les\ndéchets biodégradables...\n\n+ Le « tout-venant » qui reste est incinéré ou enfoui\ndans des centres spécialisés.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e aura conservé la poubelle de classe de la\nveille. On la présente aux élèves et on les interroge :\n\n[Que pensez-vous que contienne cette poubelle ?\n\nOn peut attendre les réponses suivantes : « du papier »,\n« des mouchoirs sales », « des emballages de gouter »,\n« des cartouches d'encre vides », « le contenu de taille-\ncrayons », « des feutres usagés », « des bâtons de colle\nvides ».\n\nL'enseignant-e, muni-e de gants de latex, vide la poubelle\nsur un plastique et demande aux élèves :\n\nEst-il possible de trier ces déchets ? Comment ?\nPourquoi est-ce intéressant de les trier ?\nQue peut-on faire avec ces déchets ?\n\nLes élèves sont habitués depuis maintenant plusieurs\nannées au tri des déchets, notamment à la maison. On\npeut donc attendre les réponses suivantes : « les papiers\npeuvent être mis ensemble, on peut en faire du nouveau\npapier » (certains emploieront peut être le mot recycler),\n«il y a des poubelles spéciales pour mettre le papier », « on\npeut mettre les objets en plastique ensemble aussi, dans\nles poubelles jaunes », « on peut refaire des choses en plas-\ntique avec », « quand on recycle, on ne gaspille pas comme\nça et on ne pollue pas la Terre ».\n\nN.B. : Le tri des déchets fonctionne souvent différemment\nselon les communautés d'agglomérations ou de com-\nmunes. Les réponses des élèves peuvent donc différer en\nfonction de leurs lieux d'habitation.\n\nÀ la fin de ces échanges, l'enseignant-e propose de recher-\ncher collectivement les matériaux d'origine de ces déchets.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n©",
          },
          {
            title: "Je recherche",
            detail:
              "L'enseignant-e recherche avec ses élèves les origines du\npapier (bois) et du plastique (pétrole). Pour cela, on peut\nutiliser Internet pour mener une recherche collective (par\nexemple : https://fr.vikidia.org/wiki/Tri_sélectif).\n\nOn sépare alors ces deux types de déchets.\n\nLa recherche menée est l'occasion d'évoquer :\n\n— l'épuisement des ressources naturelles qui sont limitées,\nmais aussi la déforestation ;\n\n— la pollution qu'entraine la multiplication de ces déchets\ns'ils ne sont pas recyclés.\n\nCette séance est également l'occasion, si ce n'est pas\ndéjà le cas dans l'école, de mettre en place un tri sélectif.\nL'enseignant-e distribue ensuite aux élèves la fiche élève 1.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "* Comme à la maison, nous produisons des déchets à\nl'école.\n\n« Le papier et le plastique peuvent être recyclés : on\npeut les réutiliser pour fabriquer à nouveau du papier ou\ndes objets en plastique.\n\n«On évite ainsi des pollutions et du gaspillage de\nmatériaux (bois, pétrole).\n\nIdentifier quelques interactions dans l'école : l'exemple\ndu gaspillage alimentaire à la cantine et le devenir des\ndéchets.\n\ne",
          },
          {
            title: "Je m'interroge",
            detail:
              "Il peut être judicieux de commencer cette séance par un\nrepas partagé à la cantine avec ses élèves. L'enseignant-e\npeut prendre quelques photos d'assiettes à la fin du repas :\n\nComment reconnaitre le monde vivant ? o 111\n\nFiche enseignant\n\ncertaines sans déchets, d'autres au contraire où l'on peut\nconstater un fort gaspillage et des photos de la (des) pou-\nbelle(s). On peut à cette occasion demander au person-\nnel de la cantine, devant les élèves, ce que deviennent ces\ndéchets.\n\nDe retour en classe, l'enseignant-e projette les photos aux\nélèves. On leur demande :\n\n| Que constatez-vous en regardant les photos de ces\n| assiettes et de ces poubelles à la fin du repas ?\n\n| D'après vous, que devient toute cette nourriture\n\n| qui n’a pas été mangée ?\n\nOn peut attendre les réponses suivantes : « il reste de la\nnourriture », « les restes vont à la poubelle ».\nL'enseignant-e interroge à nouveau les élèves :\n\n| Que pouvons-nous faire pour limiter ces déchets et\n{recycler ce qui est mis à la poubelle ?\n\nOn peut attendre les réponses suivantes : « certains gas-\npillent la nourriture, ils prennent des choses qu'ils ne\nmangent pas », « quand on se sert, il faut manger ce qu'on\nprend et se resservir si on a encore faim », « on pourrait\nles donner à des animaux (poules ) ou les mettre dans le\ncomposteur de l'école ».\n\nŒ",
          },
          {
            title: "Je recherche",
            detail:
              "L'enseignant-e note au tableau les réflexions de ses élèves\ndans trois colonnes : 1) les exemples de gaspillage alimen-\ntaire ; 2) les bons comportements ; 3) le recyclage possible\ndes aliments jetés. On leur demande d'essayer de retrouver\nle titre que l'on pourrait donner à chacune des colonnes.\nL'enseignant-e fait ainsi émerger la notion de déchets bio-\ndégradables pour les restes de la cantine, c'est-à-dire issus\nde matières vivantes et qui peuvent se dégrader, se décom-\nposer, sans polluer. Au contraire, on peut même ensuite s’en\nresservir (compost, nourriture pour les poules ).\n\nOn mettra en exergue les comportements à suivre à la can-\ntine. L'enseignant-e distribue alors la fiche élève 2.\n\n#3",
          },
          {
            title: "Je retiens",
            detail:
              "Pour éviter le gaspillage de nourriture à la cantine,\nje ne mets dans mon assiette que ce que je vais\nmanger. Je me ressers si j'ai encore faim.\n\n*Les déchets de la cantine qui sont biodégradables\npeuvent être mis dans le composteur de l’école.\nIls deviendront du compost.\n\nr quelques interactions dans l'école : l'exemple\ndes déchets de la vie courante et de leur devenir.\n\na",
          },
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e rappelle aux élèves le travail qu'ils ont mené\nsur les déchets à l'école, au CP et au CE1 (séances 1 et 2).\nOn leur propose ensuite d'élargir ce travail à l'ensemble des\ndéchets de la vie courante et on leur pose les questions\nsuivantes :\n\n112 « Comment reconnaître le monde vivant ?\n\nQue met-on à la poubelle chez soi, à la maison ?\nQue deviennent ces déchets ?\n\nEn dehors des déchets alimentaires, on peut attendre des\nréponses comme : des emballages, des boites de conserve,\ndu sopalin sale, du coton, des cotons tiges, des vieux papiers,\ndes bouteilles en verre...\n\nL'enseignant-e indique alors aux élèves qu'ils vont réfléchir\nà ces déchets et à ce qu'ils pourraient devenir.\n\nŒ",
          },
          {
            title: "Je recherche",
            detail:
              "Les élèves sont alors placés par groupes de 2. Ils ont à leur\ndisposition une feuille A4 séparée en deux colonnes. Ils\nreçoivent la consigne suivante : « Écrivez dans la colonne de\ngauche les déchets qui sont mis chaque jour à la poubelle\net, dans la colonne de droite, en face de chaque déchet, ce\nqu'ils peuvent devenir, comment ils peuvent être recyclés »\n(on expliquera de nouveau ce mot si nécessaire).\n\nAprès un temps de recherche (15 min), chaque groupe\nprésente ses résultats. L'enseignant-e note au tableau les\ngrandes filières de recyclage (papier et carton, plastique,\nverre, métal, compost) au fur et à mesure des présentations\nréalisées. On distribue ensuite la fiche élève 3.\n\n#3",
          },
          {
            title: "Je retiens",
            detail:
              "* Les déchets que nous produisons peuvent être souvent\nrecyclés, c'est-à-dire utilisés pour fabriquer de nou-\nveaux objets.\n\n* C'est le cas pour le verre, le papier, le plastique, les\ndéchets biodégradables...\n\n+ Le « tout-venant » qui reste est incinéré ou enfoui\ndans des centres spécialisés.",
          },
        ],
      },
      {
        number: 4,
        title:
          "Adopter une attitude citoyenne dans la vie courante. N.B. : Cette séance peut être menée indifféremment à chaque année du cycle.",
        rawText:
          "Séance 4 MF INFTIRFTT |\nAdopter une attitude citoyenne dans la vie courante.\n\nN.B. : Cette séance peut être menée indifféremment à\nchaque année du cycle.\n\na Je m'interroge\n\nL'enseignant-e peut prendre comme prétexte des papiers\nde gouter trainant dans la cour, ou une poubelle de classe\npleine...\nN.B. : L'album C'est à nous tous, ça se respecte !, dans la col-\nlection « J'aime mon école ! » (éditions MDI) peut égale-\nment être utilement exploité ici pour support de discussion\naprès une lecture collective en classe.\n\nOn demande alors aux élèves :\n\n[Quelles actions pourrions-nous mettre en place dans\n| l’école pour essayer d'être plus respectueux de notre\n| environnement, moins gaspiller, moins polluer ?\n\nOn peut attendre les réponses suivantes : « on peut faire\nattention à bien mettre à la poubelle nos déchets, ramasser\nles papiers dans la cour quand on en voit, ne pas gaspiller le\npapier en écrivant des deux côtés, ne pas laisser couler l'eau\ntrop longtemps quand on se lave les mains... »\n\nAprès avoir noté au tableau les propositions des élèves,\nl'enseignant-e leur annonce qu'ils vont rechercher les\nactions possibles à mener dans l'école.\n\n© MOI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nŒ Je recherche\n\nOn demande aux élèves de repérer d’abord les différents\nespaces de l'école (la classe, les couloirs, les salles spéci-\nfiques — arts visuels, techno — la cour, le jardin...). Les élèves\nse répartissent alors par groupes de 4. Chaque groupe est\nresponsable d'un espace. Son travail consiste à rechercher\nles différents gaspillages ou « mauvais » comportements\ndans cet espace et à proposer des solutions.\n\nPour clôturer ce travail, une affiche est réalisée par le\ngroupe. Elle peut proposer un slogan qui explique simple-\nment le bon comportement à avoir.\n\nLa fiche élève 4 est le support à cette activité.\n\n2 Je retiens\n\nÀ l’école aussi, j'essaie d'avoir un comportement\ncitoyen et responsable : c'est l'affaire de tous !\n\n* Je ne gaspille pas l'énergie, l'eau, le papier.\n\n* Je trie mes déchets en recyclant tout ce qui peut l'être.\n* Je respecte mon environnement, dans la classe, dans\nla cour, au jardin.\n\nLE RECYCLAGE, C'EST UTILE !\nLes déchets que nous produisons peuvent être souvent recyclés,\nc'est-à-dire utilisés pour fabriquer de nouveaux objets.\nPAPIER\n_ | ET CARTON\nPLASTIQUE\nVERRE\n| METAL\nCOMPOST\n|\nMots à retenir\nDéchets Environnement\n_ Gaspillage Recyclage\n\nBiodégradable\n\nCompost\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nComment reconnaître le monde vivant ? « 113",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e peut prendre comme prétexte des papiers\nde gouter trainant dans la cour, ou une poubelle de classe\npleine...\nN.B. : L'album C'est à nous tous, ça se respecte !, dans la col-\nlection « J'aime mon école ! » (éditions MDI) peut égale-\nment être utilement exploité ici pour support de discussion\naprès une lecture collective en classe.\n\nOn demande alors aux élèves :\n\n[Quelles actions pourrions-nous mettre en place dans\n| l’école pour essayer d'être plus respectueux de notre\n| environnement, moins gaspiller, moins polluer ?\n\nOn peut attendre les réponses suivantes : « on peut faire\nattention à bien mettre à la poubelle nos déchets, ramasser\nles papiers dans la cour quand on en voit, ne pas gaspiller le\npapier en écrivant des deux côtés, ne pas laisser couler l'eau\ntrop longtemps quand on se lave les mains... »\n\nAprès avoir noté au tableau les propositions des élèves,\nl'enseignant-e leur annonce qu'ils vont rechercher les\nactions possibles à mener dans l'école.\n\n© MOI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nŒ",
          },
          {
            title: "Je recherche",
            detail:
              "On demande aux élèves de repérer d’abord les différents\nespaces de l'école (la classe, les couloirs, les salles spéci-\nfiques — arts visuels, techno — la cour, le jardin...). Les élèves\nse répartissent alors par groupes de 4. Chaque groupe est\nresponsable d'un espace. Son travail consiste à rechercher\nles différents gaspillages ou « mauvais » comportements\ndans cet espace et à proposer des solutions.\n\nPour clôturer ce travail, une affiche est réalisée par le\ngroupe. Elle peut proposer un slogan qui explique simple-\nment le bon comportement à avoir.\n\nLa fiche élève 4 est le support à cette activité.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "À l’école aussi, j'essaie d'avoir un comportement\ncitoyen et responsable : c'est l'affaire de tous !\n\n* Je ne gaspille pas l'énergie, l'eau, le papier.\n\n* Je trie mes déchets en recyclant tout ce qui peut l'être.\n* Je respecte mon environnement, dans la classe, dans\nla cour, au jardin.\n\nLE RECYCLAGE, C'EST UTILE !\nLes déchets que nous produisons peuvent être souvent recyclés,\nc'est-à-dire utilisés pour fabriquer de nouveaux objets.\nPAPIER\n_ | ET CARTON\nPLASTIQUE\nVERRE\n| METAL\nCOMPOST\n|\nMots à retenir\nDéchets Environnement\n_ Gaspillage Recyclage\n\nBiodégradable\n\nCompost\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nComment reconnaître le monde vivant ? « 113",
          },
        ],
      },
    ],
    guideText:
      "TS 9 © Quel avenir pour nos déchets ?\n\n» Objectifs\n\n+ Identifier quelques interactions dans l'école.\n= Adopter une attitude citoyenne dans la vie courante.\n\n» Indications de progression dans le cycle 2\n\nCe dossier vise à développer chez les élèves une attitude citoyenne dans diverses situations\nde la vie de l'école : respect de l'environnement (école, jardin...), lutte contre le gaspillage,\ntri des déchets... Nous vous proposons d'aborder ces thématiques durant les trois années\ndu cycle 2 avec la progression suivante : au CP, identifier les déchets de papier et de plas-\n| tique de la classe et les possibilités de recyclage ; au CE1, identifier le gaspillage alimen-\ntaire à la cantine et le devenir des déchets ; au CE2, repérer les déchets de la vie courante |\net connaître leur devenir. À chaque niveau correspond des fiches élève et d'évaluation\nadaptées. Enfin, un objectif transversal, en lien direct avec 'EMC, concernera les attitudes\n( Stoycnne à adopter dans la vie courante. Il sera traité dans une fiche élève tous niveaux.\n\nSéance 1 JF 1\n\nIdentifier quelques interactions dans l’école : l'exemple\ndes déchets de papier et de plastique.\n\na8 Je m'interroge\nL'enseignant-e aura conservé la poubelle de classe de la\nveille. On la présente aux élèves et on les interroge :\n\n[Que pensez-vous que contienne cette poubelle ?\n\nOn peut attendre les réponses suivantes : « du papier »,\n« des mouchoirs sales », « des emballages de gouter »,\n« des cartouches d'encre vides », « le contenu de taille-\ncrayons », « des feutres usagés », « des bâtons de colle\nvides ».\n\nL'enseignant-e, muni-e de gants de latex, vide la poubelle\nsur un plastique et demande aux élèves :\n\nEst-il possible de trier ces déchets ? Comment ?\nPourquoi est-ce intéressant de les trier ?\nQue peut-on faire avec ces déchets ?\n\nLes élèves sont habitués depuis maintenant plusieurs\nannées au tri des déchets, notamment à la maison. On\npeut donc attendre les réponses suivantes : « les papiers\npeuvent être mis ensemble, on peut en faire du nouveau\npapier » (certains emploieront peut être le mot recycler),\n«il y a des poubelles spéciales pour mettre le papier », « on\npeut mettre les objets en plastique ensemble aussi, dans\nles poubelles jaunes », « on peut refaire des choses en plas-\ntique avec », « quand on recycle, on ne gaspille pas comme\nça et on ne pollue pas la Terre ».\n\nN.B. : Le tri des déchets fonctionne souvent différemment\nselon les communautés d'agglomérations ou de com-\nmunes. Les réponses des élèves peuvent donc différer en\nfonction de leurs lieux d'habitation.\n\nÀ la fin de ces échanges, l'enseignant-e propose de recher-\ncher collectivement les matériaux d'origine de ces déchets.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n© Je recherche\n\nL'enseignant-e recherche avec ses élèves les origines du\npapier (bois) et du plastique (pétrole). Pour cela, on peut\nutiliser Internet pour mener une recherche collective (par\nexemple : https://fr.vikidia.org/wiki/Tri_sélectif).\n\nOn sépare alors ces deux types de déchets.\n\nLa recherche menée est l'occasion d'évoquer :\n\n— l'épuisement des ressources naturelles qui sont limitées,\nmais aussi la déforestation ;\n\n— la pollution qu'entraine la multiplication de ces déchets\ns'ils ne sont pas recyclés.\n\nCette séance est également l'occasion, si ce n'est pas\ndéjà le cas dans l'école, de mettre en place un tri sélectif.\nL'enseignant-e distribue ensuite aux élèves la fiche élève 1.\n\n2 Je retiens\n\n* Comme à la maison, nous produisons des déchets à\nl'école.\n\n« Le papier et le plastique peuvent être recyclés : on\npeut les réutiliser pour fabriquer à nouveau du papier ou\ndes objets en plastique.\n\n«On évite ainsi des pollutions et du gaspillage de\nmatériaux (bois, pétrole).\n\nIdentifier quelques interactions dans l'école : l'exemple\ndu gaspillage alimentaire à la cantine et le devenir des\ndéchets.\n\ne Je m'interroge\n\nIl peut être judicieux de commencer cette séance par un\nrepas partagé à la cantine avec ses élèves. L'enseignant-e\npeut prendre quelques photos d'assiettes à la fin du repas :\n\nComment reconnaitre le monde vivant ? o 111\n\nFiche enseignant\n\ncertaines sans déchets, d'autres au contraire où l'on peut\nconstater un fort gaspillage et des photos de la (des) pou-\nbelle(s). On peut à cette occasion demander au person-\nnel de la cantine, devant les élèves, ce que deviennent ces\ndéchets.\n\nDe retour en classe, l'enseignant-e projette les photos aux\nélèves. On leur demande :\n\n| Que constatez-vous en regardant les photos de ces\n| assiettes et de ces poubelles à la fin du repas ?\n\n| D'après vous, que devient toute cette nourriture\n\n| qui n’a pas été mangée ?\n\nOn peut attendre les réponses suivantes : « il reste de la\nnourriture », « les restes vont à la poubelle ».\nL'enseignant-e interroge à nouveau les élèves :\n\n| Que pouvons-nous faire pour limiter ces déchets et\n{recycler ce qui est mis à la poubelle ?\n\nOn peut attendre les réponses suivantes : « certains gas-\npillent la nourriture, ils prennent des choses qu'ils ne\nmangent pas », « quand on se sert, il faut manger ce qu'on\nprend et se resservir si on a encore faim », « on pourrait\nles donner à des animaux (poules ) ou les mettre dans le\ncomposteur de l'école ».\n\nŒ Je recherche\n\nL'enseignant-e note au tableau les réflexions de ses élèves\ndans trois colonnes : 1) les exemples de gaspillage alimen-\ntaire ; 2) les bons comportements ; 3) le recyclage possible\ndes aliments jetés. On leur demande d'essayer de retrouver\nle titre que l'on pourrait donner à chacune des colonnes.\nL'enseignant-e fait ainsi émerger la notion de déchets bio-\ndégradables pour les restes de la cantine, c'est-à-dire issus\nde matières vivantes et qui peuvent se dégrader, se décom-\nposer, sans polluer. Au contraire, on peut même ensuite s’en\nresservir (compost, nourriture pour les poules ).\n\nOn mettra en exergue les comportements à suivre à la can-\ntine. L'enseignant-e distribue alors la fiche élève 2.\n\n#3 Je retiens\n\nPour éviter le gaspillage de nourriture à la cantine,\nje ne mets dans mon assiette que ce que je vais\nmanger. Je me ressers si j'ai encore faim.\n\n*Les déchets de la cantine qui sont biodégradables\npeuvent être mis dans le composteur de l’école.\nIls deviendront du compost.\n\nr quelques interactions dans l'école : l'exemple\ndes déchets de la vie courante et de leur devenir.\n\na Je m'interroge\n\nL'enseignant-e rappelle aux élèves le travail qu'ils ont mené\nsur les déchets à l'école, au CP et au CE1 (séances 1 et 2).\nOn leur propose ensuite d'élargir ce travail à l'ensemble des\ndéchets de la vie courante et on leur pose les questions\nsuivantes :\n\n112 « Comment reconnaître le monde vivant ?\n\nQue met-on à la poubelle chez soi, à la maison ?\nQue deviennent ces déchets ?\n\nEn dehors des déchets alimentaires, on peut attendre des\nréponses comme : des emballages, des boites de conserve,\ndu sopalin sale, du coton, des cotons tiges, des vieux papiers,\ndes bouteilles en verre...\n\nL'enseignant-e indique alors aux élèves qu'ils vont réfléchir\nà ces déchets et à ce qu'ils pourraient devenir.\n\nŒ Je recherche\n\nLes élèves sont alors placés par groupes de 2. Ils ont à leur\ndisposition une feuille A4 séparée en deux colonnes. Ils\nreçoivent la consigne suivante : « Écrivez dans la colonne de\ngauche les déchets qui sont mis chaque jour à la poubelle\net, dans la colonne de droite, en face de chaque déchet, ce\nqu'ils peuvent devenir, comment ils peuvent être recyclés »\n(on expliquera de nouveau ce mot si nécessaire).\n\nAprès un temps de recherche (15 min), chaque groupe\nprésente ses résultats. L'enseignant-e note au tableau les\ngrandes filières de recyclage (papier et carton, plastique,\nverre, métal, compost) au fur et à mesure des présentations\nréalisées. On distribue ensuite la fiche élève 3.\n\n#3 Je retiens\n\n* Les déchets que nous produisons peuvent être souvent\nrecyclés, c'est-à-dire utilisés pour fabriquer de nou-\nveaux objets.\n\n* C'est le cas pour le verre, le papier, le plastique, les\ndéchets biodégradables...\n\n+ Le « tout-venant » qui reste est incinéré ou enfoui\ndans des centres spécialisés.\n\nSéance 4 MF INFTIRFTT |\nAdopter une attitude citoyenne dans la vie courante.\n\nN.B. : Cette séance peut être menée indifféremment à\nchaque année du cycle.\n\na Je m'interroge\n\nL'enseignant-e peut prendre comme prétexte des papiers\nde gouter trainant dans la cour, ou une poubelle de classe\npleine...\nN.B. : L'album C'est à nous tous, ça se respecte !, dans la col-\nlection « J'aime mon école ! » (éditions MDI) peut égale-\nment être utilement exploité ici pour support de discussion\naprès une lecture collective en classe.\n\nOn demande alors aux élèves :\n\n[Quelles actions pourrions-nous mettre en place dans\n| l’école pour essayer d'être plus respectueux de notre\n| environnement, moins gaspiller, moins polluer ?\n\nOn peut attendre les réponses suivantes : « on peut faire\nattention à bien mettre à la poubelle nos déchets, ramasser\nles papiers dans la cour quand on en voit, ne pas gaspiller le\npapier en écrivant des deux côtés, ne pas laisser couler l'eau\ntrop longtemps quand on se lave les mains... »\n\nAprès avoir noté au tableau les propositions des élèves,\nl'enseignant-e leur annonce qu'ils vont rechercher les\nactions possibles à mener dans l'école.\n\n© MOI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nŒ Je recherche\n\nOn demande aux élèves de repérer d’abord les différents\nespaces de l'école (la classe, les couloirs, les salles spéci-\nfiques — arts visuels, techno — la cour, le jardin...). Les élèves\nse répartissent alors par groupes de 4. Chaque groupe est\nresponsable d'un espace. Son travail consiste à rechercher\nles différents gaspillages ou « mauvais » comportements\ndans cet espace et à proposer des solutions.\n\nPour clôturer ce travail, une affiche est réalisée par le\ngroupe. Elle peut proposer un slogan qui explique simple-\nment le bon comportement à avoir.\n\nLa fiche élève 4 est le support à cette activité.\n\n2 Je retiens\n\nÀ l’école aussi, j'essaie d'avoir un comportement\ncitoyen et responsable : c'est l'affaire de tous !\n\n* Je ne gaspille pas l'énergie, l'eau, le papier.\n\n* Je trie mes déchets en recyclant tout ce qui peut l'être.\n* Je respecte mon environnement, dans la classe, dans\nla cour, au jardin.\n\nLE RECYCLAGE, C'EST UTILE !\nLes déchets que nous produisons peuvent être souvent recyclés,\nc'est-à-dire utilisés pour fabriquer de nouveaux objets.\nPAPIER\n_ | ET CARTON\nPLASTIQUE\nVERRE\n| METAL\nCOMPOST\n|\nMots à retenir\nDéchets Environnement\n_ Gaspillage Recyclage\n\nBiodégradable\n\nCompost\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nComment reconnaître le monde vivant ? « 113",
    guidePageDecisions: [
      {
        page: 111,
        confidence: 93,
        score: 24,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
        ],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves"],
        studentLike: true,
      },
      {
        page: 112,
        confidence: 93,
        score: 24,
        included: true,
        strongMarkers: [
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "par groupes",
          "en classe",
        ],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: [
          "enseignant",
          "eleves",
          "on demande",
          "on distribue",
          "par groupes",
          "groupe",
          "en classe",
        ],
        studentLike: true,
      },
      {
        page: 113,
        confidence: 93,
        score: 12,
        included: true,
        strongMarkers: ["les eleves", "aux eleves", "par groupes"],
        phaseMarkers: ["je recherche", "je retiens"],
        teacherLanguageMarkers: ["eleves", "on demande", "par groupes", "groupe"],
        studentLike: false,
      },
      {
        page: 114,
        confidence: 85,
        score: 1,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: false,
      },
    ],
    skippedProbePages: [114],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-10",
    dossierNumber: 10,
    partNumber: 3,
    partTitle: "Quels sont les comportements favorables à la santé ?",
    title: "Comment mon corps peut-il bouger ?",
    guidePages: [129, 130],
    guidePageCount: 2,
    objectives: [
      "« Repérer et nommer les organes intervenant dans un mouvement corporel.",
      "+ Décrire le rôle des principaux organes mobilisés.",
      "« Concevoir des modélisations de mouvement de flexion/extension.",
    ],
    progressionNote:
      "Nous proposons 2 séances pour aborder ce dossier. La première séance est à destination\ndes CP-CE1 (mais peut aussi permettre une réactivation des connaissances pour les CE2),\nla seconde pour les CE2. Pour accompagner ces séances, nous proposons donc des fiches\nélève et d'évaluation de niveaux différents (CP-CE1 et CE2).",
    material: [],
    sessions: [
      {
        number: 2,
        title:
          "trombones, attaches parisiennes, ballons de baudruche. Fiche enseignant Ba Séance 1",
        rawText:
          "* Séance 2 : Baguettes de bois, carton, ruban adhésif, élastiques, ficelles, pâte à modeler,\n\ntrombones, attaches parisiennes, ballons de baudruche.\n\nFiche enseignant\n\nBa Séance 1\n\në êk\n\nRepérer et nommer les organes intervenant dans un\nmouvement corporel.\nDécrire le rôle des principaux organes mobilisés.\n\na Je m'interroge\nÀ la suite d'une séance d'EPS, l'enseignant-e interroge ses\nélèves :\n\nLorsque vous faites du sport, par exemple quand\n\nvous courez, quelles parties de votre corps bougent ?\nQu'est-ce qui vous permet de bouger ?\n\nOn peut demander à un-e élève de montrer les mouve-\nments qu'il/elle fait pour courir, au ralenti. La classe peut\nalors collectivement repérer et nommer les parties du corps\nen action (les os, les muscles, les articulations).\n\nOn peut attendre les réponses suivantes : « on a des mus-\ncles », « ce sont nos muscles », « on pleut plier nos jambes,\nc'est grâce à nos genoux », « les os bougent là » (les élèves\nmontrent le genou, la cheville, l'épaule), « nos muscles sont\nattachés à nos os ».\n\nSi les enfants évoquent spontanément les os et les mus-\ncles, ce ne sera pas forcément le cas pour les articulations.\nL'enseignant-e peut alors introduire cette notion ainsi :\n« Nous savons que les os et les muscles sont utilisés pour\nmettre le corps en mouvement mais comment peuvent-ils\nfonctionner ensemble ? ».\n\nJe recherche\n\nL'enseignant-e propose dans un premier temps aux élèves\nde représenter un squelette (os), mais aussi les muscles et\nles endroits où « le corps se plie ». On distribue alors la\nfiche élève 1. Le recto permet de visualiser les représenta-\ntions initiales des élèves et le verso d'appréhender la réalité\ndu squelette humain à partir d’un travail de collage avec la\nfiche à découper (— sur CD-Rom), puis d'aborder le rôle\nde chaque organe sans entrer dans le détail, notamment\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\npour les articulations.\n\nPuis les élèves entament un travail de recherche : ils se\nmettent par deux pour trouver sur leur camarade les dif-\nférentes articulations possibles. Celles-ci peuvent être\nrepérées sur une silhouette dessinée sur une feuille A4 au\ncrayon.\n\nOn compare les silhouettes de chaque groupe et on\nnomme les articulations repérées. L'enseignant-e mettra en\névidence les os et les muscles concernés par chaque arti-\nculation (il peut être utile de s'appuyer sur un squelette\nen plastique). On pourra préciser le rôle des tendons pour\naccrocher les muscles aux os. La fiche élève 2 peut alors\nêtre distribuée.\n\n[| Je retiens\n\n= Notre corps peut bouger, effectuer des mouvements,\ngrâce aux os, aux muscles et aux articulations.\n\n« Les os donnent à notre corps de la rigidité. Les muscles\npermettent de réaliser les mouvements. Les articula-\ntions permettent à nos os et à nos muscles de prendre\nde nombreuses positions.\n\nLa cheville, le genou, la hanche, le coude, l'épaule,\nle poignet sont les principales articulations de notre\ncorps.\n\n« Les tendons attachent les muscles aux os.\n\nQuels sont les comportements favorables à la santé ? « 129\n\n PTT\n\nConcevoir des modélisations de mouvement de flexion/\nextension.\n\na Je m'interroge\nL'enseignant-e rappelle aux élèves les connaissances mobi-\nlisées en CP-CE1 concernant les mouvements du corps.\nOn distingue ainsi à nouveau les os, muscles, tendons, arti-\nculations et leur rôle respectif. Puis on propose aux élèves\nun défi :\n\nSerez-vous capable de modéliser, de « construire »\n\nun bras (avant-bras et bras) sous la forme d'une maquette\net de le faire fonctionner ?\n\n Je recherche\n\nLes élèves ont à leur disposition un matériel multiple :\nbaguettes de bois, carton, ruban adhésif, élastiques, ficelles,\n\npâte à modeler, trombones, attaches parisiennes, ballons\nde baudruche.\n\nOn place les élèves par groupe de 2. Ils doivent tout d'abord\nreprésenter par un schéma ce qu'ils imaginent et envi-\nsagent de construire. Ils écrivent également un petit texte\n\nqui explique ce qu'ils ont compris sur les mouvements de \\_+\n\nflexion-extension.\nCe travail est réalisé sur la fiche élève 3.\n\n2 Je retiens\n\n* Une maquette du bras permet de visualiser les os\ndu bras, l'articulation du coude, les mouvements de\nflexion et d'extension du bras, les muscles du biceps et\ndu triceps, les tendons qui attachent les muscles aux os.\n* Lorsqu'un muscle se contracte, il se gonfle et se rac-\ncourcit en même temps. Il tire alors sur l'os qui peut se\ndéplacer.\n\nLE CORPS EN MOUVEMENT\n\ne Notre corps peut effectuer des mouvements grâce aux os, aux muscles\n\net aux articulations.\ne Les os donnent de la rigidité.\n\n© Les muscles permettent de réaliser les mouvements.\n\n© Les articulations permettent de prend\n\nre de nombreuses positions.\n\n© Lorsqu'un muscle se contracte, il se gonfle et se raccourcit en même temps.\nIl tire sur l'os qui peut alors se déplacer.\n\nPoignet\n\nGenou\n\nBiceps\ncontracté\n\nLes principales articulations\n\nMots à retenir\n\nCorps\nMuscles\nFlexion\n\nOs\n\nFlexion du bras\n\nArticulations\n\nriceps\n\nTriceps |\ncontracté\n\nétiré\n\nExtension du bras\n\nMouvement\nTendons\n\nExtension\n\n130 « Quels sont les comportements favorables à la santé ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "À la suite d'une séance d'EPS, l'enseignant-e interroge ses\nélèves :\n\nLorsque vous faites du sport, par exemple quand\n\nvous courez, quelles parties de votre corps bougent ?\nQu'est-ce qui vous permet de bouger ?\n\nOn peut demander à un-e élève de montrer les mouve-\nments qu'il/elle fait pour courir, au ralenti. La classe peut\nalors collectivement repérer et nommer les parties du corps\nen action (les os, les muscles, les articulations).\n\nOn peut attendre les réponses suivantes : « on a des mus-\ncles », « ce sont nos muscles », « on pleut plier nos jambes,\nc'est grâce à nos genoux », « les os bougent là » (les élèves\nmontrent le genou, la cheville, l'épaule), « nos muscles sont\nattachés à nos os ».\n\nSi les enfants évoquent spontanément les os et les mus-\ncles, ce ne sera pas forcément le cas pour les articulations.\nL'enseignant-e peut alors introduire cette notion ainsi :\n« Nous savons que les os et les muscles sont utilisés pour\nmettre le corps en mouvement mais comment peuvent-ils\nfonctionner ensemble ? ».",
          },
          {
            title: "Je recherche",
            detail:
              "L'enseignant-e propose dans un premier temps aux élèves\nde représenter un squelette (os), mais aussi les muscles et\nles endroits où « le corps se plie ». On distribue alors la\nfiche élève 1. Le recto permet de visualiser les représenta-\ntions initiales des élèves et le verso d'appréhender la réalité\ndu squelette humain à partir d’un travail de collage avec la\nfiche à découper (— sur CD-Rom), puis d'aborder le rôle\nde chaque organe sans entrer dans le détail, notamment\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\npour les articulations.\n\nPuis les élèves entament un travail de recherche : ils se\nmettent par deux pour trouver sur leur camarade les dif-\nférentes articulations possibles. Celles-ci peuvent être\nrepérées sur une silhouette dessinée sur une feuille A4 au\ncrayon.\n\nOn compare les silhouettes de chaque groupe et on\nnomme les articulations repérées. L'enseignant-e mettra en\névidence les os et les muscles concernés par chaque arti-\nculation (il peut être utile de s'appuyer sur un squelette\nen plastique). On pourra préciser le rôle des tendons pour\naccrocher les muscles aux os. La fiche élève 2 peut alors\nêtre distribuée.\n\n[|",
          },
          {
            title: "Je retiens",
            detail:
              "= Notre corps peut bouger, effectuer des mouvements,\ngrâce aux os, aux muscles et aux articulations.\n\n« Les os donnent à notre corps de la rigidité. Les muscles\npermettent de réaliser les mouvements. Les articula-\ntions permettent à nos os et à nos muscles de prendre\nde nombreuses positions.\n\nLa cheville, le genou, la hanche, le coude, l'épaule,\nle poignet sont les principales articulations de notre\ncorps.\n\n« Les tendons attachent les muscles aux os.\n\nQuels sont les comportements favorables à la santé ? « 129\n\n PTT\n\nConcevoir des modélisations de mouvement de flexion/\nextension.\n\na",
          },
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e rappelle aux élèves les connaissances mobi-\nlisées en CP-CE1 concernant les mouvements du corps.\nOn distingue ainsi à nouveau les os, muscles, tendons, arti-\nculations et leur rôle respectif. Puis on propose aux élèves\nun défi :\n\nSerez-vous capable de modéliser, de « construire »\n\nun bras (avant-bras et bras) sous la forme d'une maquette\net de le faire fonctionner ?",
          },
          {
            title: "Je recherche",
            detail:
              "Les élèves ont à leur disposition un matériel multiple :\nbaguettes de bois, carton, ruban adhésif, élastiques, ficelles,\n\npâte à modeler, trombones, attaches parisiennes, ballons\nde baudruche.\n\nOn place les élèves par groupe de 2. Ils doivent tout d'abord\nreprésenter par un schéma ce qu'ils imaginent et envi-\nsagent de construire. Ils écrivent également un petit texte\n\nqui explique ce qu'ils ont compris sur les mouvements de \\_+\n\nflexion-extension.\nCe travail est réalisé sur la fiche élève 3.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "* Une maquette du bras permet de visualiser les os\ndu bras, l'articulation du coude, les mouvements de\nflexion et d'extension du bras, les muscles du biceps et\ndu triceps, les tendons qui attachent les muscles aux os.\n* Lorsqu'un muscle se contracte, il se gonfle et se rac-\ncourcit en même temps. Il tire alors sur l'os qui peut se\ndéplacer.\n\nLE CORPS EN MOUVEMENT\n\ne Notre corps peut effectuer des mouvements grâce aux os, aux muscles\n\net aux articulations.\ne Les os donnent de la rigidité.\n\n© Les muscles permettent de réaliser les mouvements.\n\n© Les articulations permettent de prend\n\nre de nombreuses positions.\n\n© Lorsqu'un muscle se contracte, il se gonfle et se raccourcit en même temps.\nIl tire sur l'os qui peut alors se déplacer.\n\nPoignet\n\nGenou\n\nBiceps\ncontracté\n\nLes principales articulations\n\nMots à retenir\n\nCorps\nMuscles\nFlexion\n\nOs\n\nFlexion du bras\n\nArticulations\n\nriceps\n\nTriceps |\ncontracté\n\nétiré\n\nExtension du bras\n\nMouvement\nTendons\n\nExtension\n\n130 « Quels sont les comportements favorables à la santé ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
          },
        ],
      },
    ],
    guideText:
      "Comment mon corps peut-il bouger ?\n\n=\n\n» Objectifs\n\n« Repérer et nommer les organes intervenant dans un mouvement corporel.\n| + Décrire le rôle des principaux organes mobilisés.\n\n| « Concevoir des modélisations de mouvement de flexion/extension.\n\n| » Indications de progression dans le cycle 2\n\nNous proposons 2 séances pour aborder ce dossier. La première séance est à destination\n| des CP-CE1 (mais peut aussi permettre une réactivation des connaissances pour les CE2),\nla seconde pour les CE2. Pour accompagner ces séances, nous proposons donc des fiches\nélève et d'évaluation de niveaux différents (CP-CE1 et CE2). |\n|\n> Matériel\n\n* Séance 2 : Baguettes de bois, carton, ruban adhésif, élastiques, ficelles, pâte à modeler,\n\ntrombones, attaches parisiennes, ballons de baudruche.\n\nFiche enseignant\n\nBa Séance 1\n\në êk\n\nRepérer et nommer les organes intervenant dans un\nmouvement corporel.\nDécrire le rôle des principaux organes mobilisés.\n\na Je m'interroge\nÀ la suite d'une séance d'EPS, l'enseignant-e interroge ses\nélèves :\n\nLorsque vous faites du sport, par exemple quand\n\nvous courez, quelles parties de votre corps bougent ?\nQu'est-ce qui vous permet de bouger ?\n\nOn peut demander à un-e élève de montrer les mouve-\nments qu'il/elle fait pour courir, au ralenti. La classe peut\nalors collectivement repérer et nommer les parties du corps\nen action (les os, les muscles, les articulations).\n\nOn peut attendre les réponses suivantes : « on a des mus-\ncles », « ce sont nos muscles », « on pleut plier nos jambes,\nc'est grâce à nos genoux », « les os bougent là » (les élèves\nmontrent le genou, la cheville, l'épaule), « nos muscles sont\nattachés à nos os ».\n\nSi les enfants évoquent spontanément les os et les mus-\ncles, ce ne sera pas forcément le cas pour les articulations.\nL'enseignant-e peut alors introduire cette notion ainsi :\n« Nous savons que les os et les muscles sont utilisés pour\nmettre le corps en mouvement mais comment peuvent-ils\nfonctionner ensemble ? ».\n\nJe recherche\n\nL'enseignant-e propose dans un premier temps aux élèves\nde représenter un squelette (os), mais aussi les muscles et\nles endroits où « le corps se plie ». On distribue alors la\nfiche élève 1. Le recto permet de visualiser les représenta-\ntions initiales des élèves et le verso d'appréhender la réalité\ndu squelette humain à partir d’un travail de collage avec la\nfiche à découper (— sur CD-Rom), puis d'aborder le rôle\nde chaque organe sans entrer dans le détail, notamment\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\npour les articulations.\n\nPuis les élèves entament un travail de recherche : ils se\nmettent par deux pour trouver sur leur camarade les dif-\nférentes articulations possibles. Celles-ci peuvent être\nrepérées sur une silhouette dessinée sur une feuille A4 au\ncrayon.\n\nOn compare les silhouettes de chaque groupe et on\nnomme les articulations repérées. L'enseignant-e mettra en\névidence les os et les muscles concernés par chaque arti-\nculation (il peut être utile de s'appuyer sur un squelette\nen plastique). On pourra préciser le rôle des tendons pour\naccrocher les muscles aux os. La fiche élève 2 peut alors\nêtre distribuée.\n\n[| Je retiens\n\n= Notre corps peut bouger, effectuer des mouvements,\ngrâce aux os, aux muscles et aux articulations.\n\n« Les os donnent à notre corps de la rigidité. Les muscles\npermettent de réaliser les mouvements. Les articula-\ntions permettent à nos os et à nos muscles de prendre\nde nombreuses positions.\n\nLa cheville, le genou, la hanche, le coude, l'épaule,\nle poignet sont les principales articulations de notre\ncorps.\n\n« Les tendons attachent les muscles aux os.\n\nQuels sont les comportements favorables à la santé ? « 129\n\n PTT\n\nConcevoir des modélisations de mouvement de flexion/\nextension.\n\na Je m'interroge\nL'enseignant-e rappelle aux élèves les connaissances mobi-\nlisées en CP-CE1 concernant les mouvements du corps.\nOn distingue ainsi à nouveau les os, muscles, tendons, arti-\nculations et leur rôle respectif. Puis on propose aux élèves\nun défi :\n\nSerez-vous capable de modéliser, de « construire »\n\nun bras (avant-bras et bras) sous la forme d'une maquette\net de le faire fonctionner ?\n\n Je recherche\n\nLes élèves ont à leur disposition un matériel multiple :\nbaguettes de bois, carton, ruban adhésif, élastiques, ficelles,\n\npâte à modeler, trombones, attaches parisiennes, ballons\nde baudruche.\n\nOn place les élèves par groupe de 2. Ils doivent tout d'abord\nreprésenter par un schéma ce qu'ils imaginent et envi-\nsagent de construire. Ils écrivent également un petit texte\n\nqui explique ce qu'ils ont compris sur les mouvements de \\_+\n\nflexion-extension.\nCe travail est réalisé sur la fiche élève 3.\n\n2 Je retiens\n\n* Une maquette du bras permet de visualiser les os\ndu bras, l'articulation du coude, les mouvements de\nflexion et d'extension du bras, les muscles du biceps et\ndu triceps, les tendons qui attachent les muscles aux os.\n* Lorsqu'un muscle se contracte, il se gonfle et se rac-\ncourcit en même temps. Il tire alors sur l'os qui peut se\ndéplacer.\n\nLE CORPS EN MOUVEMENT\n\ne Notre corps peut effectuer des mouvements grâce aux os, aux muscles\n\net aux articulations.\ne Les os donnent de la rigidité.\n\n© Les muscles permettent de réaliser les mouvements.\n\n© Les articulations permettent de prend\n\nre de nombreuses positions.\n\n© Lorsqu'un muscle se contracte, il se gonfle et se raccourcit en même temps.\nIl tire sur l'os qui peut alors se déplacer.\n\nPoignet\n\nGenou\n\nBiceps\ncontracté\n\nLes principales articulations\n\nMots à retenir\n\nCorps\nMuscles\nFlexion\n\nOs\n\nFlexion du bras\n\nArticulations\n\nriceps\n\nTriceps |\ncontracté\n\nétiré\n\nExtension du bras\n\nMouvement\nTendons\n\nExtension\n\n130 « Quels sont les comportements favorables à la santé ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
    guidePageDecisions: [
      {
        page: 129,
        confidence: 93,
        score: 22,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
        ],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on distribue", "groupe"],
        studentLike: true,
      },
      {
        page: 130,
        confidence: 92,
        score: 16,
        included: true,
        strongMarkers: ["l'enseignant", "enseignant-e", "les eleves", "aux eleves"],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on propose", "groupe"],
        studentLike: false,
      },
      {
        page: 131,
        confidence: 84,
        score: -4,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: true,
      },
    ],
    skippedProbePages: [131],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-11",
    dossierNumber: 11,
    partNumber: 3,
    partTitle: "Quels sont les comportements favorables à la santé ?",
    title: "Comment voir que je grandis ?",
    guidePages: [139, 140, 141],
    guidePageCount: 3,
    objectives: [
      "+ Observer et mesurer la croissance de son corps (taille, masse, pointure) et les change-",
      "ments morphologiques.",
      "+ Connaître le nom des dents, leur nombre, leur forme et leur position dans la bouche.",
      "+ Observer les modifications de la dentition.",
    ],
    progressionNote:
      "Ce dossier est abordé sur les trois années du cycle 2. Au CP, il s'agit de constater la crois-\nsance et les changements morphologiques. Il est recommandé de comparer des photos\nsur deux ou trois années successives pour constater les modifications (par exemple avec\ndes photos de classe). Au CET, il s'agit de mesurer la taille et la masse et de les comparer à\ndifférents moments. Enfin, au CE2, l'élève apprend à repérer sur un graphique du carnet de\nsanté où il se situe, L'évolution de la dentition fait l'objet d'une séance spécifique pour les\nCE1-CE2 en initiation ou en réactivation des connaissances.",
    material: ["Le matériel nécessaire est indiqué au début de chaque séance."],
    sessions: [
      {
        number: 1,
        title:
          "Observer la croissance de son corps (taille, masse, poin- ture) et les changements morphologiques. Matériel : les photos de classe de maternelle de cette",
        rawText:
          "Séance 1 MF]\n\nObserver la croissance de son corps (taille, masse, poin-\nture) et les changements morphologiques.\n\nMatériel : les photos de classe de maternelle de cette\ncohorte d'élèves (si besoin, en faire une demande préalable\nauprès des parents).\n\nBE Je m'interroge\n\nL'enseignant-e apporte une photo de lui quand il/elle était\npetit-e. Il la montre aux élèves en leur demandant s'ils\nconnaissent cet enfant ?\n\nAprès un échange, l'enseignant-e dévoile le secret : c'est\nlui/elle ! On demande alors aux élèves ce qu'ils en pensent\nafin de faire émerger du vocabulaire lié à la croissance (« tu\nas grandi, ou grossi, tes cheveux sont plus ou moins... »).\nL'enseignant-e interroge ensuite les élèves :\n\nEt vous ? Vous souvenez-vous comment vous étiez en\nmaternelle ? Pensez-vous avoir changé ? Comment ?\n\nLes réponses possibles des élèves : « oui, on a grandi... »,\n« mes cheveux sont plus longs », « j'ai des chaussures plus\ngrandes maintenant et aussi mes vêtements ne sont plus\nles mêmes », « à la maison, sur ma toise, je vois que j'ai\ngrandi. ».\n\nL'enseignant-e propose alors d'observer ensemble les\ntransformations des uns et des autres depuis la maternelle.\n\n#2 J'observe\n\nL'enseignant-e distribue alors les photos de classe des\nannées de maternelle (si besoin, en faire une demande\npréalable auprès des parents). Les élèves sont placés par\ngroupes de 2.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nOn note au tableau les différences repérées par les élèves,\nentre eux : « j'ai grandi », « mes cheveux sont plus foncés »,\n« mes jambes sont plus longues », « mon visage est moins\nrond », « je porte des lunettes maintenant ».\n\nLa fiche élève 1 est alors distribuée. Elle sert à fixer ces\nobservations et le vocabulaire associé.\n\n2 Je retiens\n\n+ Depuis ma naissance, mon corps se modifie.\n\nMa taille change : je grandis.\n\nMon poids (masse) augmente, je grossis.\n\nMon apparence change aussi : par exemple, mon visage\ns'affine, mes cheveux sont plus épais.\n\n« On appelle cela la croissance.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e apporte une photo de lui quand il/elle était\npetit-e. Il la montre aux élèves en leur demandant s'ils\nconnaissent cet enfant ?\n\nAprès un échange, l'enseignant-e dévoile le secret : c'est\nlui/elle ! On demande alors aux élèves ce qu'ils en pensent\nafin de faire émerger du vocabulaire lié à la croissance (« tu\nas grandi, ou grossi, tes cheveux sont plus ou moins... »).\nL'enseignant-e interroge ensuite les élèves :\n\nEt vous ? Vous souvenez-vous comment vous étiez en\nmaternelle ? Pensez-vous avoir changé ? Comment ?\n\nLes réponses possibles des élèves : « oui, on a grandi... »,\n« mes cheveux sont plus longs », « j'ai des chaussures plus\ngrandes maintenant et aussi mes vêtements ne sont plus\nles mêmes », « à la maison, sur ma toise, je vois que j'ai\ngrandi. ».\n\nL'enseignant-e propose alors d'observer ensemble les\ntransformations des uns et des autres depuis la maternelle.\n\n#2",
          },
          {
            title: "J'observe",
            detail:
              "L'enseignant-e distribue alors les photos de classe des\nannées de maternelle (si besoin, en faire une demande\npréalable auprès des parents). Les élèves sont placés par\ngroupes de 2.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nOn note au tableau les différences repérées par les élèves,\nentre eux : « j'ai grandi », « mes cheveux sont plus foncés »,\n« mes jambes sont plus longues », « mon visage est moins\nrond », « je porte des lunettes maintenant ».\n\nLa fiche élève 1 est alors distribuée. Elle sert à fixer ces\nobservations et le vocabulaire associé.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "+ Depuis ma naissance, mon corps se modifie.\n\nMa taille change : je grandis.\n\nMon poids (masse) augmente, je grossis.\n\nMon apparence change aussi : par exemple, mon visage\ns'affine, mes cheveux sont plus épais.\n\n« On appelle cela la croissance.",
          },
        ],
      },
      {
        number: 2,
        title:
          "Mesurer la croissance de son corps (taille, masse, pointure). Matériel : une toise, un pèse-personne, un pédimètre si",
        rawText:
          "| séance 2 IFT\n\nMesurer la croissance de son corps (taille, masse,\npointure).\n\nMatériel : une toise, un pèse-personne, un pédimètre si\npossible.\n\nN.B. : Cette séance de mesure est l'occasion d'un travail sur\nl'acceptation de la différence et du respect de l'autre ; elle\npeut faire l'objet en parallèle d'une séance d'EMC.\n\nL'enseignant-e propose aux élèves de repérer les change-\nments de leur corps (changements morphologiques) tout\nau long de l'année. On leur demande de rappeler comment\nleur corps change (taille, poids, apparence) afin de mettre\nen exergue le terme « croissance ». Puis on les interroge :\n\nQue peut-on mettre en place pour mesurer\nla croissance de son corps ?\n\nQuels sont les comportements favorables à la santé ? o 139\n\nFiche enseignant\n\nLes élèves peuvent proposer de se mesurer. On introduira\nalors la notion de toise, c'est-à-dire une règle verticale gra-\nduée en mètres et centimètres. On peut se mesurer plu-\nsieurs fois (4 fois) dans l'année mais aussi être pris-e en\nphoto, au même endroit (4 fois) dans l'année.\n\nLes élèves peuvent aussi proposer de se peser. L'enseignant-e\nexplique alors le fonctionnement d'un pèse-personne, les\nunités (kilogrammes et grammes). On peut se peser égale-\nment 4 fois dans l’année.\n\nEnfin, les élèves peuvent proposer de regarder la taille des\nvêtements et la pointure des chaussures (également fait\n4 fois dans l'année). L'enseignant-e peut suggérer l'utilisa-\ntion d'un pédimètre si cela est possible.\n\n(2 J'observe\n\nUne fois le protocole mis en place et le matériel nécessaire\nlisté et rassemblé, on détermine les 4 moments retenus\ndans l'année pour prendre les mesures. On met en place\ndes binômes : l’un mesurant, pesant l’autre et notant les\nréponses ; puis réciproquement. Un travail en Arts visuels\npeut être mené à ces occasions en réalisant des empreintes\ndes mains et/ou des pieds.\n\nL'enseignant-e annonce qu'à la fin de l’année scolaire, on\nreprendra l'évolution de ces mesures et de ces photos pour\nen tirer une conclusion.\n\nLa fiche élève 2 est alors distribuée. Elle sert de bilan ins-\ntantané mais aussi à compiler les mesures et les photogra-\nphies réalisées au fil de l’année.\n\n2 Je retiens\n\n+ Depuis ma naissance, mon corps se modi\nOn appelle cela la croissance.\n\n* Je peux observer ces changements à l'aide d’instru-\nments de mesure (toise, balance, pédimètre) mais aussi\nen regardant la pointure de mes chaussures, la taille de\nmes vêtements, des photos de moi plus petit-e.",
        phases: [
          {
            title: "J'observe",
            detail:
              "Une fois le protocole mis en place et le matériel nécessaire\nlisté et rassemblé, on détermine les 4 moments retenus\ndans l'année pour prendre les mesures. On met en place\ndes binômes : l’un mesurant, pesant l’autre et notant les\nréponses ; puis réciproquement. Un travail en Arts visuels\npeut être mené à ces occasions en réalisant des empreintes\ndes mains et/ou des pieds.\n\nL'enseignant-e annonce qu'à la fin de l’année scolaire, on\nreprendra l'évolution de ces mesures et de ces photos pour\nen tirer une conclusion.\n\nLa fiche élève 2 est alors distribuée. Elle sert de bilan ins-\ntantané mais aussi à compiler les mesures et les photogra-\nphies réalisées au fil de l’année.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "+ Depuis ma naissance, mon corps se modi\nOn appelle cela la croissance.\n\n* Je peux observer ces changements à l'aide d’instru-\nments de mesure (toise, balance, pédimètre) mais aussi\nen regardant la pointure de mes chaussures, la taille de\nmes vêtements, des photos de moi plus petit-e.",
          },
        ],
      },
      {
        number: 3,
        title:
          "Savoir lire et se repérer sur une courbe de croissance dans le carnet de santé. Matériel : une courbe de croissance d'un élève de 0 à 3 ans",
        rawText:
          "| Séance 3 FFT]\n\nSavoir lire et se repérer sur une courbe de croissance\ndans le carnet de santé.\n\nMatériel : une courbe de croissance d'un élève de 0 à 3 ans\npuis de 3 à 6 ans (une fille et un garçon) ; un pèse-personne\net une toise.\n\n[2 Je m’interroge\n\nSi elle a lieu en début d'année, l'enseignant-e peut utiliser\ncomme prétexte la visite médicale des CE2. On peut sinon\névoquer les visites médicales des années précédentes et on\ninterroge les élèves :\n\n|| Lors de votre visite médicale à l'école, qu'a fait\n| l'infirmière ? Comment a-t-elle pu mesurer la\n| croissance de votre corps ?\n\nOn peut attendre les réponses suivantes : « elle nous a\nmesuré », « elle nous a pesé », « elle a regardé nos dents »,\n« aussi elle a regardé si nos yeux voyaient bien ».\n\n140 « Quels sont les comportements favorables à la santé ?\n\nL'enseignant-e rappelle aux élèves que les mesures prises\n(taille, poids) sont inscrites dans le carnet de santé de\nchaque enfant afin de suivre sa courbe de croissance depuis\nla naissance.\n\n(2 J'observe\n\nL'enseignant-e propose alors d'observer la courbe de crois-\nsance d'un enfant « X » extrait d'un carnet de santé (recto\nde la fiche élève 3). On explique la lecture de la courbe\n(age en abscisse, masse et taille en ordonnées).\n\nLorsque les élèves ont bien compris la lecture des gra-\nphiques, l'enseignant-e propose de travailler sur la fiche\nélève 3 (verso).\n\nN.B. : L'enseignant-e peut envisager de faire réaliser la\ncourbe de croissance de chaque élève à partir des données\ninscrites dans le carnet de santé, avec l'accord des parents.\nSi cela s'avère compliqué à mettre en place, il est possible\nde proposer à chaque élève d'observer et de mesurer sa\ncroissance durant l’année scolaire en se pesant et en se\nmesurant tous les deux mois. On indique le protocole, rap-\npelle le fonctionnement de la toise et du pèse-personne et\ndistribue une fiche (sur le modèle de la fiche élève 2) afin\nde reporter la masse et la taille. Les élèves sont placés par\ngroupes de 2 : l'un note les résultats de l'autre et vice-versa.\nCette fiche sera utilisée toute l'année. Il faudra réaliser une\ncourbe de croissance à la fin de l'année scolaire, à partir des\ndonnées notées tous les deux mois tout au long de l'année.\n\n#4 Je retiens\n\n* Notre corps change quand on grandit. Notre taille aug-\nmente ainsi que notre poids (masse).\n\n+ Ces changements sont très importants durant les\ntrois premières années de la vie. On peut, pour s'en\nrendre compte, les représenter sur une courbe de crois-\nsance (comme celle de notre carnet de santé).\n\n dé) dès\n\nConnaître le nom des dents, leur nombre, leur forme et\nleur position dans la bouche.\nObserver les modifications de la dentition.\n\na Je m'interroge\n\nOn peut utiliser comme déclencheur à cette séance la\nperte d'une dent de lait par l'un-e ou plusieurs élèves de la\nclasse. L'enseignant-e observe avec la classe la dent tombée\net interroge les élèves :\n\nCet-te élève a perdu sa dent. Comment cela se fait-il ?\nEst-ce le cas pour tous les enfants ? Que se passe-t-il\nensuite ?\n\nmemes\n\nOn peut attendre les réponses suivantes : « c'est une dent\nde lait », « on perd nos dents de lait quand on a six ans ou\nsept ans et ensuite on a de nouvelles dents qui poussent\npar en dessous ».\n\nL'enseignant-e propose alors de mieux connaitre nos dents\nen les observant avec attention.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n_\n\n=\n\n&\n\n(D J'observe\n\nL’enseignant-e demande aux élèves de se mettre par deux\nde regarder leurs dents et de les compter. Ils repèrent les\ndents déjà tombées, les dents définitives qui commencent\nà pousser...\n\n| On profitera de cette séance pour reparler de l'hygiène\n| buccale (vue également dans le dossier 14).\n\n| 2 Je retiens\n\nIls repèrent également, avec l'aide de l'enseignant-e, que |\n\nles dents n’ont pas toutes la même forme : il y a des dents\npointues, des dents tranchantes et des grosses dents dans\n\nle fond de la bouche, plus plates. On donne le vocabulaire |\n\nau fur et à mesure des observations. Les canines sont poin-\ntues, les incisives tranchantes, les molaires aplaties.\nL'enseignant-e distribue alors la fiche élève 4 puis la fiche\nélève 5.\n\n« Notre dentition change quand on grandit.\n\n* Les premières dents d'un enfant sont les dents de lait :\nelles apparaissent entre six mois et 5 ans environ. Il y\nen a 20 (10 en haut et 10 en bas).\n\n* À partir de 6 ou 7 ans, les dents de lait tombent. Les\ndents définitives les remplacent alors. Il y en a plus que\nde dents de lait : un adulte qui a toutes ses dents en a 32.\n\nCOMMENT VOIR QUE JE GRANDIS ?\n\n© Depuis ma naissance, mon corps se modifie.\n\nMa taille change : je grandis.\n\nMon poids (masse) augmente : je grossis.\n\nMon apparence change aussi : mon visage s'affine, mes cheveux sont plus épais...\n\n© On appelle cela la croissance.\n\na\n\nLa toise, pour mesurer\nla taille.\n\nLa balance, pour mesurer\nle poids (masse).\n\nLe pédimètre, pour mesurer\nla taille des pieds.\n\ne On peut aussi regarder la pointure des chaussures, la taille des vêtements\n\net des photos de différents âges.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nQuels sont les comportements favorables à la santé ? o 141",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "Si elle a lieu en début d'année, l'enseignant-e peut utiliser\ncomme prétexte la visite médicale des CE2. On peut sinon\névoquer les visites médicales des années précédentes et on\ninterroge les élèves :\n\n|| Lors de votre visite médicale à l'école, qu'a fait\n| l'infirmière ? Comment a-t-elle pu mesurer la\n| croissance de votre corps ?\n\nOn peut attendre les réponses suivantes : « elle nous a\nmesuré », « elle nous a pesé », « elle a regardé nos dents »,\n« aussi elle a regardé si nos yeux voyaient bien ».\n\n140 « Quels sont les comportements favorables à la santé ?\n\nL'enseignant-e rappelle aux élèves que les mesures prises\n(taille, poids) sont inscrites dans le carnet de santé de\nchaque enfant afin de suivre sa courbe de croissance depuis\nla naissance.\n\n(2",
          },
          {
            title: "J'observe",
            detail:
              "L'enseignant-e propose alors d'observer la courbe de crois-\nsance d'un enfant « X » extrait d'un carnet de santé (recto\nde la fiche élève 3). On explique la lecture de la courbe\n(age en abscisse, masse et taille en ordonnées).\n\nLorsque les élèves ont bien compris la lecture des gra-\nphiques, l'enseignant-e propose de travailler sur la fiche\nélève 3 (verso).\n\nN.B. : L'enseignant-e peut envisager de faire réaliser la\ncourbe de croissance de chaque élève à partir des données\ninscrites dans le carnet de santé, avec l'accord des parents.\nSi cela s'avère compliqué à mettre en place, il est possible\nde proposer à chaque élève d'observer et de mesurer sa\ncroissance durant l’année scolaire en se pesant et en se\nmesurant tous les deux mois. On indique le protocole, rap-\npelle le fonctionnement de la toise et du pèse-personne et\ndistribue une fiche (sur le modèle de la fiche élève 2) afin\nde reporter la masse et la taille. Les élèves sont placés par\ngroupes de 2 : l'un note les résultats de l'autre et vice-versa.\nCette fiche sera utilisée toute l'année. Il faudra réaliser une\ncourbe de croissance à la fin de l'année scolaire, à partir des\ndonnées notées tous les deux mois tout au long de l'année.\n\n#4",
          },
          {
            title: "Je retiens",
            detail:
              "* Notre corps change quand on grandit. Notre taille aug-\nmente ainsi que notre poids (masse).\n\n+ Ces changements sont très importants durant les\ntrois premières années de la vie. On peut, pour s'en\nrendre compte, les représenter sur une courbe de crois-\nsance (comme celle de notre carnet de santé).\n\n dé) dès\n\nConnaître le nom des dents, leur nombre, leur forme et\nleur position dans la bouche.\nObserver les modifications de la dentition.\n\na",
          },
          {
            title: "Je m'interroge",
            detail:
              "On peut utiliser comme déclencheur à cette séance la\nperte d'une dent de lait par l'un-e ou plusieurs élèves de la\nclasse. L'enseignant-e observe avec la classe la dent tombée\net interroge les élèves :\n\nCet-te élève a perdu sa dent. Comment cela se fait-il ?\nEst-ce le cas pour tous les enfants ? Que se passe-t-il\nensuite ?\n\nmemes\n\nOn peut attendre les réponses suivantes : « c'est une dent\nde lait », « on perd nos dents de lait quand on a six ans ou\nsept ans et ensuite on a de nouvelles dents qui poussent\npar en dessous ».\n\nL'enseignant-e propose alors de mieux connaitre nos dents\nen les observant avec attention.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n_\n\n=\n\n&\n\n(D",
          },
          {
            title: "J'observe",
            detail:
              "L’enseignant-e demande aux élèves de se mettre par deux\nde regarder leurs dents et de les compter. Ils repèrent les\ndents déjà tombées, les dents définitives qui commencent\nà pousser...\n\n| On profitera de cette séance pour reparler de l'hygiène\n| buccale (vue également dans le dossier 14).\n\n| 2",
          },
          {
            title: "Je retiens",
            detail:
              "Ils repèrent également, avec l'aide de l'enseignant-e, que |\n\nles dents n’ont pas toutes la même forme : il y a des dents\npointues, des dents tranchantes et des grosses dents dans\n\nle fond de la bouche, plus plates. On donne le vocabulaire |\n\nau fur et à mesure des observations. Les canines sont poin-\ntues, les incisives tranchantes, les molaires aplaties.\nL'enseignant-e distribue alors la fiche élève 4 puis la fiche\nélève 5.\n\n« Notre dentition change quand on grandit.\n\n* Les premières dents d'un enfant sont les dents de lait :\nelles apparaissent entre six mois et 5 ans environ. Il y\nen a 20 (10 en haut et 10 en bas).\n\n* À partir de 6 ou 7 ans, les dents de lait tombent. Les\ndents définitives les remplacent alors. Il y en a plus que\nde dents de lait : un adulte qui a toutes ses dents en a 32.\n\nCOMMENT VOIR QUE JE GRANDIS ?\n\n© Depuis ma naissance, mon corps se modifie.\n\nMa taille change : je grandis.\n\nMon poids (masse) augmente : je grossis.\n\nMon apparence change aussi : mon visage s'affine, mes cheveux sont plus épais...\n\n© On appelle cela la croissance.\n\na\n\nLa toise, pour mesurer\nla taille.\n\nLa balance, pour mesurer\nle poids (masse).\n\nLe pédimètre, pour mesurer\nla taille des pieds.\n\ne On peut aussi regarder la pointure des chaussures, la taille des vêtements\n\net des photos de différents âges.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nQuels sont les comportements favorables à la santé ? o 141",
          },
        ],
      },
    ],
    guideText:
      "Comment voir que je grandis ?\n\n» Objectifs |\n\n+ Observer et mesurer la croissance de son corps (taille, masse, pointure) et les change-\nments morphologiques.\n\n+ Connaître le nom des dents, leur nombre, leur forme et leur position dans la bouche. |\n\n+ Observer les modifications de la dentition.\n\n» Indications de progression dans le cycle 2\n\nCe dossier est abordé sur les trois années du cycle 2. Au CP, il s'agit de constater la crois-\nsance et les changements morphologiques. Il est recommandé de comparer des photos\nsur deux ou trois années successives pour constater les modifications (par exemple avec |\ndes photos de classe). Au CET, il s'agit de mesurer la taille et la masse et de les comparer à |\ndifférents moments. Enfin, au CE2, l'élève apprend à repérer sur un graphique du carnet de\nsanté où il se situe, L'évolution de la dentition fait l'objet d'une séance spécifique pour les |\nCE1-CE2 en initiation ou en réactivation des connaissances.\n\n» Matériel\nLe matériel nécessaire est indiqué au début de chaque séance. |\n\nSéance 1 MF]\n\nObserver la croissance de son corps (taille, masse, poin-\nture) et les changements morphologiques.\n\nMatériel : les photos de classe de maternelle de cette\ncohorte d'élèves (si besoin, en faire une demande préalable\nauprès des parents).\n\nBE Je m'interroge\n\nL'enseignant-e apporte une photo de lui quand il/elle était\npetit-e. Il la montre aux élèves en leur demandant s'ils\nconnaissent cet enfant ?\n\nAprès un échange, l'enseignant-e dévoile le secret : c'est\nlui/elle ! On demande alors aux élèves ce qu'ils en pensent\nafin de faire émerger du vocabulaire lié à la croissance (« tu\nas grandi, ou grossi, tes cheveux sont plus ou moins... »).\nL'enseignant-e interroge ensuite les élèves :\n\nEt vous ? Vous souvenez-vous comment vous étiez en\nmaternelle ? Pensez-vous avoir changé ? Comment ?\n\nLes réponses possibles des élèves : « oui, on a grandi... »,\n« mes cheveux sont plus longs », « j'ai des chaussures plus\ngrandes maintenant et aussi mes vêtements ne sont plus\nles mêmes », « à la maison, sur ma toise, je vois que j'ai\ngrandi. ».\n\nL'enseignant-e propose alors d'observer ensemble les\ntransformations des uns et des autres depuis la maternelle.\n\n#2 J'observe\n\nL'enseignant-e distribue alors les photos de classe des\nannées de maternelle (si besoin, en faire une demande\npréalable auprès des parents). Les élèves sont placés par\ngroupes de 2.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nOn note au tableau les différences repérées par les élèves,\nentre eux : « j'ai grandi », « mes cheveux sont plus foncés »,\n« mes jambes sont plus longues », « mon visage est moins\nrond », « je porte des lunettes maintenant ».\n\nLa fiche élève 1 est alors distribuée. Elle sert à fixer ces\nobservations et le vocabulaire associé.\n\n2 Je retiens\n\n+ Depuis ma naissance, mon corps se modifie.\n\nMa taille change : je grandis.\n\nMon poids (masse) augmente, je grossis.\n\nMon apparence change aussi : par exemple, mon visage\ns'affine, mes cheveux sont plus épais.\n\n« On appelle cela la croissance.\n\n| séance 2 IFT\n\nMesurer la croissance de son corps (taille, masse,\npointure).\n\nMatériel : une toise, un pèse-personne, un pédimètre si\npossible.\n\nN.B. : Cette séance de mesure est l'occasion d'un travail sur\nl'acceptation de la différence et du respect de l'autre ; elle\npeut faire l'objet en parallèle d'une séance d'EMC.\n\nL'enseignant-e propose aux élèves de repérer les change-\nments de leur corps (changements morphologiques) tout\nau long de l'année. On leur demande de rappeler comment\nleur corps change (taille, poids, apparence) afin de mettre\nen exergue le terme « croissance ». Puis on les interroge :\n\nQue peut-on mettre en place pour mesurer\nla croissance de son corps ?\n\nQuels sont les comportements favorables à la santé ? o 139\n\nFiche enseignant\n\nLes élèves peuvent proposer de se mesurer. On introduira\nalors la notion de toise, c'est-à-dire une règle verticale gra-\nduée en mètres et centimètres. On peut se mesurer plu-\nsieurs fois (4 fois) dans l'année mais aussi être pris-e en\nphoto, au même endroit (4 fois) dans l'année.\n\nLes élèves peuvent aussi proposer de se peser. L'enseignant-e\nexplique alors le fonctionnement d'un pèse-personne, les\nunités (kilogrammes et grammes). On peut se peser égale-\nment 4 fois dans l’année.\n\nEnfin, les élèves peuvent proposer de regarder la taille des\nvêtements et la pointure des chaussures (également fait\n4 fois dans l'année). L'enseignant-e peut suggérer l'utilisa-\ntion d'un pédimètre si cela est possible.\n\n(2 J'observe\n\nUne fois le protocole mis en place et le matériel nécessaire\nlisté et rassemblé, on détermine les 4 moments retenus\ndans l'année pour prendre les mesures. On met en place\ndes binômes : l’un mesurant, pesant l’autre et notant les\nréponses ; puis réciproquement. Un travail en Arts visuels\npeut être mené à ces occasions en réalisant des empreintes\ndes mains et/ou des pieds.\n\nL'enseignant-e annonce qu'à la fin de l’année scolaire, on\nreprendra l'évolution de ces mesures et de ces photos pour\nen tirer une conclusion.\n\nLa fiche élève 2 est alors distribuée. Elle sert de bilan ins-\ntantané mais aussi à compiler les mesures et les photogra-\nphies réalisées au fil de l’année.\n\n2 Je retiens\n\n+ Depuis ma naissance, mon corps se modi\nOn appelle cela la croissance.\n\n* Je peux observer ces changements à l'aide d’instru-\nments de mesure (toise, balance, pédimètre) mais aussi\nen regardant la pointure de mes chaussures, la taille de\nmes vêtements, des photos de moi plus petit-e.\n\n| Séance 3 FFT]\n\nSavoir lire et se repérer sur une courbe de croissance\ndans le carnet de santé.\n\nMatériel : une courbe de croissance d'un élève de 0 à 3 ans\npuis de 3 à 6 ans (une fille et un garçon) ; un pèse-personne\net une toise.\n\n[2 Je m’interroge\n\nSi elle a lieu en début d'année, l'enseignant-e peut utiliser\ncomme prétexte la visite médicale des CE2. On peut sinon\névoquer les visites médicales des années précédentes et on\ninterroge les élèves :\n\n|| Lors de votre visite médicale à l'école, qu'a fait\n| l'infirmière ? Comment a-t-elle pu mesurer la\n| croissance de votre corps ?\n\nOn peut attendre les réponses suivantes : « elle nous a\nmesuré », « elle nous a pesé », « elle a regardé nos dents »,\n« aussi elle a regardé si nos yeux voyaient bien ».\n\n140 « Quels sont les comportements favorables à la santé ?\n\nL'enseignant-e rappelle aux élèves que les mesures prises\n(taille, poids) sont inscrites dans le carnet de santé de\nchaque enfant afin de suivre sa courbe de croissance depuis\nla naissance.\n\n(2 J'observe\n\nL'enseignant-e propose alors d'observer la courbe de crois-\nsance d'un enfant « X » extrait d'un carnet de santé (recto\nde la fiche élève 3). On explique la lecture de la courbe\n(age en abscisse, masse et taille en ordonnées).\n\nLorsque les élèves ont bien compris la lecture des gra-\nphiques, l'enseignant-e propose de travailler sur la fiche\nélève 3 (verso).\n\nN.B. : L'enseignant-e peut envisager de faire réaliser la\ncourbe de croissance de chaque élève à partir des données\ninscrites dans le carnet de santé, avec l'accord des parents.\nSi cela s'avère compliqué à mettre en place, il est possible\nde proposer à chaque élève d'observer et de mesurer sa\ncroissance durant l’année scolaire en se pesant et en se\nmesurant tous les deux mois. On indique le protocole, rap-\npelle le fonctionnement de la toise et du pèse-personne et\ndistribue une fiche (sur le modèle de la fiche élève 2) afin\nde reporter la masse et la taille. Les élèves sont placés par\ngroupes de 2 : l'un note les résultats de l'autre et vice-versa.\nCette fiche sera utilisée toute l'année. Il faudra réaliser une\ncourbe de croissance à la fin de l'année scolaire, à partir des\ndonnées notées tous les deux mois tout au long de l'année.\n\n#4 Je retiens\n\n* Notre corps change quand on grandit. Notre taille aug-\nmente ainsi que notre poids (masse).\n\n+ Ces changements sont très importants durant les\ntrois premières années de la vie. On peut, pour s'en\nrendre compte, les représenter sur une courbe de crois-\nsance (comme celle de notre carnet de santé).\n\n dé) dès\n\nConnaître le nom des dents, leur nombre, leur forme et\nleur position dans la bouche.\nObserver les modifications de la dentition.\n\na Je m'interroge\n\nOn peut utiliser comme déclencheur à cette séance la\nperte d'une dent de lait par l'un-e ou plusieurs élèves de la\nclasse. L'enseignant-e observe avec la classe la dent tombée\net interroge les élèves :\n\nCet-te élève a perdu sa dent. Comment cela se fait-il ?\nEst-ce le cas pour tous les enfants ? Que se passe-t-il\nensuite ?\n\nmemes\n\nOn peut attendre les réponses suivantes : « c'est une dent\nde lait », « on perd nos dents de lait quand on a six ans ou\nsept ans et ensuite on a de nouvelles dents qui poussent\npar en dessous ».\n\nL'enseignant-e propose alors de mieux connaitre nos dents\nen les observant avec attention.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n_\n\n=\n\n&\n\n(D J'observe\n\nL’enseignant-e demande aux élèves de se mettre par deux\nde regarder leurs dents et de les compter. Ils repèrent les\ndents déjà tombées, les dents définitives qui commencent\nà pousser...\n\n| On profitera de cette séance pour reparler de l'hygiène\n| buccale (vue également dans le dossier 14).\n\n| 2 Je retiens\n\nIls repèrent également, avec l'aide de l'enseignant-e, que |\n\nles dents n’ont pas toutes la même forme : il y a des dents\npointues, des dents tranchantes et des grosses dents dans\n\nle fond de la bouche, plus plates. On donne le vocabulaire |\n\nau fur et à mesure des observations. Les canines sont poin-\ntues, les incisives tranchantes, les molaires aplaties.\nL'enseignant-e distribue alors la fiche élève 4 puis la fiche\nélève 5.\n\n« Notre dentition change quand on grandit.\n\n* Les premières dents d'un enfant sont les dents de lait :\nelles apparaissent entre six mois et 5 ans environ. Il y\nen a 20 (10 en haut et 10 en bas).\n\n* À partir de 6 ou 7 ans, les dents de lait tombent. Les\ndents définitives les remplacent alors. Il y en a plus que\nde dents de lait : un adulte qui a toutes ses dents en a 32.\n\nCOMMENT VOIR QUE JE GRANDIS ?\n\n© Depuis ma naissance, mon corps se modifie.\n\nMa taille change : je grandis.\n\nMon poids (masse) augmente : je grossis.\n\nMon apparence change aussi : mon visage s'affine, mes cheveux sont plus épais...\n\n© On appelle cela la croissance.\n\na\n\nLa toise, pour mesurer\nla taille.\n\nLa balance, pour mesurer\nle poids (masse).\n\nLe pédimètre, pour mesurer\nla taille des pieds.\n\ne On peut aussi regarder la pointure des chaussures, la taille des vêtements\n\net des photos de différents âges.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nQuels sont les comportements favorables à la santé ? o 141",
    guidePageDecisions: [
      {
        page: 139,
        confidence: 93,
        score: 24,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
        ],
        phaseMarkers: ["je m'interroge", "j'observe", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on demande", "groupe"],
        studentLike: false,
      },
      {
        page: 140,
        confidence: 93,
        score: 20,
        included: true,
        strongMarkers: ["seance", "l'enseignant", "enseignant-e", "les eleves", "aux eleves"],
        phaseMarkers: ["je m'interroge", "j'observe", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "groupe"],
        studentLike: false,
      },
      {
        page: 141,
        confidence: 93,
        score: 14,
        included: true,
        strongMarkers: ["seance", "l'enseignant", "enseignant-e", "aux eleves"],
        phaseMarkers: ["j'observe", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves"],
        studentLike: false,
      },
      {
        page: 142,
        confidence: 90,
        score: 1,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: false,
      },
    ],
    skippedProbePages: [142],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-12",
    dossierNumber: 12,
    partNumber: 3,
    partTitle: "Quels sont les comportements favorables à la santé ?",
    title: "Pourquoi les aliments sont-ils variés ?",
    guidePages: [155, 156],
    guidePageCount: 2,
    objectives: [
      "+ Constater la variété des aliments, connaître les catégories d'aliments.",
      "+ Identifier l’origine des aliments.",
      "Comprendre l'importance de la variété alimentaire dans les repas.",
    ],
    progressionNote:
      "Les dossiers 12 et 13 sont consacrés à l'alimentation et à la notion d'équilibre alimentaire.\nDans le dossier 12, il s'agit de présenter la variété des aliments et leur origine ; le dossier 13\nest quant à lui axé sur les apports spécifiques des aliments et la notion d'équilibre alimen-\ntaire. Trois séances sont proposées dans le dossier 12 : la séance 1 (CP) porte sur la variété\ndes aliments ; la séance 2 (CE1) sur l'origine des aliments ; la séance 3 (CE2) traite de\nl'importance de la variété alimentaire dans les repas (en lien avec l'EMC).",
    material: [],
    sessions: [
      {
        number: 1,
        title: "Constater la variété des aliments, connaître les catégo- ries d'aliments.",
        rawText:
          "9 séance 1 M\n\nConstater la variété des aliments, connaître les catégo-\nries d'aliments.\n\n8 Je m'interroge\n\nPour introduire le thème de cette séance, l’enseignant-e\ninterroge les élèves :\n\n[| Quavez-vous mangé hier soir ? Ce matin ?\n\nL'enseignant-e note au tableau tout ce que les élèves\ncitent. On peut aussi afficher les images correspondantes\nen grand format (— CD-Rom). On fait ainsi remarquer la\ngrande variété des aliments que nous consommons.\nL'enseignant-e interroge à nouveau les élèves :\n\nEst-ce que vous voyez des aliments que l'on pourrait\nranger, classer ensemble ? Pourquoi ?\n\nOn peut attendre des élèves les réponses suivantes : « on\npeut mettre ensemble les poires, les pommes et les fraises.\nce sont des fruits », « les yaourts, le lait et le fromage sont\nfaits avec du lait »...\n\nL'enseignant-e propose alors aux élèves de compléter et\nd'affiner ces réponses en faisant un travail de classement.\n\nJe recherche\n\nL'enseignant-e dispose alors les élèves par groupes de\nquatre. Leur tâche consiste à proposer un classement des\naliments présents sur les petites étiquettes de la fiche à\ndécouper (— sur CD-Rom).\n\nAprès ce temps de recherche, on écoute les propositions de\nchaque groupe.\n\nOn parvient alors progressivement au classement suivant,\navec l'aide de l'enseignant-e : fruits et légumes — sucre —\n\nproduits laitiers — féculents — viande, poisson, œuf — pro- |\n\nduits gras — eau.\n\nN.B. : On signalera que l'eau, s'il n'apparait pas comme un\naliment comme les autres, est nécessaire quotidiennement\nà notre corps.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nL'enseignant-e distribue alors la fiche élève 1. Il est néces-\nsaire de l'agrandir au format A3. Il faut également utiliser\nles petites étiquettes avec les noms des différentes catégo-\nries d'aliments qui sont dans la fiche à découper.\n\n#3 Je retiens\n\n* Nous consommons chaque jour une grande variété\nd'aliments.\n\n* On peut les classer en sept catégories :\n\n— viandes-œufs-poissons ;\n\n— fruits et légumes (crus ou cuits) ;\n\n— féculents (pain, riz, pâtes, pommes de terre) ;\n\n= produits laitiers (lait, fromages, yaourts) ;\n\n— produits gras (beurre, huile) ;\n\n— produits sucrés (sucre, gâteaux, bonbons, sodas) ;\n\n— eau.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "Pour introduire le thème de cette séance, l’enseignant-e\ninterroge les élèves :\n\n[| Quavez-vous mangé hier soir ? Ce matin ?\n\nL'enseignant-e note au tableau tout ce que les élèves\ncitent. On peut aussi afficher les images correspondantes\nen grand format (— CD-Rom). On fait ainsi remarquer la\ngrande variété des aliments que nous consommons.\nL'enseignant-e interroge à nouveau les élèves :\n\nEst-ce que vous voyez des aliments que l'on pourrait\nranger, classer ensemble ? Pourquoi ?\n\nOn peut attendre des élèves les réponses suivantes : « on\npeut mettre ensemble les poires, les pommes et les fraises.\nce sont des fruits », « les yaourts, le lait et le fromage sont\nfaits avec du lait »...\n\nL'enseignant-e propose alors aux élèves de compléter et\nd'affiner ces réponses en faisant un travail de classement.",
          },
          {
            title: "Je recherche",
            detail:
              "L'enseignant-e dispose alors les élèves par groupes de\nquatre. Leur tâche consiste à proposer un classement des\naliments présents sur les petites étiquettes de la fiche à\ndécouper (— sur CD-Rom).\n\nAprès ce temps de recherche, on écoute les propositions de\nchaque groupe.\n\nOn parvient alors progressivement au classement suivant,\navec l'aide de l'enseignant-e : fruits et légumes — sucre —\n\nproduits laitiers — féculents — viande, poisson, œuf — pro- |\n\nduits gras — eau.\n\nN.B. : On signalera que l'eau, s'il n'apparait pas comme un\naliment comme les autres, est nécessaire quotidiennement\nà notre corps.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nL'enseignant-e distribue alors la fiche élève 1. Il est néces-\nsaire de l'agrandir au format A3. Il faut également utiliser\nles petites étiquettes avec les noms des différentes catégo-\nries d'aliments qui sont dans la fiche à découper.\n\n#3",
          },
          {
            title: "Je retiens",
            detail:
              "* Nous consommons chaque jour une grande variété\nd'aliments.\n\n* On peut les classer en sept catégories :\n\n— viandes-œufs-poissons ;\n\n— fruits et légumes (crus ou cuits) ;\n\n— féculents (pain, riz, pâtes, pommes de terre) ;\n\n= produits laitiers (lait, fromages, yaourts) ;\n\n— produits gras (beurre, huile) ;\n\n— produits sucrés (sucre, gâteaux, bonbons, sodas) ;\n\n— eau.",
          },
        ],
      },
      {
        number: 2,
        title: "Identifier l'origine des aliments.",
        rawText:
          "| Séance 2 FF]\n\nIdentifier l'origine des aliments.\n\n8 Je m'interroge\n\nL'enseignant-e affiche de nouveau les images d'aliments\nutilisées dans la séance 1 (+ sur CD-Rom). On demande\naux élèves de rappeler les 7 catégories d'aliments repérées\npuis on les interroge :\n\n[ Savez-vous d’où proviennent ces aliments ?\nLes images sont observées une à une. Au fur et à mesure\ndes propositions des élèves, l'enseignant-e les place en\n\ndeux colonnes implicites : les aliments d'origine animale\nd'un côté et les aliments d'origine végétale de l'autre.\n\n£2) Je recherche\n\nUne fois ce travail collectif achevé, l'enseignant-e propose\nalors d'aller plus loin : on demande à quoi correspondent\nles deux colonnes au tableau. Les élèves observent les\naliments dans chaque colonne et ce qui les rapprochent.\n\nQuels sont les comportements favorables à la santé ? « 155\n\nFiche enseignant\n\nOn peut attendre les réponses suivantes : « dans une\ncolonne, tout vient des animaux, tandis que dans l'autre\nça vient des arbres ou des légumes ». On introduit alors les\ntermes « origine végétale » et « origine animale ». La fiche\ndocumentaire 1 peut être distribuée pendant cette phase\nde recherche pour aider les élèves à distinguer l'origine ani-\nmale et végétale des aliments.\n\nN.B. : On peut à cette occasion parler à nouveau de l'eau\nqui n'est ni animale ni végétale mais minérale et, on le\nrépète, indispensable à notre vie.\n\nOn distribue la fiche élève 2 pour fixer les connaissances\nacquises.\n\n2 Je retiens\n\n« Les aliments que nous mangeons sont :\n\n— soit d'origine animale. Ainsi les œufs proviennent des\npoules, le lait des vaches, des chèvres ou des brebis, la\nviande vient des porcs, vaches, moutons, lapins, poulets.\n— soit d'origine végétale. Ainsi le pain est fait avec du\nblé ou d'autres céréales ; l'huile est faite à partir de\ncéréales ou de fruits...",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e affiche de nouveau les images d'aliments\nutilisées dans la séance 1 (+ sur CD-Rom). On demande\naux élèves de rappeler les 7 catégories d'aliments repérées\npuis on les interroge :\n\n[ Savez-vous d’où proviennent ces aliments ?\nLes images sont observées une à une. Au fur et à mesure\ndes propositions des élèves, l'enseignant-e les place en\n\ndeux colonnes implicites : les aliments d'origine animale\nd'un côté et les aliments d'origine végétale de l'autre.\n\n£2)",
          },
          {
            title: "Je recherche",
            detail:
              "Une fois ce travail collectif achevé, l'enseignant-e propose\nalors d'aller plus loin : on demande à quoi correspondent\nles deux colonnes au tableau. Les élèves observent les\naliments dans chaque colonne et ce qui les rapprochent.\n\nQuels sont les comportements favorables à la santé ? « 155\n\nFiche enseignant\n\nOn peut attendre les réponses suivantes : « dans une\ncolonne, tout vient des animaux, tandis que dans l'autre\nça vient des arbres ou des légumes ». On introduit alors les\ntermes « origine végétale » et « origine animale ». La fiche\ndocumentaire 1 peut être distribuée pendant cette phase\nde recherche pour aider les élèves à distinguer l'origine ani-\nmale et végétale des aliments.\n\nN.B. : On peut à cette occasion parler à nouveau de l'eau\nqui n'est ni animale ni végétale mais minérale et, on le\nrépète, indispensable à notre vie.\n\nOn distribue la fiche élève 2 pour fixer les connaissances\nacquises.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "« Les aliments que nous mangeons sont :\n\n— soit d'origine animale. Ainsi les œufs proviennent des\npoules, le lait des vaches, des chèvres ou des brebis, la\nviande vient des porcs, vaches, moutons, lapins, poulets.\n— soit d'origine végétale. Ainsi le pain est fait avec du\nblé ou d'autres céréales ; l'huile est faite à partir de\ncéréales ou de fruits...",
          },
        ],
      },
      {
        number: 3,
        title: "Comprendre l'importance de la variété alimentaire dans les repas.",
        rawText:
          "| Séance 3 FT T)\n\nComprendre l'importance de la variété alimentaire dans\nles repas.\n\na Je m'interroge\n\nL’enseignant-e distribue ou projette les menus de la can-\ntine de l’école sur une semaine, sur lesquels les familles\n\nd'aliments sont repérées par des couleurs différentes. Les\nmenus sont lus ensemble. On interroge ensuite les élèves :\n\n| À votre avis, pourquoi y a-t-il différentes couleurs sur\n| ce menu?\n\nLes élèves vont sans doute se rappeler le travail fait l'an-\nnée précédente sur les catégories d'aliments (si nécessaire,\non leur remet en mémoire les différentes catégories), Ils\npeuvent remarquer que le vert correspond aux fruits et\nlégumes, le rouge aux viandes, œufs et poissons.\n\nOn remarque collectivement que chaque menu comprend\ndes aliments provenant de chaque catégorie.\n\n2) Je recherche\n\nOn propose alors aux élèves de s'interroger sur leurs repas\nau quotidien durant une semaine. Ce travail peut prendre la\nforme d'une enquête à mener à la maison et à la cantine le\ncas échéant.\n\nL'enseignant-e distribue alors la fiche élève 3 où chaque\nélève pourra noter ses menus durant une semaine d'école.\nOn reprend cette séance la semaine suivante, l'enquête\nmenée servant de support au verso de la fiche élève 3.\n\n2 Je retiens\n\n« Une alimentation variée et équilibrée permet de res-\nter en bonne santé.\n\n«Il est important de manger des aliments de chaque\ncatégorie en quantité raisonnable et de limiter les pro-\nduits gras et sucrés.\n\n« Il faut boire de l’eau régulièrement.\n\nLES FAMILLES D'ALIMENTS\n\nO3 EAN\n[ Produits sucrés)\n\n\\\n\n\\\nFruits et légumes\n__\n\nMots a retenir\n\nAliments Catégories d'aliments\n\nOrigine des aliments\n\nVariété alimentaire\n\n156 » Quels sont les comportements favorables à la santé ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n—/",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L’enseignant-e distribue ou projette les menus de la can-\ntine de l’école sur une semaine, sur lesquels les familles\n\nd'aliments sont repérées par des couleurs différentes. Les\nmenus sont lus ensemble. On interroge ensuite les élèves :\n\n| À votre avis, pourquoi y a-t-il différentes couleurs sur\n| ce menu?\n\nLes élèves vont sans doute se rappeler le travail fait l'an-\nnée précédente sur les catégories d'aliments (si nécessaire,\non leur remet en mémoire les différentes catégories), Ils\npeuvent remarquer que le vert correspond aux fruits et\nlégumes, le rouge aux viandes, œufs et poissons.\n\nOn remarque collectivement que chaque menu comprend\ndes aliments provenant de chaque catégorie.\n\n2)",
          },
          {
            title: "Je recherche",
            detail:
              "On propose alors aux élèves de s'interroger sur leurs repas\nau quotidien durant une semaine. Ce travail peut prendre la\nforme d'une enquête à mener à la maison et à la cantine le\ncas échéant.\n\nL'enseignant-e distribue alors la fiche élève 3 où chaque\nélève pourra noter ses menus durant une semaine d'école.\nOn reprend cette séance la semaine suivante, l'enquête\nmenée servant de support au verso de la fiche élève 3.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "« Une alimentation variée et équilibrée permet de res-\nter en bonne santé.\n\n«Il est important de manger des aliments de chaque\ncatégorie en quantité raisonnable et de limiter les pro-\nduits gras et sucrés.\n\n« Il faut boire de l’eau régulièrement.\n\nLES FAMILLES D'ALIMENTS\n\nO3 EAN\n[ Produits sucrés)\n\n\\\n\n\\\nFruits et légumes\n__\n\nMots a retenir\n\nAliments Catégories d'aliments\n\nOrigine des aliments\n\nVariété alimentaire\n\n156 » Quels sont les comportements favorables à la santé ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n—/",
          },
        ],
      },
    ],
    guideText:
      ") Pourquoi les aliments sont-ils variés ?\n\n( » Objectifs\n\n| + Constater la variété des aliments, connaître les catégories d'aliments.\n\n+ Identifier l’origine des aliments.\n\n|\n|\n| * Comprendre l'importance de la variété alimentaire dans les repas.\n|\n\n> Indications de progression dans le cycle 2 |\n| Les dossiers 12 et 13 sont consacrés à l'alimentation et à la notion d'équilibre alimentaire.\nDans le dossier 12, il s'agit de présenter la variété des aliments et leur origine ; le dossier 13 |\nest quant à lui axé sur les apports spécifiques des aliments et la notion d'équilibre alimen- |\ntaire. Trois séances sont proposées dans le dossier 12 : la séance 1 (CP) porte sur la variété |\ndes aliments ; la séance 2 (CE1) sur l'origine des aliments ; la séance 3 (CE2) traite de\nl'importance de la variété alimentaire dans les repas (en lien avec l'EMC).\n\n9 séance 1 M\n\nConstater la variété des aliments, connaître les catégo-\nries d'aliments.\n\n8 Je m'interroge\n\nPour introduire le thème de cette séance, l’enseignant-e\ninterroge les élèves :\n\n[| Quavez-vous mangé hier soir ? Ce matin ?\n\nL'enseignant-e note au tableau tout ce que les élèves\ncitent. On peut aussi afficher les images correspondantes\nen grand format (— CD-Rom). On fait ainsi remarquer la\ngrande variété des aliments que nous consommons.\nL'enseignant-e interroge à nouveau les élèves :\n\nEst-ce que vous voyez des aliments que l'on pourrait\nranger, classer ensemble ? Pourquoi ?\n\nOn peut attendre des élèves les réponses suivantes : « on\npeut mettre ensemble les poires, les pommes et les fraises.\nce sont des fruits », « les yaourts, le lait et le fromage sont\nfaits avec du lait »...\n\nL'enseignant-e propose alors aux élèves de compléter et\nd'affiner ces réponses en faisant un travail de classement.\n\nJe recherche\n\nL'enseignant-e dispose alors les élèves par groupes de\nquatre. Leur tâche consiste à proposer un classement des\naliments présents sur les petites étiquettes de la fiche à\ndécouper (— sur CD-Rom).\n\nAprès ce temps de recherche, on écoute les propositions de\nchaque groupe.\n\nOn parvient alors progressivement au classement suivant,\navec l'aide de l'enseignant-e : fruits et légumes — sucre —\n\nproduits laitiers — féculents — viande, poisson, œuf — pro- |\n\nduits gras — eau.\n\nN.B. : On signalera que l'eau, s'il n'apparait pas comme un\naliment comme les autres, est nécessaire quotidiennement\nà notre corps.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nL'enseignant-e distribue alors la fiche élève 1. Il est néces-\nsaire de l'agrandir au format A3. Il faut également utiliser\nles petites étiquettes avec les noms des différentes catégo-\nries d'aliments qui sont dans la fiche à découper.\n\n#3 Je retiens\n\n* Nous consommons chaque jour une grande variété\nd'aliments.\n\n* On peut les classer en sept catégories :\n\n— viandes-œufs-poissons ;\n\n— fruits et légumes (crus ou cuits) ;\n\n— féculents (pain, riz, pâtes, pommes de terre) ;\n\n= produits laitiers (lait, fromages, yaourts) ;\n\n— produits gras (beurre, huile) ;\n\n— produits sucrés (sucre, gâteaux, bonbons, sodas) ;\n\n— eau.\n\n| Séance 2 FF]\n\nIdentifier l'origine des aliments.\n\n8 Je m'interroge\n\nL'enseignant-e affiche de nouveau les images d'aliments\nutilisées dans la séance 1 (+ sur CD-Rom). On demande\naux élèves de rappeler les 7 catégories d'aliments repérées\npuis on les interroge :\n\n[ Savez-vous d’où proviennent ces aliments ?\nLes images sont observées une à une. Au fur et à mesure\ndes propositions des élèves, l'enseignant-e les place en\n\ndeux colonnes implicites : les aliments d'origine animale\nd'un côté et les aliments d'origine végétale de l'autre.\n\n£2) Je recherche\n\nUne fois ce travail collectif achevé, l'enseignant-e propose\nalors d'aller plus loin : on demande à quoi correspondent\nles deux colonnes au tableau. Les élèves observent les\naliments dans chaque colonne et ce qui les rapprochent.\n\nQuels sont les comportements favorables à la santé ? « 155\n\nFiche enseignant\n\nOn peut attendre les réponses suivantes : « dans une\ncolonne, tout vient des animaux, tandis que dans l'autre\nça vient des arbres ou des légumes ». On introduit alors les\ntermes « origine végétale » et « origine animale ». La fiche\ndocumentaire 1 peut être distribuée pendant cette phase\nde recherche pour aider les élèves à distinguer l'origine ani-\nmale et végétale des aliments.\n\nN.B. : On peut à cette occasion parler à nouveau de l'eau\nqui n'est ni animale ni végétale mais minérale et, on le\nrépète, indispensable à notre vie.\n\nOn distribue la fiche élève 2 pour fixer les connaissances\nacquises.\n\n2 Je retiens\n\n« Les aliments que nous mangeons sont :\n\n— soit d'origine animale. Ainsi les œufs proviennent des\npoules, le lait des vaches, des chèvres ou des brebis, la\nviande vient des porcs, vaches, moutons, lapins, poulets.\n— soit d'origine végétale. Ainsi le pain est fait avec du\nblé ou d'autres céréales ; l'huile est faite à partir de\ncéréales ou de fruits...\n\n| Séance 3 FT T)\n\nComprendre l'importance de la variété alimentaire dans\nles repas.\n\na Je m'interroge\n\nL’enseignant-e distribue ou projette les menus de la can-\ntine de l’école sur une semaine, sur lesquels les familles\n\nd'aliments sont repérées par des couleurs différentes. Les\nmenus sont lus ensemble. On interroge ensuite les élèves :\n\n| À votre avis, pourquoi y a-t-il différentes couleurs sur\n| ce menu?\n\nLes élèves vont sans doute se rappeler le travail fait l'an-\nnée précédente sur les catégories d'aliments (si nécessaire,\non leur remet en mémoire les différentes catégories), Ils\npeuvent remarquer que le vert correspond aux fruits et\nlégumes, le rouge aux viandes, œufs et poissons.\n\nOn remarque collectivement que chaque menu comprend\ndes aliments provenant de chaque catégorie.\n\n2) Je recherche\n\nOn propose alors aux élèves de s'interroger sur leurs repas\nau quotidien durant une semaine. Ce travail peut prendre la\nforme d'une enquête à mener à la maison et à la cantine le\ncas échéant.\n\nL'enseignant-e distribue alors la fiche élève 3 où chaque\nélève pourra noter ses menus durant une semaine d'école.\nOn reprend cette séance la semaine suivante, l'enquête\nmenée servant de support au verso de la fiche élève 3.\n\n2 Je retiens\n\n« Une alimentation variée et équilibrée permet de res-\nter en bonne santé.\n\n«Il est important de manger des aliments de chaque\ncatégorie en quantité raisonnable et de limiter les pro-\nduits gras et sucrés.\n\n« Il faut boire de l’eau régulièrement.\n\nLES FAMILLES D'ALIMENTS\n\nO3 EAN\n[ Produits sucrés)\n\n\\\n\n\\\nFruits et légumes\n__\n\nMots a retenir\n\nAliments Catégories d'aliments\n\nOrigine des aliments\n\nVariété alimentaire\n\n156 » Quels sont les comportements favorables à la santé ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n—/",
    guidePageDecisions: [
      {
        page: 155,
        confidence: 92,
        score: 26,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "par groupes",
        ],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on demande", "par groupes", "groupe"],
        studentLike: true,
      },
      {
        page: 156,
        confidence: 92,
        score: 20,
        included: true,
        strongMarkers: ["seance", "l'enseignant", "enseignant-e", "les eleves", "aux eleves"],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: [
          "enseignant",
          "eleves",
          "on propose",
          "on interroge",
          "on distribue",
        ],
        studentLike: true,
      },
      {
        page: 157,
        confidence: 90,
        score: 0,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: false,
      },
    ],
    skippedProbePages: [157],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-13",
    dossierNumber: 13,
    partNumber: 3,
    partTitle: "Quels sont les comportements favorables à la santé ?",
    title: "Qu'apportent les aliments à mon corps ?",
    guidePages: [167, 168],
    guidePageCount: 2,
    objectives: [
      "Connaitre les apports spécifiques des aliments (apport d'énergie : manger pour bouger).",
      "+ Acquérir quelques notions d'équilibre alimentaire (sur un repas, sur une journée, sur",
      "la semaine).",
      "Ce dossier s'adresse spécifiquement aux niveaux CE1 et CE2. Il s'agit de connaitre diffé-",
    ],
    progressionNote:
      "nécessité de consommation quotidienne d’eau, de légumes et de fruits frais. Avec les CE2,\nL les effets d’une alimentation déséquilibrée seront abordés.\nrents types d'aliments dont les aliments gras, salés et sucrés, et de prendre conscience de la\ndé dés\nConnaitre différents types d'aliments dont les aliments\ngras, salés et sucrés.\nPrendre conscience de la nécessité d'une consommation\nquotidienne d’eau, de légumes et de fruits frais.\nsem interroge\nL'enseignant-e rappelle aux élèves ce qui a été vu dans le\ndossier précédent. On replace avec eux les aliments dans\nleurs familles et on précise de nouveau la nécessité de\nmanger équilibré pour être en bonne santé.\nL'enseignant-e demande alors aux élèves :\nÀ votre avis, quels sont les aliments qui sont bons\npour votre santé ? Pourquoi ?\nQuels sont ceux qui, si on en mange trop, ne sont pas\nbons pour votre santé ? Pourquoi ?\nOn peut attendre les réponses suivantes : « il ne faut pas\nmanger trop de bonbons, ça donne des caries », « le sucre,\nce n’est pas bon pour les dents », « il faut manger des fruits\net des légumes pour avoir des vitamines ! », « les frites sont\ntrès grasses, il ne faut pas en manger trop souvent car cela\nfait grossir ; et il ne faut pas trop les saler ».\nL'enseignant-e propose alors aux élèves de travailler sur un\ndocument qui présente les apports de tous ces aliments\nainsi que de ceux dont on doit se méfier.\nJe recherche\nL'enseignant-e distribue la fiche documentaire 1. Elle pré-\nsente sous la forme d'un tableau double entrée les prin-\ncipaux types d'aliments, leurs effets bénéfiques ou nocifs\npour la santé.\nLa fiche élève 1 permet aux élèves d'extraire et de com-\nprendre ces informations.\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\nJe retiens\nChaque type d'aliment est important pour être en\nbonne santé :\n— les féculents pour avoir de l'énergie, il faut en manger\nà chaque repas ;\n— les fruits et légumes à chaque repas aussi, pour les\nfibres et les vitamines ;\n— les viandes, œufs et poissons pour construire les\nmuscles, une fois par jour ;\n— les produits laitiers pour avoir des os solides, à\nchaque repas ;\n— les produits gras, salés ou sucrés sont à consom-\nmer de temps en temps pour éviter d'être en mauvaise\nsanté ;\n« Et il faut boire de l'eau régulièrement chaque jour car\nnotre corps doit reconstituer ses réserves en eau.",
    material: [],
    sessions: [
      {
        number: 2,
        title:
          "Identifier les effets d'une alimentation déséquilibrée. Bem interroge L'enseignant-e demande aux élèves de se remémorer ce qui",
        rawText:
          "| Séance 2 MFT T]\n\nIdentifier les effets d'une alimentation déséquilibrée.\n\nBem interroge\n\nL'enseignant-e demande aux élèves de se remémorer ce qui\nà été vu lors de la séance précédente : les différents types\nd'aliments et leurs apports spécifiques. On interroge alors\nles élèves :\n\nÀ votre avis, que peut-il se passer si notre alimentation\nest déséquilibrée ? Qu'est-ce que cela signifie ?\nPouvez-vous donner des exemples de « mauvais\ncomportements » et des risques liés pour notre corps\net notre santé ?\n\nQuels sont les comportements favorables à la santé ? o 167\n\nFiche enseignant\n\nOn peut attendre des élèves les réponses suivantes : « c'est\nlorsque l'on mange seulement des frites à tous les repas »,\n« trop de glaces ou de bonbons, ça peut nous donner des\ncaries », « si on mange trop de sucreries et de gâteaux, on\npeut devenir gros, avoir des maladies et être en mauvaise\nsanté ».\n\nL’enseignant-e indique aux élèves qu'ils vont travailler\nmaintenant sur ces différents comportements alimentaires.\n\nJe recherche\n\nLes élèves sont placés par groupes de 4. Ils ont à leur dis-\nposition une feuille A3 séparée en deux colonnes : mauvais\ncomportements — risques pour notre corps ou notre santé.\nIls doivent associer un comportement au risque lié. Par\nexemple : manger trop de bonbons — ça peut donner des\ncaries.\n\nUne mise en commun est effectuée après un temps de tra-\nvail et de recherche en autonomie.\n\nL'enseignant-e synthétise les réponses des élèves puis dis-\ntribue la fiche élève 2.\n\nES\n\nBien manger, bouger,\nprotége votre santé.\n\nselon\n\n1 ou 2 fois\npar jour\n\nViandes, ceufs\net poissons\n\n=\n\nProduits laitiers\n\n-\n\nots a retenir\n\nA chaque repas\n\nl'appétit\n\nRéponses de l'exercice 2 de la fiche élève 2 :\n\nhamburger | frites soda glace\nsel 25g 15g - _\nsucre 15g - 45g 35g\nhuile 25g 15g - 15g _\n\nÀ l'issue du travail réalisé sur la fiche élève 2, un retour\nen travail collectif permet de dégager les idées fortes de la\ntrace écrite.\n\n2 Je retiens\n\n» Nous mangeons et buvons chaque jour pour construire,\nentretenir et fournir de l'énergie à notre corps.\n\n«Il est important de manger de tout en quantité\nraisonnable.\n\n« La consommation en grande quantité d'aliments gras,\nsalés ou sucrés peut entrainer un surpoids et des mala-\ndies. Le sucre, le sel ou l'huile sont souvent cachés dans\nles plats préparés.\n\n+ Mangeons équilibré et bougeons !\n\ndo\n\n5 fois\n\npar jour\n\n= Limiter\nCA la consommation\nf\n\nÉquilibre alimentaire\n\nSurpoids\n\nAliments gras / salés / sucrés\n\nMaladies\n\n168 « Quels sont les comportements favorables à la santé ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
        phases: [
          {
            title: "Je recherche",
            detail:
              "Les élèves sont placés par groupes de 4. Ils ont à leur dis-\nposition une feuille A3 séparée en deux colonnes : mauvais\ncomportements — risques pour notre corps ou notre santé.\nIls doivent associer un comportement au risque lié. Par\nexemple : manger trop de bonbons — ça peut donner des\ncaries.\n\nUne mise en commun est effectuée après un temps de tra-\nvail et de recherche en autonomie.\n\nL'enseignant-e synthétise les réponses des élèves puis dis-\ntribue la fiche élève 2.\n\nES\n\nBien manger, bouger,\nprotége votre santé.\n\nselon\n\n1 ou 2 fois\npar jour\n\nViandes, ceufs\net poissons\n\n=\n\nProduits laitiers\n\n-\n\nots a retenir\n\nA chaque repas\n\nl'appétit\n\nRéponses de l'exercice 2 de la fiche élève 2 :\n\nhamburger | frites soda glace\nsel 25g 15g - _\nsucre 15g - 45g 35g\nhuile 25g 15g - 15g _\n\nÀ l'issue du travail réalisé sur la fiche élève 2, un retour\nen travail collectif permet de dégager les idées fortes de la\ntrace écrite.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "» Nous mangeons et buvons chaque jour pour construire,\nentretenir et fournir de l'énergie à notre corps.\n\n«Il est important de manger de tout en quantité\nraisonnable.\n\n« La consommation en grande quantité d'aliments gras,\nsalés ou sucrés peut entrainer un surpoids et des mala-\ndies. Le sucre, le sel ou l'huile sont souvent cachés dans\nles plats préparés.\n\n+ Mangeons équilibré et bougeons !\n\ndo\n\n5 fois\n\npar jour\n\n= Limiter\nCA la consommation\nf\n\nÉquilibre alimentaire\n\nSurpoids\n\nAliments gras / salés / sucrés\n\nMaladies\n\n168 « Quels sont les comportements favorables à la santé ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
          },
        ],
      },
    ],
    guideText:
      "| Bu’apportent les aliments à mon corps ?\n\n[ > Objectifs\n\n* Connaitre les apports spécifiques des aliments (apport d'énergie : manger pour bouger). |\n+ Acquérir quelques notions d'équilibre alimentaire (sur un repas, sur une journée, sur\n\nla semaine).\n\nCe dossier s'adresse spécifiquement aux niveaux CE1 et CE2. Il s'agit de connaitre diffé-\n\n|\n|\n| > Indications de progression dans le cycle 2\n|\n|\n\nnécessité de consommation quotidienne d’eau, de légumes et de fruits frais. Avec les CE2,\nL les effets d’une alimentation déséquilibrée seront abordés.\n\n|\nrents types d'aliments dont les aliments gras, salés et sucrés, et de prendre conscience de la |\n\n dé dés\n\nConnaitre différents types d'aliments dont les aliments\ngras, salés et sucrés.\n\nPrendre conscience de la nécessité d'une consommation\nquotidienne d’eau, de légumes et de fruits frais.\n\n8 sem interroge\n\nL'enseignant-e rappelle aux élèves ce qui a été vu dans le\ndossier précédent. On replace avec eux les aliments dans\nleurs familles et on précise de nouveau la nécessité de\nmanger équilibré pour être en bonne santé.\n\nL'enseignant-e demande alors aux élèves :\n\nÀ votre avis, quels sont les aliments qui sont bons\npour votre santé ? Pourquoi ?\n\nQuels sont ceux qui, si on en mange trop, ne sont pas\nbons pour votre santé ? Pourquoi ?\n\nOn peut attendre les réponses suivantes : « il ne faut pas\nmanger trop de bonbons, ça donne des caries », « le sucre,\nce n’est pas bon pour les dents », « il faut manger des fruits\net des légumes pour avoir des vitamines ! », « les frites sont\ntrès grasses, il ne faut pas en manger trop souvent car cela\nfait grossir ; et il ne faut pas trop les saler ».\nL'enseignant-e propose alors aux élèves de travailler sur un\ndocument qui présente les apports de tous ces aliments\nainsi que de ceux dont on doit se méfier.\n\nJe recherche\n\nL'enseignant-e distribue la fiche documentaire 1. Elle pré-\nsente sous la forme d'un tableau double entrée les prin-\ncipaux types d'aliments, leurs effets bénéfiques ou nocifs\npour la santé.\n\nLa fiche élève 1 permet aux élèves d'extraire et de com-\nprendre ces informations.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n2 Je retiens\n\n* Chaque type d'aliment est important pour être en\nbonne santé :\n\n— les féculents pour avoir de l'énergie, il faut en manger\nà chaque repas ;\n\n— les fruits et légumes à chaque repas aussi, pour les\nfibres et les vitamines ;\n\n— les viandes, œufs et poissons pour construire les\nmuscles, une fois par jour ;\n\n— les produits laitiers pour avoir des os solides, à\nchaque repas ;\n\n— les produits gras, salés ou sucrés sont à consom-\nmer de temps en temps pour éviter d'être en mauvaise\nsanté ;\n\n« Et il faut boire de l'eau régulièrement chaque jour car\nnotre corps doit reconstituer ses réserves en eau.\n\n| Séance 2 MFT T]\n\nIdentifier les effets d'une alimentation déséquilibrée.\n\nBem interroge\n\nL'enseignant-e demande aux élèves de se remémorer ce qui\nà été vu lors de la séance précédente : les différents types\nd'aliments et leurs apports spécifiques. On interroge alors\nles élèves :\n\nÀ votre avis, que peut-il se passer si notre alimentation\nest déséquilibrée ? Qu'est-ce que cela signifie ?\nPouvez-vous donner des exemples de « mauvais\ncomportements » et des risques liés pour notre corps\net notre santé ?\n\nQuels sont les comportements favorables à la santé ? o 167\n\nFiche enseignant\n\nOn peut attendre des élèves les réponses suivantes : « c'est\nlorsque l'on mange seulement des frites à tous les repas »,\n« trop de glaces ou de bonbons, ça peut nous donner des\ncaries », « si on mange trop de sucreries et de gâteaux, on\npeut devenir gros, avoir des maladies et être en mauvaise\nsanté ».\n\nL’enseignant-e indique aux élèves qu'ils vont travailler\nmaintenant sur ces différents comportements alimentaires.\n\nJe recherche\n\nLes élèves sont placés par groupes de 4. Ils ont à leur dis-\nposition une feuille A3 séparée en deux colonnes : mauvais\ncomportements — risques pour notre corps ou notre santé.\nIls doivent associer un comportement au risque lié. Par\nexemple : manger trop de bonbons — ça peut donner des\ncaries.\n\nUne mise en commun est effectuée après un temps de tra-\nvail et de recherche en autonomie.\n\nL'enseignant-e synthétise les réponses des élèves puis dis-\ntribue la fiche élève 2.\n\nES\n\nBien manger, bouger,\nprotége votre santé.\n\nselon\n\n1 ou 2 fois\npar jour\n\nViandes, ceufs\net poissons\n\n=\n\nProduits laitiers\n\n-\n\nots a retenir\n\nA chaque repas\n\nl'appétit\n\nRéponses de l'exercice 2 de la fiche élève 2 :\n\nhamburger | frites soda glace\nsel 25g 15g - _\nsucre 15g - 45g 35g\nhuile 25g 15g - 15g _\n\nÀ l'issue du travail réalisé sur la fiche élève 2, un retour\nen travail collectif permet de dégager les idées fortes de la\ntrace écrite.\n\n2 Je retiens\n\n» Nous mangeons et buvons chaque jour pour construire,\nentretenir et fournir de l'énergie à notre corps.\n\n«Il est important de manger de tout en quantité\nraisonnable.\n\n« La consommation en grande quantité d'aliments gras,\nsalés ou sucrés peut entrainer un surpoids et des mala-\ndies. Le sucre, le sel ou l'huile sont souvent cachés dans\nles plats préparés.\n\n+ Mangeons équilibré et bougeons !\n\ndo\n\n5 fois\n\npar jour\n\n= Limiter\nCA la consommation\nf\n\nÉquilibre alimentaire\n\nSurpoids\n\nAliments gras / salés / sucrés\n\nMaladies\n\n168 « Quels sont les comportements favorables à la santé ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
    guidePageDecisions: [
      {
        page: 167,
        confidence: 92,
        score: 20,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
        ],
        phaseMarkers: ["je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on interroge"],
        studentLike: false,
      },
      {
        page: 168,
        confidence: 92,
        score: 16,
        included: true,
        strongMarkers: ["l'enseignant", "enseignant-e", "les eleves", "aux eleves", "par groupes"],
        phaseMarkers: ["je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "par groupes", "groupe"],
        studentLike: true,
      },
      {
        page: 169,
        confidence: 89,
        score: 1,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: false,
      },
    ],
    skippedProbePages: [169],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-14",
    dossierNumber: 14,
    partNumber: 3,
    partTitle: "Quels sont les comportements favorables à la santé ?",
    title: "Que faire pour rester en forme ?",
    guidePages: [177, 178, 179],
    guidePageCount: 3,
    objectives: [
      "Mettre en œuvre et apprécier quelques règles d'hygiène de vie : effets positifs d'une acti-",
      "vité physique régulière sur l'organisme, capacité à se relaxer et mise en relation de son âge",
      "et de ses besoins de sommeil, habitudes quotidiennes de proprété (dents, mains, corps).",
    ],
    progressionNote:
      "Ce dossier sur l'hygiène de vie concerne les trois niveaux du cycle 2.\nLa séance 1 est consacrée aux habitudes quotidiennes de propreté (dents, mains, corps).\nCette séance 1 destinée en priorité aux CP peut bien sûr être revue pendant les autres\nannées du cycle. Ce thème est approfondi en séance 2 (CE1-CE2) avec les notions de\npropre/sale et sain/malade. La séance 3 (CE1-CE2) traite des effets positifs d'une acti-\nvité physique régulière sur l'organisme. Les séance 4 et 5 portent sur les changements de\nrythme d'activité quotidiens (CP) en mettant en exergue le besoin de sommeil en fonction\nde l'âge (CE1-CE2). Nous vous proposons des fiches élève et d'évaluation de niveaux diffé-\nrents, en prenant en compte cette progression.\nFiche enseignant\nJe retiens\nPour être en bonne santé, il est important de respecter\ndes règles de propreté :\n— je me lave les mains plusieurs fois par jour (avant de\nmanger, après être allé-e aux toilettes, etc.) ;\n— je me brosse les dents au moins deux fois par jour,\nle matin et le soir ;\n— je me lave le corps tous les jours.",
    material: [],
    sessions: [
      {
        number: 1,
        title:
          "Prendre des habitudes quotidiennes de propreté : mettre en œuvre des règles d'hygiène de vie (se laver le corps, se laver les mains, se brosser les dents).",
        rawText:
          "| séance 1 JEINFT\n\nPrendre des habitudes quotidiennes de propreté : mettre\nen œuvre des règles d'hygiène de vie (se laver le corps,\nse laver les mains, se brosser les dents).\n\na Je m'interroge\nPour aborder ce thème sur les règles d'hygiène au quoti-\ndien, l'enseignant-e interroge les élèves :\n\nQue devez-vous faire à chaque fois après être allé-e aux\ntoilettes ?\n\nLes élèves vont facilement dire qu'il faut se laver les mains\ncar sinon « ce n’est pas propre, il y a des microbes ».\nL'enseignant-e leur demande ensuite :\n\n au\n\nPrendre des habitudes quotidiennes de propreté : faire\n\nEst-ce le seul moment où il est important de se laver la différence entre propre et sale, entre sain et malade.\n\nles mains ? Que faut-il faire pour être propre tous les\njours ? a Je m‘interroge\n\nLes élèves pourront répondre : « on se lave les mains avant | l'enseignant-e débute cette séance en demandant aux\n\nde manger », « il faut se doucher ou prendre un bain »,\n« il faut aussi se brosser les dents le matin et le soir », etc.\n\nL'enseignant-e propose aux élèves de faire le point sur les\n\nbons gestes d'hygiène au quotidien.\n\nJe recherche\n\nL'enseignant-e distribue la fiche élève 1. Les exercices |\n\nproposés permettent de mettre en évidence les habitudes\nd'hygiène à respecter.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nélèves :\n\nEst-ce que vos mains sont propres ? Comment faire la\ndifférence entre propre et sale ?\n\nLes élèves vont répondre à l'oral : « oui elles sont propres, je\nles ai lavées », « il n'y a pas de taches, elles sont propres »,\n« j'ai de l'encre sur les doigts, elles ne sont pas propres ».\nAprès ces réponses spontanées des élèves, l'enseignant-e\nleur propose de rechercher toutes les habitudes quoti-\ndiennes de propreté qu'il faut avoir pour être et rester en\nbonne santé.\n\nJe recherche\n\nL'enseignant-e distribue la fiche élève 2. Les exercices pro-\nposés permettront de faire comprendre aux élèves la diffé-\nrence entre propre et sale, entre sain et malade.\n\nQuels sont les comportements favorables à la santé ? ¢ 177\n\n2 Je retiens\n\n«Pour garder un corps propre et en bonne santé, je\nprends des habitudes quotidiennes de propreté :\n\n— je me lave chaque jour ;\n\n—je me lave les mains pour éviter de propager des\nmicrobes ;\n\n— je me brosse les dents pour éviter les caries et ainsi\ngarder des dents saines.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "Pour aborder ce thème sur les règles d'hygiène au quoti-\ndien, l'enseignant-e interroge les élèves :\n\nQue devez-vous faire à chaque fois après être allé-e aux\ntoilettes ?\n\nLes élèves vont facilement dire qu'il faut se laver les mains\ncar sinon « ce n’est pas propre, il y a des microbes ».\nL'enseignant-e leur demande ensuite :\n\n au\n\nPrendre des habitudes quotidiennes de propreté : faire\n\nEst-ce le seul moment où il est important de se laver la différence entre propre et sale, entre sain et malade.\n\nles mains ? Que faut-il faire pour être propre tous les\njours ? a Je m‘interroge\n\nLes élèves pourront répondre : « on se lave les mains avant | l'enseignant-e débute cette séance en demandant aux\n\nde manger », « il faut se doucher ou prendre un bain »,\n« il faut aussi se brosser les dents le matin et le soir », etc.\n\nL'enseignant-e propose aux élèves de faire le point sur les\n\nbons gestes d'hygiène au quotidien.",
          },
          {
            title: "Je recherche",
            detail:
              "L'enseignant-e distribue la fiche élève 1. Les exercices |\n\nproposés permettent de mettre en évidence les habitudes\nd'hygiène à respecter.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nélèves :\n\nEst-ce que vos mains sont propres ? Comment faire la\ndifférence entre propre et sale ?\n\nLes élèves vont répondre à l'oral : « oui elles sont propres, je\nles ai lavées », « il n'y a pas de taches, elles sont propres »,\n« j'ai de l'encre sur les doigts, elles ne sont pas propres ».\nAprès ces réponses spontanées des élèves, l'enseignant-e\nleur propose de rechercher toutes les habitudes quoti-\ndiennes de propreté qu'il faut avoir pour être et rester en\nbonne santé.",
          },
          {
            title: "Je recherche",
            detail:
              "L'enseignant-e distribue la fiche élève 2. Les exercices pro-\nposés permettront de faire comprendre aux élèves la diffé-\nrence entre propre et sale, entre sain et malade.\n\nQuels sont les comportements favorables à la santé ? ¢ 177\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "«Pour garder un corps propre et en bonne santé, je\nprends des habitudes quotidiennes de propreté :\n\n— je me lave chaque jour ;\n\n—je me lave les mains pour éviter de propager des\nmicrobes ;\n\n— je me brosse les dents pour éviter les caries et ainsi\ngarder des dents saines.",
          },
        ],
      },
      {
        number: 3,
        title:
          "Prendre conscience des effets positifs d'une pratique physique régulière sur l'organisme.",
        rawText:
          "| Séance 3 FT NET L)\n\nPrendre conscience des effets positifs d'une pratique\nphysique régulière sur l'organisme.\n\nEJ Je m'interroge\n\nÀ la suite d'une séance de sport, l'enseignant-e, de retour\ndans la classe, propose aux élèves de travailler sur les effets\nd'une activité physique régulière sur notre corps, notre\norganisme. On leur demande :\n\n[ Qu'est-ce que c'est pour vous, une activité physique ?\n\nOn aura sans doute d'abord des réponses liées au sport\ncomme la course, le football, le basket, le vélo. On cher-\nchera alors à étendre notre définition à des activités qui\nne sont pas forcément perçues comme sportives par les\nélèves : la marche, le jardinage.\nOn demande ensuite aux élèves :\n\nQuelles sont selon vous les effets positifs ou négatifs\n\nd'une pratique physique régulière ?\nPour noter les réponses des élèves, l’enseignant-e dispose\nau tableau une grande affiche séparée en deux colonnes :\neffets positifs et effets négatifs. On peut attendre des\nréponses comme : « on se sent bien après », « ça fatigue »,\n« on s'amuse bien », « on transpire », « on dort bien après »,\n« on peut se blesser », « notre cœur bat plus vite », « on\ndevient plus fort », « on gagne des muscles... », « on est\nmoins malade »...\n\nJe recherche\n\nL'enseignant-e récapitule les réponses notées sur l'affiche.\nOn met en évidence les aspects positifs d’une activité phy-\nsique sur notre santé puis on distribue la fiche documen-\ntaire 1. Elle est explicitée collectivement. L'enseignant-e\nindique aux élèves qu'ils devront l'utiliser pour répondre à\ncertaines questions de la fiche élève 3, qui est également\ndistribuée.\n\n[7] Je retiens\n\n«Une pratique physique régulière est saine pour\nnotre corps :\n\n— elle rend nos os et nos muscles plus résistants ;\n\n— elle permet de rester en bonne forme et de proté-\nger notre santé en limitant les risques de développer de\nnombreuses maladies ;\n\n— elle apporte du plaisir et permet de partager de bons\nmoments avec ses amis.\n\n178 « Quels sont les comportements favorables à la santé ?\n\nséance + JY\n\nIdentifier les changements de rythme d'activité quoti-\ndiens (les différentes phases : sommeil, activité, repos,\nrepas...).\n\n[2] Je m'interroge\n\nL'enseignant-e affiche au tableau des images (— sur\nCD-Rom) : un enfant qui dort, un enfant qui fait la sieste,\nun enfant qui lit, un enfant qui joue au ballon, un enfant qui\nmarche, un enfant qui réfléchit, un enfant qui travaille en\nclasse, un enfant qui mange, un enfant qui fait du vélo, un\nenfant qui bronze sur sa serviette de plage, un enfant qui\ndessine, un enfant qui regarde la télé, un enfant qui nage,\nun enfant qui petit-déjeune, un enfant qui goute, un enfant\nqui déjeune à la cantine, un enfant qui dine un enfant qui\nse promène, un enfant qui fait du poney...\n\nOn interroge alors les élèves :\n\n[Que voyez-vous sur ces images ? Que font ces enfants ?\n| Y a-t-il des images qui vont ensemble ?\n\nOn peut attendre les réponses suivantes : « il y a des\nenfants qui font des choses, d'autres qui ne font rien », « il\ny en a qui se reposent », « certains font du sport », « il y a\ndes enfants qui mangent ».\n\n@ Je recherche\n\nL'enseignant-e propose alors aux élèves de se mettre par\ndeux. On distribue à chaque binôme les images (version\nvignettes sur la fiche à découper — sur CD-Rom) en leur\ndemandant de les découper puis de ranger les images qui\nvont ensemble.\n\nAprès un temps de recherche, on écoute les propositions de\nchaque groupe.\n\nOn dégagera collectivement les grands ensembles suivants :\n— le sommeil : l'enfant dort ;\n\n— les activités calmes (le cerveau travaille) ;\n\n— les activités physiques (le corps travaille) ;\n\n— les repas (on mange pour reconstituer notre énergie, nos\nréserves).\n\nL'enseignant-e propose ensuite aux élèves de prendre\nquelques-unes de ces vignettes pour imaginer la journée\nd'un-e enfant.\n\nAprès un temps de recherche, on écoute les journées de\nchaque groupe. On met alors en évidence les changements\ndes rythmes d'activité au cours de la journée .\nL’enseignant-e distribue alors la fiche élève 4 pour fixer les\nconnaissances acquises lors de ce travail de recherche.\n\n2 Je retiens\n\n Nous avons des activités très différentes dans une\nmême journée.\n\n— On se repose ou on dort.\n\n— On court, marche ou on nage.\n\n— On mange.\n\n— On lit, réfléchit ou on travaille.\n\n— On joue et on s'amuse.\n\n* Le rythme de nos activités change selon les moments\nde la journée.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "À la suite d'une séance de sport, l'enseignant-e, de retour\ndans la classe, propose aux élèves de travailler sur les effets\nd'une activité physique régulière sur notre corps, notre\norganisme. On leur demande :\n\n[ Qu'est-ce que c'est pour vous, une activité physique ?\n\nOn aura sans doute d'abord des réponses liées au sport\ncomme la course, le football, le basket, le vélo. On cher-\nchera alors à étendre notre définition à des activités qui\nne sont pas forcément perçues comme sportives par les\nélèves : la marche, le jardinage.\nOn demande ensuite aux élèves :\n\nQuelles sont selon vous les effets positifs ou négatifs\n\nd'une pratique physique régulière ?\nPour noter les réponses des élèves, l’enseignant-e dispose\nau tableau une grande affiche séparée en deux colonnes :\neffets positifs et effets négatifs. On peut attendre des\nréponses comme : « on se sent bien après », « ça fatigue »,\n« on s'amuse bien », « on transpire », « on dort bien après »,\n« on peut se blesser », « notre cœur bat plus vite », « on\ndevient plus fort », « on gagne des muscles... », « on est\nmoins malade »...",
          },
          {
            title: "Je recherche",
            detail:
              "L'enseignant-e récapitule les réponses notées sur l'affiche.\nOn met en évidence les aspects positifs d’une activité phy-\nsique sur notre santé puis on distribue la fiche documen-\ntaire 1. Elle est explicitée collectivement. L'enseignant-e\nindique aux élèves qu'ils devront l'utiliser pour répondre à\ncertaines questions de la fiche élève 3, qui est également\ndistribuée.\n\n[7]",
          },
          {
            title: "Je retiens",
            detail:
              "«Une pratique physique régulière est saine pour\nnotre corps :\n\n— elle rend nos os et nos muscles plus résistants ;\n\n— elle permet de rester en bonne forme et de proté-\nger notre santé en limitant les risques de développer de\nnombreuses maladies ;\n\n— elle apporte du plaisir et permet de partager de bons\nmoments avec ses amis.\n\n178 « Quels sont les comportements favorables à la santé ?\n\nséance + JY\n\nIdentifier les changements de rythme d'activité quoti-\ndiens (les différentes phases : sommeil, activité, repos,\nrepas...).\n\n[2]",
          },
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e affiche au tableau des images (— sur\nCD-Rom) : un enfant qui dort, un enfant qui fait la sieste,\nun enfant qui lit, un enfant qui joue au ballon, un enfant qui\nmarche, un enfant qui réfléchit, un enfant qui travaille en\nclasse, un enfant qui mange, un enfant qui fait du vélo, un\nenfant qui bronze sur sa serviette de plage, un enfant qui\ndessine, un enfant qui regarde la télé, un enfant qui nage,\nun enfant qui petit-déjeune, un enfant qui goute, un enfant\nqui déjeune à la cantine, un enfant qui dine un enfant qui\nse promène, un enfant qui fait du poney...\n\nOn interroge alors les élèves :\n\n[Que voyez-vous sur ces images ? Que font ces enfants ?\n| Y a-t-il des images qui vont ensemble ?\n\nOn peut attendre les réponses suivantes : « il y a des\nenfants qui font des choses, d'autres qui ne font rien », « il\ny en a qui se reposent », « certains font du sport », « il y a\ndes enfants qui mangent ».\n\n@",
          },
          {
            title: "Je recherche",
            detail:
              "L'enseignant-e propose alors aux élèves de se mettre par\ndeux. On distribue à chaque binôme les images (version\nvignettes sur la fiche à découper — sur CD-Rom) en leur\ndemandant de les découper puis de ranger les images qui\nvont ensemble.\n\nAprès un temps de recherche, on écoute les propositions de\nchaque groupe.\n\nOn dégagera collectivement les grands ensembles suivants :\n— le sommeil : l'enfant dort ;\n\n— les activités calmes (le cerveau travaille) ;\n\n— les activités physiques (le corps travaille) ;\n\n— les repas (on mange pour reconstituer notre énergie, nos\nréserves).\n\nL'enseignant-e propose ensuite aux élèves de prendre\nquelques-unes de ces vignettes pour imaginer la journée\nd'un-e enfant.\n\nAprès un temps de recherche, on écoute les journées de\nchaque groupe. On met alors en évidence les changements\ndes rythmes d'activité au cours de la journée .\nL’enseignant-e distribue alors la fiche élève 4 pour fixer les\nconnaissances acquises lors de ce travail de recherche.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "Nous avons des activités très différentes dans une\nmême journée.\n\n— On se repose ou on dort.\n\n— On court, marche ou on nage.\n\n— On mange.\n\n— On lit, réfléchit ou on travaille.\n\n— On joue et on s'amuse.\n\n* Le rythme de nos activités change selon les moments\nde la journée.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
          },
        ],
      },
      {
        number: 5,
        title:
          "Mettre en relation son âge et ses besoins en som- meil. Comparer ces besoins avec la réalité individuelle. Identifier les conséquences du manque de sommeil.",
        rawText:
          "| Séance 5 FT METZ TE]\n\nMettre en relation son âge et ses besoins en som-\nmeil. Comparer ces besoins avec la réalité individuelle.\nIdentifier les conséquences du manque de sommeil.\n\nB Jem interroge\nL'enseignant-e demande à la cantonade :\n[| Avez-vous bien dormi la nuit dernière ?\n\nOn écoute les réponses des élèves et on note au tableau\nleurs réflexions. Puis on questionne de nouveau les élèves :\n\nÀ quoi ça sert de dormir ? A-t-on besoin de dormir,\nquel que soit son âge ? Que se passe-t-il si on dort mal\nou pas assez ?\n\nOn peut attendre des élèves les réponses suivantes :\n« quand on dort bien, on est en forme le matin », « moi\nquand je dors mal, je suis de mauvaise humeur », « quand\non est fatigué, on ne peut pas s'empêcher de dormir », « je\ndors plus que mon papa », « quand on dort, on grandit »,\n« on rêve aussi ».\n\nL'enseignant-e note les réponses des élèves sur une affiche\net leur propose de réaliser une enquête durant une semaine\nsur leurs habitudes de sommeil.\n\nŒ Je recherche\n\nOn distribue à chaque élève la fiche élève 5 (recto). Le\ntableau qui s'y trouve permet de noter sur 8 jours les\nheures de coucher, les heures de réveil (réveil naturel ou\n\n&\n\nréveil extérieur) ainsi que la qualité de la nuit et de la jour-\nnée qui suit.\n\nPuis on distribue la fiche documentaire 2 et la fiche\nélève 5 (verso) qui permet d'exploiter les informations\nprésentes sur cette affiche extraite du cahier pédagogique\nLe sommeil, toute une aventure ! (opération Pièces Jaunes\n2017).\n\nÀ la fin de la semaine d'enquête, chaque élève notera dans\nun petit texte comment il a dormi durant cette période,\nla quantité de sommeil qu'il lui faut pour être en forme le\nlendemain, et les conséquences d'un mauvais sommeil.\n\n2 Je retiens\n\n* Le sommeil est très important pour rester en bonne\nsanté, être en pleine forme et de bonne humeur\nchaque jour.\n\n* Le sommeil permet à notre corps de se reposer et de\nfaire ses réserves d'énergie pour le lendemain.\n\n+ Quand on dort, notre cerveau mémorise et enregistre\nce qu'on a vu dans la journée.\n\n«Entre 6 et 11 ans, on a besoin de 11 heures de som-\nmeil chaque nuit. En grandissant, on a besoin de moins\ndormir.\n\n* Des conseils pour bien dormir :\n\n— se coucher toujours à la même heure ;\n\n— éviter les écrans (télé, ordinateur, tablette.) ;\n\n— finir par un moment calme (lecture, calins de papa et\nmaman...).\n\nQue faire pour rester en forme ?\n\nPour rester en bonne santé, il est important de respecter des règles de propreté :\n— je me lave les mains plusieurs fois par jour (avant de manger, après être allé-e aux toilettes,\n\naprès avoir joué avec un animal, etc.) ;\n\n- je me brosse les dents au moins deux fois par jour, le matin et le soir ;\n\n- je me lave le corps tous les jours.\n\nUne pratique physique régulière est saine pour notre corps :\n~ elle rend nos os et nos muscles plus résistants ;\n- elle permet de rester en bonne forme et de protéger notre santé en limitant les risques\n\nde développer de nombreuses maladies ;\n\n- elle apporte du plaisir et permet de partager de bons moments avec ses amis.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nQuels sont les comportements favorables à la santé ? e 179",
        phases: [
          {
            title: "Je recherche",
            detail:
              "On distribue à chaque élève la fiche élève 5 (recto). Le\ntableau qui s'y trouve permet de noter sur 8 jours les\nheures de coucher, les heures de réveil (réveil naturel ou\n\n&\n\nréveil extérieur) ainsi que la qualité de la nuit et de la jour-\nnée qui suit.\n\nPuis on distribue la fiche documentaire 2 et la fiche\nélève 5 (verso) qui permet d'exploiter les informations\nprésentes sur cette affiche extraite du cahier pédagogique\nLe sommeil, toute une aventure ! (opération Pièces Jaunes\n2017).\n\nÀ la fin de la semaine d'enquête, chaque élève notera dans\nun petit texte comment il a dormi durant cette période,\nla quantité de sommeil qu'il lui faut pour être en forme le\nlendemain, et les conséquences d'un mauvais sommeil.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "* Le sommeil est très important pour rester en bonne\nsanté, être en pleine forme et de bonne humeur\nchaque jour.\n\n* Le sommeil permet à notre corps de se reposer et de\nfaire ses réserves d'énergie pour le lendemain.\n\n+ Quand on dort, notre cerveau mémorise et enregistre\nce qu'on a vu dans la journée.\n\n«Entre 6 et 11 ans, on a besoin de 11 heures de som-\nmeil chaque nuit. En grandissant, on a besoin de moins\ndormir.\n\n* Des conseils pour bien dormir :\n\n— se coucher toujours à la même heure ;\n\n— éviter les écrans (télé, ordinateur, tablette.) ;\n\n— finir par un moment calme (lecture, calins de papa et\nmaman...).\n\nQue faire pour rester en forme ?\n\nPour rester en bonne santé, il est important de respecter des règles de propreté :\n— je me lave les mains plusieurs fois par jour (avant de manger, après être allé-e aux toilettes,\n\naprès avoir joué avec un animal, etc.) ;\n\n- je me brosse les dents au moins deux fois par jour, le matin et le soir ;\n\n- je me lave le corps tous les jours.\n\nUne pratique physique régulière est saine pour notre corps :\n~ elle rend nos os et nos muscles plus résistants ;\n- elle permet de rester en bonne forme et de protéger notre santé en limitant les risques\n\nde développer de nombreuses maladies ;\n\n- elle apporte du plaisir et permet de partager de bons moments avec ses amis.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nQuels sont les comportements favorables à la santé ? e 179",
          },
        ],
      },
    ],
    guideText:
      "Que faire pour rester en forme ?\n\n—\n>» Objectifs\n\n* Mettre en œuvre et apprécier quelques règles d'hygiène de vie : effets positifs d'une acti-\nvité physique régulière sur l'organisme, capacité à se relaxer et mise en relation de son âge\net de ses besoins de sommeil, habitudes quotidiennes de proprété (dents, mains, corps).\n\n> Indications de progression dans le cycle 2\n\nCe dossier sur l'hygiène de vie concerne les trois niveaux du cycle 2.\n\nLa séance 1 est consacrée aux habitudes quotidiennes de propreté (dents, mains, corps).\nCette séance 1 destinée en priorité aux CP peut bien sûr être revue pendant les autres\nannées du cycle. Ce thème est approfondi en séance 2 (CE1-CE2) avec les notions de\npropre/sale et sain/malade. La séance 3 (CE1-CE2) traite des effets positifs d'une acti-\nvité physique régulière sur l'organisme. Les séance 4 et 5 portent sur les changements de\nrythme d'activité quotidiens (CP) en mettant en exergue le besoin de sommeil en fonction\nde l'âge (CE1-CE2). Nous vous proposons des fiches élève et d'évaluation de niveaux diffé-\nrents, en prenant en compte cette progression.\n\nFiche enseignant\n\n2 Je retiens\n\n* Pour être en bonne santé, il est important de respecter\ndes règles de propreté :\n\n— je me lave les mains plusieurs fois par jour (avant de\nmanger, après être allé-e aux toilettes, etc.) ;\n\n— je me brosse les dents au moins deux fois par jour,\nle matin et le soir ;\n\n— je me lave le corps tous les jours.\n\n| séance 1 JEINFT\n\nPrendre des habitudes quotidiennes de propreté : mettre\nen œuvre des règles d'hygiène de vie (se laver le corps,\nse laver les mains, se brosser les dents).\n\na Je m'interroge\nPour aborder ce thème sur les règles d'hygiène au quoti-\ndien, l'enseignant-e interroge les élèves :\n\nQue devez-vous faire à chaque fois après être allé-e aux\ntoilettes ?\n\nLes élèves vont facilement dire qu'il faut se laver les mains\ncar sinon « ce n’est pas propre, il y a des microbes ».\nL'enseignant-e leur demande ensuite :\n\n au\n\nPrendre des habitudes quotidiennes de propreté : faire\n\nEst-ce le seul moment où il est important de se laver la différence entre propre et sale, entre sain et malade.\n\nles mains ? Que faut-il faire pour être propre tous les\njours ? a Je m‘interroge\n\nLes élèves pourront répondre : « on se lave les mains avant | l'enseignant-e débute cette séance en demandant aux\n\nde manger », « il faut se doucher ou prendre un bain »,\n« il faut aussi se brosser les dents le matin et le soir », etc.\n\nL'enseignant-e propose aux élèves de faire le point sur les\n\nbons gestes d'hygiène au quotidien.\n\nJe recherche\n\nL'enseignant-e distribue la fiche élève 1. Les exercices |\n\nproposés permettent de mettre en évidence les habitudes\nd'hygiène à respecter.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nélèves :\n\nEst-ce que vos mains sont propres ? Comment faire la\ndifférence entre propre et sale ?\n\nLes élèves vont répondre à l'oral : « oui elles sont propres, je\nles ai lavées », « il n'y a pas de taches, elles sont propres »,\n« j'ai de l'encre sur les doigts, elles ne sont pas propres ».\nAprès ces réponses spontanées des élèves, l'enseignant-e\nleur propose de rechercher toutes les habitudes quoti-\ndiennes de propreté qu'il faut avoir pour être et rester en\nbonne santé.\n\nJe recherche\n\nL'enseignant-e distribue la fiche élève 2. Les exercices pro-\nposés permettront de faire comprendre aux élèves la diffé-\nrence entre propre et sale, entre sain et malade.\n\nQuels sont les comportements favorables à la santé ? ¢ 177\n\n2 Je retiens\n\n«Pour garder un corps propre et en bonne santé, je\nprends des habitudes quotidiennes de propreté :\n\n— je me lave chaque jour ;\n\n—je me lave les mains pour éviter de propager des\nmicrobes ;\n\n— je me brosse les dents pour éviter les caries et ainsi\ngarder des dents saines.\n\n| Séance 3 FT NET L)\n\nPrendre conscience des effets positifs d'une pratique\nphysique régulière sur l'organisme.\n\nEJ Je m'interroge\n\nÀ la suite d'une séance de sport, l'enseignant-e, de retour\ndans la classe, propose aux élèves de travailler sur les effets\nd'une activité physique régulière sur notre corps, notre\norganisme. On leur demande :\n\n[ Qu'est-ce que c'est pour vous, une activité physique ?\n\nOn aura sans doute d'abord des réponses liées au sport\ncomme la course, le football, le basket, le vélo. On cher-\nchera alors à étendre notre définition à des activités qui\nne sont pas forcément perçues comme sportives par les\nélèves : la marche, le jardinage.\nOn demande ensuite aux élèves :\n\nQuelles sont selon vous les effets positifs ou négatifs\n\nd'une pratique physique régulière ?\nPour noter les réponses des élèves, l’enseignant-e dispose\nau tableau une grande affiche séparée en deux colonnes :\neffets positifs et effets négatifs. On peut attendre des\nréponses comme : « on se sent bien après », « ça fatigue »,\n« on s'amuse bien », « on transpire », « on dort bien après »,\n« on peut se blesser », « notre cœur bat plus vite », « on\ndevient plus fort », « on gagne des muscles... », « on est\nmoins malade »...\n\nJe recherche\n\nL'enseignant-e récapitule les réponses notées sur l'affiche.\nOn met en évidence les aspects positifs d’une activité phy-\nsique sur notre santé puis on distribue la fiche documen-\ntaire 1. Elle est explicitée collectivement. L'enseignant-e\nindique aux élèves qu'ils devront l'utiliser pour répondre à\ncertaines questions de la fiche élève 3, qui est également\ndistribuée.\n\n[7] Je retiens\n\n«Une pratique physique régulière est saine pour\nnotre corps :\n\n— elle rend nos os et nos muscles plus résistants ;\n\n— elle permet de rester en bonne forme et de proté-\nger notre santé en limitant les risques de développer de\nnombreuses maladies ;\n\n— elle apporte du plaisir et permet de partager de bons\nmoments avec ses amis.\n\n178 « Quels sont les comportements favorables à la santé ?\n\nséance + JY\n\nIdentifier les changements de rythme d'activité quoti-\ndiens (les différentes phases : sommeil, activité, repos,\nrepas...).\n\n[2] Je m'interroge\n\nL'enseignant-e affiche au tableau des images (— sur\nCD-Rom) : un enfant qui dort, un enfant qui fait la sieste,\nun enfant qui lit, un enfant qui joue au ballon, un enfant qui\nmarche, un enfant qui réfléchit, un enfant qui travaille en\nclasse, un enfant qui mange, un enfant qui fait du vélo, un\nenfant qui bronze sur sa serviette de plage, un enfant qui\ndessine, un enfant qui regarde la télé, un enfant qui nage,\nun enfant qui petit-déjeune, un enfant qui goute, un enfant\nqui déjeune à la cantine, un enfant qui dine un enfant qui\nse promène, un enfant qui fait du poney...\n\nOn interroge alors les élèves :\n\n[Que voyez-vous sur ces images ? Que font ces enfants ?\n| Y a-t-il des images qui vont ensemble ?\n\nOn peut attendre les réponses suivantes : « il y a des\nenfants qui font des choses, d'autres qui ne font rien », « il\ny en a qui se reposent », « certains font du sport », « il y a\ndes enfants qui mangent ».\n\n@ Je recherche\n\nL'enseignant-e propose alors aux élèves de se mettre par\ndeux. On distribue à chaque binôme les images (version\nvignettes sur la fiche à découper — sur CD-Rom) en leur\ndemandant de les découper puis de ranger les images qui\nvont ensemble.\n\nAprès un temps de recherche, on écoute les propositions de\nchaque groupe.\n\nOn dégagera collectivement les grands ensembles suivants :\n— le sommeil : l'enfant dort ;\n\n— les activités calmes (le cerveau travaille) ;\n\n— les activités physiques (le corps travaille) ;\n\n— les repas (on mange pour reconstituer notre énergie, nos\nréserves).\n\nL'enseignant-e propose ensuite aux élèves de prendre\nquelques-unes de ces vignettes pour imaginer la journée\nd'un-e enfant.\n\nAprès un temps de recherche, on écoute les journées de\nchaque groupe. On met alors en évidence les changements\ndes rythmes d'activité au cours de la journée .\nL’enseignant-e distribue alors la fiche élève 4 pour fixer les\nconnaissances acquises lors de ce travail de recherche.\n\n2 Je retiens\n\n Nous avons des activités très différentes dans une\nmême journée.\n\n— On se repose ou on dort.\n\n— On court, marche ou on nage.\n\n— On mange.\n\n— On lit, réfléchit ou on travaille.\n\n— On joue et on s'amuse.\n\n* Le rythme de nos activités change selon les moments\nde la journée.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n| Séance 5 FT METZ TE]\n\nMettre en relation son âge et ses besoins en som-\nmeil. Comparer ces besoins avec la réalité individuelle.\nIdentifier les conséquences du manque de sommeil.\n\nB Jem interroge\nL'enseignant-e demande à la cantonade :\n[| Avez-vous bien dormi la nuit dernière ?\n\nOn écoute les réponses des élèves et on note au tableau\nleurs réflexions. Puis on questionne de nouveau les élèves :\n\nÀ quoi ça sert de dormir ? A-t-on besoin de dormir,\nquel que soit son âge ? Que se passe-t-il si on dort mal\nou pas assez ?\n\nOn peut attendre des élèves les réponses suivantes :\n« quand on dort bien, on est en forme le matin », « moi\nquand je dors mal, je suis de mauvaise humeur », « quand\non est fatigué, on ne peut pas s'empêcher de dormir », « je\ndors plus que mon papa », « quand on dort, on grandit »,\n« on rêve aussi ».\n\nL'enseignant-e note les réponses des élèves sur une affiche\net leur propose de réaliser une enquête durant une semaine\nsur leurs habitudes de sommeil.\n\nŒ Je recherche\n\nOn distribue à chaque élève la fiche élève 5 (recto). Le\ntableau qui s'y trouve permet de noter sur 8 jours les\nheures de coucher, les heures de réveil (réveil naturel ou\n\n&\n\nréveil extérieur) ainsi que la qualité de la nuit et de la jour-\nnée qui suit.\n\nPuis on distribue la fiche documentaire 2 et la fiche\nélève 5 (verso) qui permet d'exploiter les informations\nprésentes sur cette affiche extraite du cahier pédagogique\nLe sommeil, toute une aventure ! (opération Pièces Jaunes\n2017).\n\nÀ la fin de la semaine d'enquête, chaque élève notera dans\nun petit texte comment il a dormi durant cette période,\nla quantité de sommeil qu'il lui faut pour être en forme le\nlendemain, et les conséquences d'un mauvais sommeil.\n\n2 Je retiens\n\n* Le sommeil est très important pour rester en bonne\nsanté, être en pleine forme et de bonne humeur\nchaque jour.\n\n* Le sommeil permet à notre corps de se reposer et de\nfaire ses réserves d'énergie pour le lendemain.\n\n+ Quand on dort, notre cerveau mémorise et enregistre\nce qu'on a vu dans la journée.\n\n«Entre 6 et 11 ans, on a besoin de 11 heures de som-\nmeil chaque nuit. En grandissant, on a besoin de moins\ndormir.\n\n* Des conseils pour bien dormir :\n\n— se coucher toujours à la même heure ;\n\n— éviter les écrans (télé, ordinateur, tablette.) ;\n\n— finir par un moment calme (lecture, calins de papa et\nmaman...).\n\nQue faire pour rester en forme ?\n\nPour rester en bonne santé, il est important de respecter des règles de propreté :\n— je me lave les mains plusieurs fois par jour (avant de manger, après être allé-e aux toilettes,\n\naprès avoir joué avec un animal, etc.) ;\n\n- je me brosse les dents au moins deux fois par jour, le matin et le soir ;\n\n- je me lave le corps tous les jours.\n\nUne pratique physique régulière est saine pour notre corps :\n~ elle rend nos os et nos muscles plus résistants ;\n- elle permet de rester en bonne forme et de protéger notre santé en limitant les risques\n\nde développer de nombreuses maladies ;\n\n- elle apporte du plaisir et permet de partager de bons moments avec ses amis.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nQuels sont les comportements favorables à la santé ? e 179",
    guidePageDecisions: [
      {
        page: 177,
        confidence: 93,
        score: 22,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
        ],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves"],
        studentLike: true,
      },
      {
        page: 178,
        confidence: 93,
        score: 18,
        included: true,
        strongMarkers: ["seance", "l'enseignant", "enseignant-e", "les eleves", "aux eleves"],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: [
          "enseignant",
          "eleves",
          "on demande",
          "on interroge",
          "on distribue",
          "groupe",
        ],
        studentLike: true,
      },
      {
        page: 179,
        confidence: 93,
        score: 14,
        included: true,
        strongMarkers: ["seance", "l'enseignant", "enseignant-e", "les eleves"],
        phaseMarkers: ["je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on distribue"],
        studentLike: false,
      },
      {
        page: 180,
        confidence: 94,
        score: -1,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: false,
      },
    ],
    skippedProbePages: [180],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-15",
    dossierNumber: 15,
    partNumber: 4,
    partTitle: "Les objets techniques, qu'est-ce que c'est ?",
    title: "Les objets techniques, pour quoi faire ?",
    guidePages: [199, 200],
    guidePageCount: 2,
    objectives: [
      "« Observer et utiliser des objets techniques et identifier leur fonction.",
      "« Identifier des activités de la vie quotidienne ou professionnelle faisant appel à des outils",
      "et objets techniques.",
    ],
    progressionNote:
      "Pour les niveaux CP et CE1, une première approche des objets techniques consiste à obser-\nver et utiliser des objets techniques de la vie quotidienne, afin de comprendre leur fonc-\ntionnement et d'identifier leur fonction. Cela pourra se faire par une utilisation/comparai-\nson de différents objets techniques, ce qui permettra en outre de les associer à une activité\ndonnée de la vie quotidienne. Au CE2, il s'agit de repérer des techniques, des outils et des\nmachines utilisés dans une activité de la vie professionnelle, si possible lors d'une visite\nd'un lieu d'activités proche de l'école. Nous proposons donc 3 séances pour répondre à\n—",
    material: [
      "l’ensemble de ces objectifs et des fiches élève et d'évaluation associées.",
      "La matériel nécessaire est indiqué dans chaque séance.",
    ],
    sessions: [
      {
        number: 1,
        title:
          "Observer et utiliser des objets techniques afin d'identi- fier leur fonction. Comparer des objets techniques utilisés dans la vie quo-",
        rawText:
          "séance 1 PIE)\n\nObserver et utiliser des objets techniques afin d'identi-\nfier leur fonction.\n\nComparer des objets techniques utilisés dans la vie quo-\ntidienne en étudiant leur fonctionnement.\n\nMatériel : couteaux, différents économes, appareil à éplu-\ncher des pommes (— photos sur CD-Rom).\n\nN. B. : Pour les enseignants qui ne se sentiraient pas à l'aise\navec ces ustensiles (sachant que seul l'enseignant-e utilise\nle couteau), il est possible de mener le même type de tra-\nvail avec des fouets ou différentes sortes de taille-crayons.\n\n[2] Je m'interroge\nL'enseignant-e prend prétexte d'un anniversaire pour pro-\nposer aux élèves de préparer une tarte aux pommes. On\ninterroge alors les élèves :\n\n| Comment allez-vous faire pour éplucher les pommes ?\n\nOn peut attendre les réponses suivantes : « on va utiliser un\ncouteau », « on peut utiliser aussi un économe ». Certains\nélèves peuvent aussi proposer d'utiliser un appareil à éplu-\ncher les pommes.\n\nL'enseignant-e propose alors aux élèves de comparer ces\ndifférents outils, ces différents objets techniques (le voca-\nbulaire peut être ici introduit : des objets qui ne sont pas\nnaturels, qui ont été fabriqués par l'Homme), de voir leurs\navantages et leurs inconvénients.\n\n@ J'observe\n\nLes différents objets sont présentés à la classe par l'en-\nseignant-e. Les élèves sont invités à repérer les différents\nmatériaux utilisés dans la fabrication de ces objets. On\nleur demande aussi si chaque objet est mécanique (il faut\nréaliser un mouvement pour le faire fonctionner) ou élec-\ntrique (il a besoin d'énergie électrique pour fonctionner).\nLa fiche élève 1 est distribuée aux élèves.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nQuelques élèves viennent éplucher une pomme avec l'un\nou l'autre des objets présentés, sous la surveillance de l'en-\nseignant-e. L'enseignant-e utilise seul-e le couteau simple\npar sécurité (l'élève peut par ailleurs utiliser un couteau à\nbout rond).\n\nCollectivement, on compare les avantages et les inconvé-\nnients de chaque objet technique.\n\nLa fiche élève 1 est alors complétée par chaque élève\nau fur et à mesure de l'observation et de l'utilisation des\nobjets proposés. Le recto de cette fiche est à dupliquer pour\nchaque objet présenté.\n\n2 Je retiens\n\n«Un objet technique est un objet fabriqué par les\nhommes.\n\n« Chaque objet technique répond à un besoin. Il a donc\nune fonction.\n\n«Les objets techniques sont fabriqués avec un ou\nplusieurs matériaux.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e prend prétexte d'un anniversaire pour pro-\nposer aux élèves de préparer une tarte aux pommes. On\ninterroge alors les élèves :\n\n| Comment allez-vous faire pour éplucher les pommes ?\n\nOn peut attendre les réponses suivantes : « on va utiliser un\ncouteau », « on peut utiliser aussi un économe ». Certains\nélèves peuvent aussi proposer d'utiliser un appareil à éplu-\ncher les pommes.\n\nL'enseignant-e propose alors aux élèves de comparer ces\ndifférents outils, ces différents objets techniques (le voca-\nbulaire peut être ici introduit : des objets qui ne sont pas\nnaturels, qui ont été fabriqués par l'Homme), de voir leurs\navantages et leurs inconvénients.\n\n@",
          },
          {
            title: "J'observe",
            detail:
              "Les différents objets sont présentés à la classe par l'en-\nseignant-e. Les élèves sont invités à repérer les différents\nmatériaux utilisés dans la fabrication de ces objets. On\nleur demande aussi si chaque objet est mécanique (il faut\nréaliser un mouvement pour le faire fonctionner) ou élec-\ntrique (il a besoin d'énergie électrique pour fonctionner).\nLa fiche élève 1 est distribuée aux élèves.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nQuelques élèves viennent éplucher une pomme avec l'un\nou l'autre des objets présentés, sous la surveillance de l'en-\nseignant-e. L'enseignant-e utilise seul-e le couteau simple\npar sécurité (l'élève peut par ailleurs utiliser un couteau à\nbout rond).\n\nCollectivement, on compare les avantages et les inconvé-\nnients de chaque objet technique.\n\nLa fiche élève 1 est alors complétée par chaque élève\nau fur et à mesure de l'observation et de l'utilisation des\nobjets proposés. Le recto de cette fiche est à dupliquer pour\nchaque objet présenté.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "«Un objet technique est un objet fabriqué par les\nhommes.\n\n« Chaque objet technique répond à un besoin. Il a donc\nune fonction.\n\n«Les objets techniques sont fabriqués avec un ou\nplusieurs matériaux.",
          },
        ],
      },
      {
        number: 2,
        title: "Associer des objets techniques à une activité de la vie quotidienne.",
        rawText:
          "séance 2 MINT)\n\nAssocier des objets techniques à une activité de la vie\nquotidienne.\n\na Je m'interroge\n\nL'enseignant-e rappelle aux élèves ce qui a été vu lors de la\npremière séance : un objet technique est un objet fabriqué\npour répondre à un besoin ; on peut se servir d’un objet\ntechnique pour une tâche bien particulière. Chaque objet\ntechnique a donc une fonction, un rôle spécifique. Dans\nl'exemple de la séance 1, l'économe, l’éplucheur et le cou-\nteau pouvaient servir à éplucher des pommes.\n\nLes objets techniques, qu'est-ce que c'est ? » 199\n\nFiche enseignant\n\nL'enseignant-e poursuit en faisant remarquer que de nom-\nbreuses activités quotidiennes nécessitent des objets\ntechniques. On interroge alors les élèves :\n\nPar exemple, quel objet technique pouvez-vous utiliser\nsi vous voulez vous sécher les cheveux ? écrire ?\nvous couper les ongles ? vous laver des dents ?\n\nOn pourra avoir comme réponses : « un sèche-cheveux,\nun stylo bille, un stylo plume, un crayon gris, des ciseaux\nà ongle, un coupe-ongles, une brosse à dents, une brosse à\ndents électrique... »\n\nOn mettra ainsi en évidence la multitude d'objets tech-\nniques que l'on utilise dans notre vie quotidienne.\nL'enseignant-e propose alors de prolonger ce travail à l'écrit.\n\nJe recherche\n\nLes élèves sont placés par groupes de 4. Ils ont à leur dis-\nposition une feuille A3 sur laquelle ils vont pouvoir dessi-\nner ou écrire le nom d'objets techniques utilisés dans la\nvie quotidienne. Ils devront dire ensuite à l'oral à quelle(s)\nactivité(s) ces objets techniques correspondent.\nL'enseignant-e distribue ensuite aux élèves la fiche élève 2\net la fiche à découper (— sur CD-Rom). Les élèves vont\ndevoir identifier un certain nombre d'activités quotidiennes\net retrouver un ou plusieurs objets techniques associés.\n\n2 Je retiens\n\n* Chaque jour, on utilise de nombreux objets tech-\nniques, à la maison ou à l'école.\n\n* Les objets techniques ne fonctionnent pas tous de la\nmême façon.\n\n* Certains sont mécaniques, c'est-à-dire qu'il faut réali-\nser un mouvement pour les faire fonctionner (un taille-\ncrayon, une essoreuse à salade...).\n\n» D'autres sont électriques, c'est-à-dire qu'ils utilisent\nl'énergie électrique pour fonctionner (rasoir électrique,\nmixeur électrique...).\n\nBesoin\nVie quotidienne\n\n TT\n\nRepérer des techniques, des outils et des machines utili-\nsés dans une activité de la vie professionnelle.\n\na Je m’interroge\n\nPour cette séance destinée spécifiquement aux CE2, l'en-\nseignant-e fait un rappel des connaissances acquises en CP\net CE1. Puis on poursuit : dans la vie professionnelle aussi,\nau travail, des objets techniques sont utilisés. On interroge\nalors les élèves :\n\nSi vous deviez associer à mon métier d'enseignant-e\nun objet technique, lequel choisiriez-vous ?\n\nOn peut attendre des réponses comme : « le tableau, le\nstylo rouge, l'ordinateur ».\n\nL'enseignant-e propose alors de mener un travail par écrit\nqui consiste à associer des objets techniques à une profes-\nsion, à un métier.\n\nŒ Je recherche\n\nLes élèves reçoivent alors la fiche élève 3 et la fiche à\ndécouper (— sur CD-Rom). Ce travail sur table peut être\ncomplété par une visite sur le terrain d'une entreprise, d'un\ncommerce, d'un lieu professionnel. Cette visite peut donner\nlieu à d'intéressants échanges avec les professionnels sur\nles outils, machines, objets utilisés.\n\n2 Je retiens\n\n«Dans chaque profession, on utilise des outils, des\nobjets techniques, des machines.\n\n* Ainsi un menuisier va utiliser un marteau, des rabots,\nune scie ; un boulanger a besoin d'un four, d'un pétrin,\nd'une balance...\n\n* Un même objet technique peut être utilisé par plu-\nsieurs métiers (par exemple la balance, le marteau,\nl'ordinateur.)\n\nMots à retenir\n\nObjets techniques\nFonction\n\nMatériaux\nFonctionnement\nVie professionnelle\n\n200 » Les objets techniques, qu'est-ce que c'est ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e rappelle aux élèves ce qui a été vu lors de la\npremière séance : un objet technique est un objet fabriqué\npour répondre à un besoin ; on peut se servir d’un objet\ntechnique pour une tâche bien particulière. Chaque objet\ntechnique a donc une fonction, un rôle spécifique. Dans\nl'exemple de la séance 1, l'économe, l’éplucheur et le cou-\nteau pouvaient servir à éplucher des pommes.\n\nLes objets techniques, qu'est-ce que c'est ? » 199\n\nFiche enseignant\n\nL'enseignant-e poursuit en faisant remarquer que de nom-\nbreuses activités quotidiennes nécessitent des objets\ntechniques. On interroge alors les élèves :\n\nPar exemple, quel objet technique pouvez-vous utiliser\nsi vous voulez vous sécher les cheveux ? écrire ?\nvous couper les ongles ? vous laver des dents ?\n\nOn pourra avoir comme réponses : « un sèche-cheveux,\nun stylo bille, un stylo plume, un crayon gris, des ciseaux\nà ongle, un coupe-ongles, une brosse à dents, une brosse à\ndents électrique... »\n\nOn mettra ainsi en évidence la multitude d'objets tech-\nniques que l'on utilise dans notre vie quotidienne.\nL'enseignant-e propose alors de prolonger ce travail à l'écrit.",
          },
          {
            title: "Je recherche",
            detail:
              "Les élèves sont placés par groupes de 4. Ils ont à leur dis-\nposition une feuille A3 sur laquelle ils vont pouvoir dessi-\nner ou écrire le nom d'objets techniques utilisés dans la\nvie quotidienne. Ils devront dire ensuite à l'oral à quelle(s)\nactivité(s) ces objets techniques correspondent.\nL'enseignant-e distribue ensuite aux élèves la fiche élève 2\net la fiche à découper (— sur CD-Rom). Les élèves vont\ndevoir identifier un certain nombre d'activités quotidiennes\net retrouver un ou plusieurs objets techniques associés.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "* Chaque jour, on utilise de nombreux objets tech-\nniques, à la maison ou à l'école.\n\n* Les objets techniques ne fonctionnent pas tous de la\nmême façon.\n\n* Certains sont mécaniques, c'est-à-dire qu'il faut réali-\nser un mouvement pour les faire fonctionner (un taille-\ncrayon, une essoreuse à salade...).\n\n» D'autres sont électriques, c'est-à-dire qu'ils utilisent\nl'énergie électrique pour fonctionner (rasoir électrique,\nmixeur électrique...).\n\nBesoin\nVie quotidienne\n\n TT\n\nRepérer des techniques, des outils et des machines utili-\nsés dans une activité de la vie professionnelle.\n\na",
          },
          {
            title: "Je m'interroge",
            detail:
              "Pour cette séance destinée spécifiquement aux CE2, l'en-\nseignant-e fait un rappel des connaissances acquises en CP\net CE1. Puis on poursuit : dans la vie professionnelle aussi,\nau travail, des objets techniques sont utilisés. On interroge\nalors les élèves :\n\nSi vous deviez associer à mon métier d'enseignant-e\nun objet technique, lequel choisiriez-vous ?\n\nOn peut attendre des réponses comme : « le tableau, le\nstylo rouge, l'ordinateur ».\n\nL'enseignant-e propose alors de mener un travail par écrit\nqui consiste à associer des objets techniques à une profes-\nsion, à un métier.\n\nŒ",
          },
          {
            title: "Je recherche",
            detail:
              "Les élèves reçoivent alors la fiche élève 3 et la fiche à\ndécouper (— sur CD-Rom). Ce travail sur table peut être\ncomplété par une visite sur le terrain d'une entreprise, d'un\ncommerce, d'un lieu professionnel. Cette visite peut donner\nlieu à d'intéressants échanges avec les professionnels sur\nles outils, machines, objets utilisés.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "«Dans chaque profession, on utilise des outils, des\nobjets techniques, des machines.\n\n* Ainsi un menuisier va utiliser un marteau, des rabots,\nune scie ; un boulanger a besoin d'un four, d'un pétrin,\nd'une balance...\n\n* Un même objet technique peut être utilisé par plu-\nsieurs métiers (par exemple la balance, le marteau,\nl'ordinateur.)\n\nMots à retenir\n\nObjets techniques\nFonction\n\nMatériaux\nFonctionnement\nVie professionnelle\n\n200 » Les objets techniques, qu'est-ce que c'est ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
          },
        ],
      },
    ],
    guideText:
      "Les objets techniques, pour quoi faire ?\n\n| » Objectifs\n\n« Observer et utiliser des objets techniques et identifier leur fonction.\n\n« Identifier des activités de la vie quotidienne ou professionnelle faisant appel à des outils\net objets techniques.\n\n> Indications de progression dans le cycle 2\n\nPour les niveaux CP et CE1, une première approche des objets techniques consiste à obser-\nver et utiliser des objets techniques de la vie quotidienne, afin de comprendre leur fonc-\ntionnement et d'identifier leur fonction. Cela pourra se faire par une utilisation/comparai-\nson de différents objets techniques, ce qui permettra en outre de les associer à une activité\ndonnée de la vie quotidienne. Au CE2, il s'agit de repérer des techniques, des outils et des |\nmachines utilisés dans une activité de la vie professionnelle, si possible lors d'une visite\nd'un lieu d'activités proche de l'école. Nous proposons donc 3 séances pour répondre à\n\n—\n\n> Matériel\n\nl’ensemble de ces objectifs et des fiches élève et d'évaluation associées.\n\nLa matériel nécessaire est indiqué dans chaque séance. |\n\nséance 1 PIE)\n\nObserver et utiliser des objets techniques afin d'identi-\nfier leur fonction.\n\nComparer des objets techniques utilisés dans la vie quo-\ntidienne en étudiant leur fonctionnement.\n\nMatériel : couteaux, différents économes, appareil à éplu-\ncher des pommes (— photos sur CD-Rom).\n\nN. B. : Pour les enseignants qui ne se sentiraient pas à l'aise\navec ces ustensiles (sachant que seul l'enseignant-e utilise\nle couteau), il est possible de mener le même type de tra-\nvail avec des fouets ou différentes sortes de taille-crayons.\n\n[2] Je m'interroge\nL'enseignant-e prend prétexte d'un anniversaire pour pro-\nposer aux élèves de préparer une tarte aux pommes. On\ninterroge alors les élèves :\n\n| Comment allez-vous faire pour éplucher les pommes ?\n\nOn peut attendre les réponses suivantes : « on va utiliser un\ncouteau », « on peut utiliser aussi un économe ». Certains\nélèves peuvent aussi proposer d'utiliser un appareil à éplu-\ncher les pommes.\n\nL'enseignant-e propose alors aux élèves de comparer ces\ndifférents outils, ces différents objets techniques (le voca-\nbulaire peut être ici introduit : des objets qui ne sont pas\nnaturels, qui ont été fabriqués par l'Homme), de voir leurs\navantages et leurs inconvénients.\n\n@ J'observe\n\nLes différents objets sont présentés à la classe par l'en-\nseignant-e. Les élèves sont invités à repérer les différents\nmatériaux utilisés dans la fabrication de ces objets. On\nleur demande aussi si chaque objet est mécanique (il faut\nréaliser un mouvement pour le faire fonctionner) ou élec-\ntrique (il a besoin d'énergie électrique pour fonctionner).\nLa fiche élève 1 est distribuée aux élèves.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nQuelques élèves viennent éplucher une pomme avec l'un\nou l'autre des objets présentés, sous la surveillance de l'en-\nseignant-e. L'enseignant-e utilise seul-e le couteau simple\npar sécurité (l'élève peut par ailleurs utiliser un couteau à\nbout rond).\n\nCollectivement, on compare les avantages et les inconvé-\nnients de chaque objet technique.\n\nLa fiche élève 1 est alors complétée par chaque élève\nau fur et à mesure de l'observation et de l'utilisation des\nobjets proposés. Le recto de cette fiche est à dupliquer pour\nchaque objet présenté.\n\n2 Je retiens\n\n«Un objet technique est un objet fabriqué par les\nhommes.\n\n« Chaque objet technique répond à un besoin. Il a donc\nune fonction.\n\n«Les objets techniques sont fabriqués avec un ou\nplusieurs matériaux.\n\nséance 2 MINT)\n\nAssocier des objets techniques à une activité de la vie\nquotidienne.\n\na Je m'interroge\n\nL'enseignant-e rappelle aux élèves ce qui a été vu lors de la\npremière séance : un objet technique est un objet fabriqué\npour répondre à un besoin ; on peut se servir d’un objet\ntechnique pour une tâche bien particulière. Chaque objet\ntechnique a donc une fonction, un rôle spécifique. Dans\nl'exemple de la séance 1, l'économe, l’éplucheur et le cou-\nteau pouvaient servir à éplucher des pommes.\n\nLes objets techniques, qu'est-ce que c'est ? » 199\n\nFiche enseignant\n\nL'enseignant-e poursuit en faisant remarquer que de nom-\nbreuses activités quotidiennes nécessitent des objets\ntechniques. On interroge alors les élèves :\n\nPar exemple, quel objet technique pouvez-vous utiliser\nsi vous voulez vous sécher les cheveux ? écrire ?\nvous couper les ongles ? vous laver des dents ?\n\nOn pourra avoir comme réponses : « un sèche-cheveux,\nun stylo bille, un stylo plume, un crayon gris, des ciseaux\nà ongle, un coupe-ongles, une brosse à dents, une brosse à\ndents électrique... »\n\nOn mettra ainsi en évidence la multitude d'objets tech-\nniques que l'on utilise dans notre vie quotidienne.\nL'enseignant-e propose alors de prolonger ce travail à l'écrit.\n\nJe recherche\n\nLes élèves sont placés par groupes de 4. Ils ont à leur dis-\nposition une feuille A3 sur laquelle ils vont pouvoir dessi-\nner ou écrire le nom d'objets techniques utilisés dans la\nvie quotidienne. Ils devront dire ensuite à l'oral à quelle(s)\nactivité(s) ces objets techniques correspondent.\nL'enseignant-e distribue ensuite aux élèves la fiche élève 2\net la fiche à découper (— sur CD-Rom). Les élèves vont\ndevoir identifier un certain nombre d'activités quotidiennes\net retrouver un ou plusieurs objets techniques associés.\n\n2 Je retiens\n\n* Chaque jour, on utilise de nombreux objets tech-\nniques, à la maison ou à l'école.\n\n* Les objets techniques ne fonctionnent pas tous de la\nmême façon.\n\n* Certains sont mécaniques, c'est-à-dire qu'il faut réali-\nser un mouvement pour les faire fonctionner (un taille-\ncrayon, une essoreuse à salade...).\n\n» D'autres sont électriques, c'est-à-dire qu'ils utilisent\nl'énergie électrique pour fonctionner (rasoir électrique,\nmixeur électrique...).\n\nBesoin\nVie quotidienne\n\n TT\n\nRepérer des techniques, des outils et des machines utili-\nsés dans une activité de la vie professionnelle.\n\na Je m’interroge\n\nPour cette séance destinée spécifiquement aux CE2, l'en-\nseignant-e fait un rappel des connaissances acquises en CP\net CE1. Puis on poursuit : dans la vie professionnelle aussi,\nau travail, des objets techniques sont utilisés. On interroge\nalors les élèves :\n\nSi vous deviez associer à mon métier d'enseignant-e\nun objet technique, lequel choisiriez-vous ?\n\nOn peut attendre des réponses comme : « le tableau, le\nstylo rouge, l'ordinateur ».\n\nL'enseignant-e propose alors de mener un travail par écrit\nqui consiste à associer des objets techniques à une profes-\nsion, à un métier.\n\nŒ Je recherche\n\nLes élèves reçoivent alors la fiche élève 3 et la fiche à\ndécouper (— sur CD-Rom). Ce travail sur table peut être\ncomplété par une visite sur le terrain d'une entreprise, d'un\ncommerce, d'un lieu professionnel. Cette visite peut donner\nlieu à d'intéressants échanges avec les professionnels sur\nles outils, machines, objets utilisés.\n\n2 Je retiens\n\n«Dans chaque profession, on utilise des outils, des\nobjets techniques, des machines.\n\n* Ainsi un menuisier va utiliser un marteau, des rabots,\nune scie ; un boulanger a besoin d'un four, d'un pétrin,\nd'une balance...\n\n* Un même objet technique peut être utilisé par plu-\nsieurs métiers (par exemple la balance, le marteau,\nl'ordinateur.)\n\nMots à retenir\n\nObjets techniques\nFonction\n\nMatériaux\nFonctionnement\nVie professionnelle\n\n200 » Les objets techniques, qu'est-ce que c'est ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
    guidePageDecisions: [
      {
        page: 199,
        confidence: 93,
        score: 24,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
        ],
        phaseMarkers: ["je m'interroge", "j'observe", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves"],
        studentLike: true,
      },
      {
        page: 200,
        confidence: 93,
        score: 20,
        included: true,
        strongMarkers: [
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "par groupes",
        ],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on interroge", "par groupes", "groupe"],
        studentLike: true,
      },
      {
        page: 201,
        confidence: 86,
        score: -3,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: true,
      },
    ],
    skippedProbePages: [201],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-16",
    dossierNumber: 16,
    partNumber: 4,
    partTitle: "Les objets techniques, qu'est-ce que c'est ?",
    title: "Un circuit électrique, comment ça marche ?",
    guidePages: [209, 210, 211],
    guidePageCount: 3,
    objectives: [
      "+ Connaitre les constituants et comprendre le fonctionnement d'un circuit électrique",
      "simple. Connaitre le rôle de l'interrupteur.",
      "+ Analyser le fonctionnement de différents objets de la vie quotidienne (lampes de poche,",
      "jouets à pile.)",
      "« Réaliser des circuits électriques simples en respectant les règles élémentaires de sécurité.",
      "« Identifier les propriétés de la matière vis-à-vis du courant électrique.",
    ],
    progressionNote:
      "Ce dossier concerne les trois niveaux du cycle 2. Au CP, il s'agit simplement d'observer un\ncircuit électrique permettant d'assurer la fonction d'éclairer, de connaitre le rôle d'un inter-\nrupteur et de découvrir un circuit électrique en série fermé simple. Au CET, l'élève analyse\nle fonctionnement d'un objet de la vie quotidienne (lampe de poche) et réalise quelques\ncircuits électriques simples utilisant des lampes ou des petits moteurs. Au CE2, l'élève va\napprendre à différencier les matériaux du point de vue de la conductivité électrique : maté-\nriaux conducteurs ou isolants électriques. Quatre séances permettent de traiter l'ensemble\nde ces thèmes avec des fiches élève et des fiches d'évaluation adaptées. Le dossier 18 peut\nFiche enseignant",
    material: [
      "être traité en parallèle pour la réalisation d'objets techniques.",
      "La matériel nécessaire est indiqué dans chaque séance.",
    ],
    sessions: [
      {
        number: 1,
        title:
          "Observer un circuit électrique permettant d'assurer la fonction d'éclairer. Connaitre le rôle de l'interrupteur (ON/OFF).",
        rawText:
          "Séance 1 MF]\n\nObserver un circuit électrique permettant d'assurer la\nfonction d'éclairer.\n\nConnaitre le rôle de l'interrupteur (ON/OFF).\n\nConnaitre les constituants et comprendre le fonction-\nnement d'un circuit électrique simple.\n\nMatériel : L'enseignant-e aura au préalable assemblé deux\ncircuits électriques simples : l’un constitué d’une pile et\nd'une ampoule (circuit 1), l'autre recevant en plus un inter-\nrupteur monté en série (circuit 2).\n\nLes circuits sont cachés dans une boite (type boite à chaus-\nsures), seule 'ampoule est visible (circuits 1 et 2) ainsi que\nl'interrupteur (circuit 2). Écrire en gros au feutre, de chaque\ncôté de l'interrupteur : « ON/OFF ».\n\nG Je m'interroge\n\nL'enseignant-e propose aux élèves de leur montrer quelque\nchose... Une certaine curiosité s'installe dans le groupe.\nOn sort alors la boite à chaussures cachée avec les deux\nampoules allumées.\n\nOn laisse les élèves s'exprimer : « c'est une lampe », « il y a\ndes ampoules allumées », « qu'est-ce qu'il y a à l'intérieur\nde la boite ? », « il y a quelque chose écrit sur le côté : ON/\nOFF », « il y a la même chose sur mon jeu électronique »,\n« c'est pour allumer et éteindre. »\n\nL'enseignant-e demande ensuite à un-e élève de venir |\n\nmanipuler l'interrupteur : une ampoule s'éteint. puis se\nrallume. L'autre reste allumée : il n’y a pas d'interrupteur\npour elle.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nL'enseignant-e explique que « ON/OFF » sont des mots\nanglais que l'on trouve sur beaucoup d'appareils élec-\ntriques. On peut les traduire par « marche/arrêt » en\nfrançais. On interroge alors les élèves :\n\nMais comment fonctionne un interrupteur ?\nQu'y a-t-il donc de caché dans cette boite ?\n\nOn demande aux élèves de ne pas répondre par oral mais\nde se mettre par binômes pour tenter de répondre à ces\nquestions.\n\n Je recherche\n\nL'enseignant-e distribue alors à chaque binôme une feuille\nblanche. On explique qu'il y dans la boite deux montages\nindépendants, un pour chaque ampoule. On demande aux\nélèves d'essayer de les imaginer et de les dessiner sur la\nfeuille blanche.\n\nOn laisse alors un temps aux élèves pour ce travail en\nautonomie avant d'écouter les propositions des uns et des\nautres.\n\nL'enseignant-e propose alors d'ouvrir la boite et de regar-\nder ce qui s’y cache : les élèves découvrent les deux cir-\ncuits électriques avec leurs différents éléments que l'on\ndécrit (générateur, fils, support d’ampoule, ampoule, inter-\nrupteur). On visualise ensemble pourquoi on parle d'un\n« circuit » électrique (en le suivant du doigt par exemple).\nLa fiche élève 1 est alors distribuée pour fixer ces\nconnaissances.\n\nLes objets techniques, qu'est-ce que c'est ? » 209\n\n2 Je retiens\n\n«Dans un circuit électrique simple qui a la fonction\nd'éclairer, on trouve une pile, des fils électriques et une\nampoule.\n\n« On peut y ajouter un interrupteur qui sert à ouvrir\n(OFF) le circuit ou à le fermer (ON).",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e propose aux élèves de leur montrer quelque\nchose... Une certaine curiosité s'installe dans le groupe.\nOn sort alors la boite à chaussures cachée avec les deux\nampoules allumées.\n\nOn laisse les élèves s'exprimer : « c'est une lampe », « il y a\ndes ampoules allumées », « qu'est-ce qu'il y a à l'intérieur\nde la boite ? », « il y a quelque chose écrit sur le côté : ON/\nOFF », « il y a la même chose sur mon jeu électronique »,\n« c'est pour allumer et éteindre. »\n\nL'enseignant-e demande ensuite à un-e élève de venir |\n\nmanipuler l'interrupteur : une ampoule s'éteint. puis se\nrallume. L'autre reste allumée : il n’y a pas d'interrupteur\npour elle.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nL'enseignant-e explique que « ON/OFF » sont des mots\nanglais que l'on trouve sur beaucoup d'appareils élec-\ntriques. On peut les traduire par « marche/arrêt » en\nfrançais. On interroge alors les élèves :\n\nMais comment fonctionne un interrupteur ?\nQu'y a-t-il donc de caché dans cette boite ?\n\nOn demande aux élèves de ne pas répondre par oral mais\nde se mettre par binômes pour tenter de répondre à ces\nquestions.",
          },
          {
            title: "Je recherche",
            detail:
              "L'enseignant-e distribue alors à chaque binôme une feuille\nblanche. On explique qu'il y dans la boite deux montages\nindépendants, un pour chaque ampoule. On demande aux\nélèves d'essayer de les imaginer et de les dessiner sur la\nfeuille blanche.\n\nOn laisse alors un temps aux élèves pour ce travail en\nautonomie avant d'écouter les propositions des uns et des\nautres.\n\nL'enseignant-e propose alors d'ouvrir la boite et de regar-\nder ce qui s’y cache : les élèves découvrent les deux cir-\ncuits électriques avec leurs différents éléments que l'on\ndécrit (générateur, fils, support d’ampoule, ampoule, inter-\nrupteur). On visualise ensemble pourquoi on parle d'un\n« circuit » électrique (en le suivant du doigt par exemple).\nLa fiche élève 1 est alors distribuée pour fixer ces\nconnaissances.\n\nLes objets techniques, qu'est-ce que c'est ? » 209\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "«Dans un circuit électrique simple qui a la fonction\nd'éclairer, on trouve une pile, des fils électriques et une\nampoule.\n\n« On peut y ajouter un interrupteur qui sert à ouvrir\n(OFF) le circuit ou à le fermer (ON).",
          },
        ],
      },
      {
        number: 2,
        title:
          "Analyser le fonctionnement d'un objet de la vie quoti- dienne : une lampe de poche. Différencier générateur, récepteur.",
        rawText:
          "Séance 2 IPP)\n\nAnalyser le fonctionnement d'un objet de la vie quoti-\ndienne : une lampe de poche.\nDifférencier générateur, récepteur.\n\nMatériel : des lampes de poche plates.\n\nE Je m'interroge\n\nL'enseignant-e a apporté plusieurs lampes de poche plates.\nOn demande aux élèves :\n\n| À votre avis, comment fonctionne une lampe de poche\n|| comme celle-ci ? Que trouve-t-on à l'intérieur ?\n\nOn peut attendre les réponses suivantes : « il y a une pile et\naussi une ampoule et des fils électriques ».\n\nL'enseignant-e demande alors aux élèves de dessiner l'in-\ntérieur de la lampe de poche telle qu'ils l'imaginent. Les\ndessins sont affichés au tableau et commentés collective-\nment. On en profite pour rappeler le travail de la séance 1\nsur les circuits électriques simples : circuit fermé, la lampe\ns'allume ; circuit ouvert, la lampe s'éteint.\n\nŒ Je recherche\n\nL'enseignant-e place alors les élèves par groupes de 4.\nUne lampe est distribuée à chaque groupe. On observe la\nlampe extérieurement : on voit la plaque transparente qui\nprotège l'ampoule, la plaque réfléchissante qui renvoie la\nlumière, 'ampoule, un crochet pour accrocher la lampe, un\npetit verrou pour maintenir les deux parties de la lampe,\nune charnière de l'autre côté pour ouvrir la lampe et enfin\nun « bouton » sur le côté (l'interrupteur). Si on manipule\ncelui-ci, la lampe s'allume ou s'éteint.\n\nOn ouvre alors la lampe de poche. On peut voir l'ampoule,\nvissée dans son support, la pile (tension électrique 4,5 Volt)\net des éléments en métal jaune. Quand on manipule l'inter-\nrupteur, on peut voir que le circuit n'est plus fermé. Quand\nle circuit est ouvert, l'ampoule s'éteint.\n\nL'enseignant-e distribue alors la fiche élève 2. Elle permet\nde fixer ces connaissances.\n\n2 Je retiens\n\n«Dans une lampe de poche, le circuit électrique est\ncomposé d'une pile (c'est le « générateur ») qui pro-\nduit de l'énergie.\n\n* L'énergie électrique fournie par la pile est reçue par\nl'ampoule (c'est le « récepteur ») et est transformée\nen lumière.\n\n« L'interrupteur permet d'ouvrir ou de fermer le circuit\nélectrique qui relie ces éléments entre eux et par lequel\npasse le courant électrique.\n\n210 » Les objets techniques, qu'est-ce que c'est ?",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e a apporté plusieurs lampes de poche plates.\nOn demande aux élèves :\n\n| À votre avis, comment fonctionne une lampe de poche\n|| comme celle-ci ? Que trouve-t-on à l'intérieur ?\n\nOn peut attendre les réponses suivantes : « il y a une pile et\naussi une ampoule et des fils électriques ».\n\nL'enseignant-e demande alors aux élèves de dessiner l'in-\ntérieur de la lampe de poche telle qu'ils l'imaginent. Les\ndessins sont affichés au tableau et commentés collective-\nment. On en profite pour rappeler le travail de la séance 1\nsur les circuits électriques simples : circuit fermé, la lampe\ns'allume ; circuit ouvert, la lampe s'éteint.\n\nŒ",
          },
          {
            title: "Je recherche",
            detail:
              "L'enseignant-e place alors les élèves par groupes de 4.\nUne lampe est distribuée à chaque groupe. On observe la\nlampe extérieurement : on voit la plaque transparente qui\nprotège l'ampoule, la plaque réfléchissante qui renvoie la\nlumière, 'ampoule, un crochet pour accrocher la lampe, un\npetit verrou pour maintenir les deux parties de la lampe,\nune charnière de l'autre côté pour ouvrir la lampe et enfin\nun « bouton » sur le côté (l'interrupteur). Si on manipule\ncelui-ci, la lampe s'allume ou s'éteint.\n\nOn ouvre alors la lampe de poche. On peut voir l'ampoule,\nvissée dans son support, la pile (tension électrique 4,5 Volt)\net des éléments en métal jaune. Quand on manipule l'inter-\nrupteur, on peut voir que le circuit n'est plus fermé. Quand\nle circuit est ouvert, l'ampoule s'éteint.\n\nL'enseignant-e distribue alors la fiche élève 2. Elle permet\nde fixer ces connaissances.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "«Dans une lampe de poche, le circuit électrique est\ncomposé d'une pile (c'est le « générateur ») qui pro-\nduit de l'énergie.\n\n* L'énergie électrique fournie par la pile est reçue par\nl'ampoule (c'est le « récepteur ») et est transformée\nen lumière.\n\n« L'interrupteur permet d'ouvrir ou de fermer le circuit\nélectrique qui relie ces éléments entre eux et par lequel\npasse le courant électrique.\n\n210 » Les objets techniques, qu'est-ce que c'est ?",
          },
        ],
      },
      {
        number: 3,
        title:
          "Réaliser quelques circuits électriques simples utilisant des lampes ou des petits moteurs. N. B. : Le dossier 18 consacré aux « défis techno » propose",
        rawText:
          "Séance 3 MF\n\nRéaliser quelques circuits électriques simples utilisant\ndes lampes ou des petits moteurs.\n\nN. B. : Le dossier 18 consacré aux « défis techno » propose\nd'autres séances notamment pour réaliser un objet tech-\nnique en suivant une notice de montage. En fonction du\nniveau des élèves et de la classe, ces défis techno peuvent\ncompléter ou remplacer la présente séance.\n\nMatériel : fils électriques, ampoules de 4,5 V, culots, inter-\nrupteur, piles plates de 4,5 V, pince à dénuder.\n\nEJ Je m'interroge\n\nL'enseignant-e présente le matériel électrique aux élèves et\nrappelle ou précise avec eux le vocabulaire lié : fil électrique\n(gaine en plastique isolante + fils de cuivre), ampoule\n(plot, culot, filament, verre), support de lampe, interrupteur\n(ouvert/fermé), pile (le « générateur » avec la borne + et la\nborne -).\n\nN.B. : le courant électrique circule de la borne + vers la\nborne —\n\nOn demande ensuite aux élèves :\n\nPourriez-vous réaliser avec ce matériel un circuit\nélectrique permettant d'assurer la fonction d'éclairer ?\nPuis dans dans un second temps, de placer dans ce\ncircuit un interrupteur afin d'éteindre votre ampoule ?\nEnfin, dans un troisième temps, comment allumer deux\nampoules dans le même circuit ?\n\n@ Je recherche\n\nLes élèves sont placés par groupes de 4. Avant de distri-\nbuer le matériel, l'enseignant-e précise qu'il faudra réaliser\ndes schémas de chaque circuit réalisé. Il ajoute qu'on ne\ndessine pas n'importe comment les différents éléments\nélectriques que l'on va utiliser. Il distribue alors la fiche\ndocumentaire 1 qui donne des informations sur le voca-\nbulaire et les schématisations des différents composants\nélectriques utilisés. Les schémas peuvent être réalisés sur\nune feuille blanche insérée dans le classeur QLM.\n\nOn donne quelques règles à suivre lors des manipulations :\npour ne pas mettre les piles en « court-circuit », vérifier\nrégulièrement que la pile ne devient pas chaude. Il faut\nalors appeler l'enseignant-e et ne jamais relier directement\nune borne de la pile à l'autre avec un fil.\n\nEnfin, quand on ne manipule plus, il faut débrancher les fils\nqui arrivent à l'une des bornes de la pile.\n\nOn profitera de ce point sécurité (abordé complètement\ndans le dossier 17) pour insister sur la dangerosité de l'élec-\ntricité à la maison : on précisera qu’à l'école, nous utilisons\ndes piles produisant de très petites quantités d'électricité.\nÀ la maison, l'électricité utilisée peut représenter un danger\nmortel. Aussi, il ne faut jamais tenter de réparer seul-e une\nprise ou une ampoule grillée, une panne sur un appareil, etc.\nLorsque les différentes manipulations ont été réalisées,\nl'enseignant-e distribue la fiche élève 3.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n2 Je retiens\n\n« Dans un circuit électrique permettant d'assurer la fonc-\ntion d'éclairer, il faut un générateur (pile), des fils élec-\ntriques et un récepteur (ampoule). Le circuit forme une\nboucle.\n\n«Un interrupteur permet d'éteindre ou d'allumer\nl’ampoule :\n\n— si l'interrupteur est sur « ON », le circuit est fermé et\nle courant passe : la lampe s'allume.\n\n— si l'interrupteur est sur « OFF », le circuit est ouvert et\nle courant ne passe plus : la lampe s'éteint.\n\n+ On peut mettre deux ampoules dans le même circuit\nen série. Elles brillent moins.\n\n ase\n\nDistinguer objets conducteurs et isolants électriques.\nRéaliser des montages permettant de différencier des\nmatériaux en deux catégories : bons conducteurs et\nisolants.\n\nMatériel : fils électriques, ampoule, LED, pinces crocodiles,\npiles, différents matériaux conducteurs et non conducteurs,\ngobelet, eau.\n\n@ Je m'interroge\nL'enseignant-e rappelle aux élèves le travail réalisé lors de\n\nla séance précédente consacrée à l'électricité. Les élèves |\n\navaient alors réalisé un circuit électrique simple, avec une\nou deux ampoules. On leur demande alors :\n\nVous souvenez-vous du matériel nécessaire pour réaliser\nun circuit électrique ?\n\nOn peut attendre les réponses suivantes : « il nous faut une\npile, des fils électriques, une pince à dénuder, une ampoule,\nun support d'ampoule... »\n\nL'enseignant-e montre à nouveau le matériel. On présente\naussi les pinces crocodiles et la LED qui s'allume au passage\ndu courant, même très faible ; dans un seul sens.\n\nOn interroge à nouveau les élèves :\n\nPourriez-vous réfléchir à un circuit électrique qui nous\npermette de vérifier si tous les matériaux conduisent\nl'électricité, c'est-à-dire que le courant électrique passe\nà travers ?\n\n Je recherche\n\nLes élèves sont placés par groupes de 4. Chaque groupe a\nà sa disposition le matériel présenté. L'enseignant-e laisse\naux élèves un temps de recherche pour trouver un circuit\nélectrique capable de vérifier, de tester la conductibilité de\ndifférents matériaux.\n\nLorsqu'un groupe a trouvé un circuit électrique pertinent, il\nle présente à la classe. L'enseignant-e teste alors un objet\nen plastique (le circuit est ouvert : la lampe reste éteinte) et\nun objet en fer (le circuit est fermé : la lampe s'allume). On\nprécise le vocabulaire : certaines matières ne conduisent\npas l'électricité. On dit que ce sont des isolants électriques.\nD'autres au contraire conduisent l'électricité : on dit que ce\nsont des conducteurs électriques.\n\nIl distribue alors la fiche élève 4 afin de mettre en place\net de garder une trace des expérimentations sur différents\nmatériaux.\n\n2 Je retiens\n\n» Les matériaux ne conduisent pas tous l'électricité.\n\n« Certains matériaux comme le plastique, le verre ou le\nbois sont des isolants électriques : ils ne se laissent pas\n« traverser » par le courant électrique.\n\n= D'autres, au contraire, comme le fer, le cuivre, l'alumi-\nnium sont des conducteurs électriques : ils se laissent\n« traverser » par le courant électrique.\n\ne Dans une lampe de poche, le circuit\nélectrique est composé d’une pile\n(c'est le « générateur ») qui produit\n\nde l'énergie. ampoule\n\ne L'énergie électrique fournie par\nla pile est reçue par l’ampoule\n(c'est le « récepteur ») et\nest transformée en lumière.\n\n* L'interrupteur permet d'ouvrir ou\nde fermer le circuit électrique qui\nrelie ces éléments entre eux et par\nlequel passe le courant électrique.\n\npile\n\n© MOI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\ninterrupteur\n\nLes objets techniques, qu'est-ce que c'est ? o 211",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e présente le matériel électrique aux élèves et\nrappelle ou précise avec eux le vocabulaire lié : fil électrique\n(gaine en plastique isolante + fils de cuivre), ampoule\n(plot, culot, filament, verre), support de lampe, interrupteur\n(ouvert/fermé), pile (le « générateur » avec la borne + et la\nborne -).\n\nN.B. : le courant électrique circule de la borne + vers la\nborne —\n\nOn demande ensuite aux élèves :\n\nPourriez-vous réaliser avec ce matériel un circuit\nélectrique permettant d'assurer la fonction d'éclairer ?\nPuis dans dans un second temps, de placer dans ce\ncircuit un interrupteur afin d'éteindre votre ampoule ?\nEnfin, dans un troisième temps, comment allumer deux\nampoules dans le même circuit ?\n\n@",
          },
          {
            title: "Je recherche",
            detail:
              "Les élèves sont placés par groupes de 4. Avant de distri-\nbuer le matériel, l'enseignant-e précise qu'il faudra réaliser\ndes schémas de chaque circuit réalisé. Il ajoute qu'on ne\ndessine pas n'importe comment les différents éléments\nélectriques que l'on va utiliser. Il distribue alors la fiche\ndocumentaire 1 qui donne des informations sur le voca-\nbulaire et les schématisations des différents composants\nélectriques utilisés. Les schémas peuvent être réalisés sur\nune feuille blanche insérée dans le classeur QLM.\n\nOn donne quelques règles à suivre lors des manipulations :\npour ne pas mettre les piles en « court-circuit », vérifier\nrégulièrement que la pile ne devient pas chaude. Il faut\nalors appeler l'enseignant-e et ne jamais relier directement\nune borne de la pile à l'autre avec un fil.\n\nEnfin, quand on ne manipule plus, il faut débrancher les fils\nqui arrivent à l'une des bornes de la pile.\n\nOn profitera de ce point sécurité (abordé complètement\ndans le dossier 17) pour insister sur la dangerosité de l'élec-\ntricité à la maison : on précisera qu’à l'école, nous utilisons\ndes piles produisant de très petites quantités d'électricité.\nÀ la maison, l'électricité utilisée peut représenter un danger\nmortel. Aussi, il ne faut jamais tenter de réparer seul-e une\nprise ou une ampoule grillée, une panne sur un appareil, etc.\nLorsque les différentes manipulations ont été réalisées,\nl'enseignant-e distribue la fiche élève 3.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "« Dans un circuit électrique permettant d'assurer la fonc-\ntion d'éclairer, il faut un générateur (pile), des fils élec-\ntriques et un récepteur (ampoule). Le circuit forme une\nboucle.\n\n«Un interrupteur permet d'éteindre ou d'allumer\nl’ampoule :\n\n— si l'interrupteur est sur « ON », le circuit est fermé et\nle courant passe : la lampe s'allume.\n\n— si l'interrupteur est sur « OFF », le circuit est ouvert et\nle courant ne passe plus : la lampe s'éteint.\n\n+ On peut mettre deux ampoules dans le même circuit\nen série. Elles brillent moins.\n\n ase\n\nDistinguer objets conducteurs et isolants électriques.\nRéaliser des montages permettant de différencier des\nmatériaux en deux catégories : bons conducteurs et\nisolants.\n\nMatériel : fils électriques, ampoule, LED, pinces crocodiles,\npiles, différents matériaux conducteurs et non conducteurs,\ngobelet, eau.\n\n@",
          },
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e rappelle aux élèves le travail réalisé lors de\n\nla séance précédente consacrée à l'électricité. Les élèves |\n\navaient alors réalisé un circuit électrique simple, avec une\nou deux ampoules. On leur demande alors :\n\nVous souvenez-vous du matériel nécessaire pour réaliser\nun circuit électrique ?\n\nOn peut attendre les réponses suivantes : « il nous faut une\npile, des fils électriques, une pince à dénuder, une ampoule,\nun support d'ampoule... »\n\nL'enseignant-e montre à nouveau le matériel. On présente\naussi les pinces crocodiles et la LED qui s'allume au passage\ndu courant, même très faible ; dans un seul sens.\n\nOn interroge à nouveau les élèves :\n\nPourriez-vous réfléchir à un circuit électrique qui nous\npermette de vérifier si tous les matériaux conduisent\nl'électricité, c'est-à-dire que le courant électrique passe\nà travers ?",
          },
          {
            title: "Je recherche",
            detail:
              "Les élèves sont placés par groupes de 4. Chaque groupe a\nà sa disposition le matériel présenté. L'enseignant-e laisse\naux élèves un temps de recherche pour trouver un circuit\nélectrique capable de vérifier, de tester la conductibilité de\ndifférents matériaux.\n\nLorsqu'un groupe a trouvé un circuit électrique pertinent, il\nle présente à la classe. L'enseignant-e teste alors un objet\nen plastique (le circuit est ouvert : la lampe reste éteinte) et\nun objet en fer (le circuit est fermé : la lampe s'allume). On\nprécise le vocabulaire : certaines matières ne conduisent\npas l'électricité. On dit que ce sont des isolants électriques.\nD'autres au contraire conduisent l'électricité : on dit que ce\nsont des conducteurs électriques.\n\nIl distribue alors la fiche élève 4 afin de mettre en place\net de garder une trace des expérimentations sur différents\nmatériaux.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "» Les matériaux ne conduisent pas tous l'électricité.\n\n« Certains matériaux comme le plastique, le verre ou le\nbois sont des isolants électriques : ils ne se laissent pas\n« traverser » par le courant électrique.\n\n= D'autres, au contraire, comme le fer, le cuivre, l'alumi-\nnium sont des conducteurs électriques : ils se laissent\n« traverser » par le courant électrique.\n\ne Dans une lampe de poche, le circuit\nélectrique est composé d’une pile\n(c'est le « générateur ») qui produit\n\nde l'énergie. ampoule\n\ne L'énergie électrique fournie par\nla pile est reçue par l’ampoule\n(c'est le « récepteur ») et\nest transformée en lumière.\n\n* L'interrupteur permet d'ouvrir ou\nde fermer le circuit électrique qui\nrelie ces éléments entre eux et par\nlequel passe le courant électrique.\n\npile\n\n© MOI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\ninterrupteur\n\nLes objets techniques, qu'est-ce que c'est ? o 211",
          },
        ],
      },
    ],
    guideText:
      "} Un circuit électrique, comment ça marche ?\n\n» Objectifs\n\n+ Connaitre les constituants et comprendre le fonctionnement d'un circuit électrique\nsimple. Connaitre le rôle de l'interrupteur.\n\n+ Analyser le fonctionnement de différents objets de la vie quotidienne (lampes de poche,\njouets à pile.)\n\n« Réaliser des circuits électriques simples en respectant les règles élémentaires de sécurité.\n\n« Identifier les propriétés de la matière vis-à-vis du courant électrique.\n\n> Indications de progression dans le cycle 2\n\nCe dossier concerne les trois niveaux du cycle 2. Au CP, il s'agit simplement d'observer un\ncircuit électrique permettant d'assurer la fonction d'éclairer, de connaitre le rôle d'un inter-\nrupteur et de découvrir un circuit électrique en série fermé simple. Au CET, l'élève analyse\nle fonctionnement d'un objet de la vie quotidienne (lampe de poche) et réalise quelques\ncircuits électriques simples utilisant des lampes ou des petits moteurs. Au CE2, l'élève va\napprendre à différencier les matériaux du point de vue de la conductivité électrique : maté-\nriaux conducteurs ou isolants électriques. Quatre séances permettent de traiter l'ensemble\nde ces thèmes avec des fiches élève et des fiches d'évaluation adaptées. Le dossier 18 peut\n\nFiche enseignant\n\n> Matériel\n\nêtre traité en parallèle pour la réalisation d'objets techniques.\n\nLa matériel nécessaire est indiqué dans chaque séance.\n\nSéance 1 MF]\n\nObserver un circuit électrique permettant d'assurer la\nfonction d'éclairer.\n\nConnaitre le rôle de l'interrupteur (ON/OFF).\n\nConnaitre les constituants et comprendre le fonction-\nnement d'un circuit électrique simple.\n\nMatériel : L'enseignant-e aura au préalable assemblé deux\ncircuits électriques simples : l’un constitué d’une pile et\nd'une ampoule (circuit 1), l'autre recevant en plus un inter-\nrupteur monté en série (circuit 2).\n\nLes circuits sont cachés dans une boite (type boite à chaus-\nsures), seule 'ampoule est visible (circuits 1 et 2) ainsi que\nl'interrupteur (circuit 2). Écrire en gros au feutre, de chaque\ncôté de l'interrupteur : « ON/OFF ».\n\nG Je m'interroge\n\nL'enseignant-e propose aux élèves de leur montrer quelque\nchose... Une certaine curiosité s'installe dans le groupe.\nOn sort alors la boite à chaussures cachée avec les deux\nampoules allumées.\n\nOn laisse les élèves s'exprimer : « c'est une lampe », « il y a\ndes ampoules allumées », « qu'est-ce qu'il y a à l'intérieur\nde la boite ? », « il y a quelque chose écrit sur le côté : ON/\nOFF », « il y a la même chose sur mon jeu électronique »,\n« c'est pour allumer et éteindre. »\n\nL'enseignant-e demande ensuite à un-e élève de venir |\n\nmanipuler l'interrupteur : une ampoule s'éteint. puis se\nrallume. L'autre reste allumée : il n’y a pas d'interrupteur\npour elle.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nL'enseignant-e explique que « ON/OFF » sont des mots\nanglais que l'on trouve sur beaucoup d'appareils élec-\ntriques. On peut les traduire par « marche/arrêt » en\nfrançais. On interroge alors les élèves :\n\nMais comment fonctionne un interrupteur ?\nQu'y a-t-il donc de caché dans cette boite ?\n\nOn demande aux élèves de ne pas répondre par oral mais\nde se mettre par binômes pour tenter de répondre à ces\nquestions.\n\n Je recherche\n\nL'enseignant-e distribue alors à chaque binôme une feuille\nblanche. On explique qu'il y dans la boite deux montages\nindépendants, un pour chaque ampoule. On demande aux\nélèves d'essayer de les imaginer et de les dessiner sur la\nfeuille blanche.\n\nOn laisse alors un temps aux élèves pour ce travail en\nautonomie avant d'écouter les propositions des uns et des\nautres.\n\nL'enseignant-e propose alors d'ouvrir la boite et de regar-\nder ce qui s’y cache : les élèves découvrent les deux cir-\ncuits électriques avec leurs différents éléments que l'on\ndécrit (générateur, fils, support d’ampoule, ampoule, inter-\nrupteur). On visualise ensemble pourquoi on parle d'un\n« circuit » électrique (en le suivant du doigt par exemple).\nLa fiche élève 1 est alors distribuée pour fixer ces\nconnaissances.\n\nLes objets techniques, qu'est-ce que c'est ? » 209\n\n2 Je retiens\n\n«Dans un circuit électrique simple qui a la fonction\nd'éclairer, on trouve une pile, des fils électriques et une\nampoule.\n\n« On peut y ajouter un interrupteur qui sert à ouvrir\n(OFF) le circuit ou à le fermer (ON).\n\nSéance 2 IPP)\n\nAnalyser le fonctionnement d'un objet de la vie quoti-\ndienne : une lampe de poche.\nDifférencier générateur, récepteur.\n\nMatériel : des lampes de poche plates.\n\nE Je m'interroge\n\nL'enseignant-e a apporté plusieurs lampes de poche plates.\nOn demande aux élèves :\n\n| À votre avis, comment fonctionne une lampe de poche\n|| comme celle-ci ? Que trouve-t-on à l'intérieur ?\n\nOn peut attendre les réponses suivantes : « il y a une pile et\naussi une ampoule et des fils électriques ».\n\nL'enseignant-e demande alors aux élèves de dessiner l'in-\ntérieur de la lampe de poche telle qu'ils l'imaginent. Les\ndessins sont affichés au tableau et commentés collective-\nment. On en profite pour rappeler le travail de la séance 1\nsur les circuits électriques simples : circuit fermé, la lampe\ns'allume ; circuit ouvert, la lampe s'éteint.\n\nŒ Je recherche\n\nL'enseignant-e place alors les élèves par groupes de 4.\nUne lampe est distribuée à chaque groupe. On observe la\nlampe extérieurement : on voit la plaque transparente qui\nprotège l'ampoule, la plaque réfléchissante qui renvoie la\nlumière, 'ampoule, un crochet pour accrocher la lampe, un\npetit verrou pour maintenir les deux parties de la lampe,\nune charnière de l'autre côté pour ouvrir la lampe et enfin\nun « bouton » sur le côté (l'interrupteur). Si on manipule\ncelui-ci, la lampe s'allume ou s'éteint.\n\nOn ouvre alors la lampe de poche. On peut voir l'ampoule,\nvissée dans son support, la pile (tension électrique 4,5 Volt)\net des éléments en métal jaune. Quand on manipule l'inter-\nrupteur, on peut voir que le circuit n'est plus fermé. Quand\nle circuit est ouvert, l'ampoule s'éteint.\n\nL'enseignant-e distribue alors la fiche élève 2. Elle permet\nde fixer ces connaissances.\n\n2 Je retiens\n\n«Dans une lampe de poche, le circuit électrique est\ncomposé d'une pile (c'est le « générateur ») qui pro-\nduit de l'énergie.\n\n* L'énergie électrique fournie par la pile est reçue par\nl'ampoule (c'est le « récepteur ») et est transformée\nen lumière.\n\n« L'interrupteur permet d'ouvrir ou de fermer le circuit\nélectrique qui relie ces éléments entre eux et par lequel\npasse le courant électrique.\n\n210 » Les objets techniques, qu'est-ce que c'est ?\n\nSéance 3 MF\n\nRéaliser quelques circuits électriques simples utilisant\ndes lampes ou des petits moteurs.\n\nN. B. : Le dossier 18 consacré aux « défis techno » propose\nd'autres séances notamment pour réaliser un objet tech-\nnique en suivant une notice de montage. En fonction du\nniveau des élèves et de la classe, ces défis techno peuvent\ncompléter ou remplacer la présente séance.\n\nMatériel : fils électriques, ampoules de 4,5 V, culots, inter-\nrupteur, piles plates de 4,5 V, pince à dénuder.\n\nEJ Je m'interroge\n\nL'enseignant-e présente le matériel électrique aux élèves et\nrappelle ou précise avec eux le vocabulaire lié : fil électrique\n(gaine en plastique isolante + fils de cuivre), ampoule\n(plot, culot, filament, verre), support de lampe, interrupteur\n(ouvert/fermé), pile (le « générateur » avec la borne + et la\nborne -).\n\nN.B. : le courant électrique circule de la borne + vers la\nborne —\n\nOn demande ensuite aux élèves :\n\nPourriez-vous réaliser avec ce matériel un circuit\nélectrique permettant d'assurer la fonction d'éclairer ?\nPuis dans dans un second temps, de placer dans ce\ncircuit un interrupteur afin d'éteindre votre ampoule ?\nEnfin, dans un troisième temps, comment allumer deux\nampoules dans le même circuit ?\n\n@ Je recherche\n\nLes élèves sont placés par groupes de 4. Avant de distri-\nbuer le matériel, l'enseignant-e précise qu'il faudra réaliser\ndes schémas de chaque circuit réalisé. Il ajoute qu'on ne\ndessine pas n'importe comment les différents éléments\nélectriques que l'on va utiliser. Il distribue alors la fiche\ndocumentaire 1 qui donne des informations sur le voca-\nbulaire et les schématisations des différents composants\nélectriques utilisés. Les schémas peuvent être réalisés sur\nune feuille blanche insérée dans le classeur QLM.\n\nOn donne quelques règles à suivre lors des manipulations :\npour ne pas mettre les piles en « court-circuit », vérifier\nrégulièrement que la pile ne devient pas chaude. Il faut\nalors appeler l'enseignant-e et ne jamais relier directement\nune borne de la pile à l'autre avec un fil.\n\nEnfin, quand on ne manipule plus, il faut débrancher les fils\nqui arrivent à l'une des bornes de la pile.\n\nOn profitera de ce point sécurité (abordé complètement\ndans le dossier 17) pour insister sur la dangerosité de l'élec-\ntricité à la maison : on précisera qu’à l'école, nous utilisons\ndes piles produisant de très petites quantités d'électricité.\nÀ la maison, l'électricité utilisée peut représenter un danger\nmortel. Aussi, il ne faut jamais tenter de réparer seul-e une\nprise ou une ampoule grillée, une panne sur un appareil, etc.\nLorsque les différentes manipulations ont été réalisées,\nl'enseignant-e distribue la fiche élève 3.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n2 Je retiens\n\n« Dans un circuit électrique permettant d'assurer la fonc-\ntion d'éclairer, il faut un générateur (pile), des fils élec-\ntriques et un récepteur (ampoule). Le circuit forme une\nboucle.\n\n«Un interrupteur permet d'éteindre ou d'allumer\nl’ampoule :\n\n— si l'interrupteur est sur « ON », le circuit est fermé et\nle courant passe : la lampe s'allume.\n\n— si l'interrupteur est sur « OFF », le circuit est ouvert et\nle courant ne passe plus : la lampe s'éteint.\n\n+ On peut mettre deux ampoules dans le même circuit\nen série. Elles brillent moins.\n\n ase\n\nDistinguer objets conducteurs et isolants électriques.\nRéaliser des montages permettant de différencier des\nmatériaux en deux catégories : bons conducteurs et\nisolants.\n\nMatériel : fils électriques, ampoule, LED, pinces crocodiles,\npiles, différents matériaux conducteurs et non conducteurs,\ngobelet, eau.\n\n@ Je m'interroge\nL'enseignant-e rappelle aux élèves le travail réalisé lors de\n\nla séance précédente consacrée à l'électricité. Les élèves |\n\navaient alors réalisé un circuit électrique simple, avec une\nou deux ampoules. On leur demande alors :\n\nVous souvenez-vous du matériel nécessaire pour réaliser\nun circuit électrique ?\n\nOn peut attendre les réponses suivantes : « il nous faut une\npile, des fils électriques, une pince à dénuder, une ampoule,\nun support d'ampoule... »\n\nL'enseignant-e montre à nouveau le matériel. On présente\naussi les pinces crocodiles et la LED qui s'allume au passage\ndu courant, même très faible ; dans un seul sens.\n\nOn interroge à nouveau les élèves :\n\nPourriez-vous réfléchir à un circuit électrique qui nous\npermette de vérifier si tous les matériaux conduisent\nl'électricité, c'est-à-dire que le courant électrique passe\nà travers ?\n\n Je recherche\n\nLes élèves sont placés par groupes de 4. Chaque groupe a\nà sa disposition le matériel présenté. L'enseignant-e laisse\naux élèves un temps de recherche pour trouver un circuit\nélectrique capable de vérifier, de tester la conductibilité de\ndifférents matériaux.\n\nLorsqu'un groupe a trouvé un circuit électrique pertinent, il\nle présente à la classe. L'enseignant-e teste alors un objet\nen plastique (le circuit est ouvert : la lampe reste éteinte) et\nun objet en fer (le circuit est fermé : la lampe s'allume). On\nprécise le vocabulaire : certaines matières ne conduisent\npas l'électricité. On dit que ce sont des isolants électriques.\nD'autres au contraire conduisent l'électricité : on dit que ce\nsont des conducteurs électriques.\n\nIl distribue alors la fiche élève 4 afin de mettre en place\net de garder une trace des expérimentations sur différents\nmatériaux.\n\n2 Je retiens\n\n» Les matériaux ne conduisent pas tous l'électricité.\n\n« Certains matériaux comme le plastique, le verre ou le\nbois sont des isolants électriques : ils ne se laissent pas\n« traverser » par le courant électrique.\n\n= D'autres, au contraire, comme le fer, le cuivre, l'alumi-\nnium sont des conducteurs électriques : ils se laissent\n« traverser » par le courant électrique.\n\ne Dans une lampe de poche, le circuit\nélectrique est composé d’une pile\n(c'est le « générateur ») qui produit\n\nde l'énergie. ampoule\n\ne L'énergie électrique fournie par\nla pile est reçue par l’ampoule\n(c'est le « récepteur ») et\nest transformée en lumière.\n\n* L'interrupteur permet d'ouvrir ou\nde fermer le circuit électrique qui\nrelie ces éléments entre eux et par\nlequel passe le courant électrique.\n\npile\n\n© MOI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\ninterrupteur\n\nLes objets techniques, qu'est-ce que c'est ? o 211",
    guidePageDecisions: [
      {
        page: 209,
        confidence: 92,
        score: 20,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
        ],
        phaseMarkers: ["je m'interroge", "je recherche"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on demande", "on interroge", "groupe"],
        studentLike: true,
      },
      {
        page: 210,
        confidence: 93,
        score: 22,
        included: true,
        strongMarkers: [
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "par groupes",
        ],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on demande", "par groupes", "groupe"],
        studentLike: true,
      },
      {
        page: 211,
        confidence: 92,
        score: 20,
        included: true,
        strongMarkers: [
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "par groupes",
        ],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on interroge", "par groupes", "groupe"],
        studentLike: true,
      },
      {
        page: 212,
        confidence: 84,
        score: 1,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: false,
      },
    ],
    skippedProbePages: [212],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-17",
    dossierNumber: 17,
    partNumber: 4,
    partTitle: "Les objets techniques, qu'est-ce que c'est ?",
    title: "L'électricité : quels usages, quels dangers ?",
    guidePages: [227, 228],
    guidePageCount: 2,
    objectives: [
      "Connaitre les règles élémentaires de sécurité.",
      "« Savoir qu'il existe de nombreux objets utilisant l'électricité et les classer selon la source",
      "d'énergie utilisée.",
      "« Identifier ce que produit l'électricité : chaleur, mouvement, son ou lumière.",
      "« Découvrir quelques idées de grandeurs électriques (voltage) : différence entre plusieurs",
      "formats de piles.",
    ],
    progressionNote:
      "Ce dossier concerne les trois niveaux du cycle, notamment en ce qui concerne les règles\nélémentaires de sécurité. Une première séance est consacrée aux règles de sécurité : elle\nest destinée en priorité aux CP-CE1 mais peut-être reprise avec les CE2 bien évidemment.\nUne deuxième séance destinée aux CE1 porte sur les nombreux objets utilisant l'électri-\ncité, leurs différentes sources et ce qu'ils peuvent produire (chaleur, mouvement, son ou\nlumière). Enfin, une troisième séance spécifique aux CE2 permet d'appréhender la notion\nde grandeur électrique.",
    material: ["La matériel nécessaire est indiqué dans chaque séance. J"],
    sessions: [
      {
        number: 1,
        title:
          "Avoir des notions sur la sécurité dans l'usage de l'électri- cité au quotidien et savoir que le passage de l'électricité dans le corps humain présente des dangers qui peuvent",
        rawText:
          "séance 1 PIRE)\n\nAvoir des notions sur la sécurité dans l'usage de l'électri-\ncité au quotidien et savoir que le passage de l'électricité\ndans le corps humain présente des dangers qui peuvent\nêtre mortels. Aborder le risque d’électrocution.\n\njem interroge\n\nL'enseignant-e propose aux élèves, pour lancer ce dossier,\nun pictogramme (— sur CD-Rom) présent notamment sur\nles transformateurs électriques EDF.\n\nOn demande aux élèves :\n\n| Savez-vous ce que représente\n\nce pictogramme ?\n\nOù peut-on le trouver ? Que signifie-t-il ?\nOn peut attendre les réponses suivantes : « c'est pour faire\nattention à l'électricité », « c'est dangereux, on peut se\nfaire tuer », « je l'ai vu sur une grosse armoire dans la rue »\nL'enseignant-e précise qu’effectivement ce pictogramme\nreprésente un danger électrique. Si un courant électrique\nfort traverse notre corps, on peut être électrocuté, c'est-à-\ndire que le passage du courant électrique dans notre corps\npeut entrainer un arrêt du cœur et donc la mort.\nL'enseignant-e interroge à nouveau les élèves :\n\nY a-t-il des risques à la maison ou à l’école avec\nl'électricité ? Quels sont les bons gestes à connaitre\npour être en sécurité ?\n\nLes élèves peuvent avancer : « il ne faut pas mettre ses\ndoigts dans les prises », « il ne faut pas utiliser un appareil\nélectrique près de l'eau... » L'enseignant-e propose alors de\nréfléchir aux différents dangers électriques à la maison, à\nl’école, dans la rue.\n\n© MOI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nJe recherche\n\nLes élèves sont placés par groupes de 4. Ils ont à leur dis-\nposition des feuilles blanches format AS. Ils reçoivent la\nconsigne suivante : « Vous allez réfléchir à des gestes à ne\npas faire parce qu'ils présentent des risques pour vous, des\nrisques liés à l'électricité. Vous dessinerez ces gestes dange-\nreux sur une feuille (une feuille = un geste) en ajoutant un\ntriangle rouge dans un coin de celle-ci. Si au contraire vous\ndessinez un bon geste sur une feuille, un geste qui vous met\nen sécurité, alors vous dessinerez cette fois-ci un rond vert\ndans un angle de la feuille. »\nChaque groupe peut bien sûr faire plusieurs dessins. Après\nun temps de travail dans les groupes, on se rassemble et\nchaque groupe présente et explique ses dessins. Ceux-ci\nsont fixés au tableau en deux colonnes : actions dange-\nreuses — actions sécurisées.\nL'enseignant-e distribue alors la fiche documentaire 1 qui\npermet de faire le tour de nombreuses situations liées aux\ndangers de l'électricité. Cette fiche est lue collectivement\net explicitée. Elle se découpe et se plie pour former un petit\nlivret précieux, à conserver, sur les précautions à prendre.\nPuis l'enseignant-e distribue la fiche élève 1 sur laquelle les\nélèves travaillent individuellement.\n\nB. : Il peut être judicieux d'évoquer le rôle du disjoncteur\ndans une maison, et de montrer, pourquoi pas, celui de l'école.\n\n2 Je retiens\n\n« L'électricité peut être très dangereuse. Elle peut pas-\nser dans notre corps et provoquer un arrêt du cœur par\nélectrocution.\n\n«Il est important de toujours respecter les règles de\nsécurité qui ont été données.\n\nLes objets techniques, qu'est-ce que c'est ? « 227\n\nFiche enseignant\n\n ae\n\nSavoir qu'il existe de nombreux objets utilisant l'électri-\ncité et les classer selon la source d'énergie utilisée.\nIdentifier ce que produit l'électricité : chaleur, mouve-\nment, son ou lumière.\n\nMatériel : appareils fonctionnant avec des piles, des batte-\nries, l'électricité du secteur.\n\n@ Je m’interroge\n\nL'enseignant-e a apporté en classe plusieurs objets ou\nappareils fonctionnant avec des piles, des batteries ou avec\nle secteur : montre, lampe, téléphone, mixeur, radio-révei\nOn demande alors aux élèves :\n\nSaurez-vous trouver un point commun et une différence\nentre tous ces objets ?\n\nOn peut attendre des élèves les réponses suivantes : « ces\nobjets fonctionnent tous à l'électricité », « il faut les bran-\ncher pour que ça marche ! », « non, pas tous, dans certains\nily a une pile ! », « ou une batterie ! ».\n\n@ Je recherche\n\nL'enseignant-e propose de classer les objets en trois\nfamilles. Ils fonctionnent tous avec de l'électricité mais les\ngénérateurs (ce qui produit l'électricité) sont différents :\npour certains, il faut les brancher sur le secteur pour les\nalimenter ; d'autres puisent leur électricité dans une pile ;\nenfin les derniers ont une batterie (ou accumulateur) qui\npeut être rechargée. On propose aux élèves de recher-\ncher d'autres objets fonctionnant avec ces trois solutions.\nLes objets sont notés sur une affiche dans trois colonnes.\nDans un second temps, l'enseignant-e demande aux élèves\nde rechercher en quoi est transformée l'électricité dans\nchacun de ces appareils. Ce peut être en lumière, en chaleur,\nen mouvement, en son.\n\nLa fiche élève 2 est distribuée pour fixer ces connaissances.\n\n2 Je retiens\n«De nombreux objets autour de nous fonctionnent\ngrâce à l'électricité.\n« l'électricité peut être fournie par une pile, une batterie\nou encore par le réseau électrique.\n« l'électricité peut être transformée en chaleur, mouve-\nment, son ou lumière.\n\n TT\n\nDécouvrir quelques idées de grandeurs’ électriques\n(Voltage) : différence entre plusieurs formats de piles.\n\nMatériel : différents formats de piles.\n\na8 Je m’interroge\n\nL'enseignant-e présente aux élèves les différentes piles puis\non interroge les élèves :\n\n| Que voyez-vous ? Que remarquez-vous ?\n\nOn peut attendre les réponses suivantes : « ce sont des\npiles », « elles n'ont pas toutes la même forme », « il y en\nà de plus grosses que d'autres », « c'est parce qu'elles ont\nplus de puissance ! »\n\nL'enseignant-e recense les différentes réponses des élèves\npuis leur demande de former des binômes afin d'observer\nles différentes piles apportées.\n\nP= J'observe\n\nL'enseignant-e distribue à chaque binôme une de ces piles\nen mentionnant qu'il ne faut pas les porter à la bouche ni\nles détériorer d’une façon ou d’une autre. Les élèves vont\nétudier « leur » pile et repérer les différents formats (D, C,\nAA, AAA, AAAA), le pôle +, le pôle —, la tension électrique\nfournie (1,5 volt, 4,5 volts, 9 volts) à mettre en relation avec\nles 220 volts du secteur.\n\nL'enseignant-e rappelle qu'une tension supérieure à\n24 volts est très dangereuse pour les humains. Voilà pour-\nquoi on ne doit pas bricoler des appareils électriques bran-\nchés ! On pourra indiquer également qu'il existe des piles\nrechargeables. On distribue alors la fiche élève 3 pour tra-\nvailler sur ces notions.\n\nJe retiens\n\nLa tension électrique n'est pas la même selon la\nsource de l'électricité : de 1,5 à 9 volts pour une pile,\nde 12 à 24 volts pour la batterie d'un véhicule et jusqu'à\n220 volts pour le réseau électrique.\n\n« Au dela de 24 volts, la tension électrique est dange-\nreuse pour les êtres humains.\n\nMots à retenir\n\nÉlectricité\nBatterie Pile\nTension électrique\n\nSecteur\n\nVolt\nRéseau électrique\nRisque d'électrocution\n\n228 » Les objets techniques, qu'est-ce que c'est ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
        phases: [
          {
            title: "Je recherche",
            detail:
              "Les élèves sont placés par groupes de 4. Ils ont à leur dis-\nposition des feuilles blanches format AS. Ils reçoivent la\nconsigne suivante : « Vous allez réfléchir à des gestes à ne\npas faire parce qu'ils présentent des risques pour vous, des\nrisques liés à l'électricité. Vous dessinerez ces gestes dange-\nreux sur une feuille (une feuille = un geste) en ajoutant un\ntriangle rouge dans un coin de celle-ci. Si au contraire vous\ndessinez un bon geste sur une feuille, un geste qui vous met\nen sécurité, alors vous dessinerez cette fois-ci un rond vert\ndans un angle de la feuille. »\nChaque groupe peut bien sûr faire plusieurs dessins. Après\nun temps de travail dans les groupes, on se rassemble et\nchaque groupe présente et explique ses dessins. Ceux-ci\nsont fixés au tableau en deux colonnes : actions dange-\nreuses — actions sécurisées.\nL'enseignant-e distribue alors la fiche documentaire 1 qui\npermet de faire le tour de nombreuses situations liées aux\ndangers de l'électricité. Cette fiche est lue collectivement\net explicitée. Elle se découpe et se plie pour former un petit\nlivret précieux, à conserver, sur les précautions à prendre.\nPuis l'enseignant-e distribue la fiche élève 1 sur laquelle les\nélèves travaillent individuellement.\n\nB. : Il peut être judicieux d'évoquer le rôle du disjoncteur\ndans une maison, et de montrer, pourquoi pas, celui de l'école.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "« L'électricité peut être très dangereuse. Elle peut pas-\nser dans notre corps et provoquer un arrêt du cœur par\nélectrocution.\n\n«Il est important de toujours respecter les règles de\nsécurité qui ont été données.\n\nLes objets techniques, qu'est-ce que c'est ? « 227\n\nFiche enseignant\n\n ae\n\nSavoir qu'il existe de nombreux objets utilisant l'électri-\ncité et les classer selon la source d'énergie utilisée.\nIdentifier ce que produit l'électricité : chaleur, mouve-\nment, son ou lumière.\n\nMatériel : appareils fonctionnant avec des piles, des batte-\nries, l'électricité du secteur.\n\n@",
          },
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e a apporté en classe plusieurs objets ou\nappareils fonctionnant avec des piles, des batteries ou avec\nle secteur : montre, lampe, téléphone, mixeur, radio-révei\nOn demande alors aux élèves :\n\nSaurez-vous trouver un point commun et une différence\nentre tous ces objets ?\n\nOn peut attendre des élèves les réponses suivantes : « ces\nobjets fonctionnent tous à l'électricité », « il faut les bran-\ncher pour que ça marche ! », « non, pas tous, dans certains\nily a une pile ! », « ou une batterie ! ».\n\n@",
          },
          {
            title: "Je recherche",
            detail:
              "L'enseignant-e propose de classer les objets en trois\nfamilles. Ils fonctionnent tous avec de l'électricité mais les\ngénérateurs (ce qui produit l'électricité) sont différents :\npour certains, il faut les brancher sur le secteur pour les\nalimenter ; d'autres puisent leur électricité dans une pile ;\nenfin les derniers ont une batterie (ou accumulateur) qui\npeut être rechargée. On propose aux élèves de recher-\ncher d'autres objets fonctionnant avec ces trois solutions.\nLes objets sont notés sur une affiche dans trois colonnes.\nDans un second temps, l'enseignant-e demande aux élèves\nde rechercher en quoi est transformée l'électricité dans\nchacun de ces appareils. Ce peut être en lumière, en chaleur,\nen mouvement, en son.\n\nLa fiche élève 2 est distribuée pour fixer ces connaissances.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "«De nombreux objets autour de nous fonctionnent\ngrâce à l'électricité.\n« l'électricité peut être fournie par une pile, une batterie\nou encore par le réseau électrique.\n« l'électricité peut être transformée en chaleur, mouve-\nment, son ou lumière.\n\n TT\n\nDécouvrir quelques idées de grandeurs’ électriques\n(Voltage) : différence entre plusieurs formats de piles.\n\nMatériel : différents formats de piles.\n\na8",
          },
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e présente aux élèves les différentes piles puis\non interroge les élèves :\n\n| Que voyez-vous ? Que remarquez-vous ?\n\nOn peut attendre les réponses suivantes : « ce sont des\npiles », « elles n'ont pas toutes la même forme », « il y en\nà de plus grosses que d'autres », « c'est parce qu'elles ont\nplus de puissance ! »\n\nL'enseignant-e recense les différentes réponses des élèves\npuis leur demande de former des binômes afin d'observer\nles différentes piles apportées.\n\nP=",
          },
          {
            title: "J'observe",
            detail:
              "L'enseignant-e distribue à chaque binôme une de ces piles\nen mentionnant qu'il ne faut pas les porter à la bouche ni\nles détériorer d’une façon ou d’une autre. Les élèves vont\nétudier « leur » pile et repérer les différents formats (D, C,\nAA, AAA, AAAA), le pôle +, le pôle —, la tension électrique\nfournie (1,5 volt, 4,5 volts, 9 volts) à mettre en relation avec\nles 220 volts du secteur.\n\nL'enseignant-e rappelle qu'une tension supérieure à\n24 volts est très dangereuse pour les humains. Voilà pour-\nquoi on ne doit pas bricoler des appareils électriques bran-\nchés ! On pourra indiquer également qu'il existe des piles\nrechargeables. On distribue alors la fiche élève 3 pour tra-\nvailler sur ces notions.",
          },
          {
            title: "Je retiens",
            detail:
              "La tension électrique n'est pas la même selon la\nsource de l'électricité : de 1,5 à 9 volts pour une pile,\nde 12 à 24 volts pour la batterie d'un véhicule et jusqu'à\n220 volts pour le réseau électrique.\n\n« Au dela de 24 volts, la tension électrique est dange-\nreuse pour les êtres humains.\n\nMots à retenir\n\nÉlectricité\nBatterie Pile\nTension électrique\n\nSecteur\n\nVolt\nRéseau électrique\nRisque d'électrocution\n\n228 » Les objets techniques, qu'est-ce que c'est ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
          },
        ],
      },
    ],
    guideText:
      ") Lélectricité : quels usages, quels dangers ?\n\n= | » Objectifs\n| Connaitre les règles élémentaires de sécurité.\n| « Savoir qu'il existe de nombreux objets utilisant l'électricité et les classer selon la source\n| d'énergie utilisée. |\n| « Identifier ce que produit l'électricité : chaleur, mouvement, son ou lumière.\n| « Découvrir quelques idées de grandeurs électriques (voltage) : différence entre plusieurs\n| formats de piles.\n| > Indications de progression dans le cycle 2\nCe dossier concerne les trois niveaux du cycle, notamment en ce qui concerne les règles\n| élémentaires de sécurité. Une première séance est consacrée aux règles de sécurité : elle\n| est destinée en priorité aux CP-CE1 mais peut-être reprise avec les CE2 bien évidemment.\n| Une deuxième séance destinée aux CE1 porte sur les nombreux objets utilisant l'électri-\n| cité, leurs différentes sources et ce qu'ils peuvent produire (chaleur, mouvement, son ou\n| lumière). Enfin, une troisième séance spécifique aux CE2 permet d'appréhender la notion\n| de grandeur électrique.\n|\n~~ | » Matériel\n| La matériel nécessaire est indiqué dans chaque séance. J\n\nséance 1 PIRE)\n\nAvoir des notions sur la sécurité dans l'usage de l'électri-\ncité au quotidien et savoir que le passage de l'électricité\ndans le corps humain présente des dangers qui peuvent\nêtre mortels. Aborder le risque d’électrocution.\n\njem interroge\n\nL'enseignant-e propose aux élèves, pour lancer ce dossier,\nun pictogramme (— sur CD-Rom) présent notamment sur\nles transformateurs électriques EDF.\n\nOn demande aux élèves :\n\n| Savez-vous ce que représente\n\nce pictogramme ?\n\nOù peut-on le trouver ? Que signifie-t-il ?\nOn peut attendre les réponses suivantes : « c'est pour faire\nattention à l'électricité », « c'est dangereux, on peut se\nfaire tuer », « je l'ai vu sur une grosse armoire dans la rue »\nL'enseignant-e précise qu’effectivement ce pictogramme\nreprésente un danger électrique. Si un courant électrique\nfort traverse notre corps, on peut être électrocuté, c'est-à-\ndire que le passage du courant électrique dans notre corps\npeut entrainer un arrêt du cœur et donc la mort.\nL'enseignant-e interroge à nouveau les élèves :\n\nY a-t-il des risques à la maison ou à l’école avec\nl'électricité ? Quels sont les bons gestes à connaitre\npour être en sécurité ?\n\nLes élèves peuvent avancer : « il ne faut pas mettre ses\ndoigts dans les prises », « il ne faut pas utiliser un appareil\nélectrique près de l'eau... » L'enseignant-e propose alors de\nréfléchir aux différents dangers électriques à la maison, à\nl’école, dans la rue.\n\n© MOI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nJe recherche\n\nLes élèves sont placés par groupes de 4. Ils ont à leur dis-\nposition des feuilles blanches format AS. Ils reçoivent la\nconsigne suivante : « Vous allez réfléchir à des gestes à ne\npas faire parce qu'ils présentent des risques pour vous, des\nrisques liés à l'électricité. Vous dessinerez ces gestes dange-\nreux sur une feuille (une feuille = un geste) en ajoutant un\ntriangle rouge dans un coin de celle-ci. Si au contraire vous\ndessinez un bon geste sur une feuille, un geste qui vous met\nen sécurité, alors vous dessinerez cette fois-ci un rond vert\ndans un angle de la feuille. »\nChaque groupe peut bien sûr faire plusieurs dessins. Après\nun temps de travail dans les groupes, on se rassemble et\nchaque groupe présente et explique ses dessins. Ceux-ci\nsont fixés au tableau en deux colonnes : actions dange-\nreuses — actions sécurisées.\nL'enseignant-e distribue alors la fiche documentaire 1 qui\npermet de faire le tour de nombreuses situations liées aux\ndangers de l'électricité. Cette fiche est lue collectivement\net explicitée. Elle se découpe et se plie pour former un petit\nlivret précieux, à conserver, sur les précautions à prendre.\nPuis l'enseignant-e distribue la fiche élève 1 sur laquelle les\nélèves travaillent individuellement.\n\nB. : Il peut être judicieux d'évoquer le rôle du disjoncteur\ndans une maison, et de montrer, pourquoi pas, celui de l'école.\n\n2 Je retiens\n\n« L'électricité peut être très dangereuse. Elle peut pas-\nser dans notre corps et provoquer un arrêt du cœur par\nélectrocution.\n\n«Il est important de toujours respecter les règles de\nsécurité qui ont été données.\n\nLes objets techniques, qu'est-ce que c'est ? « 227\n\nFiche enseignant\n\n ae\n\nSavoir qu'il existe de nombreux objets utilisant l'électri-\ncité et les classer selon la source d'énergie utilisée.\nIdentifier ce que produit l'électricité : chaleur, mouve-\nment, son ou lumière.\n\nMatériel : appareils fonctionnant avec des piles, des batte-\nries, l'électricité du secteur.\n\n@ Je m’interroge\n\nL'enseignant-e a apporté en classe plusieurs objets ou\nappareils fonctionnant avec des piles, des batteries ou avec\nle secteur : montre, lampe, téléphone, mixeur, radio-révei\nOn demande alors aux élèves :\n\nSaurez-vous trouver un point commun et une différence\nentre tous ces objets ?\n\nOn peut attendre des élèves les réponses suivantes : « ces\nobjets fonctionnent tous à l'électricité », « il faut les bran-\ncher pour que ça marche ! », « non, pas tous, dans certains\nily a une pile ! », « ou une batterie ! ».\n\n@ Je recherche\n\nL'enseignant-e propose de classer les objets en trois\nfamilles. Ils fonctionnent tous avec de l'électricité mais les\ngénérateurs (ce qui produit l'électricité) sont différents :\npour certains, il faut les brancher sur le secteur pour les\nalimenter ; d'autres puisent leur électricité dans une pile ;\nenfin les derniers ont une batterie (ou accumulateur) qui\npeut être rechargée. On propose aux élèves de recher-\ncher d'autres objets fonctionnant avec ces trois solutions.\nLes objets sont notés sur une affiche dans trois colonnes.\nDans un second temps, l'enseignant-e demande aux élèves\nde rechercher en quoi est transformée l'électricité dans\nchacun de ces appareils. Ce peut être en lumière, en chaleur,\nen mouvement, en son.\n\nLa fiche élève 2 est distribuée pour fixer ces connaissances.\n\n2 Je retiens\n«De nombreux objets autour de nous fonctionnent\ngrâce à l'électricité.\n« l'électricité peut être fournie par une pile, une batterie\nou encore par le réseau électrique.\n« l'électricité peut être transformée en chaleur, mouve-\nment, son ou lumière.\n\n TT\n\nDécouvrir quelques idées de grandeurs’ électriques\n(Voltage) : différence entre plusieurs formats de piles.\n\nMatériel : différents formats de piles.\n\na8 Je m’interroge\n\nL'enseignant-e présente aux élèves les différentes piles puis\non interroge les élèves :\n\n| Que voyez-vous ? Que remarquez-vous ?\n\nOn peut attendre les réponses suivantes : « ce sont des\npiles », « elles n'ont pas toutes la même forme », « il y en\nà de plus grosses que d'autres », « c'est parce qu'elles ont\nplus de puissance ! »\n\nL'enseignant-e recense les différentes réponses des élèves\npuis leur demande de former des binômes afin d'observer\nles différentes piles apportées.\n\nP= J'observe\n\nL'enseignant-e distribue à chaque binôme une de ces piles\nen mentionnant qu'il ne faut pas les porter à la bouche ni\nles détériorer d’une façon ou d’une autre. Les élèves vont\nétudier « leur » pile et repérer les différents formats (D, C,\nAA, AAA, AAAA), le pôle +, le pôle —, la tension électrique\nfournie (1,5 volt, 4,5 volts, 9 volts) à mettre en relation avec\nles 220 volts du secteur.\n\nL'enseignant-e rappelle qu'une tension supérieure à\n24 volts est très dangereuse pour les humains. Voilà pour-\nquoi on ne doit pas bricoler des appareils électriques bran-\nchés ! On pourra indiquer également qu'il existe des piles\nrechargeables. On distribue alors la fiche élève 3 pour tra-\nvailler sur ces notions.\n\nJe retiens\n\nLa tension électrique n'est pas la même selon la\nsource de l'électricité : de 1,5 à 9 volts pour une pile,\nde 12 à 24 volts pour la batterie d'un véhicule et jusqu'à\n220 volts pour le réseau électrique.\n\n« Au dela de 24 volts, la tension électrique est dange-\nreuse pour les êtres humains.\n\nMots à retenir\n\nÉlectricité\nBatterie Pile\nTension électrique\n\nSecteur\n\nVolt\nRéseau électrique\nRisque d'électrocution\n\n228 » Les objets techniques, qu'est-ce que c'est ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
    guidePageDecisions: [
      {
        page: 227,
        confidence: 93,
        score: 22,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "par groupes",
        ],
        phaseMarkers: ["je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on demande", "par groupes", "groupe"],
        studentLike: true,
      },
      {
        page: 228,
        confidence: 92,
        score: 20,
        included: true,
        strongMarkers: ["l'enseignant", "enseignant-e", "les eleves", "aux eleves", "en classe"],
        phaseMarkers: ["je m'interroge", "j'observe", "je recherche", "je retiens"],
        teacherLanguageMarkers: [
          "enseignant",
          "eleves",
          "on demande",
          "on propose",
          "on interroge",
          "on distribue",
          "en classe",
        ],
        studentLike: false,
      },
      {
        page: 229,
        confidence: 61,
        score: 1,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: false,
      },
    ],
    skippedProbePages: [229],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-18",
    dossierNumber: 18,
    partNumber: 4,
    partTitle: "Les objets techniques, qu'est-ce que c'est ?",
    title: "Prêt(e) pour le défi techno ?",
    guidePages: [237, 238, 239],
    guidePageCount: 3,
    objectives: [
      "« Suivre la notice d'assemblage d'un objet technique à utiliser.",
      "+ Suivre un schéma de montage pour réaliser un objet technique comportant un circuit",
      "électrique (maquette de maison, quizz simple).",
    ],
    progressionNote:
      "Ce dossier est destiné aux CE1-CE2. Au CE1, il s'agit de réaliser un objet technique à partir\nd'une notice d'assemblage. Au CE2, l'élève réalise un objet technique qui comporte un cir-\ncuit électrique. Nous proposons trois séances : l'une pour construire un objet technique qui\navance grâce à l'air (CE1), les deux autres pour réaliser, au choix, deux objets techniques\ncomportant un circuit électrique (CE2). Ce dossier ne comporte pas de fiches élève, sachant\nque l’objet technique à réaliser constitue le travail des élèves. Deux fiches d'évaluation",
    material: [
      "CE1 et CE2) sont axées sur la méthodologie pour réaliser un objet technique.",
      "Le matériel nécessaire est indiqué dans chaque séance.",
    ],
    sessions: [
      {
        number: 1,
        title:
          "Suivre la notice d'assemblage d'un objet technique à utiliser : réaliser un véhicule qui avance grâce à l'air. Matériel : bouchons de bouteille, en plastique, en liège, pics",
        rawText:
          "| Séance 1 FT]\n\nSuivre la notice d'assemblage d'un objet technique à\nutiliser : réaliser un véhicule qui avance grâce à l'air.\n\nMatériel : bouchons de bouteille, en plastique, en liège, pics\nà brochette, ballons de baudruche, scotch, petite bouteille\nd'eau de 50 cl, planchettes de bois, carton, pailles, colle,\nruban adhésif, patafix, carton plume, petites boites de\ncéréales ou équivalent.\n\na Je m'interroge\n\nL'enseignant-e rappelle aux élèves qu'ils ont déjà travaillé\nsur l'air (dossier 4) et que l'air peut mettre en mouvement\ndes objets. On demande alors :\n\nComment construire un véhicule qui avance grâce à l'air\net qui roule le plus loin possible ?\n\nAprès avoir lancé ce défi, l'enseignant-e demande aux\nélèves de se placer par deux pour tenter de le résoudre !\n\nLP J'expérimente\n\nOn présente le matériel à disposition. Les élèves sont placés\npar groupes de 2. Ils réfléchissent au véhicule qu'ils veulent\nconstruire. Ils peuvent bien sûr prendre le temps d'observer\nle matériel à disposition. Ils dessinent alors leur projet et\nle présentent à l'enseignant-e. On peut leur faire remar-\nquer telle ou telle difficulté mal précisée sur le schéma. Par\nexemple : « Comment sont fixées les roues ? Pourront-elles\ntourner ? Comment le ballon est-il attaché ?... »\n\nLorsque ces obstacles sont levés, a priori, le groupe s'em-\npare du matériel et réalise son prototype.\n\nIl est vraisemblable que certains groupes ne parviendront\npas à réaliser un véhicule fonctionnel. L'enseignant-e\nleur distribue alors la fiche documentaire 1 proposant le\nschéma de montage d'un véhicule et leur propose de réali-\nser le véhicule décrit.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nQuand les différents groupes ont réalisé leur objet, on com-\npare leurs performances en recherchant des explications\naux problèmes rencontrés.\n\n2 Je retiens\n\n= On peut, en associant différents éléments existants,\nréaliser un objet technique comme par exemple un\nvéhicule qui avance grâce à l'air.\n+ Un schéma de montage permet d'expliquer les diffé-\nrentes étapes de sa construction.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e rappelle aux élèves qu'ils ont déjà travaillé\nsur l'air (dossier 4) et que l'air peut mettre en mouvement\ndes objets. On demande alors :\n\nComment construire un véhicule qui avance grâce à l'air\net qui roule le plus loin possible ?\n\nAprès avoir lancé ce défi, l'enseignant-e demande aux\nélèves de se placer par deux pour tenter de le résoudre !\n\nLP",
          },
          {
            title: "J'expérimente",
            detail:
              "On présente le matériel à disposition. Les élèves sont placés\npar groupes de 2. Ils réfléchissent au véhicule qu'ils veulent\nconstruire. Ils peuvent bien sûr prendre le temps d'observer\nle matériel à disposition. Ils dessinent alors leur projet et\nle présentent à l'enseignant-e. On peut leur faire remar-\nquer telle ou telle difficulté mal précisée sur le schéma. Par\nexemple : « Comment sont fixées les roues ? Pourront-elles\ntourner ? Comment le ballon est-il attaché ?... »\n\nLorsque ces obstacles sont levés, a priori, le groupe s'em-\npare du matériel et réalise son prototype.\n\nIl est vraisemblable que certains groupes ne parviendront\npas à réaliser un véhicule fonctionnel. L'enseignant-e\nleur distribue alors la fiche documentaire 1 proposant le\nschéma de montage d'un véhicule et leur propose de réali-\nser le véhicule décrit.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nQuand les différents groupes ont réalisé leur objet, on com-\npare leurs performances en recherchant des explications\naux problèmes rencontrés.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "= On peut, en associant différents éléments existants,\nréaliser un objet technique comme par exemple un\nvéhicule qui avance grâce à l'air.\n+ Un schéma de montage permet d'expliquer les diffé-\nrentes étapes de sa construction.",
          },
        ],
      },
      {
        number: 2,
        title:
          "Réaliser un objet technique par association d'éléments existants en suivant un schéma de montage : un quizz électrique.",
        rawText:
          "| Séance 2 FTL\n\nRéaliser un objet technique par association d'éléments\nexistants en suivant un schéma de montage : un quizz\nélectrique.\n\nMatériel : plaque de carton plume (épaisseur 5 mm), ruban\nadhésif, papier aluminium, attaches parisiennes, règle,\ncrayon gris, ampoule 4,5 volts et support d'ampoule, fils\nélectriques, pile plate de 4,5 volts.\n\na8 Je m’interroge\n\nL'enseignant-e propose aux élèves de fabriquer un jeu de\nquestions-réponses (un quizz) électrique. On en explique le\nfonctionnement : sur le côté gauche d'une feuille 8 ques-\ntions, et sur le côté droit de cette même feuille 8 réponses.\nQuand on joint une question et sa réponse, une lampe s'al-\nlume. On interroge alors les élèves :\n\nNous avons déjà travaillé sur les circuits électriques.\nÀ votre avis, de quoi allons-nous avoir besoin pour\n| réaliser ce jeu de questions-réponses électrique ?\n\nLes objets techniques, qu'est-ce que c'est ? o 237\n\nFiche enseignant\n\nOn peut attendre des réponses comme : du fil électrique,\nune pile, une ampoule, un support d'ampoule.\nL'enseignant-e propose alors aux élèves de suivre un schéma\nde montage déjà établi pour réaliser cet objet technique.\n\n[1] J'expérimente\n\nOn place les élèves par groupes de 2. Le matériel néces-\nsaire à la réalisation du jeu est dans un carton mais n'est\npas visible des élèves. On distribue alors la fiche docu-\nmentaire 2 et on propose aux élèves de leur fournir, à leur\ndemande, le matériel demandé sur le schéma de montage.\nLes groupes réalisent alors le quizz. L'enseignant-e circule\nentre les groupes pour apporter son aide si nécessaire.\nLorsqu'un groupe a terminé le montage électrique, il peut\nse consacrer à la rédaction des 8 questions/réponses de son\njeu (par exemple les animaux et leurs petits, des questions\nde conjugaison, des associations de synonymes, du vocabu-\nlaire en anglais associé à un dessin...).\n\n2 Je retiens\n\n- On peut, en associant différents éléments existants,\nréaliser un objet technique comprenant un circuit\nélectrique.\n\n* Un schéma de montage permet d'expliquer les diffé-\nrentes étapes de sa construction.\n\n+ Dans l'exemple du quizz électrique, lorsque le circuit\nélectrique est fermé (bonne réponse), la lampe s'allume.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e propose aux élèves de fabriquer un jeu de\nquestions-réponses (un quizz) électrique. On en explique le\nfonctionnement : sur le côté gauche d'une feuille 8 ques-\ntions, et sur le côté droit de cette même feuille 8 réponses.\nQuand on joint une question et sa réponse, une lampe s'al-\nlume. On interroge alors les élèves :\n\nNous avons déjà travaillé sur les circuits électriques.\nÀ votre avis, de quoi allons-nous avoir besoin pour\n| réaliser ce jeu de questions-réponses électrique ?\n\nLes objets techniques, qu'est-ce que c'est ? o 237\n\nFiche enseignant\n\nOn peut attendre des réponses comme : du fil électrique,\nune pile, une ampoule, un support d'ampoule.\nL'enseignant-e propose alors aux élèves de suivre un schéma\nde montage déjà établi pour réaliser cet objet technique.\n\n[1]",
          },
          {
            title: "J'expérimente",
            detail:
              "On place les élèves par groupes de 2. Le matériel néces-\nsaire à la réalisation du jeu est dans un carton mais n'est\npas visible des élèves. On distribue alors la fiche docu-\nmentaire 2 et on propose aux élèves de leur fournir, à leur\ndemande, le matériel demandé sur le schéma de montage.\nLes groupes réalisent alors le quizz. L'enseignant-e circule\nentre les groupes pour apporter son aide si nécessaire.\nLorsqu'un groupe a terminé le montage électrique, il peut\nse consacrer à la rédaction des 8 questions/réponses de son\njeu (par exemple les animaux et leurs petits, des questions\nde conjugaison, des associations de synonymes, du vocabu-\nlaire en anglais associé à un dessin...).\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "- On peut, en associant différents éléments existants,\nréaliser un objet technique comprenant un circuit\nélectrique.\n\n* Un schéma de montage permet d'expliquer les diffé-\nrentes étapes de sa construction.\n\n+ Dans l'exemple du quizz électrique, lorsque le circuit\nélectrique est fermé (bonne réponse), la lampe s'allume.",
          },
        ],
      },
      {
        number: 3,
        title:
          "Réaliser un objet technique par association d'éléments existants en suivant un schéma de montage : un jeu d'adresse électrique.",
        rawText:
          "| séance 3 FFT]\n\nRéaliser un objet technique par association d'éléments\nexistants en suivant un schéma de montage : un jeu\nd'adresse électrique.\n\nMatériel : plaque de contreplaqué 30 x 10 cm percée de\ndeux trous, 2 clous, du fil de fer ou de cuivre (diamètre\n2-3 mm), ampoule 4,5 volts et support d'ampoule, fils élec-\ntriques, pile plate de 4,5 volts.\n\nN.B. : Cette troisième séance est une alternative à la",
        phases: [
          {
            title: "Séance 3",
            detail:
              "| séance 3 FFT]\n\nRéaliser un objet technique par association d'éléments\nexistants en suivant un schéma de montage : un jeu\nd'adresse électrique.\n\nMatériel : plaque de contreplaqué 30 x 10 cm percée de\ndeux trous, 2 clous, du fil de fer ou de cuivre (diamètre\n2-3 mm), ampoule 4,5 volts et support d'ampoule, fils élec-\ntriques, pile plate de 4,5 volts.\n\nN.B. : Cette troisième séance est une alternative à la",
          },
        ],
      },
      {
        number: 2,
        title: "trique à réaliser au CE2 : quizz ou jeu d'adresse. Mots à retenir Objet technique",
        rawText:
          "séance 2. Vous avez donc le choix de l'objet technique élec-\ntrique à réaliser au CE2 : quizz ou jeu d'adresse.\n\nMots à retenir\n\nObjet technique\nSchéma de montage\n\nGE Je m° interroge\n\nL'enseignant-e propose aux élèves de fabriquer un jeu\nd'adresse électrique. On en explique d'abord le fonctionne-\nment : on doit suivre un circuit tortueux réalisé en fil de fer\nou de cuivre avec un anneau. Si l’anneau touche le circuit,\nune lampe s'allume et c'est perdu ! On interroge les élèves :\n\n[| Nous avons déjà travaillé sur les circuits électriques.\n| A votre avis, de quoi allons-nous avoir besoin pour\n| réaliser ce jeu d'adresse électrique ?\n\nOn peut attendre des réponses comme : du fil électrique,\ndu fil de fer ou de cuivre, une pile, une ampoule, un support\nd'ampoule.\n\nL'enseignant-e propose alors aux élèves de suivre un\nschéma de montage déjà établi.\n\nŒ Je recherche\n\nOn place les élèves par groupes de 2. Le matériel néces-\nsaire à la réalisation du jeu est dans un carton mais n’est\npas visible des élèves. L'enseignant-e distribue alors la\nfiche documentaire 3 qui présente le schéma de montage\net propose aux élèves de leur fournir, à leur demande, le\nmatériel demandé sur ce schéma de montage.\n\nLes groupes réalisent alors le jeu d'adresse. L'enseignant-e\ncircule entre les groupes pour apporter son aide si\nnécessaire.\n\nLorsqu'un groupe a terminé le montage électrique, il le\nteste. On peut envisager de chronométrer les parcours.\n\n[9 | Je retiens\n» Dans un jeu d'adresse électrique, lorsque le joueur\ntouche le circuit à parcourir avec l'anneau, le circuit élec-\ntrique est fermé et la lampe s'allume indiquant la faute.\n\nCircuit électrique\nNotice d'assemblage\n\n238 + Les objets techniques, qu'est-ce que c'est ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n+\n\n~~\n\n18) Es-tu prét(e) pour le défi techno ?\n\nFabriquer un véhicule qui avance grâce a l'air\n\n_\nmmm Le matériel dont tu as besoin -------------------\ne 1 carton plume ou carton rigide (15 cm x 10 cm)\ne 1 boite individuelle de céréales vide ou une grande boite\nd'allumettes vide\n© 4 bouchons en plastique\ne 2 piques à brochette de longueur 13 cm\ne 2 pailles rigides de longueur 10 cm\ne 1 ballon de baudruche\n_ e du ruban adhésif\ne de la colle (colle forte ou colle chaude de préférence)\ne 1 clou\n© 1 morceau de paille de longueur 6 cm\nJ — Les étapes pour fabriquer ton objet technique ---------------—,A\n| (1) Prépare les différentes pièces nécessaires. !\n| Tu peux demander à ton enseignant-e de t'aider à découper le carton. |\n— _ . o Le support |\n! La plateforme Les 2 trains de roues © supp !\n! (plaque de carton (roues solidaires) (boite d'allumettes) !\n! rectangulaire) {\n eS Le « moteur à air »\ni (ballon) i\n| @ Colle la boite sur le rectangle\ni de carton le long d'un petit côté. i\nv | |\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement. Les objets techniques, qu'est-ce que c'est ? o 239",
        phases: [
          {
            title: "Je recherche",
            detail:
              "On place les élèves par groupes de 2. Le matériel néces-\nsaire à la réalisation du jeu est dans un carton mais n’est\npas visible des élèves. L'enseignant-e distribue alors la\nfiche documentaire 3 qui présente le schéma de montage\net propose aux élèves de leur fournir, à leur demande, le\nmatériel demandé sur ce schéma de montage.\n\nLes groupes réalisent alors le jeu d'adresse. L'enseignant-e\ncircule entre les groupes pour apporter son aide si\nnécessaire.\n\nLorsqu'un groupe a terminé le montage électrique, il le\nteste. On peut envisager de chronométrer les parcours.\n\n[9 |",
          },
          {
            title: "Je retiens",
            detail:
              "» Dans un jeu d'adresse électrique, lorsque le joueur\ntouche le circuit à parcourir avec l'anneau, le circuit élec-\ntrique est fermé et la lampe s'allume indiquant la faute.\n\nCircuit électrique\nNotice d'assemblage\n\n238 + Les objets techniques, qu'est-ce que c'est ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n+\n\n~~\n\n18) Es-tu prét(e) pour le défi techno ?\n\nFabriquer un véhicule qui avance grâce a l'air\n\n_\nmmm Le matériel dont tu as besoin -------------------\ne 1 carton plume ou carton rigide (15 cm x 10 cm)\ne 1 boite individuelle de céréales vide ou une grande boite\nd'allumettes vide\n© 4 bouchons en plastique\ne 2 piques à brochette de longueur 13 cm\ne 2 pailles rigides de longueur 10 cm\ne 1 ballon de baudruche\n_ e du ruban adhésif\ne de la colle (colle forte ou colle chaude de préférence)\ne 1 clou\n© 1 morceau de paille de longueur 6 cm\nJ — Les étapes pour fabriquer ton objet technique ---------------—,A\n| (1) Prépare les différentes pièces nécessaires. !\n| Tu peux demander à ton enseignant-e de t'aider à découper le carton. |\n— _ . o Le support |\n! La plateforme Les 2 trains de roues © supp !\n! (plaque de carton (roues solidaires) (boite d'allumettes) !\n! rectangulaire) {\n eS Le « moteur à air »\ni (ballon) i\n| @ Colle la boite sur le rectangle\ni de carton le long d'un petit côté. i\nv | |\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement. Les objets techniques, qu'est-ce que c'est ? o 239",
          },
        ],
      },
    ],
    guideText:
      "3 | Es-tu prét(e) pour le défi techno ?\n\n» Objectifs )\n\n« Suivre la notice d'assemblage d'un objet technique à utiliser. |\n\n+ Suivre un schéma de montage pour réaliser un objet technique comportant un circuit\nélectrique (maquette de maison, quizz simple).\n\n» Indications de progression dans le cycle 2\n\nCe dossier est destiné aux CE1-CE2. Au CE1, il s'agit de réaliser un objet technique à partir\nd'une notice d'assemblage. Au CE2, l'élève réalise un objet technique qui comporte un cir-\ncuit électrique. Nous proposons trois séances : l'une pour construire un objet technique qui\navance grâce à l'air (CE1), les deux autres pour réaliser, au choix, deux objets techniques |\ncomportant un circuit électrique (CE2). Ce dossier ne comporte pas de fiches élève, sachant\n| que l’objet technique à réaliser constitue le travail des élèves. Deux fiches d'évaluation\n\n» Matériel\n\n(CE1 et CE2) sont axées sur la méthodologie pour réaliser un objet technique.\n\nLe matériel nécessaire est indiqué dans chaque séance.\n\n| Séance 1 FT]\n\nSuivre la notice d'assemblage d'un objet technique à\nutiliser : réaliser un véhicule qui avance grâce à l'air.\n\nMatériel : bouchons de bouteille, en plastique, en liège, pics\nà brochette, ballons de baudruche, scotch, petite bouteille\nd'eau de 50 cl, planchettes de bois, carton, pailles, colle,\nruban adhésif, patafix, carton plume, petites boites de\ncéréales ou équivalent.\n\na Je m'interroge\n\nL'enseignant-e rappelle aux élèves qu'ils ont déjà travaillé\nsur l'air (dossier 4) et que l'air peut mettre en mouvement\ndes objets. On demande alors :\n\nComment construire un véhicule qui avance grâce à l'air\net qui roule le plus loin possible ?\n\nAprès avoir lancé ce défi, l'enseignant-e demande aux\nélèves de se placer par deux pour tenter de le résoudre !\n\nLP J'expérimente\n\nOn présente le matériel à disposition. Les élèves sont placés\npar groupes de 2. Ils réfléchissent au véhicule qu'ils veulent\nconstruire. Ils peuvent bien sûr prendre le temps d'observer\nle matériel à disposition. Ils dessinent alors leur projet et\nle présentent à l'enseignant-e. On peut leur faire remar-\nquer telle ou telle difficulté mal précisée sur le schéma. Par\nexemple : « Comment sont fixées les roues ? Pourront-elles\ntourner ? Comment le ballon est-il attaché ?... »\n\nLorsque ces obstacles sont levés, a priori, le groupe s'em-\npare du matériel et réalise son prototype.\n\nIl est vraisemblable que certains groupes ne parviendront\npas à réaliser un véhicule fonctionnel. L'enseignant-e\nleur distribue alors la fiche documentaire 1 proposant le\nschéma de montage d'un véhicule et leur propose de réali-\nser le véhicule décrit.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nQuand les différents groupes ont réalisé leur objet, on com-\npare leurs performances en recherchant des explications\naux problèmes rencontrés.\n\n2 Je retiens\n\n= On peut, en associant différents éléments existants,\nréaliser un objet technique comme par exemple un\nvéhicule qui avance grâce à l'air.\n+ Un schéma de montage permet d'expliquer les diffé-\nrentes étapes de sa construction.\n\n| Séance 2 FTL\n\nRéaliser un objet technique par association d'éléments\nexistants en suivant un schéma de montage : un quizz\nélectrique.\n\nMatériel : plaque de carton plume (épaisseur 5 mm), ruban\nadhésif, papier aluminium, attaches parisiennes, règle,\ncrayon gris, ampoule 4,5 volts et support d'ampoule, fils\nélectriques, pile plate de 4,5 volts.\n\na8 Je m’interroge\n\nL'enseignant-e propose aux élèves de fabriquer un jeu de\nquestions-réponses (un quizz) électrique. On en explique le\nfonctionnement : sur le côté gauche d'une feuille 8 ques-\ntions, et sur le côté droit de cette même feuille 8 réponses.\nQuand on joint une question et sa réponse, une lampe s'al-\nlume. On interroge alors les élèves :\n\nNous avons déjà travaillé sur les circuits électriques.\nÀ votre avis, de quoi allons-nous avoir besoin pour\n| réaliser ce jeu de questions-réponses électrique ?\n\nLes objets techniques, qu'est-ce que c'est ? o 237\n\nFiche enseignant\n\nOn peut attendre des réponses comme : du fil électrique,\nune pile, une ampoule, un support d'ampoule.\nL'enseignant-e propose alors aux élèves de suivre un schéma\nde montage déjà établi pour réaliser cet objet technique.\n\n[1] J'expérimente\n\nOn place les élèves par groupes de 2. Le matériel néces-\nsaire à la réalisation du jeu est dans un carton mais n'est\npas visible des élèves. On distribue alors la fiche docu-\nmentaire 2 et on propose aux élèves de leur fournir, à leur\ndemande, le matériel demandé sur le schéma de montage.\nLes groupes réalisent alors le quizz. L'enseignant-e circule\nentre les groupes pour apporter son aide si nécessaire.\nLorsqu'un groupe a terminé le montage électrique, il peut\nse consacrer à la rédaction des 8 questions/réponses de son\njeu (par exemple les animaux et leurs petits, des questions\nde conjugaison, des associations de synonymes, du vocabu-\nlaire en anglais associé à un dessin...).\n\n2 Je retiens\n\n- On peut, en associant différents éléments existants,\nréaliser un objet technique comprenant un circuit\nélectrique.\n\n* Un schéma de montage permet d'expliquer les diffé-\nrentes étapes de sa construction.\n\n+ Dans l'exemple du quizz électrique, lorsque le circuit\nélectrique est fermé (bonne réponse), la lampe s'allume.\n\n| séance 3 FFT]\n\nRéaliser un objet technique par association d'éléments\nexistants en suivant un schéma de montage : un jeu\nd'adresse électrique.\n\nMatériel : plaque de contreplaqué 30 x 10 cm percée de\ndeux trous, 2 clous, du fil de fer ou de cuivre (diamètre\n2-3 mm), ampoule 4,5 volts et support d'ampoule, fils élec-\ntriques, pile plate de 4,5 volts.\n\nN.B. : Cette troisième séance est une alternative à la\nséance 2. Vous avez donc le choix de l'objet technique élec-\ntrique à réaliser au CE2 : quizz ou jeu d'adresse.\n\nMots à retenir\n\nObjet technique\nSchéma de montage\n\nGE Je m° interroge\n\nL'enseignant-e propose aux élèves de fabriquer un jeu\nd'adresse électrique. On en explique d'abord le fonctionne-\nment : on doit suivre un circuit tortueux réalisé en fil de fer\nou de cuivre avec un anneau. Si l’anneau touche le circuit,\nune lampe s'allume et c'est perdu ! On interroge les élèves :\n\n[| Nous avons déjà travaillé sur les circuits électriques.\n| A votre avis, de quoi allons-nous avoir besoin pour\n| réaliser ce jeu d'adresse électrique ?\n\nOn peut attendre des réponses comme : du fil électrique,\ndu fil de fer ou de cuivre, une pile, une ampoule, un support\nd'ampoule.\n\nL'enseignant-e propose alors aux élèves de suivre un\nschéma de montage déjà établi.\n\nŒ Je recherche\n\nOn place les élèves par groupes de 2. Le matériel néces-\nsaire à la réalisation du jeu est dans un carton mais n’est\npas visible des élèves. L'enseignant-e distribue alors la\nfiche documentaire 3 qui présente le schéma de montage\net propose aux élèves de leur fournir, à leur demande, le\nmatériel demandé sur ce schéma de montage.\n\nLes groupes réalisent alors le jeu d'adresse. L'enseignant-e\ncircule entre les groupes pour apporter son aide si\nnécessaire.\n\nLorsqu'un groupe a terminé le montage électrique, il le\nteste. On peut envisager de chronométrer les parcours.\n\n[9 | Je retiens\n» Dans un jeu d'adresse électrique, lorsque le joueur\ntouche le circuit à parcourir avec l'anneau, le circuit élec-\ntrique est fermé et la lampe s'allume indiquant la faute.\n\nCircuit électrique\nNotice d'assemblage\n\n238 + Les objets techniques, qu'est-ce que c'est ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n+\n\n~~\n\n18) Es-tu prét(e) pour le défi techno ?\n\nFabriquer un véhicule qui avance grâce a l'air\n\n_\nmmm Le matériel dont tu as besoin -------------------\ne 1 carton plume ou carton rigide (15 cm x 10 cm)\ne 1 boite individuelle de céréales vide ou une grande boite\nd'allumettes vide\n© 4 bouchons en plastique\ne 2 piques à brochette de longueur 13 cm\ne 2 pailles rigides de longueur 10 cm\ne 1 ballon de baudruche\n_ e du ruban adhésif\ne de la colle (colle forte ou colle chaude de préférence)\ne 1 clou\n© 1 morceau de paille de longueur 6 cm\nJ — Les étapes pour fabriquer ton objet technique ---------------—,A\n| (1) Prépare les différentes pièces nécessaires. !\n| Tu peux demander à ton enseignant-e de t'aider à découper le carton. |\n— _ . o Le support |\n! La plateforme Les 2 trains de roues © supp !\n! (plaque de carton (roues solidaires) (boite d'allumettes) !\n! rectangulaire) {\n eS Le « moteur à air »\ni (ballon) i\n| @ Colle la boite sur le rectangle\ni de carton le long d'un petit côté. i\nv | |\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement. Les objets techniques, qu'est-ce que c'est ? o 239",
    guidePageDecisions: [
      {
        page: 237,
        confidence: 93,
        score: 24,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "par groupes",
        ],
        phaseMarkers: ["je m'interroge", "j'experimente", "je retiens"],
        teacherLanguageMarkers: [
          "enseignant",
          "eleves",
          "on demande",
          "on interroge",
          "par groupes",
          "groupe",
        ],
        studentLike: true,
      },
      {
        page: 238,
        confidence: 93,
        score: 22,
        included: true,
        strongMarkers: [
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "par groupes",
        ],
        phaseMarkers: ["j'experimente", "je recherche", "je retiens"],
        teacherLanguageMarkers: [
          "enseignant",
          "eleves",
          "on propose",
          "on interroge",
          "on distribue",
          "par groupes",
          "groupe",
        ],
        studentLike: false,
      },
      {
        page: 239,
        confidence: 85,
        score: 4,
        included: true,
        strongMarkers: ["enseignant-e"],
        phaseMarkers: [],
        teacherLanguageMarkers: ["enseignant"],
        studentLike: true,
      },
      {
        page: 240,
        confidence: 84,
        score: -3,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: true,
      },
    ],
    skippedProbePages: [240],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-19",
    dossierNumber: 19,
    partNumber: 4,
    partTitle: "Les objets techniques, qu'est-ce que c'est ?",
    title: "Que peut-on faire avec un ordinateur ?",
    guidePages: [245, 246],
    guidePageCount: 2,
    objectives: [
      "+ Décrire l'architecture simple d'un dispositif informatique.",
      "+ Avoir acquis une familiarisation suffisante avec le traitement de texte et en faire un usage rationnel (en lien avec",
      "le français).",
    ],
    progressionNote:
      "Au CP, il s'agit de découvrir les différents éléments de saisie d'un dispositif informatique (clavier, souris, outil de\ndispositifs informatiques intégrés de type tablettes et récupérer les données par synchronisation. Enfin, au CE2,\nl'élève doit exploiter les données acquises et stockées dans l'ordinateur pour produire un document fini. Cette\nprogression peut être bien sûr adaptée au niveau de chaque élève et de chaque classe. Chaque séance peut être\nmise en pratique par le biais d’une activité de la classe : raconter une sortie scolaire, réaliser la « une » d'un journal.\nDans ce dossier, l'élève va commencer à s'approprier un environnement numérique (ordinateur mais aussi tablette).\nprise de vues) et d'identifier les connexions entre ces éléments. En CET, l'objectif est de mettre en œuvre des\n\\",
    material: [],
    sessions: [
      {
        number: 1,
        title:
          "Décrire l'architecture simple d'un dispositif informatique. Découvrir les différents éléments de saisie d’un disposi- tif informatique (clavier, souris, outils de prise de vues).",
        rawText:
          "Séance 1 JF 1\n\nDécrire l'architecture simple d'un dispositif informatique.\nDécouvrir les différents éléments de saisie d’un disposi-\ntif informatique (clavier, souris, outils de prise de vues).\nIdentifier les connexions entre ces éléments.\n\nE Je m'interroge\nÀ l'occasion d'un travail à mener sur l'ordinateur, l'ensei-\ngnant-e interroge les élèves :\n\nConnaissez-vous les différents éléments qui composent\nun ordinateur ? À quoi servent-ils ?\n\nOn peut attendre des élèves les réponses suivantes : « il y\na des gros ordinateurs et des plus petits qu’on peut trans-\nporter », « mon papa, il a un portable », « ma maman, elle\na une tablette », « sur les ordinateurs, on peut taper des\nmots sur un clavier », « des fois, il y a une souris », « on\nregarde sur un écran », « il y a aussi des fils pour recharger\nla tablette/l'ordinateur », « on peut imprimer des choses »,\n« on peut aussi y mettre des photos, des films et les\nregarder ensuite ».\n\n\\_- Une discussion s'engage. Les élèves pourront dire qu'ils uti-\n\nlisent une tablette, voire l'ordinateur de leurs parents pour\nregarder des dessins animés, des photos, faire des jeux,\nécrire des textes, prendre des photos, etc.\n\nL'enseignant-e propose alors aux élèves d'observer les\ndifférents éléments d'un ordinateur et comment ils sont\nconnectés, c'est-à-dire reliés les uns aux autres.\n\nJ'observe\n\nL'enseignant-e propose donc d'observer un ordinateur de la\nclasse et distribue au même moment la fiche élève 1 qui\npermettra de noter les observations réalisées.\n\nDeux types d'ordinateurs peuvent être étudiés à ce stade :\nun ordinateur portable et un ordinateur avec unité centrale.\nLes deux cas de figures seront comparés dans la fiche élève.\nLes élèves pourront ainsi observer un dispositif informatique\nsimple et trouver les fonctions de chaque élément : un cla-\nvier pour écrire, une souris ou pavé tactile (« TouchPad »)\n\npour se déplacer sur l'écran, une imprimante pour imprimer,\n\ndes haut-parleurs pour avoir du son, un écran pour afficher\net voir ce que l'on fait, une unité centrale pour mettre\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nsous tension l'ordinateur fixe, c'est-à-dire l'allumer, et\nabriter la mémoire. Pour les tablettes et l'ordinateur\nportable, l'unité centrale est intégrée : c'est pour cela que\nc'est moins visible (c'est aussi le cas pour la caméra, le\nlecteur de CD-Rom ou DVD-Rom, la batterie).\n\nOn explique aux élèves et on montre que tous ces éléments\nsont liés et connectés entre eux soit par des fils, soit par\nune connexion sans fil).\n\n2 Je retiens\n\n+ Un ordinateur ou une tablette sont des outils infor-\nmatiques qui permettent de faire beaucoup de choses :\nécrire des textes, voir des photos ou des films, effectuer\ndes recherches sur Internet.\n\n» L'ordinateur est composé de différents éléments :\n\n— une unité centrale pour stocker les informations, c'est\n« la mémoire/le cerveau » de l'ordinateur ;\n\n— un écran pour voir ce que l'on fait/écrit ;\n\n— un clavier pour écrire ;\n\n— une souris ou un pavé tactile (« TouchPad ») pour\ndéplacer « le pointeur », la petite flèche sur l'écran.\n«Tous ces éléments sont reliés entre eux avec des fils\nou sans fil. On appelle cela des connexions.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "À l'occasion d'un travail à mener sur l'ordinateur, l'ensei-\ngnant-e interroge les élèves :\n\nConnaissez-vous les différents éléments qui composent\nun ordinateur ? À quoi servent-ils ?\n\nOn peut attendre des élèves les réponses suivantes : « il y\na des gros ordinateurs et des plus petits qu’on peut trans-\nporter », « mon papa, il a un portable », « ma maman, elle\na une tablette », « sur les ordinateurs, on peut taper des\nmots sur un clavier », « des fois, il y a une souris », « on\nregarde sur un écran », « il y a aussi des fils pour recharger\nla tablette/l'ordinateur », « on peut imprimer des choses »,\n« on peut aussi y mettre des photos, des films et les\nregarder ensuite ».\n\n\\_- Une discussion s'engage. Les élèves pourront dire qu'ils uti-\n\nlisent une tablette, voire l'ordinateur de leurs parents pour\nregarder des dessins animés, des photos, faire des jeux,\nécrire des textes, prendre des photos, etc.\n\nL'enseignant-e propose alors aux élèves d'observer les\ndifférents éléments d'un ordinateur et comment ils sont\nconnectés, c'est-à-dire reliés les uns aux autres.",
          },
          {
            title: "J'observe",
            detail:
              "L'enseignant-e propose donc d'observer un ordinateur de la\nclasse et distribue au même moment la fiche élève 1 qui\npermettra de noter les observations réalisées.\n\nDeux types d'ordinateurs peuvent être étudiés à ce stade :\nun ordinateur portable et un ordinateur avec unité centrale.\nLes deux cas de figures seront comparés dans la fiche élève.\nLes élèves pourront ainsi observer un dispositif informatique\nsimple et trouver les fonctions de chaque élément : un cla-\nvier pour écrire, une souris ou pavé tactile (« TouchPad »)\n\npour se déplacer sur l'écran, une imprimante pour imprimer,\n\ndes haut-parleurs pour avoir du son, un écran pour afficher\net voir ce que l'on fait, une unité centrale pour mettre\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nsous tension l'ordinateur fixe, c'est-à-dire l'allumer, et\nabriter la mémoire. Pour les tablettes et l'ordinateur\nportable, l'unité centrale est intégrée : c'est pour cela que\nc'est moins visible (c'est aussi le cas pour la caméra, le\nlecteur de CD-Rom ou DVD-Rom, la batterie).\n\nOn explique aux élèves et on montre que tous ces éléments\nsont liés et connectés entre eux soit par des fils, soit par\nune connexion sans fil).\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "+ Un ordinateur ou une tablette sont des outils infor-\nmatiques qui permettent de faire beaucoup de choses :\nécrire des textes, voir des photos ou des films, effectuer\ndes recherches sur Internet.\n\n» L'ordinateur est composé de différents éléments :\n\n— une unité centrale pour stocker les informations, c'est\n« la mémoire/le cerveau » de l'ordinateur ;\n\n— un écran pour voir ce que l'on fait/écrit ;\n\n— un clavier pour écrire ;\n\n— une souris ou un pavé tactile (« TouchPad ») pour\ndéplacer « le pointeur », la petite flèche sur l'écran.\n«Tous ces éléments sont reliés entre eux avec des fils\nou sans fil. On appelle cela des connexions.",
          },
        ],
      },
      {
        number: 2,
        title:
          "Mettre en ceuvre des dispositifs informatiques inté- grés de type tablettes et récupérer les données par synchronisation.",
        rawText:
          "Séance 2 IPT)\n\nMettre en ceuvre des dispositifs informatiques inté-\ngrés de type tablettes et récupérer les données par\nsynchronisation.\n\na Je m'interroge\n\nL'enseignant-e prend pour prétexte une sortie ou une acti-\nvité pour laquelle il/elle a pris des photos avec sa tablette ou\nson appareil photo numérique. On interroge alors les élèves :\n\nComment récupérer ces photos et les mettre\nsur l'ordinateur pour pouvoir ensuite les utiliser ?\n\nOn peut attendre les réponses suivantes : « il faut brancher\nl'appareil photo (ou la tablette) sur l'ordinateur », « on\npeut prendre la petite carte de l'appareil photo et la mettre\ndans l'ordinateur ».\n\nLes objets techniques, qu'est-ce que c'est ? o 245\n\nFiche enseignant\n\nL'enseignant-e propose alors d'expérimenter le transfert de\ndonnées à partir d'un appareil photo sur l'ordinateur de la\nclasse.\n\nLP J'expérimente\n\nL'enseignant-e montre aux élèves que deux façons de faire\nsont possibles : 1) extraire la carte mémoire de l'appareil\nphoto et l'introduire directement dans le lecteur de cartes\nmémoire de l'ordinateur ; 2) utiliser un cable pour connec-\nter l'appareil photo (ou la tablette) à l'ordinateur.\n\nSi une boite de dialogue d'exécution automatique s'af-\nfiche, fermez-la. Cliquez ensuite sur « Démarrer ». Puis sur\n« Ordinateur ». Dans l'espace intitulé « Périphériques uti-\nlisant des supports de stockage amovibles », vous visuali-\nsez une icône représentant la carte mémoire ou l'appareil\nphoto. Double-cliquez sur cette icône afin d'accéder au\ndossier de stockage de vos photos (DCIM) puis double-\ncliquez sur les dossiers pour obtenir vos photos.\nSélectionnez les photos que vous souhaitez importer. Faites\nun clic droit dans la sélection puis cliquez sur « Copier ».\nOuvrez le dossier dans lequel vous souhaitez importer vos\nimages, (dossier à créer et nommer au préalable dans le\ndossier « Images » de l'ordinateur) faites un clic droit et\ncliquez sur « Coller ». Une copie des photos sélectionnées\nse trouve désormais sur votre ordinateur.\n\nCes manipulations peuvent alors être réalisées par les\nélèves, par groupe (en fonction du nombre d'ordinateurs\ndisponibles) tandis que les autres élèves travaillent sur la\nfiche élève 2 distribuée par l'enseignant-e.\n\nL2 Je retiens\n\n+ On peut prendre des photos (ou des vidéos) avec un\nappareil photo ou une tablette. On peut les transférer\nsur un ordinateur soit en le connectant avec l'appareil\nphoto/la tablette ou en y insérant la carte mémoire de\nl'appareil photo.\n\n* Les photos (et les vidéos) peuvent êtres mises dans un\ndossier sur l'ordinateur afin de les retrouver facilement.\nOn pourra par la suite intégrer les photos à un docu-\nment ou les imprimer.\n\n ase\n\nExploiter les données acquises et stockées dans l'ordina-\nteur pour produire un document fini.\nAvoir acquis une familiarisation suffisante avec le trai-\ntement de texte et en faire un usage rationnel (en lien\navec le français).\n\nN. B. : Nous vous proposons pour cette séance une fiche\ndocumentaire 1 qui reproduit un clavier d'ordinateur. Nous\nvous conseillons de la plastifier et de l'utiliser comme fiche\nressource lorsque les élèves font du traitement de texte.\n\nMots à retenir\n\n8 Je m'interroge\n\nL'enseignant-e propose aux élèves de réaliser la « une » (la\npremière page) d'un journal de classe afin de raconter une\nsortie, une activité ou un événement particulier. De ce fait,\non interroge les élèves :\n\nTout d'abord, comment retrouver les photos qui\nsont sur l'ordinateur (si vous en avez prises) ?\nEnsuite, comment allez-vous insérer ces photos\nà votre document (la « une » d'un journal) ?\n\nLes élèves vont pouvoir répondre que les photos sont ran-\ngées dans « Mes images » et que le dossier se nomme\n« Sortie XXX » par exemple. On pourra cliquer sur « Insérer\nune image » ou alors faire un « copier/coller ».\nL'enseignant-e montre la « une » du journal Mon Petit\nQuotidien (— sur CD-Rom). On relève ensemble les élé-\nments essentiels constitutifs d'une « une » : il y a des titres,\nle texte peut être en couleur, la taille du texte varie, la forme\ndes lettres aussi, il y a des images, des photos...\n\nPour faire une « une » de journal, il faut donc écrire un ou\nplusieurs petits textes. Il est possible de mettre des cou-\nleurs, des tailles de polices différentes.\n\nL'enseignant-e propose alors de réaliser la « une » d'un\njournal à l'aide de la fiche élève 3.\n\n@ Je recherche\n\nL’enseignant-e distribue aux élèves la fiche documen-\ntaire 2. On précise alors qu'il est possible de réaliser une\n« une » simplifiée. Que faut-il absolument garder ? Les\nélèves vont proposer le titre du journal, la grande photo, le\ntitre de l'article : ce seront les éléments de base. Les élèves\nles plus à l'aise pourront peut être aussi placer le petit texte\nqui introduit l'article, la date, la carte météo... On découvre\net observe les différentes polices utilisées ainsi que la mise\nen page. On fixe ainsi ce vocabulaire.\n\nLes élèves vont ensuite répondre à des questions sur la fiche\nélève 3 afin d'imaginer à quoi ressemblera leur « une » :\nchoix de la police, taille des caractères, insertion de pho-\ntos, mise en page... Ils peuvent travailler en parallèle sur une\nfeuille blanche afin de réaliser le crayonné de leur « une ».\n\n2 Je retiens\n\n* Le traitement de texte permet de mettre en forme du\ntexte et des images pour réaliser un document comme\nla « une » d'un journal, une affiche, une couverture de\nclasseur, une présentation pour la classe.\n\n« Pour le texte, on peut choisir une ou plusieurs polices,\nmettre en forme les caractères (taille, gras, italique, sou-\nligné) et le placer dans la page (à gauche, à droite, centrer).\n* Pour les photos stockées sur l'ordinateur, on peut\nles retrouver dans un dossier et les insérer dans le\ndocument créé. Il faut bien sûr penser à enregistrer son\ntravail pour pouvoir le retrouver par la suite !\n\nOrdinateur\nTraitement de texte\n\nTablette\nMise en page\n\nConnexions\n\nPhotos Vidéos\n\n246 » Les objets techniques, qu'est-ce que c'est ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e prend pour prétexte une sortie ou une acti-\nvité pour laquelle il/elle a pris des photos avec sa tablette ou\nson appareil photo numérique. On interroge alors les élèves :\n\nComment récupérer ces photos et les mettre\nsur l'ordinateur pour pouvoir ensuite les utiliser ?\n\nOn peut attendre les réponses suivantes : « il faut brancher\nl'appareil photo (ou la tablette) sur l'ordinateur », « on\npeut prendre la petite carte de l'appareil photo et la mettre\ndans l'ordinateur ».\n\nLes objets techniques, qu'est-ce que c'est ? o 245\n\nFiche enseignant\n\nL'enseignant-e propose alors d'expérimenter le transfert de\ndonnées à partir d'un appareil photo sur l'ordinateur de la\nclasse.\n\nLP",
          },
          {
            title: "J'expérimente",
            detail:
              "L'enseignant-e montre aux élèves que deux façons de faire\nsont possibles : 1) extraire la carte mémoire de l'appareil\nphoto et l'introduire directement dans le lecteur de cartes\nmémoire de l'ordinateur ; 2) utiliser un cable pour connec-\nter l'appareil photo (ou la tablette) à l'ordinateur.\n\nSi une boite de dialogue d'exécution automatique s'af-\nfiche, fermez-la. Cliquez ensuite sur « Démarrer ». Puis sur\n« Ordinateur ». Dans l'espace intitulé « Périphériques uti-\nlisant des supports de stockage amovibles », vous visuali-\nsez une icône représentant la carte mémoire ou l'appareil\nphoto. Double-cliquez sur cette icône afin d'accéder au\ndossier de stockage de vos photos (DCIM) puis double-\ncliquez sur les dossiers pour obtenir vos photos.\nSélectionnez les photos que vous souhaitez importer. Faites\nun clic droit dans la sélection puis cliquez sur « Copier ».\nOuvrez le dossier dans lequel vous souhaitez importer vos\nimages, (dossier à créer et nommer au préalable dans le\ndossier « Images » de l'ordinateur) faites un clic droit et\ncliquez sur « Coller ». Une copie des photos sélectionnées\nse trouve désormais sur votre ordinateur.\n\nCes manipulations peuvent alors être réalisées par les\nélèves, par groupe (en fonction du nombre d'ordinateurs\ndisponibles) tandis que les autres élèves travaillent sur la\nfiche élève 2 distribuée par l'enseignant-e.\n\nL2",
          },
          {
            title: "Je retiens",
            detail:
              "+ On peut prendre des photos (ou des vidéos) avec un\nappareil photo ou une tablette. On peut les transférer\nsur un ordinateur soit en le connectant avec l'appareil\nphoto/la tablette ou en y insérant la carte mémoire de\nl'appareil photo.\n\n* Les photos (et les vidéos) peuvent êtres mises dans un\ndossier sur l'ordinateur afin de les retrouver facilement.\nOn pourra par la suite intégrer les photos à un docu-\nment ou les imprimer.\n\n ase\n\nExploiter les données acquises et stockées dans l'ordina-\nteur pour produire un document fini.\nAvoir acquis une familiarisation suffisante avec le trai-\ntement de texte et en faire un usage rationnel (en lien\navec le français).\n\nN. B. : Nous vous proposons pour cette séance une fiche\ndocumentaire 1 qui reproduit un clavier d'ordinateur. Nous\nvous conseillons de la plastifier et de l'utiliser comme fiche\nressource lorsque les élèves font du traitement de texte.\n\nMots à retenir\n\n8",
          },
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e propose aux élèves de réaliser la « une » (la\npremière page) d'un journal de classe afin de raconter une\nsortie, une activité ou un événement particulier. De ce fait,\non interroge les élèves :\n\nTout d'abord, comment retrouver les photos qui\nsont sur l'ordinateur (si vous en avez prises) ?\nEnsuite, comment allez-vous insérer ces photos\nà votre document (la « une » d'un journal) ?\n\nLes élèves vont pouvoir répondre que les photos sont ran-\ngées dans « Mes images » et que le dossier se nomme\n« Sortie XXX » par exemple. On pourra cliquer sur « Insérer\nune image » ou alors faire un « copier/coller ».\nL'enseignant-e montre la « une » du journal Mon Petit\nQuotidien (— sur CD-Rom). On relève ensemble les élé-\nments essentiels constitutifs d'une « une » : il y a des titres,\nle texte peut être en couleur, la taille du texte varie, la forme\ndes lettres aussi, il y a des images, des photos...\n\nPour faire une « une » de journal, il faut donc écrire un ou\nplusieurs petits textes. Il est possible de mettre des cou-\nleurs, des tailles de polices différentes.\n\nL'enseignant-e propose alors de réaliser la « une » d'un\njournal à l'aide de la fiche élève 3.\n\n@",
          },
          {
            title: "Je recherche",
            detail:
              "L’enseignant-e distribue aux élèves la fiche documen-\ntaire 2. On précise alors qu'il est possible de réaliser une\n« une » simplifiée. Que faut-il absolument garder ? Les\nélèves vont proposer le titre du journal, la grande photo, le\ntitre de l'article : ce seront les éléments de base. Les élèves\nles plus à l'aise pourront peut être aussi placer le petit texte\nqui introduit l'article, la date, la carte météo... On découvre\net observe les différentes polices utilisées ainsi que la mise\nen page. On fixe ainsi ce vocabulaire.\n\nLes élèves vont ensuite répondre à des questions sur la fiche\nélève 3 afin d'imaginer à quoi ressemblera leur « une » :\nchoix de la police, taille des caractères, insertion de pho-\ntos, mise en page... Ils peuvent travailler en parallèle sur une\nfeuille blanche afin de réaliser le crayonné de leur « une ».\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "* Le traitement de texte permet de mettre en forme du\ntexte et des images pour réaliser un document comme\nla « une » d'un journal, une affiche, une couverture de\nclasseur, une présentation pour la classe.\n\n« Pour le texte, on peut choisir une ou plusieurs polices,\nmettre en forme les caractères (taille, gras, italique, sou-\nligné) et le placer dans la page (à gauche, à droite, centrer).\n* Pour les photos stockées sur l'ordinateur, on peut\nles retrouver dans un dossier et les insérer dans le\ndocument créé. Il faut bien sûr penser à enregistrer son\ntravail pour pouvoir le retrouver par la suite !\n\nOrdinateur\nTraitement de texte\n\nTablette\nMise en page\n\nConnexions\n\nPhotos Vidéos\n\n246 » Les objets techniques, qu'est-ce que c'est ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
          },
        ],
      },
    ],
    guideText:
      ") Que peut-on faire avec un ordinateur ?\n\n» Objectifs\n\n| + Décrire l'architecture simple d'un dispositif informatique.\n\n+ Avoir acquis une familiarisation suffisante avec le traitement de texte et en faire un usage rationnel (en lien avec\n\nle français).\n\n» Indications de progression dans le cycle 2\n\nAu CP, il s'agit de découvrir les différents éléments de saisie d'un dispositif informatique (clavier, souris, outil de\n\ndispositifs informatiques intégrés de type tablettes et récupérer les données par synchronisation. Enfin, au CE2,\nl'élève doit exploiter les données acquises et stockées dans l'ordinateur pour produire un document fini. Cette\nprogression peut être bien sûr adaptée au niveau de chaque élève et de chaque classe. Chaque séance peut être\n| mise en pratique par le biais d’une activité de la classe : raconter une sortie scolaire, réaliser la « une » d'un journal.\n\n|\n|\nDans ce dossier, l'élève va commencer à s'approprier un environnement numérique (ordinateur mais aussi tablette). |\n|\n|\n|\n|\n|\n)\n\n|\n|\n|\n|\n| prise de vues) et d'identifier les connexions entre ces éléments. En CET, l'objectif est de mettre en œuvre des\n|\n|\n|\n|\n\\\n\nSéance 1 JF 1\n\nDécrire l'architecture simple d'un dispositif informatique.\nDécouvrir les différents éléments de saisie d’un disposi-\ntif informatique (clavier, souris, outils de prise de vues).\nIdentifier les connexions entre ces éléments.\n\nE Je m'interroge\nÀ l'occasion d'un travail à mener sur l'ordinateur, l'ensei-\ngnant-e interroge les élèves :\n\nConnaissez-vous les différents éléments qui composent\nun ordinateur ? À quoi servent-ils ?\n\nOn peut attendre des élèves les réponses suivantes : « il y\na des gros ordinateurs et des plus petits qu’on peut trans-\nporter », « mon papa, il a un portable », « ma maman, elle\na une tablette », « sur les ordinateurs, on peut taper des\nmots sur un clavier », « des fois, il y a une souris », « on\nregarde sur un écran », « il y a aussi des fils pour recharger\nla tablette/l'ordinateur », « on peut imprimer des choses »,\n« on peut aussi y mettre des photos, des films et les\nregarder ensuite ».\n\n\\_- Une discussion s'engage. Les élèves pourront dire qu'ils uti-\n\nlisent une tablette, voire l'ordinateur de leurs parents pour\nregarder des dessins animés, des photos, faire des jeux,\nécrire des textes, prendre des photos, etc.\n\nL'enseignant-e propose alors aux élèves d'observer les\ndifférents éléments d'un ordinateur et comment ils sont\nconnectés, c'est-à-dire reliés les uns aux autres.\n\nJ'observe\n\nL'enseignant-e propose donc d'observer un ordinateur de la\nclasse et distribue au même moment la fiche élève 1 qui\npermettra de noter les observations réalisées.\n\nDeux types d'ordinateurs peuvent être étudiés à ce stade :\nun ordinateur portable et un ordinateur avec unité centrale.\nLes deux cas de figures seront comparés dans la fiche élève.\nLes élèves pourront ainsi observer un dispositif informatique\nsimple et trouver les fonctions de chaque élément : un cla-\nvier pour écrire, une souris ou pavé tactile (« TouchPad »)\n\npour se déplacer sur l'écran, une imprimante pour imprimer,\n\ndes haut-parleurs pour avoir du son, un écran pour afficher\net voir ce que l'on fait, une unité centrale pour mettre\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nsous tension l'ordinateur fixe, c'est-à-dire l'allumer, et\nabriter la mémoire. Pour les tablettes et l'ordinateur\nportable, l'unité centrale est intégrée : c'est pour cela que\nc'est moins visible (c'est aussi le cas pour la caméra, le\nlecteur de CD-Rom ou DVD-Rom, la batterie).\n\nOn explique aux élèves et on montre que tous ces éléments\nsont liés et connectés entre eux soit par des fils, soit par\nune connexion sans fil).\n\n2 Je retiens\n\n+ Un ordinateur ou une tablette sont des outils infor-\nmatiques qui permettent de faire beaucoup de choses :\nécrire des textes, voir des photos ou des films, effectuer\ndes recherches sur Internet.\n\n» L'ordinateur est composé de différents éléments :\n\n— une unité centrale pour stocker les informations, c'est\n« la mémoire/le cerveau » de l'ordinateur ;\n\n— un écran pour voir ce que l'on fait/écrit ;\n\n— un clavier pour écrire ;\n\n— une souris ou un pavé tactile (« TouchPad ») pour\ndéplacer « le pointeur », la petite flèche sur l'écran.\n«Tous ces éléments sont reliés entre eux avec des fils\nou sans fil. On appelle cela des connexions.\n\nSéance 2 IPT)\n\nMettre en ceuvre des dispositifs informatiques inté-\ngrés de type tablettes et récupérer les données par\nsynchronisation.\n\na Je m'interroge\n\nL'enseignant-e prend pour prétexte une sortie ou une acti-\nvité pour laquelle il/elle a pris des photos avec sa tablette ou\nson appareil photo numérique. On interroge alors les élèves :\n\nComment récupérer ces photos et les mettre\nsur l'ordinateur pour pouvoir ensuite les utiliser ?\n\nOn peut attendre les réponses suivantes : « il faut brancher\nl'appareil photo (ou la tablette) sur l'ordinateur », « on\npeut prendre la petite carte de l'appareil photo et la mettre\ndans l'ordinateur ».\n\nLes objets techniques, qu'est-ce que c'est ? o 245\n\nFiche enseignant\n\nL'enseignant-e propose alors d'expérimenter le transfert de\ndonnées à partir d'un appareil photo sur l'ordinateur de la\nclasse.\n\nLP J'expérimente\n\nL'enseignant-e montre aux élèves que deux façons de faire\nsont possibles : 1) extraire la carte mémoire de l'appareil\nphoto et l'introduire directement dans le lecteur de cartes\nmémoire de l'ordinateur ; 2) utiliser un cable pour connec-\nter l'appareil photo (ou la tablette) à l'ordinateur.\n\nSi une boite de dialogue d'exécution automatique s'af-\nfiche, fermez-la. Cliquez ensuite sur « Démarrer ». Puis sur\n« Ordinateur ». Dans l'espace intitulé « Périphériques uti-\nlisant des supports de stockage amovibles », vous visuali-\nsez une icône représentant la carte mémoire ou l'appareil\nphoto. Double-cliquez sur cette icône afin d'accéder au\ndossier de stockage de vos photos (DCIM) puis double-\ncliquez sur les dossiers pour obtenir vos photos.\nSélectionnez les photos que vous souhaitez importer. Faites\nun clic droit dans la sélection puis cliquez sur « Copier ».\nOuvrez le dossier dans lequel vous souhaitez importer vos\nimages, (dossier à créer et nommer au préalable dans le\ndossier « Images » de l'ordinateur) faites un clic droit et\ncliquez sur « Coller ». Une copie des photos sélectionnées\nse trouve désormais sur votre ordinateur.\n\nCes manipulations peuvent alors être réalisées par les\nélèves, par groupe (en fonction du nombre d'ordinateurs\ndisponibles) tandis que les autres élèves travaillent sur la\nfiche élève 2 distribuée par l'enseignant-e.\n\nL2 Je retiens\n\n+ On peut prendre des photos (ou des vidéos) avec un\nappareil photo ou une tablette. On peut les transférer\nsur un ordinateur soit en le connectant avec l'appareil\nphoto/la tablette ou en y insérant la carte mémoire de\nl'appareil photo.\n\n* Les photos (et les vidéos) peuvent êtres mises dans un\ndossier sur l'ordinateur afin de les retrouver facilement.\nOn pourra par la suite intégrer les photos à un docu-\nment ou les imprimer.\n\n ase\n\nExploiter les données acquises et stockées dans l'ordina-\nteur pour produire un document fini.\nAvoir acquis une familiarisation suffisante avec le trai-\ntement de texte et en faire un usage rationnel (en lien\navec le français).\n\nN. B. : Nous vous proposons pour cette séance une fiche\ndocumentaire 1 qui reproduit un clavier d'ordinateur. Nous\nvous conseillons de la plastifier et de l'utiliser comme fiche\nressource lorsque les élèves font du traitement de texte.\n\nMots à retenir\n\n8 Je m'interroge\n\nL'enseignant-e propose aux élèves de réaliser la « une » (la\npremière page) d'un journal de classe afin de raconter une\nsortie, une activité ou un événement particulier. De ce fait,\non interroge les élèves :\n\nTout d'abord, comment retrouver les photos qui\nsont sur l'ordinateur (si vous en avez prises) ?\nEnsuite, comment allez-vous insérer ces photos\nà votre document (la « une » d'un journal) ?\n\nLes élèves vont pouvoir répondre que les photos sont ran-\ngées dans « Mes images » et que le dossier se nomme\n« Sortie XXX » par exemple. On pourra cliquer sur « Insérer\nune image » ou alors faire un « copier/coller ».\nL'enseignant-e montre la « une » du journal Mon Petit\nQuotidien (— sur CD-Rom). On relève ensemble les élé-\nments essentiels constitutifs d'une « une » : il y a des titres,\nle texte peut être en couleur, la taille du texte varie, la forme\ndes lettres aussi, il y a des images, des photos...\n\nPour faire une « une » de journal, il faut donc écrire un ou\nplusieurs petits textes. Il est possible de mettre des cou-\nleurs, des tailles de polices différentes.\n\nL'enseignant-e propose alors de réaliser la « une » d'un\njournal à l'aide de la fiche élève 3.\n\n@ Je recherche\n\nL’enseignant-e distribue aux élèves la fiche documen-\ntaire 2. On précise alors qu'il est possible de réaliser une\n« une » simplifiée. Que faut-il absolument garder ? Les\nélèves vont proposer le titre du journal, la grande photo, le\ntitre de l'article : ce seront les éléments de base. Les élèves\nles plus à l'aise pourront peut être aussi placer le petit texte\nqui introduit l'article, la date, la carte météo... On découvre\net observe les différentes polices utilisées ainsi que la mise\nen page. On fixe ainsi ce vocabulaire.\n\nLes élèves vont ensuite répondre à des questions sur la fiche\nélève 3 afin d'imaginer à quoi ressemblera leur « une » :\nchoix de la police, taille des caractères, insertion de pho-\ntos, mise en page... Ils peuvent travailler en parallèle sur une\nfeuille blanche afin de réaliser le crayonné de leur « une ».\n\n2 Je retiens\n\n* Le traitement de texte permet de mettre en forme du\ntexte et des images pour réaliser un document comme\nla « une » d'un journal, une affiche, une couverture de\nclasseur, une présentation pour la classe.\n\n« Pour le texte, on peut choisir une ou plusieurs polices,\nmettre en forme les caractères (taille, gras, italique, sou-\nligné) et le placer dans la page (à gauche, à droite, centrer).\n* Pour les photos stockées sur l'ordinateur, on peut\nles retrouver dans un dossier et les insérer dans le\ndocument créé. Il faut bien sûr penser à enregistrer son\ntravail pour pouvoir le retrouver par la suite !\n\nOrdinateur\nTraitement de texte\n\nTablette\nMise en page\n\nConnexions\n\nPhotos Vidéos\n\n246 » Les objets techniques, qu'est-ce que c'est ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
    guidePageDecisions: [
      {
        page: 245,
        confidence: 93,
        score: 22,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
        ],
        phaseMarkers: ["je m'interroge", "j'observe", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on interroge"],
        studentLike: true,
      },
      {
        page: 246,
        confidence: 93,
        score: 22,
        included: true,
        strongMarkers: ["seance", "l'enseignant", "enseignant-e", "les eleves", "aux eleves"],
        phaseMarkers: ["je m'interroge", "j'experimente", "je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on interroge", "groupe"],
        studentLike: true,
      },
      {
        page: 247,
        confidence: 66,
        score: 0,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: false,
      },
    ],
    skippedProbePages: [247],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-20",
    dossierNumber: 20,
    partNumber: 5,
    partTitle: "Se situer dans l'espace",
    title: "Comment me repérer dans la classe, l'école ?",
    guidePages: [257, 258, 259],
    guidePageCount: 3,
    objectives: [
      "+ Savoir se repérer dans son environnement proche.",
      "» Savoir situer des objets ou des personnes les uns par rapport aux autres ou par rapport",
      "à d'autres repères.",
      "» Connaitre le vocabulaire permettant de définir des positions et des déplacements.",
      "« Étudier quelques modes de représentations de l’espace environnant (maquettes, plans,",
      "photos).",
      "+ Produire des représentations des espaces familiers (les espaces scolaires, le village, le",
      "quartier).",
    ],
    progressionNote:
      "Les dossiers 20 et 21 ont pour but l'installation des repères spatiaux et la maitrise d’un\nlangage précis associé. Ces deux dossiers sont en lien étroit avec le programme de mathé-\nmatiques au cycle 2. Ils viennent complèter les indispensables rituels de la classe pour\ninstaller ces compétences : se ranger, présenter le cahier du jour, se repérer dans l'espace\npendant les activités en EPS...\nDans ce dossier 20, il s'agit au CP d'acquérir les mots pour se repérer dans un environ-\nnement proche. Après ce travail sur le vocabulaire, l'élève va appliquer ses connaissances\nà l'espace de sa classe et va aborder la représentation de sa classe par une maquette puis\nun plan. Au CET, l'élève va apprendre à représenter un espace plus large : l’école et les\nespaces scolaires. Il apprend également à situer des éléments sur un plan correspondant à\nun dessin ou une photo.",
    material: [
      "N. B. : L'espace du quartier et du village sont étudiés dans le dossier 31.",
      "Le matériel nécessaire est indiqué dans chaque séance.",
    ],
    sessions: [
      {
        number: 1,
        title:
          "Savoir se repérer dans son environnement proche. Situer des objets ou des personnes les uns par rapport aux autres ou par rapport à d'autres repères.",
        rawText:
          "Séance 1 J\n\nSavoir se repérer dans son environnement proche.\nSituer des objets ou des personnes les uns par rapport\naux autres ou par rapport à d'autres repères.\n\nConnaitre le vocabulaire permettant de définir des posi-\ntions et des déplacements.\n\nMatériel : boite de chocolats, boite de fromages, boite\nà chaussures, etc. et petits personnages type Playmobil.\n\n@ Je m'interroge\n\nL'enseignant-e apporte en classe différentes boites (boite\nde chocolats, boite de fromages, boite à chaussures, etc.)\net des petits personnages type Playmobil. On positionne\nplusieurs personnages : sur une première boite, dans une\nautre boîte, à droite d’une troisième boite. Puis on inter-\nroge les élèves :\n\n| Observez ces personnages. Où sont-ils ?\n\nLes élèves donnent leurs réponses à tour de rôle et l’ensei-\ngnant-e note au tableau des réponses comme: « le person-\nnage est au-dessus de la boite », « le personnage est sur la\nboite »...\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nDans un second temps, l'enseignant-e fait se déplacer un\npersonnage et interroge une nouvelle fois les élèves :\n\n| Que fait ce personnage ?\n\nLes élèves donnent leurs réponses et l'enseignant-e note\nau tableau des réponses comme : « le personnage avance »,\n« le personnage recule ».\n\nOn résume : il existe des mots différents pour définir une\nposition ou un déplacement. Puis on questionne les élèves :\n\n[| En connaissez-vous d'autres ?\n\nLes élèves donnent les mots comme : « gauche, droite, sur,\nsous » pour les positions ; et les mots comme « tourner,\nmonter, descendre » pour les déplacements.\n\n9 J'expérimente\n\nL'enseignant-e propose alors aux élèves de jouer par groupe\nde 2 avec des personnages et des boîtes afin d'utiliser :\n\n— le vocabulaire de position : gauche, droite, au-dessus, en\ndessous, sur, sous, devant, derrière, près, loin.\n\n— le vocabulaire de déplacement : avancer, reculer, tourner\nà droite/à gauche, monter, descendre.\n\nL'enseignant-e donne à chaque élève une feuille A4 sur\nlaquelle est noté ce vocabulaire (— voir page 260). On\n\nSe situer dans l'espace e 257\n\nFiche enseignant\n\nl'écrit également au tableau. Les élèves sont placés par\ndeux. Chaque binome reçoit également une boite et un\npersonnage. L'un des deux élèves place le personnage et\nl'autre, les yeux fermés, doit deviner où il se trouve à tra-\nvers un jeu de questions-réponses.\n\nCet exercice est un travail de manipulation. Il permet aux\nélèves de s'appropier ce vocabulaire par « le vécu ». À la\nsuite de cette phase de manipulation, on distribue la fiche\nélève 1 pour valider l'acquisition de ces notions.\n\n2 Je retiens\n\n« Pour expliquer où je suis, j'utilise le vocabulaire de\nposition : gauche, droite, au-dessus, en dessous, sur, sous,\ndevant, derrière, près, loin.\n\n«Pour indiquer un déplacement, j'utilise des verbes\ncomme avancer, reculer, tourner (à droite ou à gauche),\nmonter, descendre.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e apporte en classe différentes boites (boite\nde chocolats, boite de fromages, boite à chaussures, etc.)\net des petits personnages type Playmobil. On positionne\nplusieurs personnages : sur une première boite, dans une\nautre boîte, à droite d’une troisième boite. Puis on inter-\nroge les élèves :\n\n| Observez ces personnages. Où sont-ils ?\n\nLes élèves donnent leurs réponses à tour de rôle et l’ensei-\ngnant-e note au tableau des réponses comme: « le person-\nnage est au-dessus de la boite », « le personnage est sur la\nboite »...\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nDans un second temps, l'enseignant-e fait se déplacer un\npersonnage et interroge une nouvelle fois les élèves :\n\n| Que fait ce personnage ?\n\nLes élèves donnent leurs réponses et l'enseignant-e note\nau tableau des réponses comme : « le personnage avance »,\n« le personnage recule ».\n\nOn résume : il existe des mots différents pour définir une\nposition ou un déplacement. Puis on questionne les élèves :\n\n[| En connaissez-vous d'autres ?\n\nLes élèves donnent les mots comme : « gauche, droite, sur,\nsous » pour les positions ; et les mots comme « tourner,\nmonter, descendre » pour les déplacements.\n\n9",
          },
          {
            title: "J'expérimente",
            detail:
              "L'enseignant-e propose alors aux élèves de jouer par groupe\nde 2 avec des personnages et des boîtes afin d'utiliser :\n\n— le vocabulaire de position : gauche, droite, au-dessus, en\ndessous, sur, sous, devant, derrière, près, loin.\n\n— le vocabulaire de déplacement : avancer, reculer, tourner\nà droite/à gauche, monter, descendre.\n\nL'enseignant-e donne à chaque élève une feuille A4 sur\nlaquelle est noté ce vocabulaire (— voir page 260). On\n\nSe situer dans l'espace e 257\n\nFiche enseignant\n\nl'écrit également au tableau. Les élèves sont placés par\ndeux. Chaque binome reçoit également une boite et un\npersonnage. L'un des deux élèves place le personnage et\nl'autre, les yeux fermés, doit deviner où il se trouve à tra-\nvers un jeu de questions-réponses.\n\nCet exercice est un travail de manipulation. Il permet aux\nélèves de s'appropier ce vocabulaire par « le vécu ». À la\nsuite de cette phase de manipulation, on distribue la fiche\nélève 1 pour valider l'acquisition de ces notions.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "« Pour expliquer où je suis, j'utilise le vocabulaire de\nposition : gauche, droite, au-dessus, en dessous, sur, sous,\ndevant, derrière, près, loin.\n\n«Pour indiquer un déplacement, j'utilise des verbes\ncomme avancer, reculer, tourner (à droite ou à gauche),\nmonter, descendre.",
          },
        ],
      },
      {
        number: 2,
        title:
          "Étudier quelques modes de représentation de l’espace environnant : la maquette de la classe. Matériel : des boites à chaussures ou une feuille en papier",
        rawText:
          "Séance 2 JY\n\nÉtudier quelques modes de représentation de l’espace\nenvironnant : la maquette de la classe.\n\nMatériel : des boites à chaussures ou une feuille en papier\npour le « cadre », des légos, boites de toutes sortes,\nblocs de jeux de construction, etc. De la colle selon les\nmatériaux utilisés. Un appareil photo.\n\n[2] Je m’interroge\n\nL'enseignant-e apporte une maquette de construction\nquelconque (maison, bateau, avion, voiture...).\n\nOn interroge les élèves :\n\n[ Savez-vous ce que c'est ?\n\nLes élèves pourront dire le nom de l'objet sans préciser que\nc'est une maquette. mais certains donneront peut-être le\nmot précis. L'enseignant-e peut préciser qu'il s'agit d’une\nreproduction identique à l'original mais en plus petit. On\najoute qu’on parle alors de modèle réduit.\n\nDans tous les cas, l'enseignant-e va proposer de faire la\nmaquette de la classe en volume, en « 3D ». On interroge\nà nouveau les élèves :\n\n| Comment pouvons-nous faire la maquette de la classe ?\n| Quels matériaux pourrions-nous utiliser pour les tables,\n| le tableau, etc. ?\n\nCertains vont pouvoir donner l'idée des légos, des pièces\nen bois, des kaplas, des gommes, des boites d'allumettes,\nde médicaments, de morceaux de carton, de morceaux de\nsucre…\n\nGP J'expérimente\n\nLes élèves sont placés par groupe de 4. Avec le maté-\nriel choisi, ils vont réaliser la maquette de la classe. Tout\nd'abord, ils vont sélectionner le matériel qui leur est utile :\npar exemple, comment choisir de représenter les tables ?\nIl va falloir des objets identiques pour que l'on com-\nprenne bien que ce sont toutes des tables. Et les armoires,\nqui sont plus volumineuses que les tables ? Il faudra des\n\n258 » Se situer dans l'espace\n\nobjets plus grands aussi ? etc. Que faire pour les chaises ?\nL'enseignant-e explique qu'on peut choisir de ne pas les\nreprésenter car elles sont nombreuses et mobiles. De plus,\nelles risquent d'être difficiles à matérialiser.\n\nIl faut aussi matérialiser les murs de la classe, les portes\net les fenêtres. Cela est indispensable pour orienter la\nmaquette (fixer le sens de la représentation) et donc d'es-\nsayer de conserver les positions relatives entre le réel et la\nmaquette, bien occuper l'espace. On peut utiliser en fonc-\ntion de la forme de la classe une boîte à chaussures, ou\nencore une feuille A3 ou A2. Les portes et fenêtres peuvent\nêtre matérialisées par des ouvertures dans la boite à chaus-\nsures ou par un trait noir sur les bords de la feuille. Les\nélèves peuvent vérifier auprès de leurs camarades si les\nmeubles maquettés restent identifiables ; on peut si besoin\nproposer aux élèves de coller une étiquette avec un des-\nsin par exemple pour identifier la bibliothèque. ll n’est de\ntoute façon pas nécessaire de fabriquer des éléments : on\nprend des objets existants qui symbolisent les meubles.\nOn peut Introduire un petit personnage pour « tester » la\nmaquette. Une fois toutes les maquettes réalisées, les élèves\nvont aller de groupe en groupe observer les maquettes de\nleurs camarades. Un choix sera fait afin de retenir la plus\nconforme à la réalité. Toutes les maquettes sont photoco-\npiées (privilégier la vue de dessus) pour s’en servir lors de la\nréalisation d'un plan de la classe lors de la séance suivante.\nLa fiche élève 2 est ensuite distribuée afin de fixer cette\nnotion de maquette.\n\n2 Je retiens\n\n*la maquette est une représentation en modèle\nréduit.\n\n«La maquette de la classe comprend les élements\nimportants représentés à leur place : les murs, les\nportes et fenêtres, les meubles (tables, bureau, armoires,\ntableau...).",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e apporte une maquette de construction\nquelconque (maison, bateau, avion, voiture...).\n\nOn interroge les élèves :\n\n[ Savez-vous ce que c'est ?\n\nLes élèves pourront dire le nom de l'objet sans préciser que\nc'est une maquette. mais certains donneront peut-être le\nmot précis. L'enseignant-e peut préciser qu'il s'agit d’une\nreproduction identique à l'original mais en plus petit. On\najoute qu’on parle alors de modèle réduit.\n\nDans tous les cas, l'enseignant-e va proposer de faire la\nmaquette de la classe en volume, en « 3D ». On interroge\nà nouveau les élèves :\n\n| Comment pouvons-nous faire la maquette de la classe ?\n| Quels matériaux pourrions-nous utiliser pour les tables,\n| le tableau, etc. ?\n\nCertains vont pouvoir donner l'idée des légos, des pièces\nen bois, des kaplas, des gommes, des boites d'allumettes,\nde médicaments, de morceaux de carton, de morceaux de\nsucre…\n\nGP",
          },
          {
            title: "J'expérimente",
            detail:
              "Les élèves sont placés par groupe de 4. Avec le maté-\nriel choisi, ils vont réaliser la maquette de la classe. Tout\nd'abord, ils vont sélectionner le matériel qui leur est utile :\npar exemple, comment choisir de représenter les tables ?\nIl va falloir des objets identiques pour que l'on com-\nprenne bien que ce sont toutes des tables. Et les armoires,\nqui sont plus volumineuses que les tables ? Il faudra des\n\n258 » Se situer dans l'espace\n\nobjets plus grands aussi ? etc. Que faire pour les chaises ?\nL'enseignant-e explique qu'on peut choisir de ne pas les\nreprésenter car elles sont nombreuses et mobiles. De plus,\nelles risquent d'être difficiles à matérialiser.\n\nIl faut aussi matérialiser les murs de la classe, les portes\net les fenêtres. Cela est indispensable pour orienter la\nmaquette (fixer le sens de la représentation) et donc d'es-\nsayer de conserver les positions relatives entre le réel et la\nmaquette, bien occuper l'espace. On peut utiliser en fonc-\ntion de la forme de la classe une boîte à chaussures, ou\nencore une feuille A3 ou A2. Les portes et fenêtres peuvent\nêtre matérialisées par des ouvertures dans la boite à chaus-\nsures ou par un trait noir sur les bords de la feuille. Les\nélèves peuvent vérifier auprès de leurs camarades si les\nmeubles maquettés restent identifiables ; on peut si besoin\nproposer aux élèves de coller une étiquette avec un des-\nsin par exemple pour identifier la bibliothèque. ll n’est de\ntoute façon pas nécessaire de fabriquer des éléments : on\nprend des objets existants qui symbolisent les meubles.\nOn peut Introduire un petit personnage pour « tester » la\nmaquette. Une fois toutes les maquettes réalisées, les élèves\nvont aller de groupe en groupe observer les maquettes de\nleurs camarades. Un choix sera fait afin de retenir la plus\nconforme à la réalité. Toutes les maquettes sont photoco-\npiées (privilégier la vue de dessus) pour s’en servir lors de la\nréalisation d'un plan de la classe lors de la séance suivante.\nLa fiche élève 2 est ensuite distribuée afin de fixer cette\nnotion de maquette.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "*la maquette est une représentation en modèle\nréduit.\n\n«La maquette de la classe comprend les élements\nimportants représentés à leur place : les murs, les\nportes et fenêtres, les meubles (tables, bureau, armoires,\ntableau...).",
          },
        ],
      },
      {
        number: 3,
        title:
          "Étudier quelques modes de représentation de l'espace environnant : le plan de la classe. Matériel : photographies de la séance 2, appareil photo.",
        rawText:
          "Séance 3 JF\n\nÉtudier quelques modes de représentation de l'espace\nenvironnant : le plan de la classe.\n\nMatériel : photographies de la séance 2, appareil photo.\n\n@ Je m'interroge\n\nÀ la suite de la séance précédente sur la réalisation\nd’une maquette de la classe, les élèves vont maintenant\napprendre à dessiner le plan de la classe en collectif.\n\nPour débuter cette séance, l’enseignant-e propose aux\nélèves de prendre des photos de la classe avec différents\npoints de vue. Ces photos seront mises sur l’ordinateur de\nla classe (— voir dossier 19 pour le transfert des photos sur\nl’ordinateur).\n\nLes élèves observent les différentes photos. Lenseignant-e\nles interroge alors :\n\n[| Voit-on tout ce qu'il y a dans la classe sur cette photo ?\n| Que manque-t-il ? Et sur celle-ci 7...\n\nLes élèves pourront donner ce type de réponse : « non, on\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nne voit pas le bureau », « non, toutes les tables ne sont pas\nsur la photo »...\nL'enseignant-e rebondit sur ces réponses :\n\n[ Mais alors, comment faire pour tout voir ?\n\nCertains pourront parler de maquette (réalisée dans la\nséance précédente) ou de plan (si déjà vu en mathéma-\ntiques). On propose alors de voir ensemble comment est\nfait un plan.\n\n[A] J'expérimente\n\nCette séance va permettre à l'élève de découvrir la notion\nabstraite de plan. Pour cela il est possible de reprendre\nl'étape de la maquette qui a été photographiée. On posi-\ntionne sur cette photographie prise à la verticale un papier\ncalque et on trace le contour des objets représentant les\nmeubles, tables, etc.\n\nCe plan réalisé, on utilise un code couleur commun, par\nexemple : les tables en bleu, le bureau de l'enseignant-e en\nvert, les meubles dédiés au rangement en orange, etc.\n\nLes productions des élèves seront sans doute assez variées,\nplus ou moins détaillées et les proportions plus ou moins\nrespectées. La représentation des objets peut permettre la\nréactivation du vocabulaire sur les formes géométriques\n(rectangle, carré...). L'enseignant-e peut aussi distribuer par\nla suite un plan de la classe réalisé par ses soins pour initier\nles élèves à la manière de symboliser les éléments sur un\nplan.\n\nSi l'enseignant-e a réalisé des photos de sa classe, elles\npourront être un support pour des descriptions : au premier\nplan, il y a les élèves ; au second plan, le tableau, etc.\nL'enseignant-e distribue ensuite la fiche élève 3. Sur cette\nfiche, les élèves vont devoir se repérer sur le dessin d'une\nclasse et le plan correspondant. On pourra ainsi utiliser le\nvocabulaire de position et de déplacement spécifique.\n\n2 Je retiens\n\n«Le plan est une représentation d'un espace vu de\ndessus. Il sert à se repérer.\n\n* Le plan de la classe permet de voir l'ensemble de la\nclasse et l'emplacement des meubles.\n\n«Pour faire un plan, je peux utiliser des photos, des\ndessins ou une maquette.\n\nPosition\nPoint de vue\n\nMots à retenir\n\nDéplacement\nMaquette",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "À la suite de la séance précédente sur la réalisation\nd’une maquette de la classe, les élèves vont maintenant\napprendre à dessiner le plan de la classe en collectif.\n\nPour débuter cette séance, l’enseignant-e propose aux\nélèves de prendre des photos de la classe avec différents\npoints de vue. Ces photos seront mises sur l’ordinateur de\nla classe (— voir dossier 19 pour le transfert des photos sur\nl’ordinateur).\n\nLes élèves observent les différentes photos. Lenseignant-e\nles interroge alors :\n\n[| Voit-on tout ce qu'il y a dans la classe sur cette photo ?\n| Que manque-t-il ? Et sur celle-ci 7...\n\nLes élèves pourront donner ce type de réponse : « non, on\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nne voit pas le bureau », « non, toutes les tables ne sont pas\nsur la photo »...\nL'enseignant-e rebondit sur ces réponses :\n\n[ Mais alors, comment faire pour tout voir ?\n\nCertains pourront parler de maquette (réalisée dans la\nséance précédente) ou de plan (si déjà vu en mathéma-\ntiques). On propose alors de voir ensemble comment est\nfait un plan.\n\n[A]",
          },
          {
            title: "J'expérimente",
            detail:
              "Cette séance va permettre à l'élève de découvrir la notion\nabstraite de plan. Pour cela il est possible de reprendre\nl'étape de la maquette qui a été photographiée. On posi-\ntionne sur cette photographie prise à la verticale un papier\ncalque et on trace le contour des objets représentant les\nmeubles, tables, etc.\n\nCe plan réalisé, on utilise un code couleur commun, par\nexemple : les tables en bleu, le bureau de l'enseignant-e en\nvert, les meubles dédiés au rangement en orange, etc.\n\nLes productions des élèves seront sans doute assez variées,\nplus ou moins détaillées et les proportions plus ou moins\nrespectées. La représentation des objets peut permettre la\nréactivation du vocabulaire sur les formes géométriques\n(rectangle, carré...). L'enseignant-e peut aussi distribuer par\nla suite un plan de la classe réalisé par ses soins pour initier\nles élèves à la manière de symboliser les éléments sur un\nplan.\n\nSi l'enseignant-e a réalisé des photos de sa classe, elles\npourront être un support pour des descriptions : au premier\nplan, il y a les élèves ; au second plan, le tableau, etc.\nL'enseignant-e distribue ensuite la fiche élève 3. Sur cette\nfiche, les élèves vont devoir se repérer sur le dessin d'une\nclasse et le plan correspondant. On pourra ainsi utiliser le\nvocabulaire de position et de déplacement spécifique.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "«Le plan est une représentation d'un espace vu de\ndessus. Il sert à se repérer.\n\n* Le plan de la classe permet de voir l'ensemble de la\nclasse et l'emplacement des meubles.\n\n«Pour faire un plan, je peux utiliser des photos, des\ndessins ou une maquette.\n\nPosition\nPoint de vue\n\nMots à retenir\n\nDéplacement\nMaquette",
          },
        ],
      },
      {
        number: 4,
        title:
          "Savoir se repérer dans son environnement proche : l'école. Étudier quelques modes de représentation de l'espace",
        rawText:
          "| Séance 4 MFT\n\nSavoir se repérer dans son environnement proche :\nl'école.\n\nÉtudier quelques modes de représentation de l'espace\nenvironnant : le plan de l'école.\n\n@ Je m'interroge\n\nCette séance va permettre de réinvestir les connaissances\nacquises de façon plus large et de contribuer à ce que les\nélèves puissent se repérer dans leur lieu de vie : l'école.\nL'enseignant-e rappelle ce qui a été fait au CP sur l'espace\nde la classe (maquette, plan) puis interroge ses élèves :\n\n[Nous allons faire le plan de l’école. Que devons-nous\n| faire pour cela ?\n\nLes élèves peuvent proposer de faire comme pour la classe :\n« on fait une maquette et puis ensuite on dessine un plan ».\nIls peuvent aussi parler de repérer les différents espaces de\nl'école munis d'appareils photos.\n\n Je recherche\n\nL'enseignant-e propose aux élèves de se déplacer dans\nl'école, afin de repérer les bâtiments et de s'orienter. Les\nélèves repèrent ainsi les éléments essentiels : la cour, les\ntoilettes, la cantine, les classes, etc. Les élèves vont utili-\nser le vocabulaire de position et de déplacement qu'ils ont\nacquis.\n\nLes élèves vont transférer les photos et les observer ensuite\nen classe. Ils passeront ensuite à la représentation de l'école\npar le dessin. Pour cela, ils peuvent choisir un code couleur\npour les différents espaces.\n\nL'enseignant-e montre ensuite un plan de l'école (plan\nde sécurité incendie, par exemple) et invite les élèves à le\ncommenter (par rapport à leurs dessins) et à identifier des\nrepères à l'extérieur (la cour, la cantine, etc.) et à l'inté-\nrieur des bâtiments (le couloir, ma classe... puis les autres\nclasses, etc.). On pourra préciser ce que l'on voit sur un plan\nd'école (les murs, les portes, les fenêtres...) et ce qui ne s'y\ntrouve pas (les meubles, les tapis.\nL'enseignant-e distribue la fiche élève 4. Les exercices pro-\nposés permettront de travailler sur la maquette et le plan\nd'une école imaginaire.\n\n2 Je retiens\n\n«Le plan est une représentation d'un espace vu de\ndessus. Il sert a se repérer.\n\n«Le plan de l'école permet de voir l'ensemble de l'es-\npace scolaire, à l'intérieur et à l'extérieur des bâtiments.\n\nPlan\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nSe situer dans l’espace » 259",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "Cette séance va permettre de réinvestir les connaissances\nacquises de façon plus large et de contribuer à ce que les\nélèves puissent se repérer dans leur lieu de vie : l'école.\nL'enseignant-e rappelle ce qui a été fait au CP sur l'espace\nde la classe (maquette, plan) puis interroge ses élèves :\n\n[Nous allons faire le plan de l’école. Que devons-nous\n| faire pour cela ?\n\nLes élèves peuvent proposer de faire comme pour la classe :\n« on fait une maquette et puis ensuite on dessine un plan ».\nIls peuvent aussi parler de repérer les différents espaces de\nl'école munis d'appareils photos.",
          },
          {
            title: "Je recherche",
            detail:
              "L'enseignant-e propose aux élèves de se déplacer dans\nl'école, afin de repérer les bâtiments et de s'orienter. Les\nélèves repèrent ainsi les éléments essentiels : la cour, les\ntoilettes, la cantine, les classes, etc. Les élèves vont utili-\nser le vocabulaire de position et de déplacement qu'ils ont\nacquis.\n\nLes élèves vont transférer les photos et les observer ensuite\nen classe. Ils passeront ensuite à la représentation de l'école\npar le dessin. Pour cela, ils peuvent choisir un code couleur\npour les différents espaces.\n\nL'enseignant-e montre ensuite un plan de l'école (plan\nde sécurité incendie, par exemple) et invite les élèves à le\ncommenter (par rapport à leurs dessins) et à identifier des\nrepères à l'extérieur (la cour, la cantine, etc.) et à l'inté-\nrieur des bâtiments (le couloir, ma classe... puis les autres\nclasses, etc.). On pourra préciser ce que l'on voit sur un plan\nd'école (les murs, les portes, les fenêtres...) et ce qui ne s'y\ntrouve pas (les meubles, les tapis.\nL'enseignant-e distribue la fiche élève 4. Les exercices pro-\nposés permettront de travailler sur la maquette et le plan\nd'une école imaginaire.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "«Le plan est une représentation d'un espace vu de\ndessus. Il sert a se repérer.\n\n«Le plan de l'école permet de voir l'ensemble de l'es-\npace scolaire, à l'intérieur et à l'extérieur des bâtiments.\n\nPlan\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nSe situer dans l’espace » 259",
          },
        ],
      },
    ],
    guideText:
      ") Comment me repérer dans la classe, l’école ?\n\n| > Objectifs\n\n| + Savoir se repérer dans son environnement proche.\n\n|» Savoir situer des objets ou des personnes les uns par rapport aux autres ou par rapport\n| à d'autres repères.\n\n| » Connaitre le vocabulaire permettant de définir des positions et des déplacements.\n\n| « Étudier quelques modes de représentations de l’espace environnant (maquettes, plans,\n| photos).\n\n| + Produire des représentations des espaces familiers (les espaces scolaires, le village, le\nquartier).\n\n» Indications de progression dans le cycle 2\n\nLes dossiers 20 et 21 ont pour but l'installation des repères spatiaux et la maitrise d’un\nlangage précis associé. Ces deux dossiers sont en lien étroit avec le programme de mathé-\nmatiques au cycle 2. Ils viennent complèter les indispensables rituels de la classe pour\ninstaller ces compétences : se ranger, présenter le cahier du jour, se repérer dans l'espace\npendant les activités en EPS...\n\nDans ce dossier 20, il s'agit au CP d'acquérir les mots pour se repérer dans un environ-\nnement proche. Après ce travail sur le vocabulaire, l'élève va appliquer ses connaissances\nà l'espace de sa classe et va aborder la représentation de sa classe par une maquette puis\nun plan. Au CET, l'élève va apprendre à représenter un espace plus large : l’école et les\nespaces scolaires. Il apprend également à situer des éléments sur un plan correspondant à\n\nun dessin ou une photo.\n\n> Matériel\n\nN. B. : L'espace du quartier et du village sont étudiés dans le dossier 31.\n\nLe matériel nécessaire est indiqué dans chaque séance.\n\nSéance 1 J\n\nSavoir se repérer dans son environnement proche.\nSituer des objets ou des personnes les uns par rapport\naux autres ou par rapport à d'autres repères.\n\nConnaitre le vocabulaire permettant de définir des posi-\ntions et des déplacements.\n\nMatériel : boite de chocolats, boite de fromages, boite\nà chaussures, etc. et petits personnages type Playmobil.\n\n@ Je m'interroge\n\nL'enseignant-e apporte en classe différentes boites (boite\nde chocolats, boite de fromages, boite à chaussures, etc.)\net des petits personnages type Playmobil. On positionne\nplusieurs personnages : sur une première boite, dans une\nautre boîte, à droite d’une troisième boite. Puis on inter-\nroge les élèves :\n\n| Observez ces personnages. Où sont-ils ?\n\nLes élèves donnent leurs réponses à tour de rôle et l’ensei-\ngnant-e note au tableau des réponses comme: « le person-\nnage est au-dessus de la boite », « le personnage est sur la\nboite »...\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nDans un second temps, l'enseignant-e fait se déplacer un\npersonnage et interroge une nouvelle fois les élèves :\n\n| Que fait ce personnage ?\n\nLes élèves donnent leurs réponses et l'enseignant-e note\nau tableau des réponses comme : « le personnage avance »,\n« le personnage recule ».\n\nOn résume : il existe des mots différents pour définir une\nposition ou un déplacement. Puis on questionne les élèves :\n\n[| En connaissez-vous d'autres ?\n\nLes élèves donnent les mots comme : « gauche, droite, sur,\nsous » pour les positions ; et les mots comme « tourner,\nmonter, descendre » pour les déplacements.\n\n9 J'expérimente\n\nL'enseignant-e propose alors aux élèves de jouer par groupe\nde 2 avec des personnages et des boîtes afin d'utiliser :\n\n— le vocabulaire de position : gauche, droite, au-dessus, en\ndessous, sur, sous, devant, derrière, près, loin.\n\n— le vocabulaire de déplacement : avancer, reculer, tourner\nà droite/à gauche, monter, descendre.\n\nL'enseignant-e donne à chaque élève une feuille A4 sur\nlaquelle est noté ce vocabulaire (— voir page 260). On\n\nSe situer dans l'espace e 257\n\nFiche enseignant\n\nl'écrit également au tableau. Les élèves sont placés par\ndeux. Chaque binome reçoit également une boite et un\npersonnage. L'un des deux élèves place le personnage et\nl'autre, les yeux fermés, doit deviner où il se trouve à tra-\nvers un jeu de questions-réponses.\n\nCet exercice est un travail de manipulation. Il permet aux\nélèves de s'appropier ce vocabulaire par « le vécu ». À la\nsuite de cette phase de manipulation, on distribue la fiche\nélève 1 pour valider l'acquisition de ces notions.\n\n2 Je retiens\n\n« Pour expliquer où je suis, j'utilise le vocabulaire de\nposition : gauche, droite, au-dessus, en dessous, sur, sous,\ndevant, derrière, près, loin.\n\n«Pour indiquer un déplacement, j'utilise des verbes\ncomme avancer, reculer, tourner (à droite ou à gauche),\nmonter, descendre.\n\n Séance 2 JY\n\nÉtudier quelques modes de représentation de l’espace\nenvironnant : la maquette de la classe.\n\nMatériel : des boites à chaussures ou une feuille en papier\npour le « cadre », des légos, boites de toutes sortes,\nblocs de jeux de construction, etc. De la colle selon les\nmatériaux utilisés. Un appareil photo.\n\n[2] Je m’interroge\n\nL'enseignant-e apporte une maquette de construction\nquelconque (maison, bateau, avion, voiture...).\n\nOn interroge les élèves :\n\n[ Savez-vous ce que c'est ?\n\nLes élèves pourront dire le nom de l'objet sans préciser que\nc'est une maquette. mais certains donneront peut-être le\nmot précis. L'enseignant-e peut préciser qu'il s'agit d’une\nreproduction identique à l'original mais en plus petit. On\najoute qu’on parle alors de modèle réduit.\n\nDans tous les cas, l'enseignant-e va proposer de faire la\nmaquette de la classe en volume, en « 3D ». On interroge\nà nouveau les élèves :\n\n| Comment pouvons-nous faire la maquette de la classe ?\n| Quels matériaux pourrions-nous utiliser pour les tables,\n| le tableau, etc. ?\n\nCertains vont pouvoir donner l'idée des légos, des pièces\nen bois, des kaplas, des gommes, des boites d'allumettes,\nde médicaments, de morceaux de carton, de morceaux de\nsucre…\n\nGP J'expérimente\n\nLes élèves sont placés par groupe de 4. Avec le maté-\nriel choisi, ils vont réaliser la maquette de la classe. Tout\nd'abord, ils vont sélectionner le matériel qui leur est utile :\npar exemple, comment choisir de représenter les tables ?\nIl va falloir des objets identiques pour que l'on com-\nprenne bien que ce sont toutes des tables. Et les armoires,\nqui sont plus volumineuses que les tables ? Il faudra des\n\n258 » Se situer dans l'espace\n\nobjets plus grands aussi ? etc. Que faire pour les chaises ?\nL'enseignant-e explique qu'on peut choisir de ne pas les\nreprésenter car elles sont nombreuses et mobiles. De plus,\nelles risquent d'être difficiles à matérialiser.\n\nIl faut aussi matérialiser les murs de la classe, les portes\net les fenêtres. Cela est indispensable pour orienter la\nmaquette (fixer le sens de la représentation) et donc d'es-\nsayer de conserver les positions relatives entre le réel et la\nmaquette, bien occuper l'espace. On peut utiliser en fonc-\ntion de la forme de la classe une boîte à chaussures, ou\nencore une feuille A3 ou A2. Les portes et fenêtres peuvent\nêtre matérialisées par des ouvertures dans la boite à chaus-\nsures ou par un trait noir sur les bords de la feuille. Les\nélèves peuvent vérifier auprès de leurs camarades si les\nmeubles maquettés restent identifiables ; on peut si besoin\nproposer aux élèves de coller une étiquette avec un des-\nsin par exemple pour identifier la bibliothèque. ll n’est de\ntoute façon pas nécessaire de fabriquer des éléments : on\nprend des objets existants qui symbolisent les meubles.\nOn peut Introduire un petit personnage pour « tester » la\nmaquette. Une fois toutes les maquettes réalisées, les élèves\nvont aller de groupe en groupe observer les maquettes de\nleurs camarades. Un choix sera fait afin de retenir la plus\nconforme à la réalité. Toutes les maquettes sont photoco-\npiées (privilégier la vue de dessus) pour s’en servir lors de la\nréalisation d'un plan de la classe lors de la séance suivante.\nLa fiche élève 2 est ensuite distribuée afin de fixer cette\nnotion de maquette.\n\n2 Je retiens\n\n*la maquette est une représentation en modèle\nréduit.\n\n«La maquette de la classe comprend les élements\nimportants représentés à leur place : les murs, les\nportes et fenêtres, les meubles (tables, bureau, armoires,\ntableau...).\n\n Séance 3 JF\n\nÉtudier quelques modes de représentation de l'espace\nenvironnant : le plan de la classe.\n\nMatériel : photographies de la séance 2, appareil photo.\n\n@ Je m'interroge\n\nÀ la suite de la séance précédente sur la réalisation\nd’une maquette de la classe, les élèves vont maintenant\napprendre à dessiner le plan de la classe en collectif.\n\nPour débuter cette séance, l’enseignant-e propose aux\nélèves de prendre des photos de la classe avec différents\npoints de vue. Ces photos seront mises sur l’ordinateur de\nla classe (— voir dossier 19 pour le transfert des photos sur\nl’ordinateur).\n\nLes élèves observent les différentes photos. Lenseignant-e\nles interroge alors :\n\n[| Voit-on tout ce qu'il y a dans la classe sur cette photo ?\n| Que manque-t-il ? Et sur celle-ci 7...\n\nLes élèves pourront donner ce type de réponse : « non, on\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nne voit pas le bureau », « non, toutes les tables ne sont pas\nsur la photo »...\nL'enseignant-e rebondit sur ces réponses :\n\n[ Mais alors, comment faire pour tout voir ?\n\nCertains pourront parler de maquette (réalisée dans la\nséance précédente) ou de plan (si déjà vu en mathéma-\ntiques). On propose alors de voir ensemble comment est\nfait un plan.\n\n[A] J'expérimente\n\nCette séance va permettre à l'élève de découvrir la notion\nabstraite de plan. Pour cela il est possible de reprendre\nl'étape de la maquette qui a été photographiée. On posi-\ntionne sur cette photographie prise à la verticale un papier\ncalque et on trace le contour des objets représentant les\nmeubles, tables, etc.\n\nCe plan réalisé, on utilise un code couleur commun, par\nexemple : les tables en bleu, le bureau de l'enseignant-e en\nvert, les meubles dédiés au rangement en orange, etc.\n\nLes productions des élèves seront sans doute assez variées,\nplus ou moins détaillées et les proportions plus ou moins\nrespectées. La représentation des objets peut permettre la\nréactivation du vocabulaire sur les formes géométriques\n(rectangle, carré...). L'enseignant-e peut aussi distribuer par\nla suite un plan de la classe réalisé par ses soins pour initier\nles élèves à la manière de symboliser les éléments sur un\nplan.\n\nSi l'enseignant-e a réalisé des photos de sa classe, elles\npourront être un support pour des descriptions : au premier\nplan, il y a les élèves ; au second plan, le tableau, etc.\nL'enseignant-e distribue ensuite la fiche élève 3. Sur cette\nfiche, les élèves vont devoir se repérer sur le dessin d'une\nclasse et le plan correspondant. On pourra ainsi utiliser le\nvocabulaire de position et de déplacement spécifique.\n\n2 Je retiens\n\n«Le plan est une représentation d'un espace vu de\ndessus. Il sert à se repérer.\n\n* Le plan de la classe permet de voir l'ensemble de la\nclasse et l'emplacement des meubles.\n\n«Pour faire un plan, je peux utiliser des photos, des\ndessins ou une maquette.\n\nPosition\nPoint de vue\n\nMots à retenir\n\nDéplacement\nMaquette\n\n| Séance 4 MFT\n\nSavoir se repérer dans son environnement proche :\nl'école.\n\nÉtudier quelques modes de représentation de l'espace\nenvironnant : le plan de l'école.\n\n@ Je m'interroge\n\nCette séance va permettre de réinvestir les connaissances\nacquises de façon plus large et de contribuer à ce que les\nélèves puissent se repérer dans leur lieu de vie : l'école.\nL'enseignant-e rappelle ce qui a été fait au CP sur l'espace\nde la classe (maquette, plan) puis interroge ses élèves :\n\n[Nous allons faire le plan de l’école. Que devons-nous\n| faire pour cela ?\n\nLes élèves peuvent proposer de faire comme pour la classe :\n« on fait une maquette et puis ensuite on dessine un plan ».\nIls peuvent aussi parler de repérer les différents espaces de\nl'école munis d'appareils photos.\n\n Je recherche\n\nL'enseignant-e propose aux élèves de se déplacer dans\nl'école, afin de repérer les bâtiments et de s'orienter. Les\nélèves repèrent ainsi les éléments essentiels : la cour, les\ntoilettes, la cantine, les classes, etc. Les élèves vont utili-\nser le vocabulaire de position et de déplacement qu'ils ont\nacquis.\n\nLes élèves vont transférer les photos et les observer ensuite\nen classe. Ils passeront ensuite à la représentation de l'école\npar le dessin. Pour cela, ils peuvent choisir un code couleur\npour les différents espaces.\n\nL'enseignant-e montre ensuite un plan de l'école (plan\nde sécurité incendie, par exemple) et invite les élèves à le\ncommenter (par rapport à leurs dessins) et à identifier des\nrepères à l'extérieur (la cour, la cantine, etc.) et à l'inté-\nrieur des bâtiments (le couloir, ma classe... puis les autres\nclasses, etc.). On pourra préciser ce que l'on voit sur un plan\nd'école (les murs, les portes, les fenêtres...) et ce qui ne s'y\ntrouve pas (les meubles, les tapis.\nL'enseignant-e distribue la fiche élève 4. Les exercices pro-\nposés permettront de travailler sur la maquette et le plan\nd'une école imaginaire.\n\n2 Je retiens\n\n«Le plan est une représentation d'un espace vu de\ndessus. Il sert a se repérer.\n\n«Le plan de l'école permet de voir l'ensemble de l'es-\npace scolaire, à l'intérieur et à l'extérieur des bâtiments.\n\nPlan\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nSe situer dans l’espace » 259",
    guidePageDecisions: [
      {
        page: 257,
        confidence: 93,
        score: 24,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "en classe",
        ],
        phaseMarkers: ["je m'interroge", "j'experimente"],
        teacherLanguageMarkers: ["enseignant", "eleves", "groupe", "en classe"],
        studentLike: true,
      },
      {
        page: 258,
        confidence: 93,
        score: 18,
        included: true,
        strongMarkers: ["seance", "l'enseignant", "enseignant-e", "les eleves", "aux eleves"],
        phaseMarkers: ["je m'interroge", "j'experimente", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on interroge", "on distribue", "groupe"],
        studentLike: true,
      },
      {
        page: 259,
        confidence: 93,
        score: 22,
        included: true,
        strongMarkers: [
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "en classe",
        ],
        phaseMarkers: ["je m'interroge", "j'experimente", "je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on propose", "en classe"],
        studentLike: true,
      },
      {
        page: 260,
        confidence: 92,
        score: -4,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: true,
      },
    ],
    skippedProbePages: [260],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-21",
    dossierNumber: 21,
    partNumber: 5,
    partTitle: "Se situer dans l'espace",
    title: "Comment me repérer sur une carte ?",
    guidePages: [271, 272],
    guidePageCount: 2,
    objectives: [
      "Se repérer sur des cartes.",
      "Savoir utiliser une boussole.",
      "Connaître les éléments constitutifs d'une carte : titre, échelle, orientation, légende.",
      "En CP et CE1, l'élève a appris à se repérer et à représenter la classe puis l'école et son quar-",
    ],
    progressionNote:
      "tier proche. Pour cela, il a étudié des représentations de l’espace environnant (maquettes,\nplans, photos) et en a produit lui-même. Il a notamment dessiné l’espace de l’école. C’est\nl'objet du dossier 20.\nse repérer sur une carte : lire le titre d'une carte, l'échelle, l'orientation, la légende ; préle-\nver des informations pertinentes. Il pourra ainsi s'orienter et se déplacer en utilisant des\nrepères. Pour cela, il va notamment apprendre à se servir d'une boussole.",
    material: [
      "Différentes cartes, des boussoles.",
      "Le dossier 21 est quant à lui consacré au niveau CE2. L'élève va maintenant apprendre à",
      "ITT]",
      "Se repérer sur des cartes.",
      "Connaitre les éléments constitutifs d'une carte : titre,",
      "échelle, orientation, légende.",
      "a Je m'interroge",
      "L'enseignant-e présente différentes cartes aux élèves : carte",
      "du département, carte de la région, carte de France. On leur",
      "demande alors :",
      "Quels noms portent ces documents ?",
      "La plupart des élèves donneront très probablement le",
      "nom de carte. Ils pourront préciser qu'il s'agit d’une",
      "carte de région ou de la France... (selon ce que présente",
      "l'enseignant-e).",
      "On interroge ensuite les élèves :",
      "Quelles informations nous donnent ces cartes ?",
      "À quoi servent-elles ?",
      "Les élèves peuvent raconter que leurs parents utilisent par-",
      "fois une carte pour trouver leur itinéraire quand ils sont en",
      "vacances ou qu'une carte s'affiche sur l'écran de leur GPS",
      "dans la voiture, ou encore que les cartes servent à se repé-",
      "rer, à trouver son chemin. Il est peu vraisemblable que les",
      "élèves parlent spontanément de légende ou d'échelle de la",
      "carte mais ils peuvent parler de façon détournée d'orienta-",
      "tion et éventuellement de titre.",
      "Je recherche",
      "L'enseignant-e propose alors aux élèves d'observer de plus",
      "près les cartes apportées et de noter par groupe de 4 les",
      "informations données par les différentes cartes distribuées.",
      "On met à disposition une carte par groupe. Après ce temps",
      "de recherche, les élèves de chaque groupe expliquent à leurs",
      "© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
      "camarades ce qu'ils ont trouvé. Une mise en commun est",
      "effectuée ensuite : il y a un titre sur les cartes, une échelle,",
      "une orientation, la rose des vents, les points cardinaux, une",
      "légende. Ces termes, pour la plupart, ne seront sans doute",
      "pas connu des élèves : l'enseignant-e les précise au fur et à",
      "mesure des observations des élèves.",
      "À la suite de cette phase de recherche, on distribue la fiche",
      "élève 1 afin de prélever des informations sur des exemples",
      "de cartes, de trouver des titres aux cartes, les légendes,",
      "l'orientation, l'échelle, etc.",
      "Je retiens",
      "+ Une carte représente un lieu (commune, départe-",
      "ment, région, pays, etc.) à une échelle réduite. Elle sert à",
      "se repérer dans ce lieu.",
      "«Une carte donne de nombreuses informations.",
      "Elle a toujours un titre, une légende, une orientation,",
      "une échelle.",
    ],
    sessions: [
      {
        number: 2,
        title: "Savoir utiliser une boussole.",
        rawText:
          "Séance 2 MTL]\nSavoir utiliser une boussole.\na Je m'interroge\nL'enseignant-e apporte des boussoles en classe et pré-\n\nsente une rose des vents qui ne comporte pas d'indication\n(modèle ci-dessous).\n\nSe situer dans l'espace o 271\n\nFiche enseignant\n\nOn demande aux élèves : N. B. : Les groupes peuvent être différents suivant le nombre\nde boussoles disponibles.\n\nOn distribue ensuite la fiche élève 2. Les exercices propo-\nLes élèves reconnaissent facilement la boussole et la rose | sés permettront de travailler sur les points cardinaux et la\n\n| Qu'est-ce que c'est ?\n\ndes vents qu'ils ont déjà vu dans la séance précédente. boussole. Celle-ci sert à s'orienter et indique le Nord.\nL'enseignant-e demande alors : N. B. : Certains élèves peuvent demander pourquoi l'aiguille «__\n| Que manque-t-il sur la rose des vents ? de la boussole indique forcément le Nord. L'enseignant-e\n\npeut alors répondre que l'aiguille de la boussole est aiman-\ntée. La Terre est elle-même comme un grand aimant : elle\nest parcourue par un gigantesque champ magnétique qui\npermet à l'aiguille aimantée d'être attirée par le pôle Nord.\n\nLes élèves vont sûrement parler des points cardinaux :\nNord — Sud — Est — Ouest.\n\nOn propose alors aux élèves de placer les quatre points\ncardinaux : N-S-E-O. Pour cela, on les interroge à nouveau :\n\nNous savons qu'il y a quatre points cardinaux. .\n\nMais comment pouvons-nous savoir où est le Nord ? = Je retiens\nCertains proposent alors d'utiliser la boussole. * Sur une carte, le Nord est toujours représenté en haut,\n\nle Sud en bas, l'Est à droite et l'Ouest à gauche.\n\n#2 J'observe « Ce sont les quatre points cardinaux (Nord-Sud-Est-\nL'enseignant-e place alors les élèves par groupe de 2 et leur Ouest) que l'on Lips SAC la oe des Ags,\npermet d'utiliser la boussole dans la cour de l’école afin de + Une boussole sert à s'orienter. L'aiguille rouge de la\ndéterminer où se trouvent le Nord, le Sud, l'Est et l'Ouest. boussole indique toujours le Nord.\n\n&\n\nLIRE UNE CARTE\n\n© Une carte représente un lieu Le relief de la France\n(commune, département, région, pays,\netc.) à une échelle réduite.\nElle sert à se repérer dans ce lieu.\n\n© Une carte donne de nombreuses\ninformations. Elle a toujours un titre,\nune légende, une orientation,\nune échelle.\n\n© Pour comprendre une carte, il faut :\n— lire le titre qui annonce le thème\n\nde la carte ;\n— regarder la légende pour comprendre\n\n_\nles symboles ;\n— observer la rose des vents qui permet\nde se repérer (grâce aux points cardinaux) ;\n— lire l'échelle qui représente la taille\nréelle de l'espace ;\n— observer ses motifs ou ses couleurs\n(si elle est en couleur). Altitude en mètres\nMots à retenir\nCarte\nTitre Échelle Orientation Légende\nPoints cardinaux Rose des vents Boussole\nNord Sud Est Ouest =\n\n272 » Se situer dans l'espace © MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e apporte des boussoles en classe et pré-\n\nsente une rose des vents qui ne comporte pas d'indication\n(modèle ci-dessous).\n\nSe situer dans l'espace o 271\n\nFiche enseignant\n\nOn demande aux élèves : N. B. : Les groupes peuvent être différents suivant le nombre\nde boussoles disponibles.\n\nOn distribue ensuite la fiche élève 2. Les exercices propo-\nLes élèves reconnaissent facilement la boussole et la rose | sés permettront de travailler sur les points cardinaux et la\n\n| Qu'est-ce que c'est ?\n\ndes vents qu'ils ont déjà vu dans la séance précédente. boussole. Celle-ci sert à s'orienter et indique le Nord.\nL'enseignant-e demande alors : N. B. : Certains élèves peuvent demander pourquoi l'aiguille «__\n| Que manque-t-il sur la rose des vents ? de la boussole indique forcément le Nord. L'enseignant-e\n\npeut alors répondre que l'aiguille de la boussole est aiman-\ntée. La Terre est elle-même comme un grand aimant : elle\nest parcourue par un gigantesque champ magnétique qui\npermet à l'aiguille aimantée d'être attirée par le pôle Nord.\n\nLes élèves vont sûrement parler des points cardinaux :\nNord — Sud — Est — Ouest.\n\nOn propose alors aux élèves de placer les quatre points\ncardinaux : N-S-E-O. Pour cela, on les interroge à nouveau :\n\nNous savons qu'il y a quatre points cardinaux. .\n\nMais comment pouvons-nous savoir où est le Nord ? =",
          },
          {
            title: "Je retiens",
            detail:
              "Certains proposent alors d'utiliser la boussole. * Sur une carte, le Nord est toujours représenté en haut,\n\nle Sud en bas, l'Est à droite et l'Ouest à gauche.\n\n#2",
          },
          {
            title: "J'observe",
            detail:
              "« Ce sont les quatre points cardinaux (Nord-Sud-Est-\nL'enseignant-e place alors les élèves par groupe de 2 et leur Ouest) que l'on Lips SAC la oe des Ags,\npermet d'utiliser la boussole dans la cour de l’école afin de + Une boussole sert à s'orienter. L'aiguille rouge de la\ndéterminer où se trouvent le Nord, le Sud, l'Est et l'Ouest. boussole indique toujours le Nord.\n\n&\n\nLIRE UNE CARTE\n\n© Une carte représente un lieu Le relief de la France\n(commune, département, région, pays,\netc.) à une échelle réduite.\nElle sert à se repérer dans ce lieu.\n\n© Une carte donne de nombreuses\ninformations. Elle a toujours un titre,\nune légende, une orientation,\nune échelle.\n\n© Pour comprendre une carte, il faut :\n— lire le titre qui annonce le thème\n\nde la carte ;\n— regarder la légende pour comprendre\n\n_\nles symboles ;\n— observer la rose des vents qui permet\nde se repérer (grâce aux points cardinaux) ;\n— lire l'échelle qui représente la taille\nréelle de l'espace ;\n— observer ses motifs ou ses couleurs\n(si elle est en couleur). Altitude en mètres\nMots à retenir\nCarte\nTitre Échelle Orientation Légende\nPoints cardinaux Rose des vents Boussole\nNord Sud Est Ouest =\n\n272 » Se situer dans l'espace © MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
          },
        ],
      },
    ],
    guideText:
      ") Comment me repérer sur une carte ?\n\n4\n\n» Objectifs\n* Se repérer sur des cartes.\n\n| = Savoir utiliser une boussole.\n\n* Connaître les éléments constitutifs d'une carte : titre, échelle, orientation, légende.\n\n| En CP et CE1, l'élève a appris à se repérer et à représenter la classe puis l'école et son quar-\n\n|\n| > Indications de progression dans le cycle 2 |\n|\n|\n\ntier proche. Pour cela, il a étudié des représentations de l’espace environnant (maquettes,\n\nplans, photos) et en a produit lui-même. Il a notamment dessiné l’espace de l’école. C’est\n\nl'objet du dossier 20.\n\nse repérer sur une carte : lire le titre d'une carte, l'échelle, l'orientation, la légende ; préle- |\nver des informations pertinentes. Il pourra ainsi s'orienter et se déplacer en utilisant des\n\nrepères. Pour cela, il va notamment apprendre à se servir d'une boussole.\n\n| » Matériel\n| Différentes cartes, des boussoles.\n{\n\n|\n|\n Le dossier 21 est quant à lui consacré au niveau CE2. L'élève va maintenant apprendre à |\n|\n|\n\n ITT]\n\nSe repérer sur des cartes.\nConnaitre les éléments constitutifs d'une carte : titre,\néchelle, orientation, légende.\n\na Je m'interroge\n\nL'enseignant-e présente différentes cartes aux élèves : carte\ndu département, carte de la région, carte de France. On leur\ndemande alors :\n\n[Quels noms portent ces documents ?\n\nLa plupart des élèves donneront très probablement le\nnom de carte. Ils pourront préciser qu'il s'agit d’une\ncarte de région ou de la France... (selon ce que présente\nl'enseignant-e).\n\nOn interroge ensuite les élèves :\n\nQuelles informations nous donnent ces cartes ?\nÀ quoi servent-elles ?\n\nLes élèves peuvent raconter que leurs parents utilisent par-\nfois une carte pour trouver leur itinéraire quand ils sont en\nvacances ou qu'une carte s'affiche sur l'écran de leur GPS\ndans la voiture, ou encore que les cartes servent à se repé-\nrer, à trouver son chemin. Il est peu vraisemblable que les\nélèves parlent spontanément de légende ou d'échelle de la\ncarte mais ils peuvent parler de façon détournée d'orienta-\ntion et éventuellement de titre.\n\nJe recherche\n\nL'enseignant-e propose alors aux élèves d'observer de plus\nprès les cartes apportées et de noter par groupe de 4 les\ninformations données par les différentes cartes distribuées.\nOn met à disposition une carte par groupe. Après ce temps\nde recherche, les élèves de chaque groupe expliquent à leurs\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\ncamarades ce qu'ils ont trouvé. Une mise en commun est\neffectuée ensuite : il y a un titre sur les cartes, une échelle,\nune orientation, la rose des vents, les points cardinaux, une\nlégende. Ces termes, pour la plupart, ne seront sans doute\npas connu des élèves : l'enseignant-e les précise au fur et à\nmesure des observations des élèves.\n\nÀ la suite de cette phase de recherche, on distribue la fiche\nélève 1 afin de prélever des informations sur des exemples\nde cartes, de trouver des titres aux cartes, les légendes,\nl'orientation, l'échelle, etc.\n\n2 Je retiens\n\n+ Une carte représente un lieu (commune, départe-\nment, région, pays, etc.) à une échelle réduite. Elle sert à\nse repérer dans ce lieu.\n\n«Une carte donne de nombreuses informations.\nElle a toujours un titre, une légende, une orientation,\nune échelle.\n\nSéance 2 MTL]\nSavoir utiliser une boussole.\na Je m'interroge\nL'enseignant-e apporte des boussoles en classe et pré-\n\nsente une rose des vents qui ne comporte pas d'indication\n(modèle ci-dessous).\n\nSe situer dans l'espace o 271\n\nFiche enseignant\n\nOn demande aux élèves : N. B. : Les groupes peuvent être différents suivant le nombre\nde boussoles disponibles.\n\nOn distribue ensuite la fiche élève 2. Les exercices propo-\nLes élèves reconnaissent facilement la boussole et la rose | sés permettront de travailler sur les points cardinaux et la\n\n| Qu'est-ce que c'est ?\n\ndes vents qu'ils ont déjà vu dans la séance précédente. boussole. Celle-ci sert à s'orienter et indique le Nord.\nL'enseignant-e demande alors : N. B. : Certains élèves peuvent demander pourquoi l'aiguille «__\n| Que manque-t-il sur la rose des vents ? de la boussole indique forcément le Nord. L'enseignant-e\n\npeut alors répondre que l'aiguille de la boussole est aiman-\ntée. La Terre est elle-même comme un grand aimant : elle\nest parcourue par un gigantesque champ magnétique qui\npermet à l'aiguille aimantée d'être attirée par le pôle Nord.\n\nLes élèves vont sûrement parler des points cardinaux :\nNord — Sud — Est — Ouest.\n\nOn propose alors aux élèves de placer les quatre points\ncardinaux : N-S-E-O. Pour cela, on les interroge à nouveau :\n\nNous savons qu'il y a quatre points cardinaux. .\n\nMais comment pouvons-nous savoir où est le Nord ? = Je retiens\nCertains proposent alors d'utiliser la boussole. * Sur une carte, le Nord est toujours représenté en haut,\n\nle Sud en bas, l'Est à droite et l'Ouest à gauche.\n\n#2 J'observe « Ce sont les quatre points cardinaux (Nord-Sud-Est-\nL'enseignant-e place alors les élèves par groupe de 2 et leur Ouest) que l'on Lips SAC la oe des Ags,\npermet d'utiliser la boussole dans la cour de l’école afin de + Une boussole sert à s'orienter. L'aiguille rouge de la\ndéterminer où se trouvent le Nord, le Sud, l'Est et l'Ouest. boussole indique toujours le Nord.\n\n&\n\nLIRE UNE CARTE\n\n© Une carte représente un lieu Le relief de la France\n(commune, département, région, pays,\netc.) à une échelle réduite.\nElle sert à se repérer dans ce lieu.\n\n© Une carte donne de nombreuses\ninformations. Elle a toujours un titre,\nune légende, une orientation,\nune échelle.\n\n© Pour comprendre une carte, il faut :\n— lire le titre qui annonce le thème\n\nde la carte ;\n— regarder la légende pour comprendre\n\n_\nles symboles ;\n— observer la rose des vents qui permet\nde se repérer (grâce aux points cardinaux) ;\n— lire l'échelle qui représente la taille\nréelle de l'espace ;\n— observer ses motifs ou ses couleurs\n(si elle est en couleur). Altitude en mètres\nMots à retenir\nCarte\nTitre Échelle Orientation Légende\nPoints cardinaux Rose des vents Boussole\nNord Sud Est Ouest =\n\n272 » Se situer dans l'espace © MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
    guidePageDecisions: [
      {
        page: 271,
        confidence: 93,
        score: 24,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "en classe",
        ],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: [
          "enseignant",
          "eleves",
          "on interroge",
          "on distribue",
          "groupe",
          "en classe",
        ],
        studentLike: true,
      },
      {
        page: 272,
        confidence: 91,
        score: 18,
        included: true,
        strongMarkers: ["seance", "l'enseignant", "enseignant-e", "les eleves", "aux eleves"],
        phaseMarkers: ["j'observe", "je retiens"],
        teacherLanguageMarkers: [
          "enseignant",
          "eleves",
          "on demande",
          "on propose",
          "on distribue",
          "groupe",
        ],
        studentLike: true,
      },
      {
        page: 273,
        confidence: 89,
        score: -3,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: true,
      },
    ],
    skippedProbePages: [273],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-22",
    dossierNumber: 22,
    partNumber: 5,
    partTitle: "Se situer dans l'espace",
    title: "Où est-ce que j'habite sur Terre ?",
    guidePages: [279, 280],
    guidePageCount: 2,
    objectives: [
      "Identifier des représentations globales de la Terre et du monde.",
      "Situer et repérer les espaces étudiés sur une carte ou un globe.",
      "Repérer la position de sa région, de la France, de l’Europe et des autres continents.",
    ],
    progressionNote:
      "Ce dossier s'adresse uniquement aux élèves de CE2, conformément au programme : « Au\nCE2, on commence l'étude de l'espace géographique terrestre à travers quelques milieux\ngéographiques caractéristiques, [...] L'usage de cartes, cartes numériques, planisphères,\nglobe comme instruments de visualisation de la planète permet à l'élève de repérer la pré-\nsence des océans, des mers, des continents, de l'équateur et des pôles... »\nTrois séances sont proposées pour traiter ce dossier, avec les fiches élève associées et une\nfiche d'évaluation finale.",
    material: [
      "Globe terrestre, planisphère, ballon crevé.",
      "soe",
      "Identifier des représentations globales de la Terre et du",
      "monde.",
      "Matériel : globe terrestre, planisphère et si possible un",
      "ballon crevé (ballon de basket par exemple).",
      "Je m'interroge",
      "L'enseignant-e apporte en classe un globe terrestre et un",
      "planisphère. On les montre aux élèves et on leur demande :",
      "Quels sont ces objets ? Comment s'appellent-ils ?",
      "Qu'est-ce qu'ils représentent ? Qu'ont-ils en commun ?",
      "Pourquoi sont-ils différents néanmoins ?",
      "On peut attendre des élèves les réponses suivantes :",
      "— pour la carte : « c'est une carte », « c'est une carte de la",
      "Terre » ;",
      "— pour le globe terrestre : « c'est une maquette de notre",
      "planète », « c'est un globe ».",
      "— pour les points communs et les différences : « c'est la",
      "Terre à chaque fois », « il y en a un c'est une boule et l'autre",
      "c'est plat », « sur la carte, on voit tous les pays en même",
      "temps », « on ne peut pas sur le globe, il y a toujours une",
      "partie cachée. »",
      "L'enseignant-e indique ou rappelle alors le nom de ces deux",
      "représentations de notre planète, la Terre :",
      "— le globe terrestre : c'est une boule, une sphère qui repro-",
      "duit comme une maquette notre planète ;",
      "— le planisphère : c'est une mise à plat du globe qui est for-",
      "cément déformée au niveau des pôles.",
      "N. B. : L'enseignant-e peut, pour le montrer, utiliser un bal-",
      "lon crevé qu'on découpe pour essayer de le mettre à plat",
      "devant les élèves : il faut procéder à plusieurs découpes au",
      "niveau des pôles pour y parvenir.",
      "Un discussion s'ensuit. On explique que l'on retrouve sur",
      "le globe et le planisphère les mêmes continents (de grands",
      "blocs de terre) et les mêmes océans (de grandes étendues",
      "© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
      "d'eau salée). On situe les pôles (pôle Sud et pôle Nord) sur",
      "le globe et l'équateur sur le globe et le planisphère. On",
      "explique que l'équateur est une ligne imaginaire qui sépare",
      "la Terre en deux hémisphères, Nord et Sud.",
      "Je recherche",
      "Collectivement, les élèves viennent alors à tour de rôle",
      "repérer sur le globe et sur le planisphère un continent, un",
      "espace (pays, massif montagneux...), le pôle Nord, le pôle",
      "Sud (uniquement sur le globe), l'équateur. Puis l'enseignant-e",
      "place les élèves en activité individuelle en distribuant la",
      "fiche élève 1.",
      "L2 Je retiens",
      "«Notre planète, la Terre, sur laquelle nous vivons,",
      "à la forme d'une boule (d'une sphère).",
      "» On peut représenter la Terre :",
      "— par un globe terrestre sur lequel on peut repérer",
      "l'équateur, le pôle Nord et le pôle Sud ;",
      "— par un planisphère qui permet d'avoir une vue d’en-",
      "semble de notre monde.",
      "ase",
      "Repérer la position de sa région, de la France, de l'Europe",
      "et les autres continents sur une carte ou sur un globe.",
      "Jem interroge",
      "L'enseignant-e rappelle les éléments abordés dans la",
    ],
    sessions: [
      {
        number: 1,
        title:
          "les élèves : Pouvez-vous situer sur ce planisphère l'endroit, le lieu ville ou village) où vous habitez ?",
        rawText:
          "séance 1. On reprend ensuite le planisphère et on interroge\nles élèves :\n\nPouvez-vous situer sur ce planisphère l'endroit, le lieu\n(ville ou village) où vous habitez ?\n\nSe situer dans l'espace o 279\n\nFiche enseignant\n\nSi certains élèves repèrent facilement notre pays ou le ter-\nritoire d'outre-mer où ils vivent, ils vont sans doute avoir\ndes difficultés à aller au-delà. On peut alors se demander\ncollectivement pourquoi. Les élèves vont répondre : « On\nne voit pas notre ville (ou notre village) », « c'est trop petit\nlà où on vit »...\n\nL'enseignant-e propose alors d'utiliser une autre carte plus\nprécise, un peu comme si on zoomait sur notre pays.\n\nJe recherche\n\nOn affiche alors une carte de l’Europe, le continent sur\nlequel on vit. On essaie collectivement de le repérer sur\nle planisphère : on peut évider dans une feuille blanche un\ncarré, que l'on déplace sur le planisphère jusqu'à y retrou-\nver les contours de la carte de l'Europe utilisée.\nL'enseignant-e demande aux élèves si on peut maintenant\nsur cette carte de l’Europe, notre continent, repérer l’en-\ndroit où nous vivons. Les élèves constatent que c'est encore\ntrop imprécis. Il faut zoomer encore.\n\nL'enseignant-e propose alors une carte de notre pays, la\nFrance. On peut plus facilement cette fois repérer l'endroit\noù l’on vit. On peut alors pour une précision encore plus\ngrande zoomer encore une fois en passant à une carte de la\nrégion où se trouve l'école et y repérer la ville ou le village\noù on vit.\n\nL'enseignant-e place alors sur une affiche format raisin\n(50 x 65 cm) les cartes étudiées en les disposant comme\nindiqué. Cet affichage peut rester sur un mur de la classe\net permet aux élèves de conserver une mémoire de ces\ndifférents espaces (modèle ci-dessous).\n\nPuis on distribue la fiche élève 2 pour engager un travail\nindividuel de synthèse.\n\nN. B. : Concernant les territoires d'outre-mer, on situe le\nterritoire et la métropole sur le planisphère.\n\n2 Je retiens\n\n+ Un planisphère ou un globe terrestre représentent\nnotre Terre en entier.\n\n«Si je veux retrouver exactement l'endroit où je vis,\nje dois utiliser des cartes de plus en plus précises :\n\n— une carte du continent où je vis : l'Europe ;\n\n— une carte du pays où je vis : la France ;\n\n— une carte de la région où je vis.\n\nMots à retenir",
        phases: [
          {
            title: "Je recherche",
            detail:
              "On affiche alors une carte de l’Europe, le continent sur\nlequel on vit. On essaie collectivement de le repérer sur\nle planisphère : on peut évider dans une feuille blanche un\ncarré, que l'on déplace sur le planisphère jusqu'à y retrou-\nver les contours de la carte de l'Europe utilisée.\nL'enseignant-e demande aux élèves si on peut maintenant\nsur cette carte de l’Europe, notre continent, repérer l’en-\ndroit où nous vivons. Les élèves constatent que c'est encore\ntrop imprécis. Il faut zoomer encore.\n\nL'enseignant-e propose alors une carte de notre pays, la\nFrance. On peut plus facilement cette fois repérer l'endroit\noù l’on vit. On peut alors pour une précision encore plus\ngrande zoomer encore une fois en passant à une carte de la\nrégion où se trouve l'école et y repérer la ville ou le village\noù on vit.\n\nL'enseignant-e place alors sur une affiche format raisin\n(50 x 65 cm) les cartes étudiées en les disposant comme\nindiqué. Cet affichage peut rester sur un mur de la classe\net permet aux élèves de conserver une mémoire de ces\ndifférents espaces (modèle ci-dessous).\n\nPuis on distribue la fiche élève 2 pour engager un travail\nindividuel de synthèse.\n\nN. B. : Concernant les territoires d'outre-mer, on situe le\nterritoire et la métropole sur le planisphère.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "+ Un planisphère ou un globe terrestre représentent\nnotre Terre en entier.\n\n«Si je veux retrouver exactement l'endroit où je vis,\nje dois utiliser des cartes de plus en plus précises :\n\n— une carte du continent où je vis : l'Europe ;\n\n— une carte du pays où je vis : la France ;\n\n— une carte de la région où je vis.\n\nMots à retenir",
          },
        ],
      },
      {
        number: 3,
        title:
          "Situer et repérer les espaces étudiés sur une carte ou un globe (les continents, les mers et les océans).",
        rawText:
          "| Séance 3 JETT\n\nSituer et repérer les espaces étudiés sur une carte ou un\nglobe (les continents, les mers et les océans).\n\nEJ Je m'interroge\n\nL'enseignant-e résume avec ses élèves les connaissances\nacquises lors des deux premières séances : notre ville (ou\nvillage) se trouve dans une région. On peut en même temps\nla montrer sur une carte murale. Cette région fait partie\nde notre pays, la France. Ce pays fait partie d'un conti-\nnent, l’Europe. Ce continent faisant lui-même partie des\ngrandes étendues de terres de notre planète, la Terre. On\npeut la représenter grâce à un globe ou un planisphère.\nL'enseignant-e montre le planisphère aux élèves. Il y pointe\nla France (ou le lieu où les élèves résident si ce n'est pas en\nmétropole). Puis on interroge les élèves :\n\n| Mais que voyez-vous d'autre sur ce planisphère ?\n\nOn peut attendre des réponses comme : « il y a beaucoup\nde bleu, ce sont des mers, des océans », « il y a d'autres\nterres ! », « oui, là, c'est l'Afrique !... »\n\nL'enseignant-e propose alors de rechercher les noms de ces\nautres continents et des océans qui les entourent.\n\n Je recherche\n\nLes élèves sont placés par groupes de 4 élèves.\nL'enseignant-e distribue aux élèves le planisphère simpli-\nfié (= sur CD-Rom) et une feuille blanche au format AS.\nOn leur demande de repérer le Nord, le Sud, l'Est, l'Ouest,\nl'équateur puis l'Europe et enfin la France. On demande\nensuite à chaque groupe de séparer la feuille blanche en\ndeux colonnes comme indiqué ci-dessous :\n\nContinents Océans\n\nPuis de rechercher sur le planisphère les noms des diffé-\nrents continents et océans de notre planète.\n\nAprès un temps de recherche, une mise en commun est\neffectuée. On peut alors construire ensemble la trace écrite\nliée à cette séance avant de placer les élèves en travail indi-\nviduel sur la fiche élève 3.\n\n[7] Je retiens\n\n«A la surface de notre planète, la Terre, il y a de grandes\nétendues d'eau salée : les mers et les océans. Il y a cinq\nocéans:l’océanAtlantique, l'océan Pacifique, l'océan Indien,\nl'océan glacial Arctique et l'océan glacial Antarctique.\n\n+ On y voit aussi de grandes étendues de terre : les\ncontinents. Il y a six continents : l'Europe, l'Afrique,\nl'Amérique, l'Asie, l'Océanie, et l'Antarctique.\n\nLa Terre Globe terrestre Planisphère\nContinents Mers/Océans\nÉquateur Pôle Nord Pôle Sud\n\n280 » Se situer dans l'espace\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e résume avec ses élèves les connaissances\nacquises lors des deux premières séances : notre ville (ou\nvillage) se trouve dans une région. On peut en même temps\nla montrer sur une carte murale. Cette région fait partie\nde notre pays, la France. Ce pays fait partie d'un conti-\nnent, l’Europe. Ce continent faisant lui-même partie des\ngrandes étendues de terres de notre planète, la Terre. On\npeut la représenter grâce à un globe ou un planisphère.\nL'enseignant-e montre le planisphère aux élèves. Il y pointe\nla France (ou le lieu où les élèves résident si ce n'est pas en\nmétropole). Puis on interroge les élèves :\n\n| Mais que voyez-vous d'autre sur ce planisphère ?\n\nOn peut attendre des réponses comme : « il y a beaucoup\nde bleu, ce sont des mers, des océans », « il y a d'autres\nterres ! », « oui, là, c'est l'Afrique !... »\n\nL'enseignant-e propose alors de rechercher les noms de ces\nautres continents et des océans qui les entourent.",
          },
          {
            title: "Je recherche",
            detail:
              "Les élèves sont placés par groupes de 4 élèves.\nL'enseignant-e distribue aux élèves le planisphère simpli-\nfié (= sur CD-Rom) et une feuille blanche au format AS.\nOn leur demande de repérer le Nord, le Sud, l'Est, l'Ouest,\nl'équateur puis l'Europe et enfin la France. On demande\nensuite à chaque groupe de séparer la feuille blanche en\ndeux colonnes comme indiqué ci-dessous :\n\nContinents Océans\n\nPuis de rechercher sur le planisphère les noms des diffé-\nrents continents et océans de notre planète.\n\nAprès un temps de recherche, une mise en commun est\neffectuée. On peut alors construire ensemble la trace écrite\nliée à cette séance avant de placer les élèves en travail indi-\nviduel sur la fiche élève 3.\n\n[7]",
          },
          {
            title: "Je retiens",
            detail:
              "«A la surface de notre planète, la Terre, il y a de grandes\nétendues d'eau salée : les mers et les océans. Il y a cinq\nocéans:l’océanAtlantique, l'océan Pacifique, l'océan Indien,\nl'océan glacial Arctique et l'océan glacial Antarctique.\n\n+ On y voit aussi de grandes étendues de terre : les\ncontinents. Il y a six continents : l'Europe, l'Afrique,\nl'Amérique, l'Asie, l'Océanie, et l'Antarctique.\n\nLa Terre Globe terrestre Planisphère\nContinents Mers/Océans\nÉquateur Pôle Nord Pôle Sud\n\n280 » Se situer dans l'espace\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
          },
        ],
      },
    ],
    guideText:
      "PJ Où est-ce que j'habite sur Terre ?\n\n[> Objectifs\n\n| * Identifier des représentations globales de la Terre et du monde.\n\n| Situer et repérer les espaces étudiés sur une carte ou un globe.\n\n* Repérer la position de sa région, de la France, de l’Europe et des autres continents.\n\n| > Indications de progression dans le cycle 2\n\nCe dossier s'adresse uniquement aux élèves de CE2, conformément au programme : « Au\nCE2, on commence l'étude de l'espace géographique terrestre à travers quelques milieux\ngéographiques caractéristiques, [...] L'usage de cartes, cartes numériques, planisphères,\nglobe comme instruments de visualisation de la planète permet à l'élève de repérer la pré-\nsence des océans, des mers, des continents, de l'équateur et des pôles... »\n\nTrois séances sont proposées pour traiter ce dossier, avec les fiches élève associées et une\n\nfiche d'évaluation finale.\n\n> Matériel\nGlobe terrestre, planisphère, ballon crevé.\n\n soe\n\nIdentifier des représentations globales de la Terre et du\nmonde.\n\nMatériel : globe terrestre, planisphère et si possible un\nballon crevé (ballon de basket par exemple).\n\n[2] Je m'interroge\n\nL'enseignant-e apporte en classe un globe terrestre et un\nplanisphère. On les montre aux élèves et on leur demande :\n\nQuels sont ces objets ? Comment s'appellent-ils ?\nQu'est-ce qu'ils représentent ? Qu'ont-ils en commun ?\nPourquoi sont-ils différents néanmoins ?\n\nOn peut attendre des élèves les réponses suivantes :\n\n— pour la carte : « c'est une carte », « c'est une carte de la\nTerre » ;\n\n— pour le globe terrestre : « c'est une maquette de notre\nplanète », « c'est un globe ».\n\n— pour les points communs et les différences : « c'est la\nTerre à chaque fois », « il y en a un c'est une boule et l'autre\nc'est plat », « sur la carte, on voit tous les pays en même\ntemps », « on ne peut pas sur le globe, il y a toujours une\npartie cachée. »\n\nL'enseignant-e indique ou rappelle alors le nom de ces deux\nreprésentations de notre planète, la Terre :\n\n— le globe terrestre : c'est une boule, une sphère qui repro-\nduit comme une maquette notre planète ;\n\n— le planisphère : c'est une mise à plat du globe qui est for-\ncément déformée au niveau des pôles.\n\nN. B. : L'enseignant-e peut, pour le montrer, utiliser un bal-\nlon crevé qu'on découpe pour essayer de le mettre à plat\ndevant les élèves : il faut procéder à plusieurs découpes au\nniveau des pôles pour y parvenir.\n\nUn discussion s'ensuit. On explique que l'on retrouve sur\nle globe et le planisphère les mêmes continents (de grands\nblocs de terre) et les mêmes océans (de grandes étendues\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nd'eau salée). On situe les pôles (pôle Sud et pôle Nord) sur\nle globe et l'équateur sur le globe et le planisphère. On\nexplique que l'équateur est une ligne imaginaire qui sépare\nla Terre en deux hémisphères, Nord et Sud.\n\nJe recherche\n\nCollectivement, les élèves viennent alors à tour de rôle\nrepérer sur le globe et sur le planisphère un continent, un\nespace (pays, massif montagneux...), le pôle Nord, le pôle\nSud (uniquement sur le globe), l'équateur. Puis l'enseignant-e\nplace les élèves en activité individuelle en distribuant la\nfiche élève 1.\n\nL2 Je retiens\n\n«Notre planète, la Terre, sur laquelle nous vivons,\nà la forme d'une boule (d'une sphère).\n\n» On peut représenter la Terre :\n\n— par un globe terrestre sur lequel on peut repérer\nl'équateur, le pôle Nord et le pôle Sud ;\n\n— par un planisphère qui permet d'avoir une vue d’en-\nsemble de notre monde.\n\n ase\n\nRepérer la position de sa région, de la France, de l'Europe\net les autres continents sur une carte ou sur un globe.\n\n8 Jem interroge\n\nL'enseignant-e rappelle les éléments abordés dans la\nséance 1. On reprend ensuite le planisphère et on interroge\nles élèves :\n\nPouvez-vous situer sur ce planisphère l'endroit, le lieu\n(ville ou village) où vous habitez ?\n\nSe situer dans l'espace o 279\n\nFiche enseignant\n\nSi certains élèves repèrent facilement notre pays ou le ter-\nritoire d'outre-mer où ils vivent, ils vont sans doute avoir\ndes difficultés à aller au-delà. On peut alors se demander\ncollectivement pourquoi. Les élèves vont répondre : « On\nne voit pas notre ville (ou notre village) », « c'est trop petit\nlà où on vit »...\n\nL'enseignant-e propose alors d'utiliser une autre carte plus\nprécise, un peu comme si on zoomait sur notre pays.\n\nJe recherche\n\nOn affiche alors une carte de l’Europe, le continent sur\nlequel on vit. On essaie collectivement de le repérer sur\nle planisphère : on peut évider dans une feuille blanche un\ncarré, que l'on déplace sur le planisphère jusqu'à y retrou-\nver les contours de la carte de l'Europe utilisée.\nL'enseignant-e demande aux élèves si on peut maintenant\nsur cette carte de l’Europe, notre continent, repérer l’en-\ndroit où nous vivons. Les élèves constatent que c'est encore\ntrop imprécis. Il faut zoomer encore.\n\nL'enseignant-e propose alors une carte de notre pays, la\nFrance. On peut plus facilement cette fois repérer l'endroit\noù l’on vit. On peut alors pour une précision encore plus\ngrande zoomer encore une fois en passant à une carte de la\nrégion où se trouve l'école et y repérer la ville ou le village\noù on vit.\n\nL'enseignant-e place alors sur une affiche format raisin\n(50 x 65 cm) les cartes étudiées en les disposant comme\nindiqué. Cet affichage peut rester sur un mur de la classe\net permet aux élèves de conserver une mémoire de ces\ndifférents espaces (modèle ci-dessous).\n\nPuis on distribue la fiche élève 2 pour engager un travail\nindividuel de synthèse.\n\nN. B. : Concernant les territoires d'outre-mer, on situe le\nterritoire et la métropole sur le planisphère.\n\n2 Je retiens\n\n+ Un planisphère ou un globe terrestre représentent\nnotre Terre en entier.\n\n«Si je veux retrouver exactement l'endroit où je vis,\nje dois utiliser des cartes de plus en plus précises :\n\n— une carte du continent où je vis : l'Europe ;\n\n— une carte du pays où je vis : la France ;\n\n— une carte de la région où je vis.\n\nMots à retenir\n\n| Séance 3 JETT\n\nSituer et repérer les espaces étudiés sur une carte ou un\nglobe (les continents, les mers et les océans).\n\nEJ Je m'interroge\n\nL'enseignant-e résume avec ses élèves les connaissances\nacquises lors des deux premières séances : notre ville (ou\nvillage) se trouve dans une région. On peut en même temps\nla montrer sur une carte murale. Cette région fait partie\nde notre pays, la France. Ce pays fait partie d'un conti-\nnent, l’Europe. Ce continent faisant lui-même partie des\ngrandes étendues de terres de notre planète, la Terre. On\npeut la représenter grâce à un globe ou un planisphère.\nL'enseignant-e montre le planisphère aux élèves. Il y pointe\nla France (ou le lieu où les élèves résident si ce n'est pas en\nmétropole). Puis on interroge les élèves :\n\n| Mais que voyez-vous d'autre sur ce planisphère ?\n\nOn peut attendre des réponses comme : « il y a beaucoup\nde bleu, ce sont des mers, des océans », « il y a d'autres\nterres ! », « oui, là, c'est l'Afrique !... »\n\nL'enseignant-e propose alors de rechercher les noms de ces\nautres continents et des océans qui les entourent.\n\n Je recherche\n\nLes élèves sont placés par groupes de 4 élèves.\nL'enseignant-e distribue aux élèves le planisphère simpli-\nfié (= sur CD-Rom) et une feuille blanche au format AS.\nOn leur demande de repérer le Nord, le Sud, l'Est, l'Ouest,\nl'équateur puis l'Europe et enfin la France. On demande\nensuite à chaque groupe de séparer la feuille blanche en\ndeux colonnes comme indiqué ci-dessous :\n\nContinents Océans\n\nPuis de rechercher sur le planisphère les noms des diffé-\nrents continents et océans de notre planète.\n\nAprès un temps de recherche, une mise en commun est\neffectuée. On peut alors construire ensemble la trace écrite\nliée à cette séance avant de placer les élèves en travail indi-\nviduel sur la fiche élève 3.\n\n[7] Je retiens\n\n«A la surface de notre planète, la Terre, il y a de grandes\nétendues d'eau salée : les mers et les océans. Il y a cinq\nocéans:l’océanAtlantique, l'océan Pacifique, l'océan Indien,\nl'océan glacial Arctique et l'océan glacial Antarctique.\n\n+ On y voit aussi de grandes étendues de terre : les\ncontinents. Il y a six continents : l'Europe, l'Afrique,\nl'Amérique, l'Asie, l'Océanie, et l'Antarctique.\n\nLa Terre Globe terrestre Planisphère\nContinents Mers/Océans\nÉquateur Pôle Nord Pôle Sud\n\n280 » Se situer dans l'espace\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
    guidePageDecisions: [
      {
        page: 279,
        confidence: 92,
        score: 26,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "en classe",
        ],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on interroge", "en classe"],
        studentLike: true,
      },
      {
        page: 280,
        confidence: 93,
        score: 22,
        included: true,
        strongMarkers: [
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "par groupes",
        ],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: [
          "enseignant",
          "eleves",
          "on demande",
          "on interroge",
          "on distribue",
          "par groupes",
          "groupe",
        ],
        studentLike: true,
      },
      {
        page: 281,
        confidence: 88,
        score: -3,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: true,
      },
    ],
    skippedProbePages: [281],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-23",
    dossierNumber: 23,
    partNumber: 5,
    partTitle: "Se situer dans l'espace",
    title: "Où est la Terre dans le système solaire ?",
    guidePages: [289, 290],
    guidePageCount: 2,
    objectives: [
      "Savoir que la Terre fait partie d'un univers très vaste composé de différents types d’astres",
      "la Lune, le Soleil...).",
      "Savoir que la Terre tourne sur elle-même en 24 heures ; comprendre l'alternance jour/nuit.",
      "Savoir que la Terre tourne autour du Soleil en 365 jours ; appréhender les saisons.",
      "Savoir que la Lune est un satellite de la Terre ; appréhender les lunaisons.",
    ],
    progressionNote:
      "Ce dossier s'adresse uniquement aux élèves de CE2. Il s'agit d'acquérir les premières\nconnaissances sur le système solaire : repérage de la position de la Terre par rapport au\nsons à l'aide de modèles réduits (boules éclairées). Nous proposons quatre séances avec\ndes fiches élève associées et une fiche d'évaluation finale.",
    material: [
      "Le matériel nécessaire est indiqué dans chaque séance.",
      "ase",
      "Savoir que la Terre fait partie du système solaire avec",
      "d'autres astres (la Lune, le Soleil...).",
      "a8 Je m'interroge",
      "L'enseignant-e montre aux élèves un globe terrestre. On",
      "rappelle aux élèves que notre Terre est une sphère, une",
      "boule (dossier 22). Puis on demande :",
      "À votre avis, où se trouve la Terre ? Qu'y a-t-il autour de",
      "la Terre ?",
      "On peut attendre des élèves les réponses suivantes : « la",
      "Terre se trouve dans l'espace », « autour de la Terre, il y a",
      "la Lune, le Soleil ».",
      "On interroge à nouveau les élèves :",
      "Qu'est-ce que le Soleil ? la Lune ? Qu'y a-t-il d'autre",
      "dans ce que l'on appelle le système solaire ?",
      "On peut attendre les réponses suivantes : « le Soleil, c'est",
      "ce qui nous apporte de la lumière », « la Lune, on peut",
      "la voir la nuit et parfois le jour », « il y a aussi d'autres",
      "planètes », « il y a des étoiles »...",
      "L'enseignant-e explique qu'on appelle « astres » les objets",
      "naturels présents dans l’espace et que la Terre fait partie",
      "de ce que l'on appelle le « système solaire ». On propose",
      "alors de découvrir ensemble les autres astres que l'on peut",
      "trouver dans notre système solaire.",
      "Je recherche",
      "On distribue la fiche documentaire 1 et la fiche élève 1.",
      "La fiche documentaire est découverte collectivement. On",
      "laisse dans un premier temps les élèves s'exprimer et réa-",
      "gir puis l'enseignant-e en propose une lecture à voix haute.",
      "Les élèves peuvent ensuite compléter la fiche élève 1.",
      "Le travail par binôme est alors privilégié.",
      "© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
      "Je retiens",
      "Notre planète la Terre fait partie du système solaire.",
      "Le système solaire est composé d'une étoile (le",
      "Soleil) et de huit planètes (Mercure, Vénus, la Terre,",
      "Mars, Jupiter, Saturne, Uranus et Neptune).",
      "+ Ily a aussi d'autres astres dans le système solaire :",
      "des satellites qui tournent autour des planètes (comme",
      "la Lune) ; des comètes (boules de glace et de pous-",
      "siéres) ; ou encore des astéroïdes (qui tournent autour",
      "du Soleil).",
    ],
    sessions: [
      {
        number: 2,
        title:
          "Savoir que la Terre tourne sur elle-même en 24 heures ; comprendre l'alternance jour/nuit. Matériel : boule en polystyrène traversée par une aiguille",
        rawText:
          "| Séance 2 FFT]\n\nSavoir que la Terre tourne sur elle-même en 24 heures ;\ncomprendre l'alternance jour/nuit.\n\nMatériel : boule en polystyrène traversée par une aiguille\nà tricoter, lampe de bureau.\n\n@ Je nm’ interroge\n\nL'enseignant-e peut idéalement commencer le cours un\njour où le ciel est dégagé. On lance la séance ainsi : « Nous\navons vu que notre planète la Terre faisait partie du système\nsolaire et que le Soleil est l'étoile qui nous éclaire. »\nOn interroge ensuite les élèves :\n\nMais comment peut-on expliquer la succession du jour\net de la nuit ?\n\nSelon leurs connaissances, on peut attendre des réponses\ncomme : « le Soleil se déplace dans le ciel », « le Soleil se\nlève le matin et se couche le soir » ; ou encore : « c'est nous\nqui bougeons », « quand on est du côté du Soleil il fait jour,\nquand on est de l'autre côté il fait nuit ».\n\nL'enseignant-e propose alors aux élèves de modéliser ce\nphénomène.\n\nSe situer dans l'espace 289\n\nFiche enseignant\n\n@ Je recherche\n\nOn utilise une boule de polystyrène traversée d'une\naiguille à tricoter et une lampe de bureau. On questionne\nles élèves : « Que représente la lampe ? Que représente\nla boule ? Comment appelle-t-on les endroits où l'aiguille\nsort ? » Assez spontanément, les élèves vont identifier la\nlampe au Soleil et la boule à la Terre. Ils comprennent aussi\nque l'aiguille passe par le pôle Nord et le pôle Sud.\n\nUn-e élève tient la boule en utilisant l'aiguille à tricoter,\nun-e autre élève tient la lampe de bureau. On peut faire\nune petite croix sur la boule pour matérialiser l'endroit où\nl'on se trouve sur Terre. En faisant tourner la boule dans\nle sens inverse des aiguilles d’une montre, on voit la croix\nqui plonge dans l'obscurité puis revient à la lumière, puis\nreplonge dans l'obscurité.\n\nOn peut alors distribuer la fiche élève 2.\n\nC2 Je retiens\n\n* Le Soleil semble se déplacer dans le ciel au cours de la\njournée, mais c'est en fait la Terre qui tourne sur elle-\nmême autour d'un axe Nord-Sud.\n\n«Elle effectue cette rotation en une journée, c'est-à\ndire en 24 heures. C'est ce qui explique l'alternance du\njour et de la nuit.",
        phases: [
          {
            title: "Je recherche",
            detail:
              "On utilise une boule de polystyrène traversée d'une\naiguille à tricoter et une lampe de bureau. On questionne\nles élèves : « Que représente la lampe ? Que représente\nla boule ? Comment appelle-t-on les endroits où l'aiguille\nsort ? » Assez spontanément, les élèves vont identifier la\nlampe au Soleil et la boule à la Terre. Ils comprennent aussi\nque l'aiguille passe par le pôle Nord et le pôle Sud.\n\nUn-e élève tient la boule en utilisant l'aiguille à tricoter,\nun-e autre élève tient la lampe de bureau. On peut faire\nune petite croix sur la boule pour matérialiser l'endroit où\nl'on se trouve sur Terre. En faisant tourner la boule dans\nle sens inverse des aiguilles d’une montre, on voit la croix\nqui plonge dans l'obscurité puis revient à la lumière, puis\nreplonge dans l'obscurité.\n\nOn peut alors distribuer la fiche élève 2.\n\nC2",
          },
          {
            title: "Je retiens",
            detail:
              "* Le Soleil semble se déplacer dans le ciel au cours de la\njournée, mais c'est en fait la Terre qui tourne sur elle-\nmême autour d'un axe Nord-Sud.\n\n«Elle effectue cette rotation en une journée, c'est-à\ndire en 24 heures. C'est ce qui explique l'alternance du\njour et de la nuit.",
          },
        ],
      },
      {
        number: 3,
        title:
          "Savoir que la Terre tourne autour du Soleil en 365 jours. Appréhender la succession des saisons.",
        rawText:
          "| Séance 3 FFT)\n\nSavoir que la Terre tourne autour du Soleil en 365 jours.\nAppréhender la succession des saisons.\n\n[2] Je m'interroge\n\nL'enseignant-e montre aux élèves un globe terrestre.\nLes élèves rappellent le contenu de la séance précédente :\nle Soleil semble se déplacer dans le ciel mais c'est en fait\nla Terre qui tourne sur elle-même en 24 heures. Cette\nrotation explique la succession du jour et de la nuit.\nOn demande alors :\n\nMais le Soleil apparait-il et disparait-il toujours à\n\nla même heure ? Par exemple, quand vous vous levez\nle matin pour aller à l’école, dehors fait-il jour ou nuit ?\nLa durée du jour est-elle la même en été et en hiver ?\nEt y a-t-il d'autres changements dans l'année\n(température, végétation...) ?\n\nUn échange oral a lieu dans la classe. Certains élèves ne\nnotent peut être pas de changements dans l'année ;\nd'autres au contraire peuvent repérer qu'en hiver il fait nuit\nquand ils partent de chez eux et nuit encore à la fin de la\ngarderie/l’étude alors que ce n’est pas le cas au printemps.\nLes changements de température et de végétation seront\na priori plus facilement repérables par les élèves, selon le\nlieu où ils habitent. La notion de saisons peut être formulée.\nL'enseignant-e explique donc qu'il y a quatre saisons dans\nl'année et interroge à nouveau les élèves :\n\nSavez-vous si la Terre fait d'autres mouvements dans\nl'espace qui pourraient expliquer ces changements\n| de saisons ?\n\n290 » Se situer dans l'espace\n\nOn peut attendre, selon les connaissances des élèves, des\nréponses comme : « la Terre tourne autour du Soleil »,\n« elle met un an pour tourner autour du Soleil ». D'autres\nréponses erronées peuvent apparaitre ; dans ce cas, les\nnoter sur une affiche et y revenir à la fin de la séance pour\nles infirmer.\n\nL'enseignant-e propose alors de rechercher et de vérifier\nces informations.\n\n@ Je recherche\n\nOn distribue à chaque élève la fiche documentaire 2 et la\nfiche élève 3. La fiche documentaire est lue et explicitée\ncollectivement puis les élèves effectuent individuellement\nles exercices de la fiche élève 3.\n\nN. B. : Dans les pays à climat tropical, seules deux saisons\nont cours : la saison sèche et la saison des pluies. IL fait chaud\ntoute l’année. Cette alternance de deux saisons seulement\ns'explique par le fait que les rayons solaires parviennent très\nprès de la verticale dans ces régions du monde, provoquant\nun ensoleillement relativement constant.\n\n2 Je retiens\n\n«La Terre effectue une révolution (un tour complet)\nautour du Soleil, notre étoile, en 365 jours, c'est-à-dire\nen une année.\n\n* Les changements de saisons (printemps, été, automne\net hiver en France métropolitaine) sont liés à ce dépla-\ncement de la Terre autour du Soleil.\n\n« C'est l'inclinaison de l'axe de rotation de la Terre qui\nexplique ces changements.\n\n PTT)\n\nSavoir que la Lune est un satellite de la Terre.\nAppréhender les lunaisons.\n\ne Je m'interroge\n\nL'enseignant-e résume avec les élèves les connaissances\nacquises lors des précédentes séances. Puis on leur montre\nou leur projette un cliché de la Lune. On demande :\n\nQue reconnaissez-vous sur cette photo ?\nA-t-elle toujours la même forme ?\n\nOn peut attendre des réponses comme : « c'est une photo\nde la Lune », « on ne la voit pas toujours pareil », « parfois\nelle brille beaucoup », « parfois elle ressemble à un petit\ncroissant ».\n\nL'enseignant-e propose alors de connaître un peu mieux la\nLune...\n\n@ Je recherche\n\nOn distribue alors aux éléves la fiche documentaire 3 et la\nfiche élève 4.\n\nOn peut modéliser le déplacement de la Lune autour de la\nTerre (et de la Terre autour du Soleil) avec une maquette\ncomme celle-ci.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e montre aux élèves un globe terrestre.\nLes élèves rappellent le contenu de la séance précédente :\nle Soleil semble se déplacer dans le ciel mais c'est en fait\nla Terre qui tourne sur elle-même en 24 heures. Cette\nrotation explique la succession du jour et de la nuit.\nOn demande alors :\n\nMais le Soleil apparait-il et disparait-il toujours à\n\nla même heure ? Par exemple, quand vous vous levez\nle matin pour aller à l’école, dehors fait-il jour ou nuit ?\nLa durée du jour est-elle la même en été et en hiver ?\nEt y a-t-il d'autres changements dans l'année\n(température, végétation...) ?\n\nUn échange oral a lieu dans la classe. Certains élèves ne\nnotent peut être pas de changements dans l'année ;\nd'autres au contraire peuvent repérer qu'en hiver il fait nuit\nquand ils partent de chez eux et nuit encore à la fin de la\ngarderie/l’étude alors que ce n’est pas le cas au printemps.\nLes changements de température et de végétation seront\na priori plus facilement repérables par les élèves, selon le\nlieu où ils habitent. La notion de saisons peut être formulée.\nL'enseignant-e explique donc qu'il y a quatre saisons dans\nl'année et interroge à nouveau les élèves :\n\nSavez-vous si la Terre fait d'autres mouvements dans\nl'espace qui pourraient expliquer ces changements\n| de saisons ?\n\n290 » Se situer dans l'espace\n\nOn peut attendre, selon les connaissances des élèves, des\nréponses comme : « la Terre tourne autour du Soleil »,\n« elle met un an pour tourner autour du Soleil ». D'autres\nréponses erronées peuvent apparaitre ; dans ce cas, les\nnoter sur une affiche et y revenir à la fin de la séance pour\nles infirmer.\n\nL'enseignant-e propose alors de rechercher et de vérifier\nces informations.\n\n@",
          },
          {
            title: "Je recherche",
            detail:
              "On distribue à chaque élève la fiche documentaire 2 et la\nfiche élève 3. La fiche documentaire est lue et explicitée\ncollectivement puis les élèves effectuent individuellement\nles exercices de la fiche élève 3.\n\nN. B. : Dans les pays à climat tropical, seules deux saisons\nont cours : la saison sèche et la saison des pluies. IL fait chaud\ntoute l’année. Cette alternance de deux saisons seulement\ns'explique par le fait que les rayons solaires parviennent très\nprès de la verticale dans ces régions du monde, provoquant\nun ensoleillement relativement constant.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "«La Terre effectue une révolution (un tour complet)\nautour du Soleil, notre étoile, en 365 jours, c'est-à-dire\nen une année.\n\n* Les changements de saisons (printemps, été, automne\net hiver en France métropolitaine) sont liés à ce dépla-\ncement de la Terre autour du Soleil.\n\n« C'est l'inclinaison de l'axe de rotation de la Terre qui\nexplique ces changements.\n\n PTT)\n\nSavoir que la Lune est un satellite de la Terre.\nAppréhender les lunaisons.\n\ne",
          },
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e résume avec les élèves les connaissances\nacquises lors des précédentes séances. Puis on leur montre\nou leur projette un cliché de la Lune. On demande :\n\nQue reconnaissez-vous sur cette photo ?\nA-t-elle toujours la même forme ?\n\nOn peut attendre des réponses comme : « c'est une photo\nde la Lune », « on ne la voit pas toujours pareil », « parfois\nelle brille beaucoup », « parfois elle ressemble à un petit\ncroissant ».\n\nL'enseignant-e propose alors de connaître un peu mieux la\nLune...\n\n@",
          },
          {
            title: "Je recherche",
            detail:
              "On distribue alors aux éléves la fiche documentaire 3 et la\nfiche élève 4.\n\nOn peut modéliser le déplacement de la Lune autour de la\nTerre (et de la Terre autour du Soleil) avec une maquette\ncomme celle-ci.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
          },
        ],
      },
    ],
    guideText:
      "} Où est la Terre dans le système solaire ?\n\n| Soleil (cartes du système solaire), compréhension des changements de saisons et de lunai-\n\nObjectifs D\n\n= Savoir que la Terre fait partie d'un univers très vaste composé de différents types d’astres\n(la Lune, le Soleil...).\n\n* Savoir que la Terre tourne sur elle-même en 24 heures ; comprendre l'alternance jour/nuit.\n\n* Savoir que la Terre tourne autour du Soleil en 365 jours ; appréhender les saisons.\n\n* Savoir que la Lune est un satellite de la Terre ; appréhender les lunaisons.\n\n> Indications de progression dans le cycle 2\n\nCe dossier s'adresse uniquement aux élèves de CE2. Il s'agit d'acquérir les premières\nconnaissances sur le système solaire : repérage de la position de la Terre par rapport au\n\nsons à l'aide de modèles réduits (boules éclairées). Nous proposons quatre séances avec\ndes fiches élève associées et une fiche d'évaluation finale.\n\n| > Matériel\n\nLe matériel nécessaire est indiqué dans chaque séance.\n\n ase\n\nSavoir que la Terre fait partie du système solaire avec\nd'autres astres (la Lune, le Soleil...).\n\na8 Je m'interroge\nL'enseignant-e montre aux élèves un globe terrestre. On\n\nrappelle aux élèves que notre Terre est une sphère, une\nboule (dossier 22). Puis on demande :\n\nÀ votre avis, où se trouve la Terre ? Qu'y a-t-il autour de\nla Terre ?\n\nOn peut attendre des élèves les réponses suivantes : « la\nTerre se trouve dans l'espace », « autour de la Terre, il y a\nla Lune, le Soleil ».\n\nOn interroge à nouveau les élèves :\n\nQu'est-ce que le Soleil ? la Lune ? Qu'y a-t-il d'autre\ndans ce que l'on appelle le système solaire ?\n\nOn peut attendre les réponses suivantes : « le Soleil, c'est\nce qui nous apporte de la lumière », « la Lune, on peut\nla voir la nuit et parfois le jour », « il y a aussi d'autres\nplanètes », « il y a des étoiles »...\n\nL'enseignant-e explique qu'on appelle « astres » les objets\nnaturels présents dans l’espace et que la Terre fait partie\nde ce que l'on appelle le « système solaire ». On propose\nalors de découvrir ensemble les autres astres que l'on peut\ntrouver dans notre système solaire.\n\nJe recherche\n\nOn distribue la fiche documentaire 1 et la fiche élève 1.\nLa fiche documentaire est découverte collectivement. On\nlaisse dans un premier temps les élèves s'exprimer et réa-\ngir puis l'enseignant-e en propose une lecture à voix haute.\nLes élèves peuvent ensuite compléter la fiche élève 1.\nLe travail par binôme est alors privilégié.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n3 Je retiens\n\n* Notre planète la Terre fait partie du système solaire.\nLe système solaire est composé d'une étoile (le\nSoleil) et de huit planètes (Mercure, Vénus, la Terre,\nMars, Jupiter, Saturne, Uranus et Neptune).\n\n+ Ily a aussi d'autres astres dans le système solaire :\ndes satellites qui tournent autour des planètes (comme\nla Lune) ; des comètes (boules de glace et de pous-\nsiéres) ; ou encore des astéroïdes (qui tournent autour\ndu Soleil).\n\n| Séance 2 FFT]\n\nSavoir que la Terre tourne sur elle-même en 24 heures ;\ncomprendre l'alternance jour/nuit.\n\nMatériel : boule en polystyrène traversée par une aiguille\nà tricoter, lampe de bureau.\n\n@ Je nm’ interroge\n\nL'enseignant-e peut idéalement commencer le cours un\njour où le ciel est dégagé. On lance la séance ainsi : « Nous\navons vu que notre planète la Terre faisait partie du système\nsolaire et que le Soleil est l'étoile qui nous éclaire. »\nOn interroge ensuite les élèves :\n\nMais comment peut-on expliquer la succession du jour\net de la nuit ?\n\nSelon leurs connaissances, on peut attendre des réponses\ncomme : « le Soleil se déplace dans le ciel », « le Soleil se\nlève le matin et se couche le soir » ; ou encore : « c'est nous\nqui bougeons », « quand on est du côté du Soleil il fait jour,\nquand on est de l'autre côté il fait nuit ».\n\nL'enseignant-e propose alors aux élèves de modéliser ce\nphénomène.\n\nSe situer dans l'espace 289\n\nFiche enseignant\n\n@ Je recherche\n\nOn utilise une boule de polystyrène traversée d'une\naiguille à tricoter et une lampe de bureau. On questionne\nles élèves : « Que représente la lampe ? Que représente\nla boule ? Comment appelle-t-on les endroits où l'aiguille\nsort ? » Assez spontanément, les élèves vont identifier la\nlampe au Soleil et la boule à la Terre. Ils comprennent aussi\nque l'aiguille passe par le pôle Nord et le pôle Sud.\n\nUn-e élève tient la boule en utilisant l'aiguille à tricoter,\nun-e autre élève tient la lampe de bureau. On peut faire\nune petite croix sur la boule pour matérialiser l'endroit où\nl'on se trouve sur Terre. En faisant tourner la boule dans\nle sens inverse des aiguilles d’une montre, on voit la croix\nqui plonge dans l'obscurité puis revient à la lumière, puis\nreplonge dans l'obscurité.\n\nOn peut alors distribuer la fiche élève 2.\n\nC2 Je retiens\n\n* Le Soleil semble se déplacer dans le ciel au cours de la\njournée, mais c'est en fait la Terre qui tourne sur elle-\nmême autour d'un axe Nord-Sud.\n\n«Elle effectue cette rotation en une journée, c'est-à\ndire en 24 heures. C'est ce qui explique l'alternance du\njour et de la nuit.\n\n| Séance 3 FFT)\n\nSavoir que la Terre tourne autour du Soleil en 365 jours.\nAppréhender la succession des saisons.\n\n[2] Je m'interroge\n\nL'enseignant-e montre aux élèves un globe terrestre.\nLes élèves rappellent le contenu de la séance précédente :\nle Soleil semble se déplacer dans le ciel mais c'est en fait\nla Terre qui tourne sur elle-même en 24 heures. Cette\nrotation explique la succession du jour et de la nuit.\nOn demande alors :\n\nMais le Soleil apparait-il et disparait-il toujours à\n\nla même heure ? Par exemple, quand vous vous levez\nle matin pour aller à l’école, dehors fait-il jour ou nuit ?\nLa durée du jour est-elle la même en été et en hiver ?\nEt y a-t-il d'autres changements dans l'année\n(température, végétation...) ?\n\nUn échange oral a lieu dans la classe. Certains élèves ne\nnotent peut être pas de changements dans l'année ;\nd'autres au contraire peuvent repérer qu'en hiver il fait nuit\nquand ils partent de chez eux et nuit encore à la fin de la\ngarderie/l’étude alors que ce n’est pas le cas au printemps.\nLes changements de température et de végétation seront\na priori plus facilement repérables par les élèves, selon le\nlieu où ils habitent. La notion de saisons peut être formulée.\nL'enseignant-e explique donc qu'il y a quatre saisons dans\nl'année et interroge à nouveau les élèves :\n\nSavez-vous si la Terre fait d'autres mouvements dans\nl'espace qui pourraient expliquer ces changements\n| de saisons ?\n\n290 » Se situer dans l'espace\n\nOn peut attendre, selon les connaissances des élèves, des\nréponses comme : « la Terre tourne autour du Soleil »,\n« elle met un an pour tourner autour du Soleil ». D'autres\nréponses erronées peuvent apparaitre ; dans ce cas, les\nnoter sur une affiche et y revenir à la fin de la séance pour\nles infirmer.\n\nL'enseignant-e propose alors de rechercher et de vérifier\nces informations.\n\n@ Je recherche\n\nOn distribue à chaque élève la fiche documentaire 2 et la\nfiche élève 3. La fiche documentaire est lue et explicitée\ncollectivement puis les élèves effectuent individuellement\nles exercices de la fiche élève 3.\n\nN. B. : Dans les pays à climat tropical, seules deux saisons\nont cours : la saison sèche et la saison des pluies. IL fait chaud\ntoute l’année. Cette alternance de deux saisons seulement\ns'explique par le fait que les rayons solaires parviennent très\nprès de la verticale dans ces régions du monde, provoquant\nun ensoleillement relativement constant.\n\n2 Je retiens\n\n«La Terre effectue une révolution (un tour complet)\nautour du Soleil, notre étoile, en 365 jours, c'est-à-dire\nen une année.\n\n* Les changements de saisons (printemps, été, automne\net hiver en France métropolitaine) sont liés à ce dépla-\ncement de la Terre autour du Soleil.\n\n« C'est l'inclinaison de l'axe de rotation de la Terre qui\nexplique ces changements.\n\n PTT)\n\nSavoir que la Lune est un satellite de la Terre.\nAppréhender les lunaisons.\n\ne Je m'interroge\n\nL'enseignant-e résume avec les élèves les connaissances\nacquises lors des précédentes séances. Puis on leur montre\nou leur projette un cliché de la Lune. On demande :\n\nQue reconnaissez-vous sur cette photo ?\nA-t-elle toujours la même forme ?\n\nOn peut attendre des réponses comme : « c'est une photo\nde la Lune », « on ne la voit pas toujours pareil », « parfois\nelle brille beaucoup », « parfois elle ressemble à un petit\ncroissant ».\n\nL'enseignant-e propose alors de connaître un peu mieux la\nLune...\n\n@ Je recherche\n\nOn distribue alors aux éléves la fiche documentaire 3 et la\nfiche élève 4.\n\nOn peut modéliser le déplacement de la Lune autour de la\nTerre (et de la Terre autour du Soleil) avec une maquette\ncomme celle-ci.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
    guidePageDecisions: [
      {
        page: 289,
        confidence: 93,
        score: 22,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
        ],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: [
          "enseignant",
          "eleves",
          "on demande",
          "on propose",
          "on interroge",
          "on distribue",
        ],
        studentLike: true,
      },
      {
        page: 290,
        confidence: 93,
        score: 20,
        included: true,
        strongMarkers: ["seance", "l'enseignant", "enseignant-e", "les eleves", "aux eleves"],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on demande", "on distribue"],
        studentLike: true,
      },
      {
        page: 291,
        confidence: 91,
        score: 4,
        included: false,
        strongMarkers: [],
        phaseMarkers: ["je retiens"],
        teacherLanguageMarkers: [],
        studentLike: false,
      },
    ],
    skippedProbePages: [291],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-24",
    dossierNumber: 24,
    partNumber: 6,
    partTitle: "Se situer dans le temps",
    title: "Comment me repérer dans le temps ?",
    guidePages: [305, 306, 307],
    guidePageCount: 3,
    objectives: [
      "Identifier les rythmes cycliques du temps : les jours, les semaines, les mois, les saisons ;",
      "les situer dans un calendrier ou une frise.",
      "Savoir que la journée est divisée en heures, savoir lire l’heure.",
    ],
    progressionNote:
      "Les rythmes cycliques du temps sont étudiés dès le CP en continuité du travail amorcé en\nclasse maternelle. Les outils de représentation du temps (calendrier, frise.) sont utilisés\ntout au long du cycle 2. Ils font l'objet de rituels et permettent d'inscrire dans le quotidien\nde la classe la découverte des rythmes cycliques du temps. Ces notions sont abordées en\nlien avec les mathématiques (domaine Grandeurs et mesures).\nCe dossier s'adresse aux CP et CE1. La séance 1 porte sur les jours, les semaines et leur rela-\ntion est destinée aux CP-CE1. La séance 2 porte sur les relations entre jours, mois, année\net leur relation ; elle est également destinée aux CP et CE1. La séance 3 traite des relations\nentre jour et heures, entre heures et minutes et relève uniquement du CE1.\nLe temps long (siècle, millénaire) est traité dans le dossier 25 à destination des CE2.",
    material: [
      "Le matériel nécessaire est indiqué dans chaque séance.",
      "Les réponses ne se font pas attendre : « il y en a 7 ! » « c'est",
    ],
    sessions: [
      {
        number: 1,
        title:
          "Identifier les rythmes cycliques du temps : les jours et | L'enseignant-e poursuit : les semaines. Matériel : roue des jours de la semaine (— sur CD-Rom)",
        rawText:
          "| Séance 1 | ë a une semaine ! »\n\nIdentifier les rythmes cycliques du temps : les jours et | L'enseignant-e poursuit :\n\nles semaines.\n\nMatériel : roue des jours de la semaine (— sur CD-Rom)\ndes attaches parisiennes.\n\n[2] Je m'interroge\n\nPour débuter cette séance, l'enseignant-e demande simple-\nment à ses élèves :\n\net avant-hier ? Quel jour serons-nous demain ?\n\nQuel jour sommes-nous ? Quel jour étions-nous hier ?\n—\nEt aprés-demain ?\n\nL'enseignant-e soutient ce questionnement en s'appuyant\nsur le calendrier et la frise de l'année de la classe, utilisés\n\nlundi ! »\nL'enseignant-e demande alors :\n\n| | Mais revient-on au même lundi ?\n\nlundi ! »\n\nlors des rituels du matin. | chacun-e une roue des jours de la semaine.\nPuis on demande ensuite :\n\nAllez-vous à l'école tous les jours ?\nQuels jours restez-vous à la maison ?\n\nToutes ces questions posées amènent les élèves à énumé-\nrer progressivement les sept jours de la semaine. S'il en\nmanque, l'enseignant-e peut demander aux élèves si on\na oublié un jour et où il se situe par rapport aux autres. |\nOn vérifie également que les élèves valident l'existence de\nla nuit et de la journée dans un jour (les deux sens de ce\nmême mot — « un jour » et « il fait jour » — peuvent prêter\nà confusion et sont explicités).\nLorsque tous les jours de la semaine sont écrits au tableau,\nx l'enseignant-e demande alors :\n\n| Combien de jours ont été notés au tableau ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n J'expérimente\n\nl’attache parisienne.\n\nI Que se passe-t-il après le dernier jour de la semaine ?\nLes élèves répondent sans hésitation : « on revient au\n\nLà encore, la réponse est spontanée : « Non, c'est un autre\n\nOn s'appuie utilement sur le calendrier du mois et les quan-\ntièmes pour le confirmer et vérifier le caractère irréversible\ndu temps qui passe. On repère aussi collectivement le pre-\nmier jour de la semaine (lundi) et le dernier (dimanche).\n\nL'enseignant-e propose alors aux élèves de construire\n\nOn distribue les deux fiches à découper « Roue des jours de\nla semaine » (— sur CD-Rom) qui permettent la construc-\ntion de cette roue. On distribue également une attache\nparisienne par élève. Les élèves découpent uniquement à ce\nstade la roue des jours. On demande aux élèves de colorier\nles jours où il n'y a pas école. Les jours où on travaille uni-\nquement le matin sont coloriés pour moitié. L'enseignant-e\npourra ensuite plastifier les deux parties (feuille support\net disque des jours) du montage pour leur donner une\nplus grande longévité. On perce un trou avec une paire de\nciseaux (disque et feuille support) et on les assemble avec\n\nLorsque la roue des jours est réalisée, on peut la manipuler\n\nSe situer dans le temps « 305\n\navec les élèves en posant des questions : « Quel jour est\navant le lundi ? Si nous sommes jeudi, quel jour serons-\nnous demain ? et après-demain ? »\n\nOn précise de nouveau que lorsque l'on passe du dimanche\nau lundi, on change de semaine : la date n’est plus la même !\nOn passe ensuite à des exercices de consolidation en\ndistribuant la fiche élève 1 (niveau 1 coccinelle) ou/et la\nfiche élève 2 (niveau 2 coccinelles).\n\n#3 Je retiens dé dd\n\n= ILy a 7 jours dans une semaine : lundi, mardi, mercredi,\njeudi, vendredi, samedi, dimanche.\n\n«la semaine commence le lundi et se termine le\ndimanche.\n\n= Après le dimanche, un nouveau lundi vient alors : c'est\nle début d'une nouvelle semaine.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "Pour débuter cette séance, l'enseignant-e demande simple-\nment à ses élèves :\n\net avant-hier ? Quel jour serons-nous demain ?\n\nQuel jour sommes-nous ? Quel jour étions-nous hier ?\n—\nEt aprés-demain ?\n\nL'enseignant-e soutient ce questionnement en s'appuyant\nsur le calendrier et la frise de l'année de la classe, utilisés\n\nlundi ! »\nL'enseignant-e demande alors :\n\n| | Mais revient-on au même lundi ?\n\nlundi ! »\n\nlors des rituels du matin. | chacun-e une roue des jours de la semaine.\nPuis on demande ensuite :\n\nAllez-vous à l'école tous les jours ?\nQuels jours restez-vous à la maison ?\n\nToutes ces questions posées amènent les élèves à énumé-\nrer progressivement les sept jours de la semaine. S'il en\nmanque, l'enseignant-e peut demander aux élèves si on\na oublié un jour et où il se situe par rapport aux autres. |\nOn vérifie également que les élèves valident l'existence de\nla nuit et de la journée dans un jour (les deux sens de ce\nmême mot — « un jour » et « il fait jour » — peuvent prêter\nà confusion et sont explicités).\nLorsque tous les jours de la semaine sont écrits au tableau,\nx l'enseignant-e demande alors :\n\n| Combien de jours ont été notés au tableau ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
          },
          {
            title: "J'expérimente",
            detail:
              "l’attache parisienne.\n\nI Que se passe-t-il après le dernier jour de la semaine ?\nLes élèves répondent sans hésitation : « on revient au\n\nLà encore, la réponse est spontanée : « Non, c'est un autre\n\nOn s'appuie utilement sur le calendrier du mois et les quan-\ntièmes pour le confirmer et vérifier le caractère irréversible\ndu temps qui passe. On repère aussi collectivement le pre-\nmier jour de la semaine (lundi) et le dernier (dimanche).\n\nL'enseignant-e propose alors aux élèves de construire\n\nOn distribue les deux fiches à découper « Roue des jours de\nla semaine » (— sur CD-Rom) qui permettent la construc-\ntion de cette roue. On distribue également une attache\nparisienne par élève. Les élèves découpent uniquement à ce\nstade la roue des jours. On demande aux élèves de colorier\nles jours où il n'y a pas école. Les jours où on travaille uni-\nquement le matin sont coloriés pour moitié. L'enseignant-e\npourra ensuite plastifier les deux parties (feuille support\net disque des jours) du montage pour leur donner une\nplus grande longévité. On perce un trou avec une paire de\nciseaux (disque et feuille support) et on les assemble avec\n\nLorsque la roue des jours est réalisée, on peut la manipuler\n\nSe situer dans le temps « 305\n\navec les élèves en posant des questions : « Quel jour est\navant le lundi ? Si nous sommes jeudi, quel jour serons-\nnous demain ? et après-demain ? »\n\nOn précise de nouveau que lorsque l'on passe du dimanche\nau lundi, on change de semaine : la date n’est plus la même !\nOn passe ensuite à des exercices de consolidation en\ndistribuant la fiche élève 1 (niveau 1 coccinelle) ou/et la\nfiche élève 2 (niveau 2 coccinelles).\n\n#3",
          },
          {
            title: "Je retiens",
            detail:
              "dé dd\n\n= ILy a 7 jours dans une semaine : lundi, mardi, mercredi,\njeudi, vendredi, samedi, dimanche.\n\n«la semaine commence le lundi et se termine le\ndimanche.\n\n= Après le dimanche, un nouveau lundi vient alors : c'est\nle début d'une nouvelle semaine.",
          },
        ],
      },
      {
        number: 2,
        title:
          "Identifier les rythmes cycliques du temps : les mois, les saisons, l'année. Matériel : plusieurs calendriers différents.",
        rawText:
          "| séance 2 FIRE\nIdentifier les rythmes cycliques du temps : les mois,\nles saisons, l'année.\n\nMatériel : plusieurs calendriers différents.\n\na Je m'interroge\n\nComme chaque jour d'école, l'enseignant-e écrit la date\nau tableau (on peut, si ce n'est pas habituel, écrire l'année).\nOn interpelle alors les élèves :\n\nNous savons maintenant qu'il y a sept jours dans une\nsemaine. Mais quand j'écris la date, je note également\nd'autres informations.\n\nLesquelles ? Pourquoi, d’après vous ?\n\nLes réponses des élèves peuvent être : « il y a en plus du\njour un nombre : c'est la date », « il y a aussi le mois et\nl'année », « c'est pour savoir quel jour on est vraiment... »\nL'enseignant-e demande ensuite :\n\n[Où peut-on trouver tous ces renseignements ?\n\nLes élèves répondent, pour la plupart : « dans un calen-\ndrier ! », ou encore « sur le portable de maman », « sur\nl'ordinateur de papa ».\n\nOn propose alors aux élèves d'observer différents calen-\ndriers et de noter les informations qu'ils nous apportent.\n\nJe recherche\n\nLes élèves sont placés par groupe de 4. Chaque groupe a\nà sa disposition un ou deux calendriers annuels différents\n(de nombreuses versions possibles sont disponibles sur\nInternet). Les élèves ont pour consigne de relever ou noter\ntoutes les informations qui y sont présentes.\n\nN. B. : pour les CP, il est préférable de prendre un calendrier\nsimplifié avec uniquement les jours, semaines et mois.\nAprès un temps de travail autonome, chaque groupe pré-\nsente le résultat de ses recherches. On peut attendre les\nréponses suivantes : « il y a les jours de la semaine, les dates,\nles mois », « il y a au moins trois semaines complètes dans\nun mois, parfois quatre », « parfois, des semaines sont à\ncheval sur deux mois », « il y a douze mois sur le calen-\ndrier », « il y a les fêtes et les jours fériés comme Noël,\n\n306 « Se situer dans le temps\n\nl’Armistice du 11 novembre, la Victoire de 1945, la Fête\nnationale du 14 juillet, la Pentecôte, l'Ascension…. », « on\nvoit quand commencent les vacances scolaires », « on voit\naussi la Lune, elle n’a pas toujours la même forme », « il\n\ny à écrit printemps, été, automne, hiver : c'est le début de\nchaque saison ! » K\nL'enseignant-e propose de rédiger collectivement la\ntrace écrite de cette séance avant de distribuer la fiche\nélève 3 (niveau 1 coccinelle) et la fiche élève 4 (niveau\n\n2 coccinelles).\n\n74 Jeretiens ë\n\n+ Un calendrier permet de se repérer dans une année.\nOn y trouve toujours les mois, les dates, les jours de la\nsemaine.\n\n«ll y a 12 mois dans une année : janvier, février,\nmars, avril, mai, juin, juillet, août, septembre, octobre,\nnovembre, décembre.\n\n«lly a 4 saisons dans une année : le printemps, l'été,\nl'automne et l'hiver.\n\n22 Jeretiens &&\n\n On trouve parfois sur un calendrier : les dates des\nvacances scolaires, les jours fériés, les fêtes à souhaiter,\nles phases de la Lune, le début de chaque saison.\n\n+ Chaque mois compte 30 ou 31 jours sauf le mois de\nfévrier qui ne compte que 28 jours (ou 29 jours tous les\n4 ans).\n\n«Il y a 365 jours dans l'année (ou 366 tous les\nquatre ans). Cela représente 52 semaines.\n\n« L'année civile commence au 1“ janvier et se termine\nau 31 décembre. L'année scolaire commence au mois\nde septembre et termine au mois de juin ou juillet.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "Comme chaque jour d'école, l'enseignant-e écrit la date\nau tableau (on peut, si ce n'est pas habituel, écrire l'année).\nOn interpelle alors les élèves :\n\nNous savons maintenant qu'il y a sept jours dans une\nsemaine. Mais quand j'écris la date, je note également\nd'autres informations.\n\nLesquelles ? Pourquoi, d’après vous ?\n\nLes réponses des élèves peuvent être : « il y a en plus du\njour un nombre : c'est la date », « il y a aussi le mois et\nl'année », « c'est pour savoir quel jour on est vraiment... »\nL'enseignant-e demande ensuite :\n\n[Où peut-on trouver tous ces renseignements ?\n\nLes élèves répondent, pour la plupart : « dans un calen-\ndrier ! », ou encore « sur le portable de maman », « sur\nl'ordinateur de papa ».\n\nOn propose alors aux élèves d'observer différents calen-\ndriers et de noter les informations qu'ils nous apportent.",
          },
          {
            title: "Je recherche",
            detail:
              "Les élèves sont placés par groupe de 4. Chaque groupe a\nà sa disposition un ou deux calendriers annuels différents\n(de nombreuses versions possibles sont disponibles sur\nInternet). Les élèves ont pour consigne de relever ou noter\ntoutes les informations qui y sont présentes.\n\nN. B. : pour les CP, il est préférable de prendre un calendrier\nsimplifié avec uniquement les jours, semaines et mois.\nAprès un temps de travail autonome, chaque groupe pré-\nsente le résultat de ses recherches. On peut attendre les\nréponses suivantes : « il y a les jours de la semaine, les dates,\nles mois », « il y a au moins trois semaines complètes dans\nun mois, parfois quatre », « parfois, des semaines sont à\ncheval sur deux mois », « il y a douze mois sur le calen-\ndrier », « il y a les fêtes et les jours fériés comme Noël,\n\n306 « Se situer dans le temps\n\nl’Armistice du 11 novembre, la Victoire de 1945, la Fête\nnationale du 14 juillet, la Pentecôte, l'Ascension…. », « on\nvoit quand commencent les vacances scolaires », « on voit\naussi la Lune, elle n’a pas toujours la même forme », « il\n\ny à écrit printemps, été, automne, hiver : c'est le début de\nchaque saison ! » K\nL'enseignant-e propose de rédiger collectivement la\ntrace écrite de cette séance avant de distribuer la fiche\nélève 3 (niveau 1 coccinelle) et la fiche élève 4 (niveau\n\n2 coccinelles).\n\n74 Jeretiens ë\n\n+ Un calendrier permet de se repérer dans une année.\nOn y trouve toujours les mois, les dates, les jours de la\nsemaine.\n\n«ll y a 12 mois dans une année : janvier, février,\nmars, avril, mai, juin, juillet, août, septembre, octobre,\nnovembre, décembre.\n\n«lly a 4 saisons dans une année : le printemps, l'été,\nl'automne et l'hiver.\n\n22 Jeretiens &&\n\n On trouve parfois sur un calendrier : les dates des\nvacances scolaires, les jours fériés, les fêtes à souhaiter,\nles phases de la Lune, le début de chaque saison.\n\n+ Chaque mois compte 30 ou 31 jours sauf le mois de\nfévrier qui ne compte que 28 jours (ou 29 jours tous les\n4 ans).\n\n«Il y a 365 jours dans l'année (ou 366 tous les\nquatre ans). Cela représente 52 semaines.\n\n« L'année civile commence au 1“ janvier et se termine\nau 31 décembre. L'année scolaire commence au mois\nde septembre et termine au mois de juin ou juillet.",
          },
        ],
      },
      {
        number: 3,
        title:
          "Savoir que la journée est divisée en heures. Savoir lire l'heure. Matériel : horloge à aiguilles sur fiches à découper (— sur —",
        rawText:
          "| Séance 3 FT\n\nSavoir que la journée est divisée en heures. Savoir lire\nl'heure.\n\nMatériel : horloge à aiguilles sur fiches à découper (— sur —\nCD-Rom) ; l'idéal étant de les plastifier en amont et qu'elles\nsoient en couleur (aiguille rouge pour les heures, chiffres des\nheures en rouge, aiguilles bleues pour les minutes, double\ncercle des chiffres minutes en bleu). Attaches parisiennes.\n\na Je m'interroge\nOn rentre en classe, idéalement après le repas du midi.\nL'enseignant-e demande alors aux élèves de regarder l'hor-\nloge de la classe et une montre (affichage numérique). On\ninterroge alors les élèves :\n\n[Savez-vous à quelle heure commence la classe ?\n\nLes réponses peuvent être « 13 h 30 » ou « 1 h et demie »\npar exemple.\nL'enseignant-e demande alors :\n\nÀ quelle heure commence la classe, le matin ?\nÀ quelle heure allez-vous à la cantine ?\nÀ quelle heure dinez-vous, à la maison ?\n\n| À quelle heure allez-vous au lit ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nOn essaie, à travers ces exemples, de dégager les deux\nfaçons de dire l'heure après 12 heures en expliquant qu'une\njournée correspond à 24 heures.\n\nL'enseignant-e montre à nouveau l'horloge de la classe et\ndemande :\n\nI Que représentent les chiffres de 1 à 12 ?\n\nDes élèves répondent : « ce sont les heures », « c'est la\npetite aiguille qui indique les heures ».\n\nOn peut demander alors comment fonctionne l'horloge qui\nn’a que 12 heures alors qu'une journée en a 24. On explique\nainsi que la petite aiguille des heures de l'horloge doit faire\ndeux tours dans une journée.\n\nDe plus, la comparaison avec la montre digitale permet de\nse rendre compte que l'après-midi « 1 h 30 » = « 13 h 30 »\n(soit un tour d'horloge + 1 h 30).\n\nL'enseignant-e demande ensuite :\n\n[À quoi sert la grande aiguille ?\n\nDes élèves répondent : « c'est l'aiguille des minutes ! ».\nOn propose alors de travailler à partir d'une horloge\nindividuelle.\n\n J'expérimente\n\nL'enseignant-e propose aux élèves de construire une hor-\nloge à aiguilles afin de repérer les différents moments de\nla journée et apprendre ainsi progressivement à lire l'heure. |\n\nOn distribue aux élèves les horloges coloriées et plastifiées.\nDeux modèles sont proposés sur le CD-Rom : un modèle\ncouleur et un modèle à colorier (si l'enseignant-e souhaite\ndonner cette activité aux élèves).\n\nLes élèves assemblent les aiguilles à l'aide des attaches\nparisiennes distribuées. La petite aiguille rouge indique les\nheures (chiffres rouges de 1 à 12), la grande aiguille bleue\nindique les minutes (chiffres bleus de 5 à 60).\n\nLorsque les horloges sont assemblées, les élèves repèrent\nsur celles-ci les différents moments de la journée de leur\nclasse.\n\nL'enseignant-e note au tableau ces différents moments et\nl'heure correspondante (en chiffres, exemple : 8 h 30). Les\nélèves placent les aiguilles sur leur horloge.\n\nExemple : 9 heures — petite aiguille sur le 9, grande aiguille\nsur le 12.\n\nPar la suite, on distribue la fiche élève 5. Les élèves s'y\nentrainent à lire l'heure et y associent des moments de leur\n\njournée.\n\n2 Je retiens\n\n«lly a 24 heures dans une journée et 60 minutes dans\nune heure. On peut savoir quelle heure il est en regar-\ndant une horloge, une montre.\n\n* Sur une horloge, la petite aiguille indique les heures,\nla grande les minutes.\n\njanvier juillet cu octobre decembre\n31 a1\njours jours = fm) | St\n\n/\n\nnovembre\n30\n\njours\n\nUne bosse, c'est 31 jours.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nUn creux, c'est 30 jours, sauf en février.\n\nSe situer dans le temps o 307",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "On rentre en classe, idéalement après le repas du midi.\nL'enseignant-e demande alors aux élèves de regarder l'hor-\nloge de la classe et une montre (affichage numérique). On\ninterroge alors les élèves :\n\n[Savez-vous à quelle heure commence la classe ?\n\nLes réponses peuvent être « 13 h 30 » ou « 1 h et demie »\npar exemple.\nL'enseignant-e demande alors :\n\nÀ quelle heure commence la classe, le matin ?\nÀ quelle heure allez-vous à la cantine ?\nÀ quelle heure dinez-vous, à la maison ?\n\n| À quelle heure allez-vous au lit ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nOn essaie, à travers ces exemples, de dégager les deux\nfaçons de dire l'heure après 12 heures en expliquant qu'une\njournée correspond à 24 heures.\n\nL'enseignant-e montre à nouveau l'horloge de la classe et\ndemande :\n\nI Que représentent les chiffres de 1 à 12 ?\n\nDes élèves répondent : « ce sont les heures », « c'est la\npetite aiguille qui indique les heures ».\n\nOn peut demander alors comment fonctionne l'horloge qui\nn’a que 12 heures alors qu'une journée en a 24. On explique\nainsi que la petite aiguille des heures de l'horloge doit faire\ndeux tours dans une journée.\n\nDe plus, la comparaison avec la montre digitale permet de\nse rendre compte que l'après-midi « 1 h 30 » = « 13 h 30 »\n(soit un tour d'horloge + 1 h 30).\n\nL'enseignant-e demande ensuite :\n\n[À quoi sert la grande aiguille ?\n\nDes élèves répondent : « c'est l'aiguille des minutes ! ».\nOn propose alors de travailler à partir d'une horloge\nindividuelle.",
          },
          {
            title: "J'expérimente",
            detail:
              "L'enseignant-e propose aux élèves de construire une hor-\nloge à aiguilles afin de repérer les différents moments de\nla journée et apprendre ainsi progressivement à lire l'heure. |\n\nOn distribue aux élèves les horloges coloriées et plastifiées.\nDeux modèles sont proposés sur le CD-Rom : un modèle\ncouleur et un modèle à colorier (si l'enseignant-e souhaite\ndonner cette activité aux élèves).\n\nLes élèves assemblent les aiguilles à l'aide des attaches\nparisiennes distribuées. La petite aiguille rouge indique les\nheures (chiffres rouges de 1 à 12), la grande aiguille bleue\nindique les minutes (chiffres bleus de 5 à 60).\n\nLorsque les horloges sont assemblées, les élèves repèrent\nsur celles-ci les différents moments de la journée de leur\nclasse.\n\nL'enseignant-e note au tableau ces différents moments et\nl'heure correspondante (en chiffres, exemple : 8 h 30). Les\nélèves placent les aiguilles sur leur horloge.\n\nExemple : 9 heures — petite aiguille sur le 9, grande aiguille\nsur le 12.\n\nPar la suite, on distribue la fiche élève 5. Les élèves s'y\nentrainent à lire l'heure et y associent des moments de leur\n\njournée.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "«lly a 24 heures dans une journée et 60 minutes dans\nune heure. On peut savoir quelle heure il est en regar-\ndant une horloge, une montre.\n\n* Sur une horloge, la petite aiguille indique les heures,\nla grande les minutes.\n\njanvier juillet cu octobre decembre\n31 a1\njours jours = fm) | St\n\n/\n\nnovembre\n30\n\njours\n\nUne bosse, c'est 31 jours.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nUn creux, c'est 30 jours, sauf en février.\n\nSe situer dans le temps o 307",
          },
        ],
      },
    ],
    guideText:
      "» Objectifs\n\n* Identifier les rythmes cycliques du temps : les jours, les semaines, les mois, les saisons ;\nles situer dans un calendrier ou une frise.\n* Savoir que la journée est divisée en heures, savoir lire l’heure.\n\n> Indications de progression dans le cycle 2\n\nLes rythmes cycliques du temps sont étudiés dès le CP en continuité du travail amorcé en\nclasse maternelle. Les outils de représentation du temps (calendrier, frise.) sont utilisés\ntout au long du cycle 2. Ils font l'objet de rituels et permettent d'inscrire dans le quotidien\nde la classe la découverte des rythmes cycliques du temps. Ces notions sont abordées en\nlien avec les mathématiques (domaine Grandeurs et mesures).\n\nCe dossier s'adresse aux CP et CE1. La séance 1 porte sur les jours, les semaines et leur rela-\ntion est destinée aux CP-CE1. La séance 2 porte sur les relations entre jours, mois, année\net leur relation ; elle est également destinée aux CP et CE1. La séance 3 traite des relations\nentre jour et heures, entre heures et minutes et relève uniquement du CE1.\n\nLe temps long (siècle, millénaire) est traité dans le dossier 25 à destination des CE2.\n\n> Matériel\nLe matériel nécessaire est indiqué dans chaque séance.\n\nLes réponses ne se font pas attendre : « il y en a 7 ! » « c'est\n\n| Séance 1 | ë a une semaine ! »\n\nIdentifier les rythmes cycliques du temps : les jours et | L'enseignant-e poursuit :\n\nles semaines.\n\nMatériel : roue des jours de la semaine (— sur CD-Rom)\ndes attaches parisiennes.\n\n[2] Je m'interroge\n\nPour débuter cette séance, l'enseignant-e demande simple-\nment à ses élèves :\n\net avant-hier ? Quel jour serons-nous demain ?\n\nQuel jour sommes-nous ? Quel jour étions-nous hier ?\n—\nEt aprés-demain ?\n\nL'enseignant-e soutient ce questionnement en s'appuyant\nsur le calendrier et la frise de l'année de la classe, utilisés\n\nlundi ! »\nL'enseignant-e demande alors :\n\n| | Mais revient-on au même lundi ?\n\nlundi ! »\n\nlors des rituels du matin. | chacun-e une roue des jours de la semaine.\nPuis on demande ensuite :\n\nAllez-vous à l'école tous les jours ?\nQuels jours restez-vous à la maison ?\n\nToutes ces questions posées amènent les élèves à énumé-\nrer progressivement les sept jours de la semaine. S'il en\nmanque, l'enseignant-e peut demander aux élèves si on\na oublié un jour et où il se situe par rapport aux autres. |\nOn vérifie également que les élèves valident l'existence de\nla nuit et de la journée dans un jour (les deux sens de ce\nmême mot — « un jour » et « il fait jour » — peuvent prêter\nà confusion et sont explicités).\nLorsque tous les jours de la semaine sont écrits au tableau,\nx l'enseignant-e demande alors :\n\n| Combien de jours ont été notés au tableau ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n J'expérimente\n\nl’attache parisienne.\n\nI Que se passe-t-il après le dernier jour de la semaine ?\nLes élèves répondent sans hésitation : « on revient au\n\nLà encore, la réponse est spontanée : « Non, c'est un autre\n\nOn s'appuie utilement sur le calendrier du mois et les quan-\ntièmes pour le confirmer et vérifier le caractère irréversible\ndu temps qui passe. On repère aussi collectivement le pre-\nmier jour de la semaine (lundi) et le dernier (dimanche).\n\nL'enseignant-e propose alors aux élèves de construire\n\nOn distribue les deux fiches à découper « Roue des jours de\nla semaine » (— sur CD-Rom) qui permettent la construc-\ntion de cette roue. On distribue également une attache\nparisienne par élève. Les élèves découpent uniquement à ce\nstade la roue des jours. On demande aux élèves de colorier\nles jours où il n'y a pas école. Les jours où on travaille uni-\nquement le matin sont coloriés pour moitié. L'enseignant-e\npourra ensuite plastifier les deux parties (feuille support\net disque des jours) du montage pour leur donner une\nplus grande longévité. On perce un trou avec une paire de\nciseaux (disque et feuille support) et on les assemble avec\n\nLorsque la roue des jours est réalisée, on peut la manipuler\n\nSe situer dans le temps « 305\n\navec les élèves en posant des questions : « Quel jour est\navant le lundi ? Si nous sommes jeudi, quel jour serons-\nnous demain ? et après-demain ? »\n\nOn précise de nouveau que lorsque l'on passe du dimanche\nau lundi, on change de semaine : la date n’est plus la même !\nOn passe ensuite à des exercices de consolidation en\ndistribuant la fiche élève 1 (niveau 1 coccinelle) ou/et la\nfiche élève 2 (niveau 2 coccinelles).\n\n#3 Je retiens dé dd\n\n= ILy a 7 jours dans une semaine : lundi, mardi, mercredi,\njeudi, vendredi, samedi, dimanche.\n\n«la semaine commence le lundi et se termine le\ndimanche.\n\n= Après le dimanche, un nouveau lundi vient alors : c'est\nle début d'une nouvelle semaine.\n\n| séance 2 FIRE\nIdentifier les rythmes cycliques du temps : les mois,\nles saisons, l'année.\n\nMatériel : plusieurs calendriers différents.\n\na Je m'interroge\n\nComme chaque jour d'école, l'enseignant-e écrit la date\nau tableau (on peut, si ce n'est pas habituel, écrire l'année).\nOn interpelle alors les élèves :\n\nNous savons maintenant qu'il y a sept jours dans une\nsemaine. Mais quand j'écris la date, je note également\nd'autres informations.\n\nLesquelles ? Pourquoi, d’après vous ?\n\nLes réponses des élèves peuvent être : « il y a en plus du\njour un nombre : c'est la date », « il y a aussi le mois et\nl'année », « c'est pour savoir quel jour on est vraiment... »\nL'enseignant-e demande ensuite :\n\n[Où peut-on trouver tous ces renseignements ?\n\nLes élèves répondent, pour la plupart : « dans un calen-\ndrier ! », ou encore « sur le portable de maman », « sur\nl'ordinateur de papa ».\n\nOn propose alors aux élèves d'observer différents calen-\ndriers et de noter les informations qu'ils nous apportent.\n\nJe recherche\n\nLes élèves sont placés par groupe de 4. Chaque groupe a\nà sa disposition un ou deux calendriers annuels différents\n(de nombreuses versions possibles sont disponibles sur\nInternet). Les élèves ont pour consigne de relever ou noter\ntoutes les informations qui y sont présentes.\n\nN. B. : pour les CP, il est préférable de prendre un calendrier\nsimplifié avec uniquement les jours, semaines et mois.\nAprès un temps de travail autonome, chaque groupe pré-\nsente le résultat de ses recherches. On peut attendre les\nréponses suivantes : « il y a les jours de la semaine, les dates,\nles mois », « il y a au moins trois semaines complètes dans\nun mois, parfois quatre », « parfois, des semaines sont à\ncheval sur deux mois », « il y a douze mois sur le calen-\ndrier », « il y a les fêtes et les jours fériés comme Noël,\n\n306 « Se situer dans le temps\n\nl’Armistice du 11 novembre, la Victoire de 1945, la Fête\nnationale du 14 juillet, la Pentecôte, l'Ascension…. », « on\nvoit quand commencent les vacances scolaires », « on voit\naussi la Lune, elle n’a pas toujours la même forme », « il\n\ny à écrit printemps, été, automne, hiver : c'est le début de\nchaque saison ! » K\nL'enseignant-e propose de rédiger collectivement la\ntrace écrite de cette séance avant de distribuer la fiche\nélève 3 (niveau 1 coccinelle) et la fiche élève 4 (niveau\n\n2 coccinelles).\n\n74 Jeretiens ë\n\n+ Un calendrier permet de se repérer dans une année.\nOn y trouve toujours les mois, les dates, les jours de la\nsemaine.\n\n«ll y a 12 mois dans une année : janvier, février,\nmars, avril, mai, juin, juillet, août, septembre, octobre,\nnovembre, décembre.\n\n«lly a 4 saisons dans une année : le printemps, l'été,\nl'automne et l'hiver.\n\n22 Jeretiens &&\n\n On trouve parfois sur un calendrier : les dates des\nvacances scolaires, les jours fériés, les fêtes à souhaiter,\nles phases de la Lune, le début de chaque saison.\n\n+ Chaque mois compte 30 ou 31 jours sauf le mois de\nfévrier qui ne compte que 28 jours (ou 29 jours tous les\n4 ans).\n\n«Il y a 365 jours dans l'année (ou 366 tous les\nquatre ans). Cela représente 52 semaines.\n\n« L'année civile commence au 1“ janvier et se termine\nau 31 décembre. L'année scolaire commence au mois\nde septembre et termine au mois de juin ou juillet.\n\n| Séance 3 FT\n\nSavoir que la journée est divisée en heures. Savoir lire\nl'heure.\n\nMatériel : horloge à aiguilles sur fiches à découper (— sur —\nCD-Rom) ; l'idéal étant de les plastifier en amont et qu'elles\nsoient en couleur (aiguille rouge pour les heures, chiffres des\nheures en rouge, aiguilles bleues pour les minutes, double\ncercle des chiffres minutes en bleu). Attaches parisiennes.\n\na Je m'interroge\nOn rentre en classe, idéalement après le repas du midi.\nL'enseignant-e demande alors aux élèves de regarder l'hor-\nloge de la classe et une montre (affichage numérique). On\ninterroge alors les élèves :\n\n[Savez-vous à quelle heure commence la classe ?\n\nLes réponses peuvent être « 13 h 30 » ou « 1 h et demie »\npar exemple.\nL'enseignant-e demande alors :\n\nÀ quelle heure commence la classe, le matin ?\nÀ quelle heure allez-vous à la cantine ?\nÀ quelle heure dinez-vous, à la maison ?\n\n| À quelle heure allez-vous au lit ?\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nOn essaie, à travers ces exemples, de dégager les deux\nfaçons de dire l'heure après 12 heures en expliquant qu'une\njournée correspond à 24 heures.\n\nL'enseignant-e montre à nouveau l'horloge de la classe et\ndemande :\n\nI Que représentent les chiffres de 1 à 12 ?\n\nDes élèves répondent : « ce sont les heures », « c'est la\npetite aiguille qui indique les heures ».\n\nOn peut demander alors comment fonctionne l'horloge qui\nn’a que 12 heures alors qu'une journée en a 24. On explique\nainsi que la petite aiguille des heures de l'horloge doit faire\ndeux tours dans une journée.\n\nDe plus, la comparaison avec la montre digitale permet de\nse rendre compte que l'après-midi « 1 h 30 » = « 13 h 30 »\n(soit un tour d'horloge + 1 h 30).\n\nL'enseignant-e demande ensuite :\n\n[À quoi sert la grande aiguille ?\n\nDes élèves répondent : « c'est l'aiguille des minutes ! ».\nOn propose alors de travailler à partir d'une horloge\nindividuelle.\n\n J'expérimente\n\nL'enseignant-e propose aux élèves de construire une hor-\nloge à aiguilles afin de repérer les différents moments de\nla journée et apprendre ainsi progressivement à lire l'heure. |\n\nOn distribue aux élèves les horloges coloriées et plastifiées.\nDeux modèles sont proposés sur le CD-Rom : un modèle\ncouleur et un modèle à colorier (si l'enseignant-e souhaite\ndonner cette activité aux élèves).\n\nLes élèves assemblent les aiguilles à l'aide des attaches\nparisiennes distribuées. La petite aiguille rouge indique les\nheures (chiffres rouges de 1 à 12), la grande aiguille bleue\nindique les minutes (chiffres bleus de 5 à 60).\n\nLorsque les horloges sont assemblées, les élèves repèrent\nsur celles-ci les différents moments de la journée de leur\nclasse.\n\nL'enseignant-e note au tableau ces différents moments et\nl'heure correspondante (en chiffres, exemple : 8 h 30). Les\nélèves placent les aiguilles sur leur horloge.\n\nExemple : 9 heures — petite aiguille sur le 9, grande aiguille\nsur le 12.\n\nPar la suite, on distribue la fiche élève 5. Les élèves s'y\nentrainent à lire l'heure et y associent des moments de leur\n\njournée.\n\n2 Je retiens\n\n«lly a 24 heures dans une journée et 60 minutes dans\nune heure. On peut savoir quelle heure il est en regar-\ndant une horloge, une montre.\n\n* Sur une horloge, la petite aiguille indique les heures,\nla grande les minutes.\n\njanvier juillet cu octobre decembre\n31 a1\njours jours = fm) | St\n\n/\n\nnovembre\n30\n\njours\n\nUne bosse, c'est 31 jours.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nUn creux, c'est 30 jours, sauf en février.\n\nSe situer dans le temps o 307",
    guidePageDecisions: [
      {
        page: 305,
        confidence: 93,
        score: 20,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
        ],
        phaseMarkers: ["je m'interroge", "j'experimente"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on demande", "on distribue"],
        studentLike: true,
      },
      {
        page: 306,
        confidence: 93,
        score: 22,
        included: true,
        strongMarkers: [
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "en classe",
        ],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on propose", "groupe", "en classe"],
        studentLike: true,
      },
      {
        page: 307,
        confidence: 92,
        score: 14,
        included: true,
        strongMarkers: ["l'enseignant", "enseignant-e", "les eleves", "aux eleves"],
        phaseMarkers: ["j'experimente", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on propose", "on distribue"],
        studentLike: true,
      },
      {
        page: 308,
        confidence: 87,
        score: 1,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: false,
      },
    ],
    skippedProbePages: [308],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-25",
    dossierNumber: 25,
    partNumber: 6,
    partTitle: "Se situer dans le temps",
    title: "Avant, après ou pendant ?",
    guidePages: [319, 320],
    guidePageCount: 2,
    objectives: [
      "« Situer des évènements les uns par rapport aux autres.",
      "« Identifier les évènements quotidiens, hebdomadaires, récurrents, et leur positionnement",
      "les uns par rapport aux autres.",
      "Comprendre les notions de continuité et succession, antériorité et postériorité,",
      "simultanéité.",
    ],
    progressionNote:
      "Dans la continuité du dossier précédent, ce dossier porte la compétence « situer des évè-\nnements les uns par rapport aux autres ».\nCe dossier concerne les trois niveaux du cycle. Dans la séance 1, l'élève va travailler sur la\npériode d'une journée (CP), d'une semaine (CP-CE1). Dans la séance 2 (destinée aux CET),\nil va apprendre à se repérer sur le mois puis l'année, à partir de dates particulières (person-\nnelles ou historiques). Enfin, la séance 3, destinée aux CE2, aborde la situation temporelle\nd'évènements dans un récit.",
    material: [
      "Le matériel nécessaire est indiqué dans chaque séance.",
      "lséance 1 IOIRCT)",
      "Situer des événements les uns par rapport aux autres",
      "dans une journée, une semaine.",
      "Je m'interroge",
      "L'enseignant-e, pour commencer la journée de classe, pré-",
      "sente aux élèves leur emploi du temps de la journée mais",
      "dans le désordre. Chaque activité est écrite sur une bande",
      "de papier et affichée au tableau ; on y placera également les",
      "temps de récréation et de repas jusqu'à la fin de la classe.",
      "L'enseignant-e demande aux élèves :",
      "Voici dans le désordre le programme de notre journée",
      "de classe, qui est une journée habituelle. Dans quel",
      "ordre vont se dérouler ces activités, d'après vous ?",
      "Comment peut-on les présenter pour avoir en mémoire",
      "notre emploi du temps et bien le présenter ?",
      "On peut attendre des élèves des réponses comme : « il faut",
      "les classer », « d’abord ce qu'on fait le matin puis ce qu'on",
      "fait après le repas », « on peut ranger les étiquettes sur une",
      "ligne », « ou on peut les ranger du haut vers le bas ! »",
      "L'enseignant-e propose aux élèves d'y travailler par groupe",
      "de 4 élèves afin de réaliser une présentation de l'emploi du",
      "temps de la journée.",
      "Je recherche",
      "Les élèves se répartissent donc par groupes de 4",
      "L'enseignant-e leur distribue les étiquettes « matière » ou",
      "© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
      "« activités » et leur propose différents types de feuilles",
      "blanches : A4 ou A3.",
      "Chaque groupe travaille ensuite en autonomie et construit",
      "son emploi du temps de la journée. L'enseignant-e est bien-",
      "sûr présent-e pour répondre aux questions comme : « mais",
      "est-ce qu'on fait musique avant l'anglais ? », « qu'est-ce",
      "qu'on fait après le repas ? »...",
      "Les élèves manipulent ainsi oralement le vocabulaire lié",
      "aux positionnement d'évènements les uns par rapport aux",
      "autres.",
      "Après ce temps de travail, chaque groupe présente à la",
      "classe son emploi du temps en utilisant de nouveau ce",
      "vocabulaire dans sa présentation.",
      "L'enseignant-e propose alors la fiche élève 1 pour faire un",
      "point sur ce travail puis l’étendre à l'emploi du temps de la",
      "semaine avec la fiche élève 2 (cette étape peut être réser-",
      "vée aux CE1). Pour réaliser ce dernier, l'enseignant-e note",
      "au tableau, au fur et à mesure, l'emploi du temps de chaque",
      "journée. Il peut être judicieux d'agrandir au format A3 cette",
      "page.",
      "Je retiens",
      "On peut situer des évènements (ou des activités)",
      "les uns par rapport aux autres.",
      "« Pour faire l'emploi du temps d'une journée ou d'une",
      "semaine, on peut utiliser une frise ou un emploi du",
      "temps.",
      "Se situer dans le temps « 319",
      "Fiche enseignant",
    ],
    sessions: [
      {
        number: 2,
        title:
          "Situer des évènements les uns par rapport aux autres dans un mois, une année. Matériel : calendriers, feuilles A4 avec les mois de l'année.",
        rawText:
          "| Séance 2 IFT\n\nSituer des évènements les uns par rapport aux autres\ndans un mois, une année.\n\nMatériel : calendriers, feuilles A4 avec les mois de l'année.\n\n8 Je m'interroge\n\nL'enseignant-e demande aux élèves de nommer les douze\nmois de l'année. Un-e élève vient les écrire au tableau les\nuns à côté des autres.\n\nPuis l'enseignant-e demande aux élèves de repérer le mois\nde leur anniversaire. Chaque élève vient noter au tableau\nsa date d'anniversaire avec le prénom associé. On précise\noralement qui a son anniversaire en même temps, avant,\naprès, ou pendant le même mois.\n\nL'enseignant-e demande ensuite :\n\nQue peut-on utiliser pour nous repérer facilement dans\nl'année ? Et que peut-on repérer, comme évènements,\ndans une année ?\n\nLes élèves citent alors le calendrier qu'ils ont déjà vu dans\nle dossier 24. Ils évoqueront peut-être les vacances, les\njours fériés, les fêtes comme Noël, le 14 juillet...\nL'enseignant-e propose alors de construire une frise col-\nlective de l'année où l’on pourra noter les évènements\nprogrammés et les évènements liés à la vie de classe ou de\nl'école.\n\nJe recherche\n\nL'enseignant-e distribue des feuilles A4 pour chaque mois\nde l'année et des étiquettes des mois qui seront à coller\ndessus.\n\nEnsuite, les élèves se répartissent les 12 mois de l'année\nen formant des groupes de travail. Chaque groupe dispose,\npour s'aider, d’un calendrier. À l'issue de cette activité, la\nfrise de l'année est assemblée collectivement. Les feuilles\nsont fixées les unes aux autres horizontalement de janvier\nà décembre.\n\nLa fiche élève 3 est alors distribuée. Elle propose des exer-\ncices autour de la succession des douze mois de l'année et\npermet à l'élève de se les approprier.\n\n2 Je retiens\n\n+ On peut situer des évènements (ou des activités)\nles uns par rapport aux autres.\n\n« On peut pour cela utiliser une frise ou un calendrier\nsur un mois ou une année.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e demande aux élèves de nommer les douze\nmois de l'année. Un-e élève vient les écrire au tableau les\nuns à côté des autres.\n\nPuis l'enseignant-e demande aux élèves de repérer le mois\nde leur anniversaire. Chaque élève vient noter au tableau\nsa date d'anniversaire avec le prénom associé. On précise\noralement qui a son anniversaire en même temps, avant,\naprès, ou pendant le même mois.\n\nL'enseignant-e demande ensuite :\n\nQue peut-on utiliser pour nous repérer facilement dans\nl'année ? Et que peut-on repérer, comme évènements,\ndans une année ?\n\nLes élèves citent alors le calendrier qu'ils ont déjà vu dans\nle dossier 24. Ils évoqueront peut-être les vacances, les\njours fériés, les fêtes comme Noël, le 14 juillet...\nL'enseignant-e propose alors de construire une frise col-\nlective de l'année où l’on pourra noter les évènements\nprogrammés et les évènements liés à la vie de classe ou de\nl'école.",
          },
          {
            title: "Je recherche",
            detail:
              "L'enseignant-e distribue des feuilles A4 pour chaque mois\nde l'année et des étiquettes des mois qui seront à coller\ndessus.\n\nEnsuite, les élèves se répartissent les 12 mois de l'année\nen formant des groupes de travail. Chaque groupe dispose,\npour s'aider, d’un calendrier. À l'issue de cette activité, la\nfrise de l'année est assemblée collectivement. Les feuilles\nsont fixées les unes aux autres horizontalement de janvier\nà décembre.\n\nLa fiche élève 3 est alors distribuée. Elle propose des exer-\ncices autour de la succession des douze mois de l'année et\npermet à l'élève de se les approprier.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "+ On peut situer des évènements (ou des activités)\nles uns par rapport aux autres.\n\n« On peut pour cela utiliser une frise ou un calendrier\nsur un mois ou une année.",
          },
        ],
      },
      {
        number: 3,
        title:
          "Situer des évènements les uns par rapport aux autres dans un récit. Matériel : Album La récré est toujours trop courte ! d'Élodie",
        rawText:
          "| Séance 3 FFF,\n\nSituer des évènements les uns par rapport aux autres\ndans un récit.\n\nMatériel : Album La récré est toujours trop courte ! d'Élodie\nRichard, éditions MDI, collection « J'aime mon école ! ».\nBandes de papier A3 de 5 cm x 59,4 cm sur laquelle est\ntracée une flèche et où est écrit : « début de la récré — fin\nde la récré ».\n\nG@ Jen interroge\n\nL'enseignant-e présente à la classe l'album La récré est\ntoujours trop courte ! On indique aux élèves que ceux-ci\nvont devoir, après la lecture qui va être faite, mémoriser\npuis dessiner un passage de ce livre : l’une des rencontres\nde David (personnage principal de cette histoire) avec une\nautre personne.\n\nN.B. : Le spécimen de cet album est feuilletable sur le site\nInternet des éditions MDI. Cette proposition de séance peut\nbien sûr être adaptée à un autre récit en fonction des choix\nde l'enseignant-e.\n\nL'enseignant-e lit alors l'album à voix haute. Puis on dis-\ntribue à chaque élève une feuille blanche format A5 et\non demande aux élèves de se placer par groupes de 4. On\ndonne également à chaque groupe la frise du temps de la\nrécré.\n\nJe recherche\n\nLes élèves étant installés, I'enseignant-e précise que, dans\nchaque groupe, chaque élève doit représenter une ren-\ncontre différente faite par David (il y a quatre personnes à\nretrouver et quatre objets correspondants).\n\nLes dessins doivent ensuite être placés sur la frise du temps\nde la récréation qui passe, dans l'ordre. L'enseignant-e relit\nl'histoire et chaque groupe vérifie ses propositions.\n\nPuis on propose de comparer la récréation des différents\npersonnages sur ce temps de récréation. Pour cette activité,\non distribue la fiche élève 4.\n\nF2 Je retiens\n\n« On ne ressent pas le temps qui passe toujours de la\nmême façon. Si on s'ennuie, le temps semble passer len-\ntement. Au contraire, quand on fait quelque chose qui\nnous plait, le temps semble passer plus vite.\n\nPourtant le temps s'écoule toujours de la même\nfaçon !\n\nMots à retenir\n\nLe précédent\n\nAvant Après Pendant En même temps\nAujourd’hui Demain Après-demain\nHier Avant-hier\n\nLe suivant\n\n320 » Se situer dans le temps\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
        phases: [
          {
            title: "Je recherche",
            detail:
              "Les élèves étant installés, I'enseignant-e précise que, dans\nchaque groupe, chaque élève doit représenter une ren-\ncontre différente faite par David (il y a quatre personnes à\nretrouver et quatre objets correspondants).\n\nLes dessins doivent ensuite être placés sur la frise du temps\nde la récréation qui passe, dans l'ordre. L'enseignant-e relit\nl'histoire et chaque groupe vérifie ses propositions.\n\nPuis on propose de comparer la récréation des différents\npersonnages sur ce temps de récréation. Pour cette activité,\non distribue la fiche élève 4.\n\nF2",
          },
          {
            title: "Je retiens",
            detail:
              "« On ne ressent pas le temps qui passe toujours de la\nmême façon. Si on s'ennuie, le temps semble passer len-\ntement. Au contraire, quand on fait quelque chose qui\nnous plait, le temps semble passer plus vite.\n\nPourtant le temps s'écoule toujours de la même\nfaçon !\n\nMots à retenir\n\nLe précédent\n\nAvant Après Pendant En même temps\nAujourd’hui Demain Après-demain\nHier Avant-hier\n\nLe suivant\n\n320 » Se situer dans le temps\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
          },
        ],
      },
    ],
    guideText:
      ") Avant, après ou pendant ?\n\n» Objectifs\n« Situer des évènements les uns par rapport aux autres.\n« Identifier les évènements quotidiens, hebdomadaires, récurrents, et leur positionnement\n\nles uns par rapport aux autres.\n Comprendre les notions de continuité et succession, antériorité et postériorité,\n\nsimultanéité.\n\n» Indications de progression dans le cycle 2\n\nDans la continuité du dossier précédent, ce dossier porte la compétence « situer des évè-\nnements les uns par rapport aux autres ».\n\nCe dossier concerne les trois niveaux du cycle. Dans la séance 1, l'élève va travailler sur la\npériode d'une journée (CP), d'une semaine (CP-CE1). Dans la séance 2 (destinée aux CET),\nil va apprendre à se repérer sur le mois puis l'année, à partir de dates particulières (person-\nnelles ou historiques). Enfin, la séance 3, destinée aux CE2, aborde la situation temporelle\n\nd'évènements dans un récit.\n\n» Matériel\n\nLe matériel nécessaire est indiqué dans chaque séance.\n\nlséance 1 IOIRCT)\n\nSituer des événements les uns par rapport aux autres\ndans une journée, une semaine.\n\n[2] Je m'interroge\n\nL'enseignant-e, pour commencer la journée de classe, pré-\nsente aux élèves leur emploi du temps de la journée mais\ndans le désordre. Chaque activité est écrite sur une bande\nde papier et affichée au tableau ; on y placera également les\ntemps de récréation et de repas jusqu'à la fin de la classe.\n\nL'enseignant-e demande aux élèves :\n\nVoici dans le désordre le programme de notre journée\nde classe, qui est une journée habituelle. Dans quel\nordre vont se dérouler ces activités, d'après vous ?\nComment peut-on les présenter pour avoir en mémoire\nnotre emploi du temps et bien le présenter ?\n\nOn peut attendre des élèves des réponses comme : « il faut\nles classer », « d’abord ce qu'on fait le matin puis ce qu'on\nfait après le repas », « on peut ranger les étiquettes sur une\nligne », « ou on peut les ranger du haut vers le bas ! »\nL'enseignant-e propose aux élèves d'y travailler par groupe\nde 4 élèves afin de réaliser une présentation de l'emploi du\ntemps de la journée.\n\nJe recherche\n\nLes élèves se répartissent donc par groupes de 4\nL'enseignant-e leur distribue les étiquettes « matière » ou\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n« activités » et leur propose différents types de feuilles\nblanches : A4 ou A3.\n\nChaque groupe travaille ensuite en autonomie et construit\nson emploi du temps de la journée. L'enseignant-e est bien-\nsûr présent-e pour répondre aux questions comme : « mais\nest-ce qu'on fait musique avant l'anglais ? », « qu'est-ce\nqu'on fait après le repas ? »...\n\nLes élèves manipulent ainsi oralement le vocabulaire lié\naux positionnement d'évènements les uns par rapport aux\nautres.\n\nAprès ce temps de travail, chaque groupe présente à la\nclasse son emploi du temps en utilisant de nouveau ce\nvocabulaire dans sa présentation.\n\nL'enseignant-e propose alors la fiche élève 1 pour faire un\npoint sur ce travail puis l’étendre à l'emploi du temps de la\nsemaine avec la fiche élève 2 (cette étape peut être réser-\nvée aux CE1). Pour réaliser ce dernier, l'enseignant-e note\nau tableau, au fur et à mesure, l'emploi du temps de chaque\njournée. Il peut être judicieux d'agrandir au format A3 cette\n\npage.\n\n2 Je retiens\n\n On peut situer des évènements (ou des activités)\nles uns par rapport aux autres.\n\n« Pour faire l'emploi du temps d'une journée ou d'une\nsemaine, on peut utiliser une frise ou un emploi du\ntemps.\n\nSe situer dans le temps « 319\n\nFiche enseignant\n\n| Séance 2 IFT\n\nSituer des évènements les uns par rapport aux autres\ndans un mois, une année.\n\nMatériel : calendriers, feuilles A4 avec les mois de l'année.\n\n8 Je m'interroge\n\nL'enseignant-e demande aux élèves de nommer les douze\nmois de l'année. Un-e élève vient les écrire au tableau les\nuns à côté des autres.\n\nPuis l'enseignant-e demande aux élèves de repérer le mois\nde leur anniversaire. Chaque élève vient noter au tableau\nsa date d'anniversaire avec le prénom associé. On précise\noralement qui a son anniversaire en même temps, avant,\naprès, ou pendant le même mois.\n\nL'enseignant-e demande ensuite :\n\nQue peut-on utiliser pour nous repérer facilement dans\nl'année ? Et que peut-on repérer, comme évènements,\ndans une année ?\n\nLes élèves citent alors le calendrier qu'ils ont déjà vu dans\nle dossier 24. Ils évoqueront peut-être les vacances, les\njours fériés, les fêtes comme Noël, le 14 juillet...\nL'enseignant-e propose alors de construire une frise col-\nlective de l'année où l’on pourra noter les évènements\nprogrammés et les évènements liés à la vie de classe ou de\nl'école.\n\nJe recherche\n\nL'enseignant-e distribue des feuilles A4 pour chaque mois\nde l'année et des étiquettes des mois qui seront à coller\ndessus.\n\nEnsuite, les élèves se répartissent les 12 mois de l'année\nen formant des groupes de travail. Chaque groupe dispose,\npour s'aider, d’un calendrier. À l'issue de cette activité, la\nfrise de l'année est assemblée collectivement. Les feuilles\nsont fixées les unes aux autres horizontalement de janvier\nà décembre.\n\nLa fiche élève 3 est alors distribuée. Elle propose des exer-\ncices autour de la succession des douze mois de l'année et\npermet à l'élève de se les approprier.\n\n2 Je retiens\n\n+ On peut situer des évènements (ou des activités)\nles uns par rapport aux autres.\n\n« On peut pour cela utiliser une frise ou un calendrier\nsur un mois ou une année.\n\n| Séance 3 FFF,\n\nSituer des évènements les uns par rapport aux autres\ndans un récit.\n\nMatériel : Album La récré est toujours trop courte ! d'Élodie\nRichard, éditions MDI, collection « J'aime mon école ! ».\nBandes de papier A3 de 5 cm x 59,4 cm sur laquelle est\ntracée une flèche et où est écrit : « début de la récré — fin\nde la récré ».\n\nG@ Jen interroge\n\nL'enseignant-e présente à la classe l'album La récré est\ntoujours trop courte ! On indique aux élèves que ceux-ci\nvont devoir, après la lecture qui va être faite, mémoriser\npuis dessiner un passage de ce livre : l’une des rencontres\nde David (personnage principal de cette histoire) avec une\nautre personne.\n\nN.B. : Le spécimen de cet album est feuilletable sur le site\nInternet des éditions MDI. Cette proposition de séance peut\nbien sûr être adaptée à un autre récit en fonction des choix\nde l'enseignant-e.\n\nL'enseignant-e lit alors l'album à voix haute. Puis on dis-\ntribue à chaque élève une feuille blanche format A5 et\non demande aux élèves de se placer par groupes de 4. On\ndonne également à chaque groupe la frise du temps de la\nrécré.\n\nJe recherche\n\nLes élèves étant installés, I'enseignant-e précise que, dans\nchaque groupe, chaque élève doit représenter une ren-\ncontre différente faite par David (il y a quatre personnes à\nretrouver et quatre objets correspondants).\n\nLes dessins doivent ensuite être placés sur la frise du temps\nde la récréation qui passe, dans l'ordre. L'enseignant-e relit\nl'histoire et chaque groupe vérifie ses propositions.\n\nPuis on propose de comparer la récréation des différents\npersonnages sur ce temps de récréation. Pour cette activité,\non distribue la fiche élève 4.\n\nF2 Je retiens\n\n« On ne ressent pas le temps qui passe toujours de la\nmême façon. Si on s'ennuie, le temps semble passer len-\ntement. Au contraire, quand on fait quelque chose qui\nnous plait, le temps semble passer plus vite.\n\nPourtant le temps s'écoule toujours de la même\nfaçon !\n\nMots à retenir\n\nLe précédent\n\nAvant Après Pendant En même temps\nAujourd’hui Demain Après-demain\nHier Avant-hier\n\nLe suivant\n\n320 » Se situer dans le temps\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
    guidePageDecisions: [
      {
        page: 319,
        confidence: 93,
        score: 24,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "par groupes",
        ],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "par groupes", "groupe"],
        studentLike: false,
      },
      {
        page: 320,
        confidence: 94,
        score: 22,
        included: true,
        strongMarkers: [
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "par groupes",
        ],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: [
          "enseignant",
          "eleves",
          "on demande",
          "on propose",
          "on distribue",
          "par groupes",
          "groupe",
        ],
        studentLike: true,
      },
      {
        page: 321,
        confidence: 90,
        score: -4,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: true,
      },
    ],
    skippedProbePages: [321],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-26",
    dossierNumber: 26,
    partNumber: 6,
    partTitle: "Se situer dans le temps",
    title: "Comment mesurer le temps ?",
    guidePages: [333, 334],
    guidePageCount: 2,
    objectives: ["mesure.", "mois, année, siècle, millénaire.", "d'évaluation finale."],
    progressionNote:
      "Ce dossier 26 est destiné aux CE2. Il permet d'aborder la notion de temps qui passe de\nfaçon plus approfondie, en estimant puis en mesurant différentes durées. Ce travail est\nmené en lien avec le programme de mathématiques et est l'occasion d'utiliser différents\ninstruments de mesure du temps (sablier, horloge, montres à aiguilles et à affichage digital,\nchronomètre). Deux séances sont proposées avec des fiches élève associées et une fiche",
    material: [
      "+ Passer d'une durée intuitive à une durée mesurée : comprendre que le temps se déroule.",
      "« Estimer, mesurer des durées : estimer une durée et la confronter à des outils réels de",
      "+ Connaître les unités de mesure usuelles de durées : jour, semaine, heure, minute, seconde,",
      "» Indications de progression dans le cycle 2",
      "Ce dossier 26 est destiné aux CE2. Il permet d'aborder la notion de temps qui passe de",
      "façon plus approfondie, en estimant puis en mesurant différentes durées. Ce travail est",
      "mené en lien avec le programme de mathématiques et est l'occasion d'utiliser différents",
      "instruments de mesure du temps (sablier, horloge, montres à aiguilles et à affichage digital,",
      "chronomètre). Deux séances sont proposées avec des fiches élève associées et une fiche",
      "Le matériel nécessaire est indiqué dans chaque séance.",
      "sence NTI",
      "Passer d'une durée intuitive à une durée mesurée :",
      "comprendre que le temps se déroule.",
      "Découvrir des outils de mesure du temps et les diffé-",
      "rentes unités de temps.",
      "a Je m'interroge",
      "L'enseignant-e rappelle que, les années précédentes, les",
      "élèves ont vu qu'ils pouvaient repérer le temps qui passe de",
      "différentes manières : sur une horloge, un réveil, une montre",
      "ou encore un calendrier. On interroge alors les élèves :",
      "Connaissez-vous d'autres instruments qui permettent",
      "de mesurer le temps qui passe ? Comment mesurer des",
      "durées aussi différentes qu'une course de vitesse dans",
      "la cour ? le temps de cuisson d’un œuf dur ? Comment",
      "mesurer le temps qu'il faut pour bien se brosser les",
      "dents ou... l'histoire de la Terre ?",
      "Les élèves pourront donner les réponses suivantes : « quand",
      "on fait la course, on peut se chronométrer pour connaître",
      "le temps qu'on a mis », « quand on cuit des œufs, on met",
      "un petit sablier pour savoir si c'est cuit », « on peut savoir",
      "si on s'est suffisamment brossé les dents quand la brosse",
      "à dents électrique sonne », « la Terre, elle a des millions",
      "d'années ! »...",
      "L'enseignant-e propose aux élèves de découvrir les outils",
      "qui permettent de mesurer ces temps si différents.",
      "Je recherche",
      "On distribue la fiche élève 1. Les élèves vont appréhen-",
      "der les différents instruments de mesure du temps et",
      "apprendre que les unités de mesure du temps sont variables.",
      "Il y a le temps long (par exemple en histoire, les périodes",
      "© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
      "historiques) et le temps court (par exemple sur une",
      "journée).",
      "À l'issue de cette recherche, les élèves réaliseront la trace",
      "écrite collective avec l'enseignant-e.",
      "Je retiens",
      "« Pour mesurer le temps, nous utilisons différents instru-",
      "ments : le sablier, la clepsydre, le chronomètre, le minu-",
      "teur, le cadran solaire, le calendrier, la montre, l'horloge.",
      "Certains instruments nous permettent de connaitre",
      "l'heure (comme la montre ou le cadran solaire), d'autres",
      "de connaître le temps qui s'est écoulé (comme le chro-",
      "nomètre ou le minuteur).",
      "+ La frise historique permet de visualiser le temps long",
      "écoulé.",
      "IE séance 2 JETT)",
      "Estimer, mesurer des durées : estimer une durée et la",
      "confronter à des outils réels de mesure.",
      "Matériel : horloge de la classe, montre, chronométre.",
      "e Je m'interroge",
      "L'enseignant-e rappelle avec les élèves ce qui a été mis en",
      "évidence lors de la séance 1 : le temps passe, se déroule,",
      "on peut le mesurer en utilisant des outils. Les élèves sont",
      "mis à contribution pour les nommer : sablier, chronomètre,",
      "montre, cadran solaire, calendrier, frise…",
      "En fonction de ce que l'on veut mesurer ou estimer, on uti-",
      "lise des unités de temps différents : la seconde, la minute,",
      "l'heure, la journée, la semaine, le mois, l'année, le siècle,",
      "le millénaire.",
      "Se situer dans le temps « 333",
      "Fiche enseignant",
    ],
    sessions: [
      {
        number: 1,
        title: "Séance 1 [À VÉRIFIER]",
        rawText:
          "» Objectifs\n\nmesure.\n\nmois, année, siècle, millénaire.\n\nd'évaluation finale.\n\n» Matériel\n\n+ Passer d'une durée intuitive à une durée mesurée : comprendre que le temps se déroule.\n« Estimer, mesurer des durées : estimer une durée et la confronter à des outils réels de\n\n+ Connaître les unités de mesure usuelles de durées : jour, semaine, heure, minute, seconde,\n\n» Indications de progression dans le cycle 2\n\nCe dossier 26 est destiné aux CE2. Il permet d'aborder la notion de temps qui passe de\nfaçon plus approfondie, en estimant puis en mesurant différentes durées. Ce travail est\nmené en lien avec le programme de mathématiques et est l'occasion d'utiliser différents\ninstruments de mesure du temps (sablier, horloge, montres à aiguilles et à affichage digital,\nchronomètre). Deux séances sont proposées avec des fiches élève associées et une fiche\n\nLe matériel nécessaire est indiqué dans chaque séance.\n\nsence NTI\n\nPasser d'une durée intuitive à une durée mesurée :\ncomprendre que le temps se déroule.\n\nDécouvrir des outils de mesure du temps et les diffé-\nrentes unités de temps.\n\na Je m'interroge\n\nL'enseignant-e rappelle que, les années précédentes, les\nélèves ont vu qu'ils pouvaient repérer le temps qui passe de\ndifférentes manières : sur une horloge, un réveil, une montre\nou encore un calendrier. On interroge alors les élèves :\n\nConnaissez-vous d'autres instruments qui permettent\nde mesurer le temps qui passe ? Comment mesurer des\ndurées aussi différentes qu'une course de vitesse dans\nla cour ? le temps de cuisson d’un œuf dur ? Comment\nmesurer le temps qu'il faut pour bien se brosser les\ndents ou... l'histoire de la Terre ?\n\nLes élèves pourront donner les réponses suivantes : « quand\non fait la course, on peut se chronométrer pour connaître\nle temps qu'on a mis », « quand on cuit des œufs, on met\nun petit sablier pour savoir si c'est cuit », « on peut savoir\nsi on s'est suffisamment brossé les dents quand la brosse\nà dents électrique sonne », « la Terre, elle a des millions\nd'années ! »...\n\nL'enseignant-e propose aux élèves de découvrir les outils\nqui permettent de mesurer ces temps si différents.\n\nJe recherche\nOn distribue la fiche élève 1. Les élèves vont appréhen-\nder les différents instruments de mesure du temps et\n\napprendre que les unités de mesure du temps sont variables.\nIl y a le temps long (par exemple en histoire, les périodes\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nhistoriques) et le temps court (par exemple sur une\njournée).\n\nÀ l'issue de cette recherche, les élèves réaliseront la trace\nécrite collective avec l'enseignant-e.\n\n#2 Je retiens\n\n« Pour mesurer le temps, nous utilisons différents instru-\nments : le sablier, la clepsydre, le chronomètre, le minu-\nteur, le cadran solaire, le calendrier, la montre, l'horloge.\n\n* Certains instruments nous permettent de connaitre\nl'heure (comme la montre ou le cadran solaire), d'autres\nde connaître le temps qui s'est écoulé (comme le chro-\nnomètre ou le minuteur).\n\n+ La frise historique permet de visualiser le temps long\nécoulé.\n\nIE séance 2 JETT)\n\nEstimer, mesurer des durées : estimer une durée et la\nconfronter à des outils réels de mesure.\n\nMatériel : horloge de la classe, montre, chronométre.\n\ne Je m'interroge\n\nL'enseignant-e rappelle avec les élèves ce qui a été mis en\névidence lors de la séance 1 : le temps passe, se déroule,\non peut le mesurer en utilisant des outils. Les élèves sont\nmis à contribution pour les nommer : sablier, chronomètre,\nmontre, cadran solaire, calendrier, frise…\n\nEn fonction de ce que l'on veut mesurer ou estimer, on uti-\nlise des unités de temps différents : la seconde, la minute,\nl'heure, la journée, la semaine, le mois, l'année, le siècle,\nle millénaire.\n\nSe situer dans le temps « 333\n\nFiche enseignant\n\nL'enseignant-e propose alors d'utiliser certains de ces outils\npour mesurer le temps et confronter les élèves à la percep-\ntion qu'ils peuvent avoir du temps qui passe.\n\nOn leur demande de travailler en binômes pour les\nrecherches et exercices suivants.\n\n= Je recherche\n\nL'enseignant-e distribue à chaque binôme la fiche élève 2\n(on peut en donner une à chaque membre du binôme afin\nque les deux élèves conservent cette trace écrite).\nLes élèves répondent aux questions de l'exercice 1 seuls,\navant de confronter leurs réponses collectivement.\n\nOn peut alors utiliser l'emploi du temps de la classe pour |\n\nvérifier, réaliser une frise au tableau, etc. La réponse à la\nquestion « Combien de semaines de vacances as-tu dans\nune année scolaire complète ? » sera vérifiée sur le verso de\nla fiche élève (exercice 4).\n\n&\n\nMESURER\n\nPour réaliser l'exercice 2, les élèves devront se déplacer\ndans la cour où l’enseignant-e aura réalisé un parcours\nde course de 100 mètres (il est possible de le réaliser en\nboucle 10 fois 10 mètres par exemple). Des élèves seront\nchargés de chronométrer les coureurs et de noter leurs\nperformances.\n\n|\n| 2 Je retiens\n\n» IL est parfois difficile d'estimer une durée.\n\n* Des outils précis de mesure comme un chronomètre,\nune montre, une horloge, un calendrier, etc. permettent\n| de mesurer précisément le temps qui passe.\n\nLE TEMPS\n\n* Pour mesurer le temps, nous utilisons différents instruments.\n\nl'horloge le sablier\n\nla clepsydre\n\nle cadran solaire\n\nCALENDRIER 2017\n\nle minuteur le chronomètre le calendrier\n\n* Certains instruments nous permettent de connaitre l'heure (comme la montre ou le cadran solaire),\nd'autres de connaître le temps qui s'est écoulé (comme le chronomètre ou le minuteur).\n\n* La frise historique permet de visualiser le temps long écoulé.\n\nae G - ET\n\n» IL est parfois difficile d'estimer une durée. Des outils précis de mesure comme un chronomètre,\nune montre, une horloge, un calendrier, etc. permettent de mesurer précisément le temps qui passe.\n\nMots a retenir\n\nTemps\nTemps long\nInstruments de mesure\n\nDurée\nTemps court\nUnités de mesure\n\n334 » Se situer dans le temps\n\n© MDI / SEER, 2017. Reproduction autorisée pour une classe seulement.",
        phases: [
          {
            title: "Séance 1",
            detail:
              "» Objectifs\n\nmesure.\n\nmois, année, siècle, millénaire.\n\nd'évaluation finale.\n\n» Matériel\n\n+ Passer d'une durée intuitive à une durée mesurée : comprendre que le temps se déroule.\n« Estimer, mesurer des durées : estimer une durée et la confronter à des outils réels de\n\n+ Connaître les unités de mesure usuelles de durées : jour, semaine, heure, minute, seconde,\n\n» Indications de progression dans le cycle 2\n\nCe dossier 26 est destiné aux CE2. Il permet d'aborder la notion de temps qui passe de\nfaçon plus approfondie, en estimant puis en mesurant différentes durées. Ce travail est\nmené en lien avec le programme de mathématiques et est l'occasion d'utiliser différents\ninstruments de mesure du temps (sablier, horloge, montres à aiguilles et à affichage digital,\nchronomètre). Deux séances sont proposées avec des fiches élève associées et une fiche\n\nLe matériel nécessaire est indiqué dans chaque séance.\n\nsence NTI\n\nPasser d'une durée intuitive à une durée mesurée :\ncomprendre que le temps se déroule.\n\nDécouvrir des outils de mesure du temps et les diffé-\nrentes unités de temps.\n\na Je m'interroge\n\nL'enseignant-e rappelle que, les années précédentes, les\nélèves ont vu qu'ils pouvaient repérer le temps qui passe de\ndifférentes manières : sur une horloge, un réveil, une montre\nou encore un calendrier. On interroge alors les élèves :\n\nConnaissez-vous d'autres instruments qui permettent\nde mesurer le temps qui passe ? Comment mesurer des\ndurées aussi différentes qu'une course de vitesse dans\nla cour ? le temps de cuisson d’un œuf dur ? Comment\nmesurer le temps qu'il faut pour bien se brosser les\ndents ou... l'histoire de la Terre ?\n\nLes élèves pourront donner les réponses suivantes : « quand\non fait la course, on peut se chronométrer pour connaître\nle temps qu'on a mis », « quand on cuit des œufs, on met\nun petit sablier pour savoir si c'est cuit », « on peut savoir\nsi on s'est suffisamment brossé les dents quand la brosse\nà dents électrique sonne », « la Terre, elle a des millions\nd'années ! »...\n\nL'enseignant-e propose aux élèves de découvrir les outils\nqui permettent de mesurer ces temps si différents.\n\nJe recherche\nOn distribue la fiche élève 1. Les élèves vont appréhen-\nder les différents instruments de mesure du temps et\n\napprendre que les unités de mesure du temps sont variables.\nIl y a le temps long (par exemple en histoire, les périodes\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nhistoriques) et le temps court (par exemple sur une\njournée).\n\nÀ l'issue de cette recherche, les élèves réaliseront la trace\nécrite collective avec l'enseignant-e.\n\n#2 Je retiens\n\n« Pour mesurer le temps, nous utilisons différents instru-\nments : le sablier, la clepsydre, le chronomètre, le minu-\nteur, le cadran solaire, le calendrier, la montre, l'horloge.\n\n* Certains instruments nous permettent de connaitre\nl'heure (comme la montre ou le cadran solaire), d'autres\nde connaître le temps qui s'est écoulé (comme le chro-\nnomètre ou le minuteur).\n\n+ La frise historique permet de visualiser le temps long\nécoulé.\n\nIE séance 2 JETT)\n\nEstimer, mesurer des durées : estimer une durée et la\nconfronter à des outils réels de mesure.\n\nMatériel : horloge de la classe, montre, chronométre.\n\ne Je m'interroge\n\nL'enseignant-e rappelle avec les élèves ce qui a été mis en\névidence lors de la séance 1 : le temps passe, se déroule,\non peut le mesurer en utilisant des outils. Les élèves sont\nmis à contribution pour les nommer : sablier, chronomètre,\nmontre, cadran solaire, calendrier, frise…\n\nEn fonction de ce que l'on veut mesurer ou estimer, on uti-\nlise des unités de temps différents : la seconde, la minute,\nl'heure, la journée, la semaine, le mois, l'année, le siècle,\nle millénaire.\n\nSe situer dans le temps « 333\n\nFiche enseignant\n\nL'enseignant-e propose alors d'utiliser certains de ces outils\npour mesurer le temps et confronter les élèves à la percep-\ntion qu'ils peuvent avoir du temps qui passe.\n\nOn leur demande de travailler en binômes pour les\nrecherches et exercices suivants.\n\n= Je recherche\n\nL'enseignant-e distribue à chaque binôme la fiche élève 2\n(on peut en donner une à chaque membre du binôme afin\nque les deux élèves conservent cette trace écrite).\nLes élèves répondent aux questions de l'exercice 1 seuls,\navant de confronter leurs réponses collectivement.\n\nOn peut alors utiliser l'emploi du temps de la classe pour |\n\nvérifier, réaliser une frise au tableau, etc. La réponse à la\nquestion « Combien de semaines de vacances as-tu dans\nune année scolaire complète ? » sera vérifiée sur le verso de\nla fiche élève (exercice 4).\n\n&\n\nMESURER\n\nPour réaliser l'exercice 2, les élèves devront se déplacer\ndans la cour où l’enseignant-e aura réalisé un parcours\nde course de 100 mètres (il est possible de le réaliser en\nboucle 10 fois 10 mètres par exemple). Des élèves seront\nchargés de chronométrer les coureurs et de noter leurs\nperformances.\n\n|\n| 2 Je retiens\n\n» IL est parfois difficile d'estimer une durée.\n\n* Des outils précis de mesure comme un chronomètre,\nune montre, une horloge, un calendrier, etc. permettent\n| de mesurer précisément le temps qui passe.\n\nLE TEMPS\n\n* Pour mesurer le temps, nous utilisons différents instruments.\n\nl'horloge le sablier\n\nla clepsydre\n\nle cadran solaire\n\nCALENDRIER 2017\n\nle minuteur le chronomètre le calendrier\n\n* Certains instruments nous permettent de connaitre l'heure (comme la montre ou le cadran solaire),\nd'autres de connaître le temps qui s'est écoulé (comme le chronomètre ou le minuteur).\n\n* La frise historique permet de visualiser le temps long écoulé.\n\nae G - ET\n\n» IL est parfois difficile d'estimer une durée. Des outils précis de mesure comme un chronomètre,\nune montre, une horloge, un calendrier, etc. permettent de mesurer précisément le temps qui passe.\n\nMots a retenir\n\nTemps\nTemps long\nInstruments de mesure\n\nDurée\nTemps court\nUnités de mesure\n\n334 » Se situer dans le temps\n\n© MDI / SEER, 2017. Reproduction autorisée pour une classe seulement.",
          },
        ],
      },
    ],
    guideText:
      "» Objectifs\n\nmesure.\n\nmois, année, siècle, millénaire.\n\nd'évaluation finale.\n\n» Matériel\n\n+ Passer d'une durée intuitive à une durée mesurée : comprendre que le temps se déroule.\n« Estimer, mesurer des durées : estimer une durée et la confronter à des outils réels de\n\n+ Connaître les unités de mesure usuelles de durées : jour, semaine, heure, minute, seconde,\n\n» Indications de progression dans le cycle 2\n\nCe dossier 26 est destiné aux CE2. Il permet d'aborder la notion de temps qui passe de\nfaçon plus approfondie, en estimant puis en mesurant différentes durées. Ce travail est\nmené en lien avec le programme de mathématiques et est l'occasion d'utiliser différents\ninstruments de mesure du temps (sablier, horloge, montres à aiguilles et à affichage digital,\nchronomètre). Deux séances sont proposées avec des fiches élève associées et une fiche\n\nLe matériel nécessaire est indiqué dans chaque séance.\n\nsence NTI\n\nPasser d'une durée intuitive à une durée mesurée :\ncomprendre que le temps se déroule.\n\nDécouvrir des outils de mesure du temps et les diffé-\nrentes unités de temps.\n\na Je m'interroge\n\nL'enseignant-e rappelle que, les années précédentes, les\nélèves ont vu qu'ils pouvaient repérer le temps qui passe de\ndifférentes manières : sur une horloge, un réveil, une montre\nou encore un calendrier. On interroge alors les élèves :\n\nConnaissez-vous d'autres instruments qui permettent\nde mesurer le temps qui passe ? Comment mesurer des\ndurées aussi différentes qu'une course de vitesse dans\nla cour ? le temps de cuisson d’un œuf dur ? Comment\nmesurer le temps qu'il faut pour bien se brosser les\ndents ou... l'histoire de la Terre ?\n\nLes élèves pourront donner les réponses suivantes : « quand\non fait la course, on peut se chronométrer pour connaître\nle temps qu'on a mis », « quand on cuit des œufs, on met\nun petit sablier pour savoir si c'est cuit », « on peut savoir\nsi on s'est suffisamment brossé les dents quand la brosse\nà dents électrique sonne », « la Terre, elle a des millions\nd'années ! »...\n\nL'enseignant-e propose aux élèves de découvrir les outils\nqui permettent de mesurer ces temps si différents.\n\nJe recherche\nOn distribue la fiche élève 1. Les élèves vont appréhen-\nder les différents instruments de mesure du temps et\n\napprendre que les unités de mesure du temps sont variables.\nIl y a le temps long (par exemple en histoire, les périodes\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nhistoriques) et le temps court (par exemple sur une\njournée).\n\nÀ l'issue de cette recherche, les élèves réaliseront la trace\nécrite collective avec l'enseignant-e.\n\n#2 Je retiens\n\n« Pour mesurer le temps, nous utilisons différents instru-\nments : le sablier, la clepsydre, le chronomètre, le minu-\nteur, le cadran solaire, le calendrier, la montre, l'horloge.\n\n* Certains instruments nous permettent de connaitre\nl'heure (comme la montre ou le cadran solaire), d'autres\nde connaître le temps qui s'est écoulé (comme le chro-\nnomètre ou le minuteur).\n\n+ La frise historique permet de visualiser le temps long\nécoulé.\n\nIE séance 2 JETT)\n\nEstimer, mesurer des durées : estimer une durée et la\nconfronter à des outils réels de mesure.\n\nMatériel : horloge de la classe, montre, chronométre.\n\ne Je m'interroge\n\nL'enseignant-e rappelle avec les élèves ce qui a été mis en\névidence lors de la séance 1 : le temps passe, se déroule,\non peut le mesurer en utilisant des outils. Les élèves sont\nmis à contribution pour les nommer : sablier, chronomètre,\nmontre, cadran solaire, calendrier, frise…\n\nEn fonction de ce que l'on veut mesurer ou estimer, on uti-\nlise des unités de temps différents : la seconde, la minute,\nl'heure, la journée, la semaine, le mois, l'année, le siècle,\nle millénaire.\n\nSe situer dans le temps « 333\n\nFiche enseignant\n\nL'enseignant-e propose alors d'utiliser certains de ces outils\npour mesurer le temps et confronter les élèves à la percep-\ntion qu'ils peuvent avoir du temps qui passe.\n\nOn leur demande de travailler en binômes pour les\nrecherches et exercices suivants.\n\n= Je recherche\n\nL'enseignant-e distribue à chaque binôme la fiche élève 2\n(on peut en donner une à chaque membre du binôme afin\nque les deux élèves conservent cette trace écrite).\nLes élèves répondent aux questions de l'exercice 1 seuls,\navant de confronter leurs réponses collectivement.\n\nOn peut alors utiliser l'emploi du temps de la classe pour |\n\nvérifier, réaliser une frise au tableau, etc. La réponse à la\nquestion « Combien de semaines de vacances as-tu dans\nune année scolaire complète ? » sera vérifiée sur le verso de\nla fiche élève (exercice 4).\n\n&\n\nMESURER\n\nPour réaliser l'exercice 2, les élèves devront se déplacer\ndans la cour où l’enseignant-e aura réalisé un parcours\nde course de 100 mètres (il est possible de le réaliser en\nboucle 10 fois 10 mètres par exemple). Des élèves seront\nchargés de chronométrer les coureurs et de noter leurs\nperformances.\n\n|\n| 2 Je retiens\n\n» IL est parfois difficile d'estimer une durée.\n\n* Des outils précis de mesure comme un chronomètre,\nune montre, une horloge, un calendrier, etc. permettent\n| de mesurer précisément le temps qui passe.\n\nLE TEMPS\n\n* Pour mesurer le temps, nous utilisons différents instruments.\n\nl'horloge le sablier\n\nla clepsydre\n\nle cadran solaire\n\nCALENDRIER 2017\n\nle minuteur le chronomètre le calendrier\n\n* Certains instruments nous permettent de connaitre l'heure (comme la montre ou le cadran solaire),\nd'autres de connaître le temps qui s'est écoulé (comme le chronomètre ou le minuteur).\n\n* La frise historique permet de visualiser le temps long écoulé.\n\nae G - ET\n\n» IL est parfois difficile d'estimer une durée. Des outils précis de mesure comme un chronomètre,\nune montre, une horloge, un calendrier, etc. permettent de mesurer précisément le temps qui passe.\n\nMots a retenir\n\nTemps\nTemps long\nInstruments de mesure\n\nDurée\nTemps court\nUnités de mesure\n\n334 » Se situer dans le temps\n\n© MDI / SEER, 2017. Reproduction autorisée pour une classe seulement.",
    guidePageDecisions: [
      {
        page: 333,
        confidence: 93,
        score: 22,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
        ],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on interroge", "on distribue"],
        studentLike: true,
      },
      {
        page: 334,
        confidence: 92,
        score: 12,
        included: true,
        strongMarkers: ["l'enseignant", "enseignant-e", "les eleves"],
        phaseMarkers: ["je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves"],
        studentLike: true,
      },
      {
        page: 335,
        confidence: 78,
        score: -3,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: true,
      },
    ],
    skippedProbePages: [335],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-27",
    dossierNumber: 27,
    partNumber: 6,
    partTitle: "Se situer dans le temps",
    title: "Comment situer ma vie dans le temps ?",
    guidePages: [341, 342],
    guidePageCount: 2,
    objectives: [
      "« Prendre conscience que le temps qui passe est irréversible.",
      "Repérer et situer quelques évènements dans un temps long : le temps des parents,",
      "les générations vivantes et la mémoire familiale.",
    ],
    progressionNote:
      "Dans ce dossier, l'élève manipule des outils de représentation du temps (frise, calendrier) à\ndifférentes échelles temporelles.\nAu CP (séance 1), il élabore une première frise personnelle à l'échelle de son temps et\nprend déjà conscience de l'irréversibilité du temps. Dans un second temps, il confronte\nson temps au temps commun de la classe. Il situe ainsi sur une frise chronologique simple\ndes évènements vécus dans la classe, l'école... Au CE1 (séance 2), on aborde la génération\nprécédente, celle des parents. Enfin, au CE2 (séance 3), on fait appel à la mémoire familiale\nen construisant un arbre généalogique et une frise du temps plus étendue (grands-parents\nou arrière-grands-parents).",
    material: [
      "Le matériel nécessaire est indiqué dans chaque séance.",
      "J",
      "Repérer et situer des événements personnels ou collec-",
      "tifs sur une frise du temps.",
      "Matériel : la « frise de ma vie », de la naissance à 7 ou",
      "ans (+ sur CD-Rom).",
      "a8 Je m’interroge",
      "Il est souhaitable de mettre en place cette séance en début",
      "d'année scolaire, en septembre.",
      "Au moment des rituels du matin, l'enseignant-e écrit la",
      "date et complète le calendrier. On fait lire la date par un",
      "élève (jour/mois/année) et on en profite pour interroger",
      "les élèves :",
      "Est-ce qu’un élève est né en septembre",
      "ou un autre mois) ?",
      "Puis on élargit le questionnement au reste de la classe :",
      "Quel âge avez-vous ? Est-ce que vous connaissez votre",
      "mois de naissance ? Votre année de naissance ?",
      "Les élèves vont facilement donner leur âge, leur mois de",
      "naissance et le quantième vraisemblablement. Il est moins",
      "sûr qu'ils soient capables de donner leur année de naissance.",
      "À l'issue de ce questionnement, l'enseignant-e leur propose",
      "de construire chacun la frise de leur vie depuis leur nais-",
      "sance jusqu'à cette année. Pour cela, on leur demande de",
      "réfléchir à ce qui s'est passé d'important depuis qu'ils sont",
      "nés et qu'ils pourraient demander à leurs parents.",
      "N.B. : Ce travail individuel peut être accompagné d’un tra-",
      "vail collectif, sur une frise propre à la classe, construite et",
      "assemblée jour après jour, mois après mois. Sur cette frise,",
      "pourront être notés les anniversaires, les évènements de la",
      "classe (jours de piscine, vacances, sorties...).",
      "Je recherche",
      "Les élèves réfléchissent par groupes de 4 puis on recense",
      "collectivement les moments importants auxquels pensent",
      "© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
      "les élèves : la première fois que j'ai marché, la première fois",
      "que je suis allé(e) à l’école, la naissance de mon petit frère/",
      "ma petite sœur...",
      "L'enseignant-e explique que ces questions seront à poser",
      "à leurs parents et on distribue le recto de la fiche élève 1.",
      "Ly figure un petit questionnaire. À la réception de ces ques-",
      "tionnaires, les élèves vont pouvoir remplir leur frise indivi-",
      "duelle année par année en commençant a leur naissance.",
      "Le verso de la fiche élève 1 permettra de s'entrainer à lire",
      "et compléter d'autres frises.",
      "Je retiens",
      "On peut représenter notre vie sur une frise chrono-",
      "logique. On la lit de gauche à droite.",
      "« Cette frise commence à la naissance et se complète",
      "tout au long de notre vie. On peut y représenter des",
      "évènements importants pour se les rappeler et se",
      "rendre compte du temps qui passe.",
    ],
    sessions: [
      {
        number: 2,
        title: "Repérer et situer des évènements du temps des parents sur une frise chronologique.",
        rawText:
          "| séance 2 IFT]\n\nRepérer et situer des évènements du temps des parents\nsur une frise chronologique.\n\n[2] Je m'interroge\n\nL'enseignant-e apporte des photos de ses parents,\ngrands-parents quand ils étaient jeunes (ou des photos\nreprésentant des personnes plus ou moins âgées). On\ndemande aux élèves de les observer. On les interroge :\n\n[ Que pouvez-vous dire de ces photos ?\n\nLes élèves peuvent répondre : « ce sont des photos de\npersonnes », « c'est en noir et blanc », « on dirait ma grand-\nmère », « c'était à l'époque »...\n\nL'enseignant-e dévoile que ce sont ses parents ou\ngrands-parents (s'il s'agit de ses propres photos) !! On rap-\n\nSe situer dans le temps « 341\n\nFiche enseignant\n\npelle ensuite aux élèves que, l'an dernier, ils ont construit\nleur frise de vie depuis leur naissance.\n\nL'enseignant-e peut alors rapidement prendre l'exemple\nd'un-e élève en traçant au tableau sa frise de vie, depuis\nsa naissance et en y notant les années écoulées. Puis on\ninterroge les élèves :\n\nQue faut-il de plus pour faire la frise de vie\nde vos parents ?\n\nLes réponses des élèves peuvent être : « il faut qu'elle soit\nplus longue », « oui, il faut remonter dans le temps ».\nOn interroge à nouveau les élèves :\n\nQuand cette frise va-t-elle commencer, d'après vous ?\nQu'allez-vous y faire figurer ?\n\nQuelles questions allez-vous poser à vos parents pour\nremplir cette frise ?\n\nL'enseignant-e propose aux élèves de réaliser une petite\nenquête à la maison auprès de leurs parents. On cherche\nalors collectivement les questions que l'on va leur poser.\nUn exemple de questionnaire est proposé dans le CD-Rom.\n\nJe recherche\n\nL'élève apporte son questionnaire à la maison où a lieu la\nphase de recherche. Il le rapporte ensuite en classe ainsi\nque, le cas échéant, des photos destinées à illustrer la frise\nde vie de ses parents.\n\nChaque élève réalise la frise de vie de ses parents et y place\nles évènements recueillis lors de l'enquête. L'enseignant-e\nest présent et apporte son aide. On demande aux élèves de\nrepérer d'un point rouge leur naissance.\n\nLes frises achevées sont affichées au tableau et sont l’occa-\nsion d'échanges avec les élèves (« Mes parents ont eu une\nvie avant moi, ils ont été bébé, ils ont eu mon âge... »).\n\nÀ l'issue de cet échange, les élèves vont réaliser les exer-\ncices de la fiche élève 2. Ainsi, ils vont pouvoir observer,\ncomparer et compléter différentes frises de vie.\n\n2 Je retiens\n\n« La frise de la vie de mes parents est plus longue que\nla mienne.\n\n«Elle débute à leur naissance. Bien avant moi, mes\nparents aussi ont eu mon âge.\n\n+ On y repère des évènements importants de leur vie\n(il y en a plus que sur ma frise de vie). L'année de ma\nnaissance apparait sur la frise de mes parents.\n\n ase\n\nRepérer et situer des évènements du temps des parents\net des grands-parents sur une frise. Construire un arbre\ngénéalogique.\n\nMatériel : une frise vierge de 1945 à nos jours (— sur\nCD-Rom).\n\na Je m'interroge\n\nL'enseignant-e apporte des photos de ses parents,\ngrands-parents et arrière-grands-parents quand ils étaient\njeunes (si c'est possible). On apporte également un arbre\ngénéalogique correspondant déjà complété.\n\n342 » Se situer dans le temps\n\nOn demande aux élèves de les observer et on les interroge :\nI Que pouvez-vous dire ?\n\nLes élèves peuvent dire : « ce sont des photos de per-\nsonnes », « c'est en noir et blanc », « on dirait ma grand-\nmère », « c'était à l'époque », « c'est un arbre », « il y a\ndes personnes », « il y a des noms », « cela ressemble à un\narbre », « il y a des étages », « il y a des photos »...\nL'enseignant-e explique qu'il s’agit d'un arbre généalo-\ngique. On rappelle ensuite aux élèves que l'année dernière,\nen CET, ils ont construit des frises de vie : celles de leurs\nparents. Ils ont pu constater que celles-ci étaient plus lon-\ngues que leur propre frise de vie.\n\nPuis on interroge les élèves :\n\n[À votre avis, à quoi sert un arbre généalogique ?\nQu'est-ce qu'on peut y faire figurer ?\n{Quels renseignements nous donne-t-il ?\n\nL'enseignant-e propose aux élèves de réaliser une petite\nenquête à la maison auprès de leurs parents et grands-parents\nafin de compléter individuellement leur arbre généalogique.\nUne recherche collective est engagée afin de trouver les\nquestions à poser. Un exemple est proposé (— sur CD-Rom).\n\nB. : Si les élèves peuvent avoir des photos, celles-ci\npeuvent être scannées ou photocopiées afin d'illustrer\nl'arbre en question.\n\nŒ) Je recherche\n\nL'élève questionne ses parents et grands-parents à la mai-\nson afin de répondre à son enquête. Il rapporte ensuite son\nquestionnaire complété en classe ainsi, le cas échéant, que\ndes photos destinées à illustrer l'arbre généalogique.\n\nLes élèves pourront ainsi réaliser leur arbre sur la fiche\nélève 3 (recto) en s'aidant des renseignements collectés.\nL'enseignant-e est présent-e et apporte son aide.\n\nLes élèves pourront ensuite commenter leur arbre aux\nautres élèves.\n\nUne frise de vie des grands-parents pourra être réalisée\nen parallèle en notant l'année de naissance et les évène-\nments importants de leur vie (naissance des parents par\nexemple). Les élèves feront le choix de construire la frise\ndes grands-parents paternels ou maternels.\n\n[7] Je retiens\n\n«La frise de la vie de mes grands-parents est plus\nlongue que la mienne et que celle de mes parents.\n\n- Elle débute à leur naissance. On y repère des évène-\nments importants de leur vie (il y en a plus que sur ma\nfrise de vie).\n\n+ Un arbre généalogique permet de représenter les\nmembres de sa famille et les liens de parenté.\n«l'arbre généalogique présente deux branches : une\nqui représente la famille du papa et une qui représente\nla famille de la maman. Au bas de l'arbre se trouvent\nles enfants. Puis à l'étage au-dessus les parents puis\ngrands-parents.\n\nFrise\n\nArbre généalogique\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n~~",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e apporte des photos de ses parents,\ngrands-parents quand ils étaient jeunes (ou des photos\nreprésentant des personnes plus ou moins âgées). On\ndemande aux élèves de les observer. On les interroge :\n\n[ Que pouvez-vous dire de ces photos ?\n\nLes élèves peuvent répondre : « ce sont des photos de\npersonnes », « c'est en noir et blanc », « on dirait ma grand-\nmère », « c'était à l'époque »...\n\nL'enseignant-e dévoile que ce sont ses parents ou\ngrands-parents (s'il s'agit de ses propres photos) !! On rap-\n\nSe situer dans le temps « 341\n\nFiche enseignant\n\npelle ensuite aux élèves que, l'an dernier, ils ont construit\nleur frise de vie depuis leur naissance.\n\nL'enseignant-e peut alors rapidement prendre l'exemple\nd'un-e élève en traçant au tableau sa frise de vie, depuis\nsa naissance et en y notant les années écoulées. Puis on\ninterroge les élèves :\n\nQue faut-il de plus pour faire la frise de vie\nde vos parents ?\n\nLes réponses des élèves peuvent être : « il faut qu'elle soit\nplus longue », « oui, il faut remonter dans le temps ».\nOn interroge à nouveau les élèves :\n\nQuand cette frise va-t-elle commencer, d'après vous ?\nQu'allez-vous y faire figurer ?\n\nQuelles questions allez-vous poser à vos parents pour\nremplir cette frise ?\n\nL'enseignant-e propose aux élèves de réaliser une petite\nenquête à la maison auprès de leurs parents. On cherche\nalors collectivement les questions que l'on va leur poser.\nUn exemple de questionnaire est proposé dans le CD-Rom.",
          },
          {
            title: "Je recherche",
            detail:
              "L'élève apporte son questionnaire à la maison où a lieu la\nphase de recherche. Il le rapporte ensuite en classe ainsi\nque, le cas échéant, des photos destinées à illustrer la frise\nde vie de ses parents.\n\nChaque élève réalise la frise de vie de ses parents et y place\nles évènements recueillis lors de l'enquête. L'enseignant-e\nest présent et apporte son aide. On demande aux élèves de\nrepérer d'un point rouge leur naissance.\n\nLes frises achevées sont affichées au tableau et sont l’occa-\nsion d'échanges avec les élèves (« Mes parents ont eu une\nvie avant moi, ils ont été bébé, ils ont eu mon âge... »).\n\nÀ l'issue de cet échange, les élèves vont réaliser les exer-\ncices de la fiche élève 2. Ainsi, ils vont pouvoir observer,\ncomparer et compléter différentes frises de vie.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "« La frise de la vie de mes parents est plus longue que\nla mienne.\n\n«Elle débute à leur naissance. Bien avant moi, mes\nparents aussi ont eu mon âge.\n\n+ On y repère des évènements importants de leur vie\n(il y en a plus que sur ma frise de vie). L'année de ma\nnaissance apparait sur la frise de mes parents.\n\n ase\n\nRepérer et situer des évènements du temps des parents\net des grands-parents sur une frise. Construire un arbre\ngénéalogique.\n\nMatériel : une frise vierge de 1945 à nos jours (— sur\nCD-Rom).\n\na",
          },
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e apporte des photos de ses parents,\ngrands-parents et arrière-grands-parents quand ils étaient\njeunes (si c'est possible). On apporte également un arbre\ngénéalogique correspondant déjà complété.\n\n342 » Se situer dans le temps\n\nOn demande aux élèves de les observer et on les interroge :\nI Que pouvez-vous dire ?\n\nLes élèves peuvent dire : « ce sont des photos de per-\nsonnes », « c'est en noir et blanc », « on dirait ma grand-\nmère », « c'était à l'époque », « c'est un arbre », « il y a\ndes personnes », « il y a des noms », « cela ressemble à un\narbre », « il y a des étages », « il y a des photos »...\nL'enseignant-e explique qu'il s’agit d'un arbre généalo-\ngique. On rappelle ensuite aux élèves que l'année dernière,\nen CET, ils ont construit des frises de vie : celles de leurs\nparents. Ils ont pu constater que celles-ci étaient plus lon-\ngues que leur propre frise de vie.\n\nPuis on interroge les élèves :\n\n[À votre avis, à quoi sert un arbre généalogique ?\nQu'est-ce qu'on peut y faire figurer ?\n{Quels renseignements nous donne-t-il ?\n\nL'enseignant-e propose aux élèves de réaliser une petite\nenquête à la maison auprès de leurs parents et grands-parents\nafin de compléter individuellement leur arbre généalogique.\nUne recherche collective est engagée afin de trouver les\nquestions à poser. Un exemple est proposé (— sur CD-Rom).\n\nB. : Si les élèves peuvent avoir des photos, celles-ci\npeuvent être scannées ou photocopiées afin d'illustrer\nl'arbre en question.\n\nŒ)",
          },
          {
            title: "Je recherche",
            detail:
              "L'élève questionne ses parents et grands-parents à la mai-\nson afin de répondre à son enquête. Il rapporte ensuite son\nquestionnaire complété en classe ainsi, le cas échéant, que\ndes photos destinées à illustrer l'arbre généalogique.\n\nLes élèves pourront ainsi réaliser leur arbre sur la fiche\nélève 3 (recto) en s'aidant des renseignements collectés.\nL'enseignant-e est présent-e et apporte son aide.\n\nLes élèves pourront ensuite commenter leur arbre aux\nautres élèves.\n\nUne frise de vie des grands-parents pourra être réalisée\nen parallèle en notant l'année de naissance et les évène-\nments importants de leur vie (naissance des parents par\nexemple). Les élèves feront le choix de construire la frise\ndes grands-parents paternels ou maternels.\n\n[7]",
          },
          {
            title: "Je retiens",
            detail:
              "«La frise de la vie de mes grands-parents est plus\nlongue que la mienne et que celle de mes parents.\n\n- Elle débute à leur naissance. On y repère des évène-\nments importants de leur vie (il y en a plus que sur ma\nfrise de vie).\n\n+ Un arbre généalogique permet de représenter les\nmembres de sa famille et les liens de parenté.\n«l'arbre généalogique présente deux branches : une\nqui représente la famille du papa et une qui représente\nla famille de la maman. Au bas de l'arbre se trouvent\nles enfants. Puis à l'étage au-dessus les parents puis\ngrands-parents.\n\nFrise\n\nArbre généalogique\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n~~",
          },
        ],
      },
    ],
    guideText:
      ") Comment situer ma vie dans le temps ?\n\n» Objectifs\n\n« Prendre conscience que le temps qui passe est irréversible.\n| Repérer et situer quelques évènements dans un temps long : le temps des parents,\n| les générations vivantes et la mémoire familiale.\n\n» Indications de progression dans le cycle 2\n\nDans ce dossier, l'élève manipule des outils de représentation du temps (frise, calendrier) à\ndifférentes échelles temporelles.\n\nAu CP (séance 1), il élabore une première frise personnelle à l'échelle de son temps et\nprend déjà conscience de l'irréversibilité du temps. Dans un second temps, il confronte |\nson temps au temps commun de la classe. Il situe ainsi sur une frise chronologique simple\ndes évènements vécus dans la classe, l'école... Au CE1 (séance 2), on aborde la génération\nprécédente, celle des parents. Enfin, au CE2 (séance 3), on fait appel à la mémoire familiale\n\nen construisant un arbre généalogique et une frise du temps plus étendue (grands-parents\n\nou arrière-grands-parents).\n\n» Matériel\n\n|\n| Le matériel nécessaire est indiqué dans chaque séance.\n\n|\nJ\n\nRepérer et situer des événements personnels ou collec-\ntifs sur une frise du temps.\n\nMatériel : la « frise de ma vie », de la naissance à 7 ou\n8 ans (+ sur CD-Rom).\n\na8 Je m’interroge\n\nIl est souhaitable de mettre en place cette séance en début\nd'année scolaire, en septembre.\n\nAu moment des rituels du matin, l'enseignant-e écrit la\ndate et complète le calendrier. On fait lire la date par un\nélève (jour/mois/année) et on en profite pour interroger\nles élèves :\n\nEst-ce qu’un élève est né en septembre\n(ou un autre mois) ?\n\nPuis on élargit le questionnement au reste de la classe :\n\n[| Quel âge avez-vous ? Est-ce que vous connaissez votre\nmois de naissance ? Votre année de naissance ?\n\nLes élèves vont facilement donner leur âge, leur mois de\nnaissance et le quantième vraisemblablement. Il est moins\nsûr qu'ils soient capables de donner leur année de naissance.\nÀ l'issue de ce questionnement, l'enseignant-e leur propose\nde construire chacun la frise de leur vie depuis leur nais-\nsance jusqu'à cette année. Pour cela, on leur demande de\nréfléchir à ce qui s'est passé d'important depuis qu'ils sont\nnés et qu'ils pourraient demander à leurs parents.\n\nN.B. : Ce travail individuel peut être accompagné d’un tra-\nvail collectif, sur une frise propre à la classe, construite et\nassemblée jour après jour, mois après mois. Sur cette frise,\npourront être notés les anniversaires, les évènements de la\nclasse (jours de piscine, vacances, sorties...).\n\nJe recherche\n\nLes élèves réfléchissent par groupes de 4 puis on recense\ncollectivement les moments importants auxquels pensent\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nles élèves : la première fois que j'ai marché, la première fois\nque je suis allé(e) à l’école, la naissance de mon petit frère/\nma petite sœur...\n\nL'enseignant-e explique que ces questions seront à poser\nà leurs parents et on distribue le recto de la fiche élève 1.\nLy figure un petit questionnaire. À la réception de ces ques-\ntionnaires, les élèves vont pouvoir remplir leur frise indivi-\nduelle année par année en commençant a leur naissance.\nLe verso de la fiche élève 1 permettra de s'entrainer à lire\net compléter d'autres frises.\n\n2 Je retiens\n\n On peut représenter notre vie sur une frise chrono-\nlogique. On la lit de gauche à droite.\n« Cette frise commence à la naissance et se complète\ntout au long de notre vie. On peut y représenter des\névènements importants pour se les rappeler et se\nrendre compte du temps qui passe.\n\n| séance 2 IFT]\n\nRepérer et situer des évènements du temps des parents\nsur une frise chronologique.\n\n[2] Je m'interroge\n\nL'enseignant-e apporte des photos de ses parents,\ngrands-parents quand ils étaient jeunes (ou des photos\nreprésentant des personnes plus ou moins âgées). On\ndemande aux élèves de les observer. On les interroge :\n\n[ Que pouvez-vous dire de ces photos ?\n\nLes élèves peuvent répondre : « ce sont des photos de\npersonnes », « c'est en noir et blanc », « on dirait ma grand-\nmère », « c'était à l'époque »...\n\nL'enseignant-e dévoile que ce sont ses parents ou\ngrands-parents (s'il s'agit de ses propres photos) !! On rap-\n\nSe situer dans le temps « 341\n\nFiche enseignant\n\npelle ensuite aux élèves que, l'an dernier, ils ont construit\nleur frise de vie depuis leur naissance.\n\nL'enseignant-e peut alors rapidement prendre l'exemple\nd'un-e élève en traçant au tableau sa frise de vie, depuis\nsa naissance et en y notant les années écoulées. Puis on\ninterroge les élèves :\n\nQue faut-il de plus pour faire la frise de vie\nde vos parents ?\n\nLes réponses des élèves peuvent être : « il faut qu'elle soit\nplus longue », « oui, il faut remonter dans le temps ».\nOn interroge à nouveau les élèves :\n\nQuand cette frise va-t-elle commencer, d'après vous ?\nQu'allez-vous y faire figurer ?\n\nQuelles questions allez-vous poser à vos parents pour\nremplir cette frise ?\n\nL'enseignant-e propose aux élèves de réaliser une petite\nenquête à la maison auprès de leurs parents. On cherche\nalors collectivement les questions que l'on va leur poser.\nUn exemple de questionnaire est proposé dans le CD-Rom.\n\nJe recherche\n\nL'élève apporte son questionnaire à la maison où a lieu la\nphase de recherche. Il le rapporte ensuite en classe ainsi\nque, le cas échéant, des photos destinées à illustrer la frise\nde vie de ses parents.\n\nChaque élève réalise la frise de vie de ses parents et y place\nles évènements recueillis lors de l'enquête. L'enseignant-e\nest présent et apporte son aide. On demande aux élèves de\nrepérer d'un point rouge leur naissance.\n\nLes frises achevées sont affichées au tableau et sont l’occa-\nsion d'échanges avec les élèves (« Mes parents ont eu une\nvie avant moi, ils ont été bébé, ils ont eu mon âge... »).\n\nÀ l'issue de cet échange, les élèves vont réaliser les exer-\ncices de la fiche élève 2. Ainsi, ils vont pouvoir observer,\ncomparer et compléter différentes frises de vie.\n\n2 Je retiens\n\n« La frise de la vie de mes parents est plus longue que\nla mienne.\n\n«Elle débute à leur naissance. Bien avant moi, mes\nparents aussi ont eu mon âge.\n\n+ On y repère des évènements importants de leur vie\n(il y en a plus que sur ma frise de vie). L'année de ma\nnaissance apparait sur la frise de mes parents.\n\n ase\n\nRepérer et situer des évènements du temps des parents\net des grands-parents sur une frise. Construire un arbre\ngénéalogique.\n\nMatériel : une frise vierge de 1945 à nos jours (— sur\nCD-Rom).\n\na Je m'interroge\n\nL'enseignant-e apporte des photos de ses parents,\ngrands-parents et arrière-grands-parents quand ils étaient\njeunes (si c'est possible). On apporte également un arbre\ngénéalogique correspondant déjà complété.\n\n342 » Se situer dans le temps\n\nOn demande aux élèves de les observer et on les interroge :\nI Que pouvez-vous dire ?\n\nLes élèves peuvent dire : « ce sont des photos de per-\nsonnes », « c'est en noir et blanc », « on dirait ma grand-\nmère », « c'était à l'époque », « c'est un arbre », « il y a\ndes personnes », « il y a des noms », « cela ressemble à un\narbre », « il y a des étages », « il y a des photos »...\nL'enseignant-e explique qu'il s’agit d'un arbre généalo-\ngique. On rappelle ensuite aux élèves que l'année dernière,\nen CET, ils ont construit des frises de vie : celles de leurs\nparents. Ils ont pu constater que celles-ci étaient plus lon-\ngues que leur propre frise de vie.\n\nPuis on interroge les élèves :\n\n[À votre avis, à quoi sert un arbre généalogique ?\nQu'est-ce qu'on peut y faire figurer ?\n{Quels renseignements nous donne-t-il ?\n\nL'enseignant-e propose aux élèves de réaliser une petite\nenquête à la maison auprès de leurs parents et grands-parents\nafin de compléter individuellement leur arbre généalogique.\nUne recherche collective est engagée afin de trouver les\nquestions à poser. Un exemple est proposé (— sur CD-Rom).\n\nB. : Si les élèves peuvent avoir des photos, celles-ci\npeuvent être scannées ou photocopiées afin d'illustrer\nl'arbre en question.\n\nŒ) Je recherche\n\nL'élève questionne ses parents et grands-parents à la mai-\nson afin de répondre à son enquête. Il rapporte ensuite son\nquestionnaire complété en classe ainsi, le cas échéant, que\ndes photos destinées à illustrer l'arbre généalogique.\n\nLes élèves pourront ainsi réaliser leur arbre sur la fiche\nélève 3 (recto) en s'aidant des renseignements collectés.\nL'enseignant-e est présent-e et apporte son aide.\n\nLes élèves pourront ensuite commenter leur arbre aux\nautres élèves.\n\nUne frise de vie des grands-parents pourra être réalisée\nen parallèle en notant l'année de naissance et les évène-\nments importants de leur vie (naissance des parents par\nexemple). Les élèves feront le choix de construire la frise\ndes grands-parents paternels ou maternels.\n\n[7] Je retiens\n\n«La frise de la vie de mes grands-parents est plus\nlongue que la mienne et que celle de mes parents.\n\n- Elle débute à leur naissance. On y repère des évène-\nments importants de leur vie (il y en a plus que sur ma\nfrise de vie).\n\n+ Un arbre généalogique permet de représenter les\nmembres de sa famille et les liens de parenté.\n«l'arbre généalogique présente deux branches : une\nqui représente la famille du papa et une qui représente\nla famille de la maman. Au bas de l'arbre se trouvent\nles enfants. Puis à l'étage au-dessus les parents puis\ngrands-parents.\n\nFrise\n\nArbre généalogique\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n~~",
    guidePageDecisions: [
      {
        page: 341,
        confidence: 93,
        score: 26,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "par groupes",
        ],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on distribue", "par groupes", "groupe"],
        studentLike: true,
      },
      {
        page: 342,
        confidence: 93,
        score: 18,
        included: true,
        strongMarkers: ["l'enseignant", "enseignant-e", "les eleves", "aux eleves", "en classe"],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on demande", "on interroge", "en classe"],
        studentLike: true,
      },
      {
        page: 343,
        confidence: 85,
        score: -3,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: true,
      },
    ],
    skippedProbePages: [343],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-28",
    dossierNumber: 28,
    partNumber: 6,
    partTitle: "Se situer dans le temps",
    title: "Quels sont les grands repères de l'Histoire ?",
    guidePages: [351, 352],
    guidePageCount: 2,
    objectives: ["classe."],
    progressionNote:
      "Ce dossier est à destination des CE2, où l’on commence l'étude du temps long à travers\nune première approche du temps de l'Histoire. Afin de contextualiser et d'appréhender les\nrepères historiques communs au cycle 3, on propose en CE2 un premier découpage des\npériodes de l'Histoire où l'on reporte quelques dates, personnages et évènements vus en\nITT]\nRepérer et situer des évènements dans un temps long.\nRepérer des périodes de l'histoire du monde occidental\net de la France en particulier.\nConnaitre quelques grandes dates et personnages clés.",
    material: [
      "La nouvelle frise historique MDI (édition 2017) peut être un support complémentaire pour",
      "aborder ce dossier. Sur le CD-Rom, des images sont proposées de la Préhistoire à nos jours.",
      "Repérer et situer des évènements dans un temps long.",
      "Repérer des périodes de l'histoire du monde occidental et de la France en particulier.",
      "Connaitre quelques grandes dates et personnages clés.",
      "Indications de progression dans le cycle 2",
      "Ce dossier est à destination des CE2, où l’on commence l'étude du temps long à travers",
      "une première approche du temps de l'Histoire. Afin de contextualiser et d'appréhender les",
      "repères historiques communs au cycle 3, on propose en CE2 un premier découpage des",
      "périodes de l'Histoire où l'on reporte quelques dates, personnages et évènements vus en",
      "ITT]",
      "Repérer et situer des évènements dans un temps long.",
      "Repérer des périodes de l'histoire du monde occidental",
      "et de la France en particulier.",
      "Connaitre quelques grandes dates et personnages clés.",
      "Matériel : photographies A4 plastifées à partir des images",
      "fournies (— CD-Rom), étiquettes des périodes historiques,",
      "étiquettes avec les noms des personnages, des dates.",
      "Je nm’ interroge",
      "L'enseignant-e affiche au tableau l'une des images extraites",
      "du CD-Rom (par exemple, Charlemagne ou Napoléon). On",
      "demande aux élèves :",
      "Connaissez-vous ce personnage ? Est-il toujours",
      "vivant ? Quel est son nom ? Vivait-il il y a longtemps ?",
      "Comment pouvons-nous le savoir ?",
      "On peut attendre les réponses suivantes : « on ne le connait",
      "pas », « c'est quelqu'un d'important », « il n'est pas habillé",
      "comme nous », « il est habillé richement », « il est mort... ».",
      "L'enseignant-e dévoile alors son nom. On explique aux",
      "élèves qui il était, quand il a vécu et pourquoi c'est un per-",
      "sonnage important dans l'histoire de notre pays.",
      "Puis on rappelle que nous avons déjà construit des frises",
      "du temps. Les élèves peuvent rebondir : « oui, la frise d'une",
      "journée de classe, de ma vie, de la vie de mes parents, de",
      "mes grands-parents. »",
      "L'enseignant-e leur propose de travailler maintenant sur",
      "une frise beaucoup plus longue : la frise du temps de l'His-",
      "toire de notre pays.",
      "Dans un premier temps, l'enseignant-e peut distribuer la",
      "fiche élève 1 afin d'aborder les repères à maitriser sur une",
      "frise historique : notions de siècle et de millénaire, lecture",
      "des chiffres romains, repérage de dates sur une frise histo-",
      "rique, connaissance des grandes périodes historiques.",
      "On distribue ensuite aux élèves les images issues du",
      "© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
      "CD-Rom (il est judicieux de les plastifier au format A4 ou",
      "A5). Chaque élève possède alors une image posée face",
      "cachée sur la table.",
      "L'enseignant-e explique que ces images représentent",
      "toutes des personnages importants de notre pays ainsi que",
      "des lieux / monuments ou des évènements qui leurs sont",
      "attachés (un personnage = un lieu / un monument ou un",
      "évènement).",
      "On interroge alors les élèves :",
      "Quel lieu / monument ou évènement correspond",
      "à chaque personnage ?",
      "Quel est l'ordre de ces personnages dans la frise",
      "du temps de l'Histoire de notre pays ?",
      "Les élèves vont devoir étudier les différentes images pour",
      "répondre à ces questions.",
      "N.B. : Ce travail d'association par paires peut également se",
      "faire avec la fiche à découper disponible sur le CD-Rom.",
      "Je recherche",
      "Les élèves vont se déplacer dans la classe, se rencontrer",
      "et comparer leurs images. Ils vont constituer des paires",
      ". personnage — 2. lieu / monument ou évènement) puis",
      "se ranger de gauche à droite dans l'ordre chronologique.",
      "L'enseignant-e circule parmi les élèves, réponds à leurs",
      "questions et les aiguille si nécessaire.",
      "À l'issue de cette phase de recherche, les images sont affi-",
      "chées au tableau dans l’ordre chronologique. Les élèves",
      "retournent à leur place et l'enseignant-e distribue les éti-",
      "quettes noms des personnages.",
      "Collectivement, ces noms sont placés sous chaque",
      "photographie.",
      "L'enseignant-e place alors au dessus de ces photographies",
      "les étiquettes correspondant aux 6 grandes périodes de",
      "l'Histoire : Préhistoire — Antiquité — Moyen Âge — Temps",
      "modernes — Révolution et xix siècle — Période contempo-",
      "raine. Il place également en-dessous les étiquettes dates et",
      "explique les évènements qui y sont liés.",
      "Se situer dans le temps + 351",
      "Fiche enseignant",
    ],
    sessions: [
      {
        number: 1,
        title: "Séance 1 [À VÉRIFIER]",
        rawText:
          "| > Objectifs\n\nclasse.\n\n» Matériel\n\nLa nouvelle frise historique MDI (édition 2017) peut être un support complémentaire pour\naborder ce dossier. Sur le CD-Rom, des images sont proposées de la Préhistoire à nos jours.\n\n| Repérer et situer des évènements dans un temps long.\n* Repérer des périodes de l'histoire du monde occidental et de la France en particulier.\n* Connaitre quelques grandes dates et personnages clés.\n\n|\n\n|\n> Indications de progression dans le cycle 2 |\nCe dossier est à destination des CE2, où l’on commence l'étude du temps long à travers |\nune première approche du temps de l'Histoire. Afin de contextualiser et d'appréhender les |\nrepères historiques communs au cycle 3, on propose en CE2 un premier découpage des |\npériodes de l'Histoire où l'on reporte quelques dates, personnages et évènements vus en |\n\n ITT]\n\nRepérer et situer des évènements dans un temps long.\nRepérer des périodes de l'histoire du monde occidental\net de la France en particulier.\n\nConnaitre quelques grandes dates et personnages clés.\n\nMatériel : photographies A4 plastifées à partir des images\nfournies (— CD-Rom), étiquettes des périodes historiques,\nétiquettes avec les noms des personnages, des dates.\n\n8 Je nm’ interroge\n\nL'enseignant-e affiche au tableau l'une des images extraites\ndu CD-Rom (par exemple, Charlemagne ou Napoléon). On\ndemande aux élèves :\n\nConnaissez-vous ce personnage ? Est-il toujours\nvivant ? Quel est son nom ? Vivait-il il y a longtemps ?\nComment pouvons-nous le savoir ?\n\nOn peut attendre les réponses suivantes : « on ne le connait\npas », « c'est quelqu'un d'important », « il n'est pas habillé\ncomme nous », « il est habillé richement », « il est mort... ».\nL'enseignant-e dévoile alors son nom. On explique aux\nélèves qui il était, quand il a vécu et pourquoi c'est un per-\nsonnage important dans l'histoire de notre pays.\n\nPuis on rappelle que nous avons déjà construit des frises\ndu temps. Les élèves peuvent rebondir : « oui, la frise d'une\njournée de classe, de ma vie, de la vie de mes parents, de\nmes grands-parents. »\n\nL'enseignant-e leur propose de travailler maintenant sur\nune frise beaucoup plus longue : la frise du temps de l'His-\ntoire de notre pays.\n\nDans un premier temps, l'enseignant-e peut distribuer la\nfiche élève 1 afin d'aborder les repères à maitriser sur une\nfrise historique : notions de siècle et de millénaire, lecture\ndes chiffres romains, repérage de dates sur une frise histo-\nrique, connaissance des grandes périodes historiques.\n\nOn distribue ensuite aux élèves les images issues du\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nCD-Rom (il est judicieux de les plastifier au format A4 ou\nA5). Chaque élève possède alors une image posée face\ncachée sur la table.\n\nL'enseignant-e explique que ces images représentent\ntoutes des personnages importants de notre pays ainsi que\ndes lieux / monuments ou des évènements qui leurs sont\nattachés (un personnage = un lieu / un monument ou un\névènement).\n\nOn interroge alors les élèves :\n\nQuel lieu / monument ou évènement correspond\n\nà chaque personnage ?\n\nQuel est l'ordre de ces personnages dans la frise\n| du temps de l'Histoire de notre pays ?\n\nLes élèves vont devoir étudier les différentes images pour\nrépondre à ces questions.\n\nN.B. : Ce travail d'association par paires peut également se\nfaire avec la fiche à découper disponible sur le CD-Rom.\n\n Je recherche\n\nLes élèves vont se déplacer dans la classe, se rencontrer\net comparer leurs images. Ils vont constituer des paires\n(1. personnage — 2. lieu / monument ou évènement) puis\nse ranger de gauche à droite dans l'ordre chronologique.\nL'enseignant-e circule parmi les élèves, réponds à leurs\nquestions et les aiguille si nécessaire.\n\nÀ l'issue de cette phase de recherche, les images sont affi-\nchées au tableau dans l’ordre chronologique. Les élèves\nretournent à leur place et l'enseignant-e distribue les éti-\nquettes noms des personnages.\n\nCollectivement, ces noms sont placés sous chaque\nphotographie.\n\nL'enseignant-e place alors au dessus de ces photographies\nles étiquettes correspondant aux 6 grandes périodes de\nl'Histoire : Préhistoire — Antiquité — Moyen Âge — Temps\nmodernes — Révolution et xix siècle — Période contempo-\nraine. Il place également en-dessous les étiquettes dates et\nexplique les évènements qui y sont liés.\n\nSe situer dans le temps + 351\n\nFiche enseignant\n\nN.B. : On peut profiter de cette séance pour mettre en évi-\ndence l'étendue dans le temps de cette frise par rapport à\nleur vie, la frise de vie de leurs parents ou grands-parents.\nOn parle maintenant de siècle (100 ans) ou de millénaire\n(1000 ans).\n\nL'enseignant-e distribue la fiche élève 2 (le verso étant\nde préférence à photocopier en A3 et à mettre en place\navec la fiche à découper disponible sur le CD-Rom) afin de\nprolonger et approfondir ce travail.\n\nRemarques :\n\n« Les photographies et les étiquettes peuvent servir à l'en-\nseignant-e pour fabriquer une frise collective à afficher\ndans la classe.\n\n«Un prolongement possible est la réalisation de petits\nexposés sur chacun de ces personnages afin de garder une\ntrace dans la classe.\n\n2 Je retiens\n\n+ Depuis l'apparition des premiers hommes, il s'est écoulé\ndes dizaines de milliers d'années : on mesure le temps\nalors en millénaire (1 000 ans) ou en siècle (100 ans).\n* La frise chronologique de l'Histoire de France repré-\nsente sur une ligne, de gauche à droite, l'histoire de\nnotre pays.\n\n«On y trouve les 6 grandes périodes historiques :\nPréhistoire, Antiquité, Moyen Âge, Temps modernes,\nRévolution et xix° siècle, Période contemporaine (xx siècle\nà aujourd'hui).\n\n« Dans chaque période, on retrouve les dates et les per-\nsonnages importants.\n\nQU'EST-CE QU'UNE FRISE HISTORIQUE ?\n\n« Une frise chronologique représente le déroulement du temps long (siècles ou millénaires).\n\n« Elle est symbolisée par une ligne du temps qui se lit de gauche à droite.\n\nÀ gauche, c'est le passé.\n\nÀ droite, c'est le futur : c'est pour cela que la ligne du temps se termine à droite par une flèche.\n\n* Sur une frise chronologique, on place :\n— des repères chronologiques (périodes, dates),\n\n— des personnages et/ou évènements importants de l'Histoire.\n\n* Notre histoire se découpe en 6 grandes périodes.\nLe passage d’une période à une autre est délimité par une date charnière qui correspond à\n\nun évènement important de l'Histoire.\n\n-3000000 -3500 476 1492 1789 1914\nPréhistoire | Antiquité | Moyen Âge Temps Rey Epoque ;\nmodernes |et xix° siècle contemporaine\n\n« Les dates charnières de notre histoire :\n\n476 1492 1789\nInvention Chute de Découverte Révolution Début de la Première\nde l'écriture l'Empire romain de l'Amérique française Guerre mondiale\n\n— 3 500\n\nMots à retenir\n\n1914\n\nFrise historique Millénaire\n\nSiècle Périodes historiques\n\nPréhistoire — Antiquité — Moyen Age\nTemps modernes — Révolution et xix* siècle — Période contemporaine\n\n352 » Se situer dans le temps\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
        phases: [
          {
            title: "Séance 1",
            detail:
              "| > Objectifs\n\nclasse.\n\n» Matériel\n\nLa nouvelle frise historique MDI (édition 2017) peut être un support complémentaire pour\naborder ce dossier. Sur le CD-Rom, des images sont proposées de la Préhistoire à nos jours.\n\n| Repérer et situer des évènements dans un temps long.\n* Repérer des périodes de l'histoire du monde occidental et de la France en particulier.\n* Connaitre quelques grandes dates et personnages clés.\n\n|\n\n|\n> Indications de progression dans le cycle 2 |\nCe dossier est à destination des CE2, où l’on commence l'étude du temps long à travers |\nune première approche du temps de l'Histoire. Afin de contextualiser et d'appréhender les |\nrepères historiques communs au cycle 3, on propose en CE2 un premier découpage des |\npériodes de l'Histoire où l'on reporte quelques dates, personnages et évènements vus en |\n\n ITT]\n\nRepérer et situer des évènements dans un temps long.\nRepérer des périodes de l'histoire du monde occidental\net de la France en particulier.\n\nConnaitre quelques grandes dates et personnages clés.\n\nMatériel : photographies A4 plastifées à partir des images\nfournies (— CD-Rom), étiquettes des périodes historiques,\nétiquettes avec les noms des personnages, des dates.\n\n8 Je nm’ interroge\n\nL'enseignant-e affiche au tableau l'une des images extraites\ndu CD-Rom (par exemple, Charlemagne ou Napoléon). On\ndemande aux élèves :\n\nConnaissez-vous ce personnage ? Est-il toujours\nvivant ? Quel est son nom ? Vivait-il il y a longtemps ?\nComment pouvons-nous le savoir ?\n\nOn peut attendre les réponses suivantes : « on ne le connait\npas », « c'est quelqu'un d'important », « il n'est pas habillé\ncomme nous », « il est habillé richement », « il est mort... ».\nL'enseignant-e dévoile alors son nom. On explique aux\nélèves qui il était, quand il a vécu et pourquoi c'est un per-\nsonnage important dans l'histoire de notre pays.\n\nPuis on rappelle que nous avons déjà construit des frises\ndu temps. Les élèves peuvent rebondir : « oui, la frise d'une\njournée de classe, de ma vie, de la vie de mes parents, de\nmes grands-parents. »\n\nL'enseignant-e leur propose de travailler maintenant sur\nune frise beaucoup plus longue : la frise du temps de l'His-\ntoire de notre pays.\n\nDans un premier temps, l'enseignant-e peut distribuer la\nfiche élève 1 afin d'aborder les repères à maitriser sur une\nfrise historique : notions de siècle et de millénaire, lecture\ndes chiffres romains, repérage de dates sur une frise histo-\nrique, connaissance des grandes périodes historiques.\n\nOn distribue ensuite aux élèves les images issues du\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nCD-Rom (il est judicieux de les plastifier au format A4 ou\nA5). Chaque élève possède alors une image posée face\ncachée sur la table.\n\nL'enseignant-e explique que ces images représentent\ntoutes des personnages importants de notre pays ainsi que\ndes lieux / monuments ou des évènements qui leurs sont\nattachés (un personnage = un lieu / un monument ou un\névènement).\n\nOn interroge alors les élèves :\n\nQuel lieu / monument ou évènement correspond\n\nà chaque personnage ?\n\nQuel est l'ordre de ces personnages dans la frise\n| du temps de l'Histoire de notre pays ?\n\nLes élèves vont devoir étudier les différentes images pour\nrépondre à ces questions.\n\nN.B. : Ce travail d'association par paires peut également se\nfaire avec la fiche à découper disponible sur le CD-Rom.\n\n Je recherche\n\nLes élèves vont se déplacer dans la classe, se rencontrer\net comparer leurs images. Ils vont constituer des paires\n(1. personnage — 2. lieu / monument ou évènement) puis\nse ranger de gauche à droite dans l'ordre chronologique.\nL'enseignant-e circule parmi les élèves, réponds à leurs\nquestions et les aiguille si nécessaire.\n\nÀ l'issue de cette phase de recherche, les images sont affi-\nchées au tableau dans l’ordre chronologique. Les élèves\nretournent à leur place et l'enseignant-e distribue les éti-\nquettes noms des personnages.\n\nCollectivement, ces noms sont placés sous chaque\nphotographie.\n\nL'enseignant-e place alors au dessus de ces photographies\nles étiquettes correspondant aux 6 grandes périodes de\nl'Histoire : Préhistoire — Antiquité — Moyen Âge — Temps\nmodernes — Révolution et xix siècle — Période contempo-\nraine. Il place également en-dessous les étiquettes dates et\nexplique les évènements qui y sont liés.\n\nSe situer dans le temps + 351\n\nFiche enseignant\n\nN.B. : On peut profiter de cette séance pour mettre en évi-\ndence l'étendue dans le temps de cette frise par rapport à\nleur vie, la frise de vie de leurs parents ou grands-parents.\nOn parle maintenant de siècle (100 ans) ou de millénaire\n(1000 ans).\n\nL'enseignant-e distribue la fiche élève 2 (le verso étant\nde préférence à photocopier en A3 et à mettre en place\navec la fiche à découper disponible sur le CD-Rom) afin de\nprolonger et approfondir ce travail.\n\nRemarques :\n\n« Les photographies et les étiquettes peuvent servir à l'en-\nseignant-e pour fabriquer une frise collective à afficher\ndans la classe.\n\n«Un prolongement possible est la réalisation de petits\nexposés sur chacun de ces personnages afin de garder une\ntrace dans la classe.\n\n2 Je retiens\n\n+ Depuis l'apparition des premiers hommes, il s'est écoulé\ndes dizaines de milliers d'années : on mesure le temps\nalors en millénaire (1 000 ans) ou en siècle (100 ans).\n* La frise chronologique de l'Histoire de France repré-\nsente sur une ligne, de gauche à droite, l'histoire de\nnotre pays.\n\n«On y trouve les 6 grandes périodes historiques :\nPréhistoire, Antiquité, Moyen Âge, Temps modernes,\nRévolution et xix° siècle, Période contemporaine (xx siècle\nà aujourd'hui).\n\n« Dans chaque période, on retrouve les dates et les per-\nsonnages importants.\n\nQU'EST-CE QU'UNE FRISE HISTORIQUE ?\n\n« Une frise chronologique représente le déroulement du temps long (siècles ou millénaires).\n\n« Elle est symbolisée par une ligne du temps qui se lit de gauche à droite.\n\nÀ gauche, c'est le passé.\n\nÀ droite, c'est le futur : c'est pour cela que la ligne du temps se termine à droite par une flèche.\n\n* Sur une frise chronologique, on place :\n— des repères chronologiques (périodes, dates),\n\n— des personnages et/ou évènements importants de l'Histoire.\n\n* Notre histoire se découpe en 6 grandes périodes.\nLe passage d’une période à une autre est délimité par une date charnière qui correspond à\n\nun évènement important de l'Histoire.\n\n-3000000 -3500 476 1492 1789 1914\nPréhistoire | Antiquité | Moyen Âge Temps Rey Epoque ;\nmodernes |et xix° siècle contemporaine\n\n« Les dates charnières de notre histoire :\n\n476 1492 1789\nInvention Chute de Découverte Révolution Début de la Première\nde l'écriture l'Empire romain de l'Amérique française Guerre mondiale\n\n— 3 500\n\nMots à retenir\n\n1914\n\nFrise historique Millénaire\n\nSiècle Périodes historiques\n\nPréhistoire — Antiquité — Moyen Age\nTemps modernes — Révolution et xix* siècle — Période contemporaine\n\n352 » Se situer dans le temps\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
          },
        ],
      },
    ],
    guideText:
      "| > Objectifs\n\nclasse.\n\n» Matériel\n\nLa nouvelle frise historique MDI (édition 2017) peut être un support complémentaire pour\naborder ce dossier. Sur le CD-Rom, des images sont proposées de la Préhistoire à nos jours.\n\n| Repérer et situer des évènements dans un temps long.\n* Repérer des périodes de l'histoire du monde occidental et de la France en particulier.\n* Connaitre quelques grandes dates et personnages clés.\n\n|\n\n|\n> Indications de progression dans le cycle 2 |\nCe dossier est à destination des CE2, où l’on commence l'étude du temps long à travers |\nune première approche du temps de l'Histoire. Afin de contextualiser et d'appréhender les |\nrepères historiques communs au cycle 3, on propose en CE2 un premier découpage des |\npériodes de l'Histoire où l'on reporte quelques dates, personnages et évènements vus en |\n\n ITT]\n\nRepérer et situer des évènements dans un temps long.\nRepérer des périodes de l'histoire du monde occidental\net de la France en particulier.\n\nConnaitre quelques grandes dates et personnages clés.\n\nMatériel : photographies A4 plastifées à partir des images\nfournies (— CD-Rom), étiquettes des périodes historiques,\nétiquettes avec les noms des personnages, des dates.\n\n8 Je nm’ interroge\n\nL'enseignant-e affiche au tableau l'une des images extraites\ndu CD-Rom (par exemple, Charlemagne ou Napoléon). On\ndemande aux élèves :\n\nConnaissez-vous ce personnage ? Est-il toujours\nvivant ? Quel est son nom ? Vivait-il il y a longtemps ?\nComment pouvons-nous le savoir ?\n\nOn peut attendre les réponses suivantes : « on ne le connait\npas », « c'est quelqu'un d'important », « il n'est pas habillé\ncomme nous », « il est habillé richement », « il est mort... ».\nL'enseignant-e dévoile alors son nom. On explique aux\nélèves qui il était, quand il a vécu et pourquoi c'est un per-\nsonnage important dans l'histoire de notre pays.\n\nPuis on rappelle que nous avons déjà construit des frises\ndu temps. Les élèves peuvent rebondir : « oui, la frise d'une\njournée de classe, de ma vie, de la vie de mes parents, de\nmes grands-parents. »\n\nL'enseignant-e leur propose de travailler maintenant sur\nune frise beaucoup plus longue : la frise du temps de l'His-\ntoire de notre pays.\n\nDans un premier temps, l'enseignant-e peut distribuer la\nfiche élève 1 afin d'aborder les repères à maitriser sur une\nfrise historique : notions de siècle et de millénaire, lecture\ndes chiffres romains, repérage de dates sur une frise histo-\nrique, connaissance des grandes périodes historiques.\n\nOn distribue ensuite aux élèves les images issues du\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nCD-Rom (il est judicieux de les plastifier au format A4 ou\nA5). Chaque élève possède alors une image posée face\ncachée sur la table.\n\nL'enseignant-e explique que ces images représentent\ntoutes des personnages importants de notre pays ainsi que\ndes lieux / monuments ou des évènements qui leurs sont\nattachés (un personnage = un lieu / un monument ou un\névènement).\n\nOn interroge alors les élèves :\n\nQuel lieu / monument ou évènement correspond\n\nà chaque personnage ?\n\nQuel est l'ordre de ces personnages dans la frise\n| du temps de l'Histoire de notre pays ?\n\nLes élèves vont devoir étudier les différentes images pour\nrépondre à ces questions.\n\nN.B. : Ce travail d'association par paires peut également se\nfaire avec la fiche à découper disponible sur le CD-Rom.\n\n Je recherche\n\nLes élèves vont se déplacer dans la classe, se rencontrer\net comparer leurs images. Ils vont constituer des paires\n(1. personnage — 2. lieu / monument ou évènement) puis\nse ranger de gauche à droite dans l'ordre chronologique.\nL'enseignant-e circule parmi les élèves, réponds à leurs\nquestions et les aiguille si nécessaire.\n\nÀ l'issue de cette phase de recherche, les images sont affi-\nchées au tableau dans l’ordre chronologique. Les élèves\nretournent à leur place et l'enseignant-e distribue les éti-\nquettes noms des personnages.\n\nCollectivement, ces noms sont placés sous chaque\nphotographie.\n\nL'enseignant-e place alors au dessus de ces photographies\nles étiquettes correspondant aux 6 grandes périodes de\nl'Histoire : Préhistoire — Antiquité — Moyen Âge — Temps\nmodernes — Révolution et xix siècle — Période contempo-\nraine. Il place également en-dessous les étiquettes dates et\nexplique les évènements qui y sont liés.\n\nSe situer dans le temps + 351\n\nFiche enseignant\n\nN.B. : On peut profiter de cette séance pour mettre en évi-\ndence l'étendue dans le temps de cette frise par rapport à\nleur vie, la frise de vie de leurs parents ou grands-parents.\nOn parle maintenant de siècle (100 ans) ou de millénaire\n(1000 ans).\n\nL'enseignant-e distribue la fiche élève 2 (le verso étant\nde préférence à photocopier en A3 et à mettre en place\navec la fiche à découper disponible sur le CD-Rom) afin de\nprolonger et approfondir ce travail.\n\nRemarques :\n\n« Les photographies et les étiquettes peuvent servir à l'en-\nseignant-e pour fabriquer une frise collective à afficher\ndans la classe.\n\n«Un prolongement possible est la réalisation de petits\nexposés sur chacun de ces personnages afin de garder une\ntrace dans la classe.\n\n2 Je retiens\n\n+ Depuis l'apparition des premiers hommes, il s'est écoulé\ndes dizaines de milliers d'années : on mesure le temps\nalors en millénaire (1 000 ans) ou en siècle (100 ans).\n* La frise chronologique de l'Histoire de France repré-\nsente sur une ligne, de gauche à droite, l'histoire de\nnotre pays.\n\n«On y trouve les 6 grandes périodes historiques :\nPréhistoire, Antiquité, Moyen Âge, Temps modernes,\nRévolution et xix° siècle, Période contemporaine (xx siècle\nà aujourd'hui).\n\n« Dans chaque période, on retrouve les dates et les per-\nsonnages importants.\n\nQU'EST-CE QU'UNE FRISE HISTORIQUE ?\n\n« Une frise chronologique représente le déroulement du temps long (siècles ou millénaires).\n\n« Elle est symbolisée par une ligne du temps qui se lit de gauche à droite.\n\nÀ gauche, c'est le passé.\n\nÀ droite, c'est le futur : c'est pour cela que la ligne du temps se termine à droite par une flèche.\n\n* Sur une frise chronologique, on place :\n— des repères chronologiques (périodes, dates),\n\n— des personnages et/ou évènements importants de l'Histoire.\n\n* Notre histoire se découpe en 6 grandes périodes.\nLe passage d’une période à une autre est délimité par une date charnière qui correspond à\n\nun évènement important de l'Histoire.\n\n-3000000 -3500 476 1492 1789 1914\nPréhistoire | Antiquité | Moyen Âge Temps Rey Epoque ;\nmodernes |et xix° siècle contemporaine\n\n« Les dates charnières de notre histoire :\n\n476 1492 1789\nInvention Chute de Découverte Révolution Début de la Première\nde l'écriture l'Empire romain de l'Amérique française Guerre mondiale\n\n— 3 500\n\nMots à retenir\n\n1914\n\nFrise historique Millénaire\n\nSiècle Périodes historiques\n\nPréhistoire — Antiquité — Moyen Age\nTemps modernes — Révolution et xix* siècle — Période contemporaine\n\n352 » Se situer dans le temps\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
    guidePageDecisions: [
      {
        page: 351,
        confidence: 93,
        score: 18,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
        ],
        phaseMarkers: ["je recherche"],
        teacherLanguageMarkers: [
          "enseignant",
          "eleves",
          "on propose",
          "on interroge",
          "on distribue",
        ],
        studentLike: true,
      },
      {
        page: 352,
        confidence: 92,
        score: 12,
        included: true,
        strongMarkers: ["seance", "l'enseignant", "enseignant-e"],
        phaseMarkers: ["je retiens"],
        teacherLanguageMarkers: ["enseignant"],
        studentLike: true,
      },
      {
        page: 353,
        confidence: 79,
        score: -3,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: true,
      },
    ],
    skippedProbePages: [353],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-29",
    dossierNumber: 29,
    partNumber: 6,
    partTitle: "Se situer dans le temps",
    title: "Comment vivait-on dans un passé lointain ?",
    guidePages: [359, 360],
    guidePageCount: 2,
    objectives: [],
    progressionNote:
      "Comme le dossier précédent, ce dossier est à destination des CE2 où l'on commence\nl'étude du temps long. Ce dossier 29 porte sur l'étude des modes de vie à travers les siècles.\nLa séance 1 est consacrée à l'étude comparée de l'habitat, la séance 2 porte plus spécifi-\nquement sur les vêtements. Enfin, la séance 3 est consacrée aux déplacements à diverses\népoques. Des fiches élèves sont proposées pour chaque séance ainsi qu'une fiche d'évalua-\ntion finale.\nN.B. : nous avons fait le choix de traiter les thèmes de l'habitat, des vêtements et des dépla-\ncements parmi ceux proposés dans le programme. Il est bien évidemment possible de pro-\nlonger ce travail et de l'élargir à l'évolution de l'alimentation, des outils et des techniques.\nFiche enseignant",
    material: [
      "Le matériel nécessaire est indiqué dans chaque séance. La nouvelle frise historique MDI",
      "édition 2017) peut être un support complémentaire pour aborder ce dossier.",
      "J",
      "dès",
      "Repérer et situer l'évolution des sociétés dans un temps",
      "long à travers des modes de vie : l'exemple de l'habitat.",
      "Matériel : photos (— sur CD-Rom) représentant différents",
      "types d'habitat selon les périodes historiques.",
      "e Je m'interroge",
      "L'enseignant-e affiche au tableau deux images : une",
      "hutte en peaux de bêtes de la Préhistoire, un immeuble",
      "d'aujourd'hui.",
      "On interroge les élèves :",
      "Que représentent ces photographies ?",
      "On peut attendre les réponses suivantes : « c'est une sorte",
      "de tente », « c'est un immeuble », « ce sont des mai-",
      "sons », « des endroits où habitent des gens ».",
      "L'enseignant-e demande alors :",
      "Ces habitations existent-elles encore de nos jours ?",
      "Est-ce qu'elles sont toujours utilisées pour y vivre ?",
      "Les élèves vont répondre : « non, il y en a qui sont vieilles,",
      "détruites », « il y en a qu'on peut voir aujourd'hui : le grand",
      "immeuble », « la maison de l'homme préhistorique, on",
      "dirait une tente. »",
      "L'enseignant-e propose alors de travailler à partir d'autres",
      "images d'habitations (on peut introduire ici le vocabulaire",
      "d'habitat) au fil du temps, depuis les premiers hommes",
      "pendant la Préhistoire.",
      "Je recherche",
      "L'enseignant-e place les élèves par groupes de 4 et distribue",
      "la fiche à découper 1 (— sur CD-Rom) avec les photos des",
      "© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
      "différents habitats et leurs légendes. Chaque groupe doit",
      "découper les images et les légendes, puis les associer aux",
      "périodes correspondantes.",
      "On vérifie collectivement les associations réalisées. C'est",
      "l'occasion d’un échange oral collectif autour des maté-",
      "riaux utilisés dans ces différents habitats, de leur fonction,",
      "de leur présence dans le temps. Les photographies et leurs",
      "légendes sont collées dans le cahier ou classeur de QLM.",
      "L'enseignant-e distribue ensuite la fiche élève 1 qui permet",
      "un prolongement individuel à ce travail.",
      "L2 Je retiens",
      "Au cours du temps, l'habitat des hommes a évolué en",
      "fonction des matériaux disponibles, de leurs conditions",
      "de vie, de leurs techniques et savoir-faire.",
      "« À la Préhistoire, les hommes utilisaient des branchages",
      "et feuillages, ossements et peaux, puis du bois.",
      "« Pendant l'Antiquité, on utilisait le bois, le torchis et la",
      "paille, mais aussi des pierres taillées, des tuiles.",
      "» Au Moyen Âge, l'habitat devient de plus en plus solide",
      "utilisation de la pierre comme pour les châteaux forts)",
      "et divers (maison à colombages en ville).",
      "Aux Temps modernes, l'habitat permet aussi de mon-",
      "trer sa richesse et sa puissance (château royal).",
      "» Au xix siècle, les immeubles haussmaniens se dével-",
      "oppent (comme à Paris) et des maisons en briques sont",
      "construites pour les ouvriers.",
      "« Dans le monde contemporain, on cherche à loger le",
      "plus de personnes possible et le confort domestique",
      "s'est considérablement amélioré (eau courante, électri-",
      "cité, etc.).",
      "Se situer dans le temps « 359",
    ],
    sessions: [
      {
        number: 1,
        title: "Séance 1 [À VÉRIFIER]",
        rawText:
          "Comment vivait-on dans un passé lointain ?\n\n| Objectif\n| — Repérer et situer l'évolution des sociétés dans un temps long à travers des modes de vie\n(habitat, vêtements, outils, guerres, déplacements ) et des techniques à diverses époques.\n\n> Indications de progression dans le cycle 2\n\nComme le dossier précédent, ce dossier est à destination des CE2 où l'on commence\nl'étude du temps long. Ce dossier 29 porte sur l'étude des modes de vie à travers les siècles.\nLa séance 1 est consacrée à l'étude comparée de l'habitat, la séance 2 porte plus spécifi-\nquement sur les vêtements. Enfin, la séance 3 est consacrée aux déplacements à diverses\népoques. Des fiches élèves sont proposées pour chaque séance ainsi qu'une fiche d'évalua-\ntion finale.\n\nN.B. : nous avons fait le choix de traiter les thèmes de l'habitat, des vêtements et des dépla-\ncements parmi ceux proposés dans le programme. Il est bien évidemment possible de pro-\nlonger ce travail et de l'élargir à l'évolution de l'alimentation, des outils et des techniques.\n\nFiche enseignant\n\n» Matériel\nLe matériel nécessaire est indiqué dans chaque séance. La nouvelle frise historique MDI |\n\n(édition 2017) peut être un support complémentaire pour aborder ce dossier.\n\n|\nJ\n\n dès\n\nRepérer et situer l'évolution des sociétés dans un temps\nlong à travers des modes de vie : l'exemple de l'habitat.\n\nMatériel : photos (— sur CD-Rom) représentant différents\ntypes d'habitat selon les périodes historiques.\n\ne Je m'interroge\n\nL'enseignant-e affiche au tableau deux images : une\nhutte en peaux de bêtes de la Préhistoire, un immeuble\nd'aujourd'hui.\n\nOn interroge les élèves :\n\n[Que représentent ces photographies ?\n\nOn peut attendre les réponses suivantes : « c'est une sorte\nde tente », « c'est un immeuble », « ce sont des mai-\nsons », « des endroits où habitent des gens ».\nL'enseignant-e demande alors :\n\nCes habitations existent-elles encore de nos jours ?\nEst-ce qu'elles sont toujours utilisées pour y vivre ?\n\nLes élèves vont répondre : « non, il y en a qui sont vieilles,\ndétruites », « il y en a qu'on peut voir aujourd'hui : le grand\nimmeuble », « la maison de l'homme préhistorique, on\ndirait une tente. »\n\nL'enseignant-e propose alors de travailler à partir d'autres\nimages d'habitations (on peut introduire ici le vocabulaire\nd'habitat) au fil du temps, depuis les premiers hommes\npendant la Préhistoire.\n\n Je recherche\n\nL'enseignant-e place les élèves par groupes de 4 et distribue\nla fiche à découper 1 (— sur CD-Rom) avec les photos des\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\ndifférents habitats et leurs légendes. Chaque groupe doit\ndécouper les images et les légendes, puis les associer aux\npériodes correspondantes.\n\nOn vérifie collectivement les associations réalisées. C'est\nl'occasion d’un échange oral collectif autour des maté-\nriaux utilisés dans ces différents habitats, de leur fonction,\nde leur présence dans le temps. Les photographies et leurs\nlégendes sont collées dans le cahier ou classeur de QLM.\nL'enseignant-e distribue ensuite la fiche élève 1 qui permet\nun prolongement individuel à ce travail.\n\nL2 Je retiens\n\n= Au cours du temps, l'habitat des hommes a évolué en\nfonction des matériaux disponibles, de leurs conditions\nde vie, de leurs techniques et savoir-faire.\n\n« À la Préhistoire, les hommes utilisaient des branchages\net feuillages, ossements et peaux, puis du bois.\n\n« Pendant l'Antiquité, on utilisait le bois, le torchis et la\npaille, mais aussi des pierres taillées, des tuiles.\n\n» Au Moyen Âge, l'habitat devient de plus en plus solide\n(utilisation de la pierre comme pour les châteaux forts)\net divers (maison à colombages en ville).\n\n* Aux Temps modernes, l'habitat permet aussi de mon-\ntrer sa richesse et sa puissance (château royal).\n\n» Au xix siècle, les immeubles haussmaniens se dével-\noppent (comme à Paris) et des maisons en briques sont\nconstruites pour les ouvriers.\n\n« Dans le monde contemporain, on cherche à loger le\nplus de personnes possible et le confort domestique\ns'est considérablement amélioré (eau courante, électri-\ncité, etc.).\n\nSe situer dans le temps « 359\n\n ITT]\n\nRepérer et situer l'évolution des sociétés dans un temps\nlong à travers des modes de vie : l'exemple des vêtements.\n\nMatériel : photos (— sur CD-Rom) représentant différentes\ntenues vestimentaires selon les périodes historiques.\n\n8 sem interroge\n\nL'enseignant-e rappelle le travail mené lors la séance 1 :\nil s'agissait de comparer l'habitat des hommes en France au\ncours du temps. On leur propose maintenant de comparer\nleurs vêtements. Pour cela, on distribue à chaque élève le\nrecto de la fiche élève 2 et on demande :\n\nPouvez-vous imaginer les vêtements des hommes et\ndes femmes durant les 6 périodes historiques de notre\nhistoire ?\n\nL'enseignant-e constitue alors 6 groupes correspondant\naux 6 périodes historiques.\n\nAprès ce temps de travail individuel, chaque élève présente\net décrit ses dessins qui sont affichés au tableau.\n\nJe recherche\n\nL'enseignant-e propose maintenant aux élèves d'observer\ndes vêtements utilisés par des hommes et des femmes au\nfil du temps afin de les comparer avec les dessins réalisés.\nOn distribue aux élèves la fiche à découper 2 avec les\nimages légendées (— sur CD-Rom). Les élèves travaillent\nen binôme. L'enseignant-e laisse les élèves découvrir les\nimages puis propose à chaque groupe d'élèves de présen-\nter, à tour de rôle, l'image correspondant à leur période his-\ntorique en commençant par la Préhistoire. Les élèves pro-\ncèdent à une description à l'oral des vêtements.\n\nOn procède successivement de la même façon pour toutes\nles images. Celles-ci sont affichées au tableau ou au mur\nde gauche à droite afin de constituer progressivement une\nfrise chronologique.\n\nÀ la suite de ce travail, le verso de la fiche élève 2 est dis-\ntribué à chaque élève.\n\n2 Je retiens\n\n«Durant les différentes époques passées, les hommes\net les femmes ont porté différents vêtements pour se\nprotéger du froid, de la pluie, pour se battre...\n\n« Les vêtements ont évolué en fonction des modes de\nvie, des matériaux connus...et de la mode !\n\nMots à retenir\n\nModes de vie\nHabitat\nOutils\n\n« Les vêtements ont longtemps représenté la fonction\nde celui qui les porte : le roi ne porte pas les mêmes\nvêtements que le paysan. De nos jours, cela est beau-\ncoup moins visible.\n\n été\n\nRepérer et situer l'évolution des sociétés dans un\ntemps long à travers des modes de vie : l'exemple des\ndéplacements.\n\na Je m'interroge\n\nL'enseignant-e rappelle aux élèves ce qui a été vu lors des\ndeux séances précédentes : l'habitat des hommes a évo-\nlué dans le temps, leurs vêtements aussi. On les interroge\nalors :\n\nMais qu'en est-il de leurs déplacements ?\nA-t-on toujours utilisé la voiture, le vélo, ou encore le\ntrain ou l'avion comme aujourd'hui ?\n\nLes élèves pourront répondre : « non, avant on utilisait des\nanimaux », ou « on se déplaçait à pied... »\n\nL'enseignant-e propose aux élèves d'y réfléchir par deux et\nde lister les différents déplacements qu'ils pensent connaitre\npour les différentes périodes historiques. Un échange oral\net collectif conclut cette recherche par binôme.\n\n Je recherche\n\nL'enseignant-e propose alors aux élèves de mener, grâce\nà Internet, une recherche sur les moyens de transport. On\nconstitue pour cela un groupe par période. Chaque groupe\ndevra réaliser une affiche présentant ses recherches. Ce tra-\nvail peut être poursuivi par la fiche élève 3.\n\n2 Je retiens\n\n« Les hommes et les femmes n’ont eu pour se déplacer\npendant longtemps que leurs jambes comme durant la\nPréhistoire.\n\n« Puis les hommes ont commencé à utiliser des animaux\ncomme le cheval ou l'âne ou les bœufs et ont tracé des\nchemins puis des routes. Pour se déplacer sur la mer, ils\nont construit des bateaux.\n\n+ De nombreux progrès techniques ont révolutionné\nles moyens de transport à partir du xix° siècle (voiture,\ntrain) et au xx siècle (avion, fusée).\n\nVêtements\nTechniques\n\nÉvolution\nDéplacements\n\n360 » Se situer dans le temps\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
        phases: [
          {
            title: "Séance 1",
            detail:
              "Comment vivait-on dans un passé lointain ?\n\n| Objectif\n| — Repérer et situer l'évolution des sociétés dans un temps long à travers des modes de vie\n(habitat, vêtements, outils, guerres, déplacements ) et des techniques à diverses époques.\n\n> Indications de progression dans le cycle 2\n\nComme le dossier précédent, ce dossier est à destination des CE2 où l'on commence\nl'étude du temps long. Ce dossier 29 porte sur l'étude des modes de vie à travers les siècles.\nLa séance 1 est consacrée à l'étude comparée de l'habitat, la séance 2 porte plus spécifi-\nquement sur les vêtements. Enfin, la séance 3 est consacrée aux déplacements à diverses\népoques. Des fiches élèves sont proposées pour chaque séance ainsi qu'une fiche d'évalua-\ntion finale.\n\nN.B. : nous avons fait le choix de traiter les thèmes de l'habitat, des vêtements et des dépla-\ncements parmi ceux proposés dans le programme. Il est bien évidemment possible de pro-\nlonger ce travail et de l'élargir à l'évolution de l'alimentation, des outils et des techniques.\n\nFiche enseignant\n\n» Matériel\nLe matériel nécessaire est indiqué dans chaque séance. La nouvelle frise historique MDI |\n\n(édition 2017) peut être un support complémentaire pour aborder ce dossier.\n\n|\nJ\n\n dès\n\nRepérer et situer l'évolution des sociétés dans un temps\nlong à travers des modes de vie : l'exemple de l'habitat.\n\nMatériel : photos (— sur CD-Rom) représentant différents\ntypes d'habitat selon les périodes historiques.\n\ne Je m'interroge\n\nL'enseignant-e affiche au tableau deux images : une\nhutte en peaux de bêtes de la Préhistoire, un immeuble\nd'aujourd'hui.\n\nOn interroge les élèves :\n\n[Que représentent ces photographies ?\n\nOn peut attendre les réponses suivantes : « c'est une sorte\nde tente », « c'est un immeuble », « ce sont des mai-\nsons », « des endroits où habitent des gens ».\nL'enseignant-e demande alors :\n\nCes habitations existent-elles encore de nos jours ?\nEst-ce qu'elles sont toujours utilisées pour y vivre ?\n\nLes élèves vont répondre : « non, il y en a qui sont vieilles,\ndétruites », « il y en a qu'on peut voir aujourd'hui : le grand\nimmeuble », « la maison de l'homme préhistorique, on\ndirait une tente. »\n\nL'enseignant-e propose alors de travailler à partir d'autres\nimages d'habitations (on peut introduire ici le vocabulaire\nd'habitat) au fil du temps, depuis les premiers hommes\npendant la Préhistoire.\n\n Je recherche\n\nL'enseignant-e place les élèves par groupes de 4 et distribue\nla fiche à découper 1 (— sur CD-Rom) avec les photos des\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\ndifférents habitats et leurs légendes. Chaque groupe doit\ndécouper les images et les légendes, puis les associer aux\npériodes correspondantes.\n\nOn vérifie collectivement les associations réalisées. C'est\nl'occasion d’un échange oral collectif autour des maté-\nriaux utilisés dans ces différents habitats, de leur fonction,\nde leur présence dans le temps. Les photographies et leurs\nlégendes sont collées dans le cahier ou classeur de QLM.\nL'enseignant-e distribue ensuite la fiche élève 1 qui permet\nun prolongement individuel à ce travail.\n\nL2 Je retiens\n\n= Au cours du temps, l'habitat des hommes a évolué en\nfonction des matériaux disponibles, de leurs conditions\nde vie, de leurs techniques et savoir-faire.\n\n« À la Préhistoire, les hommes utilisaient des branchages\net feuillages, ossements et peaux, puis du bois.\n\n« Pendant l'Antiquité, on utilisait le bois, le torchis et la\npaille, mais aussi des pierres taillées, des tuiles.\n\n» Au Moyen Âge, l'habitat devient de plus en plus solide\n(utilisation de la pierre comme pour les châteaux forts)\net divers (maison à colombages en ville).\n\n* Aux Temps modernes, l'habitat permet aussi de mon-\ntrer sa richesse et sa puissance (château royal).\n\n» Au xix siècle, les immeubles haussmaniens se dével-\noppent (comme à Paris) et des maisons en briques sont\nconstruites pour les ouvriers.\n\n« Dans le monde contemporain, on cherche à loger le\nplus de personnes possible et le confort domestique\ns'est considérablement amélioré (eau courante, électri-\ncité, etc.).\n\nSe situer dans le temps « 359\n\n ITT]\n\nRepérer et situer l'évolution des sociétés dans un temps\nlong à travers des modes de vie : l'exemple des vêtements.\n\nMatériel : photos (— sur CD-Rom) représentant différentes\ntenues vestimentaires selon les périodes historiques.\n\n8 sem interroge\n\nL'enseignant-e rappelle le travail mené lors la séance 1 :\nil s'agissait de comparer l'habitat des hommes en France au\ncours du temps. On leur propose maintenant de comparer\nleurs vêtements. Pour cela, on distribue à chaque élève le\nrecto de la fiche élève 2 et on demande :\n\nPouvez-vous imaginer les vêtements des hommes et\ndes femmes durant les 6 périodes historiques de notre\nhistoire ?\n\nL'enseignant-e constitue alors 6 groupes correspondant\naux 6 périodes historiques.\n\nAprès ce temps de travail individuel, chaque élève présente\net décrit ses dessins qui sont affichés au tableau.\n\nJe recherche\n\nL'enseignant-e propose maintenant aux élèves d'observer\ndes vêtements utilisés par des hommes et des femmes au\nfil du temps afin de les comparer avec les dessins réalisés.\nOn distribue aux élèves la fiche à découper 2 avec les\nimages légendées (— sur CD-Rom). Les élèves travaillent\nen binôme. L'enseignant-e laisse les élèves découvrir les\nimages puis propose à chaque groupe d'élèves de présen-\nter, à tour de rôle, l'image correspondant à leur période his-\ntorique en commençant par la Préhistoire. Les élèves pro-\ncèdent à une description à l'oral des vêtements.\n\nOn procède successivement de la même façon pour toutes\nles images. Celles-ci sont affichées au tableau ou au mur\nde gauche à droite afin de constituer progressivement une\nfrise chronologique.\n\nÀ la suite de ce travail, le verso de la fiche élève 2 est dis-\ntribué à chaque élève.\n\n2 Je retiens\n\n«Durant les différentes époques passées, les hommes\net les femmes ont porté différents vêtements pour se\nprotéger du froid, de la pluie, pour se battre...\n\n« Les vêtements ont évolué en fonction des modes de\nvie, des matériaux connus...et de la mode !\n\nMots à retenir\n\nModes de vie\nHabitat\nOutils\n\n« Les vêtements ont longtemps représenté la fonction\nde celui qui les porte : le roi ne porte pas les mêmes\nvêtements que le paysan. De nos jours, cela est beau-\ncoup moins visible.\n\n été\n\nRepérer et situer l'évolution des sociétés dans un\ntemps long à travers des modes de vie : l'exemple des\ndéplacements.\n\na Je m'interroge\n\nL'enseignant-e rappelle aux élèves ce qui a été vu lors des\ndeux séances précédentes : l'habitat des hommes a évo-\nlué dans le temps, leurs vêtements aussi. On les interroge\nalors :\n\nMais qu'en est-il de leurs déplacements ?\nA-t-on toujours utilisé la voiture, le vélo, ou encore le\ntrain ou l'avion comme aujourd'hui ?\n\nLes élèves pourront répondre : « non, avant on utilisait des\nanimaux », ou « on se déplaçait à pied... »\n\nL'enseignant-e propose aux élèves d'y réfléchir par deux et\nde lister les différents déplacements qu'ils pensent connaitre\npour les différentes périodes historiques. Un échange oral\net collectif conclut cette recherche par binôme.\n\n Je recherche\n\nL'enseignant-e propose alors aux élèves de mener, grâce\nà Internet, une recherche sur les moyens de transport. On\nconstitue pour cela un groupe par période. Chaque groupe\ndevra réaliser une affiche présentant ses recherches. Ce tra-\nvail peut être poursuivi par la fiche élève 3.\n\n2 Je retiens\n\n« Les hommes et les femmes n’ont eu pour se déplacer\npendant longtemps que leurs jambes comme durant la\nPréhistoire.\n\n« Puis les hommes ont commencé à utiliser des animaux\ncomme le cheval ou l'âne ou les bœufs et ont tracé des\nchemins puis des routes. Pour se déplacer sur la mer, ils\nont construit des bateaux.\n\n+ De nombreux progrès techniques ont révolutionné\nles moyens de transport à partir du xix° siècle (voiture,\ntrain) et au xx siècle (avion, fusée).\n\nVêtements\nTechniques\n\nÉvolution\nDéplacements\n\n360 » Se situer dans le temps\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
          },
        ],
      },
    ],
    guideText:
      "Comment vivait-on dans un passé lointain ?\n\n| Objectif\n| — Repérer et situer l'évolution des sociétés dans un temps long à travers des modes de vie\n(habitat, vêtements, outils, guerres, déplacements ) et des techniques à diverses époques.\n\n> Indications de progression dans le cycle 2\n\nComme le dossier précédent, ce dossier est à destination des CE2 où l'on commence\nl'étude du temps long. Ce dossier 29 porte sur l'étude des modes de vie à travers les siècles.\nLa séance 1 est consacrée à l'étude comparée de l'habitat, la séance 2 porte plus spécifi-\nquement sur les vêtements. Enfin, la séance 3 est consacrée aux déplacements à diverses\népoques. Des fiches élèves sont proposées pour chaque séance ainsi qu'une fiche d'évalua-\ntion finale.\n\nN.B. : nous avons fait le choix de traiter les thèmes de l'habitat, des vêtements et des dépla-\ncements parmi ceux proposés dans le programme. Il est bien évidemment possible de pro-\nlonger ce travail et de l'élargir à l'évolution de l'alimentation, des outils et des techniques.\n\nFiche enseignant\n\n» Matériel\nLe matériel nécessaire est indiqué dans chaque séance. La nouvelle frise historique MDI |\n\n(édition 2017) peut être un support complémentaire pour aborder ce dossier.\n\n|\nJ\n\n dès\n\nRepérer et situer l'évolution des sociétés dans un temps\nlong à travers des modes de vie : l'exemple de l'habitat.\n\nMatériel : photos (— sur CD-Rom) représentant différents\ntypes d'habitat selon les périodes historiques.\n\ne Je m'interroge\n\nL'enseignant-e affiche au tableau deux images : une\nhutte en peaux de bêtes de la Préhistoire, un immeuble\nd'aujourd'hui.\n\nOn interroge les élèves :\n\n[Que représentent ces photographies ?\n\nOn peut attendre les réponses suivantes : « c'est une sorte\nde tente », « c'est un immeuble », « ce sont des mai-\nsons », « des endroits où habitent des gens ».\nL'enseignant-e demande alors :\n\nCes habitations existent-elles encore de nos jours ?\nEst-ce qu'elles sont toujours utilisées pour y vivre ?\n\nLes élèves vont répondre : « non, il y en a qui sont vieilles,\ndétruites », « il y en a qu'on peut voir aujourd'hui : le grand\nimmeuble », « la maison de l'homme préhistorique, on\ndirait une tente. »\n\nL'enseignant-e propose alors de travailler à partir d'autres\nimages d'habitations (on peut introduire ici le vocabulaire\nd'habitat) au fil du temps, depuis les premiers hommes\npendant la Préhistoire.\n\n Je recherche\n\nL'enseignant-e place les élèves par groupes de 4 et distribue\nla fiche à découper 1 (— sur CD-Rom) avec les photos des\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\ndifférents habitats et leurs légendes. Chaque groupe doit\ndécouper les images et les légendes, puis les associer aux\npériodes correspondantes.\n\nOn vérifie collectivement les associations réalisées. C'est\nl'occasion d’un échange oral collectif autour des maté-\nriaux utilisés dans ces différents habitats, de leur fonction,\nde leur présence dans le temps. Les photographies et leurs\nlégendes sont collées dans le cahier ou classeur de QLM.\nL'enseignant-e distribue ensuite la fiche élève 1 qui permet\nun prolongement individuel à ce travail.\n\nL2 Je retiens\n\n= Au cours du temps, l'habitat des hommes a évolué en\nfonction des matériaux disponibles, de leurs conditions\nde vie, de leurs techniques et savoir-faire.\n\n« À la Préhistoire, les hommes utilisaient des branchages\net feuillages, ossements et peaux, puis du bois.\n\n« Pendant l'Antiquité, on utilisait le bois, le torchis et la\npaille, mais aussi des pierres taillées, des tuiles.\n\n» Au Moyen Âge, l'habitat devient de plus en plus solide\n(utilisation de la pierre comme pour les châteaux forts)\net divers (maison à colombages en ville).\n\n* Aux Temps modernes, l'habitat permet aussi de mon-\ntrer sa richesse et sa puissance (château royal).\n\n» Au xix siècle, les immeubles haussmaniens se dével-\noppent (comme à Paris) et des maisons en briques sont\nconstruites pour les ouvriers.\n\n« Dans le monde contemporain, on cherche à loger le\nplus de personnes possible et le confort domestique\ns'est considérablement amélioré (eau courante, électri-\ncité, etc.).\n\nSe situer dans le temps « 359\n\n ITT]\n\nRepérer et situer l'évolution des sociétés dans un temps\nlong à travers des modes de vie : l'exemple des vêtements.\n\nMatériel : photos (— sur CD-Rom) représentant différentes\ntenues vestimentaires selon les périodes historiques.\n\n8 sem interroge\n\nL'enseignant-e rappelle le travail mené lors la séance 1 :\nil s'agissait de comparer l'habitat des hommes en France au\ncours du temps. On leur propose maintenant de comparer\nleurs vêtements. Pour cela, on distribue à chaque élève le\nrecto de la fiche élève 2 et on demande :\n\nPouvez-vous imaginer les vêtements des hommes et\ndes femmes durant les 6 périodes historiques de notre\nhistoire ?\n\nL'enseignant-e constitue alors 6 groupes correspondant\naux 6 périodes historiques.\n\nAprès ce temps de travail individuel, chaque élève présente\net décrit ses dessins qui sont affichés au tableau.\n\nJe recherche\n\nL'enseignant-e propose maintenant aux élèves d'observer\ndes vêtements utilisés par des hommes et des femmes au\nfil du temps afin de les comparer avec les dessins réalisés.\nOn distribue aux élèves la fiche à découper 2 avec les\nimages légendées (— sur CD-Rom). Les élèves travaillent\nen binôme. L'enseignant-e laisse les élèves découvrir les\nimages puis propose à chaque groupe d'élèves de présen-\nter, à tour de rôle, l'image correspondant à leur période his-\ntorique en commençant par la Préhistoire. Les élèves pro-\ncèdent à une description à l'oral des vêtements.\n\nOn procède successivement de la même façon pour toutes\nles images. Celles-ci sont affichées au tableau ou au mur\nde gauche à droite afin de constituer progressivement une\nfrise chronologique.\n\nÀ la suite de ce travail, le verso de la fiche élève 2 est dis-\ntribué à chaque élève.\n\n2 Je retiens\n\n«Durant les différentes époques passées, les hommes\net les femmes ont porté différents vêtements pour se\nprotéger du froid, de la pluie, pour se battre...\n\n« Les vêtements ont évolué en fonction des modes de\nvie, des matériaux connus...et de la mode !\n\nMots à retenir\n\nModes de vie\nHabitat\nOutils\n\n« Les vêtements ont longtemps représenté la fonction\nde celui qui les porte : le roi ne porte pas les mêmes\nvêtements que le paysan. De nos jours, cela est beau-\ncoup moins visible.\n\n été\n\nRepérer et situer l'évolution des sociétés dans un\ntemps long à travers des modes de vie : l'exemple des\ndéplacements.\n\na Je m'interroge\n\nL'enseignant-e rappelle aux élèves ce qui a été vu lors des\ndeux séances précédentes : l'habitat des hommes a évo-\nlué dans le temps, leurs vêtements aussi. On les interroge\nalors :\n\nMais qu'en est-il de leurs déplacements ?\nA-t-on toujours utilisé la voiture, le vélo, ou encore le\ntrain ou l'avion comme aujourd'hui ?\n\nLes élèves pourront répondre : « non, avant on utilisait des\nanimaux », ou « on se déplaçait à pied... »\n\nL'enseignant-e propose aux élèves d'y réfléchir par deux et\nde lister les différents déplacements qu'ils pensent connaitre\npour les différentes périodes historiques. Un échange oral\net collectif conclut cette recherche par binôme.\n\n Je recherche\n\nL'enseignant-e propose alors aux élèves de mener, grâce\nà Internet, une recherche sur les moyens de transport. On\nconstitue pour cela un groupe par période. Chaque groupe\ndevra réaliser une affiche présentant ses recherches. Ce tra-\nvail peut être poursuivi par la fiche élève 3.\n\n2 Je retiens\n\n« Les hommes et les femmes n’ont eu pour se déplacer\npendant longtemps que leurs jambes comme durant la\nPréhistoire.\n\n« Puis les hommes ont commencé à utiliser des animaux\ncomme le cheval ou l'âne ou les bœufs et ont tracé des\nchemins puis des routes. Pour se déplacer sur la mer, ils\nont construit des bateaux.\n\n+ De nombreux progrès techniques ont révolutionné\nles moyens de transport à partir du xix° siècle (voiture,\ntrain) et au xx siècle (avion, fusée).\n\nVêtements\nTechniques\n\nÉvolution\nDéplacements\n\n360 » Se situer dans le temps\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
    guidePageDecisions: [
      {
        page: 359,
        confidence: 93,
        score: 22,
        included: true,
        strongMarkers: [
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "par groupes",
        ],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on interroge", "par groupes", "groupe"],
        studentLike: true,
      },
      {
        page: 360,
        confidence: 93,
        score: 18,
        included: true,
        strongMarkers: ["seance", "l'enseignant", "enseignant-e", "les eleves", "aux eleves"],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on demande", "on distribue", "groupe"],
        studentLike: true,
      },
      {
        page: 361,
        confidence: 91,
        score: 1,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: false,
      },
    ],
    skippedProbePages: [361],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-30",
    dossierNumber: 30,
    partNumber: 7,
    partTitle: "Explorer les organisations du monde",
    title: "Quels sont les principaux types de paysages ?",
    guidePages: [371, 372],
    guidePageCount: 2,
    objectives: [],
    progressionNote:
      "Ce dossier 30 est consacré à l'identification des différents paysages à travers des photogra-\nphies, déplacements sur le terrain, vue aérienne, globe terrestre, planisphère, films docu-\nmentaires. Au CP-CE1, on observe les principaux paysages français en s'appuyant sur des\nlieux de vie. Au CE2, on reconnait quelques paysages de la planète et leurs caractéristiques\nlittoraux, massifs montagneux, campagnes, villes, déserts).",
    material: [
      "Le matériel nécessaire est indiqué dans chaque séance.",
      "Indications de progression dans le cycle 2",
      "Ce dossier 30 est consacré à l'identification des différents paysages à travers des photogra-",
      "phies, déplacements sur le terrain, vue aérienne, globe terrestre, planisphère, films docu-",
      "mentaires. Au CP-CE1, on observe les principaux paysages français en s'appuyant sur des",
      "lieux de vie. Au CE2, on reconnait quelques paysages de la planète et leurs caractéristiques",
      "littoraux, massifs montagneux, campagnes, villes, déserts).",
    ],
    sessions: [
      {
        number: 1,
        title:
          "Reconnaitre les principaux paysages francais. Identifier leurs caractéristiques. Matériel : photographies de paysages (— sur CD-Rom).",
        rawText:
          "Séance 1 [FIP T 1\nReconnaitre les principaux paysages francais.\nIdentifier leurs caractéristiques.\n\nMatériel : photographies de paysages (— sur CD-Rom).\n\n8 jem interroge\n\nPour débuter cette séance sur les paysages français, l'ensei-\ngnant-e interroge les élèves :\n\nVous souvenez-vous des endroits où vous êtes partis en\nvacances en France ?\n\nOn écoute les réponses des élèves et on les illustre de pho-\ntographies à partir des exemples proposés sur le CD-Rom\nqui pourront être imprimées et plastifiées. On enrichit\nensuite les propositions des élèves, le cas échéant, par de\nnouvelles photographies.\n\nPuis on demande :\n\n[Comment pourrions-nous classer ces photographies ?\n\nOn peut attendre des réponses comme : « il y en a où on\nvoit des montagnes », « il y en a d'autres qui sont au bord\nde la mer », « il y en a où on voit des grandes rivières »...\nOn place alors les clichés par type de paysages en les nom-\nmant : « les montagnes, le littoral, les plaines et les fleuves\n(notion de bassin)... ». On peut insister sur les clichés mon-\ntrant les activités des hommes dans ces différents paysages\net sur le rôle qu'ils jouent dans l'aménagement de certains\npaysages.\n\nEnfin, l'enseignant-e peut afficher également une carte\nde France et repérer sur cette carte les différents clichés\n(surtout pour les CE1).\n\nJe recherche\n\nOn propose ensuite aux élèves de travailler sur ces diffé-\nrents paysages en leur distribuant la fiche élève 1 (1 coc-\ncinelle) et les fiches élèves 2 et 3 (2 coccinelles). Le travail\nest effectué individuellement ou par binôme.\n\n© MDI SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\na Je retiens\n\n«Ily a en France des paysages très variés :\n\n— la montagne : les principales montagnes françaises\nsont les Alpes, les Pyrénées, le Massif Central, les Vosges\net le Jura.\n\n— les rivières et les fleuves : ils sont très nombreux\ndans notre pays. La Seine, la Loire, le Rhin, le Rhône et\nla Garonne sont les 5 grands fleuves de France.\n\n— les plaines : ce sont de grands espaces plats, souvent\ncultivés.\n\n— le littoral : c'est l'endroit où la terre rejoint la mer ou\nl'océan. En France, le littoral est très varié : falaises, côtes\nrocheuses, dunes, plages.\n\n« Les paysages français sont naturels ou parfois aména-\ngés par les Hommes.\n\n« Notre pays est bordé par l'océan Atlantique, la Manche,\nla mer du Nord et la mer Méditerranée.\n\n TT)\n\nReconnaitre quelques paysages de la planéte.\nIdentifier leurs caractéristiques.\n\nMatériel : photographies de paysages (— sur CD-Rom).\n\n8 Jem interroge\n\nL'enseignant-e a placé devant les élèves un planisphère et\ndemande si l'un d’entre eux peut y situer la France.\n\nOn y plante alors un petit drapeau pour la repérer.\n\nOn interroge ensuite les élèves :\n\nVous rappelez-vous le nom des différents continents\nde notre planète ?\n\nOn se les remémore collectivement tout en les montrant\naux élèves.\nL'enseignant-e demande ensuite aux élèves :\n\n[Que connaissez-vous de ces différents continents ?\n\nExplorer les organisations du monde « 371\n\nFiche enseignant\n\nOn note au tableau les réflexions des uns et des autres\npuis on leur propose de comparer quelques photographies\nprises sur ces différents continents.\n\n Je recherche\n\nLes élèves sont placés par binômes. L'enseignant-e dis-\ntribue alors à chaque binôme plusieurs photographies A4\n(— sur CD-Rom). Chaque groupe les observe attentive-\nment et lit la légende.\n\nOn propose une grille de lecture assez simple : peut-on sur\n\ncette photo avoir une idée du climat (chaud, froid, tempéré, |\n\nhumide, sec ), et du type de paysage dont il s'agit ? : rural,\nurbain, littoral, désertique, naturel, modifié par l'Homme.\n\nOn laisse les élèves préparer leurs réponses, puis on leur\ndemande de venir montrer sur le planisphère où a été\n\nprise cette photo (l'enseignant-e, une fois le bon continent\ntrouvé, peut aider à la localisation plus précise) puis de la\ndécrire suivant la grille de lecture établie.\n\nOn distribue ensuite la fiche élève 4 qui prolonge ce travail\nà l'écrit.\n\n2 Je retiens\n\n+ Notre planète offre des paysages très variés.\n\n* Selon le relief, le climat ou les précipitations, on peut\nrencontrer sur les différents continents, des déserts, des\nforêts, des montagnes, des vallées, de vastes plaines,\ndes iles.\n\n« Les Hommes se sont adaptés à la plupart de ces pay-\nsages et les ont souvent modifiés en s'y installant et\nen y travaillant.\n\nLES DIFFÉRENTS PAYSAGES EN FRANCE ET DANS LE MONDE\n\n* Notre planète offre des paysages très variés.\n\n« Selon le relief ou le climat, on peut trouver sur les différents continents :\ndes déserts, des forêts, des montagnes, des vallées, des plaines, des iles...\n\n« Ily a en France des paysages très variés également :\n— des montagnes : les Alpes, les Pyrénées, le Massif Central, les Vosges et le Jura ;\n— des fleuves : la Seine, la Loire, le Rhin, le Rhône et la Garonne sont les 5 grands fleuves du pays ;\n— les plaines : ce sont de grands espaces plats, souvent cultivés ;\n— le littoral : en France, il est très varié : falaises, côtes rocheuses, dunes, plages.\n\nDésert\nen Australie\n\nLa taïga,\nforêt en Sibérie\n\nLe mont Blanc,\ndans les Alpes\n\nLa plaine\nde Picardie\n\n* Les Hommes se sont adaptés à la plupart de ces paysages et les ont souvent modifiés en s'y\n\ninstallant et en y travaillant.\n\nDésert\n\nMots à retenir\n\nPaysages\nLittoral Plaine Montagne\nRivière Fleuve\nCampagne Ville\n\nForêt\n\nIle\n\n372 « Explorer les organisations du monde\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
        phases: [
          {
            title: "Je recherche",
            detail:
              "On propose ensuite aux élèves de travailler sur ces diffé-\nrents paysages en leur distribuant la fiche élève 1 (1 coc-\ncinelle) et les fiches élèves 2 et 3 (2 coccinelles). Le travail\nest effectué individuellement ou par binôme.\n\n© MDI SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\na",
          },
          {
            title: "Je retiens",
            detail:
              "«Ily a en France des paysages très variés :\n\n— la montagne : les principales montagnes françaises\nsont les Alpes, les Pyrénées, le Massif Central, les Vosges\net le Jura.\n\n— les rivières et les fleuves : ils sont très nombreux\ndans notre pays. La Seine, la Loire, le Rhin, le Rhône et\nla Garonne sont les 5 grands fleuves de France.\n\n— les plaines : ce sont de grands espaces plats, souvent\ncultivés.\n\n— le littoral : c'est l'endroit où la terre rejoint la mer ou\nl'océan. En France, le littoral est très varié : falaises, côtes\nrocheuses, dunes, plages.\n\n« Les paysages français sont naturels ou parfois aména-\ngés par les Hommes.\n\n« Notre pays est bordé par l'océan Atlantique, la Manche,\nla mer du Nord et la mer Méditerranée.\n\n TT)\n\nReconnaitre quelques paysages de la planéte.\nIdentifier leurs caractéristiques.\n\nMatériel : photographies de paysages (— sur CD-Rom).\n\n8 Jem interroge\n\nL'enseignant-e a placé devant les élèves un planisphère et\ndemande si l'un d’entre eux peut y situer la France.\n\nOn y plante alors un petit drapeau pour la repérer.\n\nOn interroge ensuite les élèves :\n\nVous rappelez-vous le nom des différents continents\nde notre planète ?\n\nOn se les remémore collectivement tout en les montrant\naux élèves.\nL'enseignant-e demande ensuite aux élèves :\n\n[Que connaissez-vous de ces différents continents ?\n\nExplorer les organisations du monde « 371\n\nFiche enseignant\n\nOn note au tableau les réflexions des uns et des autres\npuis on leur propose de comparer quelques photographies\nprises sur ces différents continents.",
          },
          {
            title: "Je recherche",
            detail:
              "Les élèves sont placés par binômes. L'enseignant-e dis-\ntribue alors à chaque binôme plusieurs photographies A4\n(— sur CD-Rom). Chaque groupe les observe attentive-\nment et lit la légende.\n\nOn propose une grille de lecture assez simple : peut-on sur\n\ncette photo avoir une idée du climat (chaud, froid, tempéré, |\n\nhumide, sec ), et du type de paysage dont il s'agit ? : rural,\nurbain, littoral, désertique, naturel, modifié par l'Homme.\n\nOn laisse les élèves préparer leurs réponses, puis on leur\ndemande de venir montrer sur le planisphère où a été\n\nprise cette photo (l'enseignant-e, une fois le bon continent\ntrouvé, peut aider à la localisation plus précise) puis de la\ndécrire suivant la grille de lecture établie.\n\nOn distribue ensuite la fiche élève 4 qui prolonge ce travail\nà l'écrit.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "+ Notre planète offre des paysages très variés.\n\n* Selon le relief, le climat ou les précipitations, on peut\nrencontrer sur les différents continents, des déserts, des\nforêts, des montagnes, des vallées, de vastes plaines,\ndes iles.\n\n« Les Hommes se sont adaptés à la plupart de ces pay-\nsages et les ont souvent modifiés en s'y installant et\nen y travaillant.\n\nLES DIFFÉRENTS PAYSAGES EN FRANCE ET DANS LE MONDE\n\n* Notre planète offre des paysages très variés.\n\n« Selon le relief ou le climat, on peut trouver sur les différents continents :\ndes déserts, des forêts, des montagnes, des vallées, des plaines, des iles...\n\n« Ily a en France des paysages très variés également :\n— des montagnes : les Alpes, les Pyrénées, le Massif Central, les Vosges et le Jura ;\n— des fleuves : la Seine, la Loire, le Rhin, le Rhône et la Garonne sont les 5 grands fleuves du pays ;\n— les plaines : ce sont de grands espaces plats, souvent cultivés ;\n— le littoral : en France, il est très varié : falaises, côtes rocheuses, dunes, plages.\n\nDésert\nen Australie\n\nLa taïga,\nforêt en Sibérie\n\nLe mont Blanc,\ndans les Alpes\n\nLa plaine\nde Picardie\n\n* Les Hommes se sont adaptés à la plupart de ces paysages et les ont souvent modifiés en s'y\n\ninstallant et en y travaillant.\n\nDésert\n\nMots à retenir\n\nPaysages\nLittoral Plaine Montagne\nRivière Fleuve\nCampagne Ville\n\nForêt\n\nIle\n\n372 « Explorer les organisations du monde\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
          },
        ],
      },
    ],
    guideText:
      "Quels sont les principaux types de paysages ?\n\n< I)\n\nA\n\n| » Objectif\n\n|\n\n|\n\n| * Reconnaître différents paysages (en France et dans le monde) : les littoraux, les massifs\nmontagneux, les campagnes, les villes, les déserts. |\n\n> Matériel\n\n| Le matériel nécessaire est indiqué dans chaque séance.\n\n| > Indications de progression dans le cycle 2\n\n| Ce dossier 30 est consacré à l'identification des différents paysages à travers des photogra-\n| phies, déplacements sur le terrain, vue aérienne, globe terrestre, planisphère, films docu-\n| mentaires. Au CP-CE1, on observe les principaux paysages français en s'appuyant sur des\n| lieux de vie. Au CE2, on reconnait quelques paysages de la planète et leurs caractéristiques\n| (littoraux, massifs montagneux, campagnes, villes, déserts).\n\n)\n\nSéance 1 [FIP T 1\nReconnaitre les principaux paysages francais.\nIdentifier leurs caractéristiques.\n\nMatériel : photographies de paysages (— sur CD-Rom).\n\n8 jem interroge\n\nPour débuter cette séance sur les paysages français, l'ensei-\ngnant-e interroge les élèves :\n\nVous souvenez-vous des endroits où vous êtes partis en\nvacances en France ?\n\nOn écoute les réponses des élèves et on les illustre de pho-\ntographies à partir des exemples proposés sur le CD-Rom\nqui pourront être imprimées et plastifiées. On enrichit\nensuite les propositions des élèves, le cas échéant, par de\nnouvelles photographies.\n\nPuis on demande :\n\n[Comment pourrions-nous classer ces photographies ?\n\nOn peut attendre des réponses comme : « il y en a où on\nvoit des montagnes », « il y en a d'autres qui sont au bord\nde la mer », « il y en a où on voit des grandes rivières »...\nOn place alors les clichés par type de paysages en les nom-\nmant : « les montagnes, le littoral, les plaines et les fleuves\n(notion de bassin)... ». On peut insister sur les clichés mon-\ntrant les activités des hommes dans ces différents paysages\net sur le rôle qu'ils jouent dans l'aménagement de certains\npaysages.\n\nEnfin, l'enseignant-e peut afficher également une carte\nde France et repérer sur cette carte les différents clichés\n(surtout pour les CE1).\n\nJe recherche\n\nOn propose ensuite aux élèves de travailler sur ces diffé-\nrents paysages en leur distribuant la fiche élève 1 (1 coc-\ncinelle) et les fiches élèves 2 et 3 (2 coccinelles). Le travail\nest effectué individuellement ou par binôme.\n\n© MDI SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\na Je retiens\n\n«Ily a en France des paysages très variés :\n\n— la montagne : les principales montagnes françaises\nsont les Alpes, les Pyrénées, le Massif Central, les Vosges\net le Jura.\n\n— les rivières et les fleuves : ils sont très nombreux\ndans notre pays. La Seine, la Loire, le Rhin, le Rhône et\nla Garonne sont les 5 grands fleuves de France.\n\n— les plaines : ce sont de grands espaces plats, souvent\ncultivés.\n\n— le littoral : c'est l'endroit où la terre rejoint la mer ou\nl'océan. En France, le littoral est très varié : falaises, côtes\nrocheuses, dunes, plages.\n\n« Les paysages français sont naturels ou parfois aména-\ngés par les Hommes.\n\n« Notre pays est bordé par l'océan Atlantique, la Manche,\nla mer du Nord et la mer Méditerranée.\n\n TT)\n\nReconnaitre quelques paysages de la planéte.\nIdentifier leurs caractéristiques.\n\nMatériel : photographies de paysages (— sur CD-Rom).\n\n8 Jem interroge\n\nL'enseignant-e a placé devant les élèves un planisphère et\ndemande si l'un d’entre eux peut y situer la France.\n\nOn y plante alors un petit drapeau pour la repérer.\n\nOn interroge ensuite les élèves :\n\nVous rappelez-vous le nom des différents continents\nde notre planète ?\n\nOn se les remémore collectivement tout en les montrant\naux élèves.\nL'enseignant-e demande ensuite aux élèves :\n\n[Que connaissez-vous de ces différents continents ?\n\nExplorer les organisations du monde « 371\n\nFiche enseignant\n\nOn note au tableau les réflexions des uns et des autres\npuis on leur propose de comparer quelques photographies\nprises sur ces différents continents.\n\n Je recherche\n\nLes élèves sont placés par binômes. L'enseignant-e dis-\ntribue alors à chaque binôme plusieurs photographies A4\n(— sur CD-Rom). Chaque groupe les observe attentive-\nment et lit la légende.\n\nOn propose une grille de lecture assez simple : peut-on sur\n\ncette photo avoir une idée du climat (chaud, froid, tempéré, |\n\nhumide, sec ), et du type de paysage dont il s'agit ? : rural,\nurbain, littoral, désertique, naturel, modifié par l'Homme.\n\nOn laisse les élèves préparer leurs réponses, puis on leur\ndemande de venir montrer sur le planisphère où a été\n\nprise cette photo (l'enseignant-e, une fois le bon continent\ntrouvé, peut aider à la localisation plus précise) puis de la\ndécrire suivant la grille de lecture établie.\n\nOn distribue ensuite la fiche élève 4 qui prolonge ce travail\nà l'écrit.\n\n2 Je retiens\n\n+ Notre planète offre des paysages très variés.\n\n* Selon le relief, le climat ou les précipitations, on peut\nrencontrer sur les différents continents, des déserts, des\nforêts, des montagnes, des vallées, de vastes plaines,\ndes iles.\n\n« Les Hommes se sont adaptés à la plupart de ces pay-\nsages et les ont souvent modifiés en s'y installant et\nen y travaillant.\n\nLES DIFFÉRENTS PAYSAGES EN FRANCE ET DANS LE MONDE\n\n* Notre planète offre des paysages très variés.\n\n« Selon le relief ou le climat, on peut trouver sur les différents continents :\ndes déserts, des forêts, des montagnes, des vallées, des plaines, des iles...\n\n« Ily a en France des paysages très variés également :\n— des montagnes : les Alpes, les Pyrénées, le Massif Central, les Vosges et le Jura ;\n— des fleuves : la Seine, la Loire, le Rhin, le Rhône et la Garonne sont les 5 grands fleuves du pays ;\n— les plaines : ce sont de grands espaces plats, souvent cultivés ;\n— le littoral : en France, il est très varié : falaises, côtes rocheuses, dunes, plages.\n\nDésert\nen Australie\n\nLa taïga,\nforêt en Sibérie\n\nLe mont Blanc,\ndans les Alpes\n\nLa plaine\nde Picardie\n\n* Les Hommes se sont adaptés à la plupart de ces paysages et les ont souvent modifiés en s'y\n\ninstallant et en y travaillant.\n\nDésert\n\nMots à retenir\n\nPaysages\nLittoral Plaine Montagne\nRivière Fleuve\nCampagne Ville\n\nForêt\n\nIle\n\n372 « Explorer les organisations du monde\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
    guidePageDecisions: [
      {
        page: 371,
        confidence: 92,
        score: 18,
        included: true,
        strongMarkers: [
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
        ],
        phaseMarkers: ["je recherche", "je retiens"],
        teacherLanguageMarkers: [
          "enseignant",
          "eleves",
          "on demande",
          "on propose",
          "on interroge",
        ],
        studentLike: true,
      },
      {
        page: 372,
        confidence: 93,
        score: 12,
        included: true,
        strongMarkers: ["l'enseignant", "enseignant-e", "les eleves"],
        phaseMarkers: ["je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on propose", "on distribue", "groupe"],
        studentLike: true,
      },
      {
        page: 373,
        confidence: 83,
        score: -4,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: [],
        studentLike: true,
      },
    ],
    skippedProbePages: [373],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-31",
    dossierNumber: 31,
    partNumber: 7,
    partTitle: "Explorer les organisations du monde",
    title: "Comment les espaces sont-ils organisés ?",
    guidePages: [387, 388],
    guidePageCount: 2,
    objectives: [],
    progressionNote:
      "Ce dossier 31 a pour objectif d'amener l'élève à comprendre les interactions entre diffé-\nrents espaces (espaces proches : école, parc, parcours régulier ; espaces plus complexes :\nquartier, village, centre-ville, centre commercial) et les activités humaines associées.\nAu CP, l'élève va comparer deux espaces — un quartier et un village — et prendre conscience\nde leurs principales fonctions. Au CE1, il prolonge ce travail en évoquant le rôle des princi-\npaux acteurs urbains, dans une ville ou un village. Enfin au CE2, il découvre les principales\nvilles françaises.",
    material: ["Le matériel nécessaire est indiqué dans chaque séance. J", "Si"],
    sessions: [
      {
        number: 1,
        title:
          "Découvrir un quartier et un village : leurs principaux espaces, leurs principales fonctions. Matériel : photographies (— sur CD-Rom) d'un village de",
        rawText:
          "Séance 1 MF IWF 1\nDécouvrir un quartier et un village : leurs principaux\nespaces, leurs principales fonctions.\n\nMatériel : photographies (— sur CD-Rom) d'un village de\nBretagne (Gueltas) et d’un quartier de Paris (Ménilmontant,\nXXe arrondissement).\n\na Je m'interroge\n\nL'enseignant-e affiche au tableau à gauche les photogra-\nphies du village de Gueltas (département du Morbihan) et\nà droite celles du quartier de Ménilmontant à Paris (XXe\narrondissement).\n\nOn explique aux élèves que ces photographies ont été\nprises dans deux endroits différents. On leur demande :\n\nQue voyez-vous sur ces photos ? Pouvez-vous me les\ndécrire ? Remarquez-vous des différences ou\ndes similitudes ?\n\nOn peut attendre des réponses comme : « à droite (quartier\nde Ménilmontant), il y a de grandes maisons, des immeubles,\nbeaucoup de voitures aussi », « il y a du monde : c'est une\nville » ; « à gauche, c'est à la campagne, c'est dans un\nvillage », « il n'y a pas beaucoup de gens, pas beaucoup\nde voitures non plus », « il y a des maisons... »\nL'enseignant-e interroge ensuite les élèves sur leur espace\nde vie :\n\nVivez-vous dans un village ou dans une ville ?\nPouvez-vous le/la décrire ? Qu'est-ce qu'on y trouve ?\n\nEn fonction du lieu où se trouve l'école, on peut attendre\ndes réponses comme : des rues, des commerces, des places,\ndes parcs, des immeubles, des maisons, des jardins, une\nmairie, un café, un supermarché, une bibliothèque, une\npiscine...\n\nL'enseignant-e note ces réponses au tableau. On propose\nalors aux élèves de travailler sur quelques aspects du vil-\nlage et du quartier présentés à travers deux enfants qui y\nvivent : Célia et Gaspard.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nN.B. : Cette séance peut utilement se poursuivre par une sor-\ntie de classe sur le terrain qui donnera lieu à l'utilisation d’un\nplan, à la prise de photos des différents espaces rencontrés,\nà l'explication de leurs différentes fonctions ; puis, de retour\nen classe, au repérage de celles-ci sur le plan ou/et sur une\nphotographie aérienne et à l'écriture de légendes simples.\n\nJe recherche\n\nL'enseignant-e distribue alors aux élèves les images de la\nfiche à découper 1 (— sur CD-Rom) et leur propose une\npremière activité de classement : le village d'un côté, le\nquartier d'une grande ville de l'autre. Cette activité est pro-\nlongée par la fiche élève 1. Celle-ci permet de mettre en\nplace un travail sur les différents espaces rencontrés par les\nenfants sur le chemin de leur école. L'organisation spatiale\ndu quartier et du village sont évoquées et comparées de\nnouveau à partir de photographies prises sur le terrain.\n\n[7] Je retiens\n\nA la découverte d'un quartier\n\n«Un quartier fait partie d'une ville. Il y a plus de\n2 000 habitants dans une ville.\n\n« Les habitations sont souvent des immeubles hauts et\ncollés les uns aux autres pour loger beaucoup de gens.\n- On y trouve des commerces et des services (école,\nmédecin, piscine, bibliothèque...) pour répondre à tous\nles besoins des habitants.\n\n« Beaucoup de véhicules (motos, voitures, transports en\ncommun, vélos.) circulent dans les rues, les avenues, les\nboulevards.\n\n«lly a des espaces verts (parcs, jardins).\n\nÀ la découverte d'un village\n\n« Un village se situe à la campagne. Il y a des champs,\ndes bois autour. Moins de 2 000 habitants y vivent.\n\n« On y trouve surtout des maisons individuelles avec\ndes jardins, mais au centre du village, autour de l'église,\nune rue principale est souvent bordée de maisons collées\nles unes aux autres.\n\nExplorer les organisations du monde o 387\n\nFiche enseignant\n\n» On y trouve peu de commerces et peu de services.\n«lly a peu de voies de circulation mais beaucoup d'es-\npaces verts tout autour.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e affiche au tableau à gauche les photogra-\nphies du village de Gueltas (département du Morbihan) et\nà droite celles du quartier de Ménilmontant à Paris (XXe\narrondissement).\n\nOn explique aux élèves que ces photographies ont été\nprises dans deux endroits différents. On leur demande :\n\nQue voyez-vous sur ces photos ? Pouvez-vous me les\ndécrire ? Remarquez-vous des différences ou\ndes similitudes ?\n\nOn peut attendre des réponses comme : « à droite (quartier\nde Ménilmontant), il y a de grandes maisons, des immeubles,\nbeaucoup de voitures aussi », « il y a du monde : c'est une\nville » ; « à gauche, c'est à la campagne, c'est dans un\nvillage », « il n'y a pas beaucoup de gens, pas beaucoup\nde voitures non plus », « il y a des maisons... »\nL'enseignant-e interroge ensuite les élèves sur leur espace\nde vie :\n\nVivez-vous dans un village ou dans une ville ?\nPouvez-vous le/la décrire ? Qu'est-ce qu'on y trouve ?\n\nEn fonction du lieu où se trouve l'école, on peut attendre\ndes réponses comme : des rues, des commerces, des places,\ndes parcs, des immeubles, des maisons, des jardins, une\nmairie, un café, un supermarché, une bibliothèque, une\npiscine...\n\nL'enseignant-e note ces réponses au tableau. On propose\nalors aux élèves de travailler sur quelques aspects du vil-\nlage et du quartier présentés à travers deux enfants qui y\nvivent : Célia et Gaspard.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nN.B. : Cette séance peut utilement se poursuivre par une sor-\ntie de classe sur le terrain qui donnera lieu à l'utilisation d’un\nplan, à la prise de photos des différents espaces rencontrés,\nà l'explication de leurs différentes fonctions ; puis, de retour\nen classe, au repérage de celles-ci sur le plan ou/et sur une\nphotographie aérienne et à l'écriture de légendes simples.",
          },
          {
            title: "Je recherche",
            detail:
              "L'enseignant-e distribue alors aux élèves les images de la\nfiche à découper 1 (— sur CD-Rom) et leur propose une\npremière activité de classement : le village d'un côté, le\nquartier d'une grande ville de l'autre. Cette activité est pro-\nlongée par la fiche élève 1. Celle-ci permet de mettre en\nplace un travail sur les différents espaces rencontrés par les\nenfants sur le chemin de leur école. L'organisation spatiale\ndu quartier et du village sont évoquées et comparées de\nnouveau à partir de photographies prises sur le terrain.\n\n[7]",
          },
          {
            title: "Je retiens",
            detail:
              "A la découverte d'un quartier\n\n«Un quartier fait partie d'une ville. Il y a plus de\n2 000 habitants dans une ville.\n\n« Les habitations sont souvent des immeubles hauts et\ncollés les uns aux autres pour loger beaucoup de gens.\n- On y trouve des commerces et des services (école,\nmédecin, piscine, bibliothèque...) pour répondre à tous\nles besoins des habitants.\n\n« Beaucoup de véhicules (motos, voitures, transports en\ncommun, vélos.) circulent dans les rues, les avenues, les\nboulevards.\n\n«lly a des espaces verts (parcs, jardins).\n\nÀ la découverte d'un village\n\n« Un village se situe à la campagne. Il y a des champs,\ndes bois autour. Moins de 2 000 habitants y vivent.\n\n« On y trouve surtout des maisons individuelles avec\ndes jardins, mais au centre du village, autour de l'église,\nune rue principale est souvent bordée de maisons collées\nles unes aux autres.\n\nExplorer les organisations du monde o 387\n\nFiche enseignant\n\n» On y trouve peu de commerces et peu de services.\n«lly a peu de voies de circulation mais beaucoup d'es-\npaces verts tout autour.",
          },
        ],
      },
      {
        number: 2,
        title:
          "Découvrir le quartier, le village, la ville : les rôles de cer- tains acteurs urbains. Matériel : photographies (— sur CD-Rom) sur les différents",
        rawText:
          "Séance 2 JIFFY\n\nDécouvrir le quartier, le village, la ville : les rôles de cer-\ntains acteurs urbains.\n\nMatériel : photographies (— sur CD-Rom) sur les différents\nacteurs urbains (mairie, services municipaux, écoles, com-\nmerces, espaces sportifs, bibliothèques...\n\n@ Jen’ interroge\n\nL'enseignant-e propose aux élèves de chercher à mieux\nconnaitre l'endroit où ils vivent. On les interroge alors :\n\nVous vivez dans une ville (ou dans un village).\nPouvez-vous lister ce que l'on y trouve, les gens qui y\ntravaillent pour permettre à tous les habitants d'y vivre\nle mieux possible ?\n\nOn peut attendre (en fonction de l'endroit où se trouve\nl’école) des réponses comme : « il y a une école, une piscine,\ndes magasins, des bus ou un métro, des pistes cyclables, des\ntrottoirs, une crèche, des associations pour faire du sport ou\nd'autres activités, un grand centre commercial, la mairie. »\nB. : La fonction du maire et celle du Conseil municipal\npourront utilement être explicitées lors d'une séance d'EMC.\nL'enseignant-e peut ensuite interroger les élèves qui vivent\ndans un village sur ce qui existe de plus, ou de moins, dans\nune ville et, a contrario, pour ceux qui habitent en ville, ce\nque l'on trouve, ou ne trouve pas, à leur avis, dans un village.\nL'enseignant-e propose de travailler sur quelques-uns de\nces différents acteurs de la ville, du quartier ou du village.\n\n Je recherche\n\nLes élèves sont placés par groupes de 4. L'enseignant-e\ndistribue à chaque élève les photographies de la fiche à\ndécouper 2 (— sur CD-Rom) et leur demande dans un\npremier temps de les découper puis de les décrire les unes\naprès les autres.\n\nOn demande alors à chaque groupe un premier tri : d'un\ncôté les acteurs qui sont présents dans leur village ou leur\nquartier. On vérifie oralement que chaque groupe est d'ac-\ncord sur le classement réalisé.\n\nL'enseignant-e propose alors un deuxième tri : il s'agit\nde rassembler les acteurs qui ont un rôle similaire : par\nexemple on pourrait mettre ensemble tout ce qui concerne\nles loisirs des habitants (piscine, association de sport, res-\ntaurant...) ou ce qui concerne leur santé (médecin, phar-\nmacie...). Après une phase de travail en groupe, on écoute\nles propositions des uns et des autres pour parvenir à un\nclassement commun.\n\nOn distribue la fiche élève 2. La séance se termine par un\ntravail individuel : chaque photographie doit être associée\nà la légende correspondante puis le rôle de ces différents\nacteurs est mémorisé dans un tableau (verso).\n\n[7] Je retiens\n\n« Dans un village, un quartier ou une ville, de nombreux\nacteurs jouent un rôle dans son fonctionnement quo-\n\n388 » Explorer les organisations du monde\n\ntidien : les habitants qui y vivent et s'y déplacent, la\nmunicipalité qui gère les espaces publics, les commer-\nçants qui proposent de nombreuses marchandises ou\ndes services...\n\n* Tous ces acteurs font du village, du quartier ou de la\nville, un espace organisé.",
        phases: [
          {
            title: "Je recherche",
            detail:
              "Les élèves sont placés par groupes de 4. L'enseignant-e\ndistribue à chaque élève les photographies de la fiche à\ndécouper 2 (— sur CD-Rom) et leur demande dans un\npremier temps de les découper puis de les décrire les unes\naprès les autres.\n\nOn demande alors à chaque groupe un premier tri : d'un\ncôté les acteurs qui sont présents dans leur village ou leur\nquartier. On vérifie oralement que chaque groupe est d'ac-\ncord sur le classement réalisé.\n\nL'enseignant-e propose alors un deuxième tri : il s'agit\nde rassembler les acteurs qui ont un rôle similaire : par\nexemple on pourrait mettre ensemble tout ce qui concerne\nles loisirs des habitants (piscine, association de sport, res-\ntaurant...) ou ce qui concerne leur santé (médecin, phar-\nmacie...). Après une phase de travail en groupe, on écoute\nles propositions des uns et des autres pour parvenir à un\nclassement commun.\n\nOn distribue la fiche élève 2. La séance se termine par un\ntravail individuel : chaque photographie doit être associée\nà la légende correspondante puis le rôle de ces différents\nacteurs est mémorisé dans un tableau (verso).\n\n[7]",
          },
          {
            title: "Je retiens",
            detail:
              "« Dans un village, un quartier ou une ville, de nombreux\nacteurs jouent un rôle dans son fonctionnement quo-\n\n388 » Explorer les organisations du monde\n\ntidien : les habitants qui y vivent et s'y déplacent, la\nmunicipalité qui gère les espaces publics, les commer-\nçants qui proposent de nombreuses marchandises ou\ndes services...\n\n* Tous ces acteurs font du village, du quartier ou de la\nville, un espace organisé.",
          },
        ],
      },
      {
        number: 3,
        title:
          "Découvrir les principales villes de France. Matériel : carte de France, photos des monuments/sites des principales villes de France (— sur CD-Rom).",
        rawText:
          "| Séance 3 IFFT]\nDécouvrir les principales villes de France.\n\nMatériel : carte de France, photos des monuments/sites des\nprincipales villes de France (— sur CD-Rom).\n\na8 Je m'interroge\nL'enseignant-e montre aux élèves une photographie (Tour\n\nEiffel) illustrant l’une des principales villes de France. On\ndemande alors aux élèves :\n\nConnaissez-vous ce monument ?\nSavez-vous où il se trouve ?\n\nOn peut attendre des réponses comme : « c'est la Tour\nEiffel ! Elle est à Paris ! Je l'ai déjà visitée | ».\nL'enseignant-e place alors sous la photographie une éti-\nquette « PARIS ». Puis on montre aux élèves la carte de\nFrance et on leur demande :\n\n[Où se situe Paris sur la carte de la France ?\n\nDes élèves viennent proposer une réponse. On peut placer\nun petit drapeau « Paris » à l'aide de patafix et d'une allu-\nmette par exemple. L'enseignant-e explique que Paris est\nla capitale de notre pays et est la ville la plus peuplée avec\nplus de 2 200 000 habitants (on expliquera ce nombre en\nfaisant le lien avec les mathématiques).\n\nOn propose ensuite aux élèves de travailler sur les 10 villes\nles plus peuplées de notre pays.\n\nJe recherche\n\nL'enseignant-e affiche au tableau les images de monu-\nments ou sites importants de ces villes. On garde caché les\nétiquettes des noms de ces villes. Si un élève connait l'un\ndes lieux et le situe, on peut fixer sous l'image le nom de\nla ville. Si ce n’est pas le cas, ce sera fait en fin de séance\naprès le travail sur la fiche élève 3. On distingue alors cette\nfiche aux élèves.\n\n2 Je retiens\n\n«Il y a en France de très grandes villes comme Paris,\nMarseille ou Lyon.\n\n- Les grandes villes comptent beaucoup d'habitants et\nleur agglomération, c'est-à-dire la ville et les petites villes\nsituées tout autour (on parle de banlieue) encore plus.\n\nMots à retenir\n\nVillage Ville Quartier\nCommerces services\nAgglomération Banlieue\n\n© MOI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e montre aux élèves une photographie (Tour\n\nEiffel) illustrant l’une des principales villes de France. On\ndemande alors aux élèves :\n\nConnaissez-vous ce monument ?\nSavez-vous où il se trouve ?\n\nOn peut attendre des réponses comme : « c'est la Tour\nEiffel ! Elle est à Paris ! Je l'ai déjà visitée | ».\nL'enseignant-e place alors sous la photographie une éti-\nquette « PARIS ». Puis on montre aux élèves la carte de\nFrance et on leur demande :\n\n[Où se situe Paris sur la carte de la France ?\n\nDes élèves viennent proposer une réponse. On peut placer\nun petit drapeau « Paris » à l'aide de patafix et d'une allu-\nmette par exemple. L'enseignant-e explique que Paris est\nla capitale de notre pays et est la ville la plus peuplée avec\nplus de 2 200 000 habitants (on expliquera ce nombre en\nfaisant le lien avec les mathématiques).\n\nOn propose ensuite aux élèves de travailler sur les 10 villes\nles plus peuplées de notre pays.",
          },
          {
            title: "Je recherche",
            detail:
              "L'enseignant-e affiche au tableau les images de monu-\nments ou sites importants de ces villes. On garde caché les\nétiquettes des noms de ces villes. Si un élève connait l'un\ndes lieux et le situe, on peut fixer sous l'image le nom de\nla ville. Si ce n’est pas le cas, ce sera fait en fin de séance\naprès le travail sur la fiche élève 3. On distingue alors cette\nfiche aux élèves.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "«Il y a en France de très grandes villes comme Paris,\nMarseille ou Lyon.\n\n- Les grandes villes comptent beaucoup d'habitants et\nleur agglomération, c'est-à-dire la ville et les petites villes\nsituées tout autour (on parle de banlieue) encore plus.\n\nMots à retenir\n\nVillage Ville Quartier\nCommerces services\nAgglomération Banlieue\n\n© MOI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
          },
        ],
      },
    ],
    guideText:
      ") Comment les espaces sont-ils organisés ?\n\n» Objectif\n\n« Découvrir le quartier, le village, la ville : ses principaux espaces et ses principales fonctions.\n\n» Indications de progression dans le cycle 2\nCe dossier 31 a pour objectif d'amener l'élève à comprendre les interactions entre diffé- |\nrents espaces (espaces proches : école, parc, parcours régulier ; espaces plus complexes :\n| quartier, village, centre-ville, centre commercial) et les activités humaines associées.\n| Au CP, l'élève va comparer deux espaces — un quartier et un village — et prendre conscience\n| de leurs principales fonctions. Au CE1, il prolonge ce travail en évoquant le rôle des princi-\n| paux acteurs urbains, dans une ville ou un village. Enfin au CE2, il découvre les principales\n| villes françaises.\n| » Matériel |\n| Le matériel nécessaire est indiqué dans chaque séance. J\nSi\n\nSéance 1 MF IWF 1\nDécouvrir un quartier et un village : leurs principaux\nespaces, leurs principales fonctions.\n\nMatériel : photographies (— sur CD-Rom) d'un village de\nBretagne (Gueltas) et d’un quartier de Paris (Ménilmontant,\nXXe arrondissement).\n\na Je m'interroge\n\nL'enseignant-e affiche au tableau à gauche les photogra-\nphies du village de Gueltas (département du Morbihan) et\nà droite celles du quartier de Ménilmontant à Paris (XXe\narrondissement).\n\nOn explique aux élèves que ces photographies ont été\nprises dans deux endroits différents. On leur demande :\n\nQue voyez-vous sur ces photos ? Pouvez-vous me les\ndécrire ? Remarquez-vous des différences ou\ndes similitudes ?\n\nOn peut attendre des réponses comme : « à droite (quartier\nde Ménilmontant), il y a de grandes maisons, des immeubles,\nbeaucoup de voitures aussi », « il y a du monde : c'est une\nville » ; « à gauche, c'est à la campagne, c'est dans un\nvillage », « il n'y a pas beaucoup de gens, pas beaucoup\nde voitures non plus », « il y a des maisons... »\nL'enseignant-e interroge ensuite les élèves sur leur espace\nde vie :\n\nVivez-vous dans un village ou dans une ville ?\nPouvez-vous le/la décrire ? Qu'est-ce qu'on y trouve ?\n\nEn fonction du lieu où se trouve l'école, on peut attendre\ndes réponses comme : des rues, des commerces, des places,\ndes parcs, des immeubles, des maisons, des jardins, une\nmairie, un café, un supermarché, une bibliothèque, une\npiscine...\n\nL'enseignant-e note ces réponses au tableau. On propose\nalors aux élèves de travailler sur quelques aspects du vil-\nlage et du quartier présentés à travers deux enfants qui y\nvivent : Célia et Gaspard.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nN.B. : Cette séance peut utilement se poursuivre par une sor-\ntie de classe sur le terrain qui donnera lieu à l'utilisation d’un\nplan, à la prise de photos des différents espaces rencontrés,\nà l'explication de leurs différentes fonctions ; puis, de retour\nen classe, au repérage de celles-ci sur le plan ou/et sur une\nphotographie aérienne et à l'écriture de légendes simples.\n\nJe recherche\n\nL'enseignant-e distribue alors aux élèves les images de la\nfiche à découper 1 (— sur CD-Rom) et leur propose une\npremière activité de classement : le village d'un côté, le\nquartier d'une grande ville de l'autre. Cette activité est pro-\nlongée par la fiche élève 1. Celle-ci permet de mettre en\nplace un travail sur les différents espaces rencontrés par les\nenfants sur le chemin de leur école. L'organisation spatiale\ndu quartier et du village sont évoquées et comparées de\nnouveau à partir de photographies prises sur le terrain.\n\n[7] Je retiens\n\nA la découverte d'un quartier\n\n«Un quartier fait partie d'une ville. Il y a plus de\n2 000 habitants dans une ville.\n\n« Les habitations sont souvent des immeubles hauts et\ncollés les uns aux autres pour loger beaucoup de gens.\n- On y trouve des commerces et des services (école,\nmédecin, piscine, bibliothèque...) pour répondre à tous\nles besoins des habitants.\n\n« Beaucoup de véhicules (motos, voitures, transports en\ncommun, vélos.) circulent dans les rues, les avenues, les\nboulevards.\n\n«lly a des espaces verts (parcs, jardins).\n\nÀ la découverte d'un village\n\n« Un village se situe à la campagne. Il y a des champs,\ndes bois autour. Moins de 2 000 habitants y vivent.\n\n« On y trouve surtout des maisons individuelles avec\ndes jardins, mais au centre du village, autour de l'église,\nune rue principale est souvent bordée de maisons collées\nles unes aux autres.\n\nExplorer les organisations du monde o 387\n\nFiche enseignant\n\n» On y trouve peu de commerces et peu de services.\n«lly a peu de voies de circulation mais beaucoup d'es-\npaces verts tout autour.\n\nSéance 2 JIFFY\n\nDécouvrir le quartier, le village, la ville : les rôles de cer-\ntains acteurs urbains.\n\nMatériel : photographies (— sur CD-Rom) sur les différents\nacteurs urbains (mairie, services municipaux, écoles, com-\nmerces, espaces sportifs, bibliothèques...\n\n@ Jen’ interroge\n\nL'enseignant-e propose aux élèves de chercher à mieux\nconnaitre l'endroit où ils vivent. On les interroge alors :\n\nVous vivez dans une ville (ou dans un village).\nPouvez-vous lister ce que l'on y trouve, les gens qui y\ntravaillent pour permettre à tous les habitants d'y vivre\nle mieux possible ?\n\nOn peut attendre (en fonction de l'endroit où se trouve\nl’école) des réponses comme : « il y a une école, une piscine,\ndes magasins, des bus ou un métro, des pistes cyclables, des\ntrottoirs, une crèche, des associations pour faire du sport ou\nd'autres activités, un grand centre commercial, la mairie. »\nB. : La fonction du maire et celle du Conseil municipal\npourront utilement être explicitées lors d'une séance d'EMC.\nL'enseignant-e peut ensuite interroger les élèves qui vivent\ndans un village sur ce qui existe de plus, ou de moins, dans\nune ville et, a contrario, pour ceux qui habitent en ville, ce\nque l'on trouve, ou ne trouve pas, à leur avis, dans un village.\nL'enseignant-e propose de travailler sur quelques-uns de\nces différents acteurs de la ville, du quartier ou du village.\n\n Je recherche\n\nLes élèves sont placés par groupes de 4. L'enseignant-e\ndistribue à chaque élève les photographies de la fiche à\ndécouper 2 (— sur CD-Rom) et leur demande dans un\npremier temps de les découper puis de les décrire les unes\naprès les autres.\n\nOn demande alors à chaque groupe un premier tri : d'un\ncôté les acteurs qui sont présents dans leur village ou leur\nquartier. On vérifie oralement que chaque groupe est d'ac-\ncord sur le classement réalisé.\n\nL'enseignant-e propose alors un deuxième tri : il s'agit\nde rassembler les acteurs qui ont un rôle similaire : par\nexemple on pourrait mettre ensemble tout ce qui concerne\nles loisirs des habitants (piscine, association de sport, res-\ntaurant...) ou ce qui concerne leur santé (médecin, phar-\nmacie...). Après une phase de travail en groupe, on écoute\nles propositions des uns et des autres pour parvenir à un\nclassement commun.\n\nOn distribue la fiche élève 2. La séance se termine par un\ntravail individuel : chaque photographie doit être associée\nà la légende correspondante puis le rôle de ces différents\nacteurs est mémorisé dans un tableau (verso).\n\n[7] Je retiens\n\n« Dans un village, un quartier ou une ville, de nombreux\nacteurs jouent un rôle dans son fonctionnement quo-\n\n388 » Explorer les organisations du monde\n\ntidien : les habitants qui y vivent et s'y déplacent, la\nmunicipalité qui gère les espaces publics, les commer-\nçants qui proposent de nombreuses marchandises ou\ndes services...\n\n* Tous ces acteurs font du village, du quartier ou de la\nville, un espace organisé.\n\n| Séance 3 IFFT]\nDécouvrir les principales villes de France.\n\nMatériel : carte de France, photos des monuments/sites des\nprincipales villes de France (— sur CD-Rom).\n\na8 Je m'interroge\nL'enseignant-e montre aux élèves une photographie (Tour\n\nEiffel) illustrant l’une des principales villes de France. On\ndemande alors aux élèves :\n\nConnaissez-vous ce monument ?\nSavez-vous où il se trouve ?\n\nOn peut attendre des réponses comme : « c'est la Tour\nEiffel ! Elle est à Paris ! Je l'ai déjà visitée | ».\nL'enseignant-e place alors sous la photographie une éti-\nquette « PARIS ». Puis on montre aux élèves la carte de\nFrance et on leur demande :\n\n[Où se situe Paris sur la carte de la France ?\n\nDes élèves viennent proposer une réponse. On peut placer\nun petit drapeau « Paris » à l'aide de patafix et d'une allu-\nmette par exemple. L'enseignant-e explique que Paris est\nla capitale de notre pays et est la ville la plus peuplée avec\nplus de 2 200 000 habitants (on expliquera ce nombre en\nfaisant le lien avec les mathématiques).\n\nOn propose ensuite aux élèves de travailler sur les 10 villes\nles plus peuplées de notre pays.\n\nJe recherche\n\nL'enseignant-e affiche au tableau les images de monu-\nments ou sites importants de ces villes. On garde caché les\nétiquettes des noms de ces villes. Si un élève connait l'un\ndes lieux et le situe, on peut fixer sous l'image le nom de\nla ville. Si ce n’est pas le cas, ce sera fait en fin de séance\naprès le travail sur la fiche élève 3. On distingue alors cette\nfiche aux élèves.\n\n2 Je retiens\n\n«Il y a en France de très grandes villes comme Paris,\nMarseille ou Lyon.\n\n- Les grandes villes comptent beaucoup d'habitants et\nleur agglomération, c'est-à-dire la ville et les petites villes\nsituées tout autour (on parle de banlieue) encore plus.\n\nMots à retenir\n\nVillage Ville Quartier\nCommerces services\nAgglomération Banlieue\n\n© MOI / SEJER, 2017. Reproduction autorisée pour une classe seulement.",
    guidePageDecisions: [
      {
        page: 387,
        confidence: 93,
        score: 24,
        included: true,
        strongMarkers: [
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "en classe",
        ],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on propose", "en classe"],
        studentLike: true,
      },
      {
        page: 388,
        confidence: 93,
        score: 20,
        included: true,
        strongMarkers: [
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "par groupes",
        ],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: [
          "enseignant",
          "eleves",
          "on demande",
          "on propose",
          "on distribue",
          "par groupes",
          "groupe",
        ],
        studentLike: true,
      },
      {
        page: 389,
        confidence: 88,
        score: -3,
        included: false,
        strongMarkers: [],
        phaseMarkers: [],
        teacherLanguageMarkers: ["eleves"],
        studentLike: true,
      },
    ],
    skippedProbePages: [389],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
  {
    id: "qlm-mdi-dossier-32",
    dossierNumber: 32,
    partNumber: 7,
    partTitle: "Explorer les organisations du monde",
    title: "Vit-on toujours et partout de la même façon ?",
    guidePages: [399, 400, 401, 402],
    guidePageCount: 4,
    objectives: [
      "s'y sont adaptées.",
      "+ Comparer des modes de vie (alimentation, habitat, vêtements, outils, guerre, déplace-",
      "ments...) à différentes époques ou de différentes cultures.",
      "+ Comparer des modes de vie caractéristiques dans quelques espaces très emblématiques.",
    ],
    progressionNote:
      "Ce dossier concerne les trois niveaux du cycle 2. Au CP, on aborde la comparaison des\nmodes de vie sur deux ou trois générations à travers l'exemple de l’école. Au CE1, on établit\nune comparaison de quelques modes de vie dans des espaces caractéristiques à travers\nle monde avec l'exemple des transports. Enfin, au CE2, on compare des espaces géogra-\nphiques simples à différents endroits du globe pour découvrir comment d'autres sociétés\nAinsi, en se demandant en quoi chacun participe d'un monde en transformation, l'élève\nprendre qu'il fait partie d’une société organisée évoluant dans un temps et un espace donnés.",
    material: [
      "Le matériel nécessaire est indiqué dans chaque séance.",
      "développe progressivement des connaissances et des savoir-faire lui permettant de com-",
    ],
    sessions: [
      {
        number: 1,
        title:
          "Comparer des modes de vie à différentes époques : l'exemple de l'école. Matériel : un encrier, un porte-plume, un buvard... Tout",
        rawText:
          "Séance 1 JF\"\n\nComparer des modes de vie à différentes époques :\nl'exemple de l'école.\n\nMatériel : un encrier, un porte-plume, un buvard... Tout\nobjet faisant référence à l'école des années 1950-1960.\n\n8 Je m’interroge\n\nL'enseignant-e apporte en classe un encrier ou un porte-\nplume des années 1950-1960 (ou des photos éventuelle-\nment — sur CD-Rom). On le montre aux élèves et on les\ninterroge :\n\n| À votre avis, qu'est-ce que C'est ?\n| À quoi ça sert ?\n\nOn peut attendre des réponses comme : « il y a une plume,\nc'est pour écrire », « on utilisait ça pour écrire avant à\nl’école », « il faut le tremper dans l'encre... »\nL'enseignant-e indique qu'effectivement ce porte-plume\n(ou cet encrier) était utilisé à l'école jusque vers 1965.\nAprès cette date, le stylo à bille (inventé vers 1938) a été\nautorisé pour remplacer les plumes dans les écoles.\n\nOn demande alors aux élèves :\n\nQue connaissez-vous de l'école au temps de vos grands-\nparents, c'est-à-dire quand ils avaient votre âge ?\nOn aura peut être des réponses comme : « les filles n'étaient\npas avec les garçons », « les enfants étaient tous habillés\npareil », « il n'y avait pas de cantine. »\nL'enseignant-e propose alors aux élèves de mieux connaître\ncette période, il y a 60 ans environ.\n\nŒ Je recherche\n\nL'enseignant-e distribue la fiche élève 1. Les élèves tra-\nvaillent individuellement.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nOn pourra pour prolonger ce travail en classe demander aux\nélèves d'interroger leurs grands-parents en leur demandant\ndes renseignements sur leur vie d'écolier : « Comment\nallaient-ils à l'école ? », « Où mangeaient-ils le midi ? »,\n« À quoi jouaient-ils à la récréation ? », « Comment\nétaient-ils habillés ? », « Ont-ils gardé des cahiers d'éco-\nlier ou d'autres objets ? », etc. Les réponses, écrites par les\nadultes interrogés, seront lues en classe par l'enseignant-e.\nCe travail peut alors déboucher sur une exposition autour\nde l'école au temps des grands-parents.\n\n2 Je retiens\n\n* À l'époque de nos grands-parents, dans les années 1950-\n1960, l'école était différente de celle d'aujourd'hui.\n\n* Les élèves allaient souvent à l'école à pied, écrivaient\navec de l'encre et un porte-plume. Ils portaient tous\nune blouse, Les garçons et les filles n'étaient pas dans\nla même classe.\n\n«Mais comme aujourd'hui, on y apprenait à lire, à\nécrire, à compter...",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e apporte en classe un encrier ou un porte-\nplume des années 1950-1960 (ou des photos éventuelle-\nment — sur CD-Rom). On le montre aux élèves et on les\ninterroge :\n\n| À votre avis, qu'est-ce que C'est ?\n| À quoi ça sert ?\n\nOn peut attendre des réponses comme : « il y a une plume,\nc'est pour écrire », « on utilisait ça pour écrire avant à\nl’école », « il faut le tremper dans l'encre... »\nL'enseignant-e indique qu'effectivement ce porte-plume\n(ou cet encrier) était utilisé à l'école jusque vers 1965.\nAprès cette date, le stylo à bille (inventé vers 1938) a été\nautorisé pour remplacer les plumes dans les écoles.\n\nOn demande alors aux élèves :\n\nQue connaissez-vous de l'école au temps de vos grands-\nparents, c'est-à-dire quand ils avaient votre âge ?\nOn aura peut être des réponses comme : « les filles n'étaient\npas avec les garçons », « les enfants étaient tous habillés\npareil », « il n'y avait pas de cantine. »\nL'enseignant-e propose alors aux élèves de mieux connaître\ncette période, il y a 60 ans environ.\n\nŒ",
          },
          {
            title: "Je recherche",
            detail:
              "L'enseignant-e distribue la fiche élève 1. Les élèves tra-\nvaillent individuellement.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nOn pourra pour prolonger ce travail en classe demander aux\nélèves d'interroger leurs grands-parents en leur demandant\ndes renseignements sur leur vie d'écolier : « Comment\nallaient-ils à l'école ? », « Où mangeaient-ils le midi ? »,\n« À quoi jouaient-ils à la récréation ? », « Comment\nétaient-ils habillés ? », « Ont-ils gardé des cahiers d'éco-\nlier ou d'autres objets ? », etc. Les réponses, écrites par les\nadultes interrogés, seront lues en classe par l'enseignant-e.\nCe travail peut alors déboucher sur une exposition autour\nde l'école au temps des grands-parents.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "* À l'époque de nos grands-parents, dans les années 1950-\n1960, l'école était différente de celle d'aujourd'hui.\n\n* Les élèves allaient souvent à l'école à pied, écrivaient\navec de l'encre et un porte-plume. Ils portaient tous\nune blouse, Les garçons et les filles n'étaient pas dans\nla même classe.\n\n«Mais comme aujourd'hui, on y apprenait à lire, à\nécrire, à compter...",
          },
        ],
      },
      {
        number: 2,
        title:
          "Comparer des modes de vie caractéristiques dans quelques espaces très emblématiques : l'exemple des transports.",
        rawText:
          "Séance 2 JPY\n\nComparer des modes de vie caractéristiques dans\nquelques espaces très emblématiques : l'exemple des\ntransports.\n\nMatériel : images de différents moyens de transport à\nimprimer pour le jeu de devinettes, un planisphère et/ou\nune carte de l'Europe (— sur CD-Rom). L'album Le Loup\nqui voulait faire le tour du monde, d'Orianne Lallemand et\nÉléonore Thuillier, aux éditions Auzou.\n\nExplorer les organisations du monde « 399\n\n “ 2) Vit-on toujours et partout de la même façon ?\n\nFiche enseignant\n\n@ Je m'interroge\n\nL'enseignant-e lit aux élèves l'album Le loup qui voulait faire\nle tour du monde, d'Orianne Lallemand et Éléonore Thuiller.\nOn propose ensuite aux élèves de lister les moyens de\ntransport qu'ils connaissent et que l'on utilise en France\nou dans les autres pays de notre continent, l'Europe (on\nmontre ce continent sur un planisphère).\n\nL'enseignant-e écrit au tableau chaque proposition et\naffiche ou projette les images correspondantes (— sur\nCD-Rom, à imprimer et plastifier eventuellement).\n\nOn demande ensuite :\n\n| À votre avis, est-ce la même chose dans d'autres pays\n| du monde, sur d'autres continents ?\n\nCertains élèves peuvent apporter des réponses parce qu'ils\nont voyagé, qu'ils ont de la famille dans un autre pays ou\nencore qu'ils ont pu voir différents documentaires à la\ntélévision.\n\nL'enseignant-e propose alors de chercher à en savoir un peu\nplus sur cette question des transports.\n\nJe recherche\n\nOn peut mener cette recherche à partir de la fiche élève 2.\nCelle-ci propose aux élèves de retrouver de nombreux\nmoyens de transport utilisés dans le monde, d'en apprendre\ndavantage sur leur utilisation puis de les situer sur un pla-\nnisphère (— sur CD-Rom).\n\nA la fin de la séance, les éléves pourront coller le planis-\nphere au centre d'une feuille A3 puis coller quelques-uns\ndes moyens de transport présentés en les reliant à leur pays\nd'origine.\n\nIl est également possible de mettre en place un jeu de devi-\nnettes à partir des images disponibles sur le CD-Rom : il\ns'agit de relier des images avec les textes qui vont avec.\nLes élèves doivent donc reformer les paires : par exemple,\nbus à impériale et Londres (Angleterre), gondole et Venise\n(Italie), etc.\n\nRemarque : Si votre classe est équipée de plusieurs ordi-\nnateurs, vous pouvez leur proposer de faire une recherche\nsur Internet. Les élèves sont alors placés par groupes de 4.\nChaque groupe choisit de concentrer ses recherches sur un\ncontinent : Amérique — Afrique — Asie — Europe — Océanie.\nOn cherche collectivement les mots-clés à écrire dans le\nmoteur de recherche ; par exemple « se déplacer en... »,\nou « moyens de transport en... ». Une fiche Word (— sur\nCD-Rom) peut servir de support à ces recherches.\n\nMots à retenir\n\nDifférentes époques\n\n#2 Je retiens\n\n« Il existe de très nombreux moyens de transport dans\nle monde.\n\n+ Certains sont utilisés partout (avion, voiture, train,\nvélo...), d'autres sont typiques d'une ville ou d'un pays\n(tuk-tuk, gondole...).",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e lit aux élèves l'album Le loup qui voulait faire\nle tour du monde, d'Orianne Lallemand et Éléonore Thuiller.\nOn propose ensuite aux élèves de lister les moyens de\ntransport qu'ils connaissent et que l'on utilise en France\nou dans les autres pays de notre continent, l'Europe (on\nmontre ce continent sur un planisphère).\n\nL'enseignant-e écrit au tableau chaque proposition et\naffiche ou projette les images correspondantes (— sur\nCD-Rom, à imprimer et plastifier eventuellement).\n\nOn demande ensuite :\n\n| À votre avis, est-ce la même chose dans d'autres pays\n| du monde, sur d'autres continents ?\n\nCertains élèves peuvent apporter des réponses parce qu'ils\nont voyagé, qu'ils ont de la famille dans un autre pays ou\nencore qu'ils ont pu voir différents documentaires à la\ntélévision.\n\nL'enseignant-e propose alors de chercher à en savoir un peu\nplus sur cette question des transports.",
          },
          {
            title: "Je recherche",
            detail:
              "On peut mener cette recherche à partir de la fiche élève 2.\nCelle-ci propose aux élèves de retrouver de nombreux\nmoyens de transport utilisés dans le monde, d'en apprendre\ndavantage sur leur utilisation puis de les situer sur un pla-\nnisphère (— sur CD-Rom).\n\nA la fin de la séance, les éléves pourront coller le planis-\nphere au centre d'une feuille A3 puis coller quelques-uns\ndes moyens de transport présentés en les reliant à leur pays\nd'origine.\n\nIl est également possible de mettre en place un jeu de devi-\nnettes à partir des images disponibles sur le CD-Rom : il\ns'agit de relier des images avec les textes qui vont avec.\nLes élèves doivent donc reformer les paires : par exemple,\nbus à impériale et Londres (Angleterre), gondole et Venise\n(Italie), etc.\n\nRemarque : Si votre classe est équipée de plusieurs ordi-\nnateurs, vous pouvez leur proposer de faire une recherche\nsur Internet. Les élèves sont alors placés par groupes de 4.\nChaque groupe choisit de concentrer ses recherches sur un\ncontinent : Amérique — Afrique — Asie — Europe — Océanie.\nOn cherche collectivement les mots-clés à écrire dans le\nmoteur de recherche ; par exemple « se déplacer en... »,\nou « moyens de transport en... ». Une fiche Word (— sur\nCD-Rom) peut servir de support à ces recherches.\n\nMots à retenir\n\nDifférentes époques\n\n#2",
          },
          {
            title: "Je retiens",
            detail:
              "« Il existe de très nombreux moyens de transport dans\nle monde.\n\n+ Certains sont utilisés partout (avion, voiture, train,\nvélo...), d'autres sont typiques d'une ville ou d'un pays\n(tuk-tuk, gondole...).",
          },
        ],
      },
      {
        number: 3,
        title:
          "Comparer des modes de vie caractéristiques dans quelques espaces très emblématiques : l'adaptation au milieu naturel avec l'exemple des écoliers du monde.",
        rawText:
          "| Séance 3 FFT)\n\nComparer des modes de vie caractéristiques dans\nquelques espaces très emblématiques : l'adaptation au\nmilieu naturel avec l'exemple des écoliers du monde.\n\na Je m'interroge\nL'enseignant-e interroge les élèves :\n\n[Pouvez-vous me raconter où et comment vous vivez ?\n\n| Habitez-vous dans une maison, un appartement ?\n\n{ Avez-vous une chambre à vous ? Comment venez-vous\n| à l'école ? Comment faites-vous vos devoirs ?...\n\n{ Pensez-vous que tous les écoliers dans le monde vivent\ni comme vous ?\n\nOn écoute alors les réponses des uns et des autres. On\npropose ensuite aux élèves de découvrir la vie de plusieurs\nécoliers du monde.\n\nŒ Je recherche\n\nL'enseignant-e distribue aux élèves la fiche documentaire 2.\nCelle-ci présente l'histoire de 6 jeunes écoliers dans le\nmonde ; au verso, il y a un planisphère pour situer les pays\ndont ces enfants sont originaires. Ces portraits sont tirés du\nfilm documentaire et de la série associée Sur le chemin de\nl’école (disponibles en DVD). Les élèves doivent observer et\nlire ce document silencieusement puis compléter la fiche\nélève 3 distribuée dans la foulée.\n\nN. B. : En prolongement de ce travail, l'enseignant-e peut\nproposer aux élèves de regarder le film documentaire Sur\nle chemin de l’école, ou un extrait de la série Les chemins de\nl’école diffusée sur France 5.\n\n2 Je retiens\n\n« ll existe de grandes différences de modes de vie entre\nles écoliers du monde : leur maison, leur trajet pour aller\nà l’école qui peut être parfois très long et dangereux.\n\n« Mais ces enfants ont tous la même envie d'apprendre\net de travailler à l'école pour se construire un avenir\nmeilleur.\n\nModes de vie\n\nDifférentes cultures\n\n400 » Explorer les organisations du monde\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nL'école à l'époque de nos grands-parents\n\ne Comment nos grands-parents allaient-ils à l'école ?\n\nÀ l'époque, quand on habitait à la campagne, il n'y avait pas de bus\net presque pas de voiture alors les enfants allaient à l’école du village\nà pied, hiver comme été. Pour certains élèves, il fallait marcher plus\nd'une heure !\n\ne Est-ce qu'on avait le droit de s'habiller\ncomme on voulait pour aller à l'école ?\n\nNon. Les élèves avaient tous une blouse grise ou\nnoire, pour ne pas voir les tâches d'encre ! Ça faisait\nun peu comme un uniforme, il n‘y avait aucune\ndifférence vestimentaire. Les enfants étaient tous\nà égalité. Même les cartables se ressemblaient :\nils étaient soit en cuir, soit en carton bouilli et il\nfallait les garder jusqu'au CM2... Alors pas\nquestion de les abimer !\n\ne Est-ce que les maîtres ou les maîtresses étaient sévères ?\n\nBeaucoup plus qu'aujourd'hui certainement ! Quand les élèves se\nmettaient en rang pour entrer en classe, il ne fallait faire aucun bruit.\nEt surtout, avant de parler, on devait\ntoujours lever le doigt. Les punitions\naussi étaient sévères. Par exemple, il\nfallait se tenir debout à côté de son\nbanc ou bien encore aller au coin. Il\ny en avait encore de plus sévères\ncomme de se mettre au coin à\ngenoux, et même parfois les genoux\nsur une règle et les mains sur la tête !\nLes élèves se faisaient parfois tirer\nles oreilles et on pouvait leur mettre\nle bonnet d'âne ! Quand on travaillait\nbien, il y avait aussi des récompenses\ncomme des bons points ou des images...\n\ne À quoi les enfants jouaient-ils pendant la récréation ?\n\nOn faisait des rondes, on chantait, on sautait à la corde à sauter ou\nbien on jouait au cerceau, à la marelle, à cache-cache, à chat perché...\nLes garçons jouaient au ballon, aux billes, aux osselets, à saute-\nmouton. Les filles et les garçons ne jouaient pas ensemble ! Il y avait\nl'école des filles et l'école des garçons.\n\nExplorer les organisations du monde « 401\n\nx Vit-on toujours et partout de la même façon ?\n\nFiche documentaire 1\n\nVit-on toujours et partout de la méme fagon ?\n\ne Qu'est-ce que les enfants apprenaient en classe ?\n\nOn faisait surtout de la lecture, de l'écriture et du calcul. Mais on avait\naussi des leçons de grammaire, de la conjugaison, de la géographie\net de l’histoire, des sciences naturelles et de la géométrie. On avait\naussi de la gymnastique, du dessin et du chant. Il y a des choses que\nles élèves faisaient et qui ont disparu comme l'hygiène et la propreté,\nl'économie ménagère, les cours de couture et de tricot pour les filles...\nIl fallait devenir une bonne mère de famille !\n\n© Est-ce qu'il y avait des stylos,\ndes livres ou des cahiers\ncomme aujourd'hui ?\n\nIl n’y avait pas de stylo. On utilisait des porte-plumes. Il fallait tremper\nles plumes dans un petit encrier. Il n’y avait pas de trousse mais un\nplumier en bois sur chaque bureau avec dedans des plumes métalliques\net le porte-plume. On utilisait aussi un crayon gris, parfois aussi des\ncrayons de couleur. On avait une craie blanche pour notre ardoise.\n\nOn écrivait sur un cahier de brouillon puis on mettait nos exercices au\npropre sur le cahier du jour. Il n'y avait pas d'ordinateur ! On était assis à\nun pupitre, par deux, trois ou quatre. Le banc était attaché à la table. Elle\nse soulevait. On pouvait ranger dans notre casier les affaires de classe.\nEn hiver, pour réchauffer la classe, il y avait un poêle dans lequel on\nfaisait bruler du charbon ou du bois. Il y avait un élève responsable.\n\ne Comment se déroulait une semaine d'école ?\n\nLes élèves avaient classe tous les jours de la semaine sauf le jeudi (et le\ndimanche bien sûr). Les grandes vacances commençaient début juillet et\nla classe ne reprenait que le 1\" octobre ! Trois mois de vacances ! Mais,\nà Noël et à Pâques, nous n'avions que trois ou quatre jours de vacances\net seulement deux jours à la Toussaint ! Le 1° mai et le 11 novembre\nétaient fériés comme aujourd'hui.\n\n402 Explorer les organisations du monde © MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement",
        phases: [
          {
            title: "Je m'interroge",
            detail:
              "L'enseignant-e interroge les élèves :\n\n[Pouvez-vous me raconter où et comment vous vivez ?\n\n| Habitez-vous dans une maison, un appartement ?\n\n{ Avez-vous une chambre à vous ? Comment venez-vous\n| à l'école ? Comment faites-vous vos devoirs ?...\n\n{ Pensez-vous que tous les écoliers dans le monde vivent\ni comme vous ?\n\nOn écoute alors les réponses des uns et des autres. On\npropose ensuite aux élèves de découvrir la vie de plusieurs\nécoliers du monde.\n\nŒ",
          },
          {
            title: "Je recherche",
            detail:
              "L'enseignant-e distribue aux élèves la fiche documentaire 2.\nCelle-ci présente l'histoire de 6 jeunes écoliers dans le\nmonde ; au verso, il y a un planisphère pour situer les pays\ndont ces enfants sont originaires. Ces portraits sont tirés du\nfilm documentaire et de la série associée Sur le chemin de\nl’école (disponibles en DVD). Les élèves doivent observer et\nlire ce document silencieusement puis compléter la fiche\nélève 3 distribuée dans la foulée.\n\nN. B. : En prolongement de ce travail, l'enseignant-e peut\nproposer aux élèves de regarder le film documentaire Sur\nle chemin de l’école, ou un extrait de la série Les chemins de\nl’école diffusée sur France 5.\n\n2",
          },
          {
            title: "Je retiens",
            detail:
              "« ll existe de grandes différences de modes de vie entre\nles écoliers du monde : leur maison, leur trajet pour aller\nà l’école qui peut être parfois très long et dangereux.\n\n« Mais ces enfants ont tous la même envie d'apprendre\net de travailler à l'école pour se construire un avenir\nmeilleur.\n\nModes de vie\n\nDifférentes cultures\n\n400 » Explorer les organisations du monde\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nL'école à l'époque de nos grands-parents\n\ne Comment nos grands-parents allaient-ils à l'école ?\n\nÀ l'époque, quand on habitait à la campagne, il n'y avait pas de bus\net presque pas de voiture alors les enfants allaient à l’école du village\nà pied, hiver comme été. Pour certains élèves, il fallait marcher plus\nd'une heure !\n\ne Est-ce qu'on avait le droit de s'habiller\ncomme on voulait pour aller à l'école ?\n\nNon. Les élèves avaient tous une blouse grise ou\nnoire, pour ne pas voir les tâches d'encre ! Ça faisait\nun peu comme un uniforme, il n‘y avait aucune\ndifférence vestimentaire. Les enfants étaient tous\nà égalité. Même les cartables se ressemblaient :\nils étaient soit en cuir, soit en carton bouilli et il\nfallait les garder jusqu'au CM2... Alors pas\nquestion de les abimer !\n\ne Est-ce que les maîtres ou les maîtresses étaient sévères ?\n\nBeaucoup plus qu'aujourd'hui certainement ! Quand les élèves se\nmettaient en rang pour entrer en classe, il ne fallait faire aucun bruit.\nEt surtout, avant de parler, on devait\ntoujours lever le doigt. Les punitions\naussi étaient sévères. Par exemple, il\nfallait se tenir debout à côté de son\nbanc ou bien encore aller au coin. Il\ny en avait encore de plus sévères\ncomme de se mettre au coin à\ngenoux, et même parfois les genoux\nsur une règle et les mains sur la tête !\nLes élèves se faisaient parfois tirer\nles oreilles et on pouvait leur mettre\nle bonnet d'âne ! Quand on travaillait\nbien, il y avait aussi des récompenses\ncomme des bons points ou des images...\n\ne À quoi les enfants jouaient-ils pendant la récréation ?\n\nOn faisait des rondes, on chantait, on sautait à la corde à sauter ou\nbien on jouait au cerceau, à la marelle, à cache-cache, à chat perché...\nLes garçons jouaient au ballon, aux billes, aux osselets, à saute-\nmouton. Les filles et les garçons ne jouaient pas ensemble ! Il y avait\nl'école des filles et l'école des garçons.\n\nExplorer les organisations du monde « 401\n\nx Vit-on toujours et partout de la même façon ?\n\nFiche documentaire 1\n\nVit-on toujours et partout de la méme fagon ?\n\ne Qu'est-ce que les enfants apprenaient en classe ?\n\nOn faisait surtout de la lecture, de l'écriture et du calcul. Mais on avait\naussi des leçons de grammaire, de la conjugaison, de la géographie\net de l’histoire, des sciences naturelles et de la géométrie. On avait\naussi de la gymnastique, du dessin et du chant. Il y a des choses que\nles élèves faisaient et qui ont disparu comme l'hygiène et la propreté,\nl'économie ménagère, les cours de couture et de tricot pour les filles...\nIl fallait devenir une bonne mère de famille !\n\n© Est-ce qu'il y avait des stylos,\ndes livres ou des cahiers\ncomme aujourd'hui ?\n\nIl n’y avait pas de stylo. On utilisait des porte-plumes. Il fallait tremper\nles plumes dans un petit encrier. Il n’y avait pas de trousse mais un\nplumier en bois sur chaque bureau avec dedans des plumes métalliques\net le porte-plume. On utilisait aussi un crayon gris, parfois aussi des\ncrayons de couleur. On avait une craie blanche pour notre ardoise.\n\nOn écrivait sur un cahier de brouillon puis on mettait nos exercices au\npropre sur le cahier du jour. Il n'y avait pas d'ordinateur ! On était assis à\nun pupitre, par deux, trois ou quatre. Le banc était attaché à la table. Elle\nse soulevait. On pouvait ranger dans notre casier les affaires de classe.\nEn hiver, pour réchauffer la classe, il y avait un poêle dans lequel on\nfaisait bruler du charbon ou du bois. Il y avait un élève responsable.\n\ne Comment se déroulait une semaine d'école ?\n\nLes élèves avaient classe tous les jours de la semaine sauf le jeudi (et le\ndimanche bien sûr). Les grandes vacances commençaient début juillet et\nla classe ne reprenait que le 1\" octobre ! Trois mois de vacances ! Mais,\nà Noël et à Pâques, nous n'avions que trois ou quatre jours de vacances\net seulement deux jours à la Toussaint ! Le 1° mai et le 11 novembre\nétaient fériés comme aujourd'hui.\n\n402 Explorer les organisations du monde © MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement",
          },
        ],
      },
    ],
    guideText:
      "( » Objectifs\n\ns'y sont adaptées.\n\n+ Comparer des modes de vie (alimentation, habitat, vêtements, outils, guerre, déplace-\nments...) à différentes époques ou de différentes cultures.\n| + Comparer des modes de vie caractéristiques dans quelques espaces très emblématiques.\n\n> Indications de progression dans le cycle 2 |\nCe dossier concerne les trois niveaux du cycle 2. Au CP, on aborde la comparaison des\nmodes de vie sur deux ou trois générations à travers l'exemple de l’école. Au CE1, on établit\nune comparaison de quelques modes de vie dans des espaces caractéristiques à travers\nle monde avec l'exemple des transports. Enfin, au CE2, on compare des espaces géogra-\nphiques simples à différents endroits du globe pour découvrir comment d'autres sociétés\n\n| Ainsi, en se demandant en quoi chacun participe d'un monde en transformation, l'élève\n\n| prendre qu'il fait partie d’une société organisée évoluant dans un temps et un espace donnés.\n\n|\n| > Matériel\n\n| Le matériel nécessaire est indiqué dans chaque séance. |\n\n|\ndéveloppe progressivement des connaissances et des savoir-faire lui permettant de com- |\n|\n\n Séance 1 JF\"\n\nComparer des modes de vie à différentes époques :\nl'exemple de l'école.\n\nMatériel : un encrier, un porte-plume, un buvard... Tout\nobjet faisant référence à l'école des années 1950-1960.\n\n8 Je m’interroge\n\nL'enseignant-e apporte en classe un encrier ou un porte-\nplume des années 1950-1960 (ou des photos éventuelle-\nment — sur CD-Rom). On le montre aux élèves et on les\ninterroge :\n\n| À votre avis, qu'est-ce que C'est ?\n| À quoi ça sert ?\n\nOn peut attendre des réponses comme : « il y a une plume,\nc'est pour écrire », « on utilisait ça pour écrire avant à\nl’école », « il faut le tremper dans l'encre... »\nL'enseignant-e indique qu'effectivement ce porte-plume\n(ou cet encrier) était utilisé à l'école jusque vers 1965.\nAprès cette date, le stylo à bille (inventé vers 1938) a été\nautorisé pour remplacer les plumes dans les écoles.\n\nOn demande alors aux élèves :\n\nQue connaissez-vous de l'école au temps de vos grands-\nparents, c'est-à-dire quand ils avaient votre âge ?\nOn aura peut être des réponses comme : « les filles n'étaient\npas avec les garçons », « les enfants étaient tous habillés\npareil », « il n'y avait pas de cantine. »\nL'enseignant-e propose alors aux élèves de mieux connaître\ncette période, il y a 60 ans environ.\n\nŒ Je recherche\n\nL'enseignant-e distribue la fiche élève 1. Les élèves tra-\nvaillent individuellement.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nOn pourra pour prolonger ce travail en classe demander aux\nélèves d'interroger leurs grands-parents en leur demandant\ndes renseignements sur leur vie d'écolier : « Comment\nallaient-ils à l'école ? », « Où mangeaient-ils le midi ? »,\n« À quoi jouaient-ils à la récréation ? », « Comment\nétaient-ils habillés ? », « Ont-ils gardé des cahiers d'éco-\nlier ou d'autres objets ? », etc. Les réponses, écrites par les\nadultes interrogés, seront lues en classe par l'enseignant-e.\nCe travail peut alors déboucher sur une exposition autour\nde l'école au temps des grands-parents.\n\n2 Je retiens\n\n* À l'époque de nos grands-parents, dans les années 1950-\n1960, l'école était différente de celle d'aujourd'hui.\n\n* Les élèves allaient souvent à l'école à pied, écrivaient\navec de l'encre et un porte-plume. Ils portaient tous\nune blouse, Les garçons et les filles n'étaient pas dans\nla même classe.\n\n«Mais comme aujourd'hui, on y apprenait à lire, à\nécrire, à compter...\n\n Séance 2 JPY\n\nComparer des modes de vie caractéristiques dans\nquelques espaces très emblématiques : l'exemple des\ntransports.\n\nMatériel : images de différents moyens de transport à\nimprimer pour le jeu de devinettes, un planisphère et/ou\nune carte de l'Europe (— sur CD-Rom). L'album Le Loup\nqui voulait faire le tour du monde, d'Orianne Lallemand et\nÉléonore Thuillier, aux éditions Auzou.\n\nExplorer les organisations du monde « 399\n\n “ 2) Vit-on toujours et partout de la même façon ?\n\nFiche enseignant\n\n@ Je m'interroge\n\nL'enseignant-e lit aux élèves l'album Le loup qui voulait faire\nle tour du monde, d'Orianne Lallemand et Éléonore Thuiller.\nOn propose ensuite aux élèves de lister les moyens de\ntransport qu'ils connaissent et que l'on utilise en France\nou dans les autres pays de notre continent, l'Europe (on\nmontre ce continent sur un planisphère).\n\nL'enseignant-e écrit au tableau chaque proposition et\naffiche ou projette les images correspondantes (— sur\nCD-Rom, à imprimer et plastifier eventuellement).\n\nOn demande ensuite :\n\n| À votre avis, est-ce la même chose dans d'autres pays\n| du monde, sur d'autres continents ?\n\nCertains élèves peuvent apporter des réponses parce qu'ils\nont voyagé, qu'ils ont de la famille dans un autre pays ou\nencore qu'ils ont pu voir différents documentaires à la\ntélévision.\n\nL'enseignant-e propose alors de chercher à en savoir un peu\nplus sur cette question des transports.\n\nJe recherche\n\nOn peut mener cette recherche à partir de la fiche élève 2.\nCelle-ci propose aux élèves de retrouver de nombreux\nmoyens de transport utilisés dans le monde, d'en apprendre\ndavantage sur leur utilisation puis de les situer sur un pla-\nnisphère (— sur CD-Rom).\n\nA la fin de la séance, les éléves pourront coller le planis-\nphere au centre d'une feuille A3 puis coller quelques-uns\ndes moyens de transport présentés en les reliant à leur pays\nd'origine.\n\nIl est également possible de mettre en place un jeu de devi-\nnettes à partir des images disponibles sur le CD-Rom : il\ns'agit de relier des images avec les textes qui vont avec.\nLes élèves doivent donc reformer les paires : par exemple,\nbus à impériale et Londres (Angleterre), gondole et Venise\n(Italie), etc.\n\nRemarque : Si votre classe est équipée de plusieurs ordi-\nnateurs, vous pouvez leur proposer de faire une recherche\nsur Internet. Les élèves sont alors placés par groupes de 4.\nChaque groupe choisit de concentrer ses recherches sur un\ncontinent : Amérique — Afrique — Asie — Europe — Océanie.\nOn cherche collectivement les mots-clés à écrire dans le\nmoteur de recherche ; par exemple « se déplacer en... »,\nou « moyens de transport en... ». Une fiche Word (— sur\nCD-Rom) peut servir de support à ces recherches.\n\nMots à retenir\n\nDifférentes époques\n\n#2 Je retiens\n\n« Il existe de très nombreux moyens de transport dans\nle monde.\n\n+ Certains sont utilisés partout (avion, voiture, train,\nvélo...), d'autres sont typiques d'une ville ou d'un pays\n(tuk-tuk, gondole...).\n\n| Séance 3 FFT)\n\nComparer des modes de vie caractéristiques dans\nquelques espaces très emblématiques : l'adaptation au\nmilieu naturel avec l'exemple des écoliers du monde.\n\na Je m'interroge\nL'enseignant-e interroge les élèves :\n\n[Pouvez-vous me raconter où et comment vous vivez ?\n\n| Habitez-vous dans une maison, un appartement ?\n\n{ Avez-vous une chambre à vous ? Comment venez-vous\n| à l'école ? Comment faites-vous vos devoirs ?...\n\n{ Pensez-vous que tous les écoliers dans le monde vivent\ni comme vous ?\n\nOn écoute alors les réponses des uns et des autres. On\npropose ensuite aux élèves de découvrir la vie de plusieurs\nécoliers du monde.\n\nŒ Je recherche\n\nL'enseignant-e distribue aux élèves la fiche documentaire 2.\nCelle-ci présente l'histoire de 6 jeunes écoliers dans le\nmonde ; au verso, il y a un planisphère pour situer les pays\ndont ces enfants sont originaires. Ces portraits sont tirés du\nfilm documentaire et de la série associée Sur le chemin de\nl’école (disponibles en DVD). Les élèves doivent observer et\nlire ce document silencieusement puis compléter la fiche\nélève 3 distribuée dans la foulée.\n\nN. B. : En prolongement de ce travail, l'enseignant-e peut\nproposer aux élèves de regarder le film documentaire Sur\nle chemin de l’école, ou un extrait de la série Les chemins de\nl’école diffusée sur France 5.\n\n2 Je retiens\n\n« ll existe de grandes différences de modes de vie entre\nles écoliers du monde : leur maison, leur trajet pour aller\nà l’école qui peut être parfois très long et dangereux.\n\n« Mais ces enfants ont tous la même envie d'apprendre\net de travailler à l'école pour se construire un avenir\nmeilleur.\n\nModes de vie\n\nDifférentes cultures\n\n400 » Explorer les organisations du monde\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\n© MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement.\n\nL'école à l'époque de nos grands-parents\n\ne Comment nos grands-parents allaient-ils à l'école ?\n\nÀ l'époque, quand on habitait à la campagne, il n'y avait pas de bus\net presque pas de voiture alors les enfants allaient à l’école du village\nà pied, hiver comme été. Pour certains élèves, il fallait marcher plus\nd'une heure !\n\ne Est-ce qu'on avait le droit de s'habiller\ncomme on voulait pour aller à l'école ?\n\nNon. Les élèves avaient tous une blouse grise ou\nnoire, pour ne pas voir les tâches d'encre ! Ça faisait\nun peu comme un uniforme, il n‘y avait aucune\ndifférence vestimentaire. Les enfants étaient tous\nà égalité. Même les cartables se ressemblaient :\nils étaient soit en cuir, soit en carton bouilli et il\nfallait les garder jusqu'au CM2... Alors pas\nquestion de les abimer !\n\ne Est-ce que les maîtres ou les maîtresses étaient sévères ?\n\nBeaucoup plus qu'aujourd'hui certainement ! Quand les élèves se\nmettaient en rang pour entrer en classe, il ne fallait faire aucun bruit.\nEt surtout, avant de parler, on devait\ntoujours lever le doigt. Les punitions\naussi étaient sévères. Par exemple, il\nfallait se tenir debout à côté de son\nbanc ou bien encore aller au coin. Il\ny en avait encore de plus sévères\ncomme de se mettre au coin à\ngenoux, et même parfois les genoux\nsur une règle et les mains sur la tête !\nLes élèves se faisaient parfois tirer\nles oreilles et on pouvait leur mettre\nle bonnet d'âne ! Quand on travaillait\nbien, il y avait aussi des récompenses\ncomme des bons points ou des images...\n\ne À quoi les enfants jouaient-ils pendant la récréation ?\n\nOn faisait des rondes, on chantait, on sautait à la corde à sauter ou\nbien on jouait au cerceau, à la marelle, à cache-cache, à chat perché...\nLes garçons jouaient au ballon, aux billes, aux osselets, à saute-\nmouton. Les filles et les garçons ne jouaient pas ensemble ! Il y avait\nl'école des filles et l'école des garçons.\n\nExplorer les organisations du monde « 401\n\nx Vit-on toujours et partout de la même façon ?\n\nFiche documentaire 1\n\nVit-on toujours et partout de la méme fagon ?\n\ne Qu'est-ce que les enfants apprenaient en classe ?\n\nOn faisait surtout de la lecture, de l'écriture et du calcul. Mais on avait\naussi des leçons de grammaire, de la conjugaison, de la géographie\net de l’histoire, des sciences naturelles et de la géométrie. On avait\naussi de la gymnastique, du dessin et du chant. Il y a des choses que\nles élèves faisaient et qui ont disparu comme l'hygiène et la propreté,\nl'économie ménagère, les cours de couture et de tricot pour les filles...\nIl fallait devenir une bonne mère de famille !\n\n© Est-ce qu'il y avait des stylos,\ndes livres ou des cahiers\ncomme aujourd'hui ?\n\nIl n’y avait pas de stylo. On utilisait des porte-plumes. Il fallait tremper\nles plumes dans un petit encrier. Il n’y avait pas de trousse mais un\nplumier en bois sur chaque bureau avec dedans des plumes métalliques\net le porte-plume. On utilisait aussi un crayon gris, parfois aussi des\ncrayons de couleur. On avait une craie blanche pour notre ardoise.\n\nOn écrivait sur un cahier de brouillon puis on mettait nos exercices au\npropre sur le cahier du jour. Il n'y avait pas d'ordinateur ! On était assis à\nun pupitre, par deux, trois ou quatre. Le banc était attaché à la table. Elle\nse soulevait. On pouvait ranger dans notre casier les affaires de classe.\nEn hiver, pour réchauffer la classe, il y avait un poêle dans lequel on\nfaisait bruler du charbon ou du bois. Il y avait un élève responsable.\n\ne Comment se déroulait une semaine d'école ?\n\nLes élèves avaient classe tous les jours de la semaine sauf le jeudi (et le\ndimanche bien sûr). Les grandes vacances commençaient début juillet et\nla classe ne reprenait que le 1\" octobre ! Trois mois de vacances ! Mais,\nà Noël et à Pâques, nous n'avions que trois ou quatre jours de vacances\net seulement deux jours à la Toussaint ! Le 1° mai et le 11 novembre\nétaient fériés comme aujourd'hui.\n\n402 Explorer les organisations du monde © MDI / SEJER, 2017. Reproduction autorisée pour une classe seulement",
    guidePageDecisions: [
      {
        page: 399,
        confidence: 92,
        score: 24,
        included: true,
        strongMarkers: [
          "objectifs",
          "indications de progression",
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "en classe",
        ],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: ["enseignant", "eleves", "on demande", "en classe"],
        studentLike: false,
      },
      {
        page: 400,
        confidence: 93,
        score: 22,
        included: true,
        strongMarkers: [
          "seance",
          "l'enseignant",
          "enseignant-e",
          "les eleves",
          "aux eleves",
          "par groupes",
        ],
        phaseMarkers: ["je m'interroge", "je recherche", "je retiens"],
        teacherLanguageMarkers: [
          "enseignant",
          "eleves",
          "on demande",
          "on propose",
          "par groupes",
          "groupe",
        ],
        studentLike: true,
      },
      {
        page: 401,
        confidence: 93,
        score: 6,
        included: true,
        strongMarkers: ["les eleves", "en classe"],
        phaseMarkers: [],
        teacherLanguageMarkers: ["eleves", "en classe"],
        studentLike: false,
      },
      {
        page: 402,
        confidence: 94,
        score: 6,
        included: true,
        strongMarkers: ["les eleves", "en classe"],
        phaseMarkers: [],
        teacherLanguageMarkers: ["eleves", "en classe"],
        studentLike: false,
      },
    ],
    skippedProbePages: [],
    uncertainPages: [],
    coverageNote:
      "Extraction limitée au guide enseignant. Les fiches élève et évaluations du PDF n'ont pas été intégrées.",
  },
] as const satisfies readonly ImportedQlmGuideDossier[];
