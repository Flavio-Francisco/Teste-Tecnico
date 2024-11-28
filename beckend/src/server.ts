// app.ts ou server.ts
import express, { Application } from 'express';
import cors from 'cors'; 
import path from 'path';
import rideEstimate from './Post/rideEstimate';
import drivers from "./driver/driver";
import confirm from "./Patch/rideConfirm";
import rade from "./get/rate"
import get from "./driver/get";
import users from './get/users';
import driver from './get/drivers';


const app: Application = express();
const PORT = 5000;

app.use(cors());


app.use(express.json());

app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

// Rotas

app.use('/api',rideEstimate);
app.use('/api',drivers); 
app.use('/api', get);
app.use('/api', confirm);
app.use('/api', rade);
app.use('/api', users);
app.use('/api',driver); 

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
