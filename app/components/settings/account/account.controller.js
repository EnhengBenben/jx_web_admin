'use strict';

angular.module('merchantApp')
  .controller('AccountController', AccountController);

AccountController.$inject = ['$uibModal', 'AccountService', 'toaster','SystemService'];

function AccountController($uibModal, AccountService, toaster,SystemService) {
  var vm = this;
  return init();

  function init() {
    SystemService
      .systemSettings()
      .then(function(res){
        vm.account = res.data.data.admin.data;
        vm.account.password = "";
      });
    vm.save = function(){
      AccountService
        .update(vm.account)
        .then(function(res){
          toaster.pop('success','保存成功');
        })
    };
  }
}
