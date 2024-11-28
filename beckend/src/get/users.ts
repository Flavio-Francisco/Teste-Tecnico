import { Request, Response, Router } from "express";
import prisma from "../types/prisma";

const router = Router();




router.get("/ride", async (req: Request, res: Response): Promise<any> => { 

    try {
        const rides = await prisma.user.findMany({
        
            select: {
                id: true,
                name: true,
            
                
            }
        });
        console.log(rides);
        
        return res.status(200).json(rides);
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            error_code: "INTERNAL_ERROR",
            error_description: "Ocorreu um erro interno.",
        });
    }
});


export default router;