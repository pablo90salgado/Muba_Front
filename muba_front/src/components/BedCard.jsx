import React from "react";

function BedCard({ estado = "libre", numero = 1 }) {
  const colores = {
    libre: "bg-green-400",
    ocupada: "bg-red-400",
    limpieza: "bg-yellow-400",
    reservada: "bg-blue-400",
    bloqueada: "bg-gray-400",
  };

  return (
    <div className={`p-4 rounded shadow ${colores[estado] || "bg-gray-200"}`}>
      <h2 className="text-lg font-bold">Cama #{numero}</h2>
      <p className="capitalize">Estado: {estado}</p>
    </div>
  );
}

export default BedCard;