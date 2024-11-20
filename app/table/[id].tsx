import Divider from "@/src/components/divider";
import Menu from "@/src/components/menu";
import Modal from "@/src/components/modal";
import SwipeableRow from "@/src/components/swipeableRow";
import Tabbar from "@/src/components/tabbar";
import { useWebSocket } from "@/src/context/useWebSocket";
import { Commands } from "@/src/types/enum";
import { ICategory, IOrderItem } from "@/src/types/interface";
import { Buffer } from "buffer";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

type params = {
  id: string,
  order: string,
  floor: string,
}

type orderItems = {
  [key: string]: IOrderItem
}

export default function Table() {
  const [categories, setCategories] = useState<ICategory[]>();
  const [categorySelected, setCategorySelected] = useState<ICategory>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [orderItems, setOrderItems] = useState<orderItems>();
  const [totalItems, setTotalItems] = useState<number>(0);

  const ws = useWebSocket();
  const { id, order, floor} = useLocalSearchParams<params>();
  const buffer = new Uint8Array(1);

  buffer[0] = Number(order);

  const onChangeMenuQuantity = (menuName: string, orderItem: IOrderItem) => {
    setOrderItems(orderItems => ({...orderItems, [menuName]: orderItem}));
  }

  useEffect(() => {
    if (!ws) {
      return;
    }

    ws.eventListener.addEvent("Menus", (data: Uint8Array) => {
      const str = Buffer.from(data).toString("utf-8");
      const categories: ICategory[] = JSON.parse(str);

      if (!categories || categories.length === 0) {
        return;
      }

      setCategories(categories);
      setCategorySelected(categories[0]);
    });

    ws.send(Commands.Menus, 1, new Uint8Array(buffer));

    return () => {
      ws.eventListener.removeEvent("Menus");
    };
  }, [ws]);

  useEffect(() => {
    console.log(orderItems);
  }, [orderItems]);

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
          visible={modalVisible} 
          onClose={() => setModalVisible(visible => !visible)}
        >
            {orderItems && Object.keys(orderItems).length > 0 ?  
              <FlatList
                data={Object.entries(orderItems)}
                keyExtractor={item => item[0]}
                renderItem={item => <SwipeableRow menuId={item.item[0]} orderItem={item.item[1]} />}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <Divider hasShadow={false} />}
              />
              :
              <Text>No Menus choosed</Text>
            }
        </Modal>
        <View>
          {categorySelected && <FlatList
            data={categorySelected.menus}
            keyExtractor={item => `${item.id}_${item.name}`}
            renderItem={(item) => <Menu menu={item.item} onChangeMenuQuantity={onChangeMenuQuantity}/>}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <Divider hasShadow={false} />}
            contentContainerStyle={{ height: "100%" }}
          />
          }
        </View>
        <Pressable onPress={() => setModalVisible(visible => !visible)}>
          <View className="w-11/12 h-16 absolute bottom-52 bg-black rounded-2xl ml-5">
            <View className="flex-row justify-between p-5">
              <Text className="text-white">{totalItems} items selected</Text>
              <Text className="text-white">View Order</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
