import Header from "@/src/components/header";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      sceneContainerStyle={{backgroundColor: "#fff"}}
      screenOptions={{
        tabBarActiveTintColor: "blue",
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="floors"
        options={{
          title: "Select table",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="table" color={color} />
          ),
          header: () => <Header title="Select table" hasDivider={false} />,
        }}
      />
      <Tabs.Screen
        name="menus"
        options={{
          title: "Menu",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="search" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
