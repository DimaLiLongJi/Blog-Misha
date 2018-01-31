angular
  .module('App')
  .config(['$httpProvider', ($httpProvider) => {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  }]);
