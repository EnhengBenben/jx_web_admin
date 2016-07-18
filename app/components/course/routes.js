(function() {
  'use strict';

  angular
    .module('merchantApp')
    .config(function($stateProvider, $urlRouterProvider) {
      // 课程管理
      $stateProvider.state('admin.courses', {
          url: '/courses',
          abstract: true,
          templateUrl: 'components/course/layout.html'
        })
        .state('admin.courses.list', {
          url: '/list?status',
          templateUrl: 'components/course/list.html',
          controller: 'CourseListController as vm'
        })
        .state('admin.courses.create', {
          url: '/create',
          templateUrl: 'components/course/create.html',
          controller: 'CourseCreateController as vm'
        })
        .state('admin.courses.edit', {
          url: '/edit/:courseId?status',
          templateUrl: 'components/course/edit.html',
          controller: 'CourseEditController as vm'
        })
        .state('admin.courses.show', {
          url: '/show/:courseId',
          templateUrl: 'components/course/show.html',
          controller: 'CourseShowController as vm'
        })
        .state('admin.courses.copy', {
          url: '/copy/:courseId',
          templateUrl: 'components/course/copy.html',
          controller: 'CourseCopyController as vm'
        })

    });
})();
