import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

type TabConfig = {
  label: string;
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

const tabs: TabConfig[] = [
  { label: "Home", name: "home", icon: "home" },
  { label: "Medicines", name: "medicines", icon: "medical-services" },
  { label: "Packages", name: "packages", icon: "inventory" },
  { label: "Wellness", name: "wellness", icon: "favorite" },
  { label: "Account", name: "account", icon: "person-outline" },
];

const DashboardLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#f857a6", // Light pink for active items
        tabBarInactiveTintColor: "#d9d9d9", // Light gray for inactive items
        headerShown: false,
        tabBarBackground: () => (
          <LinearGradient
            colors={["#5f2c82", "#49a09d"]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ),
        tabBarStyle: {
          height: 60,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginBottom: 5,
        },
        tabBarIconStyle: {
          marginBottom: -3,
        },
      }}
    >
      {tabs.map(({ name, icon, label }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title: label,
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialIcons 
                name={icon} 
                color={focused ? "#FFB6C1" : color} 
                size={size} 
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default DashboardLayout;