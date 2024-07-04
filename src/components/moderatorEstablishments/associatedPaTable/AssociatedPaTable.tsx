import { useEffect, useState } from 'react';
import { Table } from '@/components/common/table/Table';
import { Pagination } from '@/components/common/pagination/Pagination';

type Row = [string, string, string, string];

type Rows = Row[];

const mockHeaders = ['th0', 'th1', 'th2', 'th3'];
const mockRows: Rows = [
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
  [
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
    'Lorem [...] elit ut.',
  ],
];

const PA_PER_PAGE = 10;

export const AssociatedPaTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPa, setTotalPa] = useState<number>(0);
  const [pas, setPas] = useState<Rows>([]);

  //todo: mock à supprimer
  useEffect(() => {
    setTotalPa(mockRows.length);
  }, []);

  useEffect(() => {
    setPas(
      mockRows.slice((currentPage - 1) * PA_PER_PAGE, currentPage * PA_PER_PAGE)
    );
  }, [currentPage]);

  const totalPages = Math.ceil(totalPa / PA_PER_PAGE);
  console.log('currentPage', currentPage, 'totalPages', totalPages);

  return (
    <div className="fr-container--fluid">
      <Table headers={mockHeaders} rows={pas} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          onClickPrev={() => setCurrentPage(currentPage - 1)}
          onClickNext={() => setCurrentPage(currentPage + 1)}
        />
      )}
    </div>
  );
};
