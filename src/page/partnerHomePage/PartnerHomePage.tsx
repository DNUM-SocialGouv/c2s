import { useState } from 'react';
import InfoTab from '@/page/infoTab/InfoTab.tsx';
import Dialog from '@/components/common/modal/Dialog.tsx';
import { useDeleteAccount } from '@/hooks/useDeleteAccount.tsx';
import { OcAccueil } from '@/components/ocAccueil/OcAccueil';
import { OcWelcomePageProvider } from '@/contexts/OcWelcomeContext';

interface TabInfo {
  id: string;
  title: string;
  content: JSX.Element;
}

const PartnerHomePage = () => {
  const [activeTab, setActiveTab] = useState('3');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteAction } = useDeleteAccount();
  const openModal = () => setIsModalOpen(true);

  const setActionAndOpenModal = () => {
    openModal();
  };
  const tabs: TabInfo[] = [
    {
      id: '1',
      title: 'Accueil',
      content: (
        <OcWelcomePageProvider>
          <OcAccueil />,
        </OcWelcomePageProvider>
      ),
    },
    {
      id: '2',
      title: 'Ressources',
      content: <div>Cet onglet est en cours de développement</div>,
    },
    {
      id: '3',
      title: 'Mes informations',
      content: <InfoTab setActionAndOpenModal={setActionAndOpenModal} />,
    },
    {
      id: '4',
      title: 'Mes établissements',
      content: <div>Cet onglet est en cours de développement</div>,
    },
    {
      id: '5',
      title: 'Mon équipe',
      content: <div>Cet onglet est en cours de développement</div>,
    },
    {
      id: '6',
      title: 'Historique',
      content: <div>Cet onglet est en cours de développement</div>,
    },
  ];
  const handleClick = () => {
    setActiveTab('1');
  };
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
      <Dialog
        titre="Confirmez cette action"
        description="Vous êtes sur le point de supprimer votre compte de l'espace Partenaire"
        isOpen={isModalOpen}
        onClickCancel={() => setIsModalOpen(false)}
        onClickConfirm={() => {
          deleteAction();
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export default PartnerHomePage;
