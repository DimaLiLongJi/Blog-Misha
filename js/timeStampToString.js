// 时间戳转字符串
function timeStampToString(time) {
  var datetime = new Date().setTime(time);
  var year = datetime.getFullYear();
  var month = datetime.getMonth() + 1;
  var date = datetime.getDate();
  var hour = datetime.getHours();
  var minute = datetime.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  var second = datetime.getSeconds();
  var mseconds = datetime.getMilliseconds();
  return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" +
    second + ":" + mseconds;
}

function dateToTimeStamp(date) {
  return new Date().setTime(date);
}
