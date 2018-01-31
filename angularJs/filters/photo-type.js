// 这样使用
// <span>{{opp.photoRequired | photoType}}</span>
(() => {
  angular.module('App')
    .filter('photoType', photoType);

  function photoType() {
    return (photoType) => {
      if (photoType == 1) {
        return '生活照';
      }
      if (photoType == 2) {
        return '职业照';
      }
    };
  }
})();
