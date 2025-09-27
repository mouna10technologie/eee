import "./Cartes.css";
function Cartes({ image, titre, description }) {
  return (
    <>
      <div className="div_cartes">
        <img src={image} alt="image" width="150px" height="150" />
        <h3 >{titre}</h3>
        <p>{description}</p>
      </div>
    </>
  );
}
export default Cartes;
