import { OcAccueilCitationProps } from '@/components/ocAccueil/ocAccueilCitation/OcAccueilCitation';
import { OcDownLoadLinksFromAPI } from '@/utils/ocWelcomeDownLoadLink.mapper';
import { useState, createContext, ReactNode } from 'react';

const messageInitialValue: OcAccueilCitationProps = {
  content: '',
  updateDate: '',
};

const linksInitialValue: OcDownLoadLinksFromAPI[] = [];

export const OcWelcomePageContext = createContext<{
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   message: any | null;
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setMessage: React.Dispatch<any | null>;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   link:  any | null;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   setLinks:  React.Dispatch<any | null>;
} | null>(null);

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
        link: links,
        setLinks: setLinks,
      }}
    >
      {props.children}
    </OcWelcomePageContext.Provider>
  );
};
