// context/TravelContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Driver } from "../components/CardDriver";

// Defina a estrutura dos dados que serão compartilhados
interface TravelContextType {
  drivers: Driver[]; // Ajuste o tipo conforme necessário
  directionsResponse: google.maps.DirectionsResult | null;
  embarkLocation: string;
  destinationLocation: string;
  currentLocation: google.maps.LatLng | null;
  setDriversData: (drivers: Driver[]) => void;
  setTravelData: (data: {
    directionsResponse: google.maps.DirectionsResult | null;
    embarkLocation: string;
    destinationLocation: string;
    currentLocation: google.maps.LatLng | null;
  }) => void;
}

interface ContextType {
  children: ReactNode;
}

const TravelContext = createContext({} as TravelContextType);

export const useTravel = () => useContext(TravelContext);

export const TravelProvider: React.FC<ContextType> = ({ children }) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [embarkLocation, setEmbarkLocation] = useState<string>("");
  const [destinationLocation, setDestinationLocation] = useState<string>("");
  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLng | null>(null);

  const setTravelData = (data: {
    directionsResponse: google.maps.DirectionsResult | null;
    embarkLocation: string;
    destinationLocation: string;
    currentLocation: google.maps.LatLng | null;
  }) => {
    setDirectionsResponse(data.directionsResponse);
    setEmbarkLocation(data.embarkLocation);
    setDestinationLocation(data.destinationLocation);
    setCurrentLocation(data.currentLocation);
  };

  const setDriversData = (drivers: Driver[]) => {
    setDrivers(drivers);
  };
  return (
    <TravelContext.Provider
      value={{
        destinationLocation,
        directionsResponse,
        drivers,
        embarkLocation,
        setTravelData,
        currentLocation,
        setDriversData,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};
