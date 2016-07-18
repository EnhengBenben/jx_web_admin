(function() {
  'use strict';

  angular
    .module('merchantApp')
    .service('AdminService', AdminService);

  AdminService.$inject = ['ENDPOINT', '$http'];

  function AdminService(ENDPOINT, $http) {
    return {
      list: list,
      get: get,
      create: create,
      update: update,
      remove: remove
    };

    function list(params) {
      return $http({
        method: 'GET',
        url: ENDPOINT + '/admins',
        params: params
      });
    }

    function get(adminId,params) {
      return $http({
        method: 'GET',
        url: ENDPOINT + '/admins/' + adminId,
        params:params
      });
    }

    function create(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/admins',
        data: data
      });
    }

    function update(id,data) {
      return $http({
        method: 'PUT',
        url: ENDPOINT + '/admins/' + id,
        data: data
      });
    }

    function remove(adminId) {
      return $http({
        method: 'DELETE',
        url: ENDPOINT + '/admins/' + adminId
      });
    }
  }
})();
