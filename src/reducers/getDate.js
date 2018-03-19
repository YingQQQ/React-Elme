import {
  Map,
  List
} from 'immutable';
import {
  GUESS_CITY,
  HOT_CITIES,
  GROUP_CITIES,
  CURRENT_CITY
} from '../constants/actionsType';


const initialState = Map({
  isFetch: false
});

export const guessCity = (state = initialState, action) => {
  switch (action.type) {
    case GUESS_CITY: {
      const data = action.data;
      let imuData = {
        name: data.name,
        id: data.id,
      };
      imuData = Map(imuData).set('guessCityisFetch', !initialState.get('isFetch'));
      return imuData;
    }
    default:
      return state;
  }
};

export const hotCities = (state = initialState, action) => {
  switch (action.type) {
    case HOT_CITIES: {
      const data = Array.from(action.data);
      const imuData = List(data).push({
        hotCitiesISfetch: !initialState.get('isFetch')
      });
      return imuData;
    }
    default:
      return state;
  }
};
export const groupCities = (state = initialState, action) => {
  switch (action.type) {
    case GROUP_CITIES: {
      const data = action.data;
      const imuData = Map(data).set('groupCitiesIsFetch', !initialState.get('isFetch'));
      return imuData;
    }
    default:
      return state;
  }
};

export const currentCity = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_CITY: {
      const data = action.data;
      const imuData = Map(data).set('currentCitiyIsFetch', !initialState.get('isFetch'));
      return imuData;
    }
    default:
      return state;
  }
};
