import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { EtablissementTabHeader } from './EtablissementTabHeader';

describe('EtablissementTabHeader', () => {
  it('should render the component correctly', () => {
    // GIVEN
    const updateDate = '31 décembre 2021';

    // WHEN
    render(<EtablissementTabHeader updateDate={updateDate} />);

    // THEN
    expect(screen.getByText('Mes établissements')).toBeInTheDocument();
    expect(
      screen.getByText(/Mise à jour le 31 décembre 2021/)
    ).toBeInTheDocument();
  });
});
