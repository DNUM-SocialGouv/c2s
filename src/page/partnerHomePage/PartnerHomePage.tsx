import { useEffect, useState } from 'react';
import InfoTab from "@/page/infoTab/InfoTab.tsx";
import Dialog from "@/components/common/modal/Dialog.tsx";
import EtablishmentTab from '@/page/etablishmentTab/EtablishmentTab.tsx';

interface TabInfo {
  id: string;
  title: string;
  content: JSX.Element;
}
type ActionType = (() => void) | null;
const PartnerHomePage = () => {
  const [activeTab, setActiveTab] = useState("3");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [currentAction, setCurrentAction] = useState<ActionType>(null);

  useEffect(() => {
    // Reset modal when switching tabs
    setCurrentAction(null);
    setModalMessage('');
    setIsModalOpen(false);
  }, [activeTab]);

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
      id: "1",
      title: "Accueil",
      content: <div>Cet onglet est en cours de développement</div>,
    },
    {
      id: "2",
      title: "Ressources",
      content: <div>Cet onglet est en cours de développement</div>,
    },
    {
      id: "3",
      title: "Mes informations",
      content: <InfoTab setActionAndOpenModal={setActionAndOpenModal} />,
    },
    {
      id: "4",
      title: "Mes établissements",
      content: <EtablishmentTab setActionAndOpenModal={setActionAndOpenModal} />,
    },
    {
      id: "5",
      title: "Mon équipe",
      content: <div>Cet onglet est en cours de développement</div>,
    },
    {
      id: "6",
      title: "Historique",
      content: <div>Cet onglet est en cours de développement</div>,
    },
  ];
  const handleClick = () => {
    setActiveTab("1");
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
                className={`${activeTab === tab.id ? "text-blue-500" : "bg-gray-100 text-gray-600"}`}
              >
                <button
                  aria-selected={activeTab === tab.id ? "true" : "false"}
                  className={`fr-tabs__tab ${activeTab === tab.id ? "bg" : "text-gray-600 "}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.title}
                </button>
              </li>
            ))}
          </ul>
          <div
            className={`fr-tabs__panel  bg-white ${activeTab ? "fr-tabs__panel--selected" : ""}`}
          >
            {tabs.find((tab) => tab.id === activeTab)?.content}
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
