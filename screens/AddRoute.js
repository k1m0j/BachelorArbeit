import { Alert, Keyboard, ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react";

import Button from "../components/ui/Button";
import LocationForm from "../components/locations/LocationForm";

function AddRoute({ navigation }) {
  const [startingPoint, setStartingPoint] = useState();
  const [destination, setDestination] = useState();

  function onSubmitLocationForm(type, location) {
    if (type === "Starting Point") {
      setStartingPoint(location);
    } else {
      setDestination(location);
    }
  }

  function onSubmitRoute() {
    if (startingPoint && destination) {
      navigation.navigate("Map", {
        pickedRoute: { startingPoint, destination },
      });
    } else {
      Alert.alert(
        "Invalid Input",
        "Please check if you have entered a valid starting point and destination.",
        [
          {
            text: "Okay",
            style: "default",
          },
        ]
      );
    }
  }

  return (
    <ScrollView onPress={Keyboard.dismiss} style={styles.scrollView}>
      <View style={styles.container}>
        <LocationForm
          type={"Starting Point"}
          onSubmit={onSubmitLocationForm}
        ></LocationForm>
        <LocationForm
          type={"Destination"}
          onSubmit={onSubmitLocationForm}
        ></LocationForm>
        <Button onPress={onSubmitRoute}>Calculate Route</Button>
      </View>
    </ScrollView>
  );
}

export default AddRoute;

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  container: {
    padding: 20,
  },
});
