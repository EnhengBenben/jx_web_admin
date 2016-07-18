'use strict';

angular.module('merchantApp')
  .controller('CourseShowController', CourseShowController);

CourseShowController.$inject = ['$state', '$stateParams', 'CourseService'];

function CourseShowController($state, $stateParams, CourseService) {
  var vm = this;
  vm.courses = {};
  vm.cancel = cancel;
  vm.statusDescr = {
    canceled: '已取消',
    pending: '待审核',
    publish: '报名中',
    ongoing: '上课中',
    closed: '已结束'
  };
  return init();

  function init() {
    CourseService.show($stateParams.courseId)
      .then(function(res) {
        vm.show = res.data.data;
      });
  }

  function cancel() {
    $state.go('admin.courses.list',{
      status:'published'
    });
  }
}
