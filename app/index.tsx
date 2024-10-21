import Parser from '@/pkg/network/parser';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [message, setMessage] = useState("Hello world");
  const [socket, setSocket] = useState(null);


  useEffect(() => {
    const ws = new WebSocket(`ws://${process.env.EXPO_PUBLIC_IP}:8080/ws`);
    ws.binaryType = "arraybuffer";


    ws.onopen = () => {
      console.log('Connected to WebSocket');

      const data = new TextEncoder().encode("Hello World");
      const parser = new Parser();
      const buf = parser.encode(1, 1, data);

      ws.send(buf);
    };

    ws.onmessage = (event: MessageEvent<ArrayBuffer>) => {
      const buffer = new Uint8Array(event.data);
      const parser = new Parser();
      const frame = parser.decode(buffer);
      
      console.log(frame);
    };

    ws.onerror = (error) => {
      console.log('WebSocket error: ', error.type);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <View style={{ padding: 50 }}>
      <Text>WebSocket Message: {message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
