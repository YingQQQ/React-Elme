import {
  combineReducers
} from 'redux-immutable';
import {
  routerReducer
} from 'react-router-redux';
import {
  guessCity,
  hotCities,
  groupCities,
  currentCity,
  searchPlace,
  msiteAddress,
  foodTypes
} from './getDate';

export default combineReducers({
  routerReducer,
  guessCity,
  hotCities,
  groupCities,
  currentCity,
  searchPlace,
  msiteAddress,
  foodTypes,
});
