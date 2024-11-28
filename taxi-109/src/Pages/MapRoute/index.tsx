import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import {
  GoogleMap,
  Autocomplete,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useTravel } from "../../contexts/usetravelOption";
import { getdrivers } from "../../fetch/drivers";

const MapComponent = () => {
  const navigate = useNavigate();
  const { setTravelData, setDriversData } = useTravel();
  const [toog, setToog] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLng | null>(null);
  const [embarkLocation, setEmbarkLocation] = useState<string>("");
  const [destinationLocation, setDestinationLocation] = useState<string>("");
  const [autocompleteEmbark, setAutocompleteEmbark] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [autocompleteDestination, setAutocompleteDestination] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  // Calcular a rota entre origem e destino
  const calculateRoute = async () => {
    if (!embarkLocation || !destinationLocation) return;

    const directionsService = new google.maps.DirectionsService();
    const result = await directionsService.route({
      origin: embarkLocation,
      destination: destinationLocation,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(result);

    console.log(result);
    console.log(" currentLocation", currentLocation);
    setToog(true);
  };
  const { mutate } = useMutation({
    mutationKey: ["valureRace"],
    mutationFn: (params: { origin: string; destination: string }) =>
      getdrivers(params.origin, params.destination),
    onSuccess: (data) => {
      setDriversData(data.options);

      setTravelData({
        directionsResponse: directionsResponse,
        embarkLocation,
        destinationLocation,
        currentLocation: currentLocation,
      });
      navigate("/travelOption");
      setEmbarkLocation("");
      setDestinationLocation("");
      setAutocompleteEmbark(null);
      setAutocompleteDestination(null);
      setDirectionsResponse(null);
      setCurrentLocation(null);
      setToog(false);
    },
    onError(error) {
      console.log(error);
    },
  });

  const fecth = () => {
    mutate({
      origin: embarkLocation || "",
      destination: destinationLocation || "",
    });
  };
  // Obter localização atual do usuário e converter para endereço
  useEffect(() => {
    const fetchCurrentLocation = async () => {
      if (navigator.geolocation && window.google) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const googleLatLng = new window.google.maps.LatLng(
              latitude,
              longitude
            );
            setCurrentLocation(googleLatLng);

            const geocoder = new google.maps.Geocoder();
            const response = await geocoder.geocode({
              location: { lat: latitude, lng: longitude },
            });

            if (response.results && response.results.length > 0) {
              setEmbarkLocation(response.results[0].formatted_address || "");
            }
          },
          (error) => console.error(error)
        );
      }
    };

    fetchCurrentLocation();
  }, []);

  useEffect(() => {
    calculateRoute();
  }, [destinationLocation]);
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-3 ">
        <h1 className="text-3xl font-bold  mt-2"> Bem vindo!</h1>
        <h2 className="text-2xl font-bold">Para onde vamos?</h2>
      </div>
      <div className=" flex flex-row justify-center w-full mb-30 gap-3 mt-6">
        <Autocomplete
          className="w-5/12 "
          onLoad={(autocomplete) => setAutocompleteEmbark(autocomplete)}
          onPlaceChanged={() => {
            if (autocompleteEmbark) {
              const place = autocompleteEmbark.getPlace();
              setEmbarkLocation(place.formatted_address || "");
            }
          }}
        >
          <input
            className="p-2 w-full border rounded "
            type="text"
            placeholder="Local de embarque"
            value={embarkLocation}
            onChange={(e) => setEmbarkLocation(e.target.value)}
          />
        </Autocomplete>

        <Autocomplete
          className=" w-5/12 "
          onLoad={(autocomplete) => setAutocompleteDestination(autocomplete)}
          onPlaceChanged={() => {
            if (autocompleteDestination) {
              const place = autocompleteDestination.getPlace();
              setDestinationLocation(place.formatted_address || "");
            }
          }}
        >
          <input
            className="p-2 w-full border rounded "
            type="text"
            placeholder="Destino final"
            value={destinationLocation}
            onChange={(e) => setDestinationLocation(e.target.value)}
          />
        </Autocomplete>

        {
          <button
            style={{ display: toog ? "" : "none" }}
            className="p-2 bg-blue-500 text-white rounded"
            onClick={fecth}
          >
            Valor da Corrida
          </button>
        }
      </div>
      <div className="flex justify-center items-center rounded-lg">
        <GoogleMap
          mapContainerStyle={{
            width: "99%",
            height: "75vh",
            marginTop: 8,
            borderRadius: 10,
          }}
          zoom={14}
          center={currentLocation || { lat: -34.397, lng: 150.644 }}
        >
          {currentLocation && <Marker position={currentLocation} />}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
    </>
  );
};

export default MapComponent;
