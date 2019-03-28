/**
 * 类型检测
 * Created by Dreamzhu on 2017/3/25.
 */

let class2type = {};
"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function (name) {
  class2type["[object " + name + "]"] = name.toLowerCase()
});

export function type(obj) {
  return obj == null ? String(obj) :
    class2type[Object.prototype.toString.call(obj)] || "object"
}

export function isArray(value) {
  return value instanceof Array
}

function isObject(obj) {
  return type(obj) == "object"
}

function isWindow(obj) {
  return obj != null && obj == obj.window
}

export function isFunction(value) {
  return type(value) == "function"
}

export function isPlainObject(obj) {
  return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
}
export default {
  isArray: isArray,
  type: type,
  isPlainObject: isPlainObject,
  isFunction: isFunction
}


