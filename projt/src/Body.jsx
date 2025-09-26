import "./Body.css";

function GlowingText({ text, className }) {
  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="glowing-char"
          style={{ animationDelay: `${index * 0.03}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

function Body() {
  return (
    <>
      <div className="text-before-image">
        <h1 className="main-text-yellow">
          Recruter un développeur, c'est choisir un bâtisseur de solutions, pas seulement un codeur.
        </h1>
        <h2 className="quote-text-yellow">
          « Le talent, c'est avoir envie de faire quelque chose. » — Jacques Brel
        </h2>
      </div>
    </>
  );
}
export default Body;
