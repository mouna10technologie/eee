import Cartes from "./Cartes";
import "./Careaux.css";
function Careaux({ carrer }) {
  return (
    <>
      <div className="div_globale">
        {carrer.map((value,index2) => (
          <Cartes
          key={index2}
            image={value.image}
            titre={value.titre}
            description={value.description}
          />
        ))}
      </div>
      
    </>
  );
}
export default Careaux;
