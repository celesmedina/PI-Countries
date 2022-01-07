import { connect } from "react-redux";
import { getAllCountries, createActivity } from "../actions/Actions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Form.css";
function Forms(props) {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countriesLoaded);
  function validate() {
    if (form.nombre === "" || form.duracion === "" || form.paises.length === 0)
      return true;
    return false;
  }
  function getCountryName(country) {
    let selectedCountry = countries.rows.find((pais) => pais.id === country);
    return selectedCountry.nombre;
  }
  let query = "";
  useEffect(() => {
    dispatch(getAllCountries(query));
  }, []);
  const [form, setForm] = useState({
    nombre: "",
    duracion: "",
    dificultad: "1",
    temporada: "Verano",
    paises: [],
  });

  const handleOnClick = (event) => {
    setForm({
      ...form,
      paises: form.paises.filter((pais) => pais !== event.target.value),
    });
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleChangeCountries = (e) => {
    setForm({
      ...form,
      paises: [...new Set([...form.paises, e.target.value])],
    });
  };

  return (
    <div class="card-form">
      <div class="card-image">
        <h2 class="card-heading">Creá actividades por país</h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (validate()) {
          } else {
            dispatch(createActivity(form));
            alert("Actividad creada");
          }
        }}
        class="card-form"
      >
        <div class="input">
          <label class="input-label">Nombre de la actividad</label>
          {form.nombre === "" && <p>Debe completar el nombre</p>}
          <input
            type="text"
            id="fname"
            name="nombre"
            class="input-field"
            value={form.nombre}
            onChange={handleChange}
          />
        </div>
        <div class="input">
          <label class="input-label">Duración (en horas)</label>
          {form.duracion === "" && <p>Debe completar duracion</p>}

          <input
            min="0"
            type="number"
            id="lname"
            name="duracion"
            class="input-field"
            value={form.duracion}
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
            value={form.temporada}
            onChange={handleChange}
          >
            <option value="Verano"> Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Primavera">Primavera</option>
            <option value="Invierno">Invierno</option>
          </select>
        </div>
        <div class="input">
          <label class="input-label">Países de la actividad</label>
          {form.paises.length === 0 && (
            <p>Debe seleccionar un pais para crear la actividad</p>
          )}

          <select
            name="countries"
            id="countries"
            class="input-field"
            onChange={handleChangeCountries}
          >
            <option value=""> - </option>
            {countries.rows &&
              countries.rows.map((country) => (
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
              <p>
                {getCountryName(pais)}
                <button type="button" onClick={handleOnClick} value={pais}>
                  x
                </button>
              </p>
            ))}
          </div>
        </div>
        <div class="row">
          <input
            type="submit"
            class="buttonActividad"
            value="Crear actividad"
          />
        </div>
      </form>
    </div>
  );
}
// function mapStateToProps(state) {
//   return {
//     countries: state.countriesLoaded,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     getAllCountries: (query) => dispatch(getAllCountries(query)),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Forms);
export default Forms;
