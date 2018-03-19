import {
  GUESS_CITY,
  HOT_CITIES,
  GROUP_CITIES,
  CURRENT_CITY,
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
