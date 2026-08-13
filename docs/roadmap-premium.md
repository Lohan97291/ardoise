# Feuille de Route Premium Ardoise

Cette feuille de route sert de base pour les prochaines passes de design, d'ergonomie et de simplification.

## 1. Priorité produit

Le principe directeur reste simple :

- voir l'essentiel plus vite ;
- préparer une journée sans friction ;
- corriger sans se perdre ;
- retrouver immédiatement les bonnes ressources ;
- suivre les élèves avec une lecture claire.

## 2. Chantiers prioritaires

### A. Centre de pilotage + cahier journal

Objectif :
faire du cahier journal du jour le vrai coeur de l'application.

À renforcer :

- mettre davantage en avant la journée du jour ;
- afficher plus clairement les urgences, préparations et priorités ;
- alléger la page pour que la lecture soit immédiate ;
- mieux relier matériel, préparation, ressource associée et correction.

### B. Correction rapide

Objectif :
obtenir un parcours très simple, presque automatique.

Cible :

1. choisir le cahier ;
2. ouvrir un sommaire simple ;
3. aller à la page ;
4. corriger exercice par exercice ;
5. envoyer les résultats dans le bon carnet.

À viser :

- moins de boutons parasites ;
- navigation par étapes ;
- raccourcis clavier solides ;
- vrai mode page à page ;
- vrai mode élève à élève ;
- lecture plus proche de Suivi CE1D.

### C. Ressources

Objectif :
retrouver la logique "support -> sommaire -> séance -> fiche de prep".

À renforcer :

- vue d'entrée plus claire ;
- hiérarchie visuelle plus nette ;
- distinction claire entre programmation et fiche de prep ;
- meilleure lisibilité des déroulés chronologiques ;
- continuité visuelle entre les différentes méthodes.

### D. Emploi du temps

Objectif :
garder une manipulation libre mais très simple.

À renforcer :

- choix de l'emploi du temps sur lequel on travaille ;
- presets / variantes enregistrables ;
- échange direct de deux blocs ;
- création directe d'un bloc depuis la grille ;
- dialogue plus léger pour l'IA ;
- moins de texte explicatif, plus d'action.

### E. Élèves

Objectif :
faire de chaque profil élève un mini tableau de bord.

À renforcer :

- liste d'élèves plus claire ;
- fiche élève complète ;
- vision générale tous domaines ;
- radar général + radar par domaine ;
- comparaison avec la classe activable ;
- statistiques d'appel et de présence mieux exploitées.

### F. Agenda + messagerie

Objectif :
relier les événements, les mails et les tâches utiles.

À renforcer :

- ajout rapide d'événement ;
- création de rendez-vous depuis les mails ;
- lecture des mails plus propre après passage n8n ;
- alertes visibles en cas de changement important.

## 3. Priorité design

Le niveau visuel recherché :

- plus premium ;
- plus lisible ;
- plus apaisé ;
- plus cohérent d'une page à l'autre.

À conserver :

- identité Ardoise ;
- côté chaleureux et enseignant ;
- sensation d'outil solide plutôt que gadget.

À améliorer :

- tailles des boutons IA ;
- compacité du menu latéral ;
- hiérarchies typographiques ;
- cartes et panneaux secondaires ;
- cohérence entre pages principales et pages secondaires.

## 4. Priorité architecture

Le projet fonctionne, mais certaines couches doivent être simplifiées progressivement.

Quick wins :

- mutualiser davantage le stockage local ;
- harmoniser les types de données partagés ;
- éviter la duplication de logique entre modules voisins ;
- mieux séparer UI, données et logique métier.

Chantiers plus lourds :

- découper les très gros écrans ;
- unifier davantage les contrats de contenu pédagogique ;
- limiter la multiplication des variantes de stockage ;
- rendre les ponts entre modules plus explicites.

## 5. Ordre conseillé pour la suite

1. Centre de pilotage + cahier journal
2. Correction rapide
3. Ressources
4. Emploi du temps
5. Élèves
6. Agenda / messagerie
7. Refactorisation interne progressive

## 6. Règle de décision pour les prochaines itérations

Avant d'ajouter une nouveauté, on doit vérifier :

- est-ce que cela fait gagner du temps réel en classe ?
- est-ce que la lecture devient plus simple ?
- est-ce que la navigation devient plus directe ?
- est-ce que le lien avec les autres modules est meilleur ?
- est-ce qu'on évite une nouvelle couche inutile ?
