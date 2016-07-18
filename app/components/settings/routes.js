(function() {
  'use strict';

  angular
    .module('merchantApp')
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('admin.settings', {
        url: '/settings',
        abstract: true,
        templateUrl: 'components/settings/layout.html'
      });

      // 管理员管理
      $stateProvider.state('admin.settings.admins', {
          url: '/admins',
          abstract: true,
          templateUrl: 'components/settings/admin/layout.html'
        })
        .state('admin.settings.admins.list', {
          url: '/list',
          templateUrl: 'components/settings/admin/list.html',
          controller: 'AdminListController as vm'
        })
        .state('admin.settings.admins.create', {
          url: '/create',
          templateUrl: 'components/settings/admin/create.html',
          controller: 'AdminCreateController as vm'
        })
        .state('admin.settings.admins.edit', {
          url: '/edit/:adminId',
          templateUrl: 'components/settings/admin/edit.html',
          controller: 'AdminEditController as vm'
        })
        .state('admin.settings.admins.show', {
          url: '/show/:adminId',
          templateUrl: 'components/settings/admin/show.html',
          controller: 'AdminShowController as vm'
        });

      // 修改密码
      $stateProvider.state('admin.settings.account', {
          url: '/account',
          abstract: true,
          templateUrl: 'components/settings/account/layout.html'
        })
        .state('admin.settings.account.change_password', {
          url: '/change-password',
          templateUrl: 'components/settings/account/account.html',
          controller: 'AccountController as vm'
        });
      //科室部门
      $stateProvider.state('admin.settings.department', {
          url: '/department',
          abstract: true,
          templateUrl: 'components/settings/department/layout.html'
        })
        .state('admin.settings.department.list', {
          url: '/list',
          templateUrl: 'components/settings/department/list.html',
          controller: 'DepartmentListController as vm'
        })

    });
})();
