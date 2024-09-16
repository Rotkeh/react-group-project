import { useContext, useEffect, useState } from "react";
import { ICocktail } from "../interface";
import { Pagination } from "../components/Pagination";
import { FavoriteContext } from "../context/FavoriteContext";

export function Favorites() {
  const [favoriteCocktails, setFavoriteCocktails] = useState<ICocktail[]>([]);
  const { favorites } = useContext(FavoriteContext);

  useEffect(() => {
    setFavoriteCocktails(favorites);
  }, [favorites]);
  return (
    <div>
      <Pagination data={favoriteCocktails} />
    </div>
  );
}
