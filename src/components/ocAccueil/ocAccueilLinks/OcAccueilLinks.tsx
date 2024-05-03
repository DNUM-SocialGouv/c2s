import { DownloadLink } from '@/components/common/dowloadLink/DowloadLink';
import { OC_ACCUIEL_LINKS_WORDING } from '../OcAccueilWording';
import './ocAccueilLinks.css';

export const OcAccueilLinks = () => {
  return (
    <div className="fr-grid-row link__row">
      <h3 className="oc__accueil--title--font-size oc__accueil--title--line-height">
        {OC_ACCUIEL_LINKS_WORDING.title}
      </h3>
      <ul className="link__list-display">
        <li className="link__list link__list--color">
          <DownloadLink
            fileName={''}
            fileWeigth={''}
            fileType={''}
            fileUrl={''}
          />
        </li>
        <button className="fr-btn fr-btn--tertiary">
          Toutes les ressources
        </button>
      </ul>
    </div>
  );
};
