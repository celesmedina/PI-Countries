export function getAllCountries(query) {
  return function (dispatch) {
    return fetch("http://localhost:3001/countries?" + query)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_COUNTRIES", payload: json });
      });
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function getPopulation(payload) {
  return {
    type: "GET_POPULATION",
    payload,
  };
}

export function cleanCountry() {
  return {
    type: "CLEAN_COUNTRY",
  };
}

export function getCountryByID(id) {
  return function (dispatch) {
    return fetch("http://localhost:3001/countries/" + id)
      .then((response) => response.json())
      .then((json) => {
        setTimeout(() => {
          dispatch({ type: "GET_COUNTRY_ID", payload: json });
        }, 3000);
      });
  };
}
// export function getCountriesByOrder(order) {
//   return function (dispatch) {
//     return fetch("http://localhost:3001/countries?order=" + order)
//       .then((response) => response.json())
//       .then((json) => {
//         dispatch({ type: "GET_COUNTRIES_ORDER", payload: json });
//       });
//   };
// }
// export function getPage(page) {
//   return function (dispatch) {
//     return fetch("http://localhost:3001/countries?page=" + page)
//       .then((response) => response.json())
//       .then((json) => {
//         dispatch({ type: "GET_PAGE", payload: json });
//       });
//   };
// }
// export function getCountriesByPopulation(order) {
//   return function (dispatch) {
//     return fetch(
//       "http://localhost:3001/countries?order=" + order + "&type=poblacion"
//     )
//       .then((response) => response.json())
//       .then((json) => {
//         dispatch({ type: "GET_COUNTRIES_POPULATION", payload: json });
//       });
//   };
// }
// export function getCountriesByContinent(continente) {
//   return function (dispatch) {
//     return fetch("http://localhost:3001/countries?continente=" + continente)
//       .then((response) => response.json())
//       .then((json) => {
//         dispatch({ type: "GET_COUNTRIES_CONTINENT", payload: json });
//       });
//   };
// }

// export function getCountryByName(name) {
//   return function (dispatch) {
//     return fetch("http://localhost:3001/countries?name=" + name)
//       .then((response) => response.json())
//       .then((json) => {
//         dispatch({ type: "GET_COUNTRIES_NAME", payload: json });
//       });
//   };
// }

export function createActivity(payload) {
  return function () {
    return fetch("http://localhost:3001/activity", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };
}

export function getActivity() {
  return function (dispatch) {
    return fetch("http://localhost:3001/activity")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_ACTIVITY", payload: json });
      });
  };
}
