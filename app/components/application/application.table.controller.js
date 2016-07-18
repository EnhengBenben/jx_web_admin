/**
 * Created by yong on 16/6/1.
 */
'use strict';

angular.module('merchantApp')
.controller('ApplicationShowTableController',ApplicationShowTableController);

ApplicationShowTableController.$inject = ['$stateParams'];

function ApplicationShowTableController($stateParams) {
  var vm = this;
  vm.img = $stateParams.url;
}
