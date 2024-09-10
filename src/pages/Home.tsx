import { Link } from "react-router-dom";
import { CocktailCard } from "../components/CocktailCard";
import { useState } from "react";
import { ICocktail } from "../interface";

export function Home() {
  const [randomCocktail, setRandomCocktail] = useState<ICocktail>();
  return (
    <>
      <main className="body">
        <CocktailCard />
        <Link to="/search">Search</Link>
      </main>
    </>
  );
}

