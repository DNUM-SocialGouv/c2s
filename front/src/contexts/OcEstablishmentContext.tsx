import { createContext, useEffect, useState, useCallback } from 'react';
import {
  useFetchEstablishments,
  FetchParams,
} from '../hooks/useFetchEstablishments';
import { PointAcceuilInfo } from '../domain/OcEstablishments';

interface OcEstablishmentContextProps {
  establishments: PointAcceuilInfo[];
  totalEstablishments: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  siren: string;
  region: string;
  setRegion: (region: string) => void;
  departement: string;
  setDepartement: (departement: string) => void;
  setSiren: (siren: string) => void;
  search: string;
  setSearch: (search: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  refetchEstablishments: (params: FetchParams) => Promise<void>;
  resetEstablishments: () => void;
}

export const OcEstablishmentContext = createContext<
  OcEstablishmentContextProps | undefined
>(undefined);

export const OcEstablishmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [establishments, setEstablishments] = useState<PointAcceuilInfo[]>([]);
  const [totalEstablishments, setTotalEstablishments] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [siren, setSiren] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [departement, setDepartement] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  // const initialParams = useMemo(() => ({ siren, page: 0, size: 10 }), [siren]);

  const onUpdate = useCallback(
    ({
      establishments,
      totalEstablishments,
      totalPages,
    }: {
      establishments: PointAcceuilInfo[];
      totalEstablishments: number;
      totalPages: number;
    }) => {
      setEstablishments(establishments);
      setTotalEstablishments(totalEstablishments);
      setTotalPages(totalPages);
    },
    []
  );

  const { loading, error, refetch } = useFetchEstablishments({
    // initialParams,
    onUpdate,
  });

  useEffect(() => {
    if (siren) {
      refetch({ siren, page: currentPage - 1, size: 10 });
    }
  }, [currentPage, siren, refetch]);

  const resetEstablishments = () => {
    setCurrentPage(1);
    setDepartement('');
    setRegion('');
    setSearch('');
    refetch({ siren, page: 0, size: 10 });
  };

  return (
    <OcEstablishmentContext.Provider
      value={{
        establishments,
        totalEstablishments,
        loading,
        error,
        refetchEstablishments: refetch, // Directly use refetch
        resetEstablishments,
        siren,
        setSiren,
        region,
        setRegion,
        departement,
        setDepartement,
        search,
        setSearch,
        totalPages,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </OcEstablishmentContext.Provider>
  );
};
