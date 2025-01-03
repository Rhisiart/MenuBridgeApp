import Header from "@/src/components/header";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerShadowVisible: false,
        tabBarActiveTintColor: "black",
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
          header: () => <Header title="Home" isStack={false} hasDivider={false} />
        }}
      />
      <Tabs.Screen
        name="floor"
        options={{
          title: "Select table",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="table" color={color} />
          ),
          header: () => <Header title="Select table" isStack={false} hasDivider={false} />,
        }}
      />
    </Tabs>
  );
}
