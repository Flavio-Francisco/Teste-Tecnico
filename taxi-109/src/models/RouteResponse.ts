interface GeoPoint {
    latitude: number;
    longitude: number;
  }
  
  interface Option {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: any[]; // Pode ser substituído por um tipo específico se as reviews tiverem uma estrutura definida
    photo: string;
    value: number;
  }
  
  interface Waypoint {
    geocoder_status: string;
    place_id: string;
    types: string[];
  }
  
  interface Bounds {
    northeast: GeoPoint;
    southwest: GeoPoint;
  }
  
  interface DistanceDuration {
    text: string;
    value: number;
  }
  
  interface Step {
    distance: DistanceDuration;
    duration: DistanceDuration;
    end_location: GeoPoint;
    html_instructions: string;
    polyline: { points: string };
    start_location: GeoPoint;
    travel_mode: string;
    maneuver?: string;
  }
  
  interface Leg {
    distance: DistanceDuration;
    duration: DistanceDuration;
    end_address: string;
    end_location: GeoPoint;
    start_address: string;
    start_location: GeoPoint;
    steps: Step[];
  }
  
  interface Route {
    bounds: Bounds;
    copyrights: string;
    legs: Leg[];
  }
  
  interface RouteResponse {
    geocoded_waypoints: Waypoint[];
    routes: Route[];
  }
  
  export interface ApiResponse {
    origin: GeoPoint;
    destination: GeoPoint;
    distance: number;
    duration: string;
    options: Option[];
    routeResponse: RouteResponse;
  }
  