import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './Error.tsx';
import '@testing-library/jest-dom';

describe('ErrorMessage', () => {
  it('should render the error message', () => {
    const errorMessage = 'This is an error message';

    render(<ErrorMessage message={errorMessage} />);

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });
});
