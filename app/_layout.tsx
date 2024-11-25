import WebSocketProvider from "@/src/context/useWebSocket";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import OrdersProvider from "@/src/context/useOrders";
import PortalProvider from "@/src/context/usePortal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../src/styles/global.css";

export default function RootLayout() {
  return (
    <WebSocketProvider url={`ws://${process.env.EXPO_PUBLIC_IP}:8080/ws`}>
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 font-roboto">
          <GestureHandlerRootView>
            <OrdersProvider>
              <PortalProvider>
                <Stack
                  screenOptions={{
                    contentStyle: { backgroundColor: '#fff' },
                  }}
                >
                  <Stack.Screen
                    name="(tabs)"
                    options={{
                      headerShown: false,
                      animation: "default",
                    }}
                  />
                  <Stack.Screen
                    name="table/[id]"
                    options={{
                      title: "Manage order",
                      animation: "default",
                    }}
                  />
                </Stack>

              </PortalProvider>
            </OrdersProvider>
          </GestureHandlerRootView>
        </SafeAreaView>
      </SafeAreaProvider>
    </WebSocketProvider>
  );
}
