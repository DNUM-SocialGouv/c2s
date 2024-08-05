import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { InfoTabHeader } from '../InfoTabHeader';
import { INFORMATIONS_FORM } from '@/wording';

describe('InfoTabHeader', () => {
  it('should render the title and subtitle correctly', () => {
    // WHEN
    render(<InfoTabHeader />);

    // THEN
    expect(screen.getByText(INFORMATIONS_FORM.title)).toBeInTheDocument();
    expect(screen.getByText(INFORMATIONS_FORM.subTitle)).toBeInTheDocument();
  });
});
