import { StyleSheet, Text, View } from "react-native";

function DirectionItem({ direction, selected }) {
  return (
    <View
      style={[styles.container, selected && { backgroundColor: "lightgreen" }]}
    >
      <View style={styles.textContainer}>
        <Text>{direction.id + 1}.</Text>
      </View>
      <View style={{ flexDirection: "column", flex: 1 }}>
        <Text style={{ flexShrink: 1 }}>
          {direction.html_instructions.replace(/<\/?[^>]+(>|$)/g, "")}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text>{direction.distance.text}</Text>
      </View>
    </View>
  );
}

export default DirectionItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "grey",
    marginVertical: 5,
    padding: 10,
    borderRadius: 20,
  },
  textContainer: {
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
