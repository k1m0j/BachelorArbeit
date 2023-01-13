import { StyleSheet, Text, Image, TextInput, View } from "react-native";
import { useEffect, useState } from "react";

import { getCoordinates, getMapPreview } from "../../util/location";

function LocationForm({ type, onSubmit }) {
  const [locationName, setLocationName] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  let locationPreview = <Text>No {type} picked yet.</Text>;

  async function onSumbitLocationHandler() {
    const coordinates = await getCoordinates(locationName);

    const formattedCoordinates = {
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    };

    setPickedLocation(formattedCoordinates);

    onSubmit(type, formattedCoordinates);
  }

  //useEffect(() => {}, [locationPreview]);

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.latitude, pickedLocation.longitude),
        }}
      ></Image>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Choose {type}</Text>
      <TextInput
        style={styles.input}
        onSubmitEditing={onSumbitLocationHandler}
        value={locationName}
        onChangeText={(changedText) => setLocationName(changedText)}
      ></TextInput>
      <View style={styles.locationPreview}>{locationPreview}</View>
    </View>
  );
}

export default LocationForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  locationPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  label: { fontWeight: "bold", marginBottom: 4 },
  input: { backgroundColor: "white" },
});
