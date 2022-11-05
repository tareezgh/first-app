import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import logo from "../../shared/logo.png";

import Card from "../../shared/components/Card/Card";

import "./PokeInfo.css";

const PokeInfo = ({ data }) => {
  const [pokeData, setPokeData] = useState([]);
  const param = useParams("id");
  console.log(param.id);

  const fetchDataPerPokemon = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      const allPokemons = [...pokeData, json];
      setPokeData(allPokemons);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchDataPerPokemon(`https://pokeapi.co/api/v2/pokemon/${param.id}/`);
  }, []);

  return (
    <>
      <img src={logo} className="logo" alt="logo" />
      <div className="containerInfo">
        {pokeData.map((item) => {
          return (
            <>
              <div className="leftContent">
                <div className="cardInfo" key={item.id}>
                  <h2 className="cardIdInfo">#{item.id}</h2>
                  <img
                    className="cardImg"
                    src={item.sprites.front_default}
                    alt=""
                  />
                  <h2 className="cardNameInfo">{item.name}</h2>
                  <div className="abilities">
                    {item.abilities.map((poke) => {
                      return (
                        <>
                          <div className={"group normal " + poke.ability.name}>
                            <div>
                              {poke.ability.name.charAt(0).toUpperCase() +
                                poke.ability.name.slice(1)}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="line"></div>
              <div className="rightContent">
                <div className="description">
                  <h2 className="desTitle">Description</h2>
                  <p className="details">
                    {" "}
                    A strange seed was planted on its back at birth. The plant
                    sprouts and grows with this POKéMON.
                  </p>
                </div>

                <h2 className="statsTitle">Stats</h2>
                <div className="base-stat">
                  <div className="col1">
                    <div>
                      {"HP"}: {item.stats[0].base_stat}
                    </div>
                    <div>
                      {"Attack"}: {item.stats[1].base_stat}
                    </div>
                    <div>
                      {"Defense"}: {item.stats[2].base_stat}
                    </div>
                  </div>
                  <div className="col2">
                    <div>
                      {"Special Atk"}: {item.stats[3].base_stat}
                    </div>
                    <div>
                      {"Special Def"}: {item.stats[4].base_stat}
                    </div>
                    <div>
                      {"Speed"}: {item.stats[5].base_stat}
                    </div>
                  </div>
                  <div className="col3">
                    <div className="total">Total: </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default PokeInfo;
