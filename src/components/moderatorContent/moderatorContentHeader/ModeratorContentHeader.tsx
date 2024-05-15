import { Information } from '@/components/common/svg/Information';
import './ModeratorContentHeader.css';

export const ModeratorContentHeader = () => {
  return (
    <div className="fr-grid-row">
      <header className="header header--flex">
        <Information />
        <div>
          <h3 className="oc__header--font-size mb-1">Gestion des contenus</h3>
          <p className="txt-chapo mb-0">Le mot de l'équipe C2S</p>
        </div>
      </header>
    </div>
  );
};
