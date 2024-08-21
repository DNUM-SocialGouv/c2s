import { useContext } from 'react';
import { OC_ACCUIEL_CITATION_WORDING } from '../OcAccueilWording';
import { OcWelcomePageContext } from '@/contexts/OcWelcomeContext';
export const OcAccueilCitation = () => {
  const context = useContext(OcWelcomePageContext);
  const message = context.message;

  return (
    <div>
      <h3 className="oc__accueil--title--font-size oc__accueil--title--line-height">
        {OC_ACCUIEL_CITATION_WORDING.title}
      </h3>
      <div className="fr-grid-row">
        <figure className="fr-quote fr-quote--column oc__accueil-fr-quote">
          <blockquote>
            {' '}
            <p>« {message.content} »</p>{' '}
          </blockquote>{' '}
          <figcaption>
            {' '}
            <p className="fr-quote__author oc__accueil--author--font-size ">
              {OC_ACCUIEL_CITATION_WORDING.author}
            </p>{' '}
            <p className="oc__accueil--quote--date--font oc__accueil-fr-quote-date-mobile">
              {' '}
              {message.updateDate}
            </p>
            <div className="fr-quote__image">
              {' '}
              <img
                src="/illustration-accueil.svg"
                className="fr-responsive-img"
                alt=""
              />
            </div>{' '}
          </figcaption>
        </figure>
      </div>
    </div>
  );
};
