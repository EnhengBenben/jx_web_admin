'use strict';

angular.module('merchantApp')
  .service('CourseService', CourseService);

CourseService.$inject = ['ENDPOINT', '$http'];

function CourseService(ENDPOINT, $http) {
  return {
    list: list,
    pending:pending,//未发布进修班
    show:show,
    create:create,
    edit:edit,
    update:update,
    publish:publish,
    unPublish:unPublish
  };
  function show(id) {
    return $http({
      method: 'GET',
      url: ENDPOINT + '/courses/' + id
    });
  }
  function publish(id) {
    return $http({
      method: 'GET',
      url: ENDPOINT + '/courses/' + id + '/publish'
    });
  }

  function unPublish(id) {
    return $http({
      method: 'GET',
      url: ENDPOINT + '/courses/' + id + '/cancel'
    });
  }

  function pending(params) {
    return $http({
      url:ENDPOINT + '/courses-Unpublished',
      method:'GET',
      params:params
    })
  }

  function edit(id) {
    return $http({
      url: ENDPOINT + '/courses/' + id,
      method: 'GET',
    })
  }

  function update(id,data) {
    return $http({
      url:ENDPOINT + '/courses/' + id,
      method:'PUT',
      data:data
    })
  }

  function create(data) {
    return $http({
      url: ENDPOINT + '/courses',
      method:'POST',
      data:data
    })
  }

  function list(params) {
    return $http({
      method: 'GET',
      url: ENDPOINT + '/courses',
      params: params
    });
  }

}
