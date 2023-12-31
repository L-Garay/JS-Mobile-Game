import {
  RPSGameConfig,
  RPSScore
} from 'constants/types/Games/RockPaperScissors';
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode
} from 'react';

export interface RPSContextProps {
  currentGameConfig: RPSGameConfig;
  setCurrentGameConfig: React.Dispatch<React.SetStateAction<RPSGameConfig>>;
}

export const RPSContext = createContext<RPSContextProps>({
  currentGameConfig: {} as RPSGameConfig,
  setCurrentGameConfig: () => {}
});

export const RockPaperScissorsProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [currentGameConfig, setCurrentGameConfig] = useState<RPSGameConfig>(
    {} as RPSGameConfig
  );
  const [currentScore, setCurrentScore] = useState<RPSScore | null>(null);

  useEffect(() => {
    if (currentGameConfig) {
      setCurrentScore({
        player: 0,
        computer: 0
      });
      console.log('currentGameConfig', currentGameConfig);
    }
  }, [currentGameConfig]);

  const state = {
    currentGameConfig,
    setCurrentGameConfig
  };
  return <RPSContext.Provider value={state}>{children}</RPSContext.Provider>;
};

const useRPSContext = () => useContext(RPSContext);

export default useRPSContext;
