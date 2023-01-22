import { FlatList, StyleSheet } from "react-native";
import DirectionItem from "./DirectionItem";

function DirectionsList({ directions }) {
  function renderDirectionItem(itemData) {
    console.log(itemData.item);
    return <DirectionItem direction={itemData.item}></DirectionItem>;
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
