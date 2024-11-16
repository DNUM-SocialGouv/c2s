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

// Filtres
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

export async function deletePointAccueil(
  id: string,
  siren: string,
  currentPage: number,
  pageSize: number,
  filters: FilterParams
) {
  try {
    await axiosInstance.delete('/oc/points-accueil/delete', {
      params: {
        id,
        siren,
        currentPage,
        pageSize,
        ...filters,
      },
    });
  } catch (error) {
    console.error(error as AxiosError);
  }
}

export async function fetchRegionData(siren: string) {
  try {
    const response = await axiosInstance.get('/oc/points-accueil/regions', {
      params: {
        siren,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error as AxiosError);
  }
}

export async function fetchDepartementData(siren: string, region: string) {
  try {
    const response = await axiosInstance.get(
      '/oc/points-accueil/departements',
      {
        params: {
          siren,
          region,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error as AxiosError);
  }
}
