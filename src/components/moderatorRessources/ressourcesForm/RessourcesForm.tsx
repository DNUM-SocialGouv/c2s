import { useEffect, useState } from 'react';
import './RessourcesForm.css';
import { ThematiquesForm } from './thematiquesForm/ThematiquesForm';
import { useKeycloak } from '@react-keycloak/web';

export const RessourceForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { keycloak } = useKeycloak();

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
    <>
      {isLoggedIn ? (
        <ThematiquesForm />
      ) : (
        <div className="fr-container">
          <p className="fr-text--lg">
            Veuillez vous connecter pour accéder à cette fonctionnalité
          </p>
        </div>
      )}
    </>
  );
};
