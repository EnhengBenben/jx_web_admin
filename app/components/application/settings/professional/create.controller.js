/**
 * Created by yong on 16/5/11.
 */
'use strict';

angular.module('merchantApp')
  .controller('ApplicationProfessionalCreateController', ApplicationProfessionalCreateController);

ApplicationProfessionalCreateController.$inject = ['$state', '$stateParams', 'CourseService','toaster'];

function ApplicationProfessionalCreateController($state, $stateParams, CourseService,toaster) {
  var vm = this;
  vm.save = save;
  return init();

  function init() {

  }

  function save() {
    toaster.pop('success','添加成功');
    location.reload();
  }
}
