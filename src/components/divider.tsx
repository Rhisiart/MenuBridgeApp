import { FC } from "react";
import { View } from "react-native";

interface IProps {
    hasShadow: boolean,
}

const Divider: FC<IProps> = ({hasShadow}) => {
    const style = hasShadow 
    ? "border-b border-gray-200 opacity-75 shadow-3xl" 
    : "border-b border-gray-200";


    return (
        <View className={style} />
    )
}

export default Divider;