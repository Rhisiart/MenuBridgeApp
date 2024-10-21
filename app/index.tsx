
import WebSocketProvider from '@/context/useWebSocket';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [message, setMessage] = useState("Hello world");
  const [socket, setSocket] = useState(null);

  return (
    <WebSocketProvider url={`ws://${process.env.EXPO_PUBLIC_IP}:8080/ws`}>
      <View style={{ padding: 50 }}>
        <Text>WebSocket Message: {message}</Text>
      </View>
    </WebSocketProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
