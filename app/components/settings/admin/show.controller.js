(function() {
  'use strict';

  angular
    .module('merchantApp')
    .controller('AdminShowController', AdminShowController);

  AdminShowController.$inject = ['$compile', '$scope', '$localStorage', 'ENDPOINT', 'DTOptionsBuilder', 'DTColumnBuilder'];

  function AdminShowController($compile, $scope, $localStorage, ENDPOINT, DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.admins = {};
    return init();

    function init() {}
  }
})();
