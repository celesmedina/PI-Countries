const initialState = {
  countriesLoaded: [],
  country: [],
  activities: [],
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countriesLoaded: action.payload,
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
