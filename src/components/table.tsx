import React, { FC } from "react";
import { View } from "react-native";
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import { ITable } from "../types/interface";

interface IProps {
    table: ITable
}

const Table: FC<IProps> = ({table}) => {
    return (
        <View>
          {table.capacity === 4 ? (
            <Svg width="120" height="100">
                <Rect x="25" y="25" width="70" height="60" fill="black" rx="8" />
                <SvgText
                x="60"
                y="55"
                textAnchor="middle"
                dy=".3em"
                fontSize="16"
                fill="#6b7b8c"
                >
                    {table.id}
                </SvgText>
                <Rect x="30" y="10" width="60" height="10" fill="black" rx="3" /> 
                <Rect x="30" y="90" width="60" height="10" fill="black" rx="3" />
                <Rect x="10" y="30" width="10" height="50" fill="black" rx="3" />
                <Rect x="100" y="30" width="10" height="50" fill="black" rx="3" />
            </Svg>
          ) : (
            <Svg width="280" height="100">
                <Rect x="30" y="25" width="215" height="60" fill="black" rx="8" />
                <SvgText
                    x="75"
                    y="40"
                    textAnchor="middle"
                    dy=".3em"
                fontSize="16"
                    fill="#6b7b8c"
                >
                    {table.id}
                </SvgText>
                <Rect x="35" y="10" width="65" height="10" fill="black" rx="3" /> 
                <Rect x="105" y="10" width="65" height="10" fill="black" rx="3" /> 
                <Rect x="175" y="10" width="65" height="10" fill="black" rx="3" /> 
                <Rect x="35" y="90" width="65" height="10" fill="black" rx="3" /> 
                <Rect x="105" y="90" width="65" height="10" fill="black" rx="3" /> 
                <Rect x="175" y="90" width="65" height="10" fill="black" rx="3" /> 
                <Rect x="15" y="30" width="10" height="50" fill="black" rx="3" />
                <Rect x="250" y="30" width="10" height="50" fill="black" rx="3" />
            </Svg>
          )}
        </View>
      );
}

export default Table;