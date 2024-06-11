import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('should render without errors', () => {
    render(<HomePage />);
  });

  it('should render a div with the correct class', () => {
    const { container } = render(<HomePage />);
    const divElement = container.querySelector('div');

    expect(divElement).toBeInTheDocument();
    expect(divElement).toHaveClass('flex', 'flex-col', 'md:flex-row');
  });
});
