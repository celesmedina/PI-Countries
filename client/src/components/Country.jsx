import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getCountryByID } from "../actions/Actions";
function Country(props) {
  const { id } = useParams();
  useEffect(() => {
    props.getCountryByID(id);
  }, []);

  if (!props.country) return "loading...";

  return (
    <div class="card">
      <div class="country-name">
        <p> {props.country.nombre}</p>
      </div>
      <div>
        <img class="card-img" src={props.country.imagen} alt="" />
      </div>
      <div class="country-continent">
        <p> Capital: {props.country.capital}</p>
      </div>
      <div class="codigo-pais">
        <p> Codigo de país: {props.country.id}</p>
      </div>
      <div class="country-subregion">
        <p> Subregión: {props.country.subregion}</p>
      </div>
      <div class="country-area">
        <p> Área: {props.country.area}</p>
      </div>
      <div class="country-poblacion">
        <p> Población: {props.country.poblacion}</p>
      </div>
      <div class="country-actividadesturisticas">
        <p> Actividades Turísticas</p>
        {props.country.actividadesTuristicas ? (
          props.country.actividadesTuristicas.map((activity) => {
            return (
              <div>
                <p> Nombre: {activity.nombre}</p>
                <p> Dificultad: {activity.dificultad}</p>
                <p> Duración: {activity.dificultad}</p>
                <p> Temporada: {activity.dificultad}</p>
              </div>
            );
          })
        ) : (
          <p>"This country doesn't have activities yet"</p>
        )}
      </div>
      {/* - [ ] Código de país de 3 letras (id) - [ ] Capital - [ ] Subregión - [ ]
      Área (Mostrarla en km2 o millones de km2) - [ ] Población - [ ]
      Actividades turísticas con toda su información asociada */}
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
