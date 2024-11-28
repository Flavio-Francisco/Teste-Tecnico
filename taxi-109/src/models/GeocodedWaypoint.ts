// Interface para um GeocodedWaypoint
interface GeocodedWaypoint {
    geocoder_status: string;
    place_id: string;
    types: string[];
  }
  
  // Interface para o Request
  export interface Request {
    destination: {
      query: string;
    };
    origin: {
      query: string;
    };
    travelMode: string;
  }
  
  // Interface para as rotas (Routes)
  interface Route {
    bounds: any; // Substitua por uma interface específica, se aplicável
    copyrights: string;
    legs: Array<{
      distance: {
        text: string;
        value: number;
      };
      duration: {
        text: string;
        value: number;
      };
      end_address: string;
      end_location: {
        lat: number;
        lng: number;
      };
      start_address: string;
      start_location: {
        lat: number;
        lng: number;
      };
      steps: Array<{
        distance: {
          text: string;
          value: number;
        };
        duration: {
          text: string;
          value: number;
        };
        end_location: {
          lat: number;
          lng: number;
        };
        html_instructions: string;
        polyline: {
          points: string;
        };
        start_location: {
          lat: number;
          lng: number;
        };
        travel_mode: string;
      }>;
    }>;
    overview_polyline: string;
    summary: string;
    warnings: string[];
    waypoint_order: number[];
  }
  
  // Interface principal do objeto
  export interface GoogleMapsResponse {
    geocoded_waypoints: GeocodedWaypoint[];
    request: Request;
    routes: Route[];
    status: string;
  }
  