import { TextInput, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function SearchBar() {
  return (
    <View style={styles.container}>
      <Ionicons
        style={styles.icon}
        name="search"
        size={16}
        color="black"
      ></Ionicons>
      <TextInput style={styles.input}></TextInput>
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 6,
    marginHorizontal: 12,
    paddingVertical: 6,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    position: "absolute",
    right: 0,
    top: 0,
  },
  input: {
    flex: 1,
  },
  icon: {},
});
