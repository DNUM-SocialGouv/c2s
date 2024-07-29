//note: actuellement le tableau n'est responsive que lorsqu'il comporte entre 2 et 8 colonnes.
import './Table.css';

interface TableProps {
  title?: string;
  headers: string[];
  rows: string[][];
}

export const Table: React.FC<TableProps> = ({ title, headers, rows }) => {
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
                  {headers.map((header, index) => (
                    <th scope="col" key={index} className="table-th">
                      {header}
                    </th>
                  ))}
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
