import '@testing-library/jest-dom';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThematiquesForm } from './ThematiquesForm.tsx';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import {
  emptyModeratorRessources,
  moderatorRessources,
  moderatorThematiques,
} from '../../../utils/tests/moderatorRessources.fixtures.ts';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ModeratorRessourcesContext } from '../../../contexts/ModeratorRessourceContext.tsx';

expect.extend(toHaveNoViolations);

describe('ThematiquesForm', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axiosInstance);

    for (const thematique of moderatorThematiques) {
      mock
        .onGet(`/moderateur/fichiers/search?thematiqueId=${thematique.id}`)
        .reply(
          200,
          moderatorRessources.filter(
            (ressource) => ressource.thematique.id === thematique.id
          )
        );
    }
  });

  afterEach(() => {
    mock.restore();
  });

  it('should pass accessibility tests', async () => {
    // GIVEN
    const { container } = render(
      <ModeratorRessourcesContext.Provider
        value={{
          thematiques: moderatorThematiques,
          setThematiques: () => undefined,
          ressources: emptyModeratorRessources,
          setRessources: () => undefined,
        }}
      >
        <ThematiquesForm />
      </ModeratorRessourcesContext.Provider>
    );
    await waitFor(() => {
      expect(screen.getAllByRole('link')).toHaveLength(
        moderatorRessources.length
      );
    });
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
          ressources: emptyModeratorRessources,
          setRessources: () => undefined,
        }}
      >
        <ThematiquesForm />
      </ModeratorRessourcesContext.Provider>
    );
    const formElement = container.querySelector('form');
    expect(formElement).toBeInTheDocument();
    // THEN
    await waitFor(() => {
      expect(screen.getAllByRole('link')).toHaveLength(
        moderatorRessources.length
      );
      expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(
        moderatorThematiques.length
      );
    });
    for (const ressource of moderatorRessources) {
      expect(
        container.querySelector(
          `a[href="/api/moderateur/fichiers/${ressource.id}"]`
        )
      ).toHaveTextContent(ressource.nom);
    }
  });

  it('should update the thematique title when input value changes', async () => {
    // GIVEN
    render(
      <ModeratorRessourcesContext.Provider
        value={{
          thematiques: moderatorThematiques,
          setThematiques: () => undefined,
          ressources: emptyModeratorRessources,
          setRessources: () => undefined,
        }}
      >
        <ThematiquesForm />
      </ModeratorRessourcesContext.Provider>
    );
    await waitFor(() => {
      expect(screen.getAllByRole('link')).toHaveLength(
        moderatorRessources.length
      );
    });
    const inputElement = screen.getAllByLabelText(
      'Nom de la thématique*'
    ) as HTMLInputElement[];

    // WHEN
    await userEvent.type(inputElement[0], 'Ma nouvelle thématique');

    // THEN
    await waitFor(() => {
      expect(inputElement[0].value).toBe('Rubrique OC 1Ma nouvelle thématique');
    });
  });
});
