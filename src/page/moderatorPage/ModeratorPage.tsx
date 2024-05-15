import { ModeratorContent } from '@/components/moderatorContent/ModeratorContent';
import { useState } from 'react';

interface TabInfo {
  id: string;
  title: string;
  content: JSX.Element;
}

export const ModeratorPage = () => {
  const [activeTab, setActiveTab] = useState('3');

  const tabs: TabInfo[] = [
    {
      id: '1',
      title: 'Accueil',
      content: <>Cet onglet est en cours de développement</>,
    },
    {
      id: '2',
      title: 'Uilisateurs',
      content: <div>Cet onglet est en cours de développement</div>,
    },
    {
      id: '3',
      title: 'Etablissements',
      content: <div>Cet onglet est en cours de développement</div>,
    },
    {
      id: '4',
      title: 'Ressources',
      content: <div>Cet onglet est en cours de développement</div>,
    },
    {
      id: '5',
      title: 'Moderateurs',
      content: <div>Cet onglet est en cours de développement</div>,
    },
    {
      id: '6',
      title: 'Contenus',
      content: <ModeratorContent />,
    },
    {
      id: '7',
      title: 'Historiques',
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
