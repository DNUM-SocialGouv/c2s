import { createContext } from 'react';
import '@testing-library/jest-dom';

const tabInitialValue = '2';

export const OcTabContext = createContext<{
  tab: string;
  setTab: React.Dispatch<string>;
}>({
  tab: tabInitialValue,
  setTab: () => undefined,
});

export const OcTabProvider = (props: { children: React.ReactNode }) => {
  return (
    <OcTabContext.Provider
      value={{
        tab: tabInitialValue,
        setTab: () => undefined,
      }}
    >
      {props.children}
    </OcTabContext.Provider>
  );
};
