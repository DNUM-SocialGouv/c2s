import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { OcAccueilLinks } from './OcAccueilLinks';
import { OcWelcomePageContext } from '@/contexts/OcWelcomeContext';
import { ocWelcomeAPIResponse } from '@/utils/tests/ocWelcome.fixtures';
import { ocWelcomeMessageMapper } from '@/utils/ocWelcomeMessage.mapper';

describe('Accueil OC', () => {
  it('should render see more button', () => {
    // GIVEN
    render(<OcAccueilLinks />);
    // THEN
    expect(screen.getByText('Toutes les ressources')).toBeInTheDocument();
  });

  describe('with cunstom context values', () => {
    beforeEach(() => {
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
          <OcAccueilLinks />
        </OcWelcomePageContext.Provider>
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
