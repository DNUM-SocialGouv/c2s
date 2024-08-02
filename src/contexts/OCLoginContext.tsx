import { useState, createContext, ReactNode } from 'react';

const initialValue = false;

export const OcLoginContext = createContext<{
  isLogged: boolean;
  setIsLogged: React.Dispatch<boolean>;
}>({
  isLogged: initialValue,
  setIsLogged: () => undefined,
});

export const OcLoginProvider = (props: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState<boolean>(initialValue);

  return (
    <OcLoginContext.Provider
      value={{
        isLogged: isLogged,
        setIsLogged: setIsLogged,
      }}
    >
      {props.children}
    </OcLoginContext.Provider>
  );
};
