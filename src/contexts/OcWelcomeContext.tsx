import { OcAccueilCitationProps } from '@/components/ocAccueil/ocAccueilCitation/OcAccueilCitation';
import { OcDownLoadLinksFromAPI } from '@/utils/ocWelcomeDownLoadLink.mapper';
import { useState, createContext, ReactNode } from 'react';

const messageInitialValue: OcAccueilCitationProps = {
  content: '',
  updateDate: '',
};

const linksInitialValue: OcDownLoadLinksFromAPI[] = [];

export const OcWelcomePageContext = createContext<{
  message: OcAccueilCitationProps;
  setMessage: React.Dispatch<OcAccueilCitationProps>;
  links: OcDownLoadLinksFromAPI[];
  setLinks: React.Dispatch<OcDownLoadLinksFromAPI[]>;
}>({
  message: messageInitialValue,
  setMessage: () => undefined,
  links: linksInitialValue,
  setLinks: () => undefined,
});

export const OcWelcomePageProvider = (props: { children: ReactNode[] }) => {
  const [message, setMessage] =
    useState<OcAccueilCitationProps>(messageInitialValue);
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
