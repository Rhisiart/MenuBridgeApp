import Divider from "@/src/components/divider";
import Floor from "@/src/components/floor";
import Tabbar from "@/src/components/tabbar";
import { useWebSocket } from "@/src/context/useWebSocket";
import { Commands } from "@/src/types/enum";
import { IFloor } from "@/src/types/interface";
import { Buffer } from "buffer";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

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

            if(!floors || floors.length === 0) {
                return;
            }

            setFloors(floors);
            setFloorSelected(floors[0]);
        });

        ws.send(Commands.Floors, 1, new Uint8Array(1));

        return () => {
            ws.eventListener.removeEvent("Floors");
        };

    }, [ws])

    return (
        <View>
            <View className="bg-white pt-5 pb-3 h-24">
            {floors && floorSelected && <Tabbar 
                    items={floors} 
                    tabSelected={floorSelected}
                    onSelected={(tabSelected) => setFloorSelected(tabSelected as IFloor)}
                />
            }
            </View>
            <Divider hasShadow />
            <View className="mt-5">
                {floorSelected && <Floor floor={floorSelected} />}
            </View>
        </View>
    );
}
