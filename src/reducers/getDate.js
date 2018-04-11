import { Map, List } from 'immutable';
import {
  GUESS_CITY,
  HOT_CITIES,
  GROUP_CITIES,
  CURRENT_CITY,
  SEARCH_PLACE,
  INIT_SEARCH_PLACE,
  MSITE_ADDRESS,
  FOOD_TYPES,
  SHOP_LIST,
  SAVE_GEOHASH,
  LOAD_MORD_SHOPPLIST,
} from '../constants/actionsType';

const initialObjectState = Map({});
const initialArrayState = List([]);

export const saveGeohash = (state = '', action) => {
  switch (action.type) {
    case SAVE_GEOHASH: {
      const data = action.data;
      return data;
    }
    default:
      return state;
  }
};

export const guessCity = (state = initialObjectState, action) => {
  switch (action.type) {
    case GUESS_CITY: {
      const data = action.data;
      let imuData = {
        name: data.name,
        id: data.id
      };
      imuData = Map(imuData);
      return imuData;
    }
    default:
      return state;
  }
};

export const hotCities = (state = initialObjectState, action) => {
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
export const groupCities = (state = initialObjectState, action) => {
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

export const currentCity = (state = initialObjectState, action) => {
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
  historyList: List([])
});

export const searchPlace = (state = initialPlacesHistories, action) => {
  switch (action.type) {
    case SEARCH_PLACE: {
      const data = Array.from(action.data);
      let imuData = Map({
        historyList: List(data)
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

export const msiteAddress = (state = initialObjectState, action) => {
  switch (action.type) {
    case MSITE_ADDRESS: {
      const data = action.data;
      const imuData = Map(data);
      return imuData;
    }
    default:
      return state;
  }
};

export const foodTypes = (state = initialArrayState, action) => {
  switch (action.type) {
    case FOOD_TYPES: {
      const data = Array.from(action.data);
      const imuData = List(data);
      return imuData;
    }
    default:
      return state;
  }
};

export const shopList = (state = initialArrayState, action) => {
  switch (action.type) {
    case SHOP_LIST: {
      const data = action.data;
      const imuData = List(data);
      return imuData;
    }
    case LOAD_MORD_SHOPPLIST: {
      const data = action.data;
      const imuData = state.concat(List(data));
      return imuData;
    }
    default:
      return state;
  }
};
