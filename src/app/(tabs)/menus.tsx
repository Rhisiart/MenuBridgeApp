import Menu from "@/src/components/menu";
import { useWebSocket } from "@/src/context/useWebSocket";
import { Commands } from "@/src/types/enum";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

export default function Menus() {
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
    <>
      {menus && <ScrollView showsVerticalScrollIndicator={false}>
        {menus.map((menu) => <Menu key={menu} name={menu}/>)}
        </ScrollView>
      }
    </>
  );
}
