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
    <div class="container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(createActivity(form));
        }}
      >
        <div class="row">
          <div class="col-25">
            <label for="fname">Nombre</label>
          </div>
          <div class="col-75">
            <input
              required
              type="text"
              id="fname"
              name="nombre"
              placeholder="Tu nombre"
              onChange={handleChange}
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="lname">Duración (en horas)</label>
          </div>
          <div class="col-75">
            <input
              required
              min="0"
              type="number"
              id="lname"
              name="duracion"
              placeholder="Duración de la actividad"
              onChange={handleChange}
            />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="dificultad">Dificultad</label>
          </div>
          <div class="col-75">
            <select id="dificultad" name="dificultad" onChange={handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="temporada">Temporada</label>
          </div>
          <div class="col-75">
            <select id="temporada" name="temporada" onChange={handleChange}>
              <option value="Verano">Verano</option>
              <option value="Otoño">Otoño</option>
              <option value="Primavera">Primavera</option>
              <option value="Invierno">Invierno</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="countries">Países de la actividad</label>
          </div>
          <div class="col-75">
            <select
              required
              name="countries"
              id="countries"
              onChange={handleChangeCountries}
            >
              {props.countries.rows &&
                props.countries.rows.map((country) => (
                  <option value={country.id}>{country.nombre}</option>
                ))}
            </select>
          </div>
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
