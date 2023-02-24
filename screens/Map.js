import { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View, PixelRatio } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import RouteInfo from "../components/map/RouteInfo";
import IconButton from "../components/ui/IconButton";
import {
  GOOGLE_API_KEY,
  minWaypointDistance,
  NAVIGATION_PITCH,
  NAVIGATION_ZOOM,
} from "../constants/constants";
import { RoutesContext } from "../store/routes-context";
import Button from "../components/ui/Button";
import DirectionsList from "../components/map/DirectionsList";
import {
  addIncreasingIDsToArray,
  getDistanceFromLatLonInKm,
} from "../util/util";

function Map({ navigation, route }) {
  const [pickedRoute, setPickedRoute] = useState(route.params.pickedRoute);
  const [isNavigationStarted, setIsNavigationStarted] = useState(false);
  const [directions, setDirections] = useState([]);
  const [currentWaypoint, setCurrentWaypoint] = useState();

  const routesCtx = useContext(RoutesContext);

  const mapView = useRef();

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

  function onStartNavigationHandler() {
    setIsNavigationStarted(true);
  }

  function animateCameraToUser(newCoordinate) {
    mapView.current.animateCamera({
      center: {
        latitude: newCoordinate.latitude,
        longitude: newCoordinate.longitude,
      },
      heading: newCoordinate.heading,
      zoom: NAVIGATION_ZOOM,
      pitch: NAVIGATION_PITCH,
    });
  }

  function calcDistanceToNextWaypoint(newCoordinate) {
    let distanceToNextWaypoint = getDistanceFromLatLonInKm(
      Number(currentWaypoint.end_location.lat),
      Number(currentWaypoint.end_location.lng),
      Number(newCoordinate.latitude),
      Number(newCoordinate.longitude)
    );
    if (distanceToNextWaypoint < minWaypointDistance) {
      if (directions.length - 1 > currentWaypoint.id) {
        setCurrentWaypoint(directions[currentWaypoint.id + 1]);
      } else {
        console.log("Ziel erreicht");
      }
    }
  }

  return (
    <View style={styles.container}>
      <RouteInfo pickedRoute={pickedRoute}></RouteInfo>
      {!isNavigationStarted && (
        <View style={styles.buttonContainer}>
          <Button onPress={onStartNavigationHandler}>Start Navigation</Button>
        </View>
      )}
      <MapView
        ref={mapView}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation={true}
        rotateEnabled={true}
        onLayout={onLayoutHandler}
        onUserLocationChange={(locationChangedResult) => {
          if (isNavigationStarted) {
            let newCoordinate = locationChangedResult.nativeEvent.coordinate;
            animateCameraToUser(newCoordinate);
            calcDistanceToNextWaypoint(newCoordinate);
          }
        }}
      >
        <MapViewDirections
          origin={pickedRoute.startingPoint.coordinates}
          destination={pickedRoute.destination.coordinates}
          apikey={GOOGLE_API_KEY}
          mode="BICYCLING"
          strokeWidth={5}
          strokeColor="green"
          onReady={(result) => {
            let loadedDirections = addIncreasingIDsToArray(
              result.legs[0].steps
            );
            setDirections(loadedDirections);
            setCurrentWaypoint(loadedDirections[0]);
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
      {isNavigationStarted && (
        <View style={styles.directionsContainer}>
          <DirectionsList
            directions={directions}
            currentWaypoint={currentWaypoint}
          ></DirectionsList>
        </View>
      )}
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    backgroundColor: "white",
  },
  directionsContainer: {
    height: "30%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
  },
});
