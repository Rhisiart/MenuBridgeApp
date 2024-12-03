import React, { FC } from "react";
import { Text, View } from "react-native";
import { useOrders } from "../context/useOrders";
import Order from "./order";

interface IProps {
}

const OrdersList: FC<IProps> = () => {
    const orders = useOrders();

    return (
        <View>
            <View className=" flex justify-between items-center px-4">
                <Text className="text-xl font-semibold">Orders list</Text>
            </View>
            <View className="mt-6 ml-8">
                {orders && orders.length > 0 
                    ? orders.map(order => (<Order key={order.id} {...order} />))
                    : <Text>Not orders for today yet!</Text>
                }
            </View>
        </View>
    )
} 

export default OrdersList;