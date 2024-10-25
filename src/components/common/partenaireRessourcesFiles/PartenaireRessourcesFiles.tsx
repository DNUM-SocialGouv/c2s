import React from 'react';
import { DownloadLink } from '../dowloadLink/DowloadLink';

export const PartenaireRessourcesFiles: React.FC = () => {
  return (
    <div>
      <h3>Titre thématique</h3>
      <p className="txt-chapo mb-0">Description thématique</p>
      <div className="pt-8 pb-8">
        <DownloadLink
          fileName={'Titre exemple'}
          fileType={'csv'}
          fileUrl={'/'}
          fileWeight={'1000000'}
        />
      </div>
    </div>
  );
};
