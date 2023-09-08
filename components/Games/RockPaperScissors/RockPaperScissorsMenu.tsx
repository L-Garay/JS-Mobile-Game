import { useState } from 'react';
import { View, StyleSheet, Text, Pressable, Switch } from 'react-native';
import { NAMES, COLOR_OPTIONS, ICONS } from '../../../constants/Configs';
import { Character } from '../../../constants/types/Character';
import { Dice } from '../../../assets/svgs';
import useRPSContext from '../../../contexts/RockPaperScissorsContext';
import { Slider } from '@miblanchard/react-native-slider';
import SimpleButton from '../../../components/Buttons/SimpleButton';
import {
  RPSMenuProps,
  WinConditionType
} from '../../../constants/types/Games/RockPaperScissors';
import {
  DIFFICULTY_OPTIONS,
  FIST_OPTIONS,
  WIN_CONDITION_OPTIONS
} from '../../../constants/configs/Games/RockPaperScissors';

const getRandomColor = (): string => {
  return COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)].value;
};
const getRandomName = (): string => {
  return NAMES[Math.floor(Math.random() * NAMES.length)];
};
const getRandomIcon = (): Record<string, any> => {
  const icon = ICONS[Math.floor(Math.random() * ICONS.length)].key;
  const index = ICONS.findIndex(i => i.key === icon);
  return { icon, index };
};

const RockPaperScissorsMenu = ({ setHasStartedGame }: RPSMenuProps) => {
  const { setCurrentGameConfig } = useRPSContext();

  const [opponnent, setOpponent] = useState<Character>(() => {
    const { icon, index } = getRandomIcon();
    return {
      name: getRandomName(),
      color: getRandomColor(),
      icon,
      iconIndex: index
    };
  });

  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('easy');
  const [selectedFists, setSelectedFists] = useState<number>(1);
  const [allowDraws, setAllowDraws] = useState<boolean>(false);
  const [winCondition, setWinCondition] = useState<WinConditionType>('bestOf');
  const [requiredPoints, setRequiredPoints] = useState<number>(3);

  const getNewColor = () => {
    const color = getRandomColor();
    const copy = { ...opponnent };
    copy.color = color;
    setOpponent(copy);
  };
  const getNewName = () => {
    const name = getRandomName();
    const copy = { ...opponnent };
    copy.name = name;
    setOpponent(copy);
  };
  const getNewIcon = () => {
    const { icon, index } = getRandomIcon();
    const copy = { ...opponnent };
    copy.icon = icon;
    copy.iconIndex = index;
    setOpponent(copy);
  };
  // console.log('opponnent', opponnent);

  const resetSettings = () => {
    setSelectedDifficulty('easy');
    setSelectedFists(1);
    setAllowDraws(false);
    setWinCondition('bestOf');
    setRequiredPoints(3);
  };

  const startGame = () => {
    const config = {
      difficulty: selectedDifficulty,
      totalFists: selectedFists,
      allowDraws,
      winConditionType: winCondition,
      requiredPoints,
      opponnent
    };
    setCurrentGameConfig(config);
    setHasStartedGame(true);
  };

  return (
    <View style={styles.menuContainer}>
      <Text style={styles.title}>Rock Paper Scissors Menu</Text>
      <View style={{ flexDirection: 'row' }}>
        {/* Left container */}
        <View style={styles.leftContainer}>
          <View>
            <Text>Choose your difficulty:</Text>
            {DIFFICULTY_OPTIONS.map(option => {
              return (
                <Pressable
                  key={option.key}
                  onPress={() => setSelectedDifficulty(option.key)}
                  style={{ marginBottom: 10 }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.radioButtonOuter}>
                      <View
                        style={{
                          ...styles.radioButtonInner,
                          backgroundColor:
                            selectedDifficulty === option.key
                              ? '#84daf2'
                              : 'transparent'
                        }}
                      />
                    </View>
                    <Text style={styles.radioButtonLabel}>{option.value}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
          <View>
            <Text>How many fists?</Text>
            {FIST_OPTIONS.map(option => {
              return (
                <Pressable
                  key={option.key}
                  onPress={() => {
                    setSelectedFists(option.key);
                    if (option.key === 1) {
                      setAllowDraws(false);
                    }
                  }}
                  style={{ marginBottom: 10 }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.radioButtonOuter}>
                      <View
                        style={{
                          ...styles.radioButtonInner,
                          backgroundColor:
                            selectedFists === option.key
                              ? '#84daf2'
                              : 'transparent'
                        }}
                      />
                    </View>
                    <Text style={styles.radioButtonLabel}>{option.value}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
          <View>
            <Text>Allow draws?</Text>
            <View>
              <Switch
                trackColor={{ false: '#d18408', true: '#84daf2' }}
                thumbColor={allowDraws ? '#d18408' : '#84daf2'}
                ios_backgroundColor="#d18408"
                onValueChange={() => setAllowDraws(!allowDraws)}
                value={allowDraws}
                disabled={selectedFists !== 2}
              />
            </View>
          </View>
        </View>
        {/* Right container */}
        <View style={styles.rightContainer}>
          {/* Controls */}
          <View style={{ flexDirection: 'row' }}>
            <View>
              {/* Win condition control */}
              <View>
                <Text>Win condition:</Text>
                {WIN_CONDITION_OPTIONS.map(option => {
                  return (
                    <Pressable
                      key={option.key}
                      onPress={() => {
                        setWinCondition(option.key as WinConditionType);
                        if (option.key === 'bestOf') {
                          setRequiredPoints(3);
                        } else {
                          setRequiredPoints(1);
                        }
                      }}
                      style={{ marginBottom: 10 }}
                    >
                      <View style={{ flexDirection: 'row' }}>
                        <View style={styles.radioButtonOuter}>
                          <View
                            style={{
                              ...styles.radioButtonInner,
                              backgroundColor:
                                winCondition === option.key
                                  ? '#84daf2'
                                  : 'transparent'
                            }}
                          />
                        </View>
                        <Text style={styles.radioButtonLabel}>
                          {option.value}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
              {/* Required points control */}
              <View>
                <Text>Required points:</Text>
                <Slider
                  value={requiredPoints}
                  onValueChange={valueArr => setRequiredPoints(valueArr[0])}
                  maximumValue={winCondition === 'bestOf' ? 51 : 100} // will likely need tweaking
                  minimumValue={winCondition === 'bestOf' ? 3 : 1}
                  step={winCondition === 'bestOf' ? 2 : 1}
                />
                <Text>{requiredPoints}</Text>
              </View>
            </View>
            {/* Opponent controls */}
            <View style={styles.opponnentContainer}>
              <View style={styles.opponnentOption}>
                <Text>Name: {opponnent.name}</Text>
                <Pressable onPress={() => getNewName()}>
                  <Dice />
                </Pressable>
              </View>
              <View style={styles.opponnentOption}>
                <Text>Color: {opponnent.color}</Text>
                <Pressable onPress={() => getNewColor()}>
                  <Dice />
                </Pressable>
              </View>
              <View style={styles.opponnentOption}>
                <Text>Icon: {opponnent.icon}</Text>
                {ICONS[opponnent.iconIndex].value}
                <Pressable onPress={() => getNewIcon()}>
                  <Dice />
                </Pressable>
              </View>
            </View>
          </View>
          {/* Menu buttons */}
          <View style={styles.buttonContainer}>
            <SimpleButton
              label="Resest settings"
              containerStyle={{ height: 60, width: 150, marginHorizontal: 0 }}
              labelStyle={{ fontSize: 16 }}
              onPress={resetSettings}
            />
            <SimpleButton
              label="Start game"
              containerStyle={{ height: 60, width: 150, marginHorizontal: 0 }}
              labelStyle={{ fontSize: 16 }}
              onPress={startGame}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default RockPaperScissorsMenu;

const styles = StyleSheet.create({
  menuContainer: {
    height: 350,
    width: 500,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#d18408',
    backgroundColor: '#d6a811',
    borderRadius: 7.5
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#84daf2',
    paddingTop: 10
  },
  leftContainer: {},
  rightContainer: {
    flexDirection: 'column',
    marginLeft: 8
  },
  opponnentContainer: {
    fontSize: 20,
    color: '#000',
    padding: 10
  },
  opponnentOption: {
    flexDirection: 'row'
  },
  radioButtonOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#84daf2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  radioButtonInner: {
    height: 12,
    width: 12,
    borderRadius: 6
  },
  radioButtonLabel: {
    fontSize: 16,
    paddingLeft: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
