# C2S

## Développement en local

### Pre-commit

Pour éviter de pousser du code avec des erreurs ou des secrets, nous utilisons
un pre-commit hook git.

Pour l'installer, il faut lancer `yarn` à la racine du projet.

Plusieurs vérifications sont effectuées :
- gitleaks : détection de la présence de secrets dans le code
- front : lancer du linter et de la vérification du formattage

Pour ignorer un secret non sensible (par ex un mot de passe bateau utilisé pour le dev), il faut lancer : 

```
./.husky/gitleaks-update-ignored-secrets.sh
```

Attention : cette commande va ignorer tous les nouveaux secrets détectés. Avant de la lancer, il faut vérifier
que tous les nouveaux secrets sont bien à ignorer.

### Lancer l'environnement de dev

Le lancement de toute la stack (postgres, keycloak, front, backend, maildev) se fait via :

```
docker-compose up -d
```

Plus de détails dans [la doc dédiée](./docker/README.md)