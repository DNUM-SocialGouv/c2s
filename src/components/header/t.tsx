import { Link } from 'react-router-dom';
type HeaderProps = {
    nomDeService: string,
    intituleOfficiel?: string[],
}
export const Header = ({ nomDeService,  }: HeaderProps) => {
    return (
        <header role="banner" className="fr-header">
            <div className="fr-header__body">
                <div className="fr-container">
                    <div className="fr-header__body-row">
                        <div className="fr-header__brand fr-enlarge-link">
                            <div className="fr-header__brand-top">
                                <div className="fr-header__logo">
                                    <p className="fr-logo">
                                        MINISTÈRE
                                        <br /> DES SOLIDARITÉS
                                        <br /> DE L’AUTONOMIE
                                        <br /> ET DES PERSONNES
                                        <br /> HANDICAPÉES
                                    </p>
                                </div>
                                <div className="fr-header__navbar">
                                    <button className="fr-btn--search fr-btn" data-fr-opened="false" aria-controls="modal-541" id="button-542" title="Rechercher">
                                        Rechercher
                                    </button>
                                    <button className="fr-btn--menu fr-btn" data-fr-opened="false" aria-controls="modal-499" aria-haspopup="menu" id="button-500" title="Menu">
                                        Menu
                                    </button>
                                </div>
                            </div>
                            <div className="fr-header__service">
                                <Link to="/home" title="Accueil - MINISTÈRE DES SOLIDARITÉS DE L’AUTONOMIE ET DES PERSONNES HANDICAPÉES">
                                    <p className="fr-header__service-title">{nomDeService} </p>
                                </Link>
                            </div>
                        </div>
                        <div className="fr-header__tools">
                            <div className="fr-header__tools-links">
                                <ul className="fr-btns-group">
                                    <li>
                                        <button className="fr-btn fr-icon-theme-fill" aria-controls="fr-theme-modal" data-fr-opened="false">Contraste</button>
                                    </li>
                                    {/* <li >
<a className="fr-btn fr-icon-contrast-fill" aria-controls="fr-theme-modal" data-fr-opened="false" href='#'> Contrast </a>
</li> */}
                                    <li>
                                        <a className="fr-btn fr-icon-question-line" href="https://mandoline.atlassian.net/servicedesk/customer/user/login?destination=portals"> Assistance & contact</a>
                                    </li>
                                    <li>
                                        <Link className="fr-btn fr-icon-account-line" to="[url - à modifier]">Mon profil</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fr-header__menu fr-modal" id="modal-499" aria-labelledby="button-505">
                <div className="fr-container">
                    <button className="fr-btn--close fr-btn" aria-controls="modal-499" title="Fermer">
                        Fermer
                    </button>
                    <div className="fr-header__menu-links">
                    </div>
                    <nav className="fr-nav" id="navigation-494" role="navigation" aria-label="Menu principal">
                        <ul className="fr-nav__list">
                            <li className="fr-nav__item">
                                <Link className="fr-nav__link" to="/creation-mandataire-individuel" target="_self">creation-mandataire-individuel</Link>
                            </li>
                            <li className="fr-nav__item">
                                <a className="fr-nav__link" href="#" target="_self">accès direct</a>
                            </li>
                            <li className="fr-nav__item">
                                <a className="fr-nav__link" href="#" target="_self">accès direct</a>
                            </li>
                            <li className="fr-nav__item">
                                <a className="fr-nav__link" href="#" target="_self">accès direct</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            {/* <div className="fr-header__menu fr-modal" id="modal-499" aria-labelledby="button-500">
<div className="fr-container">
<button className="fr-btn--close fr-btn" aria-controls="modal-499" title="Fermer">                Fermer            </button>
<div className="fr-header__menu-links">
</div>
</div>
</div> */}

        </header>
    )
}