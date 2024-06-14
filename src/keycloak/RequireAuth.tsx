import { useCallback, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import Container from '@/components/common/container/Container';
import { ROLES_LIST, RequireAuthProps } from '@/utils/RolesList.ts';

const RequireAuth = ({ requiredRoles, pageLink }: RequireAuthProps) => {
  const { keycloak, initialized } = useKeycloak();
  const isAuthenticated = initialized && keycloak.authenticated;
  const userRoles = keycloak.tokenParsed?.realm_access?.roles ?? [];

  const hasRequiredRoles = useCallback(() => {
    return requiredRoles.some((role) => userRoles.includes(role));
  }, [userRoles, requiredRoles]);

  const redirectByRole = useCallback(
    (role: string[] | undefined = []) => {
      let reidrectUrl = '/';
      switch (true) {
        //moderateur
        case role?.includes(ROLES_LIST.moderateur) &&
          pageLink !== '/admin/membres':
          reidrectUrl = '/non-autorise';
          break;
        case role?.includes(ROLES_LIST.moderateur) &&
          pageLink === '/admin/membres':
          reidrectUrl = '/admin/membres';
          break;
        //oc
        case role?.includes(ROLES_LIST.oc) && pageLink !== '/oc':
          reidrectUrl = '/non-autorise';
          break;
        case role?.includes(ROLES_LIST.oc) && pageLink === '/oc':
          reidrectUrl = '/oc';
          break;
        //caisse
        case role?.includes(ROLES_LIST.oc) && pageLink !== '/caisse':
          reidrectUrl = '/non-autorise';
          break;
        case role?.includes(ROLES_LIST.oc) && pageLink === '/caisse':
          reidrectUrl = '/caisse';
          break;
      }
      return reidrectUrl;
    },
    [pageLink]
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
