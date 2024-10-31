import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Floors() {
    //const [floors, setFloors] = useState<IFloor[]>();
    const [selectedFloor, setSelectedFloor] = useState<string>('Ground Floor');

    const floors = ["Ground Floor", "1st Floor", "2nd Floor", "3nd Floor", "Rooftop"];
    /*const ws = useWebSocket();

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

    }, [])*/

    return (
        <View style={styles.container}>
          {floors.map((floor) => (
            <TouchableOpacity
              key={floor}
              onPress={() => setSelectedFloor(floor)}
              style={[
                styles.button,
                selectedFloor === floor && styles.selectedButton,
              ]}
            >
              <Text style={selectedFloor === floor ? styles.selectedText : styles.text}>
                {floor}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 10,
    },
    button: {
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#fff',
    },
    selectedButton: {
      backgroundColor: '#000',
      borderColor: '#000',
    },
    text: {
      color: '#000',
    },
    selectedText: {
      color: '#fff',
    },
  });
