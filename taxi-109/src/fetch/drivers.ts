import axios from 'axios';
import { User } from './user';




export async function getdrivers(origin:string, destination:string) {
 const data =    axios.post('http://localhost:5000/api/ride/estimate', {
        destination: destination,
        origin: origin,
        customer_id:User.id

 })
    return (await data).data
}