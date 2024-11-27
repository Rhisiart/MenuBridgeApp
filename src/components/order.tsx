import { FC } from "react";
import { Button, Text, View } from "react-native";
import { IOrder } from "../types/interface";

const Order: FC<IOrder> = ({tableId, createdOn}) => {
    const getTime = () => {
        const time = new Date(createdOn);
        const minutes = time.getMinutes() < 10 
            ? `0${time.getMinutes()}`
            : time.getMinutes();

        return `${time.getHours()}:${minutes}`;
    }

    return (
        <View className="flex justify-between">
            <View>
                <Text className="text-lg font-semibold">
                    Table {tableId}
                </Text>
                <Text className="mt-1 text-gray-400">
                    Placed at {getTime()}
                </Text>
            </View>
            <View>
                <Button  title="Mark Complete"/>
            </View>
        </View>
    )
}

export default Order;