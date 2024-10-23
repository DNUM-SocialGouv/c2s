import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AccueilHeader } from './AccueilHeader.tsx';

describe('Accueil OC', () => {
  it('should render header', () => {
    // GIVEN
    render(<AccueilHeader />);
    // THEN
    expect(screen.getByText(/Ravi de vous retrouver/)).toBeInTheDocument();
    expect(screen.getByText(/👋/)).toBeInTheDocument();
  });
});
