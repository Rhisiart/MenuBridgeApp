import { FC } from "react";
import { Text, View } from "react-native";
import { IOrder } from "../types/interface";

interface IProps {
    orders: IOrder[]
}

const OrdersList: FC<IProps> = () => {
    return (
        <View>
            <Text>Orders list</Text>
        </View>
    )
} 

export default OrdersList;