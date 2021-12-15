import { NavLink } from "react-router-dom";
// import "./Navbar.css";
function Navbar() {
  return (
    <header className="navbar">
      <div></div>
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
      </nav>
    </header>
  );
}

export default Navbar;
