import { useMediaQuery } from '../../../hooks/useMediaQuery.tsx';
import { COMMON } from '../../../wording.ts';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onClickPrev?: () => void;
  onClickNext?: () => void;
}

const getVisiblePages = (
  currentPage: number,
  totalPages: number,
  maxPagesToShow: number = 10
) => {
  const visiblePages: (number | string)[] = [];
  const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      visiblePages.push(i);
    }
  } else {
    visiblePages.push(1);

    let startPage, endPage;

    if (currentPage <= halfMaxPagesToShow) {
      startPage = 2;
      endPage = maxPagesToShow - 1;
    } else if (currentPage + halfMaxPagesToShow >= totalPages) {
      startPage = totalPages - (maxPagesToShow - 2);
      endPage = totalPages - 1;
    } else {
      startPage = currentPage - halfMaxPagesToShow + 1;
      endPage = currentPage + halfMaxPagesToShow - 1;
    }

    if (startPage > 2) {
      visiblePages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    if (endPage < totalPages - 1) {
      visiblePages.push('...');
    }

    visiblePages.push(totalPages);
  }

  return visiblePages;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onClickPrev,
  onClickNext,
}: PaginationProps) => {
  const isMobile = useMediaQuery('(max-width: 640px)');

  const maxPagesToShow = isMobile ? 5 : 10;
  const visiblePages = getVisiblePages(currentPage, totalPages, maxPagesToShow);

  return (
    <nav
      role="navigation"
      className="fr-pagination justify-center"
      aria-label="Pagination"
    >
      <ul className="fr-pagination__list fr-pagination__list--center">
        <li>
          <button
            className={`fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label ${currentPage === 1 ? 'fr-pagination__link--lg-label--disabled' : 'fr-pagination__link--lg-label--active'}`}
            aria-disabled={currentPage === 1 ? 'true' : undefined}
            onClick={() => onClickPrev && onClickPrev()}
            disabled={currentPage === 1}
          >
            {COMMON.prevPage}
          </button>
        </li>

        {visiblePages.map((page, index) => (
          <li key={index}>
            {typeof page === 'number' ? (
              <button
                className={`fr-pagination__link ${page === currentPage ? 'fr-pagination__link--active' : 'fr-pagination__link--idle'}`}
                aria-current={page === currentPage ? 'page' : undefined}
                title={'Page ' + page}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            ) : (
              <span className="fr-pagination__link--ellipsis">{page}</span>
            )}
          </li>
        ))}
        <li>
          <button
            className={`fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label ${currentPage === totalPages ? 'fr-pagination__link--lg-label--disabled' : 'fr-pagination__link--lg-label--active'}`}
            aria-disabled={currentPage === totalPages ? 'true' : undefined}
            onClick={() => onClickNext && onClickNext()}
            disabled={currentPage === totalPages}
          >
            {COMMON.nextPage}
          </button>
        </li>
      </ul>
    </nav>
  );
};
