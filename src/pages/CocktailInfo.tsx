import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICocktail } from "../interface";
import { CocktailCard } from "../components/CocktailCard";

export function CocktailInfo() {
  const { id } = useParams<{ id: string }>();
  const [cocktail, setCocktail] = useState<ICocktail>();
  useEffect(() => {
    const fetchDataFromId = async () => {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const result = await response.json();
        setCocktail(result.drinks[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataFromId();
  }, [id]);
  return <main>{cocktail ? <CocktailCard showSeeMore={false} cocktail={cocktail} /> : ""}</main>;
}
