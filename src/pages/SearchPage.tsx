import { SearchForm } from "../components/SearchForm";
import { SearchDisplay } from "../components/SearchDisplay";
import { CachedSearchesProvider } from "../context/CachedSearchesContext";

export function SearchPage() {
  return (
    <>
      <h1 className="searchHeader">Search cocktail</h1>
      <CachedSearchesProvider>
        <SearchForm />
        <SearchDisplay />
      </CachedSearchesProvider>
    </>
  );
}

