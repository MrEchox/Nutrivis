import React from "react";
import { Svg, Path } from 'react-native-svg';

export const getSvgByName = (name, fill = "black") => {
  let svgData;

  switch (name) {
    case "plus":
      svgData = (
        <Svg>
          <Path d="M94.87,41.19H58.83V5.14c0-2.82-2.31-5.13-5.13-5.13H46.3c-2.82,0-5.13,2.31-5.13,5.13v36.04H5.13
	C2.31,41.19,0,43.49,0,46.31v7.41c0,2.82,2.31,5.13,5.13,5.13h36.04v36.04c0,2.82,2.31,5.13,5.13,5.13h7.41
	c2.82,0,5.13-2.31,5.13-5.13V58.85h36.04c2.82,0,5.13-2.31,5.13-5.13v-7.41C100,43.49,97.69,41.19,94.87,41.19z"
            fill={fill} stroke={fill} />
        </Svg>
      );
      break;
    case "minus":
      svgData = (
        <Svg>
          <Path d="M0,53.72l0-7.41c0-2.82,2.31-5.13,5.13-5.13h89.75c2.82,0,5.13,2.31,5.13,5.13v7.41c0,2.82-2.31,5.13-5.13,5.13 H5.13C2.31,58.85,0,56.54,0,53.72z"
            fill={fill} stroke={fill} />
        </Svg>
      );
      break;
    case "water":
      svgData = (
        <Svg>
          <Path d="M20.6,2.5c-5.26,0-9.28,4.68-8.5,9.87L23.16,86.1c0.95,6.31,6.37,10.98,12.75,10.98h28.18
	c6.38,0,11.81-4.67,12.75-10.98L87.9,12.38c0.78-5.2-3.25-9.87-8.5-9.87H20.6z M20.6,11.1h58.8l-2.58,17.2H23.18L20.6,11.1z
	 M24.47,36.89l7.19,47.93c0.32,2.1,2.12,3.66,4.25,3.66h28.18c2.13,0,3.94-1.56,4.25-3.66l7.19-47.93H24.47z"
            fill={fill} stroke={fill} />
        </Svg>
      );
      break;
    default:
      svgData = null;
      break;
  }

  return svgData;
};
