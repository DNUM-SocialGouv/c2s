import {
  filtersDefaultValues,
  initialValue,
  pointsAccueilDefaultData,
  siegeDefaultData,
} from '@/components/ocEtablishments/Contants';
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
  isPAListLoading: boolean;
  setIsPAListLoading: React.Dispatch<boolean>;
}>({
  count: initialValue,
  setCount: () => undefined,
  siegeData: siegeDefaultData,
  setSiegeData: () => undefined,
  pointsAccueilData: pointsAccueilDefaultData,
  setPointsAccueilData: () => undefined,
  filters: filtersDefaultValues,
  setFilters: () => undefined,
  isPAListLoading: false,
  setIsPAListLoading: () => undefined,
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
        isPAListLoading: false,
        setIsPAListLoading: () => undefined,
      }}
    >
      {props.children}
    </OcEtablissementsContext.Provider>
  );
};