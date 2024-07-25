import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { OcAccueil } from './OcAccueil';
import { axiosInstance } from '../../RequestInterceptor';
import MockAdapter from 'axios-mock-adapter';
import { ocWelcomeFixture } from '@/utils/tests/ocWelcome.fixtures';
import { OcWelcomePageContext } from '@/contexts/OcWelcomeContext';
import { ocWelcomeMessageMapper } from '@/utils/ocWelcomeMessage.mapper';
import { OcLoginContext } from '@/contexts/OCLoginContext';

describe('OcAccueil', () => {
  beforeAll(async () => {
    const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });
    mock.onGet('/partenaire/welcome').reply(200, {
      users: ocWelcomeFixture,
    });
  });

  describe('with default context values ann when oc user is logged in', () => {
    beforeEach(() => {
      // GIVEN
      render(
        <OcLoginContext.Provider
          value={{
            isLogged: true,
            setIsLogged: () => undefined,
          }}
        >
          <OcAccueil />
        </OcLoginContext.Provider>
      );
    });

    describe('should render header', () => {
      it('should render header', () => {
        // THEN
        expect(screen.getByText(/Ravi de vous retrouver/)).toBeInTheDocument();
      });
    });

    describe('should render tuiles', () => {
      // GIVEN
      it('should render information bloc', () => {
        // Then
        expect(screen.getByText('Mes informations')).toBeInTheDocument();
      });

      it('should render Mes établissements bloc', () => {
        // Then
        expect(screen.getByText('Mes établissements')).toBeInTheDocument();
      });

      it('should render Mon équipe bloc', async () => {
        // Then
        expect(screen.getByText('Mon équipe')).toBeInTheDocument();
      });
    });
  });

  describe('with custom context values', () => {
    beforeEach(() => {
      // GIVEN
      render(
        <OcLoginContext.Provider
          value={{
            isLogged: true,
            setIsLogged: () => undefined,
          }}
        >
          <OcWelcomePageContext.Provider
            value={{
              message: ocWelcomeMessageMapper(ocWelcomeFixture.messageAccueil),
              setMessage: () => undefined,
              links: ocWelcomeFixture.ressourceFiles,
              setLinks: () => undefined,
            }}
          >
            <OcAccueil />
          </OcWelcomePageContext.Provider>
        </OcLoginContext.Provider>
      );
    });

    it('should render toutes les ressources button', async () => {
      // THEN
      expect(screen.getByText('Toutes les ressources')).toBeInTheDocument();
    });

    it('should render see more button', async () => {
      // THEN
      expect(screen.getByText('Toutes les ressources')).toBeInTheDocument();
    });
  });

  it('should render 7 download links and a button', async () => {
    // Given
    const { container } = render(
      <OcLoginContext.Provider
        value={{
          isLogged: true,
          setIsLogged: () => undefined,
        }}
      >
        <OcWelcomePageContext.Provider
          value={{
            message: ocWelcomeMessageMapper(ocWelcomeFixture.messageAccueil),
            setMessage: () => undefined,
            links: ocWelcomeFixture.ressourceFiles,
            setLinks: () => undefined,
          }}
        >
          <OcAccueil />
        </OcWelcomePageContext.Provider>
      </OcLoginContext.Provider>
    );
    // When
    const listElements = container.querySelectorAll('li');
    // Then
    expect(listElements.length).toEqual(8);
  });

  describe('On click', () => {
    beforeEach(() => {
      // GIVEN
      render(
        <OcLoginContext.Provider
          value={{
            isLogged: true,
            setIsLogged: () => undefined,
          }}
        >
          <OcAccueil />
        </OcLoginContext.Provider>
      );
    });
    it('should render navigate to Mes informations', () => {
      // WHEN
      const mesInformationBtn = screen.getByText('Mes informations');
      fireEvent.click(mesInformationBtn);
      // THEN
      expect(screen.getByText('Mes informations')).toBeInTheDocument();
      expect(
        screen.getByText('Gérez vos données personnelles')
      ).toBeInTheDocument();
    });
    it('should navigate to Mes établissements', () => {
      // WHEN
      const mesEtablissementBtn = screen.getByText('Mes établissements');
      fireEvent.click(mesEtablissementBtn);
      // THEN
      expect(screen.getByText('Mes établissements')).toBeInTheDocument();
    });

    it('should navigate to Mon équipe', async () => {
      // WHEN
      const monEquipeBtn = screen.getByText('Mon équipe');
      fireEvent.click(monEquipeBtn);
      // THEN
      waitFor(() => {
        expect(screen.getByText(/Cet onglet est en cours/)).toBeInTheDocument();
      });
    });

    it('should navigate to Mes ressources', async () => {
      // WHEN
      const toutesLesRessourcesBtn = screen.getByText('Toutes les ressources');
      fireEvent.click(toutesLesRessourcesBtn);
      // THEN
      waitFor(() => {
        expect(screen.getByText(/Cet onglet est en cours/)).toBeInTheDocument();
      });
    });
  });
});
