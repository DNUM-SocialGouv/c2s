import { useCallback, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import Container from '@/components/common/container/Container';
import {
  FEATURE_FLIP_ROLES_LIST,
  ROLES_LIST,
  RequireAuthProps,
  featureFlipRoles,
} from '@/utils/RolesList.ts';

const RequireAuth = ({ requiredRoles }: RequireAuthProps) => {
  const { keycloak, initialized } = useKeycloak();
  const isAuthenticated = initialized && keycloak.authenticated;
  const userRoles = keycloak.tokenParsed?.realm_access?.roles ?? [];
  const hasRequiredRoles = useCallback(() => {
    return requiredRoles.some((role) => userRoles.includes(role));
  }, [userRoles, requiredRoles]);
  // feature flip roles
  const USED_ROLE_LIST = featureFlipRoles(
    true,
    ROLES_LIST,
    FEATURE_FLIP_ROLES_LIST
  );

  const redirectByRole = useCallback(
    (role: string[] | undefined) => {
      if (role?.includes(USED_ROLE_LIST.MODERATEUR)) {
        return '/admin/membres';
      } else if (role?.includes(USED_ROLE_LIST.ORGANISME_COMPLEMENTAIRE)) {
        return '/oc';
      } else if (role?.includes(USED_ROLE_LIST.CAISSE)) {
        return '/caisse';
      } else {
        return '/';
      }
    },
    [USED_ROLE_LIST]
  );

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
    if (keycloak.authenticated) {
      localStorage.setItem('login', keycloak.tokenParsed?.preferred_username);
      localStorage.setItem('role', userRoles[1]);
    }
  }, [keycloak, initialized, userRoles]);

  if (!isAuthenticated) {
    return (
      <div className="bg-white">
        ... we are checking your identity, please wait ...
      </div>
    );
  } else if (
    isAuthenticated &&
    requiredRoles.length > 0 &&
    !hasRequiredRoles()
  ) {
    return (
      <Navigate
        to={redirectByRole(keycloak.tokenParsed?.realm_access?.roles)}
      />
    );
  } else {
    return (
      <Container>
        <Outlet />
      </Container>
    );
  }
};

export default RequireAuth;
