//update backend errors in errors object on type
import { QueryFilters } from '@/components/moderatorEstablishments/establishments/Establishments';
import { AddEstablishmentErrorResponseData } from '@/domain/ModeratorEstablishments';

export const handleInputChange = (
  fieldNames: string[],
  setErrors: React.Dispatch<
    React.SetStateAction<AddEstablishmentErrorResponseData>
  >
) => {
  setErrors((prevErrors) => {
    const newErrors = { ...prevErrors };
    fieldNames.forEach((fieldName) => {
      delete newErrors[fieldName];
    });
    return newErrors;
  });
};

export const establishmentsSearchQuery = (filters: QueryFilters): string => {
  const queryParameters = [];

  if (filters.search !== undefined && filters.search !== '') {
    queryParameters.push(`search=${filters.search}`);
  }

  if (filters.groupe !== undefined && filters.groupe !== '') {
    queryParameters.push(`groupe=${filters.groupe}`);
  }

  if (filters.region !== undefined && filters.region !== '') {
    queryParameters.push(`region=${filters.region}`);
  }

  if (filters.departement !== undefined && filters.departement !== '') {
    queryParameters.push(`departement=${filters.departement}`);
  }

  if (filters.page !== undefined) {
    queryParameters.push(`page=${filters.page}`);
  }

  if (filters.size !== undefined) {
    queryParameters.push(`size=${filters.size}`);
  }

  return queryParameters.length ? `?${queryParameters.join('&')}` : '';
};

export const formatEndpoint = (filterParams: string) =>
  `/moderateur/etablissements/search${filterParams}`;
