import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { OcAccueilTuiles } from './OcAccueilTuiles';

describe('OC bloc tuiles', () => {
  it('should render information bloc', () => {
    // GIVEN
    render(<OcAccueilTuiles />);
    // THEN
    expect(screen.getByText('Mes informations')).toBeInTheDocument();
  });
  it('should render Mes établissements bloc', () => {
    // GIVEN
    render(<OcAccueilTuiles />);
    // THEN
    expect(screen.getByText('Mes établissements')).toBeInTheDocument();
  });
  it('should render Mon équipe bloc', () => {
    // GIVEN
    render(<OcAccueilTuiles />);
    // THEN
    expect(screen.getByText('Mon équipe')).toBeInTheDocument();
  });
});
