import { useEffect, useState } from "react";
import { ICocktail } from "../interface";

const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

export function CocktailCard() {
  const [cocktail, setCocktail] = useState<ICocktail | null>(null);
  useEffect(() => {
    const fetchCocktail = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setCocktail(data.drinks[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCocktail();
  }, []);

  // Funktion för att skapa en lista av ingredienser och mått
  const renderIngredients = () => {
    const ingredients = [];
    //for-loopen går från 1 till 15 eftersom varje cocktail kan ha upp till 15 ingredienser.
    for (let i = 1; i <= 15; i++) {
      //för att dynamiskt hämta egenskaper från cocktailobjektet.
      const ingredient = cocktail?.[`strIngredient${i}` as keyof ICocktail];
      const measure = cocktail?.[`strMeasure${i}` as keyof ICocktail];
      //Om en ingrediens finns (dvs. inte är null), läggs den till i ingredienslistan tillsammans med sitt mått.
      if (ingredient) {
        ingredients.push(
          <li key={i}>
            {measure ? `${measure} ` : ""}
            {ingredient}
          </li>
        );
      }
    }
    return ingredients;
  };

  //Loopen itererar över ingredienser och mått i samma ordning och parvis, vilket säkerställer rätt måll till rätt ingrediens

  return (
    <>
      <main className="cocktail-body">
        {cocktail && (
          <>
            <h1>{cocktail.strDrink}</h1>
            <img
              className="cocktail-thumbnail"
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
            />
            <h4>Category: {cocktail.strCategory}</h4>
            <ul>{renderIngredients()}</ul>
            <p>{cocktail.strInstructions}</p>
          </>
        )}
      </main>
    </>
  );
}
