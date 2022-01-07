export function getAllCountries(query) {
  return async function (dispatch) {
    try {
      const response = await fetch("http://localhost:3001/countries?" + query);
      const json = await response.json();
      dispatch({ type: "GET_COUNTRIES", payload: json });
    } catch (e) {
      console.log(e);
    }

    // .then((response) => response.json())
    // .then((json) => {
    //   dispatch({ type: "GET_COUNTRIES", payload: json });
    // })
    // .catch((error) => console.log(error));
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
        }, 1000);
      })
      .catch((error) => console.log(error));
  };
}

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
