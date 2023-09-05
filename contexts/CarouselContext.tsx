import React, { createContext, ReactNode, useContext } from 'react';
import {
  RockPaperScissorsCard,
  Rename2,
  Rename3,
  Rename4
} from '../components/GameCenter/GameCards';

// TODO add the elements (different game cards)
const ITEM_CONFIG = [
  {
    index: 0,
    name: 'item 1',
    element: () => <RockPaperScissorsCard />,
    elementTest: RockPaperScissorsCard
  },
  {
    index: 1,
    name: 'item 2',
    element: () => <Rename2 />,
    elementTest: Rename2
  },
  {
    index: 2,
    name: 'item 3',
    element: () => <Rename3 />,
    elementTest: Rename3
  },
  {
    index: 3,
    name: 'item 4',
    element: () => <Rename4 />,
    elementTest: Rename4
  }
];

export interface CarouselContextProps {
  action: 'previous' | 'next' | 'reset';
  nextAction: () => boolean;
  prevAction: () => boolean;
  nextElement: () => any;
  animatedNextElement: () => any;
  activeElement: () => any;
  animatedActiveElement: () => any;
  prevElement: () => any;
  animatedPrevElement: () => any;
  hasFinished: boolean;
}

export const CarouselContext = createContext<CarouselContextProps>({
  action: 'reset',
  nextAction: () => false,
  prevAction: () => false,
  nextElement: () => <div />,
  animatedNextElement: () => <div />,
  activeElement: () => <div />,
  animatedActiveElement: () => <div />,
  prevElement: () => <div />,
  animatedPrevElement: () => <div />,
  hasFinished: false
} as CarouselContextProps);

export const CarouselProvider = ({ children }: { children: ReactNode }) => {
  const [nextIndex, setNextIndex] = React.useState(1);
  const [animatedNextIndex, setAnimatedNextIndex] = React.useState(1);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animatedActiveIndex, setAnimatedActiveIndex] = React.useState(0);
  const [prevIndex, setPrevIndex] = React.useState(ITEM_CONFIG.length - 1);
  const [animatedPrevIndex, setAnimatedPrevIndex] = React.useState(
    ITEM_CONFIG.length - 1
  );
  const [action, setAction] = React.useState<'previous' | 'next' | 'reset'>(
    'reset'
  );
  const [hasFinished, setHasFinished] = React.useState(true);

  const determineNextIndex = (activeIndex: number) => {
    if (activeIndex === ITEM_CONFIG.length - 1) {
      return 0;
    } else {
      return activeIndex + 1;
    }
  };

  const determinePreviousIndex = (activeIndex: number) => {
    if (activeIndex === 0) {
      return ITEM_CONFIG.length - 1;
    } else {
      return activeIndex - 1;
    }
  };

  const nextAction = () => {
    setHasFinished(false);
    setAction('next');
    setNextIndex(prev => determineNextIndex(prev));
    setActiveIndex(prev => determineNextIndex(prev));
    setPrevIndex(prev => determineNextIndex(prev));

    setTimeout(() => {
      setAnimatedNextIndex(prev => determineNextIndex(prev));
      setAnimatedActiveIndex(prev => determineNextIndex(prev));
      setAnimatedPrevIndex(prev => determineNextIndex(prev));
      setAction('reset');
      setHasFinished(true);
    }, 500); // NOTE setting this to +1 more than the animation duration somehow causes issues with the animation????
    // TODO investigate why that is
    // (note, I'm too lazy right now and have spent too much time on this already for now)
    return true;
  };

  const prevAction = () => {
    setHasFinished(false);
    setAction('previous');
    setNextIndex(prev => determinePreviousIndex(prev));
    setActiveIndex(prev => determinePreviousIndex(prev));
    setPrevIndex(prev => determinePreviousIndex(prev));
    setTimeout(() => {
      setAnimatedNextIndex(prev => determinePreviousIndex(prev));
      setAnimatedActiveIndex(prev => determinePreviousIndex(prev));
      setAnimatedPrevIndex(prev => determinePreviousIndex(prev));
      setAction('reset');
      setHasFinished(true);
    }, 500); // NOTE setting this to +1 more than the animation duration somehow causes issues with the animation????
    // TODO investigate why that is
    // (note, I'm too lazy right now and have spent too much time on this already for now)
    return true;
  };

  const nextElement = ITEM_CONFIG[nextIndex].elementTest;

  const animatedNextElement = ITEM_CONFIG[animatedNextIndex].elementTest;
  const activeElement = ITEM_CONFIG[activeIndex].elementTest;

  const animatedActiveElement = ITEM_CONFIG[animatedActiveIndex].elementTest;
  const prevElement = ITEM_CONFIG[prevIndex].elementTest;

  const animatedPrevElement = ITEM_CONFIG[animatedPrevIndex].elementTest;

  const state = {
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
  };

  return (
    <CarouselContext.Provider value={{ ...state }}>
      {children}
    </CarouselContext.Provider>
  );
};

export function useCaourselContext() {
  return useContext(CarouselContext);
}
