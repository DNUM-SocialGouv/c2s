import { useEffect, useState } from 'react';
import { OC_ACCUEIL_HEADER_WORDING } from '../OcAccueilWording';

export const OcAccueilHeader = () => {
  const [userName, setUserName] = useState<string>('');

useEffect(() => {
  const storage = localStorage.getItem('login')
  const userName = storage !== null ? JSON.parse(storage) : '';
  if (userName !=='') {
    setUserName(userName);
  }
}, []);
  return (
    <div className="fr-grid-row">
      <header>
        <h2>
          {OC_ACCUEIL_HEADER_WORDING.welcomeMessage} {userName}{' '}
          {OC_ACCUEIL_HEADER_WORDING.welcomeMessageIcon}
        </h2>
      </header>
    </div>
  );
};
