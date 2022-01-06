import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getCountryByID } from "../actions/Actions";
import "./Country.css";

function Country(props) {
  const { id } = useParams();
  useEffect(() => {
    props.getCountryByID(id);
  }, []);

  if (!props.country.nombre) return "loading...";

  return (
    <div class="card-country">
      <div class="country-name">
        <p> {props.country.nombre}</p>
      </div>
      <div>
        <img class="card-img" src={props.country.imagen} alt="" />
      </div>
      <div class="country-continent">
        <p>
          {" "}
          Capital: <span class="font-light">{props.country.capital}</span>
        </p>
      </div>
      <div class="codigo-pais">
        <p>
          {" "}
          Codigo de país: <span class="font-light"> {props.country.id}</span>
        </p>
      </div>
      <div class="country-subregion">
        <p>
          {" "}
          Subregión:<span class="font-light"> {props.country.subregion}</span>
        </p>
      </div>
      <div class="country-area">
        <p>
          {" "}
          Área:<span class="font-light"> {props.country.area} km </span>
        </p>
      </div>
      <div class="country-poblacion">
        <p>
          {" "}
          Población:
          <span class="font-light">
            {" "}
            {props.country.poblacion} personas
          </span>{" "}
        </p>
      </div>
      <div class="country-actividadesturisticas">
        <p> Actividades Turísticas</p>
        {props.country.actividadesTuristicas &&
        props.country.actividadesTuristicas.length ? (
          props.country.actividadesTuristicas.map((activity) => {
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
      {/* - [ ] Código de país de 3 letras (id) - [ ] Capital - [ ] Subregión - [ ]
      Área (Mostrarla en km2 o millones de km2) - [ ] Población - [ ]
      Actividades turísticas con toda su información asociada */}
      <button class="buttonCountry">
        <NavLink to="/countries" className="atras">
          Atrás
        </NavLink>
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    country: state.country,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCountryByID: (id) => dispatch(getCountryByID(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Country);

//   - [ ] Los campos mostrados en la ruta principal para cada país (imagen de la bandera, nombre, código de país de 3 letras y continente)
// - [ ] Código de país de 3 letras (id)
// - [ ] Capital
// - [ ] Subregión
// - [ ] Área (Mostrarla en km2 o millones de km2)
// - [ ] Población
