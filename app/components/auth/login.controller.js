'use strict';

angular.module('merchantApp')
  .controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$location', '$localStorage', 'toaster', 'AuthService','$rootScope'];

function LoginController($scope, $location, $localStorage, toaster, AuthService,$rootScope) {
  var vm = this;
  vm.account = {
    username: '',
    password: ''
  };
  vm.login = login;
  vm.errorMessage = null;
  return init();

  function init() {}

  function login() {
    AuthService
      .login(vm.account)
      .success(function(response) {
        $localStorage.token = response.data.auth_token;
        $localStorage.role = response.data.role;
        if($localStorage.role ==0){
          $location.path('/admin/dashboard');
          $("body").css('backgroundColor','#2f4050');
        }else if($localStorage.role == 1){
          $location.path('/admin/dashboard');
          $("body").css('backgroundColor','#FFF');

        }

      })
      .error(function(response) {
        toaster.pop('error', '登录失败', response.message);
      });
  }
}
