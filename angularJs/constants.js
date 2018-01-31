angular
  .module('App')
  .constant('qiniuUrl', {
    uploadUrl: 'http://upload.qiniu.com/',
    filesUrl: 'http://media.careerfrog.com.cn/'
  })
  .constant('ALERT_DURATION', 3000)
  .constant('SCHEDULE_STATUSES', [{
    id: 'normal',
    name: '正常'
  }, {
    id: 'pause',
    name: '暂停'
  }, {
    id: 'finish',
    name: '结束'
  }]);
