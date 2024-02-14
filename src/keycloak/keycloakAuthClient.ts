import {kcConfig} from './keycloakConfig.ts';
import Keycloak from 'keycloak-js';

const keycloakAuthClient = new Keycloak(
    {url: kcConfig.url, realm: kcConfig.realm, clientId: kcConfig.clientId}
);

export default keycloakAuthClient;