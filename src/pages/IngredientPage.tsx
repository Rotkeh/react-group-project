import { IngredientLoaderData } from "../interface";
import { IngredientCard } from "../components/IngredientCard";
import { useLoaderData } from "react-router-dom";

export function IngredientPage() {
  const { ingredient, drinks } = useLoaderData() as IngredientLoaderData;
  const imgUrl = `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient}.png`;

  return (
    <main>
      {ingredient && (
        <IngredientCard
          ingredient={ingredient}
          img={imgUrl}
          cocktails={drinks}
        />
      )}
    </main>
  );
}
