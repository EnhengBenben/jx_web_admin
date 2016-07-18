(function() {
  'use strict';

  angular
    .module('merchantApp')
    .controller('ApplicationOtherListController', ApplicationOtherListController);

  ApplicationOtherListController.$inject = ['$filter', '$state', 'ApplicationService', 'toaster'];

  /* @ngInject */
  function ApplicationOtherListController($filter, $state, ApplicationService, toaster) {
    var vm = this;

    vm.save = save;
    vm.accommodation = [{send:true,show:'是'},{send:false,show:'否'}];
    vm.other = {
      day:15,
      enrollment_intro:[],
      seal:[]

    };
    return init();

    function init() {
      ApplicationService
        .other()
        .then(function (res) {
          vm.other = res.data.data;
          if(!vm.other.seal){
            vm.other['seal'] = [];
          }
          if(!vm.other.enrollment_intro){
            vm.other['enrollment_intro'] = [];
          }
        })
    }

    function save() {
      vm.saving = true;
      ApplicationService
        .updateOther(vm.other)
        .then(function (res) {
          toaster.pop('success','保存成功');
        })

    }
  }
})();
/**
 * Created by yong on 16/5/10.
 */
