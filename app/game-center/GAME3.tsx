import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from 'expo-router';
import SettingsWheelModal from '../../components/GameCenter/SettingsWheelModal';
import useCharacterContext from '../../contexts/CharacterContext';

export default function GAME3() {
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
      <Text style={styles.title}>GAME3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fc5555',
    height: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d6a811',
    alignSelf: 'center'
  }
});
