import {
  OcDownLoadLinksFromAPI,
  OcAccueilCitation,
} from '../domain/OcAccueil.ts';
import { useState, createContext, ReactNode } from 'react';

const messageInitialValue: OcAccueilCitation = {
  content: '',
  updateDate: '',
};

const linksInitialValue: OcDownLoadLinksFromAPI[] = [];

export const OcWelcomePageContext = createContext<{
  message: OcAccueilCitation;
  setMessage: React.Dispatch<OcAccueilCitation>;
  links: OcDownLoadLinksFromAPI[];
  setLinks: React.Dispatch<OcDownLoadLinksFromAPI[]>;
}>({
  message: messageInitialValue,
  setMessage: () => undefined,
  links: linksInitialValue,
  setLinks: () => undefined,
});

export const OcWelcomePageProvider = (props: { children: ReactNode }) => {
  const [message, setMessage] =
    useState<OcAccueilCitation>(messageInitialValue);
  const [links, setLinks] =
    useState<OcDownLoadLinksFromAPI[]>(linksInitialValue);

  return (
    <OcWelcomePageContext.Provider
      value={{
        message: message,
        setMessage: setMessage,
        links: links,
        setLinks: setLinks,
      }}
    >
      {props.children}
    </OcWelcomePageContext.Provider>
  );
};
