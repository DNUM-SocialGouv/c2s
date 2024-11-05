import { partenaireRessourcesMapper } from '../PartenaireRessources.mapper';

describe('partenaireRessourcesMapper', () => {
  it('should add associated files to each thematique', () => {
    const data = {
      thematiques: [
        {
          id: 0,
          titre: 'sting',
          description: '',
          groupes: ['CAISSE'],
          ordre: 0,
        },
        {
          id: 1,
          titre: 'rock',
          description: '',
          groupes: ['CAISSE'],
          ordre: 1,
        },
      ],
      fichiers: [
        {
          id: 0,
          thematique: {
            id: 0,
            titre: '',
            description: '',
            groupes: ['CAISSE'],
            ordre: 0,
          },
          nom: '',
          taille: 0,
          extension: '',
          dateCrea: '',
          dateMaj: '',
        },
        {
          id: 1,
          thematique: {
            id: 1,
            titre: '',
            description: '',
            groupes: ['CAISSE'],
            ordre: 1,
          },
          nom: '',
          taille: 0,
          extension: '',
          dateCrea: '',
          dateMaj: '',
        },
        {
          id: 2,
          thematique: {
            id: 0,
            titre: '',
            description: '',
            groupes: ['CAISSE'],
            ordre: 0,
          },
          nom: '',
          taille: 0,
          extension: '',
          dateCrea: '',
          dateMaj: '',
        },
      ],
      dateMiseAJour: '31 octobre 2024',
    };

    const expectedData = {
      thematiques: [
        {
          id: 0,
          titre: 'sting',
          description: '',
          groupes: ['CAISSE'],
          ordre: 0,
          associatedFiles: [
            {
              id: 0,
              thematique: {
                id: 0,
                titre: '',
                description: '',
                groupes: ['CAISSE'],
                ordre: 0,
              },
              nom: '',
              taille: 0,
              extension: '',
              dateCrea: '',
              dateMaj: '',
            },
            {
              id: 2,
              thematique: {
                id: 0,
                titre: '',
                description: '',
                groupes: ['CAISSE'],
                ordre: 0,
              },
              nom: '',
              taille: 0,
              extension: '',
              dateCrea: '',
              dateMaj: '',
            },
          ],
        },
        {
          id: 1,
          titre: 'rock',
          description: '',
          groupes: ['CAISSE'],
          ordre: 1,
          associatedFiles: [
            {
              id: 1,
              thematique: {
                id: 1,
                titre: '',
                description: '',
                groupes: ['CAISSE'],
                ordre: 1,
              },
              nom: '',
              taille: 0,
              extension: '',
              dateCrea: '',
              dateMaj: '',
            },
          ],
        },
      ],
      fichiers: [
        {
          id: 0,
          thematique: {
            id: 0,
            titre: '',
            description: '',
            groupes: ['CAISSE'],
            ordre: 0,
          },
          nom: '',
          taille: 0,
          extension: '',
          dateCrea: '',
          dateMaj: '',
        },
        {
          id: 1,
          thematique: {
            id: 1,
            titre: '',
            description: '',
            groupes: ['CAISSE'],
            ordre: 1,
          },
          nom: '',
          taille: 0,
          extension: '',
          dateCrea: '',
          dateMaj: '',
        },
        {
          id: 2,
          thematique: {
            id: 0,
            titre: '',
            description: '',
            groupes: ['CAISSE'],
            ordre: 0,
          },
          nom: '',
          taille: 0,
          extension: '',
          dateCrea: '',
          dateMaj: '',
        },
      ],
      dateMiseAJour: '31 octobre 2024',
    };

    const result = partenaireRessourcesMapper(data);
    expect(result).toEqual(expectedData);
  });

  it('should return the same data with empty array if there are no associated files', () => {
    const thematiques = {
      thematiques: [
        {
          id: 0,
          titre: 'sting',
          description: '',
          groupes: ['CAISSE'],
          ordre: 0,
        },
        {
          id: 1,
          titre: 'rock',
          description: '',
          groupes: ['CAISSE'],
          ordre: 1,
        },
      ],
      fichiers: [],
      dateMiseAJour: '31 octobre 2024',
    };

    const result = partenaireRessourcesMapper(thematiques);
    expect(result).toEqual({
      thematiques: [
        {
          id: 0,
          titre: 'sting',
          description: '',
          groupes: ['CAISSE'],
          ordre: 0,
          associatedFiles: [],
        },
        {
          id: 1,
          titre: 'rock',
          description: '',
          groupes: ['CAISSE'],
          ordre: 1,
          associatedFiles: [],
        },
      ],
      fichiers: [],
      dateMiseAJour: '31 octobre 2024',
    });
  });
});
