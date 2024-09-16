import { Link } from "react-router-dom";
import { CocktailCard } from "../components/CocktailCard";
import { useEffect, useState } from "react";
import { ICocktail } from "../interface";
import { NewCocktailButton } from "../components/NewCocktailButton";

const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

export function Home() {
  const [randomCocktail, setRandomCocktail] = useState<ICocktail>();

  useEffect(() => {
    fetchCocktail();
  }, []);

  const fetchCocktail = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setRandomCocktail(data.drinks[0]);

      // skicka tillbaka drinken till föräldern
    } catch (error) {
      console.error("Error fetching cocktail", error);
    }
  };

  return (
    <>
      <main className="body">
        {randomCocktail ? <CocktailCard detailed={false} cocktail={randomCocktail!} /> : ""}

        <NewCocktailButton fetchCocktail={fetchCocktail} />
      </main>
    </>
  );
}
