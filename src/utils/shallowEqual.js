import { is } from 'immutable';

export default (thisProps = {}, nextProps = {}, thisState = {}, nextState = {}) => {
  if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
    Object.keys(thisState).length !== Object.keys(nextState).length) {
    return true;
  }

  Object.keys(nextProps).forEach((key) => {
    if (!is(thisProps[key], nextProps[key])) {
      return true;
    }
  });

  // 试过使用Object.keys来比较但是会导致setSate()无法及时更新原因未知
  // eslint-disable-next-line no-restricted-syntax
  for (const key in nextState) {
    if (!is(thisState[key], nextState[key])) {
      return true;
    }
  }
  return false;
};
