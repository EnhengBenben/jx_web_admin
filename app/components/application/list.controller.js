'use strict';

angular
  .module('merchantApp')
  .controller('applicationListController', applicationListController);

applicationListController.$inject = ['$compile', '$scope', '$stateParams', 'toaster', 'ApplicationService','CourseService', 'DTOptionsBuilder', 'DTColumnBuilder', '$uibModal','ExportService'];

function applicationListController($compile, $scope, $stateParams, toaster, ApplicationService,CourseService, DTOptionsBuilder, DTColumnBuilder, $uibModal,ExportService) {
  var vm = this;
  vm.courses = {};
  vm.years = [];
  vm.download = download;
  vm.applicationExcl = applicationExcl;
  var y = (new Date()).getUTCFullYear() + 10;
  for (var i = 2010; i <= y; i += 1) {
    vm.years.push(i);
  }
  vm.filter = {

  }
  vm.show = show;
  vm.recommend = recommend;
  vm.recommender = [{recommend:1,name:'有推荐人'},{recommend:0,name:'无推荐人'}];
  vm.status = [{name:'建议通过'},{name:'建议拒绝'},{name:'已拒绝进修'},{name:'待审核'},{name:'已接受调班'},{name:'已拒绝调班'},{name:'待确认通过'},{name:'待确认调班'},{name:'已接受进修'},{name:'申请未通过'}];

  return init();

  function init() {
    var params = {
      limit:1000,
      year:vm.filter.year
    }
    CourseService
      .list(params)
      .then(function (res) {
        vm.departments = res.data.data;
      });
    initDt();
    $scope.$watch('vm.filter.year', function (newValue, oldValue) {
      if (newValue != oldValue) {
        params['year'] = vm.filter.year;
        CourseService
          .list(params)
          .then(function (res) {
            vm.departments = res.data.data;
          });
      }
    }, true);

    $scope.$watch('vm.filter', function (newValue, oldValue) {
      if (newValue != oldValue) {
        vm.dtInstance.reloadData();
      }
    }, true);
  }

  function initDt() {
    vm.dtOptions = DTOptionsBuilder.newOptions()
      .withOption('ajax', dtAjax)
      .withDataProp('data')
      .withOption('createdRow', createdRow)
      .withOption('order', [
        [6, 'desc']
      ]);

    vm.dtColumns = [
      DTColumnBuilder.newColumn(null).withTitle('#').withOption('width', '20px').notSortable().renderWith(function(data, type, full, meta) {
        return meta.row + meta.settings.oAjaxData.start + 1;
      }).withOption('width','20px'),
      DTColumnBuilder.newColumn('user.data.name').withTitle('姓名').withOption('width','45px').renderWith(nameHtml),
      DTColumnBuilder.newColumn('user.data.orgRank.data.name').withTitle('单位级别').withOption('width','70px').notSortable(),
      DTColumnBuilder.newColumn('user.data.degree.data.name').withTitle('学历').withOption('width','30px').notSortable(),
      DTColumnBuilder.newColumn('user.data.techDuty.data.name').withTitle('职称').withOption('width','60px').notSortable(),
      DTColumnBuilder.newColumn('course.data.name').withTitle('进修班').notSortable(),
      DTColumnBuilder.newColumn('submitted_at').withTitle('申请时间').withOption('width','90px').renderWith(function(data,type,full,meta) {
        return moment(full.submitted_at).format('YYYY-MM-DD');
      }),
      DTColumnBuilder.newColumn('score').withTitle('积分').withOption('width','30px').notSortable(),
      DTColumnBuilder.newColumn('recommender').withTitle('推荐人').withOption('width','90px').notSortable(),
      DTColumnBuilder.newColumn('status').withTitle('状态').withOption('width','60px').notSortable(),
      DTColumnBuilder.newColumn(null).withTitle('操作').withOption('width','90px').notSortable()
        .renderWith(actionsHtml)
    ];

    vm.dtInstance = {};
  }

  function dtAjax(data, callback, settings) {
    var params = convertDtData(data);
   // var params = {}
    angular.extend(params,vm.filter);
    params['include'] = 'user.orgRank,user.techDuty,user.degree,course'
     ApplicationService.list(params)
       .then(function(res) {
    callback(convertDtResponse(res.data));
       });
  }

  function nameHtml(data, type, full, meta) {
    return '<a ng-click="vm.show('+ full.id +')">' + data + '</a>';
  }

  function actionsHtml(data, type, full, meta) {
    vm.courses[full.id] = full;
    var html =
      '<button class="btn btn-white btn-xs" uib-tooltip="添加推荐人" ng-click = "vm.recommend(' + data.id + ')">' +
      ' <i class="fa fa-user-plus" aria-hidden="true"></i>' +
     '<button class="btn btn-white btn-xs" uib-tooltip="审核申请表" ng-click="vm.show('+ data.id +')">' +
        ' <i class="fa fa-check-square-o" aria-hidden="true"></i>' +
        '</button>&nbsp;' +
      '<button class="btn btn-white btn-xs" uib-tooltip="下载申请表" ng-click="vm.download('+ data.id +')">' +
      ' <i class="fa fa-download" aria-hidden="true"></i>' +
      '</button>&nbsp;';
    return html;
  }

  function statusHtml(data, type, full, meta) {
    var statusDescr = {
      canceled: '未通过',
      pending: '待审核',
      publish: '通过'
    };
    if (data == 'pending') {
      return '<a ui-sref="admin.courses.show({courseId: ' + full.id + '})">' + statusDescr[data] + '</a>';
    } else {
      return statusDescr[data];
    }


  }

  function createdRow(row, data, dataIndex) {
    // Recompiling so we can bind Angular directive to the DT
    $compile(angular.element(row).contents())($scope);
  }
function recommend(id) {
  var openRecommend = $uibModal.open({
    templateUrl:'components/application/recommender.html',
    controller:'ApplicationRecommenderController',
    controllerAs: 'vm',
    bindToController: true,
    size:'md',
    resolve:{
      recommendId:id
    }
  })
}

  function download(id) {
    var params = {};
    ExportService
      .exportFile('/application/' + id + '/downloadApplication', "申请表",params,'GET')
      .then(function (res) {

      })
  }
  function show(id) {
    var showTable = $uibModal.open({
      templateUrl:'components/application/show.html',
      controller:'ApplicationShowController',
      controllerAs: 'vm',
      bindToController: true,
      size:'lg',
      resolve:{
        showId:id
      }
    })
  }

  function applicationExcl() {
    var params = {};
    angular.extend(params,vm.filter);
    ExportService
      .exportFile('/applicationExport','电子申请表',params,'PUT')
      .then(function (res) {

      })
  }

}
