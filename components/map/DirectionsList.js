import { FlatList, StyleSheet } from "react-native";

import DirectionItem from "./DirectionItem";

function DirectionsList({ directions, currentWaypoint }) {
  function renderDirectionItem(itemData) {
    let selected = currentWaypoint.id === itemData.item.id;
    return (
      <DirectionItem
        direction={itemData.item}
        selected={selected}
      ></DirectionItem>
    );
  }

  return (
    <FlatList
      data={directions}
      renderItem={renderDirectionItem}
      keyExtractor={(direction) => direction.id}
      style={styles.container}
    ></FlatList>
  );
}

export default DirectionsList;

const styles = StyleSheet.create({
  container: { padding: 10, flex: 1 },
});
