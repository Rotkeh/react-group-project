import { Link } from "react-router-dom";
import { CocktailCardProps, ICocktail } from "../interface";
import { useContext, useEffect, useState } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import { fetchDataFromId } from "../loaders/InfoPageLoader";

export function CocktailCard({
  detailed = true,
  showSeeMore = true,
  cocktail,
}: CocktailCardProps) {
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoriteContext);
  const [isFavorite, setIsFavorite] = useState<Boolean>(false);

  useEffect(() => {
    setIsFavorite(
      favorites.some((favorite) => favorite.idDrink === cocktail.idDrink)
    );
  }, [cocktail]);

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
          <li key={i}>
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
                    <span
                      className="material-icons favoriteButton"
                      onClick={handleRemove}
                    >
                      favorite
                    </span>
                  ) : (
                    <span
                      className="material-icons favoriteButton"
                      onClick={handleAdd}
                    >
                      favorite_border
                    </span>
                  )}
                </section>
                <ul className="ingredients">
                  <span className="bold">Ingredients: </span>
                  {renderIngredients()}
                </ul>
                <p>{cocktail.strInstructions}</p>
              </>
            )}
            {!detailed ? (
              isFavorite ? (
                <span
                  className="material-icons favoriteButton"
                  onClick={handleRemove}
                >
                  favorite
                </span>
              ) : (
                <span
                  className="material-icons favoriteButton"
                  onClick={handleAdd}
                >
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
