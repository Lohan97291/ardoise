export type QlmMdiGuideProgrammingSession = {
  id: string;
  number: number;
  title: string;
};

export type QlmMdiGuideProgrammingSequence = {
  id: string;
  dossierNumber: number;
  title: string;
  guidePages: number[];
  sessionCount: number;
  sessions: QlmMdiGuideProgrammingSession[];
};

export type QlmMdiGuideProgrammingPart = {
  partNumber: number;
  partTitle: string;
  sequences: QlmMdiGuideProgrammingSequence[];
};

export const qlmMdiGuideProgramming = [
  {
    partNumber: 1,
    partTitle: "Qu'est-ce que la matière ?",
    sequences: [
      {
        id: "qlm-mdi-dossier-01",
        dossierNumber: 1,
        title: "Solide ou liquide ?",
        guidePages: [11, 12],
        sessionCount: 2,
        sessions: [
          {
            id: "qlm-mdi-dossier-01-session-1",
            number: 1,
            title:
              "Identifier deux états de la matière : solide et liquide. Je n° interroge Il s’agit dans cette première séance de pouvoir caractéri-",
          },
          {
            id: "qlm-mdi-dossier-01-session-2",
            number: 2,
            title: "Connaitre quelques propriétés des solides et des liquides.",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-02",
        dossierNumber: 2,
        title: "De l'eau dans la nature : sous quelles formes ?",
        guidePages: [19],
        sessionCount: 1,
        sessions: [
          {
            id: "qlm-mdi-dossier-02-session-1",
            number: 1,
            title:
              "Reconnaitre les états de l’eau (liquide, solide) et leur manifestation dans divers phénomènes météorolo- giques naturels (nuages, pluie, neige, grêle, glace...).",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-03",
        dossierNumber: 3,
        title: "L'eau peut-elle changer d'état ?",
        guidePages: [27, 28, 29],
        sessionCount: 3,
        sessions: [
          {
            id: "qlm-mdi-dossier-03-session-1",
            number: 1,
            title:
              "Mettre en œuvre des expériences simples pour illustrer les changements d'états de l'eau : la solidification.",
          },
          {
            id: "qlm-mdi-dossier-03-session-2",
            number: 2,
            title:
              "Mettre en œuvre des expériences simples pour illustrer les changements d'états de l'eau : la fusion.",
          },
          {
            id: "qlm-mdi-dossier-03-session-1",
            number: 1,
            title:
              "deux bacs à glaçons identiques. L'enseignant-e rappelle que l'eau passe de l'état liquide à l'état solide (solidification) si la température est inférieure",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-04",
        dossierNumber: 4,
        title: "L'air, une matière ?",
        guidePages: [41, 42, 43],
        sessionCount: 2,
        sessions: [
          {
            id: "qlm-mdi-dossier-04-session-2",
            number: 2,
            title:
              "Mettre en œuvre des expériences simples impliquant l'air : mettre en mouvement un objet avec de l'air, avec du vent.",
          },
          {
            id: "qlm-mdi-dossier-04-session-3",
            number: 3,
            title: "Connaitre quelques propriétés de l'air (matérialité).",
          },
        ],
      },
    ],
  },
  {
    partNumber: 2,
    partTitle: "Comment reconnaître le monde vivant ?",
    sequences: [
      {
        id: "qlm-mdi-dossier-05",
        dossierNumber: 5,
        title: "Animal, végétal ou minéral ?",
        guidePages: [59],
        sessionCount: 1,
        sessions: [
          {
            id: "qlm-mdi-dossier-05-session-1",
            number: 1,
            title: "Séance 1 [À VÉRIFIER]",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-06",
        dossierNumber: 6,
        title: "Les végétaux, ça vit et grandit comment ?",
        guidePages: [69, 70],
        sessionCount: 3,
        sessions: [
          {
            id: "qlm-mdi-dossier-06-session-1",
            number: 1,
            title:
              "Connaître le processus de germination d'une graine en mettant en évidence son besoin en eau.",
          },
          {
            id: "qlm-mdi-dossier-06-session-2",
            number: 2,
            title:
              "Être capable de conduire une culture en identifiant quelques besoins vitaux des végétaux. Je m' interroge",
          },
          {
            id: "qlm-mdi-dossier-06-session-3",
            number: 3,
            title:
              "Construire le cycle de vie d'un végétal (de la graine à la plante, de la fleur au fruit, du fruit à la graine). N.B. : Cette séance, après un premier temps de mise en",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-07",
        dossierNumber: 7,
        title: "Les animaux, ça vit et grandit comment ?",
        guidePages: [83, 84, 85],
        sessionCount: 2,
        sessions: [
          {
            id: "qlm-mdi-dossier-07-session-1",
            number: 1,
            title:
              "Réaliser un élevage en classe : l'exemple des phasmes mise en place du vivarium). N.B. : Cette séance peut être conduite indifféremment avec",
          },
          {
            id: "qlm-mdi-dossier-07-session-2",
            number: 2,
            title:
              "Réaliser un élevage en classe : l'exemple des phasmes observations de l'élevage en fil rouge sur une année scolaire).",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-08",
        dossierNumber: 8,
        title: "Comment vivent les êtres vivants ensemble ?",
        guidePages: [99, 100],
        sessionCount: 2,
        sessions: [
          {
            id: "qlm-mdi-dossier-08-session-1",
            number: 1,
            title:
              "Observer les végétaux et les animaux dans un milieu proche au fil des saisons. Constater la diversité des êtres vivants présents dans",
          },
          {
            id: "qlm-mdi-dossier-08-session-2",
            number: 2,
            title:
              "Connaitre les régimes alimentaires de quelques animaux. Prendre conscience que les animaux dépendent des plantes pour se nourrir (notion de chaine alimentaire).",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-09",
        dossierNumber: 9,
        title: "Quel avenir pour nos déchets ?",
        guidePages: [111, 112, 113],
        sessionCount: 2,
        sessions: [
          {
            id: "qlm-mdi-dossier-09-session-1",
            number: 1,
            title:
              "Identifier quelques interactions dans l’école : l'exemple des déchets de papier et de plastique.",
          },
          {
            id: "qlm-mdi-dossier-09-session-4",
            number: 4,
            title:
              "Adopter une attitude citoyenne dans la vie courante. N.B. : Cette séance peut être menée indifféremment à chaque année du cycle.",
          },
        ],
      },
    ],
  },
  {
    partNumber: 3,
    partTitle: "Quels sont les comportements favorables à la santé ?",
    sequences: [
      {
        id: "qlm-mdi-dossier-10",
        dossierNumber: 10,
        title: "Comment mon corps peut-il bouger ?",
        guidePages: [129, 130],
        sessionCount: 1,
        sessions: [
          {
            id: "qlm-mdi-dossier-10-session-2",
            number: 2,
            title:
              "trombones, attaches parisiennes, ballons de baudruche. Fiche enseignant Ba Séance 1",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-11",
        dossierNumber: 11,
        title: "Comment voir que je grandis ?",
        guidePages: [139, 140, 141],
        sessionCount: 3,
        sessions: [
          {
            id: "qlm-mdi-dossier-11-session-1",
            number: 1,
            title:
              "Observer la croissance de son corps (taille, masse, poin- ture) et les changements morphologiques. Matériel : les photos de classe de maternelle de cette",
          },
          {
            id: "qlm-mdi-dossier-11-session-2",
            number: 2,
            title:
              "Mesurer la croissance de son corps (taille, masse, pointure). Matériel : une toise, un pèse-personne, un pédimètre si",
          },
          {
            id: "qlm-mdi-dossier-11-session-3",
            number: 3,
            title:
              "Savoir lire et se repérer sur une courbe de croissance dans le carnet de santé. Matériel : une courbe de croissance d'un élève de 0 à 3 ans",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-12",
        dossierNumber: 12,
        title: "Pourquoi les aliments sont-ils variés ?",
        guidePages: [155, 156],
        sessionCount: 3,
        sessions: [
          {
            id: "qlm-mdi-dossier-12-session-1",
            number: 1,
            title: "Constater la variété des aliments, connaître les catégo- ries d'aliments.",
          },
          {
            id: "qlm-mdi-dossier-12-session-2",
            number: 2,
            title: "Identifier l'origine des aliments.",
          },
          {
            id: "qlm-mdi-dossier-12-session-3",
            number: 3,
            title: "Comprendre l'importance de la variété alimentaire dans les repas.",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-13",
        dossierNumber: 13,
        title: "Qu'apportent les aliments à mon corps ?",
        guidePages: [167, 168],
        sessionCount: 1,
        sessions: [
          {
            id: "qlm-mdi-dossier-13-session-2",
            number: 2,
            title:
              "Identifier les effets d'une alimentation déséquilibrée. Bem interroge L'enseignant-e demande aux élèves de se remémorer ce qui",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-14",
        dossierNumber: 14,
        title: "Que faire pour rester en forme ?",
        guidePages: [177, 178, 179],
        sessionCount: 3,
        sessions: [
          {
            id: "qlm-mdi-dossier-14-session-1",
            number: 1,
            title:
              "Prendre des habitudes quotidiennes de propreté : mettre en œuvre des règles d'hygiène de vie (se laver le corps, se laver les mains, se brosser les dents).",
          },
          {
            id: "qlm-mdi-dossier-14-session-3",
            number: 3,
            title:
              "Prendre conscience des effets positifs d'une pratique physique régulière sur l'organisme.",
          },
          {
            id: "qlm-mdi-dossier-14-session-5",
            number: 5,
            title:
              "Mettre en relation son âge et ses besoins en som- meil. Comparer ces besoins avec la réalité individuelle. Identifier les conséquences du manque de sommeil.",
          },
        ],
      },
    ],
  },
  {
    partNumber: 4,
    partTitle: "Les objets techniques, qu'est-ce que c'est ?",
    sequences: [
      {
        id: "qlm-mdi-dossier-15",
        dossierNumber: 15,
        title: "Les objets techniques, pour quoi faire ?",
        guidePages: [199, 200],
        sessionCount: 2,
        sessions: [
          {
            id: "qlm-mdi-dossier-15-session-1",
            number: 1,
            title:
              "Observer et utiliser des objets techniques afin d'identi- fier leur fonction. Comparer des objets techniques utilisés dans la vie quo-",
          },
          {
            id: "qlm-mdi-dossier-15-session-2",
            number: 2,
            title: "Associer des objets techniques à une activité de la vie quotidienne.",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-16",
        dossierNumber: 16,
        title: "Un circuit électrique, comment ça marche ?",
        guidePages: [209, 210, 211],
        sessionCount: 3,
        sessions: [
          {
            id: "qlm-mdi-dossier-16-session-1",
            number: 1,
            title:
              "Observer un circuit électrique permettant d'assurer la fonction d'éclairer. Connaitre le rôle de l'interrupteur (ON/OFF).",
          },
          {
            id: "qlm-mdi-dossier-16-session-2",
            number: 2,
            title:
              "Analyser le fonctionnement d'un objet de la vie quoti- dienne : une lampe de poche. Différencier générateur, récepteur.",
          },
          {
            id: "qlm-mdi-dossier-16-session-3",
            number: 3,
            title:
              "Réaliser quelques circuits électriques simples utilisant des lampes ou des petits moteurs. N. B. : Le dossier 18 consacré aux « défis techno » propose",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-17",
        dossierNumber: 17,
        title: "L'électricité : quels usages, quels dangers ?",
        guidePages: [227, 228],
        sessionCount: 1,
        sessions: [
          {
            id: "qlm-mdi-dossier-17-session-1",
            number: 1,
            title:
              "Avoir des notions sur la sécurité dans l'usage de l'électri- cité au quotidien et savoir que le passage de l'électricité dans le corps humain présente des dangers qui peuvent",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-18",
        dossierNumber: 18,
        title: "Prêt(e) pour le défi techno ?",
        guidePages: [237, 238, 239],
        sessionCount: 4,
        sessions: [
          {
            id: "qlm-mdi-dossier-18-session-1",
            number: 1,
            title:
              "Suivre la notice d'assemblage d'un objet technique à utiliser : réaliser un véhicule qui avance grâce à l'air. Matériel : bouchons de bouteille, en plastique, en liège, pics",
          },
          {
            id: "qlm-mdi-dossier-18-session-2",
            number: 2,
            title:
              "Réaliser un objet technique par association d'éléments existants en suivant un schéma de montage : un quizz électrique.",
          },
          {
            id: "qlm-mdi-dossier-18-session-3",
            number: 3,
            title:
              "Réaliser un objet technique par association d'éléments existants en suivant un schéma de montage : un jeu d'adresse électrique.",
          },
          {
            id: "qlm-mdi-dossier-18-session-2",
            number: 2,
            title:
              "trique à réaliser au CE2 : quizz ou jeu d'adresse. Mots à retenir Objet technique",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-19",
        dossierNumber: 19,
        title: "Que peut-on faire avec un ordinateur ?",
        guidePages: [245, 246],
        sessionCount: 2,
        sessions: [
          {
            id: "qlm-mdi-dossier-19-session-1",
            number: 1,
            title:
              "Décrire l'architecture simple d'un dispositif informatique. Découvrir les différents éléments de saisie d’un disposi- tif informatique (clavier, souris, outils de prise de vues).",
          },
          {
            id: "qlm-mdi-dossier-19-session-2",
            number: 2,
            title:
              "Mettre en ceuvre des dispositifs informatiques inté- grés de type tablettes et récupérer les données par synchronisation.",
          },
        ],
      },
    ],
  },
  {
    partNumber: 5,
    partTitle: "Se situer dans l'espace",
    sequences: [
      {
        id: "qlm-mdi-dossier-20",
        dossierNumber: 20,
        title: "Comment me repérer dans la classe, l'école ?",
        guidePages: [257, 258, 259],
        sessionCount: 4,
        sessions: [
          {
            id: "qlm-mdi-dossier-20-session-1",
            number: 1,
            title:
              "Savoir se repérer dans son environnement proche. Situer des objets ou des personnes les uns par rapport aux autres ou par rapport à d'autres repères.",
          },
          {
            id: "qlm-mdi-dossier-20-session-2",
            number: 2,
            title:
              "Étudier quelques modes de représentation de l’espace environnant : la maquette de la classe. Matériel : des boites à chaussures ou une feuille en papier",
          },
          {
            id: "qlm-mdi-dossier-20-session-3",
            number: 3,
            title:
              "Étudier quelques modes de représentation de l'espace environnant : le plan de la classe. Matériel : photographies de la séance 2, appareil photo.",
          },
          {
            id: "qlm-mdi-dossier-20-session-4",
            number: 4,
            title:
              "Savoir se repérer dans son environnement proche : l'école. Étudier quelques modes de représentation de l'espace",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-21",
        dossierNumber: 21,
        title: "Comment me repérer sur une carte ?",
        guidePages: [271, 272],
        sessionCount: 1,
        sessions: [
          {
            id: "qlm-mdi-dossier-21-session-2",
            number: 2,
            title: "Savoir utiliser une boussole.",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-22",
        dossierNumber: 22,
        title: "Où est-ce que j'habite sur Terre ?",
        guidePages: [279, 280],
        sessionCount: 2,
        sessions: [
          {
            id: "qlm-mdi-dossier-22-session-1",
            number: 1,
            title:
              "les élèves : Pouvez-vous situer sur ce planisphère l'endroit, le lieu ville ou village) où vous habitez ?",
          },
          {
            id: "qlm-mdi-dossier-22-session-3",
            number: 3,
            title:
              "Situer et repérer les espaces étudiés sur une carte ou un globe (les continents, les mers et les océans).",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-23",
        dossierNumber: 23,
        title: "Où est la Terre dans le système solaire ?",
        guidePages: [289, 290],
        sessionCount: 2,
        sessions: [
          {
            id: "qlm-mdi-dossier-23-session-2",
            number: 2,
            title:
              "Savoir que la Terre tourne sur elle-même en 24 heures ; comprendre l'alternance jour/nuit. Matériel : boule en polystyrène traversée par une aiguille",
          },
          {
            id: "qlm-mdi-dossier-23-session-3",
            number: 3,
            title:
              "Savoir que la Terre tourne autour du Soleil en 365 jours. Appréhender la succession des saisons.",
          },
        ],
      },
    ],
  },
  {
    partNumber: 6,
    partTitle: "Se situer dans le temps",
    sequences: [
      {
        id: "qlm-mdi-dossier-24",
        dossierNumber: 24,
        title: "Comment me repérer dans le temps ?",
        guidePages: [305, 306, 307],
        sessionCount: 3,
        sessions: [
          {
            id: "qlm-mdi-dossier-24-session-1",
            number: 1,
            title:
              "Identifier les rythmes cycliques du temps : les jours et | L'enseignant-e poursuit : les semaines. Matériel : roue des jours de la semaine (— sur CD-Rom)",
          },
          {
            id: "qlm-mdi-dossier-24-session-2",
            number: 2,
            title:
              "Identifier les rythmes cycliques du temps : les mois, les saisons, l'année. Matériel : plusieurs calendriers différents.",
          },
          {
            id: "qlm-mdi-dossier-24-session-3",
            number: 3,
            title:
              "Savoir que la journée est divisée en heures. Savoir lire l'heure. Matériel : horloge à aiguilles sur fiches à découper (— sur —",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-25",
        dossierNumber: 25,
        title: "Avant, après ou pendant ?",
        guidePages: [319, 320],
        sessionCount: 2,
        sessions: [
          {
            id: "qlm-mdi-dossier-25-session-2",
            number: 2,
            title:
              "Situer des évènements les uns par rapport aux autres dans un mois, une année. Matériel : calendriers, feuilles A4 avec les mois de l'année.",
          },
          {
            id: "qlm-mdi-dossier-25-session-3",
            number: 3,
            title:
              "Situer des évènements les uns par rapport aux autres dans un récit. Matériel : Album La récré est toujours trop courte ! d'Élodie",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-26",
        dossierNumber: 26,
        title: "Comment mesurer le temps ?",
        guidePages: [333, 334],
        sessionCount: 1,
        sessions: [
          {
            id: "qlm-mdi-dossier-26-session-1",
            number: 1,
            title: "Séance 1 [À VÉRIFIER]",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-27",
        dossierNumber: 27,
        title: "Comment situer ma vie dans le temps ?",
        guidePages: [341, 342],
        sessionCount: 1,
        sessions: [
          {
            id: "qlm-mdi-dossier-27-session-2",
            number: 2,
            title:
              "Repérer et situer des évènements du temps des parents sur une frise chronologique.",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-28",
        dossierNumber: 28,
        title: "Quels sont les grands repères de l'Histoire ?",
        guidePages: [351, 352],
        sessionCount: 1,
        sessions: [
          {
            id: "qlm-mdi-dossier-28-session-1",
            number: 1,
            title: "Séance 1 [À VÉRIFIER]",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-29",
        dossierNumber: 29,
        title: "Comment vivait-on dans un passé lointain ?",
        guidePages: [359, 360],
        sessionCount: 1,
        sessions: [
          {
            id: "qlm-mdi-dossier-29-session-1",
            number: 1,
            title: "Séance 1 [À VÉRIFIER]",
          },
        ],
      },
    ],
  },
  {
    partNumber: 7,
    partTitle: "Explorer les organisations du monde",
    sequences: [
      {
        id: "qlm-mdi-dossier-30",
        dossierNumber: 30,
        title: "Quels sont les principaux types de paysages ?",
        guidePages: [371, 372],
        sessionCount: 1,
        sessions: [
          {
            id: "qlm-mdi-dossier-30-session-1",
            number: 1,
            title:
              "Reconnaitre les principaux paysages francais. Identifier leurs caractéristiques. Matériel : photographies de paysages (— sur CD-Rom).",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-31",
        dossierNumber: 31,
        title: "Comment les espaces sont-ils organisés ?",
        guidePages: [387, 388],
        sessionCount: 3,
        sessions: [
          {
            id: "qlm-mdi-dossier-31-session-1",
            number: 1,
            title:
              "Découvrir un quartier et un village : leurs principaux espaces, leurs principales fonctions. Matériel : photographies (— sur CD-Rom) d'un village de",
          },
          {
            id: "qlm-mdi-dossier-31-session-2",
            number: 2,
            title:
              "Découvrir le quartier, le village, la ville : les rôles de cer- tains acteurs urbains. Matériel : photographies (— sur CD-Rom) sur les différents",
          },
          {
            id: "qlm-mdi-dossier-31-session-3",
            number: 3,
            title:
              "Découvrir les principales villes de France. Matériel : carte de France, photos des monuments/sites des principales villes de France (— sur CD-Rom).",
          },
        ],
      },
      {
        id: "qlm-mdi-dossier-32",
        dossierNumber: 32,
        title: "Vit-on toujours et partout de la même façon ?",
        guidePages: [399, 400, 401, 402],
        sessionCount: 3,
        sessions: [
          {
            id: "qlm-mdi-dossier-32-session-1",
            number: 1,
            title:
              "Comparer des modes de vie à différentes époques : l'exemple de l'école. Matériel : un encrier, un porte-plume, un buvard... Tout",
          },
          {
            id: "qlm-mdi-dossier-32-session-2",
            number: 2,
            title:
              "Comparer des modes de vie caractéristiques dans quelques espaces très emblématiques : l'exemple des transports.",
          },
          {
            id: "qlm-mdi-dossier-32-session-3",
            number: 3,
            title:
              "Comparer des modes de vie caractéristiques dans quelques espaces très emblématiques : l'adaptation au milieu naturel avec l'exemple des écoliers du monde.",
          },
        ],
      },
    ],
  },
] as const satisfies readonly QlmMdiGuideProgrammingPart[];
