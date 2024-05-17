import { ModeratorContent } from '@/components/moderatorContent/ModeratorContent';

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
