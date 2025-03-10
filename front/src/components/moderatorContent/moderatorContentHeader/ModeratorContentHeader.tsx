import { Information } from '../../common/svg/Information.tsx';
import './ModeratorContentHeader.css';
import { MODERATOR_CONTENT } from '../../../wording.ts';

export const ModeratorContentHeader = () => {
  return (
    <div className="fr-grid-row">
      <header className="header header--flex">
        <Information />
        <div>
          <h3 className="oc__header--font-size mb-1">
            {MODERATOR_CONTENT.pageTitle}
          </h3>
          <p className="txt-chapo mb-0">{MODERATOR_CONTENT.pageDetail}</p>
        </div>
      </header>
    </div>
  );
};
