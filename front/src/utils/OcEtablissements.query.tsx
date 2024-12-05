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

export async function updatePointAccueilInfo(paInfo: PointAcceuilInfo) {
  try {
    await axiosInstance.put('/oc/points-accueil/update', paInfo);
  } catch (error) {
    console.error(error as AxiosError);
    return error as AxiosError;
  }
}

export async function fetchPaginatedPointAccueilList(
  page: number,
  size: number,
  siren: string,
  filters: FilterParams
) {
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
    return response.data;
  } catch (error) {
    return console.error(error as AxiosError);
  }
}

export async function deletePointAccueil(id: string) {
  try {
    await axiosInstance.delete(`/oc/points-accueil/${id}`);
  } catch (error) {
    console.error(error as AxiosError);
    return error as AxiosError;
  }
}
// Filtres
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
    return error as AxiosError;
  }
}

export async function fetchDepartementData(siren: string, region?: string) {
  try {
    if (region) {
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
    } else {
      const response = await axiosInstance.get(
        '/oc/points-accueil/departements',
        {
          params: {
            siren,
          },
        }
      );
      return response.data;
    }
  } catch (error) {
    console.error(error as AxiosError);
    return error as AxiosError;
  }
}
