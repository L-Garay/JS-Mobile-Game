import * as React from 'react';
import { StyleSheet } from 'react-native';
import { CustomSVGProps } from '../../constants/SharedTypes';
import Svg, { Path, G, Circle, Polygon } from 'react-native-svg';

const Mummy = ({ fill, svgStyle }: CustomSVGProps) => {
  const styles = StyleSheet.create({ ...svgStyle });
  return (
    <Svg
      height="64px"
      width="64px"
      id="Layer_1"
      viewBox="0 0 512 512"
      fill="#000000"
    >
      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
      <G
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></G>
      <G id="SVGRepo_iconCarrier">
        <G>
          <Path
            fill="#5F4D37"
            d="M445.217,200.348h-33.391v133.565h33.391c36.883,0,66.783-29.9,66.783-66.783 S482.1,200.348,445.217,200.348z"
          ></Path>
          <Path
            fill="#5F4D37"
            d="M66.783,200.348h33.391v133.565H66.783C29.9,333.913,0,304.013,0,267.13 S29.9,200.348,66.783,200.348z"
          ></Path>
        </G>
        <Path
          fill="#806749"
          d="M100.174,150.372l311.652,200.236H87.93H68.897c-1.447-9.016-2.115-18.365-2.115-27.826v-22.261 v-66.783v-33.391v-11.13c0-13.357,1.336-26.379,4.007-38.957h29.496h-0.111V150.372z"
        ></Path>
        <Polygon
          fill="#5F4D37"
          points="256,250.419 256,350.609 411.826,350.609 "
        ></Polygon>
        <Circle fill="#FFDA44" cx="183.652" cy="250.435" r="50.087"></Circle>
        <Path
          fill="#ACABB1"
          d="M445.217,233.739v52.424L233.739,150.261H441.21c2.671,12.577,4.007,25.6,4.007,38.957v11.13V233.739 z"
        ></Path>
        <G>
          <Path
            fill="#C6C5CA"
            d="M411.826,350.609h31.277c-5.677,39.179-23.485,74.574-49.419,102.4h-0.111l-138.129-46.303 L87.93,350.609H411.826z"
          ></Path>
          <Path
            fill="#C6C5CA"
            d="M441.21,150.261H233.739H100.397L256,98.282l132.452-44.188 C414.72,79.805,433.419,112.974,441.21,150.261z"
          ></Path>
        </G>
        <G>
          <Path
            fill="#ACABB1"
            d="M255.443,406.483l138.129,46.08c-1.224,1.336-2.449,2.671-3.784,4.007 C355.506,490.852,308.313,512,256,512c-54.428,0-103.513-22.929-137.906-59.77L255.443,406.483z"
          ></Path>
          <Path
            fill="#ACABB1"
            d="M388.452,54.094L256,98.282L123.548,54.094C157.718,20.591,204.355,0,256,0 S354.282,20.591,388.452,54.094z"
          ></Path>
        </G>
        <G>
          <Path
            fill="#E0E0E2"
            d="M445.217,300.522v22.261c0,9.461-0.668,18.81-2.115,27.826h-31.277L100.174,150.372v-0.111h133.565 l211.478,135.903V300.522z"
          ></Path>
          <Path
            fill="#E0E0E2"
            d="M70.79,150.261c7.791-37.287,26.49-70.456,52.758-96.167L256,98.282l-155.603,51.979h-0.111H70.79z"
          ></Path>
          <Path
            fill="#E0E0E2"
            d="M87.93,350.609l167.513,55.875l-137.35,45.746c-25.823-27.381-43.52-62.553-49.197-101.621H87.93z"
          ></Path>
        </G>
      </G>
    </Svg>
  );
};

export default Mummy;
