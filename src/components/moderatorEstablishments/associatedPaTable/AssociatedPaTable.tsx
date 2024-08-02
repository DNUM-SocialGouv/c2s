import { useEffect, useState } from 'react';
import { Table } from '@/components/common/table/Table';
import { Pagination } from '@/components/common/pagination/Pagination';
import { COMMON, MODERATOR_ESTABLISHMENTS } from '@/wording';
import { axiosInstance } from '@/RequestInterceptor';
import { PA, PASApiResponse } from '@/domain/ModeratorEstablishments';

const talbeHeaders = [
  MODERATOR_ESTABLISHMENTS.establishmentName,
  COMMON.adress,
  COMMON.zipCode,
  COMMON.city,
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
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setTotalPa(response.data.count);
        setPas(response.data.list);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [establishmentId, currentPage]);

  const totalPages = Math.ceil(totalPa / PAS_PER_PAGE);

  const tableRows: string[][] = pas.map((pa) => [
    pa.nom,
    pa.adresse1,
    pa.codePostal,
    pa.ville,
    pa.email,
    pa.telephone,
  ]);

  return (
    <div className="fr-container--fluid" data-testid="associated-pa-table">
      <Table headers={talbeHeaders} rows={tableRows} />
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
