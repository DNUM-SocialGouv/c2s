import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { TabHeader } from './tabHeader';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('should render component wihtout violation', async () => {
  // Given
  const icon = <svg />;
  const pageTitle = 'Page Title';
  const pageDetail = 'Page Detail';

  // When
  render(
    <TabHeader icon={icon} pageTitle={pageTitle} pageDetail={pageDetail} />
  );
  // Then
  expect(await axe(screen.getByTestId('tabHeader'))).toHaveNoViolations();
});

describe('TabHeader', () => {
  it('should render the header with the correct title and detail', () => {
    // GIVEN
    const icon = <svg />;
    const pageTitle = 'Page Title';
    const pageDetail = 'Page Detail';

    // WHEN
    render(
      <TabHeader icon={icon} pageTitle={pageTitle} pageDetail={pageDetail} />
    );

    // THEN
    expect(screen.getByText(/Page Title/)).toBeInTheDocument();
    expect(screen.getByText(/Page Detail/)).toBeInTheDocument();
  });

  it('should render the header without icon when not provided', () => {
    // GIVEN
    const pageTitle = 'Page Title';
    const pageDetail = 'Page Detail';

    // WHEN
    render(<TabHeader pageTitle={pageTitle} pageDetail={pageDetail} />);

    // THEN
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('should render the header without page detail when not provided', () => {
    // GIVEN
    const icon = <svg />;
    const pageTitle = 'Page Title';

    // WHEN
    render(<TabHeader icon={icon} pageTitle={pageTitle} />);

    // THEN
    expect(screen.getByText(/Page Title/)).toBeInTheDocument();
    expect(screen.queryByText(/Page Detail/)).not.toBeInTheDocument();
  });
});
