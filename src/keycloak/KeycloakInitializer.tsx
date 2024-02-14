import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloakAuthClient from "@/keycloak/keycloakAuthClient.ts";
import {kcConfig} from "@/keycloak/keycloakConfig.ts";

type keycloakProps = {children: React.ReactChild | React.ReactFragment | React.ReactPortal | boolean | null | undefined}
const KeycloakInitializer = ({ children }: keycloakProps) => {
    return (
        <ReactKeycloakProvider authClient={keycloakAuthClient} initOptions={kcConfig}>
            {children}
        </ReactKeycloakProvider>
    )
};

export default KeycloakInitializer;