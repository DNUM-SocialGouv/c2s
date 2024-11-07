import { FilterParams, FormDataOC, OcInfoData } from '@/domain/OcInformation';
import { axiosInstance } from '@/RequestInterceptor';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export const useUpdateSiegeInfos = (
  ocData: FormDataOC,
  currentPage: number,
  pageSize: number,
  filters: FilterParams
) => {
  const [data, setData] = useState<OcInfoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const updateData = async () => {
      try {
        await axiosInstance.put('/oc/update', ocData);
        const response = await axiosInstance.get(`/oc?email=${ocData.email}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error as AxiosError);
        setLoading(false);
      }
    };

    updateData();
  }, [ocData, currentPage, pageSize, filters]);

  return { data, loading, error };
};
