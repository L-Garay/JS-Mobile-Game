import * as React from 'react';
import { StyleSheet } from 'react-native';
import { CustomSVGProps } from '../../constants/SharedTypes';
import Svg, { Path, G } from 'react-native-svg';

const RightArrow = ({ fill, svgStyle }: CustomSVGProps) => {
  const styles = StyleSheet.create({ ...svgStyle });
  return (
    <Svg
      width="64px"
      height="64px"
      viewBox="0 0 1024 1024"
      fill="#000000"
      stroke="#000000"
      stroke-width="102.4"
      style={styles.styles}
    >
      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
      <G
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></G>
      <G id="SVGRepo_iconCarrier">
        <Path
          d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
          fill="#000000"
        ></Path>
      </G>
    </Svg>
  );
};

export default RightArrow;
