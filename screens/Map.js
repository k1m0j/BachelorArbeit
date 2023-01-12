import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import SearchBar from "../components/ui/SearchBar";
import { GOOGLE_API_KEY } from "../constants/constants";
import { getCoordinates } from "../util/location";

function Map() {
  const [markerCoordinates, setMarkerCoordinates] = useState();

  const mapView = useRef();

  const initialRegion = {
    latitude: 52.520008,
    longitude: 13.404954,
    latitudeDelta: 0.2,
    longitudeDelta: 0.15,
  };

  async function onSumbitLocationHandler(location) {
    const coordinates = await getCoordinates(location);

    setMarkerCoordinates({
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    });

    mapView.current.animateToRegion(
      {
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.005,
      },
      1000
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapView}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
      >
        <MapViewDirections
          origin={"Carl Herz Ufer"}
          destination={"Der andere Spieleladen"}
          apikey={GOOGLE_API_KEY}
        />
        {markerCoordinates && (
          <Marker
            coordinate={markerCoordinates}
            title="Test"
            description="Hallo das geht aber gut!"
          ></Marker>
        )}
      </MapView>
      <View style={styles.searchBarContainer}>
        <SearchBar onSubmit={onSumbitLocationHandler}></SearchBar>
      </View>
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: "100%",
  },
  searchBarContainer: {
    width: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
