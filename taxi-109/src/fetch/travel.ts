import axios from 'axios';
import { TravelDetails } from '../models/race';




export async function postTravel(travel: TravelDetails) {
 const data = axios.patch('http://localhost:5000/api/ride/confirm', travel)
    return (await data).data
}