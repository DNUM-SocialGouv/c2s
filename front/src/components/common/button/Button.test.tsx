import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button.tsx';

describe('Button', () => {
  it('should render with label', () => {
    // GIVEN
    const label = 'Click me';
    render(<Button label={label} />);

    // THEN
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('should render with primary variant by default', () => {
    // GIVEN
    render(<Button />);

    // THEN
    expect(screen.getByRole('button')).toHaveClass('fr-btn');
  });

  it('should render with secondary variant', () => {
    // GIVEN
    render(<Button variant="secondary" />);

    // THEN
    expect(screen.getByRole('button')).toHaveClass('fr-btn fr-btn--secondary');
  });

  it('should call onClick when clicked', () => {
    // GIVEN
    const onClick = jest.fn();
    render(<Button onClick={onClick} />);

    // WHEN
    fireEvent.click(screen.getByRole('button'));

    // THEN
    expect(onClick).toHaveBeenCalled();
  });
});
