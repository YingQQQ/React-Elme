/* eslint-disable  no-return-assign */
/* eslint-disable  no-param-reassign */


// let imgBaseUrl;

// if (__DEVELOPMENT__) {
//   imgBaseUrl = 'http://cangdu.org:8001/img/';
// }

export default async (url = '', data = {}, type = 'GET', method = 'fetch') => {
  type = type.toUpperCase();
  if (type === 'GET') {
    let dataStr = '';
    Object.keys(data).forEach(key => (dataStr += `${key}=${data[key]}&`));

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url += `?${dataStr}`;
    }
  }
  if (window.fetch && method === 'fetch') {
    const config = {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      cache: 'force-cache',
      method: type
    };
    if (type === 'POST') {
      Object.defineProperty(config, 'body', {
        value: JSON.stringify(data)
      });
    }
    try {
      const response = await fetch(url, config);
      const responseJson = response.json();
      return responseJson;
    } catch (error) {
      throw new Error(error);
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj;
      if (window.XMLHttpRequest) {
        // eslint-disable-next-line new-cap
        requestObj = window.XMLHttpRequest();
      } else {
        // eslint-disable-next-line
        requestObj = new ActiveXObject;
      }
      let sendData = '';
      if (type === 'POST') {
        sendData = JSON.stringify(data);
      }
      requestObj.open(type, url, true);
      requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      requestObj.send(sendData);
      requestObj.onreadystatechange = () => {
        if (requestObj.readyState === 4) {
          if (requestObj.status === 200) {
            let obj = requestObj.response;
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj);
            }
            resolve(obj);
          } else {
            reject(requestObj);
          }
        }
      };
    });
  }
};
