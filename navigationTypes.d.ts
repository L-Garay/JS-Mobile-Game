type GameCenterScreenParamList = {
  character: string;
};

export type RootStackParamList = {
  index: undefined;
  '[...misssing]': undefined;
  'game-center/index': GameCenterScreenParamList;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
