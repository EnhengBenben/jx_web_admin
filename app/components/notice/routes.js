(function() {
  'use strict';

  angular
    .module('merchantApp')
    .config(function($stateProvider, $urlRouterProvider) {
      // 公告列表
      $stateProvider.state('admin.notices', {
          url: '/notices',
          abstract: true,
          templateUrl: 'components/notice/layout.html'
        })
        .state('admin.notices.list', {
          url: '/list?status',
          templateUrl: 'components/notice/list.html',
          controller: 'NoticeListController as vm'
        })
        .state('admin.notices.create', {
          url: '/create',
          templateUrl: 'components/notice/create.html',
          controller: 'NoticeCreateController as vm'
        })
        .state('admin.notices.edit', {
          url: '/edit/:noticeId',
          templateUrl: 'components/notice/edit.html',
          controller: 'NoticeEditController as vm'
        })
        .state('admin.notices.show', {
          url: '/show/:noticeId',
          templateUrl: 'components/notice/show.html',
          controller: 'NoticeShowController as vm'
        });
    });
})();
