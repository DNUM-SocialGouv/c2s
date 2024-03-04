//import {kcConfig} from "@/keycloak/kcConfig.ts";
import {fetchKeycloakConfig} from "@/keycloak/keycloakConfig.ts";


import { ReactKeycloakProvider } from '@react-keycloak/web';
import {useEffect, useState, useMemo} from "react";
import Keycloak from 'keycloak-js';
type Props = {
    children: React.ReactNode
}

const KeycloakInitializer = ({ children }: Props) => {
    const [keycloakConfig, setKeycloakConfig]= useState<{ url: any; realm: any; clientId: any; onLoad: string } | undefined>(undefined)
    const c2sKeycloak = useMemo(() => new Keycloak(
        {url: keycloakConfig?.url, realm: keycloakConfig?.realm, clientId: keycloakConfig?.clientId}
    ), [keycloakConfig])
    useEffect(()=>{
        fetchKeycloakConfig()
            .then((kc) => {
                setKeycloakConfig({...kc?.kc!, onLoad: 'check-sso'});
            })
    }, [])
    useEffect(() => {
        console.log("keycloakConfig",keycloakConfig);
        console.log("c2sKeycloak",c2sKeycloak);
    }, [keycloakConfig,c2sKeycloak]);
    return (<>
            {keycloakConfig ?
                <ReactKeycloakProvider authClient={c2sKeycloak} initOptions={keycloakConfig}>
                    {children}
                </ReactKeycloakProvider>
                :
                <div>we are loading</div>
            }
        </>
    )
};

export default KeycloakInitializer;