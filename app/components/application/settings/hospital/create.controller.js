/**
 * Created by yong on 16/5/11.
 */
'use strict';

angular.module('merchantApp')
  .controller('ApplicationHospitalCreateController', ApplicationHospitalCreateController);

ApplicationHospitalCreateController.$inject = ['$state', '$stateParams', 'CourseService'];

function ApplicationHospitalCreateController($state, $stateParams, CourseService) {
  var vm = this;
  vm.save = save;
  return init();

  function init() {

  }

  function save() {
    location.reload();
  }
}
