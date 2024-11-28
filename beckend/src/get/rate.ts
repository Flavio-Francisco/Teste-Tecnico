import { Request, Response, Router } from "express";
import prisma from "../types/prisma";

const router = Router();

// GET /ride/:customer_id
router.get("/ride/:customer_id", async (req: Request, res: Response): Promise<boolean|any> => {
  const { customer_id } = req.params;
  const { driver_id } = req.query;


  if (!customer_id) {
    return res.status(400).json({
      error_code: "INVALID_CUSTOMER",
      error_description: "O ID do cliente não pode ficar em branco.",
    });
  }


  if (driver_id) {
    const driver = await prisma.driver.findUnique({
      where: { id: Number(driver_id) },
    });
    if (!driver) {
      return res.status(400).json({
        error_code: "INVALID_DRIVER",
        error_description: 'Motorista invalido.',
      });
    }
  }

  try {

    const rides = await prisma.race.findMany({
      where: {
        userId: Number(customer_id),
        ...(driver_id && { driverId: Number(driver_id) }), 
      },
        orderBy: {
          
        date: "desc",
      },
      
     
    });
      
      const driverName = await prisma.driver.findUnique({
          where: { id: Number(driver_id) },
      
      select: { name: true },
    });
    

    
    if (!rides || rides.length === 0) {
      return res.status(404).json({
        error_code: "NO_RIDES_FOUND",
        error_description: "Neum registro encontrado",
      });
    }

    
    return res.status(200).json({
      customer_id,
      rides: rides.map((ride) => ({
        id: ride.id,
        date: ride.date,
        origin: ride.origin,
        destination: ride.destination,
        distance: ride.distance,
        duration: ride.duration,
        driver: {
          id: ride.driverId,
          name: driverName ,
        },
        value: ride.value,
      })),
    });
  } catch (error) {
    console.error("Error fetching rides:", error);
    return res.status(500).json({
      error_code: "INTERNAL_SERVER_ERROR",
      error_description: "Failed to fetch rides.",
    });
  }
});

export default router;
