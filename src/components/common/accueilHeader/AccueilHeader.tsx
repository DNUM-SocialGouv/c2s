import { ACCUEIL_HEADER_WORDING } from '@/wording';

export const AccueilHeader = () => {
  const givenName = localStorage.getItem('givenName') ?? '';

  return (
    <div className="fr-grid-row">
      <header>
        <h2 className="oc__header--font-size">
          {ACCUEIL_HEADER_WORDING.welcomeMessage} {givenName}{' '}
          {ACCUEIL_HEADER_WORDING.welcomeMessageIcon}
        </h2>
      </header>
    </div>
  );
};
