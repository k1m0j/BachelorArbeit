import { StyleSheet, Text, View } from "react-native";

function DirectionItem({ direction }) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "column", flex: 1 }}>
        <Text style={{ flexShrink: 1 }}>{direction.id + 1}.</Text>
      </View>
      <View style={{ flexDirection: "column", flex: 1 }}>
        <Text style={{ flexShrink: 1 }}>
          {direction.html_instructions.replace(/<\/?[^>]+(>|$)/g, "")}
        </Text>
      </View>
      <View style={{ flexDirection: "column", flex: 1 }}>
        <Text style={{ flexShrink: 1 }}>{direction.distance.text}</Text>
      </View>
    </View>
  );
}

export default DirectionItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
