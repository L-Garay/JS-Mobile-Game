import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { useNavigation } from 'expo-router';
import useCharacterContext from '../../contexts/CharacterContext';
import SettingsWheelModal from '../../components/GameCenter/SettingsWheelModal';
import {
  RockPaperScissorsMenu,
  RockPaperScissorsGame
} from '../../components/Games/RockPaperScissors';
import { RockPaperScissorsProvider } from '../../contexts/RockPaperScissorsContext';

export default function RockPaperScissors() {
  const navigation = useNavigation();
  const { currentCharacter } = useCharacterContext();
  const [hasStartedGame, setHasStartedGame] = useState<boolean>(false);
  const [shouldRemoveMenu, setShouldRemoveMenu] = useState<boolean>(false);
  const [shouldResetPage, setShouldResetPage] = useState<boolean>(false);

  const resetPage = () => {
    setHasStartedGame(false);
    setShouldResetPage(true);
    setShouldRemoveMenu(false);
  };

  // should catch if there is no currentCharacter
  useEffect(() => {
    if (currentCharacter === null) {
      navigation.navigate('index');
    }
  }, [currentCharacter]);

  const translateYMenu = useRef(new Animated.Value(0)).current;
  const opacityMenu = useRef(new Animated.Value(1)).current;
  const heightMenu = useRef(new Animated.Value(100)).current;

  const translateYGame = useRef(new Animated.Value(1000)).current;
  const heightGame = useRef(new Animated.Value(0)).current;
  const opacityGame = useRef(new Animated.Value(0)).current;
  const heightInputRange = [0, 100];
  const heightOutputRange = ['0%', '100%'];

  useEffect(() => {
    if (hasStartedGame) {
      console.log('hasStartedGame', hasStartedGame);
      Animated.sequence([
        Animated.delay(500),
        Animated.parallel([
          Animated.timing(heightMenu, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false
          }),
          Animated.timing(translateYMenu, {
            toValue: -1000,
            duration: 2000,
            useNativeDriver: false
          }),
          Animated.timing(opacityMenu, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false
          }),

          Animated.timing(translateYGame, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false
          }),
          Animated.timing(opacityGame, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false
          })
        ]),
        // NOTE if you leave this outside of the .parallel(), it will produce the effect of pulling the game up (with 0 height) and then expanding it
        // if you move it within the .parallel(), it will produce the effect of pulling the already expanded, game up
        Animated.timing(heightGame, {
          toValue: 100,
          duration: 2000,
          useNativeDriver: false
        })
      ]).start(() => {
        setShouldRemoveMenu(true);
        setShouldResetPage(false);
      });
    }
    if (shouldResetPage) {
      console.log('shouldResetPage', shouldResetPage);
      Animated.parallel([
        Animated.timing(heightMenu, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false
        }),
        Animated.timing(translateYMenu, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false
        }),
        Animated.timing(opacityMenu, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false
        }),

        Animated.timing(translateYGame, {
          toValue: 1000,
          duration: 500,
          useNativeDriver: false
        }),
        Animated.timing(opacityGame, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false
        }),
        Animated.timing(heightGame, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false
        })
      ]).start();
    }
  }, [hasStartedGame, shouldResetPage]);

  return (
    <RockPaperScissorsProvider>
      <View style={styles.container}>
        <SettingsWheelModal />
        {shouldRemoveMenu ? null : (
          <Animated.View
            style={{
              ...styles.menu,
              height: heightMenu.interpolate({
                inputRange: heightInputRange,
                outputRange: heightOutputRange
              }),
              transform: [
                { translateY: translateYMenu },
                { perspective: 1000 } // https://reactnative.dev/docs/next/animations#bear-in-mind
              ],
              opacity: opacityMenu
            }}
          >
            <RockPaperScissorsMenu setHasStartedGame={setHasStartedGame} />
          </Animated.View>
        )}

        {hasStartedGame ? (
          <Animated.View
            style={{
              height: heightGame.interpolate({
                inputRange: heightInputRange,
                outputRange: heightOutputRange
              }),
              transform: [
                { translateY: translateYGame },
                { perspective: 1000 } // https://reactnative.dev/docs/next/animations#bear-in-mind
              ],
              opacity: opacityGame
            }}
          >
            <RockPaperScissorsGame resetPage={resetPage} />
          </Animated.View>
        ) : null}
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
