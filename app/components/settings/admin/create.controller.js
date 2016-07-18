(function() {
  'use strict';

  angular
    .module('merchantApp')
    .controller('AdminCreateController', AdminCreateController);

  AdminCreateController.$inject = ['$state', 'AdminService', 'toaster','DepartmentService'];

  function AdminCreateController($state, AdminService, toaster,DepartmentService) {
    var vm = this;
   // vm.departments = [{id:1,name:'小儿麻醉科'},{id:2,name:'耳鼻喉科'},{id:3,name:'牙科'}]
    vm.create = create;
    vm.cancel = cancel;


    return init();

    function init() {
      DepartmentService
        .departments()
        .then(function (res) {
          vm.departments = res.data.data;
        });
    }

    function create() {
      if(vm.admin.password.length < 6){
        toaster.pop('error','登陆密码不能少于6位');
      }else {
        AdminService
          .create(vm.admin)
          .success(function() {
            toaster.pop('success', '添加成功');
            $state.go('admin.settings.admins.list');
          });
      }
    }

    function cancel() {
      //$uibModalInstance.dismiss('cancel');
     $state.go('admin.settings.admins.list');
    }
  }
})();
