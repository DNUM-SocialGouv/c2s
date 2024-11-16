import {
  filtersDefaultValues,
  initialValue,
  pointsAccueilDefaultData,
  siegeDefaultData,
} from '@/components/ocEtablishments/contants';
import {
  FilterParams,
  FormDataOC,
  PointAcceuilInfo,
} from '@/domain/OcEtablissements';
import { useState, createContext, ReactNode } from 'react';

export const OcEtablissementsContext = createContext<{
  count: number;
  setCount: React.Dispatch<number>;
  siegeData: FormDataOC;
  setSiegeData: React.Dispatch<FormDataOC>;
  pointsAccueilData: PointAcceuilInfo[];
  setPointsAccueilData: React.Dispatch<PointAcceuilInfo[]>;
  filters: FilterParams;
  setFilters: React.Dispatch<FilterParams>;
}>({
  count: initialValue,
  setCount: () => undefined,
  siegeData: siegeDefaultData,
  setSiegeData: () => undefined,
  pointsAccueilData: pointsAccueilDefaultData,
  setPointsAccueilData: () => undefined,
  filters: filtersDefaultValues,
  setFilters: () => undefined,
});

export const OcEtablissementsContextProvider = (props: {
  children: ReactNode;
}) => {
  const [count, setCount] = useState<number>(initialValue);
  const [siegeData, setSiegeData] = useState<FormDataOC>(siegeDefaultData);
  const [pointsAccueilData, setPointsAccueilData] = useState<
    PointAcceuilInfo[]
  >(pointsAccueilDefaultData);
  const [filters, setFilters] = useState<FilterParams>(filtersDefaultValues);

  return (
    <OcEtablissementsContext.Provider
      value={{
        count: count,
        setCount: setCount,
        siegeData: siegeData,
        setSiegeData: setSiegeData,
        pointsAccueilData: pointsAccueilData,
        setPointsAccueilData: setPointsAccueilData,
        filters: filters,
        setFilters: setFilters,
      }}
    >
      {props.children}
    </OcEtablissementsContext.Provider>
  );
};
