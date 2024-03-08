import "@gouvfr/dsfr/dist/dsfr/dsfr.min.css";
import "@gouvfr/dsfr/dist/utility/colors/colors.min.css";
import "@gouvfr/dsfr/dist/utility/icons/icons.min.css";

interface HeaderProps {
  isAuthenticated?: boolean;
  userName?: string;
  onClick: () => void;
}
export const Header: React.FC<HeaderProps> = ({
  isAuthenticated,
  userName,
  onClick,
}) => {
  return (
    <>
      <header role="banner" className="fr-header">
        <div className="fr-header__body">
          <div className="fr-container max-w-lg">
            <div className="fr-header__body-row">
              <div className="fr-header__brand fr-enlarge-link">
                <div className="fr-header__brand-top">
                  <div className="fr-header__logo">
                    <p className="fr-logo">
                      {" "}
                      Ministère
                      <br />
                      des solidarités <br />
                      et de la santé
                    </p>
                  </div>
                </div>
                <div className="fr-header__service">
                  <a
                    href="/"
                    title="Accueil - Complémentaire santé solidaire -  Ministère des solidarités et de la santé"
                  >
                    <p className="fr-header__service-title">
                      {" "}
                      Complémentaire santé solidaire
                    </p>
                  </a>
                  <p className="fr-header__service-tagline sm:block hidden">
                    Dispositif de prise en charge de la part complémentaire des
                    dépenses de santé
                  </p>
                </div>
              </div>
              <div className="ml-4 fr-header__tools">
                <div className="fr-header__tools-links">
                  <ul className="fr-btns-group">
                    <li>
                      <a
                        className="fr-btn fr-btn--tertiary-no-outline fr-icon-arrow-go-back-fill"
                        href="/"
                      >
                        Retour au portail
                      </a>
                    </li>
                    {isAuthenticated && (
                      <>
                        <li>
                          <button
                            className="fr-btn fr-fi-logout-box-r-line"
                            onClick={onClick}
                          >
                            Déconnexion
                          </button>
                        </li>
                        <li>
                          <span className="fr-btn fr-btn--tertiary fr-icon-user-line">
                            {userName}
                          </span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
