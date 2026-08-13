export type WritingGuidePrepSheet = {
  id: string;
  order: number;
  group: string;
  title: string;
  objective: string;
  competence: string;
  currentWorkbookPages: number[];
  teacherPages: number[];
  legacyWorkbookPages: number[];
  sourceStatus: "aligned" | "partial" | "summary_only";
  updateNeeded: boolean;
  phases: {
    title: string;
    detail: string;
  }[];
  notes: string[];
  coverageNote: string;
  sourceExcerpt: string;
};

export const mdiEcritureTransitionPrepSheets = [
  {
    id: "mdi-ecriture-transition-position-corps-avant-bras",
    order: 1,
    group: "Avant d'écrire",
    title: "La position du corps et de l'avant-bras",
    objective:
      "CP-CE1 → p. 4-5 L’apprentissage de la bonne tenue du crayon est essentiel pour permettre à l’enfant d’acquérir une écriture lisible et fluide. Si tous les élèves de la classe n’ont pas automatisé une tenue de crayon correcte dès la maternelle, cet apprentissage doit absolument êt",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [4],
    teacherPages: [4, 5],
    legacyWorkbookPages: [4, 5],
    sourceStatus: "partial",
    updateNeeded: true,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "Avant d'écrire — La position du corps et de l'avant-bras — cahier élève p. 4 à 4.",
      },
      {
        title: "Guide pédagogique 2018",
        detail:
          "4\n© MDI, 2018\nCahier d’écriture CP-CE1 → p. 4-5\nL’apprentissage de la bonne tenue du crayon est essentiel pour permettre à l’enfant d’acquérir une\nécriture lisible et fluide. Si tous les élèves de la classe n’ont pas automatisé une tenue de crayon\ncorrecte dès la maternelle, cet apprentissage doit absolument être mené en début de classe de CP\nou de CE1.\nIl est très difficile de rectifier une tenue de crayon inadéquate. Il est plus facile d’en apprendre une\nnouvelle, puis de remplacer l’ancienne tenue de crayon par la nouvelle. Il ne faut pas hésiter à rappeler\naux enfants qu’ils sont à la grande école et qu’il s’agit maintenant d’apprendre la tenue de crayon\n« des grands ».\n1. Le soleil\nAvant d’écrire\nLa pulpe du pouce doit être posée au contact du côté du majeur,\nsur la dernière phalange. L’index reste levé. Pour obtenir un\narrondi, il faut plier légèrement le pouce. L’enseignant ne doit pas\nhésiter à montrer sur ses propres mains qu’en tendant le pouce, il\ndéforme le soleil, qui n’est plus rond.\nLes enfants vont avoir tendance, pour faire le rond, à joindre la\npulpe du majeur à la pulpe du pouce. Bien insister sur la bonne\nposition, en n’hésitant pas à tracer un point sur le côté de la\ndernière phalange du majeur, pour donner un repère à l’élève.\nCet exercice est plus facile à faire et plus facile à corriger en\nposant le coude sur la table. Le crayon est posé dans la commis-\nsure pouce-index, que l’on appelle le « hamac ». L’important,\nen faisant cet exercice, est que l’enfant perçoive que le crayon\nrepose solidement sur le majeur, coincé seulement par le pouce.\nIl est essentiel qu’il se rende compte que l’index ne fait pas\npartie de la pince qui tient le crayon.\nAttention : certains enfants ont tendance à tendre le pouce, qui\nest alors « collé » au crayon. Bien leur rappeler de mettre les\ndoigts « en soleil », avec le pouce légèrement fléchi.\nÀ partir de l’exercice précédent, on propose aux enfants de poser\nl’avant-bras tranquillement sur la table, puis de poser l’index sur le\ncrayon. Si c’est un crayon triangulaire, on visualisera préalablement\nle côté qui est libre pour l’index. Beaucoup d’enfants ont tendance\nà appuyer l’index sur le crayon. Il faut vérifier qu’ils perdent cette\nhabitude et ne pas hésiter à leur demander de tapoter ou caresser\nle crayon avec l’index, qui doit rester souple et léger.\nUne métaphore possible à utiliser est celle du vélo : le majeur\nest la selle, sur laquelle on reste assis. Le pouce est le pédalier,\nqui permet d’avancer. L’index est le guidon, qui va diriger le vélo,\nmais sur lequel il ne faut pas appuyer (et où sont attachés les\nfreins : si on serre trop fort l’index, on freine l’écriture).\n2. Lever le doigt\n3. Prêt pour écrire !\n\n5\n© MDI, 2018\nVoici le modèle si tu écris\nde la main gauche.\nVoici le modèle si tu écris\nde la main droite.\n4. La position du cahier\n5. La fléchette\nLe cahier doit être positionné dans l’axe de l’avant-bras. L’enfant peut utiliser la marge comme point de repère.\nAttention : c’est bien le trait rouge de la marge qui doit venir se positionner dans le sens de l’avant-bras, et pas\nl’avant-bras qui doit venir se positionner le long de la marge ! Bien souvent, les enfants ont tendance à poser le\ncahier en face de leurs yeux et doivent ensuite se contorsionner pour mettre leur avant-bras le long de la marge,\nce qui est inconfortable et inefficace.\nLe crayon doit être bien tenu – au besoin, reprendre\ndans l’ordre les exercices de la p. 4. Le poignet est\nposé sur la table, au repos. Le crayon est dans l’axe de\nl’avant-bras, coincé entre les points bleus, posé dans le\n« hamac ». C’est en pliant puis en tendant le pouce que\nl’élève fait reculer et avancer le crayon.",
      },
    ],
    notes: [
      "Statut de correspondance : partiel.",
      "Le guide 2018 traite cette entrée dans la double page « Avant d’écrire » sans reprendre exactement le découpage 2025.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Guide 2018 p.4]\n4\n© MDI, 2018\nCahier d’écriture CP-CE1 → p. 4-5\nL’apprentissage de la bonne tenue du crayon est essentiel pour permettre à l’enfant d’acquérir une\nécriture lisible et fluide. Si tous les élèves de la classe n’ont pas automatisé une tenue de crayon\ncorrecte dès la maternelle, cet apprentissage doit absolument être mené en début de classe de CP\nou de CE1.\nIl est très difficile de rectifier une tenue de crayon inadéquate. Il est plus facile d’en apprendre une\nnouvelle, puis de remplacer l’ancienne tenue de crayon par la nouvelle. Il ne faut pas hésiter à rappeler\naux enfants qu’ils sont à la grande école et qu’il s’agit maintenant d’apprendre la tenue de crayon\n« des grands ».\n1. Le soleil\nAvant d’écrire\nLa pulpe du pouce doit être posée au contact du côté du majeur,\nsur la dernière phalange. L’index reste levé. Pour obtenir un\narrondi, il faut plier légèrement le pouce. L’enseignant ne doit pas\nhésiter à montrer sur ses propres mains qu’en tendant le pouce, il\ndéforme le soleil, qui n’est plus rond.\nLes enfants vont avoir tendance, pour faire le rond, à joindre la\npulpe du majeur à la pulpe du pouce. Bien insister sur la bonne\nposition, en n’hésitant pas à tracer un point sur le côté de la\ndernière phalange du majeur, pour donner un repère à l’élève.\nCet exercice est plus facile à faire et plus facile à corriger en\nposant le coude sur la table. Le crayon est posé dans la commis-\nsure pouce-index, que l’on appelle le « hamac ». L’important,\nen faisant cet exercice, est que l’enfant perçoive que le crayon\nrepose solidement sur le majeur, coincé seulement par le pouce.\nIl est essentiel qu’il se rende compte que l’index ne fait pas\npartie de la pince qui tient le crayon.\nAttention : certains enfants ont tendance à tendre le pouce, qui\nest alors « collé » au crayon. Bien leur rappeler de mettre les\ndoigts « en soleil », avec le pouce légèrement fléchi.\nÀ partir de l’exercice précédent, on propose aux enfants de poser\nl’avant-bras tranquillement sur la table, puis de poser l’index sur le\ncrayon. Si c’est un crayon triangulaire, on visualisera préalablement\nle côté qui est libre pour l’index. Beaucoup d’enfants ont tendance\nà appuyer l’index sur le crayon. Il faut vérifier qu’ils perdent cette\nhabitude et ne pas hésiter à leur demander de tapoter ou caresser\nle crayon avec l’index, qui doit rester souple et léger.\nUne métaphore possible à utiliser est celle du vélo : le majeur\nest la selle, sur laquelle on reste assis. Le pouce est le pédalier,\nqui permet d’avancer. L’index est le guidon, qui va diriger le vélo,\nmais sur lequel il ne faut pas appuyer (et où sont attachés les\nfreins : si on serre trop fort l’index, on freine l’écriture).\n2. Lever le doigt\n3. Prêt pour écrire !\n\n[Guide 2018 p.5]\n5\n© MDI, 2018\nVoici le modèle si tu écris\nde la main gauche.\nVoici le modèle si tu écris\nde la main droite.\n4. La position du cahier\n5. La fléchette\nLe cahier doit être positionné dans l’axe de l’avant-bras. L’enfant peut utiliser la marge comme point de repère.\nAttention : c’est bien le trait rouge de la marge qui doit venir se positionner dans le sens de l’avant-bras, et pas\nl’avant-bras qui doit venir se positionner le long de la marge ! Bien souvent, les enfants ont tendance à poser le\ncahier en face de leurs yeux et doivent ensuite se contorsionner pour mettre leur avant-bras le long de la marge,\nce qui est inconfortable et inefficace.\nLe crayon doit être bien tenu – au besoin, reprendre\ndans l’ordre les exercices de la p. 4. Le poignet est\nposé sur la table, au repos. Le crayon est dans l’axe de\nl’avant-bras, coincé entre les points bleus, posé dans le\n« hamac ». C’est en pliant puis en tendant le pouce que\nl’élève fait reculer et avancer le crayon.",
  },
  {
    id: "mdi-ecriture-transition-tenue-crayon",
    order: 2,
    group: "Avant d'écrire",
    title: "La tenue du crayon",
    objective:
      "CP-CE1 → p. 4-5 L’apprentissage de la bonne tenue du crayon est essentiel pour permettre à l’enfant d’acquérir une écriture lisible et fluide. Si tous les élèves de la classe n’ont pas automatisé une tenue de crayon correcte dès la maternelle, cet apprentissage doit absolument êt",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [5],
    teacherPages: [4, 5],
    legacyWorkbookPages: [4, 5],
    sourceStatus: "partial",
    updateNeeded: true,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "Avant d'écrire — La tenue du crayon — cahier élève p. 5 à 5.",
      },
      {
        title: "Guide pédagogique 2018",
        detail:
          "4\n© MDI, 2018\nCahier d’écriture CP-CE1 → p. 4-5\nL’apprentissage de la bonne tenue du crayon est essentiel pour permettre à l’enfant d’acquérir une\nécriture lisible et fluide. Si tous les élèves de la classe n’ont pas automatisé une tenue de crayon\ncorrecte dès la maternelle, cet apprentissage doit absolument être mené en début de classe de CP\nou de CE1.\nIl est très difficile de rectifier une tenue de crayon inadéquate. Il est plus facile d’en apprendre une\nnouvelle, puis de remplacer l’ancienne tenue de crayon par la nouvelle. Il ne faut pas hésiter à rappeler\naux enfants qu’ils sont à la grande école et qu’il s’agit maintenant d’apprendre la tenue de crayon\n« des grands ».\n1. Le soleil\nAvant d’écrire\nLa pulpe du pouce doit être posée au contact du côté du majeur,\nsur la dernière phalange. L’index reste levé. Pour obtenir un\narrondi, il faut plier légèrement le pouce. L’enseignant ne doit pas\nhésiter à montrer sur ses propres mains qu’en tendant le pouce, il\ndéforme le soleil, qui n’est plus rond.\nLes enfants vont avoir tendance, pour faire le rond, à joindre la\npulpe du majeur à la pulpe du pouce. Bien insister sur la bonne\nposition, en n’hésitant pas à tracer un point sur le côté de la\ndernière phalange du majeur, pour donner un repère à l’élève.\nCet exercice est plus facile à faire et plus facile à corriger en\nposant le coude sur la table. Le crayon est posé dans la commis-\nsure pouce-index, que l’on appelle le « hamac ». L’important,\nen faisant cet exercice, est que l’enfant perçoive que le crayon\nrepose solidement sur le majeur, coincé seulement par le pouce.\nIl est essentiel qu’il se rende compte que l’index ne fait pas\npartie de la pince qui tient le crayon.\nAttention : certains enfants ont tendance à tendre le pouce, qui\nest alors « collé » au crayon. Bien leur rappeler de mettre les\ndoigts « en soleil », avec le pouce légèrement fléchi.\nÀ partir de l’exercice précédent, on propose aux enfants de poser\nl’avant-bras tranquillement sur la table, puis de poser l’index sur le\ncrayon. Si c’est un crayon triangulaire, on visualisera préalablement\nle côté qui est libre pour l’index. Beaucoup d’enfants ont tendance\nà appuyer l’index sur le crayon. Il faut vérifier qu’ils perdent cette\nhabitude et ne pas hésiter à leur demander de tapoter ou caresser\nle crayon avec l’index, qui doit rester souple et léger.\nUne métaphore possible à utiliser est celle du vélo : le majeur\nest la selle, sur laquelle on reste assis. Le pouce est le pédalier,\nqui permet d’avancer. L’index est le guidon, qui va diriger le vélo,\nmais sur lequel il ne faut pas appuyer (et où sont attachés les\nfreins : si on serre trop fort l’index, on freine l’écriture).\n2. Lever le doigt\n3. Prêt pour écrire !\n\n5\n© MDI, 2018\nVoici le modèle si tu écris\nde la main gauche.\nVoici le modèle si tu écris\nde la main droite.\n4. La position du cahier\n5. La fléchette\nLe cahier doit être positionné dans l’axe de l’avant-bras. L’enfant peut utiliser la marge comme point de repère.\nAttention : c’est bien le trait rouge de la marge qui doit venir se positionner dans le sens de l’avant-bras, et pas\nl’avant-bras qui doit venir se positionner le long de la marge ! Bien souvent, les enfants ont tendance à poser le\ncahier en face de leurs yeux et doivent ensuite se contorsionner pour mettre leur avant-bras le long de la marge,\nce qui est inconfortable et inefficace.\nLe crayon doit être bien tenu – au besoin, reprendre\ndans l’ordre les exercices de la p. 4. Le poignet est\nposé sur la table, au repos. Le crayon est dans l’axe de\nl’avant-bras, coincé entre les points bleus, posé dans le\n« hamac ». C’est en pliant puis en tendant le pouce que\nl’élève fait reculer et avancer le crayon.",
      },
    ],
    notes: [
      "Statut de correspondance : partiel.",
      "Le guide 2018 regroupe la tenue du crayon avec d’autres prérequis gestuels dans « Avant d’écrire ».",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Guide 2018 p.4]\n4\n© MDI, 2018\nCahier d’écriture CP-CE1 → p. 4-5\nL’apprentissage de la bonne tenue du crayon est essentiel pour permettre à l’enfant d’acquérir une\nécriture lisible et fluide. Si tous les élèves de la classe n’ont pas automatisé une tenue de crayon\ncorrecte dès la maternelle, cet apprentissage doit absolument être mené en début de classe de CP\nou de CE1.\nIl est très difficile de rectifier une tenue de crayon inadéquate. Il est plus facile d’en apprendre une\nnouvelle, puis de remplacer l’ancienne tenue de crayon par la nouvelle. Il ne faut pas hésiter à rappeler\naux enfants qu’ils sont à la grande école et qu’il s’agit maintenant d’apprendre la tenue de crayon\n« des grands ».\n1. Le soleil\nAvant d’écrire\nLa pulpe du pouce doit être posée au contact du côté du majeur,\nsur la dernière phalange. L’index reste levé. Pour obtenir un\narrondi, il faut plier légèrement le pouce. L’enseignant ne doit pas\nhésiter à montrer sur ses propres mains qu’en tendant le pouce, il\ndéforme le soleil, qui n’est plus rond.\nLes enfants vont avoir tendance, pour faire le rond, à joindre la\npulpe du majeur à la pulpe du pouce. Bien insister sur la bonne\nposition, en n’hésitant pas à tracer un point sur le côté de la\ndernière phalange du majeur, pour donner un repère à l’élève.\nCet exercice est plus facile à faire et plus facile à corriger en\nposant le coude sur la table. Le crayon est posé dans la commis-\nsure pouce-index, que l’on appelle le « hamac ». L’important,\nen faisant cet exercice, est que l’enfant perçoive que le crayon\nrepose solidement sur le majeur, coincé seulement par le pouce.\nIl est essentiel qu’il se rende compte que l’index ne fait pas\npartie de la pince qui tient le crayon.\nAttention : certains enfants ont tendance à tendre le pouce, qui\nest alors « collé » au crayon. Bien leur rappeler de mettre les\ndoigts « en soleil », avec le pouce légèrement fléchi.\nÀ partir de l’exercice précédent, on propose aux enfants de poser\nl’avant-bras tranquillement sur la table, puis de poser l’index sur le\ncrayon. Si c’est un crayon triangulaire, on visualisera préalablement\nle côté qui est libre pour l’index. Beaucoup d’enfants ont tendance\nà appuyer l’index sur le crayon. Il faut vérifier qu’ils perdent cette\nhabitude et ne pas hésiter à leur demander de tapoter ou caresser\nle crayon avec l’index, qui doit rester souple et léger.\nUne métaphore possible à utiliser est celle du vélo : le majeur\nest la selle, sur laquelle on reste assis. Le pouce est le pédalier,\nqui permet d’avancer. L’index est le guidon, qui va diriger le vélo,\nmais sur lequel il ne faut pas appuyer (et où sont attachés les\nfreins : si on serre trop fort l’index, on freine l’écriture).\n2. Lever le doigt\n3. Prêt pour écrire !\n\n[Guide 2018 p.5]\n5\n© MDI, 2018\nVoici le modèle si tu écris\nde la main gauche.\nVoici le modèle si tu écris\nde la main droite.\n4. La position du cahier\n5. La fléchette\nLe cahier doit être positionné dans l’axe de l’avant-bras. L’enfant peut utiliser la marge comme point de repère.\nAttention : c’est bien le trait rouge de la marge qui doit venir se positionner dans le sens de l’avant-bras, et pas\nl’avant-bras qui doit venir se positionner le long de la marge ! Bien souvent, les enfants ont tendance à poser le\ncahier en face de leurs yeux et doivent ensuite se contorsionner pour mettre leur avant-bras le long de la marge,\nce qui est inconfortable et inefficace.\nLe crayon doit être bien tenu – au besoin, reprendre\ndans l’ordre les exercices de la p. 4. Le poignet est\nposé sur la table, au repos. Le crayon est dans l’axe de\nl’avant-bras, coincé entre les points bleus, posé dans le\n« hamac ». C’est en pliant puis en tendant le pouce que\nl’élève fait reculer et avancer le crayon.",
  },
  {
    id: "mdi-ecriture-transition-entrainement-pouce",
    order: 3,
    group: "Avant d'écrire",
    title: "L'entraînement du pouce",
    objective:
      "CP-CE1 → p. 4-5 L’apprentissage de la bonne tenue du crayon est essentiel pour permettre à l’enfant d’acquérir une écriture lisible et fluide. Si tous les élèves de la classe n’ont pas automatisé une tenue de crayon correcte dès la maternelle, cet apprentissage doit absolument êt",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [6, 7],
    teacherPages: [4, 5],
    legacyWorkbookPages: [4, 5],
    sourceStatus: "partial",
    updateNeeded: true,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "Avant d'écrire — L'entraînement du pouce — cahier élève p. 6 à 7.",
      },
      {
        title: "Guide pédagogique 2018",
        detail:
          "4\n© MDI, 2018\nCahier d’écriture CP-CE1 → p. 4-5\nL’apprentissage de la bonne tenue du crayon est essentiel pour permettre à l’enfant d’acquérir une\nécriture lisible et fluide. Si tous les élèves de la classe n’ont pas automatisé une tenue de crayon\ncorrecte dès la maternelle, cet apprentissage doit absolument être mené en début de classe de CP\nou de CE1.\nIl est très difficile de rectifier une tenue de crayon inadéquate. Il est plus facile d’en apprendre une\nnouvelle, puis de remplacer l’ancienne tenue de crayon par la nouvelle. Il ne faut pas hésiter à rappeler\naux enfants qu’ils sont à la grande école et qu’il s’agit maintenant d’apprendre la tenue de crayon\n« des grands ».\n1. Le soleil\nAvant d’écrire\nLa pulpe du pouce doit être posée au contact du côté du majeur,\nsur la dernière phalange. L’index reste levé. Pour obtenir un\narrondi, il faut plier légèrement le pouce. L’enseignant ne doit pas\nhésiter à montrer sur ses propres mains qu’en tendant le pouce, il\ndéforme le soleil, qui n’est plus rond.\nLes enfants vont avoir tendance, pour faire le rond, à joindre la\npulpe du majeur à la pulpe du pouce. Bien insister sur la bonne\nposition, en n’hésitant pas à tracer un point sur le côté de la\ndernière phalange du majeur, pour donner un repère à l’élève.\nCet exercice est plus facile à faire et plus facile à corriger en\nposant le coude sur la table. Le crayon est posé dans la commis-\nsure pouce-index, que l’on appelle le « hamac ». L’important,\nen faisant cet exercice, est que l’enfant perçoive que le crayon\nrepose solidement sur le majeur, coincé seulement par le pouce.\nIl est essentiel qu’il se rende compte que l’index ne fait pas\npartie de la pince qui tient le crayon.\nAttention : certains enfants ont tendance à tendre le pouce, qui\nest alors « collé » au crayon. Bien leur rappeler de mettre les\ndoigts « en soleil », avec le pouce légèrement fléchi.\nÀ partir de l’exercice précédent, on propose aux enfants de poser\nl’avant-bras tranquillement sur la table, puis de poser l’index sur le\ncrayon. Si c’est un crayon triangulaire, on visualisera préalablement\nle côté qui est libre pour l’index. Beaucoup d’enfants ont tendance\nà appuyer l’index sur le crayon. Il faut vérifier qu’ils perdent cette\nhabitude et ne pas hésiter à leur demander de tapoter ou caresser\nle crayon avec l’index, qui doit rester souple et léger.\nUne métaphore possible à utiliser est celle du vélo : le majeur\nest la selle, sur laquelle on reste assis. Le pouce est le pédalier,\nqui permet d’avancer. L’index est le guidon, qui va diriger le vélo,\nmais sur lequel il ne faut pas appuyer (et où sont attachés les\nfreins : si on serre trop fort l’index, on freine l’écriture).\n2. Lever le doigt\n3. Prêt pour écrire !\n\n5\n© MDI, 2018\nVoici le modèle si tu écris\nde la main gauche.\nVoici le modèle si tu écris\nde la main droite.\n4. La position du cahier\n5. La fléchette\nLe cahier doit être positionné dans l’axe de l’avant-bras. L’enfant peut utiliser la marge comme point de repère.\nAttention : c’est bien le trait rouge de la marge qui doit venir se positionner dans le sens de l’avant-bras, et pas\nl’avant-bras qui doit venir se positionner le long de la marge ! Bien souvent, les enfants ont tendance à poser le\ncahier en face de leurs yeux et doivent ensuite se contorsionner pour mettre leur avant-bras le long de la marge,\nce qui est inconfortable et inefficace.\nLe crayon doit être bien tenu – au besoin, reprendre\ndans l’ordre les exercices de la p. 4. Le poignet est\nposé sur la table, au repos. Le crayon est dans l’axe de\nl’avant-bras, coincé entre les points bleus, posé dans le\n« hamac ». C’est en pliant puis en tendant le pouce que\nl’élève fait reculer et avancer le crayon.",
      },
    ],
    notes: [
      "Statut de correspondance : partiel.",
      "Le guide 2018 couvre l’entraînement du pouce dans les exercices préparatoires, mais pas comme rubrique autonome.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Guide 2018 p.4]\n4\n© MDI, 2018\nCahier d’écriture CP-CE1 → p. 4-5\nL’apprentissage de la bonne tenue du crayon est essentiel pour permettre à l’enfant d’acquérir une\nécriture lisible et fluide. Si tous les élèves de la classe n’ont pas automatisé une tenue de crayon\ncorrecte dès la maternelle, cet apprentissage doit absolument être mené en début de classe de CP\nou de CE1.\nIl est très difficile de rectifier une tenue de crayon inadéquate. Il est plus facile d’en apprendre une\nnouvelle, puis de remplacer l’ancienne tenue de crayon par la nouvelle. Il ne faut pas hésiter à rappeler\naux enfants qu’ils sont à la grande école et qu’il s’agit maintenant d’apprendre la tenue de crayon\n« des grands ».\n1. Le soleil\nAvant d’écrire\nLa pulpe du pouce doit être posée au contact du côté du majeur,\nsur la dernière phalange. L’index reste levé. Pour obtenir un\narrondi, il faut plier légèrement le pouce. L’enseignant ne doit pas\nhésiter à montrer sur ses propres mains qu’en tendant le pouce, il\ndéforme le soleil, qui n’est plus rond.\nLes enfants vont avoir tendance, pour faire le rond, à joindre la\npulpe du majeur à la pulpe du pouce. Bien insister sur la bonne\nposition, en n’hésitant pas à tracer un point sur le côté de la\ndernière phalange du majeur, pour donner un repère à l’élève.\nCet exercice est plus facile à faire et plus facile à corriger en\nposant le coude sur la table. Le crayon est posé dans la commis-\nsure pouce-index, que l’on appelle le « hamac ». L’important,\nen faisant cet exercice, est que l’enfant perçoive que le crayon\nrepose solidement sur le majeur, coincé seulement par le pouce.\nIl est essentiel qu’il se rende compte que l’index ne fait pas\npartie de la pince qui tient le crayon.\nAttention : certains enfants ont tendance à tendre le pouce, qui\nest alors « collé » au crayon. Bien leur rappeler de mettre les\ndoigts « en soleil », avec le pouce légèrement fléchi.\nÀ partir de l’exercice précédent, on propose aux enfants de poser\nl’avant-bras tranquillement sur la table, puis de poser l’index sur le\ncrayon. Si c’est un crayon triangulaire, on visualisera préalablement\nle côté qui est libre pour l’index. Beaucoup d’enfants ont tendance\nà appuyer l’index sur le crayon. Il faut vérifier qu’ils perdent cette\nhabitude et ne pas hésiter à leur demander de tapoter ou caresser\nle crayon avec l’index, qui doit rester souple et léger.\nUne métaphore possible à utiliser est celle du vélo : le majeur\nest la selle, sur laquelle on reste assis. Le pouce est le pédalier,\nqui permet d’avancer. L’index est le guidon, qui va diriger le vélo,\nmais sur lequel il ne faut pas appuyer (et où sont attachés les\nfreins : si on serre trop fort l’index, on freine l’écriture).\n2. Lever le doigt\n3. Prêt pour écrire !\n\n[Guide 2018 p.5]\n5\n© MDI, 2018\nVoici le modèle si tu écris\nde la main gauche.\nVoici le modèle si tu écris\nde la main droite.\n4. La position du cahier\n5. La fléchette\nLe cahier doit être positionné dans l’axe de l’avant-bras. L’enfant peut utiliser la marge comme point de repère.\nAttention : c’est bien le trait rouge de la marge qui doit venir se positionner dans le sens de l’avant-bras, et pas\nl’avant-bras qui doit venir se positionner le long de la marge ! Bien souvent, les enfants ont tendance à poser le\ncahier en face de leurs yeux et doivent ensuite se contorsionner pour mettre leur avant-bras le long de la marge,\nce qui est inconfortable et inefficace.\nLe crayon doit être bien tenu – au besoin, reprendre\ndans l’ordre les exercices de la p. 4. Le poignet est\nposé sur la table, au repos. Le crayon est dans l’axe de\nl’avant-bras, coincé entre les points bleus, posé dans le\n« hamac ». C’est en pliant puis en tendant le pouce que\nl’élève fait reculer et avancer le crayon.",
  },
  {
    id: "mdi-ecriture-transition-deplacement-avant-bras",
    order: 4,
    group: "Avant d'écrire",
    title: "Le déplacement de l'avant-bras",
    objective:
      "Voici le modèle si tu écris de la main gauche. Voici le modèle si tu écris de la main droite.",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [8, 9],
    teacherPages: [5],
    legacyWorkbookPages: [5],
    sourceStatus: "partial",
    updateNeeded: true,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "Avant d'écrire — Le déplacement de l'avant-bras — cahier élève p. 8 à 9.",
      },
      {
        title: "Guide pédagogique 2018",
        detail:
          "5\n© MDI, 2018\nVoici le modèle si tu écris\nde la main gauche.\nVoici le modèle si tu écris\nde la main droite.\n4. La position du cahier\n5. La fléchette\nLe cahier doit être positionné dans l’axe de l’avant-bras. L’enfant peut utiliser la marge comme point de repère.\nAttention : c’est bien le trait rouge de la marge qui doit venir se positionner dans le sens de l’avant-bras, et pas\nl’avant-bras qui doit venir se positionner le long de la marge ! Bien souvent, les enfants ont tendance à poser le\ncahier en face de leurs yeux et doivent ensuite se contorsionner pour mettre leur avant-bras le long de la marge,\nce qui est inconfortable et inefficace.\nLe crayon doit être bien tenu – au besoin, reprendre\ndans l’ordre les exercices de la p. 4. Le poignet est\nposé sur la table, au repos. Le crayon est dans l’axe de\nl’avant-bras, coincé entre les points bleus, posé dans le\n« hamac ». C’est en pliant puis en tendant le pouce que\nl’élève fait reculer et avancer le crayon.",
      },
    ],
    notes: [
      "Statut de correspondance : partiel.",
      "Le guide 2018 évoque le positionnement du cahier, du poignet et de l’avant-bras, sans leçon isolée intitulée ainsi.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Guide 2018 p.5]\n5\n© MDI, 2018\nVoici le modèle si tu écris\nde la main gauche.\nVoici le modèle si tu écris\nde la main droite.\n4. La position du cahier\n5. La fléchette\nLe cahier doit être positionné dans l’axe de l’avant-bras. L’enfant peut utiliser la marge comme point de repère.\nAttention : c’est bien le trait rouge de la marge qui doit venir se positionner dans le sens de l’avant-bras, et pas\nl’avant-bras qui doit venir se positionner le long de la marge ! Bien souvent, les enfants ont tendance à poser le\ncahier en face de leurs yeux et doivent ensuite se contorsionner pour mettre leur avant-bras le long de la marge,\nce qui est inconfortable et inefficace.\nLe crayon doit être bien tenu – au besoin, reprendre\ndans l’ordre les exercices de la p. 4. Le poignet est\nposé sur la table, au repos. Le crayon est dans l’axe de\nl’avant-bras, coincé entre les points bleus, posé dans le\n« hamac ». C’est en pliant puis en tendant le pouce que\nl’élève fait reculer et avancer le crayon.",
  },
  {
    id: "mdi-ecriture-transition-formes-de-base",
    order: 5,
    group: "Avant d'écrire",
    title: "Les formes de base",
    objective:
      "• Mes cahiers d’écriture, une nouvelle méthode d’apprentissage de l’écriture Cette collection a été mise au point par Laurence Pierson, rééducatrice en écriture et formatrice sur",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [10, 11],
    teacherPages: [2],
    legacyWorkbookPages: [],
    sourceStatus: "partial",
    updateNeeded: true,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "Avant d'écrire — Les formes de base — cahier élève p. 10 à 11.",
      },
      {
        title: "Guide pédagogique 2018",
        detail:
          "2\n© MDI, 2018\n• Mes cahiers d’écriture, une nouvelle\nméthode d’apprentissage de l’écriture\nCette collection a été mise au point par Laurence\nPierson, rééducatrice en écriture et formatrice sur\nl’écriture-lecture, qui a enseigné en école primaire\npendant près de 20 ans. Elle est membre fondatrice\nde l’association 5E : Enseignement de l’Écriture\npour Élèves, Étudiants et Enseignants. Son site\nInternet www.ecritureparis.fr présente de nombreuses\ninformations sur l’écriture manuscrite.\n• Deux cahiers pour une progression spiralaire\nLe premier cahier est dédié à l’apprentissage\ndes minuscules en cursive en début de CP .\nCe deuxième cahier permet de continuer et\nd’approfondir cet apprentissage au cours du\nreste de l’année de CP et/ou au début du CE1.\nIl reprend l’écriture de l’ensemble des lettres\n(en incluant la cédille et le œ). Il permet aussi de\ntravailler les enchainements difficiles et intègre\nla ponctuation, la transcription scripte-cursive,\nle tracé des chiffres et des signes mathématiques.\n• Une préparation systématique avant l’écriture\nCe cahier de perfectionnement rappelle sur une double\npage, en début d’ouvrage, les bons gestes à maitriser\npour la tenue du crayon et le positionnement de l’avant-\nbras sur le cahier. Ces exercices et d’autres (gym des\ndoigts, entrainement du pouce, repérage dans la page)\npeuvent être approfondis, à l’aide du site compagnon\necriture.mdi-editions.com, en fonction des besoins.\n• Un format de cahier adapté aux élèves\nde CP-CE1, qu’ils soient droitiers ou gauchers\nLe format de ce cahier (17 x 22 cm) est idéal\npour les jeunes enfants : il n’est pas encombrant,\nce qui permet d’être bien positionné sur la table\npour écrire. Il est adapté aussi bien aux gauchers\nqu’aux droitiers, car il présente posture et tenue\ndu crayon pour les deux cas. Le lignage Seyès\n2,5 mm permet la transition en douceur vers\nle Seyès ordinaire, où les interlignes font 2 mm.\n• Des modèles de lettres conformes\naux programmes\nLes documents d’accompagnement des programmes\nofficiels du ministère de l’Éducation nationale\npréconisent de normaliser la forme des lettres : le\ne est présenté en un seul geste comme une boucle,\non n'ajoute pas d’œilletons aux lettres et il n'y a\npas de traits d’attaque avant les lettres rondes. Ce\ncahier applique ces recommandations, qui facilitent\nl’apprentissage de l’écriture.\n• Une progression liée au geste d’écriture\nLa progression des lettres est élaborée en fonction\ndes gestes de base de l’écriture cursive . Elle part\nde la forme élémentaire de la boucle et avance\npas à pas. Toutes les lettres sont révisées dans ce\ncahier de perfectionnement, afin de consolider leur\napprentissage.\n• Un travail spécifique sur la ponctuation\nL ’apprentissage des accents et des signes de\nponctuation est trop souvent négligé. Nous proposons,\ndès l’étude de la lettre e, un travail sur le sens des\naccents permettant à l’élève d’encoder le bon geste.\nLes signes de ponctuation sont systématiquement\nétudiés. À cette occasion, l’élève est amené à copier\ndes phrases plus longues, avançant ainsi vers l’écriture\ncourante.\n• Un lien renforcé avec la lecture\nLe lien écriture-lecture est renforcé par les exercices\n« Je copie et je dessine » et les dictées muettes\noù l’élève écrit le mot correspondant à chaque\nillustration. Les sons les plus complexes n’apparaissent\nque dans les dernières pages du cahier, au moment\noù la lecture est devenue courante. En fin d’ouvrage,\nun travail de transcription de l’écriture scripte\nvers l’écriture cursive se double d’un exercice\nde lecture-compréhension.\n• Un rythme de travail quotidien\nTout apprentissage a besoin de répétition pour bien\ns’ancrer. La méthode est prévue pour une utilisation\nquotidienne – de 20 à 30 minutes ; l’objectif étant\nqu’une fois le cahier de perfectionnement terminé,\nl’élève soit capable de copier de manière fluide les\ntextes et les exercices travaillés en classe.\n• Des rubriques régulières\nLes rubriques répétitives aident l’élève à prendre\nses repères . Après avoir découvert chaque lettre,\nil retrouvera les rubriques suivantes :\n– « Je m’entraine » pour automatiser le bon geste,\n– « J’écris des mots » pour utiliser la lettre dans\ndes mots,\n– « Dictée muette » pour consolider le lien écriture-\nlecture et prêter attention au son des lettres apprises,\n– « Je copie et je dessine » pour copier des phrases\net les illustrer,\n– « Je continue la frise » pour travailler régulièrement\nla gestion de l’espace dans le cahier.\n• Un site compagnon pour les enseignants\nLe guide pédagogique est disponible en ligne.\nVous trouverez également sur le site compagnon\ndes ressources supplémentaires (réglette d’aide\nà l’écriture, vidéos explicatives…). L ’adresse du site\ncompagnon : ecriture.mdi-editions.com\nPrésentation",
      },
    ],
    notes: [
      "Statut de correspondance : partiel.",
      "Le guide 2018 mentionne les formes de base dans la présentation de la progression, mais ne leur consacre pas encore de séquence dédiée.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Guide 2018 p.2]\n2\n© MDI, 2018\n• Mes cahiers d’écriture, une nouvelle\nméthode d’apprentissage de l’écriture\nCette collection a été mise au point par Laurence\nPierson, rééducatrice en écriture et formatrice sur\nl’écriture-lecture, qui a enseigné en école primaire\npendant près de 20 ans. Elle est membre fondatrice\nde l’association 5E : Enseignement de l’Écriture\npour Élèves, Étudiants et Enseignants. Son site\nInternet www.ecritureparis.fr présente de nombreuses\ninformations sur l’écriture manuscrite.\n• Deux cahiers pour une progression spiralaire\nLe premier cahier est dédié à l’apprentissage\ndes minuscules en cursive en début de CP .\nCe deuxième cahier permet de continuer et\nd’approfondir cet apprentissage au cours du\nreste de l’année de CP et/ou au début du CE1.\nIl reprend l’écriture de l’ensemble des lettres\n(en incluant la cédille et le œ). Il permet aussi de\ntravailler les enchainements difficiles et intègre\nla ponctuation, la transcription scripte-cursive,\nle tracé des chiffres et des signes mathématiques.\n• Une préparation systématique avant l’écriture\nCe cahier de perfectionnement rappelle sur une double\npage, en début d’ouvrage, les bons gestes à maitriser\npour la tenue du crayon et le positionnement de l’avant-\nbras sur le cahier. Ces exercices et d’autres (gym des\ndoigts, entrainement du pouce, repérage dans la page)\npeuvent être approfondis, à l’aide du site compagnon\necriture.mdi-editions.com, en fonction des besoins.\n• Un format de cahier adapté aux élèves\nde CP-CE1, qu’ils soient droitiers ou gauchers\nLe format de ce cahier (17 x 22 cm) est idéal\npour les jeunes enfants : il n’est pas encombrant,\nce qui permet d’être bien positionné sur la table\npour écrire. Il est adapté aussi bien aux gauchers\nqu’aux droitiers, car il présente posture et tenue\ndu crayon pour les deux cas. Le lignage Seyès\n2,5 mm permet la transition en douceur vers\nle Seyès ordinaire, où les interlignes font 2 mm.\n• Des modèles de lettres conformes\naux programmes\nLes documents d’accompagnement des programmes\nofficiels du ministère de l’Éducation nationale\npréconisent de normaliser la forme des lettres : le\ne est présenté en un seul geste comme une boucle,\non n'ajoute pas d’œilletons aux lettres et il n'y a\npas de traits d’attaque avant les lettres rondes. Ce\ncahier applique ces recommandations, qui facilitent\nl’apprentissage de l’écriture.\n• Une progression liée au geste d’écriture\nLa progression des lettres est élaborée en fonction\ndes gestes de base de l’écriture cursive . Elle part\nde la forme élémentaire de la boucle et avance\npas à pas. Toutes les lettres sont révisées dans ce\ncahier de perfectionnement, afin de consolider leur\napprentissage.\n• Un travail spécifique sur la ponctuation\nL ’apprentissage des accents et des signes de\nponctuation est trop souvent négligé. Nous proposons,\ndès l’étude de la lettre e, un travail sur le sens des\naccents permettant à l’élève d’encoder le bon geste.\nLes signes de ponctuation sont systématiquement\nétudiés. À cette occasion, l’élève est amené à copier\ndes phrases plus longues, avançant ainsi vers l’écriture\ncourante.\n• Un lien renforcé avec la lecture\nLe lien écriture-lecture est renforcé par les exercices\n« Je copie et je dessine » et les dictées muettes\noù l’élève écrit le mot correspondant à chaque\nillustration. Les sons les plus complexes n’apparaissent\nque dans les dernières pages du cahier, au moment\noù la lecture est devenue courante. En fin d’ouvrage,\nun travail de transcription de l’écriture scripte\nvers l’écriture cursive se double d’un exercice\nde lecture-compréhension.\n• Un rythme de travail quotidien\nTout apprentissage a besoin de répétition pour bien\ns’ancrer. La méthode est prévue pour une utilisation\nquotidienne – de 20 à 30 minutes ; l’objectif étant\nqu’une fois le cahier de perfectionnement terminé,\nl’élève soit capable de copier de manière fluide les\ntextes et les exercices travaillés en classe.\n• Des rubriques régulières\nLes rubriques répétitives aident l’élève à prendre\nses repères . Après avoir découvert chaque lettre,\nil retrouvera les rubriques suivantes :\n– « Je m’entraine » pour automatiser le bon geste,\n– « J’écris des mots » pour utiliser la lettre dans\ndes mots,\n– « Dictée muette » pour consolider le lien écriture-\nlecture et prêter attention au son des lettres apprises,\n– « Je copie et je dessine » pour copier des phrases\net les illustrer,\n– « Je continue la frise » pour travailler régulièrement\nla gestion de l’espace dans le cahier.\n• Un site compagnon pour les enseignants\nLe guide pédagogique est disponible en ligne.\nVous trouverez également sur le site compagnon\ndes ressources supplémentaires (réglette d’aide\nà l’écriture, vidéos explicatives…). L ’adresse du site\ncompagnon : ecriture.mdi-editions.com\nPrésentation",
  },
  {
    id: "mdi-ecriture-transition-lettres-e-l",
    order: 6,
    group: "L'écriture des lettres",
    title: "Les lettres e et l",
    objective: "Les lettres e et l Cahier d’écriture CP-CE1 → p. 6-7",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [12, 13],
    teacherPages: [8, 9],
    legacyWorkbookPages: [6, 7],
    sourceStatus: "aligned",
    updateNeeded: false,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "L'écriture des lettres — Les lettres e et l — cahier élève p. 12 à 13.",
      },
      {
        title: "Guide pédagogique 2018",
        detail:
          "8\n© MDI, 2018\nLes lettres e et l Cahier d’écriture CP-CE1 → p. 6-7\nJe m’entraine\nLa lettre e est d’abord présentée\nseule. La lettre l est ensuite réalisée\nen étendant le pouce vers l’avant\n(mouvement de la fléchette).\nPour les enchainements, les élèves\npeuvent oraliser « grand, p’tit, grand,\np’tit » puis « deux p’tit, deux grands,\ndeux p’tit ».\nJ’écris des mots\nAvec seulement deux lettres revues, seuls les mots\n« le » et « elle » sont possibles à écrire.\nJe trace des accents\nL’enfant doit poser sa main dans l’axe du tronc, puis\nposer la pointe du crayon sur le tronc. En disant le son\n[e], il plie son pouce en un geste arrondi vers la gauche.\nEn disant le son [ ᵋ], il plie sont pouce en un geste\narrondi vers la droite. L’important est de bien partir du\ntronc, pour réaliser les accents d’un geste descendant.\nIl peut être intéressant à ce stade de faire remarquer\naux élèves que les virgules et les apostrophes se\ntracent exactement comme l’accent aigu.\nloup\nL’enseignant présente la lettre e en expliquant ou en rappelant à l’oral que, selon la présence ou l’absence\nd’accent, elle peut se prononcer [ᵊ] , [e] ou [ᵋ]. Le mot « élève » est ainsi présenté à l’oral.\nOn peut associer la gestuelle Borel-Maisonny : main avancée comme pour mendier en disant [ᵊ], main\nsur la tête avec l’accent vers l’avant en disant [e], main sur la tête avec les doigts ouverts, renversés vers\nl’arrière, en disant [ᵋ].\nPour ce qui est de la lettre l, elle est présentée en lien avec le son qu’elle produit - [l] – et éventuellement\nen association avec la gestuelle Borel-Maisonny (doigt qui monte devant la bouche comme la langue\nmonte pour faire [l]).\nFais une petite boucle pour écrire le e.\nFais la fléchette pour transformer le e en l.\ne\nl\nLe l monte\nà trois\ninterlignes.\n\n9\n© MDI, 2018\nJe mets les accents sur les e\nLe mot « élève », qui comporte à la\nfois un accent aigu, un accent grave\net un e muet, est déjà écrit. L’enfant\nn’a plus qu’à ajouter les accents. On\npourra faire remarquer que l’ac -\ncent grave n’est présent que quand\nla voyelle suivante est un e muet\n(ou prononcé [ ᵊ]). Pour les autres mots, on incite les\nenfants à bien prononcer les mots avant de mettre les\naccents, et à s’aider si nécessaire soit de la gestuelle\nBorel-Maisonny (é en avant, è en arrière), soit de la\nrègle selon laquelle on ne trouve un è qu’avant un e\nnon accentué. Le modèle est donné en début de ligne.\nJe mets les accents circonflexes\nL’accent circonflexe peut se tracer en une fois, d’abord\nen montant, puis en descendant. Il est conseillé de\nl’appeler par son vrai nom d’accent circonflexe. Il se\nprononce toujours [ᵋ].\nJe continue la frise\nLors de cette première occurrence, l’enseignant veil -\nlera particulièrement à ce que l’élève ait compris\ncomment s’organise la frise. On pourra conseiller aux\nenfants de poser la main sous la ligne, puis de contour-\nner une ou deux fois le carré avec la pointe du crayon\navant de remplir l’intérieur. Cela les aide à délimiter\nleur geste. Ils pourront également oraliser ce qu’ils\ndoivent faire : « Je colorie un carreau sur deux ».\nTrace les\naccents dans\nle bon sens !",
      },
    ],
    notes: [
      "Statut de correspondance : aligné.",
      "Correspondance directe entre le nouveau sommaire et le guide 2018.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Guide 2018 p.8]\n8\n© MDI, 2018\nLes lettres e et l Cahier d’écriture CP-CE1 → p. 6-7\nJe m’entraine\nLa lettre e est d’abord présentée\nseule. La lettre l est ensuite réalisée\nen étendant le pouce vers l’avant\n(mouvement de la fléchette).\nPour les enchainements, les élèves\npeuvent oraliser « grand, p’tit, grand,\np’tit » puis « deux p’tit, deux grands,\ndeux p’tit ».\nJ’écris des mots\nAvec seulement deux lettres revues, seuls les mots\n« le » et « elle » sont possibles à écrire.\nJe trace des accents\nL’enfant doit poser sa main dans l’axe du tronc, puis\nposer la pointe du crayon sur le tronc. En disant le son\n[e], il plie son pouce en un geste arrondi vers la gauche.\nEn disant le son [ ᵋ], il plie sont pouce en un geste\narrondi vers la droite. L’important est de bien partir du\ntronc, pour réaliser les accents d’un geste descendant.\nIl peut être intéressant à ce stade de faire remarquer\naux élèves que les virgules et les apostrophes se\ntracent exactement comme l’accent aigu.\nloup\nL’enseignant présente la lettre e en expliquant ou en rappelant à l’oral que, selon la présence ou l’absence\nd’accent, elle peut se prononcer [ᵊ] , [e] ou [ᵋ]. Le mot « élève » est ainsi présenté à l’oral.\nOn peut associer la gestuelle Borel-Maisonny : main avancée comme pour mendier en disant [ᵊ], main\nsur la tête avec l’accent vers l’avant en disant [e], main sur la tête avec les doigts ouverts, renversés vers\nl’arrière, en disant [ᵋ].\nPour ce qui est de la lettre l, elle est présentée en lien avec le son qu’elle produit - [l] – et éventuellement\nen association avec la gestuelle Borel-Maisonny (doigt qui monte devant la bouche comme la langue\nmonte pour faire [l]).\nFais une petite boucle pour écrire le e.\nFais la fléchette pour transformer le e en l.\ne\nl\nLe l monte\nà trois\ninterlignes.\n\n[Guide 2018 p.9]\n9\n© MDI, 2018\nJe mets les accents sur les e\nLe mot « élève », qui comporte à la\nfois un accent aigu, un accent grave\net un e muet, est déjà écrit. L’enfant\nn’a plus qu’à ajouter les accents. On\npourra faire remarquer que l’ac -\ncent grave n’est présent que quand\nla voyelle suivante est un e muet\n(ou prononcé [ ᵊ]). Pour les autres mots, on incite les\nenfants à bien prononcer les mots avant de mettre les\naccents, et à s’aider si nécessaire soit de la gestuelle\nBorel-Maisonny (é en avant, è en arrière), soit de la\nrègle selon laquelle on ne trouve un è qu’avant un e\nnon accentué. Le modèle est donné en début de ligne.\nJe mets les accents circonflexes\nL’accent circonflexe peut se tracer en une fois, d’abord\nen montant, puis en descendant. Il est conseillé de\nl’appeler par son vrai nom d’accent circonflexe. Il se\nprononce toujours [ᵋ].\nJe continue la frise\nLors de cette première occurrence, l’enseignant veil -\nlera particulièrement à ce que l’élève ait compris\ncomment s’organise la frise. On pourra conseiller aux\nenfants de poser la main sous la ligne, puis de contour-\nner une ou deux fois le carré avec la pointe du crayon\navant de remplir l’intérieur. Cela les aide à délimiter\nleur geste. Ils pourront également oraliser ce qu’ils\ndoivent faire : « Je colorie un carreau sur deux ».\nTrace les\naccents dans\nle bon sens !",
  },
  {
    id: "mdi-ecriture-transition-lettres-i-u-t",
    order: 7,
    group: "L'écriture des lettres",
    title: "Les lettres i, u, t",
    objective:
      "L’enseignant présente les lettres i et u : une petite pointe pour le i, deux petites pointes pour le u, une grande pointe (deux interlignes, donc moins grande que la grande boucle) pour le t. Les sons et les gestes Borel-Maisonny (un doigt en l’air pour i, deux doigts en l’air po",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [14, 15],
    teacherPages: [10],
    legacyWorkbookPages: [8, 9],
    sourceStatus: "aligned",
    updateNeeded: false,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "L'écriture des lettres — Les lettres i, u, t — cahier élève p. 14 à 15.",
      },
      {
        title: "Guide pédagogique 2018",
        detail:
          "10\n© MDI, 2018\nL’enseignant présente les lettres i et u : une petite pointe pour le i, deux petites pointes pour le u,\nune grande pointe (deux interlignes, donc moins grande que la grande boucle) pour le t. Les sons\net les gestes Borel-Maisonny (un doigt en l’air pour i, deux doigts en l’air pour u, pincer une petite\nceinture pour le t) sont montrés aux élèves. La lettre t, comme la lettre i, est constituée d’une pointe. Il\nsuffit d’allonger un peu les doigts pour faire monter cette pointe au deuxième interligne. En effet, les\ngrandes pointes sont moins allongées que les grandes boucles.\nJe m’entraine\nLes lettres sont vues individuel -\nlement, puis associées. Il est\nimportant de veiller à ce que les\nbarres des t et les points sur les i\nsoient ajoutés en fin de mot (ou\nde série de lettres). Dans le cas\ndes deux t successifs (ette, iette),\nil est possible de mettre une seule\ngrande barre pour les deux t (ce qui n’est pas montré\ndans les modèles présentés ici).\nJ’écris des mots\nIl est essentiel, en présentant le mot « tuile » et le mot\n« télé », d’insister pour que l’enfant écrive la totalité du\nmot avant de positionner le point sur le i, les barres\ndes t et les accents. Ainsi, il évite les levers de crayon\nintempestifs qui créent à terme des discontinuités\ndans l’écriture.\nDictée muette\nla télé – le lit – le tutu\nPour cette première occurrence de l’exercice, tous\nles mots ont été présentés au-dessus, ce qui permet\nd’évacuer toute difficulté orthographique, en particu -\nlier le t muet de « lit ».\nIl faut bien insister pour que les enfants oralisent\nune première fois le mot avant de l’écrire, puis qu’ils\nchuchotent syllabe à syllabe en l’écrivant.\nJe continue la frise\nCette frise simple met en place une première alter -\nnance de couleurs. On peut inciter les élèves à dire\nce qu’ils doivent faire (« un carreau rouge, un carreau\nbleu… ») avant de se mettre à la tâche.\nAjoute les\nbarres des t et\nles points des i\nà la fin.\nFais une petite pointe pour le i.\nFais deux petites pointes pour le u.\nFais une grande pointe pour le t.\niris un tête\ni\nu\nt\nLes lettres i , u , t Cahier d’écriture CP-CE1 → p. 8-9",
      },
    ],
    notes: [
      "Statut de correspondance : aligné.",
      "Correspondance directe entre le nouveau sommaire et le guide 2018.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Guide 2018 p.10]\n10\n© MDI, 2018\nL’enseignant présente les lettres i et u : une petite pointe pour le i, deux petites pointes pour le u,\nune grande pointe (deux interlignes, donc moins grande que la grande boucle) pour le t. Les sons\net les gestes Borel-Maisonny (un doigt en l’air pour i, deux doigts en l’air pour u, pincer une petite\nceinture pour le t) sont montrés aux élèves. La lettre t, comme la lettre i, est constituée d’une pointe. Il\nsuffit d’allonger un peu les doigts pour faire monter cette pointe au deuxième interligne. En effet, les\ngrandes pointes sont moins allongées que les grandes boucles.\nJe m’entraine\nLes lettres sont vues individuel -\nlement, puis associées. Il est\nimportant de veiller à ce que les\nbarres des t et les points sur les i\nsoient ajoutés en fin de mot (ou\nde série de lettres). Dans le cas\ndes deux t successifs (ette, iette),\nil est possible de mettre une seule\ngrande barre pour les deux t (ce qui n’est pas montré\ndans les modèles présentés ici).\nJ’écris des mots\nIl est essentiel, en présentant le mot « tuile » et le mot\n« télé », d’insister pour que l’enfant écrive la totalité du\nmot avant de positionner le point sur le i, les barres\ndes t et les accents. Ainsi, il évite les levers de crayon\nintempestifs qui créent à terme des discontinuités\ndans l’écriture.\nDictée muette\nla télé – le lit – le tutu\nPour cette première occurrence de l’exercice, tous\nles mots ont été présentés au-dessus, ce qui permet\nd’évacuer toute difficulté orthographique, en particu -\nlier le t muet de « lit ».\nIl faut bien insister pour que les enfants oralisent\nune première fois le mot avant de l’écrire, puis qu’ils\nchuchotent syllabe à syllabe en l’écrivant.\nJe continue la frise\nCette frise simple met en place une première alter -\nnance de couleurs. On peut inciter les élèves à dire\nce qu’ils doivent faire (« un carreau rouge, un carreau\nbleu… ») avant de se mettre à la tâche.\nAjoute les\nbarres des t et\nles points des i\nà la fin.\nFais une petite pointe pour le i.\nFais deux petites pointes pour le u.\nFais une grande pointe pour le t.\niris un tête\ni\nu\nt\nLes lettres i , u , t Cahier d’écriture CP-CE1 → p. 8-9",
  },
  {
    id: "mdi-ecriture-transition-lettres-c-a-d-o",
    order: 8,
    group: "L'écriture des lettres",
    title: "Les lettres c, a, d, o",
    objective:
      "La lettre c est présentée uniquement avec le son [k], représenté par le geste Borel-Maisonny (l’index indique la bouche ouverte, d’où s’échappe l’air). Pour le o, le geste est celui des doigts en rond, pour le a, une main ouverte à l’image de la bouche ouverte et pour le d, un po",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [16, 17],
    teacherPages: [11],
    legacyWorkbookPages: [10, 11],
    sourceStatus: "aligned",
    updateNeeded: false,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "L'écriture des lettres — Les lettres c, a, d, o — cahier élève p. 16 à 17.",
      },
      {
        title: "Guide pédagogique 2018",
        detail:
          "11\n© MDI, 2018\nLa lettre c est présentée uniquement avec le son [k], représenté par le geste Borel-Maisonny (l’index\nindique la bouche ouverte, d’où s’échappe l’air). Pour le o, le geste est celui des doigts en rond, pour le\na, une main ouverte à l’image de la bouche ouverte et pour le d, un poing dans le dos.\nJe m’entraine\nEn abordant les lettres rondes, on doit vérifier que l’élève\npense à « sauter », c’est-à-dire lever brièvement le crayon\njuste avant la lettre ronde, sans arrêter\nson mouvement. Il peut être néces -\nsaire d’entrainer ce geste sur d’autres\nsupports : plan vertical, grande feuille\nde brouillon, voire le tracer dans la\nsemoule.\nIl faut également prêter attention à la\nlettre o, qui est l’une des quatre lettres qui se termine «\nen haut », c’est-à-dire au premier interligne (les autres\nlettres étant b, v et w). Il faut bien insister sur ce point\npour éviter toute confusion avec le a.\nJ’écris des mots\nOn sera particulièrement attentif à la liaison entre le o et\nle u : en effet, le o se terminant en haut, la lettre u ne doit\npas démarrer à la ligne mais directement descendre. On\nne trace donc pas la totalité des deux pointes. Il faut bien\nexpliquer cette particularité aux élèves, éventuellement\nen leur présentant au tableau les lettres de deux couleurs\ndifférentes, pour ne pas que certains cherchent à tout\nprix à commencer le u sur la ligne, créant une fausse\nlettre intermédiaire.\nLe son [u], dans la gestuelle Borel-Maisonny, est repré-\nsenté par trois doigts en rond (pouce, annulaire et auri-\nculaire, pour le o) et deux doigts levés (index et majeur,\npour le u), qui avancent en faisant « ou », comme le loup.\nJe copie et je dessine\nPour ce premier « Je copie et je dessine », la phrase est\ntrès courte. Il est nécessaire de vérifier que les élèves\ntracent leurs lettres correctement, en prêtant particu-\nlièrement attention aux « ou » et aux sauts pour les\nlettres rondes.\nJe continue la frise\nOn fera repérer les alternances de couleurs avant de\ncommencer à colorier la frise.\nLes lettres c , o , a , d Cahier d’écriture CP-CE1 → p. 10-11\nFerme en haut et ajoute un bec pour le o.\nTourne les doigts pour faire le c.\nFerme par une petite pointe pour le a.\nFerme par une grande pointe pour le d.\narbreclé\nc\no\na\nd\nSaute pour le a\net termine le o\nen haut.",
      },
    ],
    notes: [
      "Statut de correspondance : aligné.",
      "Correspondance directe ; l’ordre interne est harmonisé avec le sommaire 2025.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Guide 2018 p.11]\n11\n© MDI, 2018\nLa lettre c est présentée uniquement avec le son [k], représenté par le geste Borel-Maisonny (l’index\nindique la bouche ouverte, d’où s’échappe l’air). Pour le o, le geste est celui des doigts en rond, pour le\na, une main ouverte à l’image de la bouche ouverte et pour le d, un poing dans le dos.\nJe m’entraine\nEn abordant les lettres rondes, on doit vérifier que l’élève\npense à « sauter », c’est-à-dire lever brièvement le crayon\njuste avant la lettre ronde, sans arrêter\nson mouvement. Il peut être néces -\nsaire d’entrainer ce geste sur d’autres\nsupports : plan vertical, grande feuille\nde brouillon, voire le tracer dans la\nsemoule.\nIl faut également prêter attention à la\nlettre o, qui est l’une des quatre lettres qui se termine «\nen haut », c’est-à-dire au premier interligne (les autres\nlettres étant b, v et w). Il faut bien insister sur ce point\npour éviter toute confusion avec le a.\nJ’écris des mots\nOn sera particulièrement attentif à la liaison entre le o et\nle u : en effet, le o se terminant en haut, la lettre u ne doit\npas démarrer à la ligne mais directement descendre. On\nne trace donc pas la totalité des deux pointes. Il faut bien\nexpliquer cette particularité aux élèves, éventuellement\nen leur présentant au tableau les lettres de deux couleurs\ndifférentes, pour ne pas que certains cherchent à tout\nprix à commencer le u sur la ligne, créant une fausse\nlettre intermédiaire.\nLe son [u], dans la gestuelle Borel-Maisonny, est repré-\nsenté par trois doigts en rond (pouce, annulaire et auri-\nculaire, pour le o) et deux doigts levés (index et majeur,\npour le u), qui avancent en faisant « ou », comme le loup.\nJe copie et je dessine\nPour ce premier « Je copie et je dessine », la phrase est\ntrès courte. Il est nécessaire de vérifier que les élèves\ntracent leurs lettres correctement, en prêtant particu-\nlièrement attention aux « ou » et aux sauts pour les\nlettres rondes.\nJe continue la frise\nOn fera repérer les alternances de couleurs avant de\ncommencer à colorier la frise.\nLes lettres c , o , a , d Cahier d’écriture CP-CE1 → p. 10-11\nFerme en haut et ajoute un bec pour le o.\nTourne les doigts pour faire le c.\nFerme par une petite pointe pour le a.\nFerme par une grande pointe pour le d.\narbreclé\nc\no\na\nd\nSaute pour le a\net termine le o\nen haut.",
  },
  {
    id: "mdi-ecriture-transition-lettres-m-n-p",
    order: 9,
    group: "L'écriture des lettres",
    title: "Les lettres m, n, p",
    objective:
      "Les lettres m, n et p sont des lettres en pont, c’est-à-dire qu’elles tournent dans le sens horaire, pour ensuite rebondir sur la ligne et repartir dans le sens habituel de l'écriture. Le départ se fait en hauteur pour les lettres m et n, sur la ligne pour la lettre p. Les gestes",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [18, 19],
    teacherPages: [12],
    legacyWorkbookPages: [12, 13],
    sourceStatus: "aligned",
    updateNeeded: false,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "L'écriture des lettres — Les lettres m, n, p — cahier élève p. 18 à 19.",
      },
      {
        title: "Guide pédagogique 2018",
        detail:
          "12\n© MDI, 2018\nLes lettres m, n et p sont des lettres en pont, c’est-à-dire qu’elles tournent dans le sens horaire, pour\nensuite rebondir sur la ligne et repartir dans le sens habituel de l'écriture.\nLe départ se fait en hauteur pour les lettres m et n, sur la ligne pour la lettre p.\nLes gestes Borel-Maisonny sont : pour le [m], trois doigts posés sur la table et bouche fermée qui\nchante, pour le [n], deux doigts légèrement posés sur le nez, qui sentent la vibration des narines\nquand on le prononce, pour le [p], un poing fermé qui s’ouvre brutalement quand on prononce cette\nlettre explosive.\nJe m’entraine\nIl faut bien insister sur les change -\nments de points de départ : sur la\nligne pour le p et le e, au-dessus de\nla ligne pour le m et le n.\nIl convient également de vérifier que\nles élèves n’oublient pas la finale\ndes lettres : certains ont tendance à\nterminer les ponts en « planté de bâton », sans revenir\ndans le sens premier de l’écriture. Il faut insister pour\nqu’ils n’oublient pas le « tourne » final.\nJ’écris des mots\nLes consonnes m, n et p sont souvent doublées dans\nles mots. Il faut veiller à ce que les élèves repèrent\ncette particularité orthographique avant de copier.\nDictée muette\nla plume – la note – l’épine\nIl est préférable de faire dire\nles mots à voix haute avant de\nles écrire. Cette fois, les mots\nne sont pas présentés dans la\npartie « J’écris des mots ». Les\nenfants doivent donc s’appuyer sur les sons qu’ils\nprononcent. Ne pas hésiter à insister en prononçant\nles e muets, pour qu’ils ne soient pas oubliés.\nJe continue la frise\nCette frise présente pour la première fois des surfaces\ninférieures à celle du carreau à colorier. Il faut bien\ninsister pour que les élèves prennent leurs repères en\ns’aidant des interlignes. Ils peuvent, dans un premier\ntemps, tracer le contour de la forme avant de colorier.\nÉcris les noms\ndes images.\nLes lettres m , n , p Cahier d’écriture CP-CE1 → p. 12-13\nmidi nuit pirate\nFais trois ponts et tourne pour le m.\nFais deux ponts et tourne pour le n.\nMonte, fais le yoyo, un pont et tourne pour le p.\nm\nn\np\nDémarre\nau-dessus de\nla ligne pour\nm et n .",
      },
    ],
    notes: [
      "Statut de correspondance : aligné.",
      "Correspondance directe entre le nouveau sommaire et le guide 2018.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Guide 2018 p.12]\n12\n© MDI, 2018\nLes lettres m, n et p sont des lettres en pont, c’est-à-dire qu’elles tournent dans le sens horaire, pour\nensuite rebondir sur la ligne et repartir dans le sens habituel de l'écriture.\nLe départ se fait en hauteur pour les lettres m et n, sur la ligne pour la lettre p.\nLes gestes Borel-Maisonny sont : pour le [m], trois doigts posés sur la table et bouche fermée qui\nchante, pour le [n], deux doigts légèrement posés sur le nez, qui sentent la vibration des narines\nquand on le prononce, pour le [p], un poing fermé qui s’ouvre brutalement quand on prononce cette\nlettre explosive.\nJe m’entraine\nIl faut bien insister sur les change -\nments de points de départ : sur la\nligne pour le p et le e, au-dessus de\nla ligne pour le m et le n.\nIl convient également de vérifier que\nles élèves n’oublient pas la finale\ndes lettres : certains ont tendance à\nterminer les ponts en « planté de bâton », sans revenir\ndans le sens premier de l’écriture. Il faut insister pour\nqu’ils n’oublient pas le « tourne » final.\nJ’écris des mots\nLes consonnes m, n et p sont souvent doublées dans\nles mots. Il faut veiller à ce que les élèves repèrent\ncette particularité orthographique avant de copier.\nDictée muette\nla plume – la note – l’épine\nIl est préférable de faire dire\nles mots à voix haute avant de\nles écrire. Cette fois, les mots\nne sont pas présentés dans la\npartie « J’écris des mots ». Les\nenfants doivent donc s’appuyer sur les sons qu’ils\nprononcent. Ne pas hésiter à insister en prononçant\nles e muets, pour qu’ils ne soient pas oubliés.\nJe continue la frise\nCette frise présente pour la première fois des surfaces\ninférieures à celle du carreau à colorier. Il faut bien\ninsister pour que les élèves prennent leurs repères en\ns’aidant des interlignes. Ils peuvent, dans un premier\ntemps, tracer le contour de la forme avant de colorier.\nÉcris les noms\ndes images.\nLes lettres m , n , p Cahier d’écriture CP-CE1 → p. 12-13\nmidi nuit pirate\nFais trois ponts et tourne pour le m.\nFais deux ponts et tourne pour le n.\nMonte, fais le yoyo, un pont et tourne pour le p.\nm\nn\np\nDémarre\nau-dessus de\nla ligne pour\nm et n .",
  },
  {
    id: "mdi-ecriture-transition-lettres-r-s",
    order: 10,
    group: "L'écriture des lettres",
    title: "Les lettres r et s",
    objective:
      "La lettre r est présentée seule car c’est une lettre plus compliquée à aborder. Son tracé est très variable selon les modèles. Notre proposition ici est simple : commencer comme la lettre i et terminer comme la lettre n – ce qui implique un changement de direction du tracé de la ",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [20, 21],
    teacherPages: [13, 14],
    legacyWorkbookPages: [14, 15, 16, 17],
    sourceStatus: "partial",
    updateNeeded: true,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "L'écriture des lettres — Les lettres r et s — cahier élève p. 20 à 21.",
      },
      {
        title: "Guide pédagogique 2018",
        detail:
          "13\n© MDI, 2018\nLa lettre r est présentée seule car c’est une lettre plus compliquée à aborder. Son tracé est très\nvariable selon les modèles. Notre proposition ici est simple : commencer comme la lettre i et\nterminer comme la lettre n – ce qui implique un changement de direction du tracé de la lettre.\nLa lettre sera présentée avec le geste Borel-Maisonny : un doigt qui désigne la gorge, là où le [r]\nfrançais gratte un peu.\nJe m’entraine\nDans ce cahier de perfectionnement, les enchai -\nnements difficiles sont abordés. En particulier, ici,\nle « or ». Si on trace le o selon le modèle habituel,\nle tracé arrive trop haut et oblige à faire un r qui\ndépasse sur le deuxième interligne. Pour éviter cet\nécueil, il convient de baisser légèrement le bec du o,\nafin de pouvoir ensuite remonter le r, qui lui-même\ncommence en hauteur. Les formes des deux lettres\n(fin du o et début du r) sont ainsi modifiées dans le\ncadre de cet enchainement.\nCe qui est difficile pour les enfants,\nc’est de baisser un peu le bec du o\nsans le baisser trop : il faut veiller à\nce qu’il ne redescende pas jusqu’à\nla ligne. Un entrainement en grand\nsur ardoise ou papier de brouillon\nsera sans doute nécessaire pour\ntravailler cet enchainement.\nJ’écris des mots\nLes deux mots contenant l’enchainement « or »\nsont présentés à la fin. Les autres enchainements\nsont plus simples – il faut juste penser à « sauter »\naprès le r pour commencer les lettres rondes.\nJe copie et je dessine\nAu fil des « Je copie et je dessine », on pourra inciter\nl’enfant, après avoir pris en compte les éléments indis-\npensables (le pirate doit pouvoir être identifié comme\ntel par un élément significatif, il doit avoir une bouche\nindiquant le rire), à enrichir le décor et à utiliser tout\nl’espace prévu pour le dessin.\nJe continue la frise\nCette frise présente des surfaces plus petites, de la\ntaille d’un interligne. Elle nécessite une plus grande\nprécision. On peut inciter les enfants à délimiter\nplusieurs fois la surface avant de la colorier, pour\nprendre conscience de sa taille.\nLa lettre r Cahier d’écriture CP-CE1 → p. 14-15\nrenard\nCommence comme un i et finis comme un n.\nr\nBaisse un peu\nle bec du o pour\nécrire or .\n\n14\n© MDI, 2018\nLa lettre s est l’une des plus difficiles à tracer en écriture cursive, car son tracé se termine de droite\nà gauche. Elle est néanmoins très présente dans la langue, ce qui incite à la présenter tôt dans la\nprogression. La difficulté consiste à bien identifier les deux tracés différents :\n- le s qui commence comme un i, puis dont le ventre est fermé, qu’on retrouve quand la lettre est\nisolée ou en fin de mot.\n- le s qui se termine par un rebond sur la ligne et repart donc vers la droite, que l’on retrouve en\ndébut ou en milieu de mot.\nDans les exemples présentés, on trouvera le s de fin de mot dans l’encadré, et le s de début de mot\ndans le mot-repère « salade ». Le son [s] sera présenté avec le geste Borel-Maisonny : le doigt qui\nserpente de haut en bas et qui rappelle à la fois le sifflement du serpent et la forme de la lettre scripte.\nJe m’entraine\nLa lettre s, dans ce cahier de perfectionnement, est\nprésentée dans toutes les situations :\n– seule ou en fin de mot (fermée à gauche) ;\n– avant une lettre qui démarre sur la ligne (ss, si, se), ce\nqui oblige à rebondir et repartir dans l’autre sens ;\n– avant une lettre ronde (sa, sc), ce qui oblige à repar -\ntir dans l’autre sens, puis à lever brièvement le crayon\npour enchainer sur la lettre ronde ;\n– après la lettre o, dont la liaison haute ne permet pas\nde refermer le ventre du s.\nDictée muette\nla sirène – la tasse – la soupe\nOn sera attentif au tracé de l’accent grave de « sirène »,\nainsi qu’au tracé des deux s de « tasse ».\nJe copie et je dessine\nIci, on présente pour la première fois une frise qui\ns’appuie sur la diagonale du carreau – donc, un tracé\nqui n’existe pas sur le cahier. On proposera aux enfants\nde tracer cette diagonale, avec un crayon de l’une des\ndeux couleurs, avant de commencer à colorier.\nLa lettre s Cahier d’écriture CP-CE1 → p. 16-17\nCommence comme un i puis ferme\nle ventre du s.\ns",
      },
    ],
    notes: [
      "Statut de correspondance : partiel.",
      "Le guide 2018 traite r puis s sur deux leçons séparées ; le nouveau sommaire les regroupe.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Guide 2018 p.13]\n13\n© MDI, 2018\nLa lettre r est présentée seule car c’est une lettre plus compliquée à aborder. Son tracé est très\nvariable selon les modèles. Notre proposition ici est simple : commencer comme la lettre i et\nterminer comme la lettre n – ce qui implique un changement de direction du tracé de la lettre.\nLa lettre sera présentée avec le geste Borel-Maisonny : un doigt qui désigne la gorge, là où le [r]\nfrançais gratte un peu.\nJe m’entraine\nDans ce cahier de perfectionnement, les enchai -\nnements difficiles sont abordés. En particulier, ici,\nle « or ». Si on trace le o selon le modèle habituel,\nle tracé arrive trop haut et oblige à faire un r qui\ndépasse sur le deuxième interligne. Pour éviter cet\nécueil, il convient de baisser légèrement le bec du o,\nafin de pouvoir ensuite remonter le r, qui lui-même\ncommence en hauteur. Les formes des deux lettres\n(fin du o et début du r) sont ainsi modifiées dans le\ncadre de cet enchainement.\nCe qui est difficile pour les enfants,\nc’est de baisser un peu le bec du o\nsans le baisser trop : il faut veiller à\nce qu’il ne redescende pas jusqu’à\nla ligne. Un entrainement en grand\nsur ardoise ou papier de brouillon\nsera sans doute nécessaire pour\ntravailler cet enchainement.\nJ’écris des mots\nLes deux mots contenant l’enchainement « or »\nsont présentés à la fin. Les autres enchainements\nsont plus simples – il faut juste penser à « sauter »\naprès le r pour commencer les lettres rondes.\nJe copie et je dessine\nAu fil des « Je copie et je dessine », on pourra inciter\nl’enfant, après avoir pris en compte les éléments indis-\npensables (le pirate doit pouvoir être identifié comme\ntel par un élément significatif, il doit avoir une bouche\nindiquant le rire), à enrichir le décor et à utiliser tout\nl’espace prévu pour le dessin.\nJe continue la frise\nCette frise présente des surfaces plus petites, de la\ntaille d’un interligne. Elle nécessite une plus grande\nprécision. On peut inciter les enfants à délimiter\nplusieurs fois la surface avant de la colorier, pour\nprendre conscience de sa taille.\nLa lettre r Cahier d’écriture CP-CE1 → p. 14-15\nrenard\nCommence comme un i et finis comme un n.\nr\nBaisse un peu\nle bec du o pour\nécrire or .\n\n[Guide 2018 p.14]\n14\n© MDI, 2018\nLa lettre s est l’une des plus difficiles à tracer en écriture cursive, car son tracé se termine de droite\nà gauche. Elle est néanmoins très présente dans la langue, ce qui incite à la présenter tôt dans la\nprogression. La difficulté consiste à bien identifier les deux tracés différents :\n- le s qui commence comme un i, puis dont le ventre est fermé, qu’on retrouve quand la lettre est\nisolée ou en fin de mot.\n- le s qui se termine par un rebond sur la ligne et repart donc vers la droite, que l’on retrouve en\ndébut ou en milieu de mot.\nDans les exemples présentés, on trouvera le s de fin de mot dans l’encadré, et le s de début de mot\ndans le mot-repère « salade ». Le son [s] sera présenté avec le geste Borel-Maisonny : le doigt qui\nserpente de haut en bas et qui rappelle à la fois le sifflement du serpent et la forme de la lettre scripte.\nJe m’entraine\nLa lettre s, dans ce cahier de perfectionnement, est\nprésentée dans toutes les situations :\n– seule ou en fin de mot (fermée à gauche) ;\n– avant une lettre qui démarre sur la ligne (ss, si, se), ce\nqui oblige à rebondir et repartir dans l’autre sens ;\n– avant une lettre ronde (sa, sc), ce qui oblige à repar -\ntir dans l’autre sens, puis à lever brièvement le crayon\npour enchainer sur la lettre ronde ;\n– après la lettre o, dont la liaison haute ne permet pas\nde refermer le ventre du s.\nDictée muette\nla sirène – la tasse – la soupe\nOn sera attentif au tracé de l’accent grave de « sirène »,\nainsi qu’au tracé des deux s de « tasse ».\nJe copie et je dessine\nIci, on présente pour la première fois une frise qui\ns’appuie sur la diagonale du carreau – donc, un tracé\nqui n’existe pas sur le cahier. On proposera aux enfants\nde tracer cette diagonale, avec un crayon de l’une des\ndeux couleurs, avant de commencer à colorier.\nLa lettre s Cahier d’écriture CP-CE1 → p. 16-17\nCommence comme un i puis ferme\nle ventre du s.\ns",
  },
  {
    id: "mdi-ecriture-transition-lettres-h-k",
    order: 11,
    group: "L'écriture des lettres",
    title: "Les lettres h et k",
    objective:
      "La lettre h commence comme la lettre l, mais ensuite l’enfant doit plier le pouce pour rebondir droit sur la ligne et repartir comme un n. Aucun geste n’est associé au h muet, puisqu’il n’y a aucun son. En revanche, le son [ ʃ], qui s’écrit ch, est représenté par deux doigts qui ",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [22, 23],
    teacherPages: [15],
    legacyWorkbookPages: [18, 19],
    sourceStatus: "aligned",
    updateNeeded: false,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "L'écriture des lettres — Les lettres h et k — cahier élève p. 22 à 23.",
      },
      {
        title: "Guide pédagogique 2018",
        detail:
          "15\n© MDI, 2018\nLa lettre h commence comme la lettre l, mais ensuite l’enfant doit plier le pouce pour rebondir droit\nsur la ligne et repartir comme un n. Aucun geste n’est associé au h muet, puisqu’il n’y a aucun son.\nEn revanche, le son [ ʃ], qui s’écrit ch, est représenté par deux doigts qui tiennent les joues tandis\nque les lèvres avancent.\nPour la lettre k, on part du tracé du h, on ferme le pont à peu près à mi-hauteur de l’interligne puis on\nrepart. Que l’élève fasse, au moment de repartir vers la droite, un tracé en pont ou dans le premier\nsens de l’écriture n’a guère d’importance tant que la lettre k est lisible. Le k est peu présent en\nfrançais, à part dans le mot « kilo » et ses dérivés. Les autres mots qui l’utilisent sont presque tous\ndes mots « voyageurs » (mots étrangers passés dans la langue française). Le geste Borel-Maisonny\nest celui du son [k] : un doigt recourbé qui montre l’intérieur de la bouche d’où l’air sort.\nJe m’entraine\nIl faut veiller à ce que les élèves\nposent bien la première partie du\nh et du k sur la ligne, pour éviter de\nfaire une « vague » avant le pont.\nJ’écris des mots\nLe h est présenté à la fois comme lettre muette et dans\nle « ch ».\nJe copie et je dessine\nLe prénom Charlie est devenu mixte. Les élèves\npeuvent donc représenter un garçon ou une fille, à leur\nchoix. On proposera de réaliser un décor montagnard.\nLes lettres h , k Cahier d’écriture CP-CE1 → p. 18-19\nhéros kimono\nCommence comme un l,\nrebondis et finis comme un n.\nCommence comme un h, rebondis,\nferme le pont et repars.\nh\nk\nLe h et le k\nrebondissent\nbien droit\nsur la ligne.",
      },
    ],
    notes: [
      "Statut de correspondance : aligné.",
      "Correspondance directe entre le nouveau sommaire et le guide 2018.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Guide 2018 p.15]\n15\n© MDI, 2018\nLa lettre h commence comme la lettre l, mais ensuite l’enfant doit plier le pouce pour rebondir droit\nsur la ligne et repartir comme un n. Aucun geste n’est associé au h muet, puisqu’il n’y a aucun son.\nEn revanche, le son [ ʃ], qui s’écrit ch, est représenté par deux doigts qui tiennent les joues tandis\nque les lèvres avancent.\nPour la lettre k, on part du tracé du h, on ferme le pont à peu près à mi-hauteur de l’interligne puis on\nrepart. Que l’élève fasse, au moment de repartir vers la droite, un tracé en pont ou dans le premier\nsens de l’écriture n’a guère d’importance tant que la lettre k est lisible. Le k est peu présent en\nfrançais, à part dans le mot « kilo » et ses dérivés. Les autres mots qui l’utilisent sont presque tous\ndes mots « voyageurs » (mots étrangers passés dans la langue française). Le geste Borel-Maisonny\nest celui du son [k] : un doigt recourbé qui montre l’intérieur de la bouche d’où l’air sort.\nJe m’entraine\nIl faut veiller à ce que les élèves\nposent bien la première partie du\nh et du k sur la ligne, pour éviter de\nfaire une « vague » avant le pont.\nJ’écris des mots\nLe h est présenté à la fois comme lettre muette et dans\nle « ch ».\nJe copie et je dessine\nLe prénom Charlie est devenu mixte. Les élèves\npeuvent donc représenter un garçon ou une fille, à leur\nchoix. On proposera de réaliser un décor montagnard.\nLes lettres h , k Cahier d’écriture CP-CE1 → p. 18-19\nhéros kimono\nCommence comme un l,\nrebondis et finis comme un n.\nCommence comme un h, rebondis,\nferme le pont et repars.\nh\nk\nLe h et le k\nrebondissent\nbien droit\nsur la ligne.",
  },
  {
    id: "mdi-ecriture-transition-lettre-f",
    order: 12,
    group: "L'écriture des lettres",
    title: "La lettre f",
    objective:
      "La lettre f est la seule qui soit à la fois montante et descendante. Elle demande d’abord de tendre le pouce pour monter (comme un l), puis de le plier pour descendre. Dans les modèles français, il n’y a pas de changement de direction à l’intérieur de la lettre, sauf pour la fina",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [24, 25],
    teacherPages: [16],
    legacyWorkbookPages: [20, 21],
    sourceStatus: "aligned",
    updateNeeded: false,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "L'écriture des lettres — La lettre f — cahier élève p. 24 à 25.",
      },
      {
        title: "Guide pédagogique 2018",
        detail:
          "16\n© MDI, 2018\nLa lettre f est la seule qui soit à la fois montante et descendante. Elle demande d’abord de tendre le\npouce pour monter (comme un l), puis de le plier pour descendre. Dans les modèles français, il n’y a\npas de changement de direction à l’intérieur de la lettre, sauf pour la finale (le « bec » qui rebondit\nsur la ligne).\nIl est important de veiller à ce que la lettre f soit fermée, et aussi à ce que la partie basse ne soit\npas trop large. On insistera sur le geste de la « fléchette » à réaliser avec les doigts (déplier/plier le\npouce).\nDans la gestuelle Borel-Maisonny, le [f] est représenté ainsi : la paume de la main vers le bas, on\navance, comme un fer à repasser.\nJe m’entraine\nLa lettre f est la plus grande de toutes les\nminuscules cursives. Pour ne pas créer\nd’enchevêtrement, elle est ici proposée\nune ligne sur deux.\nJ’écris des mots\nLe mot « affiche » est plus difficile, car la lettre f est\ndoublée.\nJe copie et je dessine\nOn pourra discuter avec les enfants de la manière de\nreprésenter un personnage qui est fâché. Les codes de\nla bande dessinée pourront être utilisés (y compris des\nonomatopées reproduites en lettres capitales).\nJe continue la frise\nIl est conseillé de faire tracer les diagonales avant\nde colorier.\nLa lettre f Cahier d’écriture CP-CE1 → p. 20-21\nfusée\nCommence comme un l, plie le pouce\njusquʼen bas, ferme sur la ligne et repars.\nf\nRepars dans\nl'autre sens\naprès le f .",
      },
    ],
    notes: [
      "Statut de correspondance : aligné.",
      "Correspondance directe entre le nouveau sommaire et le guide 2018.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Guide 2018 p.16]\n16\n© MDI, 2018\nLa lettre f est la seule qui soit à la fois montante et descendante. Elle demande d’abord de tendre le\npouce pour monter (comme un l), puis de le plier pour descendre. Dans les modèles français, il n’y a\npas de changement de direction à l’intérieur de la lettre, sauf pour la finale (le « bec » qui rebondit\nsur la ligne).\nIl est important de veiller à ce que la lettre f soit fermée, et aussi à ce que la partie basse ne soit\npas trop large. On insistera sur le geste de la « fléchette » à réaliser avec les doigts (déplier/plier le\npouce).\nDans la gestuelle Borel-Maisonny, le [f] est représenté ainsi : la paume de la main vers le bas, on\navance, comme un fer à repasser.\nJe m’entraine\nLa lettre f est la plus grande de toutes les\nminuscules cursives. Pour ne pas créer\nd’enchevêtrement, elle est ici proposée\nune ligne sur deux.\nJ’écris des mots\nLe mot « affiche » est plus difficile, car la lettre f est\ndoublée.\nJe copie et je dessine\nOn pourra discuter avec les enfants de la manière de\nreprésenter un personnage qui est fâché. Les codes de\nla bande dessinée pourront être utilisés (y compris des\nonomatopées reproduites en lettres capitales).\nJe continue la frise\nIl est conseillé de faire tracer les diagonales avant\nde colorier.\nLa lettre f Cahier d’écriture CP-CE1 → p. 20-21\nfusée\nCommence comme un l, plie le pouce\njusquʼen bas, ferme sur la ligne et repars.\nf\nRepars dans\nl'autre sens\naprès le f .",
  },
  {
    id: "mdi-ecriture-transition-lettres-j-y-g-q",
    order: 13,
    group: "L'écriture des lettres",
    title: "Les lettres j, y, g, q",
    objective:
      "Ces trois lettres ont en commun leur finale en jambage bouclé. Il faut bien insister sur le geste qui forme ce jambage : on plie d’abord le pouce (tout droit), puis on remonte en créant une petite boucle. Il ne s’agit pas d’une boucle à l’envers. Le geste Borel-Maisonny pour le [",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [26, 27],
    teacherPages: [17, 18],
    legacyWorkbookPages: [22, 23, 24, 25],
    sourceStatus: "partial",
    updateNeeded: true,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "L'écriture des lettres — Les lettres j, y, g, q — cahier élève p. 26 à 27.",
      },
      {
        title: "Guide pédagogique 2018",
        detail:
          "17\n© MDI, 2018\nCes trois lettres ont en commun leur finale en jambage bouclé. Il faut bien insister sur le geste\nqui forme ce jambage : on plie d’abord le pouce (tout droit), puis on remonte en créant une petite\nboucle. Il ne s’agit pas d’une boucle à l’envers.\nLe geste Borel-Maisonny pour le [ ʒ] consiste à poser un doigt sur la joue, comme le point sur le j.\nPour le [i], c’est toujours un doigt en l’air. Pour le [g], on utilise deux doigts : le pouce désigne la\ngorge, l’index l’intérieur de la bouche. On indique ainsi que le son [g] fait à la fois vibrer la gorge et\nsortir de l’air par la bouche.\nJe m’entraine\nLes similarités entre les trois lettres sont\nmises en avant.\nJ’écris des mots\nOn fera remarquer que le mot « yaourt » ne comporte\npas de e muet, car c’est un mot d’origine étrangère. La\nlocution « il y a » est généralement apprise comme un\ntout et connue des enfants.\nDictée muette\nle stylo – le journal – le tigre\nOn lira à voix haute l’indication donnée : le premier\nmot comporte un y. Les dictées muettes n’ont pas pour\nbut de créer des pièges orthographiques ou d’évaluer\nles connaissances, mais bien de renforcer le lien entre\nécriture et sens des mots. Il faut donc veiller à ce que les\nmots soient bien orthographiés dès le début.\nJe continue la frise\nCette frise est plus difficile, car les diagonales sont\nmaintenant à tracer sur deux interlignes. Il est conseillé\nde prendre le temps de verbaliser le tracé avec les élèves\navant de les laisser en autonomie.\nLes lettres j , y , g Cahier d’écriture CP-CE1 → p. 22-23\nCommence comme un i, plie le pouce et remonte.\nCommence comme un u et finis comme un j.\nCommence comme un a et finis comme un j.\nj\ng\ny\nPour ces trois\nlettres, il faut\nplier le pouce.\n\n18\n© MDI, 2018\nLa lettre q est la seule qui se termine sous la ligne. On plie le pouce et ensuite il faut lever le crayon\npour reprendre la lettre suivante (toujours un u) sur la ligne.\nLe son [k] se symbolise en montrant l’air qui sort de la bouche avec le doigt recourbé.\nJe m’entraine\nLa lettre q étant systématique -\nment suivie d’un u, ce sont les\nenchainements qui la précèdent\nqui sont travaillés ici.\nJ’écris des mots\nOn pourra faire remarquer aux élèves que le mot\n« laque », au féminin, est différent du mot « lac », au\nmasculin. On pourra présenter de la même manière\nles couples pic/pique, tic/tique, trac/traque, toc/toque\net même le particulier coq/coque.\nJe copie et je dessine\nIl faudra vérifier que les élèves connaissent le sens du\nmot « quart » avant de les laisser dessiner. Ils peuvent\npenser que c’est une portion de taille quelconque. Leur\nfaire remarquer que le mot est de la famille de « quatre »,\npuisqu’on coupe en quatre.\nJe continue la frise\nCette frise présente des aplats de couleurs qui continuent\nsur deux carreaux. Il faudra bien faire prendre des repères\naux élèves avant qu’ils commencent à colorier.\nLa lettre q Cahier d’écriture CP-CE1 → p. 24-25\nCommence comme un a et plie le pouce.\nq\nLève le crayon\naprès le q pour\nécrire le u.",
      },
    ],
    notes: [
      "Statut de correspondance : partiel.",
      "Le guide 2018 traite j, y, g puis q séparément ; le nouveau sommaire les regroupe.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Guide 2018 p.17]\n17\n© MDI, 2018\nCes trois lettres ont en commun leur finale en jambage bouclé. Il faut bien insister sur le geste\nqui forme ce jambage : on plie d’abord le pouce (tout droit), puis on remonte en créant une petite\nboucle. Il ne s’agit pas d’une boucle à l’envers.\nLe geste Borel-Maisonny pour le [ ʒ] consiste à poser un doigt sur la joue, comme le point sur le j.\nPour le [i], c’est toujours un doigt en l’air. Pour le [g], on utilise deux doigts : le pouce désigne la\ngorge, l’index l’intérieur de la bouche. On indique ainsi que le son [g] fait à la fois vibrer la gorge et\nsortir de l’air par la bouche.\nJe m’entraine\nLes similarités entre les trois lettres sont\nmises en avant.\nJ’écris des mots\nOn fera remarquer que le mot « yaourt » ne comporte\npas de e muet, car c’est un mot d’origine étrangère. La\nlocution « il y a » est généralement apprise comme un\ntout et connue des enfants.\nDictée muette\nle stylo – le journal – le tigre\nOn lira à voix haute l’indication donnée : le premier\nmot comporte un y. Les dictées muettes n’ont pas pour\nbut de créer des pièges orthographiques ou d’évaluer\nles connaissances, mais bien de renforcer le lien entre\nécriture et sens des mots. Il faut donc veiller à ce que les\nmots soient bien orthographiés dès le début.\nJe continue la frise\nCette frise est plus difficile, car les diagonales sont\nmaintenant à tracer sur deux interlignes. Il est conseillé\nde prendre le temps de verbaliser le tracé avec les élèves\navant de les laisser en autonomie.\nLes lettres j , y , g Cahier d’écriture CP-CE1 → p. 22-23\nCommence comme un i, plie le pouce et remonte.\nCommence comme un u et finis comme un j.\nCommence comme un a et finis comme un j.\nj\ng\ny\nPour ces trois\nlettres, il faut\nplier le pouce.\n\n[Guide 2018 p.18]\n18\n© MDI, 2018\nLa lettre q est la seule qui se termine sous la ligne. On plie le pouce et ensuite il faut lever le crayon\npour reprendre la lettre suivante (toujours un u) sur la ligne.\nLe son [k] se symbolise en montrant l’air qui sort de la bouche avec le doigt recourbé.\nJe m’entraine\nLa lettre q étant systématique -\nment suivie d’un u, ce sont les\nenchainements qui la précèdent\nqui sont travaillés ici.\nJ’écris des mots\nOn pourra faire remarquer aux élèves que le mot\n« laque », au féminin, est différent du mot « lac », au\nmasculin. On pourra présenter de la même manière\nles couples pic/pique, tic/tique, trac/traque, toc/toque\net même le particulier coq/coque.\nJe copie et je dessine\nIl faudra vérifier que les élèves connaissent le sens du\nmot « quart » avant de les laisser dessiner. Ils peuvent\npenser que c’est une portion de taille quelconque. Leur\nfaire remarquer que le mot est de la famille de « quatre »,\npuisqu’on coupe en quatre.\nJe continue la frise\nCette frise présente des aplats de couleurs qui continuent\nsur deux carreaux. Il faudra bien faire prendre des repères\naux élèves avant qu’ils commencent à colorier.\nLa lettre q Cahier d’écriture CP-CE1 → p. 24-25\nCommence comme un a et plie le pouce.\nq\nLève le crayon\naprès le q pour\nécrire le u.",
  },
  {
    id: "mdi-ecriture-transition-lettres-b-v-w",
    order: 14,
    group: "L'écriture des lettres",
    title: "Les lettres b, v, w",
    objective:
      "Cette page présente les lettres qui, comme le o, se terminent par une liaison haute avec la lettre suivante. Pour le son [b], le geste est celui d’une main ouverte en « boule » sur le ventre (on peut dire sur le « bidon », pour créer une assonance). Le [v] est représenté avec les",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [28, 29],
    teacherPages: [19],
    legacyWorkbookPages: [26, 27],
    sourceStatus: "aligned",
    updateNeeded: false,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "L'écriture des lettres — Les lettres b, v, w — cahier élève p. 28 à 29.",
      },
      {
        title: "Guide pédagogique 2018",
        detail:
          "19\n© MDI, 2018\nCette page présente les lettres qui, comme le o, se terminent par une liaison haute avec la lettre suivante.\nPour le son [b], le geste est celui d’une main ouverte en « boule » sur le ventre (on peut dire sur le\n« bidon », pour créer une assonance). Le [v] est représenté avec les deux mains en V, qui avancent. Pour\nle w, il n’y a pas de geste spécifique : soit le son est le même que [v], soit le w sert à la transcription de\nmots étrangers, comme dans « wapiti ». Le [w] n’est pas représenté par un geste, sauf dans le oi [wa].\n\nJe m’entraine\nL’enchainement du b et du r, comme celui du v et du r, est\nle même que celui du o et du r, vu p. 14 du cahier. De la\nmême manière, avant le e, l’élève doit légèrement baisser\nla finale du b ou du v pour commencer à tracer son e. Et\nla lettre e apparait « cassée ». C’est un aménagement\ncontextuel tout à fait normal dans l’écriture cursive.\nCette difficulté peut nécessiter de multiplier les entrai-\nnements sur ardoise ou sur papier de brouillon. Il est\ndifficile de baisser légèrement la finale sans descendre\nsur la ligne. Et il est également difficile de tracer un e avec\nune boucle dans un espace réduit.\nIl est particulièrement nécessaire\nd’être attentif à l’absence d’œille -\ntons pour des enchainements tels\nque « br », « vr » ou « be », « ve », où la\nprésence d’œilletons est une difficul-\nté particulièrement importante.\nJ’écris des mots\nUne fois que l’élève s’est entrainé à baisser la finale de\nla lettre pour enchainer avec r ou e, il est important de\nle faire à nouveau écrire les lettres b et v avant d’autres\nlettres, pour que cette fois la finale reste à l’interligne.\nDictée muette\nla cabane – l’avion – l’arbre\nLe mot « arbre » est difficile à encoder pour les jeunes\nenfants. Il est recommandé de prendre le temps de le\ndécomposer.\nJe continue la frise\nCette frise est plus difficile que les précédentes car elle\nn’est pas symétrique. Il est recommandé de prendre le\ntemps de décrire ce qui est différent dans la partie de\ngauche (diagonale de tout le carré) et dans celle de droite\n(diagonale de deux interlignes). L’élève devra tracer les\ndiagonales comme repère avant de commencer à colorier.\nLes lettres b , v , w Cahier d’écriture CP → p. 26-27\nallon\nCommence comme un l et fais un bec en haut.\nCommence comme un n et finis comme un b.\nFais un double v.\nb\nw\nv\nBaisse le bec\ndu b et du v\navant e ou r.",
      },
    ],
    notes: [
      "Statut de correspondance : aligné.",
      "Correspondance directe entre le nouveau sommaire et le guide 2018.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Guide 2018 p.19]\n19\n© MDI, 2018\nCette page présente les lettres qui, comme le o, se terminent par une liaison haute avec la lettre suivante.\nPour le son [b], le geste est celui d’une main ouverte en « boule » sur le ventre (on peut dire sur le\n« bidon », pour créer une assonance). Le [v] est représenté avec les deux mains en V, qui avancent. Pour\nle w, il n’y a pas de geste spécifique : soit le son est le même que [v], soit le w sert à la transcription de\nmots étrangers, comme dans « wapiti ». Le [w] n’est pas représenté par un geste, sauf dans le oi [wa].\n\nJe m’entraine\nL’enchainement du b et du r, comme celui du v et du r, est\nle même que celui du o et du r, vu p. 14 du cahier. De la\nmême manière, avant le e, l’élève doit légèrement baisser\nla finale du b ou du v pour commencer à tracer son e. Et\nla lettre e apparait « cassée ». C’est un aménagement\ncontextuel tout à fait normal dans l’écriture cursive.\nCette difficulté peut nécessiter de multiplier les entrai-\nnements sur ardoise ou sur papier de brouillon. Il est\ndifficile de baisser légèrement la finale sans descendre\nsur la ligne. Et il est également difficile de tracer un e avec\nune boucle dans un espace réduit.\nIl est particulièrement nécessaire\nd’être attentif à l’absence d’œille -\ntons pour des enchainements tels\nque « br », « vr » ou « be », « ve », où la\nprésence d’œilletons est une difficul-\nté particulièrement importante.\nJ’écris des mots\nUne fois que l’élève s’est entrainé à baisser la finale de\nla lettre pour enchainer avec r ou e, il est important de\nle faire à nouveau écrire les lettres b et v avant d’autres\nlettres, pour que cette fois la finale reste à l’interligne.\nDictée muette\nla cabane – l’avion – l’arbre\nLe mot « arbre » est difficile à encoder pour les jeunes\nenfants. Il est recommandé de prendre le temps de le\ndécomposer.\nJe continue la frise\nCette frise est plus difficile que les précédentes car elle\nn’est pas symétrique. Il est recommandé de prendre le\ntemps de décrire ce qui est différent dans la partie de\ngauche (diagonale de tout le carré) et dans celle de droite\n(diagonale de deux interlignes). L’élève devra tracer les\ndiagonales comme repère avant de commencer à colorier.\nLes lettres b , v , w Cahier d’écriture CP → p. 26-27\nallon\nCommence comme un l et fais un bec en haut.\nCommence comme un n et finis comme un b.\nFais un double v.\nb\nw\nv\nBaisse le bec\ndu b et du v\navant e ou r.",
  },
  {
    id: "mdi-ecriture-transition-lettres-z-x",
    order: 15,
    group: "L'écriture des lettres",
    title: "Les lettres z et x",
    objective:
      "La lettre z est la seule qui contienne une boucle à l’envers. Contrairement aux lettres j, y et g, il ne faut pas plier le pouce, mais bien entamer dès la ligne un mouvement de rotation à l’envers. Il ne faut pas non plus que les élèves oublient de reculer légèrement, pour que la",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [30, 31],
    teacherPages: [20, 21],
    legacyWorkbookPages: [28, 29, 30, 31],
    sourceStatus: "partial",
    updateNeeded: true,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "L'écriture des lettres — Les lettres z et x — cahier élève p. 30 à 31.",
      },
      {
        title: "Guide pédagogique 2018",
        detail:
          "20\n© MDI, 2018\nLa lettre z est la seule qui contienne une boucle à l’envers. Contrairement aux lettres j, y et g, il ne faut\npas plier le pouce, mais bien entamer dès la ligne un mouvement de rotation à l’envers. Il ne faut pas non\nplus que les élèves oublient de reculer légèrement, pour que la boucle soit en-dessous de la première\npartie du z et non à côté.\nLe son [z] est représenté par un doigt qui zigzague rapidement, comme une abeille.\n\nJe m’entraine\nIl faut veiller à ce que les enfants\nplient le pouce pour que la boucle\nà l’envers soit allongée vers le bas.\n\nJ’écris des mots\nOn peut faire remarquer aux élèves que le son [z] est\nrarement produit par la lettre z, sauf en début de mot et\ndans les nombres. Le mot « trapèze », présenté ici, est\nune exception. La plupart du temps, le son est produit\npar un s entre deux voyelles (rose, maison, frise…)\nJe copie et je dessine\nOn peut inciter les enfants à ne pas se contenter de\nreprésenter le zèbre, mais plusieurs animaux du zoo.\nJe continue la frise\nCette frise est construite « en escalier ». Il est\nrecommandé de prendre le temps de repérer sa\nconstruction avec les élèves avant de leur demander\nde la reproduire.\nLa lettre z Cahier d’écriture CP-CE1 → p. 28-29\nCommence comme un i, fais un bec en haut,\nrecule et termine par une boucle à lʼenvers.\nzéro\nz\nLa boucle\nà lʼenvers va\nvers le bas.\n\n21\n© MDI, 2018\nLa lettre x est la seule lettre qui se trace en deux fois : d’abord un c à l’envers, puis un c à l’endroit\ncollé. C’est également la seule lettre qui, à elle seule, se lit avec deux sons : [ks] ou [gz]. La méthode\nBorel-Maisonny la symbolise par un seul geste : les doigts croisés. Seul le son [ks] est présenté ici.\nLe départ de la lettre se fait dans le même sens que le m, le n ou le v.\n\nJe m’entraine\nIl faut veiller à ce que les enfants\nne confondent pas la lettre x et les\nlettres sc, comme dans « scie » ou\n« piscine ». Le x n’a pas de pointe\ncomme le s.\nJ’écris des mots\nLes deux premiers mots, « six » et « dix », rappellent\nà l’élève des mots connus où le x a une prononcia -\ntion différente – [s]. On pourra, si on le juge opportun,\nprésenter également un mot comme « dixième », où le\nx a encore une autre valeur.\nJe copie et je dessine\nOn pourra inciter l’élève à dessiner de belles affiches\ncolorées, avec ou sans texte.\nJe continue la frise\nCette dernière frise n’est pas symétrique. Il faut\nd’abord prendre des repères – un carreau sur deux, une\ndiagonale sur deux interlignes – avant de commencer\nà colorier.\nLa lettre x Cahier d’écriture CP-CE1 → p. 30-31\ntaxi\nCommence comme un c à lʼenvers\npuis colle un c à lʼendroit.\nx\nTu dois lever\nle crayon au\nmilieu du x .",
      },
    ],
    notes: [
      "Statut de correspondance : partiel.",
      "Le guide 2018 traite z puis x séparément ; le nouveau sommaire les regroupe.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Guide 2018 p.20]\n20\n© MDI, 2018\nLa lettre z est la seule qui contienne une boucle à l’envers. Contrairement aux lettres j, y et g, il ne faut\npas plier le pouce, mais bien entamer dès la ligne un mouvement de rotation à l’envers. Il ne faut pas non\nplus que les élèves oublient de reculer légèrement, pour que la boucle soit en-dessous de la première\npartie du z et non à côté.\nLe son [z] est représenté par un doigt qui zigzague rapidement, comme une abeille.\n\nJe m’entraine\nIl faut veiller à ce que les enfants\nplient le pouce pour que la boucle\nà l’envers soit allongée vers le bas.\n\nJ’écris des mots\nOn peut faire remarquer aux élèves que le son [z] est\nrarement produit par la lettre z, sauf en début de mot et\ndans les nombres. Le mot « trapèze », présenté ici, est\nune exception. La plupart du temps, le son est produit\npar un s entre deux voyelles (rose, maison, frise…)\nJe copie et je dessine\nOn peut inciter les enfants à ne pas se contenter de\nreprésenter le zèbre, mais plusieurs animaux du zoo.\nJe continue la frise\nCette frise est construite « en escalier ». Il est\nrecommandé de prendre le temps de repérer sa\nconstruction avec les élèves avant de leur demander\nde la reproduire.\nLa lettre z Cahier d’écriture CP-CE1 → p. 28-29\nCommence comme un i, fais un bec en haut,\nrecule et termine par une boucle à lʼenvers.\nzéro\nz\nLa boucle\nà lʼenvers va\nvers le bas.\n\n[Guide 2018 p.21]\n21\n© MDI, 2018\nLa lettre x est la seule lettre qui se trace en deux fois : d’abord un c à l’envers, puis un c à l’endroit\ncollé. C’est également la seule lettre qui, à elle seule, se lit avec deux sons : [ks] ou [gz]. La méthode\nBorel-Maisonny la symbolise par un seul geste : les doigts croisés. Seul le son [ks] est présenté ici.\nLe départ de la lettre se fait dans le même sens que le m, le n ou le v.\n\nJe m’entraine\nIl faut veiller à ce que les enfants\nne confondent pas la lettre x et les\nlettres sc, comme dans « scie » ou\n« piscine ». Le x n’a pas de pointe\ncomme le s.\nJ’écris des mots\nLes deux premiers mots, « six » et « dix », rappellent\nà l’élève des mots connus où le x a une prononcia -\ntion différente – [s]. On pourra, si on le juge opportun,\nprésenter également un mot comme « dixième », où le\nx a encore une autre valeur.\nJe copie et je dessine\nOn pourra inciter l’élève à dessiner de belles affiches\ncolorées, avec ou sans texte.\nJe continue la frise\nCette dernière frise n’est pas symétrique. Il faut\nd’abord prendre des repères – un carreau sur deux, une\ndiagonale sur deux interlignes – avant de commencer\nà colorier.\nLa lettre x Cahier d’écriture CP-CE1 → p. 30-31\ntaxi\nCommence comme un c à lʼenvers\npuis colle un c à lʼendroit.\nx\nTu dois lever\nle crayon au\nmilieu du x .",
  },
  {
    id: "mdi-ecriture-transition-lettres-c-oe",
    order: 16,
    group: "L'écriture des lettres",
    title: "Les lettres ç et œ",
    objective:
      "La cédille a pour effet d’adoucir la lettre c avant les voyelles a, o, u. Cette page est l’occasion de rappeler la règle aux élèves. La cédille doit rester de taille raisonnable et ne jamais dépasser un interligne vers le bas. Il peut être intéressant, au moment de cette leçon, d",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [32, 33],
    teacherPages: [22],
    legacyWorkbookPages: [32, 33],
    sourceStatus: "aligned",
    updateNeeded: false,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "L'écriture des lettres — Les lettres ç et œ — cahier élève p. 32 à 33.",
      },
      {
        title: "Guide pédagogique 2018",
        detail:
          "22\n© MDI, 2018\nLa cédille a pour effet d’adoucir la lettre c avant les voyelles a, o, u.\nCette page est l’occasion de rappeler la règle aux élèves.\nLa cédille doit rester de taille raisonnable et ne jamais dépasser un interligne vers le bas.\nIl peut être intéressant, au moment de cette leçon, de travailler la conjugaison de verbes en « cer » :\navancer, placer, rincer, lacer.\nOn peut utiliser les deux expressions « e dans l’o » ou « e collé ».\nLa liste des mots, assez courte, peut être mémorisée par les élèves.\nLa cédille Cahier d’écriture CP-CE1 → p. 32\nLe e dans l’o Cahier d’écriture CP-CE1 → p. 33\nç\nglaçon\nLa cédille se place comme un petit crochet sous le c.\nç\nœ\ncœur\nLe o et le e sont parfois collés.\nœ",
      },
    ],
    notes: [
      "Statut de correspondance : aligné.",
      "Correspondance directe ; le guide 2018 parle de la cédille et du e dans l’o.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Guide 2018 p.22]\n22\n© MDI, 2018\nLa cédille a pour effet d’adoucir la lettre c avant les voyelles a, o, u.\nCette page est l’occasion de rappeler la règle aux élèves.\nLa cédille doit rester de taille raisonnable et ne jamais dépasser un interligne vers le bas.\nIl peut être intéressant, au moment de cette leçon, de travailler la conjugaison de verbes en « cer » :\navancer, placer, rincer, lacer.\nOn peut utiliser les deux expressions « e dans l’o » ou « e collé ».\nLa liste des mots, assez courte, peut être mémorisée par les élèves.\nLa cédille Cahier d’écriture CP-CE1 → p. 32\nLe e dans l’o Cahier d’écriture CP-CE1 → p. 33\nç\nglaçon\nLa cédille se place comme un petit crochet sous le c.\nç\nœ\ncœur\nLe o et le e sont parfois collés.\nœ",
  },
  {
    id: "mdi-ecriture-transition-enchainements",
    order: 17,
    group: "L'écriture des lettres",
    title: "Les enchaînements",
    objective:
      "La lettre r est présentée seule car c’est une lettre plus compliquée à aborder. Son tracé est très variable selon les modèles. Notre proposition ici est simple : commencer comme la lettre i et terminer comme la lettre n – ce qui implique un changement de direction du tracé de la ",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [34, 35],
    teacherPages: [13, 19],
    legacyWorkbookPages: [],
    sourceStatus: "partial",
    updateNeeded: true,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "L'écriture des lettres — Les enchaînements — cahier élève p. 34 à 35.",
      },
      {
        title: "Guide pédagogique 2018",
        detail:
          "13\n© MDI, 2018\nLa lettre r est présentée seule car c’est une lettre plus compliquée à aborder. Son tracé est très\nvariable selon les modèles. Notre proposition ici est simple : commencer comme la lettre i et\nterminer comme la lettre n – ce qui implique un changement de direction du tracé de la lettre.\nLa lettre sera présentée avec le geste Borel-Maisonny : un doigt qui désigne la gorge, là où le [r]\nfrançais gratte un peu.\nJe m’entraine\nDans ce cahier de perfectionnement, les enchai -\nnements difficiles sont abordés. En particulier, ici,\nle « or ». Si on trace le o selon le modèle habituel,\nle tracé arrive trop haut et oblige à faire un r qui\ndépasse sur le deuxième interligne. Pour éviter cet\nécueil, il convient de baisser légèrement le bec du o,\nafin de pouvoir ensuite remonter le r, qui lui-même\ncommence en hauteur. Les formes des deux lettres\n(fin du o et début du r) sont ainsi modifiées dans le\ncadre de cet enchainement.\nCe qui est difficile pour les enfants,\nc’est de baisser un peu le bec du o\nsans le baisser trop : il faut veiller à\nce qu’il ne redescende pas jusqu’à\nla ligne. Un entrainement en grand\nsur ardoise ou papier de brouillon\nsera sans doute nécessaire pour\ntravailler cet enchainement.\nJ’écris des mots\nLes deux mots contenant l’enchainement « or »\nsont présentés à la fin. Les autres enchainements\nsont plus simples – il faut juste penser à « sauter »\naprès le r pour commencer les lettres rondes.\nJe copie et je dessine\nAu fil des « Je copie et je dessine », on pourra inciter\nl’enfant, après avoir pris en compte les éléments indis-\npensables (le pirate doit pouvoir être identifié comme\ntel par un élément significatif, il doit avoir une bouche\nindiquant le rire), à enrichir le décor et à utiliser tout\nl’espace prévu pour le dessin.\nJe continue la frise\nCette frise présente des surfaces plus petites, de la\ntaille d’un interligne. Elle nécessite une plus grande\nprécision. On peut inciter les enfants à délimiter\nplusieurs fois la surface avant de la colorier, pour\nprendre conscience de sa taille.\nLa lettre r Cahier d’écriture CP-CE1 → p. 14-15\nrenard\nCommence comme un i et finis comme un n.\nr\nBaisse un peu\nle bec du o pour\nécrire or .\n\n19\n© MDI, 2018\nCette page présente les lettres qui, comme le o, se terminent par une liaison haute avec la lettre suivante.\nPour le son [b], le geste est celui d’une main ouverte en « boule » sur le ventre (on peut dire sur le\n« bidon », pour créer une assonance). Le [v] est représenté avec les deux mains en V, qui avancent. Pour\nle w, il n’y a pas de geste spécifique : soit le son est le même que [v], soit le w sert à la transcription de\nmots étrangers, comme dans « wapiti ». Le [w] n’est pas représenté par un geste, sauf dans le oi [wa].\n\nJe m’entraine\nL’enchainement du b et du r, comme celui du v et du r, est\nle même que celui du o et du r, vu p. 14 du cahier. De la\nmême manière, avant le e, l’élève doit légèrement baisser\nla finale du b ou du v pour commencer à tracer son e. Et\nla lettre e apparait « cassée ». C’est un aménagement\ncontextuel tout à fait normal dans l’écriture cursive.\nCette difficulté peut nécessiter de multiplier les entrai-\nnements sur ardoise ou sur papier de brouillon. Il est\ndifficile de baisser légèrement la finale sans descendre\nsur la ligne. Et il est également difficile de tracer un e avec\nune boucle dans un espace réduit.\nIl est particulièrement nécessaire\nd’être attentif à l’absence d’œille -\ntons pour des enchainements tels\nque « br », « vr » ou « be », « ve », où la\nprésence d’œilletons est une difficul-\nté particulièrement importante.\nJ’écris des mots\nUne fois que l’élève s’est entrainé à baisser la finale de\nla lettre pour enchainer avec r ou e, il est important de\nle faire à nouveau écrire les lettres b et v avant d’autres\nlettres, pour que cette fois la finale reste à l’interligne.\nDictée muette\nla cabane – l’avion – l’arbre\nLe mot « arbre » est difficile à encoder pour les jeunes\nenfants. Il est recommandé de prendre le temps de le\ndécomposer.\nJe continue la frise\nCette frise est plus difficile que les précédentes car elle\nn’est pas symétrique. Il est recommandé de prendre le\ntemps de décrire ce qui est différent dans la partie de\ngauche (diagonale de tout le carré) et dans celle de droite\n(diagonale de deux interlignes). L’élève devra tracer les\ndiagonales comme repère avant de commencer à colorier.\nLes lettres b , v , w Cahier d’écriture CP → p. 26-27\nallon\nCommence comme un l et fais un bec en haut.\nCommence comme un n et finis comme un b.\nFais un double v.\nb\nw\nv\nBaisse le bec\ndu b et du v\navant e ou r.",
      },
    ],
    notes: [
      "Statut de correspondance : partiel.",
      "Le guide 2018 traite les enchaînements au fil des lettres (or, br, vr, be, ve…), sans séquence autonome.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Guide 2018 p.13]\n13\n© MDI, 2018\nLa lettre r est présentée seule car c’est une lettre plus compliquée à aborder. Son tracé est très\nvariable selon les modèles. Notre proposition ici est simple : commencer comme la lettre i et\nterminer comme la lettre n – ce qui implique un changement de direction du tracé de la lettre.\nLa lettre sera présentée avec le geste Borel-Maisonny : un doigt qui désigne la gorge, là où le [r]\nfrançais gratte un peu.\nJe m’entraine\nDans ce cahier de perfectionnement, les enchai -\nnements difficiles sont abordés. En particulier, ici,\nle « or ». Si on trace le o selon le modèle habituel,\nle tracé arrive trop haut et oblige à faire un r qui\ndépasse sur le deuxième interligne. Pour éviter cet\nécueil, il convient de baisser légèrement le bec du o,\nafin de pouvoir ensuite remonter le r, qui lui-même\ncommence en hauteur. Les formes des deux lettres\n(fin du o et début du r) sont ainsi modifiées dans le\ncadre de cet enchainement.\nCe qui est difficile pour les enfants,\nc’est de baisser un peu le bec du o\nsans le baisser trop : il faut veiller à\nce qu’il ne redescende pas jusqu’à\nla ligne. Un entrainement en grand\nsur ardoise ou papier de brouillon\nsera sans doute nécessaire pour\ntravailler cet enchainement.\nJ’écris des mots\nLes deux mots contenant l’enchainement « or »\nsont présentés à la fin. Les autres enchainements\nsont plus simples – il faut juste penser à « sauter »\naprès le r pour commencer les lettres rondes.\nJe copie et je dessine\nAu fil des « Je copie et je dessine », on pourra inciter\nl’enfant, après avoir pris en compte les éléments indis-\npensables (le pirate doit pouvoir être identifié comme\ntel par un élément significatif, il doit avoir une bouche\nindiquant le rire), à enrichir le décor et à utiliser tout\nl’espace prévu pour le dessin.\nJe continue la frise\nCette frise présente des surfaces plus petites, de la\ntaille d’un interligne. Elle nécessite une plus grande\nprécision. On peut inciter les enfants à délimiter\nplusieurs fois la surface avant de la colorier, pour\nprendre conscience de sa taille.\nLa lettre r Cahier d’écriture CP-CE1 → p. 14-15\nrenard\nCommence comme un i et finis comme un n.\nr\nBaisse un peu\nle bec du o pour\nécrire or .\n\n[Guide 2018 p.19]\n19\n© MDI, 2018\nCette page présente les lettres qui, comme le o, se terminent par une liaison haute avec la lettre suivante.\nPour le son [b], le geste est celui d’une main ouverte en « boule » sur le ventre (on peut dire sur le\n« bidon », pour créer une assonance). Le [v] est représenté avec les deux mains en V, qui avancent. Pour\nle w, il n’y a pas de geste spécifique : soit le son est le même que [v], soit le w sert à la transcription de\nmots étrangers, comme dans « wapiti ». Le [w] n’est pas représenté par un geste, sauf dans le oi [wa].\n\nJe m’entraine\nL’enchainement du b et du r, comme celui du v et du r, est\nle même que celui du o et du r, vu p. 14 du cahier. De la\nmême manière, avant le e, l’élève doit légèrement baisser\nla finale du b ou du v pour commencer à tracer son e. Et\nla lettre e apparait « cassée ». C’est un aménagement\ncontextuel tout à fait normal dans l’écriture cursive.\nCette difficulté peut nécessiter de multiplier les entrai-\nnements sur ardoise ou sur papier de brouillon. Il est\ndifficile de baisser légèrement la finale sans descendre\nsur la ligne. Et il est également difficile de tracer un e avec\nune boucle dans un espace réduit.\nIl est particulièrement nécessaire\nd’être attentif à l’absence d’œille -\ntons pour des enchainements tels\nque « br », « vr » ou « be », « ve », où la\nprésence d’œilletons est une difficul-\nté particulièrement importante.\nJ’écris des mots\nUne fois que l’élève s’est entrainé à baisser la finale de\nla lettre pour enchainer avec r ou e, il est important de\nle faire à nouveau écrire les lettres b et v avant d’autres\nlettres, pour que cette fois la finale reste à l’interligne.\nDictée muette\nla cabane – l’avion – l’arbre\nLe mot « arbre » est difficile à encoder pour les jeunes\nenfants. Il est recommandé de prendre le temps de le\ndécomposer.\nJe continue la frise\nCette frise est plus difficile que les précédentes car elle\nn’est pas symétrique. Il est recommandé de prendre le\ntemps de décrire ce qui est différent dans la partie de\ngauche (diagonale de tout le carré) et dans celle de droite\n(diagonale de deux interlignes). L’élève devra tracer les\ndiagonales comme repère avant de commencer à colorier.\nLes lettres b , v , w Cahier d’écriture CP → p. 26-27\nallon\nCommence comme un l et fais un bec en haut.\nCommence comme un n et finis comme un b.\nFais un double v.\nb\nw\nv\nBaisse le bec\ndu b et du v\navant e ou r.",
  },
  {
    id: "mdi-ecriture-transition-ponctuation",
    order: 18,
    group: "Consolidation",
    title: "La ponctuation",
    objective:
      "Les ? et ! se tracent de haut en bas. Les : font un interligne. Les « » font un interligne aussi. ? !",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [36, 37],
    teacherPages: [23],
    legacyWorkbookPages: [34, 35, 36, 37, 38],
    sourceStatus: "partial",
    updateNeeded: true,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "Consolidation — La ponctuation — cahier élève p. 36 à 37.",
      },
      {
        title: "Guide pédagogique 2018",
        detail:
          "23\n© MDI, 2018\nLes ? et ! se tracent de haut en bas.\nLes : font un interligne.\nLes « » font un interligne aussi.\n? !\n:\n« »\nLes élèves ont souvent tendance à tracer des traits tout droits pour les virgules et à les réaliser de trop\ngrande taille. Ces deux doubles pages sont l’occasion de revenir sur les signes de ponctuation.\nLe point-virgule est devenu peu usité. Il n’est donc proposé que dans une phrase.\nLes points d’interrogation et d’exclamation donnent l’occasion de travailler la lecture à voix haute, avec\nl’intonation correspondante.\nLes deux points annoncent une explication à venir.\nIl faut insister auprès des élèves sur le rôle des guillemets ouvrants et fermants. Les guillemets ont deux\nusages : rapporter les propos de quelqu’un ou signaler une expression familière. C’est le deuxième\nusage qui est utilisé ici. On expliquera bien aux enfants que le mot « trognon », dans l’acception de\n« trop mignon », et le mot « gratte-gratte », pour désigner une plante, ne sont pas les termes exacts,\nmais des manières de parler.\nCes deux doubles pages proposent chacune la transcription écriture scripte/\nécriture cursive de trois phrases, qui sont mélangées pour que l’élève doive les lire\net les comprendre. Les majuscules sont identiques afin de ne pas donner un repère\ntrop simple à l’enfant.\nDans la deuxième double page, une fois les phrases remises en ordre, on obtient le\nrésumé très rapide d’un conte célèbre.\nLa ponctuation . , ;\nLe point est petit et posé sur la ligne.\nLa virgule descend comme un accent aigu.\nLe point-virgule commence au premier\ninterligne.\n,\n.\n;\n? ! : « »\nCahier d’écriture CP-CE1 → p. 34-38\nCahier d’écriture CP-CE1 → p. 38-41Vers lʼécriture courante\nRecopie chaque phrase sous le bon dessin.\nLis bien chaque\nphrase avant\nde la copier.",
      },
    ],
    notes: [
      "Statut de correspondance : partiel.",
      "Le guide 2018 regroupe la ponctuation et les premières activités de transcription courante sur une même page de guide.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Guide 2018 p.23]\n23\n© MDI, 2018\nLes ? et ! se tracent de haut en bas.\nLes : font un interligne.\nLes « » font un interligne aussi.\n? !\n:\n« »\nLes élèves ont souvent tendance à tracer des traits tout droits pour les virgules et à les réaliser de trop\ngrande taille. Ces deux doubles pages sont l’occasion de revenir sur les signes de ponctuation.\nLe point-virgule est devenu peu usité. Il n’est donc proposé que dans une phrase.\nLes points d’interrogation et d’exclamation donnent l’occasion de travailler la lecture à voix haute, avec\nl’intonation correspondante.\nLes deux points annoncent une explication à venir.\nIl faut insister auprès des élèves sur le rôle des guillemets ouvrants et fermants. Les guillemets ont deux\nusages : rapporter les propos de quelqu’un ou signaler une expression familière. C’est le deuxième\nusage qui est utilisé ici. On expliquera bien aux enfants que le mot « trognon », dans l’acception de\n« trop mignon », et le mot « gratte-gratte », pour désigner une plante, ne sont pas les termes exacts,\nmais des manières de parler.\nCes deux doubles pages proposent chacune la transcription écriture scripte/\nécriture cursive de trois phrases, qui sont mélangées pour que l’élève doive les lire\net les comprendre. Les majuscules sont identiques afin de ne pas donner un repère\ntrop simple à l’enfant.\nDans la deuxième double page, une fois les phrases remises en ordre, on obtient le\nrésumé très rapide d’un conte célèbre.\nLa ponctuation . , ;\nLe point est petit et posé sur la ligne.\nLa virgule descend comme un accent aigu.\nLe point-virgule commence au premier\ninterligne.\n,\n.\n;\n? ! : « »\nCahier d’écriture CP-CE1 → p. 34-38\nCahier d’écriture CP-CE1 → p. 38-41Vers lʼécriture courante\nRecopie chaque phrase sous le bon dessin.\nLis bien chaque\nphrase avant\nde la copier.",
  },
  {
    id: "mdi-ecriture-transition-utilisation-regle",
    order: 19,
    group: "Consolidation",
    title: "L'utilisation de la règle",
    objective:
      "Les élèves ont souvent des difficultés pour souligner correctement à la règle. Le crayon doit être tenu beaucoup plus verticalement que pour l’écriture. Bien souvent, les élèves pensent que le trait de soulignement doit être sur la ligne de base de l’écriture, alors qu’il doit êt",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [38, 39],
    teacherPages: [24],
    legacyWorkbookPages: [42, 43],
    sourceStatus: "aligned",
    updateNeeded: false,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "Consolidation — L'utilisation de la règle — cahier élève p. 38 à 39.",
      },
      {
        title: "Guide pédagogique 2018",
        detail:
          "24\n© MDI, 2018\nLes élèves ont souvent des difficultés pour souligner correctement à la règle. Le crayon doit être tenu\nbeaucoup plus verticalement que pour l’écriture. Bien souvent, les élèves pensent que le trait de\nsoulignement doit être sur la ligne de base de l’écriture, alors qu’il doit être sur l’interligne du dessous.\nIls hésitent aussi parfois à couper les lettres descendantes, ce qui leur fait perdre beaucoup de temps.\nCette double page leur permet de s’entrainer d’abord à souligner correctement, avant d’appliquer la\ntechnique ainsi acquise à un exercice de grammaire très simple. Le lien est ainsi fait avec le travail\nquotidien de la classe.\nLes deux doubles pages sur les chiffres donnent à l’élève l’occasion de s’entrainer à écrire les chiffres\ndans le bon sens. N’étant pas portés par le geste cursif, les chiffres sont bien souvent tracés à l’envers.\nSeul l’entrainement permet de mémoriser le bon sens du geste. En traçant le 5 en deux fois, on évite\nde démarrer un chiffre « à l’envers » (de droite à gauche) et on évite aussi les déformations faisant\nressemble le 5 à un S majuscule.\nSur les pages de droite, un entrainement est proposé, en lien avec le travail quotidien de la classe.\nD’abord, on propose l’écriture de la date, avec une attention toute particulière portée au tracé des\nchiffres. Il est à rappeler que les élèves de CP ne peuvent pas écrire la date seuls au début de l’année :\nles noms des mois de septembre, octobre, novembre et décembre comportent trop de difficultés, et en\nparticulier le br, pour pouvoir être abordés. L’exercice suivant est une copie d’opérations en ligne, dont\nles résultats sont donnés. Enfin la pose et le calcul d’opérations simples. Aucune opération ne comporte\nde retenue, pour que le travail soit réalisable quelle que soit l’avancée de la classe en mathématiques.\nL’élève doit se concentrer sur la présentation : espacement des opérations, un chiffre par carreau, tracé\ndu trait à la règle, positionnement correct des dizaines et des unités.\nL ʼutilisation de la règle Cahier d’écriture CP-CE1 → p. 42-43\nTiens ta règle avec ton autre main.\nTu dois voir lʼinterligne du dessous.\nTrace le trait en une seule fois sans\ndépasser.\nLes chiffres 1 2 3 4 5 6 7 8 9 0\nCahier d’écriture CP-CE1 → p. 44-47\nTous les chiffres font deux\ninterlignes de hauteur.\nTous les chiffres font deux\ninterlignes de hauteur.",
      },
    ],
    notes: [
      "Statut de correspondance : aligné.",
      "Correspondance thématique directe, avec décalage de pagination du cahier élève.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Guide 2018 p.24]\n24\n© MDI, 2018\nLes élèves ont souvent des difficultés pour souligner correctement à la règle. Le crayon doit être tenu\nbeaucoup plus verticalement que pour l’écriture. Bien souvent, les élèves pensent que le trait de\nsoulignement doit être sur la ligne de base de l’écriture, alors qu’il doit être sur l’interligne du dessous.\nIls hésitent aussi parfois à couper les lettres descendantes, ce qui leur fait perdre beaucoup de temps.\nCette double page leur permet de s’entrainer d’abord à souligner correctement, avant d’appliquer la\ntechnique ainsi acquise à un exercice de grammaire très simple. Le lien est ainsi fait avec le travail\nquotidien de la classe.\nLes deux doubles pages sur les chiffres donnent à l’élève l’occasion de s’entrainer à écrire les chiffres\ndans le bon sens. N’étant pas portés par le geste cursif, les chiffres sont bien souvent tracés à l’envers.\nSeul l’entrainement permet de mémoriser le bon sens du geste. En traçant le 5 en deux fois, on évite\nde démarrer un chiffre « à l’envers » (de droite à gauche) et on évite aussi les déformations faisant\nressemble le 5 à un S majuscule.\nSur les pages de droite, un entrainement est proposé, en lien avec le travail quotidien de la classe.\nD’abord, on propose l’écriture de la date, avec une attention toute particulière portée au tracé des\nchiffres. Il est à rappeler que les élèves de CP ne peuvent pas écrire la date seuls au début de l’année :\nles noms des mois de septembre, octobre, novembre et décembre comportent trop de difficultés, et en\nparticulier le br, pour pouvoir être abordés. L’exercice suivant est une copie d’opérations en ligne, dont\nles résultats sont donnés. Enfin la pose et le calcul d’opérations simples. Aucune opération ne comporte\nde retenue, pour que le travail soit réalisable quelle que soit l’avancée de la classe en mathématiques.\nL’élève doit se concentrer sur la présentation : espacement des opérations, un chiffre par carreau, tracé\ndu trait à la règle, positionnement correct des dizaines et des unités.\nL ʼutilisation de la règle Cahier d’écriture CP-CE1 → p. 42-43\nTiens ta règle avec ton autre main.\nTu dois voir lʼinterligne du dessous.\nTrace le trait en une seule fois sans\ndépasser.\nLes chiffres 1 2 3 4 5 6 7 8 9 0\nCahier d’écriture CP-CE1 → p. 44-47\nTous les chiffres font deux\ninterlignes de hauteur.\nTous les chiffres font deux\ninterlignes de hauteur.",
  },
  {
    id: "mdi-ecriture-transition-ecriture-chiffres",
    order: 20,
    group: "Consolidation",
    title: "L'écriture des chiffres",
    objective:
      "Les élèves ont souvent des difficultés pour souligner correctement à la règle. Le crayon doit être tenu beaucoup plus verticalement que pour l’écriture. Bien souvent, les élèves pensent que le trait de soulignement doit être sur la ligne de base de l’écriture, alors qu’il doit êt",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [40, 41],
    teacherPages: [24],
    legacyWorkbookPages: [44, 45, 46, 47],
    sourceStatus: "aligned",
    updateNeeded: false,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "Consolidation — L'écriture des chiffres — cahier élève p. 40 à 41.",
      },
      {
        title: "Guide pédagogique 2018",
        detail:
          "24\n© MDI, 2018\nLes élèves ont souvent des difficultés pour souligner correctement à la règle. Le crayon doit être tenu\nbeaucoup plus verticalement que pour l’écriture. Bien souvent, les élèves pensent que le trait de\nsoulignement doit être sur la ligne de base de l’écriture, alors qu’il doit être sur l’interligne du dessous.\nIls hésitent aussi parfois à couper les lettres descendantes, ce qui leur fait perdre beaucoup de temps.\nCette double page leur permet de s’entrainer d’abord à souligner correctement, avant d’appliquer la\ntechnique ainsi acquise à un exercice de grammaire très simple. Le lien est ainsi fait avec le travail\nquotidien de la classe.\nLes deux doubles pages sur les chiffres donnent à l’élève l’occasion de s’entrainer à écrire les chiffres\ndans le bon sens. N’étant pas portés par le geste cursif, les chiffres sont bien souvent tracés à l’envers.\nSeul l’entrainement permet de mémoriser le bon sens du geste. En traçant le 5 en deux fois, on évite\nde démarrer un chiffre « à l’envers » (de droite à gauche) et on évite aussi les déformations faisant\nressemble le 5 à un S majuscule.\nSur les pages de droite, un entrainement est proposé, en lien avec le travail quotidien de la classe.\nD’abord, on propose l’écriture de la date, avec une attention toute particulière portée au tracé des\nchiffres. Il est à rappeler que les élèves de CP ne peuvent pas écrire la date seuls au début de l’année :\nles noms des mois de septembre, octobre, novembre et décembre comportent trop de difficultés, et en\nparticulier le br, pour pouvoir être abordés. L’exercice suivant est une copie d’opérations en ligne, dont\nles résultats sont donnés. Enfin la pose et le calcul d’opérations simples. Aucune opération ne comporte\nde retenue, pour que le travail soit réalisable quelle que soit l’avancée de la classe en mathématiques.\nL’élève doit se concentrer sur la présentation : espacement des opérations, un chiffre par carreau, tracé\ndu trait à la règle, positionnement correct des dizaines et des unités.\nL ʼutilisation de la règle Cahier d’écriture CP-CE1 → p. 42-43\nTiens ta règle avec ton autre main.\nTu dois voir lʼinterligne du dessous.\nTrace le trait en une seule fois sans\ndépasser.\nLes chiffres 1 2 3 4 5 6 7 8 9 0\nCahier d’écriture CP-CE1 → p. 44-47\nTous les chiffres font deux\ninterlignes de hauteur.\nTous les chiffres font deux\ninterlignes de hauteur.",
      },
    ],
    notes: [
      "Statut de correspondance : aligné.",
      "Correspondance thématique directe, avec décalage de pagination du cahier élève.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Guide 2018 p.24]\n24\n© MDI, 2018\nLes élèves ont souvent des difficultés pour souligner correctement à la règle. Le crayon doit être tenu\nbeaucoup plus verticalement que pour l’écriture. Bien souvent, les élèves pensent que le trait de\nsoulignement doit être sur la ligne de base de l’écriture, alors qu’il doit être sur l’interligne du dessous.\nIls hésitent aussi parfois à couper les lettres descendantes, ce qui leur fait perdre beaucoup de temps.\nCette double page leur permet de s’entrainer d’abord à souligner correctement, avant d’appliquer la\ntechnique ainsi acquise à un exercice de grammaire très simple. Le lien est ainsi fait avec le travail\nquotidien de la classe.\nLes deux doubles pages sur les chiffres donnent à l’élève l’occasion de s’entrainer à écrire les chiffres\ndans le bon sens. N’étant pas portés par le geste cursif, les chiffres sont bien souvent tracés à l’envers.\nSeul l’entrainement permet de mémoriser le bon sens du geste. En traçant le 5 en deux fois, on évite\nde démarrer un chiffre « à l’envers » (de droite à gauche) et on évite aussi les déformations faisant\nressemble le 5 à un S majuscule.\nSur les pages de droite, un entrainement est proposé, en lien avec le travail quotidien de la classe.\nD’abord, on propose l’écriture de la date, avec une attention toute particulière portée au tracé des\nchiffres. Il est à rappeler que les élèves de CP ne peuvent pas écrire la date seuls au début de l’année :\nles noms des mois de septembre, octobre, novembre et décembre comportent trop de difficultés, et en\nparticulier le br, pour pouvoir être abordés. L’exercice suivant est une copie d’opérations en ligne, dont\nles résultats sont donnés. Enfin la pose et le calcul d’opérations simples. Aucune opération ne comporte\nde retenue, pour que le travail soit réalisable quelle que soit l’avancée de la classe en mathématiques.\nL’élève doit se concentrer sur la présentation : espacement des opérations, un chiffre par carreau, tracé\ndu trait à la règle, positionnement correct des dizaines et des unités.\nL ʼutilisation de la règle Cahier d’écriture CP-CE1 → p. 42-43\nTiens ta règle avec ton autre main.\nTu dois voir lʼinterligne du dessous.\nTrace le trait en une seule fois sans\ndépasser.\nLes chiffres 1 2 3 4 5 6 7 8 9 0\nCahier d’écriture CP-CE1 → p. 44-47\nTous les chiffres font deux\ninterlignes de hauteur.\nTous les chiffres font deux\ninterlignes de hauteur.",
  },
  {
    id: "mdi-ecriture-transition-copie-couleurs",
    order: 21,
    group: "Stratégies de copie",
    title: "Copie en couleurs",
    objective: "Copie en couleurs",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [42, 43],
    teacherPages: [],
    legacyWorkbookPages: [],
    sourceStatus: "summary_only",
    updateNeeded: true,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "Stratégies de copie — Copie en couleurs — cahier élève p. 42 à 43.",
      },
      {
        title: "Guide pédagogique 2025 [À VÉRIFIER]",
        detail:
          "[À VÉRIFIER] Le sommaire 2025/2026 confirme cette rubrique, mais le guide pédagogique détaillé n'est pas encore disponible dans les sources actuelles.",
      },
      {
        title: "Note de présentation 2025",
        detail:
          "Le programme 2025 met en avant la nécessité de travailler, dès le CP, la transcription script/cursive et les stratégies de copie, qui méritent d’être enseignées explicitement.\nOn trouve ainsi des exercices de transcription dans toutes les pages de révision des lettres, puis, en fin de cahier, des pages d’exercices sur les stratégies de copie (Copie en couleurs, Copie à distance).\nLe lien avec la compréhension n’est jamais négligé : les dictées muettes, les exercices Copie et dessine, puis la remise en ordre de phrases (Vers l’écriture courante) incitent les enfants à se concentrer sur le sens de ce qu’ils écrivent.",
      },
    ],
    notes: [
      "Statut de correspondance : sommaire uniquement.",
      "Visible dans le nouveau sommaire et dans la présentation 2025, mais non documenté dans le guide 2018 disponible.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Sommaire 2025/2026] Stratégies de copie — Copie en couleurs — pages élève 42-43\nLe programme 2025 met en avant la nécessité de travailler, dès le CP, la transcription script/cursive et les stratégies de copie, qui méritent d’être enseignées explicitement.\nOn trouve ainsi des exercices de transcription dans toutes les pages de révision des lettres, puis, en fin de cahier, des pages d’exercices sur les stratégies de copie (Copie en couleurs, Copie à distance).\nLe lien avec la compréhension n’est jamais négligé : les dictées muettes, les exercices Copie et dessine, puis la remise en ordre de phrases (Vers l’écriture courante) incitent les enfants à se concentrer sur le sens de ce qu’ils écrivent.\n[À VÉRIFIER] Le guide pédagogique 2025 complet n'est pas encore disponible dans les sources actuelles.",
  },
  {
    id: "mdi-ecriture-transition-copie-distance",
    order: 22,
    group: "Stratégies de copie",
    title: "Copie à distance",
    objective: "Copie à distance",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [44, 45],
    teacherPages: [],
    legacyWorkbookPages: [],
    sourceStatus: "summary_only",
    updateNeeded: true,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "Stratégies de copie — Copie à distance — cahier élève p. 44 à 45.",
      },
      {
        title: "Guide pédagogique 2025 [À VÉRIFIER]",
        detail:
          "[À VÉRIFIER] Le sommaire 2025/2026 confirme cette rubrique, mais le guide pédagogique détaillé n'est pas encore disponible dans les sources actuelles.",
      },
      {
        title: "Note de présentation 2025",
        detail:
          "Le programme 2025 met en avant la nécessité de travailler, dès le CP, la transcription script/cursive et les stratégies de copie, qui méritent d’être enseignées explicitement.\nOn trouve ainsi des exercices de transcription dans toutes les pages de révision des lettres, puis, en fin de cahier, des pages d’exercices sur les stratégies de copie (Copie en couleurs, Copie à distance).\nLe lien avec la compréhension n’est jamais négligé : les dictées muettes, les exercices Copie et dessine, puis la remise en ordre de phrases (Vers l’écriture courante) incitent les enfants à se concentrer sur le sens de ce qu’ils écrivent.",
      },
    ],
    notes: [
      "Statut de correspondance : sommaire uniquement.",
      "Visible dans le nouveau sommaire et dans la présentation 2025, mais non documenté dans le guide 2018 disponible.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Sommaire 2025/2026] Stratégies de copie — Copie à distance — pages élève 44-45\nLe programme 2025 met en avant la nécessité de travailler, dès le CP, la transcription script/cursive et les stratégies de copie, qui méritent d’être enseignées explicitement.\nOn trouve ainsi des exercices de transcription dans toutes les pages de révision des lettres, puis, en fin de cahier, des pages d’exercices sur les stratégies de copie (Copie en couleurs, Copie à distance).\nLe lien avec la compréhension n’est jamais négligé : les dictées muettes, les exercices Copie et dessine, puis la remise en ordre de phrases (Vers l’écriture courante) incitent les enfants à se concentrer sur le sens de ce qu’ils écrivent.\n[À VÉRIFIER] Le guide pédagogique 2025 complet n'est pas encore disponible dans les sources actuelles.",
  },
  {
    id: "mdi-ecriture-transition-vers-ecriture-courante",
    order: 23,
    group: "Stratégies de copie",
    title: "Vers l'écriture courante",
    objective:
      "Les ? et ! se tracent de haut en bas. Les : font un interligne. Les « » font un interligne aussi. ? !",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [46, 47],
    teacherPages: [23],
    legacyWorkbookPages: [38, 39, 40, 41],
    sourceStatus: "partial",
    updateNeeded: true,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "Stratégies de copie — Vers l'écriture courante — cahier élève p. 46 à 47.",
      },
      {
        title: "Guide pédagogique 2018",
        detail:
          "23\n© MDI, 2018\nLes ? et ! se tracent de haut en bas.\nLes : font un interligne.\nLes « » font un interligne aussi.\n? !\n:\n« »\nLes élèves ont souvent tendance à tracer des traits tout droits pour les virgules et à les réaliser de trop\ngrande taille. Ces deux doubles pages sont l’occasion de revenir sur les signes de ponctuation.\nLe point-virgule est devenu peu usité. Il n’est donc proposé que dans une phrase.\nLes points d’interrogation et d’exclamation donnent l’occasion de travailler la lecture à voix haute, avec\nl’intonation correspondante.\nLes deux points annoncent une explication à venir.\nIl faut insister auprès des élèves sur le rôle des guillemets ouvrants et fermants. Les guillemets ont deux\nusages : rapporter les propos de quelqu’un ou signaler une expression familière. C’est le deuxième\nusage qui est utilisé ici. On expliquera bien aux enfants que le mot « trognon », dans l’acception de\n« trop mignon », et le mot « gratte-gratte », pour désigner une plante, ne sont pas les termes exacts,\nmais des manières de parler.\nCes deux doubles pages proposent chacune la transcription écriture scripte/\nécriture cursive de trois phrases, qui sont mélangées pour que l’élève doive les lire\net les comprendre. Les majuscules sont identiques afin de ne pas donner un repère\ntrop simple à l’enfant.\nDans la deuxième double page, une fois les phrases remises en ordre, on obtient le\nrésumé très rapide d’un conte célèbre.\nLa ponctuation . , ;\nLe point est petit et posé sur la ligne.\nLa virgule descend comme un accent aigu.\nLe point-virgule commence au premier\ninterligne.\n,\n.\n;\n? ! : « »\nCahier d’écriture CP-CE1 → p. 34-38\nCahier d’écriture CP-CE1 → p. 38-41Vers lʼécriture courante\nRecopie chaque phrase sous le bon dessin.\nLis bien chaque\nphrase avant\nde la copier.",
      },
      {
        title: "Note de présentation 2025",
        detail:
          "Le programme 2025 met en avant la nécessité de travailler, dès le CP, la transcription script/cursive et les stratégies de copie, qui méritent d’être enseignées explicitement.\nOn trouve ainsi des exercices de transcription dans toutes les pages de révision des lettres, puis, en fin de cahier, des pages d’exercices sur les stratégies de copie (Copie en couleurs, Copie à distance).\nLe lien avec la compréhension n’est jamais négligé : les dictées muettes, les exercices Copie et dessine, puis la remise en ordre de phrases (Vers l’écriture courante) incitent les enfants à se concentrer sur le sens de ce qu’ils écrivent.",
      },
    ],
    notes: [
      "Statut de correspondance : partiel.",
      "Le guide 2018 documente déjà la remise en ordre de phrases et la transcription scripte/cursive, mais pas encore après les nouvelles stratégies de copie.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Guide 2018 p.23]\n23\n© MDI, 2018\nLes ? et ! se tracent de haut en bas.\nLes : font un interligne.\nLes « » font un interligne aussi.\n? !\n:\n« »\nLes élèves ont souvent tendance à tracer des traits tout droits pour les virgules et à les réaliser de trop\ngrande taille. Ces deux doubles pages sont l’occasion de revenir sur les signes de ponctuation.\nLe point-virgule est devenu peu usité. Il n’est donc proposé que dans une phrase.\nLes points d’interrogation et d’exclamation donnent l’occasion de travailler la lecture à voix haute, avec\nl’intonation correspondante.\nLes deux points annoncent une explication à venir.\nIl faut insister auprès des élèves sur le rôle des guillemets ouvrants et fermants. Les guillemets ont deux\nusages : rapporter les propos de quelqu’un ou signaler une expression familière. C’est le deuxième\nusage qui est utilisé ici. On expliquera bien aux enfants que le mot « trognon », dans l’acception de\n« trop mignon », et le mot « gratte-gratte », pour désigner une plante, ne sont pas les termes exacts,\nmais des manières de parler.\nCes deux doubles pages proposent chacune la transcription écriture scripte/\nécriture cursive de trois phrases, qui sont mélangées pour que l’élève doive les lire\net les comprendre. Les majuscules sont identiques afin de ne pas donner un repère\ntrop simple à l’enfant.\nDans la deuxième double page, une fois les phrases remises en ordre, on obtient le\nrésumé très rapide d’un conte célèbre.\nLa ponctuation . , ;\nLe point est petit et posé sur la ligne.\nLa virgule descend comme un accent aigu.\nLe point-virgule commence au premier\ninterligne.\n,\n.\n;\n? ! : « »\nCahier d’écriture CP-CE1 → p. 34-38\nCahier d’écriture CP-CE1 → p. 38-41Vers lʼécriture courante\nRecopie chaque phrase sous le bon dessin.\nLis bien chaque\nphrase avant\nde la copier.",
  },
  {
    id: "mdi-ecriture-transition-copie-poeme",
    order: 24,
    group: "Stratégies de copie",
    title: "Copie d'un poème",
    objective:
      "Pour terminer ce cahier, nous proposons la copie d’un poème. En effet, une fois l’écriture courante acquise, l’élève va être amené à copier lui-même ses poésies dans le cahier dédié. Le nom de l’auteur et les majuscules sont déjà écrites, ce qui donne la structure du poème. Il es",
    competence: "[À VÉRIFIER]",
    currentWorkbookPages: [48],
    teacherPages: [25],
    legacyWorkbookPages: [48],
    sourceStatus: "aligned",
    updateNeeded: false,
    phases: [
      {
        title: "Structure cible 2025/2026",
        detail: "Stratégies de copie — Copie d'un poème — cahier élève p. 48 à 48.",
      },
      {
        title: "Guide pédagogique 2018",
        detail:
          "25\n© MDI, 2018\nPour terminer ce cahier, nous proposons la copie d’un poème. En effet, une fois l’écriture courante\nacquise, l’élève va être amené à copier lui-même ses poésies dans le cahier dédié.\nLe nom de l’auteur et les majuscules sont déjà écrites, ce qui donne la structure du poème.\nIl est bien entendu recommandé de faire apprendre cette jolie poésie pour terminer le cahier sur\nune note de rêve !\nCahier d’écriture CP-CE1 → p. 48L 'écriture d'un poème",
      },
    ],
    notes: [
      "Statut de correspondance : aligné.",
      "Correspondance directe entre le nouveau sommaire et le guide 2018.",
      "Quand le guide 2025 complet sortira, cette fiche devra être révisée uniquement là où le statut n'est pas « aligné ».",
    ],
    coverageNote:
      "Structure cible issue du sommaire 2025/2026 fourni par capture. Contenu pédagogique détaillé issu du guide 2018 lorsqu'une correspondance est disponible.",
    sourceExcerpt:
      "[Guide 2018 p.25]\n25\n© MDI, 2018\nPour terminer ce cahier, nous proposons la copie d’un poème. En effet, une fois l’écriture courante\nacquise, l’élève va être amené à copier lui-même ses poésies dans le cahier dédié.\nLe nom de l’auteur et les majuscules sont déjà écrites, ce qui donne la structure du poème.\nIl est bien entendu recommandé de faire apprendre cette jolie poésie pour terminer le cahier sur\nune note de rêve !\nCahier d’écriture CP-CE1 → p. 48L 'écriture d'un poème",
  },
] as const satisfies readonly WritingGuidePrepSheet[];
