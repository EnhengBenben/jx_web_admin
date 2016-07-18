(function() {
  'use strict';

  angular
    .module('merchantApp')
    .service('DashboardService', DashboardService);

  DashboardService.$inject = ['$http','ENDPOINT'];

  /* @ngInject */
  function DashboardService($http,ENDPOINT) {
    this.dashboard = dashboard;
    function dashboard(){
      return $http({
        url:ENDPOINT + '/homepage',
        method:'GET'
      })
    }


  }
})();
