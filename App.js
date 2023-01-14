import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Map from "./screens/Map";
import SavedRoutes from "./screens/SavedRouted";
import AddRoute from "./screens/AddRoute";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Add Route"
        component={AddRoute}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" size={size} color={color}></Ionicons>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="SavedRouted"
        component={SavedRoutes}
        options={{
          title: "Saved Routes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="save-outline" size={size} color={color}></Ionicons>
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto"></StatusBar>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen name="Map" component={Map}></Stack.Screen>
        </Stack.Navigator>
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
