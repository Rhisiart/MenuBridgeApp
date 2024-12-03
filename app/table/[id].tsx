import Button from "@/src/components/button";
import Divider from "@/src/components/divider";
import Menu from "@/src/components/menu";
import Modal from "@/src/components/modal";
import SwipeableRow from "@/src/components/swipeableRow";
import Tabbar from "@/src/components/tabbar";
import { useWebSocket } from "@/src/context/useWebSocket";
import { Commands } from "@/src/types/enum";
import { ICategory, IMenu, IOrderItem, IOrderItemMenu } from "@/src/types/interface";
import { Buffer } from "buffer";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

type Params = {
  id: string,
  tableNumber: string,
  order: string,
  floor: string,
}

export default function Table() {
  const [categories, setCategories] = useState<ICategory[]>();
  const [categorySelected, setCategorySelected] = useState<ICategory>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [orderItems, setOrderItems] = useState<Record<string, IOrderItemMenu>>();
  const [totalItems, setTotalItems] = useState<number>(0);

  const ws = useWebSocket();
  const router = useRouter();
  const { id, order, floor, tableNumber } = useLocalSearchParams<Params>();
  const buffer = new Uint8Array(1);

  buffer[0] = Number(order);

  console.log(`order id = ${order}`);

  const getMenuOrderItem = (menu: IMenu): IMenu => {
    if(!orderItems) {
      return menu;
    }

    const idx = Object.keys(orderItems).findIndex(key => key === String(menu.id));

    if(idx === -1) {
      return menu;
    }

    const orderItemObj = Object.values(orderItems)[idx];
    const orderItem: IOrderItem = menu.orderItem 
      ? {...menu.orderItem, quantity : orderItemObj.quantity}
      : {id: -1, quantity : orderItemObj.quantity, price: orderItemObj.price } 

    return {
      ...menu,
      orderItem: orderItem
    }
  }

  const onChangeMenuQuantity = (menuId: string, orderItem: IOrderItemMenu) => {
    setOrderItems(orderItems => ({ ...orderItems, [menuId]: orderItem }));
  }

  const onPressSendButton = () => {
    if (!ws || !orderItems) {
      return;
    }

    const sendOrder = {
      id: Number(order),
      customerId: 1,
      orderItems: Object.values(orderItems).map((orderItem, idx) => ({
        ...orderItem, menuId: Number(Object.keys(orderItems)[idx])
      })),
      amount: 100,
      floorTable: {
        number: Number(tableNumber),
        floorId: Number(floor),
        tableId: Number(id),
      },
      statuscode: "In Progress",
      createdOn: new Date(Date.now()).toISOString(),
    }

    const orderStringify = JSON.stringify(sendOrder);
    const buf = Buffer.alloc(Buffer.byteLength(orderStringify));
    const len = buf.write(orderStringify);

    ws.send(Commands.Place, 1, buf);
    router.replace("/floor");
  }

  const onPressButton = () => {
    setModalVisible(visible => !visible);
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
          id="orderitems"
          position="horizontal"
          visible={modalVisible}
          onClose={() => setModalVisible(visible => !visible)}
        >
          {orderItems && Object.keys(orderItems).length > 0 ?
            <View>
              <FlatList
                data={Object.entries(orderItems)}
                keyExtractor={item => item[0]}
                renderItem={item => <SwipeableRow menuId={item.item[0]} orderItemMenu={item.item[1]} />}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <Divider hasShadow={false} />}
                contentContainerStyle={{ height: "100%" }}
              />
              <Button elememt="modal" onPress={onPressSendButton}>
                <Text className="text-white text-center p-5">Send order</Text>
              </Button>
            </View>
            :
            <Text>No Menus choosed</Text>
          }
        </Modal>
        <View>
          {categorySelected && <FlatList
            data={categorySelected.menus}
            keyExtractor={item => `${item.id}_${item.name}`}
            renderItem={(item) => <Menu
              menu={getMenuOrderItem(item.item)}
              onChangeMenuQuantity={onChangeMenuQuantity}
            />}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <Divider hasShadow={false} />}
            contentContainerStyle={{ height: "100%" }}
          />
          }
        </View>
        <Button elememt="screen" onPress={onPressButton}>
          <View className="flex-row justify-between p-5">
            <Text className="text-white">{totalItems} items selected</Text>
            <Text className="text-white">View Order</Text>
          </View>
        </Button>
      </View>
    </View>
  );
}
