import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const maxPageButtons = 5; // Adjusted for closer alignment with your image

  let startPage: number, endPage: number;

  if (totalPages <= maxPageButtons) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const pagesBeforeCurrent = 2; // Show 2 pages before current page
    const pagesAfterCurrent = 2; // Show 2 pages after current page

    if (currentPage <= pagesBeforeCurrent + 1) {
      startPage = 1;
      endPage = maxPageButtons;
    } else if (currentPage + pagesAfterCurrent >= totalPages) {
      startPage = totalPages - maxPageButtons + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - pagesBeforeCurrent;
      endPage = currentPage + pagesAfterCurrent;
    }
  }

  return (
    <nav
      aria-label="Pagination navigation"
      className="fr-pagination flex justify-center"
    >
      <ul className="fr-pagination__list">
        <li className="fr-pagination__item">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="fr-pagination__link"
            disabled={currentPage < 1}
          >
            Page précédente
          </button>
        </li>
        {startPage > 1 && (
          <>
            <li className="fr-pagination__item">
              <button
                onClick={() => onPageChange(1)}
                className="fr-pagination__link"
              >
                1
              </button>
            </li>
            {startPage > 2 && <li className="fr-pagination__item">...</li>}
          </>
        )}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, idx) => startPage + idx
        ).map((page) => {
          return (
            <li
              className={`fr-pagination__item ${currentPage === page - 1 ? 'fr-pagination__item--active pagination__btn--active' : ''}`}
              key={page}
            >
              <button
                onClick={() => onPageChange(page)}
                className={`fr-pagination__link ${currentPage === page - 1 ? 'fr-btn text-white' : ''}`}
              >
                {page}
              </button>
            </li>
          );
        })}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <li className="fr-pagination__item">...</li>
            )}
            <li className="fr-pagination__item">
              <button
                onClick={() => onPageChange(totalPages)}
                className="fr-pagination__link"
              >
                {totalPages}
              </button>
            </li>
          </>
        )}
        {currentPage < totalPages && (
          <li className="fr-pagination__item">
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="fr-pagination__link"
            >
              Page suivante
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
