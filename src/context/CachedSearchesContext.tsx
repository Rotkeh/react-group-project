import { createContext, ReactNode, useState } from "react";
import { CachedSearch, ICachedSearchesContext } from "../interface";

//Kontexten
export const CachedSearchesContext = createContext<ICachedSearchesContext>(
  {} as ICachedSearchesContext
); //Tomt objekt från start, det faktiska värdet kommer sättas i Provider-komponenten nedan

interface ICachedSearchesProviderProps {
  children: ReactNode;
}

// Huvudkomponenten som delar data
export function CachedSearchesProvider({
  children,
}: ICachedSearchesProviderProps) {
  const [cachedSearches, setCachedSearches] = useState<CachedSearch[]>([]); //Den lista som ska delas med andra komponenter i applikationen.

  //Funktion för att lägga till sökningar till cachen
  const addCachedSearches = (CachedSearch: CachedSearch) => {
    setCachedSearches((prev) => [...prev, CachedSearch]); // spread-operatorn (...prev) för att bevara de tidigare sökningarna och lägga till den nya sökningen i listan.
  };

  return (
    <CachedSearchesContext.Provider value={{ cachedSearches, addCachedSearches }}>
      {children}
    </CachedSearchesContext.Provider>
  );
}
