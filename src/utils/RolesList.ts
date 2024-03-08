export const ROLES_LIST = {
  caisse: "caisse",
  oc: "oc",
  moderateur: "moderateur",
};

export type RequireAuthProps = {
  requiredRoles: Array<keyof typeof ROLES_LIST>;
};
