import {
  ModeratorRessourcesFromAPI,
  ModeratorThematiqueFromAPI,
} from '../../domain/ModeratorRessources.ts';

export const moderatorRessources: ModeratorRessourcesFromAPI[] = [
  {
    id: 1,
    thematique: {
      id: 1,
      titre: 'Rubrique ORGANISME_COMPLEMENTAIRE 1',
      description: 'Description 1 ORGANISME_COMPLEMENTAIRE',
      groupes: ['ORGANISME_COMPLEMENTAIRE'],
      ordre: 1,
    },
    repertoire: 'string',
    nom: 'string',
    taille: 100,
    extension: 'string',
    dateCrea: '2024-10-02T13:22:50.009Z',
    dateMaj: '2024-10-02T13:22:50.009Z',
  },
  {
    id: 2,
    thematique: {
      id: 2,
      titre: 'Rubrique MODERATEUR 1',
      description: 'Rubrique MODERATEUR 1 description',
      groupes: ['MODERATEUR'],
      ordre: 2,
    },
    repertoire: 'string',
    nom: 'string',
    taille: 200,
    extension: 'string',
    dateCrea: '2024-11-02T13:22:50.009Z',
    dateMaj: '2024-11-02T13:22:50.009Z',
  },
];

export const moderatorThematiques: ModeratorThematiqueFromAPI[] = [
  {
    id: 1,
    titre: 'Rubrique OC 1',
    description: 'Description 1',
    groupes: ['ORGANISME_COMPLEMENTAIRE'],
    ordre: 1,
  },
  {
    id: 2,
    titre: 'Rubrique MODERATEUR 1',
    description: 'Rubrique MODERATEUR 1 description',
    groupes: ['MODERATEUR'],
    ordre: 2,
  },
];
