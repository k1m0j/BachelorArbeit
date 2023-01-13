import { Button, StyleSheet, View } from "react-native";

import LocationForm from "../components/locations/LocationForm";

function AddRoute() {
  return (
    <View style={styles.container}>
      <LocationForm type={"Starting Point"}></LocationForm>
      <LocationForm type={"Destination"}></LocationForm>
      <Button title="Confirm Locations"></Button>
    </View>
  );
}

export default AddRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },
});
