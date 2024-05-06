import {
  DownloadLink,
  DownloadLinkProps,
} from '@/components/common/dowloadLink/DowloadLink';
import { OC_ACCUIEL_LINKS_WORDING } from '../OcAccueilWording';
import './ocAccueilLinks.css';

interface OcAccueilLinksProps {
  downloadLinks: DownloadLinkProps[] | [];
}

export const OcAccueilLinks = ({ downloadLinks }: OcAccueilLinksProps) => {
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
          <button className="fr-btn fr-btn--tertiary">
            Toutes les ressources
          </button>
        </li>
      </ul>
    </div>
  );
};
