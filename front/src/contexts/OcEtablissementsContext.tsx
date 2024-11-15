import { FormDataOC, PointAcceuilInfo } from '@/domain/OcEtablissements';
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

const pointsAccueilDefaultData: PointAcceuilInfo[] = [
  {
    id: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    adresse2: '',
    adresse3: '',
    adresseComplete: '',
    cedex: '',
    codePostal: '75001',
    ville: 'paris',
    region: 'Île-de-France',
    departement: 'Paris',
    dateMaj: '15 nov. 2024',
  },
];

export const OcEtablissementsContext = createContext<{
  count: number;
  setCount: React.Dispatch<number>;
  siegeData: FormDataOC;
  setSiegeData: React.Dispatch<FormDataOC>;
  pointsAccueilData: PointAcceuilInfo[];
  setPointsAccueilData: React.Dispatch<PointAcceuilInfo[]>;
}>({
  count: initialValue,
  setCount: () => undefined,
  siegeData: siegeDefaultData,
  setSiegeData: () => undefined,
  pointsAccueilData: pointsAccueilDefaultData,
  setPointsAccueilData: () => undefined,
});

export const OcEtablissementsContextProvider = (props: {
  children: ReactNode;
}) => {
  const [count, setCount] = useState<number>(initialValue);
  const [siegeData, setSiegeData] = useState<FormDataOC>(siegeDefaultData);

  const [pointsAccueilData, setPointsAccueilData] = useState<
    PointAcceuilInfo[]
  >(pointsAccueilDefaultData);

  return (
    <OcEtablissementsContext.Provider
      value={{
        count: count,
        setCount: setCount,
        siegeData: siegeData,
        setSiegeData: setSiegeData,
        pointsAccueilData: pointsAccueilData,
        setPointsAccueilData: setPointsAccueilData,
      }}
    >
      {props.children}
    </OcEtablissementsContext.Provider>
  );
};
