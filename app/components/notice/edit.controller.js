(function() {
  'use strict';

  angular
    .module('merchantApp')
    .controller('NoticeEditController', NoticeEditController);

  NoticeEditController.$inject = ['$state', 'NoticeService', 'toaster', '$stateParams'];

  /* @ngInject */
  function NoticeEditController($state, NoticeService, toaster, $stateParams) {
    var vm = this;
    vm.save = save;
    vm.cancel = cancel;
    activate();

    function activate() {
      NoticeService
        .get($stateParams.noticeId)
        .then(function(res) {
          vm.notice = res.data.data;
          if (vm.notice.published_at){
            vm.notice['status'] = "publish"
          }else {
            vm.notice['status'] = "pending"
          }
        });
    }

    function save() {
      vm.saving = true;
      NoticeService
        .update($stateParams.noticeId,vm.notice)
        .then(function() {
          toaster.pop('success', '更新成功');
          $state.go('admin.notices.list', {
            status: 'publish'
          });
        })
        .finally(function() {
          vm.saving = false;
        });
    }

    function cancel() {
      $state.go('admin.notices.list', {
        status: 'publish'
      });
    }
  }
})();
