import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// type MenuProps = {};

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: 100,
    borderRadius: 7.5,
    borderWidth: 5,
    borderColor: '#d18408',
    backgroundColor: '#d6a811',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const Menu = () => {
  return (
    <View style={styles.container}>
      <Text>New Game</Text>
      <Text>Load Game</Text>
      <Text>Options</Text>
    </View>
  );
};

export default Menu;
