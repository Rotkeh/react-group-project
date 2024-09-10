import { useEffect, useState } from "react";
import { ICocktail } from "../interface";

export function SearchPage() {
  const [cocktails, setCocktails] = useState<ICocktail[]>();

  useEffect(() => {
    const searchTerm = "dry";

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
        );
        const result = await response.json();
        console.log(result.drinks);
        setCocktails(result.drinks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Search Page</h1>
      {cocktails && cocktails!.length > 0 ? (cocktails!.map((cocktail) => (
        <h2 key={cocktail.idDrink}>{cocktail.strDrink}</h2>
      ))) : ""}
    </div>
  );
}



// Användare ska kunna söka efter en cocktail med hjälp av dess namn.
// Resultaten ska visas i en lista med max 10 resultat, och listan ska vara paginerad om det finns fler än 10 resultat.
// Vid klick på en cocktail i listan ska användaren navigeras till Cocktail Info Page.