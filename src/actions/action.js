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
  GET_GEOHASH
} from '../constants/actionsType';
import fetch from '../utils/fetch';

// 保存定位
export const saveGeohash = data => ({
  type: SAVE_GEOHASH,
  data
});
export const getGeohash = () => ({
  type: GET_GEOHASH,
});

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
  type: INIT_SEARCH_PLACE
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

//  获取商铺列表

export const shopList = data => ({
  type: SHOP_LIST,
  data
});

export const fetchShopList = (
  latitude,
  longitude,
  offset,
  restaurantCategoryId = '',
  restaurantCategoryIds = '',
  orderBy = '',
  deliveryMode = '',
  supportIds = []
) => {
  let supportStr = '';
  if (supportIds.length) {
    supportIds.forEach((item) => {
      if (item.status) {
        supportStr += `&support_ids[]=${item.id}`;
      }
    });
  }
  const data = {
    latitude,
    longitude,
    offset,
    limit: '20',
    'extras[]': 'activities',
    keyword: '',
    restaurant_category_id: restaurantCategoryId,
    'restaurant_category_ids[]': restaurantCategoryIds,
    order_by: orderBy,
    'delivery_mode[]': deliveryMode + supportStr
  };
  return dispatch =>
    fetch('/shopping/restaurants', data).then(response =>
      dispatch(shopList(response))
    );
};
