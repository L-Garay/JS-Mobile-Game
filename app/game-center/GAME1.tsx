import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { useNavigation } from 'expo-router';
import useCharacterContext from '../../contexts/CharacterContext';
import SettingsWheelModal from '../../components/GameCenter/SettingsWheelModal';
import RockPaperScissorsMenu from '../../components/Games/RockPaperScissors/RockPaperScissorsMenu';
import { RockPaperScissorsProvider } from '../../contexts/RockPaperScissorsContext';

export default function GAME1() {
  const navigation = useNavigation();
  const { currentCharacter } = useCharacterContext();
  const [hasStartedGame, setHasStartedGame] = useState<boolean>(false);

  // should catch if there is no currentCharacter
  useEffect(() => {
    if (currentCharacter === null) {
      navigation.navigate('index');
    }
  }, [currentCharacter]);

  const translateYMenu = useRef(new Animated.Value(0)).current;
  const opacityMenu = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (hasStartedGame) {
      console.log('hasStartedGame', hasStartedGame);
      Animated.sequence([
        Animated.delay(500),
        Animated.parallel([
          Animated.timing(translateYMenu, {
            toValue: -1000,
            duration: 2000,
            useNativeDriver: true
          }),
          Animated.timing(opacityMenu, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
          })
        ])
      ]).start(() => {
        setHasStartedGame(false);
      });
    }
  }, [hasStartedGame]);

  return (
    <RockPaperScissorsProvider>
      <View style={styles.container}>
        <SettingsWheelModal />
        <Animated.View
          style={{
            ...styles.menu,
            transform: [{ translateY: translateYMenu }, { perspective: 1000 }],
            opacity: opacityMenu
          }}
        >
          <RockPaperScissorsMenu setHasStartedGame={setHasStartedGame} />
        </Animated.View>
        <Animated.View>{/* Game goes here */}</Animated.View>
      </View>
    </RockPaperScissorsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#84daf2',
    height: '100%',
    justifyContent: 'center'
  },
  title: {},
  menu: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
