(function() {
  'use strict';

  angular
    .module('merchantApp')
    .controller('NoticeCreateController', NoticeCreateController);

  NoticeCreateController.$inject = ['$state', 'NoticeService', 'toaster'];

  /* @ngInject */
  function NoticeCreateController($state, NoticeService, toaster) {
    var vm = this;
    vm.notice = {
      for_all_identities: true,
      images: [],
      attachments: []
    };
    vm.save = save;
    return init();

    function init() {

    }

    function save(publish) {
      if(publish){
        //vm.saving = true;
        vm.notice['status'] = "publish";
        NoticeService
          .create(vm.notice).then(function(res) {
          toaster.pop('success', '添加并发布成功');
          $state.go('admin.notices.list',{
            status: 'publish'
          });
        }).finally(function() {
          //vm.saving = false;
        });
      }else {
        vm.notice['status'] = "pending";
        //vm.publishing = true;
        NoticeService
          .create(vm.notice).then(function(res) {
          toaster.pop('success', '已添加到未发布');
          $state.go('admin.notices.list',{
            status: 'pending'
          });
        }).finally(function() {
          //vm.publishing = false;
        });
      }

    }
  }
})();
