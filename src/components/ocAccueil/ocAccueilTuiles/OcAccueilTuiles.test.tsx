import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { OcAccueilTuiles } from './OcAccueilTuiles';

describe('OC bloc tuiles', () => {
  beforeEach(() => {
    // GIVEN
    render(<OcAccueilTuiles />);
  });
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
  describe('On click', () => {
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
  });
});
