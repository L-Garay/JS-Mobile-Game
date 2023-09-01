import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from 'expo-router';
import useCharacterContext from '../../contexts/CharacterContext';
import SettingsWheelModal from '../../components/GameCenter/SettingsWheelModal';
import RockPaperScissorsMenu from '../../components/Games/RockPaperScissors/RockPaperScissorsMenu';

export default function GAME1() {
  const navigation = useNavigation();
  const { currentCharacter } = useCharacterContext();

  // IMO this should catch if there is no currentCharacter
  // and therefore I feel comfortable using the '!' operator
  useEffect(() => {
    if (currentCharacter === null) {
      navigation.navigate('index');
    }
  }, [currentCharacter]);

  return (
    <View style={styles.container}>
      <SettingsWheelModal />
      <View style={styles.menu}>
        {/* Render menu first, capture the config options and pass to actual game */}
        <RockPaperScissorsMenu />
      </View>
    </View>
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
