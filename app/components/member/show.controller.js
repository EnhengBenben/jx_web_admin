'use strict';

angular.module('merchantApp')
  .controller('MembersShowController', MembersShowController);

MembersShowController.$inject = ['$state', '$stateParams', 'CourseService','ApplicationService'];

function MembersShowController($state, $stateParams, CourseService,ApplicationService) {
  var vm = this;
  vm.courses = {};
  vm.cancel = cancel;

  return init();

  function init() {
    var params = {
      include:'user'
    }
    ApplicationService
      .show($stateParams.membersId,params)
      .then(function (res) {
        vm.members = res.data.data.user.data;
      })
  }

  function cancel() {
    $state.go('admin.members.list');
  }
}
