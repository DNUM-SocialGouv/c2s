import { useContext, useEffect, useState } from 'react';
import { tabs } from './ModeratorPagesTabs.tsx';
import { useKeycloak } from '@react-keycloak/web';
import { LoginContext } from '../../contexts/LoginContext.tsx';

export const ModeratorPage = () => {
  const [activeTab, setActiveTab] = useState('1');

  const { keycloak } = useKeycloak();

  const { setIsLogged } = useContext(LoginContext);

  const handleClick = () => {
    setActiveTab('1');
  };

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
          setIsLogged(true);
          return result;
        });
      return '';
    };
    sendMyToken(keycloak.token!);
  }, [keycloak.token, setIsLogged]);

  return (
    <>
      <div className="mt-8">
        <ol className="fr-breadcrumb__list">
          <li>
            <a
              className="fr-breadcrumb__link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
            >
              Accueil
            </a>
          </li>
          <li>
            <span className="fr-breadcrumb__link">Espace connecté</span>
          </li>
          <li>
            <span className="fr-breadcrumb__link">Espace de modération</span>
          </li>
        </ol>
        <h1 className="fr-h1">Espace de modération</h1>
        <div className="fr-tabs">
          <ul
            className="fr-tabs__list"
            role="tablist"
            aria-label="[A modifier | nom du système d'onglet]"
          >
            {tabs.map((tab) => (
              <li
                key={tab.id}
                role="presentation"
                className={`${activeTab === tab.id ? 'text-blue-500' : 'bg-gray-100 text-gray-600'}`}
              >
                <button
                  aria-selected={activeTab === tab.id ? 'true' : 'false'}
                  className={`fr-tabs__tab ${activeTab === tab.id ? 'bg' : 'text-gray-600 '}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.title}
                </button>
              </li>
            ))}
          </ul>
          <div
            className={`fr-tabs__panel  bg-white ${activeTab ? 'fr-tabs__panel--selected' : ''}`}
          >
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </>
  );
};
