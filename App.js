import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Map from "./screens/Map";
import SavedRoutes from "./screens/SavedRouted";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto"></StatusBar>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Map"
            component={Map}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="map-outline"
                  size={size}
                  color={color}
                ></Ionicons>
              ),
            }}
          ></Tab.Screen>
          <Tab.Screen
            name="SavedRouted"
            component={SavedRoutes}
            options={{
              title: "Saved Routes",
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="save-outline"
                  size={size}
                  color={color}
                ></Ionicons>
              ),
            }}
          ></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
