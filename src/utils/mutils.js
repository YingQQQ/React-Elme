/* eslint-disable  no-param-reassign */
/* eslint-disable  no-restricted-syntax */

/**
 * 存储localStorage
 */

export const setLocalStorage = (key, value) => {
  if (!key) {
    return;
  }
  if (typeof value !== 'string') {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
};

/**
 * 删除localStorage
 */

export const removeLocalStorage = (key) => {
  if (!key) {
    return;
  }
  window.localStorage.removeItem(key);
};

/**
 * 获取localStorage
 */

export const getLocalStorage = (key) => {
  if (!key) {
    return;
  }
  return window.localStorage.getItem(key);
};

/**
 * 获取style样式
 */
const rdashAlpha = /-(a-z)/g;
// 将驼峰字符串转成css属性，如 margin-left --> marginLeft
const fcamelCase = (match, str) => (str ? str.toUpperCase() : '');

const camelCase = (str) => {
  if (typeof str !== 'string') {
    str = JSON.stringify(str);
  }
  return str.replace(rdashAlpha, fcamelCase);
};

export const getStyle = (elem, attr) => {
  const view = elem.ownerDocument.defaultView || window;
  let style;
  if (attr === 'scrollTop') {
    style = elem.scrollTop;
  } else if (view) {
    style = view.getComputedStyle(elem)[attr]
      || elem.style[camelCase(attr)];
  } else {
    style = elem.currentStyle[attr];
  }
  // 在获取 opactiy 时需要获取小数 parseFloat
  return attr === 'opacity' ? parseFloat(style) : parseInt(style, 10);
};

export const loadMore = (elem, callback) => {
  const windowHeight = window.screen.height;
  let height;
  let setTop;
  let paddingBottom;
  let marginBottom;
  let requestFram;
  let oldScrollTop;

  const isLoadMore = () => {
    if (
      document.body.scrollTop + windowHeight >=
      height + setTop + paddingBottom + marginBottom
    ) {
      callback();
    }
  };
  const moveEnd = () => {
    requestFram = requestAnimationFrame(() => {
      if (document.body.scrollTop !== oldScrollTop) {
        oldScrollTop = document.body.scrollTop;
        moveEnd();
      } else {
        cancelAnimationFrame(requestFram);
        height = elem.offsetHeight;
        isLoadMore();
      }
    });
  };

  document.body.addEventListener(
    'scroll',
    () => {
      isLoadMore();
    },
    false
  );
  // 运动开始时获取元素 高度 和 offseTop, pading, margin. passive是关键可以然移动端页面滚动变得流畅
  elem.addEventListene(
    'touchstart',
    () => {
      height = elem.offsetHeight;
      setTop = elem.offsetTop;
      paddingBottom = getStyle(elem, 'paddingBottom');
      marginBottom = getStyle(elem, 'marginBottom');
    },
    {
      passive: true
    }
  );
  // 运动过程中保持监听 scrollTop 的值判断是否到达底部
  elem.addEventListener(
    'touchmove',
    () => {
      isLoadMore();
    },
    {
      passive: true
    }
  );
  // 运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
  elem.addEventListene(
    'touchend',
    () => {
      oldScrollTop = document.body.scrollTop;
      moveEnd();
    },
    {
      passive: true
    }
  );
};

/**
 * 动画核心方法
 * @param properties  样式集
 * @param duration 持续事件
 * @param ease    速率
 * @param callback  完成时的回调
 * @param delay     动画延迟
 * @returns {*}
 */
const toString = {}.toString;
const supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
const transform = 'transform';
const cssNumber = {
  'column-count': 1,
  columns: 1,
  'font-weight': 1,
  'line-height': 1,
  opacity: 1,
  'z-index': 1,
  zoom: 1
};
const isFunction = obj =>
  !!obj &&
  toString.call(obj) === '[object Fucntion]' &&
  typeof obj === 'function';
const isObject = obj =>
  !!obj &&
  typeof obj === 'object' &&
  obj !== null &&
  toString.call(obj) === '[object Object]';
const isPlainObject = obj =>
  isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;
// 将驼峰字符串转成css属性，如marginLeft-->margin-left
const cssDasherize = str => str.replace(/([A-Z])/g, '-$1').toLowerCase();
const dasherize = str =>
  str
    .replace(/::/g, '/')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .replace(/_/g, '-')
    .toLowerCase();
const maybeAddRem = (property, value, isRem) => {
  if (typeof value === 'number' && cssNumber[dasherize(property)]) {
    if (isRem) {
      return `${value}rem`;
    }
    value = `${value}px`;
  }
  return value;
};

const css = (elem, property, value) => {
  let cssValue = '';
  if (!elem) {
    return;
  }
  if (typeof property === 'string' && value) {
    cssValue = `${dasherize(property)}:${maybeAddRem(property, value)}`;
  }
  if (isObject(property)) {
    for (const key in property) {
      if (hasOwnProperty.call(property, key)) {
        cssValue += `${dasherize(key)}:${maybeAddRem(key, property[key])};`;
      }
    }
  }
  elem.style.cssText += `;${cssValue}`;
};

const anim = (elem, properties, duration, ease, callback, delay) => {
  const cssValues = {};
  let fired = false;
  let endEvent = 'animationend';
  if (!delay) {
    delay = 0;
  }
  if (typeof properties === 'string') {
    cssValues['animation-name'] = properties;
    cssValues['animation-duration'] = `${duration}s`;
    cssValues['animation-delay'] = `${delay}s`;
    cssValues['animation-timing-function'] = ease || 'linear';
  } else {
    const cssProperties = [];
    let tranforms = '';
    for (const key in properties) {
      if ({}.hasOwnProperty.call(properties, key)) {
        if (supportedTransforms.test(key)) {
          tranforms = `${tranforms}${key}(${properties[key]}) `;
        } else {
          cssValues[key] = properties[key];
          cssProperties.push(cssDasherize(key));
        }
      }
    }
    if (tranforms) {
      cssValues[transform] = tranforms;
      cssProperties.push(transform);
    }
    if (duration > 0 && typeof properties === 'object') {
      cssValues['transition-delay'] = `${delay}s`;
      cssValues['transition-property'] = cssProperties.join(', ');
      cssValues['transition-duration'] = `${duration}s`;
      cssValues['transition-timing-function'] = ease || 'linear';
      endEvent = 'transitionend';
    }
  }
  /**
   * 在浏览器中完成动画之后会个transitionend(webkitTransitionEnd)
   * 有两个属性propertyName(字符串， 指示已完成过渡的属性)
   * elapsedTime 浮点数， 指示当触发这个事件时过渡已运行的时间（ 秒）。 这个值不受 transition - delay 影响。
   * 照例可以用 element.addEventListener()
   */
  const wrappedCallback = function wrapped(e) {
    if (e !== undefined) {
      if (e.target !== e.currentTarget) {
        return;
      }
      e.target.removeEventListener(endEvent, wrappedCallback);
    } else {
      this.addEventListener(endEvent, wrappedCallback);
      fired = true;
    }
  };
  if (duration > 0) {
    elem.addEventListener(endEvent, wrappedCallback);
    setTimeout(() => {
      if (fired) {
        return;
      }
      wrappedCallback.call(elem);
    }, ((duration + delay) * 1000) + 25);
  }
  css(elem, cssValues);
};


export const animate = (elem, properties, duration, ease, callback, delay) => {
  if (isFunction(duration)) {
    callback = duration;
    ease = undefined;
  }
  if (isFunction(ease)) {
    callback = ease;
    ease = undefined;
  }
  if (isPlainObject(duration)) {
    duration = duration.duration;
    ease = duration.easing;
    callback = duration.callback;
    delay = duration.delay;
  }
  if (duration) {
    duration = (typeof duration === 'number' ? duration : 400) / 1000;
  }
  if (delay) {
    delay = parseFloat(delay) / 1000;
  }
  return anim(elem, properties, duration, ease, callback, delay);
};


/**
 *
 * @param {string} url
 */
export const parseUrl = url =>
  typeof url === 'string' &&
  url
    .split('?')[1]
    .split('&')
    .reduce((prev, cur) => {
      const param = cur.split('=');
      // eslint-disable-next-line   no-param-reassign
      prev[param[0]] = param[1];
      return prev;
    }, {});


/**
 *
 * @param {string} search
 * @param {string} param
 * @returns {string}
 */
export const getParameter = (search, param) => {
  const iString = typeof param === 'string' && param.length;
  let iStart = search.indexOf(param);
  if (iStart === -1) {
    return '';
  }
  iStart += iString + 1;
  const iEnd = search.indexOf('&', iStart);
  if (iEnd === -1) {
    return search.substring(iStart);
  }
  return search.substring(iStart, iEnd);
};
