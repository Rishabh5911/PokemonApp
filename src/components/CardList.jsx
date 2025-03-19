import React from "react";
import Card from "./Card";

const CardList = ({ cards }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
      {cards.map((pokemon) => (
        <Card pokemon={pokemon} key={pokemon.id}/>
      ))}
    </div>
  );
};

export default CardList;

