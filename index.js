// 匹配列表
const list = {
  'YYYY': { set: 'setFullYear', get: 'getFullYear' },
  'yyyy': { set: 'setFullYear', get: 'getFullYear' },
  'MM': { set: 'setMonth', get: 'getMonth' },
  'DD': { set: 'setDate', get: 'getDate' },
  'dd': { set: 'setDate', get: 'getDate' },
  'HH': { set: 'setHours', get: 'getHours' },
  'hh': { set: 'setHours', get: 'getHours' },
  'mm': { set: 'setMinutes', get: 'getMinutes' },
  'SS': { set: 'setSeconds', get: 'getSeconds' },
  'ss': { set: 'setSeconds', get: 'getSeconds' },
  'ms': { set: 'setMilliseconds', get: 'getMilliseconds' },
  'w': { get: 'getDay' }
};

// 匹配连续字母的正则
const reg = /([a-zA-Z]+)/g;

module.exports = _Date;

/**
 * 根据指定格式来格式化输出日期
 * 
 * @param {Date} date 日期
 * @param {String} format 指定的格式，例如：'YYYY-MM-DD hh:mm:ss.ms'，必须要有符号
 * @param {String} offset 日期偏移的信息，例如：'DD:-1,YYYY:-1'指的是去年的昨天
 */
function _Date(date = new Date(), format = 'YYYY-MM-DD hh:mm:ss', offset){

  // date参数可以省略
  if (typeof date === 'string') {
    offset = format;
    format = date;
    // 如果是Date原型使用
    date = Object.prototype.toString.call(this) === '[object Date]'? this : new Date();
  }

  // 计算日期偏移
  if (typeof offset === 'string') date = _Date.offset(date, offset);

  let result;
  while (result = reg.exec(format)) {
    let key = result[0], value;
    
    if (!list[key]) continue;

    // 根据列表中的指定方法来获取key对应的值
    value = date[list[key].get]();

    // 如果是获取月份，需要将value加一
    if (list[key].get === 'getMonth') ++value;

    // 如果传来的是两位，但是值是一位则需要补个0
    // 例如：传来的是hh，但是值是5，则需要返回05
    if (key.length === 2 && key !== 'ms') {
      value = value.toString().length === 2? value : '0' + value
    }
    
    format = format.replace(key, value);
  }
  return format;
}

/**
 * 将指定的日期根据偏移量偏移
 * 
 * @param {Date} date 日期
 * @param {String} offset 日期偏移的信息，例如：'DD:-1,YYYY:-1'指的是去年的昨天
 */
_Date.offset = function(date = new Date(), offset){
  // date参数可以省略
  if (typeof date === 'string') {
    offset = date;
    // 如果是Date原型使用
    date = Object.prototype.toString.call(this) === '[object Date]'? this : new Date();
  }
  offset.split(',')
  .filter(item => item && item.indexOf(':') > -1)
  .forEach(item => {
    let key_value = item.split(':'),
        key = key_value[0],
        value = Number(key_value[1]);

    // list列表里没有对应的信息或者value不是number类型
    if (!list[key] || isNaN(value)) return;
    
    // 获取原来的值并根据偏移量设置
    let now_value = date[list[key].get]();
    date[list[key].set](now_value + value);
  });
  return date;
}