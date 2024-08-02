import { useState, createContext, ReactNode } from 'react';

const initialValue = 0;

export const PointsAcceuilParOCCountContext = createContext<{
  count: number;
  setCount: React.Dispatch<number>;
}>({
  count: initialValue,
  setCount: () => undefined,
});

export const PointsAcceuilParOCCountProvider = (props: {
  children: ReactNode;
}) => {
  const [count, setCount] = useState<number>(initialValue);

  return (
    <PointsAcceuilParOCCountContext.Provider
      value={{
        count: count,
        setCount: setCount,
      }}
    >
      {props.children}
    </PointsAcceuilParOCCountContext.Provider>
  );
};
