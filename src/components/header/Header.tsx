import '@gouvfr/dsfr/dist/dsfr/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/colors/colors.min.css';
import '@gouvfr/dsfr/dist/utility/icons/icons.min.css';
import {useNavigate} from "react-router-dom";

export const Header = () => {

    const navigate = useNavigate();

    const handleButtonRedirect = () => {
        navigate('/');
    };
    return (
        <>
            <header role="banner" className="fr-header">
                <div className="fr-header__body">
                    <div className="fr-container">
                        <div className="fr-header__body-row">
                            <div className="fr-header__brand fr-enlarge-link">
                                <div className="fr-header__brand-top">
                                    <div className="fr-header__logo">
                                        <p className="fr-logo"> Ministère du Travail <br/>de la santé et <br/> des
                                            solidarités</p>
                                    </div>
                                </div>
                                <div className="fr-header__service"><a href="/"
                                                                       title="Accueil - Complémentaire santé solidaire -  Ministère du Travail de la santé et des solidarités">
                                    <p className="fr-header__service-title"> Complémentaire santé solidaire</p></a>
                                    <p className="fr-header__service-tagline sm:block hidden">Dispositif de prise en
                                        charge de la part complémentaire des dépenses de santé</p>
                                </div>
                            </div>
                            <div className="hidden lg:flex fr-header__tools fr-text-title--blue-france">
                                <button className="fr-btn fr-btn--tertiary-no-outline" onClick={handleButtonRedirect}>
                                    <span className="fr-icon-arrow-go-back-fill"/>
                                    <span className="ml-2"> Retour au portail </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}