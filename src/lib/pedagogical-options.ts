import type { SubjectKey } from "@/lib/ardoise-data";

export type PedagogicalDomainOption = {
  label: string;
  subDomains: string[];
  objectives: string[];
};

export const PEDAGOGICAL_OPTIONS: Record<SubjectKey, PedagogicalDomainOption[]> = {
  francais: [
    {
      label: "Lecture",
      subDomains: ["Compréhension", "Fluence", "Décodage", "Lecture à voix haute", "Littérature"],
      objectives: [
        "Comprendre un texte lu de manière autonome ou accompagné.",
        "Lire avec plus de fluidité et de précision.",
        "Repérer les informations importantes d'un texte.",
      ],
    },
    {
      label: "Écriture",
      subDomains: ["Copie", "Production d'écrits", "Encodage", "Geste graphique"],
      objectives: [
        "Produire un écrit court en respectant une consigne.",
        "Copier avec soin et régularité.",
        "Encoder des mots ou une phrase en mobilisant les correspondances étudiées.",
      ],
    },
    {
      label: "Oral",
      subDomains: ["Prendre la parole", "Écoute", "Restitution", "Mise en voix"],
      objectives: [
        "Prendre la parole pour raconter, expliquer ou justifier.",
        "Écouter et reformuler ce qui a été compris.",
        "Lire ou dire un texte pour être entendu et compris.",
      ],
    },
    {
      label: "Vocabulaire",
      subDomains: ["Lexique en contexte", "Synonymes", "Antonymes", "Familles de mots"],
      objectives: [
        "Comprendre et utiliser un mot nouveau en contexte.",
        "Mobiliser des mots de sens proche ou contraire.",
        "Observer les liens entre les mots d'une même famille.",
      ],
    },
    {
      label: "Grammaire et orthographe",
      subDomains: ["Phrase", "Nature des mots", "Accords", "Conjugaison", "Orthographe lexicale"],
      objectives: [
        "Identifier et manipuler une phrase correcte.",
        "Appliquer un accord simple dans le groupe nominal ou avec le verbe.",
        "Mémoriser l'orthographe de mots fréquents.",
      ],
    },
  ],
  maths: [
    {
      label: "Nombres et calcul",
      subDomains: ["Numération", "Calcul mental", "Calcul posé", "Comparaison de nombres"],
      objectives: [
        "Lire, écrire et représenter des nombres.",
        "Automatiser des procédures de calcul mental.",
        "Mettre en œuvre une technique de calcul posé.",
      ],
    },
    {
      label: "Résolution de problèmes",
      subDomains: ["Problèmes additifs", "Problèmes multiplicatifs", "Recherche de stratégie"],
      objectives: [
        "Chercher une stratégie pour résoudre un problème.",
        "Identifier les données utiles d'un énoncé.",
        "Expliquer la démarche utilisée à l'oral ou à l'écrit.",
      ],
    },
    {
      label: "Grandeurs et mesures",
      subDomains: ["Longueurs", "Masses", "Temps", "Monnaie"],
      objectives: [
        "Comparer, estimer et mesurer une grandeur.",
        "Utiliser une unité adaptée à la situation.",
        "Résoudre de petits problèmes de mesure.",
      ],
    },
    {
      label: "Espace et géométrie",
      subDomains: ["Repérage", "Figures", "Solides", "Symétrie"],
      objectives: [
        "Décrire ou reproduire une figure simple.",
        "Se repérer et coder un déplacement.",
        "Reconnaître des figures ou solides usuels.",
      ],
    },
  ],
  qlm: [
    {
      label: "Questionner le temps",
      subDomains: ["Se repérer dans le temps", "Frise chronologique", "Passé / présent"],
      objectives: [
        "Situer des événements les uns par rapport aux autres.",
        "Utiliser les repères du temps proche.",
        "Construire une première chronologie simple.",
      ],
    },
    {
      label: "Questionner l'espace",
      subDomains: ["Se repérer", "Lire un plan", "Paysages", "Espaces proches"],
      objectives: [
        "Se repérer dans l'école, le quartier ou un plan simple.",
        "Décrire un espace proche avec un vocabulaire adapté.",
        "Comparer différents types d'espaces.",
      ],
    },
    {
      label: "Monde du vivant",
      subDomains: ["Animaux", "Végétaux", "Corps humain", "Besoins du vivant"],
      objectives: [
        "Identifier quelques caractéristiques du vivant.",
        "Observer et décrire des êtres vivants.",
        "Comprendre les besoins essentiels du vivant.",
      ],
    },
    {
      label: "Matière, objets, numérique",
      subDomains: ["États de la matière", "Objets techniques", "Usages du numérique"],
      objectives: [
        "Observer une transformation de la matière.",
        "Identifier la fonction d'un objet technique.",
        "Découvrir un usage raisonné d'un outil numérique.",
      ],
    },
  ],
  emc: [
    {
      label: "Respect d'autrui",
      subDomains: ["Écoute", "Différences", "Égalité filles-garçons"],
      objectives: [
        "Exprimer le respect et l'écoute dans les échanges.",
        "Comprendre que chacun a la même dignité.",
        "Questionner les stéréotypes et les discriminations.",
      ],
    },
    {
      label: "Vie de classe",
      subDomains: ["Règles", "Coopération", "Responsabilités"],
      objectives: [
        "Comprendre et faire vivre les règles communes.",
        "Coopérer dans une tâche collective.",
        "Assumer une responsabilité dans la classe.",
      ],
    },
  ],
  eps: [
    {
      label: "Agir et s'exprimer avec son corps",
      subDomains: ["Courir", "Sauter", "Lancer", "Parcours"],
      objectives: [
        "Améliorer sa performance dans une action motrice simple.",
        "S'engager dans l'activité avec sécurité.",
        "Observer et ajuster sa manière de faire.",
      ],
    },
    {
      label: "Jeux collectifs",
      subDomains: ["Coopérer", "S'opposer", "Relais"],
      objectives: [
        "Comprendre une règle de jeu collectif.",
        "Coopérer avec des partenaires pour réussir.",
        "Prendre des repères dans l'espace de jeu.",
      ],
    },
  ],
  arts: [
    {
      label: "Arts plastiques",
      subDomains: ["Dessiner", "Assembler", "Couleur", "Matière"],
      objectives: [
        "Expérimenter des outils et des gestes plastiques.",
        "Produire une réalisation en faisant des choix.",
        "Mettre en mots ce que l'on a voulu faire.",
      ],
    },
    {
      label: "Histoire des arts",
      subDomains: ["Observer une œuvre", "Comparer", "Exprimer son ressenti"],
      objectives: [
        "Observer une œuvre avec attention.",
        "Exprimer un ressenti ou une préférence.",
        "Faire un lien simple entre œuvres ou techniques.",
      ],
    },
  ],
  lve: [
    {
      label: "Langue vivante",
      subDomains: ["Compréhension orale", "Prise de parole", "Lexique", "Rituels langagiers"],
      objectives: [
        "Comprendre des consignes ou expressions très courantes.",
        "Réutiliser un lexique simple dans une situation connue.",
        "Participer à un rituel oral en langue vivante.",
      ],
    },
  ],
  rituels: [
    {
      label: "Rituels de classe",
      subDomains: ["Date", "Météo", "Calcul flash", "Copie", "Lecture offerte"],
      objectives: [
        "Installer un repère quotidien sécurisant.",
        "Réactiver des acquis de manière courte et régulière.",
        "Mettre les élèves rapidement en activité.",
      ],
    },
  ],
  pause: [],
};

export function getPedagogicalOptions(subjectKey: SubjectKey | ""): PedagogicalDomainOption[] {
  return subjectKey ? (PEDAGOGICAL_OPTIONS[subjectKey] ?? []) : [];
}
