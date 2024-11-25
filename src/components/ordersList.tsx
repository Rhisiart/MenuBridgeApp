import React, { FC } from "react";
import { Text, View } from "react-native";
import { useOrders } from "../context/useOrders";
import Order from "./order";

interface IProps {
}

const OrdersList: FC<IProps> = () => {
    const orders = useOrders();

   console.log(`orders = ${orders}`);

    return (
        <View>
            <View>
                <Text>Orders list</Text>
            </View>
            <View>
                {orders && orders.length > 0 
                    ? orders.map(order => (<Order {...order}/>))
                    : <Text>Not orders for today yet!</Text>
                }
            </View>
        </View>
    )
} 

export default OrdersList;