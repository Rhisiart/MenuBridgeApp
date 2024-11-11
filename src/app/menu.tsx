import Divider from "@/src/components/divider";
import Menu from "@/src/components/menu";
import Tabbar from "@/src/components/tabbar";
import { useWebSocket } from "@/src/context/useWebSocket";
import { ICategory, IMenu } from "@/src/types/interface";
import { Buffer } from "buffer";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Commands } from "../types/enum";

export default function Menus() {
  const [categories, setCategories] = useState<ICategory[]>();
  const [categorySelected, setCategorySelected] = useState<ICategory>();
  const [menus, setMenus] = useState<IMenu[]>();

  const ws = useWebSocket();

  useEffect(() => {
    if (!ws) {
      return;
    }

    ws.eventListener.addEvent("Menus", (data: Uint8Array) => {
      const str = Buffer.from(data).toString("utf-8");
      const categories: ICategory[] = JSON.parse(str);

      if(!categories || categories.length === 0) {
        return; 
      }

      setCategories(categories);
      setCategorySelected(categories[0]);
    });

    ws.send(Commands.Menus, 1, new Uint8Array(1));
    
    return () => {
      ws.eventListener.removeEvent("Menus");
    };
  }, [ws]);

  return (
    <View className="bg-white">
      <View className="pt-5 pb-3">
        {categories && categorySelected && <Tabbar 
                items={categories} 
                tabSelected={categorySelected}
                onSelected={(tabSelected) => setCategorySelected(tabSelected as ICategory)}
            />
        }
      </View>
      <Divider hasShadow />
      {categorySelected && <FlatList 
                data={categorySelected.menus}
                keyExtractor={item => `${item.id}_${item.name}`}
                renderItem={(item) => <Menu menu={item.item}/>}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 82}}
                ItemSeparatorComponent={() => <Divider hasShadow={false} />}
              />
      }
    </View>
  );
}
