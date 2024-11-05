import { FC } from "react";
import { Text, View } from "react-native";

interface IProps {
    title: string,
    hasDivider: boolean,
}

const Header: FC<IProps> = ({title, hasDivider}) => {
    return (
        <View className="pt-12 pb-6 bg-white">
            <View className="flex-row justify-center items-center px-4">
                <Text className="text-2xl font-bold ">{title}</Text>
            </View>
        </View>
    )
}

export default Header;