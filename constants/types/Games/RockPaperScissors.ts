import { Character } from '../Character';

export type WinConditionType = 'bestOf' | 'firstTo';

export type RPSGameConfig = {
  opponnent: Character;
  difficulty: string;
  totalFists: number;
  allowDraws: boolean; // for when there are two or more fists, when enabled both players will get a point/win if they both play the same fist, when disabled the round will be a draw and no points will be awarded
  winConditionType: WinConditionType;
  requiredPoints: number;
};

// TODO figure out what this should look like
export type RPSScore = {};

export type RPSMenuProps = {
  setHasStartedGame: (hasStartedGame: boolean) => void;
};

export type RPSGameProps = {
  resetPage: () => void;
};
