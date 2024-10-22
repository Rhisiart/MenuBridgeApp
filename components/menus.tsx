import { useWebSocket } from "@/context/useWebSocket";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

interface IProps {

}

const Menus: React.FC<IProps> = () => {
    const [menus, setMenus] = useState<string[]>();

    const ws = useWebSocket();

    const onPressButton = () => {
        if(!ws) {
            return;
        }

        console.log("Pressing the button")

        ws.eventListener.notifyListener("Menus", ["Bitoque", "Bacalhau com natas"])
    }

    useEffect(() => {
        console.log(ws)

        if(!ws) {
            console.log("not found a ws")
            return;
        }
        
        console.log("Found a ws")

        ws.eventListener.addEvent("Menus", (data: string[]) => {
            console.log("Updating the Menus array");
            setMenus(data)
        });

        return () => {
            ws.eventListener.removeEvent("Menus");
        }
    }, [ws])


    return(
        <View>
            {
                menus && menus.map(menu => {
                    return <Text key={menu}>
                        {menu}
                    </Text>
                })
            }
            <Button 
                title="Event"
                color="rgb(10, 106, 182)"
                onPress={onPressButton}
            />
        </View>
    )
}

export default Menus