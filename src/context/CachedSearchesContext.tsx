import { createContext, ReactNode, useState } from "react";
import { CachedSearch, ICachedSearchesContext } from "../interface";

export const CachedSearchesContext = createContext<ICachedSearchesContext>(
  {} as ICachedSearchesContext
);

interface ICachedSearchesProviderProps {
  children: ReactNode;
}

export function CachedSearchesProvider({
  children,
}: ICachedSearchesProviderProps) {
  const [cachedSearches, setCachedSearches] = useState<CachedSearch[]>([]);

  const addCachedSearches = (CachedSearch: CachedSearch) => {
    setCachedSearches((prev) => [...prev, CachedSearch]);
  };

  return (
    <CachedSearchesContext.Provider
      value={{ cachedSearches, addCachedSearches }}
    >
      {children}
    </CachedSearchesContext.Provider>
  );
}
