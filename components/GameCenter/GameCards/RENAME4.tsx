import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function RENAME4() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RENAME4</Text>
    </View>
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
