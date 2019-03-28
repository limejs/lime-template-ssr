// 这里防止一些在filter中使用的方法函数

let friendlyUnits = [
  { desc: '刚刚', value: 1000, max: 59, prefix: false },
  { desc: '分钟前', value: 60 * 1000, max: 59, prefix: true },
  { desc: '小时前', value: 60 * 60 * 1000, max: 23, prefix: true },
  { desc: '天前', value: 24 * 60 * 60 * 1000, max: 30, prefix: true },
  { desc: '月前', value: 30 * 24 * 60 * 60 * 1000, max: 11, prefix: true },
  { desc: '年前', value: 365 * 24 * 60 * 60 * 1000, max: 4, prefix: true },
  { desc: '很久很久以前', value: 5 * 365 * 24 * 60 * 60 * 1000, max: Infinity, prefix: false }
]

/**
 * @description 转换数字为字符串
 * 
 * @param {number} num 需要转换的数字，例如1000000
 * @param {number} [decimal] 需要保留的小数点位数，默认为1
 * @example
 * ```
 * parseNumToStr(1234) // 1234
 * parseNumToStr(12345) // 12.3万
 * parseNumToStr(123456, 3) // 12.346万
 * ```
 */
export function parseNumToStr(num, decimal = 1) {
  let str;
  let unit = '';

  //10000以内展示数字，否则根据单位转换，小数点保留1位
  if (num >= 10000) {
    if (num >= 100000000) {
      str = (num / 100000000).toFixed(decimal);
      unit = '亿'
    } else {
      str = (num / 10000).toFixed(decimal);
      unit = '万'
    }

    str = Number(str) + unit;
  } else {
    str = num;
  }

  return String(str);
}

/**
 * @description 获取文件大小描述
 *
 * @param {number} size 大小，单位是B
 * @param {boolean} [isTram] 是否去掉小数点后的0，默认为去掉。例如100.0GB，去掉后为100GB
 * @example
 * ```
 * getFileSize(5*1024*1024, false) // 5.0MB
 * getFileSize(5*1024*1024*1024) // 5GB
 * ```
 */
export function convertFileSize(size, isTrim = true) {
  let formatSize;
  let unit = '';

  if (size > 1024 * 1024 * 1024) {
    formatSize = (size / (1024 * 1024 * 1024)).toFixed(1);
    unit = 'GB';
  } else if (size > 1024 * 1024) {
    formatSize = (size / (1024 * 1024)).toFixed(1);
    unit = 'MB';
  } else if (size > 1024) {
    formatSize = (size / (1024)).toFixed(1);
    unit = 'KB';
  } else {
    formatSize = size
    unit = 'B';
  }

  if (isTrim) {
    formatSize = Number(formatSize) + '';
  }

  return formatSize + unit;
}

/**
 */
export function GenerateGuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

/**
 * 返回友好的时间描述
 * 由于Date.now()依赖客户端时间，可能存在误差。
 * 所以方法需要传入已经算好的时间差(具体怎么计算不管)
 * @param {number} ts 时间戳，单位ms。这个时间戳为：当前时间戳 - 过去的某个时间戳（例如发布时的时间戳）
 * 
 * @example
 * ```
 * friendlyTime(60*1000) // 1分前
 * friendlyTime(25*60*60*1000) // 1天前
 * ```
 */
export function friendlyTime(ts = 0) {
  let result = '';

  if (ts > 0) {
    friendlyUnits.some(unit => {
      if (ts < unit.value * unit.max) {
        let t = Math.round(ts / unit.value);

        result = (unit.prefix ? t : '') + unit.desc;
        return true;
      } else {
        return false;
      }
    })
  }

  return result;
}

export default {
  parseNumToStr,
  convertFileSize
}
