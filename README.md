# C2S

## Développement en local

### Pre-commit

Pour éviter de pousser du code avec des erreurs ou des secrets, nous utilisons
un pre-commit hook git.

Pour l'installer, il faut lancer `yarn` à la racine du projet. 

Attention : si le precommit hook ne se lance pas quand vous committez (i.e. qu'aucun message ne s'affiche après un `git commit`),
il faut lancer à la racine du dépôt `rm -rf .git/hooks` puis `yarn`.

Plusieurs vérifications sont effectuées :
- gitleaks : détection de la présence de secrets dans le code
- front : linter et vérification du formattage si du code a été modifié dans le dossier front/ uniquement

Pour ignorer un secret non sensible (par ex un mot de passe bateau utilisé pour le dev), il faut lancer : 

```
yarn gitleaks:update-ignored-secrets
```

Attention : cette commande va ignorer tous les nouveaux secrets détectés. Avant de la lancer, il faut vérifier
que tous les nouveaux secrets sont bien à ignorer.

Pour lancer la détection de secrets sans commiter, il faut lancer : 

```
yarn gitleaks:detect-secrets
```

### Lancer l'environnement de dev

Le lancement de toute la stack (postgres, keycloak, front, backend, maildev) se fait via :

```
docker-compose up -d
```

Plus de détails dans [la doc dédiée](./docker/README.md)