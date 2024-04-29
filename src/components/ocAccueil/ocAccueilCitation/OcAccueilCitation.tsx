import { OC_ACCUIEL_CITATION_WORDING } from '../OcAccueilWording';

export const OcAccueilCitation = () => {
  return (
    <div>
      <h3 className="oc__accueil--title--font-size">
        {OC_ACCUIEL_CITATION_WORDING.title}
      </h3>
      <div className="fr-grid-row">
        <figure className="fr-quote fr-quote--column">
          <blockquote cite="[À MODIFIER | https://lien-vers-la-source.fr || supprimer l'attribut si pas d'url pour la source']">
            {' '}
            <p>« Lorem [...] elit ut. »</p>{' '}
          </blockquote>{' '}
          <figcaption>
            {' '}
            <p className="fr-quote__author oc__accueil--author--font-size ">
              {OC_ACCUIEL_CITATION_WORDING.author}
            </p>{' '}
            <p className="oc__accueil--quote--date--font">Date</p>
            <div className="fr-quote__image">
              {' '}
              <img
                src="/src/assets/citation-illustration.png"
                className="fr-responsive-img"
                alt="alternative"
              />{' '}
            </div>{' '}
          </figcaption>
        </figure>
      </div>
    </div>
  );
};
