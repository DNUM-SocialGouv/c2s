import { OC_ACCUIEL_CITATION_WORDING } from '../OcAccueilWording';

export interface OcAccueilCitationProps {
  content: string;
  updateDate: string;
}

export const OcAccueilCitation = (props: OcAccueilCitationProps) => {
  return (
    <div>
      <h3 className="oc__accueil--title--font-size oc__accueil--title--line-height">
        {OC_ACCUIEL_CITATION_WORDING.title}
      </h3>
      <div className="fr-grid-row">
        <figure className="fr-quote fr-quote--column">
          <blockquote>
            {' '}
            <p>« {props.content} »</p>{' '}
          </blockquote>{' '}
          <figcaption>
            {' '}
            <p className="fr-quote__author oc__accueil--author--font-size ">
              {OC_ACCUIEL_CITATION_WORDING.author}
            </p>{' '}
            <p className="oc__accueil--quote--date--font">
              {' '}
              {props.updateDate}
            </p>
            <div className="fr-quote__image">
              {' '}
              <img
                src="/src/assets/citation-illustration.png"
                className="fr-responsive-img"
                alt="alternative"
                aria-hidden="true"
              />{' '}
            </div>{' '}
          </figcaption>
        </figure>
      </div>
    </div>
  );
};
