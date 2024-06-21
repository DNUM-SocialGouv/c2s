export const ROLES_LIST = {
  CAISSE: 'CAISSE',
  ORGANISME_COMPLEMENTAIRE: 'ORGANISME_COMPLEMENTAIRE',
  MODERATEUR: 'MODERATEUR',
};

export type RequireAuthProps = {
  requiredRoles: Array<keyof typeof ROLES_LIST>;
};
