/**
 * Created by yong on 16/5/11.
 */
'use strict';

angular.module('merchantApp')
  .controller('ApplicationHospitalEditController', ApplicationHospitalEditController);

ApplicationHospitalEditController.$inject = ['$state', '$stateParams', 'ApplicationService','toaster'];

function ApplicationHospitalEditController($state, $stateParams, ApplicationService,toaster) {
  var vm = this;
  vm.save = save;
  vm.cancel = cancel;
  return init();

  function init() {
    ApplicationService
      .orgRankScoresEdit($stateParams.id)
      .then(function (res) {
        vm.edit = res.data.data;
      })


  }
  function cancel() {
    $state.go('admin.application.settings.hospital.list');
  }

  function save() {
    vm.saving = true;
    ApplicationService
      .orgRankScoresUpdate($stateParams.id,vm.edit)
      .then(function (res) {
        toaster.pop('success','成功保存');

      })
      .finally(function () {
        vm.saving = false;
        $state.go('admin.application.settings.hospital.list');
      })
  }
}
