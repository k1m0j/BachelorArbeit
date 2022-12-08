import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import SearchBar from "../components/ui/SearchBar";

function Map() {
  function onSumbitLocationHandler(location) {
    console.log(location);
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} />
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
