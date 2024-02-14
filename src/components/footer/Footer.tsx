import '@gouvfr/dsfr/dist/dsfr/dsfr.min.css';
import '@gouvfr/dsfr/dist/utility/colors/colors.min.css';
import '@gouvfr/dsfr/dist/utility/icons/icons.min.css';
export const Footer = () => {
    return (
    <>
        <footer className="fr-footer sm:block hidden" role="contentinfo" id="footer">
            <div className="fr-container">
                <div className="fr-footer__body">
                    <div className="fr-footer__brand fr-enlarge-link">
                        <a href="/"
                           title="Retour à l’accueil du site - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)">
                            <p className="fr-logo"> Ministère du Travail <br/>de la santé et <br/> des solidarités</p>
                        </a>
                    </div>
                    <div className="fr-footer__content">
                    <p className="fr-footer__content-desc">La complémentaire santé solidaire (C2S) peut vous aider pour vos dépenses de santé si vous avez des ressources modestes.
                        Elles sont entièrement remboursées dans la limite des tarifs de la sécurité sociale. </p>
                        <ul className="fr-footer__content-list">
                            <li className="fr-footer__content-item">
                                <a className="fr-footer__content-link" target="_blank" rel="noopener external" title="https://legifrance.gouv.fr - nouvelle fenêtre" href="https://legifrance.gouv.fr">legifrance.gouv.fr</a>
                            </li>
                            <li className="fr-footer__content-item">
                                <a className="fr-footer__content-link" target="_blank" rel="noopener external" title="https://gouvernement.fr - nouvelle fenêtre" href="https://gouvernement.fr">gouvernement.fr</a>
                            </li>
                            <li className="fr-footer__content-item">
                                <a className="fr-footer__content-link" target="_blank" rel="noopener external" title="https://service-public.fr - nouvelle fenêtre" href="https://service-public.fr">service-public.fr</a>
                            </li>
                            <li className="fr-footer__content-item">
                                <a className="fr-footer__content-link" target="_blank" rel="noopener external" title="https://data.gouv.fr - nouvelle fenêtre" href="https://data.gouv.fr">data.gouv.fr</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="fr-footer__bottom">
                    <ul className="fr-footer__bottom-list">
                        <li className="fr-footer__bottom-item">
                            <a className="fr-footer__bottom-link" href="/sitemap">Plan du site</a>
                        </li>
                        <li className="fr-footer__bottom-item">
                            <a className="fr-footer__bottom-link" href="/accessibilite">Accessibilité</a>
                        </li>
                        <li className="fr-footer__bottom-item">
                            <a className="fr-footer__bottom-link" href="/mentions-legales">Mentions légales</a>
                        </li>
                        <li className="fr-footer__bottom-item">
                            <a className="fr-footer__bottom-link" href="/donnees-personnelles">Données personnelles</a>
                        </li>
                        <li className="fr-footer__bottom-item">
                            <a className="fr-footer__bottom-link" href="#">Gestion des cookies</a>
                        </li>
                    </ul>
                    <div className="fr-footer__bottom-copy">
                        <p>Sauf mention explicite de propriété intellectuelle détenue par des tiers, les contenus de ce site sont proposés sous <a href="https://github.com/etalab/licence-ouverte/blob/master/LO.md" target="_blank" rel="noopener external" title="[À MODIFIER - Intitulé] - nouvelle fenêtre">licence etalab-2.0</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </>
    )
}

