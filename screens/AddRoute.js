import { StyleSheet, View } from "react-native";

import Button from "../components/ui/Button";
import LocationForm from "../components/locations/LocationForm";
import { useState } from "react";

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
    navigation.navigate("Map", { startingPoint, destination });
  }

  return (
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
  );
}

export default AddRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
