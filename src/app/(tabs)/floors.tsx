import Divider from "@/src/components/divider";
import Floor from "@/src/components/floor";
import Tabbar from "@/src/components/tabbar";
import { useWebSocket } from "@/src/context/useWebSocket";
import { Commands } from "@/src/types/enum";
import { IFloor } from "@/src/types/interface";
import { Buffer } from "buffer";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Floors() {
    const [floors, setFloors] = useState<IFloor[]>();
    const [floorSelected, setFloorSelected] = useState<IFloor>();

    const ws = useWebSocket();

    useEffect(() => {
        if(!ws) {
            return;
        }

        ws.eventListener.addEvent("Floors", (data: Uint8Array) => {
            const str = Buffer.from(data).toString("utf-8");
            const floors: IFloor[] = JSON.parse(str);

            setFloors(floors);
        });

        ws.send(Commands.Floors, 1, new Uint8Array(1));

        return () => {
            ws.eventListener.removeEvent("Floors");
        };

    }, [])

    useEffect(() => {
        if(!floors || floors.length === 0)
            return;

        setFloorSelected(floors[0]);
    }, [floors])


    return (
        <View>
            <View className="bg-white" style={styles.container}>
            {floors && floorSelected && <Tabbar 
                    items={floors} 
                    tabSelected={floorSelected}
                    onSelected={(tabSelected) => setFloorSelected(tabSelected as IFloor)}
                />
            }
            </View>
            <Divider />
            <View className="mt-5">
            {floorSelected && <Floor floor={floorSelected}/>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    carousel: {
        paddingHorizontal: 10,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        marginRight: 10, // Space between buttons
    },
    selectedButton: {
        backgroundColor: '#000', // Adjust to your preferred active color
        borderColor: '#000',
    },
    text: {
        color: '#000',
    },
    selectedText: {
        color: '#fff',
    },
});
