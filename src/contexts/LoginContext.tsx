import { useState, createContext, ReactNode } from 'react';

const initialValue = false;

export const LoginContext = createContext<{
  isLogged: boolean;
  setIsLogged: React.Dispatch<boolean>;
}>({
  isLogged: initialValue,
  setIsLogged: () => undefined,
});

export const LoginProvider = (props: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState<boolean>(initialValue);

  return (
    <LoginContext.Provider
      value={{
        isLogged: isLogged,
        setIsLogged: setIsLogged,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
