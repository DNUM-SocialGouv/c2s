import { OcInfoData } from '@/domain/OcInformation';
import { axiosInstance } from '@/RequestInterceptor';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export const useFetchSiegeInfos = (email: string) => {
  const [data, setData] = useState<OcInfoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/oc?email=${email}`);
        const siegeInformations = response.data;
        setData(siegeInformations);
        setLoading(false);
      } catch (error) {
        setError(error as AxiosError);
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  return { data, loading, error };
};
