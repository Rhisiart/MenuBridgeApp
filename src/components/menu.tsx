import { FC, useReducer } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type action = "increment" | "decrement";

interface IProps {
    name: string,
}

const Menu: FC<IProps> = ({name}) => {
    const reducer = (state: number, action: action) => {
        switch (action) {
            case "increment":
                return state + 1;
            case "decrement":
                return state - 1 > 0 ? state - 1 : 0;
            default:
                return state;
        }
    }

    const [state, dispach] = useReducer(reducer, 0);

    return (
        <View className="h-40 flex-row items-center p-2 border-b border-gray-200">
            <Image className="w-40 h-full" source={require("../../assets/images/istockphoto-1190330112-612x612.jpg")} />
            <View className="m-3">
                <View className="flex-1">
                    <Text className="text-lg font-semibold">{name}</Text>
                    <Text className="text-gray-500 text-lg">{10}€</Text>
                </View>
                <View className="flex-row items-center">
                    <TouchableOpacity 
                        className="w-10 h-10 bg-gray-100 
                        rounded-xl justify-center items-center"
                        onPress={() => dispach("decrement")}
                    >
                        <Text className="text-4xl text-black">-</Text>
                    </TouchableOpacity>
                    <Text className="px-4 text-lg font-bold">{state}</Text>
                    <TouchableOpacity 
                        className="w-10 h-10 bg-gray-100 
                        rounded-xl justify-center items-center"
                        onPress={() => dispach("increment")}
                    >
                        <Text className="text-3xl text-black">+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity>
                <Text className="text-gray-400 text-lg">›</Text>
            </TouchableOpacity>
    </View>
    )
}

export default Menu;