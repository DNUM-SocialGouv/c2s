import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Container from './Container.tsx';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('should render component wihtout violation', async () => {
  // Given
  const children = <div>Test Children</div>;
  // When
  render(<Container>{children}</Container>);
  // Then
  expect(await axe(screen.getByTestId('container'))).toHaveNoViolations();
});

describe('Container', () => {
  it('should render children', () => {
    // Given
    const children = <div>Test Children</div>;

    // When
    const { getByText } = render(<Container>{children}</Container>);

    // Then
    expect(getByText('Test Children')).toBeInTheDocument();
  });

  it('should apply default max-width class', () => {
    // Given
    const children = <div>Test Children</div>;

    // When
    const { container } = render(<Container>{children}</Container>);

    // Then
    expect(container.firstChild).toHaveClass('max-w-lg');
  });

  it('should apply custom max-width class', () => {
    // Given
    const children = <div>Test Children</div>;

    // When
    const { container } = render(
      <Container maxWidth="sm">{children}</Container>
    );

    // Then
    expect(container.firstChild).toHaveClass('max-w-sm');
  });
});
