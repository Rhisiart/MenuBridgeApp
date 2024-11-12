import Divider from "@/src/components/divider";
import Menu from "@/src/components/menu";
import Tabbar from "@/src/components/tabbar";
import { useWebSocket } from "@/src/context/useWebSocket";
import { ICategory, IMenu } from "@/src/types/interface";
import { Buffer } from "buffer";
import React, { useEffect, useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";
import { Commands } from "../types/enum";

export default function Menus() {
  const [categories, setCategories] = useState<ICategory[]>();
  const [categorySelected, setCategorySelected] = useState<ICategory>();
  const [menus, setMenus] = useState<IMenu[]>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  
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
    <View>
      <View className="pt-5 pb-3">
        {categories && categorySelected && <Tabbar 
                items={categories} 
                tabSelected={categorySelected}
                onSelected={(tabSelected) => setCategorySelected(tabSelected as ICategory)}
            />
        }
      </View>
      <Divider hasShadow />
      <View>
        <Modal
          transparent 
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => {
            setModalVisible(visible => !visible);
          }}
        >
          <View className="h-2/4 w-full bg-white">
            <Text>Modal</Text>
          </View>
        </Modal>
        {categorySelected && <FlatList 
                  data={categorySelected.menus}
                  keyExtractor={item => `${item.id}_${item.name}`}
                  renderItem={(item) => <Menu menu={item.item}/>}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => <Divider hasShadow={false} />}
                  contentContainerStyle={{ height: "100%", paddingBottom: 82 }}
                />
        }
        <Pressable onPress={() => setModalVisible(visible => !visible)}>
          <View className="w-11/12 h-16 absolute bottom-52 bg-black rounded-2xl ml-5">
            <View className="flex-row justify-between p-5">
              <Text className="text-white">5 items selected</Text>
              <Text className="text-white">View Order</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
