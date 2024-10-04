import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { RessourcesHeader } from './RessourcesHeader';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '@/RequestInterceptor';

describe('RessourcesHeader', () => {
  beforeAll(async () => {
    const mock = new MockAdapter(axiosInstance, { delayResponse: 2000 });
    mock.onGet('/moderateur/fichiers/search').reply(200, {
      data: [
        {
          id: 1,
          thematique: {
            id: 1,
            titre: 'Evolutions juridiques',
            description: 'Description OC 1 Evolutions juridiques 2',
            groupe: 'ORGANISME_COMPLEMENTAIRE',
            ordre: 1,
          },
          repertoire: 'mon-repertoire',
          nom: 'Mon premier fichier',
          taille: 350,
          extension: 'pdf',
          dateCrea: '2024-10-02T20:53:58.841',
          dateMaj: null,
        },
      ],
    });
  });
  it('should render the header with correct title and count', () => {
    // Given
    render(<RessourcesHeader />);

    // Then
    expect(screen.getByText(/ressources publiées/)).toBeInTheDocument();
    expect(screen.getByText('Ressources')).toBeInTheDocument();
  });

  it('should render the buttons', () => {
    // Given
    render(<RessourcesHeader />);

    // Then
    expect(screen.getByText('Nouvelle thématique')).toBeInTheDocument();
    expect(screen.getByText('Nouvelle ressource')).toBeInTheDocument();
  });
});
