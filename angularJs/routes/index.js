import './opportunity';

(() => {
  angular
    .module('App')
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      '$locationProvider',
      (
        $stateProvider,
        $urlRouterProvider,
        $locationProvider
      ) => {
        $locationProvider
          .html5Mode(false)
          .hashPrefix('');

        $stateProvider
          .state('index', {
            url: '',
            controller: ['$USER', '$state', ($USER, $state) => {
              if ($USER.role_id === 1) {
                $state.go('account.member-manage');
              } else if ($USER.role_id === 2) {
                $state.go('content.article.list');
              } else if ($USER.role_id === 3) {
                $state.go('tutor.list');
              } else if ($USER.role_id === 300) {
                $state.go('tutor.list');
              } else if ($USER.role_id === 4) {
                $state.go('course-schedule.list');
              } else if ($USER.role_id === 5) {
                $state.go('lead.import-bulk');
              } else if ($USER.role_id === 11) {
                $state.go('course-schedule.lesson-feedback.list');
              } else if ($USER.role_id === 12 || $USER.role_id === 13) {
                $state.go('student.offer-report');
              } else if ($USER.role_id === 6) {
                $state.go('lead.follow-up');
              } else if ($USER.role_id === 7) {
                $state.go('lead.follow-up');
              } else if ($USER.role_id === 9) {
                $state.go('lead.list');
              } else if ($USER.role_id === 306) {
                $state.go('reconciliation.list');
              } else if ($USER.role_id === 348) {
                $state.go('lead.follow-up');
              }
            }],
          });

        // when no match route
        $urlRouterProvider
          .otherwise(() => {
            window.location = '/404';
          });
      }
    ]);
})();
