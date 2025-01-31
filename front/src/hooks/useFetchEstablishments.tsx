import { useState, useCallback } from 'react';
import { axiosInstance } from '../RequestInterceptor';
import { PointAcceuilInfo } from '../domain/OcEstablishments';

export interface FetchParams {
  siren: string;
  page?: number;
  size?: number;
  region?: string;
  departement?: string;
  search?: string;
}

const fetchEstablishmentsApi = async (params: FetchParams) => {
  const queryParams = new URLSearchParams({
    page: params.page?.toString() || '0',
    size: params.size?.toString() || '10',
    siren: params.siren,
    ...(params.region && { region: params.region }),
    ...(params.departement && { departement: params.departement }),
    ...(params.search && { nom: params.search }),
  });

  const response = await axiosInstance.get(
    `/oc/points-accueil?${queryParams.toString()}`,
    { withCredentials: true }
  );

  return response.data;
};

export const useFetchEstablishments = ({
  // initialParams,
  onUpdate,
}: {
  // initialParams: FetchParams;
  onUpdate: (data: {
    establishments: PointAcceuilInfo[];
    totalEstablishments: number;
    totalPages: number;
  }) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEstablishments = useCallback(
    async (params: FetchParams) => {
      if (!params.siren) {
        setError(null);
        setLoading(false); // Ensure loading state resets even if siren is missing
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await fetchEstablishmentsApi(params);
        onUpdate({
          establishments: data.content,
          totalEstablishments: data.totalElements,
          totalPages: data.totalPages,
        });
      } catch (err) {
        setError(
          'Une erreur est survenue lors de la récupération des points d’accueil.'
        );
      } finally {
        setLoading(false);
      }
    },
    [onUpdate]
  );

  // useEffect(() => {
  //   if(!initialParams.siren) return;
  //   fetchEstablishments(initialParams);
  // }, [fetchEstablishments, initialParams]);

  return { loading, error, refetch: fetchEstablishments };
};
