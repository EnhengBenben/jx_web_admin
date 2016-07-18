(function() {
  'use strict';

  angular
    .module('merchantApp')
    .controller('CourseCreateController', CourseCreateController);

  CourseCreateController.$inject = ['$filter', '$state', 'CourseService', 'toaster','DepartmentService'];

  /* @ngInject */
  function CourseCreateController($filter, $state, CourseService, toaster,DepartmentService) {
    var vm = this;
    vm.save = save;
    vm.courses = {
      attachments:[]
    };
    return init();

    function init() {
      var params = {
        limit:1000
      }
      DepartmentService
        .departments(params)
        .then(function (res) {
          vm.departments = res.data.data;
        });
    }

    function save(publish) {
      if (publish){
        vm.publish = true;
        vm.courses['status'] = 'publish';
      }else {
        vm.saving = true;
        vm.courses['status'] = 'pending';
      }
      CourseService
        .create(vm.courses)
        .then(function(res) {
          toaster.pop('success', '添加成功');
          $state.go('admin.courses.list', {
            status: publish ? 'published' : 'pending'
          });
        }).finally(function() {
          vm.saving = false;
        vm.publish = false;
        });
    }
  }
})();
