import { useContext, useEffect, useState } from "react";
import { ICocktail } from "../interface";
import { Pagination } from "../components/Pagination";
import { FavoriteContext } from "../context/FavoriteContext";

export function Favorites() {
  const [favoriteCocktails, setFavoriteCocktails] = useState<ICocktail[]>([]);
  const [filterAlcohol, setFilterAlcohol] = useState<boolean>(false);
  const { favorites } = useContext(FavoriteContext);

  function handleToggle() {
    setFilterAlcohol((prev) => !prev);
  }

  useEffect(() => {
    setFavoriteCocktails(favorites);
  }, [favorites]);
  return (
    <main>
      <button onClick={handleToggle}>
        Filter Alcohol: {filterAlcohol.toString()}
      </button>
      <Pagination
        data={
          filterAlcohol
            ? favoriteCocktails.filter(
                (cocktail) => cocktail.strAlcoholic !== "Alcoholic"
              )
            : favoriteCocktails
        }
      />
    </main>
  );
}
