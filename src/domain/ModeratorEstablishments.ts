import { OrganisationType } from '@/domain/Commons';

export interface Establishment {
  nom: string;
  adresse: string;
  locSiren: string;
  organisationType?: OrganisationType;
  email: string;
  telephone: string;
  siteWeb: string;
}

export type EstablishmentType = 'OC' | 'CAISSE' | '';
