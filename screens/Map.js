import { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import IconButton from "../components/ui/IconButton";

import { GOOGLE_API_KEY } from "../constants/constants";
import { RoutesContext } from "../store/routes-context";

function Map({ navigation, route }) {
  const mapView = useRef();

  const routesCtx = useContext(RoutesContext);

  const initialRegion = {
    latitude: 52.520008,
    longitude: 13.404954,
    latitudeDelta: 0.15,
    longitudeDelta: 0.1,
  };

  const displayedRoute = route.params;

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

  function saveRoute() {
    routesCtx.addRoute({ ...displayedRoute, id: Date.now() });
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
          origin={displayedRoute.startingPoint.coordinates}
          destination={displayedRoute.destination.coordinates}
          apikey={GOOGLE_API_KEY}
          mode="BICYCLING"
          strokeWidth={5}
          strokeColor="green"
          onReady={(result) => {
            console.log(result);
          }}
        />
        <Marker
          coordinate={displayedRoute.startingPoint.coordinates}
          title="Test"
          description="Hallo das geht aber gut!"
        ></Marker>
        <Marker
          coordinate={displayedRoute.destination.coordinates}
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
