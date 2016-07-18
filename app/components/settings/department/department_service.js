(function() {
  'use strict';

  angular
    .module('merchantApp')
    .service('DepartmentService', DepartmentService);

  DepartmentService.$inject = ['$http','ENDPOINT'];

  /* @ngInject */
  function DepartmentService($http,ENDPOINT) {
    return {
      departments:departments,//科室列表
      departmentEdit:departmentEdit,//获取编辑信息
      departmentUpdate:departmentUpdate,
      departmentCreate:departmentCreate,
      departmentDelete:departmentDelete,//delete department
    };
    function departments(params){
      return $http({
        url:ENDPOINT + '/departments',
        method:'GET',
        params:params
      })
    }
    function departmentEdit(id){
      return $http({
        url:ENDPOINT + '/departments/' + id,
        method:'GET'
      })
    }
    function departmentUpdate(id,data) {
      return $http({
        url:ENDPOINT + '/departments/' + id,
        method:'PUT',
        data:data
      })
    }
    function departmentCreate(data) {
      return $http({
        url:ENDPOINT + '/departments',
        method:'POST',
        data:data
      })
    }
    function departmentDelete(id,data) {
      return $http({
        url:ENDPOINT + '/departments/' + id,
        method:'DELETE',
        data:data
      })
    }


  }
})();
