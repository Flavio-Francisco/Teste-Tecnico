import { useMutation } from "@tanstack/react-query";
import { TravelDetails } from "../../models/race";
import StarDisplay from "../StarDisplay";
import { postTravel } from "../../fetch/travel";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export interface Driver {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: any[];
  photo: string;
  value: number;
  rating: number;
}

interface Iprops {
  driver: Driver;
  travel: TravelDetails;
}
export default function CardDriver({ driver, travel }: Iprops) {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["travel"],
    mutationFn: (travel: TravelDetails) => postTravel(travel),
    onSuccess(data) {
      if (data.success === true) {
        navigate("/travel");
      } else {
        alert(data.error_description);
      }
    },
    onError(error) {
      alert(error.message);
    },
  });

  return (
    <div className="flex justify-center flex-col bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 mb-4">
      <img
        src={driver.photo}
        alt={`Foto de ${driver.name}`}
        className=" bg-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{driver.name}</h2>
        <p className="text-sm text-gray-600">{driver.description}</p>
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Carro:</span> {driver.vehicle}
          </p>

          <p className="text-sm text-gray-600">
            <span className="font-medium">Valor da corrida: </span> R${" "}
            {driver.value}
          </p>
          <div>
            <StarDisplay rating={driver.rating} />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="p-3  w-4/4 text-xl text-slate-50 font-bold bg-green-500 shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
            onClick={() => mutate(travel)}
          >
            {isPending ? (
              <CircularProgress style={{ color: "white" }} size={25} />
            ) : (
              "Selecionar"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
