(function() {
  'use strict';

  angular
    .module('merchantApp')
    .service('ApplicationService', ApplicationService);

  ApplicationService.$inject = ['$http','ENDPOINT'];

  /* @ngInject */
  function ApplicationService($http,ENDPOINT) {
    return{
      degreeScores:degreeScores,//学历
      degreeScoresEdit:degreeScoresEdit,//学位编辑获取数据
      degreeUpdate:degreeUpdate,//积分更新
      techDutyScores:techDutyScores,//技术职称列表
      techDutyScoresEdit:techDutyScoresEdit,//技术职称编辑
      techDutyScoresUpdate:techDutyScoresUpdate,//技术职称更新
      orgRankScores:orgRankScores,//医院级别
      orgRankScoresEdit:orgRankScoresEdit,//编辑医院级别
      orgRankScoresUpdate:orgRankScoresUpdate,//更新医院级别
      adminDutyScores:adminDutyScores,//行政职务列表
      adminDutyScoresEdit:adminDutyScoresEdit,
      adminDutyScoresUpdate:adminDutyScoresUpdate,
      orgRegionScores:orgRegionScores,//地域列表
      orgRegionScoresEdit:orgRegionScoresEdit,
      orgRegionScoresUpdate:orgRegionScoresUpdate,
      list:list,//获取申请表
      addRecommend:addRecommend,
      other:other,
      updateOther:updateOther,
      check:check,//审核管理员审核
      show:show,//获取一个申请表
    };


    function show(id,params) {
      return $http({
        url:ENDPOINT + '/application/' + id,
        method:'get',
        params:params
      })
    }

    function check(id,params) {
      return $http({
        url:ENDPOINT + '/application/' + id + '/checkByAdmin',
        method:'PUT',
        params:params
      })
    }
    function addRecommend(id,data) {
      return $http({
        url:ENDPOINT + '/application/'+ id +'/addRecommenders',
        method:'PUT',
        data:data
      })
    }
    function other() {
      return $http({
        url: ENDPOINT + '/otherSettings',
        method : "GET"
      })
    }
    function updateOther(data) {
      return $http({
        url: ENDPOINT + '/otherSettings',
        method:"PUT",
        data:data
      })
    }
    function list(params) {
      return $http({
        url:ENDPOINT + '/application',
        method:'get',
        params:params
      })
    }
    function orgRegionScores(params){
      return $http({
        url:ENDPOINT + '/orgRegionScores',
        method:'GET',
        params:params
      })
    }
    function orgRegionScoresEdit(id){
      return $http({
        url:ENDPOINT + '/orgRegionScores/' + id,
        method:'GET'
      })
    }
    function orgRegionScoresUpdate(id,data){
      return $http({
        url:ENDPOINT + '/orgRegionScores/' + id,
        method:'PUT',
        data:data
      })
    }

    function adminDutyScores(params){
      return $http({
        url:ENDPOINT + '/adminDutyScores',
        method:'GET',
        params:params
      })
    }
    function adminDutyScoresEdit(id){
      return $http({
        url:ENDPOINT + '/adminDutyScores/' + id,
        method:'GET'
      })
    }
    function adminDutyScoresUpdate(id,data){
      return $http({
        url:ENDPOINT + '/adminDutyScores/' + id,
        method:'PUT',
        data:data
      })
    }

    function orgRankScores(params){
      return $http({
        url:ENDPOINT + '/orgRankScores',
        method:'GET',
        params:params
      })
    }
    function orgRankScoresEdit(id){
      return $http({
        url:ENDPOINT + '/orgRankScores/' + id,
        method:'GET'
      })
    }
    function orgRankScoresUpdate(id,data){
      return $http({
        url:ENDPOINT + '/orgRankScores/' + id,
        method:'PUT',
        data:data
      })
    }
    function techDutyScores(params){
      return $http({
        url:ENDPOINT + '/techDutyScores',
        method:'GET',
        params:params
      })
    }
    function techDutyScoresEdit(id){
      return $http({
        url:ENDPOINT + '/techDutyScores/' + id,
        method:'GET'
      })
    }
    function techDutyScoresUpdate(id,data){
      return $http({
        url:ENDPOINT + '/techDutyScores/' + id,
        method:'PUT',
        data:data
      })
    }
    function degreeUpdate(id,data){
      return $http({
        url:ENDPOINT + '/degreeScores/' + id,
        method:'PUT',
        data:data
      })
    }
    function degreeScores(params){
      return $http({
        url:ENDPOINT + '/degreeScores',
        method:'GET',
        params:params
      })
    }
    function degreeScoresEdit(id){
      return $http({
        url:ENDPOINT + '/degreeScores/' + id,
        method:'GET'
      })
    }

  }
})();
