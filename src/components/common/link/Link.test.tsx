import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Link } from './Link';

describe('Link', () => {
  it('should render with label', () => {
    // GIVEN
    const label = 'Simple link with right icon';
    render(<Link label={label} href="#" />);

    // THEN
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('should render with href', () => {
    // GIVEN
    const href = '#';
    render(<Link href={href} />);

    // THEN
    expect(screen.getByRole('link')).toHaveAttribute('href', href);
  });

  it('should render with icon on the right by default', () => {
    // GIVEN
    render(<Link label="Link with icon" href="#" icon="arrow-right-line" />);

    // THEN
    const icon = screen.getByText('Link with icon').nextSibling;
    expect(icon).toHaveClass('fr-icon-arrow-right-line');
  });

  it('should render with icon on the left when specified', () => {
    // GIVEN
    render(
      <Link
        label="Link with icon"
        href="#"
        icon="arrow-left-line"
        iconPosition="left"
      />
    );

    // THEN
    const icon = screen.getByText('Link with icon').previousSibling;
    expect(icon).toHaveClass('fr-icon-arrow-left-line');
  });

  it('should apply additional class names', () => {
    // GIVEN
    const additionalClass = 'custom-class';
    render(<Link href="#" className={additionalClass} />);

    // THEN
    expect(screen.getByRole('link')).toHaveClass(additionalClass);
  });

  it('should render only the icon when no label is provided', () => {
    // GIVEN
    const icon = 'arrow-right-line';
    render(<Link href="#" icon={icon} />);

    // THEN
    const link = screen.getByRole('link');
    expect(link).not.toHaveTextContent;
    expect(link.firstChild).toHaveClass(`fr-icon-${icon}`);
  });
});
