import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="footer">
      <p>Spicy Fighters Inc.</p>
      <nav className="footer-links">
        <Link to={"/"}>Home</Link>
        <Link to={"search"}>Search</Link>
        <Link className="header-link hover-effect" to={"about"}>
          About
        </Link>
      </nav>
    </footer>
  );
}
