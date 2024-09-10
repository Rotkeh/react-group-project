import { useEffect, useState } from "react";
import { ICocktail } from "../interface";
import { Link } from "react-router-dom";
import { NewCocktailButton } from "../components/NewCocktailButton";

const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";


export function Home() {
  const [randomCocktail, setRandomCocktail] = useState<ICocktail>();

  useEffect(() => {
    const fetchCocktail = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setRandomCocktail(data.drinks[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCocktail();
  }, []);

  return (
    <div>
      {randomCocktail && (
        <>
          <h1>{randomCocktail.strDrink}</h1>
          <h4>{randomCocktail.strCategory}</h4>
          <p>{randomCocktail.strInstructions}</p>
          <Link to ="/search">Search</Link>
        </>
      )}

    </div>
  );
}


//Landing Page (Random Cocktail)
// Användare ska kunna se en slumpmässig cocktail när de besöker sidan.
// Användare ska kunna hämta en ny slumpmässig cocktail genom att klicka på en knapp.
// Cocktailens namn och bild ska visas som ett kort.
// Användare ska kunna klicka på Se mer för att navigera till en Cocktail Info Page.


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
