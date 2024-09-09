import { Outlet } from "react-router-dom";
import "../css/App.css";
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
