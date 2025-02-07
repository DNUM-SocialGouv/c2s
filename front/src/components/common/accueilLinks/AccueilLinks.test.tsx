import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AccueilLinks } from './AccueilLinks.tsx';
import { OcWelcomePageContext } from '../../../contexts/OcWelcomeContext.tsx';
import { ocWelcomeFixture } from '../../../utils/tests/ocWelcome.fixtures.ts';
import { ocWelcomeMessageMapper } from '../../../utils/ocWelcomeMessage.mapper.ts';
import { LoginContext } from '../../../contexts/LoginContext.tsx';

describe('Accueil Partenaires', () => {
  it('should render see more button', () => {
    // GIVEN
    render(<AccueilLinks />);
    // THEN
    expect(screen.getByText('Toutes les ressources')).toBeInTheDocument();
  });

  describe('with cunstom context values', () => {
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
            <AccueilLinks />
          </OcWelcomePageContext.Provider>
        </LoginContext.Provider>
      );
    });

    it('should render toutes les ressources button', () => {
      // THEN
      expect(screen.getByText('Toutes les ressources')).toBeInTheDocument();
    });

    it('should render links', () => {
      // THEN
      expect(screen.getByText('Test_fichier_13')).toBeInTheDocument();
      expect(screen.getByText('Test_fichier_9')).toBeInTheDocument();
      expect(screen.getByText('Test_fichier_10')).toBeInTheDocument();
      expect(screen.getByText('Test_fichier_7')).toBeInTheDocument();
      expect(screen.getByText('Test_fichier_5')).toBeInTheDocument();
      expect(screen.getByText('Test_fichier_3')).toBeInTheDocument();
      expect(screen.getByText('Test_fichier_1')).toBeInTheDocument();
    });
  });

  describe('with cunstom context values and without links', () => {
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
            <AccueilLinks />
          </OcWelcomePageContext.Provider>
        </LoginContext.Provider>
      );
    });

    it('should render toutes les ressources button', () => {
      // THEN
      expect(screen.getByText('Toutes les ressources')).toBeInTheDocument();
    });

    it('should render information messages', () => {
      // THEN
      expect(screen.getByText('Information:')).toBeInTheDocument();
    });
  });
});
