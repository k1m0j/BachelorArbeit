import { createContext, useState } from "react";

export const RoutesContext = createContext({
  routes: [
    {
      id: 1,
      name: "Berlin to Wedding",
      destination: { latitude: 52.5504827, longitude: 13.3519841 },
      startingPoint: { latitude: 52.52000659999999, longitude: 13.404954 },
    },
    {
      id: 2,
      name: "No to Where",
      destination: { latitude: 51, longitude: 13 },
      startingPoint: { latitude: 51, longitude: 13.002 },
    },
  ],
  addRoute: (newRoute) => {},
  removeRoute: (id) => {},
});

function RoutesContextProvider({ children }) {
  const [savedRoutes, setSavedRoutes] = useState([
    {
      id: 1,
      name: "Berlin to Wedding",
      destination: { latitude: 52.5504827, longitude: 13.3519841 },
      startingPoint: { latitude: 52.52000659999999, longitude: 13.404954 },
    },
    {
      id: 2,
      name: "No to Where",
      destination: { latitude: 51, longitude: 13 },
      startingPoint: { latitude: 51, longitude: 13.002 },
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
