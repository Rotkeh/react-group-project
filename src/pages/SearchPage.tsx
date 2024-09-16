import { SearchForm } from "../components/SearchForm";
import { SearchDisplay } from "../components/SearchDisplay";

export function SearchPage() {
  return (
    <>
      <h1 className="searchHeader">Search cocktail</h1>
      <SearchForm />
      <SearchDisplay />
    </>
  );
}
