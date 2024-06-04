import { useEffect, useState } from 'react';
import { OC_ACCUEIL_HEADER_WORDING } from '../OcAccueilWording';

export const OcAccueilHeader = () => {
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const loginFromLocalStorage = localStorage.getItem('login');
    const userNameFromLocalStorage =
      loginFromLocalStorage !== null ? loginFromLocalStorage : '';
    if (userNameFromLocalStorage !== '') {
      setUserName(userNameFromLocalStorage);
    }
  }, [userName]);
  return (
    <div className="fr-grid-row">
      <header>
        <h2 className="oc__header--font-size">
          {OC_ACCUEIL_HEADER_WORDING.welcomeMessage} {userName}{' '}
          {OC_ACCUEIL_HEADER_WORDING.welcomeMessageIcon}
        </h2>
      </header>
    </div>
  );
};
