import { FC, useEffect, useReducer } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { IMenu, IOrderItemMenu } from "../types/interface";

type action = "increment" | "decrement";

interface IProps {
    menu: IMenu,
    onChangeMenuQuantity: (menuName: number, orderItem?: IOrderItemMenu) => void
}

const Menu: FC<IProps> = ({ menu, onChangeMenuQuantity }) => {
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

    const [quantity, dispach] = useReducer(
        reducer,
        menu.orderItem && !isNaN(menu.orderItem.quantity) ? menu.orderItem.quantity : 0
    );

    useEffect(() => {
        if(!menu.orderItem && quantity === 0)
            return;

        const orderItem = quantity === 0 && menu.orderItem && menu.orderItem.id === -1
            ? undefined
            : {
                id: menu.orderItem ? menu.orderItem.id : -1,
                price: quantity * menu.price,
                quantity: quantity,
                menuName: menu.name,
            };

        onChangeMenuQuantity(menu.id, orderItem);
    }, [quantity])

    return (
        <View className="h-40 flex-row items-center p-2 border-b border-gray-200">
            <Image className="w-40 h-full" source={require("../../assets/images/istockphoto-1190330112-612x612.jpg")} />
            <View className="m-3">
                <View className="flex-1">
                    <Text className="text-lg font-semibold">{menu.name}</Text>
                    <Text className="text-gray-400 text-lg">{menu.price} €</Text>
                </View>
                <View className="flex-row items-center">
                    <TouchableOpacity
                        className="w-10 h-10 bg-stone-200 
                        rounded-xl justify-center items-center"
                        onPress={() => dispach("decrement")}
                    >
                        <Text className="text-4xl text-black">-</Text>
                    </TouchableOpacity>
                    <Text className="px-4 text-lg font-bold">{quantity}</Text>
                    <TouchableOpacity
                        className="w-10 h-10 bg-stone-200 
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