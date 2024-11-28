import { Request, Response, Router } from "express";
import prisma from "../types/prisma";

const router = Router();

router.get("/driver", async (req: Request, res: Response): Promise<any> => { 
    const { customer_id } = req.query; // Acessando como query string

    if (!customer_id) {
        return res.status(400).json({
            error_code: "INVALID_CUSTOMER",
            error_description: "O ID do cliente não pode ficar em branco.",
        });
    }

    try {
        // Busca as corridas associadas ao cliente e inclui os motoristas
        const rides = await prisma.race.findMany({
            where: {
                userId: Number(customer_id)
            },
            select: {
                Driver: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        });

       
        const drivers = Array.from(
            new Map(rides.map(ride => [ride.Driver.id, ride.Driver])).values()
        );

        console.log(drivers);
        
        return res.status(200).json(drivers); // Retorna a lista de motoristas únicos
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            error_code: "INTERNAL_ERROR",
            error_description: "Ocorreu um erro interno.",
        });
    }
});

export default router;
