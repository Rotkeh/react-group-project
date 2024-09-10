import { useEffect, useState } from "react";
import { ICocktail } from "../interface";
import { Link } from "react-router-dom";

const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";


export function Home() {
  const [cocktail, setCocktail] = useState<ICocktail>();

  useEffect(() => {
    const fetchCocktail = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setCocktail(data.drinks[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCocktail();
  }, []);

  return (
    <main className="body">
      {cocktail && (
        <>
          <h1>{cocktail.strDrink}</h1>
          <h4>{cocktail.strCategory}</h4>
          <p>{cocktail.strInstructions}</p>
          <Link to ="/search">Search</Link>
        </>
      )}
    </main>
  );
}

// import { useState, useEffect } from "react";
// import "./App.css";

// function App() {
//   let [randomCocktail, setRandomCocktail] = useState(null);

//   useEffect(() => {
//     fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
//       .then((response) => response.json())
//       .then((data) => setRandomCocktail(data));
//     console.log(randomCocktail);
//   }, []);

//   return <div className="App"></div>;
// }

// export default App;
