export interface InscriptionErrorResponseData {
  [key: string]: string | undefined;
}

export interface InscriptionErrorResponse {
  response: {
    data: InscriptionErrorResponseData;
    status: number;
  };
}

export interface iFormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  societe: string;
  groupe: string;
  siren: string;
  fonction: string;
  cguAgreement?: boolean;
  formId?: string;
  companyName?: string;
}
