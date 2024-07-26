import { createContext, ReactNode, useState } from 'react';

export const OcDeletePointAcceuilContext = createContext<{
  idPointAcceuilASupprimer: string;
  setIdPointAcceuilASupprimer: React.Dispatch<string>;
}>({
  idPointAcceuilASupprimer: '',
  setIdPointAcceuilASupprimer: () => undefined,
});

export const OcDeletePointAcceuilContextProvider = (props: {
  children: ReactNode;
}) => {
  const [idPointAcceuilASupprimer, setIdPointAcceuilASupprimer] =
    useState<string>('');

  return (
    <OcDeletePointAcceuilContext.Provider
      value={{
        idPointAcceuilASupprimer: idPointAcceuilASupprimer,
        setIdPointAcceuilASupprimer: setIdPointAcceuilASupprimer,
      }}
    >
      {props.children}
    </OcDeletePointAcceuilContext.Provider>
  );
};
