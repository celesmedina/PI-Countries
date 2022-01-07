import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  return (
    <header className="header">
      <div class="header__logo">
        <Link to="/countries">
          <img src="/world.png" alt="logo" />
        </Link>
      </div>
      <div class="header__nav">
        <button>
          {" "}
          <Link to="/countries">Home</Link>
        </button>
        <span></span>
        <button>
          <Link to="/activity">Crear actividades</Link>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
