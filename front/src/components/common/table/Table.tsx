//note: actuellement le tableau n'est responsive que lorsqu'il comporte entre 2 et 10 colonnes.
import './Table.css';

interface TableProps {
  title?: string;
  headers: string[];
  rows: string[][];
  sortableColumns?: string[];
  onSort?: (field: string) => void;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}

export const Table: React.FC<TableProps> = ({
  title,
  headers,
  rows,
  sortableColumns = [],
  onSort,
  sortField,
  sortOrder,
}) => {
  const colsNumber = headers.length;

  return (
    <div
      className={`fr-table--lg fr-table fr-table table-cols-${colsNumber}`}
      id="table-lg-component"
    >
      <div className="fr-table__wrapper">
        <div className="fr-table__container">
          <div className="fr-table__content">
            <table id="table-lg">
              {title && <caption>{title}</caption>}
              <thead>
                <tr>
                  {headers.map((header, index) => {
                    const isSortable = sortableColumns.includes(header);
                    const isSorted = header === sortField;

                    return (
                      <th
                        scope="col"
                        key={index}
                        className={`table-th ${
                          isSorted ? `table-th--active ${sortOrder}` : ''
                        } ${isSortable ? 'cursor-pointer' : ''}`}
                        onClick={() => {
                          if (isSortable && onSort) {
                            onSort(header);
                          }
                        }}
                      >
                        {header}
                        {isSorted ? (
                          <span
                            className={`fr-icon ${
                              sortOrder === 'asc'
                                ? 'fr-icon-arrow-down-s-fill'
                                : 'fr-icon-arrow-up-s-fill'
                            } fr-icon--sm ml-2`}
                            aria-hidden="true"
                          ></span>
                        ) : (
                          <span
                            className={`${
                              isSortable
                                ? 'fr-icon fr-icon-arrow-down-s-fill fr-icon--inactive fr-icon--sm ml-2'
                                : ''
                            }`}
                            aria-hidden="true"
                          ></span>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    id={`table-lg-row-key-${rowIndex + 1}`}
                    data-row-key={rowIndex + 1}
                  >
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="table-td">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
