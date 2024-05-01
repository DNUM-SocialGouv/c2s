import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { OcAccueil } from './OcAccueil';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('OcAccueil', () => {
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
