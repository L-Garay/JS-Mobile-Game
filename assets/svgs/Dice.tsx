import * as React from 'react';
import { StyleSheet } from 'react-native';
import { CustomSVGProps } from '../../constants/SharedTypes';
import Svg, { Path, G } from 'react-native-svg';

const Dice = ({ fill, svgStyle }: CustomSVGProps) => {
  const styles = StyleSheet.create({ ...svgStyle });
  return (
    <Svg
      width="32px"
      height="32px"
      viewBox="0 0 1024 1024"
      fill="#000000"
      stroke="#000000"
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
          d="M386.2 899.3H109.9c-42.5 0-77-34.5-77-77V545.9c0-42.5 34.5-77 77-77h276.4c42.5 0 77 34.5 77 77v276.4c0 42.5-34.5 77-77.1 77z"
          fill="#ffffff"
        ></Path>
        <Path
          d="M386.2 914.3H109.9c-50.7 0-92-41.3-92-92V545.9c0-50.7 41.3-92 92-92h276.4c50.7 0 92 41.3 92 92v276.4c0 50.7-41.3 92-92.1 92zM109.9 483.9c-34.2 0-62 27.8-62 62v276.4c0 34.2 27.8 62 62 62h276.4c34.2 0 62-27.8 62-62V545.9c0-34.2-27.8-62-62-62H109.9z"
          fill="#000000"
        ></Path>
        <Path
          d="M248.1 684.1m-35 0a35 35 0 1 0 70 0 35 35 0 1 0-70 0Z"
          fill="#84daf2"
        ></Path>
        <Path
          d="M248.1 734.1c-27.6 0-50-22.4-50-50s22.4-50 50-50 50 22.4 50 50-22.4 50-50 50z m0-70.1c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20z"
          fill="#000000"
        ></Path>
        <Path
          d="M146.2 567.8m-35 0a35 35 0 1 0 70 0 35 35 0 1 0-70 0Z"
          fill="#84daf2"
        ></Path>
        <Path
          d="M146.2 617.8c-27.6 0-50-22.4-50-50s22.4-50 50-50 50 22.4 50 50-22.5 50-50 50z m0-70c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20z"
          fill="#000000"
        ></Path>
        <Path
          d="M350 567.8m-35 0a35 35 0 1 0 70 0 35 35 0 1 0-70 0Z"
          fill="#84daf2"
        ></Path>
        <Path
          d="M350 617.8c-27.6 0-50-22.4-50-50s22.4-50 50-50 50 22.4 50 50-22.4 50-50 50z m0-70c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20z"
          fill="#000000"
        ></Path>
        <Path
          d="M146.2 800.3m-35 0a35 35 0 1 0 70 0 35 35 0 1 0-70 0Z"
          fill="#84daf2"
        ></Path>
        <Path
          d="M146.2 850.3c-27.6 0-50-22.4-50-50s22.4-50 50-50 50 22.4 50 50-22.5 50-50 50z m0-70c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20z"
          fill="#000000"
        ></Path>
        <Path
          d="M350 800.3m-35 0a35 35 0 1 0 70 0 35 35 0 1 0-70 0Z"
          fill="#84daf2"
        ></Path>
        <Path
          d="M350 850.3c-27.6 0-50-22.4-50-50s22.4-50 50-50 50 22.4 50 50-22.4 50-50 50z m0-70c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20z"
          fill="#000000"
        ></Path>
        <Path
          d="M932 500.3L691.2 635.9c-37.1 20.9-84 7.7-104.9-29.3L450.7 365.8c-20.9-37.1-7.7-84 29.3-104.9l240.8-135.6c37.1-20.9 84-7.7 104.9 29.3l135.6 240.8c20.9 37.1 7.7 84.1-29.3 104.9z"
          fill="#ffffff"
        ></Path>
        <Path
          d="M653.5 660.8c-32.2 0-63.5-16.9-80.3-46.9L437.6 373.1c-12.1-21.4-15.1-46.3-8.4-69.9s22.1-43.4 43.5-55.4l240.8-135.6c21.4-12.1 46.3-15.1 69.9-8.4 23.7 6.6 43.4 22.1 55.4 43.5l135.6 240.8c12.1 21.4 15.1 46.3 8.4 69.9-6.6 23.7-22.1 43.4-43.5 55.4l-7.4-13.1 7.4 13.1L698.5 649c-14.2 8-29.7 11.8-45 11.8z m105-530.4c-10.5 0-20.9 2.7-30.3 8L487.4 273.9c-14.4 8.1-24.8 21.4-29.3 37.3s-2.4 32.7 5.7 47.1l135.6 240.8c16.8 29.8 54.7 40.4 84.5 23.6l240.8-135.6c14.4-8.1 24.8-21.4 29.3-37.3 4.5-16 2.4-32.7-5.7-47.1L812.7 162c-8.1-14.4-21.4-24.8-37.3-29.3-5.6-1.6-11.3-2.3-16.9-2.3z"
          fill="#000000"
        ></Path>
        <Path
          d="M706 380.6m-35 0a35 35 0 1 0 70 0 35 35 0 1 0-70 0Z"
          fill="#84daf2"
        ></Path>
        <Path
          d="M706.1 430.7c-4.5 0-9.1-0.6-13.5-1.9-12.9-3.6-23.6-12-30.1-23.6-6.6-11.6-8.2-25.1-4.6-38 3.6-12.9 12-23.6 23.6-30.1 11.6-6.6 25.1-8.2 38-4.6 12.9 3.6 23.6 12 30.1 23.6 6.6 11.6 8.2 25.1 4.6 38-3.6 12.9-12 23.6-23.6 30.1-7.7 4.3-16.1 6.5-24.5 6.5z m-0.1-70.1c-3.4 0-6.8 0.9-9.8 2.6-4.7 2.6-8 6.9-9.5 12.1-1.4 5.2-0.8 10.6 1.8 15.2 2.6 4.7 6.9 8 12.1 9.5 5.2 1.4 10.6 0.8 15.2-1.8 4.7-2.6 8-6.9 9.5-12.1 1.4-5.2 0.8-10.6-1.8-15.2-2.6-4.7-6.9-8-12.1-9.5-1.8-0.6-3.6-0.8-5.4-0.8z"
          fill="#000000"
        ></Path>
        <Path
          d="M560.2 329.3m-35 0a35 35 0 1 0 70 0 35 35 0 1 0-70 0Z"
          fill="#84daf2"
        ></Path>
        <Path
          d="M560.2 379.3c-17.5 0-34.5-9.2-43.7-25.5-13.5-24-5-54.6 19.1-68.1 24-13.5 54.6-5 68.1 19.1 13.5 24 5 54.6-19.1 68.1-7.6 4.4-16.1 6.4-24.4 6.4z m-0.1-70c-3.3 0-6.7 0.8-9.8 2.6-9.6 5.4-13 17.7-7.6 27.3 5.4 9.6 17.7 13 27.3 7.6 9.6-5.4 13-17.7 7.6-27.3-3.7-6.5-10.5-10.2-17.5-10.2z"
          fill="#000000"
        ></Path>
        <Path
          d="M851.8 431.9m-35 0a35 35 0 1 0 70 0 35 35 0 1 0-70 0Z"
          fill="#84daf2"
        ></Path>
        <Path
          d="M851.9 481.9c-17.5 0-34.5-9.2-43.7-25.5-13.5-24-5-54.6 19.1-68.1 24-13.5 54.6-5 68.1 19.1 13.5 24 5 54.6-19.1 68.1-7.7 4.4-16.1 6.4-24.4 6.4z m-0.1-70c-3.3 0-6.7 0.8-9.8 2.6-9.6 5.4-13 17.7-7.6 27.3 5.4 9.6 17.7 13 27.3 7.6 9.6-5.4 13-17.7 7.6-27.3-3.7-6.6-10.5-10.2-17.5-10.2z"
          fill="#000000"
        ></Path>
      </G>
    </Svg>
  );
};

export default Dice;
