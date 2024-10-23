import { QueryFilters } from '../domain/ModerateurUsers.ts';

export function usersQuery(filters: QueryFilters): string {
  const queryParameters = [];

  if (filters.statut !== undefined) {
    queryParameters.push(`statut=${filters.statut}`);
  }

  if (filters.groupe !== undefined && filters.groupe !== '') {
    queryParameters.push(`groupe=${filters.groupe}`);
  }

  if (filters.page !== undefined) {
    queryParameters.push(`page=${filters.page}`);
  }

  if (filters.size !== undefined) {
    queryParameters.push(`size=${filters.size}`);
  }

  if (filters.search !== undefined && filters.search !== '') {
    queryParameters.push(`search=${filters.search}`);
  }

  return queryParameters.length ? `?${queryParameters.join('&')}` : '';
}
