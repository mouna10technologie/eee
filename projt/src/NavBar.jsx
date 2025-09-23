import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="logo">
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
        </div>
      </div>

      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Accueil
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/Developpeurs" className="navbar-link">
            Développeurs
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/Recruteurs" className="navbar-link">
            Recruteurs
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/Actualites_dev" className="navbar-link">
            Actualités Dev
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/IA" className="navbar-link">
            IA
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/Contact" className="navbar-link">
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
