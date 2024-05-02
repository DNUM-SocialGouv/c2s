import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
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
});
