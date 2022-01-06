const initialState = {
  countriesLoaded: [],
  country: [],
  activities: [],
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PAGE":
      return {
        ...state,
        countriesLoaded: action.payload,
      };
    case "GET_COUNTRIES":
      return {
        ...state,
        countriesLoaded: action.payload,
      };
    case "GET_POPULATION":
      let filteredArray =
        action.payload === "mayor"
          ? state.countriesLoaded.rows.filter(
              (country) => country.poblacion > 40000000
            )
          : state.countriesLoaded.rows.filter(
              (country) => country.poblacion < 40000000
            );

      return {
        ...state,
        countriesLoaded: {
          ...state.countriesLoaded,
          rows: filteredArray,
        },
      };
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.countriesLoaded.rows.sort(function (a, b) {
              if (a.nombre > b.nombre) {
                return 1;
              }
              if (b.nombre > a.nombre) {
                return -1;
              }
              return 0;
            })
          : state.countriesLoaded.rows.sort(function (a, b) {
              if (a.nombre > b.nombre) {
                return -1;
              }
              if (b.nombre > a.nombre) {
                return 1;
              }
            });
      return {
        ...state,
        countriesLoaded: {
          ...state.countriesLoaded,
          rows: sortedArr,
        },
      };
    case "CLEAN_COUNTRY":
      return {
        ...state,
        country: [],
      };
    case "GET_COUNTRY_ID":
      return {
        ...state,
        country: action.payload,
      };
    case "GET_COUNTRIES_ORDER":
      return {
        ...state,
        countriesLoaded: action.payload,
      };
    case "GET_COUNTRIES_POPULATION":
      return {
        ...state,
        countriesLoaded: action.payload,
      };
    case "GET_COUNTRIES_CONTINENT":
      return {
        ...state,
        countriesLoaded: action.payload,
      };
    case "GET_COUNTRIES_NAME":
      return {
        ...state,
        countriesLoaded: action.payload,
      };
    case "GET_ACTIVITY":
      return {
        ...state,
        activities: action.payload,
      };
    default:
      return state;
  }
}
export default rootReducer;
