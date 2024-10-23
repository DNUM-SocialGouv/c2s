import { ModeratorContent } from '../../components/moderatorContent/ModeratorContent.tsx';
import { ModeratorRessources } from '../../components/moderatorRessources/ModeratorRessources.tsx';
import { ModeratorUsers } from '../../components/moderatorUsers/ModeratorUsers.tsx';
import { ModeratorEstablishments } from '../../components/moderatorEstablishments/ModeratorEstablishments.tsx';
import { ModeratorHistory } from '../../components/moderatorHistory/ModeratorHistory.tsx';
import { UserProvider } from '../../contexts/UserContext.tsx';
import { ModeratorRessourcesProvider } from '../../contexts/ModeratorRessourceContext.tsx';

interface TabInfo {
  id: string;
  title: string;
  content: JSX.Element;
}

export const tabs: TabInfo[] = [
  {
    id: '1',
    title: 'Accueil',
    content: <>Cet onglet est en cours de développement</>,
  },
  {
    id: '2',
    title: 'Utilisateurs',
    content: (
      <UserProvider>
        <ModeratorUsers />
      </UserProvider>
    ),
  },
  {
    id: '3',
    title: 'Etablissements',
    content: <ModeratorEstablishments />,
  },
  {
    id: '4',
    title: 'Ressources',
    content: (
      <ModeratorRessourcesProvider>
        <ModeratorRessources />
      </ModeratorRessourcesProvider>
    ),
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
    title: 'Historique',
    content: <ModeratorHistory />,
  },
];
