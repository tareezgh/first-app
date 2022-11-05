import React, { useState, useEffect } from "react";

import PokeInfo from "../details/PokeInfo";
import Card from "../../shared/components/Card/Card";

import logo from "../../shared/logo.png";

import "./Home.css";

const Home = () => {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [pokeData, setPokeData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [nextUrl, setNextUrl] = useState();

  useEffect(() => {
    fetchData(url);
  }, []);

  const fetchData = async (ourUrl) => {
    try {
      const response = await fetch(ourUrl);
      const json = await response.json();
      const allPokemons = [...pokeData, ...json.results];
      setPokeData(allPokemons);
      console.log(json);
      if (json.next != "") setNextUrl(json.next);
      else setNextUrl("");
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchDataPerPokemon = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log("error", error);
    }
  };

  const loadMore = async () => {
    await fetchData(nextUrl);
  };

  console.log(searchInput);
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    // fetchDataPerPokemon(`${url}${searchInput}`);
  };

  return (
    <>
      <div className="container">
        <img src={logo} className="logo" alt="logo" />
        <input
          className="searchInput"
          placeholder="Enter Pokemon name"
          onChange={(e) => searchItems(e.target.value)}
        />


        <button className="searchBtn">Search</button>

        <div className="row">
          {pokeData && pokeData.map((pokemon) => <Card pokemon={pokemon} />)}
        </div>
        {nextUrl && (
          <button className="loadBtn" onClick={loadMore}>
            Load more...
          </button>
        )}
      </div>
    </>
  );
};

export default Home;
