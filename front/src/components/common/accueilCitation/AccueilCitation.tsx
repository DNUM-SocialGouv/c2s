import { useContext } from 'react';
import { OcWelcomePageContext } from '../../../contexts/OcWelcomeContext.tsx';
import illustration from './illustration-accueil.svg';
import { ACCUEIL_CITATION_WORDING } from '../../../wording.ts';

export const AccueilCitation = () => {
  const context = useContext(OcWelcomePageContext);
  const message = context.message;

  return (
    <div>
      <h3 className="oc__accueil--title--font-size oc__accueil--title--line-height">
        {ACCUEIL_CITATION_WORDING.title}
      </h3>
      <div className="fr-grid-row">
        <figure className="fr-quote fr-quote--column oc__accueil-fr-quote">
          <blockquote>
            <p>
              <span
                dangerouslySetInnerHTML={{ __html: `"${message.content}"` }}
              ></span>
            </p>
          </blockquote>
          <figcaption>
            <p className="fr-quote__author oc__accueil--author--font-size ">
              {ACCUEIL_CITATION_WORDING.author}
            </p>
            <p className="oc__accueil--quote--date--font oc__accueil-fr-quote-date-mobile">
              {message.updateDate}
            </p>
            <div className="fr-quote__image">
              <img src={illustration} className="fr-responsive-img" alt="" />
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  );
};
