import {
  GUESS_CITY,
  HOT_CITIES,
  GROUP_CITIES,
  CURRENT_CITY,
  SEARCH_PLACE,
  INIT_SEARCH_PLACE,
  MSITE_ADDRESS,
  FOOD_TYPES,
} from '../constants/actionsType';
import fetch from '../utils/fetch';

// 城市定位
export const guessCityAction = data => ({
  type: GUESS_CITY,
  data
});

export const fetchGuessCity = () => dispatch =>
  fetch('/v1/cities', {
    type: 'guess'
  }).then(data => dispatch(guessCityAction(data)));

// 热门城市
export const hotCitiesAction = data => ({
  type: HOT_CITIES,
  data
});

export const fetchHotCities = () => dispatch =>
  fetch('/v1/cities', {
    type: 'hot'
  }).then(data => dispatch(hotCitiesAction(data)));

// 获取所有城市

export const groupCities = data => ({
  type: GROUP_CITIES,
  data
});

export const fetchGroupCities = () => dispatch =>
  fetch('/v1/cities', {
    type: 'group'
  }).then(data => dispatch(groupCities(data)));

// 获取当前城市

export const currentCity = data => ({
  type: CURRENT_CITY,
  data
});

export const fetchCurrentCity = id => dispatch =>
  fetch(`/v1/cities/${id}`).then(data => dispatch(currentCity(data)));

//  查选地址
export const searchPlace = data => ({
  type: SEARCH_PLACE,
  data
});
export const fetchSearchPlace = (id, value) => dispatch =>
  fetch('/v1/pois', {
    type: 'search',
    city_id: id,
    keyword: value
  }).then(data => dispatch(searchPlace(data)));

export const clearPlace = () => ({
  type: INIT_SEARCH_PLACE,
});


// 获取msite页面地址信息

export const msiteAddress = data => ({
  type: MSITE_ADDRESS,
  data
});

export const fetchMsiteAddress = geohash => dispatch =>
  fetch(`/v2/pois/${geohash}`).then(data => dispatch(msiteAddress(data)));

// 获取食物分类

export const foodTyps = data => ({
  type: FOOD_TYPES,
  data
});

export const fetchFoodTypes = geohash => dispatch =>
  fetch('/v2/index_entry', {
    geohash,
    group_type: '1',
    'flags[]': 'F'
  }).then(data => dispatch(foodTyps(data)));
