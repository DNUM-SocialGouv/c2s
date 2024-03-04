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
        const userRoles = keycloak?.tokenParsed?.realm_access?.roles || [] ;
        console.log("keycloak roles: ", keycloak.tokenParsed?.realm_access?.roles);
        console.log("Require roles : ", requiredRoles);
        return requiredRoles.some((role: keyof typeof ROLES_LIST) => userRoles.includes(role));
    }, [JSON.stringify(requiredRoles), JSON.stringify(keycloak.tokenParsed?.realm_access?.roles)])

    const redirectByRole = (role: string[] | undefined) => {
        console.log("role : ",role);
        console.log(role?.includes(ROLES_LIST.Moderateur.toString()));
        console.log("role moderateur : ",ROLES_LIST.Moderateur.toString());
        //switch (role){
            if( role?.includes(ROLES_LIST.Moderateur.toString())) {
                return '/moderateur';
            } else if ( role?.includes(ROLES_LIST.Admin)){
                 return '/admin';
            }else if ( role?.includes(ROLES_LIST.OC)){
                return '/mon-espace/OC';
            } else if ( role?.includes(ROLES_LIST.Caisse)) {
                return '/mon-espace/Caisse';
            }else{
                return "";
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