import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Cloud, CloudReversed } from '../assets/svgs';
import SimpleButton from '../components/Buttons/SimpleButton';
import Menu from '../components/LandingPage/Menu';
import useOrientationContext from '../contexts/OrientationContext';
import * as ScreenOrientation from 'expo-screen-orientation';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#84daf2',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const DURATION = 2500;
const DELAY = 1000;

const LandingPage = (): JSX.Element => {
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const [renderMenu, setRenderMenu] = React.useState<boolean>(false);

  const { isLandscape, dimensions, setOrientation } = useOrientationContext();

  useEffect(() => {
    setOrientation(ScreenOrientation.Orientation.PORTRAIT_UP);
    // NOTE this fires on all screens in this 'stack'
    // this landing page, the new game page, the load game page and settings page
  }, [useIsFocused()]);

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

            { translateY: translateYDown },
            { perspective: 1000 } // https://reactnative.dev/docs/next/animations#bear-in-mind
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
            { translateY: translateYUp },
            { perspective: 1000 } // https://reactnative.dev/docs/next/animations#bear-in-mind
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
