import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

function RouteItem({ id, startingPoint, destination }) {
  const navigation = useNavigation();

  function routePressHandler() {
    navigation.navigate("Map", { startingPoint, destination });
  }

  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={routePressHandler}
    >
      <View style={styles.routeItem}>
        <Text>Item {id}</Text>
      </View>
    </Pressable>
  );
}

export default RouteItem;

const styles = StyleSheet.create({
  pressed: { opacity: 0.75 },
  routeItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: "white",
  },
});
