import { FormDataOC } from '@/domain/OcInformation';
import { useState, createContext, ReactNode } from 'react';

const initialValue = 0;
const siegeDefaultData: FormDataOC = {
  locSiren: '',
  nom: '',
  email: '',
  telephone: '',
  adresse: '',
  groupe: '',
  siteWeb: '',
  ocAddedtoLPA: false,
  dateMaj: '',
  totalPAitems: 0,
};

export const OcEtablissementsContext = createContext<{
  count: number;
  setCount: React.Dispatch<number>;
  siegeData: FormDataOC;
  setSiegeData: React.Dispatch<FormDataOC>;
}>({
  count: initialValue,
  setCount: () => undefined,
  siegeData: siegeDefaultData,
  setSiegeData: () => undefined,
});

export const OcEtablissementsContextProvider = (props: {
  children: ReactNode;
}) => {
  const [count, setCount] = useState<number>(initialValue);
  const [siegeData, setSiegeData] = useState<FormDataOC>(siegeDefaultData);

  return (
    <OcEtablissementsContext.Provider
      value={{
        count: count,
        setCount: setCount,
        siegeData: siegeData,
        setSiegeData: setSiegeData,
      }}
    >
      {props.children}
    </OcEtablissementsContext.Provider>
  );
};
