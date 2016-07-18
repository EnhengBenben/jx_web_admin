/**
 * Created by yong on 16/5/11.
 */
'use strict';

angular.module('merchantApp')
  .controller('ApplicationEducationCreateController', ApplicationEducationCreateController);

ApplicationEducationCreateController.$inject = ['$state', '$stateParams', 'CourseService'];

function ApplicationEducationCreateController($state, $stateParams, CourseService) {
  var vm = this;
  vm.save = save;
  return init();

  function init() {

  }

  function save() {
    location.reload();
  }
}
