// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import weather from './weather'

const rootReducer = combineReducers({
  weather
})

export default rootReducer
