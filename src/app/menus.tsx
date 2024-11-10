import Divider from "@/src/components/divider";
import Menu from "@/src/components/menu";
import Tabbar from "@/src/components/tabbar";
import { useWebSocket } from "@/src/context/useWebSocket";
import { IFloor, ITab } from "@/src/types/interface";
import { Buffer } from "buffer";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export default function Menus() {
  const [categories, setCategories] = useState<ITab[]>([{id: 1, name: "Starter"}, {id: 2, name: "Main Course"}, {id: 3, name: "Pasta"}, {id: 4, name: "Soup"}, {id: 5, name: "dessert"}]);
  const [categorySelected, setCategorySelected] = useState<ITab>({id: 2, name: "Main Course"});
  const [menus, setMenus] = useState<string[]>(["Beef fillet", "Penne mediterranean", "Sea food mix", "Grilled Salmon", "Beef fillet", "Hamburger", "Pizza"]);

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

    //ws.send(Commands.Menus, 1, new Uint8Array(1));

    return () => {
      ws.eventListener.removeEvent("Menus");
    };
  }, [ws]);

  return (
    <View>
      <View className="bg-white pt-5 pb-3">
        {categories && categorySelected && <Tabbar 
                items={categories} 
                tabSelected={categorySelected}
                onSelected={(tabSelected) => setCategorySelected(tabSelected as IFloor)}
            />
        }
      </View>
      <Divider />
      {menus && <FlatList 
                data={menus}
                keyExtractor={(item, idx) => `${item}_${idx}`}
                renderItem={(item) => <Menu name={item.item}/>}
                showsVerticalScrollIndicator={false}
              />
      }
    </View>
  );
}
