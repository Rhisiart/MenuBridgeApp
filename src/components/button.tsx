import { FC, ReactNode } from "react";
import { Pressable, View } from "react-native";

type elements = "screen" | "modal";

interface IProps {
    children: ReactNode,
    elememt: elements,
    onPress: () => void,
}

const Button: FC<IProps> = ({children, elememt, onPress}) => {
  const bottomStyle = {
    modal: "bottom-7",
    screen: "bottom-52",
  } 

  return (
      <Pressable onPress={onPress}>
        <View className={`w-11/12 h-16 absolute ${bottomStyle[elememt]} bg-black rounded-2xl ml-5`}>
          {children}
        </View>
      </Pressable>
  )
}

export default Button;