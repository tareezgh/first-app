import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import "./Card.css";

const Card = ({ pokemon }) => {
  const [pokeData, setPokeData] = useState([]);

  useEffect(() => {
    fetchDataPerPokemon(pokemon.url);
  }, []);

  const fetchDataPerPokemon = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      // console.log(json);
      const allPokemons = [...pokeData, json];
      setPokeData(allPokemons);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      {pokeData.map((item) => {
        return (
          <>
            <Link to={"/info" + item.id} params={{ pokeData: { pokeData } }}>
              <div className="column">
                <div className="card" key={item.id}>
                  <h2 className="cardId">#{item.id}</h2>
                  <img
                    className="cardImg"
                    src={item.sprites.front_default}
                    alt=""
                  />
                  <h2 className="cardName">{item.name}</h2>
                </div>
              </div>
            </Link>
          </>
        );
      })}
    </>
  );
};

export default Card;
