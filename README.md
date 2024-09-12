# C2S - Espace connecté

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Build](https://github.com//DNUM-SocialGouv/c2s-front/actions/workflows/c2s-github-ci.yml/badge.svg)

## Installation :construction_worker:

Cloner le répetoire :

```bash
git clone git@github.com:DNUM-SocialGouv/c2s-front.git
```

Installer les dépendances :

```bash
yarn
```

Démarrer le projet en local :

```bash
yarn start
```

Le serveur de dev démarre à cette url : [http://localhost:5173/mon-espace](http://localhost:5173/mon-espace)

L'espace Organismes complémentaires : [http://localhost:5173/mon-espace/oc](http://localhost:5173/mon-espace/oc)

L'espace modérateur : [http://localhost:5173/mon-espace/admin/membres](http://localhost:5173/mon-espace/admin/membres)

## Les environnements

- [Intégration](https://c2s-integration.cegedim.cloud/)
- [Pré-prod](https://c2s-preprod.cegedim.cloud)
- [Production](https://www.complementaire-sante-solidaire.gouv.fr/)

## Scripts

- `yarn test` : pour excecuter les tests.
- `yarn format` : pour corriger les erreurs de format de code.
- `yarn lint` : pour linter le code.

## Documentation :book:

- [Migration **npm** vers **yarn**](/doc/adr/yarn.md).
- [Workflow et standards](/doc/WORKFLOW-ET-STANDARDS.md).
- [A11y](/doc/A11Y.md)
- [Strategie de test](/doc/STRATEGIE_TEST.md).
- [Réintergation](./doc/adr/REACTIVATE_GROUPES.md) de la notion de groupe.
- [Workflow build](./doc/LIVRAISON.md) pour la livraison.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
