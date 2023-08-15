import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Load a saved game</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e78b7'
  }
});
