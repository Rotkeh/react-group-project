import { useSearchParams } from "react-router-dom";

export function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();
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
    <div>
      <form onSubmit={(e) => Search(e)}>
        <select name="category" id="">
          <option value="">All</option>
          <option value="Cocktail">Cocktail</option>
          <option value="Shake">Shake</option>
          <option value="Punch / Party Drink">Punch / Party Drink</option>
        </select>
        <select name="glass" id="">
          <option value="">All</option>
          <option value="Beer Glass">Beer Glass</option>
          <option value="Coffee mug">Coffee mug</option>
          <option value="Margarita/Coupette glass">
            Margarita/Coupette glass
          </option>
        </select>
        <select name="ingredient" id="">
          <option value="">All</option>
          <option value="Gin">Gin</option>
          <option value="Vodka">Vodka</option>
        </select>
        <select name="alcohol" id="">
          <option value="">All</option>
          <option value="Alcoholic">Alcoholic</option>
          <option value="Non alcoholic">Non alcoholic</option>
        </select>
        <br />
        <input
          name="textInput"
          type="text"
          placeholder="search for a cocktail"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
