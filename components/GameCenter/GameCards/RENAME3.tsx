import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function RENAME3() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RENAME3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4bab4d',
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
