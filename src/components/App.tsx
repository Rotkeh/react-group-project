import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FavoriteProvider } from "../context/FavoriteContext";
import { CachedSearchesProvider } from "../context/CachedSearchesContext";

export function App() {
  return (
    <>
      <Header />
      <FavoriteProvider>
        <CachedSearchesProvider>
          <Outlet />
        </CachedSearchesProvider>
      </FavoriteProvider>
      <Footer />
    </>
  );
}
