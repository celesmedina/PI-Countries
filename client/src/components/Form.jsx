import { connect } from "react-redux";
import { getAllCountries, createActivity } from "../actions/Actions";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./Form.css";
function Forms(props) {
  let query = "";
  useEffect(() => {
    props.getAllCountries(query);
  }, []);
  const [form, setForm] = useState({
    nombre: "",
    duracion: "",
    dificultad: "1",
    temporada: "Verano",
    paises: [],
  });
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleChangeCountries = (e) => {
    // const paises = Array.from(
    //   e.target.selectedOptions,
    //   (option) => option.value
    // );
    // form.paises.push(e.target.value);
    setForm({ ...form, paises: [...form.paises, e.target.value] });
  };

  const dispatch = useDispatch();

  return (
    <div class="card-form">
      <div class="card-image">
        <h2 class="card-heading">Creá actividades por país</h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(createActivity(form));
        }}
        class="card-form"
      >
        <div class="input">
          <label class="input-label">Nombre de la actividad</label>
          <input
            required
            type="text"
            id="fname"
            name="nombre"
            class="input-field"
            onChange={handleChange}
          />
        </div>
        <div class="input">
          <label class="input-label">Duración (en horas)</label>

          <input
            required
            min="0"
            type="number"
            id="lname"
            name="duracion"
            class="input-field"
            onChange={handleChange}
          />
        </div>
        <div class="input">
          <label class="input-label">Dificultad</label>

          <select
            id="dificultad"
            name="dificultad"
            class="input-field"
            onChange={handleChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div class="input">
          <label class="input-label">Temporada</label>

          <select
            id="temporada"
            class="input-field"
            name="temporada"
            onChange={handleChange}
          >
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Primavera">Primavera</option>
            <option value="Invierno">Invierno</option>
          </select>
        </div>
        <div class="input">
          <label class="input-label">Países de la actividad</label>
          <select
            required
            name="countries"
            id="countries"
            class="input-field"
            onChange={handleChangeCountries}
          >
            {props.countries.rows &&
              props.countries.rows.map((country) => (
                <option value={country.id}>{country.nombre}</option>
              ))}
          </select>
        </div>
        <div class="row">
          <div class="col-25">
            {form.paises.length > 0 && (
              <label for="countries">Países seleccionados</label>
            )}
          </div>
          <div class="col-75">
            {form.paises.map((pais) => (
              <p>{pais}</p>
            ))}
          </div>
        </div>
        <div class="row">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    countries: state.countriesLoaded,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllCountries: (query) => dispatch(getAllCountries(query)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
