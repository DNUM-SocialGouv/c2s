import '@testing-library/jest-dom';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThematiquesForm } from './ThematiquesForm.tsx';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import {
  moderatorRessources,
  moderatorThematiques,
} from '../../../utils/tests/moderatorRessources.fixtures.ts';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ocWelcomeAPIResponse } from '../../../utils/tests/ocWelcome.fixtures.ts';
import { ModeratorRessourcesContext } from '../../../contexts/ModeratorRessourceContext.tsx';

expect.extend(toHaveNoViolations);

describe('ThematiquesForm', () => {
  beforeAll(async () => {
    const mock = new MockAdapter(axiosInstance, { delayResponse: 2000 });

    mock.onGet('moderateur/fichiers/').reply(200, {
      ressources: moderatorRessources,
    });

    const mockRessourcesFiles = new MockAdapter(axiosInstance, {
      delayResponse: 200,
    });

    mockRessourcesFiles.onGet('/partenaire/welcome').reply(200, {
      users: ocWelcomeAPIResponse,
    });

    const mockRessourcesThematiques = new MockAdapter(axiosInstance, {
      delayResponse: 200,
    });

    mockRessourcesThematiques
      .onGet('/moderateur/fichiers/search?thematiqueId=1')
      .reply(200, {
        ressources: moderatorThematiques[0],
      });

    mockRessourcesThematiques
      .onGet('/moderateur/fichiers/search?thematiqueId=2')
      .reply(200, {
        ressources: moderatorThematiques[1],
      });

    mockRessourcesThematiques
      .onGet('/moderateur/fichiers/search?thematiqueId=0')
      .reply(200, {
        ressources: moderatorThematiques[1],
      });
  });

  it('should pass accessibility tests', async () => {
    // GIVEN
    const { container } = render(
      <ModeratorRessourcesContext.Provider
        value={{
          thematiques: moderatorThematiques,
          setThematiques: () => undefined,
        }}
      >
        <ThematiquesForm />
      </ModeratorRessourcesContext.Provider>
    );
    const results = await axe(container);
    // THEN
    expect(results).toHaveNoViolations();
  });

  it('should render the form with the correct number of thematiques', async () => {
    // WHEN
    const { container } = render(
      <ModeratorRessourcesContext.Provider
        value={{
          thematiques: moderatorThematiques,
          setThematiques: () => undefined,
        }}
      >
        <ThematiquesForm />
      </ModeratorRessourcesContext.Provider>
    );
    const formElement = container.querySelector('form');
    expect(formElement).toBeInTheDocument();
    // THEN
    await waitFor(() => {
      const thematiqueElements = container.querySelectorAll('h3');
      expect(thematiqueElements.length).toBe(4);
    });
  });

  it('should update the thematique title when input value changes', async () => {
    // GIVEN
    render(
      <ModeratorRessourcesContext.Provider
        value={{
          thematiques: moderatorThematiques,
          setThematiques: () => undefined,
        }}
      >
        <ThematiquesForm />
      </ModeratorRessourcesContext.Provider>
    );
    const inputElement = screen.getAllByLabelText(
      'Nom de la thématique*'
    ) as HTMLInputElement[];
    // WHEN
    await waitFor(() => {
      userEvent.type(inputElement[0], 'Ma nouvelle thématique');
    });
    // THEN
    await waitFor(() => {
      expect(inputElement[0].value).toBe('Rubrique OC 1Ma nouvelle thématique');
    });
  });
});
