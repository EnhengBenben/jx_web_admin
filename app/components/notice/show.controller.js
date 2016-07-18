/**
 * Created by yong on 16/5/19.
 */
'use strict';

angular.module('merchantApp')
.controller('NoticeShowController',NoticeShowController);
NoticeShowController.$inject = ['NoticeService','$stateParams','$state']
function NoticeShowController(NoticeService,$stateParams,$state) {
  var vm = this;
vm.cancel = cancel;


  return init();

  function init() {
    NoticeService
      .get($stateParams.noticeId)
      .then(function (res) {
        vm.show = res.data.data;
        $('#info').html(vm.show.info);
      })

  }
  function cancel() {
    $state.go('admin.notices.list',{status:'publish'});
  }

}
