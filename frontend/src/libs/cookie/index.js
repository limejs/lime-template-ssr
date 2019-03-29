import { currentDocument } from '@libs/env'

export const setCookie = function (name, value, param) {
  if (name == '') {
    return false;
  }
  param = Object.assign({},  param);
  if (typeof (value) == 'undefined' || value == null) {
    value = '';
  }
  if (typeof (param.expires) == 'number') {
    var expires = param.expires;
    param.expires = new Date();
    param.expires.setTime(param.expires.getTime() + (expires * 1000));
  }
  currentDocument.cookie = [
    encodeURIComponent(name), '=', encodeURIComponent(value),
    param.domain ? '; domain=' + param.domain : '',
    param.path ? '; path=' + param.path : '',
    param.expires ? '; expires=' + param.expires.toUTCString() : '',
    param.secure ? '; secure' : ''
  ].join('');
  return true;
};


export const getCookie = function (name) {
  if (currentDocument && currentDocument.cookie != '') {
    var cookieArr = currentDocument.cookie.split('; ');
    name = encodeURIComponent(name);
    for (let i = 0, cl = cookieArr.length, tmpArr; i < cl; i++) {
      tmpArr = cookieArr[i].split('=');
      if (name == tmpArr[0]) {
        var result = '';
        try {
          result = decodeURIComponent(tmpArr[1] || '');
        } catch (e) {
          result = tmpArr[1] || '';
        }

        return result;
      }
    }
  }
  return null;
};

export const deleteCookie = function(name){
  if (currentDocument && currentDocument.cookie != '') {
    var cookieArr = currentDocument.cookie.split('; ');
    name = encodeURIComponent(name);
    let sDomain = null;
    let sPath = null;
    setCookie(name,'',{expires:0})
  }
  return null;
}
