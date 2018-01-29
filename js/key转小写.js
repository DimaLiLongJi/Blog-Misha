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
