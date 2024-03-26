import React from "react";
import { View } from "react-native";
import { Svg, Path } from 'react-native-svg';

const CircularProgress = (props) => {
  const { size, strokeWidth, text, back, fill} = props;
  const radius = (size - strokeWidth) / 2;
  const circum = 2 * Math.PI * radius;
  const offset = (1 - props.progressPercent / 100) * circum;

  return (
    <View style={{ margin: 10 }}>
      <Svg width={size} height={size} viewBox="0 0 95 110">
        {/* Egg shape */}
        <Path
          d="M47,103c22.03-0.36,29.99-14.66,32.71-25.54C85.69,53.58,64.73,8,46.1,8l0.03,0C27.5,8,6.54,53.58,12.52,77.46
          c2.72,10.88,11.56,25.18,33.6,25.54H47z"
          fill="none"
          stroke={back}
          strokeWidth={strokeWidth}
        />

        {/* Progress */}
        <Path 
          d="M47,103c22.03-0.36,29.99-14.66,32.71-25.54C85.69,53.58,64.73,8,46.1,8l0.03,0C27.5,8,6.54,53.58,12.52,77.46
          c2.72,10.88,11.56,25.18,33.6,25.54H47z"
          fill="none"
          stroke={fill}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circum*0.9} ${circum}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        
        {/* <SVGText
          fontSize={props.textSize ? props.textSize : "10"}
          x={size / 2}
          y={size / 2 + (props.textSize ? (props.textSize / 2) - 1 : 5)}
          textAnchor="middle"
          fill={props.textColor ? props.textColor : "#333333"}
        >
          {text}
        </SVGText> */}
      </Svg>
    </View>
  )
}

export default CircularProgress;
