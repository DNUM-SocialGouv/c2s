# Stratégie de test

- on teste nos composants unitairement.
- si nos composant utilisent le store ou les context on les testent en utilisant le store ou le context
- on décompose nos components en petits components.
- on s'assure que nos composants sont testés au moins à 75%.
- on crée des fixtures, si besoin, pour tester nos composants.
- on utilise react hook form et yup pour la validation des formulaires.
- à terme, on souhaite remplacer axios par fetch

## Existant

- **Back** : couvrir les problèmes détectés + tester keycloak
- **Back** : consommer les endpoint publiques. Routes utilisées par Drupal.

## Nouveau code

- **Back** : couvrir les fonctionnalités critiques.
- **Back**: routes principales les routes de chaque onglet
- **Front** :
  - Les props
  - L'affichage conditionnel
  - Les contextes
  - Le store
  - Interactions utilisateur
  - Un test d'a11y par composant.
