// Interface do motorista
export interface DriverRace {
    id: number;
    name: string;
  }
  
  
  export interface TravelDetails {
    customer_id: number;
    origin: string  ;
    destination: string  ;
    distance: string ; 
    duration:string ; 
    driver: DriverRace;
    value: number; 
  }
  