import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onClickPrev?: () => void;
  onClickNext?: () => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onClickPrev,
  onClickNext,
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      role="navigation"
      className="fr-pagination justify-center"
      aria-label="Pagination"
    >
      <ul className="fr-pagination__list fr-pagination__list--center">
        <li>
          <a
            className={`fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label ${currentPage === 1 ? 'fr-pagination__link--lg-label--disabled' : 'fr-pagination__link--lg-label--active'}`}
            aria-disabled={currentPage === 1 ? 'true' : undefined}
            href="#"
            onClick={() => onClickPrev && onClickPrev()}
          >
            Page précédente
          </a>
        </li>

        {pages.map((page) => (
          <li key={page}>
            <a
              className={`fr-pagination__link ${page === currentPage ? 'fr-pagination__link' : 'fr-pagination__link--idle'}`}
              aria-current={page === currentPage ? 'page' : undefined}
              data-fr-js-pagination-link-actionee="true"
              title={'Page ' + page}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li>
          <a
            className={`fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label ${currentPage === totalPages ? 'fr-pagination__link--lg-label--disabled' : 'fr-pagination__link--lg-label--active'}`}
            aria-disabled={currentPage === totalPages ? 'true' : undefined}
            href="#"
            onClick={() => onClickNext && onClickNext()}
          >
            Page suivante
          </a>
        </li>
      </ul>
    </nav>
  );
};
