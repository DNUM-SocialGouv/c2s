import { useState, createContext, ReactNode } from 'react';

const activeTabInitialValue = '2';

export const OcActiveTabContext = createContext<{
  activeTab: string;
  setActiveTab: React.Dispatch<string>;
}>({
  activeTab: activeTabInitialValue,
  setActiveTab: () => undefined,
});

export const OcActiveTabProvider = (props: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<string>(activeTabInitialValue);

  return (
    <OcActiveTabContext.Provider
      value={{
        activeTab: activeTab,
        setActiveTab: setActiveTab,
      }}
    >
      {props.children}
    </OcActiveTabContext.Provider>
  );
};
