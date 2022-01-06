import { NavLink } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  return (
    <header className="header">
      <div class="header__logo">
        <a href="/countries">
          <img src="/world.png" alt="logo" />
        </a>
      </div>
      <div class="header__nav">
        <button>
          {" "}
          <a href="/countries">Home</a>
          {/* <NavLink exact to="/countries">
            Home
          </NavLink> */}
        </button>
        <span></span>
        <button>
          {/* <NavLink exact to="/activity"> */}
          <a href="/activity">Crear actividades</a>

          {/* </NavLink> */}
        </button>
      </div>
      {/* <div></div>
      <nav>
        <ul className="list">
          <li></li>
          <li className="list-item">
            <NavLink exact to="/countries">
              Home
            </NavLink>
            <NavLink exact to="/activity">
              Crear actividades
            </NavLink>
          </li>
        </ul>
      </nav> */}
    </header>
  );
}

export default Navbar;
