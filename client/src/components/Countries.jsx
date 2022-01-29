import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { connect, useDispatch, useSelector } from "react-redux";

import { getAllCountries, getActivity } from "../actions/Actions";
import Card from "./Card";
import "./Countries.css";
import Navbar from "./Navbar";
function Countries(props) {
  const countries = useSelector((state) => state.countriesLoaded);
  const activities = useSelector((state) => state.activities);
  let dispatch = useDispatch();
  let [page, setPage] = useState(1);
  // let [filtroCliente, setFiltroCliente] = useState({
  //   poblacion: "",
  // });
  let [countriesPerPage, setCountriesPerPage] = useState(10);

  const indexOfLastCountry = page * countriesPerPage - 1;
  const indexOfFirstCountry =
    page === 1 ? 0 : indexOfLastCountry - countriesPerPage;

  let [filtros, setFiltros] = useState({
    nombre: "",
    continente: "",
    order: "asc",
    type: "",
    nombrePais: "",
    actividad: "",
    subregion: "",
  });

  let filteredCountries = countries.rows;
  // if (filtroCliente) {
  //   filteredCountries =
  //     filteredCountries &&
  //     (filtroCliente.poblacion === "menor"
  //       ? filteredCountries.filter((pais) => pais.poblacion < 100000)
  //       : filteredCountries.filter((pais) => pais.poblacion > 100000));
  // }
  if (filtros.type === "nombre") {
    filteredCountries =
      filtros.order === "asc"
        ? filteredCountries.sort(function (a, b) {
            if (a.nombre > b.nombre) {
              return 1;
            }
            if (b.nombre > a.nombre) {
              return -1;
            }
            return 0;
          })
        : filteredCountries.sort(function (a, b) {
            if (a.nombre > b.nombre) {
              return -1;
            }
            if (b.nombre > a.nombre) {
              return 1;
            }
          });
  }

  const currentCountries =
    filteredCountries &&
    filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);
  useEffect(() => {
    dispatch(getActivity());
    let query = "";

    if (filtros.continente) {
      query = query + "&continente=" + filtros.continente;
    }

    if (filtros.type && filtros.type != "nombre") {
      query = query + "&type=" + filtros.type;
    }
    if (filtros.order && filtros.type != "nombre") {
      query = query + "&order=" + filtros.order;
    }

    if (filtros.actividad) {
      query = query + "&actividad=" + filtros.actividad;
    }

    if (filtros.nombrePais) {
      query = query + "&name=" + filtros.nombrePais;
    }
    dispatch(getAllCountries(query));
  }, [filtros, page]);

  function handleOnClickNext() {
    if (page < countries.rows.length / 10) {
      page++;
      setPage(page);
    }
  }

  function handleOnClickPrev() {
    if (page != 1) {
      page--;
      setPage(page);
    }
  }

  // function handlePoblacion() {
  //   setFiltroCliente({ ...filtroCliente, poblacion: "menor" });
  // }

  function handleOnChange(e) {
    setFiltros({ ...filtros, nombrePais: e.target.value });
    setPage(1);
  }

  function handleOnChangeOrder(e) {
    e.preventDefault();
    let [type, order] = e.target.value.split(" ");
    if (type === "nombre") {
      setFiltros({ ...filtros, type: "nombre", order: order });
    }
    if (type === "poblacion")
      setFiltros({ ...filtros, type: "poblacion", order: order });
  }

  function handleOnChangeContinent(e) {
    setFiltros({ ...filtros, continente: e.target.value });
  }

  function handleOnChangeActivity(e) {
    setFiltros({ ...filtros, actividad: e.target.value });
  }

  return (
    <div>
      <div class="search-box">
        <button class="btn-search">
          <FaSearch />
        </button>
        <input
          type="search"
          onChange={handleOnChange}
          class="input-search"
          placeholder="Type to Search..."
        />
      </div>
      <div class="main__filters">
        <select class="outlined curved" onChange={handleOnChangeContinent}>
          <option value="">Elegí Continente</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europa</option>
          <option value="Africa">Africa</option>
          <option value="Oceania">Oceania</option>
          <option value="Antarctic">Antartida</option>
        </select>
        <select class="outlined curved" onChange={handleOnChangeActivity}>
          <option value="">Elegí Actividad</option>

          {activities.rows &&
            activities.rows.map((activity) => (
              <option value={activity.id}> {activity.nombre} </option>
            ))}
        </select>
        <select class="outlined curved" onChange={handleOnChangeOrder}>
          <option value=""> Elegí Orden</option>
          <option value="nombre asc"> Alfabeticamente Ascendiente</option>
          <option value="nombre desc">Alfabeticamente Descendiente</option>
          <option value="poblacion asc">Población ascendente</option>
          <option value="poblacion desc">Población descendiente</option>
        </select>
        {/* <button type="button" onClick={handlePoblacion}>
          Ver países con menos de 100k habitantes
        </button> */}
      </div>

      <div class="cards">
        {countries.count === 0 && (
          <p class="noHayPaises">
            {" "}
            No hay países con ese nombre o filtro seleccionado
          </p>
        )}

        {currentCountries &&
          currentCountries.map((country) => <Card {...country} />)}
      </div>

      <ul class="pagination">
        {page > 1 && (
          <li class="icon">
            <a onClick={handleOnClickPrev}>
              <span class="fas fa-angle-left"></span>Anterior
            </a>
          </li>
        )}
        {page < countries.count / 10 && (
          <li class="icon">
            <a onClick={handleOnClickNext}>
              Próximo<span class="fas fa-angle-right"></span>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

// function mapStateToProps(state) {
//   return {
//     countries: state.countriesLoaded,
//     activities: state.activities,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     getAllCountries: (query) => dispatch(getAllCountries(query)),
//     // getCountriesByOrder: (order) => dispatch(getCountriesByOrder(order)),
//     // getCountriesByPopulation: (order) =>
//     //   dispatch(getCountriesByPopulation(order)),
//     // getCountriesByContinent: (continent) =>
//     //   dispatch(getCountriesByContinent(continent)),
//     getActivity: () => dispatch(getActivity()),
//     // getCountryByName: (name) => dispatch(getCountryByName(name)),
//     // getPage: (page) => dispatch(getPage(page)),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Countries);
export default Countries;
