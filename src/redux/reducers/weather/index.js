// **  Initial State
const initialState = {
    weatherData: [],
    selectedCity: null,
    status: null,
    error: null
  }
  
  const weather = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_CITY_INFO':
        return {
          ...state,
          selectedCity: action.data
        }
      case 'WEATHER_ERROR':
        return {
          ...state,
          error: action.error
        }
      case 'WEATHER_STATUS':
        return {
          ...state,
          status: action.status
        }
      default:
        return state
    }
  }
  
  export default weather
  