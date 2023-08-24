import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Alert
} from 'react-native';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Character } from '../../constants/Character';
import { Trash } from '../../assets/svgs';
import useCharacterContext from '../../contexts/CharacterContext';

export default function LoadGame() {
  const navigation = useNavigation();
  const { characters, setCharacters, setCurrentCharacter } =
    useCharacterContext();
  // TODO probably want to create universal error parser/handler/types
  const [deletionError, setDeletionError] = useState<any>(null);

  const DeleteConfirmationAlert = (character: Character) => {
    Alert.alert(
      'Delete Character',
      `Are you sure you want to delete ${character.name}? This cannot be undone.`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => {
            try {
              AsyncStorage.removeItem(`character_${character.name}`);
              setCharacters(
                characters.filter(char => char.name !== character.name)
              );
            } catch (error) {
              setDeletionError(error);
            }
          },
          style: 'destructive'
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Text style={styles.title}>Load a character!</Text>
        <FlatList
          data={characters}
          renderItem={({ item, index }) => {
            // NOTE this is a hacky way to add padding to the first item in the list
            // LOL I didn't even type 'hacky', that was CoPilot calling me out I guess
            if (index === 0) {
              return (
                <View style={{ ...styles.itemContainer, paddingTop: 10 }}>
                  <Pressable
                    onPress={() => {
                      setCurrentCharacter(item);
                      navigation.navigate('game-center/index', {
                        character: `character_${item.name}`
                      });
                    }}
                  >
                    <Text style={styles.item}>{item.name}</Text>
                  </Pressable>
                  <Pressable onPress={() => DeleteConfirmationAlert(item)}>
                    <Trash />
                  </Pressable>
                </View>
              );
            } else {
              return (
                <View style={styles.itemContainer}>
                  <Pressable
                    onPress={() => {
                      setCurrentCharacter(item);
                      navigation.navigate('game-center/index', {
                        character: `character_${item.name}`
                      });
                    }}
                  >
                    <Text style={styles.item}>{item.name}</Text>
                  </Pressable>
                  <Pressable onPress={() => DeleteConfirmationAlert(item)}>
                    <Trash />
                  </Pressable>
                </View>
              );
            }
          }}
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
  },
  itemContainer: {
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  item: {
    fontSize: 16
  }
});
