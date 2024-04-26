import React from "react";
import { View } from "react-native";
import { Svg, Path } from 'react-native-svg';

const CircularProgress = (props) => {
  const { size, strokeWidth, text, back, fill} = props;
  const radius = (size - strokeWidth) / 2;
  const circum = 2 * Math.PI * radius;
  let offset;

  if (props.progressPercent <= 100) {
    offset = 1 - (1 - props.progressPercent / 100) * circum;
  } else {
    offset = 1;
  }
  return (
    
    <View style={{ margin: 10 }}>
      <Svg width={size} height={size} viewBox="0 0 95 110">
        {/* Egg shape */}
        <Path
          d="M46.1,103c22-0.4,30.9-14.7,33.6-25.5c2.9-11.6-0.5-28.2-7-42.4C65.9,20.1,55.7,8,46.1,8h0
          c-9.8,0-20.2,12.5-27,27.9c-6.2,13.9-9.4,30.2-6.6,41.5c2.7,10.9,10.7,25.2,32.7,25.5H46.1z"
          fill="none"
          stroke={back}
          strokeWidth={strokeWidth}
        />

        {/* Progress */}
        <Path 
          d="M46.1,103c22-0.4,30.9-14.7,33.6-25.5c2.9-11.6-0.5-28.2-7-42.4C65.9,20.1,55.7,8,46.1,8h0
          c-9.8,0-20.2,12.5-27,27.9c-6.2,13.9-9.4,30.2-6.6,41.5c2.7,10.9,10.7,25.2,32.7,25.5H46.1z"
          fill="none"
          stroke={fill}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circum} ${circum}`}
          strokeDashoffset={offset*0.85}
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
