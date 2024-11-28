interface Driver {
    id: number;
    name: {
        name: string;
    };
}

interface Ride {
    id: number;
    date: string;
    origin: string;
    destination: string;
    distance: string;
    duration: string;
    driver: Driver;
    value: number;
}

export interface CustomerRides {
    customer_id: string;
    rides: Ride[];
}
