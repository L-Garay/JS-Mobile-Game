import { View, Text, StyleSheet } from 'react-native';

const RockPaperScissorsGame = () => {
  return (
    <View style={styles.gameContainer}>
      <Text style={styles.title}>RockPaperScissorsGame</Text>
    </View>
  );
};

export default RockPaperScissorsGame;

const styles = StyleSheet.create({
  gameContainer: {
    height: '100%',
    width: '90%',
    marginVertical: 0,
    marginRight: 'auto',
    marginLeft: 'auto',
    backgroundColor: 'lightgrey',
    borderWidth: 4,
    borderColor: '#d18408',
    borderStyle: 'solid'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  }
});
