import { SearchForm } from "../components/SearchForm";
import { SearchDisplay } from "../components/SearchDisplay";
import { CachedSearchesProvider } from "../context/CachedSearchesContext";

export function SearchPage() {
  return (
    <div>
      <h1 className="searchHeader">Search Page</h1>
      <CachedSearchesProvider>
        <SearchForm />
        <SearchDisplay />
      </CachedSearchesProvider>
    </div>
  );
}

// Användare ska kunna söka efter en cocktail med hjälp av dess namn.
// Resultaten ska visas i en lista med max 10 resultat, och listan ska vara paginerad om det finns fler än 10 resultat.
// Vid klick på en cocktail i listan ska användaren navigeras till Cocktail Info Page.
