angular.module('App', [ // module App的声明及依赖模块 angular.module('模块名', [依赖模块]）
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'ngMessages',
    'ngFileUpload',
    'ui.select',
    'ngSanitize',
    'checklist-model',
    'ui.bootstrap.datetimepicker',
    'ngSessionStorage',
    'ui.sortable',
    'uiSwitch',
    'oc.lazyLoad',
  ]).config([
    '$sceDelegateProvider',
    ($sceDelegateProvider) => {
      $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://static.careerfrog.com.cn/**',
        'https://static.careerfrog.com.cn/**',
      ]);
    }
  ]).config(['uibDatepickerPopupConfig', (uibDatepickerPopupConfig) => {
    uibDatepickerPopupConfig.closeText = '关闭';
    uibDatepickerPopupConfig.currentText = '今天';
    uibDatepickerPopupConfig.clearText = '清空';
  }]).run();

(() => {
  angular.module('App')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = [ // controller的注入，可以直接用
    '$USER',
    'authService',
    '$rootScope',
    '$timeout',
    'ALERT_DURATION',
    '$scope',
    '$sce',
    'CF_FILE_BASE_URL',
  ];

  function MainCtrl(
    $USER,
    authService,
    $rootScope,
    $timeout,
    ALERT_DURATION,
    $scope,
    $sce,
    CF_FILE_BASE_URL,
  ) {
    const vm = this;
    vm.user = $USER;
    vm.msg = '';

    vm.noticeOptions = {
      appName: 'cf.admin',
      toEntity: 'member',
      toId: $USER.id,
      timeInterval: 60,
      enabled: 1,
    };
    if (/:\/\/test\./.test(window.location.href)) {
      $scope.isTest = true;
    } else {
      $scope.isTest = false;
    }

    vm.logout = logout;
    $rootScope.CF_FILE_BASE_URL = CF_FILE_BASE_URL;
    $rootScope.showAlert = showAlert;
    $rootScope.trustSrc = src => $sce.trustAsResourceUrl(src);
    $rootScope.trustAsHtml = str => $sce.trustAsHtml(str);

    $rootScope.cacheResult = (fn, interval = 5 * 60 * 1000) => {
      const results = {};
      return (...args) => {
        const key = args.map(a => JSON.stringify(a)).reduce((c, n) => (c + n), '_');
        const result = results[key];
        if (result && Date.now() < result.expiresAt) {
          return Promise.resolve(angular.copy(result.value));
        }
        return fn(...args)
          .then((value) => {
            results[key] = {
              value,
              expiresAt: Date.now() + interval
            };
            return angular.copy(value);
          });
      };
    };

    $rootScope.pTimeout = () => new Promise((res) => {
      $timeout(res, 1);
    });

    $rootScope.sValidation = (conf, targetObj) => {
      const obj = {
        result: true,
        errorMessage: [],
      };
      conf.required.forEach((key) => {
        if (typeof key !== 'object') {
          if (targetObj[key] === undefined ||
            targetObj[key] === null ||
            targetObj[key].length === 0) {
            obj.result = false;
            obj.errorMessage.push(key);
          }
        } else if (targetObj[key.key][key.sub] === undefined ||
          targetObj[key.key][key.sub] === null ||
          targetObj[key.key][key.sub].length === 0) {
          obj.result = false;
          obj.errorMessage.push(`${key.key}.${key.sub}`);
        }
      });
      if (obj.errorMessage.length > 0) {
        console.error('validate error message: ', obj.errorMessage);
      }
      return obj;
    };

    function logout() {
      authService.logout().then(function() {
          window.location = "/login";
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    function showAlert(content, alertType, duration) {
      var type = alertType || 'alert-danger';
      var cont = content || '';
      var dur = duration || ALERT_DURATION;

      vm.msg = {
        type: type,
        content: cont
      };

      $timeout(function() {
        vm.msg = '';
      }, dur);
    }

  }
})();
