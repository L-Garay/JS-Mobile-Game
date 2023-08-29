type GameCenterScreenParamList = {
  characterName: string;
};

export type RootStackParamList = {
  index: undefined;
  '[...misssing]': undefined;
  'game-center/index': GameCenterScreenParamList;
  'game-center/GAME1': undefined;
  'game-center/GAME2': undefined;
  'game-center/GAME3': undefined;
  'game-center/GAME4': undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
