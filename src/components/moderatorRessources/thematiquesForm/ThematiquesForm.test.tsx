import '@testing-library/jest-dom';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThematiquesForm } from './ThematiquesForm';
import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '@/RequestInterceptor';
import {
  moderatorRessources,
  moderatorThematiques,
} from '../../../utils/tests/moderatorRessources.fixtures';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ocWelcomeAPIResponse } from '@/utils/tests/ocWelcome.fixtures';

expect.extend(toHaveNoViolations);

describe('ThematiquesForm', () => {
  beforeAll(async () => {
    const mock = new MockAdapter(axiosInstance, { delayResponse: 2000 });
    mock.onGet('/moderateur/message/oc').reply(200, {
      ressources: moderatorRessources,
    });

    const mockRessourcesFiles = new MockAdapter(axiosInstance, {
      delayResponse: 200,
    });
    mockRessourcesFiles.onGet('/partenaire/welcome').reply(200, {
      users: ocWelcomeAPIResponse,
    });

    const mockRessourcesThematiques = new MockAdapter(axiosInstance, {
      delayResponse: 2000,
    });
    mockRessourcesThematiques
      .onGet('/moderateur/fichiers/search?thematiqueId=1')
      .reply(200, {
        ressources: moderatorThematiques[0],
      });
  });

  it('should pass accessibility tests', async () => {
    // WHEN
    const { container } = render(<ThematiquesForm />);
    const results = await axe(container);
    // THEN
    waitFor(() => {
      expect(results).toHaveNoViolations();
    });
  });

  it('should render the form with the correct number of thematiques', () => {
    // WHEN
    const { container } = render(<ThematiquesForm />);
    const formElement = container.querySelector('form');
    expect(formElement).toBeInTheDocument();
    // THEN
    waitFor(() => {
      const thematiqueElements = container.querySelectorAll('h3');
      expect(thematiqueElements.length).toBe(4);
    });
  });

  it('should update the thematique title when input value changes', () => {
    // GIVEN
    render(<ThematiquesForm />);
    waitFor(() => {
      const inputElement = screen.getByLabelText(
        'Thématique de la sélection'
      ) as HTMLInputElement;
      // WHEN
      userEvent.type(inputElement, 'Ma nouvelle thématique');
      // THEN
      expect(inputElement.value).toBe('Ma nouvelle thématique');
    });
  });
});
