import Button from "@/src/components/button";
import Divider from "@/src/components/divider";
import Menu from "@/src/components/menu";
import Modal from "@/src/components/modal";
import SwipeableRow from "@/src/components/swipeableRow";
import Tabbar from "@/src/components/tabbar";
import { useWebSocket } from "@/src/context/useWebSocket";
import { Commands } from "@/src/types/enum";
import { ICategory, IMenu, IOrderItemMenu } from "@/src/types/interface";
import { Buffer } from "buffer";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

type Params = {
  id: string,
  tableNumber: string,
  order: string,
}

export default function Table() {
  const [categories, setCategories] = useState<ICategory[]>();
  const [categorySelected, setCategorySelected] = useState<ICategory>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [orderItems, setOrderItems] = useState<Record<string, IOrderItemMenu>>({});
  const [totalItems, setTotalItems] = useState<number>(0);

  const ws = useWebSocket();
  const router = useRouter();
  const { id, order, tableNumber } = useLocalSearchParams<Params>();
  const buffer = new Uint8Array(1);

  buffer[0] = Number(order);

  const getMenuOrderItem = (menu: IMenu): IMenu => {
    const key = Object.keys(orderItems).find(key => key === String(menu.id));

    return !key 
      ?  menu
      : { ...menu, orderItem: orderItems[key]};
  }

  const onChangeMenuQuantity = (menuId: number, orderItem?: IOrderItemMenu) => {
    setOrderItems(orderItems => {
      if(!orderItem) {
        const { [menuId]: _, ...newObj} = orderItems;

        return newObj;
      }else {
        return { ...orderItems, [menuId]: orderItem };
      }
    });
    setTotalItems(total => total++);
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
        id: Number(id),
        number: Number(tableNumber),
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
                renderItem={item => {
                  return item.item[1].quantity > 0 
                    ? <SwipeableRow menuId={item.item[0]} orderItemMenu={item.item[1]} />
                    : <></>
                }}
                showsVerticalScrollIndicator={false}
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
