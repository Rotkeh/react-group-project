import { useEffect, useState } from "react";
import { ICocktail, IngredientProps } from "../interface";
import { CocktailCard } from "../components";
import { useNavigate } from "react-router-dom";

export function IngredientCard({ ingredient, img, cocktails }: IngredientProps) {
  const [showAll, setShowAll] = useState<boolean>(false); //Visa alla drinkar som innehåller ingredientsen eller de första 12 från API:t
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); //Rullar sidan till toppen när komponenten renderas

  //Navigera till drinken om mann trycker på dess kort
  const handleClick = (cocktail: ICocktail, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (target.className !== "material-icons favoriteButton") navigate(`/info/${cocktail.idDrink}`);
  };
  return (
    <section className="ingredient-container">
      <section className="drink-info">
        <img src={img} className="ingredient-img" alt={ingredient.strIngredient} />
        <h1 className="ingredient-title">{ingredient.strIngredient}</h1>
        <article className="ingredient-tags">
          {ingredient.strType ? (
            <p className="category">
              <strong>Type:</strong> {ingredient.strType}
            </p>
          ) : (
            ""
          )}
          <p className="category">
            <strong>Alcoholic:</strong> {ingredient.strAlcohol}
          </p>
          <p className="category">
            <strong>Alcoholic content:</strong> {ingredient.strABV ? ingredient.strABV : "0"}%
          </p>
        </article>
        <p className="ingredient-description">{ingredient.strDescription}</p>
      </section>
      <h3>Drinks containing {ingredient.strIngredient}:</h3>
      <button onClick={() => setShowAll((prev) => !prev)}>
        {showAll ? "Show less" : "Show all drinks"}
      </button>
      <section className="ingredient-drink">
        {showAll
          ? cocktails.map((c) => (
              <div className="cocktail-card" key={c.idDrink} onClick={(e) => handleClick(c, e)}>
                <CocktailCard cocktail={c} detailed={false} showSeeMore={false} />
              </div>
            ))
          : cocktails.slice(0, 12).map((c) => (
              <div className="cocktail-card" key={c.idDrink} onClick={(e) => handleClick(c, e)}>
                <CocktailCard cocktail={c} detailed={false} showSeeMore={false} />
              </div>
            ))}
      </section>
    </section>
  );
}
