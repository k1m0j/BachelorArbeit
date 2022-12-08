import { useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function SearchBar({ onSubmit }) {
  const [enteredText, setEnteredText] = useState("");

  function onSubmitHandler() {
    onSubmit(enteredText);
  }

  return (
    <View style={styles.container}>
      <Ionicons
        style={styles.icon}
        name="search"
        size={16}
        color="black"
      ></Ionicons>
      <TextInput
        style={styles.input}
        value={enteredText}
        onChangeText={(changedText) => setEnteredText(changedText)}
        onSubmitEditing={onSubmitHandler}
      ></TextInput>
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    borderWidth: 1.5,
    borderRadius: 20,
    marginVertical: 12,
    marginHorizontal: 12,
    paddingVertical: 6,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    paddingRight: 6,
  },
});
