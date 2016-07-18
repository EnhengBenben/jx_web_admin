(function() {
  'use strict';

  angular
    .module('merchantApp')
    .controller('DepCreateController', DepCreateController);

  DepCreateController.$inject = ['$filter', '$state', 'toaster','editId','DepartmentService','$uibModalInstance'];

  /* @ngInject */
  function DepCreateController($filter, $state, toaster,editId,DepartmentService,$uibModalInstance) {
    var vm = this;
    vm.save = save;
    vm.cancel = cancel;
    return init();

    function init() {
      if (editId){
        DepartmentService
          .departmentEdit(editId)
          .then(function (res) {
            vm.edit = res.data.data;
          })
      }
    }
    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function save() {
      if (editId){
        DepartmentService
          .departmentUpdate(editId,vm.edit)
          .then(function (res) {
            toaster.pop('success','保存成功');
            location.reload();
          })
      }else {
        DepartmentService
          .departmentCreate(vm.edit)
          .then(function (res) {
            toaster.pop('success','成功添加');
            location.reload();
          })
      }

    }
  }
})();
