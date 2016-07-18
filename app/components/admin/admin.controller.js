'use strict';

angular.module('merchantApp')
  .controller('AdminController', AdminController);

AdminController.$inject = ['$state', '$localStorage', '$uibModal','$location'];

function AdminController($state, $localStorage, $uibModal,$location) {
  var admin = this;
  admin.logout = logout;
  admin.role = $localStorage.role;
  admin.openPublishDialog = openPublishDialog;
  return init();

  function init() {}

  function logout() {
    $localStorage.token = null;
    $localStorage.role = null;
    $state.go('login');
    $("body").css('backgroundColor','#2f4050');
  }

  function openPublishDialog() {
    /*$uibModal.open({
      animation: true,
      templateUrl: 'components/publish/dialog.html',
      controller: 'PublishDialogController as vm',
      size: 'test'
    });*/
  }
}
