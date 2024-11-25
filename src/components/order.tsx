import { FC } from "react";
import { Text, View } from "react-native";
import { IOrder } from "../types/interface";

const Order: FC<IOrder> = ({tableId}) => {
    return (
        <View>
            <Text>{tableId}</Text>
        </View>
    )
}

export default Order;