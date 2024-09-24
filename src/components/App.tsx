import { Outlet } from "react-router-dom";
import { Header, Footer } from "../components";
import { FavoriteProvider, CachedSearchesProvider } from "../context";

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
