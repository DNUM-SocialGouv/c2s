import { ModeratorRessourcesContext } from '../contexts/ModeratorRessourceContext';
import { ModeratorThematiqueFromAPI } from '../domain/ModeratorRessources';
import { axiosInstance } from '../RequestInterceptor';
import { useEffect, useContext } from 'react';

export const useFetchModeratorRessources = () => {
  const { setThematiques } = useContext(ModeratorRessourcesContext);

  useEffect(() => {
    const fetchRessources = async () => {
      try {
        const response = await axiosInstance.get<ModeratorThematiqueFromAPI[]>(
          '/moderateur/thematiques',
          {
            withCredentials: true,
          }
        );
        const data: ModeratorThematiqueFromAPI[] = response.data;
        setThematiques(data);
      } catch (error) {
        console.error('Error fetching ressources:', error);
      }
    };

    fetchRessources();
  }, [setThematiques]);
};
