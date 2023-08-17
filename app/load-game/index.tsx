import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Button,
  FlatList
} from 'react-native';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Character } from '../../constants/Character';

export default function LoadGame() {
  const navigation = useNavigation();
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const getCharacterKeys = async () => {
      AsyncStorage.getAllKeys().then(keys => {
        console.log('KEYS', keys);
        const keyCopies = [...keys];
        AsyncStorage.multiGet(keyCopies).then(characters => {
          console.log('CHARACTERS', characters);
          const characterCopies = [...characters];
          const characterObjects = characterCopies.map(character => {
            const [key, value] = character;
            return JSON.parse(value ? value : '');
          });
          setCharacters(characterObjects);
        });
      });
    };
    getCharacterKeys();
  }, []);

  console.log('characters', characters);

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Text style={styles.title}>Load a character!</Text>
        <FlatList
          data={characters}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate('game-center/index', {
                  character: `character_${item.name}`
                })
              }
            >
              <Text>{item.name}</Text>
            </Pressable>
          )}
          keyExtractor={item => item.name}
        />
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
  menu: {
    height: 450,
    width: 300,
    borderRadius: 7.5,
    borderWidth: 5,
    borderColor: '#d18408',
    backgroundColor: '#d6a811',
    padding: 10
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e78b7',
    alignSelf: 'center'
  }
});
