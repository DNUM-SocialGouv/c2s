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
  console.log('keycloak : ', keycloak);
  const isAuthenticated = initialized && keycloak.authenticated;
  const userRoles = keycloak.tokenParsed?.realm_access?.roles ?? [];
  const hasRequiredRoles = useCallback(() => {
    return requiredRoles.some((role) => userRoles.includes(role));
  }, [userRoles, requiredRoles]);
  // feature flip roles
  const USED_ROLE_LIST = featureFlipRoles(
    false,
    ROLES_LIST,
    FEATURE_FLIP_ROLES_LIST
  );

  const redirectByRole = useCallback((role: string[] | undefined) => {
    if (role?.includes(USED_ROLE_LIST.MODERATEUR.toString())) {
      return '/admin/membres';
    } else if (role?.includes(USED_ROLE_LIST.ORGANISME_COMPLEMENTAIRE)) {
      return '/oc';
    } else if (role?.includes(USED_ROLE_LIST.CAISSE)) {
      return '/caisse';
    } else {
      return '/';
    }
  }, []);

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
    if (keycloak.authenticated) {
      localStorage.setItem('email', keycloak.tokenParsed?.email);
      localStorage.setItem(
        'displayName',
        `${keycloak.tokenParsed?.given_name ?? ''} ${
          keycloak.tokenParsed?.family_name ?? ''
        }`
      );
    }
  }, [keycloak, initialized]);

  if (!isAuthenticated) {
    return (
      <div className="bg-white">
        ... nous vérifions votre identité, veuillez patienter ...
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
