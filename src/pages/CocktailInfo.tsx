import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ICocktail } from "../interface";
import { CocktailCard } from "../components/CocktailCard";

export function CocktailInfo() {
  const cocktailInfo = useLoaderData() as ICocktail;
  const [cocktail] = useState<ICocktail>(cocktailInfo);

  return (
    <main>
      <CocktailCard showSeeMore={false} cocktail={cocktail} />
    </main>
  );
}
