import React from "react";

const Card = ({pokemon}) => {
  if (!pokemon) return null;
  return (
    <div
          
          className="bg-white shadow-lg rounded-xl p-5 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
        >
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="mx-auto w-28 h-28 drop-shadow-md"
          />
          <p className="mt-3 text-lg font-semibold capitalize text-gray-800">
            {pokemon.name}
          </p>
        </div>
  );
};

export default Card;
