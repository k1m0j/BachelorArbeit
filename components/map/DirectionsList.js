import { FlatList } from "react-native";
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
    ></FlatList>
  );
}

export default DirectionsList;
