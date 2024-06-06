import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Container from './Container';

describe('Container', () => {
  it('should render children', () => {
    // Arrange
    const children = <div>Test Children</div>;

    // Act
    const { getByText } = render(<Container>{children}</Container>);

    // Assert
    expect(getByText('Test Children')).toBeInTheDocument();
  });

  it('should apply default max-width class', () => {
    // Arrange
    const children = <div>Test Children</div>;

    // Act
    const { container } = render(<Container>{children}</Container>);

    // Assert
    expect(container.firstChild).toHaveClass('max-w-lg');
  });

  it('should apply custom max-width class', () => {
    // Arrange
    const children = <div>Test Children</div>;

    // Act
    const { container } = render(
      <Container maxWidth="sm">{children}</Container>
    );

    // Assert
    expect(container.firstChild).toHaveClass('max-w-sm');
  });
});
