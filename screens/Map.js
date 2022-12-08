import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import SearchBar from "../components/ui/SearchBar";
import { getCoordinates } from "../util/location";

function Map() {
  const initialRegion = {
    latitude: 52.520008,
    longitude: 13.404954,
    latitudeDelta: 0.2,
    longitudeDelta: 0.15,
  };

  function onSumbitLocationHandler(location) {
    getCoordinates(location);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
      />
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
