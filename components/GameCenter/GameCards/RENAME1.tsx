import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function RENAME1() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RENAME1</Text>
    </View>
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
