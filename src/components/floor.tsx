import { FC } from "react";
import { View } from "react-native";
import { IFloor } from "../types/interface";

interface IProps {
    floor: IFloor
}

const Floor: FC<IProps> = ({floor}) => {
    return (
        <View>

        </View>
    )
}

export default Floor;