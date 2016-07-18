/**
 * Created by yong on 16/5/11.
 */
'use strict';

angular.module('merchantApp')
  .controller('ApplicationEducationEditController', ApplicationEducationEditController);

ApplicationEducationEditController.$inject = ['$state', '$stateParams', 'ApplicationService','toaster'];

function ApplicationEducationEditController($state, $stateParams, ApplicationService,toaster) {
  var vm = this;
  vm.edit = {};
  vm.id = $stateParams.id;
  vm.save = save;
  vm.cancel = cancel;
  return init();

  function init() {
    ApplicationService
      .degreeScoresEdit(vm.id)
      .then(function (res) {
        vm.edit = res.data.data;
      });
  }
  function cancel() {
    $state.go('admin.application.settings.education.list');
  }

  function save() {
    vm.saving = true;
    ApplicationService
      .degreeUpdate(vm.id,vm.edit)
      .then(function (res) {
        toaster.pop('success','成功保存');
        
        $state.go('admin.application.settings.education.list');
      });
  }
}
