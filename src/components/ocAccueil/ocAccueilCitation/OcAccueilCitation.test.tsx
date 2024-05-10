import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { OcAccueilCitation } from './OcAccueilCitation';
import { OcWelcomePageContext } from '@/contexts/OcWelcomeContext';
import { ocWelcomeMessageMapper } from '@/utils/ocWelcomeMessage.mapper';
import { ocWelcomeAPIResponse } from '@/utils/tests/ocWelcome.fixtures';

describe('OcAccueilCitation', () => {
  describe('with context default values', () => {
    it('should render component with default values', () => {
      // GIVEN
      render(<OcAccueilCitation />);
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
        <OcWelcomePageContext.Provider
          value={{
            message: ocWelcomeMessageMapper(
              ocWelcomeAPIResponse.messageAccueil
            ),
            setMessage: () => undefined,
            links: ocWelcomeAPIResponse.ressourceFiles,
            setLinks: () => undefined,
          }}
        >
          <OcAccueilCitation />
        </OcWelcomePageContext.Provider>
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