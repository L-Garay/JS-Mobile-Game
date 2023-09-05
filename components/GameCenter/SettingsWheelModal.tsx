import { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from 'expo-router';
import { SettingsWheel } from '../../assets/svgs';
import BasicModal from '../Modals/BasicModal';
import useCharacterContext from '../../contexts/CharacterContext';

const SettingsWheelModal = () => {
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
    <>
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
    </>
  );
};

export default SettingsWheelModal;

const styles = StyleSheet.create({
  settingsWheel: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 20,
    paddingLeft: 25,
    zIndex: 100
  }
});
