import { useEffect, useState } from "react";
import { ICocktail, IngredientProps } from "../interface";
import { CocktailCard } from "./CocktailCard";
import { useNavigate } from "react-router-dom";

export function IngredientCard({ ingredient, img, cocktails }: IngredientProps) {
  const [showAll, setShowAll] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClick = (cocktail: ICocktail, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (target.className !== "material-icons favoriteButton") navigate(`/info/${cocktail.idDrink}`);
  };
  return (
    <section className="ingredient-container">
      <section className="drink-info">
        <img src={img} className="ingredient-img" alt={ingredient.strIngredient} />
        <h1>{ingredient.strIngredient}</h1>
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
        <p className="ingredient-description">{ingredient.strDescription}</p>
      </section>
      <h3>Drinks containing {ingredient.strIngredient}</h3>
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

// Användare ska kunna se detaljerad information om en ingrediens genom att klicka på den.
//Informationen ska inkludera namn, beskrivning, alkoholhalt (om tillämpligt), och vilka andra cocktails som innehåller den.
