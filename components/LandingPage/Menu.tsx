import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Link } from 'expo-router';

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
      <Link href="/new-game/">New Game</Link>
      <Link href="/load-game/">Load Game</Link>
      <Link href="/setttings/">Options</Link>
    </View>
  );
};

export default Menu;
