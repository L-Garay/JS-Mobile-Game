import { useNavigation } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function RENAME4() {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate('game-center/GAME4')}>
      <View style={styles.container}>
        <Text style={styles.title}>RENAME4</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a13596',
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
