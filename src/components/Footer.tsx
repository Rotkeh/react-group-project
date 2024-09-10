import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="footer">
      <h1>Footer</h1>
      <div className="footer-links">
        <Link to={"/"}>Home</Link>
        <Link to={"search"}>Search</Link>
      </div>
    </footer>
  );
}
