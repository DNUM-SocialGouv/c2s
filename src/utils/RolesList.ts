export const ROLES_LIST = {
  caisse: 'caisse',
  oc: 'oc',
  moderateur: 'moderateur',
};

export type RequireAuthProps = {
  pageLink: string;
  requiredRoles: Array<keyof typeof ROLES_LIST>;
};
