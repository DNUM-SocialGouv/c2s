export interface PointsAcceuilFromAPI {
  totalElements: number;
  totalPages: number;
  pageable: {
    paged: boolean;
    unpaged: boolean;
    pageNumber: number;
    pageSize: number;
    offset: number;
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
  };
  size: number;
  content: PointsAcceuil[];
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface PointsAcceuil {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  adresseComplete: string;
  codePostal: string | null;
  ville: string;
  region: string;
  departement: string;
  dateMaj: string;
}
