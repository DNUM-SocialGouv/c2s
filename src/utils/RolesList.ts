interface RoleList {
  CAISSE: string;
  ORGANISME_COMPLEMENTAIRE: string;
  MODERATEUR: string;
}

export const ROLES_LIST: RoleList = {
  CAISSE: 'CAISSE',
  ORGANISME_COMPLEMENTAIRE: 'ORGANISME_COMPLEMENTAIRE',
  MODERATEUR: 'MODERATEUR',
};

export type RequireAuthProps = {
  pageLink: string;
  requiredRoles: Array<keyof typeof ROLES_LIST>;
};

// feature flip roles
export const FEATURE_FLIP_ROLES_LIST: RoleList = {
  CAISSE: 'caisse',
  ORGANISME_COMPLEMENTAIRE: 'oc',
  MODERATEUR: 'moderateur',
};

export const featureFlipRoles = (
  isFeatureFlipActive: boolean,
  ROLES_LIST: RoleList,
  FEATURE_FLIP_ROLES_LIST: RoleList
) => {
  return isFeatureFlipActive ? FEATURE_FLIP_ROLES_LIST : ROLES_LIST;
};
