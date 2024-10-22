
import WebSocketProvider from '@/context/useWebSocket';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <WebSocketProvider url={`ws://${process.env.EXPO_PUBLIC_IP}:8080/ws`}>
      <View style={{ padding: 50 }}>
        <Text>WebSocket Message:</Text>
      </View>
    </WebSocketProvider>
  );
}
