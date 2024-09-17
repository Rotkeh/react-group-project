import { useContext, useEffect, useState } from "react";
import { ICocktail } from "../interface";
import { Pagination } from "../components/Pagination";
import { FavoriteContext } from "../context/FavoriteContext";

export function Favorites() {
  const [favoriteCocktails, setFavoriteCocktails] = useState<ICocktail[]>([]);
  const [filterAlcohol, setFilterAlcohol] = useState<boolean>(false);
  const { favorites } = useContext(FavoriteContext); //useContext används för att hämta favorites från FavoriteContext,

  function handleToggle() {
    setFilterAlcohol((prev) => !prev);
  }

  useEffect(() => {
    setFavoriteCocktails(favorites);
  }, [favorites]); // Varje gång favorites ändra sätts den lokala favoriteCocktails-state till den uppdaterade listan av favoriter som finns i kontexten.

  return (
    <main>
      <button onClick={handleToggle}>Filter Alcohol: {filterAlcohol.toString()}</button>
      <Pagination
        data={
          filterAlcohol
            ? favoriteCocktails.filter((cocktail) => cocktail.strAlcoholic !== "Alcoholic")
            : favoriteCocktails
        }
      />
    </main>
  );
}
