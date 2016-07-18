'use strict';

angular.module('merchantApp')
  .controller('ApplicationAdminShowController', ApplicationAdminShowController);

ApplicationAdminShowController.$inject = ['$state','CourseService','$uibModalInstance','ApplicationService','showId','toaster','ApplicationAdminService'];

function ApplicationAdminShowController($state, CourseService,$uibModalInstance,ApplicationService,showId,toaster,ApplicationAdminService) {
  var vm = this;
  vm.save = save;
  vm.cancel = cancel;
  vm.results = [{id:'pass',name:'通过'},{id:'reject',name:'不通过'}];
  return init();

  function init() {
    var params = {
      include:'course,user.orgRank,user.orgRegion,user.degree,user.techDuty,user.adminDuty,user.education,user.paper,user.workExp,user.relative,user.director',
    };
    ApplicationService
      .show(showId,params)
      .then(function (res) {
        vm.show = res.data.data.user.data;
        vm.info = res.data.data;
      })
  }

  function save() {
    ApplicationAdminService
      .check(showId,vm.verify)
      .then(function (res) {
        $uibModalInstance.dismiss('cancel');
        toaster.pop('success','审核成功');
      });


  }
  function cancel() {
    $uibModalInstance.dismiss('cancel');
  }
}
