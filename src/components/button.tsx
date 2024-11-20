import { FC, ReactNode } from "react";
import { Pressable, View } from "react-native";

interface IProps {
    children: ReactNode,
    onPress: () => void,
}

const Button: FC<IProps> = ({children, onPress}) => {
    return (
        <Pressable onPress={onPress}>
          <View className="w-11/12 h-16 absolute bottom-52 bg-black rounded-2xl ml-5">
            <View className="flex-row justify-between p-5">
                {children}
            </View>
          </View>
        </Pressable>
    )
}

export default Button;