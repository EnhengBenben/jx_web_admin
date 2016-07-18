'use strict';

angular.module('merchantApp')
  .controller('SysInformationController', SysInformationController);

SysInformationController.$inject = ['SystemService','toaster'];

function SysInformationController(SystemService,toaster) {
  var vm = this;
  return init();
  function init() {
    SystemService
      .systemSettings()
      .then(function(res){
        vm.information = res.data.data;
        vm.domain_name = vm.information.domain_name;
        vm.information['domain_name'] = vm.information.domain_name + '.jinxiu114.com'
      });
    vm.save = function(){
      vm.information['domain_name'] = vm.domain_name;
      SystemService
        .editSystemSettings(vm.information)
        .then(function(res){
          toaster.pop('success','保存成功');
          location.reload();
        })
    };
    // SystemService
    //   .getInformation()
    //   .then(function(res){
    //     vm.information = res.data.data;
    //   })
  }



}
