import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link
          to="/Futuriste"
          className="logo"
          aria-label="Aller à la page Futuriste"
        >
          <span className="logo-icon">
            <img
              src="/LogoDev-job2.jpg"
              alt="Logo"
              width="70px"
              height="70px"
            />
          </span>
          <span className="logo-text">
            <span className="logo-dev">Dev</span>
            <span className="logo-job">Job</span>
          </span>
        </Link>
      </div>

      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/" onClick={handleClick} className="navbar-link">
            Accueil
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            to="/Developpeurs"
            onClick={handleClick}
            className="navbar-link"
          >
            Développeurs
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/Recruteurs" onClick={handleClick} className="navbar-link">
            Recruteurs
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            to="/Actualites_dev"
            onClick={handleClick}
            className="navbar-link"
          >
            Actualités Dev
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/IA" onClick={handleClick} className="navbar-link">
            IA
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/Contact" onClick={handleClick} className="navbar-link">
            Contact
          </Link>
        </li>
      </ul>

      <div className="navbar-toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
export default NavBar;
