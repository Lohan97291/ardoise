import type { PrepSheet } from "@/lib/ardoise-data";

/**
 * Fiches de préparation — Le Monde de Cléo CE1 (Retz, Antoine Fetet), Période 5.
 * Contenu construit à partir du guide pédagogique (p. 291 à 332) : objectifs
 * des programmes 2025, choix pédagogiques de la méthode, déroulé des phases
 * « Pour commencer » / « Pour s'entrainer » / « Pour aller plus loin »,
 * matériel et affichages mentionnés.
 */
export const CLEO_PREP_SHEETS_P5: PrepSheet[] = [
  {
    id: "cleo-p5-1",
    title: "J'écris les mots avec ail, eil, euil, ouil",
    subject: "francais",
    objective:
      "Encoder des mots contenant les graphies du phonème [j] en finale de noms masculins : ail, eil, euil, ouil.",
    competence:
      "Identifier les mots de manière de plus en plus aisée : automatiser le décodage des correspondances graphophonémiques (CGP), y compris les plus complexes, en lecture comme en écriture.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : rappel des graphies et activité collective",
        duration: "15 min",
        detail:
          "Projeter l'activité p. 140. Rappel rapide des graphies du phonème [j] au masculin (ail, eil, euil, ouil), puis les élèves réalisent l'activité individuellement. Question orale de clôture : « Pourquoi ces mots se terminent-ils tous par -l ? » On conclut que ce sont des noms masculins (le vérifier avec les déterminants le/un/du) ; les noms féminins équivalents (ille, aille, eille, euille, ouille) seront étudiés dans un chapitre suivant.",
      },
      {
        title: "Pour s'entrainer : mots incomplets à partir des dessins",
        duration: "20 min",
        detail:
          "Poursuite avec l'activité p. 140 : associer des débuts et des fins de mots pour écrire le mot correspondant à chaque dessin (et non plus travailler sur des syllabes).",
        differentiation:
          "S'assurer d'abord collectivement que toutes les images sont identifiées, puis aider individuellement les élèves en difficulté pendant le travail sur fichier. Pictogrammes-consignes, tableau de structuration des tâches et étiquettes disponibles sur le site compagnon ; une activité « Pour s'entrainer » supplémentaire et une activité « Pour aller plus loin » y sont également proposées.",
      },
    ],
    material: [
      "Fichier de l'élève p. 140",
      "Étiquettes à manipuler (site compagnon)",
      "Tableau de structuration des tâches",
    ],
    photocopies: [],
  },
  {
    id: "cleo-p5-2",
    title: "Je découvre les familles de mots (2)",
    subject: "francais",
    objective:
      "Reconnaitre des mots d'une même famille même lorsque leur radical diffère fortement (ex. boire / buvette), et séparer deux familles de mots au radical proche mais sans lien de sens (ex. terre / terreur).",
    competence:
      "Vocabulaire (cycle 2) : structurer le lexique en percevant les liens sémantiques et morphologiques entre les mots pour favoriser leur mémorisation.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : observer l'exemple aimer / amour",
        duration: "15 min",
        detail:
          "Projeter l'activité p. 142. Faire observer l'exemple aimer/amour : ce sont deux mots de la même famille, reconnaissables au sens (l'amour, c'est quand on aime quelqu'un) et aux lettres communes a et m. Rechercher collectivement d'autres mots de cette famille (ami, amoureux, amitié, aimable), puis les élèves réalisent l'activité individuellement en coloriant deux familles de mots mélangées (jaune / vert).",
        differentiation: "Expliquer au besoin le sens des mots moins connus (perron, buvette).",
      },
      {
        title: "Pour s'entrainer : relier les mots de la même famille",
        duration: "20 min",
        detail:
          "Activité p. 142 : relier deux à deux des mots de la même famille et colorier les lettres communes à chaque paire, en commençant à l'oral (déterrer/terrible ne sont pas de la même famille malgré leur ressemblance). Lors de la correction, faire identifier les deux mots « chefs de famille » de l'activité de découverte : terre et terreur.",
      },
      {
        title: "Prolongement : dictée de mots de la famille",
        duration: "15 min",
        detail:
          "Quelques jours après la série, proposer une courte dictée reprenant des mots utilisés dans les activités (le soleil, un écureuil, un éventail, un orteil...) ; réitérer si besoin.",
      },
    ],
    material: ["Fichier de l'élève p. 142", "Tableau de structuration des tâches"],
    photocopies: [],
  },
  {
    id: "cleo-p5-3",
    title: "Je reconnais les noms propres et les noms communs",
    subject: "francais",
    objective:
      "Distinguer le nom propre du nom commun à partir de mots qui partagent leur forme avec des prénoms, des noms de famille, des marques ou des lieux, et identifier la majuscule comme marque caractéristique du nom propre, quelle que soit sa position dans la phrase.",
    competence:
      "Différencier et nommer les principales classes de mots : le déterminant, le nom commun, le nom propre, l'adjectif, le verbe, le pronom personnel sujet.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : relier une ville à Paris",
        duration: "15 min",
        detail:
          "Projeter l'activité p. 144. Commencer collectivement en reliant une ville à Paris, puis les élèves poursuivent individuellement. Lors de la correction, expliciter les particularités des noms propres : ils commencent toujours par une majuscule, même hors du début de phrase, et désignent une personne, un lieu ou une marque en particulier (il n'y a qu'une ville qui s'appelle Paris). Demander aux élèves d'autres exemples pour chaque catégorie.",
      },
      {
        title: "Pour s'entrainer : relier les étiquettes et écrire les noms propres",
        duration: "20 min",
        detail:
          "Activité p. 144 : commencer à l'oral avec un gâteau ➜ une charlotte, en faisant remarquer que le prénom n'est pas choisi au hasard (une charlotte sans majuscule = un gâteau ; Charlotte, prénom, prend toujours une majuscule). Conseiller aux élèves de relier d'abord toutes les étiquettes déjà écrites, puis de terminer par les noms propres à trouver eux-mêmes.",
        differentiation:
          "Pictogrammes-consignes et tableau de structuration des tâches disponibles sur le site compagnon ; activité « Pour s'entrainer » supplémentaire et activité « Pour aller plus loin » également proposées.",
      },
    ],
    material: ["Fichier de l'élève p. 144", "Tableau de structuration des tâches"],
    photocopies: [],
  },
  {
    id: "cleo-p5-4",
    title: "Je découvre le passé composé",
    subject: "francais",
    objective:
      "Comprendre que le passé composé est formé de deux mots (auxiliaire avoir au présent + participe passé en -é) et l'utiliser pour exprimer une action passée, en le distinguant du présent.",
    competence:
      "Orthographe grammaticale : apprendre à conjuguer au passé composé les verbes être, avoir et les verbes du premier groupe.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : comparer présent et passé composé",
        duration: "20 min",
        detail:
          "Projeter l'activité p. 146. Les élèves relient des paires de phrases au présent et au passé composé (j'ai chanté une chanson / je chante une chanson) et explicitent la différence de temps, puis colorient les étiquettes. Lors de la correction, écrire au tableau deux colonnes de formes verbales avec leur pronom sujet : entourer en violet le verbe avoir conjugué au présent, en rouge les terminaisons en -é, et nommer le temps « passé composé » car il est composé de deux mots. Faire manipuler le jeu d'étiquettes de conjugaison (pronom sujet / auxiliaire avoir / radical / -é) pour former plusieurs verbes au passé composé.",
      },
      {
        title: "Pour s'entrainer : écrire des phrases au passé composé",
        duration: "20 min",
        detail:
          "Activité p. 146 : écrire quatre phrases au passé composé en choisissant une étiquette dans chaque colonne, en commençant à l'oral avec le pronom J'. Faire construire mentalement la phrase complète avant de l'écrire ; au besoin, faire corriger au tableau une phrase mal construite (ex. *J'avons traversé).",
      },
      {
        title: "Prolongement : affiche référente et aide-mémoire",
        duration: "15 min",
        detail:
          "Présenter l'affiche n° 29 dès la première séance de la série, et faire apprendre la leçon n° 35 de l'aide-mémoire après deux ou trois entrainements. Le passé composé est ici limité aux verbes formés avec l'auxiliaire avoir.",
      },
    ],
    material: ["Fichier de l'élève p. 146", "Étiquettes de conjugaison", "Affiche n° 29"],
    photocopies: [],
  },
  {
    id: "cleo-p5-5",
    title: "Je transforme des phrases",
    subject: "francais",
    objective:
      "Transformer une phrase en faisant varier le genre d'un groupe nominal ou d'un participe passé, en repérant tous les mots concernés par le changement (déterminant, nom, adjectif, terminaison verbale).",
    competence:
      "Se repérer dans la phrase simple : opérer des manipulations de phrase (déplacement, suppression, ajout, substitution) en grammaire comme en production écrite.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : transformer une phrase à partir de deux dessins",
        duration: "15 min",
        detail:
          "Projeter l'activité p. 148. Former oralement la première phrase à partir de l'illustration, puis les élèves réalisent l'activité individuellement. Écrire les deux phrases obtenues l'une sous l'autre au tableau pour la correction et entourer les mots qui varient du féminin au masculin (elle/il ; grande/grand). Lors de la mise en commun, faire trouver des noms de métiers utilisant les suffixes -eur/-euse (coiffeur/coiffeuse, jongleur/jongleuse).",
      },
      {
        title: "Pour s'entrainer : même procédure en autonomie",
        duration: "20 min",
        detail:
          "Poursuite avec l'activité p. 148 en suivant la même procédure que pour l'activité « Pour commencer » : écrire deux phrases sous les dessins puis colorier les mots et terminaisons qui changent d'une phrase à l'autre.",
        differentiation:
          "Pictogrammes-consignes et tableau de structuration des tâches disponibles sur le site compagnon.",
      },
      {
        title: "Prolongement : dictée et affiches référentes",
        duration: "15 min",
        detail:
          "La plupart des phrases de la série peuvent faire l'objet d'une dictée quelque temps après l'activité. Selon les besoins des élèves, utiliser les affiches nos 18, 19 et 20 (accords en genre et en nombre, adjectifs).",
      },
    ],
    material: ["Fichier de l'élève p. 148", "Affiches nos 18, 19 et 20 (selon besoins)"],
    photocopies: [],
  },
  {
    id: "cleo-p5-6",
    title: "J'écris les mots avec ille, aille, eille, euille, ouille",
    subject: "francais",
    objective:
      "Encoder des mots féminins contenant les graphies du phonème [j] : ille, aille, eille, euille, ouille, en les distinguant de leurs équivalents masculins étudiés précédemment (ail, eil, euil, ouil).",
    competence:
      "Identifier les mots de manière de plus en plus aisée : automatiser le décodage des correspondances graphophonémiques (CGP), y compris les plus complexes.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : rappel des graphies (noms féminins et verbes)",
        duration: "15 min",
        detail:
          "Rappel rapide des graphies du phonème [j] au tableau (aille, eille, euille, ouille, ille), avec des exemples de noms et de verbes conjugués (une médaille / je travaille ; une abeille / il se réveille ; une feuille, la citrouille / elle fouille ; une fille / il s'habille), en faisant identifier à chaque fois s'il s'agit d'un nom ou d'un verbe. Projeter ensuite l'activité p. 150 ; les élèves la réalisent individuellement puis répondent à l'oral : « Pourquoi ces mots se terminent-ils tous par -e ? » (ce sont des noms féminins, à vérifier avec le déterminant une).",
      },
      {
        title: "Pour s'entrainer : mots incomplets à partir des dessins",
        duration: "20 min",
        detail:
          "Poursuite avec l'activité p. 150 : associer des débuts et des fins de mots pour compléter les mots correspondant aux dessins.",
        differentiation:
          "Laisser les élèves travailler seuls sur le fichier en aidant au besoin les élèves en difficulté ; une correction individuelle après correction par l'enseignant est préférable. Pictogrammes-consignes, tableau de structuration des tâches et étiquettes disponibles sur le site compagnon.",
      },
      {
        title: "Prolongement : affiche référente et dictée",
        duration: "15 min",
        detail:
          "Présenter et expliciter l'usage de l'affiche n° 12. Quelques jours après la série, proposer une dictée de mots reprenant des mots utilisés dans les activités (elle se maquille, une écaille, une corbeille, une famille...) ; réitérer si besoin.",
      },
    ],
    material: ["Fichier de l'élève p. 150", "Étiquettes à manipuler", "Affiche n° 12"],
    photocopies: [],
  },
  {
    id: "cleo-p5-7",
    title: "Je fais un dessin pour montrer que j'ai compris",
    subject: "francais",
    objective:
      "Construire une représentation mentale organisée d'une situation décrite par un texte (en articulant les informations entre elles plutôt qu'en les juxtaposant), puis la retranscrire fidèlement sous forme d'un dessin complété.",
    competence:
      "Comprendre un texte : lire et comprendre en autonomie un texte narratif, informatif ou prescriptif, et réaliser ce qui est demandé (par exemple appliquer les indications d'un texte descriptif).",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : corriger un dessin d'après le texte",
        duration: "20 min",
        detail:
          "Projeter l'activité p. 152 et le dessin original tel que censé avoir été réalisé par l'élève fictif de l'activité. Faire lire le texte descriptif (la cabane, l'échelle, la porte, la fenêtre, le toit) puis observer le dessin déjà complété par cet élève fictif : entourer en vert les parties réussies, en rouge les parties erronées, en retournant systématiquement au texte pour justifier chaque écart (par exemple les feuilles dessinées alors que le texte précise « un arbre mort »).",
      },
      {
        title: "Pour s'entrainer : compléter son propre dessin",
        duration: "20 min",
        detail:
          "Poursuite avec l'activité p. 152 en suivant la même procédure : lire attentivement un nouveau texte descriptif puis compléter le dessin fourni en le respectant. Distribuer une photocopie du dessin de base à chaque élève (disponible sur le site compagnon) ; conseiller de dessiner d'abord au crayon à papier sans appuyer fort, pour pouvoir corriger facilement, avant d'autoriser l'usage des crayons de couleur.",
        differentiation:
          "Valider rapidement les tracés au crayon à papier avant de laisser les élèves finaliser en couleur ; corriger individuellement. Chaque activité du chapitre est également disponible en grand format sur le site compagnon.",
      },
    ],
    material: [
      "Fichier de l'élève p. 152",
      "Dessins grand format (site compagnon)",
      "Crayon à papier et crayons de couleur",
    ],
    photocopies: ["Dessin de base à compléter (1 par élève, disponible sur le site compagnon)"],
  },
  {
    id: "cleo-p5-8",
    title: "Je reconnais les familles de mots et les classes grammaticales",
    subject: "francais",
    objective:
      "Repérer dans un texte trois mots d'une même famille et déterminer leur classe grammaticale (nom, verbe, adjectif) à l'aide de procédures de test : ajout d'un déterminant, conjugaison ou recherche de l'infinitif, information apportée sur un nom.",
    competence:
      "Se repérer dans la phrase simple : différencier et nommer les principales classes de mots, et mémoriser l'orthographe des mots d'une même famille.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : lire un dialogue et trier les mots de la même famille",
        duration: "15 min",
        detail:
          "Projeter l'activité p. 154. Faire lire un dialogue à trois voix pour observer la ponctuation propre au dialogue (guillemets, tiret de changement d'interlocuteur), puis rechercher les trois mots d'une même famille (préférée/préfère/préférence) et déterminer leur classe grammaticale à l'aide de procédures de test (déterminant pour le nom, conjugaison/infinitif pour le verbe, accord et information sur le nom pour l'adjectif). Les élèves colorient ensuite les trois mots selon un code couleur (bleu = nom, rouge = verbe, vert = adjectif).",
      },
      {
        title: "Pour s'entrainer : même démarche sur deux courts textes",
        duration: "20 min",
        detail:
          "Activité p. 154, de même format : lire deux courts textes, entourer à chaque fois les trois mots d'une même famille puis les colorier selon le code couleur nom/verbe/adjectif.",
        differentiation:
          "S'assurer d'abord que les élèves comprennent bien les deux textes avant le travail individuel. Pictogrammes-consignes et tableau de structuration des tâches disponibles sur le site compagnon.",
      },
      {
        title: "Pour aller plus loin : réécrire un texte",
        duration: "20 min",
        detail:
          "Pour les élèves les plus performants, proposer de réécrire l'un des deux textes d'origine en ne modifiant que certains détails, en s'inspirant de sa structure. Une fois le texte finalisé, l'élève peut demander à un camarade d'en réaliser le dessin correspondant.",
      },
    ],
    material: ["Fichier de l'élève p. 154"],
    photocopies: [],
  },
  {
    id: "cleo-p5-9",
    title: "Je manipule des adjectifs",
    subject: "francais",
    objective:
      "Identifier la place de l'adjectif dans le groupe nominal (avant ou après le nom) et reconstituer des groupes nominaux dont l'ordre des mots a été perturbé, en distinguant déterminant, nom et adjectif.",
    competence:
      "Différencier et nommer les principales classes de mots, et reconnaitre le groupe nominal (déterminant / nom / adjectif) ainsi que la chaine d'accords qui les relie.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : groupes nominaux bien ou mal ordonnés",
        duration: "15 min",
        detail:
          "Projeter l'activité p. 156. Faire déterminer, pour plusieurs groupes nominaux, si les mots sont à leur place habituelle (une étrange histoire, les enfants endormis = corrects ; une petite jolie maison = incorrect, à corriger en une jolie petite maison). Identifier les mots déplacés comme des adjectifs, distincts du nom (maison) et du déterminant (une). Les élèves poursuivent l'activité individuellement.",
      },
      {
        title: "Correction et mise en commun : la place de l'adjectif",
        duration: "15 min",
        detail:
          "Écrire au tableau les groupes nominaux corrects en vis-à-vis et faire repérer, dans chacun, le déterminant, le nom et l'adjectif : les élèves remarquent que l'adjectif se situe parfois avant, parfois après le nom (ex. une histoire étrange / une étrange histoire, où l'adjectif peut occuper les deux positions).",
      },
      {
        title: "Pour s'entrainer : réordonner des phrases et étiqueter les mots",
        duration: "20 min",
        detail:
          "Activité p. 156 : réordonner des phrases dont les adjectifs sont mal placés (« un bon petit gouter »), puis annoter chaque mot du groupe nominal reconstitué avec D (déterminant), N (nom) ou Adj (adjectif).",
        differentiation:
          "Pour les élèves qui confondent nom et adjectif, rappeler que le nom est le mot principal du groupe nominal (impossible à supprimer) tandis que l'adjectif apporte une information sur ce nom.",
      },
    ],
    material: ["Fichier de l'élève p. 156"],
    photocopies: [],
  },
  {
    id: "cleo-p5-10",
    title: "Je trouve le sujet et le verbe de la phrase (2)",
    subject: "francais",
    objective:
      "Rétablir le sens logique d'une phrase en réordonnant ses mots, puis repérer et souligner le sujet et le verbe de la phrase corrigée, en accordant le verbe au sujet.",
    competence:
      "Se repérer dans la phrase simple : identifier la phrase simple, distinguer et manipuler ses constituants (groupe sujet, verbe, compléments).",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : corriger une phrase absurde",
        duration: "20 min",
        detail:
          "Projeter l'activité p. 158, suite du chapitre « Je trouve le sujet et le verbe de la phrase (1) » de la période 1. Lire deux phrases dont l'une n'a pas de sens (« Les lettres distribuent le facteur ») et faire expliciter le raisonnement (« C'est le facteur qui distribue les lettres, pas l'inverse »). Barrer la phrase absurde, puis faire repérer le sujet (de qui/quoi parle la phrase ? le facteur) et le verbe (qu'est-ce qu'il fait ? il distribue), en s'appuyant si besoin sur une liste de verbes connus (marcher, dormir, manger). Souligner le sujet en bleu et le verbe en rouge au tableau.",
      },
      {
        title: "Pour s'entrainer : rétablir puis souligner",
        duration: "20 min",
        detail:
          "Activité p. 158 : cette fois, les élèves rétablissent eux-mêmes le sens d'une phrase donnée dans le désordre, puis soulignent le sujet et le verbe de la phrase corrigée.",
        differentiation:
          "Aider les élèves les plus fragiles à déchiffrer la phrase, à en rétablir le sens logique, puis à repérer le sujet et le verbe.",
      },
      {
        title: "Prolongement : aide-mémoire",
        duration: "15 min",
        detail:
          "Faire réviser la leçon n° 19 de l'aide-mémoire (le sujet de la phrase) après deux ou trois entrainements de la série.",
      },
    ],
    material: ["Fichier de l'élève p. 158", "Aide-mémoire (leçon n° 19)"],
    photocopies: [],
  },
  {
    id: "cleo-p5-11",
    title: "J'écris les mots avec gn ou gu",
    subject: "francais",
    objective:
      "Encoder des mots contenant le son [ɲ] (graphie gn) et distinguer les mots où le son [g] s'écrit gu.",
    competence:
      "Identifier les mots de manière de plus en plus aisée : automatiser le décodage des correspondances graphophonémiques (CGP), y compris les plus complexes.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : trier les mots au tableau",
        duration: "15 min",
        detail:
          "Demander aux élèves de trouver des mots où l'on entend [ɲ] puis des mots où l'on entend [g], et les écrire au tableau en deux colonnes en ne retenant, pour [g], que les mots où il s'écrit gu (un signe, gagner, grignoter, mignon / une guitare, une baguette, guérir, la longueur). Faire remarquer que [ɲ] s'écrit toujours gn. Projeter ensuite l'activité p. 160.",
      },
      {
        title: "Pour s'entrainer : écrire les mots des dessins",
        duration: "20 min",
        detail:
          "Poursuite avec l'activité p. 160 (format déjà connu des élèves) : écrire les mots correspondant aux dessins à l'aide des syllabes proposées. Faire d'abord dire les mots à voix haute avant de les écrire.",
        differentiation:
          "Laisser les élèves travailler seuls sur le fichier en aidant au besoin les élèves en difficulté. Pictogrammes-consignes, tableau de structuration des tâches et étiquettes disponibles sur le site compagnon.",
      },
    ],
    material: ["Fichier de l'élève p. 160", "Étiquettes à manipuler"],
    photocopies: [],
  },
  {
    id: "cleo-p5-12",
    title: "Je découvre les préfixes",
    subject: "francais",
    objective:
      "Comprendre et utiliser le sens des préfixes para-, anti-, multi- et télé- pour construire ou expliquer des mots inconnus à partir de leur définition.",
    competence:
      "Enrichir son vocabulaire dans toutes les disciplines : s'appuyer sur la morphologie des mots pour en déduire le sens.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : le préfixe para-",
        duration: "15 min",
        detail:
          "Projeter l'activité p. 162. Relier collectivement « un paratonnerre » à sa définition, puis rechercher d'autres mots commençant par para- (parapluie, parachute, parasol, paravent) pour dégager le sens commun « qui protège ». Les élèves poursuivent l'activité individuellement.",
      },
      {
        title: "Pour s'entrainer : construire des mots à partir de préfixes",
        duration: "20 min",
        detail:
          "Activité p. 162, de format proche : à partir de définitions données, les élèves doivent cette fois constituer eux-mêmes les mots correspondants en associant un préfixe (para, anti, télé, multi) et une fin de mot. Lors de la correction, expliciter le sens de chaque préfixe (télé-, anti-, multi-) et faire trouver des exemples supplémentaires.",
        differentiation:
          "Pictogrammes-consignes, tableau de structuration des tâches et étiquettes disponibles sur le site compagnon.",
      },
    ],
    material: ["Fichier de l'élève p. 162", "Étiquettes à manipuler"],
    photocopies: [],
  },
  {
    id: "cleo-p5-13",
    title: "Je découvre les niveaux de langue",
    subject: "francais",
    objective:
      "Repérer, dans un court texte, deux mots de sens équivalent appartenant à des niveaux de langue différents (familier / courant) et les distinguer par un code couleur.",
    competence:
      "Établir des relations entre les mots : percevoir les niveaux de langue familier, courant et soutenu.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : relier les mots de sens équivalent",
        duration: "15 min",
        detail:
          "Projeter l'activité p. 164. Commencer en reliant une première paire de mots (des godasses / des chaussures), puis les élèves relient individuellement les autres paires et complètent les phrases avec « familier » et « courant ». Lors de la correction, expliciter les usages contrastés : le mode de discours (oral/écrit), les interlocuteurs (copains, adultes) et le contexte (même entre copains, on évite le registre familier devant certains adultes).",
      },
      {
        title: "Pour s'entrainer : lire des textes et colorier les niveaux de langue",
        duration: "20 min",
        detail:
          "Activité p. 164 : faire lire à voix haute par deux élèves un premier texte (narrateur et personnage) pour observer les guillemets du discours direct, puis entourer dans chaque texte les deux mots de même sens et colorier en jaune le mot familier, en vert le mot courant.",
        differentiation:
          "Expliciter les deux dernières consignes si nécessaire avant de laisser les élèves travailler individuellement.",
      },
    ],
    material: ["Fichier de l'élève p. 164"],
    photocopies: [],
  },
  {
    id: "cleo-p5-14",
    title: "J'écris le masculin et le féminin des adjectifs",
    subject: "francais",
    objective:
      "Passer du féminin au masculin d'un adjectif en s'appuyant sur la forme féminine pour identifier la consonne muette qui doit apparaitre au masculin (ex. gourmande → gourmand).",
    competence:
      "Orthographe grammaticale : reconnaitre la chaine d'accords du groupe nominal et anticiper une lettre muette finale à l'aide d'un mot de la même famille.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : cacher la fin du féminin pour trouver le masculin",
        duration: "15 min",
        detail:
          "Projeter l'activité p. 166. Traiter oralement les deux premières lignes en insistant sur les lettres muettes en fin de mot, puis les élèves poursuivent individuellement. Lors de la correction, faire expliciter la procédure par les élèves eux-mêmes (« gourmand, il y a un d parce qu'on dit gourmande ») et explorer, pour poilu(e), une hypothèse erronée (pas de t car on ne dit pas *poilute).",
        differentiation:
          "Aider individuellement les élèves les plus faibles pendant le travail sur fichier.",
      },
      {
        title: "Pour s'entrainer : même format en autonomie",
        duration: "20 min",
        detail:
          "Poursuite avec l'activité p. 166, de même format : cacher la fin de l'adjectif au féminin puis écrire l'adjectif au masculin correspondant.",
        differentiation:
          "Au fil des entrainements, quelques adjectifs irréguliers (première/premier, attentive/attentif, ancienne/ancien) seront commentés au cas par cas ; ils seront étudiés plus complètement au CE2 et au cycle 3. Pictogrammes-consignes et tableau de structuration des tâches disponibles sur le site compagnon.",
      },
    ],
    material: ["Fichier de l'élève p. 166"],
    photocopies: [],
  },
  {
    id: "cleo-p5-15",
    title: "J'organise les mots du général au particulier",
    subject: "francais",
    objective:
      "Regrouper des mots appartenant à une même catégorie et les ordonner du plus général au plus particulier à l'aide de flèches (ex. plante → fleur → rose).",
    competence:
      "Établir des relations entre les mots : percevoir de grandes catégories et hiérarchiser des termes génériques, de base et spécifiques.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : observer un exemple déjà réalisé",
        duration: "15 min",
        detail:
          "Projeter l'activité p. 168. Observer l'exemple donné (plante, fleur et rose appartiennent à la catégorie des végétaux) et faire comprendre que les flèches indiquent une relation d'appartenance (la rose est un exemple de fleur, la fleur un exemple de plante). Esquisser au tableau un schéma explicite (plante > arbre / algue / fleur / fougère > rose / coquelicot / marguerite / violette), puis colorier les trois mots de l'exemple.",
      },
      {
        title: "Pour s'entrainer : catégoriser d'autres séries de mots",
        duration: "20 min",
        detail:
          "Activité p. 168, de même format : pour chaque nouvelle série de mots, trouver ceux qui appartiennent à la même catégorie, les colorier (en changeant de couleur à chaque série) et tracer les flèches du mot le plus général vers le mot le plus particulier.",
        differentiation:
          "Pictogrammes-consignes et tableau de structuration des tâches disponibles sur le site compagnon.",
      },
    ],
    material: ["Fichier de l'élève p. 168"],
    photocopies: [],
  },
  {
    id: "cleo-p5-16",
    title: "J'écris les mots avec oi, oin, ion",
    subject: "francais",
    objective:
      "Encoder des mots contenant les graphies oi, oin et ion en s'appuyant sur les sons entendus.",
    competence:
      "Identifier les mots de manière de plus en plus aisée : automatiser le décodage des correspondances graphophonémiques (CGP), y compris les plus complexes.",
    duration: "20 min",
    phases: [
      {
        title: "Pour commencer : trier oin et ion au tableau",
        duration: "15 min",
        detail:
          "Écrire au tableau deux colonnes oin et ion, demander aux élèves quels sons on entend, puis leur faire proposer des exemples (loin, un coin, moins, un pion, une question, Marion...) à écrire et relire dans la colonne correspondante. Projeter ensuite l'activité p. 172, de format déjà connu des élèves.",
      },
      {
        title: "Pour s'entrainer : écrire les mots des dessins",
        duration: "20 min",
        detail:
          "Poursuite avec l'activité p. 172, de même format que l'activité « Pour commencer » : écrire les mots correspondant aux dessins à l'aide des syllabes proposées.",
        differentiation:
          "Pictogrammes-consignes, tableau de structuration des tâches et étiquettes disponibles sur le site compagnon.",
      },
      {
        title: "Prolongement : affiche référente",
        duration: "15 min",
        detail:
          "Présenter et expliciter l'usage de l'affiche n° 13 (oi - oin - ion : un avion, le poing, une étoile). Les deux activités du chapitre couvrent l'ensemble de la période 5.",
      },
    ],
    material: ["Fichier de l'élève p. 172", "Étiquettes à manipuler", "Affiche n° 13"],
    photocopies: [],
  },
];
