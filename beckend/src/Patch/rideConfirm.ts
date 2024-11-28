import { Request, Response, Router } from "express";
import prisma from '../types/prisma';

const router = Router();

// Corrigindo a tipagem do handler da rota
router.patch("/ride/confirm", async (req: Request, res: Response) : Promise<boolean|any> =>  {
    const {
        customer_id,
        origin,
        destination,
        distance,
        duration,
        driver,
        value,
      } = req.body;
    
  const datat = req.body;
  console.log(datat);
  
        
      if (!customer_id || !origin || !destination || !driver || !driver.id || !driver.name) {
        return res.status(400).json({
          error_code: 'INVALID_DATA',
          error_description: 'Os dados do fornecidos no copo da requisição são invalidos.',
        });
      }
    
     
      if (origin === destination) {
        return res.status(400).json({
          error_code: 'INVALID_DATA',
          error_description: 'Origem e destino não podem ser iguais.',
        });
      }
    
  
      const driverExists = await checkDriverExists(driver.id);
      if (!driverExists) {
        return res.status(404).json({
          error_code: 'DRIVER_NOT_FOUND',
          error_description: 'Motorista não encontrado.',
        });
      }
    
     
      const isDistanceValid = await validateDriverDistance(driver.id, convertToNumber(distance));
      if (!isDistanceValid) {
        return res.status(406).json({
          error_code: 'INVALID_DISTANCE',
          error_description: 'Quilometragem inválida para o motorista.',
        });
      }
    
 
    try {
         
          
 const data =    await prisma.race.create({
            data: {
              userId: customer_id,
              origin: origin,
              destination: destination,
              distance: distance,
              duration: duration,
              driverId: driver.id,
              value: value,
              
            },
          });
    
      return res.status(200).json({
        success: true,
        error_description: 'Operação realizada com sucesso',
          
         });
    } catch (error) {
 
        console.error('Error saving ride:', error);
        return res.status(500).json({
          error_code: 'INTERNAL_SERVER_ERROR',
          error_description: 'Erro de servidor.',
        });
        }

    
    
});

// Função para verificar se o motorista existe
const checkDriverExists = async (driverId: number): Promise<boolean> => {
  const driver = await prisma.driver.findUnique({
    where: { id: driverId },
  });
  return !!driver;
};

// Função para validar a quilometragem
const validateDriverDistance = async (driverId: number, distance: number): Promise<boolean> => {
  const driver = await prisma.driver.findUnique({
    where: { id: driverId },
  });

  if (!driver) return false;

  
  return distance >= driver.kilometers;
};


export default router;

function convertToNumber(str: string): number {
  // Remove the ' km' at the end of the string and replace the comma with a dot
  const numberStr = str.replace(' km', '').replace(',', '.');
  
  // Convert to a number
  return parseFloat(numberStr);
}



