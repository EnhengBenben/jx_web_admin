/**
 * Created by yong on 16/5/11.
 */
'use strict';

angular.module('merchantApp')
  .controller('ApplicationDutiesCreateController', ApplicationDutiesCreateController);

ApplicationDutiesCreateController.$inject = ['$state', '$stateParams', 'CourseService'];

function ApplicationDutiesCreateController($state, $stateParams, CourseService) {
  var vm = this;
  vm.save = save;
  return init();

  function init() {

  }

  function save() {
    location.reload();
  }
}
