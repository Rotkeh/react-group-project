import { useSearchParams } from "react-router-dom";
import { Filters } from "../data";

export function SearchForm() {
  const [, setSearchParams] = useSearchParams();

  /**
   * Generates a list of `<option>` elements based on the specified filter type.
   *
   * @param {("glass" | "categories" | "ingredients" | "alcohol")} filterType - The type of filter to generate options for. Can be "glass", "categories", "ingredients", or "alcohol".
   *
   * @returns {JSX.Element} A JSX fragment containing an array of `<option>` elements corresponding to the selected filter type.
   */
  const getFilters = (
    filterType: "glass" | "categories" | "ingredients" | "alcohol"
  ) => {
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

    input = input.trim();

    // Sets the values from the selectors in the search params
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
        <div className="selectors-container">
          <div className="select-container">
            <label htmlFor="searchCategory">Category</label>
            <select name="category" id="searchCategory">
              <option value="">All</option>
              {getFilters("categories")}
            </select>
          </div>
          <div className="select-container">
            <label htmlFor="searchGlass">Glass</label>
            <select name="glass" id="searchGlass">
              <option value="">All</option>
              {getFilters("glass")}
            </select>
          </div>
          <div className="select-container">
            <label htmlFor="searchIngredient">Ingredient</label>
            <select name="ingredient" id="searchIngredient">
              <option value="">All</option>
              {getFilters("ingredients")}
            </select>
          </div>
          <div className="select-container">
            <label htmlFor="searchAlochol">Alcohol</label>
            <select name="alcohol" id="searchAlochol">
              <option value="">All</option>
              {getFilters("alcohol")}
            </select>
          </div>
        </div>

        <div className="search-container">
          <input name="textInput" type="text" placeholder="Cocktail name" />
          <button type="submit">Search</button>
        </div>
      </form>
    </>
  );
}
