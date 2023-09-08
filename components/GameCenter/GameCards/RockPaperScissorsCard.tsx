import React from 'react';
import { useNavigation } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function RockPaperScissorsCard() {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate('game-center/RockPaperScissors')}
    >
      <View style={styles.container}>
        <Text style={styles.title}>RockPaperScissorsCard</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fc5555',
    height: 225,
    width: 405
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d6a811',
    alignSelf: 'center'
  }
});
