//note: actuellement le tableau n'est responsive que lorsqu'il comporte entre 2 et 10 colonnes.
import { useEffect, useState } from 'react';
import './Table.css';

interface TableProps {
  title?: string;
  headers: string[];
  rows: string[][];
  sortable?: boolean;
}

export const Table: React.FC<TableProps> = ({
  title,
  headers,
  rows,
  sortable = false,
}) => {
  const colsNumber = headers.length;

  const [sortedColumn, setSortedColumn] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortedRows, setSortedRows] = useState(rows);

  useEffect(() => {
    setSortedRows(rows);
  }, [rows]);

  const handleSort = (columnIndex: number) => {
    const isSameColumn = sortedColumn === columnIndex;
    const newSortOrder = isSameColumn && sortOrder === 'asc' ? 'desc' : 'asc';

    const sorted = [...rows].sort((a, b) => {
      if (a[columnIndex] < b[columnIndex]) {
        return newSortOrder === 'asc' ? -1 : 1;
      }
      if (a[columnIndex] > b[columnIndex]) {
        return newSortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setSortedColumn(columnIndex);
    setSortOrder(newSortOrder);
    setSortedRows(sorted);
  };

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
                  {headers.map((header, index) =>
                    sortable ? (
                      <th
                        scope="col"
                        key={index}
                        className={
                          sortedColumn === index
                            ? 'table-th table-th--active cursor-pointer'
                            : 'table-th cursor-pointer'
                        }
                        onClick={() => handleSort(index)}
                      >
                        {header}
                        <span
                          className={
                            sortOrder === 'asc'
                              ? 'fr-icon-arrow-down-s-fill fr-icon--sm ml-2'
                              : 'fr-icon-arrow-up-s-fill fr-icon--sm ml-2'
                          }
                          aria-hidden="true"
                        ></span>
                      </th>
                    ) : (
                      <th scope="col" key={index} className="table-th">
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {sortable && sortedRows
                  ? sortedRows.map((row, rowIndex) => (
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
                    ))
                  : rows.map((row, rowIndex) => (
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
