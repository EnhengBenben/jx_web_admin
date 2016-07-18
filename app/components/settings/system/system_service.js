(function() {
  'use strict';

  angular
    .module('merchantApp')
    .service('SystemService', SystemService);

  SystemService.$inject = ['$http','ENDPOINT'];

  /* @ngInject */
  function SystemService($http,ENDPOINT) {
    return {
      systemSettings:systemSettings,
      editSystemSettings:editSystemSettings,
    };
    
    function editSystemSettings(data) {
      return $http({
        url:ENDPOINT + '/systemSettings',
        method:'PUT',
        data:data
      })
    }
    function systemSettings(){
      return $http({
        url:ENDPOINT + '/systemSettings',
        method:'GET'
      })
    }


  }
})();
