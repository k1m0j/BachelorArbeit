import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import SearchBar from "../components/ui/SearchBar";
import { GOOGLE_API_KEY } from "../constants/constants";
import { getCoordinates } from "../util/location";

function Map({ route }) {
  const [startingPointMarker, setStartingPointMarker] = useState();
  const [destinationMarker, setDestinationMarker] = useState();

  console.log(route.params);

  const mapView = useRef();

  const initialRegion = {
    latitude: 52.520008,
    longitude: 13.404954,
    latitudeDelta: 0.15,
    longitudeDelta: 0.1,
  };

  async function onSumbitLocationHandler(location) {
    const coordinates = await getCoordinates(location);

    setStartingPointMarker({
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
          origin={route.params.startingPoint}
          destination={route.params.destination}
          apikey={GOOGLE_API_KEY}
          mode="BICYCLING"
          strokeWidth={3}
          strokeColor="blue"
        />
        <Marker
          coordinate={route.params.startingPoint}
          title="Test"
          description="Hallo das geht aber gut!"
        ></Marker>
        <Marker
          coordinate={route.params.destination}
          title="Test"
          description="Hallo das geht aber gut!"
        ></Marker>
      </MapView>
      {/* <View style={styles.searchBarContainer}>
        <SearchBar onSubmit={onSumbitLocationHandler}></SearchBar>
      </View> */}
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
  // searchBarContainer: {
  //   width: "100%",
  //   position: "absolute",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
});
