import { FC } from "react";
import { View } from "react-native";

interface IProps {}

const Divider: FC<IProps> = () => {
    return (
        <View className="border-b border-gray-200 opacity-75 shadow-3xl" />
    )
}

export default Divider;