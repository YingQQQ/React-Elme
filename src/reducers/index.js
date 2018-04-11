import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  guessCity,
  hotCities,
  groupCities,
  currentCity,
  searchPlace,
  msiteAddress,
  foodTypes,
  shopList,
  saveGeohash
} from './getDate';

const initialState = Immutable.fromJS({
  locationBeforeTransitions: null
});

function routeReducer(state = initialState, action) {
  if (action.type === LOCATION_CHANGE) {
    return state.set('locationBeforeTransitions', action.payload);
  }

  return state;
}

export default injectedReducers =>
  combineReducers({
    routeReducer,
    guessCity,
    hotCities,
    groupCities,
    currentCity,
    searchPlace,
    msiteAddress,
    foodTypes,
    shopList,
    saveGeohash,
    ...injectedReducers
  });
