import { Link, useNavigate } from "react-router-dom";
import { CocktailCardProps, ICocktail } from "../interface";
import { useContext, useEffect, useState } from "react";
import { FavoriteContext } from "../context";
import { fetchDataFromId } from "../loaders";

export function CocktailCard({ detailed = true, showSeeMore = true, cocktail }: CocktailCardProps) {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoriteContext);
  const [isFavorite, setIsFavorite] = useState<Boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavorite(favorites.some((favorite) => favorite.idDrink === cocktail.idDrink));
  }, [cocktail]);

  const handleClick = (ingredient: string, e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.target as HTMLLIElement;
    if (target.className !== "material-icons favoriteButton") navigate(`/ingredient/${ingredient}`);
  };
  const linkUrl = `/info/${cocktail.idDrink}`;
  // Funktion för att skapa en lista av ingredienser och mått
  const renderIngredients = () => {
    const ingredients = [];
    //for-loopen går från 1 till 15 eftersom varje cocktail kan ha upp till 15 ingredienser.
    for (let i = 1; i <= 15; i++) {
      //för att dynamiskt hämta egenskaper från cocktailobjektet. "as keyof" möjliggör dynamisk åtkomst till egenskaper på ett typ-säkert sätt.
      const ingredient = cocktail?.[`strIngredient${i}` as keyof ICocktail];
      const measure = cocktail?.[`strMeasure${i}` as keyof ICocktail];
      //Om en ingrediens finns (dvs. inte är null), läggs den till i ingredienslistan tillsammans med sitt mått.
      if (ingredient) {
        ingredients.push(
          <li className="ingredient" key={i} onClick={(e) => handleClick(ingredient, e)}>
            {measure ? `${measure} ` : ""}
            {ingredient}
          </li>
        );
      }
    }
    return ingredients;
  };

  const handleAdd = async () => {
    if (!cocktail.strAlcoholic) {
      const newCocktail = await fetchDataFromId({
        params: { id: cocktail.idDrink },
        request: new Request(""),
      });
      addFavorite(newCocktail);
    } else {
      addFavorite(cocktail);
    }
    setIsFavorite(true);
  };

  const handleRemove = () => {
    removeFavorite(cocktail.idDrink);
    setIsFavorite(false);
  };

  //Loopen itererar över ingredienser och mått i samma ordning och parvis, vilket säkerställer rätt mått till rätt ingrediens

  return (
    <>
      <main className="cocktail-body">
        {cocktail && (
          <>
            <h1>{cocktail.strDrink}</h1>
            <figure>
              <img
                className="cocktail-thumbnail"
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
              />
            </figure>
            {showSeeMore ? (
              <Link to={linkUrl} className="hover-effect">
                See more
              </Link>
            ) : (
              ""
            )}

            {/* Visa detaljer bara om detailed är true */}
            {detailed && (
              <>
                <section className="drink-container">
                  <article className="drink-info">
                    <strong>{cocktail.strAlcoholic}</strong>
                    <p className="category">
                      <strong>Category: </strong>
                      {cocktail.strCategory}
                    </p>
                    {cocktail.strTags ? (
                      <p className="tags">
                        <strong>Tag(s): </strong>
                        {cocktail.strTags}
                      </p>
                    ) : (
                      ""
                    )}
                    <p className="glass">
                      <strong>Glass: </strong> {cocktail.strGlass}
                    </p>
                  </article>
                  {isFavorite ? (
                    <span className="material-icons favoriteButton" onClick={handleRemove}>
                      favorite
                    </span>
                  ) : (
                    <span className="material-icons favoriteButton" onClick={handleAdd}>
                      favorite_border
                    </span>
                  )}
                </section>
                <section className="ingredients-directions">
                  <p className="bold">Ingredients:</p>
                  <p>(Click on ingredient for more info)</p>
                  <ul className="ingredients">{renderIngredients()}</ul>
                  <p className="bold">Instructions:</p>
                  <p className="instructions">{cocktail.strInstructions}</p>
                </section>
              </>
            )}

            {!detailed ? (
              isFavorite ? (
                <span className="material-icons favoriteButton" onClick={handleRemove}>
                  favorite
                </span>
              ) : (
                <span className="material-icons favoriteButton" onClick={handleAdd}>
                  favorite_border
                </span>
              )
            ) : (
              ""
            )}
          </>
        )}
      </main>
    </>
  );
}
