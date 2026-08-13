/**
 * Fiches de préparation — Maths CE1, période 1.
 * Contenu construit à partir du guide de l’enseignant « Maths en CE1 »
 * (ACCÈS Éditions), période 1 — 7 modules, dans l’ordre du sommaire.
 */

import type { PrepSheet } from "@/lib/ardoise-data";

export const MATHS_PREP_SHEETS_P1: PrepSheet[] = [
  {
    id: "acces-m1",
    title: "Écritures chiffrées des nombres jusqu’à 100",
    subject: "maths",
    objective:
      "Dénombrer une grande collection en l’organisant en dizaines et unités, puis comparer deux nombres à partir de leur écriture chiffrée (le chiffre de gauche indique le nombre de dizaines, celui de droite le nombre d’unités isolées).",
    competence:
      "Dénombrer et comparer des collections en les organisant ; construire des collections de cardinal donné.",
    duration: "45 min",
    phases: [
      {
        title: "Séance 1 — Dénombrer en groupes de dix",
        detail:
          "Par binôme, distribuer un bac de cubes emboîtables (quantité différente par binôme : 72, 47, 68 ou 85 cubes). L’élève A organise sa collection pour que l’élève B puisse la dénombrer en moins de 15 secondes pendant que B a les yeux fermés ; au signal, B compte et écrit le résultat sur l’ardoise. Lors de la mise en commun, comparer une organisation en ligne, une organisation en paquets non décimaux (5, 8…) et une organisation en groupes de dix, et expliciter au tableau : « on compte les dizaines une à une puis les unités isolées » (exemple : 6 groupes de 10 et 4 cubes seuls font 6 dizaines et 4 unités, soit 64). En pratique autonome, dénombrer les collections du document D1-1 (non organisées, partiellement ou totalement organisées) et écrire le nombre en chiffres.",
        differentiation:
          "Obstacle repéré dans le guide : les élèves inversent l’ordre des chiffres à l’écriture, ou se trompent lors de l’énumération (comptent deux fois la même dizaine/unité ou en oublient une) — leur demander de cocher les dizaines et les unités au fur et à mesure du comptage.",
      },
      {
        title: "Séance 2 — Comparer deux collections organisées",
        detail:
          "Deux groupes d’élèves reçoivent chacun une feuille (D1-2) : les uns une collection de carrés rouges, les autres de carrés bleus, sans pouvoir voir la collection adverse. Après recherche, vidéoprojeter les deux collections (A1-1, A1-2) et écrire au tableau les écritures chiffrées 84 et 75 sans les nommer ; faire écrire sur l’ardoise le nombre le plus grand en comparant d’abord le nombre de dizaines. Valider : 84 > 75 car 8 dizaines contre 7 dizaines, puis reformuler avec « supérieur à » / « inférieur à ». Exercice P6 Cherchons ensemble en pratique guidée (comparer 52 et 54, mêmes dizaines, comparaison des unités : 52 < 54).",
        differentiation:
          "Pour les élèves les plus fragiles, proposer de vérifier la réponse par correspondance terme à terme avec le matériel de numération, en petit groupe guidé par l’enseignant.",
      },
      {
        title: "Séances 3-4 — Réinvestir et évaluer",
        detail:
          "Séance 3 : comparer les collections de crayons A, B, C, D (animation A1-2) en écrivant chaque nombre en chiffres, par exemple 26 unités = 2 dizaines et 6 unités. Séance 4 (bilan) : passer des « commandes de cubes » en écrivant successivement au tableau 37, 85, 63, 60, 87 ; les élèves construisent la collection correspondante avec des Cubes base 10 encastrables en faisant apparaître les dizaines, puis effectuent P8 Ex4 et Ex5. Clore en s’appuyant sur les traces écrites D1-4.",
        differentiation:
          "Obstacles à surveiller : compréhension fragile du système décimal et positionnel (38 unités = 3 dizaines et 8 unités n’est pas toujours reconnu comme équivalent) — reprendre au tableau avec le matériel de numération.",
      },
      {
        title: "Rituels de la semaine",
        detail:
          "Atelier problèmes : problème parties-tout, recherche du tout (P9 Pb1) — 10 cubes rouges et 14 cubes jaunes dans une boîte, schéma en barres avec les deux parties encadrées et le tout signalé par « ? », calcul 10 + 14 = 24. Calcul mental (30 min puis 10 min) : table des doubles, en partant de « double de 4 = 8 » puis « double de 8 = double de 5 + double de 3 » avec les cartes constellations du dé (C1-1). Flash Maths : suites répétitives, observer un motif 30 secondes puis le reproduire sur l’ardoise une fois caché.",
      },
    ],
    material: [
      "bacs de cubes emboîtables (quantités variées jusqu’à 100 par binôme)",
      "grandes collections d’objets de la classe (trombones, feutres, crayons, jetons)",
      "ardoises",
      "cartes constellations du dé (C1-1)",
      "Cubes base 10 encastrables",
    ],
    photocopies: [],
  },
  {
    id: "acces-m2",
    title: "Nombres entiers jusqu’à 100",
    subject: "maths",
    objective:
      "Connaître et utiliser diverses représentations d’un même nombre (matériel de numération, écriture chiffrée, unités de numération, décomposition additive) et passer de l’une à l’autre, en comprenant que la valeur d’un chiffre dépend de sa position.",
    competence:
      "Connaître et utiliser diverses représentations d’un nombre et passer de l’une à l’autre ; connaître la valeur des chiffres en fonction de leur position dans un nombre.",
    duration: "45 min",
    phases: [
      {
        title: "Séance 1 — Représenter un nombre de plusieurs façons",
        detail:
          "Par binôme, matériel de 9 barres de 10 cubes encastrables et 9 cubes (ou planche prédécoupée PP1). Passer des « commandes » écrites au tableau en unités de numération : 2d 7u, 4u 2d, 28u, 4d, 90 + 5, 3d 19u, 6d 14u, 5d 36u. Pour 3d 19u, les élèves doivent convertir 19u en 1d 9u faute de cubes isolés suffisants, ce qui donne 4d 9u = 49. Associer ensuite chaque écriture à ses équivalents (ex. 6d 14u = 7d 4u = 74). Pratique autonome : justifier pourquoi 63 n’est pas 36 bien que ce soient les mêmes chiffres (P10 Ex1).",
      },
      {
        title: "Séance 2 — Associer les représentations (jeu des paires)",
        detail:
          "Par groupes de deux, classer les cartes du jeu des paires (D2-1) en plaçant sur une même ligne celles qui représentent le même nombre, par exemple pour 53 : 5 barres de dix et 3 cubes isolés, 5d 3u, 4d 13u, 10+10+10+10+10+3. Utiliser ensuite les cartes en pratique autonome : le jeu se joue à deux, on forme des paires en piochant dans la main de l’adversaire, celui qui termine avec la seule carte 88 a perdu. Exercices D2-2 A et B en pratique guidée.",
        differentiation:
          "Regrouper les élèves les plus fragiles dans un espace de la classe pour faciliter les échanges ; utiliser le matériel de numération pour expliciter par exemple que 26u, c’est aussi 2d 6u, donc que 2d 26u s’écrit aussi 4d 6u et 46.",
      },
      {
        title: "Séances 3-4 — Réinvestir et évaluer",
        detail:
          "Séance 3 : exercices P11 Ex2, Ex3 et Ex4 mobilisant les séances 1 et 2 — par exemple relier « 8 unités + 6 dizaines » à 68 en évitant les pièges 806, 86 et 14. Séance 4 (bilan) : P12 Ex5 en évaluation puis P12 Ex6 en consolidation, en utilisant le matériel de numération pour comprendre que 10 dizaines, c’est 10 dizaines et 0 unité, donc 100. Clore avec la trace écrite D2-3.",
      },
      {
        title: "Rituels de la semaine",
        detail:
          "Atelier problèmes : recherche d’une partie avec 20 jetons symbolisant des billes (P13 Pb1) — 9 billes visibles dans une poche, on retire 9 de 20 pour trouver les 11 billes cachées dans l’autre poche : 20 − 9 = 11. Calcul mental : table des « presque doubles », procédure du double + 1 (6 + 7 = 6 + 6 + 1 = 13), vérifiée avec les doigts par binôme. Flash Maths : jeu du portrait, écrire le nombre qui répond à la devinette de l’enseignant.",
      },
    ],
    material: [
      "9 barres de 10 cubes encastrables et 9 cubes par binôme (ou planche PP1)",
      "cartes du jeu des paires (D2-1)",
      "matériel de numération",
      "ardoises",
      "20 jetons symbolisant des billes",
    ],
    photocopies: [],
  },
  {
    id: "acces-m3",
    title: "Lecture et écriture des nombres jusqu’à 100",
    subject: "maths",
    objective:
      "Connaître la suite écrite et la suite orale des nombres jusqu’à 100, en identifiant la « famille » de dizaines d’un nombre et en surcomptant à partir de la dizaine entière pour lire ou écrire son nom.",
    competence:
      "Connaître la suite écrite et la suite orale des nombres jusqu’à cent ; connaître et utiliser diverses représentations d’un nombre et passer de l’une à l’autre.",
    duration: "45 min",
    phases: [
      {
        title: "Séance 1 — Nombres jusqu’à 60",
        detail:
          "Vidéoprojeter le tableau des nombres de 0 à 99 (A3-1). Écrire 48 au tableau, faire trouver son nom à l’oral (quarante-huit) : réciter la comptine des dizaines jusqu’à quarante en montrant un doigt par dizaine (famille des quarante), puis surcompter de quarante à quarante-huit en montrant un doigt par unité. Faire aussi retrouver cinquante-trois dans le tableau. Pratique guidée : dictée des nombres vingt-sept, seize, trente-neuf, cinquante-huit, quarante-et-un sur l’ardoise ; lecture de nombres montrés dans le tableau D1-3.",
      },
      {
        title: "Séance 2 — Nombres jusqu’à 80",
        detail:
          "Même démarche avec le tableau A3-2 : 75 (soixante-quinze), famille des soixante, en rappelant que de 60 à 79 on utilise la grande comptine de 1 à 19 après « soixante » (donc soixante-dix et soixante-dix-neuf contiennent tous deux 7 dizaines). Dictée : soixante-sept, soixante-seize, soixante-neuf, soixante-dix-huit, soixante-et-un. Pratique autonome : P15 Ex2 et Ex3.",
      },
      {
        title: "Séances 3-4 — Jusqu’à 100 puis bilan",
        detail:
          "Séance 3 : tableau A3-3, nombre 93 (quatre-vingt-treize), famille des quatre-vingts, grande comptine de 1 à 19 pour compter de 80 à 99. Dictée : quatre-vingt-six, quatre-vingt-seize, quatre-vingt-dix-neuf, quatre-vingt-huit, quatre-vingt-onze. Séance 4 (bilan) : évaluation P16 Ex6, consolidation P16 Ex7 et Ex8, clôture avec la trace écrite D3-1.",
      },
      {
        title: "Rituels de la semaine",
        detail:
          "Atelier problèmes : comparer chercher-le-tout et chercher-une-partie avec les mêmes nombres — « 12 filles et 10 garçons, combien d’élèves en tout ? » (12 + 10 = 22) puis « 22 élèves dont 12 filles, combien de garçons ? » (22 − 12 = 10), schéma en barres à l’appui pour distinguer ce qu’on cherche. Calcul mental : compléments à 10, avec une boîte de 10 œufs dans laquelle sont placées 8 balles de golf (8 + ? = 10), comptage sur les doigts (« il reste 2 doigts pliés »).",
        differentiation:
          "Regrouper les élèves fragiles pour l’atelier problèmes dans un espace de la classe afin de faciliter les échanges (consigne de différenciation donnée dans le guide pour cette séquence).",
      },
    ],
    material: [
      "tableau des nombres de 0 à 99 vidéoprojeté (A3-1, A3-2, A3-3)",
      "tableau des nombres D1-3",
      "ardoises",
      "boîte de 10 œufs et balles de golf (compléments à 10)",
    ],
    photocopies: [],
  },
  {
    id: "acces-m4",
    title: "Comparaison des nombres jusqu’à 100",
    subject: "maths",
    objective:
      "Comparer deux nombres entiers en utilisant les symboles =, < et >, ranger une série de nombres dans l’ordre croissant ou décroissant, et placer des nombres sur une demi-droite graduée.",
    competence:
      "Comparer, encadrer, intercaler des nombres entiers en utilisant les symboles =, < et > ; ordonner des nombres dans l’ordre croissant ou décroissant ; savoir placer des nombres sur une demi-droite graduée.",
    duration: "45 min",
    phases: [
      {
        title: "Séance 1 — Comparer avec =, < et >",
        detail:
          "Présenter une boîte A ouverte contenant 96 cubes (8 dizaines et 16 cubes visibles) et une boîte B fermée contenant 94 cubes (7 dizaines et 24 unités), avec l’étiquette « 7d 24u » sur le couvercle. Les élèves écrivent chaque nombre en chiffres puis comparent (document D4-1) : dans 96 et 94, il y a 9 dizaines dans les deux, mais 6 unités contre 4 unités. Écrire au tableau 94 < 96 et 96 > 94, puis reformuler avec « inférieur à » / « supérieur à ». Pratique guidée : P18 Cherchons ensemble.",
      },
      {
        title: "Séance 2 — Ranger une série de nombres",
        detail:
          "Afficher les 6 cartes 80, 68, 95, 84, 59, 86 (D4-3) — scores d’une partie de fléchettes à classer du plus grand au plus petit pour établir un classement. Les élèves cherchent individuellement puis comparent avec leur voisin. Expliciter la procédure : comparer d’abord le chiffre des dizaines, puis celui des unités si égalité ; barrer les nombres classés au fur et à mesure. Résultat : 95 > 86 > 84 > 80 > 68 > 59 (ordre décroissant) puis 59 < 68 < 80 < 84 < 86 < 95 (ordre croissant).",
        differentiation:
          "Après un temps de recherche individuelle, distribuer le matériel de numération aux élèves fragiles pour qu’ils comparent les nombres deux à deux par correspondance terme à terme.",
      },
      {
        title: "Séances 3-4 — Demi-droite graduée et bilan",
        detail:
          "Séance 3 : avec une corde à linge, des pinces à linge et des étiquettes (ou l’animation A4-1), chercher quel nombre de 24 ou 31 est le plus proche de 28, en comptant les pas entre les étiquettes. Reprendre avec des demi-droites graduées de 1 en 1, de 5 en 5 et de 10 en 10 (animation A4-2). Séance 4 (bilan) : évaluation P20 Ex6, consolidation P20 Ex7 à 9, clôture avec la trace écrite D4-4 sur la demi-droite graduée.",
      },
      {
        title: "Rituels de la semaine",
        detail:
          "Atelier problèmes : transformation avec recherche de l’état final — Mehdi avait 23 billes et en gagne 7 à la récréation, combien en a-t-il à la fin ? (23 + 7 = 30), modélisé par un schéma en barres puis par un déplacement sur un axe (+7). Calcul mental : ajouter ou soustraire un nombre entier de dizaines, par exemple 38 + 40 = 78 (3d 8u + 4d = 7d 8u) et 96 − 40 = 56, avec le matériel de numération à l’appui.",
      },
    ],
    material: [
      "boîtes de cubes (collection A ouverte, collection B fermée avec étiquette)",
      "cartes-nombres pour le classement (D4-3)",
      "corde à linge, pinces à linge et étiquettes",
      "matériel de numération",
    ],
    photocopies: [],
  },
  {
    id: "acces-m5",
    title: "Groupements par 10 et par 100",
    subject: "maths",
    objective:
      "Dénombrer une collection en l’organisant en dizaines puis en centaines, comprendre qu’une centaine, c’est aussi dix dizaines ou cent unités, et construire des collections de cardinal donné à trois chiffres.",
    competence:
      "Dénombrer et comparer des collections en les organisant ; construire des collections de cardinal donné ; connaître la valeur des chiffres en fonction de leur position dans un nombre.",
    duration: "45 min",
    phases: [
      {
        title: "Séance 1 — De la dizaine à la centaine",
        detail:
          "Par binôme, distribuer un bac de cubes emboîtables organisés en barres de dix et cubes isolés (ou la planche PP1), sans donner le cardinal. Les élèves organisent puis dénombrent leur collection : 11 dizaines et 6 unités isolées, soit 116, écrit d’abord en unités de numération (11d 6u) puis en chiffres. Introduire la plaque centaine dès qu’on atteint dix dizaines : 116 devient 1 centaine 1 dizaine 6 unités, qui se lit « cent-seize ». Faire la synthèse des trois écritures possibles (11d + 6u ; 1c + 1d + 6u ; 1c + 16u). Pratique guidée : ajouter 14 cubes aux 116 déjà sur la table pour atteindre 130 et l’écrire de plusieurs façons.",
      },
      {
        title: "Séance 2 — Comparer en centaines et dizaines",
        detail:
          "Deux groupes reçoivent chacun une feuille (D5-3) avec une collection de carrés (rouge ou bleue) sans pouvoir voir l’autre. Après vidéoprojection successive des deux collections (A5-1), organiser chacune en un maximum de centaines et de dizaines : 136 et 140. Comparer : 140 > 136 car 14 dizaines contre 13 dizaines (ou 1 centaine 4 dizaines contre 1 centaine 3 dizaines). Exercice D5-1 puis P22 Cherchons ensemble en pratique guidée (153 < 157).",
      },
      {
        title: "Séances 3-4 — Construire des collections et bilan",
        detail:
          "Séance 3 : passer des commandes de cubes en écrivant au tableau 178, 107 puis 376 ; les binômes construisent chaque collection et verbalisent, par exemple « 178, c’est 1 centaine 7 dizaines et 8 unités, ou 17 dizaines et 8 unités, ou 178 unités : cent-soixante-dix-huit ». Reprendre avec 150, 502, 830 pour les groupes guidés. Séance 4 (bilan) : évaluation P24 Ex4, puis activité 1 centaine = 10 dizaines et 1 centaine = 100 unités avec la plaque centaine et les barres dizaine, animation A5-2, clôture avec la trace écrite D5-2.",
        differentiation:
          "Obstacles repérés : compréhension fragile des aspects décimal (base 10) et positionnel ; erreurs de comptage (élément compté deux fois ou oublié) ; relations « 10 unités = 1 dizaine » et « 10 dizaines = 1 centaine » pas encore automatisées — reprendre en petit groupe avec le matériel de numération.",
      },
      {
        title: "Rituels de la semaine",
        detail:
          "Atelier problèmes : « J’ai 10 billes, je gagne 4 billes » (chercher le tout, 10 + 4 = 14) puis « J’ai 10 billes, je perds 4 billes » (chercher une partie, 10 − 4 = 6), avec le même schéma en barres pour distinguer les deux questions. Calcul mental : tables d’addition, sommes inférieures à 10 (5 + 3, 2 + 7, 3 + 3, 5 + 4), réponses sur l’ardoise en temps limité.",
      },
    ],
    material: [
      "cubes emboîtables organisables en barres de dix et en centaine (ou planche PP1)",
      "plaque centaine",
      "cartes-collections rouge/bleue (D5-3)",
      "ardoises",
    ],
    photocopies: [],
  },
  {
    id: "acces-m6",
    title: "Calcul posé : addition",
    subject: "maths",
    objective:
      "Poser et effectuer en colonnes l’addition de deux ou trois nombres à deux ou trois chiffres, en gérant la retenue et en estimant l’ordre de grandeur du résultat pour en vérifier la vraisemblance.",
    competence: "Poser et effectuer des additions en colonnes.",
    duration: "45 min",
    phases: [
      {
        title: "Séance 1 — Réactiver l’addition posée avec retenue",
        detail:
          "Présenter deux bacs (38 cubes rouges, 46 cubes jaunes) et une boîte vide : combien de cubes en tout si on les réunit ? Écrire 46 + 38 = ? en ligne. Montrer trois opérations posées par une classe fictive (A, B, C) et faire identifier laquelle est juste (84, avec la retenue). Détailler les étapes : 6 + 8 = 14 → 4 unités posées, 1 dizaine en retenue ; 1 + 4 + 3 = 8 dizaines ; résultat 46 + 38 = 84. Vérifier la vraisemblance par arrondi : 46 + 38 ≈ 46 + 40. Pratique guidée sur le document D6-1, en rappelant au passage la procédure du passage par 10 pour les calculs mentaux associés.",
        differentiation:
          "Proposer du matériel de numération aux élèves qui ont besoin de manipuler pour valider la retenue.",
      },
      {
        title: "Séance 2 — Additionner des nombres à trois chiffres",
        detail:
          "Même démarche avec 353 cubes et 274 cubes à réunir dans une boîte : 353 + 274 = ?. Identifier l’opération correctement posée parmi trois propositions, puis détailler : unités 4 + 3 = 7 ; dizaines 5 + 7 = 12 → 2 dizaines posées, 1 centaine en retenue ; centaines 1 + 3 + 2 = 6 ; résultat 627. Vérifier par arrondi : 353 + 274 ≈ 350 + 300. Pratique guidée : poser et effectuer 43 + 54, 563 + 45, 27 + 321 + 35, avec estimation de l’ordre de grandeur à chaque fois.",
      },
      {
        title: "Séances 3-4 — Réinvestir en situation et bilan",
        detail:
          "Séance 3 : problème du cinéma (P27 Ex4) — trouver le nombre total d’entrées vendues (58 + 36 = 94, vérifié par 58 + 36 ≈ 60 + 40) ; puis P27 Ex5 — poser 135 + 24 + 28 = 187 (roses vendues), vérifié par 135 + 24 + 28 ≈ 130 + 20 + 30. Séance 4 (bilan) : évaluation P28 Ex6, consolidation P28 Ex7 et Ex8 en rappelant l’intérêt de l’estimation de l’ordre de grandeur, clôture avec la trace écrite D6-2.",
      },
      {
        title: "Rituels de la semaine",
        detail:
          "Atelier problèmes : problème du bus en deux étapes — 16 personnes dans le bus, 9 montent au premier arrêt (16 + 9 = 25), puis 5 descendent au second (25 − 5 = 20), avec un schéma de déplacement sur un axe et une phrase réponse après chaque étape. Calcul mental : passage par 10, par exemple 7 + 5 en s’appuyant sur 7 + 3 = 10 puis 10 + 2 = 12 (décomposition de 5 en 3 + 2), avec manipulation du matériel de numération et un axe gradué au tableau.",
      },
    ],
    material: [
      "cubes (46 jaunes / 38 rouges, puis 353 / 274) avec deux bacs et une boîte",
      "matériel de numération",
      "ardoises",
      "cahier",
    ],
    photocopies: [],
  },
  {
    id: "acces-m7",
    title: "Alignement et milieu",
    subject: "maths",
    objective:
      "Réaliser et vérifier l’alignement d’objets à l’aide d’un fil tendu puis d’une règle, et comprendre la notion de milieu d’un segment comme le point qui le partage en deux parties de même longueur (par pliage puis par mesure).",
    competence:
      "Utiliser la règle pour vérifier des alignements ; utiliser la règle comme instrument de tracé.",
    duration: "45 min",
    phases: [
      {
        title: "Séance 1 — Aligner cinq objets avec un fil tendu",
        detail:
          "Par groupes de 3, dans la cour ou une salle spacieuse : réaliser l’alignement de « 5 arbres » que Monsieur Giono veut planter, symbolisés par deux plots aux extrémités (espacés d’au moins 3 mètres) et 3 petits objets de la classe (tubes de colle, trousses, taille-crayons) à placer entre eux. Utiliser si besoin ficelles ou cordelettes de 5 à 6 mètres, la règle du tableau ou des tasseaux de bois. Expliciter en fin de séance pourquoi un fil bien tendu est plus fiable qu’une chaîne de règles ou de tasseaux mis bout à bout (chaque jonction introduit une erreur qui s’accumule). Pratique guidée : les groupes vérifient les alignements des autres avec un fil tendu.",
      },
      {
        title: "Séance 2 — Vérifier un alignement avec la règle",
        detail:
          "Faire plier une feuille de papier pour obtenir un pli net (image mentale de la droite), tracer trois croix bleues sur le pli et une croix rouge en dehors. Utiliser la feuille pliée pour vérifier que la règle est bien droite, puis vidéoprojeter l’animation A7-2 : placer la règle pour qu’elle passe par deux points, vérifier qu’elle passe aussi par les autres pour conclure à l’alignement. Pratique guidée puis autonome sur le document D7-1 et les exercices P30 Ex1, P31 Ex2 et 3.",
      },
      {
        title: "Séances 3-4 — Milieu d’un segment et bilan",
        detail:
          "Séance 3 : par binôme, couper une ficelle de 12 à 20 cm en deux morceaux de même longueur (validation attendue : pliage ou superposition), puis transposer sur le segment [AB] du document D7-2 avec une bande de papier — reporter la longueur du segment sur la bande, plier en deux, retrouver le milieu M. Expliciter ensuite la méthode par la mesure : mesurer AB (18 cm), calculer la moitié (9 cm), placer M à 9 cm de A et de B, puis vérifier que AM = MB = 9 cm. Pratique guidée/autonome : P31 Ex4 et Ex5. Séance 4 (bilan) : évaluation P32 Ex6 et 7, consolidation en reproduisant une figure agrandie avec une règle non graduée en repérant les points alignés (P32 Ex8), clôture avec la trace écrite D7-3.",
      },
      {
        title: "Rituels de la semaine",
        detail:
          "Atelier Défis : avec 7 cartes-nombres (10, 9, 8, 1, 1, 18, 4), trouver comment obtenir 12 points en utilisant le moins de cartes possible (solution optimale : 8 + 4 = 12), en comparant plusieurs essais avec les élèves. Calcul mental : soustraire un nombre inférieur à 10 en s’appuyant sur les compléments à 10, par exemple 10 − 3 = 7 mimé avec une boîte de 10 œufs dont on retire 3 balles de golf, puis vérifié avec des gommettes rouges/bleues (7 + 3 = 10 donc 10 − 3 = 7).",
      },
    ],
    material: [
      "plots, ficelles ou cordelettes de 5 à 6 mètres",
      "règles graduées et règle non graduée par élève",
      "feuilles de papier à plier et bandes de papier",
      "ficelle de 12 à 20 cm par binôme",
      "cartes-nombres pour l’atelier Défis (10, 9, 8, 1, 1, 18, 4)",
    ],
    photocopies: [],
  },
];
