import { NavLink } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  return (
    <header className="header">
      <div class="header__logo">
        <img src="world.png" alt="logo" />
      </div>
      <div class="header__nav">
        <button>
          {" "}
          Home
          {/* <NavLink exact to="/countries">
            Home
          </NavLink> */}
        </button>
        <span></span>
        <button>
          {/* <NavLink exact to="/activity"> */}
          Crear actividades
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
