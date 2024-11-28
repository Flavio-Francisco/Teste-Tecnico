import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapRoute from "./Pages/MapRoute";
import TravelOption from "./Pages/travelOption";
import { TravelProvider } from "./contexts/usetravelOption";
import { LoadScript } from "@react-google-maps/api";
import TavelHistoryPage from "./Pages/travelHistory";


const MainPage = () => {
  const googleMapsApiKey = process.env.GOOGLE_API_KEY
    ? process.env.GOOGLE_API_KEY
    : process.env.REACT_APP_GOOGLE_API_KEY;
  console.log("chave", process.env.GOOGLE_API_KEY);
  console.log("chave", process.env.REACT_APP_GOOGLE_API_KEY);
  if (!googleMapsApiKey) {
    throw new Error(
      "A chave da API do Google Maps não foi definida no arquivo .env"
    );
  }

  return (
    <Router>
      <LoadScript
        googleMapsApiKey={googleMapsApiKey}
        libraries={["places", "geometry"]}
      >
        <TravelProvider>
          <Routes>
            <Route index element={<MapRoute />} />
            <Route path="/travelOption" element={<TravelOption />} />
            <Route path="/travel" element={<TavelHistoryPage />} />
          </Routes>
        </TravelProvider>
      </LoadScript>
    </Router>
  );
};

export default MainPage;
