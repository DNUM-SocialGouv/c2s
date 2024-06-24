import { Separator } from '../common/svg/Seperator';
import { RessourcesHeader } from './ressourceHeader/RessourcesHeader';
import { RessourceForm } from './ressourcesForm/RessourcesForm';

export const ModeratorRessources: React.FC = () => {
  return (
    <div className="fr-container--fluid">
      <RessourcesHeader />
      <Separator />
      <RessourceForm />
    </div>
  );
};
