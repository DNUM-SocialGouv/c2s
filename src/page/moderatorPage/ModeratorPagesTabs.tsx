import { ModeratorContent } from '@/components/moderatorContent/ModeratorContent';
import { ModeratorUsers } from '@/components/moderatorUsers/ModeratorUsers';
import { ModeratorEstablishments } from '@/components/moderatorEstablishments/ModeratorEstablishments';
import { ModeratorHistory } from '@/components/moderatorHistory/ModeratorHistory';

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
    content: <ModeratorUsers />,
  },
  {
    id: '3',
    title: 'Etablissements',
    content: <ModeratorEstablishments />,
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
    title: 'Historique',
    content: <ModeratorHistory />,
  },
];
