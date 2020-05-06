import { combineReducers } from 'redux'
import routes from './routes';
import profiles from './profiles'

const rootReducer = combineReducers({
  routes, 
  profiles, 
})

export default rootReducer;
