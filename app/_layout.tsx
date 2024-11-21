import WebSocketProvider from "@/src/context/useWebSocket";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import PortalProvider from "@/src/context/usePortal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../src/styles/global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 font-roboto">
        <GestureHandlerRootView >
          <PortalProvider>
            <WebSocketProvider url={`ws://${process.env.EXPO_PUBLIC_IP}:8080/ws`}>
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
            </WebSocketProvider>
          </PortalProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}