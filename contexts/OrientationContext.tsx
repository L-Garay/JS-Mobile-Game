import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode
} from 'react';
import { useWindowDimensions } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

export interface OrientationContextProps {
  isLandscape: boolean;
  dimensions: Record<string, number>;
  setOrientation: (orientation: ScreenOrientation.OrientationLock) => void;
}

export const OrientationContext = createContext<OrientationContextProps>({
  isLandscape: false,
  dimensions: { width: 0, height: 0 },
  setOrientation: () => {}
});

export const OrientationProvider = ({ children }: { children: ReactNode }) => {
  const [isLandscape, setIsLandscape] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<Record<string, number>>({
    width: 0,
    height: 0
  });
  const data = useWindowDimensions();

  useEffect(() => {
    setIsLandscape(data.width > data.height);
    setDimensions({ width: data.width, height: data.height });
  }, [data]);

  const setOrientation = async (
    orientation: ScreenOrientation.OrientationLock
  ) => {
    await ScreenOrientation.unlockAsync();
    await ScreenOrientation.lockAsync(orientation);
  };

  const state = {
    isLandscape,
    dimensions,
    setOrientation
  };

  return (
    <OrientationContext.Provider value={state}>
      {children}
    </OrientationContext.Provider>
  );
};

const useOrientationContext = () => useContext(OrientationContext);

export default useOrientationContext;
