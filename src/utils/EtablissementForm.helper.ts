import { FilterParams } from '@/page/etablishmentTab/Contants';
import { axiosInstance } from '@/RequestInterceptor';

export const fetchPaginatedPointsAccueil =
  (page: number, size: number, siren: string, filters: FilterParams) =>
  async () => {
    try {
      let queryParams = `page=${page}&size=${size}`;
      if (siren) {
        queryParams += `&siren=${encodeURIComponent(siren)}`;
      }
      if (filters.searchQuery) {
        queryParams += `&nom=${encodeURIComponent(filters.searchQuery)}`;
      }
      if (filters.region) {
        queryParams += `&region=${encodeURIComponent(filters.region)}`;
      }
      if (filters.department) {
        queryParams += `&departement=${encodeURIComponent(filters.department)}`;
      }

      const response = await axiosInstance.get(
        `/oc/points-accueil?${queryParams}`
      );
      console.log('response', response.data);
      return response.data;
    } catch (error) {
      console.log('error', error);
    }
  };
