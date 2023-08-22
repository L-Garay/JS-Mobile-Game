import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Button
} from 'react-native';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Character } from '../../constants/Character';
import { SettingsWheel } from '../../assets/svgs';

export default function GameCenter() {
  const { character } = useLocalSearchParams();
  const [characterData, setCharacterData] = useState<Character>(
    {} as Character
  );

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
          title: 'Game Center',
          headerStyle: {
            backgroundColor: '#84daf2'
          },
          headerTitleStyle: {
            color: '#d6a811',
            fontWeight: 'bold'
          },
          headerTintColor: '#000',
          headerBackVisible: false
        }}
      />
      <View>
        {/* NOTE testing purposes only */}
        <Link href="/">Back</Link>
        {/* TODO More than likely will need to open a modal */}
        <SettingsWheel />
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
  chosenColor: {}
});
