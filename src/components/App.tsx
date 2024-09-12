import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function App() {
  return (
    <>
      <Header/>
      <Outlet/>    
      <Footer/>
    </>
  );
}
