import { DownloadLink } from '@/components/common/dowloadLink/DowloadLink';

export const OcAccueilLinks = () => {
  return (
    <div className="fr-grid-row link__row">
      <ul className="link__list-display">
        <li className="link__list--color">
          <DownloadLink
            fileName={''}
            fileWeigth={''}
            fileType={''}
            fileUrl={''}
          />
        </li>
      </ul>
    </div>
  );
};
