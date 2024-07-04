// Pagination.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Pagination } from './Pagination';
import { COMMON } from '@/wording';

expect.extend(toHaveNoViolations);

describe('Pagination', () => {
  const setup = (
    currentPage: number,
    totalPages: number,
    onPageChange: jest.Mock,
    onClickPrev?: jest.Mock,
    onClickNext?: jest.Mock
  ) => {
    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
      />
    );
  };

  it('should render the component without accessibility violations', async () => {
    setup(1, 10, jest.fn());

    const pagination = screen.getByRole('navigation');
    expect(await axe(pagination)).toHaveNoViolations();
  });

  it('should render the previous and next buttons', () => {
    setup(1, 10, jest.fn());

    expect(screen.getByText(COMMON.prevPage)).toBeInTheDocument();
    expect(screen.getByText(COMMON.nextPage)).toBeInTheDocument();
  });

  it('should call onClickNext when the next button is clicked', () => {
    const onClickNext = jest.fn();
    setup(1, 10, jest.fn(), undefined, onClickNext);

    fireEvent.click(screen.getByText(COMMON.nextPage));
    expect(onClickNext).toHaveBeenCalled();
  });

  it('should call onClickPrev when the previous button is clicked', () => {
    const onClickPrev = jest.fn();
    setup(2, 10, jest.fn(), onClickPrev, undefined);

    fireEvent.click(screen.getByText(COMMON.prevPage));
    expect(onClickPrev).toHaveBeenCalled();
  });

  it('should call onPageChange when a page number is clicked', () => {
    const onPageChange = jest.fn();
    setup(1, 10, onPageChange);

    fireEvent.click(screen.getByText('2'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('should disable the next button when on the last page', () => {
    setup(10, 10, jest.fn());

    const nextButton = screen.getByText(COMMON.nextPage);
    expect(nextButton).toBeDisabled();
    expect(nextButton).toHaveAttribute('aria-disabled', 'true');
  });

  it('should disable the previous button when on the first page', () => {
    setup(1, 10, jest.fn());

    const prevButton = screen.getByText(COMMON.prevPage);
    expect(prevButton).toBeDisabled();
    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
  });

  it('should show ellipsis when there are more pages than maxPagesToShow', () => {
    setup(7, 20, jest.fn());

    expect(screen.getAllByText('...')).toHaveLength(2);
  });
});
