import typeCheck from '@libs/lang/type-check'

/**
 * 将URL字符串地址解析成Location对象
 * @param {string} url URL地址
 */
export function parseUrl(url) {
  if (/^(([^:\/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/.test(url)) {
    var host = RegExp.$4.split(':');
    return {
      protocol: RegExp.$1,
      host: RegExp.$4,
      hostname: host[0],
      port: host[1] || '',
      pathname: RegExp.$5,
      search: RegExp.$6,
      hash: RegExp.$8,
      href: url
    };
  } else {
    return null;
  }
}

/**
 * 将querystring解析成JSON对象
 * @param {string} queryString URL请求参数
 */
export function parseQueryString(queryString) {
  var strArr = String(queryString).replace(/^[\?&#]/, '').replace(/&$/, '').split('&'),
    sal = strArr.length,
    i, j, ct, p, lastObj, obj, lastIter, undef, chr, tmp, key, value,
    postLeftBracketPos, keys, keysLen,
    fixStr = function (str) {
      return decodeURIComponent(str.replace(/\+/g, '%20'));
    },
    array = {};

  for (i = 0; i < sal; i++) {
    tmp = strArr[i].split('=');
    key = fixStr(tmp[0]);
    value = (tmp.length < 2) ? '' : fixStr(tmp[1]);

    while (key.charAt(0) === ' ') {
      key = key.slice(1);
    }
    if (key.indexOf('\x00') > -1) {
      key = key.slice(0, key.indexOf('\x00'));
    }
    if (key && key.charAt(0) !== '[') {
      keys = [];
      postLeftBracketPos = 0;
      for (j = 0; j < key.length; j++) {
        if (key.charAt(j) === '[' && !postLeftBracketPos) {
          postLeftBracketPos = j + 1;
        }
        else if (key.charAt(j) === ']') {
          if (postLeftBracketPos) {
            if (!keys.length) {
              keys.push(key.slice(0, postLeftBracketPos - 1));
            }
            keys.push(key.substr(postLeftBracketPos, j - postLeftBracketPos));
            postLeftBracketPos = 0;
            if (key.charAt(j + 1) !== '[') {
              break;
            }
          }
        }
      }
      if (!keys.length) {
        keys = [key];
      }
      for (j = 0; j < keys[0].length; j++) {
        chr = keys[0].charAt(j);
        if (chr === ' ' || chr === '.' || chr === '[') {
          keys[0] = keys[0].substr(0, j) + '_' + keys[0].substr(j + 1);
        }
        if (chr === '[') {
          break;
        }
      }

      obj = array;
      for (j = 0, keysLen = keys.length; j < keysLen; j++) {
        key = keys[j].replace(/^['"]/, '').replace(/['"]$/, '');
        lastIter = j !== keys.length - 1;
        lastObj = obj;
        if ((key !== '' && key !== ' ') || j === 0) {
          if (obj[key] === undef) {
            obj[key] = {};
          }
          obj = obj[key];
        }
        else { // To insert new dimension
          ct = -1;
          for (p in obj) {
            if (obj.hasOwnProperty(p)) {
              if (+p > ct && p.match(/^\d+$/g)) {
                ct = +p;
              }
            }
          }
          key = ct + 1;
        }
      }
      lastObj[key] = value;
    }
  }
  return array;
}

function serialize(params, obj, traditional, scope) {
  var type, value, array = typeCheck.isArray(obj), hash = typeCheck.isPlainObject(obj);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      value = obj[key];
      type = typeCheck.type(value);
      if (scope) key = traditional ? scope :
        scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']';
      // handle data in serializeArray() format
      if (!scope && array) params.add(value.name, value.value);
      // recurse into nested objects
      else if (type == "array" || (!traditional && type == "object"))
        serialize(params, value, traditional, key);
      else params.add(key, value)
    }

  }
}

/**
 * 将JSON对象转成URL的请求参数
 * 类似于jQuery.param
 * @param {object} data URL参数对象，json格式
 * @param {string} traditional ???
 */
export function jsonToQueryString(data, traditional) {
  const params = [];
  params.add = function (k, v) {
    this.push(escape(k) + '=' + escape(v))
  };
  serialize(params, data, traditional);
  return params.join('&').replace(/%20/g, '+')
}

/**
 * 添加或修改url参数
 * @param {string} url 需要处理的URL
 * @param {object} params 需要添加或者修改的URL参数，json对象
 * @example
 * appendParams('http://www.qq.com/?a=1&b=2&c=3', {a:0, d:4}) // http://www.qq.com/?a=0&b=2&c=3&d=4
 */
export function appendParams(url, params) {
  const obj = parseUrl(url) || {};
  const search = obj.search || '';
  const urlPrefix = url.indexOf('?') > 0 ? url.slice(0, url.indexOf('?')) : url;
  const param = parseQueryString(search) || {};

  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      param[key] = params[key];
    }
  }

  url = urlPrefix + '?' + jsonToQueryString(param);
  return url;
}

/**
 * 
 * @param {string} url 需要解析的URL地址，不能为空
 * @example
 * ```
 * getUrlQuery('http://www.qq.com/?a=1&b=2&c=3'); // {a:1, b:2, c:3}
 * ```
 */
export function getUrlParams(url) {
  let urlLocation = parseUrl(url) || {};
  return parseQueryString(urlLocation.search) || {}
}

/**
 * 
 * @param {string} url 需要解析的URL地址，不能为空
 * @param {string} key 需要从URL中获取的参数Key
 * @example
 * ```
 * getUrlQuery('http://www.qq.com/?a=1&b=2&c=3', 'b'); // 2
 * ```
 */
export function getUrlQuery(url, key) {
  let query = getUrlQuery(url);
  return query[key];
}

/**
 * 替换协议头
 * 一般用于后台返回的图片地址
 * @param {string} url 原始URL地址
 * @param {string} protocol 新的协议头，包含冒号
 */
export function replaceProtocol(url, protocol) {
  if (typeof url === 'string' && typeof protocol === 'string') {
    return url.replace(/^http(s)?:/, protocol);
  } else {
    return url;
  }
}
