import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import IconButton from "../components/ui/IconButton";

import { GOOGLE_API_KEY } from "../constants/constants";

function Map({ navigation, route }) {
  const mapView = useRef();

  const initialRegion = {
    latitude: 52.520008,
    longitude: 13.404954,
    latitudeDelta: 0.15,
    longitudeDelta: 0.1,
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          color={tintColor}
          size={20}
          onPress={saveRoute}
        ></IconButton>
      ),
    });
  }, [navigation]);

  function saveRoute() {}

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
          strokeWidth={5}
          strokeColor="green"
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
});
