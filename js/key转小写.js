const _ = require('lodash');
// 对象key首字母改成小写
function beautifyObj(obj) {
  const result = _.transform(obj, (entry, val, key) => {
    val = dealEmptyValue(val);

    if (val && Object.prototype.toString.call(val) === '[object Object]') {
      val = beautifyObj(val);
    }
    if (val && Object.prototype.toString.call(val) === '[object Array]') {
      val = resolveArr(val);
    }
    if (typeof key === 'string' && key !== 'QQ') {
      const keyLower = key.charAt(0).toLowerCase() + key.slice(1);
      entry[keyLower] = val;
    } else {
      entry[key] = val;
    }
  });
  return result;
}

function dealEmptyValue(obj) {
  let result = obj;
  if (!obj) {
    if (obj !== 0) result = null;
  } else if (typeof obj === 'object' && _.isEmpty(obj)) {
    result = null;
  }
  return result;
}

function resolveArr(arr) {
  arr.forEach((tempVal, index) => {
    const newTempVal = dealEmptyValue(tempVal);
    arr[index] = newTempVal;
    if (newTempVal && Object.prototype.toString.call(newTempVal) === '[object Object]') {
      arr[index] = beautifyObj(newTempVal);
    } else if (newTempVal && Object.prototype.toString.call(newTempVal) === '[object Array]') {
      arr[index] = resolveArr(newTempVal);
    }
  });
  return arr;
}
