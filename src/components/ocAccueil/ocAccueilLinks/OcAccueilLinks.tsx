import { DownloadLink } from '@/components/common/dowloadLink/DowloadLink';
import { OC_ACCUIEL_LINKS_WORDING } from '../OcAccueilWording';
import './ocAccueilLinks.css';
import { OcWelcomePageContext } from '@/contexts/OcWelcomeContext';
import { useContext } from 'react';
import { ocWelcomeDownLoadLinkMapper } from '@/utils/ocWelcomeDownLoadLink.mapper';
import { OcActiveTabContext } from '@/contexts/OcActiveTabContext';

export const OcAccueilLinks = () => {
  const context = useContext(OcWelcomePageContext);
  const tabContext = useContext(OcActiveTabContext);
  const downloadLinks = ocWelcomeDownLoadLinkMapper(context.links);

  return (
    <div className="fr-grid-row link__row">
      <h3 className="oc__accueil--title--font-size oc__accueil--title--line-height">
        {OC_ACCUIEL_LINKS_WORDING.title}
      </h3>
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
            {OC_ACCUIEL_LINKS_WORDING.buttonText}
          </button>
        </li>
      </ul>
    </div>
  );
};
