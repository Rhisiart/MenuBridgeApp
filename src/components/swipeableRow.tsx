import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { IOrderItemMenu } from "../types/interface";

interface IProps {
    menuId: string,
    orderItemMenu: IOrderItemMenu,
}

const SwipeableRow: FC<IProps> = ({menuId, orderItemMenu}) => {
  const renderRightActions = () => (
    <View className="flex-row w-52 items-center justify-center bg-stone-100">
      <TouchableOpacity 
        className="w-10 h-10 m-2 bg-black justify-center items-center rounded-xl"
      >
        <FontAwesome name="pencil" size={16} color="white" />
      </TouchableOpacity>
      <TouchableOpacity 
        className="w-10 h-10 m-2 bg-black justify-center items-center rounded-xl"
      >
        <FontAwesome name="copy" size={16} color="white" />
      </TouchableOpacity>
      <TouchableOpacity 
        className="w-10 h-10 m-2 bg-black justify-center items-center rounded-xl"
      >
        <FontAwesome name="trash" size={16} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ReanimatedSwipeable 
      friction={1}
      overshootRight={false}
      renderRightActions={renderRightActions}
    >
      <View 
        className="h-28 flex-row justify-between 
        items-center p-8 border-b
         border-gray-200 bg-white"
      >
        <View className="flex-row">
          <Text className="text-lg text-gray-600">{orderItemMenu.quantity}</Text>
          <View className="ml-2">
            <Text className="text-lg font-bold text-gray-800">{orderItemMenu.menuName}</Text>
            <Text className="mt-3 text-gray-400">Vegetables, Well-done</Text>
          </View>
        </View>
        <Text className="text-lg font-bold">{orderItemMenu.price} €</Text>
      </View>
    </ReanimatedSwipeable>
  );
} 

export default SwipeableRow;