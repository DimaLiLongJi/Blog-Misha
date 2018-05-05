// 页面传参
function getUrlDate(id) {
  let parts = window.location.search.replace('?', '').split('&'),
    params = {};
  for (let i = 0, len = parts.length; i < len; i++) {
    let pairs = parts[i].split('=');
    params[pairs[0]] = pairs[1];
  }
  if (params[id]) {
    return params[id];
  } else {
    return '';
  }
}

function getUrlQuery(name) {
  let parts = window.location.search.replace('?', '').split('&');
  let params = {};
  for (let i = 0, len = parts.length; i < len; i++) {
    let pairs = parts[i].split('=');
    params[pairs[0]] = pairs[1];
  }
  if (params[name]) {
    return params[name];
  } else {
    return '';
  }
}
