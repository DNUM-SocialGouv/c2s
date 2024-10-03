import { DownloadLink } from '@/components/common/dowloadLink/DowloadLink';
import './accueilLinks.css';
import { OcWelcomePageContext } from '@/contexts/OcWelcomeContext';
import { useContext } from 'react';
import { ocWelcomeDownLoadLinkMapper } from '@/utils/ocWelcomeDownLoadLink.mapper';
import { OcActiveTabContext } from '@/contexts/OcActiveTabContext';
import { InformationMessage } from '@/components/common/informationMessage/InformationMessage';
import { ACCUIEL_LINKS_WORDING } from '@/wording';

export const AccueilLinks = () => {
  const context = useContext(OcWelcomePageContext);
  const tabContext = useContext(OcActiveTabContext);
  const downloadLinks = ocWelcomeDownLoadLinkMapper(context.links);

  return (
    <div className="link__row">
      <header>
        <h3 className="oc__accueil--title--font-size oc__accueil--title--line-height">
          {ACCUIEL_LINKS_WORDING.title}
        </h3>
      </header>

      {downloadLinks.length < 1 && (
        <div className="information-message-display">
          <InformationMessage message="Cette fonctionnalité est en cours de développement" />
        </div>
      )}
      <div className="fr-grid-row">
        <ul className="link__list-display">
          {downloadLinks &&
            downloadLinks.map((linkProps, index) => (
              <li key={index} className="link__list link__list--color">
                <DownloadLink {...linkProps} />
              </li>
            ))}
          <li>
            <button
              onClick={() => tabContext.setActiveTab('2')}
              onKeyDown={() => tabContext.setActiveTab('2')}
              className="fr-btn fr-btn--tertiary"
            >
              {ACCUIEL_LINKS_WORDING.buttonText}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
