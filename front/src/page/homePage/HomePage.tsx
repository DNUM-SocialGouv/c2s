import { useContext, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { LoginContext } from '../../contexts/LoginContext.tsx';
import { CaisseAccueil } from '../../components/caisseAccueil/CaisseAccueil.tsx';
import { ActiveTabContext } from '../../contexts/ActiveTabContext.tsx';
import InfoTab from '../infoTab/InfoTab.tsx';
import { PartenaireRessourcesProvider } from '@/contexts/PartenaireRessourceContext.tsx';

interface Tabs {
  id: string;
  title: string;
  content: JSX.Element;
}

export const HomePage = () => {
  const context = useContext(ActiveTabContext);

  const { keycloak } = useKeycloak();

  const { setIsLogged } = useContext(LoginContext);

  const handleClick = () => {
    context.setActiveTab('1');
  };

  const tabs: Tabs[] = [
    {
      id: '1',
      title: 'Accueil',
      content: (
        <PartenaireRessourcesProvider>
          <CaisseAccueil />
        </PartenaireRessourcesProvider>
      ),
    },
    {
      id: '2',
      title: 'Ressources',
      content: <></>,
    },
    {
      id: '3',
      title: 'Mes informations',
      content: (
        <>
          <InfoTab />
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
                className={`${context.activeTab === tab.id ? 'text-blue-500' : 'bg-gray-100 text-gray-600'}`}
              >
                <button
                  aria-selected={
                    context.activeTab === tab.id ? 'true' : 'false'
                  }
                  className={`fr-tabs__tab ${context.activeTab === tab.id ? 'bg' : 'text-gray-600 '}`}
                  onClick={() => context.setActiveTab(tab.id)}
                >
                  {tab.title}
                </button>
              </li>
            ))}
          </ul>
          <div
            className={`fr-tabs__panel  bg-white ${context.activeTab ? 'fr-tabs__panel--selected' : ''}`}
          >
            {tabs.find((tab) => tab.id === context.activeTab)?.content}
          </div>
        </div>
      </div>
    </>
  );
};
