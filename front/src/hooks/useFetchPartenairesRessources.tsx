import { axiosInstance } from '../RequestInterceptor';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export const useFetchPartenairesRessources = () => {
  // TODO: mutualiser les interfaces de l'endpoint welcome et ressource pour les 3 profils
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/partenaire/ressources');
        const partenairesRessourcesFromAPI = response.data;
        setData(partenairesRessourcesFromAPI);
        setLoading(false);
      } catch (error) {
        setError(error as AxiosError);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
