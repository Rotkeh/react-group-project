import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICocktail } from "../interface";
import { CocktailCard } from "../components/CocktailCard";
import { Loader } from "../components/Loader";

export function CocktailInfo() {
  const { id } = useParams<{ id: string }>();
  const [cocktail, setCocktail] = useState<ICocktail>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useEffect(() => {
    const fetchDataFromId = async () => {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const result = await response.json();
        if (result) {
          setCocktail(result.drinks[0]);
          // setIsLoaded(true);
          setTimeout(() => setIsLoaded(true), 1000);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataFromId();
  }, [id]);
  return (
    <main>{isLoaded ? <CocktailCard showSeeMore={false} cocktail={cocktail!} /> : <Loader />}</main>
  );
}
