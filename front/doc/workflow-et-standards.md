# C2S workflow et standards

## Workflow

- On n'utilise plus la branche master

- Notre branche de production est la branche main qui est déployée sur l'environnement Cegedim.

- On merge **dev** dans **main** à la fin de chaque sprint afin de la deployer sur l'environnement Cegedim intégration.

- Une branche dev qui est notre branche de travail. On tire nos branches à partir de dev.

- Les branches sont nommées comme suit : **c2s-[numéro de l'US]**

- Lorsqu'une us est terminée on se rebase par rapport à dev et on crée un PR.

- Pas de merge sans la validation d'un collègue.

- Pas de validation tant que les commentaires de revue de code ne sont pas pris en compte ou discutés.

- "Idéalement, on montre son code aux collègues à chaque étape de dev".

- Dans les branches liées aux US on ne commit que les dev liés à cette US. Pas de correction de bugs ou d'anomalies ni de modifications qui sont en dehors du scope de l'us.

- Dans le cas où on veut corriger ou améliorer le code, on crée une branche bsr. Créer ticket pour la bsr et le lier à l'us d'origine. On suit le même workflow habituel.

- on utilise le conventionnal commit.

- Retour de revue : fix/refacto

- pour le front, chaque développeur recette son us pour le desktop, pour les écrans intermédiaires et pour le mobile.

- pour le front on recette nos us à minima sur Firefox et sur chrome

- mettre un commentaire dans le ticket

## Standards techniques

### Dependances et CI frontend

- Utiliser Node 24.22.3 en local, comme en CI et pour le build Docker. La version est definie dans `.nvmrc` a la racine du depot ; les trois jobs frontend la lisent via `node-version-file`.
- Avec nvm, executer `nvm install 24.22.3` puis `nvm use 24.22.3` avant de travailler sur le frontend.
- Avec Yarn 1, utiliser `yarn install --frozen-lockfile` dans `front` pour installer les versions verrouillees.
- Le parseur et le plugin `@typescript-eslint` restent fixes ensemble en `8.46.4`, compatibles avec TypeScript 5.6.3. Verifier aussi les moteurs Node des dependances transitives avant de les mettre a jour.

### CSS

- pas d'inline css : Eslint warn
- on ne modifie pas les classes css du dsfr. On les surchargent en créant de nouvelles classes
- on essyae d'utilise le standard BEM, comme le dsfr, pour nommer nos classes.
- on crée des fichiers css au niveau des components.
- les variables et les styles 'globaux' dans main.css

### Code

- on teste nos composants unitairement.
- si nos composant utilisent le store ou les context on les testent en utilisant le store ou le context
- on décompose nos components en petits components.
- on s'assure que nos composants sont testés au moins à 83%.
- on crée des fixtures, si besoin, pour tester nos composants.
- on utilise react hook form et yup pour la validation des formulaires.
- à terme, on souhaite remplacer axios par fetch.
- on souhaite remplacer redux par les context et recoil.
- les interfaces métiers sont regroupées dans le répertoire domain.
- éviter de mettre le wording dans les composants
