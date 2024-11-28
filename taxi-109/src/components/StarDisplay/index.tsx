import React from "react";
import { FaStar } from "react-icons/fa";

interface StarDisplayProps {
  rating: number; // Número de estrelas (ex.: 3.5)
  totalStars?: number; // Total de estrelas possíveis (padrão: 5)
}

const StarDisplay: React.FC<StarDisplayProps> = ({
  rating,
  totalStars = 5,
}) => {
  return (
    <div style={{ display: "flex", gap: "5px" }}>
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            key={index}
            size={24}
            color={starValue <= rating ? "#FFD700" : "#CCC"} // Cor da estrela
          />
        );
      })}
    </div>
  );
};

export default StarDisplay;
