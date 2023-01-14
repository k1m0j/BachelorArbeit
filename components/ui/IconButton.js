import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.pressed, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={size} color={color}></Ionicons>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
