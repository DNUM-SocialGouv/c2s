import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Tuile } from './Tuile';
import { Avatar } from '../svg/Avatar';

describe('Tuile', () => {
  it('should render component with right wording', () => {
    // GIVEN
    render(
      <Tuile title={'Some header wording'} detail={'Some detail wording'}>
        <Avatar />
      </Tuile>
    );
    // THEN
    expect(screen.getByText('Some header wording')).toBeInTheDocument();
    expect(screen.getByText('Some detail wording')).toBeInTheDocument();
  });
});
