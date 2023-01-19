import { StyleSheet, Text, Image, TextInput, View } from "react-native";
import { useEffect, useState } from "react";

import { getCoordinates, getMapPreview } from "../../util/location";

function LocationForm({ type, onSubmit }) {
  const [locationName, setLocationName] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  async function onSumbitLocationHandler() {
    const coordinates = await getCoordinates(locationName);

    const formattedCoordinates = {
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    };

    setPickedLocation(formattedCoordinates);

    onSubmit(type, { locationName, coordinates: formattedCoordinates });
  }

  let locationPreview = <Text>No {type} picked yet.</Text>;

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
    marginBottom: 30,
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
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
});
