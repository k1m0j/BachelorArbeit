import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Map from "./screens/Map";
import SavedRoutes from "./screens/SavedRouted";
import AddRoute from "./screens/AddRoute";
import RoutesContextProvider from "./store/routes-context";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Home() {
  return (
    <Tab.Navigator screenOptions={{ headerTintColor: "green" }}>
      <Tab.Screen
        name="AddRoute"
        component={AddRoute}
        options={{
          title: "Add Route",
          tabBarActiveTintColor: "green",
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
          tabBarActiveTintColor: "green",
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
      <RoutesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerTintColor: "green" }}>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen name="Map" component={Map}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </RoutesContextProvider>
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
