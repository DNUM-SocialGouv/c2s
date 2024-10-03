import { useContext, useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { LoginContext } from '@/contexts/LoginContext';
import { InformationMessage } from '@/components/common/informationMessage/InformationMessage';

interface Tabs {
  id: string;
  title: string;
  content: JSX.Element;
}

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState('3');

  const { keycloak } = useKeycloak();

  const { setIsLogged } = useContext(LoginContext);

  const handleClick = () => {
    setActiveTab('1');
  };

  const tabs: Tabs[] = [
    {
      id: '1',
      title: 'Accueil',
      content: (
        <>
          <InformationMessage message="Cette fonctionnalité est en cours de développement" />
        </>
      ),
    },
    {
      id: '2',
      title: 'Ressources',
      content: (
        <>
          <InformationMessage message="Cette fonctionnalité est en cours de développement" />
        </>
      ),
    },
    {
      id: '3',
      title: 'Mes informations',
      content: (
        <>
          <InformationMessage message="Cette fonctionnalité est en cours de développement" />
        </>
      ),
    },
  ];

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
            <span className="fr-breadcrumb__link">Espace Caisse</span>
          </li>
        </ol>
        <h1 className="fr-h1">Espace Caisse</h1>
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
