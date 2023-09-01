import { useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { NAMES, COLOR_OPTIONS, ICONS } from '../../../constants/Configs';
import { Character } from '../../../constants/Character';
import { Dice } from '../../../assets/svgs';

const DIFFICULTY_OPTIONS = [
  { key: 'easy', value: 'Easy' },
  { key: 'medium', value: 'Medium' },
  { key: 'hard', value: 'Hard' }
];

const FIST_OPTIONS = [
  { key: 'one', value: 'One fist' },
  { key: 'two', value: 'Two fists' }
];

const RockPaperScissorsMenu = () => {
  const getRandomColor = (): string => {
    return COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)]
      .value;
  };
  const getRandomName = (): string => {
    return NAMES[Math.floor(Math.random() * NAMES.length)];
  };
  const getRandomIcon = (): Record<string, any> => {
    const icon = ICONS[Math.floor(Math.random() * ICONS.length)].key;
    const index = ICONS.findIndex(i => i.key === icon);
    return { icon, index };
  };

  const [opponent, setOpponent] = useState<Character & { iconIndex: number }>({
    name: getRandomName(),
    color: getRandomColor(),
    icon: getRandomIcon().icon,
    iconIndex: getRandomIcon().index
  });

  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('easy');
  const [selectedFists, setSelectedFists] = useState<string>('one');

  const getNewColor = () => {
    const color = getRandomColor();
    const copy = { ...opponent };
    copy.color = color;
    setOpponent(copy);
  };
  const getNewName = () => {
    const name = getRandomName();
    const copy = { ...opponent };
    copy.name = name;
    setOpponent(copy);
  };
  const getNewIcon = () => {
    const { icon, index } = getRandomIcon();
    const copy = { ...opponent };
    copy.icon = icon;
    copy.iconIndex = index;
    setOpponent(copy);
  };
  // console.log('opponent', opponent);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rock Paper Scissors Menu</Text>
      <View style={{ flexDirection: 'row' }}>
        {/* Game controls */}
        <View style={styles.gameContainer}>
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
                  onPress={() => setSelectedFists(option.key)}
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
        </View>
        {/* Opponent controls */}
        <View style={styles.textContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text>Name: {opponent.name}</Text>
            <Pressable onPress={() => getNewName()}>
              <Dice />
            </Pressable>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>Color: {opponent.color}</Text>
            <Pressable onPress={() => getNewColor()}>
              <Dice />
            </Pressable>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>Icon: {opponent.icon}</Text>
            {ICONS[opponent.iconIndex].value}
            <Pressable onPress={() => getNewIcon()}>
              <Dice />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RockPaperScissorsMenu;

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 400,
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
  textContainer: {
    fontSize: 20,
    color: '#000',
    padding: 10
  },
  gameContainer: {},
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
  }
});
