# Remplacer NPM par YARN

## Pourquoi

Un choix d'équipe.  
Afin d'être compatible avec les prochaines versions du DSFR

## Passer de NPM à YARN

Lors du passage de NPM à YARN on a rencontré 3 problèmes :

1- Keycloack-js : il faut l'ajouter aux dépendances

`yarn add keycloack-js
`

2- Les tests : occassionne une erreur Jest. Pour la résoudre il faut utiliser une vérsion antérieur de string-width
Dans le cas ou vous avez cette erreur il faut :

- Supprimer le dossier node_modules et le fichier yarn.lock
- lancer la commande  
  `yarn cache clean` puis `yarn`

3- Eslint : afin de supprimer le warning Eslint il faut ajouter au fichier tsconfig.json

```json
"esModuleInterop": true,
```
