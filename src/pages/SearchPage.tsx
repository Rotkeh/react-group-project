import { SearchForm } from "../components/SearchForm";
import { SearchDisplay } from "../components/SearchDisplay";
import { CachedSearchesProvider } from "../context/CachedSearchesContext";

export function SearchPage() {
  return (
    <div>
      <CachedSearchesProvider>
        <h1>Search Page</h1>
        <SearchForm />
        <SearchDisplay />
      </CachedSearchesProvider>
    </div>
  );
}
