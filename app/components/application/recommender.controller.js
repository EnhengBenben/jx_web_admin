'use strict';

angular.module('merchantApp')
  .controller('ApplicationRecommenderController', ApplicationRecommenderController);

ApplicationRecommenderController.$inject = ['$state', 'recommendId','ApplicationService','$uibModalInstance','toaster'];

function ApplicationRecommenderController($state,recommendId,ApplicationService,$uibModalInstance,toaster) {
  var vm = this;
  vm.save = save;
  vm.cancel = cancel;

  return init();

  function init() {

  }
  function cancel() {
    $uibModalInstance.dismiss('cancel');
  }

  function save() {
    ApplicationService
      .addRecommend(recommendId,vm.recommend)
      .then(function (res) {
        toaster.pop('success','添加成功');
        $uibModalInstance.dismiss('cancel');
        location.reload();
      });
  }
}
