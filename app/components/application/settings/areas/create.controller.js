/**
 * Created by yong on 16/5/11.
 */
'use strict';

angular.module('merchantApp')
  .controller('ApplicationAreasCreateController', ApplicationAreasCreateController);

ApplicationAreasCreateController.$inject = ['$state', '$stateParams', 'CourseService'];

function ApplicationAreasCreateController($state, $stateParams, CourseService) {
  var vm = this;
  vm.save = save;
  return init();

  function init() {

  }

  function save() {
    location.reload();
  }
}
