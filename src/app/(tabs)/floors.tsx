import Floor from "@/src/components/floor";
import { useWebSocket } from "@/src/context/useWebSocket";
import { Commands } from "@/src/types/enum";
import { IFloor } from "@/src/types/interface";
import { Buffer } from "buffer";
import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

    const renderItem = (itemInfo: ListRenderItemInfo<IFloor>) => (
        <TouchableOpacity
            onPress={() => setFloorSelected(itemInfo.item)}
            style={[
                styles.button,
                floorSelected && floorSelected.id === itemInfo.item.id && styles.selectedButton,
            ]}
        >
            <Text 
                style={floorSelected && floorSelected.id === itemInfo.item.id 
                ? styles.selectedText 
                : styles.text}
            >
                {itemInfo.item.name}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View>
            <View style={styles.container}>
            {floors && <FlatList
                            data={floors}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.name}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.carousel}
                        />
            }
            </View>
            <View>
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
