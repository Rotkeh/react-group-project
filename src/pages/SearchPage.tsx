import { SearchForm, SearchDisplay } from "../components";

export function SearchPage() {
  return (
    <>
      <h1 className="searchHeader">Search cocktail</h1>
      <SearchForm />
      <SearchDisplay />
    </>
  );
}
