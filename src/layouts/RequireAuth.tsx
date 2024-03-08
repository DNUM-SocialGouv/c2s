import { useCallback, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import Container from "@/components/common/container/Container";
import { ROLES_LIST, RequireAuthProps } from "@/utils/RolesList.ts";

const RequireAuth = ({ requiredRoles }: RequireAuthProps) => {
  const { keycloak, initialized } = useKeycloak();
  console.log("keycloak : ", keycloak)
  const isAuthenticated = initialized && keycloak.authenticated;
  const userRoles = keycloak.tokenParsed?.realm_access?.roles ?? [];

  const hasRequiredRoles = useCallback(() => {
    return requiredRoles.some(role => userRoles.includes(role));
  }, [userRoles, requiredRoles]);

  const redirectByRole = useCallback((role: string[] | undefined) => {
    if (role?.includes(ROLES_LIST.moderateur.toString())) {
      return "/admin/membres";
    } else if (role?.includes(ROLES_LIST.oc)) {
      return "/oc";
    } else if (role?.includes(ROLES_LIST.caisse)) {
      return "/caisse";
    } else {
      return "/";
    }
  }, []);

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
    if (keycloak.authenticated) {
      localStorage.setItem("login", keycloak.tokenParsed?.preferred_username);
    }
  }, [keycloak, initialized]);

  if (!isAuthenticated) {
    return <div className="bg-white">... we are checking your identity, please wait ...</div>;
  } else if (isAuthenticated && requiredRoles.length > 0 && !hasRequiredRoles()) {
    return <Navigate to={redirectByRole(keycloak.tokenParsed?.realm_access?.roles)} />;
  } else {
    return (
        <Container>
          <Outlet />
        </Container>
    );
  }
};

export default RequireAuth;