import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { OcAccueil } from './OcAccueil';
import { axiosInstance } from '../../RequestInterceptor';
import MockAdapter from 'axios-mock-adapter';
import { ocWelcomeAPIResponse } from '@/utils/tests/ocWelcome.fixtures';

describe('OcAccueil', () => {
  beforeAll(async () => {
    const mock = new MockAdapter(axiosInstance, { delayResponse: 2000 });
    mock.onGet('/partenaire/welcome').reply(200, {
      users: ocWelcomeAPIResponse,
    });
  });
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
