(function() {
  'use strict';

  angular
    .module('merchantApp')
    .directive('noticeEditor', directive);

  /* @ngInject */
  function directive() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'components/notice/editor.directive.html',
      scope: {
        notice: "=notice"
      },
      controller: Controller,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  Controller.$inject = [];

  /* @ngInject */
  function Controller() {
    var vm = this;

    activate();

    function activate() {

    }
  }
})();
