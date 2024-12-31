import { FC, useState } from "react";
import { Button, Text, View } from "react-native";
import { IOrder } from "../types/interface";

const Order: FC<IOrder> = ({floorTable, createdOn}) => {
    const [title, setTitle] = useState("Mark Complete");

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
                    Table {floorTable.number}
                </Text>
                <Text className="mt-1 text-gray-400">
                    Placed at {getTime()}
                </Text>
            </View>
            <View>
                <Button title={title} >

                </Button>
            </View>
        </View>
    )
}

export default Order;