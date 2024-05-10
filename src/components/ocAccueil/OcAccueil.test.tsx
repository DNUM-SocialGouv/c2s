import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { OcAccueil } from './OcAccueil';
import { axiosInstance } from '../../RequestInterceptor';
import MockAdapter from 'axios-mock-adapter';
import { ocWelcomeAPIResponse } from '@/utils/tests/ocWelcome.fixtures';
import { OcWelcomePageContext } from '@/contexts/OcWelcomeContext';
import { ocWelcomeMessageMapper } from '@/utils/ocWelcomeMessage.mapper';

describe('OcAccueil', () => {
  beforeAll(async () => {
    const mock = new MockAdapter(axiosInstance, { delayResponse: 2000 });
    mock.onGet('/partenaire/welcome').reply(200, {
      users: ocWelcomeAPIResponse,
    });
  });

  describe('with default context values', () => {
    beforeEach(() => {
      // GIVEN
      render(<OcAccueil />);
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
        // THEN
        expect(screen.getByText('Mes informations')).toBeInTheDocument();
      });

      it('should render Mes établissements bloc', () => {
        // THEN
        expect(screen.getByText('Mes établissements')).toBeInTheDocument();
      });

      it('should render Mon équipe bloc', () => {
        // THEN
        expect(screen.getByText('Mon équipe')).toBeInTheDocument();
      });
    });
  });

  describe('with custom context values', () => {
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
          <OcAccueil />
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

    it('should render see more button', () => {
      // THEN
      expect(screen.getByText('Toutes les ressources')).toBeInTheDocument();
    });
  });
});
