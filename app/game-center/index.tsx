import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Link, Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Character } from '../../constants/Character';
import { SettingsWheel } from '../../assets/svgs';
import useOrientationContext from '../../contexts/OrientationContext';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function GameCenter() {
  const { character } = useLocalSearchParams();
  const { setOrientation } = useOrientationContext();
  const navigation = useNavigation();

  const [characterData, setCharacterData] = useState<Character>(
    {} as Character
  );
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    setOrientation(ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
  }, [useIsFocused()]);

  // NOTE typed as 'any' for now until figure out what structure it should be
  const [characterError, setCharacterError] = useState<any>(null);

  useEffect(() => {
    const getCharacterData = async () => {
      if (typeof character !== 'string') {
        // NOTE I know that this will never be an array of strings, but useLocalSearchParams returns a string | string[]
        // need to figure out a better way to handle this
        return;
      }
      const characterData = await AsyncStorage.getItem(character);
      if (!characterData) {
        // NOTE thinking of dipsplaying some toast/error message to user, then rendering only a button to go home
        setCharacterError('No character data found.');
        console.log('No character data found.');
        return;
      }
      setCharacterData(JSON.parse(characterData));
    };
    getCharacterData();
  }, [character]);

  console.log('characterData', characterData);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerBackVisible: false,
          headerShown: false
        }}
      />
      <View style={styles.settingsWheel}>
        <Pressable onPress={() => setIsModalVisible(prev => !prev)}>
          <SettingsWheel />
        </Pressable>
      </View>
      <View style={styles.modalContainer}>
        <Modal
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(prev => !prev)}
          supportedOrientations={['landscape']}
          transparent
          style={styles.modalContainer}
        >
          <View style={styles.modal}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Menu</Text>
              <Text style={styles.modalText}>
                Buttons and controls can go here
              </Text>
              <Pressable
                style={styles.modalButton}
                onPress={() => navigation.navigate('index')}
              >
                <Text>Home</Text>
              </Pressable>
              <Pressable
                style={styles.modalButton}
                onPress={() => setIsModalVisible(prev => !prev)}
              >
                <Text>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <Text style={styles.title}>Game Center</Text>
      <Text style={styles.title}>Character: {characterData.name}</Text>
      <View>
        <Text>Color chosen: {characterData.color}</Text>
      </View>
      <View>
        <Text>Icon chosen: {characterData.icon}</Text>
        <View>{/* icon goes here */}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#84daf2'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d6a811',
    alignSelf: 'center'
  },
  chosenColor: {},
  settingsWheel: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 20
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'red',
    justifyContent: 'center',
    marginLeft: 50
  },
  modal: {
    height: 250,
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderColor: '#d18408',
    backgroundColor: '#d6a811',
    borderWidth: 3,
    borderRadius: 10,
    padding: 20
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#84daf2',
    paddingBottom: 10
  },
  modalText: {},
  modalButton: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d18408',
    backgroundColor: '#84daf2',
    width: 75,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
