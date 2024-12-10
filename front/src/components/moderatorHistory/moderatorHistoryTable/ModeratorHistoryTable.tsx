import { useCallback, useEffect, useState } from 'react';
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
const sortableColumns = [COMMON.date, COMMON.user, COMMON.section];

const PAS_PER_PAGE = 10;

const apiEndpoint = (
  page: number,
  size: number,
  sortField?: string,
  sortOrder?: 'asc' | 'desc'
) => {
  let endpoint = `/moderateur/operations/search?page=${page}&size=${size}`;
  if (sortField && sortOrder) {
    const updatedSortField = COMMON.user === sortField ? 'membre' : sortField;
    endpoint += `&sortField=${updatedSortField?.toLowerCase()}&sortOrder=${sortOrder?.toLowerCase()}`;
  }
  return endpoint;
};

export const ModeratorHistoryTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalOperations, setTotalOperations] = useState<number>(0);
  const [operations, setOperations] = useState<Operation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortField, setSortField] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>('asc');

  const fetchData = useCallback(() => {
    setLoading(true);
    axiosInstance
      .get<OperationsApiResponse>(
        apiEndpoint(currentPage - 1, PAS_PER_PAGE, sortField, sortOrder),
        { withCredentials: true }
      )
      .then((response) => {
        setTotalOperations(response?.data?.count ?? 0);
        setOperations(response?.data?.list ?? []);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, sortField, sortOrder]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalPages = Math.ceil(totalOperations / PAS_PER_PAGE);

  const tableRows: string[][] = operations.map((operation) => [
    formatDate(operation.operationDate),
    operation.membreInformations,
    stringToNormalCase(operation.section),
    operation.actionLabel,
  ]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  if (loading) {
    return <div className="block min-h-screen">Chargement...</div>;
  }

  if (tableRows.length === 0) {
    return <div>Pas d'actions à afficher</div>;
  }

  return (
    <div
      className="fr-container--fluid"
      data-testid="moderator-operations-table"
    >
      <Table
        headers={tableHeaders}
        rows={tableRows}
        sortableColumns={sortableColumns}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
      />

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
