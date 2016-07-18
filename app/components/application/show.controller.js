'use strict';

angular.module('merchantApp')
  .controller('ApplicationShowController', ApplicationShowController);

ApplicationShowController.$inject = ['$state','CourseService','$uibModalInstance','ApplicationService','showId','toaster','ExportService'];

function ApplicationShowController($state, CourseService,$uibModalInstance,ApplicationService,showId,toaster,ExportService) {
  var vm = this;
  vm.verify = verify;
  vm.cancel = cancel;
  vm.applicationExcl = applicationExcl;
  vm.results = [{id:'pass',name:'通过'},{id:'reject',name:'拒绝'},{id:'transfer',name:'调班'}];
  return init();

  function init() {
    var params = {
      limit:1000
    };
  CourseService
    .list(params)
    .then(function (res) {
      vm.transferCourse = res.data.data
    });
    var params = {
      include:'course,user.orgRank,user.orgRegion,user.degree,user.techDuty,user.adminDuty,user.education,user.paper,user.workExp,user.relative,user.director,transferCourse',
    };
    ApplicationService
      .show(showId,params)
      .then(function (res) {
        vm.show = res.data.data.user.data;
        vm.info = res.data.data;
      })
  }

  function verify() {
    ApplicationService
      .check(showId,vm.admin)
      .then(function (res) {
        $uibModalInstance.dismiss('cancel');
        toaster.pop('success','审核成功');
      });


  }

  function applicationExcl() {
    ExportService
      .exportFile('/applicationExport','电子申请表',{},'PUT')
      .then(function (res) {

      })
  }
  function cancel() {
    $uibModalInstance.dismiss('cancel');
  }
}
