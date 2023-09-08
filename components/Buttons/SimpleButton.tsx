import * as React from 'react';
import {
  StyleSheet,
  Pressable,
  PressableProps,
  View,
  Text
} from 'react-native';

type SimpleButtonProps = PressableProps & {
  label: string;
  onPress: () => void;
  containerStyle?: any;
  buttonStyle?: any;
  labelStyle?: any;
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: 80,
    // alignItems: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    padding: 5
  },
  button: {
    height: '100%',
    width: '100%',
    borderRadius: 7.5,
    borderWidth: 5,
    borderColor: '#d18408',
    backgroundColor: '#d6a811',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  }
});

const SimpleButton = ({
  label,
  onPress,
  containerStyle,
  buttonStyle,
  labelStyle
}: SimpleButtonProps) => {
  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <Pressable style={{ ...styles.button, ...buttonStyle }} onPress={onPress}>
        <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default SimpleButton;
