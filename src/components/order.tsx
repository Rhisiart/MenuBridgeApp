import { UnknownOutputParams, useGlobalSearchParams } from "expo-router";
import { FC, memo, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { usePortal } from "../context/usePortal";
import { ButtonsTitles } from "../types/enum";
import { IFloorTable, IOrder } from "../types/interface";
import { convertParamsToNumber, isRecordEmpty } from "../utils/utils";
import Button from "./button";

type OrderButton = {
    title: string,
    buttonStyle: string,
    textStyle: string
}

const Order: FC<IOrder> = ({floorTable, createdOn}) => {
    const params = useGlobalSearchParams();
    const { close } = usePortal();
    const [buttonProps, setButtonProps] = useState<OrderButton>({ title: ButtonsTitles.Complete, buttonStyle: "w-36 h-10 p-2 bg-gray-200 rounded-xl", textStyle: "text-black"});

    const getTime = (createdOn: string) => {
        const time = new Date(createdOn);
        const minutes = time.getMinutes() < 10 
            ? `0${time.getMinutes()}`
            : time.getMinutes();

        return `${time.getHours()}:${minutes}`;
    }

    const validateOrder = (params: UnknownOutputParams, floorTable: IFloorTable) => {
        if(isRecordEmpty(params))
            return false;

        const tableId = convertParamsToNumber(params, "id");
        const floorId = convertParamsToNumber(params, "floorId");
        const tableNumber = convertParamsToNumber(params, "tableNumber");

        return tableId === floorTable.tableId && 
            floorId === floorTable.floorId && 
            tableNumber === floorTable.number;
    }

    const onPressButton = () => {
        if(buttonProps.title === ButtonsTitles.Editing) {
            close();
        }else {
            console.log("The Mark complete button was clicked!");
        }
    }

    useEffect(() => {
        const inTheOrderStack = validateOrder(params, floorTable);
        const props = inTheOrderStack
        ? { title: ButtonsTitles.Editing, buttonStyle: "bg-black", textStyle: "text-white"}
        : { title: ButtonsTitles.Complete, buttonStyle: "bg-gray-200", textStyle: "text-black"};

        setButtonProps(props);
    }, [params, floorTable])

    return (
        <View className="w-80 flex-row justify-between m-3">
            <View>
                <Text className="text-lg font-semibold">
                    Table {floorTable.number}
                </Text>
                <Text className="mt-1 text-gray-400">
                    Placed at {getTime(createdOn)}
                </Text>
            </View>
            <View className="mt-2">
                <Button 
                    onPress={onPressButton}
                    style={`w-36 h-10 p-2 rounded-xl ${buttonProps.buttonStyle}`}
                >
                    <View>
                        <Text className={`${buttonProps.textStyle}`}>
                            {buttonProps.title}
                        </Text>
                    </View>
                </Button>
            </View>
        </View>
    )
}

export default memo(Order);