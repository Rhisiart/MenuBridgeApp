import { useWebSocket } from "@/context/useWebSocket";
import { Commands } from "@/types/enum";
import { Buffer } from 'buffer';
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

        ws.send(Commands.Menus, 1, new Uint8Array());
    }

    useEffect(() => {
        if(!ws) {
            return;
        }

        ws.eventListener.addEvent("Menus", (data: Uint8Array) => {
            const str = Buffer.from(data).toString('utf-8');
            const menus: string[] = JSON.parse(str);

            setMenus(menus)
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