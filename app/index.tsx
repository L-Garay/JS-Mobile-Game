import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Cloud, CloudReversed } from '../assets/svgs';
import SimpleButton from '../components/Buttons/SimpleButton';
import Menu from '../components/LandingPage/Menu';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#84daf2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1
  }
});

const DURATION = 2500;
const DELAY = 1500;

// NOTE recreate entire project so Expo Router is already installed and configured

const LandingPage = (): JSX.Element => {
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const [renderMenu, setRenderMenu] = React.useState<boolean>(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateXLeft = useRef(new Animated.Value(0)).current;
  const translateXRight = useRef(new Animated.Value(0)).current;
  const translateYUp = useRef(new Animated.Value(0)).current;
  const translateYDown = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showMenu) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 2,
            duration: DURATION,
            useNativeDriver: true
          }),
          Animated.timing(translateXLeft, {
            toValue: -30,
            duration: DURATION,
            useNativeDriver: true
          }),
          Animated.timing(translateXRight, {
            toValue: 30,
            duration: DURATION,
            useNativeDriver: true
          }),
          Animated.timing(translateYUp, {
            toValue: -30,
            duration: DURATION,
            useNativeDriver: true
          }),
          Animated.timing(translateYDown, {
            toValue: 30,
            duration: DURATION,
            useNativeDriver: true
          })
        ]),
        // May need to tweak the values when translating back, to give more room for the larger menu
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: DURATION,
            useNativeDriver: true,
            delay: DELAY
          }),
          Animated.timing(translateXLeft, {
            toValue: 0,
            duration: DURATION,
            useNativeDriver: true,
            delay: DELAY
          }),
          Animated.timing(translateXRight, {
            toValue: 0,
            duration: DURATION,
            useNativeDriver: true,
            delay: DELAY
          }),
          Animated.timing(translateYUp, {
            toValue: 0,
            duration: DURATION,
            useNativeDriver: true,
            delay: DELAY
          }),
          Animated.timing(translateYDown, {
            toValue: 0,
            duration: DURATION,
            useNativeDriver: true,
            delay: DELAY
          })
        ])
      ]).start();
    }
  }, [
    scaleAnim,
    translateXLeft,
    translateXRight,
    translateYDown,
    translateYUp,
    showMenu
  ]);

  useEffect(() => {
    if (showMenu) {
      const menuTimeout = setTimeout(() => {
        setRenderMenu(true);
      }, DURATION + 500);

      return () => clearTimeout(menuTimeout);
    }
  }, [showMenu]);

  return (
    <Animated.View style={{ ...styles.container }}>
      <Animated.View
        style={{
          position: 'absolute',
          top: '15%',
          right: '-10%',
          zIndex: 10,
          transform: [
            {
              scale: scaleAnim
            },
            { translateX: translateXLeft },

            { translateY: translateYDown }
          ]
        }}
      >
        <Cloud />
      </Animated.View>
      {renderMenu ? (
        <Menu />
      ) : (
        <SimpleButton label="Start" onPress={() => setShowMenu(true)} />
      )}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '-10%',
          zIndex: 10,
          transform: [
            { scale: scaleAnim },
            { translateX: translateXRight },
            { translateY: translateYUp }
          ]
        }}
      >
        <CloudReversed />
      </Animated.View>
      <StatusBar style="auto" />
    </Animated.View>
  );
};

export default LandingPage;
