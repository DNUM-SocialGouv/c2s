//import {kcConfig} from "@/keycloak/kcConfig.ts";
import { fetchKeycloakConfig } from './keycloakConfig.ts';

import { ReactKeycloakProvider } from '@react-keycloak/web';
import React, { useEffect, useState, useMemo } from 'react';
import Keycloak from 'keycloak-js';
type Props = {
  children: React.ReactNode;
};
interface KeycloakConfig {
  url: string;
  realm: string;
  clientId: string;
  onLoad: string;
}
const KeycloakInitializer = ({ children }: Props) => {
  const [keycloakConfig, setKeycloakConfig] = useState<
    KeycloakConfig | undefined
  >(undefined);

  const c2sKeycloak = useMemo(() => {
    if (keycloakConfig) {
      return new Keycloak({
        url: keycloakConfig.url,
        realm: keycloakConfig.realm,
        clientId: keycloakConfig.clientId,
      });
    }
  }, [keycloakConfig]);

  useEffect(() => {
    fetchKeycloakConfig()
      .then((kc) => {
        if (kc) {
          setKeycloakConfig({ ...kc.kc, onLoad: 'check-sso' });
        }
      })
      .catch((error) => {
        console.error('Failed to load keycloak config:', error);
      });
  }, []);
  return (
    <>
      {keycloakConfig && c2sKeycloak ? (
        <ReactKeycloakProvider
          authClient={c2sKeycloak}
          initOptions={{
            onLoad: keycloakConfig.onLoad,
          }}
        >
          {children}
        </ReactKeycloakProvider>
      ) : (
        <div>We are loading...</div>
      )}
    </>
  );
};

export default KeycloakInitializer;
