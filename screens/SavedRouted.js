import { useContext } from "react";
import { Text, View } from "react-native";

import { RoutesContext } from "../store/routes-context";

function SavedRoutes() {
  const routesCtx = useContext(RoutesContext);

  return (
    <View>
      <Text>This will be the SavedRoutes Screen</Text>
    </View>
  );
}

export default SavedRoutes;
