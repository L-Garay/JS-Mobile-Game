import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from 'expo-router';
import useCharacterContext from '../../contexts/CharacterContext';
import SettingsWheelModal from '../../components/GameCenter/SettingsWheelModal';

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
      <Text style={styles.title}>GAME1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#84daf2',
    height: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d6a811',
    alignSelf: 'center'
  }
});
