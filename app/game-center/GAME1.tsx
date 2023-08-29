import useCharacterContext from '../../contexts/CharacterContext';
import { SettingsWheel } from '../../assets/svgs';
import BasicModal from '../../components/Modals/BasicModal';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function GAME1() {
  const navigation = useNavigation();
  const { currentCharacter } = useCharacterContext();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // IMO this should catch if there is no currentCharacter
  // and therefore I feel comfortable using the '!' operator
  useEffect(() => {
    if (currentCharacter === null) {
      navigation.navigate('index');
    }
  }, [currentCharacter]);

  return (
    <View style={styles.container}>
      <View style={styles.settingsWheel}>
        <Pressable onPress={() => setIsModalVisible(prev => !prev)}>
          <SettingsWheel />
        </Pressable>
      </View>

      <BasicModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        message="This modal is for the game center"
        buttons={[
          { text: 'Home', action: () => navigation.navigate('index') },
          {
            text: 'Game Center',
            action: () =>
              navigation.navigate('game-center/index', {
                characterName: currentCharacter!.name
              })
          }
        ]}
      />
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
  },
  settingsWheel: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 20,
    paddingLeft: 25
  }
});
