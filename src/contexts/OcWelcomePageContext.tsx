import { OcAccueilCitationProps } from '@/components/ocAccueil/ocAccueilCitation/OcAccueilCitation';
import { OcDownLoadLinksFromAPI } from '@/utils/ocWelcomeDownLoadLink.mapper';
import { useState, createContext, ReactNode } from 'react';

const messageInitialValue: OcAccueilCitationProps = {
  content: '',
  updateDate: '',
};

const linksInitialValue: OcDownLoadLinksFromAPI[] = [];

export const OcWelcomePageContext = createContext({});

export const OcWelcomePageProvider = (props: { children: ReactNode }) => {
  const [message, setMessage] =
    useState<OcAccueilCitationProps>(messageInitialValue);
  const [links, setLinks] =
    useState<OcDownLoadLinksFromAPI[]>(linksInitialValue);

  return (
    <OcWelcomePageContext.Provider
      value={{
        message: message,
        setMessages: setMessage,
        link: links,
        setLinks: setLinks,
      }}
    >
      {props.children}
    </OcWelcomePageContext.Provider>
  );
};
