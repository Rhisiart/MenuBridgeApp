import { FC } from "react";
import { View } from "react-native";
import { IFloor } from "../types/interface";
import Table from "./table";

interface IProps {
    floor: IFloor
}

const Floor: FC<IProps> = ({floor}) => {
    return (
        <View className="flex-row flex-wrap justify-center mx-auto">
        { floor.tables.map((table, idx) => 
            <Table key={`${idx}`} table={table}/>
        ) }
        </View>
    )
}

export default Floor;