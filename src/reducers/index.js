import {
  combineReducers
} from 'redux-immutable';

import rootRouter from './immutableRootReducer ';
import {
  guessCity,
  hotCities,
  groupCities,
  currentCity,
  searchPlace,
  msiteAddress,
  foodTypes,
  shopList,
} from './getDate';


export default combineReducers({
  rootRouter,
  guessCity,
  hotCities,
  groupCities,
  currentCity,
  searchPlace,
  msiteAddress,
  foodTypes,
  shopList
});
