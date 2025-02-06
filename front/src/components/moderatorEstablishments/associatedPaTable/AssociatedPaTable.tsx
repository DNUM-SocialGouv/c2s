import { useEffect, useState } from 'react';
import { Table } from '../../common/table/Table.tsx';
import { Pagination } from '../../common/pagination/Pagination.tsx';
import { COMMON, MODERATOR_ESTABLISHMENTS } from '../../../wording.ts';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import { PA, PASApiResponse } from '../../../domain/ModeratorEstablishments.ts';

const tableHeaders = [
  MODERATOR_ESTABLISHMENTS.establishmentName,
  COMMON.adress + ' 1',
  COMMON.adress + ' 2',
  COMMON.adress + ' 3',
  COMMON.zipCode,
  COMMON.city,
  COMMON.cedex,
  COMMON.email,
  COMMON.phone,
];

const PAS_PER_PAGE = 10;

const apiEndpoint = (id: number, page: number, size: number) =>
  `/moderateur/etablissements/list?entrepriseId=${id}&page=${page}&size=${size}`;

interface AssociatedPaTableProps {
  establishmentId: number;
}

export const AssociatedPaTable = ({
  establishmentId,
}: AssociatedPaTableProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPa, setTotalPa] = useState<number>(0);
  const [pas, setPas] = useState<PA[]>([]);

  useEffect(() => {
    axiosInstance
      .get<PASApiResponse>(
        apiEndpoint(establishmentId, currentPage - 1, PAS_PER_PAGE),
        { withCredentials: true }
      )
      .then((response) => {
        setTotalPa(response.data.count);
        setPas(response.data.list || []);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [establishmentId, currentPage]);

  const tableRows: string[][] = pas.map((pa) => [
    pa.nom,
    pa.adresse,
    pa.adresse2,
    pa.adresse3,
    pa.codePostal,
    pa.ville,
    pa.cedex,
    pa.email,
    pa.telephone,
  ]);

  const totalPages = Math.ceil(totalPa / PAS_PER_PAGE);

  return (
    <div className="fr-container--fluid" data-testid="associated-pa-table">
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
