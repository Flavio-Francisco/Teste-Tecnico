import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, DirectionsRenderer, Marker } from "@react-google-maps/api";
import { useTravel } from "../../contexts/usetravelOption";
import CardDriver from "../../components/CardDriver";
import { User } from "../../fetch/user";


const TravelOptionPage = () => {
  const { directionsResponse, currentLocation, drivers } = useTravel();
  const mapRef = useRef<google.maps.Map | null>(null);

  const [currentLocationData, setCurrentLocation] =
    useState<google.maps.LatLng | null>(null);
  const [directionsResponseData, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);

  // Atualiza os dados de localização e rota
  useEffect(() => {
    if (currentLocation) {
      setCurrentLocation(currentLocation);
    }
    if (directionsResponse) {
      setDirectionsResponse(directionsResponse);
    }
  }, [directionsResponse, currentLocation]);

  // Ajusta os limites do mapa para exibir a rota completa
  useEffect(() => {
    if (directionsResponseData && mapRef.current) {
      const bounds = new google.maps.LatLngBounds();
      directionsResponseData.routes[0].legs[0].steps.forEach((step) => {
        bounds.extend(step.start_location);
        bounds.extend(step.end_location);
      });
      mapRef.current.fitBounds(bounds);
    }
  }, [directionsResponseData]);

  if (!directionsResponse || !currentLocation) {
    return (
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl font-bold mt-2">Carregando...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="text-3xl font-bold mt-2">Taxi 109</h1>
        <h2 className="text-2xl font-bold">Selecione o motorista</h2>
      </div>

      <div className="flex flex-row  w-full ">
        <div className="w-3/12 overflow-y-auto overflow-x-hidden max-h-[600px] gap-4">
          {drivers?.map((driver) => (
            <CardDriver
              driver={driver}
              key={driver.photo}
              travel={{
                customer_id: User.id,
                destination:
                  directionsResponseData?.routes[0].legs[0].end_address || "",
                origin:
                  directionsResponseData?.routes[0].legs[0].start_address || "",
                distance:
                  directionsResponseData?.routes[0].legs[0].distance?.text ||
                  "",
                duration:
                  directionsResponseData?.routes[0].legs[0].duration?.text ||
                  "",
                value: driver.value,
                driver: {
                  id: driver.id,
                  name: driver.name,
                },
              }}
            />
          ))}
        </div>

        <div className="flex justify-center items-center w-9/12 rounded-lg">
          <GoogleMap
            mapContainerStyle={{
              width: "99%",
              height: "80dvh",
              marginTop: 8,
              borderRadius: 10,
            }}
            zoom={14}
            center={
              currentLocationData
                ? {
                    lat: currentLocationData.lat(),
                    lng: currentLocationData.lng(),
                  }
                : { lat: -34.397, lng: 150.644 } // Localização padrão
            }
            onLoad={(map) => {
              mapRef.current = map;
            }}
          >
            {/* Marcador da localização inicial */}
            {currentLocationData && (
              <Marker
                position={{
                  lat: currentLocationData.lat(),
                  lng: currentLocationData.lng(),
                }}
                label="Início"
              />
            )}
            {/* Marcador da localização final */}
            {directionsResponseData && (
              <Marker
                position={{
                  lat: directionsResponseData.routes[0].legs[0].end_location.lat(),
                  lng: directionsResponseData.routes[0].legs[0].end_location.lng(),
                }}
                label="Destino"
              />
            )}
            {/* Renderização da rota no mapa */}
            {directionsResponseData && (
              <DirectionsRenderer directions={directionsResponseData} />
            )}
          </GoogleMap>
        </div>
      </div>
    </>
  );
};

export default TravelOptionPage;
