import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { EtablissementTabHeader } from './EtablissementTabHeader.tsx';

import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('EtablissementTabHeader', () => {
  it('should render component wihtout violation', async () => {
    // GIVEN
    const updateDate = '31 décembre 2021';

    // WHEN
    const { container } = render(
      <EtablissementTabHeader updateDate={updateDate} />
    );
    const results = await axe(container);

    // THEN
    waitFor(() => {
      expect(results).toHaveNoViolations();
    });
  });

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
