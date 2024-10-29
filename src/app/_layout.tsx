import WebSocketProvider from "@/src/context/useWebSocket";
import { Stack } from "expo-router";
import "../styles/global.css";

export default function RootLayout() {
  return (
    <WebSocketProvider url={`ws://${process.env.EXPO_PUBLIC_IP}:8080/ws`}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            animation: "ios",
          }}
        />
      </Stack>
    </WebSocketProvider>
  );
}
