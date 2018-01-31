(() => {
  angular
    .module('App')
    .config(['$stateProvider',
      ($stateProvider) => {
        $stateProvider
          .state('opportunities', {
            url: '/opportunities',
            templateUrl: '/app/components/marketing/template.html',
            controller: 'OpportunityCtrl',
            controllerAs: 'vm',
            redirectTo: 'opportunities.external',

            // 在下面引入 components的control位置
            resolve: {
              load: ['$ocLazyLoad', $ocLazyLoad =>
                import ( /* webpackChunkName: "OpportunityCtrl" */ '../../../components/opportunities/index.js').then(m => $ocLazyLoad.load(m.default))
              ]
            },

          })
          .state('opportunities.referral', {
            url: '/referral',
            templateUrl: '/app/components/opportunities/referral-opportunities/template.html',
            controller: 'IRoppsManageCtrl',
            controllerAs: 'vm'
          })
          .state('opportunities.referral.list', {
            url: '/list?keepSession',
            templateUrl: '/app/components/opportunities/referral-opportunities/list/template.html',
            controller: 'IRoppsListCtrl',
            controllerAs: 'vm'
          })
          .state('opportunities.referral.edit', {
            url: '/:id/edit',
            templateUrl: '/app/components/opportunities/referral-opportunities/edit/template.html',
            controller: 'IRoppsEditCtrl',
            controllerAs: 'vm'
          })
      }
    ]);
})();
