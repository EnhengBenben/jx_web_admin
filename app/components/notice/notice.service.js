(function() {
  'use strict';

  angular
    .module('merchantApp')
    .service('NoticeService', Service);

  Service.$inject = ['$http', 'ENDPOINT'];

  /* @ngInject */
  function Service($http, ENDPOINT) {
    return {
      list: list,//发布列表
      pending:pending,//未发布公告列表
      get: get,//获取单个公告
      create: create,//创建公告
      top:top,//公告置顶
      down:down,//取消置顶
      update: update,//更新公告
      remove: remove,//删除公告
      publish: publish,//发布
      unpublish: unpublish,//取消发布
      statistics: statistics,
      users: users
    };
    function top(id) {
      return $http({
        method: 'GET',
        url: ENDPOINT + '/announcements/' + id + '/top?status=top'
      });
    }
    function down(id) {
      return $http({
        method: 'GET',
        url: ENDPOINT + '/announcements/' + id + '/top?status=down'
      });
    }
    function pending(params) {
      return $http({
        method: 'GET',
        url: ENDPOINT + '/announcements-Unpublished',
        params:params
      });
    }
    function list(params) {
      return $http({
        method: 'GET',
        url: ENDPOINT + '/announcements',
        params:params
      });
    }

    function get(id) {
      return $http({
        method: 'GET',
        url: ENDPOINT + '/announcements/' + id
      });
    }

    function create(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/announcements',
        data: data
      });
    }

    function update(id,notice) {
      return $http({
        method: 'PUT',
        url: ENDPOINT + '/announcements/' + id,
        data: notice
      });
    }

    function remove(id) {
      return $http({
        method: 'DELETE',
        url: ENDPOINT + '/announcements/' + id,
      });
    }

    function publish(id) {
      return $http({
        method: 'GET',
        url: ENDPOINT + '/announcements/' + id + '/publish'
      });
    }

    function unpublish(id) {
      return $http({
        method: 'GET',
        url: ENDPOINT + '/announcements/' + id + '/cancel',
      });
    }

    function statistics(id, params) {
      return $http({
        method: 'GET',
        url: ENDPOINT + '/notices/' + id + '/statistics',
        data: params
      });
    }

    function users(id, params) {
      return $http({
        method: 'GET',
        url: ENDPOINT + '/notices/' + id + '/users',
        params: params
      });
    }
  }
})();
