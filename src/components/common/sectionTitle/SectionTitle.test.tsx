// SectionTitle.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SectionTitle } from './SectionTitle';

expect.extend(toHaveNoViolations);

describe('SectionTitle', () => {
  const setup = (title: string, level?: 1 | 2 | 3 | 4 | 5 | 6) => {
    render(<SectionTitle title={title} level={level} />);
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

  it('should render an h3 element by default', () => {
    const testTitle = 'Another Test Title';
    setup(testTitle);

    const headingElement = screen.getByText(testTitle);
    expect(headingElement.tagName).toBe('H3');
  });

  it('should render an h2 element when level prop is passed as 2', () => {
    const testTitle = 'Heading Level 2 Test';
    setup(testTitle, 2);

    const headingElement = screen.getByRole('heading', { level: 2 });
    expect(headingElement.tagName).toBe('H2');
  });

  it('should render an h1 element when level prop is passed as 1', () => {
    const testTitle = 'Heading Level 1 Test';
    setup(testTitle, 1);

    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement.tagName).toBe('H1');
  });
});
