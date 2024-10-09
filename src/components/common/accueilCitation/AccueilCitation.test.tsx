import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AccueilCitation } from './AccueilCitation';
import { OcWelcomePageContext } from '@/contexts/OcWelcomeContext';
import { ocWelcomeMessageMapper } from '@/utils/ocWelcomeMessage.mapper';
import { ocWelcomeFixture } from '@/utils/tests/ocWelcome.fixtures';
import { LoginContext } from '@/contexts/LoginContext';

describe('AccueilCitation', () => {
  describe('with context default values', () => {
    it('should render component with default values', () => {
      // GIVEN
      render(
        <LoginContext.Provider
          value={{
            isLogged: true,
            setIsLogged: () => undefined,
          }}
        >
          <AccueilCitation />
        </LoginContext.Provider>
      );
      // THEN
      expect(
        screen.getByText(`Le petit mot de l'équipe C2S`)
      ).toBeInTheDocument();
      expect(screen.getByText(`L'équipe C2S`)).toBeInTheDocument();
    });
  });

  describe('with custom context values', () => {
    it('should render component with default values', () => {
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
            <AccueilCitation />
          </OcWelcomePageContext.Provider>
        </LoginContext.Provider>
      );
      // THEN
      expect(
        screen.getByText(`Le petit mot de l'équipe C2S`)
      ).toBeInTheDocument();
      expect(screen.getByText(`L'équipe C2S`)).toBeInTheDocument();
      expect(screen.getByText('« Bienvenu OC 2 »')).toBeInTheDocument();
      expect(screen.getByText('30 juin 2023')).toBeInTheDocument();
    });
  });
});
