import { FC } from "react";
import { Image, Text, View } from "react-native";

interface IProps {
    name: string,
}

const Menu: FC<IProps> = ({name}) => {
    return (
        <View className="flex-shrink-0 m-3 relative overflow-hidden bg-white rounded-lg max-w-s shadow-lg">
            <View className="relative pt-10 px-10 flex items-center justify-center">
                <Image 
                    className="relative w-40"
                    source={require("../../assets/images/react-logo.png")}
                />
            </View>
            <View className="relative text-white px-6 pb-6 mt-6">
                <Text className="block opacity-75 -mb-1">{name}</Text>
                <View className="flex justify-between">
                    <Text 
                        className="block font-semibold text-xl"
                    >
                        description asdadahsjdlajks asd jkad asd ajkdsh asjd ajskd hajk
                    </Text>
                    <Text 
                        className="block bg-white rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center"
                    >
                        1
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Menu;