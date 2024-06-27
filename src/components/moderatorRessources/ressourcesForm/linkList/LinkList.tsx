import { DownloadLink } from '@/components/common/dowloadLink/DowloadLink';

export const LinkListForm = () => {
  return (
    <div className="form__container">
      <ul className="link__list-display">
        <li className="link__list link__list--color">
          <DownloadLink
            fileName={'Fichier'}
            fileType={'PDF'}
            fileUrl={'testUrl'}
            fileWeight={'50'}
          />
        </li>
        <li className="link__list link__list--color">
          <DownloadLink
            fileName={'Fichier'}
            fileType={'PDF'}
            fileUrl={'testUrl'}
            fileWeight={'50'}
          />
        </li>
      </ul>
    </div>
  );
};
