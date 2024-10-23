import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { COMMON } from '../../../wording.ts';
import Pagination from './Pagination.tsx';

expect.extend(toHaveNoViolations);

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('Pagination', () => {
  const setup = (
    currentPage: number,
    totalPages: number,
    onPageChange: jest.Mock
  ) => {
    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    );
  };

  it('should render the component without accessibility violations', async () => {
    // GIVEN
    setup(1, 10, jest.fn());
    const pagination = screen.getByRole('navigation');
    // THEN
    expect(await axe(pagination)).toHaveNoViolations();
  });

  it('should render the previous and next buttons', () => {
    setup(1, 10, jest.fn());
    // THEN
    expect(screen.getByText(COMMON.prevPage)).toBeInTheDocument();
    expect(screen.getByText('Page suivante')).toBeInTheDocument();
  });

  it('should call onPageChange when a page number is clicked', () => {
    // GIVEN
    const onPageChange = jest.fn();
    setup(1, 10, onPageChange);
    // WHEN
    fireEvent.click(screen.getByText('2'));
    // THEN
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('should hide the next button when on the last page', () => {
    // WHEN
    setup(10, 10, jest.fn());
    // THEN
    expect(screen.queryByText('Page suivante')).not.toBeInTheDocument();
  });

  it('should disable the previous button when on the first page', () => {
    setup(1, 10, jest.fn());
    const prevButton = screen.getByText(COMMON.prevPage);
    // THEN
    waitFor(() => {
      expect(prevButton).toBeDisabled();
      expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    });
  });

  it('should show ellipsis when there are more pages than maxPagesToShow', () => {
    setup(7, 20, jest.fn());

    expect(screen.getAllByText('...')).toHaveLength(2);
  });
});
