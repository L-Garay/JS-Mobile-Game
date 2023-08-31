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

  // Carousel animations
  const animatedNextItemLeft = useRef(new Animated.Value(-1)).current;
  const animatedActiveItemLeft = useRef(new Animated.Value(33)).current;
  const animatedPreviousItemLeft = useRef(new Animated.Value(68)).current;
  const leftInputRange = [-120, 120];
  const leftOutputRange = ['-120%', '120%'];

  const animatedNextItemOpacity = useRef(new Animated.Value(0)).current;
  const activeItemOpacity = useRef(new Animated.Value(1)).current;
  const animatedActiveItemOpacity = useRef(new Animated.Value(0)).current;
  const animatedPreviousItemOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (action === 'next' || action === 'previous') {
      Animated.parallel([
        // handle opacity
        Animated.timing(animatedNextItemOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: false
        }),
        Animated.timing(activeItemOpacity, {
          toValue: 0,
          duration: 350,
          useNativeDriver: false
        }),
        Animated.timing(animatedActiveItemOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: false
        }),
        Animated.timing(animatedPreviousItemOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: false
        }),
        // handle left
        Animated.timing(animatedNextItemLeft, {
          toValue: action === 'next' ? 33 : -35,
          duration: 350,
          useNativeDriver: false
        }),
        Animated.timing(animatedActiveItemLeft, {
          toValue: action === 'next' ? 68 : -1,
          duration: 350,
          useNativeDriver: false
        }),
        Animated.timing(animatedPreviousItemLeft, {
          toValue: action === 'next' ? 115 : 33,
          duration: 350,
          useNativeDriver: false
        })
      ]).start(() => {
        // reset values manually instead of using 'reset' action and animating back to original position
        // this way we can instantly hide the animated elements and show the original elements once the initial animation is complete
        // then the animated elements are moved back to their original positions while hidden
        animatedNextItemOpacity.setValue(0);
        animatedActiveItemOpacity.setValue(0);
        animatedPreviousItemOpacity.setValue(0);
        activeItemOpacity.setValue(1);
        animatedNextItemLeft.setValue(-1);
        animatedActiveItemLeft.setValue(33);
        animatedPreviousItemLeft.setValue(68);
      });
    }
  }, [isAnimated]);

  // Carousel control animations
  const animatedLeftArrowOpacity1 = useRef(new Animated.Value(0)).current;
  const animatedLeftArrowOpacity2 = useRef(new Animated.Value(0)).current;
  const animatedRightArrowOpacity1 = useRef(new Animated.Value(0)).current;
  const animatedRightArrowOpacity2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (action === 'previous') {
      Animated.sequence([
        Animated.timing(animatedLeftArrowOpacity1, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true
        }),
        Animated.timing(animatedLeftArrowOpacity2, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true
        })
      ]).start(() => {
        animatedLeftArrowOpacity1.setValue(0);
        animatedLeftArrowOpacity2.setValue(0);
      });
    }
    if (action === 'next') {
      Animated.sequence([
        Animated.timing(animatedRightArrowOpacity1, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true
        }),
        Animated.timing(animatedRightArrowOpacity2, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true
        })
      ]).start(() => {
        animatedRightArrowOpacity1.setValue(0);
        animatedRightArrowOpacity2.setValue(0);
      });
    }
  }, [action]);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {/* previous controls */}
      <TouchableHighlight
        style={{
          zIndex: 10,
          backgroundColor: 'transparent'
        }}
        onPress={prevAction}
        disabled={!hasFinished}
        underlayColor="transparent"
      >
        <View
          style={{
            flexDirection: 'row',
            position: 'relative',
            width: 150,
            height: 64,
            backgroundColor: 'transparent'
          }}
        >
          <Animated.View
            style={{
              opacity: animatedLeftArrowOpacity2,
              position: 'absolute',
              right: '50%',
              top: 0
            }}
          >
            <LeftArrow />
          </Animated.View>
          <Animated.View
            style={{
              opacity: animatedLeftArrowOpacity1,
              position: 'absolute',
              right: '30%',
              top: 0
            }}
          >
            <LeftArrow />
          </Animated.View>
          <LeftArrow
            svgStyle={{
              styles: {
                opacity: 1,
                position: 'absolute',
                right: '10%',
                top: 0
              }
            }}
          />
        </View>
      </TouchableHighlight>
      {/* carousel */}
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
      {/* next controls */}
      <TouchableHighlight
        style={{
          zIndex: 10,
          backgroundColor: 'transparent'
        }}
        onPress={nextAction}
        disabled={!hasFinished}
        underlayColor="transparent"
      >
        <View
          style={{
            flexDirection: 'row',
            position: 'relative',
            width: 150,
            height: 64,
            backgroundColor: 'transparent'
          }}
        >
          <RightArrow
            svgStyle={{
              styles: {
                opacity: 1,
                position: 'absolute',
                top: 0,
                left: '10%'
              }
            }}
          />
          <Animated.View
            style={{
              opacity: animatedRightArrowOpacity1,
              position: 'absolute',
              top: 0,
              left: '30%'
            }}
          >
            <RightArrow />
          </Animated.View>
          <Animated.View
            style={{
              opacity: animatedRightArrowOpacity2,
              position: 'absolute',
              top: 0,
              left: '50%'
            }}
          >
            <RightArrow />
          </Animated.View>
        </View>
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
