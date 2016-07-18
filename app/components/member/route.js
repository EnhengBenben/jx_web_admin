/**
 * Created by yong on 16/5/7.
 */
(function() {
  'use strict';

  angular
    .module('merchantApp')
    .config(function($stateProvider, $urlRouterProvider) {
      // 通讯录
      $stateProvider.state('admin.members', {
          url: '/members',
          abstract: true,
          templateUrl: 'components/member/layout.html'
        })
        .state('admin.members.list', {
          url: '/list',
          templateUrl: 'components/member/list.html',
          controller: 'MembersListController as vm'
        })
        .state('admin.members.show', {
          url: '/show/:membersId',
          templateUrl: 'components/member/show.html',
          controller: 'MembersShowController as vm'
        });
    });
})();
