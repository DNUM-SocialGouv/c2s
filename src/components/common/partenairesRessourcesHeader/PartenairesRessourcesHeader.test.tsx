import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PartenairesRessourcesHeader } from './PartenairesRessourcesHeader';

describe('PartenairesRessourcesHeader', () => {
  it('should render the header with the correct title', () => {
    // WHEN
    const { getByText } = render(<PartenairesRessourcesHeader />);
    const titleElement = getByText('Ressources');
    // THEN
    expect(titleElement).toBeInTheDocument();
  });
});
