import { useSearchParams } from "react-router-dom";

export function SearchForm() {
  const [, setSearchParams] = useSearchParams();
  function Search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = (form.textInput as HTMLInputElement).value;
    const category = (form.category as HTMLSelectElement).value;
    const glass = (form.glass as HTMLSelectElement).value;
    const ingredient = (form.ingredient as HTMLSelectElement).value;
    const alcohol = (form.alcohol as HTMLSelectElement).value;
    setSearchParams({
      c: category,
      g: glass,
      i: ingredient,
      a: alcohol,
      s: input,
    });
  }
  return (
    <>
      <form className="searchForm" onSubmit={(e) => Search(e)}>
        <div className="selectors-container">
          <div className="select-container">
            <label htmlFor="searchCategory">Category</label>
            <select name="category" id="searchCategory">
              <option value="">All</option>
              <option value="Cocktail">Cocktail</option>
              <option value="Shake">Shake</option>
              <option value="Punch / Party Drink">Punch / Party Drink</option>
            </select>
          </div>
          <div className="select-container">
            <label htmlFor="searchGlass">Glass</label>
            <select name="glass" id="searchGlass">
              <option value="">All</option>
              <option value="Beer Glass">Beer Glass</option>
              <option value="Coffee mug">Coffee mug</option>
              <option value="Margarita/Coupette glass">
                Margarita/Coupette glass
              </option>
            </select>
          </div>
          <div className="select-container">
            <label htmlFor="searchIngredient">Ingredient</label>
            <select name="ingredient" id="searchIngredient">
              <option value="">All</option>
              <option value="Gin">Gin</option>
              <option value="Vodka">Vodka</option>
            </select>
          </div>
          <div className="select-container">
            <label htmlFor="searchAlochol">Alochol</label>
            <select name="alcohol" id="searchAlochol">
              <option value="">All</option>
              <option value="Alcoholic">Alcoholic</option>
              <option value="Non alcoholic">Non alcoholic</option>
            </select>
          </div>
        </div>

        <div className="search-container">
          <input
            name="textInput"
            type="text"
            placeholder="search for a cocktail"
          />
          <button type="submit">Search</button>
        </div>
      </form>
    </>
  );
}
