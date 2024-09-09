import { useEffect, useState } from "react";

export function SearchPage() {
  const [cocktail, setCocktail] = useState<any>(null);

  useEffect(() => {
    const searchTerm = "dry";

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
        );
        const result = await response.json();
        setCocktail(result);
      } catch (err) {
        console.log("something went wrong");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Search Page</h1>
      <h2>{JSON.stringify(cocktail)}</h2>
    </div>
  );
}
