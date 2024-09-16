import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FavoriteProvider } from "../context/FavoriteContext";

export function App() {
  return (
    <>
      <Header/>
      <FavoriteProvider>
        <Outlet/>    
      </FavoriteProvider>
      <Footer/>
    </>
  );
}
