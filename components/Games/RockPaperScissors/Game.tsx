import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, Pressable } from 'react-native';
import { useNavigation } from 'expo-router';
import useRPSContext from '../../../contexts/RockPaperScissorsContext';
import useCharacterContext from '../../../contexts/CharacterContext';
import { RPSGameProps } from '../../../constants/types/Games/RockPaperScissors';
import { getWinCondition } from '../../../constants/configs/Games/RockPaperScissors';
import { ICONS } from '../../../constants/Configs';
// TODO figure out why these paths produce an error, YET the images still display
// @ts-ignore
import RightFacingFistXLCropped from '../../../assets/images/right-facing-fistXL-cropped.png';
// @ts-ignore
import LeftFacingFistXLCropped from '../../../assets/images/left-facing-fistXL-cropped.png';
// @ts-ignore
import RightFacingFistLGCropped from '../../../assets/images/right-facing-fistLG-cropped.png';
// @ts-ignore
import LeftFacingFistLGCropped from '../../../assets/images/left-facing-fistLG-cropped.png';
import SimpleButton from '../../../components/Buttons/SimpleButton';

const POSSIBLE_SELECTIONS = [
  {
    name: 'Rock',
    value: 'rock'
  },
  {
    name: 'Paper',
    value: 'paper'
  },
  {
    name: 'Scissors',
    value: 'scissors'
  }
];

const RockPaperScissorsGame = ({ resetPage }: RPSGameProps) => {
  const { currentCharacter, characterIcon } = useCharacterContext();
  const { currentGameConfig } = useRPSContext();
  const navigation = useNavigation();
  const [userPoints, setUserPoints] = useState<number>(0);
  const [opponentPoints, setOpponentPoints] = useState<number>(0);
  const [userSelections, setUserSelections] = useState<string[]>([]);

  useEffect(() => {
    if (!currentGameConfig) {
      Alert.alert(
        'No game configuration was found.',
        'Please retry from the game setup menu.',
        [
          {
            text: 'OK',
            onPress: () => {
              resetPage();
            }
          }
        ]
      );
    }
    if (!currentCharacter) {
      Alert.alert(
        'No character was found.',
        'Please retry from the character selection menu.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('index');
            }
          }
        ]
      );
    }
    if (!characterIcon) {
      // TODO: figure out how to handle this situation
      // do we provide a default icon?
      // do we force the user to select a new icon?
    }
  }, [currentCharacter, currentGameConfig, characterIcon]);

  const contentReady = currentCharacter && currentGameConfig && characterIcon;

  // create an array filled with random string, representing the number of fists selected
  // to be used to iterate over and display the fists
  const fists =
    currentGameConfig?.totalFists === 2 ? ['fist', 'fist'] : ['fist'];
  const rightFistImage =
    currentGameConfig?.totalFists === 2
      ? RightFacingFistLGCropped
      : RightFacingFistXLCropped;
  const leftFistImage =
    currentGameConfig?.totalFists === 2
      ? LeftFacingFistLGCropped
      : LeftFacingFistXLCropped;

  return (
    <View style={styles.gameContainer}>
      {contentReady ? (
        <>
          {/* top row holds the user's info, game info, and opponent info */}
          <View style={styles.informationRow}>
            {/* user info */}
            <View>
              <Text>{currentCharacter.name}</Text>
              <Text>{characterIcon}</Text>
            </View>
            {/* game info */}
            <View style={styles.gameInformation}>
              <View>
                <Text>
                  Difficulty:{' '}
                  {currentGameConfig.difficulty.charAt(0).toUpperCase() +
                    currentGameConfig.difficulty.slice(1)}
                </Text>
                <Text>
                  Game Type:{' '}
                  {getWinCondition(currentGameConfig.winConditionType)}
                </Text>
              </View>
              <View>
                <Text>Required points: {currentGameConfig.requiredPoints}</Text>
                <Text>
                  Draws allowed: {currentGameConfig.allowDraws ? 'Yes' : 'No'}
                </Text>
              </View>
            </View>
            {/* opponent info */}
            <View>
              <Text>{currentGameConfig.opponnent.name}</Text>
              <Text>{ICONS[currentGameConfig.opponnent.iconIndex].value}</Text>
            </View>
          </View>
          {/* it would be cool if these titles faded in and out */}
          {/* <View>
            <Text style={styles.title}>Welcome, {currentCharacter.name}!</Text>
            <Text style={styles.title}>Are you ready to play?</Text>
          </View> */}
          {/* middle row will hold the actual game peices */}
          <View style={styles.gameRow}>
            {/* user fist controls */}
            <View>
              {POSSIBLE_SELECTIONS.map((selection, index) => {
                return (
                  <View key={selection.name}>
                    <Pressable
                      style={styles.selectionButton}
                      onPress={() => {
                        setUserSelections([...userSelections, selection.value]);
                      }}
                    >
                      <Text style={styles.selectionLabel}>
                        {selection.name}
                      </Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>
            {/* battle area with fists and RPS peices  */}
            <View>
              {fists.map((fist, index) => {
                return (
                  <View key={`${fist} + ${index}`}>
                    <Text>fist</Text>
                    <Image
                      source={rightFistImage}
                      style={{ padding: 0, margin: 0 }}
                    />
                  </View>
                );
              })}
            </View>
            <View>
              {fists.map((fist, index) => {
                return (
                  <View key={`${fist} + ${index}`}>
                    <Text>fist</Text>
                    <Image
                      source={leftFistImage}
                      style={{ padding: 0, margin: 0 }}
                    />
                  </View>
                );
              })}
            </View>
            {/* what to put here? since opponent has no controls */}
          </View>
          {/* bottom row will hold player's scores and hold the 'Play' button */}
          <View style={styles.scoreAndPlayRow}>
            {/* user score */}
            <View>
              <Text>Player: {userPoints}</Text>
            </View>
            {/* play button */}
            <View>
              <SimpleButton
                label="Play"
                onPress={() => console.log('pressed')}
                containerStyle={{ width: 130 }}
              />
            </View>
            {/* opponent score */}
            <View>
              <Text>Opponent: {opponentPoints}</Text>
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
};

export default RockPaperScissorsGame;

const styles = StyleSheet.create({
  gameContainer: {
    height: '100%',
    width: '90%',
    marginVertical: 0,
    marginRight: 'auto',
    marginLeft: 'auto',
    backgroundColor: 'lightgrey',
    borderWidth: 4,
    borderColor: '#d18408',
    borderStyle: 'solid'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  informationRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    paddingTop: 20
  },
  gameInformation: {
    flexDirection: 'row'
  },
  gameRow: {
    flexDirection: 'row'
  },
  selectionButton: {
    borderRadius: 7.5,
    borderWidth: 5,
    borderColor: '#d18408',
    backgroundColor: '#d6a811',
    padding: 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectionLabel: {
    fontSize: 14,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  scoreAndPlayRow: {
    flexDirection: 'row'
  }
});
