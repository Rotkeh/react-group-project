import cocktail from "../assets/cocktail.png";

export function NotFound() {
  return (
    <main className="not-found">
      <h1>Error 404</h1>
      <h2>Page not found unfortunately</h2>
      <figure>
        <img src={cocktail} />
      </figure>
      <p>Why not take the moment to sit back and enjoy your favorite cocktail?</p>
    </main>
  );
}
