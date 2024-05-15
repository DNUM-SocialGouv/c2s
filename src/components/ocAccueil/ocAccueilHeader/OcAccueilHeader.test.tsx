import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { OcAccueilHeader } from './OcAccueilHeader';

describe('Accueil OC', () => {
  it('should render header', () => {
    // GIVEN
    render(<OcAccueilHeader />);
    // THEN
    expect(screen.getByText(/Ravi de vous retrouver/)).toBeInTheDocument();
    expect(screen.getByText(/👋/)).toBeInTheDocument();
  });
});
