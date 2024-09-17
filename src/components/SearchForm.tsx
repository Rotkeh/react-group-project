import { useSearchParams } from "react-router-dom";
import { Filters } from "../data";

export function SearchForm() {
  const [, setSearchParams] = useSearchParams(); //Användaren fyller i sökformuläret och trycker på "Search" - Formulärets värden omvandlas till URL-parametrar med useSearchParams.

  /**
   * Generates a list of `<option>` elements based on the specified filter type.
   *
   * @param {("glass" | "categories" | "ingredients" | "alcohol")} filterType - The type of filter to generate options for. Can be "glass", "categories", "ingredients", or "alcohol".
   *
   * @returns {JSX.Element} A JSX fragment containing an array of `<option>` elements corresponding to the selected filter type.
   */
  const getFilters = (filterType: "glass" | "categories" | "ingredients" | "alcohol") => {
    const filters = Filters[filterType];
    const options: JSX.Element[] = [];
    filters.forEach((filter) => {
      options.push(
        <option value={filter} key={filter}>
          {filter}
        </option>
      );
    });
    return <>{options}</>;
  };

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    let input = (form.textInput as HTMLInputElement).value;
    const category = (form.category as HTMLSelectElement).value;
    const glass = (form.glass as HTMLSelectElement).value;
    const ingredient = (form.ingredient as HTMLSelectElement).value;
    const alcohol = (form.alcohol as HTMLSelectElement).value;

    input = input.trim(); //Tar bort blanka mellanslag i sökningen

    // setSearchParams för att uppdatera URL-parametrarna baserat på vad användaren angav i formuläret
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
      <form className="searchForm" onSubmit={(e) => handleSearch(e)}>
        <fieldset className="selectors-container">
          <label className="select-container" htmlFor="searchCategory">
            Category
            <select name="category" id="searchCategory">
              <option value="">All</option>
              {getFilters("categories")}
            </select>
          </label>
          <label className="select-container" htmlFor="searchGlass">
            Glass
            <select name="glass" id="searchGlass">
              <option value="">All</option>
              {getFilters("glass")}
            </select>
          </label>
          <label className="select-container" htmlFor="searchIngredient">
            Ingredient
            <select name="ingredient" id="searchIngredient">
              <option value="">All</option>
              {getFilters("ingredients")}
            </select>
          </label>
          <label className="select-container" htmlFor="searchAlochol">
            Alcohol
            <select name="alcohol" id="searchAlochol">
              <option value="">All</option>
              {getFilters("alcohol")}
            </select>
          </label>
        </fieldset>

        <div className="search-container">
          <input name="textInput" type="text" placeholder="Cocktail name" />
          <button type="submit">Search</button>
        </div>
      </form>
    </>
  );
}
