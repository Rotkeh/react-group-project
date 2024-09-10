import { ICocktail } from "../interface";

interface CocktailCardProps {
  detailed?: boolean;
  cocktail: ICocktail;
}

export function CocktailCard({ detailed = true, cocktail }: CocktailCardProps) {
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

  //Loopen itererar över ingredienser och mått i samma ordning och parvis, vilket säkerställer rätt mått till rätt ingrediens

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

            {/* Visa detaljer bara om detailed är true, här är det false */}
            {detailed && (
              <>
                <h4 className="category">Category: {cocktail.strCategory}</h4>
                <ul className="ingredients">{renderIngredients()}</ul>
                <p>{cocktail.strInstructions}</p>
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}

//För detaljerad vy:
// import { CocktailCard } from "../components/CocktailCard";

// export function CocktailDetail() {
//   return (
//     <main className="body">
//       <CocktailCard detailed={true} />
//     </main>
//   );
// }
