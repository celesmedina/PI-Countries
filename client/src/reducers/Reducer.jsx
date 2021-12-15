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
