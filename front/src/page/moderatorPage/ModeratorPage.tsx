import { useContext, useEffect } from 'react';
import { tabs } from './ModeratorPagesTabs.tsx';
import { useKeycloak } from '@react-keycloak/web';
import { LoginContext } from '../../contexts/LoginContext.tsx';
import { ActiveTabContext } from '../../contexts/ActiveTabContext';
import { ModeratorEstablishmentsProvider } from '@/contexts/ModeratorEstablishmentsContext.tsx';

export const ModeratorPage = () => {
  // const [activeTab, setActiveTab] = useState('1');
  const context = useContext(ActiveTabContext);

  const { keycloak } = useKeycloak();

  const { setIsLogged } = useContext(LoginContext);

  const handleClick = () => {
    context.setActiveTab('1');
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
          {/* Obliger de wrapper à ce niveau pour partager le state entre Tab 1 & 3*/}
          <ModeratorEstablishmentsProvider>
            <div
              className={`fr-tabs__panel  bg-white ${context.activeTab ? 'fr-tabs__panel--selected' : ''}`}
            >
              {tabs.find((tab) => tab.id === context.activeTab)?.content}
            </div>
          </ModeratorEstablishmentsProvider>
        </div>
      </div>
    </>
  );
};
