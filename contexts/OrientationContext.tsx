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

  const windowDimensions = useWindowDimensions();

  useEffect(() => {
    setIsLandscape(windowDimensions.width > windowDimensions.height);
    setDimensions({
      width: windowDimensions.width,
      height: windowDimensions.height
    });
  }, [windowDimensions]);

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
