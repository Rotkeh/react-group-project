import { CocktailCard } from "../components/CocktailCard";
import { useState } from "react";
import { ICocktail } from "../interface";
import { NewCocktailButton } from "../components/NewCocktailButton";
import { useLoaderData } from "react-router-dom";

export function Home() {
  const loadedRandomCocktail = useLoaderData() as ICocktail; //useLoaderData ger tillgång till den redan hämtade cocktail-datan från API
  const [randomCocktail, setRandomCocktail] = useState<ICocktail>(loadedRandomCocktail);

  return (
    <>
      <main className="body">
        {randomCocktail ? <CocktailCard detailed={false} cocktail={randomCocktail!} /> : ""}

        <NewCocktailButton buttonFunction={setRandomCocktail} />
      </main>
    </>
  );
}
