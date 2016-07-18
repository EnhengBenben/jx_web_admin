'use strict';

angular.module('merchantApp')
  .service('AccountService', AccountService);

AccountService.$inject = ['ENDPOINT', '$http'];

function AccountService(ENDPOINT, $http) {
  return {
    get: get,
    update: update
  };

  function get() {
    return $http({
      method: 'GET',
      url: ENDPOINT + '/account'
    });
  }

  function update(data) {
    return $http({
      method: 'PUT',
      url: ENDPOINT + '/admins/change-password',
      data: data
    });
  }
}
