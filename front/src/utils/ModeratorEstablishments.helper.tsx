//update backend errors in errors object on type
import { QueryFilters } from '../components/moderatorEstablishments/establishments/Establishments.tsx';
import { AddEstablishmentErrorResponseData } from '../domain/ModeratorEstablishments.ts';

/**
 * When a user types in a field, remove the field from the errors object to
 * clear the error message. This is used in the AddEstablishmentForm to clear
 * errors from the backend when the user types in a field.
 * @param fieldNames The names of the fields to remove from the errors object
 * @param setErrors The function to update the errors object
 */
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
