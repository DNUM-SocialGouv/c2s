import '@gouvfr/dsfr/dist/dsfr/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/colors/colors.min.css';
import '@gouvfr/dsfr/dist/utility/icons/icons.min.css';

export const Header = () => {
    return (
        <>
            <header role="banner" className="fr-header">
                <div className="fr-header__body">
                    <div className="fr-container">
                        <div className="fr-header__body-row">
                            <div className="fr-header__brand fr-enlarge-link">
                                <div className="fr-header__brand-top">
                                    <div className="fr-header__logo">
                                        <p className="fr-logo"> Ministère du Travail  <br/>de la santé et <br/> des solidarités</p>
                                    </div>
                                </div>
                                <div className="fr-header__service"><a href="/"
                                                                       title="Accueil - [À MODIFIER - Nom du site / service] - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)">
                                    <p className="fr-header__service-title"> Complémentaire santé solidaire</p></a>
                                    <p className="fr-header__service-tagline">Dispositif de prise en charge de la part complémentaire des dépenses de santé</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}