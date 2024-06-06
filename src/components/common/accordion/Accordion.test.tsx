import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from './Accordion';

describe('Accordion', () => {
  it('should render the title and children', () => {
    // GIVEN
    const title = 'Accordion Title';
    const children = <div>Accordion Content</div>;

    // WHEN
    render(<Accordion title={title}>{children}</Accordion>);

    // THEN
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText('Accordion Content')).toBeInTheDocument();
  });

  it('should expand and collapse when the button is clicked', () => {
    // GIVEN
    const title = 'Accordion Title';
    const children = <div>Accordion Content</div>;

    // WHEN
    render(<Accordion title={title}>{children}</Accordion>);
    const button = screen.getByText(title);
    fireEvent.click(button);

    // THEN
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Accordion Content')).toBeVisible();

    // WHEN
    fireEvent.click(button);

    // THEN
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});
