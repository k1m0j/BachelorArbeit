import { FlatList, StyleSheet } from "react-native";

import RouteItem from "./RouteItem";

function RoutesList({ routes }) {
  function renderRouteItem(itemData) {
    return <RouteItem {...itemData.item}></RouteItem>;
  }
  return (
    <FlatList
      data={routes}
      renderItem={renderRouteItem}
      keyExtractor={(route) => route.id}
    ></FlatList>
  );
}

export default RoutesList;

const styles = StyleSheet.create({});
