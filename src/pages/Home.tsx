import { Link } from "react-router-dom";
import { CocktailCard } from "../components/CocktailCard";

export function Home() {
  return (
    <>
      <main className="body">
        <CocktailCard />
        <Link to="/search">Search</Link>
      </main>
    </>
  );
}

