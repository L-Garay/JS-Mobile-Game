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
    if (Object.keys(currentGameConfig).length === 0) {
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

  const contcharacterContentReady = currentCharacter && characterIcon;

  const {
    difficulty,
    winConditionType,
    requiredPoints,
    allowDraws,
    totalFists,
    opponnent
  } = currentGameConfig;

  // create an array filled with random string, representing the number of fists selected
  // to be used to iterate over and display the fists
  const fists = totalFists === 2 ? ['fist', 'fist'] : ['fist'];
  const rightFistImage =
    totalFists === 2 ? RightFacingFistLGCropped : RightFacingFistXLCropped;
  const leftFistImage =
    totalFists === 2 ? LeftFacingFistLGCropped : LeftFacingFistXLCropped;

  console.log(opponnent);

  return (
    <View style={styles.gameContainer}>
      {/* top row holds the user's info, game info, and opponent info */}
      <View style={styles.informationRow}>
        {/* user score */}
        <View>
          <Text style={styles.scoreText}>{userPoints}</Text>
        </View>
        {/* game info */}
        <View style={styles.gameInformation}>
          <View>
            <Text style={styles.infoText}>
              Difficulty:{' '}
              <Text
                style={{
                  color:
                    difficulty === 'easy'
                      ? 'green'
                      : difficulty === 'medium'
                      ? 'orange'
                      : 'red'
                }}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Text>
            </Text>
            <Text style={styles.infoText}>
              Game Type: {getWinCondition(winConditionType)}
            </Text>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.infoText}>
              Required points: {requiredPoints}
            </Text>
            <Text style={styles.infoText}>
              Draws allowed: {allowDraws ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>
        {/* opponent score */}
        <View>
          <Text style={styles.scoreText}>{opponentPoints}</Text>
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
        <View style={styles.selectionsContainer}>
          {POSSIBLE_SELECTIONS.map((selection, index) => {
            return (
              <View key={selection.name}>
                <Pressable
                  style={styles.selectionButton}
                  onPress={() => {
                    setUserSelections([...userSelections, selection.value]);
                  }}
                >
                  <Text style={styles.selectionLabel}>{selection.name}</Text>
                </Pressable>
              </View>
            );
          })}
        </View>
        {/* battle area with fists and RPS peices  */}
        <View style={styles.fistContainer}>
          {fists.map((fist, index) => {
            return (
              <View key={`${fist} + ${index}`} style={styles.fist}>
                <Image
                  source={rightFistImage}
                  style={{ padding: 0, margin: 0 }}
                />
              </View>
            );
          })}
          {fists.map((fist, index) => {
            return (
              <View key={`${fist} + ${index}`} style={styles.fist}>
                <Image
                  source={leftFistImage}
                  style={{ padding: 0, margin: 0 }}
                />
              </View>
            );
          })}
        </View>
        {/* opponent info / play button */}
        <View style={{ marginRight: -10 }}>
          <View
            style={{
              ...styles.opponentContainer,
              borderColor: `${opponnent.color.toLowerCase()}`,
              backgroundColor: `${opponnent.shade}`
            }}
          >
            <Text>{ICONS[opponnent.iconIndex].value}</Text>
            <Text
              style={{
                ...styles.opponentName,
                color: `${opponnent.color.toLowerCase()}`
              }}
            >
              {opponnent.name}
            </Text>
          </View>
          <View>
            <SimpleButton
              label="Play"
              onPress={() => console.log('pressed')}
              containerStyle={{ width: 130 }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default RockPaperScissorsGame;

const styles = StyleSheet.create({
  gameContainer: {
    height: '100%',
    maxHeight: '100%',
    width: '90%',
    justifyContent: 'center',
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
    paddingTop: 0
  },
  scoreText: {
    fontSize: 64
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  gameInformation: {
    flexDirection: 'row'
  },
  gameRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  selectionsContainer: {},
  selectionButton: {
    borderRadius: 7.5,
    borderWidth: 5,
    borderColor: '#d18408',
    backgroundColor: '#d6a811',
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectionLabel: {
    fontSize: 16,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  fistContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: 300
  },
  fist: {
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid'
  },
  opponentContainer: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center'
  },
  opponentName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2
  },
  scoreAndPlayRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  }
});
