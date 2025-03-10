import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CaisseAccueil } from './CaisseAccueil.tsx';
import { axiosInstance } from '../../RequestInterceptor.tsx';
import MockAdapter from 'axios-mock-adapter';
import { ocWelcomeFixture } from '../../utils/tests/ocWelcome.fixtures.ts';
import { OcWelcomePageContext } from '../../contexts/OcWelcomeContext.tsx';
import { ocWelcomeMessageMapper } from '../../utils/ocWelcomeMessage.mapper.ts';
import { LoginContext } from '../../contexts/LoginContext.tsx';

describe('CaisseAccueil', () => {
  beforeAll(async () => {
    const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });
    mock.onGet('/partenaire/welcome').reply(200, {
      data: ocWelcomeFixture,
    });
  });

  describe('when the front is not logged in', () => {
    it('should render loader', () => {
      // GIVEN
      render(
        <LoginContext.Provider
          value={{
            isLogged: false,
            setIsLogged: () => undefined,
          }}
        >
          <CaisseAccueil />
        </LoginContext.Provider>
      );
      // THEN
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('with default context values when oc user is logged in', () => {
    beforeEach(() => {
      // GIVEN
      render(
        <LoginContext.Provider
          value={{
            isLogged: true,
            setIsLogged: () => undefined,
          }}
        >
          <CaisseAccueil />
        </LoginContext.Provider>
      );
    });

    describe('should render header', () => {
      it('should render header', () => {
        // THEN
        expect(screen.getByText(/Ravi de vous retrouver/)).toBeInTheDocument();
      });
    });

    it('should not render toutes les ressources link', async () => {
      // Given
      const { container } = render(
        <LoginContext.Provider
          value={{
            isLogged: true,
            setIsLogged: () => undefined,
          }}
        >
          <CaisseAccueil />
        </LoginContext.Provider>
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
        <LoginContext.Provider
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
            <CaisseAccueil />
          </OcWelcomePageContext.Provider>
        </LoginContext.Provider>
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
        <LoginContext.Provider
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
            <CaisseAccueil />
          </OcWelcomePageContext.Provider>
        </LoginContext.Provider>
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
        <LoginContext.Provider
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
            <CaisseAccueil />
          </OcWelcomePageContext.Provider>
        </LoginContext.Provider>
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
        <LoginContext.Provider
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
            <CaisseAccueil />
          </OcWelcomePageContext.Provider>
        </LoginContext.Provider>
      );
      // When
      const listElements = container.querySelectorAll('li');
      // Then
      expect(listElements.length).toEqual(1);
    });
  });
});
