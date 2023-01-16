import { createContext, useState } from "react";

export const RoutesContext = createContext({
  routes: [],
  addRoute: (newRoute) => {},
  removeRoute: (id) => {},
});

function RoutesContextProvider({ children }) {
  const [savedRoutes, setSavedRoutes] = useState([
    {
      id: 1,
      startingPoint: {
        locationName: "Dummy",
        latitude: 52.52000659999999,
        longitude: 13.404954,
      },
      destination: {
        locationName: "Data",
        latitude: 52.5504827,
        longitude: 13.3519841,
      },
    },
  ]);

  function addRoute(newRoute) {
    setSavedRoutes((currentRoutes) => [...currentRoutes, newRoute]);
  }

  function removeRoute(id) {
    setSavedRoutes((currentRoutes) =>
      currentRoutes.filter((route) => route.id !== id)
    );
  }

  const value = {
    routes: savedRoutes,
    addRoute: addRoute,
    removeRoute: removeRoute,
  };

  return (
    <RoutesContext.Provider value={value}>{children}</RoutesContext.Provider>
  );
}

export default RoutesContextProvider;
