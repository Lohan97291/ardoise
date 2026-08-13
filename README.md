# Ardoise

Ardoise est une application pensée pour le pilotage quotidien d'une classe de CE1.

L'objectif est de réunir dans un même outil :

- le centre de pilotage de la journée ;
- le cahier journal ;
- l'emploi du temps ;
- les ressources et fiches de prep ;
- la correction rapide des cahiers ;
- le suivi des élèves ;
- l'agenda et la messagerie ;
- un assistant IA pédagogique intégré.

Le projet avance avec une logique très terrain : gagner du temps en classe, mieux suivre les élèves et relier les outils entre eux sans multiplier les manipulations.

## Modules principaux

### Pilotage quotidien

- `Centre de pilotage` pour voir l'essentiel de la journée.
- `Cahier journal` pour préparer, suivre et ajuster les séances.
- `Agenda / messagerie` pour centraliser les événements, mails et rappels.

### Pédagogie

- `Ressources` pour naviguer dans les méthodes, sommaires et fiches de prep.
- `Correction rapide` pour corriger par cahier, page et exercice.
- `Carnet de notes` pour distinguer contrôle continu et évaluations.
- `Élèves` pour accéder aux profils, résultats et visualisations.

### Organisation de classe

- `Emploi du temps` avec manipulation directe des blocs.
- `Programmation` et `programmation annuelle`.
- `Groupes de besoin`, `fluence`, `ateliers de reprise`, `bilan de séance`.

## Stack du projet

- TanStack Start
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui + Radix UI
- Recharts

## Lancer Ardoise en local

```bash
git clone https://github.com/Lohan97291/ardoise.git
cd ardoise
npm install
npm run dev
```

Pour générer une version de production :

```bash
npm run build
```

## Variables d'environnement

Certaines fonctions IA ont besoin d'une clé API OpenAI.

1. Duplique `.env.example` en `.env.local`
2. Renseigne `OPENAI_API_KEY`
3. Ajuste `OPENAI_MODEL` si besoin
4. Relance l'application

## Structure du projet

```text
src/
  components/ardoise/   composants métier de l'application
  components/ui/        briques d'interface partagées
  hooks/                hooks réutilisables
  lib/                  données, stockage local, ponts pédagogiques, logique métier
  routes/               pages et routes API
public/
  assets/               logos, icônes, identité visuelle
  cahier/               aperçus et corrigés des cahiers
docs/
  roadmap-premium.md    priorités produit et ergonomiques
```

## Ce qui fait la spécificité d'Ardoise

- les méthodes de classe sont reliées aux séances et aux corrections ;
- le cahier journal peut servir de point d'entrée principal ;
- les résultats des exercices alimentent le suivi des élèves ;
- l'IA doit s'appuyer sur le contexte réel de la classe et des ressources déjà faites.

## Priorités actuelles

Les prochains chantiers sont regroupés ici :

- [Feuille de route premium](./docs/roadmap-premium.md)

## État du projet

Le socle est en place et les grands modules existent déjà. La priorité actuelle est de :

- clarifier certaines navigations ;
- rendre l'expérience plus premium visuellement ;
- mieux relier les modules entre eux ;
- simplifier progressivement la structure interne.
