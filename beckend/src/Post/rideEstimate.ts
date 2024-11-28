import { Request, Response, Router } from "express";
import axios from "axios";
import prisma from "../types/prisma";

const router = Router();

// Endpoint para estimar preço da viagem
router.post("/ride/estimate", async (req: Request, res: Response): Promise<void> => {
  const { origin, destination, customer_id} = req.body;

  // Validações
  if (!origin || !destination) {
    res.status(400).json({ error_code: "INVALID_DATA", error_description: "Origem e destino são obrigatórios." });
    return;
  }

  if (!customer_id) {
    res.status(400).json({ error_code: "INVALID_DATA", error_description: "ID do usuário é obrigatório." });
    return;
  }

  if (origin === destination) {
    res.status(400).json({ error_code: "INVALID_DATA", error_description: "Origem e destino não podem ser iguais." });
    return;
  }

  try {
    // Chamada à API do Google Maps para calcular a rota
    const googleApiKey = "AIzaSyCu2Y-gsN3ProusJfV_7dEVgwEM6-HRwsI";
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
      origin
    )}&destination=${encodeURIComponent(destination)}&key=${googleApiKey}`;

    const response = await axios.get(url);

    if (response.data.status !== "OK") {
      res.status(400).json({ error_code: "INVALID_ROUTE", error_description: "Não foi possível calcular a rota." });
      return;
    }

    const route = response.data.routes[0];
    const distanceInMeters = route.legs[0].distance.value;
    const duration = route.legs[0].duration.text;
    const distanceInKm = distanceInMeters / 1000;
    const originCoords = route.legs[0].start_location;
    const destinationCoords = route.legs[0].end_location;

    // Busca motoristas disponíveis no banco de dados
    const drivers = await prisma.driver.findMany({
      where: {
        available: true,
        kilometers: { lte: distanceInKm }, // lte: menor ou igual
      },
      include: {
        Assessment: {
          select: {
            rating: true,
            comment:true
          
            },
          }
        }

      
    });

    if (drivers.length === 0) {
      res.status(404).json({ message: "Nenhum motorista disponível para a distância fornecida." });
      return;
    }

    // Calcula preço estimado para cada motorista
    const driversWithEstimates = drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.car,
      review: driver.Assessment,
      photo: driver.photo,
      rating: driver.rating,
      value: parseFloat((distanceInKm * driver.rate).toFixed(2)),
    }));

    // Ordena motoristas do mais barato para o mais caro
    driversWithEstimates.sort((a, b) => a.value - b.value);

    // Retorna a resposta completa
    res.status(200).json({
      origin: {
        latitude: originCoords.lat,
        longitude: originCoords.lng,
      },
      destination: {
        latitude: destinationCoords.lat,
        longitude: destinationCoords.lng,
      },
      distance: parseFloat(distanceInKm.toFixed(2)),
      duration,
      options: driversWithEstimates,
      routeResponse: response.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao processar a requisição." });
  }
});

export default router;
