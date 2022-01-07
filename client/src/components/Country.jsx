import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getCountryByID } from "../actions/Actions";
import "./Country.css";

function Country(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);

  useEffect(() => {
    dispatch(getCountryByID(id));
  }, []);

  if (!country.nombre) return "loading...";

  return (
    <div class="card-country">
      <div class="country-name">
        <p> {country.nombre}</p>
      </div>
      <div>
        <img class="card-img" src={country.imagen} alt="" />
      </div>
      <div class="country-continent">
        <p>
          {" "}
          Capital: <span class="font-light">{country.capital}</span>
        </p>
      </div>
      <div class="codigo-pais">
        <p>
          {" "}
          Codigo de país: <span class="font-light"> {country.id}</span>
        </p>
      </div>
      <div class="country-subregion">
        <p>
          {" "}
          Subregión:<span class="font-light"> {country.subregion}</span>
        </p>
      </div>
      <div class="country-area">
        <p>
          {" "}
          Área:<span class="font-light"> {country.area} km </span>
        </p>
      </div>
      <div class="country-poblacion">
        <p>
          {" "}
          Población:
          <span class="font-light"> {country.poblacion} personas</span>{" "}
        </p>
      </div>
      <div class="country-actividadesturisticas">
        <p> Actividades Turísticas</p>
        {country.actividadesTuristicas &&
        country.actividadesTuristicas.length ? (
          country.actividadesTuristicas.map((activity) => {
            return (
              <div>
                <p> Nombre: {activity.nombre}</p>
                <p> Dificultad: {activity.dificultad}</p>
                <p> Duración: {activity.dificultad} hs</p>
                <p> Temporada: {activity.temporada}</p>
              </div>
            );
          })
        ) : (
          <span class="font-light">
            {" "}
            Este país no tiene actividades creadas
          </span>
        )}
      </div>

      <button class="buttonCountry">
        <NavLink to="/countries" className="atras">
          Atrás
        </NavLink>
      </button>
    </div>
  );
}

// function mapStateToProps(state) {
//   return {
//     country: state.country,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     getCountryByID: (id) => dispatch(getCountryByID(id)),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Country);
export default Country;
