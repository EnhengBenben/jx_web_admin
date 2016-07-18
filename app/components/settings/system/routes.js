(function() {
  'use strict';

  angular
    .module('merchantApp')
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('admin.settings.system', {
        url: '/system',
        abstract: true,
        templateUrl: 'components/settings/system/layout.html'
      });

      // 评价管理
      $stateProvider
        .state('admin.settings.system.information', {
          url: '/information',
          templateUrl: 'components/settings/system/information.html',
          controller: 'SysInformationController as vm'
        })
    });
})();
