import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated, View, TouchableHighlight } from 'react-native';
import { useCaourselContext } from '../../contexts/CarouselContext';
import { LeftArrow, RightArrow } from '../../assets/svgs';

export default function GameCarousel() {
  const {
    isAnimated,
    action,
    nextAction,
    prevAction,
    nextElement,
    animatedNextElement,
    activeElement,
    animatedActiveElement,
    prevElement,
    animatedPrevElement,
    hasFinished
  } = useCaourselContext();

  const [isAnimating, setIsAnimating] = React.useState<boolean>(false);

  const leftInputRange = [-120, 120];
  const leftOutputRange = ['-120%', '120%'];

  const animatedNextItemLeft = useRef(new Animated.Value(-1)).current;
  const animatedActiveItemLeft = useRef(new Animated.Value(33)).current;
  const animatedPreviousItemLeft = useRef(new Animated.Value(68)).current;

  const animatedNextItemOpacity = useRef(new Animated.Value(0)).current;
  const activeItemOpacity = useRef(new Animated.Value(1)).current;
  const animatedActiveItemOpacity = useRef(new Animated.Value(0)).current;
  const animatedPreviousItemOpacity = useRef(new Animated.Value(0)).current;

  // NOTE what is happening is that the animation is firing initially for the 'next'/'previous' action, and it WORKS just fine
  // However, when the context's setTimeout() is fired and the 'reset' action and setIsAnimated() is fired, whicher one of those is called first, is causeing the animation to fire again, HOWEVER, it is being called with only one updated value for 'action' or 'isAnimated' (depending on which one is called first)
  // this leads to incorrect animation behavior, i.e. the opacity values not changing becasue 'isAnimated' is 'true' but the 'action' is 'reset' OR the positions of the cards being wrong because the action is still 'next'/'previous' but the 'isAnimated' is 'false'

  // NOTE solution that seems to be working for now: only listen to one or the other values (action or isAnimated)
  // since they get set at basically the same time and indicate the same thing, I feel confident listening to only one
  // this way we only fire the effect on the one change, not both
  // ALSO, decrease the duration of the opacity change when 'isAnimated' is 'false' so that the opacity change is not visible to the user

  useEffect(() => {
    if (isAnimating === false) {
      setIsAnimating(true);
      Animated.parallel([
        // handle opacity
        Animated.timing(animatedNextItemOpacity, {
          toValue: isAnimated ? 1 : 0,
          duration: isAnimated ? 350 : 1,
          useNativeDriver: false
        }),
        Animated.timing(activeItemOpacity, {
          toValue: isAnimated === false ? 1 : 0,
          duration: isAnimated ? 350 : 1,
          useNativeDriver: false
        }),
        Animated.timing(animatedActiveItemOpacity, {
          toValue: isAnimated ? 1 : 0,
          duration: isAnimated ? 350 : 1,
          useNativeDriver: false
        }),
        Animated.timing(animatedPreviousItemOpacity, {
          toValue: isAnimated ? 1 : 0,
          duration: isAnimated ? 350 : 1,
          useNativeDriver: false
        }),
        // handle left
        Animated.timing(animatedNextItemLeft, {
          toValue: action === 'next' ? 33 : action === 'previous' ? -35 : -1,
          duration: 350,
          useNativeDriver: false
        }),
        Animated.timing(animatedActiveItemLeft, {
          toValue: action === 'next' ? 68 : action === 'previous' ? -1 : 33,
          duration: 350,
          useNativeDriver: false
        }),
        Animated.timing(animatedPreviousItemLeft, {
          toValue: action === 'next' ? 115 : action === 'previous' ? 33 : 68,
          duration: 350,
          useNativeDriver: false
        })
      ]).start(() => {
        setIsAnimating(false);
      });
    }
  }, [isAnimated]);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableHighlight
        style={{
          zIndex: 10,
          borderColor: 'red',
          borderWidth: !hasFinished ? 5 : 0
        }}
        onPress={prevAction}
        disabled={!hasFinished}
      >
        <LeftArrow />
      </TouchableHighlight>
      <View style={{ height: 250, width: 450 }}>
        <View style={styles.carouselWrapper}>
          <View style={styles.overflowContainer}>
            <View style={styles.carousel}>
              <Animated.View style={styles.nextItem}>
                {nextElement()}
              </Animated.View>
              <Animated.View
                style={{
                  ...styles.animatedNextItem,
                  left: animatedNextItemLeft.interpolate({
                    inputRange: leftInputRange,
                    outputRange: leftOutputRange
                  }),
                  opacity: animatedNextItemOpacity
                }}
              >
                {animatedNextElement()}
              </Animated.View>
              <Animated.View
                style={{ ...styles.activeItem, opacity: activeItemOpacity }}
              >
                {activeElement()}
              </Animated.View>
              <Animated.View
                style={{
                  ...styles.animatedActiveItem,
                  left: animatedActiveItemLeft.interpolate({
                    inputRange: leftInputRange,
                    outputRange: leftOutputRange
                  }),
                  opacity: animatedActiveItemOpacity
                }}
              >
                {animatedActiveElement()}
              </Animated.View>
              <Animated.View
                style={{
                  ...styles.animatedPreviousItem,
                  left: animatedPreviousItemLeft.interpolate({
                    inputRange: leftInputRange,
                    outputRange: leftOutputRange
                  }),
                  opacity: animatedPreviousItemOpacity
                }}
              >
                {animatedPrevElement()}
              </Animated.View>
              <Animated.View style={styles.previousItem}>
                {prevElement()}
              </Animated.View>
            </View>
          </View>
        </View>
      </View>
      <TouchableHighlight
        style={{
          zIndex: 10,
          borderColor: 'red',
          borderWidth: !hasFinished ? 5 : 0
        }}
        onPress={nextAction}
        disabled={!hasFinished}
      >
        <RightArrow />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselWrapper: {
    height: '90%',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  overflowContainer: {
    height: '100%',
    width: '100%',
    position: 'relative',
    overflow: 'hidden'
  },
  carousel: {
    height: '100%',
    width: '300%',
    position: 'absolute',
    left: '-100%'
  },
  nextItem: {
    position: 'absolute',
    left: '-1%' // DON"T CHANGE THIS VALUE
  },
  animatedNextItem: {
    position: 'absolute'
  },
  activeItem: {
    position: 'absolute',
    left: '33%' // DON"T CHANGE THIS VALUE
  },
  animatedActiveItem: {
    position: 'absolute'
  },
  previousItem: {
    position: 'absolute',
    left: '68%' // DON"T CHANGE THIS VALUE
  },
  animatedPreviousItem: {
    position: 'absolute'
  }
});