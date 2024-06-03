import { useEffect, useState } from 'react';
import { Separator } from '../common/svg/Seperator';
import { EditorCaisse } from './editorCaisse/EditorCaisse';
import { EditorOc } from './editorOc/EditorOc';
import { ModeratorContentHeader } from './moderatorContentHeader/ModeratorContentHeader';
import { useKeycloak } from '@react-keycloak/web';

export const ModeratorContent = () => {
  const { keycloak } = useKeycloak();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const sendMyToken = (token: string) => {
      let result: boolean | null;

      fetch('/api/public/login', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        credentials: 'include',
        body: token,
      })
        .then(() => {
          result = true;
        })
        .catch(() => {
          result = false;
        })
        .finally(() => {
          return result;
        });
      return '';
    };
    sendMyToken(keycloak.token!);
    if (keycloak.token) {
      setIsLoggedIn(true);
    }
  }, [keycloak.token]);

  return (
    <div className="fr-container--fluid">
      <ModeratorContentHeader />
      <Separator />
      {isLoggedIn ? (
        <EditorCaisse />
      ) : (
        <div className="fr-container">
          <p className="fr-text--lg">
            Veuillez vous connecter pour accéder à cette fonctionnalité
          </p>
        </div>
      )}
      <Separator className="my-[32px] md:my-[55px] " />

      {isLoggedIn ? (
        <EditorOc />
      ) : (
        <div className="fr-container">
          <p className="fr-text--lg">
            Veuillez vous connecter pour accéder à cette fonctionnalité
          </p>
        </div>
      )}
    </div>
  );
};
