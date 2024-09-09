import { useEffect, useState } from "react";


const API_URL = "www.thecocktaildb.com/api/json/v1/1/random.php";


export function Home() {

  const [cocktail, setCocktail] = useState<[]>([])

  useEffect(() => {
    const fetchCocktail = async () => {
      try {
        const response = await fetch(API_URL);
        debugger;
        console.log("API key fetch OK");
        const data = await response.json();
        console.log(data);
        setCocktail(data.drinks[0]);

      } catch (error) {
        console.log(error);
      }
    }
    fetchCocktail();
  }, []);

  return <div><h1>Home</h1>
    <h2>{cocktail.strDrink}</h2>
  </div>;
}
