(function() {
  'use strict';

  angular
    .module('merchantApp')
    .service('ApplicationAdminService', ApplicationAdminService);

  ApplicationAdminService.$inject = ['$http','ENDPOINT'];

  /* @ngInject */
  function ApplicationAdminService($http,ENDPOINT) {
    return{
      list:list,
      check:check,
      courses:courses
    };

    function courses(params) {
      return $http({
        url:ENDPOINT + '/courses-list',
        method:'GET',
        params:params
      })
    }
    function list(params) {
      return $http({
        url:ENDPOINT + '/application',
        method:'GET',
        params:params
      })
    }
    function check(id,params) {
      return $http({
        url:ENDPOINT + '/application/' + id + '/checkByVerify',
        method:'PUT',
        params:params
      })
    }


  }
})();
