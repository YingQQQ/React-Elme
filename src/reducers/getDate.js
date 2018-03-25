import {
  Map,
  List
} from 'immutable';
import {
  GUESS_CITY,
  HOT_CITIES,
  GROUP_CITIES,
  CURRENT_CITY,
  SEARCH_PLACE,
  INIT_SEARCH_PLACE
} from '../constants/actionsType';


const initialState = Map({});

export const guessCity = (state = initialState, action) => {
  switch (action.type) {
    case GUESS_CITY: {
      const data = action.data;
      let imuData = {
        name: data.name,
        id: data.id,
      };
      imuData = Map(imuData);
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
      const imuData = List(data);
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
      const imuData = Map(data);
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
      const imuData = Map(data);
      return imuData;
    }
    default:
      return state;
  }
};

const initialPlacesHistories = Map({
  historyList: List([]),
});

export const searchPlace = (state = initialPlacesHistories, action) => {
  switch (action.type) {
    case SEARCH_PLACE: {
      const data = Array.from(action.data);
      let imuData = Map({
        historyList: List(data),
      });
      imuData = initialPlacesHistories.merge(imuData);
      return imuData;
    }
    case INIT_SEARCH_PLACE: {
      const imuDataClear = state.merge(initialPlacesHistories);
      return imuDataClear;
    }
    default:
      return state;
  }
};
