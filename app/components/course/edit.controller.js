(function() {
  'use strict';

  angular
    .module('merchantApp')
    .controller('CourseEditController', CourseEditController);

  CourseEditController.$inject = ['$state', 'CourseService', 'toaster', '$stateParams','DepartmentService'];

  /* @ngInject */
  function CourseEditController($state, CourseService, toaster, $stateParams,DepartmentService) {
    var vm = this;
    vm.save = save;
    vm.cancel = cancel;
    vm.courses = {
      attachments:[]
    };

    activate();

    function activate() {
      CourseService
        .edit($stateParams.courseId)
        .then(function(res) {
          vm.courses = res.data.data;
          if(!vm.courses.attachments){
            vm.courses['attachments'] = [];
          }
          vm.courses.department_id = vm.courses.department.data.id;
          if(vm.courses.published_at){
            vm.courses['status'] = 'publish'
          }else {
            vm.courses['status'] = 'pending'
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

    function save() {
      vm.saving = true;
      CourseService.update($stateParams.courseId,vm.courses)
        .then(function() {
          toaster.pop('success', '更新成功');
          $state.go('admin.courses.list', {
            status: (vm.courses.status == 'pending' ? 'pending' : 'published')
          });
        }).finally(function() {
          vm.saving = false;
        });
    }

    function cancel() {
      $state.go('admin.courses.list', {
        status: (vm.courses.status == 'pending' ? 'pending' : 'published')
      });
    }
  }
})();
