import WebSocketProvider from "@/src/context/useWebSocket";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "../styles/global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 font-roboto">
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
                animation: "ios",
                
              }}
            />
          </Stack>
        </WebSocketProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
