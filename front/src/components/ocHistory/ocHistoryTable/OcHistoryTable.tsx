import { useEffect, useState } from 'react';
import { Table } from '../../common/table/Table.tsx';
import { Pagination } from '../../common/pagination/Pagination.tsx';
import { COMMON } from '../../../wording.ts';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import { Operation } from '../../../domain/Commons.ts';
import { stringToNormalCase } from '../../../utils/tests/stringToNormalCase.ts';
import { formatDate } from '../../../utils/formatDate.ts';

interface OperationsApiResponse {
  list: Operation[];
  count: number;
}

const tableHeaders = [COMMON.date, COMMON.user, COMMON.section, COMMON.action];

const PAS_PER_PAGE = 10;

const apiEndpoint = (page: number, size: number) => {
  return `/partenaire/operations?page=${page}&size=${size}`;
};

export const OcHistoryTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalOperations, setTotalOperations] = useState<number>(0);
  const [operations, setOperations] = useState<Operation[]>([]);

  useEffect(() => {
    axiosInstance
      .get<OperationsApiResponse>(apiEndpoint(currentPage - 1, PAS_PER_PAGE), {
        withCredentials: true,
      })
      .then((response) => {
        setTotalOperations(response.data.count ?? 0);
        setOperations(response.data.list ?? []);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [currentPage]);

  const totalPages = Math.ceil(totalOperations / PAS_PER_PAGE);

  const tableRows: string[][] = operations.map((operation) => [
    formatDate(operation.operationDate),
    operation.membreInformations,
    stringToNormalCase(operation.section),
    operation.actionLabel,
  ]);

  return (
    <div
      className="fr-container--fluid"
      data-testid="moderator-operations-table"
    >
      <Table headers={tableHeaders} rows={tableRows} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          onClickPrev={() => setCurrentPage(currentPage - 1)}
          onClickNext={() => setCurrentPage(currentPage + 1)}
          data-testid="pagination"
        />
      )}
    </div>
  );
};
