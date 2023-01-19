import { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View, PixelRatio } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import RouteInfo from "../components/map/RouteInfo";
import IconButton from "../components/ui/IconButton";
import { GOOGLE_API_KEY } from "../constants/constants";
import { RoutesContext } from "../store/routes-context";
import Button from "../components/ui/Button";

function Map({ navigation, route }) {
  const mapView = useRef();
  const routesCtx = useContext(RoutesContext);
  const [pickedRoute, setPickedRoute] = useState(route.params.pickedRoute);

  const initialRegion = {
    latitude: 52.520008,
    longitude: 13.404954,
    latitudeDelta: 0.15,
    longitudeDelta: 0.1,
  };

  const iosEdgePadding = { top: 100, right: 50, bottom: 100, left: 50 };

  const androidEdgePadding = {
    top: PixelRatio.getPixelSizeForLayoutSize(iosEdgePadding.top),
    right: PixelRatio.getPixelSizeForLayoutSize(iosEdgePadding.right),
    bottom: PixelRatio.getPixelSizeForLayoutSize(iosEdgePadding.bottom),
    left: PixelRatio.getPixelSizeForLayoutSize(iosEdgePadding.left),
  };

  function onLayoutHandler() {
    const options = {
      edgePadding:
        Platform.OS === "android" ? androidEdgePadding : iosEdgePadding,
    };
    mapView.current.fitToSuppliedMarkers(
      ["startingPoint", "destination"],
      options
    );
  }

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
    routesCtx.addRoute({ ...pickedRoute, id: Date.now() });
  }

  return (
    <View style={styles.container}>
      <RouteInfo pickedRoute={pickedRoute}></RouteInfo>
      <MapView
        ref={mapView}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation={true}
        onLayout={onLayoutHandler}
      >
        <MapViewDirections
          origin={pickedRoute.startingPoint.coordinates}
          destination={pickedRoute.destination.coordinates}
          apikey={GOOGLE_API_KEY}
          mode="BICYCLING"
          strokeWidth={5}
          strokeColor="green"
          onReady={(result) => {
            //console.log(result.legs[0].steps);
            setPickedRoute({
              ...pickedRoute,
              duration: result.legs[0].duration.text,
              distance: result.legs[0].distance.text,
            });
          }}
        />
        <Marker
          identifier="startingPoint"
          coordinate={pickedRoute.startingPoint.coordinates}
          title={pickedRoute.startingPoint.locationName}
          description="This is your starting point."
        ></Marker>
        <Marker
          identifier="destination"
          coordinate={pickedRoute.destination.coordinates}
          title={pickedRoute.destination.locationName}
          description="This is your destination."
        ></Marker>
      </MapView>
      <View>
        <Button>Start Navigation</Button>
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
    //height: "100%",
    flex: 1,
  },
});
