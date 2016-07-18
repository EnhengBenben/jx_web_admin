(function() {
  'use strict';

  angular
    .module('merchantApp')
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/admin/dashboard');
      $stateProvider
        .state('admin', {
          url: '/admin',
          abstract: true,
          controller: 'AdminController as admin',
          templateUrl: 'views/main.html'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'components/auth/login.html',
          controller: 'LoginController as vm'
        })
        .state('admin.dashboard',{
          url:'/dashboard',
          templateUrl:'components/dashboard/dashboard.html',
          controller:'DashboardController as vm'
        })
        .state('admin.departments',{
          url:'/department',
          templateUrl:'components/dashboard/dashboard.html',
          controller:'DashboardController as vm'
        })
    });
})();
