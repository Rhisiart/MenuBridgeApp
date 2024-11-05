import { FC } from "react";
import { View } from "react-native";

interface IProps {}

const Divider: FC<IProps> = () => {
    return (
        <View className="border-b border-gray-200 shadow-md shadow-gray-800" />
    )
}

export default Divider;