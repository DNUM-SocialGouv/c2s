import { useState, createContext, ReactNode } from 'react';

const activeTabInitialValue = '1';

export const ActiveTabContext = createContext<{
  activeTab: string;
  setActiveTab: React.Dispatch<string>;
}>({
  activeTab: activeTabInitialValue,
  setActiveTab: () => undefined,
});

export const ActiveTabProvider = (props: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<string>(activeTabInitialValue);

  return (
    <ActiveTabContext.Provider
      value={{
        activeTab: activeTab,
        setActiveTab: setActiveTab,
      }}
    >
      {props.children}
    </ActiveTabContext.Provider>
  );
};
