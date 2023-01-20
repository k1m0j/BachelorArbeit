import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function RouteInfo({ pickedRoute }) {
  return (
    <View style={styles.root}>
      <View style={styles.upperContainer}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationName}>
            {pickedRoute.startingPoint.locationName}
          </Text>
        </View>
        <Ionicons
          name="arrow-forward-outline"
          size={35}
          color="green"
        ></Ionicons>
        <View style={styles.locationContainer}>
          <Text style={styles.locationName}>
            {pickedRoute.destination.locationName}
          </Text>
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <View style={styles.innerLowerContainer}>
          <Text>{pickedRoute.duration}</Text>
        </View>
        <View style={[styles.innerLowerContainer, { borderRightWidth: 0 }]}>
          <Text>{pickedRoute.distance}</Text>
        </View>
      </View>
    </View>
  );
}

export default RouteInfo;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    backgroundColor: "white",
  },
  upperContainer: {
    padding: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    //borderWidth: 1,
  },
  innerLowerContainer: {
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    //borderWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    flex: 1,
  },
  lowerContainer: {
    flexDirection: "row",
  },
  locationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  locationName: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
