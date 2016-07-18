(function() {
  'use strict';

  angular
    .module('merchantApp')
    .controller('CourseCopyController', CourseCopyController);

  CourseCopyController.$inject = ['$filter', '$state', 'CourseService', 'toaster','$stateParams','DepartmentService'];

  /* @ngInject */
  function CourseCopyController($filter, $state, CourseService, toaster,$stateParams,DepartmentService) {
    var vm = this;
    vm.cancel= cancel;
    vm.save = save;
    vm.courses = {
      attachments:[]
    };
    return init();

    function init() {
      CourseService
        .edit($stateParams.courseId)
        .then(function(res) {
          vm.courses = res.data.data;
          vm.courses.department_id = vm.courses.department.data.id;
          if(!vm.courses.attachments){
            vm.courses['attachments'] = [];
          }
        });
      var params = {
        limit:1000
      }
      DepartmentService
        .departments(params)
        .then(function (res) {
          vm.departments = res.data.data;
        });
    }
  function cancel() {
    $state.go('admin.courses.list', {
      status:  'published'
    });
  }
    function save(publish) {
      vm.saving = true;
        vm.courses['status'] = 'pending';
      CourseService
        .create(vm.courses)
        .then(function(res) {
          toaster.pop('success', '添加成功');
          $state.go('admin.courses.list', {
            status:  'pending'
          });
        }).finally(function() {
        vm.saving = false;
      });
    }
  }
})();
