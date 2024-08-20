import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InformationMessage } from './InformationMessage';

describe('InformationMessage', () => {
  it('renders the message correctly', () => {
    // GIVEN
    const message = 'Cette fonctionnalité est en cours de développement';

    // WHEN
    render(<InformationMessage message={message} />);

    // THEN
    expect(screen.getByText('Information :')).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
