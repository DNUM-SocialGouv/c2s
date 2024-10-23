export type OrganisationType = 'ORGANISME_COMPLEMENTAIRE' | 'CAISSE' | '';

export interface Operation {
  id: number;
  operationDate: string;
  section: string;
  groupe: 'ORGANISME_COMPLEMENTAIRE' | 'CAISSE' | '';
  membreInformations: string;
  actionType: string;
  actionLabel: string;
  membreId: number;
  entrepriseNom: string;
}
