import { StyleSheet, Text, Image, TextInput, View } from "react-native";
import { useState } from "react";

function LocationForm({ type }) {
  const [pickedLocation, setPickedLocation] = useState("");

  let locationPreview = <Text>No {type} picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(1, 1),
        }}
      ></Image>
    );
  }

  return (
    <View>
      <Text style={styles.label}>Choose {type}</Text>
      <TextInput style={styles.input}></TextInput>
      <View style={styles.locationPreview}>{locationPreview}</View>
    </View>
  );
}

export default LocationForm;

const styles = StyleSheet.create({
  locationPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
  },
  label: { fontWeight: "bold" },
  input: { backgroundColor: "white" },
});
