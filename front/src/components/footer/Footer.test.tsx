import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer.tsx';

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });
  it('should render the footer brand correctly', () => {
    expect(screen.getByText(/Ministère/)).toBeInTheDocument();
    expect(screen.getByText(/des solidarités/)).toBeInTheDocument();
    expect(screen.getByText(/et de la santé/)).toBeInTheDocument();
  });

  it('should render the footer content correctly', () => {
    expect(
      screen.getByText(/La complémentaire santé solidaire/)
    ).toBeInTheDocument();
    expect(screen.getByText(/legifrance.gouv.fr/)).toBeInTheDocument();
    expect(screen.getByText(/gouvernement.fr/)).toBeInTheDocument();
    expect(screen.getByText(/service-public.fr/)).toBeInTheDocument();
    expect(screen.getByText(/data.gouv.fr/)).toBeInTheDocument();
  });

  it('should render the footer bottom links correctly', () => {
    expect(screen.getByText(/Plan du site/)).toBeInTheDocument();
    expect(screen.getByText(/Accessibilité/)).toBeInTheDocument();
    expect(screen.getByText(/Mentions légales/)).toBeInTheDocument();
    expect(screen.getByText(/Données personnelles/)).toBeInTheDocument();
    expect(screen.getByText(/Gestion des cookies/)).toBeInTheDocument();
  });

  it('should render the footer bottom copyright correctly', () => {
    expect(
      screen.getByText(
        /Sauf mention explicite de propriété intellectuelle détenue par des tiers/
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/licence etalab-2.0/)).toBeInTheDocument();
  });
});
