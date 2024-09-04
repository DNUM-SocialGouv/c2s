import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { OcAccueil } from './OcAccueil';
import { axiosInstance } from '../../RequestInterceptor';
import MockAdapter from 'axios-mock-adapter';
import { ocWelcomeFixture } from '@/utils/tests/ocWelcome.fixtures';
import { OcWelcomePageContext } from '@/contexts/OcWelcomeContext';
import { ocWelcomeMessageMapper } from '@/utils/ocWelcomeMessage.mapper';
import { OcLoginContext } from '@/contexts/OCLoginContext';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('OcAccueil', () => {
  beforeAll(async () => {
    const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });
    mock.onGet('/partenaire/welcome').reply(200, {
      data: ocWelcomeFixture,
    });
  });

  describe('Ay11', () => {
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
    it('sould render the component without accessibility violations', async () => {
      const ocAccueil = screen.getByTestId('ocAccueil');
      expect(await axe(ocAccueil)).not.toHaveNoViolations();
    });
  });

  describe('when the front is not logged in', () => {
    it('should render loader', () => {
      // GIVEN
      render(
        <OcLoginContext.Provider
          value={{
            isLogged: false,
            setIsLogged: () => undefined,
          }}
        >
          <OcAccueil />
        </OcLoginContext.Provider>
      );
      // THEN
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('with default context values when oc user is logged in', () => {
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

    it('should not render toutes les ressources link', async () => {
      // Given
      const { container } = render(
        <OcLoginContext.Provider
          value={{
            isLogged: true,
            setIsLogged: () => undefined,
          }}
        >
          <OcAccueil />
        </OcLoginContext.Provider>
      );
      // When
      const listElements = container.querySelectorAll('li');
      // Then
      expect(listElements.length).toEqual(1);
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
  });

  describe('with custom context values and an empty ressources array', () => {
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
              links: [],
              setLinks: () => undefined,
            }}
          >
            <OcAccueil />
          </OcWelcomePageContext.Provider>
        </OcLoginContext.Provider>
      );
    });

    it('should render dev message', async () => {
      // THEN
      expect(
        screen.getByText(/Cette fonctionnalité est en cours de développement/)
      ).toBeInTheDocument();
    });
    it('should render toutes les ressources button', async () => {
      // THEN
      expect(screen.getByText('Toutes les ressources')).toBeInTheDocument();
    });

    it('should not render download links', async () => {
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
              links: [],
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
      expect(listElements.length).toEqual(1);
    });
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
    it('should navigate to Mes informations', () => {
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

  describe('ocWelcomeMessageMapper', () => {
    jest.mock('@/utils/ocWelcomeMessage.mapper');
    it('calls ocWelcomeMessageMapper with the correct data', async () => {
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
      // THEN
      waitFor(() => {
        expect(ocWelcomeMessageMapper).toHaveBeenCalledWith(
          ocWelcomeFixture.messageAccueil
        );
      });
    });
  });

  describe('setLinks', () => {
    it('calls setLinks with the correct data', async () => {
      const setLinks = jest.fn();
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
              setLinks: setLinks,
            }}
          >
            <OcAccueil />
          </OcWelcomePageContext.Provider>
        </OcLoginContext.Provider>
      );

      // THEN
      waitFor(() => {
        expect(setLinks).toHaveBeenCalledWith(ocWelcomeFixture.ressourceFiles);
      });
    });
  });
});
