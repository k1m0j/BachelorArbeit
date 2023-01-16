import { useContext } from "react";
import RoutesList from "../components/navigations/RoutesList";

import { RoutesContext } from "../store/routes-context";

function SavedRoutes() {
  const routesCtx = useContext(RoutesContext);

  return <RoutesList routes={routesCtx.routes}></RoutesList>;
}

export default SavedRoutes;
