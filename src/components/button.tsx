import { FC, ReactNode } from "react";
import { Pressable, View } from "react-native";

type elements = "screen" | "modal";

interface IProps {
    children: ReactNode,
    style: string,
    onPress: () => void,
}

const Button: FC<IProps> = ({children, style, onPress}) => {
  return (
      <Pressable onPress={onPress}>
        <View className={style}>
          {children}
        </View>
      </Pressable>
  )
}

export default Button;