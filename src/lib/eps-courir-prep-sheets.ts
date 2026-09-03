/**
 * Fiches de préparation — EPS · Courir (cycle 2)
 *
 * Source : ACCÈS « Vivre l'EPS 6 à 8 ans » — Domaine de la performance mesurée, course.
 * Unité d'apprentissage : entrée, diagnostic, courir vite (signal / ligne droite),
 * franchir des obstacles, courir régulièrement, courir longtemps.
 */
import type { PrepSheet } from "@/lib/ardoise-data";

const SOCLE_EPS = [
  "D1 · Les langages pour penser et communiquer",
  "D2 · Les méthodes et outils pour apprendre",
  "D4 · Les systèmes naturels et les systèmes techniques",
];
const COMPETENCE = "Réaliser une performance mesurée (courir vite, franchir, courir longtemps).";
const DISCIPLINARY = ["Athlétisme — course (domaine de la performance mesurée)"];
const IMG = (name: string) => `/cahier/eps/${name}`;

export const EPS_COURIR_PREP_SHEETS: PrepSheet[] = [
  {
    id: "eps-courir-entree",
    title: "Courir — Entrée dans l'activité",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Entrer dans l'activité course par des jeux variés : moduler son allure, réagir à un signal, courir en respectant une consigne.",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "8 min",
        detail: "Déplacements variés (trottiner, accélérer, s'arrêter au signal), réveil articulaire.",
      },
      {
        title: "Jeux de course (au choix, 2 à 3)",
        duration: "30 min",
        detail:
          "1. « La formule un » : circuit partagé en zones de couleurs = vitesses (lente, rapide, maximale) ; je cours selon la couleur. 2. « Les planètes » : je décris une orbite autour du soleil (centre) ; au signal je rejoins le centre le plus vite possible. 3. « Les chenilles » : courir en colonne en suivant le premier ; au signal, le dernier passe en tête. 4. « La course en huit » : lentement sur la grande boucle, très vite sur la petite. 5. « Le trèfle à quatre feuilles » : une vitesse par feuille. 6. « Un peu d'écriture » : courir en écrivant son prénom / nom. 7. « Un peu de dessin » : courir en dessinant une forme. 8. « Je cours en franchissant des obstacles » (parcours aménagé). 9. « Je cours avec le maître en milieu naturel » (footing).",
        differentiation: "Choisir des jeux moins/plus exigeants selon le groupe ; adapter la durée.",
      },
      {
        title: "Retour au calme et bilan",
        duration: "7 min",
        detail: "Verbaliser : ai-je su changer d'allure ? réagir au signal ? respecter la consigne ?",
      },
    ],
    material: ["Plots, cônes", "Cerceaux, dossards", "Fanions de couleurs"],
    photocopies: [],
    notes: ["Comportements observés : l'enfant s'engage-t-il dans le jeu ? respecte-t-il les consignes ? module-t-il son allure ?"],
    illustrations: [{ src: IMG("courir-entree.jpg"), caption: "Courir — entrée dans l'activité" }],
  },

  {
    id: "eps-courir-diagnostic",
    title: "Courir — Situations diagnostiques",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Évaluer les comportements et les performances : courir vite en ligne droite, franchir des haies, courir longtemps.",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "8 min",
        detail: "Échauffement progressif, quelques accélérations courtes.",
      },
      {
        title: "Atelier 1 — Vitesse (couloir)",
        duration: "12 min",
        detail:
          "Couloirs de 40 m matérialisés. « Cours le plus vite possible jusqu'au bout de ton couloir ». Un enfant donne le départ, un observateur par zone d'arrivée ; l'enseignant chronomètre et siffle au bout de 7 secondes. Dissocier l'observation des comportements de la prise de performance : chaque enfant court deux fois. (Repères de distance CP / CE1 fournis dans le guide.)",
      },
      {
        title: "Atelier 2 — Vitesse avec haies",
        duration: "12 min",
        detail:
          "Par couloir, 4 haies d'environ 25 cm (CP) ou 35 cm (CE1), la 1re à 7 m puis tous les 5 m. Même consigne et même organisation que l'atelier 1.",
      },
      {
        title: "Atelier 3 — Course longue",
        duration: "10 min",
        detail:
          "Circuit étalonné de 100 m en boucle. « Cours pendant 8 minutes, sans marcher, sur le circuit balisé ». Une demi-classe court, l'autre observe et note (chaque coureur a son observateur, un ticket par passage).",
      },
      {
        title: "Bilan",
        duration: "3 min",
        detail: "Repérer les besoins pour constituer des groupes de niveau.",
      },
    ],
    material: [
      "Chronomètre, cônes, sifflet, claquoir",
      "Couloirs et zone d'arrivée matérialisés, haies (~25-35 cm)",
      "Fiches d'observation, stylos, jeu de tickets",
    ],
    photocopies: ["Fiche d'observation coureur : 1 par observateur"],
    notes: [
      "Comportements moteurs : réagit-il au signal ? court-il en accélérant ? respecte-t-il son couloir ? finit-il à pleine vitesse ? piétine-t-il devant l'obstacle ?",
      "Course longue : adopte-t-il une allure régulière ou fractionne-t-il son effort ? est-il essoufflé à l'arrivée ?",
    ],
    illustrations: [{ src: IMG("courir-diagnostic.jpg"), caption: "Situations diagnostiques — dispositifs (ateliers 1, 2, 3)" }],
  },

  {
    id: "eps-courir-vite-signal",
    title: "Courir vite — Réagir à un signal",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Réagir vite à un signal sonore ou visuel et partir en accélérant.",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "8 min",
        detail: "Jeux de réaction (au signal, changer de sens / s'asseoir / accélérer).",
      },
      {
        title: "« Les lions et les gazelles »",
        duration: "20 min",
        detail:
          "Pour les lions : « attrape ta gazelle avant le refuge ». Pour les gazelles : « ne te laisse pas attraper par ton lion ». Différencier les deux groupes (foulards, dossards) ; un lion contre une gazelle de même force (ou varier l'écart). Inverser les rôles après 5 ou 6 poursuites. L'enseignant énonce une liste d'animaux ; quand les gazelles entendent leur nom, elles s'enfuient vers le refuge avant d'être rattrapées.",
        differentiation: "Varier l'écart de départ selon le niveau des coureurs.",
      },
      {
        title: "Discrimination sonore et signal visuel",
        duration: "12 min",
        detail:
          "Choisir un signal de départ parmi plusieurs (sifflet, tambourin, claquoir, mains, klaxon) et le changer d'une course à l'autre. Signal visuel : main abaissée, foulard, ballon qui franchit une ligne. Ordres du starter : « À vos marques ! », « Prêts ? », signal de départ (préférer un signal sonore ou visuel au « partez »). Variante « la queue du diable » : le coureur le plus près du refuge a un foulard à la ceinture ; il doit rejoindre le refuge sans se le faire prendre.",
      },
      {
        title: "Évaluation / bilan",
        duration: "5 min",
        detail: "Nombre de points marqués individuellement ou par équipe ; verbaliser la posture de départ.",
      },
    ],
    material: ["Foulards, dossards", "Sifflet, tambourin, claquoir", "Plots"],
    photocopies: [],
    notes: [
      "Comportements recherchés : anticiper le départ (concentration, posture adaptée : pieds décalés, corps penché en avant, regard vers le refuge), réagir instantanément, réagir au bon signal sonore/visuel.",
    ],
    illustrations: [{ src: IMG("courir-vite-signal.jpg"), caption: "Courir vite — réagir à un signal" }],
  },

  {
    id: "eps-courir-vite-ligne",
    title: "Courir vite — En ligne droite",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Maintenir sa vitesse et franchir la ligne d'arrivée à pleine vitesse ; s'orienter au départ.",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "8 min",
        detail: "Accélérations progressives, départs variés.",
      },
      {
        title: "Situations en ateliers (2 à 3 au choix)",
        duration: "30 min",
        detail:
          "1. « La course de relais » : au signal, cours, fais le tour du plot, reviens, transmets le témoin (tape dans la main tendue), assieds-toi en fin de colonne ; 1 point par course gagnée. 2. « Le relais marelle » : le lanceur annonce un nombre (dé) ; les coureurs courent jusqu'au cerceau correspondant, le contournent et reviennent. 3. « Passer le 1er sur la ligne d'arrivée » : équipes de 4 à 6 face à face ; au signal, cours le plus vite pour franchir la ligne du milieu ; le premier marque 1 point. 4. « La course au handicap » : coureurs décalés selon leur niveau ; franchir en premier les lignes marque des points.",
        differentiation: "Constituer les équipes selon le niveau ; utiliser le handicap pour équilibrer.",
      },
      {
        title: "Retour au calme et bilan",
        duration: "7 min",
        detail: "Verbaliser : bien s'orienter au départ, ne pas ralentir avant la ligne.",
      },
    ],
    material: ["Cerceaux, plots, foulards, craies, dés, sifflet", "Couloirs tracés"],
    photocopies: [],
    notes: [
      "Comportements recherchés : au départ, s'orienter dans le sens de la course et décaler les pieds pour pousser ; ne pas ralentir au moment du relais ; franchir la ligne d'arrivée au maximum de sa vitesse ; courir vite au-delà de la ligne.",
    ],
    illustrations: [{ src: IMG("courir-vite-ligne.jpg"), caption: "Courir vite — en ligne droite (relais, ligne d'arrivée)" }],
  },

  {
    id: "eps-courir-obstacles",
    title: "Courir en franchissant des obstacles",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Franchir des obstacles sans ralentir et sans sauter, en maintenant sa vitesse du départ à l'arrivée.",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "8 min",
        detail: "Course et franchissements bas (lattes au sol), rythme des appuis.",
      },
      {
        title: "Organisation en ateliers",
        duration: "14 min",
        detail:
          "Atelier 1 : parcours parallèles de ~30 m ; obstacles à hauteur du genou, premier obstacle à au moins 5 m, au moins 4 obstacles par couloir à intervalles irréguliers (hauteurs et intervalles variés d'un couloir à l'autre). Atelier 2 : hauteur du genou constante dans un même couloir, intervalles réguliers (≥ 4 m), différents d'un couloir à l'autre. Atelier 3 : comme l'atelier 2, ~30 m avec 4 obstacles espacés de 4 à 5 m, premier obstacle à 7 m.",
      },
      {
        title: "Situations en ateliers",
        duration: "16 min",
        detail:
          "Atelier 1 : au signal, partez et passez le premier la ligne d'arrivée, revenez en marchant sur le côté ; essayez dans tous les couloirs. Atelier 2 : mêmes consignes avec possibilité de chronométrer après plusieurs tentatives (variante : trouver le couloir où l'on court le plus vite). Atelier 3 : cours le plus vite possible jusqu'au bout du parcours.",
        differentiation: "Baisser la hauteur des obstacles / élargir les intervalles pour les élèves fragiles.",
      },
      {
        title: "Retour au calme et bilan",
        duration: "7 min",
        detail: "Verbaliser : franchir sans sauter, garder sa vitesse avant et après l'obstacle.",
      },
    ],
    material: ["Obstacles variés (barils, petites haies, cônes + lattes)", "Chronomètres"],
    photocopies: [],
    notes: [
      "Comportements recherchés : courir sans s'arrêter du début à la fin du parcours ; franchir sans ralentir avant/après ; franchir les obstacles sans sauter ; réagir vite au signal ; être au maximum de sa vitesse du départ à l'arrivée.",
    ],
    illustrations: [{ src: IMG("courir-obstacles.jpg"), caption: "Courir en franchissant des obstacles" }],
  },

  {
    id: "eps-courir-regulier",
    title: "Courir régulièrement — Seul ou en équipe",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Courir longtemps sans à-coups ni arrêt, en maîtrisant et en reproduisant son allure.",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "8 min",
        detail: "Course lente continue, recherche d'une allure confortable.",
      },
      {
        title: "1 — « Vider les caisses »",
        duration: "12 min",
        detail:
          "4 groupes, chacun près d'un cône de sa couleur. Au signal, va prendre un objet dans la caisse/cerceau de ta couleur, fais le tour du circuit et pose-le à ton plot de départ. Recommence pendant 3 minutes : tu peux courir ou marcher mais tu ne dois pas t'arrêter. Avoir le moins d'objets possible dans sa caisse à la fin. Variantes : n'autoriser la marche qu'entre deux cônes ; augmenter le temps de course.",
      },
      {
        title: "2 — « Aller et retour »",
        duration: "10 min",
        detail:
          "Binômes (un coureur, un observateur). Au signal, cours 3 minutes ; l'observateur compte les plots rencontrés. Au bout de 3 minutes, change de sens et décompte les plots. Arriver à zéro dans le même laps de temps.",
      },
      {
        title: "3 — « Le lièvre et la tortue » / « Le pendule »",
        duration: "10 min",
        detail:
          "Le lièvre et la tortue : par paires (L défie T) avec un handicap pour équilibrer ; course-poursuite sur trois tours (rattraper / ne pas se faire rattraper). Le pendule : courir d'un point A à un point B en réalisant chaque fois le même temps (établir un tableau de performance pour annoncer ses défis).",
        differentiation: "Ajuster le handicap et la distance selon les niveaux.",
      },
      {
        title: "Bilan",
        duration: "5 min",
        detail: "Verbaliser : garder une allure régulière, la connaître et la reproduire.",
      },
    ],
    material: [
      "4 caisses de couleurs, 15 à 20 objets par caisse, 4 jeux de dossards, 4 cônes",
      "Circuit en boucle de 100 à 150 m, partagé en 4 parties égales",
    ],
    photocopies: [],
    notes: [
      "Comportements recherchés : courir longtemps sans à-coups, sans s'arrêter et si possible sans marcher ; arriver progressivement à supprimer la marche ; maîtriser son allure ; connaître son allure et être capable de la reproduire.",
    ],
    illustrations: [{ src: IMG("courir-regulier.jpg"), caption: "Courir régulièrement — seul ou en équipe" }],
  },

  {
    id: "eps-courir-longtemps",
    title: "Courir longtemps — Et ensemble",
    subject: "eps",
    socleDomains: SOCLE_EPS,
    disciplinaryDomains: DISCIPLINARY,
    objective:
      "Courir longtemps en groupe, à un rythme régulier, et arriver groupé sans accompagnement d'un adulte.",
    competence: COMPETENCE,
    duration: "45 min",
    phases: [
      {
        title: "Mise en train",
        duration: "8 min",
        detail: "Course lente en groupe, calage d'un rythme commun.",
      },
      {
        title: "1 — « Course à la rencontre »",
        duration: "12 min",
        detail:
          "Circuit d'environ 100 m. Chaque groupe est partagé en deux équipes placées au repère de départ. Au signal, partez en sens opposés ; croisez-vous toujours au même endroit. Les groupes partent successivement ; alterner temps de course et d'observation. Variantes : course en aller-retour ; repartir en sens inverse à chaque rencontre.",
      },
      {
        title: "2 — « La locomotive et les wagons »",
        duration: "12 min",
        detail:
          "Équipes de 4 ou 5. Le premier est la locomotive, les autres les wagons. Au signal, la locomotive part (distance A-B-A) ; au passage au point A, elle emmène le wagon n° 1, puis le n° 2, etc. De retour au point A, le premier voyage se termine ; la locomotive devient le premier wagon et le dernier wagon devient la nouvelle locomotive.",
      },
      {
        title: "3 — « Le convoi »",
        duration: "8 min",
        detail:
          "Trois groupes : experts, pratiquants, débutants. Sur un circuit de 400 m à parcourir 2 fois : experts et débutants au départ, pratiquants à 200 m. Les experts démarrent, accrochent (sans s'arrêter) les pratiquants à 200 m, puis les débutants 200 m plus loin ; les 3 groupes finissent les derniers 400 m ensemble. Quand le premier franchit la ligne, tous doivent être dans la zone des 20 m.",
        differentiation: "Constituer les 3 groupes de niveau ; l'enseignant peut accompagner lors des premières séances.",
      },
      {
        title: "Bilan",
        duration: "5 min",
        detail: "Verbaliser : garder un rythme régulier, arriver groupé sans accélérer.",
      },
    ],
    material: ["Cônes, plots, dossards distincts par groupe", "Circuits balisés (100 à 400 m)"],
    photocopies: [],
    notes: [
      "Comportements recherchés : courir groupés ; respecter le rythme de course pour arriver en même temps ; garder un rythme régulier sans accélérer ; la classe doit arriver groupée sans être accompagnée par un adulte (objectif final).",
    ],
    illustrations: [{ src: IMG("courir-longtemps.jpg"), caption: "Courir longtemps — et ensemble" }],
  },
];
