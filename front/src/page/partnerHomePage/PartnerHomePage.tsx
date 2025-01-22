import { useContext, useEffect, useState } from 'react';
import InfoTab from '../infoTab/InfoTab.tsx';
import Dialog from '../../components/common/modal/Dialog.tsx';
import { OcAccueil } from '../../components/ocAccueil/OcAccueil.tsx';
import { useKeycloak } from '@react-keycloak/web';
import { ActiveTabContext } from '../../contexts/ActiveTabContext.tsx';
import { LoginContext } from '../../contexts/LoginContext.tsx';
import { EtablishmentTab } from '../etablishmentTab/EtablishmentTab.tsx';
import { PointsAcceuilParOCCountProvider } from '../../contexts/PointsAcceuilParOCCountContext.tsx';
import { OcTeamProvider } from '../../contexts/OcTeamContext.tsx';
import { OcHistory } from '../../components/ocHistory/OcHistory.tsx';
import { OcTeam } from '../../components/ocTeam/ocTeam';
import { OcRessources } from '../../components/ocRessources/OcRessources';
import { PartenaireRessourcesProvider } from '../../contexts/PartenaireRessourceContext.tsx';

interface TabInfo {
  id: string;
  title: string;
  content: JSX.Element;
}
type ActionType = (() => void) | null;

const PartnerHomePage = () => {
  const context = useContext(ActiveTabContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [currentAction, setCurrentAction] = useState<ActionType>(null);

  useEffect(() => {
    // Reset modal when switching tabs
    setCurrentAction(null);
    setModalMessage('');
    setIsModalOpen(false);
  }, [context.activeTab]);

  const setActionAndOpenModal = (action: () => void, message: string) => {
    setCurrentAction(() => action);
    setModalMessage(message);
    setIsModalOpen(true);
  };
  const confirmModalAction = () => {
    if (currentAction) {
      currentAction();
    }
    setIsModalOpen(false);
  };
  const cancelModalAction = () => {
    setIsModalOpen(false);
  };

  const tabs: TabInfo[] = [
    {
      id: '1',
      title: 'Accueil',
      content: <OcAccueil />,
    },
    {
      id: '2',
      title: 'Ressources',
      content: (
        <PartenaireRessourcesProvider>
          <OcRessources />
        </PartenaireRessourcesProvider>
      ),
    },
    {
      id: '3',
      title: 'Mes informations',
      content: <InfoTab />,
    },
    {
      id: '4',
      title: 'Mes établissements',
      content: (
        <PointsAcceuilParOCCountProvider>
          <EtablishmentTab setActionAndOpenModal={setActionAndOpenModal} />
        </PointsAcceuilParOCCountProvider>
      ),
    },
    {
      id: '5',
      title: 'Mon équipe',
      content: (
        <OcTeamProvider>
          <OcTeam />
        </OcTeamProvider>
      ),
    },
    {
      id: '6',
      title: 'Historique',
      content: <OcHistory />,
    },
  ];
  const handleClick = () => {
    context.setActiveTab('1');
  };

  const { keycloak } = useKeycloak();

  const { setIsLogged } = useContext(LoginContext);

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
            <button
              className="fr-breadcrumb__link"
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
            >
              Accueil
            </button>
          </li>
          <li>
            <span className="fr-breadcrumb__link">Espace connecté</span>
          </li>
        </ol>
        <h1 className="fr-h1">Espace connecté</h1>
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
      <Dialog
        titre="Confirmez cette action"
        description={modalMessage}
        isOpen={isModalOpen}
        onClickCancel={cancelModalAction}
        onClickConfirm={confirmModalAction}
      />
    </>
  );
};

export default PartnerHomePage;
