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
  const mainText = "Recruter un développeur, c'est choisir un bâtisseur de solutions, pas seulement un codeur.";
  const quoteText = "« Le talent, c'est avoir envie de faire quelque chose. » — Jacques Brel";
  
  return (
    <>
      <div className="div_ecriture">
        <h1 className="h1_body">
          <GlowingText text={mainText} className="main-glowing-text" />
        </h1>
        <h2 className="h2_body">
          <GlowingText text={quoteText} className="quote-glowing-text" />
        </h2>
      </div>
    </>
  );
}
export default Body;
