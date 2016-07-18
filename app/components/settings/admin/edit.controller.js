(function() {
  'use strict';

  angular
    .module('merchantApp')
    .controller('AdminEditController', AdminEditController);

  AdminEditController.$inject = ['AdminService', 'toaster', '$state', '$stateParams','DepartmentService'];

  function AdminEditController(AdminService, toaster, $state, $stateParams,DepartmentService) {
    var vm = this;
    vm.admin = {
      department_ids:[],
    };
    vm.save = save;
    vm.cancel = cancel;
    return init();

    function init() {

      DepartmentService
        .departments()
        .then(function (res) {
          vm.departments = res.data.data;
        });
      var params = {
        include:'department'
      };
      AdminService
        .get($stateParams.adminId,params)
        .then(function(res) {
          vm.admin = res.data.data;
          vm.admin.department_ids = [];
           angular.forEach(vm.admin.department.data,function (i) {
             vm.admin.department_ids.push(i.id)
           });
          vm.admin['num'] = '******';
        });
    }

    function save() {
      if(vm.admin.num.length < 6 && vm.admin.num != '******'){
        toaster.pop('error','登陆密码不能少于6位');
        return 0;
      }else {
        vm.saving = true;

        if (vm.admin.num == '******'){
          delete vm.admin.password;
          delete vm.admin.num;
        }else {
          vm.admin.password = vm.admin.num;
        }
        var data = vm.admin;
        AdminService.update($stateParams.adminId,data)
          .success(function() {
            toaster.pop('success', '更新成功');
            $state.go('admin.settings.admins.list');
          })
          .finally(function () {
            vm.saving = false;
          })
      }

    }

    function cancel() {
      $state.go('admin.settings.admins.list');
    }
  }
})();
