import React, { useState } from 'react';
import { useId } from 'react';
import './Accordion.css';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export const Accordion = ({ title, children }: AccordionProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const accordionId = useId();

  return (
    <div className="fr-accordions-group">
      <section className="fr-accordion">
        <h3 className="fr-accordion__title">
          <button
            className={`fr-accordion__btn fr-accordion__btn--no-icon fr-accordion__btn--padding fr-accordion__btn--txt-blue flex justify-between items-center ${isActive ? 'fr-accordion__btn--bg-blue' : ''}`}
            aria-expanded={isActive ? 'true' : 'false'}
            aria-controls={`accordion-${accordionId}`}
            onClick={() => setIsActive(!isActive)}
          >
            {title}
            <span
              className="arrow-icon fr-icon-arrow-down-s-line"
              aria-hidden="true"
            ></span>
          </button>
        </h3>
        <div
          className={`fr-collapse fr-collapse--transition fr-collapse--max-h-full w-full ${isActive ? 'fr-collapse--expanded' : ''}`}
          id={`accordion-${accordionId}`}
        >
          {children}
        </div>
      </section>
    </div>
  );
};
