// SectionTitle.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SectionTitle } from './SectionTitle';

expect.extend(toHaveNoViolations);

describe('SectionTitle', () => {
  const setup = (title: string) => {
    render(<SectionTitle title={title} />);
  };

  it('should render the component without accessibility violations', async () => {
    setup('Accessibility Test Title');

    const sectionTitle = screen.getByRole('heading', { level: 3 });
    expect(await axe(sectionTitle)).toHaveNoViolations();
  });

  it('should render the title prop correctly', () => {
    const testTitle = 'Test Title';
    setup(testTitle);

    const headingElement = screen.getByText(testTitle);
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveClass('mb-5 mt-3 text-[24px]');
  });

  it('should render an h3 element', () => {
    const testTitle = 'Another Test Title';
    setup(testTitle);

    const headingElement = screen.getByText(testTitle);
    expect(headingElement.tagName).toBe('H3');
  });
});
