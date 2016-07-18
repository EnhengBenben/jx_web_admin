/**
 * Created by yong on 16/5/7.
 */
(function() {
  'use strict';

  angular
    .module('merchantApp')
    .service('MemberService', MemberService);

  MemberService.$inject = ['$http','ENDPOINT'];

  /* @ngInject */
  function MemberService($http,ENDPOINT) {
    return{
      list:list,
    };
    function list(params) {
      return $http({
        url:ENDPOINT + '/students',
        method:'GET',
        params:params
      })
    }


  }
})();
