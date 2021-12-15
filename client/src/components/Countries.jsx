import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { connect } from "react-redux";
import {
  getAllCountries,
  // getCountriesByOrder,
  // getCountriesByPopulation,
  // getCountriesByContinent,
  getActivity,
  // getCountryByName,
  // getPage,
} from "../actions/Actions";
import Card from "./Card";
import "./Countries.css";

function Countries(props) {
  // const [searchTerm, setSearchTerm] = useState("");
  // const debouncedSearchTerm = useDebounce(searchTerm, 500);
  let [page, setPage] = useState(1);
  let [filtros, setFiltros] = useState({
    nombre: "",
    continente: "",
    order: "asc",
    type: "",
    nombrePais: "",
    actividad: "",
  });

  useEffect(() => {
    props.getActivity();
    let query = "page=" + page;

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
      // props.getCountryByName(filtros.nombrePais);
    }
    props.getAllCountries(query);
  }, [filtros, page]);

  function handleOnClickNext() {
    if (page < props.countries.count / 10) {
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

  function handleOnChangeOrder(e) {
    let [type, order] = e.target.value.split(" ");

    if (type === "nombre") setFiltros({ ...filtros, type: "", order: order });
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
      <h1>Countries App</h1>
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
      <select onChange={handleOnChangeContinent}>
        <option value="">-</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europa</option>
        <option value="Africa">Africa</option>
        <option value="Oceania">Oceania</option>
        <option value="Antartica">Antartida</option>
      </select>
      <select onChange={handleOnChangeOrder}>
        <option value="nombre asc"> Alfabeticamente Ascendiente</option>
        <option value="nombre desc">Alfabeticamente Descendiente</option>
        <option value="poblacion asc">Población ascendente</option>
        <option value="poblacion desc">Población descendiente</option>
      </select>
      <select onChange={handleOnChangeActivity}>
        <option value="">-</option>

        {props.activities.rows &&
          props.activities.rows.map((activity) => (
            <option value={activity.id}> {activity.nombre} </option>
          ))}
      </select>
      <div class="cards">
        {props.countries.count === 0 && <p> No hay países con ese nombre</p>}
        {props.countries.rows &&
          props.countries.rows.map((country) => <Card {...country} />)}
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
              <span class="fas fa-angle-left"></span>Previous
            </a>
          </li>
        )}
        {page < props.countries.count / 10 && (
          <li class="icon">
            <a onClick={handleOnClickNext}>
              Next<span class="fas fa-angle-right"></span>
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
