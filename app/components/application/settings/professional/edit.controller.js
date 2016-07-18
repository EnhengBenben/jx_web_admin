/**
 * Created by yong on 16/5/11.
 */
'use strict';

angular.module('merchantApp')
  .controller('ApplicationProfessionalEditController', ApplicationProfessionalEditController);

ApplicationProfessionalEditController.$inject = ['$state', '$stateParams', 'ApplicationService','toaster'];

function ApplicationProfessionalEditController($state, $stateParams, ApplicationService,toaster) {
  var vm = this;
  vm.save = save;
  vm.cancel = cancel;
  return init();

  function init() {
    ApplicationService
      .techDutyScoresEdit($stateParams.id)
      .then(function (res) {
        vm.edit = res.data.data;
      })

  }
  function cancel() {
    $state.go('admin.application.settings.professional.list');
  }
  function save() {
    vm.saving = true;
    ApplicationService
      .techDutyScoresUpdate($stateParams.id,vm.edit)
      .then(function (res) {
        toaster.pop('success','成功保存');
        $state.go('admin.application.settings.professional.list');
      })
      .finally(function () {
        vm.saving = false;
      })
  }
}
