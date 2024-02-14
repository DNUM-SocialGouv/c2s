import { useCallback, useEffect } from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import Container from '@/components/common/container/Container';
import { ROLES_LIST, RequireAuthProps } from '@/utils/RolesList.ts';

const RequireAuth = ({ requiredRoles }: RequireAuthProps) => {
    const { keycloak, initialized } = useKeycloak();
    console.log("keycloak : ", keycloak)
    const isAuthenticated = initialized && keycloak.authenticated;

    const hasRequiredRoles =  useCallback(() => {
        const userRoles =  [ROLES_LIST.Admin, "Admin", "CS"]; // keycloak?.tokenParsed?.realm_access?.roles || [] :
        console.log("keycloak roles: ", keycloak.tokenParsed?.realm_access?.roles);
        console.log("Require roles : ", requiredRoles);
        return requiredRoles.some((role: keyof typeof ROLES_LIST) => userRoles.includes(role));
    }, [JSON.stringify(requiredRoles), JSON.stringify(keycloak.tokenParsed?.realm_access?.roles)])

    const redirectByRole = (role: string[] | undefined) => {
        switch (role){
            case role?.includes(ROLES_LIST.Moderateur):
                return '/moderateur';
            case role?.includes(ROLES_LIST.Admin):
                return '/admin';
            case role?.includes(ROLES_LIST.OC):
                return '/mon-espace/OC';
            case role?.includes(ROLES_LIST.Caisse):
                return '/mon-espace/Caisse';
            default:
                return ""
        }
    }
    useEffect(()=>{
        if(initialized && !keycloak.authenticated){
            keycloak.login();
        }
    },[keycloak,initialized])

    return (
        !isAuthenticated
            ? <div>... we are checking your identity, please wait ...</div>
            : (isAuthenticated && requiredRoles.length>0 && !hasRequiredRoles())
                ? <Navigate to={redirectByRole( keycloak.tokenParsed?.realm_access?.roles)} />
                :
                <Container>
                    <Outlet/>
                </Container>
    )
};

export default RequireAuth;