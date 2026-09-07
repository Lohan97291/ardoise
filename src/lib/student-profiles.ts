import { createLocalStore } from "@/lib/local-store";

export type SubjectOverviewKey =
  | "francais"
  | "maths"
  | "qlm"
  | "emc"
  | "arts"
  | "eps"
  | "lve";

export type SubjectSnapshot = {
  score?: number;
  note?: string;
};

export type StudentProfile = {
  birthDate?: string;
  notes?: string;
  subjectSnapshots?: Partial<Record<SubjectOverviewKey, SubjectSnapshot>>;
};

const DEFAULT_STUDENT_PROFILES: Record<string, StudentProfile> = {
  "el-1": {
    birthDate: "2019-03-06",
    notes:
      "Évaluations diagnostiques Orthographémic - septembre 2026\nSyllabes niveau 1 : 30/36, avec hésitations. Niveau 2 non renseigné. Résultats écrits à interpréter avec prudence, car certaines réponses semblent avoir été copiées ou aidées. Difficultés observées en compréhension et en encodage.\nFluence : page 6, 21 mots/min avec 7 erreurs ; page 7, 25 mots/min avec 5 erreurs. Confusions et inversions relevées : jaune lu « june », livre lu « ilfre » ; jamais lu correctement.\nAnalyse : élève volontaire, envie de bien faire, mais lecture très coûteuse et peu précise. Priorité forte : sécuriser le décodage, la précision et l'encodage avant de viser la vitesse. Départ possible dans les 15 prochains jours : prévoir une trace claire à transmettre.",
  },
  "el-2": {
    birthDate: "2019-03-22",
    notes:
      "Évaluations diagnostiques Orthographémic - septembre 2026\nSyllabes niveau 1 : 34/36. Syllabes niveau 2 : 29/36. Lecture globalement installée.\nEncodage : lavabo et lapin corrects ; erreur sur pirate ; dettes pour bêtes, buberon pour biberon, can fiture pour confiture ; dindon correct.\nFluence : page 6, 50 mots/min avec 1 erreur ; page 7, environ 70 mots/min avec 2 erreurs.\nAnalyse : base de lecture satisfaisante, besoin principal en encodage et précision des sons dans le mot. Suite : Tap tap, verbalisation avant écriture, relecture du mot produit, reprise légère des confusions b/d et des voyelles en syllabes.",
  },
  "el-3": {
    birthDate: "2019-06-30",
    notes:
      "Évaluations diagnostiques Orthographémic - septembre 2026\nProfil : peut être excité, a parfois du mal à se canaliser et se lève en classe, mais se montre pertinent, réfléchi, avec du vocabulaire.\nSyllabes niveau 1 : 34/36. Syllabes niveau 2 : 28/36, 8 erreurs. Exercice 2 souvent non compris. Page 2 exercice 1 réussi ; encodage fragile pour lavabo/lapin. Page 3 exercice 1 réussi, exercice 2 non compris, exercice 3 non fait. Page 4 exercice 1 réussi, exercice 2 non fait, cheval écrit « FEVALE ». Page 5 non faite.\nFluence : page 6, 47 mots/min avec 3 erreurs ; page 7 à confirmer, 57 mots/min avec 5 erreurs.\nAnalyse : bonnes capacités langagières et de raisonnement, fragilité sur les graphèmes complexes et la précision en lecture de texte. Besoin de ralentir, justifier et relire.",
  },
  "el-4": {
    birthDate: "2019-07-11",
    notes:
      "Évaluations diagnostiques Orthographémic - septembre 2026\nSyllabes niveau 1 : 35/36. Syllabes niveau 2 : 34/36, 2 erreurs. Exercices 1 et 3 réussis sur les pages observées ; exercice 2 non compris à plusieurs reprises.\nFluence : page 6, 36 mots/min avec 1 erreur ; page 7, 44 mots/min avec 0 erreur.\nAnalyse : décodage de syllabes très correct, mais lecture de texte lente. Le point prioritaire semble être l'automatisation et la compréhension de consignes plutôt qu'un problème massif de code. Suite : lectures courtes répétées, reformulation de consigne, reprise de l'exercice 2 en atelier dirigé.",
  },
  "el-5": {
    birthDate: "2018-09-26",
    notes:
      "Suivi adapté - septembre 2026\nDossier MDPH très lourd. Troubles du spectre autistique indiqués. N’entre pas actuellement dans les apprentissages scolaires ordinaires. À retirer des corrections et évaluations collectives dans Ardoise afin de ne pas fausser les bilans de classe. Prévoir un suivi individualisé, avec objectifs fonctionnels et éducatifs adaptés, hors notation de classe.",
  },
  "el-6": {
    birthDate: "2019-07-22",
    notes:
      "Évaluations diagnostiques Orthographémic - septembre 2026\nProfil : élève sensible, bavarde mais réservée dans l'évaluation. Motricité fine et écriture à surveiller : écriture difficile à déchiffrer, peu structurée, certaines lettres ambiguës ou inversées.\nSyllabes niveau 1 : 25/36. Syllabes niveau 2 : 25/36. Page 2 exercices 1 et 2 réussis ; exercice 3 difficile à interpréter à cause de l'écriture. Page 3 : erreur doigt/bois, phrase « Je me brosse les bancs », encodage avec sons ou lettres manquants. Page 4 exercices 1 et 2 réussis, encodage partiellement lisible. Page 5 exercices 1, 2 et 3 globalement réussis.\nFluence : page 6, 22 mots/min, 0 erreur mais nombreuses incertitudes ; page 7, 39 mots/min avec 1 erreur, confusion il/ils.\nAnalyse : profil fragile en automatisation du code et en fluence, avec difficulté graphique qui peut masquer les compétences d'encodage. Suite : lettres mobiles avant écrit manuscrit, réponses orales/étiquettes pour distinguer code et geste graphique.",
  },
  "el-8": {
    birthDate: "2019-01-23",
    notes:
      "Évaluations diagnostiques Orthographémic - septembre 2026\nÉvaluations pages 2 à 5 : tout réussi. Encodage très bon, tout réussi.\nFluence : page 6, environ 70 mots/min, 0 erreur ; page 7, environ 93 mots/min avec 1 erreur.\nAnalyse : profil très solide, lecture précise et rapide, encodage fiable. Suite : parcours ordinaire enrichi, justification graphémique, tri par graphèmes et tâches d'encodage plus exigeantes.",
  },
  "el-7": {
    birthDate: "2019-08-05",
    notes:
      "Évaluations diagnostiques Orthographémic - septembre 2026\nContexte : élève accompagnée par AESH/AVSH pendant les évaluations ; comportement très adapté.\nSyllabes niveau 1 : 29/36. Syllabes niveau 2 : 30/36. Page 2 : confusion balai/palai, exercice 2 non fait, exercice 3 très bien encodé. Page 3 : exercice 1 réussi, exercices 2 et 3 non faits. Page 4 : exercices 1 et 2 réussis, exercice 3 très bien encodé. Page 5 : exercices 1 et 2 réussis ; confiture écrit « KONFITURE », phonologiquement cohérent.\nFluence : page 6, 39 mots/min ; page 7, 63 mots/min avec 2 erreurs.\nAnalyse : décodage à consolider, mais encodage solide et cohérent. Besoin d'étayage pour aller au bout des tâches longues. Suite : précision b/p et c/qu/k, Tap tap avec verbalisation, fluence courte et régulière.",
  },
  "el-9": {
    birthDate: "2019-01-04",
    notes:
      "Évaluations diagnostiques Orthographémic - septembre 2026\nSyllabes niveau 1 : 36/36. Syllabes niveau 2 : 36/36, 0 erreur.\nFluence : page 6, 61 mots/min, 0 erreur ; page 7, environ 111 mots/min, 0 erreur.\nAnalyse : profil très solide, décodage automatisé et lecture précise. Suite : parcours ordinaire enrichi, justification des graphèmes, tri complexe, encodage sans aide et production de phrases avec les mots étudiés.",
  },
  "el-10": {
    birthDate: "2019-11-09",
    notes:
      "Évaluations diagnostiques Orthographémic - septembre 2026\nAttention / engagement : difficulté majeure à rester dans l'activité plus que quelques secondes ; besoin quasi constant d'un adulte pour revenir à la tâche ; travaux rarement terminés. Équipe éducative déjà faite, bilans prévus ou à relancer.\nSyllabes niveau 1 : 30/36 avec beaucoup d'hésitations. Niveau 2 non fait. Pages 2 à 5 : seulement les exercices 1. Page 2 exercice 1 réussi. Page 3 exercice 1 globalement réussi, mais confusions bois/doigt et bo/dos. Pages 4 et 5 non faites. Fluence pages 6 et 7 non faites.\nAnalyse : capacités probables, mais l'accès à la tâche empêche de savoir si les difficultés viennent du code, de la compréhension ou de l'attention. Suite : passation fractionnée, micro-tâches de 3 à 5 minutes, 4 à 6 étiquettes maximum, une consigne à la fois, support visuel je regarde / je choisis / je pose / je vérifie.",
  },
  "el-11": {
    birthDate: "2018-08-16",
    notes:
      "Évaluations diagnostiques Orthographémic - septembre 2026\nSyllabes niveau 1 : 18/36. Syllabes niveau 2 : 31/36, mais décodage très coûteux, lent et fragile. Confusions relevées : P lu « pi », B lu D, douet/bouet, doit/bois, râteau/rado.\nPages 2 à 5 : exercice 1 globalement réussi ; exercices 2 et 3 non faits pour plusieurs pages ; page 6 et page 7 non faites. Lenteur importante ; encodage probablement fragile dès que l'élève doit produire le mot.\nAnalyse : priorité décodage. Besoin de consolider les correspondances graphème-phonème simples et les consonnes proches avant d'augmenter la charge. Suite : petit groupe quotidien court, syllabes simples p/b/d/t, Tapette à mots avec 6 étiquettes, Images et mots, Tap tap avec aide des lettres.",
  },
  "durand-1": { birthDate: "2019-09-22" },
  "durand-2": { birthDate: "2019-06-06" },
  "durand-3": { birthDate: "2019-04-22" },
  "durand-4": { birthDate: "2019-06-03" },
  "durand-5": { birthDate: "2019-09-24" },
  "durand-6": { birthDate: "2019-10-03" },
  "durand-7": { birthDate: "2019-12-10" },
  "durand-8": { birthDate: "2019-10-15" },
  "durand-9": { birthDate: "2019-07-16" },
  "durand-10": { birthDate: "2019-10-01" },
  "grimal-1": { birthDate: "2019-07-15" },
  "grimal-2": { birthDate: "2019-09-11" },
  "grimal-3": { birthDate: "2019-11-12" },
  "grimal-4": { birthDate: "2019-12-24" },
  "grimal-5": { birthDate: "2019-07-30" },
  "grimal-6": { birthDate: "2019-04-06" },
  "grimal-7": { birthDate: "2019-11-23" },
  "grimal-8": { birthDate: "2018-09-09" },
  "grimal-9": { birthDate: "2018-08-16" },
  "grimal-10": { birthDate: "2019-02-16" },
  "grimal-11": { birthDate: "2019-04-09" },
  "menager-1": { birthDate: "2019-12-15" },
  "menager-2": { birthDate: "2019-06-04" },
  "menager-3": { birthDate: "2019-01-17" },
  "menager-4": { birthDate: "2019-12-16" },
  "menager-5": { birthDate: "2018-07-23" },
  "menager-6": { birthDate: "2019-11-01" },
  "menager-7": { birthDate: "2019-07-13" },
  "menager-8": { birthDate: "2019-10-26" },
  "menager-9": { birthDate: "2019-09-16" },
  "menager-10": { birthDate: "2019-08-29" },
  "menager-11": { birthDate: "2018-03-31" },
  "thomas-1": { birthDate: "2019-09-22" },
  "thomas-2": { birthDate: "2019-10-20" },
  "thomas-3": { birthDate: "2019-12-02" },
  "thomas-4": { birthDate: "2019-09-01" },
  "thomas-5": { birthDate: "2019-05-23" },
  "thomas-6": { birthDate: "2018-06-19" },
  "thomas-7": { birthDate: "2019-03-10" },
  "thomas-8": { birthDate: "2019-09-10" },
  "thomas-9": { birthDate: "2019-02-05" },
  "thomas-10": { birthDate: "2019-01-01" },
  "henry-1": { birthDate: "2019-11-05" },
  "henry-2": { birthDate: "2019-07-31" },
  "henry-3": { birthDate: "2019-12-18" },
  "henry-4": { birthDate: "2019-08-13" },
  "henry-5": { birthDate: "2019-11-12" },
  "henry-6": { birthDate: "2019-11-22" },
  "henry-7": { birthDate: "2019-04-22" },
  "henry-8": { birthDate: "2019-11-01" },
  "henry-9": { birthDate: "2019-11-18" },
  "henry-10": { birthDate: "2019-08-20" },
  "henry-11": { birthDate: "2019-07-05" },
};

const studentProfilesStore = createLocalStore<Record<string, StudentProfile>>(
  "ardoise.studentProfiles.v1",
  {},
);

export function getStudentProfiles(): Record<string, StudentProfile> {
  return studentProfilesStore.get();
}

export function getStudentProfile(studentId: string): StudentProfile {
  return {
    ...(DEFAULT_STUDENT_PROFILES[studentId] ?? {}),
    ...(getStudentProfiles()[studentId] ?? {}),
  };
}

export function saveStudentProfile(studentId: string, patch: StudentProfile): StudentProfile {
  const next = studentProfilesStore.update((current) => ({
    ...current,
    [studentId]: {
      ...(current[studentId] ?? {}),
      ...patch,
    },
  }));

  return next[studentId] ?? {};
}
