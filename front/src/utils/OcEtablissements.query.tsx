import { AxiosError } from 'axios';
import { FilterParams, PointAcceuilInfo } from '../domain/OcEtablissements';
import { axiosInstance } from '../RequestInterceptor';

// Points d'accueil
export async function createPointAccueilInfo(paInfo: PointAcceuilInfo) {
  try {
    await axiosInstance.post('/oc/points-accueil/create', paInfo);
  } catch (error) {
    console.error(error as AxiosError);
  }
}

export async function updatePointAccueilInfo(lpaInfo: PointAcceuilInfo) {
  try {
    await axiosInstance.put('/oc/points-accueil/update', lpaInfo);
  } catch (error) {
    console.error(error as AxiosError);
  }
}

export async function fetchPaginatedPointAccueilList(
  page: number,
  size: number,
  siren: string,
  filters: FilterParams
) {
  try {
    const response = await axiosInstance.get('/oc/points-accueil', {
      params: {
        page,
        size,
        siren,
        ...filters,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error as AxiosError);
  }
}
