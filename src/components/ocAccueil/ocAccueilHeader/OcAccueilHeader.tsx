import { OC_ACCUEIL_HEADER_WORDING } from '../OcAccueilWording';

export const OcAccueilHeader = () => {
  const givenName = localStorage.getItem('givenName') ?? '';

  return (
    <div className="fr-grid-row">
      <header>
        <h2 className="oc__header--font-size">
          {OC_ACCUEIL_HEADER_WORDING.welcomeMessage} {givenName}{' '}
          {OC_ACCUEIL_HEADER_WORDING.welcomeMessageIcon}
        </h2>
      </header>
    </div>
  );
};
