import { useWebSocket } from "@/src/context/useWebSocket";
import { Commands } from "@/src/types/enum";
import { Buffer } from "buffer";
import { FC, useEffect, useState } from "react";
import { Text, View } from "react-native";

interface IProps {}

const Menus: FC<IProps> = () => {
  const [menus, setMenus] = useState<string[]>();

  const ws = useWebSocket();

  useEffect(() => {
    if (!ws) {
      return;
    }

    ws.eventListener.addEvent("Menus", (data: Uint8Array) => {
      const str = Buffer.from(data).toString("utf-8");
      const menus: string[] = JSON.parse(str);

      setMenus(menus);
    });

    ws.send(Commands.Menus, 1, new Uint8Array(1));

    return () => {
      ws.eventListener.removeEvent("Menus");
    };
  }, [ws]);

  return (
    <View>
      {menus &&
        menus.map((menu) => {
          return <Text className="bg-blue-400 text-lg" key={menu}>{menu}</Text>;
        })}
    </View>
  );
};

export default Menus;
