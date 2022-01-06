import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { connect, useDispatch } from "react-redux";

import {
  getAllCountries,
  orderByName,
  // getCountriesByOrder,
  // getCountriesByPopulation,
  // getCountriesByContinent,
  getActivity,
  getPopulation,
  // getCountryByName,
  // getPage,
} from "../actions/Actions";
import Card from "./Card";
import "./Countries.css";
import Navbar from "./Navbar";
function Countries(props) {
  // const [searchTerm, setSearchTerm] = useState("");
  // const debouncedSearchTerm = useDebounce(searchTerm, 500);
  let dispatch = useDispatch();
  let [page, setPage] = useState(1);
  const [orden, setOrden] = useState("");
  let [filtrosCliente, setFiltrosCliente] = useState({
    poblacion: "",
  });
  let [countriesPerPage, setCountriesPerPage] = useState(10);
  const indexOfLastCountry = page * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries =
    props.countries.rows &&
    props.countries.rows.slice(indexOfFirstCountry, indexOfLastCountry);

  let [filtros, setFiltros] = useState({
    nombre: "",
    continente: "",
    order: "asc",
    type: "",
    nombrePais: "",
    actividad: "",
    subregion: "",
  });

  useEffect(() => {
    props.getActivity();
    // let query = "page=" + page;
    let query = "";

    if (filtros.continente) {
      query = query + "&continente=" + filtros.continente;
    }

    if (filtros.type) {
      query = query + "&type=" + filtros.type;
    }
    if (filtros.order) {
      query = query + "&order=" + filtros.order;
    }

    if (filtros.actividad) {
      query = query + "&actividad=" + filtros.actividad;
    }

    if (filtros.nombrePais) {
      query = query + "&name=" + filtros.nombrePais;
    }
    props.getAllCountries(query);
  }, [filtros, page]);

  function handleOnClickNext() {
    if (page < props.countries.rows.length / 10) {
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
  // function handleOnChange(e) {
  // props.getCountryByName(e.target.value);
  function handleOnChange(e) {
    setFiltros({ ...filtros, nombrePais: e.target.value });
    setPage(1);
    // setSearchTerm(e.target.value);
  }

  // function handleOnChangePopulation(e) {
  //   e.preventDefault();
  //   setFiltrosCliente({ ...filtrosCliente, poblacion: e.target.value });
  //   // dispatch(getPopulation(e.target.value));
  // }
  function handleOnChangeOrder(e) {
    e.preventDefault();
    let [type, order] = e.target.value.split(" ");
    if (type === "nombre") dispatch(orderByName(order));
    // setFiltros({ ...filtros, type: "", order: order });
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
      {/* <h1>Countries App</h1> */}
      <div class="search-box">
        <button class="btn-search">
          <FaSearch />
          {/* <i class="fas FaSearch"></i> */}
        </button>
        <input
          type="search"
          onChange={handleOnChange}
          class="input-search"
          placeholder="Type to Search..."
        />
      </div>
      <div class="main__filters">
        {/* Filtro de práctica backend */}
        {/* <select class="outlined curved" onChange={handleOnChangeSubregion}>
          {props.countries.rows &&
            props.countries.rows((pais) => (
              <option value={pais.subregion}> {pais.subregion} </option>
            ))}
        </select> */}

        {/* Filtro de práctica frontend */}
        {/* <select class="outlined curved" onChange={handleOnChangePopulation}>
          <option value="mayor">Mayor a 40M</option>
          <option value="menor">Menor a 40M</option>
        </select> */}
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

          {props.activities.rows &&
            props.activities.rows.map((activity) => (
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
      </div>

      <div class="cards">
        {props.countries.count === 0 && (
          <p class="noHayPaises">
            {" "}
            No hay países con ese nombre o filtro seleccionado
          </p>
        )}

        {currentCountries &&
          currentCountries.map((country) => <Card {...country} />)}
        {/* {props.countries.rows &&
          props.countries.rows.map((country) => <Card {...country} />)} */}
      </div>

      {/* {page == 1 && props.countries.count > 10 && (
        <ul class="pagination">
          <li class="icon">
            <a onClick={handleOnClickNext}>
              Next<span class="fas fa-angle-right"></span>
            </a>
          </li>
        </ul>
      )} */}

      <ul class="pagination">
        {page > 1 && (
          <li class="icon">
            <a onClick={handleOnClickPrev}>
              <span class="fas fa-angle-left"></span>Anterior
            </a>
          </li>
        )}
        {page < props.countries.count / 10 && (
          <li class="icon">
            <a onClick={handleOnClickNext}>
              Próximo<span class="fas fa-angle-right"></span>
            </a>
          </li>
        )}
      </ul>

      {/* {page === props.countries.count / 10 && (
        <ul class="pagination">
          <li class="icon">
            <a onClick={handleOnClickPrev}>
              <span class="fas fa-angle-left"></span>Previous
            </a>
          </li>
        </ul>
      )} */}
      {/* <ul class="pagination">
        <li class="icon">
          <a onClick={handleOnClickPrev}>
            <span class="fas fa-angle-left"></span>Previous
          </a>
        </li>
        <li class="icon">
          <a onClick={handleOnClickNext}>
            Next<span class="fas fa-angle-right"></span>
          </a>
        </li>
      </ul> */}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    countries: state.countriesLoaded,
    activities: state.activities,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllCountries: (query) => dispatch(getAllCountries(query)),
    // getCountriesByOrder: (order) => dispatch(getCountriesByOrder(order)),
    // getCountriesByPopulation: (order) =>
    //   dispatch(getCountriesByPopulation(order)),
    // getCountriesByContinent: (continent) =>
    //   dispatch(getCountriesByContinent(continent)),
    getActivity: () => dispatch(getActivity()),
    // getCountryByName: (name) => dispatch(getCountryByName(name)),
    // getPage: (page) => dispatch(getPage(page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Countries);
